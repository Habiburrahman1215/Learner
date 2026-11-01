"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getSupabase, supabaseConfigured, type LeaderRow } from "@/lib/supabase";
import { useApp, useDisplayName } from "@/lib/store";
import { levelInfo } from "@/lib/engine/progress-model";
import { cn, Empty, Icon, Segmented, SectionHeader } from "@/components/ui";

type Range = "xp" | "streak" | "accuracy";

export default function LeaderboardPage() {
  const { user, learner, online } = useApp();
  const name = useDisplayName();
  const [rows, setRows] = useState<LeaderRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState<Range>("xp");
  const configured = supabaseConfigured();

  const load = useCallback(async () => {
    const sb = getSupabase();
    if (!sb || !user) return;
    setError(null);
    const { data, error: err } = await sb
      .from("leaderboard")
      .select("display_name,handle,avatar,xp,level,streak,answers,correct")
      .limit(100);
    if (err) {
      setError("The leaderboard could not be loaded. It will retry when you are back online.");
      setRows([]);
    } else {
      setRows((data ?? []) as LeaderRow[]);
    }
  }, [user]);

  useEffect(() => {
    if (user && online) load();
  }, [user, online, load]);

  const sorted = (rows ?? []).slice().sort((a, b) => {
    if (range === "xp") return b.xp - a.xp;
    if (range === "streak") return b.streak - a.streak;
    const accA = a.answers ? a.correct / a.answers : 0;
    const accB = b.answers ? b.correct / b.answers : 0;
    return accB - accA;
  });

  const myRank = sorted.findIndex((r) => r.display_name === name) + 1;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-[24px] font-black tracking-tighter">Leaderboard</h1>
        <p className="mt-1 text-[13px] text-ink-muted">
          Optional, and deliberately small. Progress against your own last week is the number that matters.
        </p>
      </header>

      {!configured ? (
        <Empty icon="cloud" title="Leaderboard not connected" body="Supabase credentials are missing on this deployment, so the shared board is off. Everything else still works." />
      ) : !user ? (
        <div className="card p-5 text-center">
          <Icon name="lock" className="mx-auto h-7 w-7 text-ink-faint" />
          <h2 className="mt-3 text-[15.5px] font-semibold">Sign in to join the board</h2>
          <p className="mx-auto mt-1 max-w-sm text-[12.5px] leading-relaxed text-ink-muted">
            The shared leaderboard only shows accounts. You can keep studying as a guest — nothing is blocked.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Link href="/auth/login" className="btn-brand !py-2.5">Sign in</Link>
            <Link href="/auth/signup" className="btn-ghost !py-2.5">Create profile</Link>
          </div>
        </div>
      ) : (
        <>
          <Segmented
            value={range}
            onChange={(v) => setRange(v)}
            options={[
              { value: "xp", label: "XP" },
              { value: "streak", label: "Streak" },
              { value: "accuracy", label: "Accuracy" },
            ]}
            size="sm"
          />

          {!online && (
            <div className="card-flat flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] text-accent-amber">
              <Icon name="wifiOff" className="h-4 w-4" /> Offline — showing your own stats only.
            </div>
          )}

          <div className="card-flat flex items-center gap-3 px-4 py-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/15 text-[12px] font-black text-brand-300">
              {myRank > 0 ? myRank : "–"}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold">{name} (you)</div>
              <div className="text-[11px] text-ink-faint">
                {learner.xp} XP · L{levelInfo(learner.xp).level} · {learner.streak.current}d streak
              </div>
            </div>
            <Link href="/progress" className="text-[11.5px] font-semibold text-brand-300">Details</Link>
          </div>

          {error && <p className="px-1 text-[12px] text-accent-rose">{error}</p>}

          {rows === null ? (
            <div className="space-y-2">
              {[0, 1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-14 w-full" />)}
            </div>
          ) : sorted.length === 0 ? (
            <Empty icon="trophy" title="No one is on the board yet" body="You could be the first. Answer a few questions and sync." />
          ) : (
            <div className="space-y-1.5">
              {sorted.map((r, i) => {
                const mine = r.display_name === name;
                return (
                  <div
                    key={`${r.handle ?? r.display_name}-${i}`}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border px-3.5 py-2.5",
                      mine ? "border-brand-400/40 bg-brand-500/10" : "border-line bg-surface-2/40",
                    )}
                  >
                    <span className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[11px] font-black tabular-nums",
                      i === 0 ? "bg-accent-amber/20 text-accent-amber"
                        : i === 1 ? "bg-white/10 text-white"
                          : i === 2 ? "bg-accent-rose/15 text-accent-rose"
                            : "bg-surface-3 text-ink-faint",
                    )}>
                      {i + 1}
                    </span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-surface-3 text-[16px]">{r.avatar || "🛠️"}</span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[12.5px] font-medium">{r.display_name}{mine && " · you"}</div>
                      <div className="text-[10.5px] text-ink-faint">
                        L{r.level} · {r.streak}d streak
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-bold tabular-nums">
                        {range === "xp" ? r.xp : range === "streak" ? `${r.streak}d` : `${Math.round((r.answers ? r.correct / r.answers : 0) * 100)}%`}
                      </div>
                      <div className="text-[9.5px] uppercase tracking-wider text-ink-faint">
                        {range === "xp" ? "xp" : range === "streak" ? "streak" : "accuracy"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <SectionHeader title="How ranking works" sub="XP only, no purchases, no boosts" />
          <p className="px-1 text-[12px] leading-relaxed text-ink-muted">
            XP is earned by answering correctly, finishing sessions and keeping streaks. The board refreshes when your
            profile syncs; it never blocks study.
          </p>
        </>
      )}
    </div>
  );
}
