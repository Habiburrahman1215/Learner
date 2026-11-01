import type { Item, SubjectId } from "@/content/types";

/* ============================================================
   Learner model.

   mastery  — a BKT-flavoured belief that the learner can do this
              topic now, updated with difficulty-weighted evidence.
   ability  — Elo-style latent skill used to pick the next
              difficulty (kept at 70–85 % expected success).
   srs      — SM-2-lite scheduling so old material returns just
              before it is forgotten.
   ============================================================ */

export interface TopicStat {
  mastery: number; // 0..1
  ability: number; // 0..1
  attempts: number;
  correct: number;
  lastAt: number;
  lastName?: string;
}

export interface SrsCard {
  id: string;
  ease: number;
  interval: number; // days
  due: number; // epoch ms
  reps: number;
  lapses: number;
}

export interface SeenEntry {
  lastAt: number;
  correct: number;
  wrong: number;
  firstAt: number;
}

export type QuestKind = "answer" | "correct" | "minutes" | "topics" | "exam" | "streak";

export interface Quest {
  id: string;
  kind: QuestKind;
  label: string;
  target: number;
  progress: number;
  xp: number;
  claimed?: boolean;
}

export interface ExamResult {
  blueprint: string;
  title: string;
  score: number;
  total: number;
  percent: number;
  at: number;
  minutes: number;
}

export interface LearnerState {
  version: 3;
  xp: number;
  streak: { current: number; best: number; lastDay: string | null };
  topics: Record<string, TopicStat>;
  srs: Record<string, SrsCard>;
  seen: Record<string, SeenEntry>;
  badges: string[];
  quests: { date: string; items: Quest[]; claimed: string[] };
  dailyXp: Record<string, number>;
  stats: { sessions: number; answers: number; correct: number; minutes: number; bestCombo: number };
  exams: ExamResult[];
  bookmarks: string[];
  readLessons: string[];
  recent: { itemId: string; topic: string; correct: boolean; at: number; subject: SubjectId }[];
  settings: { sound: boolean; haptics: boolean; reduceMotion: boolean; autoPlayAudio: boolean };
}

export const emptyState = (): LearnerState => ({
  version: 3,
  xp: 0,
  streak: { current: 0, best: 0, lastDay: null },
  topics: {},
  srs: {},
  seen: {},
  badges: [],
  quests: { date: "", items: [], claimed: [] },
  dailyXp: {},
  stats: { sessions: 0, answers: 0, correct: 0, minutes: 0, bestCombo: 0 },
  exams: [],
  bookmarks: [],
  readLessons: [],
  recent: [],
  settings: { sound: true, haptics: true, reduceMotion: false, autoPlayAudio: false },
});

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

export const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/* ---------------- levels ---------------- */

export const LEVEL_TITLES = [
  "Apprentice",
  "Helper",
  "Junior Technician",
  "Technician",
  "Senior Technician",
  "Supervisor",
  "Master Technician",
  "Assessor",
  "Mentor",
  "Legend",
];

export const xpForLevel = (level: number) => Math.round(120 * Math.pow(level, 1.55));

export function levelInfo(xp: number) {
  let level = 1;
  while (level < 40 && xp >= xpForLevel(level + 1)) level++;
  const floor = level === 1 ? 0 : xpForLevel(level);
  const ceil = xpForLevel(level + 1);
  const into = xp - floor;
  const span = Math.max(ceil - floor, 1);
  return {
    level,
    title: LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)],
    progress: clamp(into / span),
    toNext: Math.max(ceil - xp, 0),
    floor,
    ceiling: ceil,
  };
}

/* ---------------- mastery ---------------- */

