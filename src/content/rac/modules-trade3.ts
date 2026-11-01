import type { Module } from "../types";
import { lesson } from "../md";

const S = "rac-l2" as const;

export const team: Module = {
  id: "rac-team",
  subject: S,
  title: "Work in a Team Environment",
  code: "GU-09-L2-V1 · 20 hours",
  hours: 20,
  summary:
    "The generic unit every NSDA qualification shares: team roles, communication, meetings, reporting and professional conduct on site.",
  icon: "team",
  lessons: [
    lesson(
      S,
      "rac-team",
      "rac-l12-team",
      "Teams, roles and communication flow",
      10,
      ["rac-team"],
      `
## What a team is for
A **team** is a group of people with complementary skills working toward a shared goal, mutually accountable for the result. In RAC work, a two-person installation crew *is* a team: one on the bracket, one on the pipe; the job is safe only if both follow the same plan.

## Structure, roles and responsibilities
| Role | Responsibility on an HVAC job |
| --- | --- |
| **Team leader / supervisor** | Plans the job, allocates tasks, checks quality, signs off, reports upward |
| **Senior technician** | Diagnoses complex faults, guides juniors, verifies refrigerant work |
| **Technician** | Performs installation/service to standard, records readings |
| **Assistant / helper** | Tools, materials, site safety, lifting support |
| **Safety officer / HSE** | Permits, PPE compliance, incident reporting |
| **Storekeeper** | Cylinders, consumables, log book, cylinder weights |
| **Customer / client** | Defines the requirement, approves access, receives the handover |

You will occupy several of these in one week. Knowing which hat you are wearing prevents both overreach and neglect.

## Communication flow and reporting structure
**Upward** — reports, job cards, incident reports, requests for materials. Follow the chain: technician → supervisor → manager. Skipping the chain is acceptable **only** for a safety emergency.

**Downward** — work instructions, method statements, targets, safety briefings.

**Lateral** — between technicians, with the store, with other trades on site (electrician, mason, plumber). Most delays on a building site are lateral communication failures, not technical ones.

### The three rules of a good report
1. **Fact, not feeling.** "The compressor draws 0 A with 230 V present and the winding reads open" — not "the compressor is dead".
2. **Numbers and units.** Pressure, temperature, current, microns, torque.
3. **Action taken plus what is next.** "Recovered 620 g R32, will replace compressor and drier tomorrow 9 a.m.; customer informed."

## Interpersonal communication
- **Listen first**, then repeat the complaint back to the customer in your own words. Half of "difficult customers" are simply unheard customers.
- **Speak the customer's language**, not jargon. "Your outdoor unit is blocked by the balcony wall" beats "elevated condensing temperature due to recirculation".
- **Ask, do not assume.** Confirm the model, the refrigerant, the isolation point.
- **Respect hierarchy and dignity.** A helper who is spoken to with respect does not make the mistake that costs a compressor.
- **Never criticise a colleague in front of a customer.** Escalate privately.

## Team planning
A workable plan for a two-person installation:
1. Agree the **scope and sequence** and who does which step.
2. Agree **checkpoints** — after mounting, after pressure test, after evacuation.
3. Agree the **safety signals** for lifting and for working at height.
4. Agree the **materials list** and verify it before leaving the workshop (the most common cause of lost hours).
5. Agree the **finish time** and who reports to the customer.

## Team meetings
- **Toolbox talk** (5–10 minutes, daily): today's jobs, hazards, PPE, lessons from yesterday.
- **Pre-job briefing**: method, roles, isolation, access, emergency plan.
- **Post-job review**: what went well, what went wrong, what changes.
Good meetings are short, specific and end with **named actions and times**.

## Online communication (increasingly assessed)
WhatsApp groups and email are now the reporting channel for many Bangladeshi service companies.
- Send **complete information**: model, serial, photo of the nameplate, readings, location, contact.
- Write in full sentences; avoid voice notes for technical data (unsearchable and unrecordable).
- Never send customer personal data, ID numbers, or photographs of people without consent.
- Keep a **digital job record** and back it up — this app's export function exists for the same reason.

## Conflict and difficult situations
- Disagree with the **idea**, not the person; propose an alternative.
- If a colleague works unsafely: **stop the job**, say why, and report it. That is a professional duty, not disloyalty.
- If a customer refuses a necessary repair (e.g. wants a top-up instead of a leak repair), record the advice given in writing. It protects them and you.

## OHS inside the team
- Everyone has authority to stop an unsafe job.
- Report every **near miss**, not just injuries.
- Keep the **first-aid box, extinguisher and emergency numbers** known to all.
- Never work alone on a live panel or in a confined space.
`,
      { subtitle: "Roles, reporting, interpersonal skill, meetings, online conduct", drill: ["rac-tem-001", "rac-tem-002"] },
    ),
  ],
};

