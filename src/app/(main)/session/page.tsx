"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { buildSession, defaultPracticeConfig, type PracticeConfig, type Session } from "@/lib/engine/select";
import { QuestionRunner, ResultSummary, type QuestionResult } from "@/components/QuestionRunner";
import { useApp } from "@/lib/store";
import { cacheItems } from "@/lib/item-cache";
import Link from "next/link";
import { Icon } from "@/components/ui";

export default function SessionPage() {
  const router = useRouter();
  const { learner, patch, addStudyMinutes, toast } = useApp();
  const [config, setConfig] = useState<PracticeConfig | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [results, setResults] = useState<QuestionResult[] | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [seedFlip, setSeedFlip] = useState(0);

  useEffect(() => {
    const raw = sessionStorage.getItem("hlz.session.config");
    const cfg = raw ? (JSON.parse(raw) as PracticeConfig) : defaultPracticeConfig;
    setConfig(cfg);
    setSession(buildSession(cfg, learner));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedFlip]);

  const finish = useCallback(
    (res: QuestionResult[], meta: { seconds: number }) => {
      cacheItems(res.map((r) => r.item));
      setResults(res);
      setSeconds(meta.seconds);
      patch((s) => ({ ...s, stats: { ...s.stats, sessions: s.stats.sessions + 1 } }));
      addStudyMinutes(Math.max(1, Math.round(meta.seconds / 60)));
      const pct = res.length ? (res.filter((r) => r.correct).length / res.length) * 100 : 0;
      toast({
        title: pct >= 80 ? "Strong session" : "Session logged",
        body: `${Math.round(pct)}% · ${res.filter((r) => r.correct).length}/${res.length} correct`,
        tone: pct >= 80 ? "success" : "default",
      });
    },
    [patch, addStudyMinutes, toast],
  );

  const restart = useCallback(() => {
    if (!config) return;
    setResults(null);
    setSeconds(0);
    setSeedFlip((n) => n + 1);
  }, [config]);

  const exit = useCallback(() => router.push("/practice"), [router]);

  if (!config || !session) {
    return (
      <div className="space-y-3">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-40 w-full" />
        <div className="skeleton h-12 w-full" />
      </div>
    );
  }

  if (results) {
    return (
      <ResultSummary
        session={session}
        results={results}
        seconds={seconds}
        onRestart={restart}
        title={config.title ?? "Practice complete"}
      />
    );
  }

  return (
    <>
      {session.questions.length === 0 ? (
        <div className="card p-6 text-center">
          <Icon name="sparkles" className="mx-auto h-8 w-8 text-ink-faint" />
          <p className="mt-3 text-[15px] font-semibold">No questions match that combination</p>
          <p className="mt-1 text-[13px] text-ink-muted">Try widening the topics or formats.</p>
          <Link href="/practice" className="btn-brand mt-4 inline-flex">Change settings</Link>
        </div>
      ) : (
        <QuestionRunner
          key={session.id}
          session={session}
          mode="practice"
          onFinish={finish}
          onExit={exit}
        />
      )}
    </>
  );
}
