import { NextResponse } from "next/server";
import { staticItems, subjects, topicsBySubject, allLessons, lessonById, subjectById } from "@/content";
import { generators, generatorsByTopic } from "@/lib/engine/generators";
import { blueprints, buildExam, buildSession, defaultPracticeConfig } from "@/lib/engine/select";
import { prepare, expectedAnswer, grade, mulberry32 } from "@/lib/engine/core";
import { emptyState, applyAnswer } from "@/lib/engine/progress-model";
import type { Item } from "@/content/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const out: any = { errors: [] as string[], info: {} as any };
  const err = (m: string) => out.errors.push(m);

  // 1. duplicate ids
  const seen = new Map<string, number>();
  for (const it of staticItems) seen.set(it.id, (seen.get(it.id) ?? 0) + 1);
  const dupes = [...seen.entries()].filter(([, n]) => n > 1);
  out.info.totalItems = staticItems.length;
  out.info.duplicateIds = dupes.map(([id, n]) => `${id}×${n}`);

  // 2. topics resolve
  const known = new Set<string>();
  for (const s of subjects) for (const t of topicsBySubject[s.id] ?? []) known.add(t.id);
  const orphanTopics = [...new Set(staticItems.map((i) => i.topic))].filter((t) => !known.has(t));
  out.info.orphanTopics = orphanTopics;
  for (const g of generators) if (!known.has(g.topic)) err(`generator topic not in catalog: ${g.topic} (${g.id})`);

  // 3. grade round-trip for every static item
  const rng = mulberry32(42);
  let graded = 0;
  for (const it of staticItems) {
    const prep = prepare(it, rng);
    const ans = expectedAnswer(prep);
    if (ans == null) { err(`no expected answer for ${it.id} (${it.format})`); continue; }
    const g = grade(it, ans, prep);
    graded++;
    if (!g.correct || g.score < 0.999) err(`expected answer not graded correct: ${it.id} got ${g.score} (${it.format})`);
    // wrong answer should not be correct
    if (it.format === "mcq") {
      const wrong = ((ans as any).index === 0 ? 1 : 0);
      if (grade(it, { kind: "mcq", index: wrong } as any, prep).correct) err(`mcq wrong answer graded correct: ${it.id}`);
    }
    if (it.format === "tf") {
      if (grade(it, { kind: "tf", value: !(ans as any).value } as any, prep).correct) err(`tf flipped answer graded correct: ${it.id}`);
    }
  }
  out.info.graded = graded;

  // 4. generators produce gradeable items
  let genCount = 0;
  for (const g of generators) {
    for (let k = 0; k < 6; k++) {
      let it: Item;
      try {
        it = g.build(mulberry32(1000 + k * 7));
      } catch (e: any) {
        err(`generator threw: ${g.id} — ${e?.message}`);
        break;
      }
      {
        genCount++;
        if (!known.has(it.topic)) err(`generated orphan topic ${it.topic} (${g.id})`);
        if (!["mcq", "multi", "tf", "numeric", "short", "match", "order"].includes(it.format))
          err(`generated unsupported format ${it.format} (${g.id}/${it.id})`);
        const prep = prepare(it, rng);
        const ans = expectedAnswer(prep);
        if (ans == null) { err(`generated item has no expected answer: ${g.id}/${it.id} (${it.format})`); continue; }
        const gr = grade(it, ans, prep);
        if (!gr.correct) err(`generated expected answer graded wrong: ${g.id}/${it.id} (${it.format})`);
        if (it.format === "numeric") {
          const stem = String((it as any).q ?? "");
          const num = (ans as any).value ?? (ans as any).number;
          if (!/round/i.test(stem) && typeof num === "number" && Math.abs(num % 1) > 1e-9)
            err(`non-integer numeric answer without rounding hint: ${g.id}/${it.id} = ${num}`);
        }
      }
    }
  }
  out.info.generatedChecked = genCount;
  out.info.generatorCount = generators.length;

  // 5. sessions for every subject/topic combination
  const sessionProblems: string[] = [];
  for (const s of subjects) {
    const topics = (topicsBySubject[s.id] ?? []).map((t) => t.id);
    const cfg = { ...defaultPracticeConfig, subjectId: s.id, topics, count: 20 };
    const sess = buildSession(cfg, emptyState());
    if (sess.questions.length < 10) out.errors.push(`short session for ${s.id}: ${sess.questions.length}/20`);
    for (const q of sess.questions) {
      if (q.item.subject !== s.id) sessionProblems.push(`${s.id} got item from ${q.item.subject}`);
      if (!topics.includes(q.item.topic)) sessionProblems.push(`${s.id} got off-topic item ${q.item.topic}`);
    }
    // single-topic sessions
    for (const t of topics.slice(0, 40)) {
      const ss = buildSession({ ...defaultPracticeConfig, subjectId: s.id, topics: [t], count: 5 }, emptyState());
      if (ss.questions.length === 0) sessionProblems.push(`empty single-topic session: ${s.id}/${t}`);
      for (const q of ss.questions) if (q.item.topic !== t) sessionProblems.push(`topic leak ${t} → ${q.item.topic}`);
    }
  }
  out.info.sessionProblems = sessionProblems.slice(0, 20);
  if (sessionProblems.length) err(`${sessionProblems.length} session pool problems (first: ${sessionProblems[0]})`);

  // 6. exams
  out.info.exams = blueprints.map((b) => {
    const sess = buildExam(b, emptyState(), 7);
    const want = b.parts.reduce((a, p) => a + p.count, 0);
    if (sess.questions.length !== want) err(`blueprint ${b.id}: ${sess.questions.length}/${want} items`);
    return `${b.id}:${sess.questions.length}/${want}`;
  });

  // 7. drills reference real items
  const missingDrills: string[] = [];
  for (const l of allLessons) {
    for (const id of l.drill ?? []) {
      if (!staticItems.some((i) => i.id === id)) missingDrills.push(`${l.id} → ${id}`);
    }
  }
  out.info.missingDrillIds = missingDrills;

  // 8. lesson subject/module integrity
  for (const l of allLessons) {
    if (!subjectById[l.subject]) err(`lesson ${l.id} has unknown subject ${l.subject}`);
    const mod = subjectById[l.subject]?.modules.find((m) => m.lessons.some((x) => x.id === l.id));
    if (!mod) err(`lesson ${l.id} not found in its subject's modules`);
    if (mod && mod.id !== l.moduleId) err(`lesson ${l.id} moduleId ${l.moduleId} but sits in ${mod.id}`);
    if (!lessonById[l.id]) err(`lesson ${l.id} missing from lessonById`);
  }

  // 9. mastery math sanity
  let st = emptyState();
  const item = staticItems.find((i) => i.format === "mcq")!;
  for (let k = 0; k < 30; k++) st = applyAnswer(st, item, true, { combo: k }).state;
  const mastery = st.topics[item.topic]?.mastery ?? 0;
  if (!(mastery > 0.5 && mastery <= 1)) err(`mastery after 30 correct answers = ${mastery}`);
  out.info.masteryAfter30Correct = mastery;
  out.info.xpAfter30Correct = st.xp;

  // 10. generators per topic coverage
  out.info.topicsWithoutGenerators = [...known].filter((t) => !(generatorsByTopic[t] ?? []).length).length;

  // 11. per-topic supply + blueprint part pools
  const countByTopic: Record<string, number> = {};
  for (const it of staticItems) countByTopic[it.topic] = (countByTopic[it.topic] ?? 0) + 1;
  out.info.emptyTopics = [...known].filter((t) => !countByTopic[t] && !(generatorsByTopic[t] ?? []).length);
  out.info.blueprintPools = blueprints.map((b) => ({
    id: b.id,
    parts: b.parts.map((part) => {
      const have = part.topics.reduce((a, t) => a + (countByTopic[t] ?? 0) + (generatorsByTopic[t] ?? []).length * 50, 0);
      return `${part.label}: want ${part.count}, pool ${have}`;
    }),
  }));
  out.info.topicCountsRla = Object.fromEntries(Object.entries(countByTopic).filter(([k]) => k.startsWith("gr-")));
  out.info.missingDrillCount = missingDrills.length;

  out.ok = out.errors.length === 0;
  return NextResponse.json(out, { status: 200 });
}
