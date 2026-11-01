"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Item } from "@/content/types";
import { lessonById } from "@/content";
import {
  addMinutes,
  applyAnswer,
  emptyState,
  levelInfo,
  recordExam,
  touchStreak,
  type AnswerOutcome,
  type ExamResult,
  type LearnerState,
} from "./engine/progress-model";
import { getSupabase, supabaseConfigured, type Profile } from "./supabase";

const STORAGE_KEY = "hlz.state.v3";
const GUEST_KEY = "hlz.guest.v1";

export type SyncState = "idle" | "syncing" | "synced" | "offline" | "error" | "guest";

export interface Toast {
  id: number;
  title: string;
  body?: string;
  tone?: "default" | "success" | "warn" | "xp";
}

interface Ctx {
  hydrated: boolean;
  learner: LearnerState;
  user: Profile | null;
  authLoading: boolean;
  online: boolean;
  syncState: SyncState;
  configured: boolean;
  toasts: Toast[];
  toast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
  answer: (item: Item, correct: boolean, opts?: { combo?: number; seconds?: number }) => AnswerOutcome;
  addStudyMinutes: (m: number) => void;
  saveExam: (r: ExamResult) => void;
  patch: (fn: (s: LearnerState) => LearnerState) => void;
  toggleBookmark: (id: string) => void;
  setSettings: (s: Partial<LearnerState["settings"]>) => void;
  resetProgress: () => void;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (displayName: string, email: string, password: string, goal: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (patch: Partial<Pick<Profile, "display_name" | "avatar" | "goal">>) => Promise<{ error?: string }>;
  syncNow: () => Promise<void>;
  guestName: string;
  setGuestName: (n: string) => void;
}

const AppCtx = createContext<Ctx | null>(null);

const readLocal = (): LearnerState => {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as LearnerState;
    if (!parsed || parsed.version !== 3) return emptyState();
    return { ...emptyState(), ...parsed };
  } catch {
    return emptyState();
  }
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [learner, setLearner] = useState<LearnerState>(() => emptyState());
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<Profile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [online, setOnline] = useState(true);
  const [syncState, setSyncState] = useState<SyncState>("idle");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [guestName, setGuestNameState] = useState("Learner");

  const toastId = useRef(0);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const learnerRef = useRef(learner);
  learnerRef.current = learner;

