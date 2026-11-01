import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui";
import { subjects, allLessons, staticItems } from "@/content";

export const metadata: Metadata = {
  title: "HR Learning Zone — learn RAC Level 2 and GED like a game",
  description:
    "The ultimate offline + online learning zone for NSDA RAC Level 2 and all four GED subjects: lessons, adaptive practice, mock exams and a progress profile that follows you.",
};

const FEATURES = [
  {
    icon: "wifiOff",
    title: "Works with the internet off",
    body: "Every lesson, formula, passage and question is baked into the app. Install it once, study anywhere — load-shedding included.",
  },
  {
    icon: "target",
    title: "Questions that adapt to you",
    body: "The engine reads your mastery per topic, then generates practice at the difficulty where you actually learn — never too easy, never hopeless.",
  },
  {
    icon: "cards",
    title: "Spaced review that remembers",
    body: "Miss something and it comes back in 30 minutes. Get it right twice and it waits a week. Old knowledge stops leaking.",
  },
  {
    icon: "trophy",
    title: "Game feel, real progress",
    body: "XP, combos, levels, badges, daily quests and streaks — the mechanics that make games sticky, pointed at your certificate.",
  },
];

export default function Landing() {
  const lessonCount = allLessons.length;
  const itemCount = staticItems.length;
  const moduleCount = subjects.reduce((a, s) => a + s.modules.length, 0);

  return (
    <div className="relative overflow-hidden">
      {/* ---------------- nav ---------------- */}
      <header className="sticky top-0 z-40 border-b border-line/60 bg-canvas/75 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          <div className="flex items-center gap-2.5">
            <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-900">
              <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/15" />
              <span className="text-[11px] font-black tracking-tighter">HR</span>
            </span>
            <span className="text-[13.5px] font-bold tracking-tight">
              HR Learning Zone
            </span>
          </div>
          <nav className="ml-auto hidden items-center gap-6 text-[13px] font-medium text-ink-muted sm:flex">
            <a href="#subjects" className="hover:text-ink">Subjects</a>
            <a href="#engine" className="hover:text-ink">How it works</a>
            <a href="#offline" className="hover:text-ink">Offline</a>
          </nav>
          <Link href="/dashboard" className="btn-quiet ml-auto text-[13px] sm:ml-0">
            Continue
          </Link>
          <Link href="/auth/signup" className="btn-primary !px-4 !py-2 text-[13px]">
            Start free
          </Link>
        </div>
      </header>

      {/* ---------------- hero ---------------- */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 grid-veil opacity-70" />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-10 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="brand-chip mx-auto animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
              NSDA · BNQF Level 2 · GED 2026 ready
            </div>

            <h1 className="mt-5 animate-fade-up text-balance text-[34px] font-black leading-[1.06] tracking-[-0.035em] sm:text-[56px]" style={{ animationDelay: "60ms" }}>
              Master <span className="brand-text">RAC Level 2</span>
              <br className="hidden sm:block" /> and all four <span className="text-accent-lime">GED</span> subjects.
            </h1>

            <p className="mx-auto mt-4 max-w-xl animate-fade-up text-pretty text-[15px] leading-relaxed text-ink-muted sm:text-[16.5px]" style={{ animationDelay: "120ms" }}>
              A learning, practice and assessment zone that feels like a game and works like a textbook.
              Refrigeration &amp; Air Conditioning to the NSDA standard, plus Mathematical Reasoning, RLA,
              Science and Social Studies — all of it on your phone, all of it offline.
            </p>

            <div className="mt-7 flex animate-fade-up flex-col items-center justify-center gap-2.5 sm:flex-row" style={{ animationDelay: "180ms" }}>
              <Link href="/practice" className="btn-primary w-full sm:w-auto">
                <Icon name="play" className="h-4 w-4" /> Start practising now
              </Link>
              <Link href="/auth/signup" className="btn-ghost w-full sm:w-auto">
                <Icon name="user" className="h-4 w-4" /> Create your profile
              </Link>
            </div>
            <p className="mt-3 animate-fade-up text-[11.5px] text-ink-faint" style={{ animationDelay: "220ms" }}>
              No card. No download size limit. Guest mode available — sign in later and keep your progress.
            </p>
          </div>

          {/* stat strip */}
          <div className="mx-auto mt-12 grid max-w-3xl animate-fade-up grid-cols-2 gap-2 sm:grid-cols-4" style={{ animationDelay: "260ms" }}>
            {[
              { v: subjects.length, l: "full subjects" },
              { v: moduleCount, l: "modules" },
              { v: lessonCount, l: "lessons" },
              { v: `${itemCount}+`, l: "written items" },
            ].map((s) => (
              <div key={s.l} className="card-flat px-3 py-3 text-center">
                <div className="text-[22px] font-black tabular-nums tracking-tight text-white">{s.v}</div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- subjects ---------------- */}
      <section id="subjects" className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="section-title">The library</div>
            <h2 className="mt-1 text-[24px] font-bold tracking-tight sm:text-[30px]">Five subjects. One zone.</h2>
          </div>
          <Link href="/learn" className="hidden text-[13px] font-semibold text-brand-300 hover:text-brand-200 sm:block">
            Browse all →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s, i) => (
            <Link
              key={s.id}
              href={`/learn/${s.id}`}
              className="card group relative overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-0.5"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-35"
                style={{ background: `radial-gradient(circle, ${s.hue}, transparent 70%)` }}
              />
              <div className="relative">
                <span
                  className="mb-3 grid h-11 w-11 place-items-center rounded-2xl border border-white/10"
                  style={{ background: `linear-gradient(140deg, ${s.hue}22, ${s.hue2}12)` }}
                >
                  <Icon name={s.icon} className="h-5 w-5" style={{ color: s.hue }} />
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-[16px] font-semibold tracking-tight">{s.title}</h3>
                </div>
                <p className="mt-1 text-[11.5px] font-medium uppercase tracking-[0.1em]" style={{ color: s.hue }}>
                  {s.tagline}
                </p>
                <p className="mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-ink-muted">{s.description}</p>
                <div className="mt-3 flex items-center gap-3 text-[11.5px] text-ink-faint">
                  <span>{s.modules.length} modules</span>
                  <span className="h-1 w-1 rounded-full bg-ink-faint/40" />
                  <span>{s.modules.reduce((a, m) => a + m.lessons.length, 0)} lessons</span>
                  <span className="ml-auto text-brand-300">Open →</span>
                </div>
              </div>
            </Link>
          ))}

          <div className="card relative overflow-hidden border-dashed p-5">
            <div className="flex h-full flex-col justify-center">
              <span className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-accent-lime/10 text-accent-lime">
                <Icon name="sparkles" className="h-5 w-5" />
              </span>
              <h3 className="text-[16px] font-semibold">+ infinite generated practice</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                Every numeric topic has a parametric generator: new values, same reasoning, computed answer.
                Run out of questions is not a thing here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- features ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-5">
              <div className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/12 text-brand-300">
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{f.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- engine ---------------- */}
      <section id="engine" className="mx-auto max-w-6xl px-4 py-12">
        <div className="card relative overflow-hidden p-6 sm:p-9">
          <div className="absolute inset-0 grid-veil opacity-40" />
          <div className="relative grid gap-8 sm:grid-cols-2">
            <div>
              <div className="section-title">The algorithm</div>
              <h2 className="mt-1 text-[24px] font-bold tracking-tighter sm:text-[30px]">
                It picks the next question the way a good tutor would.
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                Not random. Every candidate item is scored on five signals, then sampled — so the session you
                get is the one you need today.
              </p>
              <div className="mt-5 space-y-2.5">
                {[
                  ["Mastery gap", "Topics you are weak at get more turns."],
                  ["Spacing", "Cards return just before you would forget them."],
                  ["Difficulty fit", "Aimed at 70–85 % success — the productive zone."],
                  ["Recency", "You will not see the same item twice in a session."],
                  ["Interleaving", "Topics mix, so you practise choosing, not just recalling."],
                ].map(([t, d], i) => (
                  <div key={t} className="flex gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-surface-3 text-[10px] font-bold text-brand-300">
                      {i + 1}
                    </span>
                    <p className="text-[13px] leading-snug">
                      <span className="font-semibold text-ink">{t}</span>
                      <span className="text-ink-muted"> — {d}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="card-flat p-4">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-semibold text-ink-muted">Your session profile</span>
                  <span className="accent-pill">live</span>
                </div>
                <div className="mt-3 space-y-2.5">
                  {[
                    ["Superheat & subcooling", 0.42, "#5EE7F0"],
                    ["Refrigerant handling", 0.71, "#8A8CFF"],
                    ["Compressor diagnosis", 0.58, "#FFC24B"],
                    ["Linear functions", 0.83, "#B7F25C"],
                  ].map(([label, v, c]) => (
                    <div key={label as string}>
                      <div className="mb-1 flex justify-between text-[11.5px]">
                        <span className="text-ink-muted">{label}</span>
                        <span className="tabular-nums text-ink-faint">{Math.round((v as number) * 100)}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
                        <div className="h-full rounded-full" style={{ width: `${(v as number) * 100}%`, background: c as string }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-flat p-4">
                <p className="text-[12.5px] leading-relaxed text-ink-muted">
                  <span className="font-semibold text-white">Try it cold.</span> Choose your subject, your format
                  (multiple choice, numeric, match, sequence, short answer), how many questions and whether you
                  want it adaptive. The engine handles the rest.
                </p>
                <Link href="/practice" className="btn-brand mt-3 w-full !py-2.5 text-[13px]">
                  Build a session
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- offline ---------------- */}
      <section id="offline" className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Install it", "Add to home screen. It opens like an app, with no store and no account required to start."],
            ["Then forget the network", "Lessons, passages, glossary, formulas and generators all live in the bundle."],
            ["Sync when you can", "Sign in and your XP, mastery and streaks sync to your profile the moment you are online."],
          ].map(([t, d], i) => (
            <div key={t} className="card-flat p-5">
              <div className="mb-2 text-[11px] font-black tracking-widest text-brand-300">0{i + 1}</div>
              <h3 className="text-[15px] font-semibold">{t}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-gradient-to-br from-brand-900/60 via-surface to-surface p-8 text-center sm:p-12">
          <div className="pointer-events-none absolute inset-0 grid-veil opacity-50" />
          <div className="relative">
            <h2 className="text-balance text-[26px] font-black tracking-tighter sm:text-[36px]">
              Your certificate is a habit, not an event.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-ink-muted">
              Ten minutes a day beats a weekend of cramming. Start with a five-question session — the streak does
              the rest.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
              <Link href="/auth/signup" className="btn-primary w-full sm:w-auto">
                Create your free profile
              </Link>
              <Link href="/learn" className="btn-ghost w-full sm:w-auto">
                Read a lesson first
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- footer ---------------- */}
      <footer className="border-t border-line/60 px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-900 text-[10px] font-black">
                HR
              </span>
              <span className="text-[13px] font-semibold">HR Learning Zone</span>
            </div>
            <p className="mt-2 text-[12px] text-ink-faint">
              Designed &amp; developed by <span className="font-semibold text-ink-muted">HR</span> · Offline-first PWA ·
              Next.js + Supabase · Deployed on Vercel
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-ink-faint">
            <Link href="/reference" className="hover:text-ink">Reference</Link>
            <Link href="/about" className="hover:text-ink">About</Link>
            <Link href="/auth/login" className="hover:text-ink">Sign in</Link>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-[11px] leading-relaxed text-ink-faint">
          Curriculum is aligned to NSDA Course Accreditation Document CAD-LE-RAC-L2-EN-V2 (National Skills Certificate in
          Refrigeration and Air Conditioning, BNQF Level 2) and the GED content domains. This is an independent study aid
          and is not affiliated with NSDA, BTEB or GED Testing Service.
        </p>
      </footer>
    </div>
  );
}
