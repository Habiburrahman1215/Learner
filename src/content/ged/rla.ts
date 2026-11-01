import type { Module, Passage, Subject } from "../types";
import { lesson } from "../md";

const S = "ged-rla" as const;

export const rlaPassages: Passage[] = [
  {
    id: "ps-rla-1",
    subject: S,
    title: "The Night Bus to Sylhet",
    kind: "Literary narrative",
    text: `The bus left Dhaka at half past ten, and within an hour the city had thinned into a corridor of sodium lamps and sleeping fields. Rafiq kept his forehead against the window because the glass was the only cool thing left. His mother's letter sat folded in his shirt pocket like a second heartbeat.

He had read it eleven times. Each reading changed the number of shop workers his uncle employed, changed the colour of the shutters, changed whether the shop had a name at all. His mother wrote the way she cooked — generously, without measuring. He had learned not to build plans on her arithmetic.

Beside him, a woman in a print sari dozed with a woven basket on her knees. When the bus lurched, the basket tipped and a handful of guavas rolled under Rafiq's feet. He gathered them before she was fully awake, and she thanked him without surprise, as if the bus had merely corrected a small disorder.

At Feni, in the blue hour before sunrise, the conductor called out the stop in a voice of pure information, and the woman rose. She tucked one guava into Rafiq's hand before she stepped down. He wanted to say that he had done nothing, that handing back what had fallen was not the same as kindness, that she had misread him. He said, instead, thank you. The bus moved on. Later he understood that this was not a mistake he needed to correct.`,
  },
  {
    id: "ps-rla-2",
    subject: S,
    title: "Why Hospitals Are Starting to Prescribe Books",
    kind: "Informational / argument",
    text: `When Dr. Shafiq first suggested a reading hour in the children's ward of a Dhaka hospital, the nurses laughed. They had saline drips to monitor and frightened parents to calm; there was no time for stories. Two years later, the ward's sedative use has fallen by nearly a fifth, and the reading hour is a line item in the budget.

The mechanism is not mystical. A long hospital stay is, above all, a problem of uncertainty. A child who does not know what tomorrow looks like has no strategy for tomorrow, and the body responds to that helplessness with the same chemistry it uses for danger. A story supplies structure: it begins, it complicates, it resolves. Reading to a child restores a rhythm that the ward had taken away.

Critics point out that the evidence base is still thin. Most studies are small, and many are run by people who already believe in the result. That scepticism is healthy. But it is worth noticing what the scepticism is being applied to. Nobody asks for a double-blind trial before installing a television in a waiting room, though a television also changes how children behave. The standard we apply to cheap, low-risk, humane interventions is often far stricter than the standard we apply to expensive ones.

There is also a quieter argument. Reading aloud is one of the few activities in a hospital that is not being done *to* a child. It is not an injection, a measurement or a decision. It is company — the oldest medicine we have, and the only one with no side effects except sleepiness.`,
  },
  {
    id: "ps-rla-3",
    subject: S,
    title: "The Great Famine and the Argument Over Blame",
    kind: "Social studies / argument",
    text: `In 1943, rice prices in Bengal roughly tripled within a year. By the end of the famine, an estimated two to three million people had died. The dead were not, for the most part, killed by an absence of food. Shipments arrived; granaries held stock. They were killed by an absence of entitlement — the ability to turn the food that existed into a meal.

Historians divide their explanations into three overlapping arguments. The first blames the cyclone and the crop failures of 1942, which damaged the rice harvest and were compounded by the loss of Burma as a supplier after the Japanese advance. The second blames policy: the scorched-earth "denial" policy that removed boats and rice from coastal districts, the diversion of supply to the war effort, and the refusal of officials to declare a famine early. The third blames the market and the panic: hoarding by traders and by ordinary households, and a collapse of confidence that turned a shortage into a catastrophe.

A mature account holds all three at once, weighted differently, and refuses the comfort of a single villain. That refusal is uncomfortable, because a single villain can be prosecuted while a structure cannot. It is also the only account that generates useful lessons, since the structure of a famine — price shock, hoarding, denial, late response — repeats across centuries and continents with depressing fidelity.`,
  },
  {
    id: "ps-rla-4",
    subject: S,
    title: "The Sloth's Economy",
    kind: "Informational / science",
    text: `The three-toed sloth is a study in restraint. It climbs slowly, digests slowly, and sleeps for most of the day. Its body temperature varies with the air around it, which is unusual for a mammal. It descends from the canopy as rarely as once a week, and when it does so it is at its most vulnerable.

The reason for the slowness is energy. Leaves are a poor fuel: low in calories, hard to break down, and chemically defended. A sloth's stomach is a fermentation chamber, and digestion may take a month. An animal that spends that much time processing its food cannot afford a high metabolism; it also cannot afford to be seen by eagles.

Its most reliable defence against predators is not camouflage but invisibility of another kind — an ecosystem. Algae grow in the grooves of its coarse outer hairs, greening the coat. Moths live in the fur and deposit nutrients that feed the algae. When the sloth descends to defecate, the moths lay their eggs in the dung, and the cycle continues. Remove the moths and the algae fade; a browner sloth is a more visible sloth. The animal's survival depends on passengers it cannot see.`,
  },
];

