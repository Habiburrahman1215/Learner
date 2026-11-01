import type { Item, QFormat, SubjectId } from "@/content/types";
import { staticItems, subjectById, topicsBySubject } from "@/content";
import { generators, generatorsByTopic } from "./generators";
import type { LearnerState } from "./progress-model";
import { mulberry32, prepare, shuffle, type PreparedQuestion, type Rng } from "./core";

/* ============================================================
   The selection algorithm.

   Given a request (topics × formats × count × difficulty) it
   returns an *ordering* of questions chosen by a weighted
   score, not a random draw. The score balances five competing
   pressures:

     1. Mastery gap      — practise what you cannot do yet
     2. Spaced due-ness  — revisit at the edge of forgetting
     3. Difficulty fit   — ~70–80 % expected success (desirable
                           difficulty; too easy bores, too hard
                           demoralises)
     4. Recency          — do not repeat what you just saw
     5. Interleaving     — mix topics instead of blocking them

   Sampling is *without replacement* by repeated weighted draw, so
   the ordering itself is part of the pedagogy.
   ============================================================ */

export type PracticeMode = "adaptive" | "weakest" | "random" | "sequential";

export interface PracticeConfig {
  subjectId: SubjectId;
  topics: string[];
  formats: QFormat[];
  count: number;
  /** auto = derived from mastery; 1..5 = fixed */
  difficulty: "auto" | 1 | 2 | 3 | 4 | 5;
  mode: PracticeMode;
  includeGenerated: boolean;
  /** seconds per question, 0 = untimed */
  secondsPerQuestion: number;
  title?: string;
}

export const defaultPracticeConfig: PracticeConfig = {
  subjectId: "rac-l2",
  topics: [],
  formats: [],
  count: 10,
  difficulty: "auto",
  mode: "adaptive",
  includeGenerated: true,
  secondsPerQuestion: 0,
};

export interface SessionQuestion {
  item: Item;
  prepared: PreparedQuestion;
}

export interface Session {
  id: string;
  config: PracticeConfig;
  questions: SessionQuestion[];
  startedAt: number;
  blueprint?: string;
}

/* ---------------- scoring ---------------- */

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function targetDifficulty(state: LearnerState, subject: SubjectId, topics: string[]): number {
  let sum = 0;
  let n = 0;
  for (const t of topics.length ? topics : topicsBySubject[subject]?.map((x) => x.id) ?? []) {
    const s = state.topics[t];
    sum += s?.ability ?? 0.5;
    n++;
  }
  const ability = n ? sum / n : 0.5; // 0..1
  // map ability → a 1..5 target slightly above current level
  return clamp(1 + ability * 3.2 + 0.45, 1, 5);
}

function topicMastery(state: LearnerState, topic: string): number {
  return state.topics[topic]?.mastery ?? 0;
}

interface Candidate {
  item: Item;
  weight: number;
  topic: string;
  diff: number;
  seenAt?: number;
}

export function buildCandidates(config: PracticeConfig, state: LearnerState): Item[] {
  const desiredFormats = config.formats.length ? new Set(config.formats) : null;
  const desiredTopics = config.topics.length ? new Set(config.topics) : null;

  const bank = staticItems.filter(
    (it) =>
      it.subject === config.subjectId &&
      (!desiredFormats || desiredFormats.has(it.format)) &&
      (!desiredTopics || desiredTopics.has(it.topic)),
  );

  if (!config.includeGenerated) return bank;

  // Generated material tops up thin topic/format combinations so that a request
  // for "20 numeric questions on superheat" never runs dry.
  const gens = generators.filter(
    (g) =>
      g.subject === config.subjectId &&
      (!desiredTopics || desiredTopics.has(g.topic)) &&
      (!desiredFormats || g.formats.some((f) => desiredFormats.has(f))),
  );

  const perTopicBank = new Map<string, number>();
  for (const it of bank) perTopicBank.set(it.topic, (perTopicBank.get(it.topic) ?? 0) + 1);

  const extra: Item[] = [];
  const want = Math.max(config.count * 2, 24);
  if (bank.length < want) {
    const rng = mulberry32(0xc0ffee + config.count);
    let guard = 0;
    while (extra.length + bank.length < want && guard++ < want * 12) {
      const g = gens[Math.floor(rng() * gens.length)];
      if (!g) break;
      if ((perTopicBank.get(g.topic) ?? 0) + extra.filter((e) => e.topic === g.topic).length >= want) continue;
      const item = g.build(rng);
      if (desiredFormats && !desiredFormats.has(item.format)) continue;
      extra.push(item);
    }
  }
  return [...bank, ...extra];
}

