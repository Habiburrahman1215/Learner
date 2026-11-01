"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useApp, useDisplayName } from "@/lib/store";
import { levelInfo } from "@/lib/engine/progress-model";
import { cn, Icon, ProgressRing, Sheet } from "@/components/ui";

const AVATARS = ["🛠️", "❄️", "🧊", "📐", "🧪", "🌍", "📚", "⚡", "🎯", "🧠", "🔥", "🏆"];

export default function ProfilePage() {
  const {
    learner, user, hydrated, online, syncState, configured,
    signOut, updateProfile, setGuestName, guestName, syncNow, resetProgress, setSettings, toast,
  } = useApp();
  const name = useDisplayName();
  const info = levelInfo(learner.xp);

  const [editOpen, setEditOpen] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftAvatar, setDraftAvatar] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraftName(user?.display_name ?? guestName);
    setDraftAvatar(user?.avatar ?? "");
  }, [user?.display_name, user?.avatar, guestName]);

  const saveProfile = async () => {
    const clean = draftName.trim().slice(0, 28);
    if (clean.length < 2) {
      toast({ title: "Name too short", body: "Use at least two characters.", tone: "warn" });
      return;
    }
    setBusy(true);
    try {
      if (user) {
        const res = await updateProfile({ display_name: clean, avatar: draftAvatar });
        if (res.error) {
          toast({ title: "Could not save", body: res.error, tone: "warn" });
          return;
        }
      } else {
        setGuestName(clean);
      }
      toast({ title: "Profile updated", tone: "success" });
      setEditOpen(false);
    } finally {
      setBusy(false);
    }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(learner, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hr-learning-zone-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Backup downloaded", body: "Keep it somewhere safe.", tone: "success" });
  };

  const importData = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== "object" || !("xp" in parsed)) throw new Error("bad file");
      localStorage.setItem("hlz.state.v3", JSON.stringify(parsed));
      toast({ title: "Backup restored", body: "Reloading your progress…", tone: "success" });
      setTimeout(() => window.location.reload(), 700);
    } catch {
      toast({ title: "That file did not look right", body: "Choose a backup exported from this app.", tone: "warn" });
    }
  };

  const syncLabel =
    !configured ? "Not configured"
      : !user ? "Guest — device only"
        : syncState === "syncing" ? "Syncing…"
          : syncState === "synced" ? "Synced"
            : syncState === "offline" || !online ? "Offline — will retry"
              : syncState === "error" ? "Sync error" : "Idle";

  return (
    <div className="space-y-5">
      <header className="card relative overflow-hidden p-5">
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-brand-500/40 to-brand-900/40 text-[28px]">
              {user?.avatar || "🛠️"}
            </div>
            <div className="absolute -bottom-1 -right-1">
              <ProgressRing value={info.progress} size={26} stroke={3} tone="lime" label={<span className="text-[8px] font-black">{info.level}</span>} />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[19px] font-black tracking-tight">{name}</h1>
            <p className="text-[11.5px] text-ink-muted">
              {user ? (user.handle ? `@${user.handle}` : "Signed-in account") : "Guest account · signed in nowhere"}
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full", syncState === "synced" ? "bg-accent-lime" : online ? "bg-accent-amber" : "bg-accent-rose")} />
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-faint">{syncLabel}</span>
            </div>
          </div>
          <button onClick={() => setEditOpen(true)} className="btn-quiet shrink-0">
            <Icon name="pen" className="h-4 w-4" />
          </button>
        </div>

        <div className="relative mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            ["Level", String(info.level)],
            ["XP", String(learner.xp)],
            ["Badges", `${learner.badges.length}`],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl bg-surface-2/60 py-2">
              <div className="text-[15px] font-black tabular-nums">{v}</div>
              <div className="text-[9.5px] uppercase tracking-widest text-ink-faint">{l}</div>
            </div>
          ))}
        </div>
      </header>

      {!user ? (
        <div className="card border-brand-500/25 bg-brand-900/20 p-4">
          <div className="flex items-start gap-3">
            <Icon name="lock" className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
            <div className="flex-1">
              <h3 className="text-[14px] font-semibold">Protect your progress</h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">
                Right now clearing your browser data would erase {learner.stats.answers} answers. A profile keeps
                everything in your Supabase account and syncs it to every device you sign in on.
              </p>
              <div className="mt-3 flex gap-2">
                <Link href="/auth/signup" className="btn-brand !px-3.5 !py-2 text-[12.5px]">Create profile</Link>
                <Link href="/auth/login" className="btn-ghost !px-3.5 !py-2 text-[12.5px]">Sign in</Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13.5px] font-semibold">Account sync</div>
              <p className="text-[11.5px] text-ink-faint">Last push is automatic, 2.5 s after any change.</p>
            </div>
            <button
              onClick={async () => {
                await syncNow();
                toast({ title: "Synced", body: "Your profile is up to date.", tone: "success" });
              }}
              className="btn-quiet text-[12.5px] font-semibold text-brand-300"
            >
              <Icon name="refresh" className="h-4 w-4" /> Sync
            </button>
          </div>
        </div>
      )}

      <section>
        <div className="section-title mb-2">Preferences</div>
        <div className="card divide-y divide-line">
          {[
            { key: "sound" as const, label: "Sound effects", hint: "Correct/wrong tones and level-up chime", icon: "bolt" },
            { key: "haptics" as const, label: "Haptics", hint: "Short vibration on answers (mobile)", icon: "sparkles" },
            { key: "reduceMotion" as const, label: "Reduce motion", hint: "Calmer transitions and no confetti", icon: "clock" },
          ].map((row) => {
            const on = Boolean(learner.settings[row.key]);
            return (
              <div key={row.key} className="flex items-center gap-3 px-4 py-3">
                <Icon name={row.icon} className="h-4 w-4 shrink-0 text-ink-faint" />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium">{row.label}</div>
                  <div className="text-[11px] text-ink-faint">{row.hint}</div>
                </div>
                <button
                  onClick={() => setSettings({ [row.key]: !on })}
                  className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", on ? "bg-accent-lime" : "bg-surface-3")}
                  aria-pressed={on}
                  aria-label={row.label}
                >
                  <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all", on ? "left-[1.375rem]" : "left-0.5")} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="section-title mb-2">Your data</div>
        <div className="card divide-y divide-line">
          <button onClick={exportData} className="flex w-full items-center gap-3 px-4 py-3 text-left">
            <Icon name="download" className="h-4 w-4 text-ink-faint" />
            <div className="flex-1">
              <div className="text-[13px] font-medium">Export backup</div>
              <div className="text-[11px] text-ink-faint">A JSON file of everything on this device</div>
            </div>
            <Icon name="chevron" className="h-4 w-4 text-ink-faint" />
          </button>
          <button onClick={() => fileRef.current?.click()} className="flex w-full items-center gap-3 px-4 py-3 text-left">
            <Icon name="upload" className="h-4 w-4 text-ink-faint" />
            <div className="flex-1">
              <div className="text-[13px] font-medium">Restore backup</div>
              <div className="text-[11px] text-ink-faint">Overwrites progress on this device</div>
            </div>
            <Icon name="chevron" className="h-4 w-4 text-ink-faint" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importData(f);
              e.target.value = "";
            }}
          />
          <button onClick={() => setConfirmReset(true)} className="flex w-full items-center gap-3 px-4 py-3 text-left">
            <Icon name="trash" className="h-4 w-4 text-accent-rose" />
            <div className="flex-1">
              <div className="text-[13px] font-medium text-accent-rose">Reset progress</div>
              <div className="text-[11px] text-ink-faint">Clears XP, mastery, streaks and badges</div>
            </div>
            <Icon name="chevron" className="h-4 w-4 text-ink-faint" />
          </button>
        </div>
      </section>

      <section>
        <div className="section-title mb-2">App</div>
        <div className="card divide-y divide-line">
          <Link href="/about" className="flex items-center gap-3 px-4 py-3">
            <Icon name="user" className="h-4 w-4 text-ink-faint" />
            <div className="flex-1">
              <div className="text-[13px] font-medium">About &amp; credits</div>
              <div className="text-[11px] text-ink-faint">Built by HR · version 1.0</div>
            </div>
            <Icon name="chevron" className="h-4 w-4 text-ink-faint" />
          </Link>
          {user && (
            <button
              onClick={async () => {
                await signOut();
                toast({ title: "Signed out", body: "Your progress stays on this device.", tone: "default" });
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left"
            >
              <Icon name="logout" className="h-4 w-4 text-ink-faint" />
              <div className="flex-1 text-[13px] font-medium">Sign out</div>
              <Icon name="chevron" className="h-4 w-4 text-ink-faint" />
            </button>
          )}
        </div>
      </section>

      <p className="pb-2 text-center text-[11px] text-ink-faint">
        HR Learning Zone · offline-first · {hydrated ? "ready" : "loading"} ·{" "}
        {online ? "online" : "offline"}
      </p>

      <Sheet open={editOpen} onClose={() => setEditOpen(false)} title="Edit profile">
        <div className="space-y-4">
          <div>
            <label className="label" htmlFor="pname">Display name</label>
            <input id="pname" className="input" value={draftName} onChange={(e) => setDraftName(e.target.value)} maxLength={28} placeholder="Your name" />
          </div>
          <div>
            <span className="label">Avatar</span>
            <div className="grid grid-cols-6 gap-1.5">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  onClick={() => setDraftAvatar(a)}
                  className={cn(
                    "grid aspect-square place-items-center rounded-xl border text-[20px]",
                    draftAvatar === a ? "border-accent-lime/60 bg-accent-lime/10" : "border-line bg-surface-2/50",
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <button className="btn-primary w-full" disabled={busy} onClick={saveProfile}>
            {busy ? "Saving…" : "Save changes"}
          </button>
        </div>
      </Sheet>

      <Sheet open={confirmReset} onClose={() => setConfirmReset(false)} title="Reset everything?">
        <p className="text-[13px] leading-relaxed text-ink-muted">
          This clears XP ({learner.xp}), all topic mastery, your {learner.streak.current}-day streak,
          {learner.exams.length} saved mock results and every badge on this device
          {user ? ", and pushes the empty state to your account" : ""}. Lessons you have read are forgotten too.
          It cannot be undone.
        </p>
        <div className="mt-4 flex gap-2">
          <button className="btn-ghost flex-1" onClick={() => setConfirmReset(false)}>Keep my progress</button>
          <button
            className="btn-primary flex-1 !bg-accent-rose !text-black"
            onClick={() => {
              resetProgress();
              setConfirmReset(false);
              toast({ title: "Progress reset", body: "A clean slate.", tone: "default" });
            }}
          >
            Reset
          </button>
        </div>
      </Sheet>
    </div>
  );
}