  /* ---------------- toasts ---------------- */
  const toast = useCallback((t: Omit<Toast, "id">) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3800);
  }, []);
  const dismissToast = useCallback((id: number) => setToasts((p) => p.filter((t) => t.id !== id)), []);

  /* ---------------- hydrate ---------------- */
  useEffect(() => {
    setLearner(readLocal());
    setGuestNameState(localStorage.getItem(GUEST_KEY) ?? "Learner");
    setHydrated(true);
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  /* ---------------- persist locally (always, even offline) ---------------- */
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(learner));
    } catch {
      /* quota — ignore, the in-memory state still works */
    }
  }, [learner, hydrated]);

  /* ---------------- auth ---------------- */
  const loadProfile = useCallback(async (id: string) => {
    const sb = getSupabase();
    if (!sb) return null;
    const { data } = await sb.from("profiles").select("*").eq("id", id).maybeSingle();
    return (data as Profile) ?? null;
  }, []);

  const pullRemoteState = useCallback(async (id: string): Promise<LearnerState | null> => {
    const sb = getSupabase();
    if (!sb) return null;
    const { data } = await sb.from("learner_state").select("state").eq("user_id", id).maybeSingle();
    const remote = (data?.state ?? null) as LearnerState | null;
    if (!remote || typeof remote !== "object" || !("version" in remote)) return null;
    return { ...emptyState(), ...remote };
  }, []);

  const pushRemote = useCallback(async (state: LearnerState, profile: Profile) => {
    const sb = getSupabase();
    if (!sb) return;
    setSyncState("syncing");
    try {
      const { error: stateError } = await sb
        .from("learner_state")
        .upsert({ user_id: profile.id, state, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
      if (stateError) throw stateError;
      const level = levelInfo(state.xp).level;
      const { error: profileError } = await sb
        .from("profiles")
        .update({
          xp: state.xp,
          level,
          streak: state.streak.current,
          answers: state.stats.answers,
          correct: state.stats.correct,
          minutes: Math.round(state.stats.minutes),
        })
        .eq("id", profile.id);
      if (profileError) throw profileError;
      setSyncState("synced");
    } catch {
      setSyncState(navigator.onLine ? "error" : "offline");
    }
  }, []);

  const adoptSession = useCallback(
    async (session: { user: { id: string; email?: string; user_metadata?: Record<string, unknown> } } | null) => {
      if (!session) {
        setUser(null);
        setAuthLoading(false);
        setSyncState(supabaseConfigured() ? "idle" : "guest");
        return;
      }
      const sb = getSupabase();
      let profile = await loadProfile(session.user.id);
      if (!profile && sb) {
        // Trigger normally creates this; fall back for older accounts.
        const fallbackName =
          (session.user.user_metadata?.display_name as string) || session.user.email?.split("@")[0] || "Learner";
        await sb.from("profiles").upsert({ id: session.user.id, display_name: fallbackName }, { onConflict: "id" });
        profile = await loadProfile(session.user.id);
      }
      setUser(profile);
      setAuthLoading(false);

      if (profile) {
        const remote = await pullRemoteState(profile.id);
        const local = learnerRef.current;
        const localIsBlank = local.stats.answers === 0 && Object.keys(local.topics).length === 0;
        if (remote && (localIsBlank || remote.xp > local.xp)) {
          setLearner(remote);
          setSyncState("synced");
        } else {
          await pushRemote(local, profile);
        }
      }
    },
    [loadProfile, pullRemoteState, pushRemote],
  );

  useEffect(() => {
    if (!hydrated) return;
    const sb = getSupabase();
    if (!sb) {
      setAuthLoading(false);
      setSyncState("guest");
      return;
    }
    let alive = true;
    sb.auth.getSession().then(({ data }) => {
      if (!alive) return;
      void adoptSession(data.session);
    });
    const { data: sub } = sb.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") void adoptSession(session);
      if (event === "SIGNED_OUT") setUser(null);
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, [hydrated, adoptSession]);

  /* ---------------- debounced cloud sync ---------------- */
  useEffect(() => {
    if (!hydrated || !user || !online) return;
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => void pushRemote(learnerRef.current, user), 2500);
    return () => {
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [learner.xp, learner.stats.answers, user?.id, online, hydrated]);

  /* ---------------- mutations ---------------- */
  const patch = useCallback((fn: (s: LearnerState) => LearnerState) => {
    setLearner((prev) => fn(prev));
  }, []);

  const answer = useCallback(
    (item: Item, correct: boolean, opts?: { combo?: number; seconds?: number }) => {
      // Compute eagerly against the ref so the caller can render immediate
      // feedback (XP, combo, badges) in the same event handler.
      const base = touchStreak(learnerRef.current);
      const outcome = applyAnswer(base, item, correct, {
        ...opts,
        topicLabel: lessonById[item.topic]?.title,
      });
      learnerRef.current = outcome.state;
      setLearner(outcome.state);
      return outcome;
    },
    [],
  );

  const addStudyMinutes = useCallback((m: number) => patch((s) => addMinutes(touchStreak(s), Math.max(0, Math.round(m)))), [patch]);
  const saveExam = useCallback(
    (r: ExamResult) => {
      patch((s) => recordExam(touchStreak(s), r));
      toast({ title: "Mock saved", body: `${r.title} · ${r.percent.toFixed(0)}%`, tone: r.percent >= 80 ? "success" : "default" });
    },
    [patch, toast],
  );

  const toggleBookmark = useCallback(
    (id: string) =>
      patch((s) => ({
        ...s,
        bookmarks: s.bookmarks.includes(id) ? s.bookmarks.filter((b) => b !== id) : [id, ...s.bookmarks].slice(0, 200),
      })),
    [patch],
  );

  const setSettings = useCallback(
    (s: Partial<LearnerState["settings"]>) => patch((prev) => ({ ...prev, settings: { ...prev.settings, ...s } })),
    [patch],
  );

  const resetProgress = useCallback(() => {
    const fresh = emptyState();
    setLearner(fresh);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    void pushRemoteIfSignedIn(fresh);
    toast({ title: "Progress reset", body: "Your local learner record is empty again." });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  const pushRemoteIfSignedIn = async (state: LearnerState) => {
    if (user) await pushRemote(state, user);
  };

  const setGuestName = useCallback((n: string) => {
    const clean = n.trim().slice(0, 28) || "Learner";
    setGuestNameState(clean);
    localStorage.setItem(GUEST_KEY, clean);
  }, []);

  /* ---------------- auth actions ---------------- */
  const signIn = useCallback(async (email: string, password: string) => {
    const sb = getSupabase();
    if (!sb) return { error: "Supabase is not configured on this deployment." };
    const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
    return error ? { error: friendlyAuthError(error.message) } : {};
  }, []);

  const signUp = useCallback(async (displayName: string, email: string, password: string, goal: string) => {
    const sb = getSupabase();
    if (!sb) return { error: "Supabase is not configured on this deployment." };
    const { error, data } = await sb.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { display_name: displayName.trim() || email.split("@")[0], goal },
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined,
      },
    });
    if (error) return { error: friendlyAuthError(error.message) };
    if (!data.session) {
      // auto-confirm is off on this project — tell the learner exactly what to do
      return { error: "Account created. Check your email to confirm, then sign in." };
    }
    return {};
  }, []);

  const signOut = useCallback(async () => {
    const sb = getSupabase();
    await sb?.auth.signOut();
    setUser(null);
    setSyncState("guest");
    toast({ title: "Signed out", body: "Your progress stays on this device." });
  }, [toast]);

  const updateProfile = useCallback(
    async (p: Partial<Pick<Profile, "display_name" | "avatar" | "goal">>) => {
      const sb = getSupabase();
      if (!sb || !user) {
        setLocalProfile(p);
        return {};
      }
      const { error } = await sb.from("profiles").update(p).eq("id", user.id);
      if (error) return { error: error.message };
      setUser({ ...user, ...p } as Profile);
      return {};
    },
    [user],
  );

  const setLocalProfile = (p: Partial<Pick<Profile, "display_name" | "avatar" | "goal">>) => {
    if (p.display_name) setGuestName(p.display_name);
  };

  const syncNow = useCallback(async () => {
    if (!user) return;
    await pushRemote(learnerRef.current, user);
  }, [pushRemote, user]);

  const value = useMemo<Ctx>(
    () => ({
      hydrated,
      learner,
      user,
      authLoading,
      online,
      syncState,
      configured: supabaseConfigured(),
      toasts,
      toast,
      dismissToast,
      answer,
      addStudyMinutes,
      saveExam,
      patch,
      toggleBookmark,
      setSettings,
      resetProgress,
      signIn,
      signUp,
      signOut,
      updateProfile,
      syncNow,
      guestName,
      setGuestName,
    }),
    [
      hydrated,
      learner,
      user,
      authLoading,
      online,
      syncState,
      toasts,
      toast,
      dismissToast,
      answer,
      addStudyMinutes,
      saveExam,
      patch,
      toggleBookmark,
      setSettings,
      resetProgress,
      signIn,
      signUp,
      signOut,
      updateProfile,
      syncNow,
      guestName,
      setGuestName,
    ],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

function friendlyAuthError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return "That email and password do not match an account.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "That email already has an account — try signing in.";
  if (m.includes("password should be")) return "Please use a password of at least 6 characters.";
  if (m.includes("rate limit")) return "Too many attempts. Please wait a minute and try again.";
  if (m.includes("unable to validate email")) return "That email address does not look valid.";
  return msg;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}

/* ---------------- display helpers ---------------- */

export function useDisplayName() {
  const { user, guestName } = useApp();
  return user?.display_name ?? guestName;
}
