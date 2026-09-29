# learn-asking-right-questions-as-da-with-phoebe - source map

Internal build document. Not linked from any audience-facing page.

Bucket `data`, difficulty 2, audience both, 6 sessions, single track, no code. The first of four
sibling courses (`-da`, `-ds`, `-de`, `-ai`) that share one framework, one company and one
simulator engine. **This repo is the canonical home of the framework** (session 1); the other
three link to it and never restate it.

Built 2026-09-29.

---

## Why this course exists, and what it leaves to its siblings

Read before a page was written:

- `learn-data-literacy-with-phoebe` (data, d1) teaches the executive to read a number and to
  brief an analyst. That is the business side of the table. This course is the other chair.
- `learn-data-thinking-with-phoebe` (ds, d1) teaches sharpening a question you were already
  handed and saying what the data can and cannot answer. This course is the meeting BEFORE that:
  getting the question out of a person who does not have one yet.
- `learn-decision-intelligence-with-phoebe` owns decision framing as a discipline. Session 1
  here borrows one move (start from the decision) and links for the rest.
- `learn-governance-101-with-phoebe` owns DAMA and maturity models in depth. Session 2 here uses
  a maturity ladder as an interview aid only, and links for the discipline.
- `learn-communication-with-phoebe` (comm) owns presenting and influence. Session 4 here is
  narrower: explaining one data idea in a sentence while you are asking a question.
- `learn-product-thinking-with-phoebe` owns discovery for product managers. Session 5 borrows
  the opportunity solution tree shape and links.

**What is un-owned, and therefore this course:** the discovery conversation itself, run by the
data person, with a business person who knows nothing about data or technology. How to get the
decision, the current way of working and the real data state out of them in 45 minutes; how to
ask so that they learn something about data while answering; how to turn what they said into
three candidate joint projects and a one-page brief they can read.

Same arc in all four courses. What differs per role: which door opens widest, the deep question
bank, the fact sheet, and the false beliefs a leading question records.

---

## The running case: Harbourline (constructed, stated so on every page that uses it)

Harbourline is an invented pharmacy and clinic chain, 38 outlets across Singapore and Malaysia.
The interviewee in all four courses is **Adeline Tan, operations director**, who has never heard
the word pipeline. Her request to the analyst: "we need a sales dashboard, the Monday report is
always late and nobody trusts it."

Her hidden fact sheet (24 facts, 67 points, six doors) is printed in full in
`assets/asking-bank-da.js` and is the only source of every number the bench prints. The pages
quote facts from it by paraphrase; the file is the canon.

Real-world touchpoints inside the constructed case, all stated as typical rather than sourced:
one cloud POS vendor with per-outlet CSV export; stock in a shared spreadsheet; supplier orders
over WhatsApp; loyalty data owned by the app vendor; a single IT person; Malaysia's PDPA (Personal
Data Protection Act 2010) for customer data.

---

## The Six Doors (canonical statement, session 1; siblings link here)

| Door | The question behind it | Where the move comes from |
|---|---|---|
| **Outcome** | If this worked, what would be different in six months? | Torres 2021 (outcome before opportunity before solution); Hubbard 2014 step 1, define the decision |
| **Decision** | Who does what with the number, and by when? | Hubbard 2014: measurement exists to reduce uncertainty about a decision; a number nobody acts on measures nothing |
| **Current way** | How does it happen today? Show me the file. | Fitzpatrick 2013: specifics in the past, not opinions about the future; Ohno 1988: ask why until the cause, not the symptom |
| **Data state** | Where do the numbers live, who owns them, who can log in? | DalleMule and Davenport 2017 (single source of truth vs multiple versions); Reis and Housley 2022 (starting / scaling / leading with data) |
| **Constraints** | What is off the table: budget, time, legal, people, device? | Standard requirements practice; no single source claimed |
| **Success and partnership** | How will we both know it worked, and who works with me? | Torres 2021 weekly contact; Fitzpatrick 2013 commitment and advancement |

**Every open question carries a teach-back line:** one plain sentence, said out loud, on why you
are asking. The business person learns how data work thinks while answering. The bench counts
these.

**Question kinds** (the vocabulary of session 3 and the bench): open, closed, vague, jargon,
leading. The definitions are the bench's, printed in `asking-live.js`.

---

## The bench (`assets/asking-live.js` + `assets/asking-bank-da.js`)

A discovery meeting with a hidden fact sheet. Every question costs minutes; open questions earn
a point of trust; jargon costs a point (she has to ask what you mean); facts carry a trust gate
below which she does not volunteer them; a leading question records a FALSE belief with a cost.
Score = value of true facts uncovered minus cost of false beliefs. Second counter: what is in
your notes after 20 minutes, in case the meeting is cut.

Verified headlessly in node on 2026-09-29; the browser runs the same file. Canon on the DA bank
(24 facts, 67 points, 37 questions, 45-minute budget, cut at 20):

