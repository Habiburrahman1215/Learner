import type { Module } from "../types";
import { lesson } from "../md";

const S = "rac-l2" as const;

/* ============================================================
   RAC L2 · core knowledge
   Units: GU-09-L2-V1, OU-LE-RAC-01/02/03/04-L2-V2
   Qualification: National Skills Certificate in Refrigeration
   and Air Conditioning, BNQF Level 2 — job title Junior Technician.
   ============================================================ */

export const orientation: Module = {
  id: "rac-orientation",
  subject: S,
  title: "The Qualification & How RAC Works",
  code: "Qualification Standards · CAD-LE-RAC-L2-EN-V2",
  hours: 20,
  summary:
    "What the NSDA Level 2 certificate actually is, how competency-based assessment judges you, and how the five units add up to a Junior Technician.",
  icon: "badge",
  lessons: [
    lesson(
      S,
      "rac-orientation",
      "rac-l1-what-is-rac-l2",
      "What the RAC Level 2 certificate is",
      9,
      ["rac-orientation"],
      `
## The qualification in one line
The **National Skills Certificate in Refrigeration and Air Conditioning, BNQF Level 2** is a nationally recognised qualification issued under the **National Skills Development Authority (NSDA)**, Prime Minister's Office, Government of Bangladesh. The accreditation document code is **CAD-LE-RAC-L2-EN-V2** and the qualification sits in the **Light Engineering Sector**.

Someone who meets the requirements may be employed as a **Junior Technician** — the person who services, repairs and installs window and split air-conditioners under supervision or independently on routine jobs.

## Where the content comes from
Everything you study maps to a real **unit of competency (UoC)** with an official code, a level and nominal hours.

| Code | Unit of competency | Hours |
| --- | --- | --- |
| GU-09-L2-V1 | Work in a Team Environment | 20 |
| OU-LE-RAC-01-L2-V2 | Check & Maintain Compressors | 20 |
| OU-LE-RAC-02-L2-V2 | Service and Repair Window Type Air-Conditioners | 60 |
| OU-LE-RAC-03-L2-V2 | Service and Repair Split Type Air-Conditioners | 120 |
| OU-LE-RAC-04-L2-V2 | Install Split Type Air-Conditioners | 60 |

The qualification carries **300 nominal hours** in total: 280 learning hours plus a **20-hour workplace visit / soft-skills block**. "Nominal" means a suggested duration for an average trainee — it is not a deadline. Competency-based training lets a fast learner finish early and lets a slower learner take extra time, and you may exit and re-enter.

## Entry requirements
- You must hold **NSC in Refrigeration and Air Conditioning, BNQF Level 1** (or demonstrate equivalent competency through RPL).
- Working and experienced technicians who never had formal certification can also be certified under this qualification.

## Why the units are grouped this way
BNQF qualifications stack three kinds of competency:

1. **Generic units** — the human/behavioural layer. Here: *Work in a Team Environment*. Every trade in Bangladesh needs this, so one unit is shared nationally.
2. **Sector-specific units** — knowledge that belongs to light engineering (interpreting drawings, using hand tools, workplace safety).
3. **Occupation-specific units** — the trade itself: compressors, window ACs, split ACs, installation.

> Level 2 means you can perform **routine, predictable tasks** to a defined standard, using the right tools, with limited judgement. Level 3 moves you to complex, non-routine faults and supervision of others. Level 4 adds planning and training.

## The V2 revision matters
Your unit codes end in **V2** — the revised version. It added modern, greener practice: **natural refrigerants**, **recovery units and recovery cylinders**, **ATEX-rated leak detection and vacuum pumps**, and **micron-level evacuation**. Older study notes that ignore recovery and R290 are out of date. This course teaches the current standard.

>> Remember the number **300** (total hours), the five **unit codes**, and the job title **Junior Technician** — these are frequent written-test questions.
`,
      {
        subtitle: "Your 300-hour map from trainee to certified Junior Technician",
        drill: ["rac-ori-001", "rac-ori-002"],
      },
    ),
    lesson(
      S,
      "rac-orientation",
      "rac-l1-cbt-assessment",
      "Competency-based assessment: C or NYC",
      8,
      ["rac-orientation", "rac-assessment"],
      `
## You are judged, not graded
Competency-based training has **no percentage marks**. The qualified assessor (or assessor panel) makes a judgement of:

- **Competent (C)** — you performed every required task to the industry standard, safely, within a reasonable time, and can explain what you did.
- **Not Yet Competent (NYC)** — one or more performance criteria were not met. You are coached and reassessed; you are not "failed" and permanently excluded.

## Where assessment happens
Assessment runs in a **training centre, an actual workplace, or a simulated workplace**, using the equipment, tools and instruments named in the assessment tools. For RAC L2 the declared method is **project-type assessment covering all required units**, combined with written test, demonstration and oral questioning.

| Evidence type | Example for RAC L2 |
| --- | --- |
| Demonstration | Vacuum a split system to 500 microns and charge it correctly |
| Written test | Explain why superheat is measured |
| Oral questioning | "Show me how you prove a compressor winding is shorted" |
| Portfolio / log book | Dated job records, service reports, photographs |
| Workplace observation | Supervisor sees you work safely on a live site |

## The five judgement questions an assessor asks
1. Did the trainee **plan and prepare** — right tools, right PPE, isolation done?
2. Did the trainee **perform every step** in the correct sequence?
3. Did the trainee **stay inside safe working limits** (pressure, current, temperature, height)?
4. Did the trainee **check the result** against specification (leak-free, correct superheat, correct charge, drains flowing)?
5. Can the trainee **explain and record** what was done, including clean-up and disposal?

## Recognition of Prior Learning (RPL)
**RPL** is the formal recognition of skills you already have — learned on the job, in a family workshop, or through self-study. There is **open entry to assessment through RPL**. You still produce evidence and you are still judged C/NYC, but you do not have to sit the full 300-hour course.

> RPL is not a shortcut around competence. It is a shortcut around *training* for people who already are competent.

## Evidence rules that protect you
- Only collect evidence for units you are actually claiming.
- Date and sign every record; keep originals.
- Never record a task you did not perform — falsified evidence invalidates certification and can end a career.
- Keep your **Competency Skills Log Book** current; it is the fastest route through RPL later.

## Traffic-light self-check before assessment
- **Green**: I can do it alone, twice, in the standard time, and explain why.
- **Amber**: I can do it while someone watches and prompts me.
- **Red**: I have only read about it.

Only green tasks are ready to claim. Use the Progress screen in this app to find your ambers and reds, then practise those topics.
`,
      { subtitle: "How the assessor decides C or NYC — and how to prepare", drill: ["rac-ori-003"] },
    ),
  ],
};