export function scoreCandidates(
  items: Item[],
  config: PracticeConfig,
  state: LearnerState,
  seed: number,
): Candidate[] {
  const rng = mulberry32(seed);
  const target = config.difficulty === "auto" ? targetDifficulty(state, config.subjectId, config.topics) : config.difficulty;
  const now = Date.now();

  return items.map((item) => {
    const mastery = topicMastery(state, item.topic);
    const card = state.srs[item.id];
    const seen = state.seen[item.id];
    let w = 1;

    // 1 — mastery gap
    w *= 1 + 2.4 * (1 - mastery);
    // 2 — spaced repetition due-ness
    if (card) {
      const overdueDays = (now - card.due) / 86_400_000;
      w *= overdueDays > 0 ? 1.6 + Math.min(overdueDays, 10) * 0.12 : 0.55;
      w *= 1 / (1 + card.lapses * 0.35);
    } else {
      w *= 1.35; // never seen → high information value
    }
    // 3 — difficulty fit (gaussian around target)
    const dGap = item.diff - target;
    w *= Math.exp(-(dGap * dGap) / 1.5);
    // 4 — recency penalty
    if (seen) {
      const hours = (now - seen.lastAt) / 3_600_000;
      w *= hours < 0.5 ? 0.05 : hours < 6 ? 0.25 : hours < 48 ? 0.6 : 1;
      if (seen.correct > 0 && seen.wrong === 0) w *= 0.75; // already mastered this exact item
    }
    // 5 — small deterministic jitter so sessions differ
    w *= 0.9 + rng() * 0.2;

    if (config.mode === "random") w = 1;
    if (config.mode === "weakest") w = (1 - mastery) * 10 + rng() * 0.01;

    return { item, weight: Math.max(w, 0.0001), topic: item.topic, diff: item.diff, seenAt: seen?.lastAt };
  });
}

/** Weighted sampling without replacement, with an interleaving penalty. */
export function chooseOrder(candidates: Candidate[], count: number, seed: number, mode: PracticeMode): Candidate[] {
  const rng = mulberry32(seed ^ 0x9e3779b9);
  const pool = candidates.slice();
  const chosen: Candidate[] = [];
  const topicUses = new Map<string, number>();

  if (mode === "sequential") {
    return pool.slice(0, count);
  }

  while (chosen.length < count && pool.length) {
    const weights = pool.map((c) => {
      const uses = topicUses.get(c.topic) ?? 0;
      // interleaving: penalise a topic that already appeared twice
      return c.weight * (uses === 0 ? 1.15 : uses === 1 ? 1 : uses === 2 ? 0.35 : 0.08);
    });
    const total = weights.reduce((a, b) => a + b, 0);
    if (total <= 0) break;
    let r = rng() * total;
    let idx = 0;
    for (let i = 0; i < pool.length; i++) {
      r -= weights[i];
      if (r <= 0) {
        idx = i;
        break;
      }
    }
    const [c] = pool.splice(idx, 1);
    chosen.push(c);
    topicUses.set(c.topic, (topicUses.get(c.topic) ?? 0) + 1);
  }
  return chosen;
}

export function buildSession(config: PracticeConfig, state: LearnerState, seedInput?: number): Session {
  const seed = seedInput ?? Math.floor(Math.random() * 0xffffffff);
  const rng: Rng = mulberry32(seed);
  const pool = buildCandidates(config, state);
  const scored = scoreCandidates(pool, config, state, seed);
  const ordered = chooseOrder(scored, config.count, seed, config.mode);
  const questions: SessionQuestion[] = ordered.map((c) => ({ item: c.item, prepared: prepare(c.item, rng) }));

  return {
    id: `s-${seed.toString(36)}-${Date.now().toString(36)}`,
    config,
    questions,
    startedAt: Date.now(),
  };
}

/* ============================================================
   Exam blueprints — fixed weightings that mirror the real tests.
   ============================================================ */

export interface BlueprintPart {
  label: string;
  topics: string[];
  count: number;
  formats?: QFormat[];
  notes?: string;
}
export interface Blueprint {
  id: string;
  subjectId: SubjectId;
  title: string;
  subtitle: string;
  minutes: number;
  passMark: number;
  parts: BlueprintPart[];
}

