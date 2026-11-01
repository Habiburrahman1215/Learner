import type { FormulaEntry, GlossaryEntry, Item, Lesson, Module, Passage, Subject, SubjectId } from "./types";
import { racSubject } from "./rac";
import { racItems } from "./rac/questions";
import { gedMathSubject } from "./ged/math";
import { gedMathItems } from "./ged/math-items";
import { gedRlaSubject, rlaPassages } from "./ged/rla";
import { gedRlaItems } from "./ged/rla-items";
import { gedScienceSubject } from "./ged/science";
import { gedScienceItems } from "./ged/science-items";
import { gedSocialSubject } from "./ged/social";
import { gedSocialItems } from "./ged/social-items";

export const subjects: Subject[] = [racSubject, gedMathSubject, gedRlaSubject, gedScienceSubject, gedSocialSubject];

export const subjectById = Object.fromEntries(subjects.map((s) => [s.id, s])) as Record<SubjectId, Subject>;

export const staticItems: Item[] = [
  ...racItems,
  ...gedMathItems,
  ...gedRlaItems,
  ...gedScienceItems,
  ...gedSocialItems,
];

export const passages: Passage[] = rlaPassages;
export const passageById = Object.fromEntries(passages.map((p) => [p.id, p])) as Record<string, Passage>;

/* ---------- flattened indexes built once at module load ---------- */

export const allModules: Module[] = subjects.flatMap((s) => s.modules);

export const allLessons: Lesson[] = allModules.flatMap((m) => m.lessons);

export const lessonById = Object.fromEntries(allLessons.map((l) => [l.id, l])) as Record<string, Lesson>;

export const moduleById = Object.fromEntries(allModules.map((m) => [m.id, m])) as Record<string, Module>;

export const lessonModule = (lessonId: string): Module | undefined => {
  const l = lessonById[lessonId];
  return l ? moduleById[l.moduleId] : undefined;
};

export const lessonOrder = allLessons.map((l) => l.id);

/** Every distinct topic that questions can be generated or selected for. */
export const topicsBySubject = subjects.reduce<Record<string, { id: string; label: string }[]>>((acc, s) => {
  const seen = new Map<string, string>();
  for (const m of s.modules) {
    for (const l of m.lessons) {
      for (const t of l.topics) {
        if (!seen.has(t)) seen.set(t, labelForTopic(t, m));
      }
    }
  }
  acc[s.id] = [...seen.entries()].map(([id, label]) => ({ id, label }));
  return acc;
}, {});

function labelForTopic(topic: string, m: Module): string {
  if (topic === m.id) return m.title;
  const suffixes: Record<string, string> = {
    "rac-safety": "Safety",
    "rac-env": "Environment & law",
    "rac-assessment": "Assessment",
    "rac-refrigerants": "Refrigerants",
    "rac-electrical": "Electrical",
    "rac-split-service": "Split service",
    "gm-percent": "Percent",
    "gm-functions": "Functions",
    "gm-stats": "Statistics",
    "gm-data": "Data analysis",
    "gm-prob": "Probability",
    "gr-lit": "Literary reading",
    "gr-info": "Informational reading",
    "gr-lang": "Language conventions",
    "gr-writing": "Extended response",
    "gs-body": "Body systems",
    "gs-climate": "Climate",
    "gss-civics": "Civics",
    "gss-history": "US history",
    "gss-econ": "Economics",
    "gss-geo": "Geography",
  };
  return suffixes[topic] ?? topic;
}

export const topicLabel = (id: string): string => {
  for (const list of Object.values(topicsBySubject)) {
    const hit = list.find((t) => t.id === id);
    if (hit) return hit.label;
  }
  return id;
};

export * from "./types";
