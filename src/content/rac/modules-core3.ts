import type { Module } from "../types";
import { lesson } from "../md";

const S = "rac-l2" as const;

export const compressors: Module = {
  id: "rac-compressors",
  subject: S,
  title: "Check & Maintain Compressors",
  code: "OU-LE-RAC-01-L2-V2 · 20 hours",
  hours: 20,
  summary:
    "The heart of the system: how each compressor type works, the eight checks that prove it alive or dead, and how to replace one without contaminating the circuit.",
  icon: "engine",
  lessons: [
    lesson(
      S,
      "rac-compressors",
      "rac-l5-types",
      "Compressor types and what is inside them",
      10,
      ["rac-compressors"],
      `
## What a compressor must do
Take low-pressure vapour from the evaporator, raise its pressure above the condensing pressure, and deliver it as hot high-pressure vapour **without letting oil leave permanently and without letting liquid in**. Everything else is detail.

## The families
| Type | How it compresses | Where you meet it | Notes |
| --- | --- | --- | --- |
| **Reciprocating** | Piston in a cylinder, suction & discharge reed valves | Window AC, older splits, fridges | Simple, robust, vibration, valve plates wear |
| **Rotary (rotary vane)** | Eccentric roller against a spring blade | Small splits, window ACs 0.75–2 TR | Compact, quiet, few parts, sensitive to liquid |
| **Scroll** | Two spiral scrolls, one orbiting | Mid/large splits, chillers | Smooth, efficient, tolerates liquid better, expensive |
| **Screw** | Two meshing rotors | Chillers, industrial | Continuous flow, high capacity |
| **Centrifugal** | High-speed impeller | Large chillers | Very large capacity |

### Sealing arrangement
- **Hermetic** — motor and compressor welded inside one shell. Cannot be repaired in the field; a failure means replacement. Almost all ACs in Bangladesh are hermetic (reciprocating or rotary).
- **Semi-hermetic** — shell bolted, valve plate accessible, can be rebuilt. Found in commercial refrigeration.
- **Open drive** — shaft passes through a seal to an external motor. Belt or coupling drive; older and industrial plant.

## Anatomy of a hermetic reciprocating compressor
- **Shell** — steel can holding suction gas, dampens noise.
- **Stator and rotor** — the single-phase or three-phase motor.
- **Crankshaft** — converts rotation to piston stroke; carries the oil pump.
- **Connecting rod and piston** — with rings.
- **Valve plate** — suction reed and discharge reed, the most common mechanical failure.
- **Cylinder head** — discharge chamber.
- **Terminal** — the sealed electrical pins; a classic leak and short-circuit point.
- **Internal overload protector** — a bimetal in the motor winding, opens on over-temperature/over-current.
- **Oil sump** — mineral oil for R22, POE for R410A/R32.
- **Suction accumulator / muffler** — some models include them.

## Electrical terminals
Hermetic single-phase compressors have three pins: **C** (common), **S** (start), **R** (run).
- The **run winding** (C–R) has lower resistance.
- The **start winding** (C–S) has higher resistance.
- **R–S should equal C–R + C–S**, because the two windings are in series across R and S.

! Typical 1 TR R22 compressor | C–R = 2.1 Ω | C–S = 5.9 Ω | ⇒ expected R–S ≈ 8.0 Ω. A reading of 0 Ω means shorted; infinity means open; any mismatch means a damaged winding.

## The three killers, in order
1. **Liquid slugging** — liquid refrigerant reaching the compressor washes out oil, breaks valves and eventually seizes or shorts the motor. Cause: overcharge, failed metering device, low evaporator load, missing accumulator.
2. **Overheating** — high discharge temperature, dirty condenser, low charge, blocked airflow, wrong refrigerant. Breaks down POE oil into acid and sludge.
3. **Moisture and acid** — a system left open, a poor vacuum, or a burnt winding. Forms **copper plating** on bearings and **sludge** that blocks the capillary.

> Any burnt-out compressor is a **system** failure, not a part failure. If you fit a new compressor without fitting a new filter drier, flushing or replacing the contaminated charge, the new compressor will die the same death.
`,
      { subtitle: "Reciprocating, rotary, scroll — anatomy, terminals and the three killers", drill: ["rac-cmp-001", "rac-cmp-002"] },
    ),
    lesson(
      S,
      "rac-compressors",
      "rac-l5-checks",
      "The eight checks: is this compressor alive?",
      11,
      ["rac-compressors", "rac-electrical"],
      `
## A repeatable diagnostic routine
Do these in order, with the unit **isolated** unless stated. Record every number on the job card.

### 1. Visual and physical
- Oil staining at the terminal, joints, or shell seam → leak.
- Bulging or blown terminal plug → motor shorted.
- Rust, dents, oil in the crankcase sight glass (semi-hermetic).
- Smell: a sharp, acrid, burnt smell means a burnt winding.
- Mounting rubbers perished → vibration and noise.

### 2. Winding resistance (power off, discharged)
Measure C–R, C–S and R–S. Compare to the manufacturer's values or to the pattern R–S = C–R + C–S.
- **Open**: infinite on one winding → no start, hums, trips.
- **Shorted**: near-zero (or 0 Ω) → trips the MCB immediately.
- **Shorted to shell / ground**: this is the dangerous one — check with a megohmmeter.

### 3. Insulation resistance (megohmmeter / megger)
Terminal pin to shell. **Above 1 MΩ is normally acceptable**; a new compressor reads in the hundreds of MΩ. Readings falling toward zero mean moisture in the oil or carbonised winding insulation. **Never megger a compressor that is connected to the PCB** — disconnect first or you will destroy the electronics.

### 4. Capacitor (single-phase)
Set the meter to capacitance, discharge the capacitor first.
- Reading within **±10 %** of the rating = good.
- **0 or open** = no start; the compressor hums and trips on overload.
- **Buldged top, leaking** = replace, always with the **same µF and same or higher voltage rating**.

### 5. Start components
- PTC start relay: continuity cold, high resistance hot.
- Potential (voltage) relay: contacts, coil.
- Current relay: coil continuity.
- CSR compressors also need the start capacitor checked.

### 6. Running current and voltage (live, safely)
Clamp the live conductor and compare to the **nameplate RLA / rated current**.
| Reading | Meaning |
| --- | --- |
| Current well below rated + low suction pressure | Starved (low charge, restriction) |
| Current at or above rated + high head pressure | Blocked condenser, overcharge, hot gas recirculation |
| Current spikes then overload trips | Seized compressor or failing capacitor/motor |
| Zero current with voltage present | Open circuit, open protector, or open winding |

Also measure voltage at the terminals **under load**: a start-up drop below ~10 % of nominal points to a supply/installation problem, not a compressor problem.

### 7. Temperature and pressure behaviour
- Suction and discharge line temperatures.
- Discharge temperature above ~120 °C is a warning; above 130 °C the oil is being destroyed.
- Superheat at the suction: if it is near **0 K**, liquid is coming home.
- Does the compressor reach a stable sound and current within a few seconds, or does it hunt?

### 8. Mechanical symptoms
- **Loud knock** — worn bearings, broken valve, loose mountings.
- **Continuous running, no cooling, low discharge temp** — worn valves (compression ratio lost).
- **Hot shell, normal pressures** — blocked condenser.
- **Very hot shell, low suction** — undercharge.

## Decision table
| Evidence | Verdict |
| --- | --- |
| Open winding, blown terminal, megger near 0 | **Replace compressor** |
| Capacitor 0 µF | **Replace capacitor** (do not condemn the compressor) |
| Tripped MCB only when compressor wired | Isolate compressor, re-test circuit |
| Runs with low current and low suction, no cooling | Starved system — find leak, do not replace |
| Loud knock with normal electrical values | Internal mechanical failure — replace |

>> "The compressor is gone" is a conclusion, never an opening line. Prove it with a megger, a capacitor test and a current reading.

## Replacement procedure (project-type assessment task)
1. **Recover** the refrigerant into a recovery cylinder (never vent).
2. **Isolate and lock off**; discharge capacitors; photograph the wiring.
3. Cut or unbraze the suction and discharge stubs; **never** cut through a live pipe holding residual pressure.
4. Remove and weigh the old compressor; compare with the new one — capacity, refrigerant, oil type, voltage and pin layout must match.
5. Fit a **new filter drier** (mandatory), and flush or replace contaminated components.
6. Braze with **nitrogen purge** flowing; use wet rags/heat paste to protect valves and paint.
7. Replace the **terminal cover, grommets and mounting rubbers**.
8. **Pressure test** with dry nitrogen, hold, then **triple evacuate to 500 microns** and hold.
9. **Charge by weight** per nameplate; verify superheat/subcool; record current draw.
10. Run for at least 20 minutes, check oil level, noise, vibration and all connections; complete the job card, then dispose of the old compressor through proper channels (it contains oil and refrigerant).
`,
      { subtitle: "Winding, megger, capacitor, current — prove it before you replace it", drill: ["rac-cmp-003", "rac-cmp-004"] },
    ),
  ],
};