export const blueprints: Blueprint[] = [
  {
    id: "rac-mock",
    subjectId: "rac-l2",
    title: "RAC Level 2 theory mock",
    subtitle: "All five units · mixed formats · competency-style",
    minutes: 45,
    passMark: 80,
    parts: [
      { label: "Safety & environment", topics: ["rac-safety"], count: 6 },
      { label: "Fundamentals & refrigerants", topics: ["rac-thermo", "rac-refrigerants"], count: 6 },
      { label: "Compressors & electrical", topics: ["rac-compressors", "rac-electrical"], count: 6 },
      { label: "Components, tubing & charging", topics: ["rac-components", "rac-tubing"], count: 6 },
      { label: "Window & split service", topics: ["rac-window", "rac-split-service"], count: 6 },
      { label: "Installation & professional practice", topics: ["rac-split-install", "rac-team", "rac-assessment", "rac-orientation"], count: 6 },
    ],
  },
  {
    id: "ged-math-mock",
    subjectId: "ged-math",
    title: "GED Mathematical Reasoning simulation",
    subtitle: "46 items · calculator from item 23",
    minutes: 115,
    passMark: 60,
    parts: [
      { label: "Number & quantity (no calculator)", topics: ["gm-number"], count: 8 },
      { label: "Algebra & functions", topics: ["gm-algebra", "gm-functions"], count: 16 },
      { label: "Geometry & measurement", topics: ["gm-geometry"], count: 10 },
      { label: "Data, statistics & probability", topics: ["gm-data", "gm-stats", "gm-prob"], count: 8 },
      { label: "Percent & applied problems", topics: ["gm-percent"], count: 4 },
    ],
  },
  {
    id: "ged-rla-mock",
    subjectId: "ged-rla",
    title: "GED RLA simulation",
    subtitle: "Reading, language and the extended-response prompt",
    minutes: 150,
    passMark: 60,
    parts: [
      { label: "Informational reading", topics: ["gr-info"], count: 14 },
      { label: "Literary reading", topics: ["gr-lit"], count: 8 },
      { label: "Language conventions", topics: ["gr-lang"], count: 18 },
      { label: "Extended response technique", topics: ["gr-writing"], count: 6 },
    ],
  },
  {
    id: "ged-science-mock",
    subjectId: "ged-science",
    title: "GED Science simulation",
    subtitle: "Life, physical, Earth & space + practices",
    minutes: 90,
    passMark: 60,
    parts: [
      { label: "Science practices & data", topics: ["gs-practice"], count: 8 },
      { label: "Life science", topics: ["gs-cells", "gs-body", "gs-genetics", "gs-ecology"], count: 10 },
      { label: "Physical science", topics: ["gs-chem", "gs-physics"], count: 10 },
      { label: "Earth & space", topics: ["gs-earth", "gs-climate"], count: 6 },
    ],
  },
  {
    id: "ged-social-mock",
    subjectId: "ged-social",
    title: "GED Social Studies simulation",
    subtitle: "Civics, history, economics, geography",
    minutes: 70,
    passMark: 60,
    parts: [
      { label: "Civics & government", topics: ["gss-civics"], count: 14 },
      { label: "US history", topics: ["gss-history"], count: 7 },
      { label: "Economics", topics: ["gss-econ"], count: 5 },
      { label: "Geography & the world", topics: ["gss-geo"], count: 5 },
    ],
  },
];

export function buildExam(blueprint: Blueprint, state: LearnerState, seedInput?: number): Session {
  const seed = seedInput ?? Math.floor(Math.random() * 0xffffffff);
  const rng = mulberry32(seed);
  const questions: SessionQuestion[] = [];
  let offset = 0;

  for (const part of blueprint.parts) {
    const cfg: PracticeConfig = {
      subjectId: blueprint.subjectId,
      topics: part.topics,
      formats: part.formats ?? [],
      count: part.count,
      difficulty: "auto",
      mode: "adaptive",
      includeGenerated: true,
      secondsPerQuestion: 0,
    };
    const partState = { ...state };
    const pool = buildCandidates(cfg, partState);
    const scored = scoreCandidates(pool, cfg, partState, seed + offset++ * 7919);
    const ordered = chooseOrder(scored, part.count, seed + offset * 104729, "adaptive");
    for (const c of ordered) questions.push({ item: c.item, prepared: prepare(c.item, rng) });
  }

  return {
    id: `e-${seed.toString(36)}`,
    config: {
      subjectId: blueprint.subjectId,
      topics: blueprint.parts.flatMap((p) => p.topics),
      formats: [],
      count: questions.length,
      difficulty: "auto",
      mode: "adaptive",
      includeGenerated: true,
      secondsPerQuestion: 0,
      title: blueprint.title,
    },
    questions: shuffle(questions, mulberry32(seed ^ 0x1234)),
    startedAt: Date.now(),
    blueprint: blueprint.id,
  };
}

export const examById = Object.fromEntries(blueprints.map((b) => [b.id, b])) as Record<string, Blueprint>;

export function topicPoolSize(subject: SubjectId, topic: string): number {
  const stat = staticItems.filter((i) => i.subject === subject && i.topic === topic).length;
  const gens = (generatorsByTopic[topic] ?? []).length;
  return stat + gens * 50; // generators are effectively unbounded
}

export const subjectLabel = (id: SubjectId) => subjectById[id]?.short ?? id;
