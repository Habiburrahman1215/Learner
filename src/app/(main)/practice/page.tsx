"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { subjects, subjectById, topicsBySubject } from "@/content";
import type { QFormat, SubjectId } from "@/content/types";
import { defaultPracticeConfig, type PracticeConfig } from "@/lib/engine/select";
import { generatorsByTopic } from "@/lib/engine/generators";
import { staticItems } from "@/content";
import { useApp } from "@/lib/store";
import { Bar, Chip, cn, Icon, Segmented, Sheet } from "@/components/ui";
import { topicLabel } from "@/content";

const FORMATS: { id: QFormat; label: string; icon: string }[] = [
  { id: "mcq", label: "Multiple choice", icon: "check" },
  { id: "multi", label: "Select all", icon: "layers" },
  { id: "tf", label: "True / false", icon: "target" },
  { id: "numeric", label: "Numeric", icon: "hash" },
  { id: "short", label: "Short answer", icon: "pen" },
  { id: "match", label: "Match pairs", icon: "cards" },
  { id: "order", label: "Put in order", icon: "chartBar" },
];

function PracticeBuilder() {
  const router = useRouter();
  const params = useSearchParams();
  const { learner } = useApp();
  const [cfg, setCfg] = useState<PracticeConfig>(defaultPracticeConfig);
  const [showFormats, setShowFormats] = useState(false);
  const [showTopics, setShowTopics] = useState(false);

  useEffect(() => {
    const subject = (params.get("subject") as SubjectId) || "rac-l2";
    const topic = params.get("topic");
    const count = Number(params.get("count") || 10);
    setCfg((c) => ({
      ...c,
      subjectId: subjects.some((s) => s.id === subject) ? subject : "rac-l2",
      topics: topic ? [topic] : [],
      count: Number.isFinite(count) ? Math.min(50, Math.max(3, count)) : 10,
    }));
  }, [params]);

  const subject = subjectById[cfg.subjectId];
  const topics = topicsBySubject[cfg.subjectId] ?? [];

  const availability = useMemo(() => {
    const pool = staticItems.filter((i) => i.subject === cfg.subjectId && (cfg.topics.length ? cfg.topics.includes(i.topic) : true));
    const gens = Object.values(generatorsByTopic)
      .flat()
      .filter((g) => g.subject === cfg.subjectId && (cfg.topics.length ? cfg.topics.includes(g.topic) : true));
    const formats = new Set<QFormat>(pool.map((p) => p.format));
    for (const g of gens) g.formats.forEach((f) => formats.add(f));
    return { staticCount: pool.length, generators: gens.length, formats };
  }, [cfg.subjectId, cfg.topics]);

  const start = () => {
    const config: PracticeConfig = {
      ...cfg,
      formats: cfg.formats.filter((f) => availability.formats.has(f)),
      title: "Practice session",
    };
    sessionStorage.setItem("hlz.session.config", JSON.stringify(config));
    router.push("/session");
  };

  const toggleTopic = (id: string) =>
    setCfg((c) => ({ ...c, topics: c.topics.includes(id) ? c.topics.filter((t) => t !== id) : [...c.topics, id] }));

  const toggleFormat = (f: QFormat) =>
    setCfg((c) => ({ ...c, formats: c.formats.includes(f) ? c.formats.filter((x) => x !== f) : [...c.formats, f] }));

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-[24px] font-black tracking-tighter">Build a practice session</h1>
        <p className="mt-1 text-[13px] text-ink-muted">
          Choose the subject, the topics, the formats and the size. The engine handles difficulty and ordering.
        </p>
      </header>

      {/* subject */}
      <section>
        <div className="section-title mb-2">Subject</div>
        <div className="rail">
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setCfg((c) => ({ ...c, subjectId: s.id, topics: [] }))}
              className={cn(
                "flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-[12.5px] font-semibold transition-colors",
                cfg.subjectId === s.id ? "border-brand-400/50 bg-brand-500/12 text-white" : "border-line bg-surface-2/50 text-ink-muted",
              )}
            >
              <Icon name={s.icon} className="h-4 w-4" style={{ color: s.hue }} />
              {s.short}
            </button>
          ))}
        </div>
      </section>

      {/* topics */}
      <section className="card p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13.5px] font-semibold">Topics</div>
            <p className="text-[11.5px] text-ink-faint">
              {cfg.topics.length ? `${cfg.topics.length} selected` : "All topics in this subject"}
            </p>
          </div>
          <button className="btn-quiet text-[12px] font-semibold text-brand-300" onClick={() => setShowTopics(true)}>
            Choose
          </button>
        </div>
        {cfg.topics.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {cfg.topics.map((t) => (
              <button
                key={t}
                onClick={() => toggleTopic(t)}
                className="flex items-center gap-1 rounded-full border border-brand-400/40 bg-brand-500/10 px-2.5 py-1 text-[11px] font-medium text-brand-200"
              >
                {topicLabel(t)}
                <Icon name="x" className="h-3 w-3" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* formats */}
      <section className="card p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13.5px] font-semibold">Question formats</div>
            <p className="text-[11.5px] text-ink-faint">
              {cfg.formats.length ? cfg.formats.map((f) => FORMATS.find((x) => x.id === f)?.label).join(" · ") : "Any format available"}
            </p>
          </div>
          <button className="btn-quiet text-[12px] font-semibold text-brand-300" onClick={() => setShowFormats(true)}>
            Choose
          </button>
        </div>
      </section>

      {/* count */}
      <section className="card p-4">
        <div className="flex items-baseline justify-between">
          <div className="text-[13.5px] font-semibold">Number of questions</div>
          <span className="text-[17px] font-black tabular-nums text-accent-lime">{cfg.count}</span>
        </div>
        <input
          type="range"
          min={3}
          max={50}
          step={1}
          value={cfg.count}
          onChange={(e) => setCfg((c) => ({ ...c, count: Number(e.target.value) }))}
          className="mt-3 w-full accent-[#B7F25C]"
        />
        <div className="mt-1 flex justify-between text-[10.5px] text-ink-faint">
          <span>3 · quick</span>
          <span>15 · focused</span>
          <span>50 · endurance</span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {[5, 10, 20, 30].map((n) => (
            <Chip key={n} active={cfg.count === n} onClick={() => setCfg((c) => ({ ...c, count: n }))} tone="lime">
              {n}
            </Chip>
          ))}
        </div>
      </section>

      {/* difficulty */}
      <section className="card p-4">
        <div className="mb-2 text-[13.5px] font-semibold">Difficulty</div>
        <Segmented
          value={cfg.difficulty === "auto" ? "auto" : String(cfg.difficulty)}
          onChange={(v) => setCfg((c) => ({ ...c, difficulty: v === "auto" ? "auto" : (Number(v) as 1 | 2 | 3 | 4 | 5) }))}
          options={[
            { value: "auto", label: "Adaptive" },
            { value: "2", label: "Easy" },
            { value: "3", label: "Medium" },
            { value: "5", label: "Hard" },
          ]}
          size="sm"
        />
        <p className="mt-2 text-[11.5px] leading-relaxed text-ink-faint">
          {cfg.difficulty === "auto"
            ? "Adaptive targets the band where you learn fastest — roughly 70–85 % success."
            : "A fixed difficulty is useful for exam-condition practice."}
        </p>
      </section>

      {/* mode + timer */}
      <section className="card space-y-3 p-4">
        <div>
          <div className="mb-2 text-[13.5px] font-semibold">Selection mode</div>
          <Segmented
            value={cfg.mode}
            onChange={(v) => setCfg((c) => ({ ...c, mode: v }))}
            options={[
              { value: "adaptive", label: "Adaptive" },
              { value: "weakest", label: "Weakest" },
              { value: "random", label: "Random" },
            ]}
            size="sm"
          />
        </div>
        <div className="flex items-center justify-between border-t border-line pt-3">
          <div>
            <div className="text-[13px] font-semibold">Include generated questions</div>
            <p className="text-[11.5px] text-ink-faint">Parametric variants with computed answers</p>
          </div>
          <button
            onClick={() => setCfg((c) => ({ ...c, includeGenerated: !c.includeGenerated }))}
            className={cn("relative h-6 w-11 rounded-full transition-colors", cfg.includeGenerated ? "bg-accent-lime" : "bg-surface-3")}
            aria-pressed={cfg.includeGenerated}
          >
            <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all", cfg.includeGenerated ? "left-[1.375rem]" : "left-0.5")} />
          </button>
        </div>
      </section>

      {/* availability */}
      <div className="card-flat flex items-center gap-2.5 px-3.5 py-2.5 text-[11.5px] text-ink-muted">
        <Icon name="sparkles" className="h-4 w-4 shrink-0 text-accent-lime" />
        <span>
          {availability.staticCount} written items + {availability.generators} generators available
          {cfg.topics.length ? " for the selected topics" : ""}.
        </span>
      </div>

      <button className="btn-primary sticky bottom-[5.6rem] z-20 w-full lg:bottom-4" onClick={start}>
        <Icon name="play" className="h-4 w-4" /> Start {cfg.count} questions
      </button>

      {/* topic sheet */}
      <Sheet open={showTopics} onClose={() => setShowTopics(false)} title={`${subject.short} topics`}>
        <div className="space-y-1.5">
          <button
            onClick={() => setCfg((c) => ({ ...c, topics: [] }))}
            className={cn(
              "flex w-full items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[13px]",
              cfg.topics.length === 0 ? "border-brand-400/50 bg-brand-500/12 text-white" : "border-line text-ink-muted",
            )}
          >
            All topics
            {cfg.topics.length === 0 && <Icon name="check" className="ml-auto h-4 w-4 text-accent-lime" />}
          </button>
          {topics.map((t) => {
            const m = learner.topics[t.id]?.mastery ?? 0;
            const active = cfg.topics.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => toggleTopic(t.id)}
                className={cn(
                  "w-full rounded-xl border px-3.5 py-2.5 text-left transition-colors",
                  active ? "border-brand-400/50 bg-brand-500/12" : "border-line",
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium">{t.label}</span>
                  {active && <Icon name="check" className="ml-auto h-4 w-4 text-accent-lime" />}
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <Bar value={m} tone={m >= 0.7 ? "lime" : m >= 0.35 ? "amber" : "rose"} height={3} />
                  <span className="shrink-0 text-[10px] tabular-nums text-ink-faint">{Math.round(m * 100)}%</span>
                </div>
              </button>
            );
          })}
        </div>
      </Sheet>

      {/* format sheet */}
      <Sheet open={showFormats} onClose={() => setShowFormats(false)} title="Question formats">
        <p className="mb-3 text-[12px] text-ink-faint">Selecting none means the engine chooses freely.</p>
        <div className="space-y-1.5">
          {FORMATS.map((f) => {
            const available = availability.formats.has(f.id);
            const active = cfg.formats.includes(f.id);
            return (
              <button
                key={f.id}
                disabled={!available}
                onClick={() => toggleFormat(f.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-[13px] transition-colors",
                  active ? "border-brand-400/50 bg-brand-500/12 text-white" : "border-line text-ink-muted",
                  !available && "opacity-35",
                )}
              >
                <Icon name={f.icon} className="h-4 w-4" />
                {f.label}
                {active && <Icon name="check" className="ml-auto h-4 w-4 text-accent-lime" />}
                {!available && <span className="ml-auto text-[10px]">none available</span>}
              </button>
            );
          })}
        </div>
      </Sheet>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="skeleton h-64 w-full" />}>
      <PracticeBuilder />
    </Suspense>
  );
}