| Preset | Net value | After 20 min | Facts | Doors | False beliefs | Raw value | Questions asked |
|---|---|---|---|---|---|---|---|
| **ANTI: the efficient interview** (leading and closed first) | **15** | **-2** | 11 | 4 | **5** | 29 | 16 |
| The technical opener (five jargon questions first) | 17 | 0 | 6 | 3 | 0 | 17 | 10 |
| Any order at all (mean of 200 seeded shuffles) | 28.2 | 14.0 | 11.9 | 5.3 | 2.4 | 34.9 | 13.8 |
| Six Doors, door by door | 48 | 19 | 17 | 6 | 0 | 48 | 11 |
| Six Doors, tuned for an analyst (decision door first) | **52** | **21** | 18 | 6 | 0 | 52 | 10 |
| Ceiling: an optimizer that can see the fact sheet | 61 | 33 | | | | | |

Random: best single draw 47, worst 8.

**Findings the sessions are built on, all counted:**

1. **The efficient interview is the worst meeting on the bench.** Sixteen questions, eight answers
   in the first nine minutes, and five of the things in your notes are wrong because she agreed
   with what you assumed. Net 15. It is the anti-lever, and it is the meeting most of us have run.
2. **Jargon costs twice.** Five technical questions cost 25 of the 45 minutes and take trust to
   -3, so the first open questions that follow are answered thinly. Six facts, three doors.
3. **The framework is not optimal, it is reproducible.** Six Doors in printed order gets 48 of 67
   with zero false beliefs. Tuning the door order for the role adds 4 (52) and, more usefully,
   puts 21 points in your notes by minute 20 instead of 19. A search that can read the fact sheet
   reaches 61; nobody in a real meeting can read the fact sheet.
4. **Random is not neutral.** A shuffle averages 28 and lands between 8 and 47. The spread is the
   argument for having an order at all.
5. **The honest nuance.** The ceiling order opens with "what happens when Priya is away" before
   the interviewer knows who Priya is. Optimal against a known sheet is not the same as good; the
   framework is the thing you can actually do on Tuesday.

**Limits stated on every page that quotes a bench figure:** the company, the person and every
value on the sheet are constructed; the bench claims the ordering and the mechanism, never the
numbers as facts about pharmacies. Change any value in the bank file and re-run.

---

## Sessions

| # | Title | Door emphasis | Signature thing |
|---|---|---|---|
| 1 | Why the gap exists, and the Six Doors | all | The framework, canonical; the tappers-and-listeners figure; the teach-back line |
| 2 | Reading their data state in plain words | Data state | A five-rung maturity ladder as interview questions, drawn as the Harbourline data-state map |
| 3 | The analyst's deep questions, and the bench | Decision | The question bank by kind; the simulator; the learner's own meeting scored |
| 4 | Teaching while you ask | all | The curse of knowledge; one concept per meeting; twelve teach-back lines |
| 5 | From pains to three joint projects | Outcome, Success | Opportunity tree from her answers; a prioritisation you write down; the first step each |
| 6 | Capstone: the mock meeting and the one-page brief | all | Full 45-minute run on the bench; the brief she can read; what to send within 24 hours |

Seams enforced: session 2 links Governance 101 for DAMA rather than teaching it; session 4 links
Communication for presenting; session 5 links Product Thinking for discovery as a discipline.

---

## Sources and evidence tiers (checked 2026-09-29 by the source-checker; tiers as returned)

| Source | Used for | Tier |
|---|---|---|
| Rob Fitzpatrick, *The Mom Test*, self-published, 2013 | three rules (their life not your idea; specifics in the past; talk less), three kinds of bad data (compliments, fluff, ideas) | Secondary, consistent across summaries. Verified quote: "The world's most deadly fluff is: 'I would definitely buy that.' But folks are wildly optimistic about what they would do in the future." **Never print "over-optimistic lie" as a quote**; it is a paraphrase in circulation |
| Douglas W. Hubbard, *How to Measure Anything*, 3rd ed., Wiley, 2014 | measurement as "a quantitatively expressed reduction of uncertainty based on one or more observations"; the clarification chain; the five AIE steps starting with define the decision | Secondary (book not opened); definition verbatim across sources |
| Elizabeth Newton, "The Rocky Road from Actions to Intentions", PhD dissertation, Stanford, 1990; popularised in Chip Heath and Dan Heath, *Made to Stick*, Random House, 2007, ch. 1 | tappers predicted about 50 percent; listeners got 3 of 120 (2.5 percent) | Secondary via Heath and Heath; dissertation not read; figures consistent everywhere |
| Camerer, Loewenstein, Weber, "The Curse of Knowledge in Economic Settings", *Journal of Political Economy* 97(5), 1989 | origin of the term | Confirmed |
| DAMA International, *DAMA-DMBOK*, 2nd ed., Technics Publications, 2017, ch. 15 | five maturity levels: Initial/Ad hoc, Repeatable, Defined, Managed, Optimized | Secondary. **DMBOK has no level 0**; a "non-initiated" level belongs to DCAM. Session 2's ladder is five rungs, named as DAMA names them, and says the interview version is ours |
| Leandro DalleMule and Thomas H. Davenport, "What's Your Data Strategy?", *Harvard Business Review*, May-June 2017 | defense vs offense; single source of truth vs multiple versions of the truth | Secondary (paywalled) |
| Google for Developers, "Introduction to Machine Learning Problem Framing", developers.google.com/machine-learning/problem-framing, accessed 2026-09-29 | non-ML solution first; define success metrics before building | **Primary, fetched.** Used by the DS and AI siblings; one line here in session 5 |
| Teresa Torres, *Continuous Discovery Habits*, Product Talk, 2021 | opportunity solution tree: outcome, opportunities, solutions, assumption tests; weekly customer contact | Secondary |
| Sean Ellis and Morgan Brown, *Hacking Growth*, Currency, 2017 | ICE: impact, confidence, ease, each 1 to 10 | Secondary, **contested whether averaged or multiplied**; session 5 says "some teams multiply, some average, write down which" |
| Joe Reis and Matt Housley, *Fundamentals of Data Engineering*, O'Reilly, 2022 | starting with data / scaling with data / leading with data | Secondary; chapter not confirmed, so no chapter is cited |
| Taiichi Ohno, *Toyota Production System*, Productivity Press, 1988 | five whys and the strainer example | Secondary, consistently reproduced |
| Nicolaus Henke, Jordan Levine, Paul McInerney, "You Don't Have to Be a Data Scientist to Fill This Must-Have Analytics Role", *HBR*, 5 Feb 2018 | the analytics translator role exists and is named | Authors and date confirmed; body paywalled. **The "2 to 4 million translators" figure is NOT READ and is not printed** |
| Steve Lohr, "For Big-Data Scientists, 'Janitor Work' Is Key Hurdle to Insights", *The New York Times*, 17 Aug 2014; CrowdFlower, *2016 Data Science Report* | time spent preparing data | Lohr: "50 percent to 80 percent" collecting and preparing; CrowdFlower: 60 percent cleaning plus 19 percent collecting. **Never print "80 percent cleaning" as one figure** |