export const career: Module = {
  id: "rac-career",
  subject: S,
  title: "Assessment, Job Cards & Career",
  code: "Assessment standards · Sections 3–5",
  hours: 15,
  summary:
    "Turn competence into a certificate and a business: prepare evidence, pass the project assessment, price a job, and plan the path to Level 3 and 4.",
  icon: "trophy",
  lessons: [
    lesson(
      S,
      "rac-career",
      "rac-l13-assess",
      "Passing the project-type assessment",
      10,
      ["rac-assessment"],
      `
## What the assessment actually is
For RAC Level 2 the declared arrangement is **demonstration of competency through project-type assessment covering all required units**, combined with written test, oral questioning, demonstration and portfolio, conducted in a training centre, real or simulated workplace, by an **NSDA-certified assessor**.

That means you will be asked to **do the job end to end while being observed**, and to **explain what you are doing**.

## The five competencies they will watch
1. **Work in a team environment** — brief, roles, communication, safety behaviour.
2. **Check and maintain a compressor** — visual, electrical, megger, capacitor, current, maintenance record.
3. **Service and repair a window AC** — fault-find systematically, repair, clean, charge, verify.
4. **Service and repair a split AC** — including inverter/board diagnosis and communication faults.
5. **Install a split AC** — survey, mount, pipe, flare torque, nitrogen test, vacuum to 500 microns, charge, commission, hand over.

## The evidence you should build now
| Evidence | How to get it |
| --- | --- |
| Job cards | Every real repair, signed and dated, with readings |
| Photographs | Before/after, nameplate, micron gauge, manifold readings |
| Log book | Competency Skills Log Book, updated weekly |
| Oral answers | Practise explaining superheat, recovery, megger, error codes aloud |
| Safety record | Toolbox talks attended, incidents/near misses reported |

> An assessor cannot certify what they cannot see or read. A detailed job card is evidence; a memory is not.

## The 20 things that most often cause NYC
1. No PPE.
2. Not isolating before opening a panel.
3. Not discharging a capacitor.
4. Venting refrigerant.
5. No nitrogen purge while brazing.
6. Not pressure-testing before charging.
7. Judging vacuum by time instead of a micron gauge.
8. Charging by feel, not by weight.
9. Not recording readings.
10. Skipping the drain test.
11. Over-torquing a flare.
12. Leaving a service valve half open.
13. Not refitting valve caps.
14. Ignoring a leak because "it is small".
15. Mixing refrigerants.
16. Working at height without a harness.
17. Not cleaning the area before handover.
18. Not explaining the job to the customer.
19. Not knowing the nameplate values for the unit in front of you.
20. Guessing an answer instead of saying "I would check the manual".

## How to answer oral questions well
Use a **four-part answer**: what you check → with what tool → what good looks like → what you do if it is not good.

> **Q: How do you know the charge is correct?**
> "I charge by weight to the nameplate figure plus the extra per metre of pipe, then verify: subcooling 5–12 K on the liquid line, superheat in the manufacturer's range, compressor current at or below rated, and air ΔT of 8–14 K after fifteen minutes. If subcooling is low with bubbles, it is short of charge; if superheat is low and the suction line is sweating to the compressor, it is overcharged or the metering device is passing liquid."

## Written test technique
- Read the whole question; note words like **NOT**, **first**, **most important**.
- For "first step" questions, the answer is almost always **isolate / make safe / assess**.
- For "which tool", answer the **instrument** named for the quantity (megger for insulation, micron gauge for vacuum, clamp meter for current).
- For numeric questions, write the formula first, then substitute, then give the **unit**. Marks are often awarded for the method.

## After certification
- The certificate is **national**: National Skills Certificate, BNQF Level 2, Junior Technician.
- Keep it, plus your log book. Both are needed for **RPL** into Level 3 and for employment with larger employers.
- Re-assessment and up-skilling are normal; technology (inverters, A2L refrigerants) changes faster than curricula.
`,
      { subtitle: "Evidence, the 20 NYC traps, oral-answer formula and written technique", drill: ["rac-asm-001", "rac-asm-002"] },
    ),
    lesson(
      S,
      "rac-career",
      "rac-l13-business",
      "Job cards, costing and the service business",
      9,
      ["rac-team", "rac-assessment"],
      `
## The job card is your legal and commercial record
A complete job card contains:
- Job number, date, customer name, address, contact.
- Unit make, model, **serial**, capacity, **refrigerant and charge**.
- Reported complaint, in the customer's words.
- **Readings before**: voltage, current, pressures, superheat/subcool, air ΔT.
- Diagnosis, action taken, parts used with quantities.
- **Readings after** — the same set, which proves the repair.
- Refrigerant recovered / charged (grams), and where recovered gas went.
- Safety checks, drain test, cleanup.
- Customer signature, technician name and signature, next service date.

Without the "after" readings you cannot prove the repair; without the customer signature you cannot prove the visit.

## Costing a service job in Bangladesh
A transparent quote has four parts:

1. **Call-out / diagnostic fee** — covers travel and diagnosis, charged even if no repair is done.
2. **Labour** — hours × rate, or a fixed price per standard job (gas charge, installation, deep clean).
3. **Materials at cost + margin** — refrigerant per gram, capacitor, pipe per metre, insulation, drain hose, bracket, cable, MCB.
4. **Extras the customer approved** — bracket replacement, extra pipe, stabiliser.

$ Job price = labour + materials + transport + overhead share + profit

Never quote from memory. Build a **price list** for your standard jobs (window service, split service, split installation per TR, gas charge per type) and update it quarterly as refrigerant prices move.

## Standard job pricing anchors (illustrative — verify locally)
| Job | Basis for pricing |
| --- | --- |
| Window AC service (clean + check) | Fixed price per unit |
| Split AC deep clean (indoor + outdoor) | Fixed price per unit, + per extra indoor unit |
| Split installation (up to 3 m pipe) | Fixed price per TR + per extra metre |
| Gas charge | Per 100 g of the specific refrigerant + vacuum + labour |
| Leak repair | Diagnostic + repair + test + recharge |
| Inverter board replacement | Part cost + labour + surge protection advice |

Always **state what is excluded**: masonry work, electrical circuit changes, scaffolding, refrigerant price fluctuations.

## Getting and keeping customers
- **Respond fast.** The technician who answers the phone wins the job.
- **Fix the cause, not the symptom.** A top-up earns one visit; a leak repair earns ten years of referrals.
- **Explain before you charge.** Customers accept cost when they understand value.
- **Leave it cleaner than you found it.** It is the cheapest marketing that exists.
- **Follow up** after a big repair. A single message costs nothing.
- **Keep records** so you can quote accurately, prove warranty, and spot repeat failures.
- **Get reviews** and keep a portfolio of before/after photographs.

## Career path
| Stage | Typical role | Evidence |
| --- | --- | --- |
| BNQF 1 | Helper / assistant | Basic tool use, safety |
| **BNQF 2 (you)** | **Junior Technician** | Service and install under routine conditions |
| BNQF 3 | Technician / senior technician | Complex faults, inverter systems, supervision |
| BNQF 4 | Supervisor / trainer / assessor track | CBT&A Level 4 methodology, planning, training |
| Entrepreneur | Service company owner | Costing, contracts, team leadership |

Each level needs roughly **270 additional learning hours** beyond the previous one, per NSDA guidance. Certification is recognised nationally; combined with experience it is what employers and overseas recruiters ask for.

## Freelancing and digital work
The same competence sells online: marketplace listings for AC installation/service, WhatsApp Business catalogues, before/after photo portfolios, and simple invoicing apps. Keep your **digital job records** in this app — export them for a customer, a warranty claim, or an RPL portfolio.

> The trade pays for hands that are competent and a reputation that is honest. Everything in this course serves those two things.
`,
      { subtitle: "Job cards, transparent costing, customer retention and career ladder", drill: ["rac-asm-003"] },
    ),
  ],
};
