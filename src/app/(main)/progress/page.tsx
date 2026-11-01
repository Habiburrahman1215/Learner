"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { subjects, topicLabel, topicsBySubject } from "@/content";
import { useApp } from "@/lib/store";
import { accuracy, BADGES, last7Days, levelInfo, subjectReadiness } from "@/lib/engine/progress-model";
import { overallReadiness, subjectStats } from "@/lib/derive";
import { Bar, Chip, cn, Empty, Icon, MasteryRadar, ProgressRing, SectionHeader, Sparkline, Stat } from "@/components/ui";

export default function ProgressPage() {
  const { learner } = useApp();
  const [tab, setTab] = useState<"overview" | "topics" | "exams" | "badges">("overview");

  const info = levelInfo(learner.xp);
  const week = last7Days(learner);
  const acc = accuracy(learner);
  const readiness = overallReadiness(learner);
  const radar = useMemo(
    () => subjects.map((s) => ({ label: s.short.split(" ")[0], value: subjectStats(learner, s).mastery })),
    [learner],
  );
  const weekXp = week.reduce((a, w) => a + w.xp, 0);

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-[24px] font-black tracking-tighter">Progress</h1>
          <p className="mt-1 text-[13px] text-ink-muted">Every number here is earned by answering.</p>
        </div>
        <Link href="/profile" className="btn-quiet text-[12.5px]">
          <Icon name="settings" className="h-4 w-4" />
        </Link>
      </header>

      <div className="card relative overflow-hidden p-5">
        <div className="pointer-events-none absolute inset-0 grid-veil opacity-25" />
        <div className="relative flex items-center gap-4">
          <ProgressRing value={readiness} size={84} stroke={8} tone="lime" label={<span className="text-[16px] font-black">{Math.round(readiness * 100)}%</span>} sub="ready" />
          <div className="flex-1">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint">Exam readiness</div>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
              {readiness >= 0.8
                ? "You are inside the pass band. Keep the streak alive and start booking mock exams under time."
                : readiness >= 0.5
                  ? "Solid base. The weak topics below are where the remaining marks live."
                  : readiness >= 0.2
                    ? "You are building. Cover the low-mastery topics before attempting full mocks."
                    : "Fresh start — read a lesson, then answer ten questions to get a real reading."}
            </p>
            <div className="mt-2 flex items-center gap-2 text-[11.5px] text-ink-faint">
              <span>{learner.stats.answers} answers</span>
              <span className="h-1 w-1 rounded-full bg-ink-faint/40" />
              <span>{learner.stats.sessions} sessions</span>
              <span className="h-1 w-1 rounded-full bg-ink-faint/40" />
              <span>{learner.stats.minutes} min studied</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rail">
        <Chip active={tab === "overview"} onClick={() => setTab("overview")}>Overview</Chip>
        <Chip active={tab === "topics"} onClick={() => setTab("topics")}>Topics</Chip>
        <Chip active={tab === "exams"} onClick={() => setTab("exams")}>Exams</Chip>
        <Chip active={tab === "badges"} onClick={() => setTab("badges")}>Badges</Chip>
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Level" value={info.level} icon="sparkles" tone="lime" hint={info.title} />
            <Stat label="XP" value={learner.xp} icon="bolt" tone="brand" hint={`${info.toNext} to next`} />
            <Stat label="Accuracy" value={`${Math.round(acc * 100)}%`} icon="target" tone="cyan" hint={`${learner.stats.correct} correct`} />
            <Stat label="Streak" value={`${learner.streak.current}d`} icon="flame" tone="amber" hint={`best ${learner.streak.best}d`} />
          </div>

          <div className="card p-4">
            <div className="section-title mb-2">Skill radar</div>
            <MasteryRadar values={radar} size={240} />
          </div>

          <div className="card p-4">
            <div className="flex items-baseline justify-between">
              <div className="section-title">This week</div>
              <span className="text-[11.5px] font-semibold tabular-nums text-accent-lime">+{weekXp} XP</span>
            </div>
            <Sparkline data={week.map((w) => w.xp)} className="mt-2" />
            <div className="mt-1.5 flex justify-between text-[10px] text-ink-faint">
              {week.map((w) => (
                <span key={w.day} className={cn(w.xp > 0 && "text-ink-muted")}>{w.day}</span>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <div className="section-title mb-3">Subject readiness</div>
            <div className="space-y-3">
              {subjects.map((s) => {
                const r = subjectReadiness(learner, (topicsBySubject[s.id] ?? []).map((t) => t.id));
                return (
                  <div key={s.id}>
                    <div className="mb-1 flex items-center justify-between text-[12px]">
                      <span className="flex items-center gap-1.5">
                        <Icon name={s.icon} className="h-3.5 w-3.5" style={{ color: s.hue }} />
                        {s.short}
                      </span>
                      <span className="tabular-nums text-ink-faint">{Math.round(r * 100)}%</span>
                    </div>
                    <Bar value={r} tone={r >= 0.8 ? "lime" : r >= 0.5 ? "amber" : "brand"} height={5} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {tab === "topics" && (
        <div className="space-y-4">
          {subjects.map((s) => {
            const topics = topicsBySubject[s.id] ?? [];
            return (
              <div key={s.id} className="card p-4">
                <div className="mb-2.5 flex items-center gap-2">
                  <Icon name={s.icon} className="h-4 w-4" style={{ color: s.hue }} />
                  <h3 className="text-[14px] font-semibold">{s.short}</h3>
                </div>
                <div className="space-y-2">
                  {topics.map((t) => {
                    const stat = learner.topics[t.id];
                    const m = stat?.mastery ?? 0;
                    return (
                      <div key={t.id}>
                        <div className="flex items-baseline justify-between gap-2 text-[11.5px]">
                          <span className={cn("truncate", m === 0 && "text-ink-faint")}>{t.label}</span>
                          <span className="shrink-0 tabular-nums text-ink-faint">
                            {stat?.attempts ? `${Math.round(m * 100)}% · ${stat.attempts}` : "—"}
                          </span>
                        </div>
                        <Bar value={m} tone={m >= 0.8 ? "lime" : m >= 0.5 ? "amber" : m > 0 ? "rose" : "brand"} height={3} className="mt-1" />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "exams" && (
        <div className="space-y-3">
          {learner.exams.length === 0 ? (
            <Empty icon="trophy" title="No mock exams yet" body="A timed mock is the only honest measure of readiness. Start with the RAC theory mock." />
          ) : (
            learner.exams.map((e) => (
              <div key={`${e.at}-${e.blueprint}`} className="card-flat p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-semibold">{e.title}</div>
                    <div className="mt-0.5 text-[11px] text-ink-faint">
                      {new Date(e.at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })} ·{" "}
                      {e.score}/{e.total} · {e.minutes} min
                    </div>
                  </div>
                  <div className={cn("text-[19px] font-black tabular-nums", e.percent >= 80 ? "text-accent-lime" : e.percent >= 60 ? "text-accent-amber" : "text-accent-rose")}>
                    {Math.round(e.percent)}%
                  </div>
                </div>
                <Bar value={e.percent / 100} tone={e.percent >= 80 ? "lime" : e.percent >= 60 ? "amber" : "rose"} height={3} className="mt-2" />
              </div>
            ))
          )}
          <Link href="/exam" className="btn-ghost w-full">Take a mock exam</Link>
        </div>
      )}

      {tab === "badges" && (
        <div className="space-y-2.5">
          {BADGES.map((b) => {
            const got = learner.badges.includes(b.id);
            return (
              <div key={b.id} className={cn("flex items-center gap-3 rounded-2xl border px-4 py-3", got ? "border-accent-lime/25 bg-accent-lime/[0.05]" : "border-line bg-surface-2/40")}>
                <span className={cn("text-[24px] leading-none", !got && "opacity-40 grayscale")}>{b.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-semibold">{b.name}</div>
                  <div className="text-[11.5px] text-ink-muted">{b.desc}</div>
                </div>
                {got ? (
                  <Icon name="check" className="h-4 w-4 shrink-0 text-accent-lime" />
                ) : (
                  <Icon name="lock" className="h-4 w-4 shrink-0 text-ink-faint" />
                )}
              </div>
            );
          })}
        </div>
      )}

      <p className="pb-2 text-center text-[11px] text-ink-faint">
        {learner.stats.answers > 0 ? "Mastery uses a Bayesian knowledge-tracing update per answer." : "No data yet."}
      </p>
    </div>
  );
}
