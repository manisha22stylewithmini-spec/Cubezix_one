/* ONE ERP page */
(function () {
  const { IC } = window.CZ_NAV;
  const { fmt, rates } = window.ONEERP;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* key, name, icon, one line, why, holds, status, peek [title, id, rows] */
  const MODS = [
    ["crm", "CRM", IC.target, "Leads, follow-ups and quotations, with the whole pipeline in one place.", "A lead that waits goes cold. When every lead, its last contact and its quote sit in one place, a follow-up no longer depends on someone remembering it.", ["Leads", "Contacts", "Quotations", "Activities"], "1 lead waiting 3 days", ["Lead", "LD-2026-0312", [["Company", "Al Noor Trading"], ["Waiting", "3 days"]]]],
    ["sales", "Sales", IC.doc, "Quotes, orders, deliveries and invoices: one record from the first quote to the payment.", "The quote, the order, the delivery and the invoice are one deal at four stages. Kept as one record, the price agreed is the price invoiced, and nothing delivered goes unbilled.", ["Quotes", "Sales orders", "Delivery notes", "Invoices", "Price lists"], "1 quote above your discount limit", ["Quote", "QT-2026-0187", [["Customer", "Harbour Line Freight"], ["Discount", "18%, above your 15% limit"], ["Prepared by", "Omar, Sales"]]]],
    ["inventory", "Inventory", IC.box, "Stock in every location, counted as it moves.", "Receipts, transfers and deliveries change the stock on the same record, so the number on screen is the number on the shelf, and a low item raises its own purchase order.", ["Items", "Locations", "Stock moves", "Batches and serials"], "1 item below its reorder point", ["Shipping carton 40×30", "PK-4030", [["In stock", "120"], ["Reorder at", "200"]]]],
    ["procurement", "Procurement", IC.cart, "Requests, purchase orders and supplier invoices, checked against budget.", "A purchase that is over budget stops and asks the person who owns the budget, with the numbers beside the question, instead of surfacing at month-end.", ["Requests", "Purchase orders", "Supplier invoices", "Budgets"], "1 purchase order over budget", ["Purchase order", "PO-2026-0418", [["Supplier", "Gulf Pack Supplies"], ["Budget", "Over by 6%"]]]],
    ["finance", "Finance", IC.bank, "Every dirham in and out, matched to your books as it goes.", "Customers paying in, suppliers, payroll and VAT going out are matched to your ledger as they arrive. The one line it cannot place comes to you.", ["Ledger", "Bank lines", "VAT", "Fixed assets"], "1 bank line to match", ["Bank line", "BL-2026-1093", [["Received", "AED 8,640.00"], ["From", "Harbour Line Freight"], ["Assigned to", "Hana, Finance"]]]],
    ["payroll", "Payroll", IC.wallet, "Monthly payroll with the WPS file prepared for your bank.", "Salary files are prepared from the same employee record and held until every employee has bank details, so the run that goes out is the run that was checked.", ["Pay runs", "WPS files", "Gratuity", "Deductions"], "All caught up", ["Payroll run", "October", [["Employees", "8"], ["Net total", "AED 96,400.00"]]]],
    ["hr", "HR", IC.users, "People, documents and the dates that matter.", "Contracts, visas and leave live with the employee, and the date that is about to lapse reaches the person who can act on it, thirty days before it does.", ["Employees", "Contracts", "Visas", "Leave"], "1 visa expiring in 30 days", ["Visa renewal", "VR-2026-0044", [["Employee", "Fatima, HR"], ["Expires", "21 Nov 2026"]]]],
    ["operations", "Operations", IC.truck, "Deliveries, jobs and the work between the order and the invoice.", "Every delivery has an owner and a time. When one runs late, the customer is told by the system, not by whoever noticed first.", ["Deliveries", "Routes", "Jobs", "Service tickets"], "1 delivery running late", ["Delivery", "DL-2026-0207", [["Customer", "Marina Dental Group"], ["Expected", "2 hours late"]]]],
  ];

  /* ---------- 1 · console ---------- */
  const rail = $("#ep-rail"), main = $("#ep-main"), con = $("#ep-con");
  rail.innerHTML = MODS.map((m, i) => `<button class="ep-tab" role="tab" type="button" data-i="${i}" aria-selected="false"><i>${m[2]}</i><span>${m[1]}</span></button>`).join("");
  let cur = -1, auto = true, timer = 0;
  function show(i) {
    cur = i; const m = MODS[i], p = m[7];
    $$(".ep-tab", rail).forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-selected", k === i); });
    main.classList.remove("in"); void main.offsetWidth;
    main.innerHTML = `<div class="ep-mh"><i class="ep-tile">${m[2]}</i><div><small>ONE ERP</small><b>${m[1]}</b></div><span class="ep-live"><em></em>Live</span></div>
      <p class="ep-d">${m[3]}</p>
      <div class="ep-tk"><div class="ep-tk-h"><i>${m[2]}</i><div><small>${m[1]}</small><b>${p[0]} <code>${p[1]}</code></b></div><span class="ep-need">Needs you <u>1</u></span></div>${p[2].map((r) => `<div class="ep-tk-r"><span>${r[0]}</span><b>${r[1]}</b></div>`).join("")}</div>
      <div class="ep-hold"><small>Holds</small>${m[5].map((h) => `<span>${h}</span>`).join("")}</div>`;
    main.classList.add("in");
  }
  rail.addEventListener("click", (e) => { const b = e.target.closest(".ep-tab"); if (!b) return; auto = false; clearInterval(timer); show(+b.dataset.i); });
  con.addEventListener("pointerenter", () => { clearInterval(timer); });
  con.addEventListener("pointerleave", () => { if (auto && !still) loop(); });
  function loop() { clearInterval(timer); timer = setInterval(() => show((cur + 1) % MODS.length), 4200); }
  show(4);
  new IntersectionObserver(([e]) => { if (e.isIntersecting && auto && !still) loop(); else clearInterval(timer); }, { threshold: 0.35 }).observe(con);

  /* ---------- 2 · module lanes (layered cards) ---------- */
  const LANES = [["Sell", "Win it and bill it", [0, 1], "#633ADD"], ["Supply", "Stock and spend", [2, 3], "#3A4CE1"], ["Money", "Cash in, pay out", [4, 5], "#80D1D4"], ["People and work", "Staff, jobs, delivery", [6, 7], "#2B2FA0"]];
  // strip label, strip colours, owners (initials), links counted from the event flows below
  const TAB = [["Follow up", "#8B5CF6", "#633ADD"], ["Needs you", "#5B6CF0", "#3A4CE1"], ["Low stock", "#80D1D4", "#4FB6BB"], ["Over budget", "#8B5CF6", "#633ADD"], ["To match", "#5B6CF0", "#3A4CE1"], ["All caught up", "#80D1D4", "#4FB6BB"], ["Expiring soon", "#8B5CF6", "#633ADD"], ["Running late", "#5B6CF0", "#3A4CE1"]];
  const OWN = [["OK"], ["OK", "AR"], ["YA"], ["HN", "YA"], ["HN", "MA"], ["MA"], ["FA", "AR"], ["AJ", "SR"]];
  const AVC = ["#80D1D4", "#3A4CE1", "#633ADD", "#2B2FA0"];
  const EVT = [["Procurement", "Inventory", "Finance"], ["Sales", "Operations", "Finance"], ["Inventory", "Procurement"], ["Finance"], ["Payroll", "Finance"], ["CRM", "Sales"], ["HR"]];
  const links = (name) => { const set = new Set(); EVT.forEach((t) => { if (t.includes(name)) t.forEach((x) => x !== name && set.add(x)); }); return set.size; };
  const lcard = (i) => { const m = MODS[i], t = TAB[i];
    return `<article class="ep-lc" id="module-${m[0]}" tabindex="0" style="--s1:${t[1]};--s2:${t[2]}"><div class="ep-lc-tag">${t[0]}</div><div class="ep-lc-body"><div class="ep-lc-dash"><div class="ep-lc-top"><i class="ep-lc-ic">${m[2]}</i><h3>${m[1]}</h3></div><p class="ep-lc-p">${m[3]}</p><div class="ep-lc-more"><div><p>${m[4]}</p><a class="ep-lc-open" href="erp-${m[0]}.html">Open ${m[1]} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div></div><div class="ep-lc-row"><span class="ep-av">${OWN[i].map((o, k) => `<b style="--c:${AVC[(i + k) % 4]}">${o}</b>`).join("")}</span><span class="ep-lc-st"><em></em>${m[6]}</span></div></div><div class="ep-lc-foot"><span title="What it holds"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12M4 6h.1M4 12h.1M4 18h.1"/></svg>${m[5].length}</span><span title="Modules it works with"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3A4 4 0 0011 18.7l1-1"/></svg>${links(m[1])}</span><span class="ep-lc-hold">${m[5].slice(0, 2).join(", ")}${m[5].length > 2 ? " +" + (m[5].length - 2) : ""}</span></div></div></article>`; };
  const grid = $("#ep-grid"); grid.className = "ep-lanes";
  grid.innerHTML = LANES.map((l, n) => `<div class="ep-lane rv" style="--lc:${l[3]};--d:${n * 0.06}s"><div class="ep-lane-h"><i></i><div><b>${l[0]}</b><small>${l[1]}</small></div><span>${l[2].length} modules</span></div>${l[2].map(lcard).join("")}<a class="ep-lane-add" href="book-a-demo.html"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>Start with ${l[0].toLowerCase()}</a></div>`).join("");
  grid.addEventListener("click", (e) => { const c = e.target.closest(".ep-lc"); if (c && !e.target.closest("a")) c.classList.toggle("open"); });
  grid.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("ep-lc")) { e.preventDefault(); e.target.classList.toggle("open"); } });

  /* ---------- 3 · how work travels ---------- */
  const EV = [
    ["A purchase order is approved", ["Procurement", "Inventory", "Finance"], ["Order approved", "Supplier notified", "Stock expected", "Budget updated"]],
    ["A quote is approved", ["Sales", "Operations", "Finance"], ["Quote approved", "Order created", "Delivery scheduled", "Invoice drafted"]],
    ["Stock falls below its reorder point", ["Inventory", "Procurement"], ["Stock below 200", "Draft PO created", "Sent for approval"]],
    ["A bank line arrives", ["Finance"], ["Bank line received", "Matched to invoice", "Posted to ledger"]],
    ["Payroll is run", ["Payroll", "Finance"], ["Run checked", "WPS file prepared", "Journal posted"]],
    ["A lead is won", ["CRM", "Sales"], ["Lead won", "Quote becomes order", "Customer record created"]],
    ["A visa is 30 days from expiry", ["HR"], ["Date reached", "Owner reminded", "Renewal task opened"]],
  ];
  const evs = $("#ep-evs"), stage = $("#ep-stage");
  evs.innerHTML = EV.map((e, i) => `<button class="ep-ev" type="button" role="tab" data-i="${i}"><span>${String(i + 1).padStart(2, "0")}</span>${e[0]}</button>`).join("");
  function flow(i) {
    const e = EV[i];
    $$(".ep-ev", evs).forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-selected", k === i); });
    { const on = evs.children[i]; if (on && evs.scrollWidth > evs.clientWidth) evs.scrollTo({ left: on.offsetLeft - (evs.clientWidth - on.offsetWidth) / 2, behavior: "smooth" }); }
    stage.classList.remove("go"); stage.innerHTML = `<div class="ep-st-h"><small>When this happens</small><b>${e[0]}</b></div><div class="ep-tags">${e[1].map((t) => `<span>${t}</span>`).join("")}</div>${window.EP_chain(e[2])}`;
    void stage.offsetWidth; stage.classList.add("go");
  }
  flow(2);
  const flowAuto = window.EP_auto($(".ep-flow"), evs, EV.length, flow, 2, 10000);
  evs.addEventListener("click", (ev) => { const b = ev.target.closest(".ep-ev"); if (b) flowAuto.pick(+b.dataset.i); });

  /* ---------- 4 · night shift ---------- */
  const NEV = [["18:20", "Finance", "31 bank lines matched to their invoices by your rules"], ["19:05", "Sales", "Reminders sent for 4 overdue invoices"], ["21:00", "Platform", "Nightly backup completed"], ["23:40", "Operations", "Tomorrow's delivery routes planned"], ["02:15", "HR", "Visa expiry checks run for 212 employees"], ["05:30", "Procurement", "2 supplier statements reconciled"]];
  window.EP_fan($("#ep-fan"), NEV);

  /* ---------- 5 · the UAE, built in ---------- */
  const UAE = [
    ["VAT", "The 5% standard rate on every invoice, your TRN on every document, and the quarterly return prepared for review.", ["Standard rate 5% since 1 January 2018", "Registration required above AED 375,000 of taxable supplies and imports in 12 months", "Return and payment due 28 days after each tax period, usually quarterly", "The VAT shown in AED on every tax invoice"]],
    ["Corporate tax", "[Corporate-tax reporting.]", ["0% up to AED 375,000 of taxable income, 9% above it, for financial years from 1 June 2023", "Return and payment due nine months after the year end", "Small Business Relief for revenue of AED 3m or less, now for tax periods ending on or before 31 December 2029"]],
    ["E-invoicing", "[ONE ERP's readiness for the UAE e-invoicing system, and its accredited service provider.]", ["Structured XML invoices (Peppol, PINT-AE) exchanged through accredited service providers; a PDF no longer counts", "Revenue of AED 50m or more: provider appointed by 30 October 2026, live from 1 January 2027", "Everyone else: by 31 March 2027, live from 1 July 2027", "Business and government sales; sales to consumers excluded for now"]],
    ["WPS", "Salary files for the Wage Protection System, prepared from the payroll run and held until every employee has bank details.", ["Wages paid through MOHRE-approved banks, exchange houses and financial institutions", "Since 1 June 2020, due on the 1st of each month with no grace period; sanctions start within days"]],
    ["Gratuity", "[End-of-service gratuity accrued for each employee, every month.]", ["After a year's service: 21 days' basic wage for each of the first five years, 30 days for each year after, capped at two years' wage, paid within 14 days of the contract ending (Federal Decree-Law 33 of 2021)"]],
    ["Currencies", "AED as the base; invoices, payments and reports in AED, SAR and USD [and other currencies].", ["Demo rates: USD 1 = AED 3.6725 = SAR 3.75"]],
    ["Records", "[Records kept for as long as UAE law requires, and exported for a tax audit.]", []],
  ];
  window.EP_why($("#ep-why"), UAE);

  /* ---------- 6 · going live ---------- */
  const STEPS = [["Walk through it", "A demo shaped around your company, your modules and your own processes, not a generic tour.", "Day 1"], ["We move you in", "We bring across customers, stock and balances, merge the duplicates, and set up VAT, roles and approvals with you.", "Week 1 to [x]"], ["Go live, and after", "Your dedicated contact stays on after launch, so every question goes to one person who knows your setup.", "Then, every day"]];
  const steps = $("#ep-steps");
  steps.innerHTML = STEPS.map((s, i) => `<article class="ep-step rv" style="--d:${i * 0.08}s"><div class="ep-sn"><span>0${i + 1}</span><i></i></div><h3>${s[0]}</h3><p>${s[1]}</p><span class="ep-when">${s[2]}</span></article>`).join("");

  /* ---------- 7 · FAQ ---------- */
  const FAQ = [
    ["Can we start with a few modules and add the rest later?", "Yes. Start with the module that hurts most and add the others when you're ready. They share one set of records, so nothing is entered twice."],
    ["Can you move our data from our current system?", "Yes. We bring across customers, stock and balances, merge the duplicates and check the balances with you before you go live."],
    ["Does it handle UAE VAT and the WPS file?", "Yes. 5% VAT on every invoice with your TRN on every document, and the WPS salary file prepared from the payroll run."],
    ["Who do we call when something goes wrong?", "Your dedicated contact, who knows your setup and stays on after go-live. One person, not a ticket queue."],
    ["What happens to our data if we leave?", "You can ask for a full export of your data at any time. [Confirm retention and deletion terms.]"],
    ["What does it cost?", "Pricing is per user and billed in AED, monthly or annually. [Confirm plans.]"],
  ];
  const acEl = $("#faq-list");
  acEl.innerHTML = FAQ.map((f, i) => `<div class="ac-i${i === 0 ? " open" : ""}"><h3><button class="ac-t" type="button" id="acq${i}" aria-expanded="${i === 0}" aria-controls="aca${i}"><span class="ac-n">0${i + 1}</span><span class="ac-q">${f[0]}</span><span class="ac-ch">${IC.chev}</span></button></h3><div class="ac-c" id="aca${i}" role="region" aria-labelledby="acq${i}"><div><p>${f[1]}</p></div></div></div>`).join("");
  acEl.addEventListener("click", (e) => {
    const b = e.target.closest(".ac-t"); if (!b) return;
    const item = b.closest(".ac-i"), was = item.classList.contains("open");
    $$(".ac-i", acEl).forEach((x) => { x.classList.remove("open"); $(".ac-t", x).setAttribute("aria-expanded", "false"); });
    if (!was) { item.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
  });

  /* ---------- 8 · CTA ---------- */
  { const cm = $("#cta-mark"); if (cm) cm.innerHTML = window.CZ_NAV.mark(100); }
  if (window.CZ_shaderBg) window.CZ_shaderBg($(".h2-cta-card"), [0.05, 0.35, 0.85]);

  window.ONEERP.observeReveal();
})();
