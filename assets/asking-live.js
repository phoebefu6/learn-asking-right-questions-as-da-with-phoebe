/* asking-live.js - the discovery-meeting simulator for the Asking the Right Questions courses
 *
 * One business person with a hidden fact sheet. The learner has a 45-minute meeting and a bank
 * of questions. Each question costs minutes and, depending on what kind of question it is,
 * uncovers facts, uncovers nothing, or records a false belief the business person agreed to
 * because the question led her there. The score is the value of TRUE facts uncovered minus the
 * cost of FALSE beliefs recorded, and the bench also counts doors opened, trust built and the
 * plain-language teach-back lines the business person heard.
 *
 * What is REAL: every count on the widget. The fact sheet, the question bank, the minute costs
 *   and the trust gates are all printed in the bank file (asking-bank-<role>.js) and every
 *   number is computed from them, here, in the browser. Nothing is asserted.
 * What is CONSTRUCTED, and labelled so on the widget: the company, the person and the fact
 *   sheet itself. Harbourline is invented. The claim the bench makes does not depend on the
 *   exact values: it depends on the MECHANISM (jargon costs minutes and trust, leading
 *   questions record beliefs that are wrong, sensitive facts only surface once trust exists),
 *   and the bench shows that mechanism as an ordering the learner can reproduce.
 *
 * Question kinds:
 *   good     open, about the past or the present, carries a teach-back line; earns trust
 *   closed   yes/no; cheap; uncovers at most one fact; earns nothing
 *   vague    "what are your pain points"; costs minutes; she answers with a generic
 *   jargon   she has to ask what you mean; costs an extra explanation and a point of trust
 *   leading  she agrees with your assumption; a FALSE belief goes into your notes
 *
 * Presets (the ladder), all run on the same bank until the 45 minutes are spent:
 *   jargon    the technical opener most of us were trained to give
 *   random    200 seeded shuffles of the bank, reported as a mean with its range
 *   sixdoors  the shared framework order, door by door
 *   role      the framework tuned to this role's widest door
 *   fast      ANTI: leading and closed questions, many "answers" per minute
 */
