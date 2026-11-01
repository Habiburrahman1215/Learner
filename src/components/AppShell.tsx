"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "@/lib/store";
import { levelInfo } from "@/lib/engine/progress-model";
import { cn, Icon, ProgressRing, type IconName } from "./ui";

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/dashboard", label: "Home", icon: "home" },
  { href: "/learn", label: "Learn", icon: "book" },
  { href: "/practice", label: "Practice", icon: "target" },
  { href: "/review", label: "Review", icon: "cards" },
  { href: "/progress", label: "Progress", icon: "chartBar" },
];

const SECONDARY: { href: string; label: string; icon: IconName }[] = [
  { href: "/exam", label: "Mock exams", icon: "trophy" },
  { href: "/reference", label: "Reference", icon: "layers" },
  { href: "/leaderboard", label: "Leaderboard", icon: "star" },
  { href: "/profile", label: "Profile", icon: "user" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { learner, user, online, syncState, guestName } = useApp();
  const info = levelInfo(learner.xp);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const name = user?.display_name ?? guestName;
  const initial = name.trim().charAt(0).toUpperCase() || "H";

  return (
    <div className="min-h-[100dvh] lg:flex">
      {/* ---------- desktop rail ---------- */}
      <aside className="sticky top-0 hidden h-[100dvh] w-[248px] shrink-0 flex-col border-r border-line bg-surface/50 px-4 py-6 backdrop-blur-xl lg:flex">
        <Link href="/dashboard" className="mb-7 flex items-center gap-2.5 px-1">
          <Logo />
          <div>
            <div className="text-[13.5px] font-bold leading-tight tracking-tight">HR Learning Zone</div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-ink-faint">RAC · GED</div>
          </div>
        </Link>

        <nav className="space-y-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors",
                isActive(n.href) ? "bg-brand-500/15 text-white" : "text-ink-muted hover:bg-surface-2 hover:text-ink",
              )}
            >
              <Icon name={n.icon} className={cn("h-[18px] w-[18px]", isActive(n.href) && "text-brand-300")} />
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="my-4 h-px bg-line" />
        <div className="section-title mb-2 px-3">More</div>
        <nav className="space-y-1">
          {SECONDARY.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors",
                isActive(n.href) ? "bg-surface-2 text-white" : "text-ink-muted hover:bg-surface-2 hover:text-ink",
              )}
            >
              <Icon name={n.icon} className="h-[18px] w-[18px]" />
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="card-flat mb-3 px-3 py-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-widest text-ink-faint">Level {info.level}</span>
              <span className="text-[11px] font-semibold text-brand-300">{info.title}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-3">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-lime" style={{ width: `${Math.max(info.progress * 100, 3)}%` }} />
            </div>
            <div className="mt-1.5 text-[11px] text-ink-faint tabular-nums">{learner.xp} XP · {info.toNext} to next</div>
          </div>
          <div className="flex items-center gap-2 px-1 text-[11px] text-ink-faint">
            <span className={cn("h-1.5 w-1.5 rounded-full", online ? "bg-accent-lime" : "bg-accent-amber")} />
            {online ? (user ? syncLabel(syncState) : "Local mode") : "Offline — fully usable"}
          </div>
        </div>
      </aside>

      {/* ---------- main ---------- */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-line/80 bg-canvas/80 backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-3xl items-center gap-3 px-4">
            <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
              <Logo small />
              <span className="text-[13px] font-bold tracking-tight">HR Learning Zone</span>
            </Link>

            <div className="ml-auto flex items-center gap-1.5">
              <span className="flex items-center gap-1 rounded-full border border-line bg-surface-2/70 px-2.5 py-1.5 text-[12px] font-semibold">
                <Icon name="flame" className={cn("h-3.5 w-3.5", learner.streak.current > 0 ? "text-accent-amber" : "text-ink-faint")} />
                <span className="tabular-nums">{learner.streak.current}</span>
              </span>
              <span className="hidden items-center gap-1 rounded-full border border-line bg-surface-2/70 px-2.5 py-1.5 text-[12px] font-semibold sm:flex">
                <span className="text-accent-lime">◆</span>
                <span className="tabular-nums">{learner.xp}</span>
                <span className="text-ink-faint">XP</span>
              </span>
              {!online && (
                <span className="flex items-center gap-1 rounded-full border border-accent-amber/30 bg-accent-amber/10 px-2 py-1.5 text-[11px] font-semibold text-accent-amber">
                  <Icon name="wifiOff" className="h-3.5 w-3.5" />
                  Offline
                </span>
              )}
              <Link
                href="/profile"
                className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-brand-400/30 bg-gradient-to-br from-brand-600 to-brand-900 text-[13px] font-bold text-white"
                aria-label="Profile"
              >
                {mounted ? initial : "H"}
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-4 pb-nav lg:pb-10">{children}</main>
      </div>

      {/* ---------- mobile bottom nav ---------- */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/90 backdrop-blur-2xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
          {NAV.map((n) => {
            const active = isActive(n.href);
            const center = n.href === "/practice";
            if (center) {
              return (
                <Link key={n.href} href={n.href} className="-mt-5 flex flex-col items-center" aria-label={n.label}>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-lime text-[#0A1206] shadow-accent">
                    <Icon name="target" className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <span className="mt-0.5 text-[10px] font-semibold text-ink-muted">Practice</span>
                </Link>
              );
            }
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn("flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5", active ? "text-brand-200" : "text-ink-faint")}
              >
                <Icon name={n.icon} className="h-[19px] w-[19px]" strokeWidth={active ? 2.1 : 1.7} />
                <span className="text-[10px] font-semibold">{n.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function syncLabel(s: string) {
  switch (s) {
    case "syncing":
      return "Syncing…";
    case "synced":
      return "Cloud saved";
    case "error":
      return "Sync pending";
    case "offline":
      return "Offline — queued";
    default:
      return "Signed in";
  }
}

export function Logo({ small }: { small?: boolean }) {
  const s = small ? 26 : 36;
  return (
    <span
      className="relative grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-900 shadow-glow"
      style={{ width: s, height: s }}
    >
      <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/15" />
      <span className={cn("font-black tracking-tighter text-white", small ? "text-[11px]" : "text-[13px]")}>HR</span>
    </span>
  );
}

/* ---------------- toaster ---------------- */

export function Toaster() {
  const { toasts, dismissToast } = useApp();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-[4.2rem] z-[70] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismissToast(t.id)}
          className={cn(
            "pointer-events-auto w-full max-w-sm animate-pop-in rounded-2xl border px-4 py-3 text-left shadow-glow backdrop-blur-xl",
            t.tone === "success"
              ? "border-accent-lime/35 bg-[#0d1508]/95"
              : t.tone === "warn"
                ? "border-accent-amber/35 bg-[#151006]/95"
                : "border-brand-400/30 bg-surface/95",
          )}
        >
          <div className="flex items-start gap-2.5">
            <Icon
              name={t.tone === "success" ? "check" : t.tone === "warn" ? "flame" : "sparkles"}
              className={cn("mt-0.5 h-4 w-4 shrink-0", t.tone === "success" ? "text-accent-lime" : t.tone === "warn" ? "text-accent-amber" : "text-brand-300")}
            />
            <div className="min-w-0">
              <div className="text-[13.5px] font-semibold leading-tight">{t.title}</div>
              {t.body && <div className="mt-0.5 text-[12px] leading-snug text-ink-muted">{t.body}</div>}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

/* ---------------- offline / PWA ---------------- */

export function PwaBridge() {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  if (!offline) return null;
  return (
    <div className="fixed inset-x-0 bottom-[5.2rem] z-40 mx-auto w-fit rounded-full border border-accent-amber/30 bg-[#151006]/95 px-3.5 py-1.5 text-[11.5px] font-semibold text-accent-amber shadow-lg backdrop-blur lg:bottom-4">
      Offline mode · everything still works
    </div>
  );
}

export { ProgressRing };
