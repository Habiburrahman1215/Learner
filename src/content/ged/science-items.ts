import { bankFor } from "../builders";
import type { Item } from "../types";

const q = bankFor("ged-science");

export const gedScienceItems: Item[] = [
  /* practices */
  q.mcq("gs-001", "gs-practice", 2, "A student measures plant growth with different amounts of fertiliser while keeping light, water and temperature constant. The independent variable is:", ["Plant height", "Amount of fertiliser", "Light intensity", "Water volume"], 1, "The independent variable is what the experimenter deliberately changes — the fertiliser amount."),
  q.multi("gs-002", "gs-practice", 3, "Which are signs of a weak experimental design? Choose all that apply.", ["No control group", "Only one subject in each group", "Two variables changed at once", "Repeated measurements at the same setting"], [0, 1, 2], "No control, tiny sample and confounded variables all weaken causal inference. Repetition improves reliability."),
  q.num("gs-003", "gs-practice", 3, "A block has mass 240 g and volume 30 cm³. What is its density in g/cm³?", 8, "ρ = m/V = 240/30 = 8 g/cm³ — denser than water, so it sinks."),
  q.mcq("gs-004", "gs-practice", 2, "On a graph, a line that rises steeply and then flattens indicates:", ["Exponential growth forever", "A plateau caused by a limiting factor", "A measurement error", "No relationship"], 1, "Flattening shows saturation: some resource or condition has become limiting."),
  q.mcq("gs-005", "gs-practice", 2, "A set of measurements is very close together but all far from the true value. The data are:", ["Accurate but not precise", "Precise but not accurate", "Both accurate and precise", "Neither"], 1, "Precision is agreement among repeats; accuracy is closeness to the true value."),

  /* cells */
  q.mcq("gs-003b", "gs-cells", 1, "Which organelle produces most of the cell's ATP?", ["Nucleus", "Mitochondrion", "Golgi apparatus", "Lysosome"], 1, "The mitochondrion carries out aerobic respiration and produces most ATP."),
  q.mcq("gs-004b", "gs-cells", 2, "Which structures are found in plant cells but not animal cells?", ["Mitochondria and ribosomes", "Cell wall and chloroplasts", "Nucleus and cytoplasm", "Cell membrane and lysosomes"], 1, "Plant cells have a cellulose cell wall and chloroplasts; both have mitochondria, ribosomes and a nucleus."),
  q.mcq("gs-006", "gs-cells", 2, "Water moving across a membrane from low to high solute concentration is called:", ["Active transport", "Osmosis", "Diffusion of glucose", "Endocytosis"], 1, "Osmosis is the diffusion of water across a semi-permeable membrane toward the higher solute concentration."),
  q.mcq("gs-007", "gs-cells", 2, "A cell placed in a very salty solution will most likely:", ["Swell and burst", "Shrink as water leaves", "Stay the same", "Gain salt by active transport only"], 1, "Water leaves the cell by osmosis toward the higher solute concentration outside, so the cell shrinks."),
  q.mcq("gs-008", "gs-cells", 2, "Which process requires energy from ATP?", ["Diffusion of oxygen", "Osmosis of water", "Active transport of ions", "Free diffusion of carbon dioxide"], 2, "Active transport moves substances against a concentration gradient and requires ATP."),
  q.mcq("gs-009", "gs-cells", 2, "An enzyme is denatured by high temperature because:", ["It is used up", "Its shape changes so the substrate no longer fits", "It becomes a substrate", "It gains energy and works faster"], 1, "Enzymes are proteins; heat disrupts bonding and destroys the active site shape irreversibly."),
  q.mcq("gs-010", "gs-cells", 2, "Photosynthesis produces:", ["Carbon dioxide and water", "Glucose and oxygen", "ATP and lactic acid", "Nitrogen and hydrogen"], 1, "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂."),
  q.mcq("gs-011", "gs-cells", 3, "Chlorophyll appears green because it:", ["Absorbs green light", "Reflects green light while absorbing red and blue", "Reflects all wavelengths", "Emits green light"], 1, "Chlorophyll absorbs mainly red and blue light and reflects green — the colour we see."),
  q.mcq("gs-012", "gs-body", 2, "Which system is primarily responsible for maintaining blood glucose homeostasis?", ["Nervous", "Endocrine", "Skeletal", "Integumentary"], 1, "Insulin and glucagon from the pancreas (endocrine) regulate blood glucose."),
  q.mcq("gs-013", "gs-body", 2, "Sweating to cool the body is an example of:", ["Positive feedback", "Negative feedback", "Open circulation", "Active immunity"], 1, "A rise in temperature triggers a response that lowers temperature — negative feedback."),
  q.multi("gs-014", "gs-body", 3, "Why are alveoli efficient at gas exchange? Choose all that apply.", ["Large total surface area", "Very thin walls", "Moist surface", "Thick muscular walls that pump gas"], [0, 1, 2], "Alveoli are thin, moist and vast in area with a steep concentration gradient — diffusion, not pumping."),

  /* genetics */
  q.mcq("gs-015", "gs-genetics", 2, "The sequence of events in gene expression is:", ["Protein → RNA → DNA", "DNA → RNA → protein", "RNA → DNA → protein", "DNA → protein → RNA"], 1, "Transcription then translation: DNA → mRNA → protein."),
  q.num("gs-016", "gs-genetics", 3, "Two heterozygous parents (Aa × Aa) are crossed. What percentage of offspring show the recessive phenotype?", 25, "The ratio is 3:1 dominant:recessive, so 25 % show the recessive phenotype."),
  q.mcq("gs-017", "gs-genetics", 2, "An organism with genotype Aa is:", ["Homozygous dominant", "Heterozygous", "Homozygous recessive", "Haploid"], 1, "Aa has one of each allele — heterozygous."),
  q.mcq("gs-018", "gs-genetics", 2, "Human body cells contain how many chromosomes?", ["23", "46", "92", "22"], 1, "46 chromosomes in 23 pairs; gametes have 23."),
  q.mcq("gs-019", "gs-genetics", 3, "A frameshift mutation is usually more damaging than a substitution because:", ["It changes only one amino acid", "It shifts the reading frame so every subsequent codon changes", "It deletes the whole chromosome", "It only affects non-coding DNA"], 1, "Insertions or deletions not in multiples of three shift every downstream codon."),
  q.mcq("gs-020", "gs-genetics", 3, "Antibiotic resistance spreads in a bacterial population because antibiotics:", ["Create resistance genes", "Select for bacteria that already carry resistance", "Teach bacteria to mutate", "Make bacteria reproduce faster"], 1, "Selection acts on existing variation; the antibiotic is the pressure, not the source of the mutation."),
  q.multi("gs-021", "gs-genetics", 3, "Which are evidence for evolution? Choose all that apply.", ["Fossil record", "Homologous structures", "DNA sequence similarity", "Similar behaviour in unrelated species"], [0, 1, 2], "Fossils, homology and molecular similarity are direct evidence. Convergent behaviour can arise independently."),

  /* ecology */
  q.num("gs-022", "gs-ecology", 2, "If producers capture 20,000 kJ of energy, how many kJ are approximately available to secondary consumers (10 % rule)?", 200, "20,000 → 2,000 (primary) → 200 kJ (secondary)."),
  q.mcq("gs-023", "gs-ecology", 2, "The carrying capacity of an environment is:", ["The maximum population it can sustain", "The number born each year", "The number of species present", "The area of the habitat"], 0, "K is the population size the environment's resources can sustain long term."),
  q.mcq("gs-024", "gs-ecology", 2, "A keystone species is one that:", ["Is the most numerous", "Has an effect on the ecosystem disproportionate to its abundance", "Lives only in one place", "Produces most of the oxygen"], 1, "Remove it and the community restructures dramatically."),
  q.mcq("gs-025", "gs-ecology", 2, "Eutrophication of a lake is caused mainly by:", ["Excess nutrients such as nitrogen and phosphorus", "A drop in temperature", "Too much oxygen", "Removal of algae"], 0, "Nutrient runoff triggers algal blooms whose decomposition depletes oxygen."),
  q.mcq("gs-026", "gs-ecology", 3, "Lichens are a partnership between algae and fungi where both benefit. This is:", ["Parasitism", "Mutualism", "Commensalism", "Competition"], 1, "Both partners benefit — mutualism."),
  q.mcq("gs-027", "gs-ecology", 2, "Which cycle has no significant atmospheric phase?", ["Carbon", "Nitrogen", "Phosphorus", "Water"], 2, "Phosphorus cycles through rock, soil and water, with no gas phase."),

  /* chemistry */
  q.mcq("gs-028", "gs-chem", 2, "The atomic number of an element equals its number of:", ["Neutrons", "Protons", "Protons plus neutrons", "Electrons in the outer shell"], 1, "Z = number of protons, which defines the element."),
  q.mcq("gs-029", "gs-chem", 2, "An isotope of an element differs in the number of:", ["Protons", "Neutrons", "Electrons in bonding", "Charges"], 1, "Isotopes have the same protons but different neutrons (and therefore mass number)."),
  q.mcq("gs-030", "gs-chem", 2, "Sodium transfers an electron to chlorine. The bond formed is:", ["Covalent", "Ionic", "Metallic", "Hydrogen"], 1, "Transfer of electrons between a metal and a non-metal forms an ionic bond."),
  q.mcq("gs-031", "gs-chem", 2, "Elements in Group 17 (halogens) have how many valence electrons?", ["1", "2", "7", "8"], 2, "Halogens have seven valence electrons and readily gain one."),
  q.mcq("gs-032", "gs-chem", 3, "Which is a balanced equation?", ["H₂ + O₂ → H₂O", "2H₂ + O₂ → 2H₂O", "H₂ + O₂ → 2H₂O", "2H₂ + 2O₂ → H₂O"], 1, "Four hydrogen and two oxygen atoms appear on each side."),
  q.mcq("gs-033", "gs-chem", 2, "A solution with pH 3 compared with pH 4 is:", ["Twice as acidic", "Ten times as acidic", "Half as acidic", "Equally acidic"], 1, "pH is logarithmic: one unit is a factor of 10."),
  q.mcq("gs-034", "gs-chem", 2, "Acid + base → ", ["Hydronium + hydrogen", "Salt + water", "Metal + oxygen", "Ester + water"], 1, "Neutralisation produces a salt and water."),
  q.mcq("gs-035", "gs-chem", 3, "Powdering a solid reactant speeds up the reaction because it:", ["Increases temperature", "Increases surface area and therefore collision frequency", "Lowers activation energy", "Adds a catalyst"], 1, "More exposed surface area means more collisions per second."),
  q.multi("gs-036", "gs-chem", 3, "Which factors increase the rate of a chemical reaction? Choose all that apply.", ["Higher temperature", "Higher concentration", "A catalyst", "Adding an inhibitor"], [0, 1, 2], "Temperature, concentration, surface area and catalysts increase rate; inhibitors decrease it."),
  q.num("gs-037", "gs-chem", 2, "How many moles are in 36 g of water (molar mass 18 g/mol)?", 2, "n = 36/18 = 2 mol."),

  /* physics */
  q.num("gs-038", "gs-physics", 2, "A car travels 150 km in 2 hours. What is its average speed in km/h?", 75, "v = d/t = 150/2 = 75 km/h."),
  q.num("gs-039", "gs-physics", 2, "A 10 kg object accelerates at 3 m/s². What net force acts on it, in newtons?", 30, "F = ma = 10 × 3 = 30 N."),
  q.mcq("gs-040", "gs-physics", 2, "A ball is dropped from a height. Just before impact, its energy is mostly:", ["Potential", "Kinetic", "Chemical", "Nuclear"], 1, "Gravitational potential energy is converted to kinetic energy during the fall."),
  q.num("gs-041", "gs-physics", 3, "A 2 kg object moves at 4 m/s. What is its kinetic energy in joules?", 16, "KE = ½mv² = ½ × 2 × 16 = 16 J."),
  q.mcq("gs-042", "gs-physics", 3, "Doubling a car's speed changes its kinetic energy by a factor of:", ["2", "4", "1/2", "8"], 1, "KE ∝ v², so doubling v multiplies energy by 4."),
  q.mcq("gs-043", "gs-physics", 2, "Newton's third law states that:", ["Force equals mass times acceleration", "An object in motion stays in motion", "Every action has an equal and opposite reaction", "Energy is conserved"], 2, "Third law: forces always occur in equal and opposite pairs."),
  q.mcq("gs-044", "gs-physics", 2, "Sound cannot travel through:", ["Steel", "Water", "Air", "A vacuum"], 3, "Sound is a mechanical wave and needs a medium; light does not."),
  q.num("gs-045", "gs-physics", 3, "A wave has frequency 50 Hz and wavelength 4 m. What is its speed in m/s?", 200, "v = fλ = 50 × 4 = 200 m/s."),
  q.mcq("gs-046", "gs-physics", 2, "A convex lens causes parallel light rays to:", ["Converge to a focus", "Diverge", "Travel straight through", "Reflect back"], 0, "A convex (converging) lens brings parallel rays to a focal point."),
  q.mcq("gs-047", "gs-physics", 2, "Which electromagnetic wave has the shortest wavelength?", ["Radio", "Infrared", "Visible", "Gamma"], 3, "Gamma rays have the shortest wavelength and highest energy."),
  q.num("gs-048", "gs-physics", 3, "A resistor of 20 Ω carries 2 A. What is the voltage across it?", 40, "V = IR = 2 × 20 = 40 V."),
  q.num("gs-049", "gs-physics", 3, "A device uses 60 J of energy in 5 s. What is its power in watts?", 12, "P = W/t = 60/5 = 12 W."),
  q.mcq("gs-050", "gs-physics", 3, "Two identical resistors in parallel compared with the same two in series will give a total resistance that is:", ["Higher", "Lower", "The same", "Zero"], 1, "Parallel paths reduce total resistance; it is always less than the smallest branch."),
  q.mcq("gs-051", "gs-physics", 2, "Friction converts kinetic energy mainly into:", ["Light", "Heat", "Chemical energy", "Sound only"], 1, "Friction does work against motion and raises the temperature of both surfaces."),
  q.mcq("gs-052", "gs-physics", 3, "An electric motor converts:", ["Electrical energy to mechanical energy", "Mechanical to electrical", "Chemical to electrical", "Light to chemical"], 0, "A motor uses magnetic forces on a current to produce motion; a generator does the reverse."),

  /* earth & space */
  q.mcq("gs-053", "gs-earth", 2, "The layer of Earth that generates the magnetic field is the:", ["Crust", "Mantle", "Outer core", "Inner core"], 2, "Convection of liquid iron-nickel in the outer core generates the geodynamo."),
  q.mcq("gs-054", "gs-earth", 2, "New oceanic crust forms at:", ["Transform boundaries", "Divergent boundaries", "Convergent boundaries", "Hotspots only"], 1, "Plates separate at divergent boundaries and magma rises to fill the gap."),
  q.mcq("gs-055", "gs-earth", 2, "Marble is a metamorphic rock formed from:", ["Sandstone", "Limestone", "Granite", "Basalt"], 1, "Heat and pressure recrystallise limestone into marble."),
  q.mcq("gs-056", "gs-earth", 2, "The layer of the atmosphere containing the ozone layer is the:", ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"], 1, "Stratospheric ozone absorbs most ultraviolet radiation."),
  q.mcq("gs-057", "gs-climate", 3, "The greenhouse effect works because greenhouse gases:", ["Reflect incoming sunlight", "Absorb and re-emit outgoing infrared radiation", "Block ultraviolet light", "Cool the upper atmosphere only"], 1, "They are transparent to visible light but absorb outgoing infrared, warming the surface."),
  q.mcq("gs-058", "gs-earth", 2, "Seasons on Earth are caused by:", ["Distance from the Sun", "Earth's axial tilt", "The Moon's gravity", "Solar flares"], 1, "A 23.5° tilt changes the angle and duration of sunlight through the year."),
  q.mcq("gs-059", "gs-earth", 3, "Spring tides occur when:", ["The Sun and Moon are at right angles", "The Sun, Moon and Earth are aligned", "The Moon is at its farthest point", "Only the Sun acts on the tides"], 1, "Alignment at new and full moon combines solar and lunar pulls."),
  q.mcq("gs-060", "gs-earth", 2, "Which planet has a runaway greenhouse effect and the hottest surface?", ["Mercury", "Venus", "Mars", "Neptune"], 1, "Venus's thick CO₂ atmosphere traps heat at about 465 °C, hotter than Mercury."),
  q.mcq("gs-061", "gs-earth", 2, "Evidence supporting the Big Bang includes:", ["The fossil record", "Cosmic microwave background radiation and galactic redshift", "Plate tectonics", "The water cycle"], 1, "CMB radiation, redshift and light-element abundances are the primary evidence."),
  q.num("gs-062", "gs-earth", 3, "A rock layer contains 25 % of a parent isotope. How many half-lives have passed?", 2, "After 2 half-lives, 1/4 of the parent remains."),
  q.mcq("gs-063", "gs-earth", 2, "The epicentre of an earthquake is:", ["Where the energy is released underground", "The point on the surface directly above the focus", "The nearest tectonic plate boundary", "The location of the largest aftershock"], 1, "The focus is underground; the epicentre is directly above it on the surface."),
  q.tf("gs-064", "gs-practice", 2, "A single cold week proves that global climate change is not happening.", false, "Weather is short-term; climate is a decades-long statistical pattern. Local cold spells are expected within a warming trend."),
  q.mcq("gs-065", "gs-practice", 3, "A study finds a strong positive correlation between two variables. The correct conclusion is:", ["One variable causes the other", "They are associated; causation requires experimental evidence", "The data is wrong", "They are unrelated"], 1, "Correlation without a controlled experiment cannot establish causation."),
];
