import type { Module } from "../types";
import { lesson } from "../md";

const S = "rac-l2" as const;

export const windowAc: Module = {
  id: "rac-window",
  subject: S,
  title: "Service & Repair Window Air-Conditioners",
  code: "OU-LE-RAC-02-L2-V2 · 60 hours",
  hours: 60,
  summary:
    "Read the nameplate, pull the unit, find the fault in a fixed order, clean it like a professional, charge it correctly and prove it.",
  icon: "window",
  lessons: [
    lesson(
      S,
      "rac-window",
      "rac-l9-nameplate",
      "Anatomy and the nameplate",
      11,
      ["rac-window"],
      `
## Everything in one box
A window AC is a **single packaged unit**. All four cycle components plus both fans and all controls live in one chassis that slides into a wall sleeve.

Layout: **indoor side** — evaporator coil, blower (squirrel-cage), filter, control panel, thermostat sensor; **outdoor side** — condenser coil, propeller fan, compressor, capacitor, terminal box, capillary tube, and the partition with the drain pan between them.

Because both coils share one chassis, airflow separation matters: the **partition seal** must be intact, or hot condenser air leaks back into the room and cold room air escapes. A torn partition is a real capacity loss, not a cosmetic issue.

## Reading the nameplate — the exam's favourite table
| Field | Typical values | What you do with it |
| --- | --- | --- |
| Model | e.g. GJC12AG | Look up the service manual, schematic, error list |
| Cooling capacity | 12,000 BTU/h = 1 TR, or 3.52 kW | Confirm the unit is the right size for the room |
| **Refrigerant** | R22 / R410A / R32 and the **charge in grams** | Never mix; charge by weight to this figure |
| Rated voltage | 220–240 V, 50 Hz | Compare with measured supply under load |
| **Rated current / input power** | e.g. 5.5 A / 1,180 W | Compare with clamped current |
| EER / energy class | e.g. EER 10.2 BTU/Wh | Estimate running cost |
| Max test pressure | e.g. 400 psig | Never exceed when pressure-testing |
| Protection class | I | Requires earth |

! A window AC nameplate says 12,000 BTU/h, 1,150 W | Capacity in TR = 12,000 ÷ 12,000 = 1 TR | EER = 12,000 ÷ 1,150 | ⇒ 10.4 BTU/Wh. Energy per hour at full load = 1.15 kWh, so 8 hours ≈ 9.2 units on the meter.

## Sizing a window unit
Rough field rule for Dhaka conditions (35–45 °C ambient):
- **1 TR ≈ 100–130 ft²** of floor area for a normal 2.7–3 m ceiling with average glazing.
- Add for **west/south sun**, large windows, top floor, many occupants, kitchens.
- Subtract for shaded, insulated, ground-floor rooms.
- One person adds ~100 W of sensible load; a computer ~150 W; a halogen lamp ~100 W.

An **undersized** unit runs forever, never dehumidifies fully and dies young. An **oversized** unit short-cycles, never dehumidifies and feels clammy. Correct sizing is the first engineering decision.

## The service workflow that never fails
1. **Interview the customer**: when did it start, is it cooling at all, is it noisy, does water leak, was there a power surge?
2. **Look and smell**: filter, fins, oil stains at joints, burnt smell, insect nests, corrosion.
3. **Power test in place**: supply voltage, current, air ΔT across the evaporator, sound.
4. **Isolate** and remove the unit from the sleeve (two people, lift with legs; it is 35–55 kg).
5. **Electrical tests**: capacitor, windings, protector, thermostat, fan motor, overload.
6. **Refrigerant tests**: pressures, superheat, leak search.
7. **Clean and repair**.
8. **Reassemble**, vacuum and charge if the circuit was opened.
9. **Run test** at least 20 minutes, record everything, hand over and explain the cause to the customer.

>> Sequence discipline is a competency: an assessor marks you down for skipping isolation, for not recording readings, and for cleaning before diagnosing.
`,
      { subtitle: "Packaged construction, nameplate maths, sizing, the 9-step workflow", drill: ["rac-win-001", "rac-win-002"] },
    ),
    lesson(
      S,
      "rac-window",
      "rac-l9-faults",
      "The fault-finding matrix",
      12,
      ["rac-window"],
      `
## Start with the two questions
1. **Is the compressor running?** (listen, feel the shell, clamp the current)
2. **Is the evaporator doing its job?** (sweating evenly? air ΔT 8–14 K?)

Those two answers cut the entire matrix in half.

## Matrix — "no cooling"
| Evidence | Cause | Confirm by | Action |
| --- | --- | --- | --- |
| Fan runs, compressor silent, no current | Thermostat, capacitor, protector, open winding, PCB | Capacitance, winding resistance, voltage at terminal | Replace faulty component |
| Compressor hums, trips overload every ~30 s | **Run capacitor weak/open**, seized compressor, low voltage | Capacitance; voltage under load; locked-rotor current | Capacitor first — it is the most common cause |
| Compressor runs, no cooling, low suction | **Low charge / leak** | Superheat high, pressures low, oil stain | Find and repair leak, evacuate, charge by weight |
| Both pressures normal, no cooling inside | Dirty evaporator, blocked filter, blower fault, partition leak | Visual, airflow, ΔT | Clean, repair seal |
| High head pressure, high current | Blocked condenser, recirculation, overcharge, fan fault | Condenser cleanliness, clearances, condenser fan | Clean, reposition, correct charge |
| Ice on the evaporator | Low airflow, low charge, restricted capillary | Filter, blower wheel, superheat | Fix airflow, then charge |
| Unit cools then cuts out on hot afternoons only | Voltage drop, overload, dirty condenser | Voltage under load, current | Stabiliser, clean condenser |
| Compressor runs continuously, room never reaches setpoint | Undersized, oversized room, open door, thermostat sensor misplaced | Sizing, sensor position | Advise, relocate sensor |

## Other complaints
### Water leaking into the room
- **Blocked drain / pan sludge** — the #1 cause. Clear and flush.
- Unit not tilted correctly — the pan must drain to the outlet; a small backwards tilt traps water.
- Drain outlet blocked by the wall or sleeve, or hose pressed flat.
- Frozen coil melting after the unit stops — fix the icing cause, not the water.
- Torn partition seal letting condenser air blow into the room, carrying moisture.

### Noise and vibration
| Sound | Cause |
| --- | --- |
| Rattling | Loose fan blade, loose panels, debris in the blower |
| Squealing | Dry blower bearing, worn fan motor |
| Knocking | Compressor internal wear, loose mounting rubbers |
| Loud hum, no start | Capacitor, low voltage, seized compressor |
| Vibration through the wall | Sleeve not isolated, wall bracket loose |

### Bad smell
Mould and biofilm on the evaporator, blower and drain pan — the unit has been running wet with a dirty filter. Clean, disinfect, dry, and instruct the customer to clean the filter every two weeks in the season.

### Remote / control not responding
Batteries, IR receiver, child-lock, or a reset needed. Test the remote with a camera (the IR LED shows purple on a phone camera).

## Pump-down before removing a unit with a service valve
For units with gauge ports, you can store the charge in the condenser:
1. Connect the manifold to the low side; open the liquid (discharge) valve, close it slowly to stop liquid flow.
2. Run the compressor briefly until the low side reaches about **0–5 psig**, then **stop** — do not let it run into a deep vacuum.
3. Close the suction valve. The charge is trapped in the outdoor side.
4. Isolate, disconnect, and cap/plug the lines immediately.

Fixed-orifice window units often have **no service ports** — in that case recover the charge with a **piercing/line-tap valve** or a recovery machine on a process tube, repair, then re-charge by **weight** to the nameplate figure.

## What "verified" means
You are not finished when the unit blows cold. You are finished when:
- the current is at or below rated,
- the air ΔT is 8–14 K,
- superheat is in range,
- no ice forms after 30 minutes,
- no water or refrigerant leak is detected,
- the filter, pan, blower and coils are clean,
- the job card is complete and the customer has been told the cause and the preventive advice.
`,
      { subtitle: "Diagnose no-cooling, icing, water, noise and electrical faults in order", drill: ["rac-win-003", "rac-win-004"] },
    ),
  ],
};