export function updateTopic(
  state: LearnerState,
  topic: string,
  item: Item,
  correct: boolean,
  label?: string,
): LearnerState {
  const prev: TopicStat =
    state.topics[topic] ?? { mastery: 0, ability: 0.5, attempts: 0, correct: 0, lastAt: 0 };

  // Expected success from the Elo-style ability vs the item's difficulty.
  const expected = 1 / (1 + Math.exp(-(prev.ability * 7 - (item.diff - 3) * 1.9 + 0.35)));
  const score = correct ? 1 : 0;
  const ability = clamp(prev.ability + 0.24 * (score - expected));

  // Difficulty-weighted learning rate: getting a hard item right moves mastery more.
  const lr = (correct ? 0.3 : 0.26) * (0.72 + 0.09 * item.diff);
  const mastery = clamp(prev.mastery + lr * (score - prev.mastery));

  return {
    ...state,
    topics: {
      ...state.topics,
      [topic]: {
        mastery,
        ability,
        attempts: prev.attempts + 1,
        correct: prev.correct + score,
        lastAt: Date.now(),
        lastName: label ?? prev.lastName,
      },
    },
  };
}

/* ---------------- spaced repetition (SM-2 lite) ---------------- */

export function updateSrs(state: LearnerState, itemId: string, correct: boolean): Record<string, SrsCard> {
  const now = Date.now();
  const card: SrsCard = state.srs[itemId] ?? {
    id: itemId,
    ease: 2.4,
    interval: 0,
    due: now,
    reps: 0,
    lapses: 0,
  };

  let { ease, interval, reps, lapses } = card;

  if (correct) {
    reps += 1;
    ease = clamp(ease + 0.08, 1.4, 3.2);
    interval = interval === 0 ? 1 : interval < 1 ? 2 : Math.min(interval * ease, 180);
  } else {
    lapses += 1;
    ease = clamp(ease - 0.22, 1.3, 3.2);
    reps = Math.max(reps - 1, 0);
    interval = 0.02; // ≈ 30 minutes — relearn today
  }

  return {
    ...state.srs,
    [itemId]: { id: itemId, ease, interval, reps, lapses, due: now + interval * 86_400_000 },
  };
}

export function dueCards(state: LearnerState, limit = 40): SrsCard[] {
  const now = Date.now();
  return Object.values(state.srs)
    .filter((c) => c.due <= now)
    .sort((a, b) => a.due - b.due)
    .slice(0, limit);
}

/* ---------------- quests ---------------- */

export function makeQuests(date: string, seedNum: number): Quest[] {
  const pool: Omit<Quest, "progress">[] = [
    { id: "q-answer", kind: "answer", label: "Answer 15 questions", target: 15, xp: 60 },
    { id: "q-correct", kind: "correct", label: "Get 10 answers right", target: 10, xp: 80 },
    { id: "q-minutes", kind: "minutes", label: "Study for 10 minutes", target: 10, xp: 50 },
    { id: "q-topics", kind: "topics", label: "Practise 3 different topics", target: 3, xp: 70 },
    { id: "q-exam", kind: "exam", label: "Finish one timed mock", target: 1, xp: 120 },
    { id: "q-streak", kind: "streak", label: "Keep your streak alive", target: 1, xp: 40 },
  ];
  const pickCount = 3;
  const chosen: Quest[] = [];
  for (let i = 0; i < pickCount; i++) {
    const q = pool[(seedNum + i * 3) % pool.length];
    if (chosen.some((c) => c.id === q.id)) continue;
    chosen.push({ ...q, progress: 0 });
  }
  return chosen;
}

export function ensureQuests(state: LearnerState): LearnerState {
  const today = dayKey();
  if (state.quests.date === today && state.quests.items.length) return state;
  const seed = today.split("-").reduce((a, b) => a + Number(b), 0);
  return { ...state, quests: { date: today, items: makeQuests(today, seed), claimed: [] } };
}

/* ---------------- answer application ---------------- */

export interface AnswerOutcome {
  state: LearnerState;
  xp: number;
  combo: number;
  newBadges: string[];
  questsCompleted: Quest[];
}

