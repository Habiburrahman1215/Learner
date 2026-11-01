"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { subjects, topicLabel } from "@/content";
import { useApp, useDisplayName } from "@/lib/store";
import { last7Days, levelInfo, BADGES } from "@/lib/engine/progress-model";
import { overallReadiness, recommendedLesson, reviewQueueSize, subjectStats, weakTopics } from "@/lib/derive";
import { Bar, cn, Icon, Inline, ProgressRing, SectionHeader, Sparkline, Stat } from "@/components/ui";

export default function DashboardPage() {
  const { learner, user, online } = useApp();
  const name = useDisplayName();
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 5 ? "Still up" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);

  const info = levelInfo(learner.xp);
  const readiness = overallReadiness(learner);
  const next = recommendedLesson(learner);
  const due = reviewQueueSize(learner);
  const week = last7Days(learner);
  const weak = weakTopics(learner, 3);
  const accuracy = learner.stats.answers ? learner.stats.correct / learner.stats.answers : 0;
  const quests = learner.quests.items;

  return (
    <div className="space-y-5">
      {/* hero */}
      <section className="card relative overflow-hidden p-5">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 grid-veil opacity-30" />
        <div className="relative flex items-center gap-4">
          <ProgressRing
            value={info.progress}
            size={74}
            stroke={7}
            tone="lime"
            label={<span className="text-[15px] font-black">{info.level}</span>}
            sub="level"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{greeting}</p>
            <h1 className="truncate text-[22px] font-black tracking-tighter">{name}</h1>
            <p className="mt-0.5 text-[12.5px] text-ink-muted">
              {info.title} · {learner.xp} XP · {info.toNext} XP to level {info.level + 1}
            </p>
          </div>
        </div>

        <div className="relative mt-4 grid grid-cols-3 gap-2">
          <Stat label="Streak" value={`${learner.streak.current}d`} icon="flame" tone="amber" hint={`best ${learner.streak.best}d`} />
          <Stat label="Accuracy" value={`${Math.round(accuracy * 100)}%`} icon="target" tone="cyan" hint={`${learner.stats.answers} answers`} />
          <Stat label="Ready" value={`${Math.round(readiness * 100)}%`} icon="sparkles" tone="lime" hint="across 5 subjects" />
        </div>
      </section>

      {/* continue */}
      {next && (
        <section>
          <SectionHeader
            title="Continue learning"
            sub={next.mastery < 0.05 ? "The best next lesson for you" : "Your weakest topic right now"}
            action={
              <Link href="/learn" className="text-[12.5px] font-semibold text-brand-300">
                All lessons
              </Link>
            }
          />
          <Link href={`/lesson/${next.lesson.id}`} className="card group block overflow-hidden p-0">
            <div className="flex items-stretch">
              <div
                className="w-1.5 shrink-0"
                style={{ background: `linear-gradient(180deg, ${next.subject.hue}, ${next.subject.hue2})` }}
              />
              <div className="flex-1 p-4">
                <div className="flex items-center gap-2">
                  <span className="brand-chip !py-0.5 !text-[10px]">{next.subject.short}</span>
                  <span className="text-[11px] text-ink-faint">{next.lesson.minutes} min read</span>
                  <span className="ml-auto text-[11px] font-semibold tabular-nums text-ink-faint">
                    {Math.round(next.mastery * 100)}% mastery
                  </span>
                </div>
                <h3 className="mt-1.5 text-[15.5px] font-semibold leading-snug tracking-tight">{next.lesson.title}</h3>
                {next.lesson.subtitle && <p className="mt-0.5 line-clamp-2 text-[12.5px] text-ink-muted">{next.lesson.subtitle}</p>}
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="btn-primary !px-3.5 !py-2 text-[12.5px]">
                    Read lesson <Icon name="arrowRight" className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[11px] text-ink-faint">{next.lesson.blocks.length} sections</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* quests */}
      <section>
        <SectionHeader title="Daily quests" sub="Resets at midnight — small, winnable, repeatable" action={<span className="accent-pill">{quests.filter((q) => q.progress >= q.target).length}/{quests.length}</span>} />
        <div className="space-y-2">
          {quests.map((q) => {
            const done = q.progress >= q.target;
            return (
              <div key={q.id} className={cn("card-flat flex items-center gap-3 px-3.5 py-3", done && "border-accent-lime/30 bg-accent-lime/[0.05]")}>
                <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-xl", done ? "bg-accent-lime/15 text-accent-lime" : "bg-surface-3 text-ink-muted")}>
                  <Icon name={done ? "check" : "target"} className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className={cn("truncate text-[13px] font-medium", done && "text-ink-muted line-through")}>{q.label}</span>
                    <span className="shrink-0 text-[11px] font-bold tabular-nums text-accent-lime">+{q.xp}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Bar value={q.progress / q.target} tone={done ? "lime" : "brand"} height={4} />
                    <span className="shrink-0 text-[10.5px] tabular-nums text-ink-faint">
                      {q.progress}/{q.target}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* quick actions */}
      <section className="grid grid-cols-2 gap-2">
        <Link href="/practice" className="card tap group p-4">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-lime/12 text-accent-lime">
            <Icon name="target" className="h-5 w-5" />
          </span>
          <h3 className="mt-2.5 text-[14px] font-semibold">Practice</h3>
          <p className="text-[11.5px] leading-snug text-ink-muted">Adaptive sets, any format, any count</p>
        </Link>
        <Link href="/review" className="card tap group p-4">
          <div className="flex items-start justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/12 text-brand-300">
              <Icon name="cards" className="h-5 w-5" />
            </span>
            {due > 0 && <span className="accent-pill">{due}</span>}
          </div>
          <h3 className="mt-2.5 text-[14px] font-semibold">Review</h3>
          <p className="text-[11.5px] leading-snug text-ink-muted">{due > 0 ? `${due} cards due now` : "Nothing due — come back later"}</p>
        </Link>
        <Link href="/exam" className="card tap p-4">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-amber/12 text-accent-amber">
            <Icon name="trophy" className="h-5 w-5" />
          </span>
          <h3 className="mt-2.5 text-[14px] font-semibold">Mock exam</h3>
          <p className="text-[11.5px] leading-snug text-ink-muted">Five full simulations</p>
        </Link>
        <Link href="/progress" className="card tap p-4">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-cyan/12 text-accent-cyan">
            <Icon name="chartBar" className="h-5 w-5" />
          </span>
          <h3 className="mt-2.5 text-[14px] font-semibold">Progress</h3>
          <p className="text-[11.5px] leading-snug text-ink-muted">Mastery, history, exam scores</p>
        </Link>
      </section>

      {/* subjects */}
      <section>
        <SectionHeader title="Your five subjects" sub="Mastery is earned per topic, not per subject" action={<Link href="/learn" className="text-[12.5px] font-semibold text-brand-300">Browse</Link>} />
        <div className="space-y-2">
          {subjects.map((s) => {
            const st = subjectStats(learner, s);
            return (
              <Link key={s.id} href={`/learn/${s.id}`} className="card-flat flex items-center gap-3 px-3.5 py-3">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/5"
                  style={{ background: `linear-gradient(140deg, ${s.hue}25, ${s.hue2}10)`, color: s.hue }}
                >
                  <Icon name={s.icon} className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[13.5px] font-medium">{s.short}</span>
                    <span className="shrink-0 text-[11px] tabular-nums text-ink-faint">{Math.round(st.mastery * 100)}%</span>
                  </div>
                  <Bar value={st.mastery} tone={st.mastery >= 0.7 ? "lime" : st.mastery >= 0.35 ? "amber" : "brand"} height={4} className="mt-1.5" />
                </div>
                <Icon name="chevron" className="h-4 w-4 shrink-0 text-ink-faint" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* week + weak */}
      <section className="grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <div className="section-title mb-1">Last 7 days</div>
          <Sparkline data={week.map((w) => w.xp)} />
          <div className="mt-2 flex justify-between text-[10px] text-ink-faint">
            {week.map((w) => (
              <span key={w.day}>{w.day}</span>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <div className="section-title mb-2">Weakest topics</div>
          {weak.length ? (
            <div className="space-y-2">
              {weak.map((w) => (
                <div key={w.topic}>
                  <div className="mb-1 flex justify-between text-[11.5px]">
                    <span className="truncate">{topicLabel(w.topic)}</span>
                    <span className="tabular-nums text-ink-faint">{Math.round(w.mastery * 100)}%</span>
                  </div>
                  <Bar value={w.mastery} tone="rose" height={4} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[12.5px] leading-relaxed text-ink-muted">
              Nothing measured yet. Answer a few questions and this fills in.
            </p>
          )}
        </div>
      </section>

      {/* badges */}
      <section>
        <SectionHeader title="Badges" sub={`${learner.badges.length} of ${BADGES.length} unlocked`} />
        <div className="rail">
          {BADGES.map((b) => {
            const got = learner.badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={cn(
                  "flex w-[92px] flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-center",
                  got ? "border-accent-lime/25 bg-accent-lime/[0.06]" : "border-line bg-surface-2/40 opacity-55",
                )}
                title={b.desc}
              >
                <span className="text-[20px] leading-none">{b.icon}</span>
                <span className="text-[10.5px] font-semibold leading-tight">{b.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* account nudge */}
      {!user && (
        <section className="card border-brand-500/25 bg-brand-900/20 p-4">
          <div className="flex items-start gap-3">
            <Icon name="lock" className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
            <div className="flex-1">
              <h3 className="text-[14px] font-semibold">You are studying as a guest</h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">
                Everything works, but progress lives only on this device. Create a profile to keep it safe and sync
                across your phone and laptop.
              </p>
              <div className="mt-3 flex gap-2">
                <Link href="/auth/signup" className="btn-brand !px-3.5 !py-2 text-[12.5px]">
                  Create profile
                </Link>
                <Link href="/auth/login" className="btn-ghost !px-3.5 !py-2 text-[12.5px]">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <p className="pb-2 text-center text-[11px] text-ink-faint">
        {online ? (user ? "Synced to your profile" : "Local mode · online") : "Offline · all progress saved on device"}
      </p>
    </div>
  );
}
