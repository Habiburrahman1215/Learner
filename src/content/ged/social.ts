import type { Module, Subject } from "../types";
import { lesson } from "../md";

const S = "ged-social" as const;

const civics: Module = {
  id: "gss-civics",
  subject: S,
  title: "Civics & Government",
  summary: "Half the test: the Constitution, three branches, checks and balances, the Bill of Rights, federalism and the mechanics of elections.",
  icon: "gov",
  lessons: [
    lesson(
      S,
      "gss-civics",
      "gss-l1-constitution",
      "The Constitution and the three branches",
      13,
      ["gss-civics"],
      `
## Why the Constitution is the anchor document
The Constitution (1787, ratified 1788) replaced the Articles of Confederation, which had created a national government too weak to tax or to regulate trade. Its core moves:

1. **Separation of powers** into three branches.
2. **Checks and balances** so no branch dominates.
3. **Federalism** — power shared between national and state governments.
4. **A limited government** with enumerated powers and a process for amendment.

The **Preamble** names six purposes: form a more perfect union, establish justice, ensure domestic tranquility, provide for the common defence, promote the general welfare, secure the blessings of liberty.

## The three branches
| Branch | Main body | Power | Checks on it |
| --- | --- | --- | --- |
| **Legislative** | Congress (Senate 100, House 435) | Makes laws, declares war, controls the purse, ratifies treaties, confirms appointments | President's veto; Supreme Court's judicial review |
| **Executive** | President, Vice-President, cabinet, agencies | Enforces laws, commander-in-chief, treaties, pardons, veto | Congress overrides veto, refuses funding, confirms appointments; courts review |
| **Judicial** | Supreme Court (9) and federal courts | Interprets laws, **judicial review** | President appoints; Senate confirms; Congress sets jurisdiction and can amend the Constitution |

**Judicial review** — established in *Marbury v. Madison* (1803) — is the power of courts to strike down laws that violate the Constitution.

## How a bill becomes law
1. Introduced in the House or Senate.
2. Assigned to committee (where most bills die).
3. Floor debate and vote.
4. Must pass **both chambers**.
5. Conference committee reconciles differences.
6. President signs, vetoes, or does nothing.
7. A **two-thirds** vote in each chamber overrides a veto.

## The Bill of Rights (first ten amendments)
| # | Protection |
| --- | --- |
| 1 | Speech, religion, press, assembly, petition |
| 2 | Right to bear arms |
| 3 | No quartering of soldiers |
| 4 | No unreasonable searches and seizures; warrants |
| 5 | Grand jury, no double jeopardy, no self-incrimination, due process, just compensation |
| 6 | Speedy and public trial, impartial jury, counsel |
| 7 | Jury trial in civil cases |
| 8 | No cruel and unusual punishment, no excessive bail |
| 9 | Rights not enumerated are retained |
| 10 | Powers not delegated are reserved to the states or the people |

### Later amendments worth knowing
13th (abolished slavery), 14th (equal protection and due process; applied the Bill of Rights to states), 15th (voting regardless of race), 17th (direct election of senators), 19th (women's suffrage), 22nd (two-term limit), 24th (abolished poll tax), 26th (voting age 18).

## Federalism
Powers are **delegated** (national), **reserved** (state) and **concurrent** (shared).
- National: declare war, coin money, regulate interstate commerce, postal service.
- State: schools, local police, licences, elections, intrastate commerce.
- Shared: taxation, courts, law-making, borrowing.

The **Supremacy Clause** makes federal law supreme when the two conflict; the **10th Amendment** protects state authority.

## Landmark cases
| Case | Holding |
| --- | --- |
| Marbury v. Madison | Establishes judicial review |
| McCulloch v. Maryland | Federal bank is constitutional; states cannot tax federal institutions |
| Brown v. Board of Education | School segregation unconstitutional |
| Miranda v. Arizona | Right to be informed of rights before interrogation |
| Tinker v. Des Moines | Student symbolic speech protected |
| Gideon v. Wainwright | Right to counsel in criminal cases |
| Citizens United | Independent political spending by organisations protected as speech |
`,
      { subtitle: "Three branches, checks, Bill of Rights, federalism, cases", drill: ["gss-001"] },
    ),
    lesson(
      S,
      "gss-civics",
      "gss-l1-elections",
      "Elections, parties and civic participation",
      10,
      ["gss-civics"],
      `
## Elections in the United States
- **House**: 435 members, 2-year terms, apportioned by population.
- **Senate**: 100 members, 6-year staggered terms, 2 per state.
- **President**: 4-year term, maximum two elected terms (22nd Amendment), chosen by the **Electoral College**.
- **State and local**: governors, legislatures, mayors, school boards.

## The Electoral College
Each state gets electors equal to its House + Senate seats. Most states use winner-take-all. 270 of 538 electoral votes wins. Consequences:
- Candidates focus on competitive "swing" states.
- A candidate can win the popular vote and lose the electoral vote (as happened in 2000 and 2016).
- The House decides if no candidate reaches 270.

## Political parties
Two dominant parties, plus third parties that rarely win but can shift debate and split votes. Functions: recruit candidates, organise government, aggregate interests, mobilise voters.

## Voting and participation
Constitutional amendments have widened the franchise: 15th (race), 19th (sex), 23rd (DC in presidential elections), 24th (no poll tax), 26th (age 18).

Beyond voting, civic participation includes:
- contacting representatives, petitions
- protest, assembly, petitions, public comment
- joining interest groups, unions, advocacy organisations
- running for local office, serving on juries, volunteering
- political donations and campaign work
- using media and now social media to argue public cases

## Public opinion and media
- **Polling** depends on random sampling; the wording of a question can shift answers.
- **Media roles**: informing, agenda-setting, watchdog, and now amplifying misinformation.
- **Propaganda techniques** to recognise: bandwagon, glittering generalities, testimonials, card-stacking, name-calling, plain-folks appeals, transfer.
- **Bias vs perspective**: a perspective is unavoidable; bias is a systematic unfair weighting. Evaluating sources means checking authorship, evidence, currency and competing coverage.

## Interest groups and lobbying
Groups organise to influence policy through lobbying, litigation, campaign spending and grassroots mobilisation. They give concentrated interests louder voice than diffuse interests — a persistent criticism of the system.

## Local government
Counties, municipalities, school districts, special districts. Most direct contact between citizens and government happens here: zoning, roads, schools, water, police, permits.
`,
      { subtitle: "Electoral College, amendments, participation, media literacy", drill: ["gss-002"] },
    ),
  ],
};

