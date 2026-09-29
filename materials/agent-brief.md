# Agent brief - shared by every fan-out page of learn-asking-right-questions-as-da-with-phoebe

You are writing ONE static HTML session page. No servers, no npm. **If your target file already
exists on disk, do not write it; report that and stop.** Write the file, return its path and one
line of coverage. No HTML in your reply.

## Read first, in this order

1. The template page. Copy its structure, classes, SVG grammar and quiz markup EXACTLY, including
   how many options each question has (four):
   `/Users/phoebe.fu/Documents/Claude_Work/github_repo/learn-asking-right-questions-as-da-with-phoebe/courses/01-why-the-gap-and-the-six-doors.html`
   For rhythm on a page that quotes bench numbers, also skim:
   `/Users/phoebe.fu/Documents/Claude_Work/github_repo/learn-asking-right-questions-as-da-with-phoebe/courses/03-the-analysts-questions-and-the-bench.html`
2. The source map: every verified claim, its evidence tier, the case, the bench canon, the seams.
   Use ONLY its numbers; never invent a statistic; if a fact is missing, teach the uncertainty.
   `/Users/phoebe.fu/Documents/Claude_Work/github_repo/learn-asking-right-questions-as-da-with-phoebe/materials/official-course-map.md`
3. The fact sheet and question bank the whole course rests on (24 facts, 37 questions, all
   printed): `/Users/phoebe.fu/Documents/Claude_Work/github_repo/learn-asking-right-questions-as-da-with-phoebe/assets/asking-bank-da.js`
4. The stylesheet `:root` block for the palette tokens:
   `/Users/phoebe.fu/Documents/Claude_Work/github_repo/learn-asking-right-questions-as-da-with-phoebe/assets/style.css`

## Page skeleton (keep every component)

toolbar (crumb EXACTLY `<a href="../index.html">learn-asking-right-questions-as-da-with-phoebe</a> / Session N of 6`,
#toggle-all, #zoom-toggle) · masthead (eyebrow "Learn Asking the Right Questions as a Data Analyst
with Phoebe · Session N of 6", h1 with one `<span class="accent">`, .sub, .chip-row with the level
chip `🟡 Core` on sessions 2, 4 and 5 and `🟠 Capstone` on session 6, two audience chips, a `45 min`
time chip, .agenda a1-a4 with flex weights 1/4/5/1) · main.wrap · section#intro (Part 0: kicker,
.lede, .legend pills as on the template, .callout.win "★ What you walk out with tonight.") · 3
Parts, each `section.section#part-N` with section-kicker (klabel "Part N · covers ...", h2,
`.tag.concept "N min live"`), a `.lede`, ONE figure, `details.card` accordions (summary:
`.mode.live` or `.mode.self`, title, `.mini`, `.caret ▶`), at least one `.callout.example` with
`span.ex-pill` "Real world" on the page · section#demo-1 Build-along (kicker `.tag.demo "★ 22 min ·
everyone writes"`, .lede, ONE figure, `.steps > .step`, each with a `.prompt-box.good` carrying a
`span.label`; there is no code in this course, so prompt boxes hold WRITTEN artifacts: question
pairs, map notes, brief text, a table sketched in monospace) · section#exercise Homework (ol, 4
items) · section#quiz (3 x `.quiz-q data-answer="0-based"`, `p.qtext`, four `button.qopt` "A · ..."
to "D · ...", `p.qwhy`; one `p.quiz-score` after the last) · section#official, h2 EXACTLY "What this
session teaches, and where it came from", `.covered > .covered-row` (pill solid ✓ / light ◐ + name +
note), then the `.mono` line EXACTLY "Every fact on this page, and its verification tier, is
recorded in the course's source map." · section.cheat#cheatsheet (h3 "Session N cheat sheet
<span>· pin this</span>", .grid-2 of six .cheat-item) · `.callout.next` with `.nx-pill` "Next
session" (session 6: `.nx-pill` "Where to next", pointing at the three sibling courses and the
hub) · footer.pagefoot · `<script src="../assets/app.js?v=1">`.

Head: the template's social meta block with this page's own title/description/url;
`<title>Session N · <Title> - learn asking the right questions as a data analyst with phoebe</title>`;
`<link rel="stylesheet" href="../assets/style.css?v=1">`. Nothing else external.

