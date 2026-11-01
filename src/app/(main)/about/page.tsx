"use client";

import Link from "next/link";
import { allLessons, staticItems, subjects } from "@/content";
import { generators } from "@/lib/engine/generators";
import { Bar, Icon, SectionHeader } from "@/components/ui";

const PILLARS = [
  {
    n: 70,
    title: "Doing — 70 %",
    body: "Seventy per cent of the time you spend here should be answering, not reading. Practice, mock exams, spaced review and the daily quests are all built to push you into recall. The dashboard surfaces the session, not the library.",
    tone: "lime" as const,
  },
  {
    n: 20,
    title: "Feedback — 20 %",
    body: "Every answer explains itself: why the right option is right, why yours failed, what the examiner wants. Result screens name your weakest topics. Hints appear when you are stuck rather than before.",
    tone: "brand" as const,
  },
  {
    n: 10,
    title: "Instruction — 10 %",
    body: "Ten per cent is formal input: the lesson library, the glossary, the formula sheet, the competency standards. Enough to be authoritative, never so much that it becomes a textbook to hide behind.",
    tone: "amber" as const,
  },
];

export default function AboutPage() {
  const lessonCount = allLessons.length;
  const moduleCount = subjects.reduce((a, s) => a + s.modules.length, 0);

  return (
    <div className="space-y-6">
      <header className="card relative overflow-hidden p-6 text-center">
        <div className="pointer-events-none absolute inset-0 grid-veil opacity-40" />
        <div className="relative">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-900 shadow-glow">
            <span className="text-[19px] font-black tracking-tighter">HR</span>
          </div>
          <h1 className="mt-3 text-[23px] font-black tracking-tighter">HR Learning Zone</h1>
          <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-300">
            Designed &amp; developed by HR
          </p>
          <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-ink-muted">
            A complete offline + online learning, practice and assessment zone for the NSDA Refrigeration &amp; Air
            Conditioning Level 2 certificate and all four GED subjects.
          </p>
        </div>
      </header>

      <section>
        <SectionHeader title="The 70-20-10 rule" sub="Applied to both the pedagogy and the interface" />
        <div className="space-y-2.5">
          {PILLARS.map((p) => (
            <div key={p.n} className="card p-4">
              <div className="flex items-center gap-3">
                <div className="text-[26px] font-black leading-none tabular-nums text-white">{p.n}<span className="text-[14px] text-ink-faint">%</span></div>
                <div className="flex-1">
                  <div className="text-[13.5px] font-semibold">{p.title}</div>
                </div>
                <div className="w-16">
                  <Bar value={p.n / 100} tone={p.tone} height={6} />
                </div>
              </div>
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="card-flat mt-2.5 p-4">
          <p className="text-[12.5px] leading-relaxed text-ink-muted">
            <span className="font-semibold text-white">In the visual system</span> the same ratio keeps the interface
            premium and calm: roughly 70 % neutral surface, 20 % structural line and type hierarchy, and only 10 % of
            accent colour — the lime is spent on the one thing you should press next, never decoration.
          </p>
        </div>
      </section>

      <section>
        <SectionHeader title="What is inside" />
        <div className="grid grid-cols-2 gap-2">
          {[
            [String(subjects.length), "subjects"],
            [String(moduleCount), "modules"],
            [String(lessonCount), "lessons written"],
            [`${staticItems.length}`, "hand-written items"],
            [`${generators.length}`, "generators"],
            ["5", "exam blueprints"],
          ].map(([v, l]) => (
            <div key={l} className="card-flat px-3.5 py-3">
              <div className="text-[19px] font-black tabular-nums">{v}</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-5">
        <h2 className="text-[15px] font-semibold tracking-tight">Curriculum basis</h2>
        <ul className="mt-2.5 space-y-2 text-[12.5px] leading-relaxed text-ink-muted">
          <li className="flex gap-2">
            <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-lime" />
            <span>
              RAC content follows <span className="font-mono text-[11px] text-ink">CAD-LE-RAC-L2-EN-V2</span> — the five
              units, 300 nominal hours, competency-based C/NYC judgement, RPL entry and the assessment evidence types.
            </span>
          </li>
          <li className="flex gap-2">
            <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-lime" />
            <span>
              Trade content reflects field practice under Bangladesh conditions: 33–35 °C ambient design, monsoon
              humidity, single-phase 220 V supplies, load-shedding and generator operation.
            </span>
          </li>
          <li className="flex gap-2">
            <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-lime" />
            <span>
              GED content covers the four published content domains with the real item mix — numeric entry, drag-style
              ordering, matching, multi-select, source analysis and extended-response planning.
            </span>
          </li>
        </ul>
        <p className="mt-3 rounded-xl border border-line bg-surface-2/50 px-3.5 py-2.5 text-[11.5px] leading-relaxed text-ink-faint">
          This is an independent study aid and is not affiliated with NSDA, BTEB, or GED Testing Service. Refrigerant
          handling and electrical work must be carried out by competent persons under the relevant national regulations.
        </p>
      </section>

      <section>
        <SectionHeader title="Offline architecture" sub="Why it keeps working with no signal" />
        <div className="card divide-y divide-line">
          {[
            ["Content bundling", "Lessons, items, passages, glossary and formulas are TypeScript data compiled into the app — no fetch, no CMS."],
            ["Service worker", "Shell and static assets are precached; navigations fall back to cache, so a cold launch offline still opens."],
            ["Local-first state", "Progress is written to localStorage on every answer, then pushed to Supabase when a session and connection exist."],
            ["Conflict rule", "On sign-in, the newer/higher-XP state wins — your offline work is never silently dropped."],
            ["Generators", "Parametric questions compute their own answers at runtime, so practice never runs dry offline."],
          ].map(([t, d]) => (
            <div key={t} className="px-4 py-3">
              <div className="text-[12.5px] font-semibold">{t}</div>
              <div className="mt-0.5 text-[11.5px] leading-relaxed text-ink-muted">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-5 text-center">
        <p className="text-[13px] leading-relaxed text-ink-muted">
          Built with Next.js, React and Tailwind. Auth and sync on Supabase. Deployed on Vercel.
        </p>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
          © {new Date().getFullYear()} HR · all content written for this project
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Link href="/dashboard" className="btn-primary !py-2.5 text-[12.5px]">Go to dashboard</Link>
          <Link href="/reference" className="btn-ghost !py-2.5 text-[12.5px]">Reference</Link>
        </div>
      </section>
    </div>
  );
}
