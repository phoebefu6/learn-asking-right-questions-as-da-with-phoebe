/* asking-bank-da.js - the data analyst's meeting with Harbourline
 *
 * Everything the simulator counts is here, in the open. Harbourline (38 pharmacy and clinic
 * outlets, Singapore and Malaysia) and Adeline Tan, its operations director, are invented.
 * The request that started the meeting: "we need a sales dashboard, the Monday report is
 * always late and nobody trusts it."
 *
 * facts      what is true on her side; value = how much a build goes wrong without it;
 *            gate = the trust she needs before she will say it unprompted
 * questions  kind, minute cost, which facts they surface, and for open questions the
 *            plain teach-back line the analyst says out loud about why they are asking
 * falseFacts what a leading question puts in your notes; cost = what building on it wastes
 * presets    the five orders the bench runs, and the anti-lever
 */
window.ASK_BANK = {
  role: "da",
  roleLabel: "Data analyst",
  budget: 45,
  early: 20,
  persona: {
    name: "Adeline Tan",
    title: "operations director, Harbourline (38 pharmacy and clinic outlets, SG and MY)",
    opener: "Thanks for coming. We need a sales dashboard. The Monday report is always late and honestly nobody trusts the numbers in it."
  },
  doors: [
    { id: "outcome",     label: "Outcome · what would be different" },
    { id: "decision",    label: "Decision · who does what with the number" },
    { id: "current",     label: "Current way · how it happens today" },
    { id: "data",        label: "Data state · where the numbers live" },
    { id: "constraints", label: "Constraints · what is off the table" },
    { id: "success",     label: "Success and partnership · how we will both know" }
  ],
  facts: [
    { id: "f01", door: "outcome",     value: 4, gate: 1, text: "The real worry is chronic-medication stock-outs in six Malaysian outlets. The dashboard request is a stand-in for that." },
    { id: "f02", door: "outcome",     value: 3, gate: 0, text: "Head office measures her on expired-stock write-off: 2.1 percent of cost of goods this year, target 1.5." },
    { id: "f03", door: "outcome",     value: 2, gate: 0, text: "The Monday report exists because the regional GM asks 'which outlets are down' every Monday." },
    { id: "f04", door: "decision",    value: 5, gate: 0, text: "The Monday decision is next week's reorder quantity per outlet, made by three area managers, due Tuesday noon." },
    { id: "f05", door: "decision",    value: 3, gate: 1, text: "When a number looks bad they phone the outlet. They do not change the order. Today the report changes nothing." },
    { id: "f06", door: "decision",    value: 3, gate: 0, text: "Weekly is the right cadence. A daily number would not be read; nobody has a daily decision." },
    { id: "f07", door: "decision",    value: 2, gate: 0, text: "Area managers act at outlet level. Product-level detail is for the pharmacist in the outlet, not for them." },
    { id: "f08", door: "current",     value: 4, gate: 0, text: "Priya in finance builds the report in Excel every Monday from a POS export. It takes her six hours. She is on leave for two weeks in November." },
    { id: "f09", door: "current",     value: 3, gate: 1, text: "Stock counts come from a shared Excel per outlet, updated by outlet managers on Fridays. Three versions of it are in circulation." },
    { id: "f10", door: "current",     value: 2, gate: 0, text: "Supplier orders go over WhatsApp. There is no order table anywhere." },
    { id: "f11", door: "current",     value: 2, gate: 0, text: "The Excel has an 'adjustments' column. Nobody can explain what goes in it." },
    { id: "f12", door: "data",        value: 4, gate: 0, text: "One cloud POS vendor, export is a CSV per outlet. Product codes differ between the Singapore and Malaysia outlets." },
    { id: "f13", door: "data",        value: 3, gate: 1, text: "Loyalty data sits with the app vendor. An export costs extra and needs a contract clause." },
    { id: "f14", door: "data",        value: 3, gate: 3, text: "Kenneth is the only IT person and holds the POS admin login. He is leaving in January. She has not told the team." },
    { id: "f15", door: "data",        value: 2, gate: 0, text: "Nobody owns the product master. Two outlets renamed SKUs themselves last year." },
    { id: "f16", door: "data",        value: 2, gate: 0, text: "POS history goes back three years. Before that it was paper." },
    { id: "f17", door: "constraints", value: 3, gate: 0, text: "No budget this quarter. A SGD 15,000 tooling budget opens in Q1." },
    { id: "f18", door: "constraints", value: 2, gate: 0, text: "Area managers are on their phones on Monday, in the outlets. Not at a laptop." },
    { id: "f19", door: "constraints", value: 2, gate: 0, text: "Malaysian loyalty data needs PDPA handling and the head office lawyer takes four weeks to answer anything." },
    { id: "f20", door: "constraints", value: 2, gate: 0, text: "The board meets in six weeks. She wants one slide for it, not a demo." },
    { id: "f21", door: "success",     value: 4, gate: 1, text: "Her test of success: the area managers stop phoning her on Monday afternoon. 'If my phone is quiet, it worked.'" },
    { id: "f22", door: "success",     value: 3, gate: 0, text: "She would pair Priya with you two hours a week. Priya wants to learn and has asked for a course." },
    { id: "f23", door: "success",     value: 2, gate: 1, text: "A BI vendor ran a pilot last year. Beautiful dashboards, nobody opened them after week two. She is wary of the word." },
    { id: "f24", door: "success",     value: 2, gate: 0, text: "She would sponsor a pilot in four outlets first, never all 38 at once." }
  ],
  falseFacts: [
    { id: "x01", cost: 3, text: "needs a daily refresh", wrong: "f06" },
    { id: "x02", cost: 2, text: "product-level detail for the area managers", wrong: "f07" },
    { id: "x03", cost: 4, text: "stock levels come from the POS", wrong: "f09" },
    { id: "x04", cost: 3, text: "a dashboard is the deliverable", wrong: "f23" },
    { id: "x05", cost: 2, text: "everyone reads it on a laptop", wrong: "f18" }
  ],
  questions: [
    /* open questions, one teach-back line each */
    { id: "g01", door: "decision", kind: "good", min: 5, reveals: ["f04", "f03"],
      text: "Walk me through Monday morning. Who opens the report, and what do they do next?",
      teach: "I start with the Monday because a report is only worth what someone does after reading it." },
    { id: "g02", door: "decision", kind: "good", min: 4, reveals: ["f04", "f05"],
      text: "When a number looks bad, what changes that week? Who makes the call, and by when?",
      teach: "The deadline tells me how fresh the data has to be. Fresher costs more, so I only build fresh where a decision needs it." },
    { id: "g03", door: "decision", kind: "good", min: 4, reveals: ["f05", "f21"],
      text: "Tell me about the last time the report actually changed a decision.",
      teach: "Asking about a real past time, not a hoped-for future, is how I avoid building for a meeting that never happens." },
    { id: "g04", door: "decision", kind: "good", min: 4, reveals: ["f06", "f07"],
      text: "If the numbers arrived a day earlier, what would you do differently?",
      teach: "If the answer is 'nothing', the report does not need to be faster. It needs to be different." },
    { id: "g05", door: "outcome", kind: "good", min: 5, reveals: ["f01", "f02"],
      text: "What is the problem behind the report? If it worked, what would be different in six months?",
      teach: "A dashboard is a tool. I need the outcome, because I can check a tool against an outcome and not the other way round." },
    { id: "g06", door: "outcome", kind: "good", min: 3, reveals: ["f02", "f20"],
      text: "What does head office measure you on this year?",
      teach: "Whatever you are measured on is the number I should be able to move. Everything else is nice to have." },
    { id: "g07", door: "current", kind: "good", min: 5, reveals: ["f08", "f11"],
      text: "How is the report made today? Can you show me the file and tell me who builds it?",
      teach: "The current file is the spec. Every column in it is a decision somebody once made, and I would rather inherit those than guess." },
    { id: "g08", door: "current", kind: "good", min: 4, reveals: ["f09", "f10"],
      text: "Where do the stock numbers in it come from, step by step?",
      teach: "A number that is typed by a person on a Friday behaves differently from one a till records. I need to know which I am dealing with." },
    { id: "g09", door: "current", kind: "good", min: 3, reveals: ["f08", "f22"],
      text: "What happens when Priya is away?",
      teach: "If one person is the pipeline, the first thing to build is not a chart. It is a second person." },
    { id: "g10", door: "data", kind: "good", min: 5, reveals: ["f12", "f16"],
      text: "Which systems does one sale touch, from the till to head office?",
      teach: "Every hand-off between systems is a place a number can change. I am counting the hand-offs." },
    { id: "g11", door: "data", kind: "good", min: 3, reveals: ["f14", "f12"],
      text: "Who can log in to the POS back office and pull an export?",
      teach: "Access is the first blocker on most data projects, so I ask early and I ask by name." },
    { id: "g12", door: "data", kind: "good", min: 4, reveals: ["f12", "f15"],
      text: "Do the Singapore and Malaysia outlets use the same product codes? Who decides a new one?",
      teach: "Two outlets calling the same thing by two names is the most common reason a total is wrong. It is a naming problem before it is a data problem." },
    { id: "g13", door: "data", kind: "good", min: 4, reveals: ["f13"],
      text: "What does the loyalty app hold about a customer, and who owns that data?",
      teach: "Owned means who can say yes to an export. That is usually a contract, not a login." },
    { id: "g14", door: "constraints", kind: "good", min: 4, reveals: ["f17", "f19"],
      text: "What is off the table? Budget, time, legal, people.",
      teach: "I ask for the limits first so I do not propose something you could never approve." },
    { id: "g15", door: "constraints", kind: "good", min: 3, reveals: ["f18"],
      text: "Where do the area managers read this? Laptop, phone, or printed?",
      teach: "A table that needs a laptop is not read on a phone. The device decides the design." },
    { id: "g16", door: "constraints", kind: "good", min: 3, reveals: ["f20"],
      text: "When is the next moment you have to show something upward?",
      teach: "A date I can aim at is worth more than a scope. I would rather ship one honest number by the board than a suite after it." },
    { id: "g17", door: "success", kind: "good", min: 4, reveals: ["f21", "f24"],
      text: "How will you know this worked? What would you stop doing?",
      teach: "If we agree on the test now, neither of us has to argue about it later." },
    { id: "g18", door: "success", kind: "good", min: 4, reveals: ["f23", "f01"],
      text: "Have you tried something like this before? What happened?",
      teach: "The last attempt tells me what your team will and will not adopt. That is worth more than any feature list." },
    { id: "g19", door: "success", kind: "good", min: 3, reveals: ["f22"],
      text: "Who on your side could spend two hours a week with me on this?",
      teach: "The person who works with me becomes the person who can run it after I leave. That is the whole point." },
    { id: "g20", door: "outcome", kind: "good", min: 4, reveals: ["f01", "f24"],
      text: "Which outlets keep you up at night, and why?",
      teach: "Specific outlets give me a place to start small and prove it, instead of a rollout to 38 at once." },

    /* vague questions: she answers with a generic */
    { id: "v01", door: "outcome", kind: "vague", min: 4, reveals: ["f03"],
      text: "What are your main pain points?" },
    { id: "v02", door: "outcome", kind: "vague", min: 3, reveals: [],
      text: "What are your goals for data?" },
    { id: "v03", door: "decision", kind: "vague", min: 3, reveals: ["f02"],
      text: "What KPIs do you track?" },
    { id: "v04", door: "success", kind: "vague", min: 3, reveals: [],
      text: "How could data help your business?" },

    /* jargon: she has to ask what you mean */
    { id: "j01", door: "data", kind: "jargon", min: 5, reveals: [],
      text: "Where does your data warehouse sit, and is it modelled as a star schema?" },
    { id: "j02", door: "data", kind: "jargon", min: 5, reveals: [],
      text: "Is the POS data exposed over an API, or do we need a CDC pipeline?" },
    { id: "j03", door: "current", kind: "jargon", min: 5, reveals: [],
      text: "What is your current BI stack and the refresh SLA on it?" },
    { id: "j04", door: "data", kind: "jargon", min: 5, reveals: [],
      text: "Do you have a semantic layer or governed metric definitions?" },
    { id: "j05", door: "data", kind: "jargon", min: 5, reveals: [],
      text: "What is the grain of the sales fact table?" },

    /* leading: she agrees, and a false belief goes into your notes */
    { id: "l01", door: "decision", kind: "leading", min: 1, reveals: [], believes: "x01",
      text: "You would want this refreshed daily, right?" },
    { id: "l02", door: "decision", kind: "leading", min: 1, reveals: [], believes: "x02",
      text: "Product-level detail for the area managers, I assume?" },
    { id: "l03", door: "data", kind: "leading", min: 2, reveals: [], believes: "x03",
      text: "The stock numbers come out of the POS system, correct?" },
    { id: "l04", door: "outcome", kind: "leading", min: 1, reveals: [], believes: "x04",
      text: "So a dashboard would fix this?" },
    { id: "l05", door: "constraints", kind: "leading", min: 1, reveals: [], believes: "x05",
      text: "Everyone is on a laptop on Monday, I take it?" },

    /* closed: cheap, one fact at most */
    { id: "c01", door: "current", kind: "closed", min: 1, reveals: ["f03"],
      text: "Is the report weekly?" },
    { id: "c02", door: "current", kind: "closed", min: 2, reveals: ["f08"],
      text: "Is Priya the only one who builds it?" },
    { id: "c03", door: "constraints", kind: "closed", min: 1, reveals: ["f17"],
      text: "Is there a budget?" }
  ],
  presets: [
    { id: "jargon", label: "The technical opener",
      note: "Warehouse, API, BI stack, grain. The questions an analyst is trained to ask a data team, asked of a person who runs pharmacies.",
      order: ["j01", "j02", "j03", "j04", "j05", "v01", "v03", "g07", "g10", "g11", "g12", "g08", "g14", "g01", "g05", "g17"] },
    { id: "random", label: "Any order at all", draws: 200,
      note: "Two hundred seeded shuffles of the whole bank, each run until the 45 minutes are gone. Reported as a mean." },
    { id: "sixdoors", label: "Six Doors, door by door",
      note: "The shared framework in its printed order: outcome, decision, current way, data state, constraints, success. Two open questions per door.",
      order: ["g05", "g06", "g01", "g02", "g07", "g08", "g10", "g12", "g14", "g15", "g17", "g19", "g04", "g18", "g11", "g13"] },
    { id: "role", label: "Six Doors, tuned for an analyst",
      note: "Decision door first and widest, because an analyst's output is a number somebody acts on. Trust is earned before the sensitive facts are needed.",
      order: ["g01", "g02", "g04", "g07", "g08", "g05", "g10", "g12", "g14", "g17", "g11", "g15", "g19", "g18", "g13", "g16", "g06", "g20", "g03", "g09"] },
    { id: "fast", label: "The efficient interview", anti: true,
      note: "Yes-or-no and leading questions, one minute each. Eight answers in the first nine minutes. It looks like the best meeting in the room.",
      order: ["l01", "l02", "l03", "l04", "l05", "c01", "c02", "c03", "v01", "v03", "j01", "g07", "g10", "g12", "g08", "g14", "g15", "g17", "g01", "g05"] }
  ]
};
