import type { Module, Subject } from "../types";
import { lesson } from "../md";

const S = "ged-science" as const;

const practices: Module = {
  id: "gs-practice",
  subject: S,
  title: "Science Practices & Data",
  summary: "Roughly 60 % of the Science test is data interpretation and experimental design, not recall. This is where the marks actually are.",
  icon: "flask",
  lessons: [
    lesson(
      S,
      "gs-practice",
      "gs-l1-design",
      "Experimental design, variables and validity",
      11,
      ["gs-practice"],
      `
## The anatomy of an experiment
| Term | Meaning | Example |
| --- | --- | --- |
| **Independent variable** | What the scientist deliberately changes | Amount of fertiliser |
| **Dependent variable** | What is measured | Plant height after 4 weeks |
| **Control variables** | Everything held constant | Light, water, soil, temperature |
| **Control group** | The group with no treatment | Plants given zero fertiliser |
| **Experimental group** | The group receiving the treatment | Plants given 5 g |
| **Sample size** | Number of replicates | 30 plants per group |

A good hypothesis is **testable and falsifiable**: "Plants given more nitrogen will grow taller" can be tested; "plants like music" cannot be measured without operational definitions.

## Validity, reliability, precision, accuracy
- **Accuracy** — close to the true value.
- **Precision** — close together, repeated readings agree.
- **Reliability** — the result repeats under the same conditions.
- **Validity** — the experiment measures what it claims to measure.

A ruler with a broken tip can be *precise* (same wrong answer every time) and still inaccurate.

## Common design flaws the test rewards you for spotting
1. **No control group** — you cannot attribute change to the treatment.
2. **Confounding variable** — two things changed at once.
3. **Too small a sample** — one plant is an anecdote.
4. **Selection bias** — volunteers chosen because they are convenient.
5. **Measurement error** — an instrument read without a repeat or calibration.
6. **Correlation treated as causation**.
7. **Over-generalising** — testing one species and concluding for all life.

## Reading a graph
1. Read the **title** — it names the variables.
2. Read the **axes** — labels **and units**. Missing units are a classic trap.
3. Note the **scale** — a truncated axis exaggerates change.
4. Identify the **trend** — linear, exponential, plateau, cyclical.
5. Read specific values only when asked, and use the gridlines.

| Shape | Meaning |
| --- | --- |
| Straight rising line | Constant rate of increase |
| Curve steepening upward | Exponential growth |
| Curve flattening | Plateau / saturation / limiting factor |
| Two lines crossing | The values are equal at that point, not necessarily the "best" |
| Scatter with negative slope | Inverse relationship |

## Units and conversions in science
| Quantity | SI unit | Common conversions |
| --- | --- | --- |
| Length | metre (m) | 1 km = 1000 m; 1 cm = 10 mm |
| Mass | kilogram (kg) | 1 kg = 1000 g; 1 mg = 0.001 g |
| Time | second (s) | 1 min = 60 s |
| Temperature | kelvin (K) | K = °C + 273 |
| Force | newton (N) | |
| Energy | joule (J) | 1 kJ = 1000 J; 1 cal = 4.184 J |
| Power | watt (W) | 1 W = 1 J/s |
| Density | kg/m³ or g/cm³ | 1 g/cm³ = 1000 kg/m³ |

**Density** is the classic GED calculation — it decides floating, sinking and layering:
$ \\rho = \\frac{m}{V}

! A block has mass 240 g and volume 30 cm³ | 240 ÷ 30 | ⇒ 8 g/cm³ — denser than water (1 g/cm³), so it sinks

## Scientific notation in science data
Astronomical and microscopic quantities are always in scientific notation. Multiply: coefficients multiply, exponents add. Divide: coefficients divide, exponents subtract.

## Interpreting a data table
Check the **column headings and units**, then compute differences (not just read numbers) — most questions ask for a **change**, a **rate**, or a **comparison**.
`,
      { subtitle: "Variables, controls, bias, graph reading and units", drill: ["gs-001", "gs-002"] },
    ),
  ],
};

