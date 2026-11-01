"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { passageById, topicLabel } from "@/content";
import type { Item } from "@/content/types";
import { expectedAnswer, formatHint, formatLabel, grade, type Answer } from "@/lib/engine/core";
import type { Session, SessionQuestion } from "@/lib/engine/select";
import { useApp } from "@/lib/store";
import { haptic, sfx } from "@/lib/sfx";
import { Bar, cn, Confetti, Icon, Inline, Segmented } from "./ui";

export interface QuestionResult {
  item: Item;
  correct: boolean;
  score: number;
  given: Answer | null;
}

interface Props {
  session: Session;
  mode?: "practice" | "exam" | "review";
  onFinish: (results: QuestionResult[], meta: { seconds: number }) => void;
  onExit?: () => void;
  headerRight?: React.ReactNode;
}

export function QuestionRunner({ session, mode = "practice", onFinish, onExit, headerRight }: Props) {
  const { learner, answer, toggleBookmark, toast } = useApp();
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [given, setGiven] = useState<Answer | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [combo, setCombo] = useState(0);
  const [xpPop, setXpPop] = useState<{ id: number; xp: number } | null>(null);
  const [confetti, setConfetti] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [matchPick, setMatchPick] = useState<number | null>(null);
  const [mapping, setMapping] = useState<number[]>([]);
  const [order, setOrder] = useState<number[]>([]);
  const startRef = useRef(Date.now());
  const questionStart = useRef(Date.now());

  const q = session.questions[index];
  const total = session.questions.length;
  const examMode = mode === "exam";

  /* ---------------- timer ---------------- */
  useEffect(() => {
    const t = setInterval(() => setSeconds(Math.floor((Date.now() - startRef.current) / 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  /* ---------------- reset per question ---------------- */
  useEffect(() => {
    setGiven(null);
    setRevealed(false);
    setMatchPick(null);
    setMapping([]);
    setOrder([]);
    questionStart.current = Date.now();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  const correctAnswer = useMemo(() => (q ? expectedAnswer(q.prepared) : null), [q]);
  const isBookmarked = q ? learner.bookmarks.includes(q.item.id) : false;

  const commit = useCallback(
    (ans: Answer | null) => {
      if (!q) return;
      const g = grade(q.item, ans, q.prepared);
      const spent = Math.round((Date.now() - questionStart.current) / 1000);
      setResults((prev) => [...prev, { item: q.item, correct: g.correct, score: g.score, given: ans }]);
      setRevealed(true);

      if (!examMode) {
        if (g.correct) {
          const outcome = answer(q.item, true, { combo, seconds: spent });
          setCombo(outcome.combo);
          setXpPop({ id: Date.now(), xp: outcome.xp });
          sfx.correct(learner.settings.sound);
          haptic(18, learner.settings.haptics);
          if (outcome.newBadges.length) {
            setConfetti((c) => c + 1);
            setTimeout(
              () => toast({ title: "Badge unlocked", body: outcome.newBadges.map((b) => b.replace(/-/g, " ")).join(", "), tone: "success" }),
              700,
            );
          }
          if (outcome.combo > 0 && outcome.combo % 5 === 0) {
            setConfetti((c) => c + 1);
            sfx.levelUp(learner.settings.sound);
          }
        } else {
          answer(q.item, false, { seconds: spent });
          setCombo(0);
          sfx.wrong(learner.settings.sound);
          haptic([12, 40, 12], learner.settings.haptics);
        }
        setTimeout(() => setXpPop(null), 1200);
      }
    },
    [q, examMode, combo, answer, learner.settings, toast],
  );

  const next = useCallback(() => {
    if (index + 1 >= total) {
      const all = results;
      onFinish(all, { seconds: Math.floor((Date.now() - startRef.current) / 1000) });
      return;
    }
    setIndex((i) => i + 1);
  }, [index, total, results, onFinish]);

  const submitCurrent = useCallback(() => {
    if (!q || revealed) return;
    commit(buildAnswer(q, given, mapping, order));
  }, [q, revealed, given, mapping, order, commit]);

  if (!q) return null;
  const item = q.item;
  const passage = item.passageId ? passageById[item.passageId] : undefined;
  const isLast = index + 1 >= total;
  const answeredCount = results.length;

  return (
    <div>
      <Confetti fire={confetti} />

      {/* header */}
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-3">
          <button
            onClick={onExit ?? (() => history.back())}
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface-2/70 text-ink-muted hover:text-ink"
            aria-label="Exit session"
          >
            <Icon name="x" className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between text-[11.5px] font-semibold text-ink-faint">
              <span className="tabular-nums">
                Question {index + 1} of {total}
              </span>
              <span className="flex items-center gap-2 tabular-nums">
                {!examMode && combo > 1 && (
                  <span className="accent-pill">
                    <Icon name="flame" className="h-3 w-3" /> {combo}× combo
                  </span>
                )}
                <span>
                  {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
                </span>
              </span>
            </div>
            <Bar value={(index + (revealed ? 1 : 0)) / total} className="mt-1.5" tone={examMode ? "cyan" : "lime"} height={5} />
          </div>
          {headerRight}
        </div>
      </div>

      {/* question */}
      <div className="card p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <span className="brand-chip !py-0.5 !text-[10px]">{topicLabel(item.topic)}</span>
          <span className="rounded-full border border-line bg-surface-2/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
            {formatLabel[item.format]}
          </span>
          <span className="ml-auto flex items-center gap-0.5" title={`Difficulty ${item.diff}/5`}>
            {[1, 2, 3, 4, 5].map((d) => (
              <span key={d} className={cn("h-1.5 w-1.5 rounded-full", d <= item.diff ? "bg-accent-amber" : "bg-surface-3")} />
            ))}
          </span>
          <button
            onClick={() => toggleBookmark(item.id)}
            className={cn("rounded-full p-1.5 transition-colors", isBookmarked ? "text-accent-amber" : "text-ink-faint hover:text-ink")}
            aria-label="Bookmark"
          >
            <Icon name="star" className="h-4 w-4" />
          </button>
        </div>

        {passage && <PassagePanel text={passage.text} title={passage.title} kind={passage.kind} />}

        <p className="text-[15.5px] font-medium leading-relaxed text-ink">
          <Inline text={item.q} />
        </p>
        {item.format === "numeric" && item.unit && (
          <p className="mt-1 text-[12px] text-ink-faint">Answer in {item.unit}</p>
        )}

        <div className="mt-4">
          <AnswerInput
            item={item}
            prepared={q.prepared}
            given={given}
            setGiven={setGiven}
            revealed={revealed}
            expected={correctAnswer}
            matchPick={matchPick}
            setMatchPick={setMatchPick}
            mapping={mapping}
            setMapping={setMapping}
            order={order}
            setOrder={setOrder}
          />
        </div>

        {/* feedback — never during an exam, or the test stops testing */}
        {revealed && !examMode && (
          <div className="mt-4 animate-fade-up">
            {(() => {
              const last = results[results.length - 1];
              const ok = last?.correct;
              return (
                <div
                  className={cn(
                    "rounded-2xl border p-3.5",
                    ok ? "border-accent-lime/30 bg-accent-lime/[0.07]" : "border-accent-rose/30 bg-accent-rose/[0.07]",
                  )}
                >
                  <div className={cn("flex items-center gap-2 text-[13px] font-bold", ok ? "text-accent-lime" : "text-accent-rose")}>
                    <Icon name={ok ? "check" : "x"} className="h-4 w-4" />
                    {ok ? "Correct" : last && last.score > 0 ? "Partly correct" : "Not quite"}
                  </div>
                  <CorrectAnswer item={item} expected={correctAnswer} prepared={q.prepared} />
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink/85">
                    <Inline text={item.why} />
                  </p>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* actions */}
      <div className="sticky bottom-[5.6rem] z-20 mt-4 lg:bottom-4">
        {xpPop && (
          <div key={xpPop.id} className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 animate-fade-up text-[15px] font-black text-accent-lime">
            +{xpPop.xp} XP
          </div>
        )}
        {!revealed ? (
          <button
            className="btn-primary w-full"
            onClick={submitCurrent}
            disabled={!hasAnswer(item, given, mapping, order)}
          >
            {examMode ? "Save answer" : "Check answer"}
          </button>
        ) : (
          <button className="btn-primary w-full" onClick={next}>
            {isLast ? (examMode ? "Finish & review" : "See results") : "Next question"}
            <Icon name="arrowRight" className="h-4 w-4" />
          </button>
        )}
        {examMode && (
          <div className="mt-2 flex items-center justify-between text-[11px] text-ink-faint">
            <span>
              {answeredCount} of {total} answered
            </span>
            <button
              className="font-semibold text-brand-300"
              onClick={() => {
                const all = results.slice();
                onFinish(all, { seconds: Math.floor((Date.now() - startRef.current) / 1000) });
              }}
            >
              Submit test
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- helpers ---------------- */

function buildAnswer(
  q: SessionQuestion,
  given: Answer | null,
  mapping: number[],
  order: number[],
): Answer | null {
  if (q.item.format === "match") return { kind: "match", mapping };
  if (q.item.format === "order") return { kind: "order", order };
  return given;
}

function hasAnswer(item: Item, given: Answer | null, mapping: number[], order: number[]) {
  switch (item.format) {
    case "match":
      return mapping.length === item.left.length && mapping.every((m) => m >= 0);
    case "order":
      return order.length === item.steps.length;
    case "numeric":
      return given?.kind === "numeric" && given.value !== null && !Number.isNaN(given.value);
    case "short":
      return given?.kind === "short" && given.text.trim().length > 0;
    case "multi":
      return given?.kind === "multi" && given.indices.length > 0;
    default:
      return Boolean(given);
  }
}

/* ---------------- passage ---------------- */

function PassagePanel({ text, title, kind }: { text: string; title: string; kind: string }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-line bg-surface-2/60">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left">
        <Icon name="book" className="h-4 w-4 text-brand-300" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12.5px] font-semibold">{title}</div>
          <div className="text-[10.5px] uppercase tracking-wider text-ink-faint">{kind}</div>
        </div>
        <Icon name="chevron" className={cn("h-4 w-4 text-ink-faint transition-transform", open && "rotate-90")} />
      </button>
      {open && (
        <div className="max-h-72 overflow-y-auto border-t border-line px-3.5 py-3 text-[13.5px] leading-[1.72] text-ink/80">
          {text.split("\n\n").map((p, i) => (
            <p key={i} className={i ? "mt-2.5" : ""}>
              {p}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- answer inputs ---------------- */

interface InputProps {
  item: Item;
  prepared: SessionQuestion["prepared"];
  given: Answer | null;
  setGiven: (a: Answer | null) => void;
  revealed: boolean;
  expected: Answer | null;
  matchPick: number | null;
  setMatchPick: (n: number | null) => void;
  mapping: number[];
  setMapping: (m: number[]) => void;
  order: number[];
  setOrder: (o: number[]) => void;
}

function AnswerInput(props: InputProps) {
  const { item, prepared, given, setGiven, revealed, expected } = props;

  switch (item.format) {
    case "mcq": {
      const chosen = given?.kind === "mcq" ? given.index : -1;
      return (
        <div className="space-y-2">
          {prepared.options.map((opt, i) => {
            const isCorrect = expected?.kind === "mcq" && expected.index === i;
            const isChosen = chosen === i;
            return (
              <button
                key={i}
                disabled={revealed}
                onClick={() => {
                  setGiven({ kind: "mcq", index: i });
                }}
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl border px-3.5 py-3 text-left text-[14px] transition-all",
                  revealed
                    ? isCorrect
                      ? "border-accent-lime/50 bg-accent-lime/10"
                      : isChosen
                        ? "border-accent-rose/50 bg-accent-rose/10"
                        : "border-line bg-surface-2/40 opacity-60"
                    : isChosen
                      ? "border-brand-400/60 bg-brand-500/12"
                      : "border-line bg-surface-2/50 hover:border-brand-400/30",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border text-[11px] font-bold",
                    isChosen ? "border-brand-400/60 bg-brand-500/20 text-brand-200" : "border-line text-ink-faint",
                    revealed && isCorrect && "border-accent-lime/60 bg-accent-lime/20 text-accent-lime",
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1 leading-snug">
                  <Inline text={opt} />
                </span>
                {revealed && isCorrect && <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent-lime" />}
              </button>
            );
          })}
        </div>
      );
    }

    case "multi": {
      const chosen = given?.kind === "multi" ? given.indices : [];
      const toggle = (i: number) => {
        const set = new Set(chosen);
        set.has(i) ? set.delete(i) : set.add(i);
        setGiven({ kind: "multi", indices: [...set] });
      };
      const expSet = expected?.kind === "multi" ? new Set(expected.indices) : new Set<number>();
      return (
        <div className="space-y-2">
          {prepared.options.map((opt, i) => {
            const isChosen = chosen.includes(i);
            const isCorrect = expSet.has(i);
            return (
              <button
                key={i}
                disabled={revealed}
                onClick={() => toggle(i)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl border px-3.5 py-3 text-left text-[14px] transition-all",
                  revealed
                    ? isCorrect
                      ? "border-accent-lime/50 bg-accent-lime/10"
                      : isChosen
                        ? "border-accent-rose/50 bg-accent-rose/10"
                        : "border-line bg-surface-2/40 opacity-60"
                    : isChosen
                      ? "border-brand-400/60 bg-brand-500/12"
                      : "border-line bg-surface-2/50 hover:border-brand-400/30",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border",
                    isChosen ? "border-brand-400/70 bg-brand-500/30" : "border-line",
                    revealed && isCorrect && "border-accent-lime/60 bg-accent-lime/25",
                  )}
                >
                  {(isChosen || (revealed && isCorrect)) && <Icon name="check" className="h-3 w-3 text-white" strokeWidth={3} />}
                </span>
                <span className="flex-1 leading-snug">
                  <Inline text={opt} />
                </span>
              </button>
            );
          })}
        </div>
      );
    }

    case "tf": {
      const chosen = given?.kind === "tf" ? given.value : null;
      return (
        <div className="grid grid-cols-2 gap-2">
          {[true, false].map((v) => {
            const isCorrect = expected?.kind === "tf" && expected.value === v;
            return (
              <button
                key={String(v)}
                disabled={revealed}
                onClick={() => setGiven({ kind: "tf", value: v })}
                className={cn(
                  "rounded-2xl border py-4 text-[15px] font-semibold transition-all",
                  revealed
                    ? isCorrect
                      ? "border-accent-lime/50 bg-accent-lime/10 text-accent-lime"
                      : chosen === v
                        ? "border-accent-rose/50 bg-accent-rose/10 text-accent-rose"
                        : "border-line bg-surface-2/40 text-ink-faint"
                    : chosen === v
                      ? "border-brand-400/60 bg-brand-500/12 text-white"
                      : "border-line bg-surface-2/50 text-ink-muted hover:border-brand-400/30",
                )}
              >
                {v ? "True" : "False"}
              </button>
            );
          })}
        </div>
      );
    }

    case "numeric": {
      const val = given?.kind === "numeric" ? given.value : null;
      return (
        <div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              step="any"
              disabled={revealed}
              value={val ?? ""}
              onChange={(e) => setGiven({ kind: "numeric", value: e.target.value === "" ? null : Number(e.target.value) })}
              placeholder="0"
              className="input text-center text-lg font-semibold tabular-nums"
            />
            {item.unit && <span className="shrink-0 text-[13px] font-semibold text-ink-faint">{item.unit}</span>}
          </div>
          {expected?.kind === "numeric" && revealed && (
            <p className="mt-2 text-center text-[12.5px] text-ink-muted">
              Exact answer: <span className="font-bold text-accent-lime tabular-nums">{expected.value}</span>
              {item.unit ? ` ${item.unit}` : ""}
            </p>
          )}
        </div>
      );
    }

    case "short": {
      const val = given?.kind === "short" ? given.text : "";
      return (
        <div>
          <input
            type="text"
            disabled={revealed}
            value={val}
            onChange={(e) => setGiven({ kind: "short", text: e.target.value })}
            placeholder="Type your answer…"
            className="input"
            autoComplete="off"
          />
          {revealed && (
            <p className="mt-2 text-[12.5px] text-ink-muted">
              Accepted: <span className="font-semibold text-accent-lime">{item.accept.slice(0, 3).join(" / ")}</span>
            </p>
          )}
        </div>
      );
    }

    case "match": {
      const { matchPick, setMatchPick, mapping, setMapping } = props;
      const used = new Set(mapping.filter((m) => m >= 0));
      return (
        <div className="space-y-2">
          <p className="text-[11.5px] text-ink-faint">Tap an item on the left, then its match on the right.</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              {item.left.map((l, i) => {
                const assigned = mapping[i];
                const ok = revealed && expected?.kind === "match" && expected.mapping[i] === assigned;
                return (
                  <button
                    key={i}
                    disabled={revealed}
                    onClick={() => setMatchPick(i)}
                    className={cn(
                      "w-full rounded-xl border px-2.5 py-2 text-left text-[12px] leading-snug transition-colors",
                      matchPick === i ? "border-brand-400/70 bg-brand-500/15" : "border-line bg-surface-2/50",
                      revealed && (ok ? "border-accent-lime/50 bg-accent-lime/10" : "border-accent-rose/40 bg-accent-rose/10"),
                    )}
                  >
                    <div className="font-semibold">{l}</div>
                    <div className="mt-0.5 text-[11px] text-ink-faint">
                      {assigned !== undefined && assigned >= 0 ? item.right[prepared.rightOrder![assigned]] : "—"}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="space-y-1.5">
              {prepared.options.map((r, pos) => (
                <button
                  key={pos}
                  disabled={revealed || matchPick === null}
                  onClick={() => {
                    if (matchPick === null) return;
                    const next = [...mapping];
                    next[matchPick] = pos;
                    setMapping(next);
                    setMatchPick(null);
                  }}
                  className={cn(
                    "w-full rounded-xl border px-2.5 py-2 text-left text-[12px] leading-snug transition-colors",
                    used.has(pos) ? "border-brand-400/40 bg-brand-500/10 opacity-70" : "border-line bg-surface-2/50",
                    matchPick === null && !used.has(pos) && "opacity-50",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "order": {
      const { order, setOrder } = props;
      const remaining = prepared.options.map((_, i) => i).filter((i) => !order.includes(i));
      return (
        <div className="space-y-2">
          <p className="text-[11.5px] text-ink-faint">Tap the steps in the correct order. Tap a chosen step to remove it.</p>
          <div className="space-y-1.5">
            {order.map((pos, rank) => (
              <button
                key={pos}
                disabled={revealed}
                onClick={() => setOrder(order.filter((o) => o !== pos))}
                className="flex w-full items-center gap-2 rounded-xl border border-brand-400/40 bg-brand-500/10 px-2.5 py-2 text-left text-[12.5px]"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-brand-500/30 text-[10px] font-bold">{rank + 1}</span>
                <span className="flex-1">{prepared.options[pos]}</span>
              </button>
            ))}
          </div>
          {!revealed && remaining.length > 0 && (
            <div className="space-y-1.5 rounded-xl border border-dashed border-line p-2">
              {remaining.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setOrder([...order, pos])}
                  className="w-full rounded-lg bg-surface-2/70 px-2.5 py-2 text-left text-[12.5px] text-ink-muted hover:text-ink"
                >
                  {prepared.options[pos]}
                </button>
              ))}
            </div>
          )}
          {revealed && expected?.kind === "order" && (
            <div className="rounded-xl border border-line bg-surface-2/50 p-2 text-[12px]">
              <div className="mb-1 font-semibold text-accent-lime">Correct order</div>
              {expected.order.map((pos) => (
                <div key={pos} className="text-ink-muted">
                  {prepared.options[pos]}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    default:
      return null;
  }
}

function CorrectAnswer({ item, expected, prepared }: { item: Item; expected: Answer | null; prepared: SessionQuestion["prepared"] }) {
  if (!expected) return null;
  if (item.format === "mcq" && expected.kind === "mcq") {
    return (
      <p className="mt-1.5 text-[12.5px] text-ink-muted">
        Correct option: <span className="font-semibold text-ink">{item.options[prepared.optionOrder![expected.index]]}</span>
      </p>
    );
  }
  if (item.format === "multi" && expected.kind === "multi") {
    return (
      <p className="mt-1.5 text-[12.5px] text-ink-muted">
        Correct:{" "}
        <span className="font-semibold text-ink">
          {expected.indices.map((i) => item.options[prepared.optionOrder![i]]).join(" · ")}
        </span>
      </p>
    );
  }
  if (item.format === "tf") return null;
  return null;
}

/* ---------------- results screen ---------------- */

export function ResultSummary({
  session,
  results,
  seconds,
  onRestart,
  title,
}: {
  session: Session;
  results: QuestionResult[];
  seconds: number;
  onRestart?: () => void;
  title?: string;
}) {
  const correct = results.filter((r) => r.correct).length;
  const total = results.length || session.questions.length;
  const pct = total ? (correct / total) * 100 : 0;
  const byTopic = new Map<string, { correct: number; total: number }>();
  for (const r of results) {
    const t = byTopic.get(r.item.topic) ?? { correct: 0, total: 0 };
    t.total += 1;
    if (r.correct) t.correct += 1;
    byTopic.set(r.item.topic, t);
  }
  const weakest = [...byTopic.entries()]
    .map(([topic, v]) => ({ topic, pct: v.total ? v.correct / v.total : 0 }))
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3);

  const band =
    pct >= 90 ? { label: "Outstanding", tone: "text-accent-lime", line: "Comfortably above the pass standard." }
      : pct >= 80 ? { label: "Strong", tone: "text-accent-lime", line: "Above the RAC 80 % target." }
        : pct >= 60 ? { label: "Passing range", tone: "text-accent-amber", line: "Close — tighten the weak topics." }
          : { label: "Needs work", tone: "text-accent-rose", line: "Practise the weak topics below, then retry." };

  return (
    <div className="animate-fade-up">
      <div className="card relative overflow-hidden p-6 text-center">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-500/15 to-transparent" />
        <div className="relative">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">{title ?? "Session complete"}</div>
          <div className="mt-2 flex items-end justify-center gap-1">
            <span className="display text-6xl font-black tabular-nums">{Math.round(pct)}</span>
            <span className="mb-2 text-lg font-bold text-ink-faint">%</span>
          </div>
          <div className={cn("mt-1 text-[15px] font-semibold", band.tone)}>{band.label}</div>
          <p className="mx-auto mt-1 max-w-xs text-[12.5px] text-ink-muted">{band.line}</p>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <div className="card-flat px-2 py-2.5">
              <div className="text-[16px] font-bold tabular-nums text-accent-lime">{correct}</div>
              <div className="text-[10px] uppercase tracking-wider text-ink-faint">Correct</div>
            </div>
            <div className="card-flat px-2 py-2.5">
              <div className="text-[16px] font-bold tabular-nums text-accent-rose">{total - correct}</div>
              <div className="text-[10px] uppercase tracking-wider text-ink-faint">Missed</div>
            </div>
            <div className="card-flat px-2 py-2.5">
              <div className="text-[16px] font-bold tabular-nums">{Math.floor(seconds / 60)}m {seconds % 60}s</div>
              <div className="text-[10px] uppercase tracking-wider text-ink-faint">Time</div>
            </div>
          </div>
        </div>
      </div>

      {weakest.length > 0 && (
        <div className="card mt-3 p-4">
          <div className="section-title mb-2.5">Focus next</div>
          <div className="space-y-2.5">
            {weakest.map((w) => (
              <div key={w.topic}>
                <div className="mb-1 flex items-center justify-between text-[12.5px]">
                  <span className="font-medium">{topicLabel(w.topic)}</span>
                  <span className="tabular-nums text-ink-faint">{Math.round(w.pct * 100)}%</span>
                </div>
                <Bar value={w.pct} tone={w.pct >= 0.8 ? "lime" : w.pct >= 0.5 ? "amber" : "rose"} height={5} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 space-y-2">
        {results
          .filter((r) => !r.correct)
          .slice(0, 5)
          .map((r, i) => (
            <details key={i} className="card-flat px-3.5 py-2.5">
              <summary className="cursor-pointer list-none text-[13px] font-medium text-ink/90">
                <span className="mr-1.5 text-accent-rose">✕</span>
                <Inline text={r.item.q.length > 110 ? r.item.q.slice(0, 110) + "…" : r.item.q} />
              </summary>
              <p className="mt-2 border-t border-line pt-2 text-[12.5px] leading-relaxed text-ink-muted">
                <Inline text={r.item.why} />
              </p>
            </details>
          ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {onRestart && (
          <button className="btn-ghost" onClick={onRestart}>
            <Icon name="target" className="h-4 w-4" /> Retry
          </button>
        )}
        <Link href="/dashboard" className={cn("btn-primary", !onRestart && "col-span-2")}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