const readingInfo: Module = {
  id: "gr-info",
  subject: S,
  title: "Reading Informational Text",
  summary: "Main idea, inference, evidence, structure and the difference between what a text says and what a text implies.",
  icon: "book",
  lessons: [
    lesson(
      S,
      "gr-info",
      "gr-l1-mainidea",
      "Main idea, inference and evidence",
      12,
      ["gr-info"],
      `
## Three levels of reading
1. **What it says** — restate the literal information.
2. **What it means** — explain the idea behind the words.
3. **What it does** — why the author used that detail, that order, that example.

GED questions are almost never level 1. The easiest questions are level 2; the hardest are level 3.

## Main idea
The **main idea** is what the whole passage is built to support. It must:
- cover the entire passage, not one paragraph,
- contain the **topic** and the author's **point about the topic**,
- be specific enough to be arguable.

| Trap | Example | Why it is wrong |
| --- | --- | --- |
| True but too narrow | A detail from paragraph 2 | Only covers part of the text |
| Too broad | "Science is important" | True of thousands of texts |
| True but off-topic | A real fact the author never mentions | It is not what the passage is about |

## Inference
An inference is a conclusion that requires **evidence from the text plus reasoning**. It must be *supported*, not merely *plausible*.

> If the passage says the narrator read the letter "eleven times" and "had learned not to build plans on her arithmetic", the safe inference is that the narrator does not fully trust what the letter says. The unsafe inference is that the narrator dislikes his mother.

Ask three questions of every inference option:
1. Is it stated anywhere? (If yes, it is not an inference — it is a recall.)
2. Is it contradicted by the text? (If yes, eliminate.)
3. Does the text give evidence for it? (If no, eliminate.)

## Finding the best evidence
The GED often asks for **the sentence that best supports the claim**. The best evidence is:
- specific rather than general,
- directly about the claim, not adjacent to it,
- the **strongest** of the available supports, not merely a true statement.

## Author's purpose
Four common purposes: **inform, explain, persuade, entertain**. A fifth — **reflect** — covers personal and narrative writing.

Signal words:
- persuade → "should", "must", "we ought", "the problem is"
- explain → "because", "the reason", "leads to", "works by"
- inform → dates, figures, descriptions without judgement
- entertain/reflect → imagery, dialogue, irony

## Tone and attitude
Tone is the author's attitude toward the subject. Read the **adjectives and verbs**, not the topic.
- "Critics point out that the evidence base is thin. That scepticism is healthy." → respectful even when disagreeing.
- "the refusal of officials to declare a famine early" → critical.

## Structure and function questions
"Why does the author include paragraph 3?" Answers are about **function**: to introduce a counterargument, to qualify a claim, to provide evidence, to shift from problem to solution, to create contrast.

The most common structural pattern in GED texts is **claim → counterclaim → qualified conclusion**. The final paragraph often revises the earlier claim rather than restating it.

## Evaluating an argument
| Element | What to find |
| --- | --- |
| Claim | The conclusion the author wants you to accept |
| Evidence | Facts, examples, statistics, testimony |
| Reasoning | The link between evidence and claim |
| Assumptions | Unstated beliefs needed for the argument to work |
| Counterargument | The opposing view, ideally addressed |

A weak argument often relies on anecdote where it needs data, or on a single example presented as a rule. A strong argument anticipates the objection.

>> Answer from the text, not from your own opinion. The passage about books in hospitals is not asking whether *you* like reading; it is asking what *the author* claims.
`,
      { subtitle: "Main idea traps, safe inference, purpose, tone, argument", drill: ["gr-001"] },
    ),
    lesson(
      S,
      "gr-info",
      "gr-l1-literary",
      "Reading literary text",
      11,
      ["gr-lit", "gr-info"],
      `
## Narrative essentials
- **Character** — revealed through action, dialogue, thought and the reactions of others. What a character *does* is more reliable than what they *say about themselves*.
- **Conflict** — internal (a character against themselves) or external (another person, society, nature).
- **Setting** — time and place, but also mood and constraint.
- **Theme** — the idea the story explores, stated as a full sentence ("Kindness is often misread by those who did not intend it"), never as one word ("kindness").
- **Point of view** — first person (I), third limited (one character's mind), third omniscient (all minds).

## Figurative language
| Device | Definition | Effect |
| --- | --- | --- |
| Simile | comparison using like/as | clarifies through the familiar |
| Metaphor | direct comparison | compresses meaning |
| Personification | human qualities to non-human | makes the abstract concrete |
| Hyperbole | deliberate exaggeration | emphasis, often humour |
| Symbol | object carrying a larger idea | creates depth |
| Irony | meaning inverted from the words | criticism, distance |
| Imagery | sensory detail | makes the reader feel present |

The question is never "what device is this?" alone. It is usually **"what does this device reveal?"** — so answer with the effect, not the label.

! In "the glass was the only cool thing left", the glass is more than temperature | The bus is hot, the letter is unsettling | ⇒ the detail carries the narrator's discomfort — a symbol, not decoration.

## Diction and connotation
Two words can share a denotation and differ in connotation: *thrifty* vs *stingy*; *childlike* vs *childish*. GED questions ask why the author chose one. Choose the option that names the **feeling** the word creates.

## Tone through syntax
Short sentences quicken pace and create tension. Long cumulative sentences create reflection and calm. A sentence fragment used deliberately signals emphasis or interruption.

## Universal themes to recognise
- coming of age / loss of innocence
- the gap between intention and perception
- duty to family vs duty to self
- migration and belonging
- the cost of a small kindness
- the difference between reputation and character

## Multiple texts
The GED often pairs two texts on one topic. Plan comparisons along three axes:
1. **Attitude** — do the authors agree, disagree, or address different aspects?
2. **Evidence** — personal experience vs data vs authority.
3. **Purpose** — persuade vs reflect vs explain.

Answer questions about the *relationship* between the texts, not about each text in isolation.

> Avoid the "outside knowledge" trap: a literary answer must be supportable from the text itself, even if you know a lot about the author's other work.
`,
      { subtitle: "Theme, character, devices, tone, paired texts", drill: ["gr-002"] },
    ),
  ],
};