const lifeCells: Module = {
  id: "gs-cells",
  subject: S,
  title: "Life Science · Cells & Body Systems",
  summary: "Cell structure, transport, photosynthesis and respiration, enzymes, and how the human body's systems cooperate.",
  icon: "cell",
  lessons: [
    lesson(
      S,
      "gs-cells",
      "gs-l2-cells",
      "Cells, membranes and transport",
      11,
      ["gs-cells"],
      `
## Prokaryote vs eukaryote
| Feature | Prokaryote (bacteria) | Eukaryote (plants, animals, fungi) |
| --- | --- | --- |
| Nucleus | None — DNA free in cytoplasm | True nucleus with membrane |
| Organelles | Few, no membrane-bound | Many, membrane-bound |
| Size | 1–5 µm | 10–100 µm |
| Cell wall | Peptidoglycan | Cellulose (plants), chitin (fungi), none (animals) |

## Organelles and their jobs
| Organelle | Function |
| --- | --- |
| Nucleus | Stores DNA; controls activity |
| Mitochondrion | Aerobic respiration — ATP production |
| Ribosome | Protein synthesis |
| Rough ER | Protein folding and transport |
| Smooth ER | Lipid synthesis, detoxification |
| Golgi apparatus | Modifies, sorts and packages proteins |
| Lysosome | Digests waste and worn organelles |
| Chloroplast | Photosynthesis (plants only) |
| Vacuole | Storage; large central vacuole gives plant turgor |
| Cell membrane | Selective barrier |
| Cytoplasm | Site of many reactions |

**Plant vs animal cell**: plants have a cell wall, chloroplasts and a large central vacuole; animals have centrioles and lysosomes in greater number. Both have mitochondria, ribosomes and a nucleus.

## The membrane and transport
The membrane is a **phospholipid bilayer** with embedded proteins — the fluid mosaic model.

| Type | Direction | Energy needed | Example |
| --- | --- | --- | --- |
| Diffusion | High → low concentration | No | Oxygen into a cell |
| Osmosis | Water, high → low water potential | No | Water into roots |
| Facilitated diffusion | Through a channel protein | No | Glucose into red blood cells |
| Active transport | Low → high concentration | **Yes (ATP)** | Sodium-potassium pump, root ion uptake |
| Endocytosis / exocytosis | Bulk in / out | Yes | White blood cells engulfing bacteria |

**Osmosis** is the most-tested idea: water moves toward the side with **more solute**. A cell in pure water swells (possible lysis); in strong salt it shrinks (plasmolysis).

## Enzymes
- Proteins that **catalyse** reactions by lowering activation energy.
- **Specific** — one enzyme, one substrate (lock and key / induced fit).
- Affected by **temperature** and **pH**: too hot → denatured (shape lost, permanently); too cold → slowed but reversible.
- Optimal human body temperature ≈ 37 °C.

## Photosynthesis and respiration
$ 6CO_2 + 6H_2O + light \\rightarrow C_6H_{12}O_6 + 6O_2 \\quad (\\text{photosynthesis})

$ C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + ATP \\quad (\\text{cellular respiration})

They are **complementary**: photosynthesis stores energy and releases oxygen; respiration releases energy and releases carbon dioxide. Chlorophyll absorbs mainly **red and blue** light and reflects green — which is why leaves look green.

**Aerobic** respiration yields far more ATP than **anaerobic** (in humans, lactic acid; in yeast, ethanol + CO₂).
`,
      { subtitle: "Organelles, membrane transport, enzymes, respiration equations", drill: ["gs-003"] },
    ),
    lesson(
      S,
      "gs-cells",
      "gs-l2-body",
      "Human body systems and homeostasis",
      10,
      ["gs-body"],
      `
## Systems and their functions
| System | Main organs | Function |
| --- | --- | --- |
| Circulatory | Heart, blood vessels | Transport gases, nutrients, hormones, heat |
| Respiratory | Lungs, diaphragm | Gas exchange (O₂ in, CO₂ out) |
| Digestive | Stomach, small intestine, liver | Break down and absorb nutrients |
| Excretory | Kidneys, bladder | Remove waste, balance water and salts |
| Nervous | Brain, spinal cord, nerves | Detect, integrate, respond |
| Endocrine | Glands (thyroid, pancreas, adrenals) | Hormonal control |
| Immune/lymphatic | Lymph nodes, white cells | Defence |
| Musculoskeletal | Bones, muscles | Support, movement, protection |
| Integumentary | Skin | Barrier, temperature regulation |

## Homeostasis
Maintaining a stable internal environment despite external change. Three components: **sensor → control centre → effector**.

| Parameter | Normal | Corrective mechanism |
| --- | --- | --- |
| Body temperature | ~37 °C | Sweating and vasodilation cool; shivering and vasoconstriction warm |
| Blood glucose | ~4–7 mmol/L | Insulin lowers; glucagon raises |
| Water balance | Regulated by ADH | Kidneys reabsorb more or less water |
| Blood pH | 7.35–7.45 | Buffers and breathing rate |

**Negative feedback** reverses a change and is the norm. **Positive feedback** amplifies a change (childbirth, blood clotting) and is rare.

## Gas exchange
Alveoli are efficient because they have: a **large surface area**, a **thin wall** (one cell), a **moist surface** and a **steep concentration gradient** maintained by blood flow. Gas moves by diffusion — no energy required.

## Blood
- **Red cells** — haemoglobin carries oxygen.
- **White cells** — immunity.
- **Platelets** — clotting.
- **Plasma** — transport medium.

Arteries carry blood **away** from the heart (thick, elastic, high pressure). Veins carry blood **toward** the heart (valves, low pressure). Capillaries are one cell thick for exchange.

## Digestion
Mechanical plus chemical. Enzymes: **amylase** (starch), **protease** (protein), **lipase** (fat). Most absorption occurs in the **small intestine** (villi increase surface area). The **liver** produces bile, which emulsifies fat; the **pancreas** supplies several enzymes.

## Neurons and synapses
Neurons transmit electrical impulses; **synapses** transmit chemically via neurotransmitters across a gap. Reflex arcs bypass the brain for speed — a survival adaptation.

## Immunity
- **Innate** — non-specific, fast (skin, inflammation, phagocytes).
- **Adaptive** — specific, slower, memory (B cells make antibodies, T cells kill infected cells).
- **Vaccination** creates memory cells without the disease, which is why the second exposure is defeated before symptoms appear.
`,
      { subtitle: "Systems, homeostasis, gas exchange, neurons, immunity", drill: ["gs-004"] },
    ),
  ],
};