export const electrical: Module = {
  id: "rac-electrical",
  subject: S,
  title: "Electrical Fundamentals for RAC",
  code: "Underpinning knowledge · all service units",
  hours: 35,
  summary:
    "Ohm's law through to inverter PCBs: read a circuit, measure safely, and diagnose the faults that look like refrigerant problems.",
  icon: "bolt",
  lessons: [
    lesson(
      S,
      "rac-electrical",
      "rac-l6-basics",
      "Voltage, current, resistance and power",
      10,
      ["rac-electrical"],
      `
## The water analogy, then leave it behind
**Voltage (V)** is pressure, **current (I)** is flow, **resistance (R)** is the narrowness of the pipe. Pressure without a circuit does nothing; the same voltage drives more current through less resistance.

## The three equations you will use daily
$ V = I × R         P = V × I         P = I² × R

! A 1.5 TR window AC on 230 V draws 6.5 A | P = 230 × 6.5 | ⇒ 1495 W ≈ 1.5 kW. Energy in one hour = 1.5 kWh (one "unit" on the electricity bill).

### Units
| Quantity | Unit | Symbol |
| --- | --- | --- |
| Voltage | volt | V |
| Current | ampere | A |
| Resistance | ohm | Ω |
| Power | watt | W |
| Energy | kilowatt-hour | kWh |
| Capacitance | microfarad | µF |

## AC vs DC, and why 50 Hz matters
Bangladesh supplies **230 V, 50 Hz single phase** and **400 V, 50 Hz three phase**. In AC the voltage and current reverse direction 50 times a second. Two consequences for you:

- **Inductive loads** (motors) have **power factor** below 1, so \`P = V × I × cos φ\`. A motor drawing 6.5 A may consume less real power than 230 × 6.5 suggests.
- **Capacitors** create a phase shift, which is exactly how a single-phase motor produces starting torque.

## Single-phase motor starting methods
A single-phase motor has no natural rotating field. It needs help:

| Method | How | Used in |
| --- | --- | --- |
| **PSC** (Permanent Split Capacitor) | Run capacitor stays in circuit with the start winding | Most AC compressors and fan motors |
| **CSR** (Capacitor Start / Capacitor Run) | Start capacitor + potential relay, then run capacitor only | Larger compressors, hard-start conditions |
| **RSIR** (Resistance Start) | Start winding high resistance, no capacitor | Small fridges, very old units |

**The run capacitor is the most common single failure in a split AC.** Symptoms: compressor hums and trips the overload, fan turns slowly or not at all, motor hot.

## Three-phase in brief
- No start winding or capacitor — the phases create the rotating field.
- **Phase imbalance** destroys motors: more than about 2 % voltage imbalance causes a large current imbalance.
- **Phase sequence** matters: reverse two phases and a three-phase compressor runs backwards (no compression, noisy, quickly damaged).
- Three-phase units are found in larger ducted and cassette systems, not in a typical 1–2 TR split.

## Earthing (grounding) is not optional
The earth conductor gives fault current a low-resistance path so the MCB trips instead of you becoming the path. Requirements:
- **Separate earth conductor** to a proper earth pit/rod; never use the neutral as earth.
- **Earth continuity** from every metal enclosure to the earth bar.
- Earth resistance low enough to trip protection (commonly under a few ohms — follow the local code and the installation manual).
- Never cut or remove an earth pin to make a plug fit an old socket. That single act kills people.

## Wiring colours you will see
| Function | Common colours in BD |
| --- | --- |
| Phase / live | Red, brown, or yellow |
| Neutral | Black or blue |
| Earth | Green, green-yellow |
| Compressor (outdoor) | Usually black/red/blue at the terminal block |

Colours are a guide, **not a guarantee**. Wiring in the field is often non-standard — always test, never assume.

## Protection devices
- **MCB (miniature circuit breaker)** — overcurrent and short circuit. Sized above the unit's running current and below the cable's capacity. A typical 1–1.5 TR split uses a **16–20 A** MCB on **2.5 mm² copper**.
- **RCD / ELCB** — earth leakage. Trips on a few tens of milliamps to earth. If an RCD trips on an AC, look for moisture in the terminal box or a failing motor winding.
- **Internal overload protector** in the compressor — bimetal, auto-reset. Repeated tripping is a symptom, not a fault.
- **Surge protection** — vital in Bangladesh where voltage fluctuation and lightning are common. A single spike can destroy an inverter PCB costing more than the compressor.
`,
      { subtitle: "Ohm's law, PSC/CSR, earthing, MCB and cable sizing", drill: ["rac-ele-001", "rac-ele-002"] },
    ),
    lesson(
      S,
      "rac-electrical",
      "rac-l6-instruments",
      "Meters: multimeter, clamp meter, megger",
      9,
      ["rac-electrical"],
      `
## The multimeter is your stethoscope
A digital multimeter (DMM) measures **voltage, resistance, continuity, capacitance, diode** and often temperature. Learn the four habits:

1. **Select the function before you touch a probe.**
2. **Select the range** (or use auto-range) so the display is meaningful.
3. **Verify the meter on a known source** — a live socket, a known resistor.
4. **Hands clear of the metal tips**; one hand where possible.

### Measuring voltage
- **AC volts** across the supply: expect ~220–240 V. Below 200 V, the compressor may not start; above 250 V, electronics are at risk.
- **Voltage drop under load** is the real test. Measure at the socket, then at the unit's terminal block while the compressor runs. A drop of more than ~10 % points to undersized cable or a bad connection — a very common cause of "the AC keeps cutting out in summer".

### Measuring resistance (power OFF, capacitor discharged)
Disconnect at least one end of the component, otherwise you read the rest of the circuit in parallel.
- Windings, thermistors, heaters, fuses, relay coils.
- Continuity beep for switches and fuses.

### Measuring capacitance
Discharge through a resistor first. Compare with the printed rating, allow ±10 %, and remember that a capacitor can read fine cold and fail hot.

### The clamp meter
Clamps around **one** conductor and measures current by magnetic field.
- Clamp the **live** wire only. Clamping a cable containing live and neutral reads zero.
- Compare to nameplate current; log it. Rising current over months means a failing compressor or a blocked condenser.
- Use it on the compressor common line, the fan motor line, and the incoming supply.

### The megohmmeter (insulation tester)
Applies 500 V (or 1000 V) to measure insulation resistance in megohms.
- **Motor/compressor winding to earth** — passes above 1 MΩ.
- **Cable insulation** — should be very high.
- **Never** megger into a PCB, VFD or sensor.
- Always isolate, discharge, and prove dead before testing.

## Reading an AC wiring diagram
1. Find the **power source** (L, N, E) and the plug.
2. Trace the **protection**: fuse/MCB, then the main switch.
3. Identify the **loads**: compressor, indoor fan, outdoor fan, PCB, reversing valve (heat pumps), crankcase heater.
4. Identify the **controls** in series with each load: thermostat, overload, pressure switch, relay contact, PCB output relay.
5. Identify the **sensors**: thermistors (NTC), float switch, current transformer.

> A control is always in **series** with the load it controls; a sensor is always an **input** to the board. Draw the line from the thermostat to the load and you have found why the compressor does not start.

## Sensor and thermistor behaviour
- Air and coil thermistors are **NTC**: resistance **falls** as temperature **rises**. An indoor ambient sensor of 10 kΩ at 25 °C will read maybe 6 kΩ at 35 °C.
- A sensor reading **open** or **short** is what makes a board show an error code and stop the compressor.
- Test by measuring resistance and comparing with the service manual table at the measured temperature — not with a "looks about right" guess.
- Thermistor leads are thin and break at the plug; wiggle test while watching the reading.

## Safety with instruments
- Category rating matters: a CAT III meter for panel work.
- Never measure resistance on a live circuit.
- Never exceed the meter's voltage/current rating.
- Keep probes in good condition — cracked insulation on a probe is a shock waiting to happen.
`,
      { subtitle: "Voltage drop, capacitance, clamp current, megger and reading diagrams", drill: ["rac-ele-003", "rac-ele-004"] },
    ),
    lesson(
      S,
      "rac-electrical",
      "rac-l6-inverter",
      "Inverter systems: PCB, IPM and error codes",
      10,
      ["rac-electrical", "rac-split-service"],
      `
## What "inverter" actually means
A conventional (non-inverter) AC runs its compressor at a **fixed speed** — on or off. An inverter AC **rectifies** mains AC to DC, then an **IPM (intelligent power module)** switches it back to a **variable-frequency, variable-voltage** AC to run a **brushless DC (BLDC) compressor** at the speed the load needs.

Result: the compressor runs long and slow instead of short and hard, which is why inverter units achieve much better part-load efficiency and steadier room temperature.

## The inverter outdoor board
| Section | Function | Failure symptom |
| --- | --- | --- |
| Rectifier bridge + smoothing capacitors | AC → DC bus (typically 300–330 V DC after smoothing) | No DC bus, dead unit, blown fuse |
| **Reactor / choke** | Smooths current, reduces harmonics | Over-current trips, loud buzz |
| **IPM** | Switches DC to 3-phase variable frequency for the compressor | Error code, compressor does not start, IPM short |
| Current transformer | Measures compressor current | False over-current protection |
| Communication circuit | Talks to the indoor board over the signal wire | Communication error, indoor runs but outdoor silent |
| EEV driver | Stepper output to the electronic expansion valve | Poor cooling, hunting superheat |
| Outdoor fan drive | BLDC fan control | Fan not running, high pressure trip |
| Sensors | Coil, ambient, discharge pipe temperature | Error code, protection trips |

**Danger:** the DC bus capacitors hold **300 V+ DC** for minutes after power-off. Wait the manufacturer's stated time (often 3–10 minutes), then **measure and confirm the bus is discharged** before touching the board. A "dead" inverter board can kill you.

## Diagnosing by error code — the method, not a list
Codes differ between brands (Gree, Midea, Walton, Singer, Panasonic, Daikin…). You must use the **service manual for the exact model**. The method is always the same:

1. Read the code from the indoor display, the blinking LED on the outdoor board, or the app.
2. Look up the code → it names a **circuit**, not a component. "Discharge temperature too high" does not mean "replace the sensor".
3. Test the circuit from the outside in: sensor resistance → wiring continuity → board output → mechanical component.
4. Clear the fault, reset by power-cycling, then run a full load test and re-check for the code.

### Codes you will see in almost every brand's family
| Family of code | Usually means | First checks |
| --- | --- | --- |
| Communication / E6-type | Indoor↔outdoor signal lost | Signal wire continuity, polarity, board LEDs, moisture in terminal |
| Over-current / high pressure | Compressor overloaded | Condenser airflow, overcharge, voltage, IPM |
| Discharge over-temperature | Not enough cooling of the discharge line | Low charge, blocked condenser, expansion device |
| Coil / ambient sensor fault | Sensor open or shorted | Thermistor resistance vs table, plug seating |
| Fan / motor fault | BLDC fan or its driver | Fan winding, Hall sensor, board output |
| EEV / valve fault | Valve coil open, or stuck | Coil resistance, mechanical click, driver output |

## Practical inverter rules
- **Never** run an inverter compressor on a direct 230 V supply to "test" it.
- **Never** megger the board or the inverter compressor windings while connected.
- Check the **DC bus** before calling a board dead; a blown fuse upstream of the IPM is a cheap diagnosis first.
- Replace the board only after sensors, wiring and the motor have been excluded.
- When a replacement IPM/board is fitted, **apply thermal paste**, torque screws evenly and check the heat sink — most repeat failures are heat-related.
- Record the error code and the ambient/electrical conditions in the job card; intermittent inverter faults are usually voltage or thermal.

## Why inverter units fail more in Bangladesh
Voltage fluctuation, spikes from load-shedding return, lightning, dust blocking the outdoor heat sink, and installation in a hot enclosed balcony. A **voltage stabiliser or surge protector** and clean airflow prevent most of them.
`,
      { subtitle: "IPM, DC bus safety, error-code method, board replacement discipline", drill: ["rac-ele-005", "rac-ele-006"] },
    ),
  ],
};
