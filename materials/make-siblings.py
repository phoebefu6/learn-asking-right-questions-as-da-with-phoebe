"""Generate each sibling course's agent brief, landing page and README from the DA originals.

The DA course is the canonical home of the Six Doors framework and of the page anatomy; this
script is the one place the per-role differences live, so the four courses cannot drift apart
in structure. Run from anywhere: python3 make-siblings.py
"""
import json
import os
import re

GH = "/Users/phoebe.fu/Documents/Claude_Work/github_repo"
DA = f"{GH}/learn-asking-right-questions-as-da-with-phoebe"
DA_URL = "https://phoebefu6.github.io/learn-asking-right-questions-as-da-with-phoebe"

DA_PAL = ["#075985", "#0369A1", "#0B6FA8", "#BAE6FD", "#F0F9FF", "#0C1F2E", "#4A5B6E",
          "#C5D3DF", "#DCE6EE", "#B0451C", "#7F3012", "#FBEDE6", "#FBFDFF"]

ROLES = {
    "ds": dict(
        label="Data Scientist", article="a", lower="data scientist", short="scientist",
        bucket_name="Data Science", door="Outcome", door_n=1,
        pal=["#4C1D95", "#5B21B6", "#6528C9", "#DDD6FE", "#F5F3FF", "#1E1B2E", "#4E4A66",
             "#CFC9E6", "#E3DFF2", "#9A5B00", "#6B3F00", "#FBF1E0", "#FCFBFF"],
        accent_names="violet and mustard",
        request="Can we predict which outlets are going to run out of stock?",
        worry="predictions nobody acts on, trained on a history that was never recorded",
        canon=dict(fast=15, fast_early=-5, jargon=10, rnd=27.5, rnd_lo=0, rnd_hi=46, doors=46,
                   doors_early=20, role=55, role_early=24, ceil=61, ceil_early=33, total=68),
        sessions=[
            ("01-the-gap-from-the-scientists-chair.html", "The gap, from the scientist's chair", "🎯",
             "Why \"can we predict it\" is the most dangerous request a scientist gets, the outcome door opened widest, and the three facts no model can be scoped without: the exact target, how often it happens, and what each wrong guess costs."),
            ("02-what-has-been-recorded-and-for-how-long.html", "What has been recorded, and for how long", "🗂️",
             "Door 4 for a scientist: history, labels and what was never written down. At Harbourline nobody records a stock-out and the stock sheet is overwritten every Friday, so the first project is recording, not modelling."),
            ("03-the-scientists-questions-and-the-bench.html", "The scientist's questions, and the bench", "🎛️",
             "Five kinds of question and the same operations director run five ways. The fast interview scores 15 and writes down \"forecast sales\"; the doors in order 46; outcome first, 55. Then you take the chair."),
            ("04-teaching-while-you-ask.html", "Teaching while you ask", "💬",
             "The one concept worth ninety seconds in a scientist's meeting: the two wrong guesses cost different amounts. Twelve teach-back lines rewritten for a person who has never seen a confusion matrix."),
            ("05-three-projects-and-the-one-that-is-not-a-model.html", "Three projects, and the one that is not a model", "🌱",
             "Her pains become three candidates, and the first is a daily stock-out log in four outlets. Why the non-ML fix comes first, and what a model needs before it can beat a pharmacist looking at a shelf."),
            ("06-the-mock-meeting-and-the-brief.html", "The mock meeting and the one-page brief", "📄",
             "A full run on the bench with your own sheet, scored, then the brief she can read: the target in her words, the baseline, what you will not build yet. Final scorecard."),
        ],
        concepts=[["The request that is a trap", "Outcome door, widest", "Target, base rate, cost"],
                  ["Nobody logged a stock-out", "Overwritten every Friday", "Recording before modelling"],
                  ["Five kinds of question", "Fast 15, doors 46, tuned 55", "\"Forecast sales\" costs 4"],
                  ["Two wrong guesses", "One concept per meeting", "Twelve teach-back lines"],
                  ["The non-ML fix first", "Three candidates, scored", "Beat the pharmacist"],
                  ["Your run, scored", "The one-page brief", "Within 24 hours"]],
    ),
    "de": dict(
        label="Data Engineer", article="a", lower="data engineer", short="engineer",
        bucket_name="Data Engineering & Infra", door="Data state", door_n=4,
        pal=["#7C2D12", "#9A3412", "#A8431A", "#F5C9B0", "#FDF4EE", "#2A1A12", "#6B5448",
             "#E2CFC3", "#EEE0D6", "#0E6B6B", "#084C4C", "#E4F3F3", "#FFFDFB"],
        accent_names="rust and teal",
        request="Our numbers never match. Finance says one thing, the POS says another.",
        worry="a pipeline that moves the disagreement faster instead of settling which copy is real",
        canon=dict(fast=17, fast_early=0, jargon=15, rnd=27.6, rnd_lo=5, rnd_hi=45, doors=47,
                   doors_early=20, role=51, role_early=24, ceil=62, ceil_early=34, total=68),
        sessions=[
            ("01-the-gap-from-the-engineers-chair.html", "The gap, from the engineer's chair", "🧭",
             "Why \"our numbers never match\" is two systems answering two questions, the data-state door opened widest, and why one outcome question still goes first: the facts behind door 4 need trust."),
            ("02-every-system-a-number-passes-through.html", "Every system a number passes through", "🗺️",
             "The till, the bank, the ledger, the spreadsheet, the phone. Who owns each, who can log in, how often each is read, and which copy gets declared real. You draw the lineage from her answers."),
            ("03-the-engineers-questions-and-the-bench.html", "The engineer's questions, and the bench", "🎛️",
             "Five kinds of question and the same operations director run five ways. The fast interview scores 17 and writes down \"the POS is the source of truth\"; the doors in order 47; data state widest, 51."),
            ("04-teaching-while-you-ask.html", "Teaching while you ask", "💬",
             "The one concept worth ninety seconds in an engineer's meeting: most mismatches are timing, not truth. Twelve teach-back lines rewritten for a person who has never heard of a pipeline."),
            ("05-three-projects-starting-with-one-real-copy.html", "Three projects, starting with one real copy", "🌱",
             "Her pains become three candidates, and the first declares one stock sheet real and replaces Priya's 38 downloads with one script. Why no new tool until a copy is declared."),
            ("06-the-mock-meeting-and-the-brief.html", "The mock meeting and the one-page brief", "📄",
             "A full run on the bench with your own sheet, scored, then the brief she can read: the lineage as five boxes, the one real copy, the auditor's date. Final scorecard."),
        ],
        concepts=[["Two systems, two questions", "Data-state door, widest", "Trust before door 4"],
                  ["Till, bank, ledger", "Who can log in", "One copy declared real"],
                  ["Five kinds of question", "Fast 17, doors 47, tuned 51", "\"POS is truth\" costs 4"],
                  ["Timing, not truth", "One concept per meeting", "Twelve teach-back lines"],
                  ["One real copy first", "Three candidates, scored", "No tool before a copy"],
                  ["Your run, scored", "The one-page brief", "Within 24 hours"]],
    ),
    "ai": dict(
        label="AI Developer", article="an", lower="AI developer", short="AI developer",
        bucket_name="AI & LLMs", door="Current way", door_n=3,
        pal=["#065F46", "#047857", "#087A57", "#A7F3D0", "#ECFDF5", "#0F231B", "#46605A",
             "#C3DDD3", "#DAEBE4", "#8E2C6B", "#6A1F50", "#FBE9F4", "#FBFEFC"],
        accent_names="emerald and plum",
        request="Can AI answer the supplier WhatsApps?",
        worry="an assistant that says yes to a substitute drug nobody checked",
        canon=dict(fast=21, fast_early=-4, jargon=11, rnd=30.1, rnd_lo=-1, rnd_hi=52, doors=54,
                   doors_early=22, role=55, role_early=23, ceil=63, ceil_early=32, total=69),
        sessions=[
            ("01-the-gap-from-the-ai-developers-chair.html", "The gap, from the AI developer's chair", "🤝",
             "Why \"can AI answer the WhatsApps\" is a request about a workflow nobody has watched, the current-way door opened widest, and the split every assistant rests on: lookups the assistant does, decisions a person keeps."),
            ("02-the-thread-end-to-end-and-its-data.html", "The thread end to end, and its data", "🗂️",
             "One real thread watched from the first message to the OK, then where each half lives: supplier chats, outlet chats in three languages, no order table, a product list with the wrong names."),
            ("03-the-ai-developers-questions-and-the-bench.html", "The AI developer's questions, and the bench", "🎛️",
             "Five kinds of question and the same operations director run five ways. The fast interview scores 21 and writes down \"reply automatically\"; the doors in order 54; current way widest, 55."),
            ("04-teaching-while-you-ask.html", "Teaching while you ask", "💬",
             "The one concept worth ninety seconds in an AI developer's meeting: an assistant drafts the lookups and a person keeps the decisions. Twelve teach-back lines rewritten for a person who has never seen a model."),
            ("05-three-projects-and-the-assistant-that-drafts.html", "Three projects, and the assistant that only drafts", "🌱",
             "Her pains become three candidates, and the first is a log, not a bot. Then an assistant that drafts the plain OKs for one manager and four suppliers, and never approves a substitute."),
            ("06-the-mock-meeting-and-the-brief.html", "The mock meeting and the one-page brief", "📄",
             "A full run on the bench with your own sheet, scored, then the brief she can read: the workflow in her words, what the assistant will never decide, the visit-log test. Final scorecard."),
        ],
        concepts=[["A workflow nobody watched", "Current-way door, widest", "Lookups and decisions"],
                  ["One thread, end to end", "Three languages, no table", "Where each half lives"],
                  ["Five kinds of question", "Fast 21, doors 54, tuned 55", "\"Reply on its own\" costs 4"],
                  ["Drafts, not decisions", "One concept per meeting", "Twelve teach-back lines"],
                  ["A log before a bot", "Three candidates, scored", "Never approves a substitute"],
                  ["Your run, scored", "The one-page brief", "Within 24 hours"]],
    ),
}
DIFF = ["#FBBF24", "#FBBF24", "#F87171", "#FBBF24", "#FBBF24", "#FB923C"]
KIND = ["core", "core", "bench night", "core", "core", "capstone"]


