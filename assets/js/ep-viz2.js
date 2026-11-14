/* Infographics for the ONE ERP module pages (Sales, CRM, Inventory, Procurement, Payroll, HR, Operations).
   A small set of patterns, each filled with that module's own content. Looked up by page key + card name. */
(function () {
  const E = (n) => window.EP_ico(n);
  const CK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const C1 = "#80D1D4", C2 = "#3A4CE1", C3 = "#633ADD", C4 = "#2B2FA0";
  const chip = (t, c = "") => `<span class="vz-chip ${c}">${t}</span>`;
  const av = (t, c) => `<i class="v2-av" style="--c:${c}">${t}</i>`;
  const ring = (p, big, sub, col) => `<div class="v2-ring" style="--p:${p};--c:${col}"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18"/><circle class="a" cx="22" cy="22" r="18" pathLength="100"/></svg><b>${big}</b><small>${sub}</small></div>`;

  /* ----- patterns ----- */
  const table = (head, rows, foot) => `<div class="vz v2-led"><div class="v2-lh">${head.map((h) => `<span>${h}</span>`).join("")}</div>${rows.map((r, i) => `<div class="v2-lr" style="--i:${i}"><span>${r[0]}</span><em>${r[1] || ""}</em><em>${r[2] || ""}</em></div>`).join("")}<div class="v2-lt2">${foot[0]}<b>${foot[1]}</b></div></div>`;
  const match = (L, R, chips) => `<div class="vz v2-bm"><div class="v2-bl"><small>${L[0]}</small><b>${L[1]}</b><span>${L[2]}</span></div><span class="v2-bk"><i>${E("link")}</i></span><div class="v2-bl on"><small>${R[0]}</small><b>${R[1]}</b><span>${CK} ${R[2]}</span></div><div class="v2-bn">${chips.join("")}</div></div>`;
  const stackRows = (rows) => `<div class="vz v2-fx">${rows.map((r, i) => `<div class="v2-fr" style="--i:${i}"><i style="background:${r[1]}">${r[0]}</i><b>${r[2]}</b>${r[3]}</div>`).join("")}</div>`;
  const stepsH = (steps, note) => `<div class="vz v2-tlh" style="grid-template-columns:auto ${"1fr auto ".repeat(steps.length - 1)}">${steps.map((s, i) => `${i ? `<span class="v2-l2 ${steps[i - 1][0] === "done" ? "done" : ""}"></span>` : ""}<div class="v2-stp ${s[0]}"><i>${s[1] === "ck" ? CK : E(s[1])}</i><b>${s[2]}</b></div>`).join("")}<div class="v2-nt">${note}</div></div>`;
  const board = (cols) => `<div class="vz v3-bd">${cols.map((c, i) => `<div class="v3-col"><small>${c[0]}</small>${c[1].map((t, k) => `<span class="v3-cd" style="--i:${i + k}">${t}</span>`).join("")}</div>`).join("")}</div>`;
  const levels = (rows) => `<div class="vz v3-lv">${rows.map((r, i) => `<div class="v3-lr" style="--i:${i}"><span>${r[0]}</span><div class="v3-tr"><i style="width:${Math.min(r[1], 100)}%;background:${r[2]}"></i>${r[4] ? `<u style="left:${r[4]}%"></u>` : ""}</div><em>${r[3]}</em></div>`).join("")}</div>`;
  const donut = (parts, big, sub) => { let off = 0; return `<div class="vz v3-donut"><div class="v3-dw"><svg viewBox="0 0 36 36" aria-hidden="true"><circle class="t" cx="18" cy="18" r="15.9"/>${parts.map((p) => { const s = `<circle cx="18" cy="18" r="15.9" stroke="${p[2]}" stroke-dasharray="${p[1]} ${100 - p[1]}" stroke-dashoffset="${-off}"/>`; off += p[1]; return s; }).join("")}</svg><b>${big}<small>${sub}</small></b></div><ul>${parts.map((p) => `<li><i style="background:${p[2]}"></i>${p[0]}<em>${p[1]}%</em></li>`).join("")}</ul></div>`; };
  const chart = (kpis, pairs, foot) => `<div class="vz v2-pl"><div class="v2-kp">${kpis.map((k) => `<div><b>${k[0]}</b><small>${k[1]}</small></div>`).join("")}</div><div class="v2-pc">${pairs.map((r, i) => `<div style="--i:${i}"><i class="a" style="--h:${r[0]}%"></i><i class="b" style="--h:${r[1]}%"></i></div>`).join("")}</div>${foot}</div>`;
  const PAIRS = [[60, 44], [72, 50], [54, 46], [84, 58], [76, 52], [92, 60]];
  const ringList = (r, list) => `<div class="vz v2-war">${ring(...r)}<div class="v2-wl">${list.map((l) => `<div><b>${l[0]}</b><small>${l[1]}</small></div>`).join("")}</div></div>`;
  const approve = (rows) => `<div class="vz v2-ord">${rows.map((r) => `<div class="v2-or ${r[4]}"><i class="v2-n">${r[4] === "done" ? CK : ""}</i>${av(r[0], r[1])}<div><b>${r[2]}</b><small>${r[3]}</small></div></div>`).join("")}</div>`;
  const checklist = (rows, btn) => `<div class="vz vz-wps">${rows.map((r, i) => `<div class="vz-emp ${r[3]}" style="--i:${i}"><i style="background:${r[1]}">${r[0]}</i><span>${r[2]}</span><em>${r[3] === "ok" ? CK : "!"}</em></div>`).join("")}<div class="vz-btn ${rows.some((r) => r[3] === "miss") ? "hold" : ""}">${btn}</div></div>`;
  const toggles = (labels) => `<div class="vz vz-tg">${labels.map((l, i) => `<button type="button" class="vz-pill on" style="--i:${i}"><span>${l}</span><i class="vz-sw"></i></button>`).join("")}</div>`;
  const triple = (items, foot) => `<div class="vz v3-tri"><div class="v3-tr3">${items.map((t, i) => `<div style="--i:${i}"><small>${t[0]}</small><b>${t[1]}</b><span>${CK}</span></div>`).join("")}</div>${foot}</div>`;
  const notify = (title, sub, foot) => `<div class="vz v2-rem"><div class="v2-bell"><i>${E("bell")}</i><u>1</u></div><div class="v2-rn"><b>${title}</b><small>${sub}</small></div>${foot}</div>`;
  const timeline = (rows) => `<div class="vz v2-aud">${rows.map((r) => `<div><time>${r[0]}</time><i></i><span><b>${r[1]}</b><small>${r[2]}</small></span></div>`).join("")}</div>`;
  const projection = () => `<div class="vz v3-pj"><div class="v2-kp"><div><b>14 days</b><small>until it runs out</small></div><div><b>+20%</b><small>seasonal demand</small></div></div><svg viewBox="0 0 240 80" preserveAspectRatio="none" aria-hidden="true"><path d="M4 18 L50 24 L96 30 L142 38 L170 44" fill="none" stroke="#3A4CE1" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/><path d="M170 44 L236 70" fill="none" stroke="#8B7CFF" stroke-width="2.2" stroke-dasharray="4 4" stroke-linecap="round" vector-effect="non-scaling-stroke"/><path d="M4 74 H236" stroke="#E1E3F7" stroke-width="1.5" vector-effect="non-scaling-stroke"/><circle cx="170" cy="44" r="4" fill="#fff" stroke="#3A4CE1" stroke-width="2"/></svg>${chip("Reorder before 24 Nov", "am")}</div>`;
  const labelCard = () => `<div class="vz v2-dev"><div class="v2-dc"><i>${E("box")}</i><div><b>Shipping carton 40×30</b><small>PK-4030 · Main warehouse</small></div></div><div class="v2-lbl"><div class="v2-bar"></div><small>PK-4030</small></div><div class="v2-row">${chip("Scanned in · +120", "g")}${chip("RFID read", "b")}</div></div>`;
  const app = () => `<div class="vz v3-app"><div class="v3-ah"><div><small>Good morning</small><b>Fatima</b></div>${av("FA", C3)}</div><div class="v3-ab"><span><i>${E("calendar")}</i>Request leave</span><span><i>${E("wallet")}</i>My payslips</span><span><i>${E("doc")}</i>My documents</span></div>${chip("11 days of leave left", "g")}</div>`;
  const routeMap = () => `<div class="vz v3-map"><svg viewBox="0 0 280 120" preserveAspectRatio="none" aria-hidden="true"><path d="M30 92 C 70 92 70 40 118 44 S 176 96 214 62 S 250 30 262 30" fill="none" stroke="#8B7CFF" stroke-width="2.4" stroke-dasharray="5 5" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg><span class="v3-pin w" style="left:9%;top:72%">${E("box")}</span><span class="v3-pin" style="left:41%;top:30%">1</span><span class="v3-pin" style="left:68%;top:70%">2</span><span class="v3-pin late" style="left:90%;top:18%">3</span><div class="v2-row v3-mr">${chip("5 stops · 38 km", "b")}${chip("1 running late", "am")}</div></div>`;

  const sales = {
    quotations: () => table(["Item", "Qty", "Total"], [["Cartons 60×40", "2,000", "12,000"], ["Wrap film", "300", "7,500"], ["Tape 48 mm", "1,500", "4,500"]], [chip("18% · over limit", "am"), "AED 24,000"]),
    "sales orders": () => stepsH([["done", "ck", "Quote approved"], ["done", "ck", "Order created"], ["now", "truck", "Delivery set"], ["", "doc", "Invoice"]], "Order SO-2026-0312"),
    deliveries: () => board([["To pick", ["SO-0312", "SO-0313"]], ["On the way", ["SO-0309"]], ["Delivered", ["SO-0301", "SO-0298"]]]),
    invoices: () => match(["Delivery note", "DN-2026-0207", "2,000 cartons"], ["Invoice", "INV-2026-0544", "Billed in full"], [chip("Nothing unbilled", "g"), chip("VAT 5%", "b")]),
    "pipeline and kpis": () => donut([["Won", 42, C2], ["Quoted", 30, C1], ["New", 28, C3]], "AED 142k", "this month"),
    dashboards: () => ringList([72, "72%", "of target", C3], [["Jane Doe", "AED 25,050"], ["Omar Khan", "AED 18,400"], ["Aisha Rahman", "AED 15,900"]]),
  };
  const crm = {
    leads: () => board([["New", ["Sara's Bakery"]], ["Contacted", ["Al Noor", "Harbour Line"]], ["Quoted", ["Marina Dental"]]]),
    "follow-ups": () => stackRows([["AR", C2, "Call Al Noor", chip("Today 10:00", "b")], ["OK", C3, "Email Harbour", chip("Today 14:00")], ["HN", C4, "Quote Marina", chip("Tomorrow")]]),
    contacts: () => timeline([["Mon", "Email sent", "Quote QT-2026-0187"], ["Tue", "Call", "Spoke to Aisha"], ["Thu", "Demo booked", "Al Noor Trading"]]),
    quotations: () => table(["Quote", "Value", "Status"], [["QT-0187", "12,400", "Sent"], ["QT-0191", "8,950", "Viewed"], ["QT-0194", "21,300", "Won"]], [chip("1 expires soon", "am"), "AED 42,650"]),
    pipeline: () => levels([["New", 100, C1, "9"], ["Contacted", 72, C2, "7"], ["Quoted", 44, C3, "4"], ["Won", 22, C4, "2"]]),
    reports: () => chart([["35%", "conversion"], ["40%", "faster reply"]], PAIRS, chip("Up this month", "g")),
    dashboards: () => ringList([64, "64%", "of target", C2], [["My leads", "12"], ["Follow-ups today", "5"], ["Quotes out", "4"]]),
    "individual and team kpis": () => levels([["Jane", 82, C2, "AED 25k", 70], ["Omar", 64, C3, "AED 19k", 70], ["Aisha", 48, C1, "AED 14k", 70]]),
    visualisations: () => chart([["9", "new leads"], ["4", "quotes out"]], [[40, 30], [58, 40], [72, 52], [64, 46], [86, 60], [94, 66]], chip("Live data", "b")),
  };
  const inventory = {
    "barcode and rfid": labelCard,
    "multiple locations": () => donut([["Main warehouse", 62, C2], ["Dubai store", 24, C1], ["Sharjah store", 14, C3]], "1,240", "items"),
    "stock projections": projection,
    "reorder points": () => levels([["Shipping carton", 42, C3, "120 / 200", 60], ["Pallet wrap film", 34, C3, "34 / 60", 60], ["Packing tape", 84, C2, "210 / 300", 60]]),
    "stock moves": () => stepsH([["done", "ck", "Received"], ["done", "ck", "Transferred"], ["now", "truck", "Delivered"]], "Shipping carton · 3 moves today"),
    reports: () => table(["Item", "On hand", "Value"], [["Cartons 40×30", "120", "3,600"], ["Wrap film", "34", "2,380"], ["Tape 48 mm", "210", "5,040"]], [chip("1,240 items", "b"), "AED 142,300"]),
    "stock-take": () => match(["System says", "120 cartons", "Dubai store"], ["Counted", "108 cartons", "12 fewer, listed"], [chip("Adjustment to approve", "am")]),
    "time zones and currencies": () => stackRows([["DXB", C2, "Dubai · AED", "<em>GMT+4</em>"], ["RUH", C3, "Riyadh · SAR", "<em>GMT+3</em>"], ["LHR", C1, "London · USD", "<em>GMT+0</em>"]]),
    "low-stock alerts": () => toggles(["Alert by item", "Alert by location", "Draft PO for approval"]),
  };
  const procurement = {
    "purchase requests": () => stackRows([["HN", C2, "Film ×300", chip("Needs approval", "am")], ["OK", C3, "Chairs ×6", chip("Approved", "g")], ["AR", C4, "Toner ×12", chip("Approved", "g")]]),
    "purchase orders": () => table(["Item", "Qty", "Total"], [["Wrap film", "300", "7,500"], ["Cartons 60×40", "2,000", "12,000"], ["Tape 48 mm", "1,500", "4,500"]], [chip("PO-2026-0431", "b"), "AED 24,000"]),
    "budget checks": () => levels([["Packaging", 106, C3, "106% used", 100], ["Office", 64, C2, "64% used", 100], ["IT", 38, C1, "38% used", 100]]),
    "goods receipts": () => stepsH([["done", "ck", "PO sent"], ["done", "truck", "Goods arrive"], ["now", "doc", "GRN created"]], "GRN-2026-0211 · in one click"),
    "supplier invoices": () => triple([["PO", "PO-0431"], ["GRN", "GRN-0211"], ["Invoice", "INV-8820"]], chip("Matched · ready to pay", "g")),
    insights: () => chart([["AED 312k", "spend"], ["18%", "saved"]], PAIRS, chip("Cycle time down", "g")),
    "approval chains": () => approve([["HN", C2, "Hana, Budget owner", "Approved 09:41", "done"], ["OK", C3, "Omar, Finance", "Waiting", "now"], ["AR", C4, "Aisha, Owner", "Over AED 50,000", ""]]),
    "supplier compliance": () => ringList([88, "88%", "on time", C1], [["Gulf Pack", "94%"], ["Harbour Line", "88%"], ["Al Noor", "81%"]]),
    replenishment: () => toggles(["Auto request below reorder", "Send for approval", "Tell the buyer"]),
  };
  const payroll = {
    "pay runs": () => stepsH([["done", "ck", "Prepared"], ["done", "ck", "Checked"], ["now", "shield", "Approved"], ["", "wallet", "Paid"]], "October · 25 employees"),
    payslips: () => window.EP_VIZ.people.payroll(),
    deductions: () => stackRows([["ADV", C3, "Advance", "<em>− AED 500</em>"], ["LWP", C2, "Unpaid leave", "<em>− AED 320</em>"], ["LATE", C4, "Late", "<em>− AED 80</em>"]]),
    "bank details check": () => match(["Held", "Maria Santos", "No bank details"], ["Added", "AE07 •••• 4421", "Run released"], [chip("Run held", "am"), chip("25 of 25 ready", "g")]),
    "journal to finance": () => match(["Pay run", "AED 96,400", "October"], ["Journal", "JV-2026-0108", "Posted to ledger"], [chip("Gratuity accrued", "b"), chip("Bank matched", "g")]),
    "payroll reports": () => chart([["AED 96k", "payroll cost"], ["25", "employees"]], PAIRS, chip("+2 vs September", "b")),
  };
  const hr = {
    "employee file": () => stackRows([["ID", C2, "Emirates ID", chip("Valid", "g")], ["VISA", C3, "Visa", chip("21 Nov", "am")], ["DOC", C4, "Contract", chip("Signed", "g")]]),
    attendance: () => window.EP_VIZ.people.attendance(),
    leave: () => window.EP_VIZ.people.leave(),
    recruitment: () => board([["Applied", ["Accountant", "Driver"]], ["Interview", ["Sales exec"]], ["Offer", ["HR officer"]]]),
    "self service": app,
    "hr analytics": () => donut([["Operations", 38, C2], ["Sales", 26, C1], ["Finance", 18, C3], ["HR", 18, C4]], "212", "employees"),
    "visas and permits": () => ringList([75, "30", "days left", C3], [["Fatima · visa", "21 Nov"], ["Omar · ID", "28 Nov"], ["Aisha · contract", "2 Dec"]]),
    contracts: () => stackRows([["FT", C2, "Fixed term", chip("2 Dec", "am")], ["UL", C3, "Unlimited", chip("Active", "g")], ["PR", C1, "Probation", chip("12 Dec", "b")]]),
  };
  const operations = {
    deliveries: () => board([["Scheduled", ["DL-0206", "DL-0207"]], ["On the way", ["DL-0204"]], ["Delivered", ["DL-0203", "DL-0201"]]]),
    routes: routeMap,
    jobs: () => stepsH([["done", "ck", "Planned"], ["now", "tool", "In progress"], ["", "doc", "Billed"]], "Job JB-2026-0147"),
    "service tickets": () => stackRows([["TK", C2, "Door sensor fault", chip("High", "am")], ["TK", C3, "Install check", chip("In progress", "b")], ["TK", C4, "Return visit", chip("Solved", "g")]]),
    approvals: () => approve([["AR", C2, "Aisha, Team lead", "Approved 08:55", "done"], ["OK", C3, "Omar, Operations", "Waiting", "now"], ["HN", C4, "Hana, Finance", "Over AED 20,000", ""]]),
    resources: () => levels([["Vehicle 1", 78, C2, "78% booked"], ["Vehicle 2", 52, C1, "52% booked"], ["Team A", 91, C3, "91% booked"]]),
    "live dashboards": () => chart([["12", "deliveries today"], ["1", "running late"]], PAIRS, chip("Live", "g")),
    "customer updates": () => notify("Customer told", "Marina Dental · running 2 hours late", chip("New time 16:00", "b")),
    "time and budget": () => levels([["Job JB-0147", 84, C2, "84% of budget", 100], ["Job JB-0150", 48, C1, "48% of budget", 100], ["Job JB-0152", 22, C3, "22% of budget", 100]]),
  };
  Object.assign(window.EP_VIZ = window.EP_VIZ || {}, { sales, crm, inventory, procurement, payroll, hr, operations });
})();