First `details.card` in the FIRST Part is `open`; no other. Sentence case headings. Warm
practitioner voice, concrete, never dry. Inside prompt-boxes escape `&` `<` `>`. 450 to 650 lines
is guidance about depth, never a target: never collapse whitespace, dissolve a list into a
paragraph, or drop a component to fit. One `.tryrow` micro-try per page, as on the template.

## Hard rules (a violation is rework)

- NEVER an em dash or en dash, anywhere (prose, code, aria-labels, comments). Hyphen only.
- No meta text: never "this course", "in this course", "the course teaches", "banned here". State
  the professional norm directly with its reason. The two exact estate phrases above are the only
  self-references; "session 3" cross-references are fine.
- Attribution "by Phoebe Fu". Never "built with" a tool.
- Every number comes from the map or the bank file, or is labelled constructed. Harbourline and
  Adeline Tan are constructed and every page that uses them says so once, plainly, in a covered
  row or in prose.
- Contested or missing evidence: teach the disagreement; never resolve what the literature has not.
- Citations in the exact form of the map's source table; anything the map marks secondary is
  "reported", and the map's "never print" items are never printed: no "80 percent cleaning" as one
  figure (quote Lohr's 50 to 80 percent and CrowdFlower's 60 plus 19 as they stand), no DMBOK
  "level 0" (five levels, Initial/Ad hoc to Optimized), no McKinsey translator headcount, no ICE
  "the method is averaging" (say some teams multiply, some average, write down which), and the
  Mom Test quote only in its verified wording.
- NEVER "lottery" or "lotteries"; say the mechanism ("decided by row order", "arbitrary").
- Default to the English word. A Chinese term that is genuinely a name carries its English in
  brackets right after it, every occurrence. None is expected on these pages.
- No cross mark (✕, ✗, ×) as a bullet or label anywhere; a bad example is labelled in words.
- The Six Doors are stated in full ONCE, on session 1. Every other page names a door and links
  `01-why-the-gap-and-the-six-doors.html` for the corridor; never restate the six with their
  questions as a table again.
- The curse of knowledge is taught in depth in the Tech Writing course; session 4 gives it one
  paragraph with the Camerer 1989 citation and links
  https://phoebefu6.github.io/learn-tech-writing-with-phoebe/courses/01-why-docs-fail.html
- Titles, widget ids and class names must not collide with siblings: never id `six-questions`,
  `six-checks`, `six-gates`, `six-kinds`; never an h2 that is just "The gap"; never reuse the h2
  "Six Doors" (session 1 owns it); the bench id `ask-bench` appears only on session 3.
- Bench numbers, when quoted, are the canon in the map's bench table and nothing else: fast 15,
  jargon 17, shuffle 28 (8 to 47), Six Doors 48, analyst-tuned 52, ceiling 61; after 20 minutes
  -2 / 0 / 14 / 19 / 21; 24 facts worth 67; five false beliefs on the fast run.

## Figure grammar (hand-drawn, every figure)

Palette, ONLY these hexes (no invented greys): `#075985` `#0369A1` `#0B6FA8` `#BAE6FD` `#F0F9FF`
`#0C1F2E` `#4A5B6E` `#C5D3DF` `#DCE6EE` `#B0451C` `#7F3012` `#FBEDE6` `#FBFDFF` · `#FFFFFF` ·
universal reds `#991B1B` `#FEF2F2` `#FCA5A5` only for a wrong-way panel.

- `<figure class="zoomable">` > `<svg viewBox="0 0 880 H" role="img" aria-label="the data, not the
  shape">` > `<defs>` + `<style>` + content, then `<figcaption>🔍 Click to zoom - takeaway</figcaption>`.
  Grow H, never W.
- Prefix unique per figure, used for every class and id: `s<session><letter>`, so session 2 uses
  `s2a`, `s2b`, `s2c`, `s2d`; session 4 `s4a` ...; session 6 `s6a` ...
