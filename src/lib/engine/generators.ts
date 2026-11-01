import type { Item, SubjectId } from "@/content/types";
import { pick, randInt, round, type Rng } from "./core";

/* ============================================================
   Parametric generators.

   A finite item bank teaches a fixed set of facts. A generator
   teaches *a relationship*: the numbers change, the reasoning
   does not. Every generator here computes its own answer, so a
   generated question can never be wrong — only the arithmetic
   that surrounds it can be.
   ============================================================ */

export interface Generator {
  id: string;
  subject: SubjectId;
  topic: string;
  diff: 1 | 2 | 3 | 4 | 5;
  formats: ("numeric" | "mcq")[];
  build: (rng: Rng) => Item;
}

let counter = 0;
const gid = (prefix: string) => `gen-${prefix}-${(counter++).toString(36)}-${Date.now().toString(36).slice(-3)}`;

function numItem(
  subject: SubjectId,
  topic: string,
  diff: 1 | 2 | 3 | 4 | 5,
  q: string,
  answer: number,
  why: string,
  unit?: string,
  tolerance?: number,
): Item {
  const value = round(answer, 3);
  const dp = Math.abs(value) % 1 === 0 ? 0 : String(value).split(".")[1]?.length ?? 0;
  const rounding =
    dp > 0 && !/round/i.test(q)
      ? ` Round your answer to ${dp} decimal place${dp === 1 ? "" : "s"}.`
      : "";
  return {
    id: gid("n"),
    subject,
    topic,
    diff,
    format: "numeric",
    q: q + rounding,
    answer: value,
    tolerance: tolerance ?? Math.max(Math.abs(answer) * 0.01, 0.02),
    unit,
    why,
    generated: true,
  };
}

function mcqItem(
  subject: SubjectId,
  topic: string,
  diff: 1 | 2 | 3 | 4 | 5,
  q: string,
  correct: string,
  distractors: string[],
  why: string,
  rng: Rng,
): Item {
  const opts = [correct, ...distractors];
  // Fisher-Yates with the session rng
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return {
    id: gid("m"),
    subject,
    topic,
    diff,
    format: "mcq",
    q,
    options: opts,
    answer: opts.indexOf(correct),
    why,
    generated: true,
  };
}

const SENTENCES = [
  { s: "The technician ___ the coil before charging.", a: "cleans", d: ["clean", "cleaning", "have cleaned"] },
  { s: "Neither the manager nor the technicians ___ informed.", a: "were", d: ["was", "is", "has been"] },
  { s: "The box of tools ___ heavy.", a: "is", d: ["are", "were", "have"] },
  { s: "Each of the students ___ a book.", a: "has", d: ["have", "are having", "were having"] },
  { s: "By the time we arrived, the bus ___.", a: "had left", d: ["has left", "leaves", "was leaving"] },
  { s: "The team ___ meeting tomorrow.", a: "is", d: ["are", "were", "have"] },
];