const genetics: Module = {
  id: "gs-genetics",
  subject: S,
  title: "Life Science · Genetics & Evolution",
  summary: "DNA, Mendelian inheritance, mutations, natural selection and the evidence for evolution.",
  icon: "dna",
  lessons: [
    lesson(
      S,
      "gs-genetics",
      "gs-l3-dna",
      "DNA, genes and inheritance",
      12,
      ["gs-genetics"],
      `
## The Central Dogma
$ \\text{DNA} \\rightarrow \\text{RNA} \\rightarrow \\text{protein}

- **Replication**: DNA copies itself before cell division.
- **Transcription**: DNA → mRNA in the nucleus.
- **Translation**: mRNA → protein at the ribosome, using codons of three bases.

DNA is a **double helix** of nucleotides with bases **A–T** and **G–C** (in RNA, A pairs with U). The sequence of bases is the genetic code.

## Genes, alleles, chromosomes
- **Gene** — a section of DNA coding for a trait.
- **Allele** — a variant of a gene.
- **Genotype** — the alleles present (AA, Aa, aa).
- **Phenotype** — the observable trait.
- **Dominant** allele masks the recessive one in a heterozygote.
- **Homozygous** = two identical alleles; **heterozygous** = two different.
- Humans have **46 chromosomes** (23 pairs); gametes have 23.

## Mendelian crosses
| Cross | Ratio (phenotype) |
| --- | --- |
| Aa × Aa | 3 dominant : 1 recessive |
| AA × aa | All dominant (all Aa) |
| Aa × aa | 1 : 1 |
| Dihybrid | 9 : 3 : 3 : 1 |

A **Punnett square** is the tool. A test cross (cross with a homozygous recessive) reveals whether a dominant individual is AA or Aa.

## Beyond simple dominance
- **Incomplete dominance** — blending (red × white → pink).
- **Codominance** — both traits show (AB blood type).
- **Multiple alleles** — human ABO blood groups (A, B, AB, O).
- **Polygenic traits** — height, skin colour: many genes, continuous variation.
- **Sex-linked traits** — carried on the X chromosome; expressed more often in males (colour blindness, haemophilia).

## Mutations
Changes in the DNA sequence. Causes: replication errors, radiation, chemicals, some viruses. Effects: **silent** (no change), **missense** (different amino acid), **nonsense** (stops early), **frameshift** (insertion/deletion shifts the reading frame — usually most damaging).

Mutations are the ultimate source of genetic variation; most are neutral or harmful, a few are beneficial.

## Meiosis vs mitosis
| | Mitosis | Meiosis |
| --- | --- | --- |
| Purpose | Growth, repair | Gamete production |
| Divisions | 1 | 2 |
| Daughter cells | 2, diploid | 4, haploid |
| Genetic variation | None (identical) | Crossing over and independent assortment |

## Evolution
- **Natural selection**: variation exists → some variants survive better → they reproduce more → allele frequencies change.
- **Evidence**: fossil record, homologous structures, embryology, DNA sequence similarity, observed evolution (antibiotic resistance, pesticide resistance).
- **Speciation** occurs when populations become reproductively isolated.
- **Genetic drift** is random change, strongest in small populations.
- **Antibiotic resistance** is the cleanest real-world example: the antibiotic does not create resistance, it selects for bacteria that already have it.

> Evolution acts on populations, not individuals, and it is not "trying" to improve anything. There is no goal.
`,
      { subtitle: "Central dogma, Punnett squares, mutations, selection", drill: ["gs-005"] },
    ),
  ],
};

