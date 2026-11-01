"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { subjects } from "@/content";
import { useApp } from "@/lib/store";
import { subjectStats } from "@/lib/derive";
import { Bar, Chip, Icon, SectionHeader } from "@/components/ui";

export default function LearnPage() {
  const { learner } = useApp();
  const [filter, setFilter] = useState<"all" | "rac" | "ged">("all");

  const list = useMemo(() => subjects.filter((s) => (filter === "all" ? true : s.track === filter)), [filter]);
  const totalLessons = subjects.reduce((a, s) => a + s.modules.reduce((b, m) => b + m.lessons.length, 0), 0);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-[24px] font-black tracking-tighter">Learn</h1>
        <p className="mt-1 text-[13px] text-ink-muted">
          {totalLessons} lessons across five subjects. Every word is stored on your device.
        </p>
      </header>

      <div className="rail">
        <Chip active={filter === "all"} onClick={() => setFilter("all")}>All subjects</Chip>
        <Chip active={filter === "rac"} onClick={() => setFilter("rac")}>NSDA RAC</Chip>
        <Chip active={filter === "ged"} onClick={() => setFilter("ged")}>GED</Chip>
      </div>

      <div className="space-y-4">
        {list.map((s) => {
          const st = subjectStats(learner, s);
          return (
            <section key={s.id} className="card overflow-hidden">
              <Link href={`/learn/${s.id}`} className="block p-4">
                <div className="flex items-start gap-3.5">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/5"
                    style={{ background: `linear-gradient(140deg, ${s.hue}28, ${s.hue2}10)`, color: s.hue }}
                  >
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[16.5px] font-semibold leading-tight tracking-tight">{s.title}</h2>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: s.hue }}>
                      {s.tagline}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Bar value={st.mastery} tone={st.mastery >= 0.7 ? "lime" : st.mastery >= 0.35 ? "amber" : "brand"} height={5} />
                      <span className="shrink-0 text-[10.5px] font-semibold tabular-nums text-ink-faint">
                        {Math.round(st.mastery * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="grid grid-cols-3 divide-x divide-line border-t border-line text-center">
                <div className="px-2 py-2.5">
                  <div className="text-[13px] font-bold tabular-nums">{s.modules.length}</div>
                  <div className="text-[9.5px] uppercase tracking-wider text-ink-faint">Modules</div>
                </div>
                <div className="px-2 py-2.5">
                  <div className="text-[13px] font-bold tabular-nums">{s.modules.reduce((a, m) => a + m.lessons.length, 0)}</div>
                  <div className="text-[9.5px] uppercase tracking-wider text-ink-faint">Lessons</div>
                </div>
                <div className="px-2 py-2.5">
                  <div className="text-[13px] font-bold tabular-nums">{s.exam.minutes}m</div>
                  <div className="text-[9.5px] uppercase tracking-wider text-ink-faint">Mock length</div>
                </div>
              </div>

              <div className="divide-y divide-line border-t border-line">
                {s.modules.slice(0, 3).map((m) => (
                  <Link
                    key={m.id}
                    href={`/lesson/${m.lessons[0].id}`}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] hover:bg-surface-2/40"
                  >
                    <Icon name={m.icon} className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
                    <span className="flex-1 truncate">{m.title}</span>
                    <span className="shrink-0 text-[10.5px] text-ink-faint">{m.lessons.length} lesson{m.lessons.length > 1 ? "s" : ""}</span>
                    <Icon name="chevron" className="h-3.5 w-3.5 shrink-0 text-ink-faint" />
                  </Link>
                ))}
                {s.modules.length > 3 && (
                  <Link href={`/learn/${s.id}`} className="block px-4 py-2.5 text-center text-[12px] font-semibold text-brand-300">
                    + {s.modules.length - 3} more modules
                  </Link>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