const history: Module = {
  id: "gss-history",
  subject: S,
  title: "United States History",
  summary: "From colonisation to the civil rights movement — the eras, documents and turning points the test asks about.",
  icon: "scroll",
  lessons: [
    lesson(
      S,
      "gss-history",
      "gss-l2-history",
      "The American story in eras",
      14,
      ["gss-history"],
      `
## Colonial era (1607–1776)
Settlement, mercantilism, regional economies (New England shipping, Middle colonies grain, Southern cash crops), enslaved labour, and growing friction over taxation without representation. Key documents: Mayflower Compact, Declaration of Independence (1776) — natural rights, consent of the governed, right of revolution.

## Revolution and founding (1776–1800)
Revolutionary War, Articles of Confederation, Constitutional Convention 1787, the Federalist/Anti-Federalist debate, the Bill of Rights (1791), and the early republic's precedents (Washington's cabinet, federalism disputes).

## Expansion and reform (1800–1860)
Louisiana Purchase (1803), westward expansion and Manifest Destiny, industrialisation in the North, the cotton economy and the internal slave trade in the South, reform movements (abolition, temperance, women's rights — Seneca Falls 1848), and the sectional crisis over whether new territories would be slave or free.

## Civil War and Reconstruction (1861–1877)
Causes: slavery's expansion, states' rights arguments, economic divergence, electoral realignment. The Emancipation Proclamation (1863) and the 13th, 14th and 15th Amendments. Reconstruction introduced then withdrew federal protection; **Black Codes**, **Jim Crow** segregation, and **sharecropping** replaced slavery economically and legally.

## Industrialisation and reform (1870–1920)
Railroads, steel, oil, mass immigration, urbanisation, labour unions, muckraking journalism, the Progressive movement, **16th** (income tax), **17th** (direct Senate election), **18th** (Prohibition) and **19th** (women's suffrage) Amendments, and the First World War.

## Boom, Bust and War (1920–1945)
Cultural modernism and the Harlem Renaissance, Prohibition and organised crime, the Great Depression after the 1929 crash, the **New Deal** (Social Security, banking reform, public works, labour rights), then the Second World War and the beginnings of the atomic age.

## Civil rights era (1945–1970)
Cold War, containment, Korean and Vietnam Wars, the **Brown** decision (1954), Montgomery bus boycott, the Civil Rights Act (1964), Voting Rights Act (1965), the Great Society, and the movement's expansion into other claims for equality. Coinciding: suburbanisation, the interstate highway system, and the Sun Belt shift.

## Modern era (1970–present)
Watergate and presidential accountability, deregulation, the end of the Cold War, globalisation, the digital revolution, 9/11 and the security state, and continuing debates over immigration, health care, and inequality.

## How the test uses history
Almost always through **documents and data**, not dates. You will be given a speech excerpt, a law, a chart or a photograph and asked:
- What was the author's point of view?
- What was the historical context?
- Which group would most likely support this?
- What was a consequence?

>> Dates help you place a document; they are almost never the answer by themselves.
`,
      { subtitle: "Seven eras, the documents, and how documents are tested", drill: ["gss-003"] },
    ),
  ],
};

