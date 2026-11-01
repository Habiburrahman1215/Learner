"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { subjectById, topicsBySubject } from "@/content";
import type { SubjectId } from "@/content/types";
import { useApp } from "@/lib/store";
import { masteryBand, subjectStats } from "@/lib/derive";
import { Bar, cn, Icon, ProgressRing } from "@/components/ui";
import { blueprints } from "@/lib/engine/select";

export default function SubjectPage() {
  const params = useParams<{ subject: string }>();
  const { learner } = useApp();
  const subject = subjectById[params.subject as SubjectId];

  if (!subject) {
    return (
      <div className="card p-6 text-center">
        <p className="text-[15px] font-semibold">Subject not found</p>
        <Link href="/learn" className="btn-ghost mt-3 inline-flex">Back to library</Link>
      </div>
    );
  }

  const st = subjectStats(learner, subject);
  const blueprint = blueprints.find((b) => b.subjectId === subject.id);
  const topics = topicsBySubject[subject.id] ?? [];

  return (
    <div className="space-y-5">
      <Link href="/learn" className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-muted hover:text-ink">
        <Icon name="arrowLeft" className="h-4 w-4" /> Library
      </Link>

      <header className="card relative overflow-hidden p-5">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-25 blur-3xl" style={{ background: subject.hue }} />
        <div className="relative flex items-start gap-4">
          <span
            className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/5"
            style={{ background: `linear-gradient(140deg, ${subject.hue}30, ${subject.hue2}12)`, color: subject.hue }}
          >
            <Icon name={subject.icon} className="h-7 w-7" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-[20px] font-black leading-tight tracking-tighter">{subject.title}</h1>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: subject.hue }}>
              {subject.tagline}
            </p>
          </div>
          <ProgressRing value={st.mastery} size={56} stroke={5} tone="lime" sub="mastery" />
        </div>
        <p className="relative mt-3 text-[13px] leading-relaxed text-ink-muted">{subject.description}</p>
        <div className="relative mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-line bg-surface-2/60 px-2.5 py-1 text-[10.5px] font-semibold text-ink-muted">
            {subject.exam.label}
          </span>
          <span className="rounded-full border border-line bg-surface-2/60 px-2.5 py-1 text-[10.5px] font-semibold text-ink-muted">
            {subject.exam.items}
          </span>
          <span className="rounded-full border border-line bg-surface-2/60 px-2.5 py-1 text-[10.5px] font-semibold text-ink-muted">
            {subject.exam.pass}
          </span>
        </div>
        <div className="relative mt-4 flex gap-2">
          <Link href={`/practice?subject=${subject.id}`} className="btn-primary flex-1 !py-2.5 text-[13px]">
            <Icon name="target" className="h-4 w-4" /> Practise
          </Link>
          {blueprint && (
            <Link href={`/exam/run?blueprint=${blueprint.id}`} className="btn-ghost flex-1 !py-2.5 text-[13px]">
              <Icon name="trophy" className="h-4 w-4" /> Mock
            </Link>
          )}
        </div>
      </header>

      <section>
        <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">Topic mastery</h2>
        <div className="grid grid-cols-2 gap-1.5">
          {topics.map((t) => {
            const m = learner.topics[t.id]?.mastery ?? 0;
            const band = masteryBand(m);
            return (
              <div key={t.id} className="card-flat px-3 py-2.5">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="truncate text-[11.5px] font-medium">{t.label}</span>
                  <span className="shrink-0 text-[10px] tabular-nums text-ink-faint">{Math.round(m * 100)}%</span>
                </div>
                <Bar value={m} tone={band.tone === "brand" ? "brand" : band.tone} height={3} className="mt-1.5" />
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">Modules</h2>
        {subject.modules.map((m, i) => {
          const mStat = learner.topics[m.id];
          return (
            <div key={m.id} className="card overflow-hidden">
              <div className="flex items-start gap-3 p-4">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-3 text-[11px] font-bold tabular-nums text-brand-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[14.5px] font-semibold leading-snug tracking-tight">{m.title}</h3>
                  {m.code && <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">{m.code}</p>}
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">{m.summary}</p>
                  {mStat && (
                    <div className="mt-2 flex items-center gap-2">
                      <Bar value={mStat.mastery} tone={mStat.mastery >= 0.7 ? "lime" : mStat.mastery >= 0.35 ? "amber" : "rose"} height={3} />
                      <span className="shrink-0 text-[10px] tabular-nums text-ink-faint">{Math.round(mStat.mastery * 100)}%</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="divide-y divide-line border-t border-line">
                {m.lessons.map((l) => (
                  <Link key={l.id} href={`/lesson/${l.id}`} className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-surface-2/40">
                    <Icon name="book" className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
                    <span className="flex-1 truncate text-[12.5px]">{l.title}</span>
                    <span className="shrink-0 text-[10.5px] tabular-nums text-ink-faint">{l.minutes}m</span>
                    <Icon name="chevron" className={cn("h-3.5 w-3.5 shrink-0 text-ink-faint")} />
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
