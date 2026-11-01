import type { Module, Subject } from "../types";
import { lesson } from "../md";

const S = "ged-math" as const;

const numberQuantity: Module = {
  id: "gm-number",
  subject: S,
  title: "Number & Quantity",
  summary: "Fractions, decimals, percents, ratios, rates, exponents and scientific notation — the arithmetic the whole test leans on.",
  icon: "hash",
  lessons: [
    lesson(
      S,
      "gm-number",
      "gm-l1-fractions",
      "Fractions, decimals and percents",
      12,
      ["gm-number", "gm-percent"],
      `
## One quantity, three costumes
$ \\frac{3}{4} = 0.75 = 75\\%

Converting:
- Fraction → decimal: divide the numerator by the denominator.
- Decimal → percent: multiply by 100 (move the point two places right).
- Percent → decimal: divide by 100.
- Percent → fraction: put it over 100 and simplify.

## The four fraction operations
| Operation | Rule | Example |
| --- | --- | --- |
| Add / subtract | Same denominator, then add numerators | 2/5 + 1/5 = 3/5 |
| Add unlike denominators | Use the LCD | 1/3 + 1/4 = 4/12 + 3/12 = 7/12 |
| Multiply | Multiply across, simplify first | 2/3 × 9/8 = 18/24 = 3/4 |
| Divide | Multiply by the reciprocal | 3/5 ÷ 2/7 = 3/5 × 7/2 = 21/10 |

When multiplying, **cancel before you multiply** — it keeps numbers small and is far less error-prone than simplifying a huge result.

## Percent: the three questions
Every percent problem is one of these:
1. **Find the part**: what is 15 % of 240? → 0.15 × 240 = 36
2. **Find the percent**: 36 is what percent of 240? → 36 ÷ 240 = 0.15 = 15 %
3. **Find the whole**: 36 is 15 % of what? → 36 ÷ 0.15 = 240

$ part = percent × whole

## Percent change
$ \\text{percent change} = \\frac{\\text{new} - \\text{old}}{\\text{old}} × 100\\%

! A jacket drops from 2,400 to 1,680 taka | Difference = −720 | 720 ÷ 2400 = 0.30 | ⇒ a 30 % decrease. Note the denominator is always the ORIGINAL value.

### Percent change traps
- "Increase by 20 %, then decrease by 20 %" does **not** return to the start. 100 → 120 → 96.
- Percentages of **different wholes** cannot be added directly. 50 % of 100 and 10 % of 400 are 50 and 40.
- "Percent more than" and "percent of" differ: a price 25 % more than 80 is 100; a price that is 25 % of 80 is 20.

## Ratios and proportions
A ratio compares two quantities: 3 : 5 means 3 parts to 5 parts, total 8 parts.
$ \\frac{a}{b} = \\frac{c}{d} \\Rightarrow ad = bc

! A recipe uses 3 cups of rice for 8 people. Cups for 20 people? | Set up 3/8 = x/20 | Cross-multiply: 8x = 60 | ⇒ x = 7.5 cups

**Part-to-part vs part-to-whole** is the most common ratio error. If red : blue = 2 : 3, then red is **2/5** of the total, not 2/3.

## Unit rates
A unit rate is a ratio with a denominator of 1: km per litre, taka per kg, words per minute. It converts a shopping problem into a single comparable number.

! 12 kg of rice costs 900 taka; 5 kg costs 400 taka | 900 ÷ 12 = 75 taka/kg | 400 ÷ 5 = 80 taka/kg | ⇒ the 12 kg bag is the better value

## Order of operations
**PEMDAS**: Parentheses → Exponents → Multiplication and Division (left to right) → Addition and Subtraction (left to right).

! Evaluate 8 + 2 × (5 − 3)² | Parentheses: 2 | Exponent: 4 | Multiply: 8 | ⇒ 8 + 8 = 16. Without the order you would get 100.

## Rounding and estimation
Round only at the **last** step; rounding mid-calculation compounds error. On the GED, estimation is often enough to eliminate three choices — especially with calculator-free questions.
`,
      { subtitle: "Convert fluently, handle percent change, set up proportions", drill: ["gm-001", "gm-002"] },
    ),
    lesson(
      S,
      "gm-number",
      "gm-l1-exponents",
      "Exponents, roots and scientific notation",
      10,
      ["gm-number"],
      `
## Exponent rules
$ a^m × a^n = a^{m+n} \\quad \\frac{a^m}{a^n} = a^{m-n} \\quad (a^m)^n = a^{mn}
$ (ab)^n = a^n b^n \\quad \\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n} \\quad a^0 = 1 \\ (a \\ne 0) \\quad a^{-n} = \\frac{1}{a^n}

- A **negative exponent** is a reciprocal, not a negative number: 2⁻³ = 1/8.
- A **fractional exponent** is a root: 9^(1/2) = 3, 8^(1/3) = 2.
- You can only add or subtract terms with **like bases and like exponents**: 3x² + 5x² = 8x², but 3x² + 5x stays as it is.

## Square roots
- √(a × b) = √a × √b, so √50 = √25 × √2 = 5√2.
- √(a²) = |a|.
- Perfect squares to know: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225.
- Estimating: √40 is between 6 (36) and 7 (49), closer to 6.3.

## Scientific notation
$ N × 10^k \\quad \\text{where } 1 \\le N < 10

- 45,300 = 4.53 × 10⁴
- 0.00072 = 7.2 × 10⁻⁴
- Multiply: multiply the coefficients, **add** the exponents.
- Divide: divide the coefficients, **subtract** the exponents.
- Add/subtract: rewrite both numbers with the **same** exponent first.

! Multiply (3 × 10⁵)(2 × 10⁻³) | Coefficients: 3 × 2 = 6 | Exponents: 5 + (−3) = 2 | ⇒ 6 × 10² = 600

## Absolute value
|x| is the distance from 0, so it is never negative. |−7| = 7.
Solving |x| = 5 gives **two** solutions: x = 5 or x = −5.

## Real-world place value questions
The GED loves questions like "which digit is in the thousandths place" or "a number rounded to the nearest ten thousand". Line the digits up under place-value headers before answering; do not do it in your head.

| | thousands | hundreds | tens | units | . | tenths | hundredths | thousandths |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 4,285.137 | 4 | 2 | 8 | 5 | . | 1 | 3 | 7 |
`,
      { subtitle: "Exponent laws, roots and scientific notation without a calculator", drill: ["gm-003"] },
    ),
  ],
};