const economics: Module = {
  id: "gss-econ",
  subject: S,
  title: "Economics",
  summary: "Scarcity, supply and demand, market structures, macroeconomic indicators and the tools governments use.",
  icon: "coins",
  lessons: [
    lesson(
      S,
      "gss-econ",
      "gss-l3-econ",
      "Scarcity, markets and macro indicators",
      12,
      ["gss-econ"],
      `
## Scarcity and choice
Resources are limited; wants are not. Every choice has an **opportunity cost** — the value of the next best alternative given up. This is the foundation of the whole discipline.

## Supply, demand and equilibrium
- **Law of demand**: as price rises, quantity demanded falls (other things equal).
- **Law of supply**: as price rises, quantity supplied rises.
- **Equilibrium**: where the curves cross.
- **Surplus** (excess supply) pushes price down; **shortage** (excess demand) pushes price up.
- **Shift vs movement**: a change in *price* moves you along the curve. A change in income, tastes, expectations, substitute prices, or number of buyers **shifts** the curve.

| Event | Effect |
| --- | --- |
| Input costs rise | Supply shifts left → higher price, lower quantity |
| Consumer income rises (normal good) | Demand shifts right → higher price, higher quantity |
| Price ceiling below equilibrium | Shortage, queues, black markets |
| Price floor above equilibrium | Surplus, unsold goods |

## Elasticity
Demand is **elastic** when quantity responds strongly to price (luxuries, goods with substitutes). **Inelastic** demand barely moves (insulin, fuel in the short run). Elastic demand means cutting price can raise total revenue; inelastic demand means raising price raises revenue.

## Market structures
| Structure | Features |
| --- | --- |
| Perfect competition | Many sellers, identical products, free entry |
| Monopolistic competition | Many sellers, differentiated products |
| Oligopoly | Few large firms, interdependence |
| Monopoly | One seller, high barriers to entry |

## Macro indicators
- **GDP** — total market value of final goods and services produced in a year. Nominal vs real (inflation-adjusted). GDP per capita is the usual welfare proxy.
- **Inflation** — a sustained rise in the general price level; measured by CPI. It reduces purchasing power and hurts savers and fixed-income earners.
- **Unemployment** — the share of the labour force actively seeking work. Types: frictional, structural, cyclical, seasonal. **Full employment** does not mean zero unemployment.
- **Business cycle** — expansion, peak, contraction, trough.

## Policy tools
| Tool | Who | Actions |
| --- | --- | --- |
| **Fiscal policy** | Government | Taxation and spending. Expansionary = spend more/tax less |
| **Monetary policy** | Central bank | Interest rates and money supply. Raise rates to fight inflation; lower to stimulate |

Higher interest rates reduce borrowing and spending and cool inflation, but slow growth. Lower rates stimulate but risk inflation.

## Trade
**Absolute advantage** — produce more with the same resources. **Comparative advantage** — lower opportunity cost. Comparative advantage explains why trade can benefit both parties even when one is better at everything.
Tariffs (taxes on imports) protect domestic producers but raise consumer prices. Trade agreements lower barriers and expand markets.

## Personal finance connections
Interest, compounding, credit, insurance and budgeting all reduce to the same concepts: risk, time and opportunity cost. Compound interest is exponential growth applied to money.
`,
      { subtitle: "Opportunity cost, equilibrium, GDP, inflation, policy", drill: ["gss-004"] },
    ),
  ],
};

