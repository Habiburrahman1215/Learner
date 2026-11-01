import type { Block, Lesson, SubjectId } from "./types";

/* ============================================================
   md() — a deliberately tiny markdown dialect.
   It keeps lesson source readable inside TypeScript while
   compiling to structured blocks the reader can style well.

     ## Heading            → h
     ### Sub-heading      → h3
     - bullet             → ul  (consecutive lines group)
     1. step              → ol  (consecutive lines group)
     > callout            → callout
     >> tip               → tip
     $ formula            → formula   (rendered monospace)
     | a | b |            → table     (first row = head, needs a |---| divider or not)
     term :: definition   → key       (consecutive lines group)
     !title|step|step|... → example table (title bolded, last row = answer)
     blank line separated → p
   ============================================================ */

const VOID = new Set(["", "---"]);

export function md(src: string): Block[] {
  const lines = src.replace(/\r/g, "").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  const pushPara = (buf: string[]) => {
    const t = buf.join(" ").trim();
    if (t) blocks.push({ k: "p", t });
  };

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trimEnd();
    const t = line.trim();

    if (VOID.has(t)) {
      i++;
      continue;
    }

    if (t.startsWith("### ")) {
      blocks.push({ k: "h3", t: t.slice(4) });
      i++;
      continue;
    }
    if (t.startsWith("## ")) {
      blocks.push({ k: "h", t: t.slice(3) });
      i++;
      continue;
    }

    if (t.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ k: "ul", items });
      continue;
    }

    if (/^\d+\.\s/.test(t)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push({ k: "ol", items });
      continue;
    }

    if (t.startsWith(">> ")) {
      blocks.push({ k: "tip", t: t.slice(3) });
      i++;
      continue;
    }
    if (t.startsWith("> ")) {
      blocks.push({ k: "callout", t: t.slice(2) });
      i++;
      continue;
    }

    if (t.startsWith("$ ")) {
      blocks.push({ k: "formula", t: t.slice(2) });
      i++;
      continue;
    }

    if (t.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i]
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim());
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
        i++;
      }
      blocks.push({ k: "table", head: rows[0] ?? [], rows: rows.slice(1) });
      continue;
    }

    if (t.includes(" :: ")) {
      const items: { term: string; def: string }[] = [];
      while (i < lines.length && lines[i].includes(" :: ")) {
        const [term, ...rest] = lines[i].split(" :: ");
        items.push({ term: term.trim(), def: rest.join(" :: ").trim() });
        i++;
      }
      blocks.push({ k: "key", items });
      continue;
    }

    if (t.startsWith("! ")) {
      // ! Example title | line | line | ⇒ answer
      const parts = t.slice(2).split("|").map((p) => p.trim());
      blocks.push({
        k: "table",
        head: [`Worked example — ${parts[0]}`, ""],
        rows: parts.slice(1).map((p) => (p.startsWith("⇒") ? ["Answer", p.slice(1).trim()] : ["Step", p])),
      });
      i++;
      continue;
    }

    // paragraph: consume until a blank line or a block marker
    const buf: string[] = [];
    while (i < lines.length) {
      const cur = lines[i];
      const tt = cur.trim();
      if (
        VOID.has(tt) ||
        tt.startsWith("- ") ||
        tt.startsWith("## ") ||
        tt.startsWith("### ") ||
        tt.startsWith("> ") ||
        tt.startsWith("$ ") ||
        tt.startsWith("|") ||
        tt.startsWith("! ") ||
        /^\d+\.\s/.test(tt) ||
        tt.includes(" :: ")
      )
        break;
      buf.push(tt);
      i++;
    }
    pushPara(buf);
  }

  return blocks;
}

/** Build a lesson without repeating the module/subject plumbing. */
export function lesson(
  subject: SubjectId,
  moduleId: string,
  id: string,
  title: string,
  minutes: number,
  topics: string[],
  src: string,
  extra?: Partial<Pick<Lesson, "subtitle" | "drill">>,
): Lesson {
  return {
    id,
    subject,
    moduleId,
    title,
    minutes,
    topics,
    blocks: md(src),
    ...extra,
  };
}