def swap(s, pal):
    for a, b in zip(DA_PAL, pal):
        s = s.replace(a, b)
    return s


def brief(k, r):
    s = open(f"{DA}/materials/agent-brief.md").read()
    slug = f"learn-asking-right-questions-as-{k}-with-phoebe"
    repo = f"{GH}/{slug}"
    s = swap(s, r["pal"])
    s = s.replace("learn-asking-right-questions-as-da-with-phoebe/materials/official-course-map.md",
                  f"{slug}/materials/official-course-map.md")
    s = s.replace(f"{DA}/assets/asking-bank-da.js", f"{repo}/assets/asking-bank-{k}.js")
    s = s.replace(f"{DA}/assets/style.css", f"{repo}/assets/style.css")
    s = s.replace("Learn Asking the Right Questions as a Data Analyst\nwith Phoebe",
                  f"Learn Asking the Right Questions as {r['article']} {r['label']}\nwith Phoebe")
    s = s.replace("learn asking the right questions as a data analyst with phoebe",
                  f"learn asking the right questions as {r['article']} {r['lower']} with phoebe")
    s = s.replace("learn-asking-right-questions-as-da-with-phoebe", slug)
    # the templates stay the DA pages (structure only), named explicitly
    s = s.replace(f"{repo}/courses/01-why-the-gap-and-the-six-doors.html", f"{DA}/courses/01-why-the-gap-and-the-six-doors.html")
    s = s.replace(f"{repo}/courses/03-the-analysts-questions-and-the-bench.html", f"{DA}/courses/03-the-analysts-questions-and-the-bench.html")
    c = r["canon"]
    s = re.sub(r"- Bench numbers, when quoted,.*?five false beliefs on the fast run\.",
               f"- Bench numbers, when quoted, are the canon in this course's map and nothing else: fast {c['fast']}, "
               f"jargon {c['jargon']}, shuffle {c['rnd']} ({c['rnd_lo']} to {c['rnd_hi']}), Six Doors {c['doors']}, "
               f"{r['short']}-tuned {c['role']}, ceiling {c['ceil']}; after 20 minutes {c['fast_early']} / 0 / about 14 / "
               f"{c['doors_early']} / {c['role_early']}; 24 facts worth {c['total']}; five false beliefs on the fast run. "
               "Never quote a DA number on this course's pages.", s, flags=re.S)
    s = re.sub(r"- The Six Doors are stated in full ONCE, on session 1\..*?again\.",
               "- The Six Doors are stated in full ONCE, in the DA course's session 1. Every page here names a door and "
               f"links {DA_URL}/courses/01-why-the-gap-and-the-six-doors.html for the corridor; never restate the six "
               "with their questions as a table. Session 1 here gives them as one line of six names and the link.", s, flags=re.S)
    s = s.replace("- Session 1 (the corridor): `01-why-the-gap-and-the-six-doors.html` (relative, same folder)",
                  f"- The corridor, canonical: {DA_URL}/courses/01-why-the-gap-and-the-six-doors.html\n"
                  f"- The DA course (sibling): {DA_URL}/")
    s = s.replace("- Session 3 (the bench): `03-the-analysts-questions-and-the-bench.html`",
                  f"- Session 3 (the bench): `{r['sessions'][2][0]}`")
    sib = [x for x in ROLES if x != k]
    sib_lines = " ·\n  ".join([f"{DA_URL}/"] + [f"https://phoebefu6.github.io/learn-asking-right-questions-as-{x}-with-phoebe/" for x in sib])
    s = re.sub(r"- Sibling courses \(session 6 only\):.*?\n- Hub:", f"- Sibling courses (session 6 only): {sib_lines}\n- Hub:", s, flags=re.S)
    chain = " ·\n".join(f for f, _, _, _ in r["sessions"])
    titles = "\n".join(f"{i+1}. {t}" for i, (_, t, _, _) in enumerate(r["sessions"]))
    s = re.sub(r"## Footer chain and session titles\n\n.*?\n\nFooter left:", f"## Footer chain and session titles\n\n{chain}\n\nFooter left:", s, flags=re.S)
    s = re.sub(r"Session titles \(exact, sentence case, one accent span in h1\):\n.*", f"Session titles (exact, sentence case, one accent span in h1):\n{titles}\n", s, flags=re.S)
    s = s.replace("level\nchip `🟡 Core` on sessions 2, 4 and 5", "level\nchip `🟡 Core` on sessions 1, 2, 4 and 5, `🔴 Bench night` on session 3,")
    s += f"""
## This role

Widest door: **{r['door']}** (door {r['door_n']}). The request that opens the meeting: "{r['request']}"
The failure every page is written against: {r['worry']}.
The bench page (session 3) embeds `<div id="ask-bench"></div>` and loads, in this order,
`../assets/asking-bank-{k}.js?v=1`, `../assets/asking-live.js?v=1`, `../assets/app.js?v=1`.
Figure prefixes use this course's session numbers (`s1a` ...). Palette hexes above are this course's;
the DA template pages you read use a different palette, so never copy a hex from them.
"""
    open(f"{repo}/materials/agent-brief.md", "w").write(s)