- `<defs>` holds three things with the figure prefix P: a wobble filter `id="PSk"`
  (`feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="<int>"` +
  `feDisplacementMap scale="2.4" xChannelSelector="R" yChannelSelector="G"`, `x="-3%" y="-3%"
  width="106%" height="106%"`), a hachure pattern `id="PHc"` (7x7 userSpaceOnUse, rotate(-38), one
  `#0369A1` line, opacity .5), an open arrowhead `id="PAr"` (path `M1 1 L9 5 L1 9`, fill none, ink
  `#0C1F2E` stroke 1.6). ALL shapes sit inside ONE `<g filter="url(#PSk)" fill="none"
  stroke="#0C1F2E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`; rects carry a
  tiny rotation (-1 to 1 degree for hand-placed items, under 0.6 for panels). Fills: white,
  `#F0F9FF`, the hachure for "the pile" or "the data", and terracotta `#B0451C` / `#FBEDE6` ONLY for
  the one thing the figure is about. One doodle anchor per figure (a person, a phone, a till, a
  page), simple strokes, never a mascot. Text classes: `.PH` 800 12px ink heading · `.PL` 600 12px
  ink label · `.PS` 400 11px muted `#4A5B6E` · `.PB` 800 11px terracotta-ink `#7F3012` · `.PV` 800
  16-20px `#075985` value · `.PW` 800 12px white on a fill · `.PA` 700 11px `#0369A1` axis caption ·
  `.PN` 400 12px muted note. Hand-stacked items must not overlap as painted rects.
- ALL `<text>` outside any filtered group, sans stack `Inter, sans-serif`, never below 10.5px.
- Fit (owner: `diagram-kit.md`, change it there first): max chars ≈ (box width - 20) / 7 at 12px,
  6.4px/char at 11px; full-width note under 110 chars; two lines of 11px text need 15px between
  baselines; 40px between neighbouring point labels; bottom note 22px below the last row, H clears
  it by 8px. When in doubt, shorten. Never a `display:none` placeholder text.
- Floor: one figure per Part plus one in the build-along. Draw the MECHANISM (where the question
  lands and what comes back, which door it opens, where a number is typed versus recorded, what a
  false belief turns into six weeks later, how a tree is pruned to three), never a metaphor
  literally, never decoration.

## Voice and honesty

Every Part gets a real-world story. Harbourline stories say "a constructed case" in the
`.callout.example` the first time on the page. Every page carries one honesty limit in a `◐`
covered row: what is constructed, what was reported rather than read, or what is not claimed.

## Cross-links (absolute URLs)

- Session 1 (the corridor): `01-why-the-gap-and-the-six-doors.html` (relative, same folder)
- Session 3 (the bench): `03-the-analysts-questions-and-the-bench.html`
- Data Literacy: https://phoebefu6.github.io/learn-data-literacy-with-phoebe/
- Data Thinking: https://phoebefu6.github.io/learn-data-thinking-with-phoebe/
- Governance 101 (DAMA in depth): https://phoebefu6.github.io/learn-governance-101-with-phoebe/
- Tech Writing session 1 (curse of knowledge): https://phoebefu6.github.io/learn-tech-writing-with-phoebe/courses/01-why-docs-fail.html
- Communication: https://phoebefu6.github.io/learn-communication-with-phoebe/
- Product Thinking (discovery as a discipline): https://phoebefu6.github.io/learn-product-thinking-with-phoebe/
- Decision Intelligence: https://phoebefu6.github.io/learn-decision-intelligence-with-phoebe/
- Sibling courses (session 6 only): https://phoebefu6.github.io/learn-asking-right-questions-as-ds-with-phoebe/ ·
  https://phoebefu6.github.io/learn-asking-right-questions-as-de-with-phoebe/ ·
  https://phoebefu6.github.io/learn-asking-right-questions-as-ai-with-phoebe/
- Hub: https://phoebefu6.github.io/learn-with-phoebe/

## Footer chain and session titles

01-why-the-gap-and-the-six-doors.html · 02-reading-their-data-state.html ·
03-the-analysts-questions-and-the-bench.html · 04-teaching-while-you-ask.html ·
05-from-pains-to-three-projects.html · 06-the-mock-meeting-and-the-brief.html

Footer left: "Session N of 6 · learn-asking-right-questions-as-da-with-phoebe · by Phoebe Fu &nbsp;·&nbsp; 📚 <a href="https://phoebefu6.github.io/learn-with-phoebe/">Learn with Phoebe ↗</a>"
Footer right: "← Prev: <title>" and "Next: <title> →" (session 6: "← Prev: <title>" and "Course home" linking ../index.html).

Session titles (exact, sentence case, one accent span in h1):
1. Why the gap exists, and the Six Doors
2. Reading their data state in plain words
3. The analyst's questions, and the bench
4. Teaching while you ask
5. From pains to three joint projects
6. The mock meeting and the one-page brief