const geography: Module = {
  id: "gss-geo",
  subject: S,
  title: "Geography & the World",
  summary: "Maps, regions, population, migration and the two-way relationship between people and environment.",
  icon: "map",
  lessons: [
    lesson(
      S,
      "gss-geo",
      "gss-l4-geo",
      "Maps, regions and human–environment interaction",
      11,
      ["gss-geo"],
      `
## Reading a map
- **Latitude** — horizontal, 0° at the Equator, up to 90° N/S.
- **Longitude** — vertical, 0° at the Prime Meridian, up to 180° E/W.
- **Scale** — the ratio between map and ground distance. A large-scale map (1:10,000) shows a small area in detail.
- **Legend/key** — what the symbols mean.
- **Projection** — every flat map distorts something (shape, area, distance or direction). Mercator preserves direction and distorts area near the poles.

| Map type | Shows |
| --- | --- |
| Physical | Terrain, rivers, elevation |
| Political | Borders, capitals |
| Thematic | One variable: population density, climate, language, crops |
| Choropleth | Shading by value per region |
| Isoline | Contours of equal value (elevation, temperature) |

## Regions
A region is an area with shared characteristics: **formal** (defined by a measurable trait), **functional** (organised around a node, e.g. a city's commuter zone), **perceptual** (a mental map, e.g. "the Midwest").

## Population
- **Population density** = people ÷ area.
- **Doubling time** ≈ 70 ÷ growth rate (%). This is the rule of 70.
- **Demographic transition**: high birth/death → falling death rates → falling birth rates → low birth/death.
- **Population pyramid** shape reveals history: a wide base means high birth rates; a narrow base means an ageing population.
- **Push and pull factors** drive migration: push = war, famine, unemployment, persecution; pull = jobs, safety, education, family.

## Human–environment interaction
| Concept | Example |
| --- | --- |
| Adaptation | Stilt houses in flood zones |
| Modification | Irrigation, terracing, dams, urbanisation |
| Dependency | Fishing communities, mining towns |
| Environmental impact | Deforestation, urban heat islands, groundwater depletion |

**Urbanisation** concentrates population in cities and creates pressure on housing, water, sanitation and transport. In Bangladesh, Dhaka's rapid growth, subsidence and monsoon flooding illustrate the interaction perfectly: the same river systems that make the delta fertile make the city vulnerable.

## Climate and biomes
Biomes are large ecosystems defined by climate: tropical rainforest, savanna, desert, temperate forest, grassland, taiga, tundra. Temperature and precipitation are the two controlling variables.

## Globalisation
Trade, investment, information and people cross borders faster than ever. Benefits: growth, technology transfer, cheaper goods. Costs: labour exploitation, environmental pressure, vulnerability to distant shocks.

## Reading a thematic map critically
Ask: what is the **unit**? Is it per capita or absolute? Is the projection distorting area? Which year? Does the colour scale start at zero? A map of "total GDP" makes large countries look rich; "GDP per capita" tells a different and often more useful story.
`,
      { subtitle: "Latitude, scale, regions, population, human impact", drill: ["gss-005"] },
    ),
  ],
};

export const gedSocialModules: Module[] = [civics, history, economics, geography];

export const gedSocialSubject: Subject = {
  id: "ged-social",
  track: "ged",
  title: "Social Studies",
  short: "Social",
  tagline: "GED · 70 minutes · documents and data",
  description:
    "Civics and government, US history, economics and geography — taught through the documents, charts and arguments the test actually presents.",
  icon: "globe2",
  hue: "#FF7A8A",
  hue2: "#FFC24B",
  exam: {
    label: "GED Social Studies simulation",
    minutes: 70,
    items: "35 items + 1 extended response",
    pass: "Pass 145 · College ready 165",
  },
  modules: gedSocialModules,
};