const language: Module = {
  id: "gr-lang",
  subject: S,
  title: "Language Conventions",
  summary: "The grammar and punctuation questions — predictable, learnable, and worth roughly a quarter of the RLA paper.",
  icon: "pen",
  lessons: [
    lesson(
      S,
      "gr-lang",
      "gr-l2-grammar",
      "Sentence structure and the eight grammar traps",
      13,
      ["gr-lang"],
      `
## 1. Subject–verb agreement
Find the **real subject**, ignore the phrases between it and the verb.
- The **box** of tools *is* heavy. (not "are")
- Each of the students *has* a book.
- Neither the manager nor the technicians *were* informed. (nearest subject rule)
- Everyone, everybody, each, either, neither *are singular*.

Watch for **inverted order**: "There *are* three problems" — the subject is "three problems", not "there".

## 2. Pronoun agreement and case
- A pronoun must match its antecedent in number: "Every student must bring **his or her** ID" (or rewrite to avoid it).
- Collections such as "the company" take *it*; "the team" may take *it* (US convention).
- **Case**: subject pronouns (I, we, he, she, they) vs object pronouns (me, us, him, her, them).
- Trick: remove the other person. "Between you and **me**" → "between me" sounds right, so *me* is correct.

## 3. Pronoun reference
Ambiguous: "When Sana met Rina, she was late." Who was late? The GED usually tests the **clear** version: "When Sana met Rina, Sana was late."

## 4. Verb tense consistency
Keep one tense unless the meaning requires a shift. Watch for:
- Present tense for general truths: "Water boils at 100 °C."
- Past perfect for an earlier past: "By the time we arrived, the bus **had left**."

## 5. Dangling and misplaced modifiers
A modifier must sit next to what it describes.
- Wrong: "Walking to the shop, the rain started." (The rain was not walking.)
- Right: "Walking to the shop, I was caught in the rain."

## 6. Parallel structure
Items in a list or comparison must share grammatical form.
- Wrong: "She likes reading, to swim, and she cooks."
- Right: "She likes reading, swimming and cooking."

## 7. Run-ons and fragments
- **Fragment**: a dependent clause or phrase punctuated as a sentence. "Because the power failed." → needs a main clause.
- **Run-on/comma splice**: two independent clauses joined by only a comma. Fix with a period, semicolon, or comma + conjunction.

## 8. Commonly confused words
| Pair | Rule |
| --- | --- |
| its / it's | *its* = possessive; *it's* = it is |
| their / there / they're | possession / place / they are |
| your / you're | possession / you are |
| affect / effect | *affect* is usually the verb; *effect* the noun |
| then / than | time / comparison |
| who / whom | subject / object |
| lie / lay | lie (recline, no object); lay (place something) |
| fewer / less | countable / uncountable |
| between / among | two / more than two |

## Punctuation essentials
| Mark | Rule |
| --- | --- |
| Comma | separates independent clauses **with** a conjunction; sets off introductory phrases; separates list items; marks non-essential (non-restrictive) clauses |
| Semicolon | joins two independent clauses; separates complex list items |
| Colon | introduces a list, explanation or quotation after a complete sentence |
| Apostrophe | possession, contractions; **no** apostrophe for plurals |
| Dash | emphasis or an abrupt break |
| Hyphen | compound adjectives before a noun |

**Comma splice examples to reject on sight:** "The unit was noisy, we replaced the fan." → "The unit was noisy; we replaced the fan." or "The unit was noisy, so we replaced the fan."

## Capitalisation
Proper nouns, the start of sentences, titles before names, days, months, languages, nationalities, and the pronoun *I*. Not seasons, not directions (unless part of a proper name), not job titles after a name.

>> In the exam, read the whole sentence before choosing. Three of the four options often fix a problem you were not looking for — and the fourth creates one.
`,
      { subtitle: "Agreement, pronouns, modifiers, parallelism, punctuation", drill: ["gr-003"] },
    ),
  ],
};