const algebra: Module = {
  id: "gm-algebra",
  subject: S,
  title: "Algebra & Functions",
  summary: "The largest domain on the test (over half the marks): expressions, linear equations, inequalities, functions, systems and quadratics.",
  icon: "function",
  lessons: [
    lesson(
      S,
      "gm-algebra",
      "gm-l2-expressions",
      "Expressions, equations and solving for x",
      13,
      ["gm-algebra"],
      `
## Expression vs equation
- An **expression** has no equals sign: 3x + 5. You simplify it.
- An **equation** has an equals sign: 3x + 5 = 20. You solve it.

You can only "solve" an equation. Simplifying an expression by adding "= 0" invents information that was not given.

## Simplifying
1. Remove parentheses with the **distributive property**: a(b + c) = ab + ac.
2. Combine **like terms** (same variable, same exponent).
3. Watch signs, especially when subtracting a bracket: −(2x − 5) = −2x + 5.

! Simplify 4(2x − 3) − 2(x + 5) | Distribute: 8x − 12 − 2x − 10 | Combine | ⇒ 6x − 22

## Solving a linear equation
Whatever you do to one side, do to the other. The goal is x alone.

1. Clear fractions by multiplying every term by the LCD.
2. Distribute and simplify both sides.
3. Collect variable terms on one side, constants on the other.
4. Divide by the coefficient.

! Solve 3(x − 4) = 2x + 7 | Distribute: 3x − 12 = 2x + 7 | Subtract 2x: x − 12 = 7 | Add 12 | ⇒ x = 19. Check: 3(15) = 45 and 2(19) + 7 = 45 ✓

## Equations with fractions
$ \\frac{x}{4} + \\frac{x}{6} = 5

Multiply all terms by 12 (the LCD): 3x + 2x = 60 → 5x = 60 → x = 12.

## Proportions and literal equations
A **literal equation** has several letters; you isolate one of them.
- Solve for h: A = ½bh → multiply by 2: 2A = bh → divide by b: h = 2A/b.
- This is exactly the skill tested by "solve the formula for the indicated variable" questions and by every geometry formula question.

## Translating words into algebra
| Words | Algebra |
| --- | --- |
| sum, plus, increased by, more than | + |
| difference, minus, decreased by, less than | − |
| product, times, of | × |
| quotient, per, divided by | ÷ |
| is, was, results in, gives | = |
| a number | x |

**"5 less than x" is x − 5, not 5 − x.** Order reversal is the most-tested trap in translating English into algebra.

! A taxi charges 60 taka plus 35 taka per km. A trip costs 410 taka. Distance? | 60 + 35k = 410 | 35k = 350 | ⇒ k = 10 km

## Checking your answer
Substitute it back. On a timed test, checking takes 10 seconds and catches most sign errors. Also ask: *is the answer sensible?* A distance of −4 km means you made a mistake, even before you check the algebra.
`,
      { subtitle: "Distribute, combine, isolate — and translate English to algebra", drill: ["gm-004", "gm-005"] },
    ),
    lesson(
      S,
      "gm-algebra",
      "gm-l2-inequalities",
      "Inequalities and compound conditions",
      9,
      ["gm-algebra"],
      `
## Inequalities solve like equations — with one twist
$ \\text{If you multiply or divide by a negative, FLIP the inequality sign.}

! Solve −3x + 4 ≥ 19 | Subtract 4: −3x ≥ 15 | Divide by −3 and flip | ⇒ x ≤ −5

The solution set is graphed on a number line: a **closed** dot for ≤ or ≥, an **open** dot for < or >.

## Reading inequality language
| Phrase | Symbol |
| --- | --- |
| at least, no less than, minimum | ≥ |
| at most, no more than, maximum | ≤ |
| more than, exceeds | > |
| fewer than, below | < |
| between 5 and 9 inclusive | 5 ≤ x ≤ 9 |

## Two-variable inequalities
y > 2x + 1 is a **half-plane**: draw the boundary line y = 2x + 1 dashed (because the inequality is strict), then shade above it (because y is greater). Test a point like (0, 0) to confirm which side.

## Systems of inequalities
The solution is the **overlap** of the shaded regions. GED questions usually ask you to identify which ordered pair is a solution — the most reliable method is simply to **test each candidate pair in both inequalities**.

## Absolute value inequalities
|x| < 3 means −3 < x < 3 (a band).
|x| > 3 means x < −3 **or** x > 3 (two outer regions).

## Word problems with a ceiling
! A delivery van holds at most 1,200 kg. Each crate weighs 45 kg and the driver weighs 80 kg. Maximum crates? | 45c + 80 ≤ 1200 | 45c ≤ 1120 | c ≤ 24.88 | ⇒ 24 crates, because crates are whole objects.

That last step — rounding **down** for "at most", and **up** for "at least" — is worth a mark on its own.
`,
      { subtitle: "Flip the sign, graph the set, round the right way", drill: ["gm-006"] },
    ),
    lesson(
      S,
      "gm-algebra",
      "gm-l3-lines",
      "Linear functions, slope and graphing",
      14,
      ["gm-algebra", "gm-functions"],
      `
## Slope is rate of change
$ m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{rise}}{\\text{run}}

- Positive slope: rises left to right.
- Negative slope: falls.
- Zero slope: horizontal line (y = 3).
- **Undefined** slope: vertical line (x = 3).

! Slope through (2, 5) and (6, 13) | (13 − 5)/(6 − 2) = 8/4 | ⇒ m = 2

## Three forms of a line
| Form | Equation | You see immediately |
| --- | --- | --- |
| Slope-intercept | y = mx + b | slope m, y-intercept b |
| Point-slope | y − y₁ = m(x − x₁) | slope and one point |
| Standard | Ax + By = C | easy to find intercepts |

Convert standard to slope-intercept by solving for y: 2x + 3y = 12 → y = −(2/3)x + 4.

## Intercepts
- **y-intercept**: set x = 0.
- **x-intercept**: set y = 0.
In a word problem the y-intercept is usually the **starting value** (fixed fee, initial height) and the slope is the **rate** (cost per unit, speed). Interpreting them in context is a recurring GED question type.

## Parallel and perpendicular
- Parallel lines: **same slope**.
- Perpendicular lines: slopes are **negative reciprocals** (m₁ × m₂ = −1). A line perpendicular to slope 3 has slope −1/3.

## Writing an equation from a description
1. Find the slope (rate of change).
2. Find the y-intercept (starting value).
3. Write y = mx + b.

! A plumber charges 500 taka to come out plus 350 taka per hour. | Rate = 350 → m | Start = 500 → b | ⇒ y = 350x + 500, where x = hours and y = total charge.

## Function notation
f(x) = 3x − 4 means "the output when the input is x".
- f(5) = 3(5) − 4 = 11.
- "Find x when f(x) = 20" → 3x − 4 = 20 → x = 8.
The two directions — evaluate and solve — are tested separately and confuse students who only practise one.

## Reading a graph like a story
- Where the line is **flat**, nothing is changing (a pause, a rest stop).
- Where the line is **steepest**, the rate is highest (fastest speed, most expensive plan).
- Where it crosses the x-axis, the value is zero (arrived home, paid off).
- Two lines crossing = two options costing the same at that point.

## Systems of two linear equations
| Method | Best when |
| --- | --- |
| Substitution | One equation already solved for a variable |
| Elimination | Coefficients are easy to match |
| Graphing | Both are in slope-intercept form and the answer is a lattice point |

! Solve x + y = 10 and x − y = 2 | Add: 2x = 12 → x = 6 | Then y = 4 | ⇒ (6, 4). Check: 6 + 4 = 10 and 6 − 4 = 2 ✓

Three possible outcomes: **one solution** (lines cross), **no solution** (parallel — same slope, different intercept), **infinitely many** (same line). A GED question may ask you to spot which case applies **without** solving.
`,
      { subtitle: "Slope, three line forms, intercepts, functions, systems", drill: ["gm-007", "gm-008"] },
    ),
    lesson(
      S,
      "gm-algebra",
      "gm-l4-quadratics",
      "Polynomials, quadratics and exponential growth",
      12,
      ["gm-algebra", "gm-functions"],
      `
## Polynomial arithmetic
- **Add/subtract**: match like terms.
- **Multiply**: distribute every term. (x + 3)(x − 5) = x² − 5x + 3x − 15 = x² − 2x − 15 — or use **FOIL** (First, Outer, Inner, Last).
- **Special products**: (a + b)² = a² + 2ab + b². It is **not** a² + b². This single mistake appears on nearly every algebra test ever written.

## Factoring
1. Always take out the **GCF** first: 6x² + 9x = 3x(2x + 3).
2. For x² + bx + c, find two numbers that multiply to c and add to b.
3. For ax² + bx + c, use grouping or trial.
4. **Difference of squares**: a² − b² = (a + b)(a − b). So x² − 49 = (x + 7)(x − 7).

! Factor x² − 5x − 24 | Two numbers multiplying to −24 and adding to −5 | −8 and +3 | ⇒ (x − 8)(x + 3)

## Solving quadratics
- **Factoring + zero product**: if (x − 8)(x + 3) = 0 then x = 8 or x = −3.
- **Quadratic formula**:
$ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
- **Graphing**: the solutions are the x-intercepts.

A quadratic has two, one, or zero real solutions — the **discriminant** b² − 4ac tells you which: positive → two, zero → one, negative → none.

## Parabolas
y = ax² + bx + c is a parabola.
- a > 0 opens up (minimum), a < 0 opens down (maximum).
- The **vertex** is the maximum or minimum — exactly what projectile and profit questions ask for.
- Vertex x-coordinate: x = −b/(2a).
- The **axis of symmetry** is the vertical line through the vertex.

## Exponential growth and decay
$ y = a(1 + r)^t \\quad \\text{(growth)} \\qquad y = a(1 - r)^t \\quad \\text{(decay)}

- a = starting amount, r = rate per period, t = number of periods.
- **Linear** changes by a constant **amount**; **exponential** changes by a constant **ratio**.
- Doubling, population growth, compound interest, radioactive decay and depreciation are all exponential.

! A phone worth 40,000 taka loses 20 % per year. Value after 2 years? | 40,000(0.8)² | = 40,000 × 0.64 | ⇒ 25,600 taka

## Compound vs simple interest
$ \\text{Simple: } I = Prt \\qquad \\text{Compound: } A = P(1 + r/n)^{nt}

Simple interest pays on the principal only; compound pays on the accumulated total. Over long periods the difference is dramatic — which is why "which account earns more" questions exist.
`,
      { subtitle: "FOIL, factor, quadratic formula, vertex and exponential models", drill: ["gm-009", "gm-010"] },
    ),
  ],
};

