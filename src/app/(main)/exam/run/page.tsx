"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { subjectById, topicsBySubject } from "@/content";
import type { SubjectId } from "@/content/types";
import { buildExam, examById, type Blueprint, type Session } from "@/lib/engine/select";
import { QuestionRunner, ResultSummary, type QuestionResult } from "@/components/QuestionRunner";
import { useApp } from "@/lib/store";
import { cacheItems } from "@/lib/item-cache";

function ExamRun() {
  const params = useSearchParams();
  const router = useRouter();
  const { learner, saveExam } = useApp();
  const [session, setSession] = useState<Session | null>(null);
  const [title, setTitle] = useState("Mock exam");
  const [results, setResults] = useState<QuestionResult[] | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const id = params.get("blueprint");
    let bp: Blueprint | undefined = id ? examById[id] : undefined;

    if (!bp) {
      const subjectId = (params.get("subject") as SubjectId) || "rac-l2";
      const subject = subjectById[subjectId] ?? subjectById["rac-l2"];
      const count = Math.min(60, Math.max(5, Number(params.get("count") || 25)));
      const minutes = Math.min(120, Math.max(5, Number(params.get("minutes") || 30)));
      const topics = (topicsBySubject[subject.id] ?? []).map((t) => t.id);
      bp = {
        id: "custom",
        subjectId: subject.id,
        title: `Custom ${subject.short} exam`,
        subtitle: `${count} items · ${minutes} minutes`,
        minutes,
        passMark: 80,
        parts: [{ label: "All topics", topics, count }],
      };
    }
    setTitle(bp.title);
    setSession(buildExam(bp, learner));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const finish = useCallback(
    (res: QuestionResult[], meta: { seconds: number }) => {
      cacheItems(res.map((r) => r.item));
      setResults(res);
      setSeconds(meta.seconds);
      if (session && !saved) {
        const correct = res.filter((r) => r.correct).length;
        saveExam({
          blueprint: session.blueprint ?? "custom",
          title,
          score: correct,
          total: res.length,
          percent: res.length ? (correct / res.length) * 100 : 0,
          at: Date.now(),
          minutes: Math.round(meta.seconds / 60),
        });
        setSaved(true);
      }
    },
    [session, saveExam, title, saved],
  );

  if (!session) {
    return (
      <div className="space-y-3">
        <div className="skeleton h-4 w-28" />
        <div className="skeleton h-40 w-full" />
      </div>
    );
  }

  if (results) {
    const correct = results.filter((r) => r.correct).length;
    const pct = results.length ? (correct / results.length) * 100 : 0;
    const pass = pct >= 80;
    return (
      <div className="space-y-4">
        <div className={`card p-6 text-center ${pass ? "border-accent-lime/30" : "border-accent-amber/25"}`}>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">{title}</div>
          <div className={`mt-2 text-[52px] font-black leading-none tabular-nums ${pass ? "text-accent-lime" : "text-accent-amber"}`}>
            {Math.round(pct)}%
          </div>
          <div className="mt-1 text-[13px] text-ink-muted">
            {correct} / {results.length} correct · {Math.round(seconds / 60)} min
          </div>
          <div className="mt-3 inline-flex rounded-full border border-line px-3 py-1 text-[11.5px] font-semibold text-ink-muted">
            {pass ? "Meets the 80 % RAC standard" : "Below the 80 % RAC standard"}
          </div>
        </div>
        <ResultSummary
          session={session}
          results={results}
          seconds={seconds}
          onRestart={() => router.push("/exam")}
          title="Question review"
        />
      </div>
    );
  }

  return <QuestionRunner key={session.id} session={session} mode="exam" onFinish={finish} onExit={() => router.push("/exam")} />;
}

export default function ExamRunPage() {
  return (
    <Suspense fallback={<div className="skeleton h-64 w-full" />}>
      <ExamRun />
    </Suspense>
  );
}