def landing(k, r):
    s = open(f"{DA}/index.html").read()
    slug = f"learn-asking-right-questions-as-{k}-with-phoebe"
    c = r["canon"]
    s = swap(s, r["pal"])
    art, lab = r["article"], r["label"]
    s = s.replace("Learn Asking the Right Questions as a Data Analyst with Phoebe", f"Learn Asking the Right Questions as {art} {lab} with Phoebe")
    s = s.replace('Learn Asking the Right Questions as a <span class="accent">Data Analyst</span> with Phoebe',
                  f'Learn Asking the Right Questions as {art} <span class="accent">{lab}</span> with Phoebe')
    s = s.replace("learn-asking-right-questions-as-da-with-phoebe", slug)
    s = s.replace("Learn with Phoebe · Data &amp; Analytics", f"Learn with Phoebe · {r['bucket_name'].replace('&', '&amp;')}")
    # masthead sub, meta and stats
    sub = (f"An operations director says: \"{r['request']}\" It sounds like a technical request, and the {r['lower']} "
           f"who treats it as one builds {r['worry']}. Most of what goes wrong in data work goes wrong in the first meeting, "
           f"quietly, with both sides sure they agreed. Six sessions on running that meeting as {art} {r['lower']}: the six doors every "
           f"discovery conversation has, why {r['door'].lower()} is the one this role opens widest, the plain second sentence that "
           "lets a business person learn how data work thinks while she answers, and a bench that puts one invented operations "
           "director with 24 hidden facts in your browser and counts what each way of asking is worth.")
    s = re.sub(r'<p class="sub">.*?</p>', f'<p class="sub">{sub}</p>', s, count=1, flags=re.S)
    desc = (f"Six sessions on the first meeting of any data project, run by {art} {r['lower']}: how to get the outcome, the decision, "
            "the current way of working and the real state of the data out of a business person who knows nothing about data, in "
            "words that teach them something while they answer. One invented pharmacy chain, one operations director with 24 "
            "hidden facts, and a discovery-meeting bench. Free, by Phoebe Fu.")
    s = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{desc}">', s, count=1)
    og = (f"Same operations director, same 45 minutes, five ways of asking. The fast yes-or-no interview scores {c['fast']} and "
          f"records five things that are wrong; the Six Doors score {c['doors']}; {r['door'].lower()} first, {c['role']}.")
    s = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{og}">', s, count=1)
    # the six cards
    cards = []
    for i, (f, t, ic, blurb) in enumerate(r["sessions"]):
        pill = '<span class="pill amber">▶ Start here</span>' if i == 0 else ('<span class="pill amber">★ the bench</span>' if i == 2 else ('<span class="pill amber">🔒 final scorecard</span>' if i == 5 else ""))
        cards.append(f'''      <a class="course-card" href="courses/{f}" style="--diff:{DIFF[i]}">
        <span class="cicon">{ic}</span>
        <span class="cnum">Session {i+1} · {KIND[i]}</span>
        <h3>{t}</h3>
        <p>{blurb}</p>
        <span class="meta">{pill}</span>
      </a>''')
    s = re.sub(r'<div class="course-grid">.*?\n    </div>\n\n    <div class="diff-legend">',
               '<div class="course-grid">\n' + "\n".join(cards) + '\n    </div>\n\n    <div class="diff-legend">', s, count=1, flags=re.S)
    # siblings grid: point every card at the right place
    sib = {
        "da": ("As a data analyst", "Widest door: decision. Who does what with the number, and by when.", f"{DA_URL}/"),
        "ds": ("As a data scientist", "Widest door: outcome. What to predict, what a wrong guess costs, how often it happens today.", "https://phoebefu6.github.io/learn-asking-right-questions-as-ds-with-phoebe/"),
        "de": ("As a data engineer", "Widest door: data state. Sources, owners, freshness, access, who breaks it.", "https://phoebefu6.github.io/learn-asking-right-questions-as-de-with-phoebe/"),
        "ai": ("As an AI developer", "Widest door: current way. The human workflow today, the error you can tolerate, who checks the output.", "https://phoebefu6.github.io/learn-asking-right-questions-as-ai-with-phoebe/"),
    }
    grid = []
    for x, (t, d, u) in sib.items():
        if x == k:
            grid.append(f'      <a class="sibling here" href="courses/{r["sessions"][0][0]}"><b>{t} · this course</b><span>{d}</span></a>')
        else:
            grid.append(f'      <a class="sibling" href="{u}"><b>{t} ↗</b><span>{d}</span></a>')
    s = re.sub(r'<div class="siblings">.*?\n    </div>', '<div class="siblings">\n' + "\n".join(grid) + "\n    </div>", s, count=1, flags=re.S)
    s = s.replace("The framework itself lives in this course's session 1; the others link to it.",
                  "The framework itself lives in the data analyst course's session 1; this course links to it.")
    # paths: rewrite DA filenames by session index
    da_files = ["01-why-the-gap-and-the-six-doors.html", "02-reading-their-data-state.html", "03-the-analysts-questions-and-the-bench.html",
                "04-teaching-while-you-ask.html", "05-from-pains-to-three-projects.html", "06-the-mock-meeting-and-the-brief.html"]
    for i, f in enumerate(da_files):
        s = s.replace(f"courses/{f}", f"courses/{r['sessions'][i][0]}")
    s = s.replace("📊 I keep getting asked for dashboards", {"ds": "🎯 I keep getting asked to predict things", "de": "🧭 I keep getting asked why numbers differ", "ai": "🤝 I keep getting asked to add AI"}[k])
    s = s.replace("the outcome behind the request, the real data state, three projects that are not a dashboard",
                  {"ds": "the target behind the request, what was never recorded, three projects starting with one that is not a model",
                   "de": "the question behind the mismatch, every system a number passes, three projects starting with one real copy",
                   "ai": "the workflow behind the request, where each half of it lives, three projects starting with a log, not a bot"}[k])
    s = s.replace('<tr><td>"Data scientists spend 80 percent of their time cleaning data"</td><td><strong>Not claimed as one figure.</strong> Two different sources say two different things, and session 2 quotes both as they stand</td></tr>\n', "")
    # mindmap
    mm = {"title": f"Asking the\nRight Questions", "centerColor": r["pal"][0], "sessions": []}
    for i, (f, t, _, _) in enumerate(r["sessions"]):
        words = t.split(" ")
        cut = max(1, len(words) // 2)
        mm["sessions"].append({"label": " ".join(words[:cut]) + "\n" + " ".join(words[cut:]), "href": f"courses/{f}", "color": DIFF[i],
                               "concepts": [{"label": cc, "href": f"courses/{f}"} for cc in r["concepts"][i]]})
    s = re.sub(r"window\.MINDMAP_DATA = \{.*?\n\};", "window.MINDMAP_DATA = " + json.dumps(mm, ensure_ascii=False, indent=2) + ";", s, count=1, flags=re.S)
    neighbours = {"ds": [("Data Thinking", "learn-data-thinking-with-phoebe"), ("ML Strategy", "learn-ml-strategy-with-phoebe"), ("Decision Intelligence", "learn-decision-intelligence-with-phoebe")],
                  "de": [("Data Pipelines", "learn-data-pipelines-with-phoebe"), ("Data Observability", "learn-data-observability-with-phoebe"), ("Data Orchestration", "learn-data-orchestration-with-phoebe")],
                  "ai": [("AI Red Team", "learn-ai-red-team-with-phoebe"), ("AI Observability", "learn-ai-observability-with-phoebe"), ("Data Thinking", "learn-data-thinking-with-phoebe")]}[k]
    nb = " &nbsp;·&nbsp; ".join(f'<a href="https://phoebefu6.github.io/{u}/">{n} ↗</a>' for n, u in neighbours)
    s = re.sub(r"<span>Neighbours on the shelf:.*?</span>", f"<span>Neighbours on the shelf: {nb}</span>", s, count=1, flags=re.S)
    open(f"{GH}/{slug}/index.html", "w").write(s)


def readme(k, r):
    slug = f"learn-asking-right-questions-as-{k}-with-phoebe"
    c = r["canon"]
    rows = "\n".join(f"| {i+1} | {t} |" for i, (_, t, _, _) in enumerate(r["sessions"]))
    s = f"""<!-- learn-with-phoebe hub banner -->
> ### 📚 Part of [**Learn with Phoebe**](https://phoebefu6.github.io/learn-with-phoebe/)
> The shelf of free, hands-on courses on AI, data, and the craft around them. **[Browse every course ↗](https://phoebefu6.github.io/learn-with-phoebe/)**
<!-- /learn-with-phoebe hub banner -->

# Learn Asking the Right Questions as {r['article']} {r['label']} with Phoebe

Six 45-minute sessions on the first meeting of any data project, run by {r['article']} {r['lower']}: how to get the
outcome, the decision, the current way of working and the real state of the data out of a business
person who knows nothing about data, in words that teach them something while they answer. No code.

**Live site:** https://phoebefu6.github.io/{slug}/

| # | Session |
|---|---|
{rows}

The bench in session 3 (`assets/asking-live.js` + `assets/asking-bank-{k}.js`) runs the same 45-minute
meeting five ways on the same printed fact sheet. On this sheet the fast yes-or-no interview scores
{c['fast']} and records five beliefs that are wrong; a shuffle averages {c['rnd']}; the Six Doors in order score
{c['doors']}; {r['door'].lower()} first, {c['role']}. Every count is computed from the bank file in the browser. The company
and the person are constructed and say so.

Sibling courses share the framework (canonical in the data analyst course), the company and the
engine: data analyst, data scientist, data engineer, AI developer.

by Phoebe Fu
"""
    open(f"{GH}/{slug}/README.md", "w").write(s)


if __name__ == "__main__":
    for k, r in ROLES.items():
        brief(k, r)
        landing(k, r)
        readme(k, r)
        print("generated", k)
