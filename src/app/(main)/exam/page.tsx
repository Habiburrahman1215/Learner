"use client";

import Link from "next/link";
import { useState } from "react";
import { subjects, subjectById } from "@/content";
import { blueprints } from "@/lib/engine/select";
import { useApp } from "@/lib/store";
import { cn, Icon, Segmented, Sheet } from "@/components/ui";

export default function ExamListPage() {
  const { learner } = useApp();
  const [open, setOpen] = useState(false);
  const [customSubject, setCustomSubject] = useState<string>("rac-l2");
  const [customCount, setCustomCount] = useState(25);
  const [customMinutes, setCustomMinutes] = useState(30);

  const best = (id: string) => {
    const rows = learner.exams.filter((e) => e.blueprint === id);
    if (!rows.length) return null;
    return Math.max(...rows.map((r) => r.percent));
  };

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-[24px] font-black tracking-tighter">Mock exams</h1>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
          Timed, no feedback until you submit, weighted like the real thing. Each blueprint mirrors the blueprint of the
          qualification it prepares you for.
        </p>
      </header>

      <button onClick={() => setOpen(true)} className="card flex w-full items-center gap-3 p-4 text-left">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-lime/12 text-accent-lime">
          <Icon name="sparkles" className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <div className="text-[14px] font-semibold">Build a custom exam</div>
          <div className="text-[11.5px] text-ink-muted">Any subject, any length, any clock</div>
        </div>
        <Icon name="chevron" className="h-4 w-4 text-ink-faint" />
      </button>

      <div className="space-y-2.5">
        {blueprints.map((b) => {
          const s = subjectById[b.subjectId];
          const score = best(b.id);
          const items = b.parts.reduce((a, p) => a + p.count, 0);
          const last = learner.exams.find((e) => e.blueprint === b.id);
          return (
            <Link key={b.id} href={`/exam/run?blueprint=${b.id}`} className="card relative block overflow-hidden p-4">
              <div className="flex items-start gap-3">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/5"
                  style={{ background: `linear-gradient(140deg, ${s.hue}25, ${s.hue2}10)`, color: s.hue }}
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-semibold leading-snug tracking-tight">{b.title}</h3>
                  <p className="mt-0.5 text-[12px] text-ink-muted">{b.subtitle}</p>
                </div>
                {score !== null && (
                  <div className="text-right">
                    <div className={cn("text-[16px] font-black tabular-nums", score >= b.passMark ? "text-accent-lime" : "text-accent-amber")}>
                      {Math.round(score)}%
                    </div>
                    <div className="text-[9.5px] uppercase tracking-wider text-ink-faint">best</div>
                  </div>
                )}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-faint">
                <span className="inline-flex items-center gap-1"><Icon name="clock" className="h-3 w-3" /> {b.minutes} min</span>
                <span className="inline-flex items-center gap-1"><Icon name="layers" className="h-3 w-3" /> {items} items</span>
                <span className="inline-flex items-center gap-1"><Icon name="target" className="h-3 w-3" /> pass {b.passMark}%</span>
                {last && <span className="ml-auto">last: {Math.round(last.percent)}%</span>}
              </div>
            </Link>
          );
        })}
      </div>

      <Sheet open={open} onClose={() => setOpen(false)} title="Custom exam">
        <div className="space-y-4">
          <div>
            <div className="label">Subject</div>
            <div className="grid grid-cols-2 gap-1.5">
              {subjects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setCustomSubject(s.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-3 py-2 text-[12.5px]",
                    customSubject === s.id ? "border-brand-400/50 bg-brand-500/12 text-white" : "border-line text-ink-muted",
                  )}
                >
                  <Icon name={s.icon} className="h-3.5 w-3.5" style={{ color: s.hue }} />
                  {s.short}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="label">Items · {customCount}</div>
            <input type="range" min={10} max={60} step={5} value={customCount} onChange={(e) => setCustomCount(Number(e.target.value))} className="w-full accent-[#B7F25C]" />
          </div>
          <div>
            <div className="label">Time limit</div>
            <Segmented
              value={String(customMinutes)}
              onChange={(v) => setCustomMinutes(Number(v))}
              options={[
                { value: "15", label: "15m" },
                { value: "30", label: "30m" },
                { value: "45", label: "45m" },
                { value: "60", label: "60m" },
              ]}
              size="sm"
            />
          </div>
          <Link
            href={`/exam/run?subject=${customSubject}&count=${customCount}&minutes=${customMinutes}`}
            className="btn-primary w-full"
          >
            Start exam <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </Sheet>
    </div>
  );
}