const ecology: Module = {
  id: "gs-ecology",
  subject: S,
  title: "Life Science · Ecosystems",
  summary: "Energy flow, food webs, population dynamics, cycles and human impact.",
  icon: "leaf",
  lessons: [
    lesson(
      S,
      "gs-ecology",
      "gs-l4-ecology",
      "Energy flow and population dynamics",
      10,
      ["gs-ecology"],
      `
## Trophic levels
Producers (autotrophs) → primary consumers → secondary consumers → tertiary consumers → decomposers.

Only about **10 % of energy** transfers between trophic levels; the rest is lost as heat through respiration. This is why:
- food chains are short (usually 4–5 links),
- top predators are rarer,
- eating lower on the chain feeds more people per hectare.

A **food web** is many interconnected chains; removing one species affects many others. A **keystone species** has an effect disproportionate to its abundance.

## Population dynamics
| Term | Meaning |
| --- | --- |
| Birth rate / death rate | Additions vs losses |
| Immigration / emigration | Movement in / out |
| Carrying capacity (K) | Maximum population the environment sustains |
| Limiting factor | Resource or condition that caps growth |
| Exponential growth | Unlimited growth at a constant rate (J-curve) |
| Logistic growth | Growth that levels off at K (S-curve) |

Density-dependent factors (food, disease, competition) intensify as density rises. Density-independent factors (fire, drought, flood) strike regardless.

Predator-prey cycles oscillate with a lag: prey rise → predators rise → prey fall → predators fall → prey recover.

## Biogeochemical cycles
- **Carbon** — photosynthesis removes CO₂; respiration, combustion and decomposition release it.
- **Nitrogen** — fixed by bacteria and lightning into usable compounds; returned by decomposers.
- **Water** — evaporation, transpiration, condensation, precipitation, runoff.
- **Phosphorus** — no atmospheric phase; weathering and recycling.

## Symbiosis
| Type | Effect | Example |
| --- | --- | --- |
| Mutualism | + / + | Algae and fungus in lichen |
| Commensalism | + / 0 | Barnacles on a whale |
| Parasitism | + / − | Tapeworm in a host |
| Competition | − / − | Two species for one food source |

## Succession
**Primary** succession starts on bare rock (no soil). **Secondary** starts where soil already exists (after a fire). Both move toward a stable climax community, though disturbance often keeps ecosystems in intermediate states.

## Human impact
- Habitat loss is the leading cause of biodiversity loss.
- **Eutrophication**: nutrient runoff → algal bloom → decomposition → oxygen depletion → fish death.
- **Bioaccumulation**: persistent pollutants concentrate up the food chain.
- Invasive species outcompete natives because they arrive without their natural predators.
- Conservation strategies: protected areas, corridors, captive breeding, restoration, sustainable harvest.
`,
      { subtitle: "Trophic efficiency, carrying capacity, cycles, symbiosis", drill: ["gs-006"] },
    ),
  ],
};

