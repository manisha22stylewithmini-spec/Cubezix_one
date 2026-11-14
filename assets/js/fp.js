/* Feature pages (Desk, Assets, People, Sign): short inner pages built from the services-page components. */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const { IC } = window.CZ_NAV;
  const key = document.body.dataset.fp;
  const D = [window.DK, window.AS, window.PE, window.SG].map((m) => m && Object.values(m).find((x) => x.key === key)).find(Boolean);
  if (!D) return;
  const pk = { "ONE Desk": "desk", "ONE Assets": "assets", "ONE People": "people", "ONE Sign": "sign" }[D.parent[0]];
  const ck = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const H = D.hero, n = H.rows.length;
  $("#fp-crumb").innerHTML = `<a href="${D.parent[1]}">${D.parent[0]}</a>${IC.chev.replace("<svg", '<svg style="transform:rotate(-90deg)"')}<b>${D.name}</b>`;
  $("#fp-eyebrow").textContent = D.eyebrow; $("#fp-h1").innerHTML = D.title; $("#fp-lead").textContent = D.lead; $("#fp-note").textContent = D.note;
  $("#sv-win").innerHTML = `<div class="sv-frame"><div class="sv-screen"><div class="sv-top"><div><b>${H.title}</b><small>${H.sub}</small></div><span class="sv-live"><em></em>Live</span></div>
  <div class="sv-rows">${H.rows.map((r, i) => `<div class="sv-r${r[2] ? "" : " need"}" style="--i:${i}"><i class="sv-av">${r[2] ? r[0].split(" ").map((w) => w[0]).slice(0, 2).join("") : "?"}</i><span class="sv-nm"><b>${r[0]}</b><small>${r[1]}</small></span>${r[2] ? `<span class="sv-st"><span class="sv-to">${H.to}</span><span class="sv-ok">${ck} ${r[2]}</span></span>` : `<span class="sv-st"><span class="sv-nd">Needs you</span></span>`}</div>`).join("")}</div>
  <div class="sv-ft"><span>${n - 1} of ${n} ${H.verb} · 1 needs you</span><div class="sv-bar"><i></i></div></div></div></div>`;
  $("#fp-wh").innerHTML = `<span class="eyebrow">${D.what.eyebrow}</span><h2 class="h2">${D.what.title}</h2><p>${D.what.sub}</p>`;
  const V = (window.EP_VIZ || {})[pk] || {}, AL = {
    desk: { "reply and fix times": "slas", "business hours": "slas", escalation: "slas", rules: "routing", "teams and people": "routing", search: "knowledge base", categories: "knowledge base", "draft from a ticket": "knowledge base", "their tickets": "customer portal", "add details": "customer portal", "your branding": "customer portal" },
    assets: { "serial and supplier": "records", "price and warranty": "records", "labels you can scan": "records", "sign on receipt": "hand-overs", "condition noted": "hand-overs", "always know who has it": "hand-overs", repairs: "repairs", "tickets and parts": "repairs", warranties: "warranties", checklist: "hand-overs", "condition check": "hand-overs", "ready for the next person": "records" },
    people: { details: "employee file", documents: "employee file", history: "employee file", "request in the app": "leave", "balance and calendar": "leave", approval: "leave", "photo of the receipt": "expenses", reimbursement: "expenses", "auto check-in": "attendance", shifts: "attendance", timesheets: "attendance", "pay runs": "payroll", "the payslip": "payroll", breakdown: "payroll" },
    sign: { "browser or app": "sign anywhere", "drawn or typed": "sign anywhere", "any device": "sign anywhere", "who signs first": "signing order", "roles and deadlines": "signing order", "decline with a reason": "signing order", "a nudge before it goes stale": "reminders", "the schedule": "reminders", "tell the sender": "reminders", "who, when and where": "audit trail", "versions kept": "audit trail", "a sealed certificate": "audit trail", "your stamp": "company stamp", "who may apply it": "company stamp", "every use logged": "company stamp" },
  }[pk], viz = {};
  const used = new Set();
  D.what.list.forEach((r) => { const k = r[0].toLowerCase(), t = V[k] ? k : AL[k]; if (t && V[t] && !used.has(t)) { used.add(t); viz[k] = V[t]; } });
  window.EP_why($("#ep-why"), D.what.list, { viz });
  $("#ep-steps").innerHTML = D.steps.map((s, i) => `<article class="ep-step rv" style="--d:${i * 0.08}s"><div class="ep-sn"><span>0${i + 1}</span><i></i></div><h3>${s[0]}</h3><p>${s[1]}</p><span class="ep-when">${s[2]}</span></article>`).join("");
  const acEl = $("#faq-list");
  acEl.innerHTML = D.faq.map((f, i) => `<div class="ac-i${i === 0 ? " open" : ""}"><h3><button class="ac-t" type="button" id="acq${i}" aria-expanded="${i === 0}" aria-controls="aca${i}"><span class="ac-n">0${i + 1}</span><span class="ac-q">${f[0]}</span><span class="ac-ch">${IC.chev}</span></button></h3><div class="ac-c" id="aca${i}" role="region" aria-labelledby="acq${i}"><div><p>${f[1]}</p></div></div></div>`).join("");
  acEl.addEventListener("click", (e) => { const b = e.target.closest(".ac-t"); if (!b) return; const it = b.closest(".ac-i"), was = it.classList.contains("open"); $$(".ac-i", acEl).forEach((x) => { x.classList.remove("open"); $(".ac-t", x).setAttribute("aria-expanded", "false"); }); if (!was) { it.classList.add("open"); b.setAttribute("aria-expanded", "true"); } });
  $("#fp-more-h").textContent = "More from " + D.parent[0];
  $("#fp-more").innerHTML = D.more.map((m) => `<a class="fp-chip" href="${m[1]}">${m[0]}${IC.arrow}</a>`).join("");
  $("#sv-pager").innerHTML = `<a class="sv-pg prev" href="${D.prev[1]}"><small>Previous</small><b>${IC.arrow}${D.prev[0]}</b></a><a class="sv-pg all" href="${D.parent[1]}"><small>Back to</small><b>${D.parent[0]}</b></a><a class="sv-pg next" href="${D.next[1]}"><small>Next</small><b>${D.next[0]}${IC.arrow}</b></a>`;
  const cm = $("#cta-mark"); if (cm) cm.innerHTML = window.CZ_NAV.mark(100);
  if (window.CZ_shaderBg) window.CZ_shaderBg($(".h2-cta-card"), [0.05, 0.35, 0.85]);
  if (window.ONEERP && ONEERP.observeReveal) ONEERP.observeReveal();
})();