**Not covered, on purpose:** survey design and sampling; stakeholder mapping and politics
(Communication); running workshops; presenting results; contract and SOW writing; any specific
BI tool; DAMA beyond the five level names; the DS, DE and AI question banks (their own courses).

---

## Design system

Palette: **sky and terracotta.** Checked against data-bucket neighbours (cobalt RFM, spruce Data
Thinking, teal Observability) and the three siblings (violet DS, rust DE, emerald AI, chosen at
scaffold time). 22 text-on-fill pairs checked before the first page: 0 failures, lowest 5.45:1.

| Token | Hex | Role |
|---|---|---|
| sky-deep | `#075985` | darkest band, root |
| sky | `#0369A1` | primary band, links |
| sky-mid | `#0B6FA8` | secondary band |
| sky-soft | `#BAE6FD` | light fill |
| sky-50 | `#F0F9FF` | pale ground |
| ink | `#0C1F2E` | text, sketch strokes |
| muted | `#4A5B6E` | secondary text |
| faint / hairline | `#C5D3DF` / `#DCE6EE` | rails, twigs |
| terracotta | `#B0451C` | accent band, the thing a figure is about |
| terracotta-ink | `#7F3012` | accent text |
| terracotta-50 | `#FBEDE6` | accent ground |
| paper | `#FBFDFF` | page |
| code-bg / code-ink | `#0B2233` / `#DCE6EE` | prompt boxes |

Universal reds kept from the donor stylesheet unchanged: `#991B1B` `#FEF2F2` `#7F1D1D` `#FCA5A5`.

Scaffold donor: `learn-rfm-modeling-with-phoebe` (single-track 6, hand-drawn grammar, bench in
session 3). `PASSPORT_KEY` = `lwp-passport:asking-right-questions-da`; journey array fixed by
`pre-publish.py --fix-journey` once the six pages existed.

### Hand-drawn figure grammar (this course's illustration register)

Inline SVG in the sketch register of the RFM donor: a `feTurbulence` wobble filter on the shape
layer only, hachure pattern in sky for "the pile" or "the data", solid terracotta only for the
one thing the figure is about, ink strokes 2px round, half-degree rotations on panels, all text
outside the filtered group at 11 to 12px, unique prefix per figure (`s1a`, `s1b`, ...). The
mechanism drawn every time: where the question lands, what it bypasses, which door it opens.
Floor: one figure per Part plus one in the build-along.

### Sibling courses (built after this one, same engine)

| Slug | Widest door | Fact sheet pain | Accent |
|---|---|---|---|
| `learn-asking-right-questions-as-ds-with-phoebe` | Outcome (what to predict, what a wrong guess costs, base rate) | "can we predict which outlets will run out" | violet |
| `learn-asking-right-questions-as-de-with-phoebe` | Data state (sources, owners, freshness, access, who breaks it) | "our numbers never match between systems" | rust |
| `learn-asking-right-questions-as-ai-with-phoebe` | Current way (the human workflow, error tolerance, who checks the output) | "can AI answer the supplier WhatsApps" | emerald |

Each ships its own copy of `asking-live.js` (a Pages site must be self-contained) and its own
`asking-bank-<role>.js`. The engine is byte-identical across the four; the bank is the course.
