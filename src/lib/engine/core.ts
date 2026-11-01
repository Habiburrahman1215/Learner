import type { Item, QFormat, SubjectId } from "@/content/types";

/* ============================================================
   Core primitives for the practice engine.
   ============================================================ */

export type Answer =
  | { kind: "mcq"; index: number }
  | { kind: "multi"; indices: number[] }
  | { kind: "tf"; value: boolean }
  | { kind: "numeric"; value: number | null }
  | { kind: "short"; text: string }
  | { kind: "match"; mapping: number[] }
  | { kind: "order"; order: number[] };

export interface Grade {
  correct: boolean;
  /** 0..1 — used for match/order partial credit in feedback only */
  score: number;
}

/* ---------------- deterministic RNG ---------------- */

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function random() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Rng = () => number;

export const hashString = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export function shuffle<T>(arr: readonly T[], rng: Rng): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const pick = <T,>(arr: readonly T[], rng: Rng): T => arr[Math.floor(rng() * arr.length)];
export const randInt = (min: number, max: number, rng: Rng) => Math.floor(rng() * (max - min + 1)) + min;
export const round = (n: number, dp = 2) => Math.round(n * 10 ** dp) / 10 ** dp;

/* ---------------- normalisation ---------------- */

const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s.]/gu, "")
    .replace(/\s+/g, " ")
    .trim();

/* ---------------- presentation ---------------- */

export interface PreparedQuestion {
  item: Item;
  /** options for choice formats (already shuffled for match columns) */
  options: string[];
  /** for match: the right-hand column in presentation order, mapped to original indices */
  rightOrder?: number[];
  /** for order: the steps in presentation order, mapped to original indices */
  stepOrder?: number[];
  /** for mcq/multi: mapping from presentation index → original option index */
  optionOrder?: number[];
}

export function prepare(item: Item, rng: Rng): PreparedQuestion {
  switch (item.format) {
    case "mcq":
    case "multi": {
      const idx = shuffle(item.options.map((_, i) => i), rng);
      return { item, options: idx.map((i) => item.options[i]), optionOrder: idx };
    }
    case "tf":
      return { item, options: ["True", "False"] };
    case "numeric":
    case "short":
      return { item, options: [] };
    case "match": {
      const idx = shuffle(item.right.map((_, i) => i), rng);
      return { item, options: idx.map((i) => item.right[i]), rightOrder: idx };
    }
    case "order": {
      const idx = shuffle(item.steps.map((_, i) => i), rng);
      return { item, options: idx.map((i) => item.steps[i]), stepOrder: idx };
    }
    default:
      return { item, options: [] };
  }
}

/** The correct answer expressed in *presentation* coordinates. */
export function expectedAnswer(p: PreparedQuestion): Answer {
  const it = p.item;
  switch (it.format) {
    case "mcq": {
      const pos = p.optionOrder!.indexOf(it.answer);
      return { kind: "mcq", index: pos };
    }
    case "multi": {
      const set = new Set(it.answers);
      const positions = p.optionOrder!.map((orig, pos) => (set.has(orig) ? pos : -1)).filter((i) => i >= 0);
      return { kind: "multi", indices: positions };
    }
    case "tf":
      return { kind: "tf", value: it.answer };
    case "numeric":
      return { kind: "numeric", value: it.answer };
    case "short":
      return { kind: "short", text: it.accept[0] };
    case "match": {
      // mapping[leftIndex] = presentation position of the correct right item
      const mapping = it.solution.map((origRight) => p.rightOrder!.indexOf(origRight));
      return { kind: "match", mapping };
    }
    case "order": {
      // order[i] = original index at each presentation slot when sorted correctly
      return { kind: "order", order: it.steps.map((_, orig) => p.stepOrder!.indexOf(orig)) };
    }
  }
}

/* ---------------- grading ---------------- */

export function grade(item: Item, given: Answer | null, p?: PreparedQuestion): Grade {
  if (!given) return { correct: false, score: 0 };

  switch (item.format) {
    case "mcq": {
      if (given.kind !== "mcq") return { correct: false, score: 0 };
      const expected = p ? p.optionOrder!.indexOf(item.answer) : item.answer;
      const ok = given.index === expected;
      return { correct: ok, score: ok ? 1 : 0 };
    }
    case "multi": {
      if (given.kind !== "multi") return { correct: false, score: 0 };
      const expSet = new Set(item.answers);
      const givenOrig = p
        ? given.indices.map((i) => p.optionOrder![i]).filter((v) => v !== undefined)
        : given.indices;
      const givenSet = new Set(givenOrig);
      if (expSet.size !== givenSet.size) return { correct: false, score: 0 };
      for (const v of expSet) if (!givenSet.has(v)) return { correct: false, score: 0 };
      return { correct: true, score: 1 };
    }
    case "tf": {
      if (given.kind !== "tf") return { correct: false, score: 0 };
      return { correct: given.value === item.answer, score: given.value === item.answer ? 1 : 0 };
    }
    case "numeric": {
      if (given.kind !== "numeric" || given.value === null || Number.isNaN(given.value))
        return { correct: false, score: 0 };
      const tol = item.tolerance ?? Math.max(0.02 * Math.abs(item.answer), 0.05);
      const ok = Math.abs(given.value - item.answer) <= tol;
      return { correct: ok, score: ok ? 1 : 0 };
    }
    case "short": {
      if (given.kind !== "short") return { correct: false, score: 0 };
      const g = normalise(given.text);
      if (!g) return { correct: false, score: 0 };
      const ok = item.accept.some((a) => {
        const n = normalise(a);
        return g === n || (n.length > 4 && g.includes(n));
      });
      return { correct: ok, score: ok ? 1 : 0 };
    }
    case "match": {
      if (given.kind !== "match") return { correct: false, score: 0 };
      const exp = item.solution.map((origRight) => (p ? p.rightOrder!.indexOf(origRight) : origRight));
      const hits = exp.reduce((acc, v, i) => acc + (given.mapping[i] === v ? 1 : 0), 0);
      const score = hits / exp.length;
      return { correct: score === 1, score };
    }
    case "order": {
      if (given.kind !== "order") return { correct: false, score: 0 };
      const expected = p ? item.steps.map((_, orig) => p.stepOrder!.indexOf(orig)) : item.steps.map((_, i) => i);
      const hits = expected.reduce((acc, v, i) => acc + (given.order[i] === v ? 1 : 0), 0);
      const score = hits / expected.length;
      return { correct: score === 1, score };
    }
    default:
      return { correct: false, score: 0 };
  }
}

export const formatLabel: Record<QFormat, string> = {
  mcq: "Multiple choice",
  multi: "Select all that apply",
  tf: "True / false",
  numeric: "Numeric answer",
  short: "Short answer",
  match: "Match the pairs",
  order: "Put in order",
  cloze: "Fill the blank",
};

export const formatHint: Record<QFormat, string> = {
  mcq: "Choose one",
  multi: "Choose every correct option",
  tf: "True or false",
  numeric: "Type a number",
  short: "Type a word or phrase",
  match: "Tap a pair for each item",
  order: "Drag or tap to sequence",
  cloze: "Complete the sentence",
};
