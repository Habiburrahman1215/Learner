# HR Learning Zone

An offline-first learning, practice and assessment zone for:

- **NSDA Refrigeration & Air Conditioning Level 2** (National Skills Certificate, BNQF Level 2, Light Engineering) — `CAD-LE-RAC-L2-EN-V2`
- **GED** — Reasoning Through Language Arts, Mathematical Reasoning, Science, Social Studies

Designed & developed by **HR**. Next.js 15 (App Router) · React 19 · Tailwind 3 · Supabase (auth + sync) · Vercel (hosting).

---

## What it does

| Area | Detail |
| --- | --- |
| **Library** | 5 subjects, 17 modules, 60+ lessons written from the competency standards and GED content domains |
| **Item bank** | 348 hand-written items across all 8 response formats (MCQ, multi-select, true/false, numeric, short answer, match, order) + 38 parametric generators that compute their own answers |
| **Practice** | Choose subject → topics → formats → count → difficulty. Adaptive, weakest-topic or random selection; interleaved by design |
| **Mock exams** | 5 blueprints weighted like the real tests (RAC theory, GED Math/RLA/Science/Social), plus custom exams |
| **Review** | SM-2-lite spaced repetition over every answered item, with generated items cached so they can return |
| **Progress** | Bayesian knowledge tracing per topic, Elo-style item difficulty, XP/levels, 16 badges, daily quests, streaks, exam history |
| **Offline** | Service worker precaches the shell and every asset; all content is compiled into the bundle; state is local-first |
| **Account** | Supabase email/password auth, profile, leaderboard, and progress sync (local wins, remote adopts when newer) |

### The 70-20-10 rule

Applied twice, deliberately:

- **Pedagogy** — 70 % doing (practice, mocks, review, quests), 20 % feedback (explanations, result diagnostics, hints), 10 % instruction (lessons, glossary, formula sheet, standards).
- **Interface** — ~70 % neutral surface, 20 % structural line/type hierarchy, 10 % accent colour. Lime is reserved for the single next action.

---

## Run it

```bash
npm install
cp .env.example .env.local   # add your Supabase URL + anon key
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run typecheck
```

Without Supabase credentials the app still runs fully: it falls back to guest mode with device-local progress.

### Environment

```
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
```

Never place a service-role key in a `NEXT_PUBLIC_*` variable or the client bundle.

### Database

The Supabase schema is already provisioned for project `vcmrfexrfxsnjwzrnvfy`:

- `profiles` (display name, handle, avatar, goal, xp, level, streak, answers, correct, minutes)
- `learner_state` (one JSONB state document per user, `revision` counter)
- `study_sessions`, `bookmarks`
- `leaderboard` view (`security_invoker = true`, authenticated only)
- triggers: `handle_new_user()` (profile + de-duplicated handle + empty state), `touch_updated_at()`

RLS is enabled on every table; users can only read/write their own rows (profiles are readable by authenticated users for the leaderboard).

---

## Architecture

```
src/
  app/            route groups — (main) holds the shell; auth and landing are standalone
  components/     AppShell, QuestionRunner, LessonBlocks, ui primitives, AuthForm
  content/        typed content data: RAC + GED lessons, item banks, passages, reference
  lib/
    engine/       core (RNG, prepare/grade), generators, selection, progress model
    store.tsx     local-first provider + Supabase sync
    derive.ts     UI-level computations over the learner state
    item-cache.ts bounded snapshot so generated items can be reviewed later
    sfx.ts        WebAudio synth (no audio assets)
public/           manifest, service worker, icons
```

### Engine decisions worth knowing

- Presentation order is shuffled at `prepare()`; grading happens in presentation coordinates (`optionOrder`, `rightOrder`, `stepOrder`).
- Selection scores every candidate on mastery gap, spacing, difficulty fit and recency, then samples — targeting 70–85 % expected success.
- Mastery updates per answer with a BKT-style learning rate; item difficulty drifts Elo-style from observed performance.
- Wrong items return in ~30 minutes; correct ones grow to an 180-day cap.
- Generated items are ephemeral — they are cached on answer so the review queue can still resolve them.

---

## Verification

`GET /api/selftest` runs a content/engine integrity sweep in the deployed app:

- every static item round-trips through `prepare → expectedAnswer → grade`
- every generator produces gradeable items with resolvable topics
- no duplicate IDs, no orphan topics, no missing drill references
- every blueprint fills its item quota; every single-topic session is non-empty
- mastery/XP math sanity checks

---

## Deploy

Vercel project **`hr-learning-zone`** (team `learner-4579`) is created with both Supabase environment variables set for production, preview and development.

Deployment requires the repository to be readable by Vercel's GitHub app (Vercel → Account Settings → Login Connections → GitHub → connect). Once connected, deploy the branch:

```bash
vercel --prod        # or redeploy from the Vercel dashboard
```

## Disclaimer

Independent study aid. Not affiliated with NSDA, BTEB or GED Testing Service. Refrigerant handling and electrical work must be performed by competent persons under national regulations.
