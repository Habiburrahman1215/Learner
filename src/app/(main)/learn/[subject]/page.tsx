"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { subjectById, topicsBySubject } from "@/content";
import type { SubjectId } from "@/content/types";
import { useApp } from "@/lib/store";
import { masteryBand, subjectStats } from "@/lib/derive";
import { Bar, Icon, ProgressRing } from "@/components/ui";
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
  const lessons = subject.modules.flatMap((m) => m.lessons);
  const nextLesson = lessons.find((l) => !learner.readLessons.includes(l.id)) ?? lessons[0];
  const completedLessons = lessons.filter((l) => learner.readLessons.includes(l.id)).length;

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
        <div className="relative mt-4 rounded-2xl border border-accent-lime/25 bg-accent-lime/[0.06] p-3.5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-lime">Learn at your pace</div>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
            Read the lessons in order, understand the foundations, then use practice and mock exams to check your progress. {completedLessons} of {lessons.length} lessons completed.
          </p>
          {nextLesson && (
            <Link href={`/lesson/${nextLesson.id}`} className="btn-primary mt-3 w-full !py-3 text-[14px]">
              <Icon name="book" className="h-4 w-4" /> {completedLessons ? "Continue learning" : "Start with lesson one"}
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          )}
        </div>
        <div className="relative mt-3 grid grid-cols-2 gap-2">
          <Link href={`/practice?subject=${subject.id}`} className="btn-ghost !py-3 text-[13px]">
            <Icon name="target" className="h-4 w-4" /> Practice
          </Link>
          {blueprint && (
            <Link href={`/exam/run?blueprint=${blueprint.id}`} className="btn-ghost !py-3 text-[13px]">
              <Icon name="trophy" className="h-4 w-4" /> Mock exam
            </Link>
          )}
        </div>
      </header>

      <section className="space-y-2">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-[16px] font-bold tracking-tight text-ink">Course curriculum</h2>
          <span className="text-[12px] text-ink-muted">{subject.modules.length} units · {lessons.length} lessons</span>
        </div>
        <p className="text-[13px] leading-relaxed text-ink-muted">Follow the numbered units from the beginning. Every lesson is available offline and includes explanations, worked examples, and a practice link.</p>
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
                  <p className="mt-1 text-[11.5px] font-medium text-ink-muted">
                    {m.hours ? `${m.hours} nominal hours · ` : ""}{m.lessons.length} lessons
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{m.summary}</p>
                  {mStat && (
                    <div className="mt-2 flex items-center gap-2">
                      <Bar value={mStat.mastery} tone={mStat.mastery >= 0.7 ? "lime" : mStat.mastery >= 0.35 ? "amber" : "rose"} height={3} />
                      <span className="shrink-0 text-[10px] tabular-nums text-ink-faint">{Math.round(mStat.mastery * 100)}%</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="divide-y divide-line border-t border-line">
                {m.lessons.map((l, lessonIndex) => {
                  const complete = learner.readLessons.includes(l.id);
                  return (
                    <Link key={l.id} href={`/lesson/${l.id}`} className="flex min-h-14 items-center gap-3 px-4 py-3 hover:bg-surface-2/40 focus-visible:bg-surface-2/60">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-3 text-[11px] font-semibold tabular-nums text-ink-muted">
                        {complete ? <Icon name="check" className="h-3.5 w-3.5 text-accent-lime" /> : lessonIndex + 1}
                      </span>
                      <span className="min-w-0 flex-1 text-[14px] leading-snug">{l.title}</span>
                      <span className="shrink-0 text-[11px] tabular-nums text-ink-muted">{l.minutes} min</span>
                      <Icon name="chevron" className="h-4 w-4 shrink-0 text-ink-faint" />
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <details className="card-flat p-4">
        <summary className="cursor-pointer list-none text-[15px] font-semibold">See topic mastery</summary>
        <p className="mt-1 text-[12.5px] text-ink-muted">Mastery is estimated from your practice answers and updates as you learn.</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {topics.map((t) => {
            const m = learner.topics[t.id]?.mastery ?? 0;
            const band = masteryBand(m);
            return (
              <div key={t.id} className="card-flat px-3 py-2.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="min-w-0 text-[13px] font-medium leading-snug">{t.label}</span>
                  <span className="shrink-0 text-[11px] tabular-nums text-ink-muted">{Math.round(m * 100)}%</span>
                </div>
                <Bar value={m} tone={band.tone === "brand" ? "brand" : band.tone} height={4} className="mt-2" />
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}
