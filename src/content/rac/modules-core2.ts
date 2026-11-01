import type { Module } from "../types";
import { lesson } from "../md";

const S = "rac-l2" as const;

export const thermo: Module = {
  id: "rac-thermo",
  subject: S,
  title: "Refrigeration Fundamentals",
  code: "Underpinning knowledge for all occupation units",
  hours: 40,
  summary:
    "Heat, pressure, saturation and the four-component vapour-compression cycle — the physics that explains every fault you will ever chase.",
  icon: "thermo",
  lessons: [
    lesson(
      S,
      "rac-thermo",
      "rac-l3-heat",
      "Heat, temperature and the three ways heat moves",
      10,
      ["rac-thermo"],
      `
## Refrigeration is not "making cold"
There is no such thing as cold — there is only **less heat**. A refrigerator does not add cold; it **removes heat** from one place and **rejects** it to another. Everything you do as a technician is moving heat uphill.

## Heat vs temperature
- **Heat** is energy in transit, measured in **joules (J)**, **kilojoules (kJ)**, **kilocalories (kcal)** or **BTU**.
- **Temperature** is the *intensity* of that energy — how fast molecules move — measured in **°C**, **°F** or **K**.
- A bathtub at 40 °C holds far more heat than a cup of water at 90 °C. Temperature alone does not tell you the quantity.

### Conversions you must do in your head
| From | To | Formula |
| --- | --- | --- |
| °C | °F | °F = (°C × 9/5) + 32 |
| °F | °C | °C = (°F − 32) × 5/9 |
| °C | K | K = °C + 273.15 |
| K | °C | °C = K − 273.15 |
| bar | psig | psig ≈ (bar × 14.5) − 14.7 |
| kW | BTU/h | BTU/h = kW × 3412 |
| TR | BTU/h | 1 TR = 12,000 BTU/h |
| TR | kW | 1 TR = 3.517 kW |

! Convert 4.5 bar gauge to psig | 4.5 bar absolute × 14.5 = 65.3 psi absolute | subtract 14.7 for gauge | ⇒ about 51 psig

## Sensible heat
Heat that **changes temperature but not state**. Ice at −10 °C becoming ice at 0 °C is all sensible heat.

$ Q = m × c × ΔT

- Q = heat (kJ), m = mass (kg), c = specific heat (kJ/kg·K), ΔT = temperature change (K)
- Water: c ≈ 4.18 kJ/kg·K — very high, which is why water is such a good cooling medium
- Air: c ≈ 1.005 kJ/kg·K
- Copper: c ≈ 0.385 kJ/kg·K

! Heat 2 kg of water from 20 °C to 60 °C | ΔT = 40 K, c = 4.18 | Q = 2 × 4.18 × 40 | ⇒ 334.4 kJ

## Latent heat
Heat that **changes state without changing temperature** — the hidden heat. This is the heart of refrigeration.

| Change | Latent heat (water) |
| --- | --- |
| Melting / freezing (ice ↔ water) | 334 kJ/kg |
| Boiling / condensing (water ↔ steam) | 2257 kJ/kg at 100 °C |

**Latent heat of vaporisation is why a refrigerant works.** In the evaporator the refrigerant boils at a low pressure; it absorbs a large amount of latent heat from the room air without its own temperature rising much. In the condenser it gives that same latent heat back.

> A pressure gauge is really a thermometer: if the refrigerant is boiling or condensing, pressure tells you the temperature. That single idea explains superheat, subcooling and every charge check.

## The three modes of heat transfer
1. **Conduction** — through a solid. Heat through the copper tube wall and the fin-to-tube joint. Poor contact = poor performance. Fouling (oil, dust, scale) is a conductor problem.
2. **Convection** — through a moving fluid. Air over the coil, water through a chiller. This is why **airflow** is the first thing you check: a blocked filter destroys convection and nothing else can fix it.
3. **Radiation** — line-of-sight electromagnetic heat. Sun on a rooftop unit, hot refrigerant lines radiating into a wall cavity. Reflective insulation and shading reduce it.

## The three ways heat enters a room (the cooling load)
- **Conduction through the envelope** — walls, roof, glazing. Hotter outside, hotter inside.
- **Infiltration** — outside air leaking in through doors, gaps, exhaust fans.
- **Internal gains** — people (~100 W each), lights, computers, cooking, and above all **solar gain** through glass.

Sizing an air-conditioner means adding these up, then adding a safety margin. Undersizing means the unit runs continuously and never satisfies; oversizing means it satisfies too fast, short-cycles, never dehumidifies, and wears out. **Correct sizing beats a bigger machine every time.**

## Temperature difference drives everything
The bigger the difference between the room and the outside, the harder the machine works and the lower its capacity and efficiency. A split AC rated 1 TR at 35 °C outdoor ambient delivers noticeably less at 46 °C — which is a Dhaka summer afternoon. That is why the nameplate capacity is a *rating condition*, not a promise.
`,
      { subtitle: "Sensible vs latent heat, BTU/TR/kW, conduction-convection-radiation", drill: ["rac-thm-001", "rac-thm-002"] },
    ),
    lesson(
      S,
      "rac-thermo",
      "rac-l3-cycle",
      "The vapour-compression cycle in four components",
      12,
      ["rac-thermo"],
      `
## Four components, one loop
| Component | Job | State in | State out |
| --- | --- | --- | --- |
| **Compressor** | Raise pressure (creates the temperature lift) | Low-pressure vapour | High-pressure hot vapour |
| **Condenser** | Reject heat to outside air | High-pressure hot vapour | High-pressure liquid |
| **Expansion device** (capillary / TEV / EEV) | Drop pressure, control flow | High-pressure liquid | Low-pressure cold mixture |
| **Evaporator** | Absorb heat from the room | Low-pressure mixture | Low-pressure vapour (slightly superheated) |

The compressor is the **only** component that consumes significant power; the other three are heat exchangers and a restriction.

## Walking the loop like a technician
Start at the compressor suction and follow the refrigerant:

1. **Suction line** — cold, sweating, low pressure. This is the line you insulate and the line you measure superheat on.
2. **Compressor** — squeezes vapour, dramatically raising its temperature ("superheated discharge", often 60–90 °C).
3. **Discharge line** — hot, high pressure; often too hot to touch.
4. **Condenser** — fan blows outdoor air across it. Desuperheating → condensing → subcooling. Leaves as liquid, still at high pressure.
5. **Filter drier** — removes moisture and particles; the last protection before the metering device.
6. **Expansion device** — pressure crashes to evaporating pressure; a small part flashes to gas, chilling the rest to evaporating temperature.
7. **Evaporator** — the cold mixture boils, absorbing room heat; it leaves as vapour with a few degrees of superheat.
8. **Accumulator** (some systems) — traps any liquid so it cannot reach the compressor.
9. Back to the compressor.

## Saturation, superheat and subcool — the three numbers that diagnose everything
- **Saturation temperature** — the temperature at which a refrigerant boils or condenses at a given pressure. Read it from a **P-T chart** or the manifold gauge's temperature scale.
- **Superheat (SH)** = suction line temperature − saturated evaporating temperature. It proves the evaporator is fully flooded with liquid but not flooding liquid back to the compressor. Typical target at the outdoor unit: **5–12 K** (about 10–20 °F).
- **Subcooling (SC)** = saturated condensing temperature − liquid line temperature. It proves the condenser is holding a liquid seal at the metering device. Typical target: **5–12 K**.

! Subcooling check | Suction low-side pressure 70 psig, R22 → saturation ≈ 5 °C | Liquid line temperature measured 38 °C | Condensing pressure 236 psig, R22 → saturation ≈ 45 °C | ⇒ SC = 45 − 38 = 7 K — healthy

### What the numbers tell you
| Symptom | Likely meaning |
| --- | --- |
| Low superheat + sweating suction to compressor | Overcharge, or TEV stuck open → risk of liquid slugging |
| High superheat + low suction pressure | Undercharge, restriction, or starving evaporator |
| Low subcooling + bubbles in sight glass | Undercharge (if no restriction) |
| High subcooling + high discharge pressure | Overcharge or condenser airflow blocked |
| Superheat and subcool both low, suction pressure low | Restriction (blocked filter drier / kinked line) |

## Pressure–enthalpy: why COP is what it is
- **Cooling effect** = enthalpy of vapour leaving evaporator − enthalpy of liquid entering it (kJ/kg).
- **Work of compression** = enthalpy out of compressor − enthalpy in (kJ/kg).
- **COP** = cooling effect ÷ work input. A domestic AC typically has COP 2.5–3.5; an inverter with a good part-load ratio can beat 4.

$ COP = Q_cooling / W_input  ·  EER = BTU/h ÷ W  ·  1 kW = 3412 BTU/h

! A 1 TR (12,000 BTU/h) unit draws 1.1 kW | COP = 3.517 kW ÷ 1.1 kW | ⇒ ≈ 3.2 ; EER = 12,000 ÷ 1100 ≈ 10.9 BTU/Wh

## Subcooling and superheat are *measurements*, not settings
You cannot read them from a gauge alone. You need:
1. Pressures from a manifold on the service ports, converted to saturation temperature.
2. **Actual line temperatures** from a clamp-on thermocouple or contact thermometer, taken on clean bare pipe and insulated from ambient.

Two numbers per line. Anything less is a guess.

>> Order of diagnosis, always: **airflow → electrical → refrigerant**. A dirty filter is not a gas problem, and adding gas to a dirty machine guarantees a callback.
`,
      { subtitle: "Four components, superheat & subcool, COP — with worked numbers", drill: ["rac-thm-003", "rac-thm-004"] },
    ),
    lesson(
      S,
      "rac-thermo",
      "rac-l3-psychro",
      "Air, humidity and comfort (sensible heat ratio)",
      8,
      ["rac-thermo"],
      `
## An air-conditioner does four jobs
1. **Cool** — remove sensible heat (temperature falls).
2. **Dehumidify** — remove latent heat (water vapour condenses on the cold coil).
3. **Filter** — trap dust so the coil stays clean.
4. **Circulate** — move air so the room is evenly mixed.

Most "my AC doesn't cool" complaints are really humidity or airflow complaints.

## The numbers of comfort
| Parameter | Comfortable range | Notes |
| --- | --- | --- |
| Dry-bulb temperature | 23–26 °C | 24 °C is the usual design point |
| Relative humidity | 40–60 % | Above 65 % feels clammy at any temperature |
| Air velocity | 0.15–0.5 m/s | Higher feels cooler (wind-chill effect) |
| Fresh air | ~10 L/s per person | Sealed rooms get stale and CO₂ rises |

**Dry-bulb (DB)** = ordinary thermometer reading. **Wet-bulb (WB)** = lowest temperature reachable by evaporating water into the air — it measures how much moisture the air can still take. **Relative humidity** = actual vapour ÷ capacity at that temperature.

## Sensible Heat Ratio (SHR)
$ SHR = sensible heat removed ÷ total heat removed

- SHR near **1.0** → almost all cooling, very little dehumidification → the coil is too warm, airflow too high, or the room is already dry.
- SHR around **0.7–0.8** → normal comfort cooling in a humid climate like Bangladesh.
- Low SHR (lots of latent load) → more condensate, more drain water, and the need for a correctly sloped drain.

This explains a classic complaint: an **oversized** unit in a humid room cools the air to setpoint in five minutes, then stops. It never runs long enough to condense the moisture, so the room stays at 24 °C and 75 % RH — cold and sticky. A smaller unit running longer is genuinely more comfortable.

## Condensate is not a fault
The water dripping from an indoor unit is the dehumidification working. It only becomes a fault when it appears in the wrong place:
- **Water inside the room** → blocked drain, blocked drain pan, missing slope, or a frozen coil melting.
- **No water at all in a humid room** → the coil is not cold enough (low charge, low airflow *over* the coil, or the compressor is not running).

## Airflow before refrigerant — always
| Check | Effect if wrong |
| --- | --- |
| Filter blocked | Low airflow → coil freezes → no cooling, low suction pressure (mimics low charge) |
| Evaporator fins blocked | Same, plus high superheat confusion |
| Blower dirty or slow | Low airflow, ice, weak throw |
| Duct leaking or crushed | Room never satisfies; unit runs forever |
| Condenser blocked | High discharge pressure, high current, compressor trips on overload |
| Recirculation at the outdoor unit | Hot air re-enters the condenser → capacity collapse, overload trips |
`,
      { subtitle: "DB/WB, RH, SHR and why airflow comes before gas", drill: ["rac-thm-005"] },
    ),
  ],
};