export const splitService: Module = {
  id: "rac-split-service",
  subject: S,
  title: "Service & Repair Split Air-Conditioners",
  code: "OU-LE-RAC-03-L2-V2 · 120 hours",
  hours: 120,
  summary:
    "The largest unit in the qualification: two-part systems, inverter boards, communication faults, EEV behaviour and systematic diagnosis.",
  icon: "split",
  lessons: [
    lesson(
      S,
      "rac-split-service",
      "rac-l10-architecture",
      "Two-part architecture: indoor, outdoor, communication",
      11,
      ["rac-split-service"],
      `
## Why split
The noisy, hot half (compressor, condenser fan) is moved outside; only the quiet evaporator and blower remain in the room. That is the entire design idea — and every service consequence follows from it: two locations, an interconnecting pipework, and a **communication** path between the halves.

| Indoor unit | Outdoor unit |
| --- | --- |
| Evaporator + blower | Compressor |
| Air filter | Condenser + propeller fan |
| Indoor PCB, display, IR receiver | Outdoor PCB, IPM, reactor |
| Room & coil thermistors | Ambient & discharge thermistors |
| EEV (in many inverter models) | EEV (in other models), capillary |
| Drain pan and drain hose | Service valves, terminal block |
| Swing louvre motor | 4-way valve (heat pump) |

## The interconnecting path
- **Liquid line** (small, e.g. 1/4" or 3/8")
- **Suction line** (large, e.g. 1/2" or 5/8"), insulated
- **Communication wire** (2–4 cores)
- **Drain hose** (from indoor)
- Sometimes a **condensate pump** for long lifts

Every one of those five is a fault path. A split AC with "no cooling" is often a **communication** or **drain** fault, not a gas fault.

## Cooling-only vs heat pump
A **heat pump** adds a **four-way reversing valve**: it swaps evaporator and condenser roles so the indoor coil heats. In heating mode:
- the outdoor coil becomes the evaporator and must **defrost**;
- the indoor fan slows or stops at start (to avoid blowing cold air),
- an outdoor thermistor and often a crankcase heater are involved, and
- superheat/subcool logic inverts.

A technician who diagnoses a heat pump using cooling-mode numbers will condemn a healthy machine.

## Inverter vs non-inverter summary
| | Non-inverter | Inverter |
| --- | --- | --- |
| Compressor | Fixed speed, on/off | BLDC, variable frequency |
| Metering | Capillary | EEV |
| Efficiency | Lower, but simpler | Higher at part load |
| Fault diagnosis | Relays, capacitor, thermostat | Codes, sensors, IPM, communication |
| Board cost | Low | High — protect with surge protection |
| Room comfort | 1–2 K swings | Steady |

## The service valve discipline
Outdoor units have **liquid** and **suction** service valves with **valve cores** and caps. Losing a cap costs a system: moisture in, charge out.
- Always refit and tighten the caps after service.
- Test the **valve core** and the **cap seal** for leaks — a frequent leak site that is missed because it is small and high up.
- Use a **torque wrench** on the valve cap; over-tightening cracks it.

## Pump-down (when the unit has to be moved)
1. Connect the gauge manifold to the **low-pressure** side.
2. Close the **liquid** valve (hex wrench, clockwise).
3. Start the unit in cooling; watch the low-side pressure fall.
4. When it reaches about **1–0.5 bar gauge (near 0 psig)**, close the **suction** valve and **stop immediately**. Running into a deep vacuum pulls moisture and air in through any weak joint, and can damage the compressor.
5. Isolate the power, disconnect the wiring, cap every open end, plug the pipes.
6. On reinstallation: pressure test with nitrogen, evacuate to 500 microns, then re-open both valves fully (back-seat them) before starting.

> Valves must be **fully open** in normal operation — a half-open valve is a restriction that ruins capacity and can be mistaken for a low charge.

## Record the model before you work
Photograph the nameplate, the wiring diagram (usually inside the outdoor cover) and the error-code table. A 10-second photo prevents a 3-hour call-back.
`,
      { subtitle: "Two halves, five interconnections, pump-down and valve discipline", drill: ["rac-spl-001", "rac-spl-002"] },
    ),
    lesson(
      S,
      "rac-split-service",
      "rac-l10-diagnosis",
      "Systematic diagnosis of split systems",
      13,
      ["rac-split-service", "rac-electrical"],
      `
## The 8-step split diagnosis
1. **Interview + observe** — complaint, history, recent power problems, water on the wall, noise.
2. **Power quality** — voltage at the socket and at the outdoor terminal **under load**. Below ~198 V an inverter will protect itself and refuse to start; above ~253 V it may be damaged.
3. **Indoor airflow** — filter, blower, coil, and air ΔT.
4. **Command path** — does the indoor unit accept the remote, does the display show a code, does the indoor fan run?
5. **Communication** — with power on, the outdoor board should show a heartbeat LED; check the signal wire continuity and polarity, and look for moisture in the terminal block (extremely common in monsoon).
6. **Electrical** — capacitor, windings, protector, IPM, sensors.
7. **Refrigerant** — pressures, superheat, subcool, leak search.
8. **Verify and record** — 20+ minutes of stable operation, all readings logged.

## Reading a split as a whole system
| Reading | Healthy | Interpretation |
| --- | --- | --- |
| Indoor air in → out | ΔT 8–14 K | Lower = airflow/charge/filter; higher = low airflow |
| Suction line | Cold, sweating, insulated | Warm + high SH = starved |
| Liquid line | Warm-to-touch, no bubbles | Bubbles = undercharge |
| Discharge line | Hot (60–95 °C) | Above ~110 °C = trouble |
| Suction pressure (R32/R410A) | ~110–140 psig at 5–10 °C evap | Compare with P-T chart, not memory |
| Condensing temperature | ~10–15 K above outdoor ambient | Higher = blocked condenser / recirculation |
| Compressor current | ≤ nameplate | Higher = head pressure or mechanical |
| Outdoor fan | Running at commanded speed | Inverter fans vary — do not expect full speed |

## The five most common split faults in Bangladesh
1. **Dirty indoor coil/filter and blower** → weak cooling, ice, water, mould. Fix: deep clean.
2. **Failed run capacitor (non-inverter)** → compressor will not start, hums, overload trips. Fix: replace with the same µF.
3. **Inverter outdoor board / IPM failure after a surge** → code shown, compressor dead. Fix: verify sensors and windings, check DC bus, replace board, add surge protection.
4. **Gas leak at flares and valve cores** → gradual loss, oil stains, high superheat. Fix: leak search, flare re-make to torque, evacuate, charge by weight.
5. **Blocked drain / drain back-fall** → water inside the room, float switch tripping. Fix: clear, re-slope, insulate.

## Communication fault procedure (the E6 family)
This is the fault that most often gets a board replaced unnecessarily.
1. Confirm **both** units have power (outdoor has its own supply on many models).
2. Measure the signal wire for continuity end to end; check that it is not the earth wire by mistake.
3. Check **polarity** at both terminal blocks (1–1, 2–2, 3–3, earth–earth).
4. Inspect for water in the terminal block, corroded strands, or a chewed cable.
5. With power on, observe the outdoor LED pattern; compare with the manual's table.
6. Only then suspect the boards — and replace the **indoor** board first if the code names indoor communication.

## PCB replacement discipline
- Photograph every connector before removal.
- Discharge and confirm the DC bus dead.
- Use thermal paste; tighten the IPM/heat-sink screws in a cross pattern.
- Never re-use a damaged connector or a stretched spade terminal.
- After fitting, reset, run at full load, and check current and pressures again.
- Advise the customer to fit a **voltage stabiliser/surge protector** — boards die from supply quality, not usually from age.

## Refrigerant decisions on a split
- **Never top up** to "make it cold". If it is short of gas, there is a leak.
- After opening the circuit: new **filter drier**, nitrogen purge while brazing, **pressure test**, **triple evacuation to 500 microns**, charge **by weight** plus **extra charge per metre** of pipe beyond the factory length (per the manual, typically 20–40 g/m).
- Verify with superheat/subcool and current, not by feel.
`,
      { subtitle: "8-step diagnosis, common faults, communication faults and board swaps", drill: ["rac-spl-003", "rac-spl-004"] },
    ),
  ],
};

