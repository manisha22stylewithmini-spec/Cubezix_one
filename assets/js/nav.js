/* CubeZixONE header: announcement bar, Products mega menu, Industries dropdown, mobile sheet, footer.
   Structure follows the manager's walkthrough (Products ▾ · Industries ▾ · Company · Book a demo). */
(function () {
  const I = (d, w = 16) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const IC = {
    chev: I('<path d="M6 9l6 6 6-6"/>', 14), arrow: I('<path d="M5 12h14M13 6l6 6-6 6"/>', 13), check: I('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 15), x: I('<path d="M6 6l12 12M18 6L6 18"/>', 16), menu: I('<path d="M4 7h16M4 12h16M4 17h16"/>', 22),
    bank: I('<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>', 18), users: I('<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.6 3-5.2 6-5.2s5.4 1.6 6 5.2M16 5.4a3 3 0 010 5.4M18.5 14.8c1.6.6 2.5 2.2 2.8 4.2"/>', 18),
    wallet: I('<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18M16 14.5h2"/>', 18), box: I('<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>', 18),
    doc: I('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>', 18), target: I('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>', 18), cart: I('<path d="M3 4h2.5l2 11h10l2-8H6.5"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>', 18),
    truck: I('<path d="M2 6h11v10H2zM13 9h5l3 3.5V16h-8"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>', 18), cog: I('<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>', 18),
    list: I('<path d="M8 6h12M8 12h12M8 18h12M4 6h.1M4 12h.1M4 18h.1"/>', 18),
  };

  // one accent per product: tones come from the Cube61 industry palette
  const PRODUCTS = [
    { k: "erp", name: "ONE ERP", flag: "Flagship", href: "erp.html", c: "#3A4CE1", deep: "#2F36B8", soft: "#E9E8FF", short: "Eight modules, one set of records.", eyebrow: "ONE ERP · 8 MODULES", title: "Eight modules. One platform.", link: "ERP overview", type: "modules", note: "All eight modules share one set of data, so nothing is typed twice.",
      modules: [["bank", "Finance", "Cash, invoices and VAT, matched to the bank.", "erp-finance.html"], ["users", "HR", "Visas, permits [and contracts], flagged before they expire.", "erp-hr.html"], ["wallet", "Payroll", "Pay day on time, with the WPS file ready.", "erp-payroll.html"], ["box", "Inventory", "Stock in every location, and what to reorder.", "erp-inventory.html"], ["doc", "Sales", "One record from the first quote to the payment.", "erp-sales.html"], ["target", "CRM", "Every lead followed up before it goes cold.", "erp-crm.html"], ["cart", "Procurement", "Purchases checked against the budget before anyone signs.", "erp-procurement.html"], ["truck", "Operations", "Every delivery tracked, and the late one flagged.", "erp-operations.html"]] },
    { k: "desk", name: "ONE Desk", href: "desk.html", c: "#0AA7A4", deep: "#024745", soft: "#D8F4F4", short: "Every request gets an owner and a deadline.", eyebrow: "ONE DESK · HELPDESK SOFTWARE", title: "Every request gets an owner and a deadline.", link: "Explore ONE Desk", type: "features", note: "[ONE Desk runs on its own, or with ONE ERP.]",
      feats: [["Four ways to ask", "Email, portal, chat or the device agent."], ["The right team and person", "Rules send it to a team, then to one engineer."], ["A time to reply and fix", "SLAs set the time. Late tickets go to the team lead."], ["Chat in the ticket", "Every message and file stays with the ticket."], ["Knowledge base", "Written answers people can find themselves."], ["Customer portal", "Customers follow their own tickets online."]] },
    { k: "assets", name: "ONE Assets", href: "assets.html", c: "#2B2FA0", deep: "#14185E", soft: "#E3E5FF", short: "Every laptop and phone: who has it, and its history.", eyebrow: "ONE ASSETS · COMING SOON", title: "Every laptop and phone: who has it, and its history.", link: "Explore ONE Assets", type: "steps", note: "ONE Assets is coming soon. Book a demo to hear first.",
      steps: [["Record", "Each item, its serial and its warranty."], ["Hand over", "Signed for by the person who receives it."], ["Look after", "Repairs and tickets, kept on its record."], ["Return", "Handed back when someone leaves."]] },
    { k: "people", name: "ONE People", href: "people.html", c: "#633ADD", deep: "#3A1B7A", soft: "#EFE4FF", short: "One file for each employee, from hiring to exit.", eyebrow: "ONE PEOPLE · HR SOFTWARE", title: "One file for each employee, from hiring to exit.", link: "Explore ONE People", type: "features", note: "[ONE People runs on its own, or with ONE ERP.]",
      feats: [["Employee records", "Details, documents and history in one file."], ["Attendance and auto check-in", "The app checks people in when they arrive."], ["Leave", "Asked for in the app, approved by the manager."], ["Payroll and payslips", "One run a month, a payslip for everyone."], ["Expense claims", "With a photo of the receipt."], ["Recruitment and onboarding", "From the first applicant to the first day."]] },
    { k: "sign", name: "ONE Sign", href: "sign.html", c: "#3F7FE0", deep: "#1F2F5C", soft: "#E3EDFD", short: "Sign and stamp documents, without paper.", eyebrow: "ONE SIGN · E-SIGNATURE", title: "Sign and stamp documents, without paper.", link: "Explore ONE Sign", type: "features", note: "[ONE Sign details to be confirmed by CubeZix.]",
      feats: [["Sign anywhere", "In the browser or the app, on any device."], ["Company stamp", "Your stamp, applied once and kept safe."], ["Signing order", "Each person signs in turn, nobody is skipped."], ["Audit trail", "Who signed what, when and from where."], ["Reminders", "A nudge goes out before a document goes stale."], ["Templates", "Contracts and letters ready to send."]] },
  ];
  const INDUSTRIES = [["Trading", "Buy abroad, clear at the port, sell on.", "industries-trading.html", "logistics-trading", "#1FA9AE", "#D8F4F4", "#0B4F54"], ["Retail", "Several stores, one stock.", "industries.html#retail", "retail", "#3A4CE1", "#E9E8FF", "#2F36B8"], ["Manufacturing", "Know what each product really costs.", "industries.html#manufacturing", "mfg", "#3F7FE0", "#E3EDFD", "#1F2F5C"], ["Services", "Hours, budgets and invoices on every project.", "industries.html#services", "svc", "#8C5CE8", "#F0E5FF", "#3A1B7A"]];
  const NEWS = [["NEW", "UAE e-invoicing starts 1 January 2027 for revenue of AED 50m or more. [ONE ERP is ready for it.]", "See Finance", "erp-finance.html"], ["NEW", "Every other UAE business follows on 1 July 2027. [ONE ERP sends and receives e-invoices for you.]", "See Finance", "erp-finance.html"]];

  const mark = (s = 40) => `<svg class="mark" width="${(s * 0.72).toFixed(1)}" height="${s}" viewBox="0 0 460 640" aria-hidden="true"><defs><linearGradient id="lg-a" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#80D1D4"/><stop offset="1" stop-color="#3F7FE0"/></linearGradient><linearGradient id="lg-b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2B4A86"/><stop offset=".25" stop-color="#2B2FA0"/><stop offset=".7" stop-color="#5B45E6"/><stop offset="1" stop-color="#633ADD"/></linearGradient><linearGradient id="lg-c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3A4CE1"/><stop offset="1" stop-color="#633ADD"/></linearGradient></defs><path d="M190 76C140 86 98 96 74 108 54 119 50 138 50 168V468C50 498 62 520 88 534 122 550 160 556 190 556Z" fill="url(#lg-a)"/><path d="M190 150V96C190 72 212 58 242 62 296 70 350 102 384 120 402 130 392 150 368 150Z" fill="url(#lg-b)"/><path d="M190 480V536C190 560 212 574 242 570 296 562 352 532 408 500 432 486 424 462 398 462 320 442 270 440 190 480Z" fill="url(#lg-b)"/><text x="66" y="380" textLength="350" lengthAdjust="spacingAndGlyphs" font-family="Sora,Inter,sans-serif" font-weight="700" font-size="190" fill="url(#lg-c)">ONE</text></svg>`;

  const panel = (p) => {
    let body = "";
    if (p.type === "modules") body = `<div class="mp-grid mods">${p.modules.map((m) => `<a class="mp-cell" href="${m[3]}"><span class="ico" style="--c:${p.c}">${IC[m[0]]}</span><span><b>${m[1]}</b><small>${m[2]}</small></span></a>`).join("")}</div>`;
    if (p.type === "features") body = `<div class="mp-sub">WHAT IT DOES</div><div class="mp-grid feats">${p.feats.map((f) => `<div class="mp-cell"><span class="ck" style="color:${p.c}">${IC.check}</span><span><b>${f[0]}</b><small>${f[1]}</small></span></div>`).join("")}</div>`;
    if (p.type === "steps") body = `<div class="mp-sub">HOW IT WORKS</div><ol class="mp-steps" style="--c:${p.c}">${p.steps.map((s, i) => `<li><i>0${i + 1}</i><b>[${s[0]}]</b><small>${s[1]}</small></li>`).join("")}</ol>`;
    return `<div class="mp-top"><span class="mp-eyebrow" style="color:${p.deep}">${p.eyebrow}</span><a class="mp-more" href="${p.href}" style="color:${p.deep}">${p.type === "modules" ? p.link : p.link} ${IC.arrow}</a></div><h3 class="mp-title">${p.title}</h3>${body}<div class="mp-foot"><span>${p.note}</span><a href="book-a-demo.html">Book a demo ${IC.arrow}</a></div>`;
  };

  function announceHTML() {
    return `<div class="announce" id="announce" role="region" aria-label="Announcement"><div class="a-in"><span class="a-pill">${NEWS[0][0]}</span><span class="a-msg" id="a-msg" aria-live="polite"><span class="a-t">${NEWS[0][1]}</span> <a href="${NEWS[0][3]}">${NEWS[0][2]} ${IC.arrow}</a></span></div><button class="a-x" aria-label="Dismiss announcement">${IC.x}</button></div>`;
  }

  function headerHTML(page) {
    const active = (n) => (({ product: "products", "products": "products", industries: "industries", "industries-trading": "industries", company: "company" })[page] === n ? " is-active" : "");
    return `<div class="wrap cz-bar">
      <a class="cz-logo" href="index.html" aria-label="CubeZixONE home">${mark(38)}</a>
      <nav class="cz-nav" aria-label="Main">
        <div class="cz-item"><button class="nav-item${active("products")}" data-menu="products" aria-expanded="false" aria-controls="mega-products">Products ${IC.chev}</button></div>
        <div class="cz-item"><button class="nav-item${active("industries")}" data-menu="industries" aria-expanded="false" aria-controls="mega-industries">Industries ${IC.chev}</button></div>
        <div class="cz-item"><a class="nav-item${active("company")}" href="company.html">Company</a></div>
      </nav>
      <div class="cz-right"><a href="book-a-demo.html" class="btn btn-primary cz-cta">Book a demo</a><button class="nav-toggle" aria-label="Open menu" aria-expanded="false">${IC.menu}</button></div>
    </div>
    <div class="mega mega-products" id="mega-products" role="region" aria-label="Products">
      <div class="mp-left"><div class="mp-cap">PRODUCTS</div>${PRODUCTS.map((p, i) => `<a class="mp-item${i === 0 ? " on" : ""}" data-k="${p.k}" href="${p.href}" style="--c:${p.c}"><i class="dot"></i><span><b>${p.name}${p.flag ? ` <em class="flag">${p.flag}</em>` : ""}</b><small>${p.short}</small></span></a>`).join("")}<a class="mp-all" href="products.html">Products overview ${IC.arrow}</a></div>
      <div class="mp-right" id="mp-right">${panel(PRODUCTS[0])}</div>
    </div>
    <div class="mega mega-industries" id="mega-industries" role="region" aria-label="Industries">
      <div class="mi-list"><div class="mp-cap">INDUSTRIES</div>${INDUSTRIES.map((n) => `<a class="mi-item" href="${n[2]}" style="--p:${n[5]};--d:${n[6]};--b:${n[4]}"><span class="tile">${n[0][0]}</span><span><b>${n[0]}</b><small>${n[1]}</small></span></a>`).join("")}<a class="mp-all" href="industries.html">All industries ${IC.arrow}</a></div>
      <div class="mi-card"><div class="mp-sub">DON'T SEE YOUR INDUSTRY?</div><h4>Tell us what you run.</h4><p>Clinics, schools, logistics, property management: we set ONE ERP up around how your business runs.</p><a class="btn btn-primary" href="industries.html#typer">Tell us ${IC.arrow}</a></div>
    </div>
    <div class="m-sheet" id="m-sheet" aria-hidden="true">
      <details open><summary>Products ${IC.chev}</summary><div class="m-links">${PRODUCTS.map((p) => `<a href="${p.href}" style="--c:${p.c}"><i class="dot"></i><span><b>${p.name}</b><small>${p.short}</small></span></a>`).join("")}<a class="m-more" href="products.html">Products overview ${IC.arrow}</a></div></details>
      <details><summary>ERP modules ${IC.chev}</summary><div class="m-links two">${PRODUCTS[0].modules.map((m) => `<a href="${m[3]}"><b>${m[1]}</b></a>`).join("")}</div></details>
      <details><summary>Industries ${IC.chev}</summary><div class="m-links">${INDUSTRIES.map((n) => `<a href="${n[2]}"><span><b>${n[0]}</b><small>${n[1]}</small></span></a>`).join("")}<a class="m-more" href="industries.html">All industries ${IC.arrow}</a></div></details>
      <a class="m-plain" href="company.html">Company</a>
      <a class="btn btn-primary m-cta" href="book-a-demo.html">Book a demo</a>
    </div>`;
  }

  function footerHTML() {
    return `<div class="wrap">
      <div class="fcols">
        <div><h6>Products</h6>${PRODUCTS.map((p) => `<a href="${p.href}">${p.name}</a>`).join("")}<a href="products.html">Products overview</a></div>
        <div><h6>ERP modules</h6>${PRODUCTS[0].modules.map((m) => `<a href="${m[3]}">${m[1]}</a>`).join("")}</div>
        <div><h6>Industries</h6><a href="industries.html">All industries</a>${INDUSTRIES.map((n) => `<a href="${n[2]}">${n[0]}</a>`).join("")}</div>
        <div><h6>Company</h6><a href="company.html">About CubeZixONE</a><a href="company.html#contact">Contact</a><a href="book-a-demo.html">Book a demo</a><a href="#">Privacy policy</a><a href="#">Terms of use</a></div>
      </div>
      <div class="wordmark cz-word" aria-label="CubeZixONE">CubeZix<span>ONE</span></div>
      <div class="fbot"><span>© 2026 [CubeZixONE company legal name] · Burlington Tower, Business Bay, Dubai</span><span class="fsis"><a href="https://cubezix.com" rel="noopener">CubeZix</a><a href="https://squarezix.com" rel="noopener">SquareZix</a></span></div></div>`;
  }

  function bind(header, bar) {
    const $ = (s, r = header) => r.querySelector(s);
    const $$ = (s, r = header) => [...r.querySelectorAll(s)];
    const btns = $$("[data-menu]");
    let openId = null, openT = null, closeT = null;
    const scrim = document.createElement("div"); scrim.className = "mega-scrim"; document.body.appendChild(scrim);
    const setPanel = (k) => {
      const p = PRODUCTS.find((x) => x.k === k); if (!p) return;
      $$(".mp-item").forEach((a) => a.classList.toggle("on", a.dataset.k === k));
      const r = $("#mp-right"); if (r.dataset.k === k) return; r.dataset.k = k;
      r.classList.add("swap"); requestAnimationFrame(() => { r.innerHTML = panel(p); requestAnimationFrame(() => r.classList.remove("swap")); });
    };
    const close = () => { clearTimeout(openT); if (!openId) return; btns.forEach((b) => b.setAttribute("aria-expanded", "false")); $$(".mega").forEach((m) => m.classList.remove("on")); header.classList.remove("mega-open"); scrim.classList.remove("on"); openId = null; };
    const open = (id) => { clearTimeout(closeT); if (openId === id) return; if (openId) { btns.forEach((b) => b.setAttribute("aria-expanded", "false")); $$(".mega").forEach((m) => m.classList.remove("on")); } openId = id; $(`[data-menu=${id}]`).setAttribute("aria-expanded", "true"); $(`#mega-${id}`).classList.add("on"); header.classList.add("mega-open"); scrim.classList.add("on"); if (id === "products" && !$("#mp-right").dataset.k) setPanel("erp"); };
    const hoverable = matchMedia("(hover:hover) and (min-width: 981px)");
    btns.forEach((b) => {
      const id = b.dataset.menu;
      b.addEventListener("mouseenter", () => { if (!hoverable.matches) return; clearTimeout(closeT); openT = setTimeout(() => open(id), 70); });
      b.addEventListener("click", (e) => { e.preventDefault(); openId === id ? close() : open(id); });
      b.addEventListener("keydown", (e) => { if (e.key === "ArrowDown") { e.preventDefault(); open(id); const f = $(`#mega-${id} a`); if (f) f.focus(); } });
    });
    header.addEventListener("mouseleave", () => { if (!hoverable.matches) return; clearTimeout(openT); closeT = setTimeout(close, 220); });
    header.addEventListener("mouseenter", () => clearTimeout(closeT));
    $$(".mp-item").forEach((a) => { a.addEventListener("mouseenter", () => setPanel(a.dataset.k)); a.addEventListener("focus", () => setPanel(a.dataset.k)); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { const was = openId; close(); if (was) { const b = $(`[data-menu=${was}]`); if (b) b.focus(); } header.classList.remove("m-open"); } });
    document.addEventListener("click", (e) => { if (openId && !header.contains(e.target)) close(); });
    scrim.addEventListener("click", close);
    addEventListener("scroll", () => { if (openId && scrollY > 4) { /* keep open while hovering; close when scrolling away */ } }, { passive: true });
    // mobile sheet
    const tg = $(".nav-toggle");
    tg.addEventListener("click", () => { const o = header.classList.toggle("m-open"); tg.setAttribute("aria-expanded", o); $("#m-sheet").setAttribute("aria-hidden", !o); document.documentElement.classList.toggle("no-scroll", o); close(); });
    $$("#m-sheet a").forEach((a) => a.addEventListener("click", () => { header.classList.remove("m-open"); document.documentElement.classList.remove("no-scroll"); }));
    // announcement bar: rotate + dismiss
    if (bar) {
      let i = 0; const msg = bar.querySelector("#a-msg");
      const rot = setInterval(() => { i = (i + 1) % NEWS.length; msg.classList.add("out"); setTimeout(() => { msg.innerHTML = `<span class="a-t">${NEWS[i][1]}</span> <a href="${NEWS[i][3]}">${NEWS[i][2]} ${IC.arrow}</a>`; msg.classList.remove("out"); }, 280); }, 7000);
      bar.querySelector(".a-x").addEventListener("click", () => { clearInterval(rot); bar.classList.add("gone"); try { sessionStorage.setItem("cz:bar", "1"); } catch (e) {} setTimeout(() => { bar.remove(); window.dispatchEvent(new Event("scroll")); }, 350); });
    }
  }
  function offset(header) { const bar = document.getElementById("announce"); const h = bar && !bar.classList.contains("gone") ? bar.offsetHeight : 0; header.style.top = 12 + Math.max(0, h - scrollY) + "px"; }
  window.CZ_NAV = { headerHTML, footerHTML, announceHTML, bind, offset, mark, PRODUCTS, INDUSTRIES, IC };
})();