export const refrigerants: Module = {
  id: "rac-refrigerants",
  subject: S,
  title: "Refrigerants & Pressure–Temperature",
  code: "Underpinning knowledge · OU-LE-RAC-01/02/03",
  hours: 30,
  summary:
    "Identify, handle, charge and retrofit the six refrigerants you will meet in Bangladesh — and read the P-T chart like a native.",
  icon: "gas",
  lessons: [
    lesson(
      S,
      "rac-refrigerants",
      "rac-l4-types",
      "The six refrigerants you will actually meet",
      10,
      ["rac-refrigerants"],
      `
## Families
- **CFC** (R12) — banned, ozone-destroying. You will still find it in 30-year-old fridges. Recover, do not vent.
- **HCFC** (R22) — being phased out. Still the most common gas in older window and split units in Bangladesh.
- **HFC** (R410A, R32, R134a, R404A) — no ozone damage but high GWP; being phased down under Kigali.
- **HFO / natural** (R1234yf, R290, R600a, R744/CO₂, R717/ammonia) — the future: very low GWP.

## Identification card
| | R22 | R410A | R32 | R134a | R290 | R600a |
| --- | --- | --- | --- | --- | --- | --- |
| Family | HCFC | HFC blend | HFC | HFC | HC | HC |
| ODP | 0.055 | 0 | 0 | 0 | 0 | 0 |
| GWP | 1810 | 2088 | 675 | 1430 | 3 | 3 |
| Safety class | A1 | A1 | A2L | A1 | A3 | A3 |
| Glide | none | ~0.1 K | none | none | none | none |
| Typical use | Old AC | Non-inverter split | Modern inverter split | Fridge/chiller/car | Small AC/heat pump | Fridge |
| Relative capacity | baseline | ~1.4× R22 | ~1.5× R22 | lower | lower | low |

### Why R410A and R32 need different tools
They run at **1.5–1.6× the pressure of R22** for the same temperature. Consequences:
- **Manifold gauges must be rated for R410A** (typically to 550–800 psi). Using R22 gauges is dangerous and inaccurate.
- **Hoses** are rated higher and have different fittings (1/4" SAE on both, but higher burst rating).
- **Copper wall thickness** is greater; you cannot reuse R22 tubing on R410A unless it meets the specification.
- **Never use mineral oil** — R410A and R32 use **POE (polyolester)** oil, which is highly hygroscopic. Leave POE open to air and it absorbs moisture in minutes; moisture + POE + heat = acid + sludge.
- **Charge by weight**, never as a vapour top-up on a blend.

### Blend behaviour: glide and fractionation
- **R410A** is a 50/50 near-azeotrope of R32 and R125, with a very small temperature glide (~0.1 K), so you can treat it as a single fluid for most field work.
- **R407C** is zeotropic with a real glide of ~5–7 K: its components boil at different temperatures. **Never leak-charge a zeotropic blend as a vapour** — the components leave the cylinder in different proportions and the remaining gas is the wrong mixture. **Always charge liquid** into the liquid line.
- When the P-T chart gives a bubble and dew point for a zeotropic blend, use the **dew point for superheat** and the **bubble point for subcooling**.

### PT chart technique
1. Read the low-side gauge → convert psig to the saturation temperature using the column for **your** refrigerant.
2. Clamp the thermometer 15–20 cm from the compressor on a clean, straight section of the suction line.
3. Insulate the probe against room air.
4. SH = line temp − sat temp.
5. Repeat on the liquid line with the high side for SC.

> If you use the wrong refrigerant column, a perfectly healthy machine looks broken. Check the nameplate before you open the chart.

## What you must never do
- Mix refrigerants in a cylinder.
- Top up with a "similar" gas because the right one is not available.
- Use R22 gauges on R410A.
- Vent to atmosphere.
- Charge liquid into a running compressor suction (liquid slugging destroys valves).
- Assume a cylinder is what its paint says — read the **stamp and label**.
`,
      { subtitle: "R22 vs R410A vs R32 vs R290 — properties, oils, glide, tools", drill: ["rac-ref-001", "rac-ref-002"] },
    ),
    lesson(
      S,
      "rac-refrigerants",
      "rac-l4-pt",
      "Reading pressure–temperature like a technician",
      9,
      ["rac-refrigerants"],
      `
## The single most useful table in the trade
At saturation, pressure and temperature are locked together. A few anchor points:

### R22 — gauge pressure (psig), sea level
| °C | psig | °C | psig |
| --- | --- | --- | --- |
| −10 | 37 | 20 | 117 |
| −5 | 46 | 25 | 136 |
| 0 | 57 | 30 | 158 |
| 5 | 70 | 35 | 181 |
| 10 | 84 | 40 | 208 |
| 15 | 100 | 45 | 236 |
| | | 50 | 266 |

The pattern to remember: *R22 evaporates around 5 °C at roughly 70 psig and condenses around 45 °C at roughly 235–240 psig — which is exactly what a healthy unit looks like on a Dhaka summer day.*

### R410A — much higher pressure at the same temperature
| °C | psig (approx) |
| --- | --- |
| 0 | 101 |
| 5 | 121 |
| 10 | 143 |
| 25 | 224 |
| 30 | 258 |
| 40 | 337 |
| 45 | 381 |
| 50 | 429 |

### R32 — close to R410A, slightly higher
R32 at 5 °C is about 124 psig and at 45 °C about 396 psig. Because R32 is a single component, its chart has **no glide**, which is one reason manufacturers like it.

### R134a — much lower pressure
| °C | psig (approx) |
| --- | --- |
| 0 | 28 |
| 5 | 36 |
| 25 | 82 |
| 45 | 153 |

>> In the exam and on the job: **state the refrigerant before you state the pressure.** "70 psig" is 5 °C in R22, −20 °C in R410A, and 22 °C in R134a.

## Four ways the P-T relationship earns its keep

### 1. Estimating evaporating and condensing temperature
From the gauge readings alone you can estimate coil temperatures and compare them against the room air and outdoor air.

### 2. Proving a pressure switch or PCB sensor
If the low-pressure cut-out should open at 20 psig but the system pumps down to 0 psig, the switch is faulty — the P-T chart plus a gauge proved it.

### 3. Spotting air or nitrogen in the system
Air is non-condensable. It sits in the condenser and raises the discharge pressure **without** raising the liquid temperature correspondingly — high head pressure with normal subcooling and a bubbling sight glass. The cure is recovery, evacuation and recharging, not more gas.

### 4. Chasing a restriction
A blocked filter drier or kinked line causes a **temperature drop across it**. Feel the line: a filter drier that is cold, or frosted, on its outlet side is restricted. Confirm with a pressure drop and the P-T chart.

## Superheat and subcool targets by system type
| System | Target superheat (at outdoor unit) | Target subcool |
| --- | --- | --- |
| Capillary / fixed orifice (window, small split) | 5–12 K, varies with load | charge by superheat + weight |
| TXV / EEV system | 5–8 K at the evaporator outlet | 5–10 K, charge by subcool |
| Inverter (variable speed) | read at **full-load** operation only | manufacturer's spec |

For a fixed-orifice system, the correct superheat **changes with indoor wet-bulb and outdoor dry-bulb** — that is why manufacturers publish a charging chart rather than a single number. For a TXV/EEV system, subcooling is the charge indicator and superheat is set by the valve itself.

## Practical measurement discipline
- Use **the same thermometer** for every reading in one diagnosis.
- Clean the pipe; paint and insulation distort readings.
- Clamp on a straight section, not a bend or a joint.
- Let the system run **10–15 minutes** at steady load before reading.
- Record the numbers on the job card. Recall is not data.
`,
      { subtitle: "P-T anchors, three diagnosable faults, superheat vs subcool charging", drill: ["rac-ref-003", "rac-ref-004"] },
    ),
  ],
};