export function applyAnswer(
  state: LearnerState,
  item: Item,
  correct: boolean,
  opts: { combo?: number; seconds?: number; topicLabel?: string } = {},
): AnswerOutcome {
  let next: LearnerState = ensureQuests(state);
  next = updateTopic(next, item.topic, item, correct, opts.topicLabel);
  const srs = updateSrs(next, item.id, correct);
  next = { ...next, srs };

  const seen = next.seen[item.id];
  next.seen = {
    ...next.seen,
    [item.id]: {
      lastAt: Date.now(),
      correct: (seen?.correct ?? 0) + (correct ? 1 : 0),
      wrong: (seen?.wrong ?? 0) + (correct ? 0 : 1),
      firstAt: seen?.firstAt ?? Date.now(),
    },
  };

  // XP: difficulty-weighted, with a speed bonus and a combo multiplier.
  const base = correct ? 8 + item.diff * 4 : 3;
  const combo = correct ? (opts.combo ?? 0) + 1 : 0;
  const comboMult = 1 + Math.min(combo, 10) * 0.05;
  const speedBonus = correct && opts.seconds !== undefined && opts.seconds < 12 ? 4 : 0;
  const xp = correct ? Math.round((base + speedBonus) * comboMult) : base;

  next.xp += xp;
  const today = dayKey();
  next.dailyXp = { ...next.dailyXp, [today]: (next.dailyXp[today] ?? 0) + xp };
  next.stats = {
    ...next.stats,
    answers: next.stats.answers + 1,
    correct: next.stats.correct + (correct ? 1 : 0),
    bestCombo: Math.max(next.stats.bestCombo, combo),
  };
  next.recent = [
    { itemId: item.id, topic: item.topic, correct, at: Date.now(), subject: item.subject },
    ...next.recent,
  ].slice(0, 80);

  // Quests
  const quests = next.quests.items.map((q) => {
    let progress = q.progress;
    if (q.kind === "answer") progress += 1;
    if (q.kind === "correct" && correct) progress += 1;
    if (q.kind === "topics") {
      const distinct = new Set(next.recent.filter((r) => dayKey(new Date(r.at)) === today).map((r) => r.topic));
      progress = Math.max(progress, distinct.size);
    }
    if (q.kind === "streak") progress = Math.max(progress, next.streak.current);
    return { ...q, progress: Math.min(progress, q.target) };
  });
  const completedNow = quests.filter((q) => q.progress >= q.target && !next.quests.claimed.includes(q.id));
  for (const q of completedNow) next.xp += q.xp;
  next.quests = {
    ...next.quests,
    items: quests,
    claimed: [...next.quests.claimed, ...completedNow.map((q) => q.id)],
  };

  const newBadges = evaluateBadges(next);
  next.badges = [...next.badges, ...newBadges];

  return { state: next, xp, combo, newBadges, questsCompleted: completedNow };
}

export function addMinutes(state: LearnerState, minutes: number): LearnerState {
  const next = { ...state, stats: { ...state.stats, minutes: state.stats.minutes + minutes } };
  next.quests = {
    ...next.quests,
    items: next.quests.items.map((q) =>
      q.kind === "minutes" ? { ...q, progress: Math.min(q.progress + minutes, q.target) } : q,
    ),
  };
  return next;
}

export function touchStreak(state: LearnerState): LearnerState {
  const today = dayKey();
  if (state.streak.lastDay === today) return state;
  const yesterday = dayKey(new Date(Date.now() - 86_400_000));
  const current = state.streak.lastDay === yesterday ? state.streak.current + 1 : 1;
  return {
    ...state,
    streak: { current, best: Math.max(state.streak.best, current), lastDay: today },
  };
}

export function recordExam(state: LearnerState, result: ExamResult): LearnerState {
  const next: LearnerState = {
    ...state,
    exams: [result, ...state.exams].slice(0, 30),
    stats: { ...state.stats, sessions: state.stats.sessions + 1 },
    xp: state.xp + Math.round(result.percent * 3),
  };
  next.quests = {
    ...next.quests,
    items: next.quests.items.map((q) => (q.kind === "exam" ? { ...q, progress: Math.min(q.progress + 1, q.target) } : q)),
  };
  return next;
}