const chemistry: Module = {
  id: "gs-chem",
  subject: S,
  title: "Physical Science · Chemistry",
  summary: "Atoms, the periodic table, bonding, reactions, acids and bases, and conservation of mass.",
  icon: "atom",
  lessons: [
    lesson(
      S,
      "gs-chem",
      "gs-l5-atoms",
      "Atoms, bonding and the periodic table",
      12,
      ["gs-chem"],
      `
## Atomic structure
| Particle | Charge | Location |
| --- | --- | --- |
| Proton | +1 | Nucleus |
| Neutron | 0 | Nucleus |
| Electron | −1 | Shells |

- **Atomic number (Z)** = protons — this defines the element.
- **Mass number (A)** = protons + neutrons.
- **Isotopes** have the same Z but different A (different neutrons).
- **Ions** have gained or lost electrons: cations are positive, anions negative.

## Electron shells
2, 8, 8, 18 (rules of thumb for the first shells). **Valence electrons** in the outermost shell determine chemical behaviour. Groups share valence count; that is why the periodic table is arranged the way it is.

| Group | Name | Valence | Behaviour |
| --- | --- | --- | --- |
| 1 | Alkali metals | 1 | Lose 1 e⁻, very reactive |
| 2 | Alkaline earth | 2 | Lose 2 e⁻ |
| 17 | Halogens | 7 | Gain 1 e⁻, reactive non-metals |
| 18 | Noble gases | 8 (full) | Inert |

Across a period: atomic radius decreases, electronegativity increases. Down a group: radius increases, reactivity of metals increases.

## Bonding
| Bond | Mechanism | Properties | Example |
| --- | --- | --- | --- |
| Ionic | Transfer of electrons (metal → non-metal) | High melting point, conducts when molten/dissolved | NaCl |
| Covalent | Sharing of electrons (non-metal + non-metal) | Low melting point, usually non-conducting | H₂O, CO₂ |
| Metallic | Sea of delocalised electrons | Conducts, malleable | Cu, Fe |

**Conservation of mass** — in a chemical reaction, atoms are rearranged, never created or destroyed. Balance the equation:
$ 2H_2 + O_2 \\rightarrow 2H_2O \\quad (4 \\text{ H and } 2 \\text{ O on each side})$

## Reaction types
- **Synthesis**: A + B → AB
- **Decomposition**: AB → A + B
- **Single replacement**: A + BC → AC + B
- **Double replacement**: AB + CD → AD + CB
- **Combustion**: fuel + O₂ → CO₂ + H₂O
- **Neutralisation**: acid + base → salt + water

**Exothermic** releases heat (combustion, respiration); **endothermic** absorbs heat (photosynthesis, evaporation, thermal decomposition).

## Acids, bases and pH
- **Acid** — donates H⁺; pH < 7.
- **Base** — accepts H⁺; pH > 7.
- **Neutral** — pH = 7 at 25 °C.
- The pH scale is **logarithmic**: pH 3 is ten times more acidic than pH 4.

| pH | Substance |
| --- | --- |
| 0–2 | Stomach acid, battery acid |
| 3–4 | Vinegar, lemon |
| 7 | Pure water |
| 8–10 | Baking soda, soap |
| 12–14 | Bleach, drain cleaner |

Indicators (litmus, universal indicator, pH meter) show acidity. **Buffers** resist pH change — essential in blood and in soil.

## Rates of reaction
Affected by: **temperature** (more collisions), **concentration**, **surface area**, **catalyst**, and **pressure** for gases. A catalyst lowers activation energy without being consumed.

## The mole (conceptually)
A mole is 6.022 × 10²³ particles. Molar mass in g/mol equals the sum of atomic masses. GED questions usually stop at "how many moles in 36 g of water" = 2 mol (M = 18 g/mol) rather than deeper stoichiometry.
`,
      { subtitle: "Atomic structure, bonds, reaction types, pH, rates", drill: ["gs-007"] },
    ),
  ],
};