export const generators: Generator[] = [
  /* ---------------- mathematics ---------------- */
  {
    id: "math-linear",
    subject: "ged-math",
    topic: "gm-algebra",
    diff: 2,
    formats: ["numeric", "mcq"],
    build: (rng) => {
      const a = randInt(2, 9, rng);
      const x = randInt(-6, 12, rng);
      const b = randInt(-20, 20, rng);
      const c = a * x + b;
      return numItem(
        "ged-math",
        "gm-algebra",
        2,
        `Solve for x:  ${a}x ${b >= 0 ? "+" : "−"} ${Math.abs(b)} = ${c}`,
        x,
        `${a}x = ${c} ${b >= 0 ? "−" : "+"} ${Math.abs(b)} = ${a * x}, so x = ${x}.`,
      );
    },
  },
  {
    id: "math-percent-of",
    subject: "ged-math",
    topic: "gm-number",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const p = pick([5, 12, 15, 20, 24, 30, 35, 40, 45, 60, 75], rng);
      const n = randInt(2, 40, rng) * 10;
      return numItem("ged-math", "gm-number", 2, `What is ${p} % of ${n}?`, (p / 100) * n, `${p} % of ${n} = 0.${p} × ${n}.`);
    },
  },
  {
    id: "math-percent-change",
    subject: "ged-math",
    topic: "gm-percent",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const oldV = randInt(4, 60, rng) * 50;
      const pct = pick([10, 15, 20, 25, 30, 40, 50], rng);
      const down = rng() > 0.5;
      const newV = down ? oldV * (1 - pct / 100) : oldV * (1 + pct / 100);
      return numItem(
        "ged-math",
        "gm-percent",
        3,
        `A price changes from ${oldV} taka to ${newV} taka. What is the percent ${down ? "decrease" : "increase"}?`,
        pct,
        `Change = ${Math.abs(newV - oldV)}; divided by the original ${oldV} gives ${(pct / 100).toFixed(2)} = ${pct} %.`,
        "%",
        0.05,
      );
    },
  },
  {
    id: "math-slope",
    subject: "ged-math",
    topic: "gm-functions",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const x1 = randInt(-5, 5, rng);
      const m = randInt(-4, 5, rng) || 2;
      const dx = randInt(1, 6, rng);
      const x2 = x1 + dx;
      const y1 = randInt(-8, 8, rng);
      const y2 = y1 + m * dx;
      return numItem(
        "ged-math",
        "gm-functions",
        3,
        `Find the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2}).`,
        m,
        `m = (${y2} − ${y1}) / (${x2} − ${x1}) = ${m * dx}/${dx} = ${m}.`,
      );
    },
  },
  {
    id: "math-evaluate",
    subject: "ged-math",
    topic: "gm-functions",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const a = randInt(2, 7, rng);
      const b = randInt(-9, 9, rng);
      const x = randInt(-4, 8, rng);
      return numItem(
        "ged-math",
        "gm-functions",
        2,
        `If f(x) = ${a}x ${b >= 0 ? "+" : "−"} ${Math.abs(b)}, what is f(${x})?`,
        a * x + b,
        `f(${x}) = ${a}(${x}) ${b >= 0 ? "+" : "−"} ${Math.abs(b)} = ${a * x + b}.`,
      );
    },
  },
  {
    id: "math-area",
    subject: "ged-math",
    topic: "gm-geometry",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const kind = pick(["rect", "tri", "circle"], rng);
      if (kind === "rect") {
        const l = randInt(3, 20, rng);
        const w = randInt(2, 15, rng);
        return numItem("ged-math", "gm-geometry", 2, `A rectangle is ${l} cm by ${w} cm. What is its area in cm²?`, l * w, `A = l × w = ${l} × ${w} = ${l * w}.`, "cm²");
      }
      if (kind === "tri") {
        const b = randInt(4, 24, rng);
        const h = randInt(3, 18, rng) * 2;
        return numItem("ged-math", "gm-geometry", 2, `A triangle has base ${b} cm and height ${h} cm. What is its area in cm²?`, (b * h) / 2, `A = ½ × ${b} × ${h} = ${(b * h) / 2}.`, "cm²");
      }
      const r = randInt(2, 12, rng);
      return numItem(
        "ged-math",
        "gm-geometry",
        3,
        `A circle has radius ${r} cm. What is its area in cm² (π ≈ 3.14)?`,
        round(3.14 * r * r, 2),
        `A = πr² = 3.14 × ${r}² = ${round(3.14 * r * r, 2)}.`,
        "cm²",
        0.6,
      );
    },
  },
  {
    id: "math-pythagorean",
    subject: "ged-math",
    topic: "gm-geometry",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const triples: [number, number, number][] = [
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
        [7, 24, 25],
        [9, 12, 15],
        [6, 8, 10],
        [20, 21, 29],
      ];
      const [a, b, c] = pick(triples, rng);
      const k = pick([1, 1, 2, 3], rng);
      const findHyp = rng() > 0.4;
      if (findHyp)
        return numItem("ged-math", "gm-geometry", 3, `A right triangle has legs ${a * k} and ${b * k}. What is the hypotenuse?`, c * k, `${a * k}² + ${b * k}² = ${(a * k) ** 2 + (b * k) ** 2} = ${(c * k) ** 2}, so the hypotenuse is ${c * k}.`);
      return numItem("ged-math", "gm-geometry", 3, `A right triangle has hypotenuse ${c * k} and one leg ${a * k}. What is the other leg?`, b * k, `b² = ${c * k}² − ${a * k}² = ${(b * k) ** 2}, so b = ${b * k}.`);
    },
  },
  {
    id: "math-mean",
    subject: "ged-math",
    topic: "gm-stats",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const n = randInt(4, 6, rng);
      const vals = Array.from({ length: n }, () => randInt(10, 90, rng));
      const sum = vals.reduce((a, b) => a + b, 0);
      return numItem(
        "ged-math",
        "gm-stats",
        2,
        `Find the mean of: ${vals.join(", ")}.`,
        round(sum / n, 2),
        `Sum = ${sum}; count = ${n}; mean = ${round(sum / n, 2)}.`,
        undefined,
        0.05,
      );
    },
  },
  {
    id: "math-probability",
    subject: "ged-math",
    topic: "gm-prob",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const r = randInt(2, 12, rng);
      const b = randInt(2, 12, rng);
      const total = r + b;
      return numItem(
        "ged-math",
        "gm-prob",
        2,
        `A bag contains ${r} red and ${b} blue balls. What is the probability of drawing a red ball? (3 decimal places)`,
        round(r / total, 3),
        `P = ${r}/${total} ≈ ${round(r / total, 3)}.`,
        undefined,
        0.002,
      );
    },
  },
  {
    id: "math-interest",
    subject: "ged-math",
    topic: "gm-percent",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const P = randInt(2, 40, rng) * 500;
      const r = pick([4, 5, 6, 8, 10, 12], rng);
      const t = randInt(2, 5, rng);
      return numItem(
        "ged-math",
        "gm-percent",
        3,
        `${P} taka is invested at ${r} % simple interest per year for ${t} years. What is the interest earned, in taka?`,
        (P * r * t) / 100,
        `I = Prt = ${P} × 0.${r.toString().padStart(2, "0")} × ${t} = ${(P * r * t) / 100} taka.`,
        "taka",
        0.5,
      );
    },
  },
  {
    id: "math-compound",
    subject: "ged-math",
    topic: "gm-algebra",
    diff: 4,
    formats: ["numeric"],
    build: (rng) => {
      const P = randInt(2, 20, rng) * 1000;
      const r = pick([5, 10, 20], rng);
      const t = randInt(2, 3, rng);
      const amount = P * (1 + r / 100) ** t;
      return numItem(
        "ged-math",
        "gm-algebra",
        4,
        `${P} taka grows at ${r} % per year, compounded annually. What is the total after ${t} years, to the nearest taka?`,
        round(amount, 0),
        `A = P(1 + r)^t = ${P} × ${(1 + r / 100) ** t} ≈ ${round(amount, 0)} taka.`,
        "taka",
        2,
      );
    },
  },
  {
    id: "math-inequality",
    subject: "ged-math",
    topic: "gm-algebra",
    diff: 3,
    formats: ["mcq"],
    build: (rng) => {
      const a = randInt(2, 8, rng);
      const x = randInt(-6, 8, rng);
      const b = randInt(-15, 15, rng);
      const c = a * x + b;
      const flip = rng() > 0.5;
      if (!flip) {
        return mcqItem(
          "ged-math",
          "gm-algebra",
          3,
          `Solve the inequality: ${a}x ${b >= 0 ? "+" : "−"} ${Math.abs(b)} ≤ ${c}`,
          `x ≤ ${x}`,
          [`x ≥ ${x}`, `x ≤ ${-x}`, `x ≥ ${-x}`],
          `Subtract ${b} and divide by ${a}: x ≤ ${x}. Dividing by a positive number does not flip the sign.`,
          rng,
        );
      }
      const neg = -a;
      const c2 = neg * x + b;
      return mcqItem(
        "ged-math",
        "gm-algebra",
        3,
        `Solve the inequality: ${neg}x ${b >= 0 ? "+" : "−"} ${Math.abs(b)} ≤ ${c2}`,
        `x ≥ ${x}`,
        [`x ≤ ${x}`, `x ≥ ${-x}`, `x ≤ ${-x}`],
        `Divide by ${neg} — a negative number — so the inequality flips: x ≥ ${x}.`,
        rng,
      );
    },
  },
  {
    id: "math-distribute",
    subject: "ged-math",
    topic: "gm-algebra",
    diff: 2,
    formats: ["mcq"],
    build: (rng) => {
      const a = randInt(2, 7, rng);
      const b = randInt(2, 9, rng);
      const c = randInt(2, 9, rng);
      return mcqItem(
        "ged-math",
        "gm-algebra",
        2,
        `Simplify: ${a}(x + ${b}) − ${c}x`,
        `${a - c}x + ${a * b}`,
        [`${a + c}x + ${a * b}`, `${a - c}x + ${b}`, `${a - c}x − ${a * b}`],
        `Distribute: ${a}x + ${a * b} − ${c}x = ${a - c}x + ${a * b}.`,
        rng,
      );
    },
  },
  {
    id: "math-unit-convert",
    subject: "ged-math",
    topic: "gm-number",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const kind = pick(["km", "kg", "cm2", "ft"], rng);
      if (kind === "km") {
        const v = randInt(2, 40, rng);
        return numItem("ged-math", "gm-number", 2, `Convert ${v} km to metres.`, v * 1000, `1 km = 1,000 m, so ${v} × 1,000 = ${v * 1000} m.`, "m");
      }
      if (kind === "kg") {
        const v = randInt(2, 20, rng);
        return numItem("ged-math", "gm-number", 2, `Convert ${v} kg to grams.`, v * 1000, `1 kg = 1,000 g, so ${v} × 1,000 = ${v * 1000} g.`, "g");
      }
      if (kind === "cm2") {
        const v = randInt(2, 12, rng);
        return numItem("ged-math", "gm-number", 3, `Convert ${v * 10000} cm² to m².`, v, `1 m² = 10,000 cm², so divide by 10,000.`, "m²");
      }
      const v = randInt(3, 30, rng);
      return numItem("ged-math", "gm-number", 3, `Convert ${v} feet to metres (1 ft = 0.3048 m), to 2 decimal places.`, round(v * 0.3048, 2), `${v} × 0.3048 = ${round(v * 0.3048, 2)} m.`, "m", 0.02);
    },
  },

  /* ---------------- RAC ---------------- */
  {
    id: "rac-c-to-f",
    subject: "rac-l2",
    topic: "rac-thermo",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const c = randInt(-10, 45, rng);
      return numItem("rac-l2", "rac-thermo", 2, `Convert ${c} °C to °F.`, round((c * 9) / 5 + 32, 1), `°F = (${c} × 9/5) + 32 = ${round((c * 9) / 5 + 32, 1)}.`, "°F", 0.15);
    },
  },
  {
    id: "rac-btu-to-tr",
    subject: "rac-l2",
    topic: "rac-thermo",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const tr = pick([0.75, 1, 1.5, 2, 2.5, 3], rng);
      return numItem("rac-l2", "rac-thermo", 2, `A unit is rated ${tr} TR. How many BTU/h is that?`, tr * 12000, `1 TR = 12,000 BTU/h, so ${tr} × 12,000 = ${tr * 12000}.`, "BTU/h");
    },
  },
  {
    id: "rac-tr-to-kw",
    subject: "rac-l2",
    topic: "rac-thermo",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const tr = pick([0.75, 1, 1.5, 2, 2.5, 3, 4], rng);
      return numItem("rac-l2", "rac-thermo", 3, `Convert ${tr} TR to kW, to 2 decimal places.`, round(tr * 3.517, 2), `1 TR = 3.517 kW, so ${tr} × 3.517 = ${round(tr * 3.517, 2)} kW.`, "kW", 0.02);
    },
  },
  {
    id: "rac-superheat",
    subject: "rac-l2",
    topic: "rac-thermo",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const sat = randInt(0, 12, rng);
      const sh = randInt(2, 18, rng);
      return numItem(
        "rac-l2",
        "rac-thermo",
        3,
        `The low-side pressure corresponds to a saturated evaporating temperature of ${sat} °C. The suction line measures ${sat + sh} °C. What is the superheat (K)?`,
        sh,
        `SH = line temperature − saturation temperature = ${sat + sh} − ${sat} = ${sh} K.`,
        "K",
        0.05,
      );
    },
  },
  {
    id: "rac-subcool",
    subject: "rac-l2",
    topic: "rac-thermo",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const sat = randInt(35, 55, rng);
      const sc = randInt(2, 16, rng);
      return numItem(
        "rac-l2",
        "rac-thermo",
        3,
        `The high-side pressure corresponds to a saturated condensing temperature of ${sat} °C. The liquid line measures ${sat - sc} °C. What is the subcooling (K)?`,
        sc,
        `SC = condensing saturation temperature − liquid line temperature = ${sat} − ${sat - sc} = ${sc} K.`,
        "K",
        0.05,
      );
    },
  },
  {
    id: "rac-extra-charge",
    subject: "rac-l2",
    topic: "rac-split-install",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const base = pick([600, 750, 900, 1050, 1200], rng);
      const factory = pick([3, 4, 5], rng);
      const extra = randInt(2, 12, rng);
      const grams = pick([20, 25, 30, 35, 40], rng);
      return numItem(
        "rac-l2",
        "rac-split-install",
        3,
        `Nameplate charge is ${base} g for up to ${factory} m of pipe. The installation uses ${factory + extra} m. At ${grams} g per extra metre, what total charge must be weighed in (g)?`,
        base + extra * grams,
        `Extra length = ${extra} m → ${extra} × ${grams} = ${extra * grams} g. Total = ${base} + ${extra * grams} = ${base + extra * grams} g.`,
        "g",
        0.6,
      );
    },
  },
  {
    id: "rac-sizing",
    subject: "rac-l2",
    topic: "rac-split-install",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const area = randInt(9, 60, rng) * 10;
      return numItem(
        "rac-l2",
        "rac-split-install",
        3,
        `Using the field rule of 1 TR per 120 ft², what capacity (in TR, 2 dp) is needed for a ${area} ft² room?`,
        round(area / 120, 2),
        `TR = ${area} ÷ 120 = ${round(area / 120, 2)} TR, then choose the next standard size up.`,
        "TR",
        0.03,
      );
    },
  },
  {
    id: "rac-bar-psig",
    subject: "rac-l2",
    topic: "rac-refrigerants",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const bar = round(randInt(30, 180, rng) / 10, 1);
      return numItem(
        "rac-l2",
        "rac-refrigerants",
        3,
        `A gauge reads ${bar} bar absolute. What is the gauge pressure in psig (2 dp)?`,
        round(bar * 14.5 - 14.7, 2),
        `psig = (${bar} × 14.5) − 14.7 = ${round(bar * 14.5 - 14.7, 2)} psig.`,
        "psig",
        0.4,
      );
    },
  },
  {
    id: "rac-winding",
    subject: "rac-l2",
    topic: "rac-compressors",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const cr = round(randInt(10, 60, rng) / 10, 1);
      const cs = round(randInt(30, 120, rng) / 10, 1);
      return numItem(
        "rac-l2",
        "rac-compressors",
        3,
        `A hermetic compressor reads C–R = ${cr} Ω and C–S = ${cs} Ω. What should R–S read?`,
        round(cr + cs, 1),
        `R–S is the two windings in series: ${cr} + ${cs} = ${round(cr + cs, 1)} Ω.`,
        "Ω",
        0.05,
      );
    },
  },
  {
    id: "rac-power",
    subject: "rac-l2",
    topic: "rac-electrical",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const v = pick([220, 230, 240], rng);
      const i = round(randInt(25, 95, rng) / 10, 1);
      return numItem("rac-l2", "rac-electrical", 2, `A unit draws ${i} A at ${v} V. What is its input power in watts (nearest whole number)?`, round(v * i, 0), `P = V × I = ${v} × ${i} = ${round(v * i, 0)} W.`, "W", 1);
    },
  },
  {
    id: "rac-eer",
    subject: "rac-l2",
    topic: "rac-window",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const btu = pick([9000, 12000, 18000, 24000], rng);
      const w = randInt(700, 2300, rng);
      return numItem("rac-l2", "rac-window", 3, `A unit delivers ${btu} BTU/h while consuming ${w} W. What is its EER (2 dp)?`, round(btu / w, 2), `EER = ${btu} ÷ ${w} = ${round(btu / w, 2)} BTU/Wh.`, "BTU/Wh", 0.03);
    },
  },
  {
    id: "rac-energy-cost",
    subject: "rac-l2",
    topic: "rac-electrical",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const kw = round(randInt(8, 22, rng) / 10, 1);
      const hours = randInt(3, 12, rng);
      const rate = randInt(6, 14, rng);
      return numItem(
        "rac-l2",
        "rac-electrical",
        3,
        `An air-conditioner draws ${kw} kW and runs ${hours} hours. At ${rate} taka per kWh, what is the running cost in taka?`,
        round(kw * hours * rate, 2),
        `Energy = ${kw} × ${hours} = ${round(kw * hours, 2)} kWh; cost = ${round(kw * hours, 2)} × ${rate} = ${round(kw * hours * rate, 2)} taka.`,
        "taka",
        0.05,
      );
    },
  },
  {
    id: "rac-recovery-80",
    subject: "rac-l2",
    topic: "rac-safety",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const cap = pick([10, 13.6, 20, 25, 40, 50], rng);
      return numItem(
        "rac-l2",
        "rac-safety",
        2,
        `A recovery cylinder has a water capacity of ${cap} kg. What is the maximum refrigerant weight you may put in it (kg, 2 dp)?`,
        round(cap * 0.8, 2),
        `The 80 % rule: ${cap} × 0.8 = ${round(cap * 0.8, 2)} kg. The remaining ullage allows for liquid expansion.`,
        "kg",
        0.03,
      );
    },
  },

  /* ---------------- science ---------------- */
  {
    id: "sci-density",
    subject: "ged-science",
    topic: "gs-practice",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const m = randInt(20, 400, rng);
      const v = randInt(2, 40, rng);
      return numItem("ged-science", "gs-practice", 2, `A sample has mass ${m} g and volume ${v} cm³. What is its density in g/cm³ (2 dp)?`, round(m / v, 2), `ρ = m/V = ${m}/${v} = ${round(m / v, 2)} g/cm³.`, "g/cm³", 0.02);
    },
  },
  {
    id: "sci-speed",
    subject: "ged-science",
    topic: "gs-physics",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const d = randInt(10, 60, rng) * 5;
      const t = randInt(2, 12, rng);
      return numItem("ged-science", "gs-physics", 2, `An object travels ${d} m in ${t} s. What is its average speed in m/s (2 dp)?`, round(d / t, 2), `v = d/t = ${d}/${t} = ${round(d / t, 2)} m/s.`, "m/s", 0.02);
    },
  },
  {
    id: "sci-force",
    subject: "ged-science",
    topic: "gs-physics",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const m = randInt(2, 40, rng);
      const a = randInt(2, 12, rng);
      return numItem("ged-science", "gs-physics", 2, `A ${m} kg object accelerates at ${a} m/s². What net force acts on it (N)?`, m * a, `F = ma = ${m} × ${a} = ${m * a} N.`, "N", 0.05);
    },
  },
  {
    id: "sci-ke",
    subject: "ged-science",
    topic: "gs-physics",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const m = randInt(2, 20, rng);
      const v = randInt(2, 12, rng);
      return numItem("ged-science", "gs-physics", 3, `What is the kinetic energy of a ${m} kg object moving at ${v} m/s (J)?`, round(0.5 * m * v * v, 2), `KE = ½mv² = ½ × ${m} × ${v}² = ${round(0.5 * m * v * v, 2)} J.`, "J", 0.05);
    },
  },
  {
    id: "sci-wave",
    subject: "ged-science",
    topic: "gs-physics",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const f = randInt(5, 90, rng);
      const l = randInt(2, 20, rng);
      return numItem("ged-science", "gs-physics", 2, `A wave has frequency ${f} Hz and wavelength ${l} m. What is its speed in m/s?`, f * l, `v = fλ = ${f} × ${l} = ${f * l} m/s.`, "m/s", 0.05);
    },
  },
  {
    id: "sci-ohm",
    subject: "ged-science",
    topic: "gs-physics",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const r = randInt(2, 60, rng);
      const i = randInt(1, 12, rng);
      return numItem("ged-science", "gs-physics", 2, `A resistor of ${r} Ω carries ${i} A. What is the voltage across it (V)?`, r * i, `V = IR = ${i} × ${r} = ${r * i} V.`, "V", 0.05);
    },
  },
  {
    id: "sci-halflife",
    subject: "ged-science",
    topic: "gs-earth",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const halflife = pick([5, 10, 20, 50], rng);
      const n = randInt(2, 4, rng);
      return numItem(
        "ged-science",
        "gs-earth",
        3,
        `A sample with a half-life of ${halflife} years has been decaying for ${halflife * n} years. What percentage of the parent isotope remains?`,
        round(100 / 2 ** n, 2),
        `${halflife * n} ÷ ${halflife} = ${n} half-lives, so 100 ÷ 2^${n} = ${round(100 / 2 ** n, 2)} %.`,
        "%",
        0.2,
      );
    },
  },

  /* ---------------- social studies ---------------- */
  {
    id: "soc-rule70",
    subject: "ged-social",
    topic: "gss-econ",
    diff: 3,
    formats: ["numeric"],
    build: (rng) => {
      const rate = pick([2, 3.5, 5, 7, 10, 14], rng);
      return numItem("ged-social", "gss-econ", 3, `An economy grows at ${rate} % per year. Using the rule of 70, roughly how many years until it doubles (1 dp)?`, round(70 / rate, 1), `Doubling time ≈ 70 ÷ ${rate} = ${round(70 / rate, 1)} years.`, "years", 0.3);
    },
  },
  {
    id: "soc-density",
    subject: "ged-social",
    topic: "gss-geo",
    diff: 2,
    formats: ["numeric"],
    build: (rng) => {
      const pop = randInt(2, 90, rng) * 100000;
      const area = randInt(2, 40, rng) * 1000;
      return numItem("ged-social", "gss-geo", 2, `A region has ${pop.toLocaleString()} people in ${area.toLocaleString()} km². What is its population density (people per km², 2 dp)?`, round(pop / area, 2), `Density = people ÷ area = ${pop} ÷ ${area} = ${round(pop / area, 2)} per km².`, "/km²", 0.05);
    },
  },

  /* ---------------- language arts ---------------- */
  {
    id: "rla-agreement",
    subject: "ged-rla",
    topic: "gr-lang",
    diff: 2,
    formats: ["mcq"],
    build: (rng) => {
      const s = pick(SENTENCES, rng);
      return mcqItem(
        "ged-rla",
        "gr-lang",
        2,
        `Choose the word that correctly completes the sentence: "${s.s}"`,
        s.a,
        s.d,
        `"${s.a}" is the form that agrees with the subject here.`,
        rng,
      );
    },
  },
  {
    id: "rla-its",
    subject: "ged-rla",
    topic: "gr-lang",
    diff: 1,
    formats: ["mcq"],
    build: (rng) => {
      const cases = [
        { q: `Choose the correct form: "___ pressure is too high."`, a: "Its", d: ["It's", "Its'", "It is'"] },
        { q: `Choose the correct form: "___ going to rain before we finish."`, a: "It's", d: ["Its", "Its'", "It was'"] },
        { q: `Choose the correct form: "The company raised ___ prices."`, a: "its", d: ["it's", "its'", "it is"] },
        { q: `Choose the correct form: "The technicians collected ___ tools."`, a: "their", d: ["there", "they're", "their's"] },
        { q: `Choose the correct form: "The noise had no ___ on performance."`, a: "effect", d: ["affect", "affects", "effected"] },
      ];
      const c = pick(cases, rng);
      return mcqItem("ged-rla", "gr-lang", 1, c.q, c.a, c.d, "Choose by function: possessive, contraction, or a different word entirely.", rng);
    },
  },
];

export const generatorsBySubject = generators.reduce<Record<string, Generator[]>>((acc, g) => {
  (acc[g.subject] ||= []).push(g);
  return acc;
}, {});

export const generatorsByTopic = generators.reduce<Record<string, Generator[]>>((acc, g) => {
  (acc[g.topic] ||= []).push(g);
  return acc;
}, {});
