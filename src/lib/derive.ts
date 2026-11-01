import { subjects, allLessons, lessonById, topicsBySubject, moduleById } from "@/content";
import type { Lesson, Subject, SubjectId } from "@/content/types";
import { dueCards, type LearnerState } from "./engine/progress-model";

export function subjectStats(state: LearnerState, subject: Subject) {
  const topics = topicsBySubject[subject.id] ?? [];
  const mastery = topics.length
    ? topics.reduce((a, t) => a + (state.topics[t.id]?.mastery ?? 0), 0) / topics.length
    : 0;
  const lessonsDone = subject.modules
    .flatMap((m) => m.lessons)
    .filter((l) => (state.topics[l.moduleId]?.mastery ?? 0) > 0.35).length;
  const lessonCount = subject.modules.reduce((a, m) => a + m.lessons.length, 0);
  return { mastery, lessonsDone, lessonCount, topics };
}

export function overallReadiness(state: LearnerState) {
  const all = subjects.flatMap((s) => topicsBySubject[s.id]?.map((t) => t.id) ?? []);
  if (!all.length) return 0;
  return all.reduce((a, t) => a + (state.topics[t]?.mastery ?? 0), 0) / all.length;
}

/** The lesson most worth reading next: the weakest topic that has a lesson. */
export function recommendedLesson(state: LearnerState, subjectId?: SubjectId): { lesson: Lesson; subject: Subject; mastery: number } | null {
  const pool = subjectId ? subjects.filter((s) => s.id === subjectId) : subjects;
  let best: { lesson: Lesson; subject: Subject; mastery: number; score: number } | null = null;
  for (const subject of pool) {
    for (const mod of subject.modules) {
      for (const lesson of mod.lessons) {
        const stat = state.topics[mod.id];
        const mastery = stat?.mastery ?? 0;
        const seen = stat?.attempts ?? 0;
        // prefer low mastery, never-seen lessons, and earlier modules as tiebreak
        const score = mastery * 2 + Math.min(seen, 10) * 0.02;
        if (!best || score < best.score) best = { lesson, subject, mastery, score };
      }
    }
  }
  return best ? { lesson: best.lesson, subject: best.subject, mastery: best.mastery } : null;
}

export function nextLessonAfter(lessonId: string): { lesson: Lesson; subject: Subject } | null {
  const idx = allLessons.findIndex((l) => l.id === lessonId);
  if (idx < 0 || idx + 1 >= allLessons.length) return null;
  const next = allLessons[idx + 1];
  const subject = subjects.find((s) => s.id === next.subject)!;
  return { lesson: next, subject };
}

export function reviewQueueSize(state: LearnerState) {
  return dueCards(state, 999).length;
}

export function weakTopics(state: LearnerState, limit = 5) {
  const rows = Object.entries(state.topics)
    .map(([topic, s]) => ({ topic, mastery: s.mastery, attempts: s.attempts }))
    .filter((r) => r.attempts > 0)
    .sort((a, b) => a.mastery - b.mastery);
  return rows.slice(0, limit);
}

export function strongTopics(state: LearnerState, limit = 3) {
  return Object.entries(state.topics)
    .map(([topic, s]) => ({ topic, mastery: s.mastery }))
    .sort((a, b) => b.mastery - a.mastery)
    .slice(0, limit);
}

export function masteryBand(m: number) {
  if (m >= 0.85) return { label: "Mastered", tone: "lime" as const };
  if (m >= 0.65) return { label: "Strong", tone: "lime" as const };
  if (m >= 0.4) return { label: "Developing", tone: "amber" as const };
  if (m > 0) return { label: "Fragile", tone: "rose" as const };
  return { label: "Not started", tone: "brand" as const };
}

export function lessonsForModule(moduleId: string) {
  return moduleById[moduleId]?.lessons ?? [];
}

export function lessonMeta(lessonId: string) {
  return lessonById[lessonId];
}

export function totalLessonMinutes() {
  return allLessons.reduce((a, l) => a + l.minutes, 0);
}