export const safety: Module = {
  id: "rac-safety",
  subject: S,
  title: "Occupational Health, Safety & Environment",
  code: "Sector-specific · applied to every unit",
  hours: 30,
  summary:
    "The seven hazards that hurt RAC technicians, and the controls that stop them: refrigerant, pressure, fire, electricity, height, chemicals and heat.",
  icon: "shield",
  lessons: [
    lesson(
      S,
      "rac-safety",
      "rac-l2-hazards",
      "The seven hazards of RAC work",
      11,
      ["rac-safety"],
      `
## Why RAC is a high-risk trade
A technician carries three energies at once: a **pressurised gas system**, a **230 V electrical circuit**, and an **open flame** for brazing. Any one of them can kill. Competence starts with naming the hazard before touching the machine.

### 1. Refrigerant (asphyxiation, frostbite, toxicity, flammability)
- Liquid refrigerant boils at −30 °C to −50 °C. Contact causes **instant frostbite** — never let liquid spray your skin or eyes. Wear **goggles and gloves**.
- Refrigerant is **heavier than air**. In a small plant room or a basement it displaces oxygen silently. Work with ventilation, and never enter a pit or plant room after a suspected leak without forced ventilation and a second person standing by.
- Heat + refrigerant → decomposition into **phosgene and hydrogen fluoride** in the presence of a flame. Never braze near a charged or leaking system.
- **A2L/A3 refrigerants (R32, R290)** add flammability: no flame, no spark, no smoking, and keep charge within the manufacturer's limit.

### 2. Pressure (explosion, projectile injury)
Cylinders hold 15–35 bar. A cylinder that is overfilled, heated, dented or loose can rupture and take a workshop with it.

- Store cylinders **upright, secured, below 40 °C**, away from sunlight and flame, valve cap on.
- Always use a **regulator**; never connect a cylinder directly to a system without a gauge manifold.
- Never heat a cylinder to raise pressure. Use warm water on the *system*, never a torch on a cylinder.
- **Never fill a recovery cylinder above 80%** of its capacity — liquid expands.

### 3. Fire and brazing
Oxy-acetylene brazing gives a flame above 3000 °C. Flashback into the hoses is the classic fatality.

- Fit **flashback arrestors** at both regulator and torch; check hoses for cracks.
- Keep a **dry powder ABCE extinguisher** within reach (5 kg class per the equipment list), plus a fire blanket.
- Clear the area of oil, thinner and foam; shield walls and floors with a heat mat.
- Open the cylinder valve **only 1–1.5 turns** so you can shut it fast.
- Never leave a lit torch unattended.

### 4. Electrical
- **230 V / 50 Hz** single phase in Bangladesh; 400 V three-phase. Both are lethal.
- **Isolate, lock and tag (LOTO)** before opening a control box. Test the circuit with a proved multimeter — do not trust the switch.
- Discharge **capacitors** before handling them; a run capacitor can hold a painful charge after power-off.
- One hand rule for live diagnosis; insulated tools; dry footwear; never work standing in water.

### 5. Working at height
Outdoor units sit on brackets 3–25 m up.

- Use a ladder at **75°**, on firm level ground, footed or tied off, and never over-reach — move the ladder.
- For anything over 2 m without a safe platform, use a **full body harness** anchored above you.
- Never pass a compressor up a ladder by hand; hoist it.

### 6. Chemicals and dust
Coil cleaners are often **alkaline or acidic**; brazing fumes and copper dust are harmful. Wear **gloves, goggles and a respirator** rated for the job, and read the SDS/MSDS before opening a new bottle.

### 7. Heat, noise and posture
Dhaka rooftops reach 45–50 °C in summer. Hydrate, work in shade where possible, watch for heat exhaustion. Use ear protection near compressors and drilling. Lift compressors with your legs and a partner — a 1.5 TR compressor is 25–35 kg.

## The control hierarchy — apply it in order
1. **Eliminate** the hazard (e.g. recover the refrigerant instead of venting it).
2. **Substitute** (use a low-GWP, lower-pressure refrigerant where the manufacturer allows).
3. **Engineering control** (ventilation, guards, flashback arrestors).
4. **Administrative** (permits, job cards, training, work method statements).
5. **PPE** — the *last* line, never the first.

>> PPE is what you wear when everything above it has been done. If PPE is your only control, the job is not ready.
`,
      { subtitle: "Name the hazard before you touch the machine", drill: ["rac-saf-001", "rac-saf-002", "rac-saf-003"] },
    ),
    lesson(
      S,
      "rac-safety",
      "rac-l2-ppe-firstaid",
      "PPE, first aid, fire and emergency response",
      9,
      ["rac-safety"],
      `
## The PPE kit of an RAC technician
| PPE | Protects against | When |
| --- | --- | --- |
| Safety goggles / face shield | Liquid refrigerant spray, brazing sparks, coil-cleaner splash | Charging, brazing, cleaning coils |
| Chemical-resistant gloves | Frostbite, acid, oil, flux | All refrigerant and chemical work |
| Insulated electrical gloves | Shock | Live diagnosis only |
| Safety shoes (steel toe) | Dropped compressor, sharp fins | Always on site |
| Flame-retardant overalls | Flash fire, hot tubing | Brazing |
| Ear plugs | Compressor and drill noise | Plant rooms, drilling |
| Dust/respirator mask | Brazing fume, dust, mould in ducts | Cleaning, brazing in a confined area |
| Full body harness | Falls | Above 2 m |
| Apron + heat mat | Heat | Brazing |

## First aid you must be able to give
### Frostbite / liquid refrigerant on skin
1. Move the person away from the leak.
2. **Do not rub** the frozen area.
3. Flush with **tepid (lukewarm) water** — never hot.
4. Remove jewellery before swelling starts.
5. Cover with a sterile, dry, non-stick dressing; keep the person warm; get medical help.

### Refrigerant in the eyes
Irrigate with clean water for **at least 15 minutes**, holding the eyelid open, then seek medical attention. Do not use eye drops.

### Electric shock
1. **Do not touch** the casualty. Kill the supply first.
2. If you cannot isolate, separate them with a **dry, insulating** object (dry wooden pole, PVC).
3. Call for help, check breathing, start **CPR** if trained and not breathing.
4. All electric-shock casualties must be seen by a doctor, even if they feel fine — heart rhythm can destabilise later.

### Inhalation of refrigerant in an enclosed space
Move the casualty to fresh air **only if it is safe for you** (use breathing apparatus if the concentration is high). Never become the second casualty. Call emergency services.

### Burns from brazing
Cool with running water for **20 minutes**, remove rings and watch, cover with cling film or a clean dry dressing. Do not burst blisters, do not apply toothpaste, oil or ice.

## Fire: class and correct extinguisher
| Class | Fuel | Use |
| --- | --- | --- |
| A | Paper, wood, cloth | Water, dry powder |
| B | Flammable liquids (oil, thinner) | Foam, CO₂, dry powder |
| C (US) / E (BS) | Live electrical equipment | **CO₂ or dry powder — never water** |
| C (BS) | Flammable gas | Isolate gas, then dry powder |
| D | Combustible metals | Special dry powder |
| F | Cooking oil | Wet chemical |

The workshop equipment list specifies **5 kg ABCE dry powder extinguishers**. Dry powder is the general-purpose choice in a mixed workshop; **CO₂** is preferred for control panels because it leaves no residue.

### Using an extinguisher (PASS)
**P**ull the pin → **A**im at the base of the flame → **S**queeze the handle → **S**weep side to side.

If the fire is bigger than a wastebasket, or involves a full refrigerant cylinder: **evacuate, raise the alarm, do not fight it**.

## Emergency plan — know it before you need it
- Where is the nearest extinguisher, first-aid box, eyewash, and exit?
- Who calls 999, and who accounts for people at the muster point?
- Where is the **main electrical isolator** and the **gas cylinder store**?
- Where is the accident/incident register? Every near miss is recorded — near-miss reporting prevents the fatal version of the same event.

> An incident that is not reported will repeat, usually on someone who did not hear about it.
`,
      { subtitle: "PPE, frostbite, electric shock, fire classes and PASS", drill: ["rac-saf-004", "rac-saf-005"] },
    ),
    lesson(
      S,
      "rac-safety",
      "rac-l2-environment",
      "Refrigerant recovery and environmental law",
      8,
      ["rac-safety", "rac-refrigerants", "rac-env"],
      `
## Never vent. Ever.
Releasing refrigerant to the atmosphere is:
- **illegal** in Bangladesh under the Ozone Depleting Substances Rules and the Montreal Protocol commitments;
- an **environmental harm** — one kilogram of R410A has roughly the climate impact of two tonnes of CO₂;
- a **health hazard** in any enclosed space;
- a **waste of the customer's money** — recovered gas is re-usable.

## The recovery workflow (OU-LE-RAC V2 requires the equipment)
1. **Identify** the refrigerant from the nameplate — never guess. R22, R32, R410A, R134a, R290 and R600a must never be mixed.
2. Connect **recovery unit → manifold → service port**, with the recovery cylinder on a **weighing scale**.
3. Purge the hoses with the system refrigerant (or use low-loss fittings).
4. **Recover liquid first, then vapour**, until the system reaches 0 psig and then a slight vacuum. Never let the recovery machine pull below the manufacturer's limit.
5. **Weigh** the cylinder. Stop at **80% of water capacity** — never more.
6. Label the cylinder: **refrigerant type, weight, date, source, and whether it is virgin, recovered or recycled**.
7. Store in a cool, ventilated, locked area, upright and capped.
8. Send it for **recycling / reclamation**; contaminated refrigerant (with acid or moisture) must be destroyed, not reused.

## Why we do not use "top-up" as a repair
If the system is low, gas has left. Gas only leaves through a leak. Topping up hides the leak, pushes air and moisture in, and the machine fails again within weeks. The professional sequence is always:

**find the leak → repair it → pressure test → evacuate → charge by weight → verify by superheat/subcool.**

## The international framework in plain words
- **Montreal Protocol (1987)** — phased out **ODS** (ozone-depleting substances). This is what removed **R22 / HCFC-22** from new equipment. Bangladesh is an Article 5 (developing) country; HCFC consumption is scheduled to reach zero by 2030.
- **Kigali Amendment (2016)** — phases down **HFCs** (R410A, R32, R134a) because they are powerful greenhouse gases, even though they do not harm the ozone layer. Article 5 Group 1 countries freeze HFC consumption from 2024 and step down to about 80% reduction by 2045.
- **National level** — Bangladesh's Department of Environment licenses refrigerant import and enforces ODS rules; BSTI sets product standards and MEPS/energy labelling for air-conditioners.

## The vocabulary of climate impact
- **ODP (Ozone Depletion Potential)** — CFC-11 = 1.0. R22 = 0.055. R410A, R32, R134a, R290 = 0.
- **GWP (Global Warming Potential, 100-year)** — CO₂ = 1. R134a ≈ 1430. R22 ≈ 1810. R410A ≈ 2088. R32 ≈ 675. R290 ≈ 3.
- **TEWI (Total Equivalent Warming Impact)** — direct emissions (leaked refrigerant) **plus** indirect emissions (electricity used over the machine's life). A leaky, inefficient machine with a "green" refrigerant can still be the worst choice.

| Refrigerant | ODP | GWP | Safety class | Used in |
| --- | --- | --- | --- | --- |
| R22 | 0.055 | 1810 | A1 | Older window/split ACs |
| R410A | 0 | 2088 | A1 | Non-inverter splits |
| R32 | 0 | 675 | A2L (mildly flammable) | Modern inverter splits |
| R134a | 0 | 1430 | A1 | Fridges, chillers, car AC |
| R290 (propane) | 0 | 3 | A3 (flammable) | Small natural-refrigerant units |
| R600a (isobutane) | 0 | 3 | A3 | Domestic refrigerators |

## Safe practice for flammable refrigerants (R290, R600a, R32)
- No brazing on a charged system — **recover first**.
- No sparks, no smoking, no non-ATEX tools; use **ATEX-rated** vacuum pumps and leak detectors (your equipment list names ATEX types).
- Work in ventilation; charge **by weight only**, never by pressure.
- Keep the charge within the manufacturer's limit; R290 room-AC charges are small (hundreds of grams), which is what makes them safe in a room.
- Use **flare or Lokring** joints rather than brazing where the manufacturer specifies it.

>> The three sentences that answer most exam questions: recover, never vent; find the leak before charging; charge by weight, verify by superheat.
`,
      { subtitle: "Recovery, ODP/GWP, Montreal, Kigali and flammable refrigerants", drill: ["rac-env-001", "rac-env-002"] },
    ),
  ],
};
