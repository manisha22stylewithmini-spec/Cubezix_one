(function () {
  const { ICONS, av, clamp, fmt, rates } = window.ONEERP;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- hero statement with module words ---------- */
  const PEEK = {
    finance: ["bank", "Finance", "Bank line", "BL-2026-1093", [["Received", "AED 8,640.00"], ["From", "Harbour Line Freight"], ["Assigned to", "Hana · Finance"]]],
    hr: ["users", "HR", "Visa renewal", "VR-2026-0044", [["Employee", "Fatima · HR"], ["Expires", "21 Nov 2026"]]],
    payroll: ["wallet", "Payroll", "Payroll run", "October", [["Employees", "8"], ["Net total", "AED 96,400.00"]]],
    inventory: ["box", "Inventory", "Shipping carton 40×30", "PK-4030", [["In stock", "120"], ["Reorder at", "200"]]],
    sales: ["doc", "Sales", "Quote", "QT-2026-0187", [["Customer", "Harbour Line Freight"], ["Discount", "18% · above your 15% limit"], ["Prepared by", "Omar · Sales"]]],
    crm: ["target", "CRM", "Lead", "LD-2026-0312", [["Company", "Al Noor Trading"], ["Waiting", "3 days"]]],
    procurement: ["cart", "Procurement", "Purchase order", "PO-2026-0418", [["Supplier", "Gulf Pack Supplies"], ["Budget", "Over by 6%"]]],
    operations: ["truck", "Operations", "Delivery", "DL-2026-0207", [["Customer", "Marina Dental Group"], ["Expected", "2 hours late"]]],
  };
  const hero = $("#hero-text");
  const mk = (w, k) => `<span class="m" data-k="${k}">${w}</span>`;
  hero.innerHTML = `ONEERP runs ${mk("finance", "finance")}, ${mk("HR", "hr")}, ${mk("payroll", "payroll")}, ${mk("inventory", "inventory")}, ${mk("sales", "sales")}, ${mk("CRM", "crm")}, ${mk("procurement", "procurement")} and ${mk("operations", "operations")} in one cloud platform.`;
  const peek = $("#peek");
  function showPeek(el) {
    const d = PEEK[el.dataset.k]; const r = el.getBoundingClientRect();
    peek.innerHTML = `<div class="pt"><span class="ticket-ico" style="width:26px;height:26px">${ICONS[d[0]]}</span><div><small>${d[1]}</small><b>${d[2]}</b><small style="font-family:var(--mono)">${d[3]}</small></div><span class="pill1 dark">1</span></div>${d[4].map((x) => `<div class="pr"><span>${x[0]}</span><span>${x[1]}</span></div>`).join("")}`;
    peek.style.left = Math.min(innerWidth - 210, Math.max(12, r.left)) + "px";
    peek.style.top = r.bottom + 12 + "px";
    peek.classList.add("on");
  }
  $$(".m", hero).forEach((m) => { m.addEventListener("mouseenter", () => showPeek(m)); m.addEventListener("mouseleave", () => peek.classList.remove("on")); m.addEventListener("click", () => { const t = document.getElementById("module-" + m.dataset.k); if (t) window.ONEERP.scrollTo(t, { offset: -innerHeight / 3 }); }); });

  /* ---------- table of contents with read marks ---------- */
  const TOC = ["What ONEERP is", "The eight modules", "How work travels", "The night shift", "Your data", "The UAE, built in", "Going live, and after", "Before you book"];
  const tocHTML = `<div class="cap">ON THIS PAGE</div>` + TOC.map((t, i) => `<a href="#s${i + 1}" data-s="s${i + 1}"><span>${String(i + 1).padStart(2, "0")}</span>${t}${ICONS.check}</a>`).join("") + `<a class="final-link" href="book-a-demo.html" style="border:0"><span style="width:auto">→</span> Book a demo <i class="pill1">1</i></a><p class="nt">Eight chapters. One thing left.</p>`;
  $("#toc").innerHTML = tocHTML; $("#toc2").innerHTML = tocHTML;
  function tocRead() {
    const y = innerHeight * 0.45;
    TOC.forEach((_, i) => {
      const s = document.getElementById("s" + (i + 1)); if (!s) return;
      const r = s.getBoundingClientRect();
      const read = i === 0 ? true : r.top < y;
      $$(`.toc a[data-s=s${i + 1}]`).forEach((a) => a.classList.toggle("read", read));
    });
  }
  window.ONEERP.onScroll(tocRead);

  /* ---------- the eight modules ---------- */
  const ROWS = [
    ["CRM", "crm", "Leads, follow-ups and quotations, with the whole pipeline in one place.", "A lead that waits goes cold. When every lead, its last contact and its quote sit in one place, a follow-up no longer depends on someone remembering it.", "Leads, contacts, quotations, [activities]", "1 lead waiting 3 days"],
    ["Sales", "sales", "Quotes, orders, deliveries and invoices: one record from the first quote to the payment.", "The quote, the order, the delivery and the invoice are one deal at four stages. Kept as one record, the price agreed is the price invoiced, and nothing delivered goes unbilled.", "Quotes, sales orders, delivery notes, invoices, [price lists]", "1 quote above your discount limit"],
    ["Inventory", "inventory", "Stock in every location, counted as it moves.", "Receipts, transfers and deliveries change the stock on the same record, so the number on screen is the number on the shelf, and a low item raises its own purchase order.", "Items, locations, stock moves, [batches and serials]", "1 item below its reorder point"],
    ["Procurement", "procurement", "Requests, purchase orders and supplier invoices, checked against budget.", "A purchase that is over budget stops and asks the person who owns the budget, with the numbers beside the question, instead of surfacing at month-end.", "Requests, purchase orders, supplier invoices, [budgets]", "1 purchase order over budget"],
    ["Finance", "finance", "Every dirham in and out, matched to your books as it goes.", "Customers paying in, suppliers, payroll and VAT going out are matched to your ledger as they arrive. The one line it cannot place comes to you.", "Ledger, bank lines, VAT, [fixed assets]", "1 bank line to match"],
    ["Payroll", "payroll", "Monthly payroll with the WPS file prepared for your bank.", "Salary files are prepared from the same employee record and held until every employee has bank details, so the run that goes out is the run that was checked.", "Pay runs, WPS files, gratuity, [deductions]", "All caught up"],
    ["HR", "hr", "People, documents and the dates that matter.", "Contracts, visas and leave live with the employee, and the date that is about to lapse reaches the person who can act on it, thirty days before it does.", "Employees, contracts, visas, leave", "1 visa expiring in 30 days"],
    ["Operations", "operations", "Deliveries, jobs and the work between the order and the invoice.", "Every delivery has an owner and a time. When one runs late, the customer is told by the system, not by whoever noticed first.", "Deliveries, routes, jobs, [service tickets]", "1 delivery running late"],
  ];
  $("#mod-rows").innerHTML = ROWS.map((r, i) => `<a class="mod-row rv" id="module-${r[1]}" href="#module-${r[1]}" style="--d:${(i % 2) * 0.05}s"><h3>${r[0]}</h3><div><div class="d1">${r[2]}</div><div class="d2">${r[3]}</div><div class="hold"><b>Holds:</b> ${r[4]}</div></div><div class="today"><small>Today</small>${r[5]}</div>${ICONS.arrow.replace("<svg", '<svg class="arr"')}</a>`).join("");
  $$(".mod-row").forEach((row, i) => {
    const key = ROWS[i][1]; row.addEventListener("mouseenter", () => { const d = PEEK[key]; const r = row.getBoundingClientRect(); peek.innerHTML = `<div class="pt"><span class="ticket-ico" style="width:26px;height:26px">${ICONS[d[0]]}</span><div><small>${d[1]}</small><b>${d[2]}</b></div><span class="pill1 dark">1</span></div>${d[4].map((x) => `<div class="pr"><span>${x[0]}</span><span>${x[1]}</span></div>`).join("")}`; peek.style.left = Math.min(innerWidth - 220, r.right - 330) + "px"; peek.style.top = Math.max(90, Math.min(innerHeight - 190, r.top + 28)) + "px"; peek.classList.add("on"); });
    row.addEventListener("mouseleave", () => peek.classList.remove("on"));
    row.addEventListener("click", (e) => e.preventDefault());
  });

  /* ---------- how work travels (accordion with flow) ---------- */
  const EV = [
    ["A purchase order is approved", ["Procurement", "Inventory", "Finance"], ["Order approved", "Supplier notified", "Stock expected", "Budget updated"]],
    ["A quote is approved", ["Sales", "Operations", "Finance"], ["Quote approved", "Order created", "Delivery scheduled", "Invoice drafted"]],
    ["Stock falls below its reorder point", ["Inventory", "Procurement"], ["Stock below 200", "Draft PO created", "Sent for approval"]],
    ["A bank line arrives", ["Finance"], ["Bank line received", "Matched to invoice", "Posted to ledger"]],
    ["Payroll is run", ["Payroll", "[Finance]"], ["Run checked", "WPS file prepared", "Journal posted"]],
    ["A lead is won", ["CRM", "[Sales]"], ["Lead won", "Quote becomes order", "Customer record created"]],
    ["A visa is 30 days from expiry", ["HR"], ["Date reached", "Owner reminded", "Renewal task opened"]],
  ];
  const nodes = (arr) => arr.map((t, i) => `<span class="nd" style="--i:${i}">${ICONS.check}${t}</span>${i < arr.length - 1 ? `<span class="ln2" style="--i:${i}"></span>` : ""}`).join("");
  function accHTML(list) { return list.map((e, i) => `<div class="acc-i ${list === EV && i === 2 ? "on" : ""}"><div class="acc-h"><span>${e[0]}</span><span class="tags">${e[1].map((t) => `<span class="${t[0] === "[" ? "br" : ""}">${t}</span>`).join("")}</span>${ICONS.chev}</div><div class="acc-b"><div><div class="flow">${nodes(e[2])}</div></div></div></div>`).join(""); }
  const travel = $("#travel"); travel.innerHTML = accHTML(EV);
  travel.addEventListener("click", (e) => { const h = e.target.closest(".acc-h"); if (!h) return; const it = h.parentElement; const was = it.classList.contains("on"); $$(".acc-i", travel).forEach((x) => x.classList.remove("on")); if (!was) it.classList.add("on"); });

  /* ---------- night shift ---------- */
  const NEV = [["18:20", "Finance", "31 bank lines matched to their invoices by your rules", 0], ["19:05", "Sales", "Reminders sent for 4 overdue invoices", 0.04], ["21:00", "[Platform]", "[Nightly backup completed]", 0.3], ["23:40", "Operations", "Tomorrow's delivery routes planned", 0.55], ["02:15", "HR", "Visa expiry checks run for 212 employees", 0.75], ["05:30", "Procurement", "2 supplier statements reconciled", 0.92]];
  $("#night-evs").innerHTML = NEV.map((e) => `<div class="ev"><span class="tm">${e[0]}</span><span class="md">${e[1]}</span><span>${e[2]}</span>${ICONS.check}</div>`).join("");
  const night = $("#s4"), tEl = $("#night-time"), dEl = $("#night-date");
  function nightTick() {
    const p = window.ONEERP.progress(night);
    const mins = (19 * 60 + 10 + p * (13 * 60 + 50)) % (24 * 60);
    const hh = String(Math.floor(mins / 60)).padStart(2, "0"), mm = String(Math.floor(mins % 60)).padStart(2, "0");
    tEl.textContent = `${hh}:${mm}`;
    dEl.textContent = p * 13 + 19 >= 24 ? "Fri 16 Oct" : "Thu 15 Oct – Fri 16 Oct";
    $$(".ev", night).forEach((el, i) => el.classList.toggle("in", p >= NEV[i][3] * 0.9 + (i ? 0.02 : -1)));
  }
  window.ONEERP.onScroll(nightTick);

  /* ---------- morning card ---------- */
  function morning(done) {
    $("#morning-card").innerHTML = `<div class="ticket-head"><span class="ticket-ico">${ICONS.wallet}</span><div><div class="ticket-meta">Payroll</div><div class="ticket-title">Payroll run <span class="mono">October</span></div></div>${done ? "" : `<span class="needs">Needs you <i class="pill1">1</i></span>`}</div>
      <div class="rows"><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Bank details</span><span class="v" style="font-size:13px">${done ? "Complete for every employee" : `<span class="warn">${ICONS.warn} 1 employee missing</span>`}</span></div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Payday</span><span class="v mono" style="font-size:12.5px">25 Oct</span></div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Requested by</span><span class="v">${av("Maria Payroll", "", 5)} <span style="font-size:13px"><b style="font-weight:600">Maria</b> · Payroll</span></span></div></div>
      ${done ? `<div class="card-foot" style="gap:10px"><span class="okc">${ICONS.check} Bank details added</span><span class="mono" style="margin-left:auto;font-size:11px;color:var(--muted)">16:10</span></div>` : `<div class="card-foot"><button class="btn btn-dark" id="add-iban">Add IBAN</button></div>`}`;
    const b = $("#add-iban"); if (b) b.addEventListener("click", () => morning(true));
  }
  morning(false);

  /* ---------- your data: role matrix ---------- */
  const ROLES = [["Owner", [1, 1, 1, 1, 1]], ["Finance", [1, 0, 1, 0, 0]], ["HR", [0, 1, 1, 0, 0]], ["Warehouse", [0, 0, 0, 1, 0]], ["Sales", [0, 0, 0, 1, 1]]];
  $("#matrix").innerHTML = `<div class="mr2 h"><span>Role</span><span>Finance</span><span>HR</span><span>Payroll</span><span>Inventory</span><span>Sales</span></div>` + ROLES.map((r) => `<div class="mr2"><span>${r[0]}</span>${r[1].map((v) => (v ? `<span>${ICONS.check}</span>` : `<span class="no">—</span>`)).join("")}</div>`).join("") + `<div class="foot">Example roles. You define your own.</div>`;

  /* ---------- UAE rules ---------- */
  const UAE = [
    ["VAT", "The 5% standard rate on every invoice, your TRN on every document, and the quarterly return prepared for review.", ["Standard rate 5% since 1 January 2018", "registration required above AED 375,000 of taxable supplies and imports in 12 months", "return and payment due 28 days after each tax period, usually quarterly", "the VAT shown in AED on every tax invoice"]],
    ["Corporate tax", "[Corporate-tax reporting.]", ["0% up to AED 375,000 of taxable income, 9% above it, for financial years from 1 June 2023", "return and payment due nine months after the year end", "Small Business Relief for revenue of AED 3m or less, now for tax periods ending on or before 31 December 2029"]],
    ["E-invoicing", "[ONEERP's readiness for the UAE e-invoicing system, and its accredited service provider.]", ["Structured XML invoices (Peppol, PINT-AE) exchanged through accredited service providers; a PDF no longer counts", "revenue of AED 50m or more: provider appointed by 30 October 2026, live from 1 January 2027", "everyone else: by 31 March 2027, live from 1 July 2027", "business and government sales; sales to consumers excluded for now"]],
    ["WPS", "Salary files for the Wage Protection System, prepared from the payroll run and held until every employee has bank details.", ["Wages paid through MOHRE-approved banks, exchange houses and financial institutions", "since 1 June 2020, due on the 1st of each month with no grace period; sanctions start within days"]],
    ["Gratuity", "[End-of-service gratuity accrued for each employee, every month.]", ["After a year's service: 21 days' basic wage for each of the first five years, 30 days for each year after, capped at two years' wage, paid within 14 days of the contract ending (Federal Decree-Law 33 of 2021)"]],
    ["Currencies", "AED as the base; invoices, payments and reports in AED, SAR and USD [and other currencies].", ["Demo rates", "USD 1 = AED 3.6725 = SAR 3.75"]],
    ["Records", "[Records kept for as long as UAE law requires, and exported for a tax audit.]", []],
  ];
  $("#uae-list").innerHTML = UAE.map((r) => `<div class="fr rv"><span class="k">${r[0]}</span><div><div class="head">${r[1]}</div>${r[2].length ? `<span class="det">${r[2].join("<br>")}</span>` : ""}</div></div>`).join("");
  let invCur = "AED";
  function renderInv() {
    const r = rates[invCur];
    $("#inv").innerHTML = `<div class="ticket-head"><span class="ticket-ico">${ICONS.doc}</span><div><div class="ticket-meta">Sales</div><div class="ticket-title">Tax invoice <span class="mono">INV-2026-0544</span></div></div></div>
      <div class="rows"><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Customer</span><span class="v" style="font-size:13px">Harbour Line Freight</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Your TRN</span><span class="v mono" style="font-size:12px">100•••••••••003</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Date</span><span class="v mono" style="font-size:12px">16 Oct 2026</span></div></div>
      <div class="qtbl" style="margin:0 24px 6px;border:0;border-top:1px solid var(--line-2);border-radius:0"><div class="qr"><span>Shipping carton 60×40 <small style="display:inline">× 2,000</small></span><span class="a flip">${fmt(12000 * r)}</span></div><div class="qr"><span>Pallet wrap film 500 mm <small style="display:inline">× 300</small></span><span class="a flip">${fmt(7500 * r)}</span></div><div class="qr"><span>Packing tape 48 mm <small style="display:inline">× 1,500</small></span><span class="a flip">${fmt(4500 * r)}</span></div></div>
      <div class="totals" style="padding-top:6px"><div class="l"></div><div class="r" style="width:100%"><div><span>Subtotal</span><span class="flip">${invCur} ${fmt(24000 * r)}</span></div><div><span>VAT 5%</span><span class="flip">${invCur} ${fmt(1200 * r)}</span></div><div><span>Total</span><span class="flip">${invCur} ${fmt(25200 * r)}</span></div></div></div>`;
  }
  renderInv();
  $$("#inv-seg button").forEach((b) => b.addEventListener("click", () => { invCur = b.textContent; $$("#inv-seg button").forEach((x) => x.classList.toggle("on", x === b)); renderInv(); }));
  const GULF = [["Country", "VAT", "Since", "Currency", "To USD 1"], ["United Arab Emirates", "5%", "1 Jan 2018", "AED", "3.6725"], ["Saudi Arabia", "15%", "1 Jul 2020", "SAR", "3.75"], ["Bahrain", "10%", "1 Jan 2022", "BHD", "0.376"], ["Oman", "5%", "16 Apr 2021", "OMR", "0.3845"], ["Qatar", "None", "", "QAR", "3.64"], ["Kuwait", "None", "", "KWD", "Basket"]];
  $("#gulf").innerHTML = GULF.map((r, i) => `<div class="gr ${i === 0 ? "h" : ""} ${r[1] === "None" ? "n" : ""}">${r.map((c) => `<span>${c}</span>`).join("")}</div>`).join("") + `<p class="tiny" style="margin-top:14px">Standard VAT rates and currency pegs, checked 16 October 2026. Kuwait's dinar is pegged to an undisclosed basket of currencies.</p>`;

  /* ---------- going live ---------- */
  window.ONEERP.inView($("#steps3"), (el) => el.classList.add("go"), 0.5);

  /* ---------- before you book ---------- */
  const BQ = [
    ["Can we start with a few modules and add the rest later?", ["Module"], ["Request", "Quote", "Add module", "Live"]],
    ["Can you move our data from our current system?", ["Migration"], ["Export", "Merge duplicates", "Check balances", "Live"]],
    ["Does it handle UAE VAT and the WPS file?", ["Tax", "Payroll"], ["Invoice", "VAT 5%", "Return prepared"]],
    ["Who do we call when something goes wrong?", ["Support"], ["Your question", "Your dedicated contact", "Answer"]],
    ["What happens to our data if we leave?", ["Data"], ["Request export", "Full export", "Deleted on request"]],
    ["What does it cost?", ["Pricing"], ["Per user", "Billed in AED", "Monthly or annual"]],
  ];
  $("#before").innerHTML = accHTML(BQ).replace(/acc-i on/g, "acc-i");
  $("#before").addEventListener("click", (e) => { const h = e.target.closest(".acc-h"); if (!h) return; const it = h.parentElement; const was = it.classList.contains("on"); $$("#before .acc-i").forEach((x) => x.classList.remove("on")); if (!was) it.classList.add("on"); });
  $$("#before .acc-i")[0].classList.add("on");

  window.ONEERP.observeReveal();
})();