/* ---------------- badges ---------------- */

export interface BadgeDef {
  id: string;
  name: string;
  desc: string;
  icon: string;
  test: (s: LearnerState) => boolean;
}

export const BADGES: BadgeDef[] = [
  { id: "first-step", name: "First Step", desc: "Answer your first question", icon: "🌱", test: (s) => s.stats.answers >= 1 },
  { id: "ten-correct", name: "Getting Warm", desc: "10 correct answers", icon: "🔥", test: (s) => s.stats.correct >= 10 },
  { id: "fifty-correct", name: "Half Century", desc: "50 correct answers", icon: "🎯", test: (s) => s.stats.correct >= 50 },
  { id: "century", name: "Centurion", desc: "100 correct answers", icon: "💯", test: (s) => s.stats.correct >= 100 },
  { id: "combo-10", name: "On Fire", desc: "10 correct in a row", icon: "⚡", test: (s) => s.stats.bestCombo >= 10 },
  { id: "streak-3", name: "Habit Forming", desc: "3-day streak", icon: "📅", test: (s) => s.streak.best >= 3 },
  { id: "streak-7", name: "Week Warrior", desc: "7-day streak", icon: "🏅", test: (s) => s.streak.best >= 7 },
  { id: "streak-30", name: "Unbreakable", desc: "30-day streak", icon: "🏆", test: (s) => s.streak.best >= 30 },
  { id: "first-exam", name: "Exam Ready", desc: "Complete a timed mock", icon: "🧪", test: (s) => s.exams.length >= 1 },
  { id: "exam-pass", name: "Mock Cleared", desc: "Score 80 %+ on a mock", icon: "✅", test: (s) => s.exams.some((e) => e.percent >= 80) },
  { id: "level-5", name: "Technician", desc: "Reach level 5", icon: "🔧", test: (s) => levelInfo(s.xp).level >= 5 },
  { id: "level-10", name: "Master", desc: "Reach level 10", icon: "👑", test: (s) => levelInfo(s.xp).level >= 10 },
  { id: "topics-10", name: "Generalist", desc: "Practise 10 different topics", icon: "🧭", test: (s) => Object.keys(s.topics).length >= 10 },
  { id: "mastered-5", name: "Mastery", desc: "Reach 80 % mastery in 5 topics", icon: "💎", test: (s) => Object.values(s.topics).filter((t) => t.mastery >= 0.8).length >= 5 },
  { id: "night-owl", name: "Night Shift", desc: "Study after midnight", icon: "🌙", test: () => new Date().getHours() < 5 },
  { id: "all-subjects", name: "Across the Board", desc: "Practise all five subjects", icon: "🌍", test: (s) => new Set(s.recent.map((r) => r.subject)).size >= 5 },
];

export function evaluateBadges(state: LearnerState): string[] {
  return BADGES.filter((b) => !state.badges.includes(b.id) && b.test(state)).map((b) => b.id);
}

export const badgeById = Object.fromEntries(BADGES.map((b) => [b.id, b]));

/* ---------------- derived analytics ---------------- */

export function subjectReadiness(state: LearnerState, topicIds: string[]): number {
  if (!topicIds.length) return 0;
  const total = topicIds.reduce((acc, t) => acc + (state.topics[t]?.mastery ?? 0), 0);
  return total / topicIds.length;
}

export function accuracy(state: LearnerState): number {
  return state.stats.answers ? state.stats.correct / state.stats.answers : 0;
}

export function last7Days(state: LearnerState): { day: string; xp: number }[] {
  const out: { day: string; xp: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86_400_000);
    const k = dayKey(d);
    out.push({ day: k.slice(5), xp: state.dailyXp[k] ?? 0 });
  }
  return out;
}
