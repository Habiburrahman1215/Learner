"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/lib/store";
import { cn, Icon } from "./ui";

const GOALS = [
  { id: "rac", label: "RAC Level 2 certificate", icon: "snow" },
  { id: "ged", label: "GED — all four subjects", icon: "book" },
  { id: "both", label: "Both — full skill stack", icon: "layers" },
];

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const { signIn, signUp, configured } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [goal, setGoal] = useState("rac");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res =
        mode === "login" ? await signIn(email, password) : await signUp(name, email, password, goal);
      if (res.error) setError(res.error);
      else router.push("/dashboard");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-[13px] text-ink-muted hover:text-ink">
        <Icon name="arrowLeft" className="h-4 w-4" /> Back
      </Link>

      <div className="mb-6">
        <div className="brand-chip mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
          {mode === "login" ? "Welcome back" : "Create your profile"}
        </div>
        <h1 className="text-[28px] font-black tracking-tighter">
          {mode === "login" ? "Pick up where you left off." : "Start your zone."}
        </h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
          {mode === "login"
            ? "Your mastery, streaks and badges sync down to this device."
            : "Progress, personalisation and exam history — saved to your account and mirrored offline."}
        </p>
      </div>

      {!configured && (
        <div className="mb-4 rounded-2xl border border-accent-amber/30 bg-accent-amber/[0.08] p-3.5 text-[12.5px] leading-relaxed text-accent-amber">
          Supabase environment variables are missing on this deployment. You can still study — progress is stored on
          this device only.
        </div>
      )}

      <form onSubmit={submit} className="space-y-3.5">
        {mode === "signup" && (
          <div>
            <label className="label" htmlFor="name">
              Display name
            </label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rafiq Hasan"
              autoComplete="name"
              required
              maxLength={28}
            />
          </div>
        )}

        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={show ? "text" : "password"}
              className="input pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              minLength={6}
              required
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
              aria-label={show ? "Hide password" : "Show password"}
            >
              <Icon name={show ? "lock" : "search"} className="h-4 w-4" />
            </button>
          </div>
        </div>

        {mode === "signup" && (
          <div>
            <span className="label">Your goal</span>
            <div className="grid gap-2">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left text-[13.5px] transition-colors",
                    goal === g.id ? "border-brand-400/60 bg-brand-500/12 text-white" : "border-line bg-surface-2/50 text-ink-muted",
                  )}
                >
                  <Icon name={g.icon} className={cn("h-4 w-4", goal === g.id ? "text-brand-300" : "text-ink-faint")} />
                  <span className="flex-1 font-medium">{g.label}</span>
                  {goal === g.id && <Icon name="check" className="h-4 w-4 text-accent-lime" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-accent-rose/30 bg-accent-rose/[0.08] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-accent-rose">
            {error}
          </div>
        )}

        <button type="submit" className="btn-primary w-full" disabled={busy}>
          {busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
          {!busy && <Icon name="arrowRight" className="h-4 w-4" />}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-line" />
        <span className="text-[11px] uppercase tracking-widest text-ink-faint">or</span>
        <div className="h-px flex-1 bg-line" />
      </div>

      <Link href="/dashboard" className="btn-ghost w-full">
        <Icon name="play" className="h-4 w-4" /> Continue without an account
      </Link>

      <p className="mt-5 text-center text-[13px] text-ink-muted">
        {mode === "login" ? (
          <>
            New here?{" "}
            <Link href="/auth/signup" className="font-semibold text-brand-300 hover:text-brand-200">
              Create a profile
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-brand-300 hover:text-brand-200">
              Sign in
            </Link>
          </>
        )}
      </p>
      <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-faint">
        Guest mode stores everything on this device only. Sign in any time to keep it across devices.
      </p>
    </div>
  );
}