const physics: Module = {
  id: "gs-physics",
  subject: S,
  title: "Physical Science · Physics",
  summary: "Motion, forces, energy, waves, light, sound and electricity — the formulas and what they mean in the world.",
  icon: "wave",
  lessons: [
    lesson(
      S,
      "gs-physics",
      "gs-l6-motion",
      "Motion, forces and energy",
      12,
      ["gs-physics"],
      `
## Motion
$ \\text{speed} = \\frac{\\text{distance}}{\\text{time}} \\qquad \\text{velocity} = \\frac{\\text{displacement}}{\\text{time}}
$ a = \\frac{\\Delta v}{t} \\qquad v = u + at \\qquad s = ut + \\tfrac{1}{2}at^2

- **Distance** is scalar; **displacement** includes direction.
- **Speed** is scalar; **velocity** is a vector.
- **Acceleration** is a change in velocity — including a change of direction.

A distance–time graph's **slope is speed**; a velocity–time graph's slope is acceleration and its **area under the line is displacement**.

## Newton's laws
1. An object stays at rest or in uniform motion unless a net force acts (**inertia**).
2. **F = ma** — force equals mass times acceleration.
3. Every action has an equal and opposite reaction.

**Weight** is a force (W = mg, g ≈ 9.8 m/s²); **mass** is the amount of matter. On the Moon your mass is unchanged, your weight is about one-sixth.

**Friction** opposes relative motion and converts kinetic energy to heat. **Air resistance** increases with speed and area, and produces terminal velocity when it equals weight.

## Energy
| Form | Example |
| --- | --- |
| Kinetic | Moving car |
| Potential (gravitational) | Book on a shelf |
| Elastic | Stretched spring |
| Thermal | Heated water |
| Chemical | Food, fuel, battery |
| Electrical | Current in a wire |
| Nuclear | Sun, reactors |
| Light / sound | Waves carrying energy |

$ KE = \\tfrac{1}{2}mv^2 \\qquad PE = mgh \\qquad W = Fd \\qquad P = \\frac{W}{t}

Doubling **speed** quadruples kinetic energy (v²). That is why speed limits matter far more than car mass.

**Conservation of energy**: energy is never created or destroyed, only transformed. In practice some always becomes low-grade heat, which is why no machine is 100 % efficient:
$ \\text{efficiency} = \\frac{\\text{useful output}}{\\text{total input}} × 100\\%

## Simple machines
Lever, pulley, inclined plane, wheel and axle, screw, wedge. They multiply force at the expense of distance — work out is never greater than work in (ideal machine).

## Waves
$ v = f\\lambda \\qquad T = \\frac{1}{f}

- **Transverse** (light, water ripples): oscillation perpendicular to travel.
- **Longitudinal** (sound): oscillation parallel to travel, with compressions and rarefactions.
- **Amplitude** determines loudness/brightness; **frequency** determines pitch/colour.
- **Reflection, refraction, diffraction, interference** are the four behaviours.

Sound needs a **medium** (it cannot travel through a vacuum); light does not. Sound travels faster in solids than in gases. The speed of light in a vacuum is 3 × 10⁸ m/s.

## Light and optics
- **Refraction**: change of speed at a boundary bends the ray (a straw looks broken in water).
- **Convex lens** converges (magnifying, long-sight correction); **concave** diverges (short-sight correction).
- The **electromagnetic spectrum** from longest to shortest wavelength: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.
- Colour: white light splits into a spectrum because each wavelength refracts by a different amount.

## Electricity and magnetism
$ V = IR \\qquad P = VI \\qquad E = Pt

- **Series**: same current, voltages add, total resistance adds.
- **Parallel**: same voltage, currents add, total resistance is less than the smallest branch.
- Conductors allow charge flow; insulators resist it.
- A current creates a magnetic field; a changing magnetic field induces a current (**electromagnetic induction**) — the basis of generators and transformers.
`,
      { subtitle: "Kinematics, Newton, energy conservation, waves, optics, circuits", drill: ["gs-008"] },
    ),
  ],
};

