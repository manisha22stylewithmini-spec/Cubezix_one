/* Module pages on the Finance template: the live hero window for HR, Payroll, Inventory, Sales, CRM, Procurement and Operations.
   Same shape as the Finance reconciliation: a working list that clears itself line by line, and the one line it can't place waiting for you. Runs after sv.js. */
(function () {
  const key = document.body.dataset.sv;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const svg = (d, w = 14, sw = 2.4) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const CK = svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 12, 2.8);
  const LINK = svg('<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>', 13, 2);
  const money = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /* sum: [label, value, value once resolved]. The second and third cells change when you accept the suggestion. */
  const M = {
    hr: {
      small: "Dates to watch", title: "Next 30 days · 48 employees", badge: ["Watching", "All assigned"],
      sum: [["Employees", "48"], ["Expiring in 30 days", "5"], ["Without an owner", "1", "0"]],
      cols: ["Due", "Employee and document", "Days left", "Renewal task", "Status"],
      rows: [["9 Nov", "Youssef Nasser", "Labour card", "14 days", "PRO-0409 · Khalid"], ["14 Nov", "Omar Khan", "Emirates ID", "19 days", "PRO-0410 · Khalid"], ["18 Nov", "Aisha Rahman", "Labour contract", "23 days", "HR-0207 · Noura"], ["21 Nov", "Fatima Al Ali", "Residence visa", "26 days", "PRO-0412 · Khalid"], ["12 Nov", "Sara Reyes", "Probation ends · no reviewer", "17 days", ""]],
      wait: "Checking", ok: "Owner set", fix: "HR-0211 · Omar",
      sug: ["Suggested reviewer", "Omar Khan · Sara's line manager, review due 12 Nov", "Assign", "Not now"],
      yes: ["All assigned", "Every date has an owner and a deadline"], no: ["Left for HR", "Kept on Noura's list for tomorrow morning"],
      count: (d, n) => `${d} of ${n} given an owner by your rules`, foot: "Reminders at 30, 14 and 3 days",
    },
    payroll: {
      small: "Pay run", title: "October 2026 · 25 employees", badge: ["Checking", "Ready for WPS"],
      sum: [["Gross pay", "286,450.00"], ["Ready to pay", "264,080.00", "271,980.00"], ["Held from the run", "7,900.00", "0.00"]],
      cols: ["Emp", "Employee", "Net AED", "Bank account", "Status"],
      rows: [["E-0101", "Aisha Rahman", "Operations manager", 16500, "ENBD ··3381"], ["E-0102", "Omar Khan", "Sales lead", 9800, "ADCB ··9020"], ["E-0107", "Fatima Al Ali", "Senior accountant", 13996.88, "FAB ··1174"], ["E-0112", "Youssef Nasser", "Warehouse supervisor", 8250, "Mashreq ··4417"], ["E-0125", "Maria Santos", "Driver · joined 12 Oct · no IBAN", 7900, ""]],
      wait: "Checking", ok: "Ready", fix: "Mashreq ··0456", amt: money,
      sug: ["Found in her onboarding form", "IBAN AE07 ···· ···· 0456 · Mashreq · added 14 Oct", "Use it", "Hold her pay"],
      yes: ["Ready for WPS", "SIF file prepared for 25 employees, AED 271,980.00"], no: ["Held for review", "Maria is paid in a separate run once her bank confirms"],
      count: (d, n) => `${d} of ${n} checked by your rules`, foot: "WPS file built from the run",
    },
    inventory: {
      small: "Cycle count", title: "Dubai warehouse · Aisle C", badge: ["Counting", "Count posted"],
      sum: [["Counted", "2,172"], ["On the system", "2,184", "2,172"], ["Difference", "−12", "0"]],
      cols: ["Bin", "Item", "Counted", "On the system", "Status"],
      rows: [["C-01-2", "Shipping carton 40×30", "SKU PK-4030", "620", "620"], ["C-01-3", "Pallet wrap film 500 mm", "SKU PW-0500", "340", "340"], ["C-02-1", "Packing tape 48 mm", "SKU PT-0048", "960", "960"], ["C-02-4", "Corner boards 1 m", "SKU CB-1000", "244", "244"], ["C-03-1", "Bubble wrap roll 1.2 m", "SKU BW-1200 · 12 short", "8", "20"]],
      wait: "Counting", ok: "Agrees", fix: "8 · adjusted",
      sug: ["Suggested adjustment", "−12 rolls · AED 216.00 · reason: damaged in storage", "Post", "Recount"],
      yes: ["Count posted", "Stock and value now agree with the shelf"], no: ["Recount queued", "Bin C-03-1 goes back on today's count list"],
      count: (d, n) => `${d} of ${n} bins agree with the system`, foot: "Scanned, not typed",
    },
    sales: {
      small: "Delivered, not yet billed", title: "This week · 5 orders", badge: ["Billing", "All billed"],
      sum: [["Delivered", "46,340.00"], ["Invoiced", "41,840.00", "46,340.00"], ["Not yet billed", "4,500.00", "0.00"]],
      cols: ["Date", "Customer and order", "AED", "Invoice", "Status"],
      rows: [["24 Oct", "Marina Dental Group", "SO-2026-0318 · delivered in full", 12500, "INV-2026-0551"], ["24 Oct", "Harbour Line Freight", "SO-2026-0321 · delivered in full", 8640, "INV-2026-0544"], ["25 Oct", "Al Noor Trading", "SO-2026-0324 · 2 of 2 deliveries", 3980, "INV-2026-0547"], ["25 Oct", "Desert Rose Hotels", "SO-2026-0326 · delivered in full", 16720, "INV-2026-0556"], ["26 Oct", "Sahara Labs", "SO-2026-0329 · 30 of 50 cartons", 4500, ""]],
      wait: "Checking", ok: "Invoiced", fix: "INV-2026-0558", amt: money,
      sug: ["Ready to bill", "INV-2026-0558 · 30 cartons delivered · AED 4,500.00 + VAT", "Raise invoice", "Wait for the rest"],
      yes: ["All billed", "Every delivery this week has its invoice"], no: ["Billing held", "The invoice goes out with the last 20 cartons"],
      count: (d, n) => `${d} of ${n} invoiced by your rules`, foot: "Priced from the quote, never retyped",
    },
    crm: {
      small: "Leads waiting", title: "Today · Your pipeline", badge: ["Following up", "All owned"],
      sum: [["Open leads", "38"], ["Followed up today", "4", "5"], ["Without an owner", "1", "0"]],
      cols: ["Waiting", "Lead", "Value AED", "Next step", "Status"],
      rows: [["3 days", "Al Noor Trading", "Asked for bulk pricing", "24,000", "Call · 11:00"], ["1 hour", "Harbour Line Freight", "New from the website", "18,500", "Reply sent · 09:20"], ["2 days", "Marina Dental Group", "Opened quote QT-0611 twice", "12,500", "Reminder · 09:31"], ["5 hours", "Desert Rose Hotels", "Asked for a demo", "38,400", "Demo · Thu 14:00"], ["40 min", "Coastal Clinics", "Web form · 6 branches · Abu Dhabi", "31,000", ""]],
      wait: "Waiting", ok: "Followed up", fix: "Call · today 15:00",
      sug: ["Suggested owner", "Rashid Al Hammadi · healthcare, Abu Dhabi, 3 open leads", "Assign", "Someone else"],
      yes: ["All owned", "Every lead has an owner and a next step"], no: ["Sent to the team lead", "Coastal Clinics is first on Omar's morning list"],
      count: (d, n) => `${d} of ${n} followed up by your rules`, foot: "Nothing waits without a flag",
    },
    procurement: {
      small: "Three-way match", title: "Supplier bills · this week", badge: ["Matching", "All matched"],
      sum: [["Billed", "45,590.00"], ["Matched to receipts", "38,230.00", "45,590.00"], ["Not yet matched", "7,360.00", "0.00"]],
      cols: ["Date", "Supplier and bill", "AED", "Order and receipt", "Status"],
      rows: [["24 Oct", "Gulf Pack Supplies", "BILL-0231 · PO-0431", 12400, "GRN-0388"], ["24 Oct", "Emirates Office Supplies", "BILL-0233 · PO-0433", 2150, "GRN-0390"], ["25 Oct", "Harbour Line Freight", "BILL-0236 · PO-0432", 4980, "GRN-0391"], ["25 Oct", "Al Noor Trading", "BILL-0238 · PO-0434", 18700, "GRN-0392"], ["26 Oct", "Gulf Pack Supplies", "BILL-0241 · 80 billed, 60 received", 7360, ""]],
      wait: "Matching", ok: "Matched", fix: "GRN-0393 + 0394", amt: money,
      sug: ["Second receipt found", "GRN-0394 · 20 cartons received at Abu Dhabi this morning", "Match", "Hold the bill"],
      yes: ["All matched", "Order, receipt and bill agree on every line"], no: ["Held for review", "AED 1,840.00 held until the 20 cartons are found"],
      count: (d, n) => `${d} of ${n} matched to order and receipt`, foot: "Price and quantity checked",
    },
    operations: {
      small: "Today's deliveries", title: "Route plan · 5 stops · Van 2", badge: ["On the road", "Back on time"],
      sum: [["Stops today", "5"], ["On time", "4", "5"], ["Running late", "1", "0"]],
      cols: ["Due", "Customer and stop", "ETA", "Delivery note", "Status"],
      rows: [["10:00", "Harbour Line Freight", "Jebel Ali · 40 cartons", "09:52", "DL-2026-0203"], ["11:30", "Al Noor Trading", "Deira · 12 rolls", "11:18", "DL-2026-0204"], ["13:00", "Desert Rose Hotels", "Business Bay · 6 pallets", "12:47", "DL-2026-0205"], ["14:30", "Sahara Labs", "Al Quoz · 20 cartons", "14:21", "DL-2026-0206"], ["14:00", "Marina Dental Group", "Dubai Marina · 2 hours late", "16:05", ""]],
      wait: "En route", ok: "On time", fix: "DL-0207 · Van 3", fixAmt: "14:10",
      sug: ["Suggested fix", "Van 3 is 12 minutes away with room · new time 14:10", "Reassign", "Tell the customer"],
      yes: ["Back on time", "Van 3 takes the stop, and the customer has the new time"], no: ["Customer told", "Marina Dental has the new time, 16:05, by SMS"],
      count: (d, n) => `${d} of ${n} on time`, foot: "The customer is told by the system",
    },
  };
  const D = M[key], win = $("#sv-win");
  if (!D || !win) return;
  const amt = (v) => (typeof v === "number" ? (D.amt || String)(v) : v);
  const [s1, s2, s3] = D.sum, n = D.rows.length;

  win.innerHTML = `<div class="sv-frame fn-frame"><div class="fn-rec">
    <div class="fn-rh"><div><small>${D.small}</small><b>${D.title}</b></div><span class="fn-badge" id="fn-badge"><em></em>${D.badge[0]}</span></div>
    <div class="fn-sum"><div><small>${s1[0]}</small><b>${s1[1]}</b></div><div><small>${s2[0]}</small><b id="fn-book">${s2[1]}</b></div><div class="dif" id="fn-dif"><small>${s3[0]}</small><b>${s3[1]}</b></div></div>
    <div class="fn-rt" role="table" aria-label="${D.small}">
      <div class="fn-rr fn-rhd" role="row"><span role="columnheader">${D.cols[0]}</span><span role="columnheader">${D.cols[1]}</span><span role="columnheader" class="r">${D.cols[2]}</span><span aria-hidden="true"></span><span role="columnheader">${D.cols[3]}</span><span role="columnheader" class="r">${D.cols[4]}</span></div>
      ${D.rows.map((r, i) => `<div class="fn-rr${r[4] ? "" : " need"}" role="row" data-i="${i}"><span class="fn-dt">${r[0]}</span><span class="fn-ds"><b>${r[1]}</b><small>${r[2]}</small></span><span class="fn-am out">${amt(r[3])}</span><span class="fn-lk" aria-hidden="true">${LINK}</span><span class="fn-lg">${r[4] || "—"}</span><span class="fn-st r"><u class="wait">${D.wait}</u></span></div>`).join("")}
    </div>
    <div class="fn-sug" id="fn-sug"><span><small>${D.sug[0]}</small><b>${D.sug[1]}</b></span><span class="fn-btns"><button type="button" class="ok" id="fn-yes">${D.sug[2]}</button><button type="button" id="fn-no">${D.sug[3]}</button></span></div>
    <div class="fn-rf"><span id="fn-count">${D.count(0, n)}</span><span>${D.foot}</span></div>
  </div></div>`;

  const rows = $$(".fn-rr[data-i]", win), count = $("#fn-count"), badge = $("#fn-badge"), sug = $("#fn-sug");
  const setStatus = (row, html, cls) => { $(".fn-st", row).innerHTML = `<u class="${cls}">${html}</u>`; };
  const mark = (r) => { r.classList.add("m"); setStatus(r, CK + D.ok, "ok"); };
  let done = 0;
  const finish = () => { rows.forEach((r) => { if (r.classList.contains("need")) setStatus(r, "Needs you", "need"); }); sug.classList.add("show"); };
  const step = () => {
    const r = rows[done];
    if (!r || r.classList.contains("need")) return finish();
    mark(r); done++; count.textContent = D.count(done, n);
    setTimeout(step, 520);
  };
  const start = () => {
    if (reduce) { while (rows[done] && !rows[done].classList.contains("need")) { mark(rows[done]); done++; } count.textContent = D.count(done, n); finish(); }
    else setTimeout(step, 700);
  };
  if (window.ONEERP && window.ONEERP.inView) window.ONEERP.inView(win, start, 0.3); else start();

  const close = (t) => { sug.innerHTML = `<span><small>${t[0]}</small><b>${t[1]}</b></span>`; sug.classList.add("fin"); };
  $("#fn-yes").addEventListener("click", () => {
    const r = rows.find((x) => x.classList.contains("need"));
    if (!r) return;
    r.classList.remove("need"); $(".fn-lg", r).textContent = D.fix; if (D.fixAmt) $(".fn-am", r).textContent = D.fixAmt; mark(r);
    count.textContent = D.count(n, n) + " · 1 confirmed by you";
    if (s2[2]) $("#fn-book").textContent = s2[2];
    const dif = $("#fn-dif"); dif.classList.add("zero"); $("b", dif).textContent = s3[2];
    badge.classList.add("done"); badge.innerHTML = CK + D.badge[1];
    close(D.yes);
  });
  $("#fn-no").addEventListener("click", () => close(D.no));
})();
