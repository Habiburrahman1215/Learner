import type { Module } from "../types";
import { lesson } from "../md";

const S = "rac-l2" as const;

export const components: Module = {
  id: "rac-components",
  subject: S,
  title: "System Components & Controls",
  code: "Underpinning knowledge · OU-LE-RAC-02/03",
  hours: 25,
  summary:
    "Every part between the compressor and the room: coils, metering devices, driers, valves, fans and the controls that sequence them.",
  icon: "parts",
  lessons: [
    lesson(
      S,
      "rac-components",
      "rac-l7-coils",
      "Evaporators and condensers",
      10,
      ["rac-components"],
      `
## Two coils, opposite jobs
| | Evaporator (indoor) | Condenser (outdoor) |
| --- | --- | --- |
| Job | Absorb heat from room air | Reject heat to outside air |
| Refrigerant state | Liquid → vapour | Vapour → liquid |
| Pressure | Low | High |
| Temperature | Cold (below room) | Hot (above ambient) |
| Air | Room air blown **across** fins | Outdoor air blown **across** fins |
| Typical construction | Copper tubes + aluminium fins | Copper tubes + aluminium fins |

Both are **finned-tube heat exchangers**: copper carries the refrigerant, aluminium fins increase air-side surface area. The fin-to-tube bond is the thermal bottleneck — a corroded or dirty joint is a permanent efficiency loss.

## Fin arrangements
- **Plate fin** — flat fins, most common, cheapest. Easy to clog.
- **Louvred fin** — slit fins, better heat transfer.
- **Hydrophilic (blue) fin** — water sheds instead of beading, resists mould and corrosion. Important in humid climates.
- **Spine fin** — aluminium, used in some window units.
- Fins per inch (FPI): more fins = more surface but faster clogging. 12–20 FPI typical for AC.

## Why coils fail in the field
| Symptom | Cause | Fix |
| --- | --- | --- |
| Ice on the indoor coil | Low airflow, low charge, restricted capillary | Restore airflow first, then check charge |
| Ice on the outdoor unit in cooling | Blocked condenser, fan failure | Clean, test fan |
| Water dripping inside | Blocked drain / dirty pan | Clean the drain and pan |
| Poor cooling, normal pressures | Dirty fins, poor airflow | Chemical clean |
| Pinhole leak | Formicary corrosion, vibration, galvanic attack | Cut out and repair, or replace the coil |
| Frost pattern only in one circuit | Partial blockage | Locate and repair |

## Cleaning without destroying
1. **Isolate power.** Remove the filter first.
2. **Dry-clean** loose dust with a soft brush **along** the fins, never across them.
3. Apply a **coil cleaner** compatible with aluminium; follow the dilution and dwell time, and never let it dry on the coil.
4. **Rinse** from the clean side outward where possible, low pressure — high pressure bends fins.
5. Straighten bent fins with a **fin comb**.
6. Clean the **drain pan and drain line**, flush with water, check the slope.
7. Clean the **blower wheel** — a dirty blower kills airflow more than a dirty coil.
8. Refit, run, and check that the coil sweats evenly. **Uneven sweating = uneven refrigerant distribution.**

## Airflow numbers that matter
- Indoor airflow typically **350–450 m³/h per TR** (roughly 200–250 cfm per TR).
- Static pressure drop across a clean coil is small; a blocked coil can triple it.
- A **dirty filter** is the number-one cause of "not cooling" complaints worldwide and it costs nothing to fix.

## Condenser specifics
- Air-cooled condensers reject both the room heat **and** the compressor work — roughly 1.25× the cooling capacity.
- **Recirculation** (hot air bouncing back into the condenser) is epidemic in Bangladesh where outdoor units are crammed into balconies. It raises head pressure, current and failures.
- Minimum clearances: typically **30 cm front, 10–15 cm sides/back**, and never enclosed on all four sides.
- In monsoon, ensure the outdoor unit is not standing in water and the electrical box seals are intact.
`,
      { subtitle: "Fin types, coil failures, cleaning discipline and airflow rules", drill: ["rac-com-001"] },
    ),
    lesson(
      S,
      "rac-components",
      "rac-l7-metering",
      "Metering devices: capillary, TEV, EEV",
      10,
      ["rac-components"],
      `
## The metering device does two things
1. **Drops pressure** from condensing to evaporating pressure.
2. **Controls how much liquid** enters the evaporator, so the coil is fully used but no liquid returns to the compressor.

## Capillary tube
A long, small-bore copper tube (typically 0.031"–0.064" ID) acting as a fixed restriction.
- **Cheap, no moving parts, no adjustment.** Used in window ACs, small splits and fridges.
- Flow depends on pressure difference, so charge quantity is **critical** — a capillary system is charged by weight/superheat and has no reserve.
- **Restriction** (blocked with wax, sludge or ice) shows as: very low suction pressure, high superheat, little or no cooling, and a **frost line or temperature drop at the capillary outlet**.
- **Never** try to "adjust" a capillary. If it is blocked, the circuit must be flushed and the drier replaced.

## Thermostatic expansion valve (TEV / TXV)
A modulating valve with a **sensing bulb** clamped to the suction line.
- The bulb pressure pushes the valve **open**; evaporator pressure and the spring push it **closed**. It maintains a **constant superheat (typically 5–8 K)**.
- External equaliser versions compensate for evaporator pressure drop.
- **Bulb problems**: lost charge (valve closes, no cooling), detached bulb (valve hunts), bulb on the wrong pipe.
- **Stuck open** → flooding, low superheat, liquid returning, frosted suction line.
- **Stuck closed** → no flow, very low suction pressure, high superheat.

## Electronic expansion valve (EEV)
A **stepper-motor valve** driven by the PCB, used in inverter units.
- Continuously optimises superheat at part load, which is why inverter ACs are efficient.
- Failure modes: **coil open/shorted**, **stuck (wax or debris)**, **driver failure on the board**.
- Test: measure the coil winding resistance (typically tens to a couple of hundred ohms per phase), listen for the click/whoosh on power-up, and check the board output. Never force the valve by hand.
- Unlike a TEV, an EEV has **no fixed superheat setting** — the board maps it against load, ambient and discharge temperature.

## Other flow devices
| Device | Function |
| --- | --- |
| **Filter drier** | Removes moisture and particles; always replaced after any open-circuit repair or burnout |
| **Accumulator** | Traps liquid before the compressor (heat pumps, some splits) |
| **Muffler** | Reduces discharge pulsation noise |
| **Solenoid valve** | On/off control of liquid line (pump-down systems) |
| **Check valve** | One-way flow (heat pumps, multi-splits) |
| **Strainer** | Coarse protection upstream of valves |
| **Sight glass** | Shows bubbles (undercharge/flash gas) and moisture indicator colour |

## Reading a moisture indicator
- **Green** = dry, **Yellow** = moisture present → replace the drier, evacuate again.
- Bubbles in a sight glass mean **flash gas** — usually undercharge, sometimes a restriction.

> On a capillary system the charge *is* the design. Adding gas to fix a restriction is the most common expensive mistake in the trade.
`,
      { subtitle: "Capillary vs TEV vs EEV — how each fails and how to prove it", drill: ["rac-com-002", "rac-com-003"] },
    ),
    lesson(
      S,
      "rac-components",
      "rac-l7-controls",
      "Controls, thermostats, fans and defrost",
      9,
      ["rac-components", "rac-electrical"],
      `
## The control chain of a split AC
**Remote/app → indoor PCB → (thermistors + communication) → outdoor PCB → compressor, EEV, fans.**

Every "no cooling" diagnosis walks that chain in order: command, sensor input, communication, output.

## Thermostat / setpoint control
- **Electromechanical** — a bimetal switch, with an anticipator; older window units.
- **Electronic** — the PCB compares the **room thermistor** with the setpoint, then decides compressor on/off (non-inverter) or frequency (inverter).
- Hysteresis: a non-inverter unit waits for the room to drift ~1–2 K above setpoint before restarting, which is why the temperature feels uneven. Inverters avoid this by slowing down instead of stopping.
- A thermostat that never satisfies the room: undersized unit, dirty coil, low charge, door open, or a **thermistor reading wrong** (a sensor touching the coil reads colder than the room and stops the unit early).

## Fan motors
| Type | Speed control | Notes |
| --- | --- | --- |
| **PSC** (permanent split capacitor) | Fixed taps (high/med/low) or none | Needs the run capacitor; most common in window and non-inverter splits |
| **BLDC** (brushless DC) | Variable via the board | Inverter units, efficient, controlled by PWM |

Symptoms: fan runs only on one speed → capacitor or tap; fan does not start but hums → capacitor or seized bearing; fan runs slowly → capacitor weak, bearing dry, or low voltage.

## Protection switches
- **High-pressure switch** — opens on excessive head pressure (blocked condenser, overcharge, recirculation, fan failure).
- **Low-pressure switch** — opens on loss of charge or a restriction (mostly commercial).
- **Discharge temperature protection** — a thermistor on the discharge line, acted on by the board.
- **Float switch** (drain) — stops the unit when condensate backs up, preventing water damage.
- **Internal compressor overload** — bimetal inside the shell; auto-resets after cooling.

## Defrost
Cooling-only ACs do not defrost. But:
- A **heat pump** must periodically melt frost off the outdoor coil. Methods: reverse-cycle defrost (four-way valve), hot gas bypass, or time/temperature initiated control.
- Defrost is initiated by **coil temperature + time + sometimes pressure**, terminated by coil temperature or a maximum time.
- **Reverse-cycle valve (4-way valve)** — solenoid shifts the flow so the roles of the two coils swap; cooling ↔ heating. Failure: stuck in one mode, or noisy and not shifting (coil open, low pilot pressure).
- A cooling-only unit icing up is **not** a defrost problem — it is an airflow or charge problem.

## Drainage
Water management is a genuine competency, not a detail:
- Indoor unit must be level or tilted **very slightly toward the drain** — and level in the other axis.
- Drain hose falls **continuously**; no uphill loops, no kinks, no shared drain with a sink trap unless designed for it.
- Trap/loop and seal for ducted units to stop air being drawn in.
- Insulate the drain inside humid spaces to stop sweating.
- Test before you leave: pour water into the pan and watch it leave.

## Remote, display and app control
Modern units carry an IR receiver, a display board, sometimes Wi-Fi. Faults: no response to remote → check batteries, IR receiver, or the "child lock"/reset. Wi-Fi pairing failures are almost always 2.4 GHz/5 GHz mismatch or the router's isolation setting.
`,
      { subtitle: "Control chain, fan motors, protection switches, defrost and drains", drill: ["rac-com-004"] },
    ),
  ],
};

