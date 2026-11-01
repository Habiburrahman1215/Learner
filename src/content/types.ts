/* ============================================================
   Content model — every byte of curriculum ships inside the
   app bundle, so the whole library is available offline.
   ============================================================ */

export type TrackId = "rac" | "ged";

export type SubjectId = "rac-l2" | "ged-math" | "ged-rla" | "ged-science" | "ged-social";

export type Block =
  | { k: "h"; t: string }
  | { k: "h3"; t: string }
  | { k: "p"; t: string }
  | { k: "ul"; items: string[] }
  | { k: "ol"; items: string[] }
  | { k: "callout"; t: string }
  | { k: "tip"; t: string }
  | { k: "formula"; t: string }
  | { k: "table"; head: string[]; rows: string[][] }
  | { k: "key"; items: { term: string; def: string }[] };

export interface Lesson {
  id: string;
  subject: SubjectId;
  moduleId: string;
  title: string;
  subtitle?: string;
  minutes: number;
  blocks: Block[];
  /** topic tags → drive mastery tracking + question generation */
  topics: string[];
  /** practice item ids worth doing right after reading */
  drill?: string[];
}

export interface Module {
  id: string;
  subject: SubjectId;
  title: string;
  /** official unit of competency / content domain, when applicable */
  code?: string;
  hours?: number;
  summary: string;
  icon: string;
  lessons: Lesson[];
}

export interface Subject {
  id: SubjectId;
  track: TrackId;
  title: string;
  short: string;
  tagline: string;
  description: string;
  icon: string;
  /** tailwind-friendly hex used for gradients */
  hue: string;
  hue2: string;
  /** exam shape shown to the learner */
  exam: { label: string; minutes: number; items: string; pass: string };
  modules: Module[];
}

/* ---------------- assessment items ---------------- */

export type QFormat = "mcq" | "multi" | "tf" | "numeric" | "short" | "match" | "order" | "cloze";

export type Bloom = "remember" | "understand" | "apply" | "analyze" | "evaluate";

export interface ItemBase {
  id: string;
  subject: SubjectId;
  topic: string;
  diff: 1 | 2 | 3 | 4 | 5;
  format: QFormat;
  /** full stem, markdown-lite inline allowed */
  q: string;
  /** explanation shown after answering */
  why: string;
  bloom?: Bloom;
  tags?: string[];
  passageId?: string;
  /** generated items are never persisted to the bank */
  generated?: boolean;
}

export interface MCQItem extends ItemBase {
  format: "mcq";
  options: string[];
  answer: number;
}
export interface MultiItem extends ItemBase {
  format: "multi";
  options: string[];
  answers: number[];
}
export interface TFItem extends ItemBase {
  format: "tf";
  answer: boolean;
}
export interface NumericItem extends ItemBase {
  format: "numeric";
  answer: number;
  tolerance?: number;
  unit?: string;
}
export interface ShortItem extends ItemBase {
  format: "short";
  accept: string[];
}
export interface MatchItem extends ItemBase {
  format: "match";
  left: string[];
  right: string[];
  /** index map: left i ↔ right answer[i] */
  solution: number[];
}
export interface OrderItem extends ItemBase {
  format: "order";
  steps: string[];
}

export type Item = MCQItem | MultiItem | TFItem | NumericItem | ShortItem | MatchItem | OrderItem;

export interface Passage {
  id: string;
  subject: SubjectId;
  title: string;
  kind: string;
  text: string;
}

export interface GlossaryEntry {
  term: string;
  def: string;
  subject: SubjectId | "both";
  topic: string;
}

export interface FormulaEntry {
  name: string;
  expr: string;
  note: string;
  subject: SubjectId;
}
