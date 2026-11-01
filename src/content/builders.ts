import type {
  Bloom,
  MCQItem,
  MultiItem,
  NumericItem,
  ShortItem,
  SubjectId,
  TFItem,
  MatchItem,
  OrderItem,
} from "./types";

type Extra = { bloom?: Bloom; tags?: string[]; passageId?: string };

/**
 * Compact item constructors. Authoring 600+ assessment items by hand is only
 * sustainable if each one is a single readable call.
 */
export function bankFor(subject: SubjectId) {
  return {
    mcq(
      id: string,
      topic: string,
      diff: MCQItem["diff"],
      q: string,
      options: string[],
      answer: number,
      why: string,
      extra?: Extra,
    ): MCQItem {
      return { id, subject, topic, diff, format: "mcq", q, options, answer, why, ...extra };
    },
    multi(
      id: string,
      topic: string,
      diff: MultiItem["diff"],
      q: string,
      options: string[],
      answers: number[],
      why: string,
      extra?: Extra,
    ): MultiItem {
      return { id, subject, topic, diff, format: "multi", q, options, answers, why, ...extra };
    },
    tf(
      id: string,
      topic: string,
      diff: TFItem["diff"],
      q: string,
      answer: boolean,
      why: string,
      extra?: Extra,
    ): TFItem {
      return { id, subject, topic, diff, format: "tf", q, answer, why, ...extra };
    },
    num(
      id: string,
      topic: string,
      diff: NumericItem["diff"],
      q: string,
      answer: number,
      why: string,
      opts?: Extra & { tolerance?: number; unit?: string },
    ): NumericItem {
      return {
        id,
        subject,
        topic,
        diff,
        format: "numeric",
        q,
        answer,
        tolerance: opts?.tolerance ?? Math.max(0.02 * Math.abs(answer), 0.05),
        unit: opts?.unit,
        why,
        bloom: opts?.bloom,
        tags: opts?.tags,
      };
    },
    short(
      id: string,
      topic: string,
      diff: ShortItem["diff"],
      q: string,
      accept: string[],
      why: string,
      extra?: Extra,
    ): ShortItem {
      return { id, subject, topic, diff, format: "short", q, accept, why, ...extra };
    },
    match(
      id: string,
      topic: string,
      diff: MatchItem["diff"],
      q: string,
      left: string[],
      right: string[],
      solution: number[],
      why: string,
    ): MatchItem {
      return { id, subject, topic, diff, format: "match", q, left, right, solution, why };
    },
    order(
      id: string,
      topic: string,
      diff: OrderItem["diff"],
      q: string,
      steps: string[],
      why: string,
    ): OrderItem {
      return { id, subject, topic, diff, format: "order", q, steps, why };
    },
  };
}