const earth: Module = {
  id: "gs-earth",
  subject: S,
  title: "Earth & Space Science",
  summary: "Plate tectonics, rocks and the rock cycle, climate and the water cycle, the solar system and the origin of the universe.",
  icon: "globe",
  lessons: [
    lesson(
      S,
      "gs-earth",
      "gs-l7-earth",
      "Earth's structure, tectonics and rocks",
      11,
      ["gs-earth"],
      `
## Layers
| Layer | State | Notes |
| --- | --- | --- |
| Crust | Solid | 5–70 km; continental thicker than oceanic |
| Mantle | Solid but slowly flowing | Convection drives plate motion |
| Outer core | Liquid iron-nickel | Generates the magnetic field |
| Inner core | Solid iron | Extreme pressure |

## Plate tectonics
The lithosphere is broken into plates that move a few centimetres per year on the asthenosphere.

| Boundary | Motion | Features |
| --- | --- | --- |
| Divergent | Plates separate | Mid-ocean ridges, rift valleys, new crust |
| Convergent | Plates collide | Mountains, volcanoes, deep trenches, earthquakes |
| Transform | Plates slide past | Fault lines, earthquakes (e.g. San Andreas) |

Bangladesh sits near the collision of the Indian and Eurasian plates, which is why the region experiences damaging earthquakes and why the Himalayan arc to the north is still rising.

**Earthquakes** release energy as seismic waves; the focus is underground, the epicentre is directly above. Magnitude measures energy (logarithmic), intensity measures effects.

## The rock cycle
| Rock | Formed by | Example |
| --- | --- | --- |
| Igneous | Cooling magma/lava | Basalt, granite |
| Sedimentary | Compaction of sediments | Sandstone, limestone |
| Metamorphic | Heat and pressure | Marble (from limestone), slate (from shale) |

The cycle is driven by heat and pressure: any rock can become any other, given time.

## Weathering and erosion
**Physical** (freeze-thaw, abrasion), **chemical** (dissolution, oxidation), **biological** (roots, lichens). **Erosion** transports the products; **deposition** drops them. Rivers sort sediment by size — coarse upstream, fine downstream.

## Soil
A mixture of mineral particles, organic matter, air and water. Soil texture (sand, silt, clay) controls drainage and fertility. Topsoil loss is a major agricultural problem and is accelerated by deforestation and overgrazing.
`,
      { subtitle: "Layers, plate boundaries, rock cycle, weathering", drill: ["gs-009"] },
    ),
    lesson(
      S,
      "gs-earth",
      "gs-l7-climate",
      "Climate, the water cycle and the solar system",
      11,
      ["gs-earth", "gs-climate"],
      `
## The atmosphere
| Layer | Feature |
| --- | --- |
| Troposphere | Weather; most mass; temperature falls with height |
| Stratosphere | Ozone layer absorbs UV; temperature rises with height |
| Mesosphere | Meteors burn up |
| Thermosphere | Aurora; very thin |
| Exosphere | Fades into space |

## Weather vs climate
**Weather** is the state of the atmosphere over hours to days. **Climate** is the statistical pattern over decades. A cold week does not disprove a warming climate; a hot day does not prove it.

## The greenhouse effect
Greenhouse gases (CO₂, CH₄, N₂O, water vapour, HFCs) absorb outgoing infrared radiation and re-emit it, warming the surface. Without any greenhouse effect Earth would average about −18 °C instead of +15 °C. The issue is the **enhanced** effect from human emissions.

**Feedback loops**: ice-albedo feedback amplifies warming (melt → darker surface → more absorption); increased cloud cover is more uncertain.

## The water cycle
Evaporation → transpiration → condensation → precipitation → runoff/infiltration → groundwater. Energy from the Sun drives it. The same water has been cycling for billions of years.

## Seasons
Caused by Earth's **23.5° axial tilt**, not by distance from the Sun. When the northern hemisphere tilts toward the Sun, it receives more direct, longer-duration sunlight.

## Moon phases and tides
Phases arise from the changing angle between Earth, Moon and Sun (about 29.5 days). Spring tides occur at new and full moon (aligned); neap tides at the quarters. Tides are primarily caused by the Moon's gravitational pull.

## The solar system
| Planet | Order | Note |
| --- | --- | --- |
| Mercury | 1 | Hottest surface, no atmosphere |
| Venus | 2 | Runaway greenhouse, ~465 °C |
| Earth | 3 | Liquid water |
| Mars | 4 | Thin CO₂ atmosphere, polar ice |
| Jupiter | 5 | Largest, gas giant |
| Saturn | 6 | Prominent rings |
| Uranus | 7 | Rotational axis nearly horizontal |
| Neptune | 8 | Ice giant, strongest winds |

**Terrestrial** planets are small, rocky and dense; **Jovian** planets are large, gaseous and low density. Asteroids sit between Mars and Jupiter; comets come from the outer system.

## Stars and the universe
- Stars form from collapsing gas clouds (nebulae); fusion of hydrogen to helium powers them.
- The **Hertzsprung–Russell diagram** plots luminosity against temperature; most stars lie on the main sequence.
- Massive stars end as supernovae, leaving neutron stars or black holes.
- The **Big Bang** model is supported by cosmic microwave background radiation, the redshift of distant galaxies, and the abundance of light elements. The universe is about 13.8 billion years old.
`,
      { subtitle: "Atmosphere, greenhouse effect, seasons, tides, planets", drill: ["gs-010"] },
    ),
  ],
};

export const gedScienceModules: Module[] = [practices, lifeCells, genetics, ecology, chemistry, physics, earth];

export const gedScienceSubject: Subject = {
  id: "ged-science",
  track: "ged",
  title: "Science",
  short: "Science",
  tagline: "GED · 90 minutes · data and practice heavy",
  description:
    "Life, physical and Earth & space science, taught through the science practices the test actually measures: design, data, inference and evidence.",
  icon: "flask",
  hue: "#B7F25C",
  hue2: "#5EE7F0",
  exam: {
    label: "GED Science simulation",
    minutes: 90,
    items: "34 items",
    pass: "Pass 145 · College ready 165",
  },
  modules: gedScienceModules,
};
