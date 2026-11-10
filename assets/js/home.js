(function () {
  const { ICONS, av, store, clamp, ease, fmt, rates } = window.ONEERP;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // swap {{icon}} tokens written in the static markup
  $$("section").forEach((s) => { s.innerHTML = s.innerHTML.replace(/\{\{(\w+)\}\}/g, (_, k) => ICONS[k] || ""); });
  $$(".ticket-ico svg,.okc svg,.settings aside svg").forEach(() => {});

  /* ---------------- 1 · HERO ---------------- */
  $("#po-budget").innerHTML = `${ICONS.warn} Over budget by 6%`;
  $("#po-req").innerHTML = `${av("Hana Finance", "lg", 3)} <span>Hana <span class="sep">·</span> Finance</span>`;
  function approve() {
    if ($("#po").classList.contains("approved")) return;
    $("#po").classList.add("approved");
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0"), mm = String(now.getMinutes()).padStart(2, "0"), ss = String(now.getSeconds()).padStart(2, "0");
    $("#po-needs").style.opacity = 0;
    $("#po-foot").innerHTML = `<span class="okc" style="font-size:14px">${ICONS.check} Approved</span><span class="mono" style="margin-left:auto;font-size:13px;color:var(--ink-2)">${hh}:${mm}:${ss}</span>`;
    const after = $("#po-after");
    after.classList.remove("hide");
    const steps = [["Stock reserved", "Inventory", "+0.04s"], ["Supplier notified", "Procurement", "+0.06s"], ["Budget updated", "Finance", "+0.07s"], ["Posted to ledger", "Finance", "+0.09s"]];
    after.innerHTML = steps.map((s) => `<div class="tl">${ICONS.check}<b>${s[0]}</b><small>${s[1]}</small><span class="t">${s[2]}</span></div>`).join("") + `<div class="fine" style="text-align:right;padding-top:8px">Example timings</div>`;
    $$(".tl", after).forEach((t, i) => setTimeout(() => t.classList.add("in"), 250 + i * 260));
    setTimeout(() => $("#po-peek").classList.remove("hide"), 1500);
    window.ONEERP.clear();
  }
  $("#approve").addEventListener("click", approve);
  $("#clear-link").addEventListener("click", (e) => { e.preventDefault(); approve(); });
  addEventListener("keydown", (e) => { if ((e.key === "a" || e.key === "A") && !/input|textarea|select/i.test(e.target.tagName) && scrollY < innerHeight) approve(); });
  if (store.get("cleared", false) === false) { /* fresh visit keeps the card pending */ }

  /* ---------------- 3 · SORT ---------------- */
  const odo = $("#odo");
  let unread = 755;
  const digitCols = [];
  for (let i = 0; i < 3; i++) {
    const col = document.createElement("span"); col.className = "col";
    col.innerHTML = Array.from({ length: 10 }, (_, d) => `<i>${d}</i>`).join("");
    odo.appendChild(col); digitCols.push(col);
  }
  function setOdo(n) { String(n).padStart(3, "0").split("").forEach((d, i) => { digitCols[i].firstChild; digitCols[i].querySelectorAll("i").forEach((el) => (el.style.transform = `translateY(${-d * (odo.clientHeight || 76)}px)`)); }); }
  setOdo(unread);
  setInterval(() => { if (sortOn && unread < 880) { unread += 1 + Math.floor(Math.random() * 14); setOdo(Math.min(unread, 999)); } }, 900);

  const feed = [
    ["Mail", "07:58", "Re: can you confirm the PO number?", "We need it before we can dispatch", "3", "mail", "rules"],
    ["Drive", "now", "Storage 96% full", "Shared drive", "7", "inbox", "fyi"],
    ["Point of sale", "09:41", "Refund needs a manager PIN", "AED 64.00 at Store 1", "18", "cart", "rules"],
    ["Bank portal", "09:12", "Card limit 85% used", "Company card ending 4417", "12", "bank", "rules"],
    ["Spreadsheet", "2m", "Cash flow: September tab updated", "Edited by Youssef", "5", "list", "fyi"],
    ["Calendar", "07:58", "Month-end review moved to 16:00", "Room 2, with Hana and Youssef", "12", "cal", "fyi"],
    ["Tasks", "09:12", "4 tasks due today", "2 assigned to you", "99+", "list", "rules"],
    ["Chat", "1m", "Fatima: visa photos needed by noon", "For the two new starters", "3", "chat", "fyi"],
    ["Drive", "09:38", "3 people edited Tender response", "Aisha, Arjun, Sara", "47", "inbox", "rules"],
    ["Mail", "4m", "Statement of account: September", "3 invoices open, 1 overdue", "312", "mail", "rules"],
    ["Old accounting app", "09:55", "41 bank lines unmatched", "Current account", "12", "bank", "rules"],
    ["Chat", "09:38", "Omar: client wants a revised quote", "About the revised quote", "9", "chat", "rules"],
    ["Point of sale", "2m", "Price change not synced", "Store 3, 6 products", "12", "cart", "rules"],
    ["Spreadsheet", "07:58", "Price list (copy) was shared", "Anyone with the link can view", "99+", "list", "fyi"],
    ["Tasks", "09:55", "7 tasks moved to next week", "By Aisha", "5", "list", "rules"],
    ["Drive", "09:30", "Contract_v3_final.pdf was shared", "Shared by Arjun", "47", "inbox", "rules"],
  ];
  const flyersEl = $("#flyers");
  const flyers = feed.map((f, i) => {
    const el = document.createElement("div");
    el.className = "flyer";
    el.innerHTML = `<span class="fi">${ICONS[f[5]]}</span><span class="ft"><div class="fm">${f[0]} ${f[1]}</div><div class="fn">${f[2]}</div><div class="fs">${f[3]}</div></span><span class="fb">${f[4]}</span>`;
    el.style.zIndex = 5 + (i % 5);
    flyersEl.appendChild(el);
    return { el, cat: f[6], rnd: [Math.sin(i * 12.9) * 0.5 + 0.5, Math.sin(i * 78.2) * 0.5 + 0.5, Math.sin(i * 39.3) * 0.5 + 0.5], idx: i };
  });
  flyersEl.style.cssText = "position:absolute;inset:0;pointer-events:none;z-index:5";
  let lit = 0;
  setInterval(() => { lit = (lit + 3) % flyers.length; }, 1100);

  const sort = $("#sort"), stage = $(".stage", sort), light = $("#light"), darkL = $(".dark-layer", sort);
  let countsRan = false;
  function runCounts() {
    if (countsRan) return; countsRan = true;
    $$(".count").forEach((c) => {
      const to = +c.dataset.to, t0 = performance.now();
      (function tick(t) { const k = clamp((t - t0) / 1100); c.textContent = Math.round(to * ease(k)); if (k < 1) requestAnimationFrame(tick); })(t0);
    });
  }
  // Geometry is measured once (and on resize), never inside the frame loop,
  // so each frame only writes transforms and never forces a layout.
  let geo = null;
  function measure() {
    const prev = light.style.transform;
    light.style.transform = "none";
    const lr = light.getBoundingClientRect();
    const off = (id) => { const r = $(id).getBoundingClientRect(); return { x: r.left - lr.left, y: r.top - lr.top }; };
    geo = { W: stage.clientWidth, H: stage.clientHeight, top: sort.offsetTop, span: Math.max(1, sort.offsetHeight - innerHeight), rules: off("#well-rules"), fyi: off("#well-fyi") };
    light.style.transform = prev;
  }
  const last = flyers.map(() => ({ lit: null, dim: null }));
  let lastTheme = "";
  function layoutSort(time) {
    if (!geo) measure();
    const { W, H } = geo;
    const p = clamp((scrollY - geo.top) / geo.span);
    const lp = ease(clamp((p - 0.26) / 0.3));
    const lightY = (1 - lp) * H;
    light.style.transform = `translate3d(0,${lightY}px,0)`;
    darkL.style.transform = `translate3d(0,${-lp * 6}%,0)`;
    darkL.style.opacity = 1 - lp * 0.5;
    const theme = lightY < 44 ? "light" : "dark";
    if (theme !== lastTheme) { darkL.dataset.theme = theme; lastTheme = theme; }
    const counters = { rules: 0, fyi: 0 };
    const wide = W > 980;
    const intro = p < 0.04 ? ease(clamp(p / 0.04)) : 1;
    const fade = p < 0.3 ? 1 : 1 - ease(clamp((p - 0.62) / 0.12));
    flyers.forEach((f, i) => {
      const [r1, r2, r3] = f.rnd;
      // pose A: loose pile on the right of the dark stage
      // narrow screens: smaller cards, piled under the headline instead of on top of it
      const s0 = wide ? 1 : 0.62;
      const ax = wide ? W * 0.5 + r1 * W * 0.3 - 40 : 10 + r1 * (W - 20 - 250 * s0) - 125 * (1 - s0);
      const ay = (wide ? H * 0.12 + r2 * H * 0.55 : H * 0.6 + r2 * H * 0.28) + (p < 0.3 ? Math.sin(time / 1300 + f.idx) * 6 : 0);
      const rot = (r3 - 0.5) * 16;
      // pose B: little chips inside the "handled" and "FYI" wells, riding on the light panel
      const tgt = geo[f.cat];
      const k = counters[f.cat]++;
      const sc = 0.15;
      const bx = tgt.x + 16 + (k % 4) * 52 - 125;
      const by = lightY + tgt.y + 12 + Math.floor(k / 4) * 14 - 29;
      const q = ease(clamp((p - 0.3 - f.idx * 0.008) / 0.22));
      const x = ax + (bx - ax) * q, y = ay + (by - ay) * q, s = s0 + (sc - s0) * q;
      const isLit = wide && (f.idx === lit || f.idx === (lit + 5) % flyers.length) && q < 0.2;
      const isDim = !isLit && q < 0.1;
      if (last[i].lit !== isLit) { f.el.classList.toggle("lit", isLit); last[i].lit = isLit; }
      if (last[i].dim !== isDim) { f.el.classList.toggle("dim", isDim); last[i].dim = isDim; }
      f.el.style.opacity = fade * intro;
      f.el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rot * (1 - q)}deg) scale(${s})`;
    });
    if (p > 0.66) runCounts();
  }
  // Only animate while the section is on screen.
  let sortOn = false, rafId = 0;
  function raf(t) { layoutSort(t); rafId = sortOn ? requestAnimationFrame(raf) : 0; }
  new IntersectionObserver(([e]) => { sortOn = e.isIntersecting; if (sortOn) geo = null; if (sortOn && !rafId) rafId = requestAnimationFrame(raf); }, { rootMargin: "100px 0px" }).observe(sort);
  addEventListener("resize", () => { geo = null; }, { passive: true });
  layoutSort(0);

  /* ---------------- 4 · WORKFLOWS ---------------- */
  const EMP = [["Hana", "Finance", "4417", "19,200.00"], ["Arjun", "Procurement", "8812", "13,400.00"], ["Omar", "Sales", "0926", "12,800.00"], ["Fatima", "HR", "3351", "11,400.00"], ["Youssef", "Accounts payable", "7208", "11,300.00"], ["Maria", "Payroll", "5164", "10,900.00"], ["Sara", "Customer success", "2843", "9,800.00"], ["Ravi", "Warehouse", "6635", "7,600.00"]];
  const WF = [
    { name: "Payroll", steps: ["Missing bank details", "Add IBAN", "Run payroll", "WPS file sent"] },
    { name: "Sales", steps: ["Quote", "Order", "Delivery", "Invoice", "Paid"] },
    { name: "Inventory", steps: ["Below reorder point", "Draft PO sent for approval"] },
  ];
  const ticketHead = (icon, meta, title, ref, needs) => `<div class="ticket-head"><span class="ticket-ico">${ICONS[icon]}</span><div>${meta ? `<div class="ticket-meta">${meta}</div>` : ""}<div class="ticket-title">${title}${ref ? ` <span class="mono">${ref}</span>` : ""}</div></div>${needs ? `<span class="needs">Needs you <i class="pill1">1</i></span>` : ""}</div>`;
  function payrollPanel(s) {
    const rows = EMP.map((e, i) => {
      const missing = i === 1 && s < 2;
      const bank = missing ? `<span class="warn" style="font-family:var(--font);font-size:12px">${ICONS.warn.replace("<svg", '<svg width="13" height="13"')} Missing bank details</span>${s === 0 ? `<button class="btn btn-dark" style="height:30px;font-size:12.5px;padding:0 12px" data-act="iban">Add IBAN</button>` : ""}` : `${i === 1 ? `<span style="color:var(--ok)">${ICONS.check.replace("<svg", '<svg width="11" height="11" style="display:inline"')}</span> ` : ""}···· ${e[2]}`;
      return `<div class="tr ${missing ? "hl" : ""}"><span class="who">${av(e[0], "", i)}<b>${e[0]}</b><small>${e[1]}</small></span><span class="bank">${bank}</span><span class="num">${e[3]}</span></div>${i === 1 && s === 1 ? `<div class="iban-row on"><label>IBAN</label><div class="f"><input id="iban" readonly value=""><button class="btn btn-dark" style="height:42px" data-act="save">Save</button></div></div>` : ""}`;
    }).join("");
    const head = ticketHead("wallet", "", "Payroll run · October", "", s < 3).replace('<div class="ticket-title">Payroll run · October</div>', '<div class="ticket-title">Payroll run · October</div><div class="fine" style="margin-top:3px">WPS due 25 Oct</div>');
    return `<div class="card">${head}<div class="tbl"><div class="th"><span>Employee</span><span>Bank</span><span style="text-align:right">Net (AED)</span></div>${rows}</div>${s === 2 ? `<div class="card-foot"><button class="btn btn-dark" data-act="run">Run payroll</button><span class="fine">8 employees · AED 96,400.00</span></div>` : ""}<div class="wps-bar ${s === 3 ? "on" : ""}">${ICONS.check.replace("<svg", '<svg width="14" height="14"')} <b>WPS file sent</b> <small>8 employees · AED 96,400.00</small><span class="t">09:41:07</span></div></div>`;
  }
  function salesPanel(s) {
    const titles = ["Quote", "Order", "Delivery", "Invoice", "Paid"], refs = ["QT-2026-0187", "SO-2026-0187", "DL-2026-0187", "INV-2026-0544", "INV-2026-0544"];
    const tabs = `<div class="tabs-s">${titles.map((t, i) => `<span class="${i < s ? "done" : i === s ? "cur" : ""}">${i < s ? ICONS.check : ""}${t}</span>`).join("")}</div>`;
    const warn = s === 0 ? `<div class="warn" style="padding:10px 24px 4px;font-size:12px">${ICONS.warn} Discount 18% · above your 15% limit</div>` : `<div class="okc" style="padding:10px 24px 4px;font-size:12px">${ICONS.check} Discount 18% · approved</div>`;
    const btn = ["Approve", "Confirm order", "Create invoice", "Match payment", ""][s];
    return `<div style="padding-left:2px">${tabs}</div><div class="card">${ticketHead("doc", "", `${titles[s]}`, refs[s], s < 4).replace("</div></div>", `</div><div class="small" style="font-size:12.5px;margin-top:2px">Harbour Line Freight</div></div>`)}${warn}
      <div class="qtbl"><div class="qh"><span>Item</span><span>Amount (AED)</span></div>
      <div class="qr"><span>Shipping carton 60×40<small>2,000 × 6.00</small></span><span class="a">12,000.00</span></div>
      <div class="qr"><span>Pallet wrap film 500 mm<small>300 × 25.00</small></span><span class="a">7,500.00</span></div>
      <div class="qr"><span>Packing tape 48 mm<small>1,500 × 3.00</small></span><span class="a">4,500.00</span></div></div>
      <div class="totals"><div class="l"><div>Prepared by &nbsp; ${av("Omar Sales", "", 2)} <b>Omar · Sales</b></div>${s >= 2 ? `<div>Delivered by &nbsp; ${av("Ravi W", "", 6)} <b>Ravi · Warehouse</b> ${s >= 2 ? '<span class="chip ok" style="margin-left:6px">' + ICONS.check.replace("<svg", '<svg width="10" height="10"') + " Delivered</span>" : ""}</div>` : ""}</div>
      <div class="r"><div><span>Subtotal</span><span>24,000.00</span></div><div><span>VAT 5%</span><span>1,200.00</span></div><div><span>Total</span><span>AED 25,200.00</span></div></div></div>
      <div class="card-foot">${btn ? `<button class="btn btn-dark" data-act="next">${btn}</button>` : `<span class="okc" style="font-size:13px">${ICONS.check} Payment matched</span>`}<span class="small" style="margin-left:auto;font-size:12px">Same record · 0 retyped fields</span></div></div>`;
  }
  function inventoryPanel(s) {
    const w = s === 0 ? 20 : 100;
    return `<div class="card">${ticketHead("box", "", "Shipping carton 40×30", "", true).replace('<div class="ticket-title">', '<div class="fine" style="margin-bottom:3px">PK-4030</div><div class="ticket-title">')}
      <div style="padding:22px 24px 6px"><div style="display:flex;align-items:baseline;gap:10px"><span style="font-size:32px;font-weight:600;letter-spacing:-.03em">${s === 0 ? 120 : 600}</span><span class="small">in stock</span>${s === 0 ? `<span class="warn" style="font-size:12px;margin-left:6px">${ICONS.clock.replace("<svg", '<svg width="13" height="13"')} Below the reorder point of 200</span>` : `<span class="okc" style="font-size:12px;margin-left:6px">${ICONS.check} Above reorder point after delivery</span>`}</div></div>
      <div class="stockbar"><div class="tr1"><div class="fl" style="width:${w}%;${s ? "background:var(--ok)" : ""}"></div><div class="mk"></div></div><div class="lb"><span></span><span>Reorder at 200</span><span>600</span></div></div>
      <div class="row" style="padding:18px 24px 6px;grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Supplier</span><span class="v" style="font-size:13px">Gulf Pack Supplies</span></div>
      <div style="padding:6px 24px 10px;display:flex;align-items:center;gap:10px;font-size:12.5px">${s ? `<span class="okc">${ICONS.doc.replace("<svg", '<svg width="14" height="14"')} Draft purchase order created</span>` : ""}</div>
      ${s ? `<div class="qtbl" style="margin-bottom:14px"><div class="qr"><span>Shipping carton 40×30<small>480 × 2.50</small></span><span class="a">1,200.00</span></div><div class="qr"><span><b>Total</b></span><span class="a">AED 1,200.00</span></div></div><div class="okc" style="padding:4px 24px 20px;font-size:12px">${ICONS.check} Sent to Hana for approval</div>` : `<div class="card-foot"><button class="btn btn-dark" data-act="po">Create purchase order</button><span class="fine">One click</span></div>`}</div>`;
  }
  const panelFns = [payrollPanel, salesPanel, inventoryPanel];
  const wf = $("#wf"), wfCard = $("#wf-card"), items = $$(".wf-item");
  let cur = { w: -1, s: -1 };
  items.forEach((it, i) => {
    const ol = $("ol", it);
    ol.innerHTML = WF[i].steps.map((st) => `<li>${ICONS.check}<span>${st}</span></li>`).join("");
    $("h3", it).addEventListener("click", () => goStep(i, 0));
  });
  function renderWF(w, s) {
    if (cur.w === w && cur.s === s) return;
    const changedW = cur.w !== w;
    cur = { w, s };
    items.forEach((it, i) => {
      it.classList.toggle("on", i === w);
      if (i === w) {
        $(".stepno", it).textContent = `Step ${s + 1} of ${WF[w].steps.length} · ${WF[w].steps[s]}`;
        $$("li", it).forEach((li, k) => { li.classList.toggle("done", k < s); li.classList.toggle("cur", k === s); });
      }
    });
    const act = items[w];
    const list = $("#wf-list");
    requestAnimationFrame(() => { list.style.setProperty("--ay", act.offsetTop + "px"); list.style.setProperty("--ah", $("h3", act).offsetHeight + "px"); });
    wfCard.innerHTML = `<div class="panel on">${panelFns[w](s)}</div>`;
    if (!changedW) wfCard.firstChild.style.animation = "none";
    const ib = $("#iban", wfCard);
    if (ib) { const full = "AE•• •••• •••• •••• •••• 881"; let k = 0; const t = setInterval(() => { ib.value = full.slice(0, ++k); if (k >= full.length) clearInterval(t); }, 40); }
  }
  // Phones can't pin the tall card, so there the steps play on their own instead of following scroll.
  const narrowMQ = matchMedia("(max-width: 980px)");
  let autoT = null, userTook = false;
  function autoStep() {
    const n = WF[cur.w].steps.length;
    if (cur.s < n - 1) renderWF(cur.w, cur.s + 1); else renderWF((cur.w + 1) % WF.length, 0);
  }
  new IntersectionObserver(([e]) => {
    clearInterval(autoT); autoT = null;
    if (e.isIntersecting && narrowMQ.matches && !userTook) autoT = setInterval(autoStep, 2200);
  }, { threshold: 0.35 }).observe(wf);
  function wfProgress() {
    if (narrowMQ.matches) { if (cur.w < 0) renderWF(0, 0); return; }
    const p = window.ONEERP.progress(wf);
    const n = WF.length;
    const w = Math.min(n - 1, Math.floor(p * n));
    const q = p * n - w;
    const s = Math.min(WF[w].steps.length - 1, Math.floor(q * WF[w].steps.length));
    renderWF(w, s);
  }
  function goStep(w, s) {
    if (narrowMQ.matches) { userTook = true; clearInterval(autoT); autoT = null; renderWF(w, s); return; }
    const total = wf.offsetHeight - innerHeight;
    const p = (w + (s + 0.5) / WF[w].steps.length) / WF.length;
    window.ONEERP.scrollTo(wf.offsetTop + total * p - 2);
  }
  wfCard.addEventListener("click", (e) => {
    const a = e.target.closest("[data-act]"); if (!a) return;
    const act = a.dataset.act;
    if (act === "iban") goStep(0, 1);
    else if (act === "save") goStep(0, 2);
    else if (act === "run") goStep(0, 3);
    else if (act === "next") goStep(1, Math.min(4, cur.s + 1));
    else if (act === "po") goStep(2, 1);
  });
  window.ONEERP.onScroll(wfProgress);

  /* ---------------- 5 · MODULES ---------------- */
  const MODS = [
    { n: "Finance", sub: "1 bank line to match", ic: "bank", badge: "amber", act: "Match", done: "Matched", d: () => `${ticketHead("bank", "Finance", "Bank line", "BL-2026-1093", false)}<div class="rows" style="padding-bottom:6px"><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Received</span><span class="v mono" style="font-size:12.5px">AED 8,640.00</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">From</span><span class="v" style="font-size:13px">Harbour Line Freight</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Assigned to</span><span class="v">${av("Hana Finance", "", 3)} <span style="font-size:13px"><b style="font-weight:600">Hana</b> · Finance</span></span></div></div><div class="lines"><div class="ln"><span class="ti">${ICONS.bank}</span><span><small>Bank feed</small>HARBOUR LINE FRT<small class="ref" style="font-family:var(--mono)">Ref 0531 · 14 Oct</small></span><span class="amt">AED 8,640.00</span></div><div class="ln"><span class="ti">${ICONS.doc}</span><span><small>Invoice</small>Harbour Line Freight<small class="ref" style="font-family:var(--mono)">INV-2026-0531 · due 20 Oct</small></span><span class="amt">AED 8,640.00</span></div><div class="note okc">${ICONS.check} Same customer, same amount</div></div>` },
    { n: "HR", sub: "1 visa expiring in 30 days", ic: "users", badge: "dark", act: "Start renewal", done: "Renewal started", d: () => `${ticketHead("users", "HR", "Visa renewal", "VR-2026-0044", false)}<div class="rows"><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Employee</span><span class="v">${av("Fatima HR", "", 5)} <span style="font-size:13px"><b style="font-weight:600">Fatima</b> · HR</span></span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Expires</span><span class="v mono" style="font-size:12.5px">21 Nov 2026</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Documents</span><span class="okc">${ICONS.check} Passport and photo on file</span></div></div>` },
    { n: "Payroll", sub: "All caught up", ic: "wallet", badge: null, d: () => `${ticketHead("wallet", "Payroll", "Payroll run", "October", false)}<div class="rows"><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Status</span><span class="okc">${ICONS.check} WPS file sent</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Employees</span><span class="v mono" style="font-size:12.5px">8</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Net total</span><span class="v mono" style="font-size:12.5px">AED 96,400.00</span></div></div>` },
    { n: "Sales", sub: "All caught up", ic: "doc", badge: null, d: () => `${ticketHead("doc", "Sales", "Invoice", "INV-2026-0544", false)}<div class="rows"><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Customer</span><span class="v" style="font-size:13px">Harbour Line Freight</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Status</span><span class="okc">${ICONS.check} Paid</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Total</span><span class="v mono" style="font-size:12.5px">AED 25,200.00</span></div></div>` },
    { n: "Inventory", sub: "All caught up", ic: "box", badge: null, d: () => `${ticketHead("box", "Inventory", "Stock levels", "", false)}<div class="rows"><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Items</span><span class="v mono" style="font-size:12.5px">1,284</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Below reorder</span><span class="okc">${ICONS.check} None</span></div></div>` },
    { n: "Procurement", sub: "1 PO over budget", ic: "cart", badge: "dark", act: "Approve", done: "Approved", d: () => `${ticketHead("cart", "Procurement", "Purchase order", "PO-2026-0418", false)}<div class="rows"><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Supplier</span><span class="v" style="font-size:13px">Gulf Pack Supplies</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Amount</span><span class="v mono" style="font-size:12.5px">AED 48,250.00</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Budget</span><span class="warn" style="font-size:12.5px">${ICONS.warn} Over budget by 6%</span></div></div>` },
    { n: "CRM", sub: "1 lead waiting 3 days", ic: "target", badge: "dark", act: "Follow up", done: "Follow-up sent", d: () => `${ticketHead("target", "CRM", "Lead", "LD-2026-0312", false)}<div class="rows"><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Company</span><span class="v" style="font-size:13px">Al Noor Trading</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Last contact</span><span class="v" style="font-size:13px">3 days ago · quotation sent</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Owner</span><span class="v">${av("Omar Sales", "", 2)} <span style="font-size:13px"><b style="font-weight:600">Omar</b> · Sales</span></span></div></div>` },
    { n: "Operations", sub: "1 delivery running late", ic: "truck", badge: "dark", act: "Notify customer", done: "Customer notified", d: () => `${ticketHead("truck", "Operations", "Delivery", "DL-2026-0207", false)}<div class="rows"><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Customer</span><span class="v" style="font-size:13px">Marina Dental Group</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Expected</span><span class="warn" style="font-size:12.5px">${ICONS.clock} 2 hours late</span></div><div class="row" style="grid-template-columns:90px 1fr"><span class="k" style="font-size:12px">Driver</span><span class="v" style="font-size:13px">Route 4 · Ravi</span></div></div>` },
  ];
  const mlist = $("#mlist"), mdetail = $("#mdetail");
  let mopen = 0;
  const cleared = new Set();
  function renderMods() {
    mlist.innerHTML = MODS.map((m, i) => {
      const isC = !m.badge || cleared.has(i);
      const right = isC ? `<span class="clr">${ICONS.check} Cleared</span>` : `<span class="pill1 ${m.badge === "amber" ? "" : "dark"}">1</span><span class="chev">${ICONS.chev}</span>`;
      return `<div class="mrow ${i === mopen ? "on" : ""}" data-i="${i}"><span class="mi">${ICONS[m.ic]}</span><span><span class="mn">${m.n}</span> <span class="ms">${isC && m.badge ? "All caught up" : m.sub}</span></span><span class="mr">${right}</span></div>`;
    }).join("");
    const m = MODS[mopen];
    const isC = m.badge && cleared.has(mopen);
    mdetail.innerHTML = `<div class="panel on">${isC ? `<div class="cleared-msg"><b>${m.done}</b>Nothing else needs you in ${m.n}.</div>` : m.d()}${m.act && !isC ? `<button class="btn btn-dark" id="mact">${m.act}</button>` : ""}</div>`;
    const b = $("#mact"); if (b) b.addEventListener("click", () => { cleared.add(mopen); renderMods(); });
  }
  mlist.addEventListener("click", (e) => { const r = e.target.closest(".mrow"); if (!r) return; mopen = +r.dataset.i; renderMods(); });
  renderMods();

  /* ---------------- 6 · INDUSTRY TABS ---------------- */
  const IND = [
    () => `${ticketHead("truck", "Shipments", "Container", "MSKU 204118", true)}<div class="rows"><div class="okc" style="padding:6px 0 10px">${ICONS.check} Cleared customs at Jebel Ali</div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Landed cost</span><span class="v mono" style="font-size:12.5px">AED 61,940.00</span></div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Covers</span><span class="v" style="font-size:13px">Freight, customs duty, clearing</span></div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Prepared by</span><span class="v">${av("Arjun Procurement", "", 1)} <span style="font-size:13px"><b style="font-weight:600">Arjun</b> · Procurement</span></span></div></div><div class="ind-foot"><button class="btn btn-dark">Confirm landed cost</button><span class="fine">14 shipments in transit · 2.4 days average clearance · 9 open supplier invoices &nbsp; Example figures</span></div>`,
    () => `${ticketHead("cart", "Stores", "Stock transfer", "ST-2026-0733", true)}<div class="rows"><div class="warn" style="padding:6px 0 10px;font-size:12.5px">${ICONS.warn} Marina Mall is running short of 3 lines</div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Move from</span><span class="v" style="font-size:13px">Warehouse, Jebel Ali</span></div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Units</span><span class="v mono" style="font-size:12.5px">240 across 3 lines</span></div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Requested by</span><span class="v">${av("Sara Store", "", 6)} <span style="font-size:13px"><b style="font-weight:600">Sara</b> · Store manager</span></span></div></div><div class="ind-foot"><button class="btn btn-dark">Approve transfer</button><span class="fine">6 stores · 1 running short · 4,812 SKUs &nbsp; Example figures</span></div>`,
    () => `${ticketHead("cog", "Production", "Work order", "WO-2026-0419", true)}<div class="rows"><div class="warn" style="padding:6px 0 10px;font-size:12.5px">${ICONS.warn} Blocked by a missing part</div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Product</span><span class="v" style="font-size:13px">Pallet racking frame</span></div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Missing part</span><span class="v" style="font-size:13px">Base plate BP-12 · 0 in stock</span></div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Due</span><span class="v mono" style="font-size:12.5px">25 Oct</span></div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Planned by</span><span class="v">${av("Daniel Production", "", 4)} <span style="font-size:13px"><b style="font-weight:600">Daniel</b> · Production manager</span></span></div></div><div class="ind-foot"><button class="btn btn-dark">Order part</button><span class="fine">23 orders in production · 88% machine utilisation · 3 late orders &nbsp; Example figures</span></div>`,
    () => `${ticketHead("list", "Projects", "Project Atlas fit-out", "", true)}<div class="rows"><div class="warn" style="padding:6px 0 10px;font-size:12.5px">${ICONS.clock} 12% over budget</div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Budget</span><span class="v mono" style="font-size:12.5px">SAR 245,064.67</span></div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Forecast</span><span class="v mono" style="font-size:12.5px">SAR 274,472.43</span></div><div class="row" style="grid-template-columns:100px 1fr"><span class="k" style="font-size:12px">Managed by</span><span class="v">${av("Aisha Project", "", 0)} <span style="font-size:13px"><b style="font-weight:600">Aisha</b> · Project manager</span></span></div></div><div class="ind-foot"><button class="btn btn-dark">Review forecast</button><span class="fine">12 active projects · 1 over budget · 342 billable hours this week &nbsp; Example figures</span></div>`,
  ];
  const indCard = $("#ind-card"), indSeg = $$("#ind-seg button");
  const INDK = ["trading", "retail", "manufacturing", "services"];
  function showInd(i) { indCard.dataset.ind = INDK[i]; indSeg.forEach((b, k) => b.classList.toggle("on", k === i)); indCard.innerHTML = `<div class="panel on">${IND[i]()}</div>`; }
  indSeg.forEach((b, i) => b.addEventListener("click", () => showInd(i)));
  showInd(0);

  /* ---------------- 7 · DUPLICATES ---------------- */
  const D = [["Harbour Line Freight LLC", "+971 4 381 2207", "18,450.00", "96%"], ["Harbourline Freight", "+971 4 381 2270", "12,300.00", "96%"], ["HARBOUR LINE FRT", "04 381 2207", "18,450.00", "94%"], ["Harbor Line Freight", "+971 4 318 2207", "6,150.00", "91%"], ["Harbour Line Freight (old)", "+971 4 381 2206", "12,300.00", "88%"], ["H. Line Freight", "+971 50 381 2207", "6,150.00", "83%"], ["Harbour Line Freight, JA", "+971 4 381 2207", "18,450.00", "95%"]];
  $("#dupe-rows").innerHTML = D.map((r, i) => `<div class="dr ${i === 0 ? "keep" : ""}"><span class="nm">${r[0]}</span><span class="ph">${r[1]}</span><span class="bal">${r[2]}</span><span class="mt">${r[3]}</span></div>`).join("");
  const dupes = $("#dupes");
  window.ONEERP.inView(dupes, () => {
    setTimeout(() => dupes.classList.add("scan"), 700);
    setTimeout(() => { dupes.classList.add("merged"); $(".keep .bal", dupes).textContent = "36,900.00"; }, 2800);
  }, 0.5);

  /* ---------------- 8 · PIN ---------------- */
  $("#kamal").innerHTML = av("Kamal Senapati", "lg", 1);
  $("#kamal2").innerHTML = `${av("Kamal Senapati", "", 1)} <span style="font-size:13px"><b style="font-weight:600">Kamal</b> <span class="sep">·</span> Head of Digital Marketing</span>`;
  const TH = [["DESIGN", "Key visuals", "NK", "N. K."], ["CONTENT", "Captions", "AS", "A. S."], ["ADS", "Meta campaign setup", "RM", "R. M."]];
  $("#things").innerHTML = TH.map((t) => `<div class="thing"><span class="tk">THING · ${t[0]}</span><h5>${t[1]}</h5><div class="tf"><span class="av">${t[2]}</span>${t[3]}<span class="dn">${ICONS.check} Done</span></div></div>`).join("");
  $("#things-done").textContent = "3"; $("#things-n").textContent = "0";
  const tree = $("#pin-tree");
  window.ONEERP.inView(tree, () => {
    tree.classList.add("go");
    $$(".thing", tree).forEach((t, i) => {
      setTimeout(() => t.classList.add("in"), 500 + i * 250);
      setTimeout(() => { t.classList.add("done"); $("#things-n").textContent = i + 1; if (i === 2) setTimeout(() => tree.classList.add("finished"), 500); }, 2200 + i * 700);
    });
  }, 0.4);

  /* ---------------- 9 · CURRENCY ---------------- */
  const ACCT = [["Main operating", "2041", 642380.5], ["Payroll", "7730", 96400], ["Receivables", "5512", 218940]];
  let cur$ = "AED";
  function renderCur() {
    const r = rates[cur$];
    const tot = ACCT.reduce((s, a) => s + a[2], 0);
    $("#acct").innerHTML = `<div class="ar h"><span>Account</span><span>Account no.</span><span>Balance (${cur$})</span></div>` + ACCT.map((a) => `<div class="ar"><b>${a[0]}</b><span>···· ${a[1]}</span><span class="flip">${fmt(a[2] * r)}</span></div>`).join("") + `<div class="ar"><b>Total</b><span></span><span class="flip">${fmt(tot * r)}</span></div>`;
    $("#rep-cur").textContent = cur$;
    const p = 299 * r;
    $("#price-amt").textContent = cur$ === "AED" ? "AED 299" : `≈ ${cur$} ${Math.round(p)}`;
  }
  const curSeg = $$("#cur-seg button");
  curSeg.forEach((b) => b.addEventListener("click", () => { cur$ = b.textContent; curSeg.forEach((x) => x.classList.toggle("on", x === b)); renderCur(); }));
  cur$ = "SAR"; curSeg.forEach((x) => x.classList.toggle("on", x.textContent === "SAR")); renderCur();
  cur$ = "AED"; curSeg.forEach((x) => x.classList.toggle("on", x.textContent === "AED")); renderCur();
  $("#price-amt").textContent = "≈ SAR 305";

  /* ---------------- 10 · FAQ ---------------- */
  const FAQ = [
    ["How long does it take to go live?", "It depends on your size and modules. Most companies go live in [timeframe]. Your dedicated contact plans every step with you."],
    ["Can you move our data from our current system?", "Yes. We migrate your customers, items and balances, and clean up duplicates along the way, so you start with one clean record for everything."],
    ["Does ONEERP handle UAE VAT?", "Yes. VAT at 5% is built in, from invoices to your VAT return."],
    ["Where is our data stored, and is it secure?", "[Hosting location and security details]. Access is controlled with roles, two-factor login and a full audit trail."],
    ["Can we start with a few modules?", "[Confirm module packaging]."],
    ["What does our dedicated contact do?", "One person at CubeZix who knows your setup, from your first demo through go-live and beyond."],
    ["How is pricing calculated?", "Per user, from AED 299. See the Pricing page for monthly and annual plans."],
  ];
  const faq = $("#faq-list");
  faq.innerHTML = FAQ.map((f, i) => `<div class="fq ${i === 1 ? "open" : ""}"><div class="q">${f[0]}</div><div class="a">${i === 1 ? `<div class="who"><span class="logo-o no-badge" style="font-size:20px;border-width:3px"></span>ONEERP team</div>` : ""}${f[1]}</div><span class="chev">${ICONS.chev}</span></div>`).join("");
  faq.addEventListener("click", (e) => {
    const q = e.target.closest(".fq"); if (!q) return;
    const open = q.classList.contains("open");
    $$(".fq", faq).forEach((x) => { x.classList.remove("open"); const who = $(".who", x); if (who) who.remove(); });
    if (!open) { q.classList.add("open"); $(".a", q).insertAdjacentHTML("afterbegin", `<div class="who"><span class="logo-o no-badge" style="font-size:20px;border-width:3px"></span>ONEERP team</div>`); }
  });

  /* ---------------- 11 · FINAL FORM ---------------- */
  const form = $("#demo-form-home");
  const coIn = $("[name=company]", form), booth = $("#booth");
  coIn.addEventListener("input", () => { $("#booth-co").textContent = coIn.value.slice(0, 18); booth.classList.remove("sent"); void booth.offsetWidth; booth.classList.add("sent"); });
  $("#home-book").addEventListener("click", () => {
    const d = {}; $$("input,select", form).forEach((el) => (d[el.name] = el.value));
    store.set("draft", d);
    location.href = "book-a-demo.html";
  });
  window.ONEERP.observeReveal();
})();
