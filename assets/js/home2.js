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
  const TONES = { lav: ["#F0E5FF", "#3A1B7A", "#8C5CE8"], mint: ["#D8F4F4", "#0B4F54", "#1FA9AE"], sand: ["#E3E5FF", "#1F2670", "#2B2FA0"], sky: ["#E3EDFD", "#1F2F5C", "#3F7FE0"], rose: ["#EFE4FF", "#3A1B7A", "#633ADD"], aqua: ["#D8F4F4", "#024745", "#0AA7A4"] };
  const av = (t, c) => `<span class="av" style="--c:${c}">${t}</span>`;
  const AV = { h: av("HM", "#3F7FE0"), d: av("DK", "#633ADD"), m: av("MS", "#1FA9AE"), i: av("IK", "#2B2FA0"), s: av("SR", "#633ADD") };
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
      <div class="k-board">${kcol("To do", "#3F7FE0", 4, kcard("VPN", "#3F7FE0", "VPN not connecting", "Omar in Sales can't reach the file server from home.", AV.i + AV.s, "Today", 3) + kcard("Setup", "#2B2FA0", "New starter setup", "Laptop, email and badge for Fatima on Monday.", AV.d, "Mon", 1))}
      ${kcol("In progress", "#0AA7A4", 3, kcard("Hardware", "#0AA7A4", "Laptop won't charge", "Replacement charger ordered, loan unit handed over.", AV.i + AV.h, "2 h", 6, true) + kcard("Access", "#633ADD", "Shared drive access", "Finance folder for the audit team.", AV.m, "Wed", 2))}
      ${kcol("Resolved", "#1FA9AE", 9, kcard("Email", "#1FA9AE", "Mailbox full", "Archive set up, quota raised.", AV.s, "Done", 4) + kcard("Printer", "#1FA9AE", "Printer offline", "Driver reinstalled on 3 PCs.", AV.i, "Done", 2))}</div>` }),
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
      <div class="p-grid">${[["AR", "Aisha Rahman", "Operations", "#1FA9AE", 1], ["OK", "Omar Khan", "Sales", "#2B2FA0", 0], ["FA", "Fatima Ali", "HR", "#633ADD", 0], ["RN", "Ravi Nair", "Finance", "#3F7FE0", 0], ["SR", "Sara Reyes", "Support", "#633ADD", 0], ["IK", "Imran K.", "IT", "#0AA7A4", 0]].map((e) => `<div class="p-card${e[4] ? " on" : ""}">${av(e[0], e[3])}<b>${e[1]}</b><small>${e[2]}</small></div>`).join("")}</div></div>
      <div class="p-prof"><div class="p-top">${av("AR", "#1FA9AE")}<span><b>Aisha Rahman</b><small>Operations lead · since 2023</small></span></div>
      <div class="p-rings"><span><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" stroke="#E6E8FA" stroke-width="4" fill="none"/><circle cx="18" cy="18" r="15" stroke="#1FA9AE" stroke-width="4" fill="none" stroke-dasharray="70 94" stroke-linecap="round" transform="rotate(-90 18 18)"/></svg><b>18</b><small>leave days</small></span><span><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" stroke="#E6E8FA" stroke-width="4" fill="none"/><circle cx="18" cy="18" r="15" stroke="#633ADD" stroke-width="4" fill="none" stroke-dasharray="86 94" stroke-linecap="round" transform="rotate(-90 18 18)"/></svg><b>96%</b><small>attendance</small></span></div>
      <div class="p-docs"><small>Documents</small><div><span>Employment contract</span><u class="st ok">Signed</u></div><div><span>Emirates ID</span><u class="st ok">Valid</u></div><div><span>Visa</span><u class="st warn">30 days</u></div></div></div></div>` }),
    sign: () => shell("sign", { ws: "Documents", wsub: "ONE Sign · 86 this month", active: "Pipeline", crumb: ["Documents", "Pipeline"], btn: "New document",
      groups: [["Documents", [["Pipeline", DI.grid], ["Waiting on me", DI.pen, "2"], ["Completed", DI.check]]], ["Library", [["Templates", DI.doc], ["Company stamp", DI.star]]]],
      body: `<h3>Signing pipeline</h3><div class="s-steps">${[["Draft", 3, 0], ["Sent", 5, 0], ["Signing", 4, 1], ["Stamped", 12, 0], ["Done", 62, 0]].map((s, i) => `<span class="${s[2] ? "on" : i < 2 ? "past" : ""}"><b>${s[1]}</b><small>${s[0]}</small></span>`).join("<i></i>")}</div>
      <div class="s-wrap"><div class="s-list">${doc("Employment contract", "Aisha Rahman · 2 signers", "Waiting 1", "amber")}${doc("NDA · Gulf Pack", "Supplier · 2 signers", "Signed", "ok")}${doc("Offer letter", "New starter · 3 signers", "Signed", "ok")}${doc("Lease renewal", "Landlord · 2 signers", "Draft", "brand")}</div>
      <div class="s-prev"><div class="s-page"><b>Employment contract</b><i></i><i></i><i class="short"></i><div class="s-sig"><span>Signed by Aisha<svg viewBox="0 0 120 32" fill="none" stroke="#2F36B8" stroke-width="2" stroke-linecap="round"><path d="M4 22c8-14 12-14 14-2s6 4 12-8c6-12 8 6 14 6s10-12 18-2 12 4 18-6"/></svg></span><span class="wait">Daniel, to sign</span></div><em class="stamp">STAMP</em></div><div class="s-bar"><span>Reminder in 2 h</span><u class="a-cta">Send reminder</u></div></div></div>` }),
  };
  const PANELS = Object.fromEntries(PRODUCTS.map((p) => [p.k, PANELS_HTML[p.k]]));
  const TABICON = {"erp": "<svg viewBox=\"78 72 172 156\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M161 96L114 126M178 101L213 127M111 159L141 187M218 160L190 188\" stroke=\"#B9C1FA\" stroke-width=\"7\"/> <path d=\"M166 82C210 82 242 114 242 151C242 189 210 220 166 220C128 220 98 195 92 160\" stroke=\"url(#tg-erp)\" stroke-width=\"9\"/> <rect x=\"135\" y=\"121\" width=\"61\" height=\"61\" rx=\"18\" fill=\"url(#tg-erp)\"/> <path d=\"M153 151h25M165.5 138.5v25\" stroke=\"white\" stroke-width=\"7\"/> <rect x=\"86\" y=\"112\" width=\"35\" height=\"35\" rx=\"11\" fill=\"#E9ECFF\" stroke=\"#5B6BF0\" stroke-width=\"4\"/> <rect x=\"206\" y=\"112\" width=\"35\" height=\"35\" rx=\"11\" fill=\"#E9ECFF\" stroke=\"#5B6BF0\" stroke-width=\"4\"/> <rect x=\"93\" y=\"181\" width=\"35\" height=\"35\" rx=\"11\" fill=\"#E9ECFF\" stroke=\"#5B6BF0\" stroke-width=\"4\"/> <rect x=\"203\" y=\"181\" width=\"35\" height=\"35\" rx=\"11\" fill=\"#E9ECFF\" stroke=\"#5B6BF0\" stroke-width=\"4\"/> <path d=\"M97 129h13M103.5 122.5v13M217 129h13M223.5 122.5v13M104 198h13M110.5 191.5v13M214 198h13M220.5 191.5v13\" stroke=\"#5B6BF0\" stroke-width=\"3\"/></svg>", "desk": "<svg viewBox=\"366 44 218 180\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M374 153L396 105C399 99 405 95 412 95H512C519 95 525 99 528 105L550 153V202C550 210 544 216 536 216H388C380 216 374 210 374 202V153Z\" fill=\"#E5F8F6\" stroke=\"url(#tg-desk)\" stroke-width=\"8\"/> <path d=\"M374 153H421L434 171H490L503 153H550\" stroke=\"url(#tg-desk)\" stroke-width=\"8\"/> <path d=\"M431 127H489\" stroke=\"#79D6D1\" stroke-width=\"7\"/> <path d=\"M461 75V122\" stroke=\"url(#tg-desk)\" stroke-width=\"8\"/> <path d=\"M447 108L461 123L476 108\" stroke=\"url(#tg-desk)\" stroke-width=\"8\"/> <path d=\"M509 75C509 61 520 51 534 51H550C564 51 575 61 575 75V88C575 102 564 112 550 112H544L532 124V111C519 108 509 99 509 86V75Z\" fill=\"white\" stroke=\"url(#tg-desk)\" stroke-width=\"6\"/> <circle cx=\"529\" cy=\"82\" r=\"3.5\" fill=\"#07918C\"/><circle cx=\"542\" cy=\"82\" r=\"3.5\" fill=\"#07918C\"/><circle cx=\"555\" cy=\"82\" r=\"3.5\" fill=\"#07918C\"/></svg>", "assets": "<svg viewBox=\"700 72 142 154\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M762 79L816 108V172L762 203L708 172V108L762 79Z\" fill=\"#E3F7F7\" stroke=\"url(#tg-assets)\" stroke-width=\"8\"/> <path d=\"M708 108L762 139L816 108M762 139V203\" stroke=\"url(#tg-assets)\" stroke-width=\"7\"/> <path d=\"M736 94L790 125\" stroke=\"#9ADFDF\" stroke-width=\"6\"/> <circle cx=\"805\" cy=\"188\" r=\"31\" fill=\"white\" stroke=\"#0E7C82\" stroke-width=\"7\"/> <path d=\"M790 188L801 199L821 177\" stroke=\"#0E7C82\" stroke-width=\"7\"/> <path d=\"M731 155H749\" stroke=\"#3CC6C8\" stroke-width=\"6\"/></svg>", "people": "<svg viewBox=\"946 56 158 154\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M984 194C984 172 1002 156 1024 156C1046 156 1064 172 1064 194V202H984V194Z\" fill=\"#F3ECFF\" stroke=\"url(#tg-people)\" stroke-width=\"7\"/> <circle cx=\"1024\" cy=\"120\" r=\"24\" fill=\"#F3ECFF\" stroke=\"url(#tg-people)\" stroke-width=\"7\"/> <path d=\"M954 193C954 177 965 166 980 164M1094 193C1094 177 1083 166 1068 164\" stroke=\"#7C47E6\" stroke-width=\"7\"/> <circle cx=\"974\" cy=\"139\" r=\"17\" fill=\"white\" stroke=\"#7C47E6\" stroke-width=\"6\"/> <circle cx=\"1074\" cy=\"139\" r=\"17\" fill=\"white\" stroke=\"#7C47E6\" stroke-width=\"6\"/> <path d=\"M1008 202V194C1008 185 1015 178 1024 178C1033 178 1040 185 1040 194V202\" stroke=\"#4C1FA8\" stroke-width=\"6\"/> <path d=\"M1024 73V64M960 106L953 100M1088 106L1095 100\" stroke=\"#CDB4F6\" stroke-width=\"6\"/></svg>", "sign": "<svg viewBox=\"0 0 160 160\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M44 20H98L130 52V136A10 10 0 01120 146H44A10 10 0 0134 136V30A10 10 0 0144 20Z\" fill=\"#EEF1FF\" stroke=\"url(#tg-sign)\" stroke-width=\"9\"/><path d=\"M98 22V52H128\" stroke=\"url(#tg-sign)\" stroke-width=\"8\"/><path d=\"M52 98c10-20 17-20 21-5s11 6 19-9\" stroke=\"#3A4CE1\" stroke-width=\"7\"/><path d=\"M52 118H92\" stroke=\"#B9C1FA\" stroke-width=\"6\"/><circle cx=\"112\" cy=\"124\" r=\"25\" fill=\"#fff\" stroke=\"#2B2FA0\" stroke-width=\"7\"/><path d=\"M101 124l8 8 14-17\" stroke=\"#2B2FA0\" stroke-width=\"7\"/></svg>"};
  document.body.insertAdjacentHTML("beforeend", "<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\"><defs><linearGradient id=\"tg-erp\" x1=\"63\" y1=\"52\" x2=\"210\" y2=\"196\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#5B6BF0\"/><stop offset=\"1\" stop-color=\"#2B2FA0\"/></linearGradient><linearGradient id=\"tg-desk\" x1=\"356\" y1=\"54\" x2=\"510\" y2=\"192\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#13B6B0\"/><stop offset=\"1\" stop-color=\"#07827D\"/></linearGradient><linearGradient id=\"tg-assets\" x1=\"656\" y1=\"53\" x2=\"806\" y2=\"194\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#3CC6C8\"/><stop offset=\"1\" stop-color=\"#0E7C82\"/></linearGradient><linearGradient id=\"tg-people\" x1=\"950\" y1=\"54\" x2=\"1104\" y2=\"194\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#7C47E6\"/><stop offset=\"1\" stop-color=\"#4C1FA8\"/></linearGradient><linearGradient id=\"tg-sign\" x1=\"30\" y1=\"20\" x2=\"130\" y2=\"146\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#5B6BF0\"/><stop offset=\"1\" stop-color=\"#2B2FA0\"/></linearGradient></defs></svg>");
  const tabs = $("#h2-tabs"), panels = $("#h2-panels"), win = $("#h2-window");
  const rail = $("#h2-rail");
  rail.innerHTML = `<span class="rail-logo">${window.CZ_NAV.mark(30)}</span><div class="rail-nav">${RAIL.map((r, i) => `<button class="rail-b" data-i="${i}" aria-label="${r[2]}" title="${r[2]}" style="--c:${PRODUCTS[i].c}">${r[1]}</button>`).join("")}</div><span class="rail-out">${DI.out}</span>`;
  tabs.innerHTML = PRODUCTS.map((p, i) => `<button class="h2-tab" role="tab" data-k="${p.k}" style="--c:${p.c}" aria-selected="false"><i>${TABICON[p.k]}</i><span>${p.name}</span><b></b></button>`).join("");
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
  { const cm = $("#cta-mark"); if (cm) cm.innerHTML = `<span class="cm-halo"></span><span class="cm-ring"></span><svg class="cm-svg" viewBox="-10 20 480 580" aria-hidden="true"><defs><linearGradient id="cg-a" x1="0" y1="0" x2="1" y2="0.2"><stop offset="0" stop-color="#9AE3E6"/><stop offset="1" stop-color="#3A4CE1"/></linearGradient><linearGradient id="cg-b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2B2FA0"/><stop offset=".45" stop-color="#4A3FE0"/><stop offset="1" stop-color="#8A5CF0"/></linearGradient><linearGradient id="cg-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><g transform="translate(22 26)" fill="#141A6E" opacity=".9"><path d="M190 76C140 86 98 96 74 108 54 119 50 138 50 168V468C50 498 62 520 88 534 122 550 160 556 190 556Z"/><path d="M190 150V96C190 72 212 58 242 62 296 70 350 102 384 120 402 130 392 150 368 150Z"/><path d="M190 480V536C190 560 212 574 242 570 296 562 352 532 408 500 432 486 424 462 398 462 320 442 270 440 190 480Z"/></g><g transform="translate(11 13)" fill="#2B2FA0"><path d="M190 76C140 86 98 96 74 108 54 119 50 138 50 168V468C50 498 62 520 88 534 122 550 160 556 190 556Z"/><path d="M190 150V96C190 72 212 58 242 62 296 70 350 102 384 120 402 130 392 150 368 150Z"/><path d="M190 480V536C190 560 212 574 242 570 296 562 352 532 408 500 432 486 424 462 398 462 320 442 270 440 190 480Z"/></g><g stroke="#fff" stroke-width="7" stroke-linejoin="round"><path d="M190 76C140 86 98 96 74 108 54 119 50 138 50 168V468C50 498 62 520 88 534 122 550 160 556 190 556Z" fill="url(#cg-a)"/><path d="M190 150V96C190 72 212 58 242 62 296 70 350 102 384 120 402 130 392 150 368 150Z" fill="url(#cg-b)"/><path d="M190 480V536C190 560 212 574 242 570 296 562 352 532 408 500 432 486 424 462 398 462 320 442 270 440 190 480Z" fill="url(#cg-b)"/></g><path d="M190 92C140 102 98 112 78 122 62 132 58 148 58 176V300C110 250 170 150 190 92Z" fill="url(#cg-g)"/><text x="66" y="380" textLength="350" lengthAdjust="spacingAndGlyphs" font-family="Sora,Inter,sans-serif" font-weight="800" font-size="190" fill="#fff" stroke="#2B2FA0" stroke-width="3" paint-order="stroke">ONE</text></svg><i class="cm-st s1"></i><i class="cm-st s2"></i><i class="cm-st s3"></i>`; }
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
  const nz = (n, i) => `<div class="nz" data-i="${i}" role="button" tabindex="0" aria-label="${n[1]}: ${n[2]}. Hover or tap to see the fix"><div class="nz-in"><div class="nz-f pain"><span class="ni">${ICX[n[0]] || ICX.inbox}</span><span class="nz-t"><small>${n[1]}</small><b>${n[2]}</b></span><em class="dot"></em><u class="tapfix">See the fix</u></div><div class="nz-f fix"><span class="ni">${ICX.ok}</span><span class="nz-t"><small>${n[4] === "a" ? "Handled by a rule" : "Needs you"}</small><b>${n[3]}</b></span>${n[4] === "y" ? '<button class="no-a" type="button">Approve</button><u class="dn ok apd">Approved</u>' : '<u class="dn">Done</u>'}</div></div></div>`;
  const ntrack = (ids) => `<div class="nine-in">${[...ids, ...ids].map((i) => nz(NINE[i], i)).join("")}</div>`;
  $("#nine-a").innerHTML = ntrack([0, 1, 2, 3, 4]); $("#nine-b").innerHTML = ntrack([5, 6, 7, 8]);
  const nRows = $(".nine-rows"), nCur = $(".nine-cur");
  const reduceN = matchMedia("(prefers-reduced-motion: reduce)").matches, touchN = matchMedia("(hover: none)").matches;
  let tok = 0, nVisible = false, idleT = null;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const nVisibleCards = () => { const rr = nRows.getBoundingClientRect(); return $$(".nz", nRows).filter((c) => { const r = c.getBoundingClientRect(); return r.left > rr.left + rr.width * 0.12 && r.right < rr.right - rr.width * 0.12 && r.top >= rr.top - 2 && r.bottom <= rr.bottom + 2; }); };
  const curTo = (el, fx, fy) => { const rr = nRows.getBoundingClientRect(), r = el.getBoundingClientRect(); nCur.style.transform = `translate(${(r.left - rr.left + r.width * fx).toFixed(0)}px,${(r.top - rr.top + r.height * fy).toFixed(0)}px)`; };
  function tourStop() { tok++; clearTimeout(idleT); nCur.classList.remove("on", "click"); nRows.classList.remove("tour"); $$(".nz.demo", nRows).forEach((c) => c.classList.remove("demo", "appr-d")); }
  async function tourStart() {
    if (reduceN) return; tourStop(); const my = tok; let last = null;
    const live = () => my === tok && nVisible;
    nCur.style.transition = "none"; const first = nVisibleCards()[0]; if (first) curTo(first, 0.5, 0.5); void nCur.offsetWidth; nCur.style.transition = "";
    while (live()) {
      const cs = nVisibleCards().filter((c) => c !== last); if (!cs.length) { await sleep(500); continue; }
      const c = cs[Math.floor(Math.random() * cs.length)]; last = c;
      nRows.classList.add("tour"); nCur.classList.add("on"); curTo(c, 0.62, 0.55);
      await sleep(1100); if (!live()) break;
      c.classList.add("demo");
      await sleep(1700); if (!live()) break;
      const btn = $(".no-a", c);
      if (btn && !c.classList.contains("appr")) {
        curTo(btn, 0.5, 0.5); await sleep(900); if (!live()) break;
        nCur.classList.add("click"); await sleep(260); c.classList.add("appr-d"); nCur.classList.remove("click");
        await sleep(1500); if (!live()) break;
        c.classList.remove("appr-d");
      }
      c.classList.remove("demo"); nRows.classList.remove("tour");
      await sleep(1300);
    }
    if (my === tok) tourStop();
  }
  nRows.addEventListener("mouseenter", () => { if (!touchN) tourStop(); });
  nRows.addEventListener("mouseleave", () => { if (!touchN && nVisible) { clearTimeout(idleT); idleT = setTimeout(tourStart, 2200); } });
  nRows.addEventListener("click", (e) => {
    const b = e.target.closest(".no-a"); if (b) { e.stopPropagation(); b.closest(".nz").classList.add("appr"); return; }
    if (touchN) { const c = e.target.closest(".nz"); if (c) { const on = c.classList.contains("show"); $$(".nz.show", nRows).forEach((x) => x.classList.remove("show")); if (!on) c.classList.add("show"); tourStop(); } }
  });
  nRows.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("nz")) { e.preventDefault(); e.target.classList.toggle("show"); } });
  nRows.addEventListener("focusin", (e) => { if (e.target.classList.contains("nz")) e.target.classList.add("show"); });
  nRows.addEventListener("focusout", (e) => { if (e.target.classList.contains("nz")) e.target.classList.remove("show"); });
  new IntersectionObserver(([e]) => { nVisible = e.isIntersecting; nRows.classList.toggle("is-off", !nVisible); if (nVisible) { clearTimeout(idleT); idleT = setTimeout(tourStart, 900); } else tourStop(); }, { threshold: 0.35 }).observe(nRows);

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
    people: `<div class="pv leave"><div><span>Annual leave</span><em>18 of 30 days</em></div>${bar(60, "#633ADD")}<div><span>Sick leave</span><em>13 of 15 days</em></div>${bar(87, "#633ADD")}</div>`,
    sign: `<div class="pv sign"><svg viewBox="0 0 120 32" fill="none" stroke="#2B2FA0" stroke-width="2" stroke-linecap="round"><path d="M4 22c8-14 12-14 14-2s6 4 12-8c6-12 8 6 14 6s10-12 18-2 12 4 18-6"/></svg><span>Signed 14:02</span><div class="stamp s">STAMP</div></div>`,
  };
  $("#bento").innerHTML = PRODUCTS.map((p, i) => { const c = PC[p.k]; return `<a class="pc ${c.cls || ""} rv" href="${p.href}" style="--c:${p.c};--soft:${p.soft};--deep:${p.deep};--d:${i * 0.06}s">${c.soon ? '<span class="soon">COMING SOON</span>' : ""}<div class="pn"><i></i>${p.name}${p.flag ? `<em>${p.flag}</em>` : ""}</div><p>${c.p}</p>${p.k === "erp" ? `<div class="chips2">${p.modules.map((m) => `<span>${ICX[m[0]]}${m[1]}</span>`).join("")}</div>` : ""}<ul>${c.li.map((l) => `<li>${l}</li>`).join("")}</ul>${PV[p.k] || ""}<span class="go">Explore ${p.name} ${IC.arrow}</span></a>`; }).join("");

  /* ---------- industries ---------- */
  const STRONG = { Trading: "#9ADFDF", Retail: "#C3C9FA", Manufacturing: "#B9CDF5", Services: "#D6B8F9" };
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
  const HWI = ["<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"12\" rx=\"2.5\"/><path d=\"M8 20h8M12 16v4\"/><path d=\"M10.5 8.5l4 2.5-4 2.5z\"/></svg>", "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><ellipse cx=\"9\" cy=\"6\" rx=\"5.5\" ry=\"2.5\"/><path d=\"M3.5 6v6c0 1.4 2.5 2.5 5.5 2.5M3.5 12v5c0 1.4 2.5 2.5 5.5 2.5\"/><path d=\"M13 16h8M18 12l3 4-3 4\"/></svg>", "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 3c3 2 5 5.5 4.5 10h-9C7 8.5 9 5 12 3z\"/><circle cx=\"12\" cy=\"9.5\" r=\"1.6\"/><path d=\"M7.5 13l-2.5 3.5 3-.5M16.5 13l2.5 3.5-3-.5M10.5 17c.3 1.5.8 2.5 1.5 3.5.7-1 1.2-2 1.5-3.5\"/></svg>"];
  const STEPS = [["Walk through it", "A demo shaped around your company, your modules and your own processes, not a generic tour.", "Day 1"], ["We move you in", "We bring across customers, stock and balances, merge the duplicates, and set up VAT, roles and approvals with you.", "Week 1 to [x]"], ["Go live, and after", "Your dedicated contact stays on after launch, so every question goes to one person who knows your setup.", "Then, every day"]];
  const hw = $("#steps"), howSec = $("#how");
  const HCHK = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 12.5l4.5 4.5L19 7.5\"/></svg>", HARR = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg>";
  hw.innerHTML = `<div class="hx-cards">${STEPS.map((x, i) => `<article class="hx-c"><div class="hx-top"><span class="hx-ic">${HWI[i]}</span><span class="hx-n">Step 0${i + 1}</span><span class="hx-ck">${HCHK}</span></div><h3>${x[0]}</h3><p>${x[1]}</p><span class="hx-chip">${x[2]}</span>${i < 2 ? `<span class="hx-link"><i></i><b>${HARR}</b></span>` : ""}</article>`).join("")}</div>`;
  {
    const cards = $$(".hx-c", hw), links = $$(".hx-link", hw);
    const pinMQ = matchMedia("(min-width: 901px) and (min-height: 620px)");
    let pinned = false, lastKey = "";
    const apply = () => { pinned = pinMQ.matches && !matchMedia("(prefers-reduced-motion: reduce)").matches; howSec.classList.toggle("hw-pin", pinned); lastKey = ""; upd(); };
    function upd() {
      const vh = innerHeight; let p;
      if (pinned) {
        const r = howSec.getBoundingClientRect(), total = Math.max(1, r.height - vh);
        p = clamp(-r.top / total, 0, 1);
      } else {
        const r = hw.getBoundingClientRect(); if (r.top > vh + 100 || r.bottom < -100) return;
        p = clamp((vh * 0.8 - r.top) / (r.height * 1.1), 0, 1);
      }
      const t = Math.round(p * 3 * 200) / 200, key = t + "|" + pinned; if (key === lastKey) return; lastKey = key;
      const cur = Math.min(2, Math.floor(t));
      cards.forEach((c, i) => { const done = i < 2 ? t >= i + 1 : t >= 2.97; c.classList.toggle("done", done); c.classList.toggle("act", i === cur && !done); });
      links.forEach((l, i) => l.style.setProperty("--f", clamp(t - i, 0, 1).toFixed(3)));
    }
    pinMQ.addEventListener("change", apply); apply();
    window.ONEERP.onScroll(upd);
  }

  /* ---------- clients ---------- */
  const Q = [["From the initial IT consultation to the seamless implementation, CubeZix demonstrated a deep understanding of our unique IT infrastructure needs. Their expertise in network security, cloud computing and infrastructure management has significantly enhanced our operational efficiency.", "Samarth V", "Assistant Finance Manager, Al Rama International FZCO", "#3F7FE0"], ["CubeZix's responsiveness is impressive; they are always quick to address any issues that arise, minimizing downtime and keeping our operations seamless. Beyond maintenance, they offer valuable advice and proactive solutions.", "Tarek Nachnouchi", "Chief Product Officer, Arabyads", "#0AA7A4"], ["CubeZix's proactive maintenance approach is a standout feature. They regularly monitor our systems, perform routine check-ups, and provide detailed reports on our IT health.", "Aman Nasser", "Director, International Textile Exports Ltd", "#633ADD"]];
  const qcard = (q) => `<figure class="qm-c"><div class="stars" aria-label="5 stars">★★★★★</div><p>${q[0]}</p><figcaption class="who"><span class="av" style="--c:${q[3]}">${q[1].split(" ").map((w) => w[0]).join("").slice(0, 2)}</span><div><b>${q[1]}</b><small>${q[2]}</small></div></figcaption></figure>`;
  const qrow = (arr, rev) => `<div class="qm-track${rev ? " rev" : ""}"><div class="qm-in">${[...arr, ...arr].map(qcard).join("")}</div></div>`;
  $("#quotes").innerHTML = qrow([Q[0], Q[1], Q[2]]) + qrow([Q[1], Q[2], Q[0]], true);
  new IntersectionObserver(([e]) => $("#quotes").classList.toggle("is-off", !e.isIntersecting)).observe($("#quotes"));

  /* ---------- faq ---------- */
  const FAQ = [["How long does it take to go live?", "It depends on your size and modules. Most companies go live in [timeframe]. Your dedicated contact plans every step with you."], ["Can we start with just one product?", "Yes. Start with the ERP, the helpdesk or HR on their own, and add the rest later. They share records when you run them together."], ["Can you move our data from our current system?", "Yes. We migrate your customers, items and balances, and clean up duplicates along the way, so you start with one clean record for everything."], ["Does it handle UAE VAT, WPS and e-invoicing?", "Yes. VAT at 5% is built in, WPS salary files are prepared from the payroll run, and e-invoicing is supported as the UAE rules come into force."], ["Where is our data stored, and is it secure?", "[Hosting location and security details.] Access is controlled with roles, two-factor login and a full audit trail."], ["What does our dedicated contact do?", "One person at CubeZix who knows your setup, from your first demo through go-live and beyond."]];
  const acEl = $("#faq-list");
  acEl.innerHTML = FAQ.map((f, i) => `<div class="ac-i${i === 0 ? " open" : ""}"><h3><button class="ac-t" type="button" id="acq${i}" aria-expanded="${i === 0}" aria-controls="aca${i}"><span class="ac-n">0${i + 1}</span><span class="ac-q">${f[0]}</span><span class="ac-ch">${DI.chev}</span></button></h3><div class="ac-c" id="aca${i}" role="region" aria-labelledby="acq${i}"><div><p>${f[1]}</p></div></div></div>`).join("");
  acEl.addEventListener("click", (e) => {
    const b = e.target.closest(".ac-t"); if (!b) return;
    const item = b.closest(".ac-i"), was = item.classList.contains("open");
    $$(".ac-i", acEl).forEach((x) => { x.classList.remove("open"); $(".ac-t", x).setAttribute("aria-expanded", "false"); });
    if (!was) { item.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
  });

    window.ONEERP.observeReveal();
  }
  if ("requestIdleCallback" in window) requestIdleCallback(below, { timeout: 700 }); else setTimeout(below, 250);
  window.ONEERP.observeReveal();
})();
