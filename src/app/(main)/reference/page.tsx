"use client";

import { useMemo, useState } from "react";
import { glossary, formulas } from "@/content/reference";
import { subjects, subjectById } from "@/content";
import { cn, Empty, Icon } from "@/components/ui";

type Tab = "glossary" | "formulas" | "standards";

const STANDARDS = [
  {
    group: "Qualification",
    rows: [
      ["Qualification", "National Skills Certificate in Refrigeration and Air Conditioning"],
      ["BNQF level", "Level 2 — semi-skilled / junior technician band"],
      ["Sector", "Light Engineering"],
      ["Course code", "CAD-LE-RAC-L2-EN-V2"],
      ["Job title", "Junior Technician"],
      ["Total hours", "300 (280 learning + 20 workplace visit)"],
      ["Outcome", "Competent (C) or Not Yet Competent (NYC) — no percentage"],
      ["Entry", "NSC RAC Level 1, or open entry through RPL"],
    ],
  },
  {
    group: "Units",
    rows: [
      ["GU-09-L2-V1", "Work in a Team Environment — 20 h"],
      ["OU-LE-RAC-01-L2-V2", "Check and Maintain Compressors — 20 h"],
      ["OU-LE-RAC-02-L2-V2", "Service and Repair Window Type ACs — 60 h"],
      ["OU-LE-RAC-03-L2-V2", "Service and Repair Split Type ACs — 120 h"],
      ["OU-LE-RAC-04-L2-V2", "Install Split Type ACs — 60 h"],
    ],
  },
  {
    group: "GED scoring",
    rows: [
      ["Passing standard", "145 per subject (score range 100–200)"],
      ["College ready", "165 per subject"],
      ["College ready + credit", "175 per subject"],
      ["Mathematical Reasoning", "115 minutes · 2 parts · calculator for part 2"],
      ["Reasoning Through Language Arts", "150 minutes + 45-minute extended response"],
      ["Science", "90 minutes · includes short answers and 2-part items"],
      ["Social Studies", "70 minutes · includes graphs and document analysis"],
    ],
  },
];

export default function ReferencePage() {
  const [tab, setTab] = useState<Tab>("glossary");
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState<string>("all");

  const g = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return glossary
      .filter((e) => (subject === "all" ? true : e.subject === subject || e.subject === "both"))
      .filter((e) => !needle || e.term.toLowerCase().includes(needle) || e.def.toLowerCase().includes(needle))
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [q, subject]);

  const f = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return formulas
      .filter((e) => (subject === "all" ? true : e.subject === subject))
      .filter((e) => !needle || e.name.toLowerCase().includes(needle) || e.expr.toLowerCase().includes(needle) || e.note.toLowerCase().includes(needle));
  }, [q, subject]);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-[24px] font-black tracking-tighter">Reference</h1>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
          Glossary, formula sheet and the standards worth memorising. All of it lives on the device — no lookups needed.
        </p>
      </header>

      <div className="rail">
        {([
          ["glossary", `Glossary · ${glossary.length}`],
          ["formulas", `Formulas · ${formulas.length}`],
          ["standards", "Standards"],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
              tab === id ? "border-brand-400/50 bg-brand-500/15 text-white" : "border-line bg-surface-2/40 text-ink-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab !== "standards" && (
        <>
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tab === "glossary" ? "Search terms and definitions…" : "Search formulas…"}
              className="input !pl-10"
            />
          </div>

          <div className="rail">
            <button
              onClick={() => setSubject("all")}
              className={cn("whitespace-nowrap rounded-full px-3 py-1 text-[11.5px] font-semibold", subject === "all" ? "bg-brand-500/20 text-brand-200" : "text-ink-faint")}
            >
              All
            </button>
            {subjects.map((s) => (
              <button
                key={s.id}
                onClick={() => setSubject(s.id)}
                className={cn("whitespace-nowrap rounded-full px-3 py-1 text-[11.5px] font-semibold", subject === s.id ? "bg-brand-500/20 text-brand-200" : "text-ink-faint")}
              >
                {s.short}
              </button>
            ))}
          </div>
        </>
      )}

      {tab === "glossary" && (
        <div className="space-y-2">
          {g.length === 0 ? (
            <Empty icon="search" title="No matches" body="Try a shorter search term." />
          ) : (
            g.map((e) => (
              <div key={`${e.term}-${e.topic}`} className="card-flat px-4 py-3">
                <div className="flex items-start gap-2">
                  <h3 className="text-[13.5px] font-semibold text-white">{e.term}</h3>
                  <span className="ml-auto shrink-0 rounded-full bg-surface-3 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-ink-faint">
                    {e.subject === "both" ? "both" : subjectById[e.subject].short}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">{e.def}</p>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "formulas" && (
        <div className="space-y-2">
          {f.length === 0 ? (
            <Empty icon="search" title="No matches" body="Try a shorter search term." />
          ) : (
            f.map((e) => (
              <div key={e.name} className="card-flat px-4 py-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-semibold">{e.name}</h3>
                  <span className="ml-auto text-[9.5px] font-semibold uppercase tracking-wider text-ink-faint">
                    {subjectById[e.subject].short}
                  </span>
                </div>
                <div className="mt-1.5 overflow-x-auto rounded-lg border border-line/70 bg-black/30 px-3 py-2">
                  <code className="whitespace-nowrap font-mono text-[12.5px] text-accent-lime">{e.expr}</code>
                </div>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-faint">{e.note}</p>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "standards" && (
        <div className="space-y-4">
          {STANDARDS.map((sec) => (
            <div key={sec.group} className="card overflow-hidden">
              <div className="border-b border-line px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-300">
                {sec.group}
              </div>
              <dl className="divide-y divide-line">
                {sec.rows.map(([k, v]) => (
                  <div key={k} className="flex gap-3 px-4 py-2.5">
                    <dt className="w-[42%] shrink-0 font-mono text-[11px] leading-snug text-ink-faint">{k}</dt>
                    <dd className="flex-1 text-[12.5px] leading-snug text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          <p className="px-1 text-[11px] leading-relaxed text-ink-faint">
            Source basis: NSDA Course Accreditation Document CAD-LE-RAC-L2-EN-V2 and the published GED content
            domains. Study aid only — always confirm assessment arrangements with your accredited training provider.
          </p>
        </div>
      )}
    </div>
  );
}