const geometry: Module = {
  id: "gm-geometry",
  subject: S,
  title: "Geometry & Measurement",
  summary: "Area, perimeter, volume, the Pythagorean theorem, similar figures and coordinate geometry — with the formula sheet you are given.",
  icon: "shapes",
  lessons: [
    lesson(
      S,
      "gm-geometry",
      "gm-l5-area",
      "Perimeter, area and circles",
      12,
      ["gm-geometry"],
      `
## The formulas you are given (and must still know how to use)
| Shape | Perimeter / circumference | Area |
| --- | --- | --- |
| Rectangle | 2(l + w) | l × w |
| Square | 4s | s² |
| Triangle | a + b + c | ½ b h |
| Parallelogram | 2(a + b) | b h |
| Trapezoid | a + b + c + d | ½(b₁ + b₂)h |
| Circle | C = 2πr = πd | A = πr² |

- **Height is always perpendicular** to the base. A slanted side is not a height.
- **π ≈ 3.14** or 22/7. On the calculator section use the π key.
- Radius = half the diameter. Using the diameter in A = πr² is the most common circle error.

! A circle has diameter 10 cm. Area? | r = 5 | A = π(5)² = 25π | ⇒ ≈ 78.5 cm²

## Composite shapes
Break the figure into shapes from the table, find each area, then **add** — or **subtract** a cut-out from a larger shape. Shaded-region questions are almost always "big shape minus small shape".

! A 12 × 8 cm rectangle has a circle of diameter 6 cm removed | Rectangle: 96 | Circle: π(3)² ≈ 28.3 | ⇒ shaded ≈ 67.7 cm²

## Units and conversions
| Convert | Multiply by |
| --- | --- |
| m → cm | 100 |
| m → mm | 1000 |
| km → m | 1000 |
| cm² → m² | ÷ 10,000 |
| m³ → litres | × 1000 |
| inch → cm | × 2.54 |
| ft → m | × 0.3048 |
| kg → lb | × 2.205 |

Areas scale by the **square** of the length factor; volumes by the **cube**. Double the radius of a circle and its area goes up **four times**; double the side of a cube and its volume goes up **eight times**.

## Surface area
- Rectangular prism: SA = 2(lw + lh + wh)
- Cylinder: SA = 2πr² + 2πrh (two circles plus the wrapped rectangle)
- Cube: SA = 6s²

Surface area is measured in **square** units and answers questions about paint, wrapping, plating and heat transfer. Volume answers how much fits inside.

## Volume
| Solid | Volume |
| --- | --- |
| Rectangular prism | l w h |
| Cylinder | πr²h |
| Cone | (1/3)πr²h |
| Sphere | (4/3)πr³ |
| Pyramid | (1/3) × base area × h |

A cone or pyramid is exactly **one third** of the prism or cylinder with the same base and height — a fact that answers many comparison questions without any calculation.
`,
      { subtitle: "All the area and volume formulas, plus unit scaling", drill: ["gm-011", "gm-012"] },
    ),
    lesson(
      S,
      "gm-geometry",
      "gm-l5-triangles",
      "Angles, triangles and the Pythagorean theorem",
      11,
      ["gm-geometry"],
      `
## Angle facts
- Angles on a straight line sum to **180°**.
- Angles around a point sum to **360°**.
- Vertical (opposite) angles are equal.
- Parallel lines cut by a transversal: **corresponding** angles equal, **alternate interior** angles equal, **co-interior** angles sum to 180°.

## Triangles
- Interior angles sum to **180°**.
- **Equilateral**: all sides and all angles 60°.
- **Isosceles**: two equal sides, and the angles opposite them are equal.
- **Scalene**: everything different.
- The longest side is opposite the largest angle.
- **Exterior angle** = sum of the two opposite interior angles.

## Triangle inequality
Any two sides must add to more than the third. Sides 3, 4, 9 cannot form a triangle because 3 + 4 < 9.

## Pythagorean theorem
$ a^2 + b^2 = c^2 \\quad (c = \\text{hypotenuse, opposite the right angle})

Common triples worth memorising: **3-4-5**, **5-12-13**, **8-15-17**, **7-24-25**. Multiples work too: 6-8-10, 9-12-15.

! A 9 m ladder leans against a wall, its foot 4 m from the base. Height reached? | h² = 9² − 4² = 81 − 16 = 65 | ⇒ h = √65 ≈ 8.06 m

The converse also works: if a² + b² = c², the triangle **is** right-angled.

## Similar figures
Two triangles are similar if their angles match (AA is enough). Then:
- Corresponding sides are in the same **ratio** (scale factor k).
- **Areas** are in the ratio k².
- **Volumes** are in the ratio k³.

! Two similar triangles have sides in ratio 3:5 | Area ratio = 9 : 25 | ⇒ the larger has 25/9 ≈ 2.8× the area

## Special right triangles (bonus)
- **45-45-90**: sides x, x, x√2.
- **30-60-90**: sides x, x√3, 2x.
If you recognise these, you can skip the Pythagorean theorem entirely.

## Congruence and transformations
- Congruent = same shape **and** same size (area unchanged).
- Translations (slides), rotations and reflections preserve shape and size.
- Dilations change size but preserve shape → similar, not congruent.
`,
      { subtitle: "Angle rules, Pythagorean triples, similar-figure scaling", drill: ["gm-013", "gm-014"] },
    ),
    lesson(
      S,
      "gm-geometry",
      "gm-l5-coordinate",
      "Coordinate geometry and slope on the plane",
      9,
      ["gm-geometry", "gm-algebra"],
      `
## The coordinate plane
Point (x, y): x is horizontal (right positive), y is vertical (up positive). Quadrant I is top-right; the quadrants run counter-clockwise.

## Distance and midpoint
$ d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \\qquad M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)

! Distance from (1, 2) to (7, 10) | (6)² + (8)² = 36 + 64 = 100 | ⇒ d = 10

## Slope from a graph
Rise over run. Count squares rather than reciting formulas when a graph is given — it is faster and less error-prone.

## Equations of special lines
- Horizontal through (2, 5): **y = 5** (slope 0).
- Vertical through (2, 5): **x = 2** (slope undefined).
- The axes themselves: y = 0 and x = 0.

## Transformations in coordinates
| Transformation | Effect on (x, y) |
| --- | --- |
| Reflect over x-axis | (x, −y) |
| Reflect over y-axis | (−x, y) |
| Reflect over y = x | (y, x) |
| Translate right 3, up 2 | (x + 3, y + 2) |
| Rotate 90° clockwise about origin | (y, −x) |
| Rotate 180° | (−x, −y) |
| Dilate by factor k about origin | (kx, ky) |

Knowing these lets you answer transformation questions instantly instead of visualising each step.

## Perimeter and area on the grid
For a polygon on the grid: count the boundary for perimeter, and split into rectangles/triangles for area — or use the **shoelace formula** if you enjoy formulas:
$ A = \\frac{1}{2}\\left|(x_1y_2 + x_2y_3 + \\dots) - (y_1x_2 + y_2x_3 + \\dots)\\right|
`,
      { subtitle: "Distance, midpoint, special lines, transformations", drill: ["gm-015"] },
    ),
  ],
};

