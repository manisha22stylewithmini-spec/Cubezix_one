/* ONE ERP page: isometric modules, pinned system steps, module tiles, statements, spec sheet, FAQ. */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ARW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const ARL = ARW.replace('d="M5 12h14M13 6l6 6-6 6"', 'd="M19 12H5M11 6l-6 6 6 6"');

  /* ---------- isometric block ---------- */
  const W = 58, H = 29;
  const block = (cx, cy, h, label, cls = "", k = 0, slabs = 2) => {
    const P = (pts) => pts.map((p) => p.join(",")).join(" ");
    const top = P([[cx, cy - H], [cx + W, cy], [cx, cy + H], [cx - W, cy]]);
    const lf = P([[cx - W, cy], [cx, cy + H], [cx, cy + H + h], [cx - W, cy + h]]);
    const rf = P([[cx, cy + H], [cx + W, cy], [cx + W, cy + h], [cx, cy + H + h]]);
    let sl = "";
    for (let i = 1; i < slabs; i++) { const y = (h * i) / slabs; sl += `<path class="sl" d="M${cx - W},${cy + y} L${cx},${cy + H + y} L${cx + W},${cy + y}"/>`; }
    const s = h * 0.72;
    const st = `<path class="st" d="M${cx - W + 1},${cy + s} L${cx},${cy + H + s} L${cx + W - 1},${cy + s}"/>`;
    const lb = label ? `<text class="lb" text-anchor="middle" style="font-size:${label.length > 8 ? 8 : label.length > 6 ? 9.5 : 11}px" transform="matrix(0.894 0.447 -0.894 0.447 ${cx} ${cy + 4})">${label}</text>` : "";
    return `<g class="blk ${cls}" style="--k:${k}"><polygon class="lf" points="${lf}"/><polygon class="rf" points="${rf}"/>${sl}${st}<polygon class="tp" points="${top}"/>${lb}</g>`;
  };

  /* hero: a tall stacked cube */
  const cube = (id) => {
    const el = $(id); if (!el) return;
    el.innerHTML = `<svg viewBox="-80 -50 160 210" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="ax-iso" style="width:100%">${block(0, 92, 40, "", "", 0, 3)}${block(0, 46, 40, "", "", 0, 3)}${block(0, 0, 40, "ONE", "core", 0, 3)}</svg>`;
  };
  cube("#ax-cube"); cube("#ax-cube2");

  /* ---------- system: eight modules around one set of records ---------- */
  const MODS = ["CRM", "Sales", "Inventory", "Procurement", "Finance", "Payroll", "HR", "Operations"];
  const GRID = [[0, 0, 0], [1, 0, 1], [2, 0, 2], [2, 1, 3], [2, 2, 4], [1, 2, 5], [0, 2, 6], [0, 1, 7]];
  const D = 1.62, X0 = 0, Y0 = 0;
  const at = (gx, gy) => [X0 + (gx - gy) * D * W, Y0 + (gx + gy) * D * H];
  const iso = $("#ax-iso");
  if (iso) {
    const foot = (gx, gy, pad = 1.18) => { const [cx, cy] = at(gx, gy); return `${cx},${cy - H * pad} ${cx + W * pad},${cy} ${cx},${cy + H * pad} ${cx - W * pad},${cy}`; };
    const floorPt = (gx, gy) => { const [cx, cy] = at(gx, gy); return [cx, cy + 46 + H]; };
    const C = at(1, 1);
    const outer = [at(-0.6, -0.6), at(2.6, -0.6), at(2.6, 2.6), at(-0.6, 2.6)].map(([x, y]) => [x, y + 46]);
    const L0 = `<g class="lay l0"><polygon class="hatch" points="${outer.map((p) => p.join(",")).join(" ")}"/></g>`;
    const L1 = `<g class="lay l1">${GRID.map(([gx, gy]) => `<polygon class="wire" points="${foot(gx, gy)}" transform="translate(0 46)"/>`).join("")}${GRID.map(([gx, gy]) => { const [x, y] = at(gx, gy); return `<path class="wire" d="M${x},${y + 46} L${C[0]},${C[1] + 46}"/><circle class="node" cx="${(x + C[0]) / 2}" cy="${(y + C[1]) / 2 + 46}" r="3"/>`; }).join("")}</g>`;
    const L2 = `<g class="lay l2"><polygon class="hatch" points="${foot(1, 1, 1.5)}" transform="translate(0 46)"/></g>`;
    const L3 = `<g class="lay l3"><polygon class="dash" points="${outer.map((p) => p.join(",")).join(" ")}"/>${outer.map(([x, y]) => `<rect class="node" x="${x - 4}" y="${y - 4}" width="8" height="8"/>`).join("")}</g>`;
    const tp = [at(2, 2), at(1, 1), at(1, 0), at(0, 0)].map(([x, y]) => `${x},${y + 46}`);
    const L4 = `<g class="lay l4"><path class="trace" d="M${at(2.9, 2.2).map((v, i) => v + (i ? 46 : 0)).join(",")} L${tp.join(" L")}"/></g>`;
    const order = [...GRID, [1, 1, -1]].sort((a, b) => a[0] + a[1] - (b[0] + b[1]) || a[0] - b[0]);
    const blocks = order.map(([gx, gy, i]) => { const [cx, cy] = at(gx, gy); return i < 0 ? block(cx, cy, 44, "Records", "core", 0) : block(cx, cy, 44, MODS[i], [4, 1, 0].includes(i) ? "hit" : "", i); }).join("");
    iso.innerHTML = `<defs><pattern id="axh" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><rect width="7" height="7" fill="rgba(58,76,225,.06)"/><line x1="0" y1="0" x2="0" y2="7" stroke="rgba(58,76,225,.35)" stroke-width="1"/></pattern></defs>${L0}${L1}${L2}${L3}${L4}${blocks}`;
    const xs = [...outer.map((p) => p[0])], ys = outer.map((p) => p[1]);
    iso.setAttribute("viewBox", `${Math.min(...xs) - 30} ${Math.min(...ys) - 70} ${Math.max(...xs) - Math.min(...xs) + 60} ${Math.max(...ys) - Math.min(...ys) + 100}`);
  }

  const STEPS = [
    ["Connect", "Put every department on one set of records.", "Customers, items, employees and accounts are entered once. Sales, stock, payroll and the ledger all read the same record, so there is nothing to export and nothing to copy across.", [["Modules", "08"], ["Records", "<em>01</em>"], ["Typed twice", "00"]]],
    ["Flow", "Watch one event reach every module that needs it.", "An approved quote becomes an order, schedules the delivery and drafts the invoice. A purchase order updates stock and the budget. Each step is posted where it belongs.", [["Quote approved", "Sales"], ["Delivery scheduled", "Operations"], ["Invoice drafted", "<em>Finance</em>"]]],
    ["Automate", "Let the rules do the routine work.", "Bank lines are matched, reminders go out, stock is reordered and expiring visas are flagged. The morning starts with a short list of what actually needs a person.", [["Bank lines matched", "Overnight"], ["Reminders sent", "On schedule"], ["Needs you", "<em>A short list</em>"]]],
    ["Control", "Give every number a second pair of eyes.", "Roles decide who sees what. Approvals follow your limits. Closed months stay closed, and every change keeps a record of who made it and when.", [["Approvals", "By limit"], ["Periods", "Locked"], ["Change log", "<em>Every edit</em>"]]],
    ["Trace", "Click any number and see where it came from.", "A figure in the profit and loss opens the ledger lines behind it, and each line opens the invoice, order or payslip that created it.", [["Report", "P&amp;L"], ["Ledger line", "Finance"], ["Source", "<em>Invoice</em>"]]],
  ];
  const sys = $(".ax-sys");
  if (sys) {
    const menu = $(".ax-menu ol", sys), body = $(".ax-pbody", sys), num = $(".ax-pn b", sys);
    menu.innerHTML = STEPS.map((s, i) => `<li><button type="button" data-i="${i}">[0${i + 1} // ${s[0].toUpperCase()}]</button></li>`).join("");
    body.innerHTML = STEPS.map((s, i) => `<div class="ax-pc" data-i="${i}"><span class="ax-sq"></span><h3 class="ax-d">${s[1]}</h3><p>${s[2]}</p><ul>${s[3].map((r) => `<li><span>${r[0]}</span><em>${r[1].replace(/<\/?em>/g, "")}</em></li>`).join("")}</ul></div>`).join("");
    const btns = $$("button", menu), cards = $$(".ax-pc", body), mq = matchMedia("(max-width: 900px)");
    let cur = -1, manual = false;
    const show = (i) => {
      if (i === cur) return; cur = i;
      btns.forEach((b, k) => b.setAttribute("aria-current", String(k === i)));
      cards.forEach((c, k) => { c.classList.toggle("on", k === i); c.setAttribute("aria-hidden", String(k !== i)); });
      num.textContent = String(i + 1).padStart(2, "0");
      if (iso) { iso.setAttribute("data-s", String(i)); if (i === 4) { const t = $(".trace", iso); t.style.animation = "none"; void t.getBoundingClientRect(); t.style.animation = ""; } }
      if (mq.matches) { const b = btns[i]; b.parentNode.parentNode.scrollTo({ left: b.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" }); }
    };
    const span = () => sys.offsetHeight - innerHeight;
    const onScroll = () => {
      if (mq.matches || manual) return;
      const p = Math.max(0, Math.min(0.999, -sys.getBoundingClientRect().top / Math.max(1, span())));
      show(Math.floor(p * STEPS.length));
    };
    addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
    btns.forEach((b, i) => b.addEventListener("click", () => {
      if (mq.matches) { show(i); return; }
      manual = true; show(i);
      scrollTo({ top: scrollY + sys.getBoundingClientRect().top + span() * ((i + 0.5) / STEPS.length), behavior: reduce ? "auto" : "smooth" });
      setTimeout(() => { manual = false; }, 900);
    }));
    show(0); onScroll();
  }

  /* ---------- module tiles ---------- */
  const R = (x, y, w, h, c) => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  const ART = {
    crm: () => `${[[30, 40], [120, 24], [70, 96], [150, 110], [40, 140]].map(([x, y], i) => R(x, y, 34, 12, i === 2 ? "a" : "w")).join("")}<path class="ln" d="M64,46 L87,102 M137,30 L104,102 M87,108 L150,116 M74,146 L87,108"/>`,
    sales: () => `${[0, 1, 2, 3].map((i) => R(26 + i * 46, 70 - i * 6, 34, 60 + i * 6, i === 3 ? "a" : "w")).join("")}<path class="ln" d="M20,150 H220"/>`,
    inventory: () => `${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => R(40 + c * 36, 40 + r * 38, 26, 26, r === 1 && c === 2 ? "a" : (r + c) % 3 ? "w" : "g")).join("")).join("")}`,
    procurement: () => `${R(30, 50, 70, 90, "w")}${R(140, 50, 70, 90, "w")}<path class="ln" d="M42,70 H88 M42,84 H80 M42,98 H88 M152,70 H198 M152,84 H190 M152,98 H198"/>${R(110, 88, 20, 14, "a")}<path class="ln" d="M100,95 H140"/>`,
    finance: () => `${[0, 1, 2, 3, 4, 5].map((i) => R(30, 30 + i * 22, 150, 2, "g") + R(30 + ((i * 37) % 110), 24 + i * 22, i === 3 ? 40 : 18, 12, i === 3 ? "a" : "w")).join("")}`,
    payroll: () => `${[0, 1, 2, 3, 4].map((i) => R(40, 34 + i * 26, 22, 16, "w") + R(72, 38 + i * 26, 90 - i * 8, 8, i === 0 ? "a" : "g")).join("")}`,
    hr: () => `${[[60, 50], [120, 50], [180, 50], [90, 110], [150, 110]].map(([x, y], i) => `<circle class="${i === 1 ? "a" : "w"}" cx="${x}" cy="${y}" r="13"/>`).join("")}<path class="ln" d="M120,63 V80 H90 V97 M120,80 H150 V97 M73,50 H107 M133,50 H167"/>`,
    operations: () => `<path class="ln" d="M24,120 C70,120 70,60 120,60 S170,120 216,120"/>${[[24, 120], [120, 60], [216, 120]].map(([x, y], i) => R(x - 9, y - 9, 18, 18, i === 1 ? "a" : "w")).join("")}${[0, 1, 2, 3, 4].map((i) => R(40 + i * 36, 150, 22, 6, "g")).join("")}`,
  };
  const TILES = [
    ["crm", "CRM", "Leads, follow-ups and quotations, with the whole pipeline in one place."],
    ["sales", "Sales", "Quotes, orders, deliveries and invoices, kept as one record from quote to payment."],
    ["inventory", "Inventory", "Stock in every location, counted as it moves, reordered before it runs out."],
    ["procurement", "Procurement", "Requests, purchase orders and supplier bills, checked against budget."],
    ["finance", "Finance", "Every dirham in and out, matched to your books as it goes."],
    ["payroll", "Payroll", "Monthly payroll with the WPS file prepared for your bank."],
    ["hr", "HR", "People, contracts, visas and the dates that matter, flagged in time."],
    ["operations", "Operations", "Deliveries, jobs and the work between the order and the invoice."],
  ];
  const tiles = $("#ax-tiles");
  if (tiles) tiles.innerHTML = TILES.map((t, i) => `<a class="ax-tile rv${i === 0 ? " dk" : ""}" href="erp-${t[0]}.html" style="--d:${(i % 4) * 0.06}s"><span class="go">${ARW}</span><svg viewBox="0 0 240 180" aria-hidden="true">${ART[t[0]]()}</svg><div><h3>${t[1]} <small>// 0${i + 1}</small></h3><p>${t[2]}</p></div></a>`).join("");
  if (tiles) tiles.addEventListener("pointerover", (e) => { const t = e.target.closest(".ax-tile"); if (t) $$(".ax-tile", tiles).forEach((x) => x.classList.toggle("dk", x === t)); });

  const docs = $("#ax-docs");
  if (docs) docs.innerHTML = ["INV", "PO", "PAY", "WPS", "VAT"].map((d, i) => `<div class="ax-doc${i === 0 ? " on" : ""}"><svg viewBox="0 0 30 38" aria-hidden="true"><path class="pp" d="M1,1 H21 L29,9 V37 H1 Z"/><rect class="tg" x="5" y="22" width="20" height="8"/><text x="15" y="28.5" text-anchor="middle" font-size="5.5" font-family="monospace" fill="#fff">${d}</text></svg></div>`).join("") + '<span class="ax-docs-line" aria-hidden="true"></span>';

  /* ---------- statements ---------- */
  const SAY = [
    ["Start with the module that hurts most. Add the rest when you are ready.", "Start small", "Each module works on its own and joins the others without moving your data again.", [["01", "Module to begin with"], ["08", "Modules when you need them"]]],
    ["VAT, WPS and gratuity are not add-ons. They are on every record.", "Built for the UAE", "Your TRN on every invoice, the WPS file from every payroll run, gratuity accrued for every employee.", [["5%", "VAT on every invoice"], ["AED", "Base currency, SAR and USD beside it"]]],
    ["One person guides you from the first demo to go-live, and stays after.", "Going live", "Your dedicated contact moves your data in, sets up roles and approvals with you, and stays your contact after launch.", [["01", "Dedicated contact"], ["00", "Ticket queues"]]],
  ];
  const say = $(".ax-say");
  if (say) {
    const q = $(".ax-q", say), figs = $(".ax-figs", say), n = $(".ax-say-n b", say);
    const QM = '<svg viewBox="0 0 42 32" fill="currentColor" aria-hidden="true"><path d="M0 32V18C0 8 5 2 15 0l2 5c-5 2-8 6-8 11h8v16zm24 0V18c0-10 5-16 15-18l2 5c-5 2-8 6-8 11h8v16z"/></svg>';
    q.innerHTML = SAY.map((s, i) => `<figure class="ax-qi" data-i="${i}" style="margin:0">${QM}<blockquote class="ax-d">${s[0]}</blockquote><footer><b>${s[1]}</b><span>${s[2]}</span></footer></figure>`).join("");
    let i = 0, timer = 0;
    const go = (k) => {
      i = (k + SAY.length) % SAY.length;
      $$(".ax-qi", q).forEach((el, j) => { el.classList.toggle("on", j === i); el.setAttribute("aria-hidden", String(j !== i)); });
      figs.innerHTML = SAY[i][3].map((f) => `<div class="ax-fig"><b>${f[0]}</b><span>${f[1]}</span></div>`).join("");
      n.textContent = String(i + 1).padStart(2, "0");
    };
    const auto = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => go(i + 1), 7000); };
    $(".ax-prev", say).addEventListener("click", () => { go(i - 1); auto(); });
    $(".ax-next", say).addEventListener("click", () => { go(i + 1); auto(); });
    $(".ax-prev", say).innerHTML = ARL; $(".ax-next", say).innerHTML = ARW;
    go(0); auto();
  }

  /* ---------- UAE spec sheet ---------- */
  const UAE = [
    ["VAT", "The 5% standard rate on every invoice, your TRN on every document, and the quarterly return prepared for review.", ["Standard rate 5% since 1 January 2018", "Registration required above AED 375,000 of taxable supplies and imports in 12 months", "Return and payment due 28 days after each tax period, usually quarterly"]],
    ["Corporate tax", "[Corporate-tax reporting.]", ["0% up to AED 375,000 of taxable income, 9% above it, for financial years from 1 June 2023", "Return and payment due nine months after the year end"]],
    ["E-invoicing", "[ONE ERP's readiness for the UAE e-invoicing system, and its accredited service provider.]", ["Structured invoices exchanged through accredited service providers", "Revenue of AED 50m or more: live from 1 January 2027; everyone else from 1 July 2027"]],
    ["WPS", "Salary files for the Wage Protection System, prepared from the payroll run and held until every employee has bank details.", ["Wages paid through MOHRE-approved banks, exchange houses and financial institutions"]],
    ["Gratuity", "[End-of-service gratuity accrued for each employee, every month.]", ["21 days' basic wage for each of the first five years, 30 days for each year after (Federal Decree-Law 33 of 2021)"]],
    ["Currencies", "AED as the base; invoices, payments and reports in AED, SAR and USD [and other currencies].", []],
  ];
  const rows = $("#ax-rows");
  if (rows) rows.innerHTML = UAE.map((u, i) => `<div class="ax-row rv" style="--d:${i * 0.04}s"><span>0${i + 1}</span><h3>${u[0]}</h3><div><p>${u[1]}</p>${u[2].length ? `<ul>${u[2].map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}</div></div>`).join("");

  /* ---------- going live ---------- */
  const LIVE = [["Walk through it", "A demo shaped around your company, your modules and your own processes, not a generic tour.", "Day 1"], ["We move you in", "We bring across customers, stock and balances, merge the duplicates, and set up VAT, roles and approvals with you.", "Week 1 to [x]"], ["Go live, and after", "Your dedicated contact stays on after launch, so every question goes to one person who knows your setup.", "[Go-live week]"]];
  const steps = $("#ax-steps");
  if (steps) steps.innerHTML = LIVE.map((s, i) => `<article class="ax-step rv" style="--d:${i * 0.08}s"><b>0${i + 1}</b><span class="ax-l">${s[2]}</span><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join("");

  /* ---------- FAQ ---------- */
  const FAQ = [
    ["Can we start with a few modules and add the rest later?", "Yes. Start with the module that hurts most and add the others when you're ready. They share one set of records, so nothing is entered twice."],
    ["Can you move our data from our current system?", "Yes. We bring across customers, stock and balances, merge the duplicates and check the balances with you before you go live."],
    ["Does it handle UAE VAT and the WPS file?", "Yes. 5% VAT on every invoice with your TRN on every document, and the WPS salary file prepared from the payroll run."],
    ["Who do we call when something goes wrong?", "Your dedicated contact, who knows your setup and stays on after go-live. One person, not a ticket queue."],
    ["What happens to our data if we leave?", "You can ask for a full export of your data at any time. [Confirm retention and deletion terms.]"],
    ["What does it cost?", "Pricing is per user and billed in AED, monthly or annually. [Confirm plans.]"],
  ];
  const ac = $("#ax-ac");
  if (ac) {
    ac.innerHTML = FAQ.map((f, i) => `<div class="ax-ac-i${i === 0 ? " open" : ""}"><h3><button type="button" id="axq${i}" aria-expanded="${i === 0}" aria-controls="axa${i}"><span>0${i + 1}</span><span>${f[0]}</span><i aria-hidden="true">+</i></button></h3><div class="ax-ac-c" id="axa${i}" role="region" aria-labelledby="axq${i}"><div><p>${f[1]}</p></div></div></div>`).join("");
    ac.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      const it = b.closest(".ax-ac-i"), was = it.classList.contains("open");
      $$(".ax-ac-i", ac).forEach((x) => { x.classList.remove("open"); $("button", x).setAttribute("aria-expanded", "false"); });
      if (!was) { it.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
    });
  }

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.2 });
  $$(".ax .rv, .ax-band, .ax-repl, .ax-cta").forEach((el) => io.observe(el));
})();