(function (root) {
  "use strict";

  /* ---------- deterministic shuffle (mulberry32) ---------- */
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffled(arr, seed) {
    var r = rng(seed), a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- the meeting ---------- */
  function newMeeting(bank) {
    return { bank: bank, minutes: bank.budget, trust: 0, revealed: {}, believed: {},
             asked: [], log: [], withheld: 0 };
  }

  function byId(list) { var m = {}; list.forEach(function (x) { m[x.id] = x; }); return m; }

  /* Ask one question. Returns what she said, or null if the question cannot be asked. */
  function ask(m, qid) {
    var Q = byId(m.bank.questions), F = byId(m.bank.facts), X = byId(m.bank.falseFacts || []);
    var q = Q[qid];
    if (!q) return null;
    if (m.asked.indexOf(qid) >= 0) return { repeat: true };
    if (m.minutes < q.min) return { over: true };
    m.minutes -= q.min;
    m.asked.push(qid);
    var said = [], gained = 0, held = [], falseNote = null;

    if (q.kind === "jargon") m.trust = Math.max(-3, m.trust - 1);
    if (q.kind === "good") m.trust += 1;

    (q.reveals || []).forEach(function (fid) {
      var f = F[fid];
      if (!f) return;
      if ((f.gate || 0) > Math.max(0, m.trust)) { held.push(f); m.withheld++; return; }
      if (m.revealed[fid]) return;
      m.revealed[fid] = true; gained += f.value; said.push(f);
    });
    if (q.kind === "leading" && q.believes && X[q.believes] && !m.believed[q.believes]) {
      m.believed[q.believes] = true; falseNote = X[q.believes];
    }
    var entry = { q: q, said: said, held: held, gained: gained, falseNote: falseNote,
                  trust: m.trust, minutes: m.minutes };
    m.log.push(entry);
    return entry;
  }

  function score(m) {
    var F = m.bank.facts, X = m.bank.falseFacts || [], doors = {};
    var value = 0, n = 0, total = 0, falseCost = 0, nFalse = 0, teach = 0, i;
    for (i = 0; i < F.length; i++) {
      total += F[i].value;
      if (m.revealed[F[i].id]) { value += F[i].value; n++; doors[F[i].door] = true; }
    }
    for (i = 0; i < X.length; i++) if (m.believed[X[i].id]) { falseCost += X[i].cost; nFalse++; }
    for (i = 0; i < m.log.length; i++) if (m.log[i].q.kind === "good") teach++;
    /* the second counter: what was in your notes after 15 minutes, in case the meeting is cut */
    var early = 0, cut = m.bank.early || 15;
    for (i = 0; i < m.log.length; i++) {
      var e = m.log[i];
      if (m.bank.budget - e.minutes > cut) break;
      early += e.gained - (e.falseNote ? e.falseNote.cost : 0);
    }
    var used = m.bank.budget - m.minutes;
    return { value: value, total: total, facts: n, nFacts: F.length, falseCost: falseCost,
             nFalse: nFalse, net: value - falseCost, doors: Object.keys(doors).length,
             nDoors: m.bank.doors.length, teach: teach, trust: m.trust, used: used,
             perMin: used ? (value - falseCost) / used : 0, asked: m.asked.length,
             withheld: m.withheld, early: early, cut: cut };
  }

  /* Run an ordered list of question ids until the budget is spent. */
  function run(bank, order) {
    var m = newMeeting(bank);
    for (var i = 0; i < order.length; i++) {
      if (m.minutes <= 0) break;
      ask(m, order[i]);
    }
    return m;
  }

  function runPreset(bank, preset) {
    if (preset.id === "random") {
      var ids = bank.questions.map(function (q) { return q.id; });
      var draws = preset.draws || 200, acc = null, best = null, worst = null, s;
      for (var d = 0; d < draws; d++) {
        s = score(run(bank, shuffled(ids, 1000 + d)));
        if (!acc) { acc = {}; Object.keys(s).forEach(function (k) { acc[k] = 0; }); }
        Object.keys(s).forEach(function (k) { acc[k] += s[k]; });
        if (!best || s.net > best.net) best = s;
        if (!worst || s.net < worst.net) worst = s;
      }
      var mean = {};
      Object.keys(acc).forEach(function (k) { mean[k] = acc[k] / draws; });
      return { score: mean, best: best, worst: worst, draws: draws, meeting: null };
    }
    var m = run(bank, preset.order);
    return { score: score(m), meeting: m };
  }

  function runAll(bank) {
    var out = {};
    bank.presets.forEach(function (p) { out[p.id] = runPreset(bank, p); });
    return out;
  }

  /* ---------- UI ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function f1(x) { return (Math.round(x * 10) / 10).toFixed(1); }
  function f2(x) { return (Math.round(x * 100) / 100).toFixed(2); }
  function metric(label, value, unit, kind) {
    return '<div class="mb-metric"><span class="mb-mlabel">' + esc(label) + "</span>" +
      '<span class="mb-mvalue">' + esc(value) + "</span>" +
      '<span class="mb-munit">' + esc(unit) + "</span>" +
      '<span class="mb-mkind is-' + kind + '">' + kind + "</span></div>";
  }
  var KIND_WORD = { good: "open", closed: "closed", vague: "vague", jargon: "jargon", leading: "leading" };

  var rootEl, bank, results, readout, table, learner, btns = {}, current = "jargon", mine = null;

  function verdict(id, r) {
    var s = r.score;
    if (id === "fast") return ["bad", s.asked + " questions in " + s.used + " minutes and " + s.nFalse +
      " of the answers are things she agreed to because you assumed them. Net value " + f1(s.net) + " after those beliefs are costed"];
    if (id === "jargon") return ["bad", "She asked what you meant " + countKind(r.meeting, "jargon") +
      " times. Trust ended at " + s.trust + ", so " + s.withheld + " sensitive facts stayed unsaid"];
    if (id === "random") return ["ok", "Mean over " + r.draws + " shuffles: " + f1(s.net) + " net value, " +
      f1(s.doors) + " of " + s.nDoors + " doors. Best draw " + r.best.net + ", worst " + r.worst.net];
    if (id === "role") return ["good", "All " + s.nDoors + " doors opened, " + s.facts + " of " + s.nFacts +
      " facts, " + s.nFalse + " false beliefs. The widest door for this role went first, and trust reached " + s.trust + " early enough to unlock the sensitive ones"];
    return ["ok", s.doors + " of " + s.nDoors + " doors, " + s.facts + " of " + s.nFacts + " facts, net value " + s.net +
      ". Every question carried a teach-back line: she learned " + s.teach + " things about data while answering"];
  }
  function countKind(m, kind) {
    if (!m) return 0;
    return m.log.filter(function (e) { return e.q.kind === kind; }).length;
  }

  function renderPreset() {
    var r = results[current], s = r.score, v = verdict(current, r), mean = current === "random";
    readout.innerHTML =
      '<div class="mb-verdict is-' + v[0] + '">' + esc(v[1]) + ' <span class="mb-mkind is-measured">counted</span></div>' +
      '<div class="mb-metrics">' +
        metric("Net value", mean ? f1(s.net) : s.net, "true facts minus false beliefs, of " + s.total + " available", "counted") +
        metric("Facts uncovered", mean ? f1(s.facts) : s.facts, "of " + s.nFacts + " on her sheet", "counted") +
        metric("Doors opened", mean ? f1(s.doors) : s.doors, "of " + s.nDoors, "counted") +
        metric("False beliefs", mean ? f1(s.nFalse) : s.nFalse, "recorded in your notes, costing " + (mean ? f1(s.falseCost) : s.falseCost), "counted") +
        metric("Value per minute", f2(s.perMin), "net value over " + (mean ? f1(s.used) : s.used) + " minutes used", "counted") +
        metric("Teach-backs", mean ? f1(s.teach) : s.teach, "plain lines she heard about how data works", "counted") +
        metric("After " + s.cut + " minutes", mean ? f1(s.early) : s.early, "net value in your notes if the meeting were cut there", "counted") +
      "</div>";
    if (mean || !r.meeting) {
      table.innerHTML = '<p class="mb-hint">A shuffle has no single transcript. The numbers above are means over ' +
        r.draws + " seeded orders; the best and worst single draws are in the verdict line.</p>";
      return;
    }
    var rows = r.meeting.log.map(function (e) {
      var what = e.said.length ? e.said.map(function (f) { return esc(f.text); }).join("<br>") :
        (e.q.kind === "jargon" ? "<em>\"Sorry, what do you mean by that?\"</em>" :
         e.q.kind === "vague" ? "<em>a generic answer, nothing you can build on</em>" :
         e.q.kind === "leading" ? "<em>\"I suppose so.\"</em>" : "<em>nothing new</em>");
      if (e.falseNote) what += '<br><span class="ask-false">You wrote down: ' + esc(e.falseNote.text) + " (wrong, costs " + e.falseNote.cost + ")</span>";
      if (e.held.length) what += '<br><span class="ask-held">She did not volunteer ' + e.held.length + " thing" + (e.held.length > 1 ? "s" : "") + " (trust too low)</span>";
      return "<tr><th>" + esc(e.q.text) + "<em>" + KIND_WORD[e.q.kind] + " · " + e.q.min + " min</em></th><td>" + what + "</td>" +
        "<td>" + (e.gained > 0 ? "+" + e.gained : "0") + "</td><td>" + e.trust + "</td></tr>";
    }).join("");
    table.innerHTML = '<table class="dt-table"><thead><tr><th>You asked</th><th>She said</th><th>Value</th><th>Trust</th></tr></thead><tbody>' +
      rows + "</tbody></table>";
  }

  function setPreset(id) {
    current = id;
    Object.keys(btns).forEach(function (k) {
      btns[k].classList.toggle("is-on", k === id);
      var i = btns[k].querySelector("input"); if (i) i.checked = (k === id);
    });
    renderPreset();
  }

  /* ---------- the learner's own meeting ---------- */
  function renderMine() {
    var s = score(mine), head = learner.querySelector(".ask-head"), list = learner.querySelector(".ask-list"),
        trans = learner.querySelector(".ask-trans");
    head.innerHTML = '<span class="ask-clock">' + mine.minutes + " min left</span>" +
      '<span class="ask-stat">net value <b>' + s.net + "</b> of " + s.total + "</span>" +
      '<span class="ask-stat">doors <b>' + s.doors + "</b> of " + s.nDoors + "</span>" +
      '<span class="ask-stat">false beliefs <b>' + s.nFalse + "</b></span>" +
      '<span class="ask-stat">trust <b>' + s.trust + "</b></span>" +
      '<button type="button" class="btn ask-reset">Start over</button>';
    head.querySelector(".ask-reset").addEventListener("click", function () { mine = newMeeting(bank); renderMine(); });
    var byDoor = {};
    bank.questions.forEach(function (q) { (byDoor[q.door] = byDoor[q.door] || []).push(q); });
    list.innerHTML = bank.doors.map(function (d) {
      var qs = (byDoor[d.id] || []).map(function (q) {
        var done = mine.asked.indexOf(q.id) >= 0, over = mine.minutes < q.min;
        return '<button type="button" class="ask-q' + (done ? " is-asked is-" + q.kind : "") + '" data-q="' + q.id + '"' +
          ((done || over) ? " disabled" : "") + ">" + esc(q.text) + '<span class="ask-min">' + q.min + " min</span></button>";
      }).join("");
      return '<div class="ask-door"><h4>' + esc(d.label) + "</h4>" + qs + "</div>";
    }).join("");
    list.querySelectorAll(".ask-q:not([disabled])").forEach(function (b) {
      b.addEventListener("click", function () { ask(mine, b.getAttribute("data-q")); renderMine(); });
    });
    if (!mine.log.length) {
      trans.innerHTML = '<p class="mb-hint">' + esc(bank.persona.name) + ", " + esc(bank.persona.title) +
        '. She opens with: "' + esc(bank.persona.opener) + '" You have ' + bank.budget + " minutes. Pick a question.</p>";
      return;
    }
    var last = mine.log[mine.log.length - 1];
    var what = last.said.length ? last.said.map(function (f) { return "<li>" + esc(f.text) + "</li>"; }).join("") :
      (last.q.kind === "jargon" ? "<li><em>\"Sorry, what do you mean by that?\" Two minutes go on explaining, and she is a little less sure you understand her shop.</em></li>" :
       last.q.kind === "vague" ? "<li><em>\"Oh, the usual. Stock, staff, the reports being late.\" Nothing you can build on.</em></li>" :
       last.q.kind === "leading" ? "<li><em>\"I suppose so, yes.\"</em></li>" : "<li><em>Nothing new.</em></li>");
    if (last.falseNote) what += '<li class="ask-false">You wrote down: ' + esc(last.falseNote.text) + ". That is wrong, and it will cost " + last.falseNote.cost + " when you build on it.</li>";
    if (last.held.length) what += '<li class="ask-held">There is something she did not say. Trust is ' + last.trust + " and it needs more.</li>";
    var teach = last.q.kind === "good" && last.q.teach ? '<p class="ask-teach"><b>What she learned from how you asked:</b> ' + esc(last.q.teach) + "</p>" : "";
    var done = mine.minutes < 1 ? '<div class="mb-verdict is-ok">Meeting over. Net value ' + s.net + " against " +
      results.role.score.net + " for the role-tuned order and " + f1(results.random.score.net) + " for a shuffle. " +
      s.doors + " of " + s.nDoors + " doors opened, " + s.nFalse + " false beliefs recorded.</div>" : "";
    trans.innerHTML = '<p class="ask-you">You: ' + esc(last.q.text) + "</p><ul class=\"ask-she\">" + what + "</ul>" + teach + done;
  }

  function buildUI() {
    var panel = document.createElement("div");
    panel.className = "mb-presets";
    bank.presets.forEach(function (p) {
      var lab = document.createElement("label");
      lab.className = "mb-preset" + (p.anti ? " is-anti" : "");
      lab.innerHTML = '<input type="radio" name="ask-p" value="' + p.id + '">' +
        '<span class="mb-pname">' + esc(p.label) + (p.anti ? ' <em class="mb-anti">fast, and wrong</em>' : "") + "</span>" +
        '<span class="mb-pnote">' + esc(p.note) + "</span>";
      panel.appendChild(lab);
      btns[p.id] = lab;
      lab.querySelector("input").addEventListener("change", function () { setPreset(p.id); });
    });
    var hint = document.createElement("p");
    hint.className = "mb-hint";
    hint.textContent = bank.persona.name + " is invented, and so is Harbourline. Her fact sheet holds " + bank.facts.length +
      " facts worth " + score(newMeeting(bank)).total + " points across " + bank.doors.length + " doors; " +
      (bank.falseFacts || []).length + " leading questions each record a belief that is wrong. Every question's minute cost, kind and trust gate is printed in the bank file. " +
      "Everything on this widget is counted from those; the only claim made is the ordering, and you can change the numbers and re-run it.";
    readout = document.createElement("div"); readout.className = "mb-readout";
    table = document.createElement("div"); table.className = "dt-tablewrap";
    rootEl.appendChild(panel); rootEl.appendChild(hint); rootEl.appendChild(readout); rootEl.appendChild(table);

    learner = document.createElement("div");
    learner.className = "ask-learner";
    learner.innerHTML = '<h3>Now you. Same person, same 45 minutes.</h3><div class="ask-head"></div><div class="ask-trans"></div><div class="ask-list"></div>';
    rootEl.appendChild(learner);
    mine = newMeeting(bank);
    renderMine();
    setPreset(current);
  }

  function init() {
    rootEl = document.getElementById("ask-bench");
    bank = root.ASK_BANK;
    if (!rootEl || !bank) return;
    results = runAll(bank);
    buildUI();
    root.ASK_LIVE = { results: results, show: setPreset, bank: bank, meeting: function () { return mine; } };
  }

  var api = { newMeeting: newMeeting, ask: ask, score: score, run: run, runPreset: runPreset, runAll: runAll, shuffled: shuffled };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})(typeof window !== "undefined" ? window : this);
