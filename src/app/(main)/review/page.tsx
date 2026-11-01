"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { staticItems, topicLabel, lessonById, subjectById } from "@/content";
import type { Item } from "@/content/types";
import { dueCards, type LearnerState } from "@/lib/engine/progress-model";
import { defaultPracticeConfig, type Session } from "@/lib/engine/select";
import { mulberry32, prepare } from "@/lib/engine/core";
import { getCachedItem } from "@/lib/item-cache";
import { useApp } from "@/lib/store";
import { QuestionRunner, ResultSummary, type QuestionResult } from "@/components/QuestionRunner";
import { cn, Icon, SectionHeader, Stat } from "@/components/ui";

const byId = new Map<string, Item>();
for (const it of staticItems) if (!byId.has(it.id)) byId.set(it.id, it);

function resolve(cards: { id: string }[]): Item[] {
  return cards
    .map((c) => byId.get(c.id) ?? getCachedItem(c.id))
    .filter((x): x is Item => Boolean(x));
}

export default function ReviewPage() {
  const { learner, toast } = useApp();
  const [session, setSession] = useState<Session | null>(null);
  const [results, setResults] = useState<QuestionResult[] | null>(null);
  const [seconds, setSeconds] = useState(0);

  const due = useMemo(() => dueCards(learner, 60), [learner]);
  const items = useMemo(() => resolve(due), [due]);
  const allCards = Object.keys(learner.srs).length;
  const learning = Object.values(learner.srs).filter((c) => c.interval < 1).length;

  const start = () => {
    if (!items.length) {
      toast({ title: "Nothing to review yet", body: "Practise first — cards appear as you answer.", tone: "default" });
      return;
    }
    const rng = mulberry32(Date.now() & 0xffffffff);
    setResults(null);
    setSession({
      id: `review-${Date.now()}`,
      config: { ...defaultPracticeConfig, count: items.length, topics: [] },
      questions: items.map((item) => ({ item, prepared: prepare(item, rng) })),
      startedAt: Date.now(),
    });
  };

  if (results) {
    return (
      <ResultSummary
        session={session!}
        results={results}
        seconds={seconds}
        title="Review complete"
        onRestart={() => {
          setResults(null);
          setSession(null);
        }}
      />
    );
  }

  if (session) {
    return (
      <QuestionRunner
        key={session.id}
        session={session}
        mode="review"
        onFinish={(res, meta) => {
          setResults(res);
          setSeconds(meta.seconds);
        }}
        onExit={() => setSession(null)}
      />
    );
  }

  const upcoming = Object.values(learner.srs)
    .filter((c) => c.due > Date.now())
    .sort((a, b) => a.due - b.due)
    .slice(0, 8);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-[24px] font-black tracking-tighter">Review queue</h1>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
          Spaced repetition, tuned per item. Wrong answers come back in half an hour; solid ones wait days.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-2">
        <Stat label="Due now" value={String(items.length)} icon="clock" tone={items.length ? "lime" : "brand"} />
        <Stat label="Learning" value={String(learning)} icon="cards" tone="amber" />
        <Stat label="Tracked" value={String(allCards)} icon="layers" tone="cyan" />
      </div>

      <div className="card relative overflow-hidden p-5 text-center">
        <div className="pointer-events-none absolute inset-0 grid-veil opacity-30" />
        <div className="relative">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/12 text-brand-300">
            <Icon name="cards" className="h-7 w-7" />
          </div>
          <h2 className="mt-3 text-[17px] font-semibold">
            {items.length ? `${items.length} card${items.length === 1 ? "" : "s"} ready` : "Queue is empty"}
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-[12.5px] leading-relaxed text-ink-muted">
            {items.length
              ? "These are the items the scheduler thinks you are about to forget. Ten focused minutes here is worth an hour of re-reading."
              : "Answer practice questions and the scheduler starts tracking what needs another look — no setup required."}
          </p>
          {items.length ? (
            <button onClick={start} className="btn-primary mt-4">
              <Icon name="play" className="h-4 w-4" /> Review {items.length} now
            </button>
          ) : (
            <Link href="/practice" className="btn-primary mt-4">
              <Icon name="target" className="h-4 w-4" /> Practise instead
            </Link>
          )}
        </div>
      </div>

      {items.length > 0 && (
        <section>
          <SectionHeader title="In this batch" sub="Mixed topics by design" />
          <div className="space-y-1.5">
            {items.slice(0, 8).map((it) => (
              <div key={it.id} className="card-flat flex items-center gap-2.5 px-3.5 py-2.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-surface-3 text-[9.5px] font-bold uppercase text-brand-300">
                  {it.format.slice(0, 2)}
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] text-ink-muted">{topicLabel(it.topic)}</span>
                <span className="shrink-0 text-[10px] text-ink-faint">d{it.diff}</span>
              </div>
            ))}
            {items.length > 8 && <p className="px-1 text-[11.5px] text-ink-faint">+ {items.length - 8} more in this session</p>}
          </div>
        </section>
      )}

      {learner.bookmarks.length > 0 && (
        <section>
          <SectionHeader title="Saved" sub="Bookmarked lessons and questions" />
          <div className="space-y-1.5">
            {learner.bookmarks.slice(0, 10).map((id) => {
              const lesson = lessonById[id];
              const item = lesson ? null : byId.get(id) ?? getCachedItem(id);
              if (!lesson && !item) return null;
              const href = lesson ? `/lesson/${lesson.id}` : "/practice";
              const title = lesson ? lesson.title : item!.q;
              const meta = lesson ? subjectById[lesson.subject].short : topicLabel(item!.topic);
              return (
                <Link key={id} href={href} className="card-flat flex items-center gap-2.5 px-3.5 py-2.5">
                  <Icon name="star" className="h-3.5 w-3.5 shrink-0 text-accent-amber" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[12.5px] font-medium">{title}</div>
                    <div className="text-[10.5px] text-ink-faint">{meta}</div>
                  </div>
                  <Icon name="chevron" className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section>
          <SectionHeader title="Coming up" sub="Scheduled revivals" />
          <div className="space-y-1.5">
            {upcoming.map((c) => {
              const hours = Math.max(0, (c.due - Date.now()) / 3_600_000);
              return (
                <div key={c.id} className="flex items-center gap-2.5 px-1 py-1 text-[12px]">
                  <span className={cn("h-1.5 w-1.5 rounded-full", c.interval >= 7 ? "bg-accent-lime" : "bg-accent-amber")} />
                  <span className="flex-1 truncate text-ink-muted">{topicLabel(byId.get(c.id)?.topic ?? "—")}</span>
                  <span className="tabular-nums text-ink-faint">
                    {hours < 24 ? `in ${Math.max(1, Math.round(hours))}h` : `in ${Math.round(c.interval)}d`}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
