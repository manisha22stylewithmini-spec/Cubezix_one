(function () {
  const { IC, PRODUCTS, INDUSTRIES } = window.CZ_NAV;
  const { fmt, rates, clamp, ease } = window.ONEERP;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const P = Object.fromEntries(PRODUCTS.map((p) => [p.k, p]));
  const svg = (d, w = 18) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICX = { ...IC, inbox: svg('<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 2h6l1-2h5"/>'), chat: svg('<path d="M4 5h16v11H9l-5 4z"/>'), pen: svg('<path d="M4 20l1-4L16.5 4.5a2 2 0 013 3L8 19z"/><path d="M14 7l3 3"/>'), laptop: svg('<rect x="4" y="5" width="16" height="11" rx="2"/><path d="M2 19h20"/>'), shield: svg('<path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z"/>'), x: svg('<path d="M6 6l12 12M18 6L6 18"/>'), ok: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>') };

  /* ---------- hero product window ---------- */
  const row = (title, sub, right, mono) => `<div class="ui-row"><div class="grow"><b style="font-weight:500">${title}</b>${sub ? `<small>${sub}</small>` : ""}</div>${mono ? `<span class="mono">${mono}</span>` : ""}${right || ""}</div>`;
  /* ---------- hero dashboard (dark device frame, pastel cards, chart, table, promo) ---------- */
  const di = (d, w = 16) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const DI = { search: di('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>'), bell: di('<path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 004 0"/>'), chev: di('<path d="M6 9l6 6 6-6"/>', 14), sliders: di('<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>'), star: di('<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.8z"/>'), arrow: di('<path d="M5 12h14M13 6l6 6-6 6"/>', 14), out: di('<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>', 18), grid: di('<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>', 18), chat: di('<path d="M4 5h16v11H9l-5 4z"/>', 18), box: di('<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>', 18), users: di('<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.6 3-5.2 6-5.2s5.4 1.6 6 5.2M16 5.4a3 3 0 010 5.4M18.5 14.8c1.6.6 2.5 2.2 2.8 4.2"/>', 18), pen: di('<path d="M4 20l1-4L16.5 4.5a2 2 0 013 3L8 19z"/><path d="M14 7l3 3"/>', 18), doc: di('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/>', 18), wallet: di('<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/>', 18), truck: di('<path d="M2 6h11v10H2zM13 9h5l3 3.5V16h-8"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>', 18), bank: di('<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>', 18), clock: di('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>', 18), check: di('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 18), cart: di('<path d="M3 4h2.5l2 11h10l2-8H6.5"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>', 18) };
  const RAIL = [["erp", DI.grid, "ONE ERP"], ["desk", DI.chat, "ONE Desk"], ["assets", DI.box, "ONE Assets"], ["people", DI.users, "ONE People"], ["sign", DI.pen, "ONE Sign"]];
  const spark = (s) => { const W = 320, H = 100, mn = Math.min(...s), mx = Math.max(...s); const pts = s.map((v, i) => [(i * W) / (s.length - 1), H - 10 - ((v - mn) / (mx - mn || 1)) * (H - 30)]); return { d: pts.map((q, i) => (i ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" "), pts, W, H }; };
  const TONES = { lav: ["#F0E5FF", "#46325C", "#A57CD2"], mint: ["#D6F4DD", "#184829", "#4AA969"], sand: ["#FEE7CD", "#563504", "#C48225"], sky: ["#E2EDF7", "#303F4C", "#7896B0"], rose: ["#FEE2F3", "#572C49", "#C670AB"], aqua: ["#CAF5F3", "#024745", "#0AA7A4"] };
  const av = (t, c) => `<span class="av" style="--c:${c}">${t}</span>`;
  const AV = { h: av("HM", "#7896B0"), d: av("DK", "#C670AB"), m: av("MS", "#4AA969"), i: av("IK", "#C48225"), s: av("SR", "#6D2FE0") };
  const stack = `<span class="a-stack">${AV.h}${AV.d}${AV.m}<i>+4</i></span>`;
  const navG = (groups, active) => groups.map((g) => `<div class="a-g"><small>${g[0]}</small>${g[1].map((n) => `<a class="${n[0] === active ? "on" : ""}">${n[1]}<span>${n[0]}</span>${n[2] ? `<em>${n[2]}</em>` : ""}</a>`).join("")}</div>`).join("");
  const gear = di('<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>');
  const plus = di('<path d="M12 5v14M5 12h14"/>', 14);
  const dots = di('<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>', 16);
  const msg = di('<path d="M4 5h16v11H9l-5 4z"/>', 13);
  const clip = di('<path d="M20 11l-8 8a5 5 0 01-7-7l9-9a3.5 3.5 0 015 5l-9 9a2 2 0 01-3-3l8-8"/>', 13);
  const cal = di('<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16M9 3v4M15 3v4"/>', 13);
  const tabsBar = (tabs, on) => `<div class="a-tabs">${tabs.map((t, i) => `<span class="${i === on ? "on" : ""}">${t[0]}${t[1] ? `<em>${t[1]}</em>` : ""}</span>`).join("")}<span class="a-ico">${DI.sliders}</span><span class="a-ico">${DI.search}</span></div>`;
  const shell = (k, o) => `<div class="app" style="--c:${P[k].c}"><aside class="a-side"><div class="a-ws"><i class="a-wl">${window.CZ_NAV.mark(24)}</i><span><b>${o.ws}</b><small>${o.wsub}</small></span>${DI.chev}</div><div class="a-search">${DI.search}<span>Search</span><kbd>/</kbd></div>${navG(o.groups, o.active)}<div class="a-user">${AV.h}<span><b>Hana M.</b><small>Finance lead</small></span>${DI.chev}</div></aside><div class="a-main"><div class="a-top"><span class="a-crumb">${o.crumb.map((c, i) => (i ? `<i>/</i>` : "") + `<b class="${i === o.crumb.length - 1 ? "cur" : ""}">${c}</b>`).join("")}</span><span class="a-tr">${stack}<span class="a-ic">${gear}</span><span class="a-ic">${DI.bell}<i></i></span><span class="a-btn">${plus}${o.btn}</span></div><div class="a-body">${o.body}</div></div></div>`;
  const stat = (tone, ic, v, l, d) => { const t = TONES[tone]; return `<div class="a-stat"><span class="tile" style="background:${t[0]};color:${t[1]}">${ic}</span><span><small>${l}</small><b>${v}</b></span><em>${d}</em><u>View Details ${DI.arrow}</u></div>`; };
  const kcard = (tag, tagc, title, desc, who, due, n, drag) => `<div class="k-card${drag ? " drag" : ""}"><span class="k-tag" style="--t:${tagc}">${tag}</span><b>${title}</b><p>${desc}</p><div class="k-foot"><span class="a-stack sm">${who}</span><span class="k-m">${cal}${due}</span><span class="k-m">${msg}${n}</span></div></div>`;
  const kcol = (name, c, n, cards) => `<div class="k-col"><div class="k-h"><u style="--t:${c}">${name}</u><em>${n}</em><span>${dots}</span></div>${cards}</div>`;
  const doc = (ti, sub, st, c) => `<div class="s-doc"><i class="tile">${DI.doc}</i><span><b>${ti}</b><small>${sub}</small></span><u class="st ${c}">${st}</u></div>`;
  const PANELS_HTML = {
    erp: () => shell("erp", { ws: "Gulf Pack Trading", wsub: "ONE ERP · 8 modules", active: "Overview", crumb: ["Finance", "Overview"], btn: "New entry",
      groups: [["Workspace", [["Overview", DI.grid], ["Inbox", DI.chat, "3"], ["Approvals", DI.check, "5"]]], ["Modules", [["Finance", DI.bank], ["Sales", DI.cart], ["Inventory", DI.box], ["Payroll", DI.wallet], ["Procurement", DI.truck]]]],
      body: `<h3>Welcome back, Hana</h3><p class="a-sub">Month-end close is two days away. Three decisions need you.</p>
      <div class="a-banner"><span><b>October close</b><small>All bank lines matched except 3. Payroll file sent.</small></span><span class="a-prog"><i style="width:82%"></i></span><em>82%</em><u class="a-cta">Review ${DI.arrow}</u></div>
      <div class="a-stats">${stat("sand", DI.bank, "214", "Bank lines matched", "+38")}${stat("mint", DI.wallet, "AED 957K", "Cash position", "+4.2%")}${stat("lav", DI.box, "1 item", "Below reorder", "Low")}</div>
      ${tabsBar([["Approvals", "3"], ["Cash"], ["Payroll"], ["Stock"]], 0)}
      <div class="a-table"><div class="a-th"><span>Item</span><span>Amount</span><span>Status</span><span>Owner</span></div>
      <div class="a-tr2"><span class="nm"><i class="tile">${DI.cart}</i><span><b>Purchase order</b><small>PO-2026-0418</small></span></span><span class="mono">AED 48,250</span><span><u class="st warn">Over budget 6%</u></span><span>${AV.h} Hana</span></div>
      <div class="a-tr2"><span class="nm"><i class="tile">${DI.bank}</i><span><b>Bank line</b><small>BL-2026-1093</small></span></span><span class="mono">AED 8,640</span><span><u class="st ok">Matched</u></span><span>${AV.m} Maria</span></div>
      <div class="a-tr2"><span class="nm"><i class="tile">${DI.wallet}</i><span><b>Payroll run</b><small>October</small></span></span><span class="mono">AED 96,400</span><span><u class="st ok">WPS sent</u></span><span>${AV.m} Maria</span></div></div>` }),
    desk: () => shell("desk", { ws: "Support", wsub: "ONE Desk · 6 agents", active: "Board", crumb: ["Support", "Ticket board"], btn: "New ticket",
      groups: [["Queues", [["Board", DI.grid], ["My tickets", DI.chat, "4"], ["Unassigned", DI.users, "2"], ["At risk", DI.clock, "2"]]], ["Customers", [["Portal", DI.star], ["Knowledge base", DI.doc]]]],
      body: `<div class="a-hd"><h3>Ticket board</h3>${tabsBar([["Board"], ["List"], ["Calendar"]], 0)}</div>
      <div class="k-board">${kcol("To do", "#7896B0", 4, kcard("VPN", "#7896B0", "VPN not connecting", "Omar in Sales can't reach the file server from home.", AV.i + AV.s, "Today", 3) + kcard("Setup", "#C48225", "New starter setup", "Laptop, email and badge for Fatima on Monday.", AV.d, "Mon", 1))}
      ${kcol("In progress", "#0AA7A4", 3, kcard("Hardware", "#0AA7A4", "Laptop won't charge", "Replacement charger ordered, loan unit handed over.", AV.i + AV.h, "2 h", 6, true) + kcard("Access", "#6D2FE0", "Shared drive access", "Finance folder for the audit team.", AV.m, "Wed", 2))}
      ${kcol("Resolved", "#4AA969", 9, kcard("Email", "#4AA969", "Mailbox full", "Archive set up, quota raised.", AV.s, "Done", 4) + kcard("Printer", "#4AA969", "Printer offline", "Driver reinstalled on 3 PCs.", AV.i, "Done", 2))}</div>` }),
    assets: () => shell("assets", { ws: "Assets", wsub: "ONE Assets · 66 devices", active: "All devices", crumb: ["Assets", "All devices"], btn: "Add device",
      groups: [["Inventory", [["All devices", DI.box, "66"], ["Laptops", DI.grid, "42"], ["Phones", DI.chat, "18"], ["In repair", DI.clock, "3"]]], ["Places", [["Dubai office", DI.truck], ["Store room", DI.box]]]],
      body: `<div class="v-split"><div class="v-list"><div class="v-fil"><span class="on">All</span><span>In use</span><span>In stock</span><span>Repair</span></div>
      <div class="v-row on"><i class="tile">${DI.box}</i><span><b>MacBook Pro 14"</b><small>AST-0187 · Aisha Rahman</small></span><u class="st ok">In use</u></div>
      <div class="v-row"><i class="tile">${DI.box}</i><span><b>iPhone 15</b><small>AST-0192 · Omar Khan</small></span><u class="st ok">In use</u></div>
      <div class="v-row"><i class="tile">${DI.box}</i><span><b>Dell Latitude</b><small>AST-0204 · Store room</small></span><u class="st brand">In stock</u></div>
      <div class="v-row"><i class="tile">${DI.box}</i><span><b>ThinkPad T14</b><small>AST-0211 · Repair desk</small></span><u class="st amber">In repair</u></div>
      <div class="v-row"><i class="tile">${DI.box}</i><span><b>iPad Air</b><small>AST-0219 · Sara Reyes</small></span><u class="st ok">In use</u></div></div>
      <div class="v-det"><div class="v-hero"><span class="v-dev">${DI.box.replace(/width="16" height="16"/, 'width="46" height="46"')}</span><span><small>AST-0187</small><b>MacBook Pro 14"</b><em>Holder: Aisha Rahman · Operations</em></span></div>
      <div class="v-specs"><span><small>Serial</small><b>C02X4T</b></span><span><small>Bought</small><b>Mar 2025</b></span><span><small>Warranty</small><b>Mar 2028</b></span><span><small>Value</small><b>AED 9,200</b></span></div>
      <div class="v-tl"><small>Custody timeline</small><div><i></i><span><b>Handed to Aisha</b><small>12 Jan · signed on receipt</small></span></div><div><i></i><span><b>Serviced</b><small>3 Jun · battery replaced</small></span></div><div class="x"><i></i><span><b>Return due</b><small>Review in 14 months</small></span></div></div></div></div>` }),
    people: () => shell("people", { ws: "People", wsub: "ONE People · 24 staff", active: "Directory", crumb: ["People", "Directory"], btn: "Add employee",
      groups: [["Team", [["Directory", DI.users, "24"], ["Leave", DI.clock, "3"], ["Payroll", DI.wallet]]], ["Hiring", [["Applicants", DI.star, "6"], ["Onboarding", DI.check]]]],
      body: `<div class="p-wrap"><div class="p-dir"><div class="a-hd"><h3>Directory</h3><span class="a-chip">Dubai ${DI.chev}</span></div>
      <div class="p-grid">${[["AR", "Aisha Rahman", "Operations", "#4AA969", 1], ["OK", "Omar Khan", "Sales", "#C48225", 0], ["FA", "Fatima Ali", "HR", "#C670AB", 0], ["RN", "Ravi Nair", "Finance", "#7896B0", 0], ["SR", "Sara Reyes", "Support", "#6D2FE0", 0], ["IK", "Imran K.", "IT", "#0AA7A4", 0]].map((e) => `<div class="p-card${e[4] ? " on" : ""}">${av(e[0], e[3])}<b>${e[1]}</b><small>${e[2]}</small></div>`).join("")}</div></div>
      <div class="p-prof"><div class="p-top">${av("AR", "#4AA969")}<span><b>Aisha Rahman</b><small>Operations lead · since 2023</small></span></div>
      <div class="p-rings"><span><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" stroke="#E6EAF3" stroke-width="4" fill="none"/><circle cx="18" cy="18" r="15" stroke="#4AA969" stroke-width="4" fill="none" stroke-dasharray="70 94" stroke-linecap="round" transform="rotate(-90 18 18)"/></svg><b>18</b><small>leave days</small></span><span><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" stroke="#E6EAF3" stroke-width="4" fill="none"/><circle cx="18" cy="18" r="15" stroke="#C670AB" stroke-width="4" fill="none" stroke-dasharray="86 94" stroke-linecap="round" transform="rotate(-90 18 18)"/></svg><b>96%</b><small>attendance</small></span></div>
      <div class="p-docs"><small>Documents</small><div><span>Employment contract</span><u class="st ok">Signed</u></div><div><span>Emirates ID</span><u class="st ok">Valid</u></div><div><span>Visa</span><u class="st warn">30 days</u></div></div></div></div>` }),
    sign: () => shell("sign", { ws: "Documents", wsub: "ONE Sign · 86 this month", active: "Pipeline", crumb: ["Documents", "Pipeline"], btn: "New document",
      groups: [["Documents", [["Pipeline", DI.grid], ["Waiting on me", DI.pen, "2"], ["Completed", DI.check]]], ["Library", [["Templates", DI.doc], ["Company stamp", DI.star]]]],
      body: `<h3>Signing pipeline</h3><div class="s-steps">${[["Draft", 3, 0], ["Sent", 5, 0], ["Signing", 4, 1], ["Stamped", 12, 0], ["Done", 62, 0]].map((s, i) => `<span class="${s[2] ? "on" : i < 2 ? "past" : ""}"><b>${s[1]}</b><small>${s[0]}</small></span>`).join("<i></i>")}</div>
      <div class="s-wrap"><div class="s-list">${doc("Employment contract", "Aisha Rahman · 2 signers", "Waiting 1", "amber")}${doc("NDA · Gulf Pack", "Supplier · 2 signers", "Signed", "ok")}${doc("Offer letter", "New starter · 3 signers", "Signed", "ok")}${doc("Lease renewal", "Landlord · 2 signers", "Draft", "brand")}</div>
      <div class="s-prev"><div class="s-page"><b>Employment contract</b><i></i><i></i><i class="short"></i><div class="s-sig"><span>Signed by Aisha<svg viewBox="0 0 120 32" fill="none" stroke="#2F36B8" stroke-width="2" stroke-linecap="round"><path d="M4 22c8-14 12-14 14-2s6 4 12-8c6-12 8 6 14 6s10-12 18-2 12 4 18-6"/></svg></span><span class="wait">Daniel, to sign</span></div><em class="stamp">STAMP</em></div><div class="s-bar"><span>Reminder in 2 h</span><u class="a-cta">Send reminder</u></div></div></div>` }),
  };
  const PANELS = Object.fromEntries(PRODUCTS.map((p) => [p.k, PANELS_HTML[p.k]]));
  const tabs = $("#h2-tabs"), panels = $("#h2-panels"), win = $("#h2-window");
  const rail = $("#h2-rail");
  rail.innerHTML = `<span class="rail-logo">${window.CZ_NAV.mark(30)}</span><div class="rail-nav">${RAIL.map((r, i) => `<button class="rail-b" data-i="${i}" aria-label="${r[2]}" title="${r[2]}" style="--c:${PRODUCTS[i].c}">${r[1]}</button>`).join("")}</div><span class="rail-out">${DI.out}</span>`;
  tabs.innerHTML = PRODUCTS.map((p, i) => `<button class="h2-tab" role="tab" data-k="${p.k}" style="--c:${p.c}" aria-selected="false"><i></i><span>${p.name}</span><b></b></button>`).join("");
  panels.innerHTML = PRODUCTS.map((p) => `<div class="h2-panel" data-k="${p.k}" role="tabpanel"></div>`).join("");
  let cur = -1, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function select(i) {
    const prev = cur; cur = i;
    $$('.h2-glows i').forEach((g, k) => g.classList.toggle('on', k === i));
    panels.style.setProperty('--dir', i >= prev ? 1 : -1);
    const u = $('#w-url'); if (u) u.textContent = 'app.cubezix.one/' + PRODUCTS[i].k;
    $$(".rail-b").forEach((b, k) => b.classList.toggle("on", k === i)); win.style.setProperty("--c", PRODUCTS[i].c);
    $$(".h2-tab").forEach((t, k) => { const on = k === i; t.classList.toggle("on", on); t.setAttribute("aria-selected", on); if (on) { t.style.setProperty("--dur", "6s"); const b = $("b", t); b.style.animation = "none"; void b.offsetWidth; b.style.animation = ""; } });
    $$(".h2-panel").forEach((p, k) => {
      if (k === i && !p.firstChild) p.innerHTML = PANELS[p.dataset.k]();
      if (k === prev && k !== i) { p.classList.add("out"); setTimeout(() => p.classList.remove("out"), 520); }
      p.classList.toggle("on", k === i);
    });
  }
  rail.addEventListener("click", (e) => { const b = e.target.closest(".rail-b"); if (b) { select(+b.dataset.i); if (!reduce) win.classList.add("paused"); } });
  tabs.addEventListener("click", (e) => { const t = e.target.closest(".h2-tab"); if (t) { select($$(".h2-tab").indexOf(t)); if (!reduce) win.classList.add("paused"); } });
  tabs.addEventListener("animationend", (e) => { if (e.target.tagName === "B" && !reduce) select((cur + 1) % PRODUCTS.length); });
  win.addEventListener("mouseenter", () => win.classList.add("paused")); win.addEventListener("mouseleave", () => win.classList.remove("paused")); tabs.addEventListener("mouseenter", () => win.classList.add("paused")); tabs.addEventListener("mouseleave", () => win.classList.remove("paused"));
  new IntersectionObserver(([e]) => win.classList.toggle("paused", !e.isIntersecting), { threshold: 0.2 }).observe(win);
  const stage = $(".h2-stage");
  stage.insertAdjacentHTML("afterbegin", `<div class="h2-float f1" aria-hidden="true"><i class="ok"></i><div><b>Payroll sent</b><small>WPS file · 8 employees</small></div></div><div class="h2-float f2" aria-hidden="true"><i class="warn"></i><div><b>Visa expires in 30 days</b><small>Fatima · HR</small></div></div><div class="h2-float f3" aria-hidden="true"><i class="brand"></i><div><b>1 decision needs you</b><small>PO-2026-0418</small></div></div>`);
  [$(".h2-stage")].forEach((el) => new IntersectionObserver(([e]) => el.classList.toggle("is-off", !e.isIntersecting), { rootMargin: "100px" }).observe(el));
  // Scroll-linked tilt, like ContainerScroll: the window starts tipped back and flattens as you scroll.
  // rotateX 20 -> 0, scale 1.05 -> 1 (0.9 -> 1 on phones), driven by the shared rAF scroll pump.
  if (!reduce) {
    const winEl = $(".h2-window"), stageEl = $(".h2-stage"), mob = matchMedia("(max-width: 768px)");
    let lastQ = -1, lastM = null;
    window.ONEERP.onScroll(() => {
      const r = stageEl.getBoundingClientRect(), vh = innerHeight;
      if (r.top > vh + 200 || r.bottom < -200) return;
      const q = Math.round(Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.85))) * 200) / 200;
      if (q === lastQ && mob.matches === lastM) return;
      lastQ = q; lastM = mob.matches;
      winEl.style.transform = `rotateX(${(20 * (1 - q)).toFixed(2)}deg) scale(${(mob.matches ? 0.9 + 0.1 * q : 1.05 - 0.05 * q).toFixed(4)})`;
    });
  }
  win.insertAdjacentHTML("afterbegin", '<div class="w-bar"><span class="w-dots"><i></i><i></i><i></i></span><span class="w-url"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg><span id="w-url">app.cubezix.one/erp</span></span><span class="w-sp"></span></div>');
  stage.insertAdjacentHTML("afterbegin", '<div class="h2-glows" aria-hidden="true">' + PRODUCTS.map((p) => `<i style="--c:${p.c}"></i>`).join("") + "</div>");
  select(0);
  if (reduce) $$(".h2-tab b").forEach((b) => (b.style.display = "none"));

  function below() {
  /* ---------- nine apps marquee ---------- */
  const NINE = [
    ["mail", "Mail", "Re: can you confirm the PO number?", "PO-2026-0418 attached to the thread, supplier replied", "a"],
    ["bank", "Bank portal", "Card limit 85% used", "Top-up request drafted for the finance lead", "y"],
    ["chat", "Chat", "Fatima: visa photos needed by noon", "Request filed on Fatima's record, reminder set", "a"],
    ["cart", "Point of sale", "Refund needs a manager PIN", "Refund shown with who and why. One tap to approve", "y"],
    ["doc", "Spreadsheet", "Cash flow: September tab updated", "Cash position now updates itself in Finance", "a"],
    ["list", "Tasks", "4 tasks due today", "Folded into one daily digest at 9:00", "a"],
    ["inbox", "Drive", "3 people edited Tender response", "One version, every edit tracked on the record", "a"],
    ["mail", "Old accounting app", "41 bank lines unmatched", "38 matched by rules, 3 left for you to confirm", "y"],
    ["cart", "Point of sale", "Price change not synced", "Price list pushed to every till automatically", "a"],
  ];
  const nz = (n, i) => `<div class="nz" data-i="${i}" role="button" tabindex="0" aria-label="${n[1]}: ${n[2]}. Tap to fix"><div class="nz-in"><div class="nz-f pain"><span class="ni">${ICX[n[0]] || ICX.inbox}</span><span class="nz-t"><small>${n[1]}</small><b>${n[2]}</b></span><em class="dot"></em><u class="tapfix">Tap to fix</u></div><div class="nz-f fix"><span class="ni">${ICX.ok}</span><span class="nz-t"><small>${n[4] === "a" ? "Handled by a rule" : "Needs you"}</small><b>${n[3]}</b></span>${n[4] === "y" ? '<button class="no-a" type="button">Approve</button>' : '<u class="dn">Done</u>'}</div></div></div>`;
  const ntrack = (ids) => `<div class="nine-in">${[...ids, ...ids].map((i) => nz(NINE[i], i)).join("")}</div>`;
  $("#nine-a").innerHTML = ntrack([0, 1, 2, 3, 4]); $("#nine-b").innerHTML = ntrack([5, 6, 7, 8]);
  const nRows = $(".nine-rows"), nMsg = $("#no-msg"), nBar = $("#no-bar"), nSum = $(".nine-sum");
  const done = new Set(); let nTimer = null, nVisible = false;
  const reduceN = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function nCount() {
    let au = 0, yo = 0; done.forEach((i) => (NINE[i][4] === "a" ? au++ : yo++));
    $("#n-auto").textContent = au; $("#n-you").textContent = yo; nBar.style.width = (done.size / NINE.length) * 100 + "%";
    if (done.size === NINE.length) { nSum.classList.add("all"); nMsg.innerHTML = `${NINE.length} messages sorted. <b>${yo}</b> are yours to decide.`; stopN(); }
    else { nSum.classList.remove("all"); nMsg.textContent = done.size ? `${NINE.length - done.size} more to sort…` : "Watching your apps…"; }
  }
  function resolve(i) {
    if (done.has(i)) return; done.add(i);
    $$(`.nz[data-i="${i}"]`, nRows).forEach((c) => c.classList.add("ok"));
    nCount();
  }
  function nextN() { const i = NINE.findIndex((_, k) => !done.has(k)); if (i < 0) return stopN(); resolve(i); }
  function startN() { if (nTimer || done.size === NINE.length) return; nTimer = setInterval(nextN, 1700); }
  function stopN() { clearInterval(nTimer); nTimer = null; }
  function resetN() { stopN(); done.clear(); $$(".nz", nRows).forEach((c) => c.classList.remove("ok")); nCount(); setTimeout(() => { if (nVisible) startN(); }, 700); }
  nRows.addEventListener("click", (e) => {
    const b = e.target.closest(".no-a"); if (b) { e.stopPropagation(); b.outerHTML = '<u class="dn ok">Approved</u>'; return; }
    const c = e.target.closest(".nz"); if (c) resolve(+c.dataset.i);
  });
  nRows.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("nz")) { e.preventDefault(); resolve(+e.target.dataset.i); } });
  $("#no-replay").addEventListener("click", resetN);
  if (reduceN) NINE.forEach((_, i) => resolve(i));
  else new IntersectionObserver(([e]) => { nVisible = e.isIntersecting; $(".nine-rows").classList.toggle("is-off", !nVisible); if (nVisible) startN(); else stopN(); }, { threshold: 0.3 }).observe(nRows);

  /* ---------- stats count-up ---------- */
  $$(".h2-stat b").forEach((b) => window.ONEERP.inView(b, () => { const to = +b.dataset.to, suf = b.dataset.suf || "", t0 = performance.now(); (function tick(t) { const k = clamp((t - t0) / 1400); b.textContent = Math.round(to * ease(k)).toLocaleString("en-US") + suf; if (k < 1) requestAnimationFrame(tick); })(t0); }, 0.6));

  /* ---------- before / after ---------- */
  const BEFORE = ["Orders, invoices and stock live in three different files", "Requests get lost in chats and shared inboxes", "Laptops and phones nobody can fully account for", "Payroll dates and visa expiries tracked from memory", "Contracts printed, signed and chased by phone"];
  const AFTER = ["One record for every customer, item and amount", "Every request has an owner and a deadline", "Every device has a holder and a history", "Pay day and permits flagged before they lapse", "Documents signed and stamped online, with a trail"];
  $("#ba-before").innerHTML = BEFORE.map((t) => `<li>${ICX.x}<span>${t}</span></li>`).join("");
  $("#ba-after").innerHTML = AFTER.map((t) => `<li>${ICX.ok}<span>${t}</span></li>`).join("");

  const bar = (w, c) => `<div class="mv-bar"><i style="width:${w}%;${c ? "background:" + c : ""}"></i></div>`;
  /* ---------- products bento ---------- */
  const PC = {
    erp: { cls: "wide", p: "Finance, HR, payroll, inventory, sales, CRM, procurement and operations on one set of records, with UAE VAT, WPS and e-invoicing built in.", li: ["Every dirham in and out, matched to your books", "Purchases checked against budget before anyone signs", "One decision at a time, with the numbers beside it"] },
    desk: { p: "A helpdesk for your customers and your staff. Every request gets an owner and a time to reply.", li: ["Email, portal, chat and device agent", "SLAs and escalation to the team lead"] },
    assets: { p: "Every laptop and phone: who has it, what was repaired, and when it comes back.", li: ["Serial, warranty and handover signature", "Return checklist when someone leaves"], soon: true },
    people: { p: "One file for each employee, from the first applicant to the last day.", li: ["Leave, attendance and expense claims", "Payslips and WPS-ready payroll"] },
    sign: { p: "Sign and stamp contracts and letters online, in order, with an audit trail.", li: ["Company stamp and signing order", "Reminders before a document goes stale"] },
  };
  const PV = {
    erp: `<div class="pv erp"><div><small>Handled by rules</small><b>214</b></div><div><small>Digest</small><b>37</b></div><div class="need"><small>Needs you</small><b>1</b><u>Approve</u></div></div>`,
    desk: `<div class="pv list">${[["Laptop won't charge", "In progress", "brand"], ["VPN not connecting", "At risk", "amber"], ["New starter setup", "On track", "ok"]].map((t) => `<div><span>${t[0]}</span><i class="${t[2]}">${t[1]}</i></div>`).join("")}</div>`,
    assets: `<div class="pv steps">${["Record", "Hand over", "Look after", "Return"].map((t, i) => `<span class="${i < 3 ? "d" : ""}"><i>${i + 1}</i>${t}</span>`).join("")}</div>`,
    people: `<div class="pv leave"><div><span>Annual leave</span><em>18 of 30 days</em></div>${bar(60, "#C670AB")}<div><span>Sick leave</span><em>13 of 15 days</em></div>${bar(87, "#C670AB")}</div>`,
    sign: `<div class="pv sign"><svg viewBox="0 0 120 32" fill="none" stroke="#C48225" stroke-width="2" stroke-linecap="round"><path d="M4 22c8-14 12-14 14-2s6 4 12-8c6-12 8 6 14 6s10-12 18-2 12 4 18-6"/></svg><span>Signed 14:02</span><div class="stamp s">STAMP</div></div>`,
  };
  $("#bento").innerHTML = PRODUCTS.map((p, i) => { const c = PC[p.k]; return `<a class="pc ${c.cls || ""} rv" href="${p.href}" style="--c:${p.c};--soft:${p.soft};--deep:${p.deep};--d:${i * 0.06}s">${c.soon ? '<span class="soon">COMING SOON</span>' : ""}<div class="pn"><i></i>${p.name}${p.flag ? `<em>${p.flag}</em>` : ""}</div><p>${c.p}</p>${p.k === "erp" ? `<div class="chips2">${p.modules.map((m) => `<span>${ICX[m[0]]}${m[1]}</span>`).join("")}</div>` : ""}<ul>${c.li.map((l) => `<li>${l}</li>`).join("")}</ul>${PV[p.k] || ""}<span class="go">Explore ${p.name} ${IC.arrow}</span></a>`; }).join("");

  /* ---------- industries ---------- */
  const STRONG = { Trading: "#C8CE85", Retail: "#F2AFDB", Manufacturing: "#B4CBDF", Services: "#D6B8F9" };
  const IND = { Trading: ["Buy abroad, clear at the port, sell on. Every shipment costed from the supplier's invoice to the customer's payment.", "1 landed cost to confirm"], Retail: ["Several stores, one stock. Every branch's sales and shelves in view, before the busy weekend, not after it.", "1 store running short"], Manufacturing: ["Know what each product really costs, and which missing part will stop the line, while there is still time to order it.", "1 work order waiting for a part"], Services: ["Hours, budgets and invoices on every project, so the margin is protected while the work is still running.", "1 project heading over budget"] };
  const iwin = (title, body) => `<div class="ic-win"><div class="ic-bar"><i></i><i></i><i></i><span>${title}</span></div><div class="ic-body">${body}</div></div>`;
  const irw = (l, r, cls = "") => `<div class="iw-r ${cls}"><span>${l}</span><b>${r}</b></div>`;
  const ibar = (l, v, low) => `<div class="iw-b${low ? " low" : ""}"><span>${l}</span><i><u style="--w:${v}%"></u></i><b>${v}%</b></div>`;
  const VIS = {
    Trading: [iwin("SHP-0412 · landed cost", irw("Supplier invoice", "AED 38,400") + irw("Freight", "4,120") + irw("Customs and port", "3,980") + `<div class="iw-stack"><u style="--w:82%"></u><u style="--w:9%"></u><u style="--w:9%"></u></div>` + irw("Landed cost", "AED 46,500", "tot")), "1 landed cost to confirm"],
    Retail: [iwin("Stock by store", ibar("Dubai Mall", 82) + ibar("Abu Dhabi", 64) + ibar("Sharjah", 18, true) + ibar("Ajman", 71)), "1 store running short"],
    Manufacturing: [iwin("WO-218 · Cargo trolley", `<div class="iw-s ok"><i></i>Frame welded<em>Done</em></div><div class="iw-s ok"><i></i>Motor fitted<em>Done</em></div><div class="iw-s no"><i></i>Control board<em>Missing</em></div><div class="iw-s"><i></i>Final test<em>Waiting</em></div>`), "1 work order waiting for a part"],
    Services: [iwin("Project budget · Marina fit-out", `<div class="iw-chart"><u style="--h:34%"></u><u style="--h:48%"></u><u style="--h:57%"></u><u style="--h:71%"></u><u style="--h:88%"></u><u class="hot" style="--h:104%"></u></div>` + irw("Spent", "AED 126K of 120K", "bad") + irw("Margin", "22%")), "1 project heading over budget"],
  };
  $("#ind-cards").innerHTML = INDUSTRIES.map((n, i) => `<a class="ic rv" href="${n[2]}" style="--p:${n[5]};--d:${n[6]};--b:${n[4]};--s:${STRONG[n[0]]};--dd:${i * 0.06}s;transition-delay:var(--dd)"><div class="ic-top"><span class="tile">${n[0][0]}</span><span class="go">Read the guide ${IC.arrow}</span></div><h3>${n[0]}</h3><p>${IND[n[0]][0]}</p><div class="ic-vis">${VIS[n[0]][0]}<div class="ic-chip"><i></i>${VIS[n[0]][1]}</div></div></a>`).join("");

  /* ---------- features ---------- */
  const mrow = (a, b2, tag) => `<div class="mv-row"><span>${a}</span><em>${b2 || ""}</em>${tag || ""}</div>`;
  const FEAT = [
    ["inbox", "One inbox for decisions", "Rules handle the routine. Only the decisions that are yours reach you, ready to act on.", "", "big", `<div class="mv"><div class="mv-row hl"><span><b>Purchase order PO-0418</b><small>Over budget by 6%</small></span><u>Approve</u></div>${mrow("31 bank lines matched", "by your rules", '<i class="ok">Done</i>')}${mrow("Reminders sent", "4 overdue invoices", '<i class="ok">Done</i>')}</div>`],
    ["bank", "Finance and VAT", "Cash, invoices and 5% VAT matched to the bank, with the return prepared for review.", "ONE ERP", "", `<div class="mv">${mrow("HARBOUR LINE FRT", "AED 8,640.00")}<div class="mv-link"><i></i><b>Matched to INV-2026-0531</b></div>${mrow("VAT return", "Due 28 Oct", '<i class="brand">Ready</i>')}</div>`],
    ["wallet", "Payroll and WPS", "Pay day on time, with the Wage Protection System file held until every employee is complete.", "ONE ERP", "", `<div class="mv"><div class="mv-top"><b>Payroll · October</b><em>8 of 8</em></div>${bar(100)}${mrow("WPS file", "AED 96,400.00", '<i class="ok">Sent</i>')}</div>`],
    ["users", "HR, visas and permits", "Contracts, visas and leave on one file, flagged 30 days before they expire.", "ONE People", "", `<div class="mv">${mrow("Visa · Fatima", "21 Nov 2026", '<i class="warn">30 days</i>')}${mrow("Emirates ID · Omar", "Mar 2027", '<i class="ok">Valid</i>')}${mrow("Contract · Aisha", "Signed", '<i class="ok">Valid</i>')}</div>`],
    ["box", "Inventory", "Stock in every location, counted as it moves, with reorders raised for you.", "ONE ERP", "", `<div class="mv"><div class="mv-top"><b>Shipping carton 40×30</b><em>120 in stock</em></div><div class="mv-bar red"><i style="width:20%"></i><s style="left:33%"></s></div><div class="mv-top"><small>Reorder at 200</small><u>Create PO</u></div></div>`],
    ["target", "Sales and CRM", "One record from the first lead and quote to the payment. Nothing delivered goes unbilled.", "ONE ERP", "", `<div class="mv"><div class="mv-steps"><span class="d">Quote</span><span class="d">Order</span><span class="d">Delivery</span><span class="c">Invoice</span><span>Paid</span></div>${mrow("QT-2026-0187", "AED 25,200.00")}</div>`],
    ["cart", "Procurement", "Purchase orders checked against budget before anyone signs.", "ONE ERP", "", `<div class="mv"><div class="mv-top"><b>Packaging budget</b><em>106%</em></div><div class="mv-bar red"><i style="width:100%"></i></div>${mrow("PO-2026-0418", "Held for approval", '<i class="warn">Over</i>')}</div>`],
    ["chat", "Helpdesk", "Every request gets an owner and a deadline, from email, portal, chat or the device agent.", "ONE Desk", "big", `<div class="mv"><div class="mv-top"><b>Laptop won't charge</b><i class="teal">Resolved</i></div>${bar(46, "#0AA7A4")}<div class="mv-top"><small>First reply 14 of 30 min</small><small>Imran</small></div></div>`],
    ["pen", "E-sign and stamps", "Contracts signed in order and stamped online, with a full audit trail.", "ONE Sign", "big", `<div class="mv"><div class="mv-sig"><svg viewBox="0 0 120 32" fill="none" stroke="#2F36B8" stroke-width="2" stroke-linecap="round"><path d="M4 22c8-14 12-14 14-2s6 4 12-8c6-12 8 6 14 6s10-12 18-2 12 4 18-6"/></svg><span class="stamp s">STAMP</span></div>${mrow("Aisha signed", "14:02", '<i class="ok">Signed</i>')}</div>`],
  ];
  const ORDER = [0, 1, 2, 3, 4, 5, 7, 6, 8];
  $("#feat-grid").innerHTML = ORDER.map((k) => FEAT[k]).map((f, i) => `<div class="fc ${f[4]} rv" style="--d:${(i % 3) * 0.06}s">${f[5]}<div class="fh"><div class="fi">${ICX[f[0]]}</div>${f[3] ? `<span class="from">${f[3]}</span>` : ""}</div><h3>${f[1]}</h3><p>${f[2]}</p></div>`).join("");

  /* ---------- how it works ---------- */
  const hwv = [
    `<svg viewBox="0 0 320 176" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><circle cx="86" cy="150" r="90" fill="#fff" opacity=".45"/><circle cx="270" cy="18" r="60" fill="#fff" opacity=".35"/><g class="il-float"><rect x="52" y="26" width="196" height="116" rx="14" fill="#fff"/><path d="M52 40a14 14 0 0114-14h168a14 14 0 0114 14v6H52z" fill="#E9E8FF"/><circle cx="66" cy="36" r="3" fill="#FF6B62"/><circle cx="76" cy="36" r="3" fill="#FFC24B"/><circle cx="86" cy="36" r="3" fill="#3DD16F"/><rect x="60" y="54" width="34" height="80" rx="8" fill="#F4F7FC"/><rect x="66" y="62" width="22" height="5" rx="2.5" fill="#3B4BE8"/><rect x="66" y="74" width="18" height="5" rx="2.5" fill="#CBD3EA"/><rect x="66" y="86" width="22" height="5" rx="2.5" fill="#CBD3EA"/><rect x="66" y="98" width="14" height="5" rx="2.5" fill="#CBD3EA"/><rect x="102" y="54" width="44" height="26" rx="7" fill="#FEE7CD"/><rect x="152" y="54" width="44" height="26" rx="7" fill="#D5F1DF"/><rect x="202" y="54" width="38" height="26" rx="7" fill="#E9E8FF"/><rect x="102" y="88" width="138" height="46" rx="8" fill="#F4F7FC"/><rect x="104" y="120" width="10" height="14" rx="3" fill="#5FD6D6"/><rect x="120" y="112" width="10" height="22" rx="3" fill="#5FD6D6"/><rect x="136" y="116" width="10" height="18" rx="3" fill="#7CB4E6"/><rect x="152" y="104" width="10" height="30" rx="3" fill="#3B4BE8"/><rect x="168" y="108" width="10" height="26" rx="3" fill="#3B4BE8"/><rect x="184" y="96" width="10" height="38" rx="3" fill="#3B4BE8"/><rect x="200" y="102" width="10" height="32" rx="3" fill="#6D2FE0"/><rect x="216" y="88" width="10" height="46" rx="3" fill="#6D2FE0"/></g><path d="M214 104v16l5-4 4 9 4-2-4-9h7z" fill="#0E1B2C" stroke="#fff" stroke-width="1.5"/><g class="il-float2"><circle cx="278" cy="96" r="15" fill="#FFD9C2"/><path d="M263 94c0-10 8-16 16-16s14 6 14 14c-6-4-18-5-30 2z" fill="#0E1B2C"/><path d="M252 152c0-16 12-28 26-28s26 12 26 28v24h-52z" fill="#6D2FE0"/><path d="M258 138l-26-18" stroke="#6D2FE0" stroke-width="9" stroke-linecap="round"/><circle cx="230" cy="119" r="5.5" fill="#FFD9C2"/></g><g class="il-float" style="animation-delay:-2s"><rect x="14" y="20" width="64" height="32" rx="12" fill="#3B4BE8"/><path d="M30 52l-4 11 15-11z" fill="#3B4BE8"/><path d="M26 36l6 6 11-11" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="50" y="30" width="18" height="3.5" rx="1.75" fill="#fff" opacity=".85"/><rect x="50" y="38" width="12" height="3.5" rx="1.75" fill="#fff" opacity=".6"/></g></svg>`,
    `<svg viewBox="0 0 320 176" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><defs><linearGradient id="ilg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5FD6D6"/><stop offset=".5" stop-color="#3B4BE8"/><stop offset="1" stop-color="#6D2FE0"/></linearGradient></defs><circle cx="262" cy="100" r="70" fill="#fff" opacity=".5"/><g><rect x="14" y="62" width="56" height="42" rx="9" fill="#DDE3F2"/><rect x="22" y="82" width="56" height="42" rx="9" fill="#C9D0E4"/><rect x="14" y="104" width="56" height="42" rx="9" fill="#B4BCD6"/><rect x="24" y="116" width="26" height="4" rx="2" fill="#fff" opacity=".8"/><rect x="24" y="125" width="18" height="4" rx="2" fill="#fff" opacity=".6"/></g><path d="M84 104C130 56 176 150 226 100" stroke="#3B4BE8" stroke-width="2.5" stroke-dasharray="6 7" fill="none" class="il-dash"/><g class="il-fly"><rect x="88" y="88" width="18" height="22" rx="4" fill="#fff" stroke="#5FD6D6" stroke-width="2"/></g><g class="il-fly" style="animation-delay:-1s"><rect x="88" y="88" width="18" height="22" rx="4" fill="#fff" stroke="#7CB4E6" stroke-width="2"/></g><g class="il-fly" style="animation-delay:-2s"><rect x="88" y="88" width="18" height="22" rx="4" fill="#fff" stroke="#6D2FE0" stroke-width="2"/></g><g class="il-float2"><rect x="226" y="58" width="78" height="78" rx="22" fill="url(#ilg2)"/><path d="M247 98l11 11 20-23" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g><path d="M300 40l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#FFC24B" class="il-float"/><path d="M212 40l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#fff" class="il-float2"/><rect x="232" y="146" width="66" height="14" rx="7" fill="#fff"/><rect x="238" y="151" width="30" height="4" rx="2" fill="#3DD16F"/></svg>`,
    `<svg viewBox="0 0 320 176" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><ellipse cx="60" cy="172" rx="76" ry="24" fill="#fff" opacity=".85"/><ellipse cx="256" cy="178" rx="86" ry="26" fill="#fff" opacity=".85"/><ellipse cx="160" cy="184" rx="60" ry="20" fill="#fff" opacity=".7"/><path d="M40 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#fff" class="il-float2"/><path d="M286 96l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#FFC24B" class="il-float"/><circle cx="96" cy="48" r="3" fill="#fff"/><circle cx="224" cy="34" r="2.5" fill="#fff"/><g class="il-rise"><g transform="rotate(22 160 90)"><path d="M150 108q10 44 10 44q0 0 10-44z" fill="#FFC24B" class="il-flame"/><path d="M154 108q6 26 6 26q0 0 6-26z" fill="#FF8A3D"/><path d="M144 90l-20 26 20-8z" fill="#3B4BE8"/><path d="M176 90l20 26-20-8z" fill="#3B4BE8"/><path d="M160 20c22 18 26 54 17 90h-34c-9-36-5-72 17-90z" fill="#fff"/><path d="M160 20c22 18 26 54 17 90h-17z" fill="#E9E8FF"/><path d="M160 20c10 8 16 19 19 32h-38c3-13 9-24 19-32z" fill="#6D2FE0"/><circle cx="160" cy="72" r="12" fill="#3B4BE8"/><circle cx="160" cy="72" r="7" fill="#5FD6D6"/></g></g><g class="il-float2"><circle cx="48" cy="104" r="24" fill="#fff"/><circle cx="48" cy="102" r="11" fill="#FFD9C2"/><path d="M37 100c0-8 5-12 11-12s11 4 11 12c-4-3-18-3-22 0z" fill="#0E1B2C"/><path d="M34 102a14 14 0 0128 0" stroke="#3B4BE8" stroke-width="3" fill="none"/><rect x="30" y="100" width="6" height="11" rx="3" fill="#3B4BE8"/><rect x="60" y="100" width="6" height="11" rx="3" fill="#3B4BE8"/><path d="M63 109q0 9-9 9" stroke="#3B4BE8" stroke-width="2" fill="none"/><circle cx="68" cy="122" r="6.5" fill="#3DD16F" stroke="#fff" stroke-width="2.5"/></g><g class="il-float" style="animation-delay:-1.5s"><rect x="230" y="30" width="68" height="28" rx="14" fill="#fff"/><circle cx="246" cy="44" r="5" fill="#3DD16F"/><text x="257" y="48.5" font-size="12" font-weight="700" font-family="Sora,Inter,sans-serif" fill="#0E1B2C">LIVE</text></g></svg>`,
  ];
  const STEPS = [["Walk through it", "A demo shaped around your company, your modules and your own processes, not a generic tour.", "Day 1"], ["We move you in", "We bring across customers, stock and balances, merge the duplicates, and set up VAT, roles and approvals with you.", "Week 1 to [x]"], ["Go live, and after", "Your dedicated contact stays on after launch, so every question goes to one person who knows your setup.", "Then, every day"]];
  const hw = $("#steps");
  hw.innerHTML = `<div class="hw-line" aria-hidden="true"><i></i>${STEPS.map((_, i) => `<b class="hw-node" data-i="${i}">${i + 1}</b>`).join("")}</div><div class="hw-cards">${STEPS.map((x, i) => `<article class="hw-c rv" style="--d:${i * 0.08}s"><span class="hw-chip">${x[2]}</span><h3>${x[0]}</h3><p>${x[1]}</p><div class="hw-vis">${hwv[i]}</div></article>`).join("")}</div>`;
  {
    const nodes = $$(".hw-node", hw), cards = $$(".hw-c", hw); let lastP = -1;
    const upd = () => {
      const r = hw.getBoundingClientRect(), vh = innerHeight;
      if (r.top > vh + 100 || r.bottom < -100) return;
      const pr = Math.round(clamp((vh * 0.72 - r.top) / (r.height * 0.85), 0, 1) * 200) / 200;
      if (pr === lastP) return; lastP = pr;
      hw.style.setProperty("--p", pr);
      nodes.forEach((n, i) => { const on = pr >= i / (nodes.length - 1) - 0.02; n.classList.toggle("on", on); cards[i].classList.toggle("on", on); });
    };
    window.ONEERP.onScroll(upd); upd();
  }

  /* ---------- clients ---------- */
  const Q = [["From the initial IT consultation to the seamless implementation, CubeZix demonstrated a deep understanding of our unique IT infrastructure needs. Their expertise in network security, cloud computing and infrastructure management has significantly enhanced our operational efficiency.", "Samarth V", "Assistant Finance Manager, Al Rama International FZCO", "#7896B0"], ["CubeZix's responsiveness is impressive; they are always quick to address any issues that arise, minimizing downtime and keeping our operations seamless. Beyond maintenance, they offer valuable advice and proactive solutions.", "Tarek Nachnouchi", "Chief Product Officer, Arabyads", "#0AA7A4"], ["CubeZix's proactive maintenance approach is a standout feature. They regularly monitor our systems, perform routine check-ups, and provide detailed reports on our IT health.", "Aman Nasser", "Director, International Textile Exports Ltd", "#C670AB"]];
  const qcard = (q) => `<figure class="qm-c"><div class="stars" aria-label="5 stars">★★★★★</div><p>${q[0]}</p><figcaption class="who"><span class="av" style="--c:${q[3]}">${q[1].split(" ").map((w) => w[0]).join("").slice(0, 2)}</span><div><b>${q[1]}</b><small>${q[2]}</small></div></figcaption></figure>`;
  const qrow = (arr, rev) => `<div class="qm-track${rev ? " rev" : ""}"><div class="qm-in">${[...arr, ...arr].map(qcard).join("")}</div></div>`;
  $("#quotes").innerHTML = qrow([Q[0], Q[1], Q[2]]) + qrow([Q[1], Q[2], Q[0]], true);
  new IntersectionObserver(([e]) => $("#quotes").classList.toggle("is-off", !e.isIntersecting)).observe($("#quotes"));

  /* ---------- faq ---------- */
  const FAQ = [["How long does it take to go live?", "It depends on your size and modules. Most companies go live in [timeframe]. Your dedicated contact plans every step with you."], ["Can we start with just one product?", "Yes. Start with the ERP, the helpdesk or HR on their own, and add the rest later. They share records when you run them together."], ["Can you move our data from our current system?", "Yes. We migrate your customers, items and balances, and clean up duplicates along the way, so you start with one clean record for everything."], ["Does it handle UAE VAT, WPS and e-invoicing?", "Yes. VAT at 5% is built in, WPS salary files are prepared from the payroll run, and e-invoicing is supported as the UAE rules come into force."], ["Where is our data stored, and is it secure?", "[Hosting location and security details.] Access is controlled with roles, two-factor login and a full audit trail."], ["What does our dedicated contact do?", "One person at CubeZix who knows your setup, from your first demo through go-live and beyond."]];
  const FICON = [DI.clock, DI.box, DI.doc, DI.wallet, ICX.shield || DI.check, DI.users];
  const fcard = (f, i) => `<button class="fm-c" type="button" data-i="${i}" aria-pressed="false"><span class="fm-i">${FICON[i]}</span><span class="fm-t"><b>${f[0]}</b><small>${f[1]}</small></span><span class="fm-go">${DI.arrow}</span></button>`;
  const frow = (ids, rev) => `<div class="fm-track${rev ? " rev" : ""}"><div class="fm-in">${[...ids, ...ids].map((i) => fcard(FAQ[i], i)).join("")}</div></div>`;
  const fRows = $("#faq-rows"), fAns = $("#faq-ans");
  fRows.innerHTML = frow([0, 1, 2]) + frow([3, 4, 5], true);
  function showFaq(i) {
    $$(".fm-c", fRows).forEach((c) => { const on = +c.dataset.i === i; c.classList.toggle("on", on); c.setAttribute("aria-pressed", on); });
    fAns.innerHTML = `<div class="fa-n"><span class="fa-ic">${FICON[i]}</span><small>Question ${i + 1} of ${FAQ.length}</small></div><div class="fa-b"><h3>${FAQ[i][0]}</h3><p>${FAQ[i][1]}</p></div><a class="btn btn-primary" href="book-a-demo.html">Ask in a demo</a>`;
    fAns.classList.remove("swap"); void fAns.offsetWidth; fAns.classList.add("swap");
  }
  fRows.addEventListener("click", (e) => { const c = e.target.closest(".fm-c"); if (c) showFaq(+c.dataset.i); });
  showFaq(0);
  new IntersectionObserver(([e]) => fRows.classList.toggle("is-off", !e.isIntersecting)).observe(fRows);

    window.ONEERP.observeReveal();
  }
  if ("requestIdleCallback" in window) requestIdleCallback(below, { timeout: 700 }); else setTimeout(below, 250);
  window.ONEERP.observeReveal();
})();