const data: Module = {
  id: "gm-data",
  subject: S,
  title: "Data, Statistics & Probability",
  summary: "Mean, median, spread, box plots, scatter plots, sampling and probability — reading data critically is a fifth of the test.",
  icon: "chart",
  lessons: [
    lesson(
      S,
      "gm-data",
      "gm-l6-center",
      "Centre and spread",
      11,
      ["gm-data", "gm-stats"],
      `
## Three measures of centre
| Measure | How | Best for |
| --- | --- | --- |
| **Mean** | sum ÷ count | Symmetrical data |
| **Median** | middle value when ordered | Skewed data or outliers |
| **Mode** | most frequent value | Categorical data |
| **Range** | max − min | Quick spread, but fragile |

! Data: 4, 7, 7, 9, 12, 30 | Mean = 69 ÷ 6 = 11.5 | Median = (7 + 9) ÷ 2 = 8 | Mode = 7 | ⇒ the outlier 30 pulls the mean far above the median, so the median describes "typical" better

**An outlier pulls the mean, not the median.** That single sentence answers a large share of GED statistics questions.

## Weighted mean
$ \\bar{x} = \\frac{\\sum (\\text{value} × \\text{weight})}{\\sum \\text{weights}}

! A student scores 80 on a test worth 30 % and 90 on a test worth 70 % | 0.3(80) + 0.7(90) = 24 + 63 | ⇒ 87

## Five-number summary and box plots
Minimum, Q1, median, Q3, maximum.

$ IQR = Q3 - Q1

- The box holds the middle **50 %** of the data.
- Each whisker holds roughly 25 %.
- An outlier is often defined as a value below Q1 − 1.5·IQR or above Q3 + 1.5·IQR.
- A **wider box** means more variability in the middle half.

## Standard deviation, conceptually
Standard deviation measures the typical distance of values from the mean. A larger SD means more spread. You rarely compute it by hand on the GED — you **compare** two distributions: the one with points further from its mean has the larger SD.

## Reading histograms and dot plots
- Histogram bars touch: the variable is continuous and bars are bins of equal width.
- Gaps in a dot plot show a value that does not occur.
- **Skew**: a long tail to the right means skewed right (mean > median). A long tail to the left means skewed left (mean < median).
- **Symmetric** distributions have mean ≈ median.

## Comparing two data sets
Ask three questions: which has the higher **centre**, which has more **spread**, and is there any **overlap**. GED questions about "which class performed better" usually need all three.
`,
      { subtitle: "Mean/median/mode, weighted mean, IQR and shape", drill: ["gm-016", "gm-017"] },
    ),
    lesson(
      S,
      "gm-data",
      "gm-l6-graphs",
      "Scatter plots, correlation and sampling",
      10,
      ["gm-data", "gm-stats"],
      `
## Scatter plots
Each point is one observation with two variables.
- **Positive association**: as x increases, y tends to increase.
- **Negative association**: as x increases, y tends to decrease.
- **No association**: no pattern.
- **Strength**: how tightly the points hug a line.

**Correlation is not causation.** Ice-cream sales correlate with drowning deaths — because both rise with hot weather. A GED question that asks what can be *concluded* expects you to say "association only", not "cause".

## Line of best fit
A straight line through the middle of the cloud. Use it to **predict**:
1. Find x on the horizontal axis.
2. Move vertically to the line.
3. Read the corresponding y.

Predictions far beyond the plotted data (**extrapolation**) are unreliable — a common critical-reasoning question.

## Sampling vocabulary
| Term | Meaning |
| --- | --- |
| Population | everyone you want to describe |
| Sample | the subset actually measured |
| Random sample | every member has an equal chance of selection |
| Bias | a sampling method that systematically favours some group |
| Representative | the sample's mix matches the population's mix |
| Margin of error | how much a sample result could differ from the truth |

**Biased samples to recognise:**
- Asking shoppers at a mall about shopping habits.
- An online poll about internet use.
- Surveying only one class in a school and generalising to the country.
- Voluntary-response polls (only the passionate answer).

A **larger random sample** gives a **smaller margin of error** — but a large biased sample is still biased.

## Frequency tables and two-way tables
|  | Passed | Failed | Total |
| --- | --- | --- | --- |
| Morning | 32 | 8 | 40 |
| Evening | 24 | 16 | 40 |
| Total | 56 | 24 | 80 |

- P(passed) = 56/80 = 0.70.
- P(passed | morning) = 32/40 = 0.80 — **conditional** probability, using the row total.
- Relative frequency = count ÷ total, always between 0 and 1.

## Misleading graphs
- A y-axis that does not start at zero exaggerates differences.
- 3-D pie charts distort area.
- Pictographs using different-sized icons.
When asked "what is misleading", name the specific axis or scale — not "it looks wrong".
`,
      { subtitle: "Association vs causation, best fit, bias and two-way tables", drill: ["gm-018"] },
    ),
    lesson(
      S,
      "gm-data",
      "gm-l7-probability",
      "Probability and counting",
      10,
      ["gm-prob", "gm-data"],
      `
## The basic rule
$ P(E) = \\frac{\\text{favourable outcomes}}{\\text{total equally likely outcomes}}

P(E) is always between 0 and 1; P(not E) = 1 − P(E).

! A bag has 5 red and 7 blue balls. P(red)? | 5 ÷ 12 | ⇒ ≈ 0.417, so the probability of not-red is 7/12

## Compound events
$ \\text{Independent: } P(A \\text{ and } B) = P(A) × P(B)

$ \\text{Either/or (mutually exclusive): } P(A \\text{ or } B) = P(A) + P(B)

$ \\text{Either/or (not exclusive): } P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)

! Two fair coins | P(both heads) = ½ × ½ = ¼ | P(at least one head) = 1 − ¼ = ¾

## With and without replacement
- **Without replacement**, the denominator shrinks and the numerator may too.
- Drawing 2 red from 5 red + 7 blue without replacement: (5/12) × (4/11) = 20/132 ≈ 0.152.

## Expected value
$ E = \\sum (\\text{value} × \\text{probability})

! A game pays 100 taka with probability 0.2, else 0 | E = 100(0.2) + 0(0.8) | ⇒ 20 taka per play. If a ticket costs 30 taka, the game is not worth playing.

## Counting
- **Fundamental counting principle**: if one choice has m options and another has n, there are m × n combinations.
- **Permutations** (order matters): nPr = n!/(n−r)!.
- **Combinations** (order does not matter): nCr = n!/(r!(n−r)!).
- A password of 3 letters then 2 digits = 26 × 26 × 26 × 10 × 10.

## Reading probability questions carefully
- "at least one" → compute 1 − P(none). Always faster.
- "exactly one" → count the specific arrangements.
- "given that" → conditional; the denominator becomes the condition group.

> On the calculator section, use fractions to avoid rounding until the final answer. The GED accepts answers rounded to what the options show.
`,
      { subtitle: "Simple, compound, conditional, expected value and counting", drill: ["gm-019", "gm-020"] },
    ),
  ],
};

export const gedMathModules: Module[] = [numberQuantity, algebra, geometry, data];

export const gedMathSubject: Subject = {
  id: "ged-math",
  track: "ged",
  title: "Mathematical Reasoning",
  short: "Math",
  tagline: "GED · 115 minutes · calculator in part 2",
  description:
    "Algebra-first mathematical reasoning: quantitative problem solving, algebraic problem solving, geometry, data analysis and probability — with unlimited generated practice.",
  icon: "math",
  hue: "#8A8CFF",
  hue2: "#C084FC",
  exam: {
    label: "GED Math simulation",
    minutes: 115,
    items: "46 items · 2 parts",
    pass: "Pass 145 · College ready 165",
  },
  modules: gedMathModules,
};