export const tubing: Module = {
  id: "rac-tubing",
  subject: S,
  title: "Tubing, Brazing, Testing & Charging",
  code: "Underpinning knowledge · OU-LE-RAC-03/04",
  hours: 35,
  summary:
    "The hands-on core: cut, bend, flare, braze, pressure-test, evacuate to 500 microns and charge by weight — clean and leak-free every time.",
  icon: "torch",
  lessons: [
    lesson(
      S,
      "rac-tubing",
      "rac-l8-tube",
      "Cutting, bending, flaring and joining copper",
      11,
      ["rac-tubing"],
      `
## Copper tube in the trade
| Size (inch) | Typical use |
| --- | --- |
| 1/4" | Capillary/liquid lines, small splits, gauges |
| 3/8" | Liquid line on 1–2 TR splits |
| 1/2" | Suction line on small splits |
| 5/8" | Suction line on 1.5–2.5 TR |
| 3/4"–7/8" | Larger splits, cassette, ducted |

Use **ACR (refrigeration) grade copper** — cleaned, capped, oxygen-free. **Plumbing copper** may contain residual carbon and is capped differently; never use it for refrigerant lines. Keep coils **capped until the moment of use**; an open tube is a moisture and dust trap.

## Cutting
1. Use a **tube cutter** with the wheel square to the tube.
2. Tighten the knob **a quarter turn per revolution** — over-tightening work-hardens the copper and creates a burr.
3. Cut slowly; a fast cut leaves metal shavings inside.
4. **Deburr** with the reamer/deburring tool supplied with the cutter. A burr reduces flow, holds debris, and prevents a good flare.
5. Blow through with **dry nitrogen** — never with your mouth (moisture) and never with compressed shop air (moisture and oil).

## Bending
- **Spring benders** (inside or outside), **lever benders**, or careful hand bending with an adequate radius.
- Minimum bend radius ≈ **3× tube diameter**; tighter kinks the tube and restricts flow.
- Annealed (soft) copper bends; hard-drawn does not — temper is everything.
- A kink is a **restriction**, which mimics undercharge. If you kink a line, cut it out and rejoin; do not "straighten" it.

## Flaring
A 45° flare is the standard mechanical joint for split AC connections.
1. Cut square and deburr.
2. Slip the **flare nut on first** (the classic mistake is to forget it).
3. Set the tube in the flaring block to the correct height above the block face (per the tool's gauge).
4. Turn the cone down firmly, not violently.
5. Inspect: a good flare is **even, smooth, uncracked, and the correct diameter** — it should seat on the cone, not bottom out.

### Flare torque (typical, kgf·cm)
| Tube | Torque |
| --- | --- |
| 1/4" (6.35 mm) | 120–140 |
| 3/8" (9.52 mm) | 330–390 |
| 1/2" (12.7 mm) | 510–620 |
| 5/8" (15.88 mm) | 650–780 |

Under-torque leaks; over-torque cracks the flare or splits the nut. Use a **torque wrench** for the final turn and always apply a little refrigerant oil to the flare face.

## Swaging and Lokring
- **Swaging** expands one tube end so another slides inside for a brazed joint — no coupling needed.
- **Lokring** is a **press-fit mechanical joint** (no flame). Important for R290 and for locations where brazing is not permitted. It requires the correct tool and the correct ring; a bad press is a guaranteed leak.

## Brazing
| Joint | Filler | Flux |
| --- | --- | --- |
| Copper ↔ copper | Phosphor-copper (Cu-P) rod, 2–3 mm | **No flux needed** |
| Copper ↔ brass | Phosphor-copper with silver, or silver solder | Flux required |
| Copper ↔ steel | Silver solder (Ag%) | **Flux required** |

Rules that separate a professional joint from a leak:
1. **Flow dry nitrogen** through the tube while brazing. Without it, copper oxide scale forms inside and later blocks the capillary and destroys the compressor.
2. Clean both surfaces; a bright, oil-free fit.
3. Heat **the joint, not the rod**; the tube must melt the filler by conduction.
4. Use a **neutral flame** (soft blue, well-defined cone). Oxidising flame overheats; carburising flame adds carbon.
5. Keep the flame moving; do not overheat (copper goes black and anneals).
6. Let it cool naturally. **Never quench with water** — it cracks the joint.
7. Protect valves, paint, insulation and nearby components with **wet rags or heat paste**.
8. Inspect: a good joint is a smooth fillet with full penetration, no lumps, no pin holes.

> Flowing nitrogen is not optional for V2-accredited work. It is the single cheapest habit that prevents repeat compressor failures.
`,
      { subtitle: "Cut, deburr, bend, flare to torque, braze with nitrogen", drill: ["rac-tub-001", "rac-tub-002"] },
    ),
    lesson(
      S,
      "rac-tubing",
      "rac-l8-test-evac",
      "Leak testing, evacuation and dehydration",
      12,
      ["rac-tubing"],
      `
## Never skip testing
A small leak means a repeat visit, a lost customer and a system poisoned by moisture. Test **every** circuit before charging.

## Method 1 — Nitrogen pressure test (the standard)
1. Connect dry nitrogen through a **two-stage regulator** to the service port.
2. Pressurise to the manufacturer's test pressure — commonly **~500 psig for R410A/R32**, **~150–250 psig for R22**. Never exceed the low-side component rating; isolate the compressor if needed.
3. **Hold for at least 10–15 minutes** with the system valved off, watching the gauge for a drop. Best practice includes a temperature-compensated reading: 1 K of temperature rise moves the gauge noticeably, so note ambient.
4. A drop → leak. Find it.

**Never** pressure test with oxygen (explosion with oil), with acetylene, or with refrigerant "because it is handy".

## Method 2 — Soap bubble / leak detector solution
Apply to every joint, flare, valve stem, brazed joint and the schrader cores. Bubbles that grow = leak. Cheap, reliable, and works in a dusty workshop. A commercial **electronic leak detector** is faster on inaccessible joints; use one rated for the refrigerant (**ATEX rated for A2L/A3** gases).

## Method 3 — Vacuum leak test
Pull a vacuum and **valve off the pump**. If the micron gauge rises quickly, there is a leak (or moisture). If it holds, the circuit is tight. This is the test that catches what nitrogen misses on a small joint.

## Method 4 — Refrigerant trace (last resort)
A small charge of refrigerant plus a detector. Avoid: it puts moisture-carrying gas into a system you have not yet dried, and it is illegal to vent.

## Evacuation — why 500 microns
Evacuation removes **air and moisture**. Moisture in a system causes:
- **ice blockage** at the metering device,
- **acid and sludge** with POE oil,
- **copper plating** on bearings,
- **corroded windings**.

| Reading | Meaning |
| --- | --- |
| 29 inHg on a gauge | Roughly 25,000 microns — nowhere near dry |
| 1000 microns | Still too wet for POE systems |
| **500 microns and holding** | The accepted target |
| Below 300 microns | Excellent |

**A standard manifold gauge is useless for this** — its vacuum scale is far too coarse. Use a **micron (electronic vacuum) gauge** directly on the system.

### Triple evacuation (the professional method)
1. Evacuate to **500 microns**.
2. Break the vacuum with **dry nitrogen** to 0 psig (this absorbs moisture into the nitrogen).
3. Evacuate again to 500 microns.
4. Break again with nitrogen.
5. Final evacuation to **500 microns**, then **valve off and hold for 10–15 minutes**. A rise above ~800 microns means moisture or a leak — repeat.

### Evacuation practicalities
- Use **large-bore, short hoses** and remove valve cores with a **core remover** — a schrader core can halve your pumping speed.
- Two-stage vacuum pump, fresh oil, correct oil level. Milky oil = moisture; change it.
- Never use the compressor as a vacuum pump.
- Evacuate **both** high and low sides where service ports allow.
- Start the pump with the system gas-free; never pull a vacuum with liquid refrigerant present.

> Time is not a measure of dryness. **Microns are.** "I ran the pump for an hour" is not evidence; a micron gauge holding 500 is.

## After evacuation — charge
**Charge by weight** with a scale, through the liquid side or as liquid into a throttled suction, using the nameplate charge plus any extra for long pipe runs. Never guess.

### Verification
| Check | Target |
| --- | --- |
| Suction superheat | 5–12 K (fixed orifice), 5–8 K (TXV/EEV) |
| Liquid subcooling | 5–12 K (TXV/EEV charge check) |
| Compressor current | At or below nameplate |
| Discharge temperature | Below ~110–120 °C |
| Room-to-supply air ΔT (indoor) | 8–14 K after 15 minutes |
| Condensate | Flowing steadily at the drain |
| Leak check after charging | All joints and service ports |
`,
      { subtitle: "N2 test, soap, micron gauge, triple evacuation, charge by weight", drill: ["rac-tub-003", "rac-tub-004"] },
    ),
  ],
};