const writing: Module = {
  id: "gr-writing",
  subject: S,
  title: "The Extended Response",
  summary: "One 45-minute essay, scored 0–3 on arguments and evidence. A structure that reliably reaches a 2 or 3.",
  icon: "quill",
  lessons: [
    lesson(
      S,
      "gr-writing",
      "gr-l3-essay",
      "Writing the source-based argument",
      14,
      ["gr-writing"],
      `
## What the task asks
You are given one or two short passages and a prompt like: *"Explain which position is better supported by the evidence. Use the passages in your response."*

You have about **45 minutes**. The essay is scored **0–3** on three traits:
1. **Argument and analysis** — is there a clear claim, developed with reasoning?
2. **Development and support** — are the ideas supported with specific evidence from the texts?
3. **Clarity and command of standard English** — is it organised and readable?

## The trap: this is not an opinion essay
Examiners reward using **the passages**. A brilliant personal opinion with no textual evidence cannot score above a 1. Conversely, a plain essay that quotes, cites and reasons from the passages scores well.

## A structure that works
### Paragraph 1 — Claim (3–4 sentences)
- Name the issue.
- State which position is **better supported by the evidence**.
- Give two reasons you will develop.

> "While both passages raise fair concerns about hospital costs, the argument for reading programmes is stronger because the evidence offered is measurable and the counterargument is addressed rather than avoided."

### Paragraph 2 — Your strongest evidence
- Topic sentence naming the reason.
- Introduce the evidence. **Quote or paraphrase.**
- Explain how it supports your claim. This explanation is where marks live — do not let a quote stand alone.

### Paragraph 3 — Second reason
Same pattern, different evidence. Choose evidence that covers a **different** part of the text (data in one, reasoning in the other).

### Paragraph 4 — Rebut the weaker side
Concede what is true, then explain why it does not outweigh the case. Use the word-level move: *even if … , the decisive point is …*

### Paragraph 5 — Conclusion (2–3 sentences)
Restate the claim with the evidence folded in. No new arguments, no new quotes.

## Quoting discipline
- Keep quotations **short** — a phrase, not a paragraph.
- Introduce them: *The author notes that…*
- Explain them: *This matters because…*
- Paraphrase when the wording is less important than the fact.

## Time plan (45 minutes)
| Minutes | Task |
| --- | --- |
| 0–5 | Read the prompt, annotate the passages, decide your position |
| 5–8 | Quick outline: two reasons, two pieces of evidence |
| 8–33 | Write |
| 33–40 | Revise: claim clarity, evidence, transitions |
| 40–45 | Proofread: agreement, punctuation, spelling |

## Sentence patterns that raise your score
- Concession: *Although the passage concedes that…, it does not follow that…*
- Evidence introduction: *The most concrete support appears when the author reports that…*
- Analysis: *This figure is persuasive because it measures something the sceptic would accept.*
- Transition: *A second, independent line of evidence…*

## What hurts you most
1. No claim, or a claim that only restates the prompt.
2. Summarising the passages instead of arguing.
3. Unsupported opinion ("I think everyone would agree…").
4. Long quotations with no explanation.
5. Ignoring the second passage entirely.
6. Writing one long paragraph.

> You do not need to be a great writer. You need a visible claim, specific evidence, explicit reasoning, and clean sentences. That is a 3.
`,
      { subtitle: "Claim → evidence → rebuttal → conclusion, in 45 minutes", drill: ["gr-004"] },
    ),
  ],
};

export const gedRlaModules: Module[] = [readingInfo, language, writing];

export const gedRlaSubject: Subject = {
  id: "ged-rla",
  track: "ged",
  title: "Reasoning Through Language Arts",
  short: "RLA",
  tagline: "GED · 150 minutes · includes the essay",
  description:
    "Reading comprehension across literary and informational texts, all the language conventions, and a repeatable method for the source-based extended response.",
  icon: "book",
  hue: "#FFC24B",
  hue2: "#FF7A8A",
  exam: {
    label: "GED RLA simulation",
    minutes: 150,
    items: "46 items + 1 essay",
    pass: "Pass 145 · College ready 165",
  },
  modules: gedRlaModules,
};
