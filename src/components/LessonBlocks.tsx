"use client";

import type { Block } from "@/content/types";
import { Inline } from "./ui";

export function LessonBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-lesson">
      {blocks.map((b, i) => {
        switch (b.k) {
          case "h":
            return <h2 key={i}>{b.t}</h2>;
          case "h3":
            return <h3 key={i}>{b.t}</h3>;
          case "p":
            return (
              <p key={i}>
                <Inline text={b.t} />
              </p>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mb-4 list-decimal space-y-2 pl-6">
                {b.items.map((it, j) => (
                  <li key={j} className="pl-1 marker:font-semibold marker:text-brand-300">
                    <Inline text={it} />
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <div key={i} className="callout">
                <Inline text={b.t} />
              </div>
            );
          case "tip":
            return (
              <div key={i} className="callout-tip">
                <Inline text={b.t} />
              </div>
            );
          case "formula":
            return (
              <div key={i} className="formula">
                {b.t}
              </div>
            );
          case "table":
            return (
              <div key={i} className="my-5 -mx-1 overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j}>
                          <Inline text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k}>
                            <Inline text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "key":
            return (
              <dl key={i} className="my-5 space-y-2">
                {b.items.map((it, j) => (
                  <div key={j} className="rounded-xl border border-line bg-surface-2/50 px-3.5 py-2.5">
                    <dt className="text-[13px] font-semibold text-white">{it.term}</dt>
                    <dd className="mt-0.5 text-[13px] leading-relaxed text-ink-muted">
                      <Inline text={it.def} />
                    </dd>
                  </div>
                ))}
              </dl>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