export const install: Module = {
  id: "rac-split-install",
  subject: S,
  title: "Install Split Air-Conditioners",
  code: "OU-LE-RAC-04-L2-V2 · 60 hours",
  hours: 60,
  summary:
    "The installation that decides the next ten years of performance: survey, sizing, positioning, pipework, vacuum, charge, commissioning and handover.",
  icon: "install",
  lessons: [
    lesson(
      S,
      "rac-split-install",
      "rac-l11-survey",
      "Site survey, sizing and positioning",
      12,
      ["rac-split-install"],
      `
## Installation is engineering, not drilling
A perfect machine installed badly delivers half its capacity and fails early. Roughly three out of four poor-performance complaints trace back to installation.

## Step 1 — Survey and record
- **Room**: floor area, ceiling height, orientation (west rooms gain most), glazing area and type, insulation, shading.
- **Heat sources**: people, computers, lights, kitchen, west-facing glass.
- **Electrical**: supply capacity, existing circuit, earthing quality, voltage stability, MCB rating, cable route.
- **Structure**: wall material (brick, concrete, plasterboard, prefab), load-bearing points for brackets, permission for drilling.
- **Route**: pipe length, height difference, number of bends, where the drain can fall.
- **Outdoor position**: airflow, sun, security, service access, noise to neighbours, floor loading.

## Step 2 — Size it
Field method for Bangladesh (accepting 100–130 ft² per TR for a typical room at 3 m ceiling):

$ Required TR ≈ (Area in ft² ÷ 120) + adjustments

| Adjustment | Approx. add |
| --- | --- |
| West or south wall with large glass | +10–15 % |
| Top floor / uninsulated roof | +10–15 % |
| More than 3 occupants | +5 % per extra person |
| Kitchen or heavy equipment | +15–25 % |
| Ground floor, shaded, insulated | −5 to −10 % |

! A 240 ft² west-facing top-floor bedroom | Base = 240 ÷ 120 = 2.0 TR | West +15 % and top floor +12 % → 2.0 × 1.27 | ⇒ about 2.5 TR. Choose 2.5 TR, not 2.0.

For commercial or critical spaces, use a proper **heat-load calculation** (ASHRAE-style) with U-values and solar factors rather than this rule of thumb.

## Step 3 — Position the indoor unit
- **High on the wall**, 15–25 cm clear above, so air circulates across the room rather than onto heads.
- Blow **across** the room, not directly onto a bed or a desk if avoidable.
- Avoid above electronics, kitchen stoves, or where curtains block the intake.
- Keep the **drain route falling continuously** to outside.
- Minimum distance before the evaporator/pipe bends (usually ~1 m of straight pipe) — follow the manual.
- Leave service access to the filter and the flare connections.

## Step 4 — Position the outdoor unit
- **Never** enclose it. Recommended clearances in typical manuals: ~30 cm in front of the fan, ~10–15 cm at the back and sides. More is better.
- Avoid a narrow balcony corner where hot air recirculates — the single most common installation defect in Dhaka.
- Mount on **anti-vibration pads** and a rigid bracket; anchor into structure, not into cladding.
- Not directly above a neighbour's window/door; respect drip and noise.
- **Below or level with** the indoor unit if possible. If above, respect the maximum height difference (typically 10–15 m for residential splits) and fit a **drain lift** or the drain will not work.
- Protect from direct monsoon run-off and keep the electrical box sealed.

## Step 5 — Pipework limits
| Limit | Typical residential split |
| --- | --- |
| Maximum total pipe length | 15–25 m (check the manual) |
| Maximum height difference | 10–15 m |
| Minimum length | ~3 m (below this, noise and oil return issues) |
| Additional charge beyond factory length | 20–40 g per metre (per manual) |
| Every extra bend | Equivalent length increase — count them |

> Exceeding the limits voids the warranty and destroys performance. If the route needs 30 m, the correct answer is a different design, not a longer pipe.
`,
      { subtitle: "Survey, load estimation, indoor/outdoor placement and pipe limits", drill: ["rac-ins-001", "rac-ins-002"] },
    ),
    lesson(
      S,
      "rac-split-install",
      "rac-l11-execute",
      "Executing the installation",
      13,
      ["rac-split-install", "rac-tubing"],
      `
## The sequence (memorise this order)
**Prepare → mount → pipe → wire → drain → test → evacuate → release/charge → verify → hand over.**

Something skipped out of order always costs more later. Do not wire before the pipework is pressure-tested; do not charge before evacuating.

## 1. Preparation
- PPE: helmet if working at height, harness, gloves, goggles, safety shoes.
- Tools: drill + bits, level, measuring tape, torque wrench, flare tool set, tube cutter, deburr tool, bending springs, nitrogen regulator, vacuum pump, micron gauge, gauge manifold, scale, leak detector, insulation, drain hose, cable, MCB, lagging, sealing putty.
- Protect the customer's floor and furniture; ask before drilling; agree where the holes will be.
- Confirm the unit matches the order: **model, capacity, refrigerant, voltage**, indoor/outdoor pairing (they must be a matched pair — mismatched pairs are a warranty fraud and a performance disaster).

## 2. Mount
- **Indoor bracket/plate**: level in both axes (use a spirit level, not the eye), anchored into solid material; screws into a stud or with proper anchors; add extra fixing if the wall is hollow.
- Hang the unit, check it sits flush and there is no gap behind (a gap leaks air into the wall cavity).
- **Outdoor bracket**: level, bolted through the wall with anti-vibration rubber; two people for lifting; never stand on the bracket.

## 3. Drill and route
- Drill with a slight **downward slope to the outside** (about 1–2 cm per metre) so condensate and rain drain out; seal the hole with putty after.
- Protect the pipe with the supplied **wall sleeve** and cap the ends while feeding through.
- Keep the drain hose **below** the refrigerant pipes to avoid condensation dripping onto them.

## 4. Pipework
- Measure, cut square, **deburr**, bend with a proper radius, flare to the **torque table**.
- Fit the **flare nuts before flaring**.
- Support the pipe every 1–1.5 m with saddles; do not let it hang on the flare joints.
- **Insulate the suction line fully** and both lines in humid spaces; no gaps at joints; seal every seam — an uninsulated or poorly sealed suction line sweats, drips, and loses capacity.
- Avoid tight 90° elbows; every bend adds restriction.

## 5. Electrical
- Dedicated circuit from the distribution board; **MCB** sized to the unit (typically 16–20 A for 1–1.5 TR) and **2.5 mm²** copper.
- **Earth conductor** properly connected at both the socket and the unit.
- Correct cable gauge for length; a voltage drop over a long run causes start failures.
- Terminal block torque: tight, but do not crush strands. Ferrule or crimp where stranded.
- Communication wire: use the manufacturer's core count; never substitute earth for signal.
- Seal cable entries; cable ties; no cable touching hot discharge pipe.

## 6. Drain
- Continuous fall; **no uphill sections**; no sharp kinks.
- Insulate the indoor drain section.
- Terminate where water will not stain a wall, annoy a neighbour, or pool near the outdoor unit.
- If the lift is unavoidable, fit a **condensate pump** with a float switch.
- **Test with water** before you finish — every single time.

## 7. Pressure test and evacuation
- **Nitrogen test** at the manufacturer's pressure (commonly ~500 psig for R410A/R32), hold 10–15 minutes.
- **Leak-check every flare and valve** with soap solution or a detector.
- **Triple evacuate** to **500 microns** with a micron gauge; hold 10–15 minutes.
- Only then open the service valves (fully, back-seated) — the factory charge is now in the circuit.
- Add **extra charge by weight** for pipe length beyond the factory specification.

## 8. Commission and verify
| Check | Criterion |
| --- | --- |
| Supply voltage under load | within ±10 % of 230 V |
| Running current | ≤ nameplate |
| Air ΔT (return − supply) | 8–14 K after 15 minutes |
| Suction superheat | within the chart for the indoor WB / outdoor DB |
| Condensate | flowing freely, no leaks |
| Noise and vibration | no rattle, bracket silent |
| All modes | cool, fan speeds, swing, dry, heat (if applicable) tested |
| Remote / app | paired and explained |

## 9. Hand over
Explain and demonstrably show: how to set the temperature (24–26 °C saves energy), filter cleaning every 2 weeks in season, the remote functions, the isolator location, the warranty terms and the service interval.
Give written documentation: **job card, model and serial numbers, refrigerant type and charge weight, pipe length, test pressures, micron reading, current readings, installation date, technician name and signature**, plus a **user manual** and customer-care number. A professional handover is what makes a customer a repeat customer.
`,
      { subtitle: "Correct order, torque, nitrogen, microns, commissioning and handover", drill: ["rac-ins-003", "rac-ins-004"] },
    ),
  ],
};
