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
    lesson(
      S,
      "gss-civics",
      "gss-l1-rights",
      "Civil liberties, civil rights and equal protection",
      12,
      ["gss-civics"],
      `
## Two ideas that sound alike but answer different questions
**Civil liberties** protect people from improper government interference: freedom of speech, religious exercise, due process and protection from unreasonable searches. **Civil rights** concern equal treatment and protection from discrimination. The ideas overlap, but they are not interchangeable.

A question about whether officials may punish peaceful criticism is about a liberty. A question about whether a public school may exclude a group is about equality and civil rights.

## The Constitution as a framework
The First Amendment protects speech, religion, press, assembly and petition. Rights are broad but not unlimited: for example, the government may impose content-neutral time, place and manner rules when they are narrowly designed and leave other ways to communicate. The Fourth Amendment protects against unreasonable searches; the Fifth and Fourteenth Amendments include due-process protections. The Fourteenth Amendment also guarantees equal protection.

## How rights became enforceable
The Bill of Rights originally constrained the federal government. Through the Fourteenth Amendment and Supreme Court decisions, most of those protections were applied to state governments over time. The GED may give a short case excerpt and ask what principle it illustrates—not require memorising every legal test.

| Case | Broad principle |
| --- | --- |
| *Brown v. Board* (1954) | State-mandated school segregation violates equal protection |
| *Gideon v. Wainwright* (1963) | Indigent defendants have a right to counsel in serious criminal cases |
| *Tinker v. Des Moines* (1969) | Students retain speech rights at school, subject to limits for substantial disruption |
| *Miranda v. Arizona* (1966) | People in custodial interrogation must be informed of key rights |

## Read a legal or historical excerpt
Find the government action, the affected person or group, the right or principle, and the court's reasoning. Distinguish the **holding** (the decision) from the reasoning that supports it. A case may protect a right in one setting without making that right unlimited in every setting.

## Evidence and counterclaims
A strong civic argument identifies a constitutional principle and applies it to specific facts. It does not assume that citing a right settles every dispute. Ask what the rule is, what facts matter, and how the source supports its conclusion.

! A school limits all leafleting to a designated area during class changes but allows distribution after school | The question is whether the rule is content-neutral and leaves a meaningful channel for speech | ⇒ do not jump from “speech is protected” to “every restriction is unconstitutional”

> **Check yourself:** Explain civil liberty versus civil right in one sentence each, then identify which idea fits a scenario about unequal access to a public service.
`,
      { subtitle: "Distinguish freedoms from equality protections and read cases carefully" },
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
    lesson(
      S,
      "gss-history",
      "gss-l2-historical-thinking",
      "Think like a historian: sources, context and cause",
      13,
      ["gss-history"],
      `
## Primary and secondary sources
A **primary source** was created during the time being studied or by someone directly involved: a letter, law, photograph, speech, diary, map or census table. A **secondary source** later interprets primary evidence: a textbook chapter or historian's essay. “Primary” does not mean unbiased or automatically accurate; it means close to the event in a particular way.

| Source question | What to inspect |
| --- | --- |
| Who created it? | Position, experience, authority and possible interests |
| When? | What was happening then? Was it written during or after the event? |
| For whom? | Private letter, public speech, official record or later audience? |
| Why? | Inform, persuade, justify, record, protest or remember? |
| What is missing? | Whose perspective is absent? What cannot this source establish? |

## Perspective is not the same as falsehood
A soldier's letter may reliably describe fear and confusion but not represent every soldier. A government poster reveals what officials wanted people to believe, not necessarily what everyone believed. Compare sources and look for independent corroboration before making a broad claim.

## Cause and effect
Historical events usually have **multiple causes**. Separate long-term conditions from immediate triggers, and distinguish causes from consequences. A timeline helps, but sequence alone does not prove causation.

! A recession follows a bank failure | The failure may have contributed, but check earlier economic conditions, policy decisions and other events | ⇒ “after” is not enough to prove “because of”

## Continuity and change
Ask what changed, what remained, who experienced the change, and over what time. The end of a law does not automatically end the social or economic practice it supported. For example, legal emancipation and later constitutional amendments transformed rights, while discriminatory systems and unequal access persisted in new forms.

## Reading historical data
Check the date range, units, population and scale before interpreting a chart. A total may rise because population grew; a per-person rate can tell a different story. A chart beginning at a nonzero baseline may visually magnify a small change.

## Build a defensible conclusion
Use the source, place it in context, then make the narrowest conclusion the evidence supports. If two sources disagree, identify whether they differ in facts, perspective, purpose or the group they represent. Do not treat a single quotation as a complete account of an era.

> **Check yourself:** A campaign speech praises a new law. What can it show about the speaker's goals? What additional source would you need to know whether the law changed people's lives?
`,
      { subtitle: "Primary and secondary evidence, chronology, cause and perspective" },
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
    lesson(
      S,
      "gss-econ",
      "gss-l3-personal-finance",
      "Personal finance: budgets, credit, interest and taxes",
      13,
      ["gss-econ"],
      `
## A budget is a plan for trade-offs
Income is money received; expenses are money spent. **Fixed costs** are relatively stable (rent, loan payment), while **variable costs** change (food, transport, utilities). Savings and debt payments should be planned, not treated as whatever remains by accident.

A simple monthly budget balances:
$ \\text{income} = \\text{expenses} + \\text{savings} + \\text{debt payments}

If expenses exceed income, a person must reduce costs, increase income, use savings, or borrow. Borrowing solves a timing problem but creates future obligations and a cost.

## Simple and compound interest
Simple interest is calculated on the original principal:
$ I = Prt

where P is principal, r is the annual rate as a decimal, and t is time in years. For $500 at 6% for 2 years, simple interest is 500 × 0.06 × 2 = $60.

Compound interest adds earned interest to the balance, so later interest is earned on a larger amount:
$ A = P(1 + r/n)^{nt}

At the same positive rate and time, compounding more often increases the final amount. The same mechanism helps savings grow and makes unpaid debt grow faster.

## Credit and the cost of borrowing
A loan's **principal** is the amount borrowed. The **APR** expresses yearly borrowing cost, including interest and certain fees. Compare total repayment, fees, rate type and term—not only the monthly payment. A longer term can reduce each payment while increasing total interest.

Credit reports describe borrowing and repayment history; a credit score summarises information using a scoring model. Paying on time and keeping balances manageable generally help, but no single action guarantees a particular score.

## Inflation and purchasing power
Inflation is a continuing rise in the general price level. If prices rise 5% while income rises 2%, real purchasing power falls approximately 3% over that period. A price increase in one product alone is not enough to establish economy-wide inflation.

## Taxes and public goods
Governments collect taxes to fund services and public goods. A **progressive** income-tax structure takes a larger share from higher incomes; a **proportional** tax uses the same rate; a **regressive** tax takes a larger share of income from lower-income households. Tax incidence asks who bears the cost in practice, which may differ from who legally sends the payment.

## Compare choices with evidence
When a question offers two loans or budgets, calculate the amount being compared and keep units consistent. Distinguish interest rate from total interest, percentage from percentage points, and monthly cost from lifetime cost.

! A $1,000 balance has a 12% annual simple interest rate for one year | Interest is $120, not $12 per month compounded | ⇒ identify the stated rate period and method before calculating

> **Check yourself:** If two loans have the same principal and APR but one lasts longer, which usually has the lower monthly payment—and which usually costs more in total interest?
`,
      { subtitle: "Budgeting, compounding, credit, inflation and tax structures" },
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
    lesson(
      S,
      "gss-geo",
      "gss-l4-population-maps",
      "Population maps, migration and demographic change",
      12,
      ["gss-geo"],
      `
## Read the map before the pattern
Before interpreting a choropleth (a map shaded by region), read the title, legend, units, dates and source. A map of **total population** answers a different question from **population density** or **population growth rate**. Large areas can dominate a total even when few people live there.

Ask whether the colour intervals are equal. A map with categories 0–10, 10–20, 20–100 can make regions look more comparable than they are. Check whether the scale starts at zero and whether a map uses absolute numbers or percentages.

## Population distribution and density
Population is rarely spread evenly. People tend to cluster around water, fertile land, jobs, transport routes and services, while climate, terrain, hazards and conflict can discourage settlement.

$ \\text{population density} = \\frac{\\text{number of people}}{\\text{land area}}

A country can have a large population and low average density if it has a large area. A national average can also hide dense cities and sparsely populated regions.

## Migration: causes and effects
Migration is movement from one place to another. **Push factors** encourage departure (war, persecution, disaster, lack of work); **pull factors** attract people (safety, family, education, jobs). Many moves involve several factors and constraints, not one simple cause.

Migration can change both origin and destination: labour supply, age structure, language, housing demand, remittances and local services. Avoid assuming every migrant has the same experience or motive.

## Demographic transition
The demographic transition model describes broad patterns as societies industrialise:
- early stages: high birth and death rates, slow population growth;
- death rates fall as sanitation, food and medicine improve;
- birth rates later fall, so growth slows;
- in some highly industrialised places, low birth rates and longer lives produce an ageing population.

This is a model, not a prediction that every country follows an identical path. Read the data given in the question rather than forcing a country into a stage based on a stereotype.

## Population pyramids
A wide base usually indicates many children and higher recent birth rates. A narrow base and wider older bands can indicate lower birth rates and ageing. A sudden notch may reflect war, migration, disease or a change in birth rates; a pyramid alone cannot tell you which cause is responsible.

## Connect geography with evidence
When comparing regions, ask what is measured, for which years, and whether the comparison is fair. Use rates per person or per area when totals would mislead. A map can reveal a pattern; it cannot, by itself, explain the cause.

> **Check yourself:** A map shows more road deaths in a large state than a small state. What additional measure—such as deaths per resident or per kilometre driven—would make the comparison more meaningful?
`,
      { subtitle: "Read map scales and connect population patterns to evidence" },
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
