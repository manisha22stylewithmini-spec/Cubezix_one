/* Industry field guides. Reads document.body.dataset.ix and builds the page: cover scene, the business, the journey in chapters, the products that fit, the UAE rules, questions. */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const NAV = window.CZ_NAV || {}, IC = NAV.IC || {}, INDICO = NAV.INDICO || {}, PRODUCTS = NAV.PRODUCTS || [], INDUSTRIES = NAV.INDUSTRIES || [];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const key = document.body.dataset.ix;
  const P = Object.fromEntries(PRODUCTS.map((p) => [p.k, p]));
  const MOD = { finance: 0, hr: 1, payroll: 2, inventory: 3, sales: 4, crm: 5, procurement: 6, operations: 7 };
  const mod = (k) => (P.erp && P.erp.modules ? P.erp.modules[MOD[k]] : ["doc", k, "", "erp.html"]);
  const ico = (k) => IC[k] || "";
  const SV = (vb, inner) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;

  /* ================= cover scenes ================= */
  const cont = (x, y, w, h, c, label) => {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${c}"/>`;
    for (let i = x + 7; i < x + w - 3; i += 7) s += `<path d="M${i},${y + 3}V${y + h - 3}" stroke="#000" stroke-opacity=".16" stroke-width="1.2"/>`;
    if (label) s += `<text x="${x + 8}" y="${y + h / 2 + 4}" font-family="Geist Mono,monospace" font-size="9" fill="#fff" fill-opacity=".85">${label}</text>`;
    return s;
  };
  const ART = {
    trading() {
      const C = ["var(--ix-acc2)", "var(--ix-acc)", "var(--ix-acc3)", "#2B5E8A", "#C04F2C", "#147E83", "#E9EEF0"];
      let yard = "";
      [[18, 342, 5], [18, 310, 4], [18, 278, 2]].forEach(([x0, y, n], r) => { for (let i = 0; i < n; i++) yard += cont(x0 + i * 46, y, 44, 30, C[(i * 2 + r) % 7], i === 1 && r === 0 ? "CZX 041" : ""); });
      let deck = "";
      for (let i = 0; i < 7; i++) deck += cont(258 + i * 44, 404, 42, 26, C[(i + 3) % 7], i === 2 ? "SHP-0412" : "");
      for (let i = 0; i < 6; i++) deck += cont(280 + i * 44, 378, 42, 26, C[(i + 1) % 7]);
      for (let i = 0; i < 3; i++) deck += cont(324 + i * 44, 352, 42, 26, C[(i + 5) % 7]);
      let sky = "";
      [[40, 262, 14, 40], [60, 250, 18, 52], [86, 270, 12, 32], [184, 258, 16, 44], [206, 244, 12, 58], [224, 268, 20, 34]].forEach(([x, y, w, h]) => { sky += `<rect x="${x}" y="${y}" width="${w}" height="${h + 40}" fill="#0F4651"/>`; });
      sky += `<path d="M140,302 L146,196 L150,120 L154,196 L160,302Z" fill="#0F4651"/><path d="M150,120V96" stroke="#0F4651" stroke-width="2"/>`;
      let refl = "";
      for (let i = 0; i < 7; i++) refl += `<path class="ix-wave${i % 2 ? " b" : ""}" d="M${410 + (i % 3) * 14},${478 + i * 11}h${46 - i * 4}" stroke="var(--ix-acc3)" stroke-opacity="${0.55 - i * 0.06}" stroke-width="3" stroke-linecap="round"/>`;
      const crane = `<g stroke="#D6EBEC" stroke-opacity=".8" stroke-width="3" fill="none"><path d="M306,390V128M470,390V128M306,250L470,140M470,250L306,140M306,320L470,250"/></g><path d="M300,128h-34l-8,-12h300v12h-40" fill="#D6EBEC" fill-opacity=".9"/><rect x="250" y="104" width="352" height="14" rx="3" fill="#E9F4F4"/><rect x="290" y="88" width="30" height="16" rx="3" fill="var(--ix-acc3)"/>
        <g class="ix-trol"><rect x="520" y="118" width="40" height="12" rx="2" fill="var(--ix-acc3)"/><g class="ix-cable"><path d="M540,130V196" stroke="#E9F4F4" stroke-width="2"/></g><g class="ix-bob">${cont(498, 198, 84, 30, "var(--ix-acc2)", "MSKU 77")}</g></g>`;
      const farCrane = `<g stroke="#2B6670" stroke-width="2.5" fill="none"><path d="M560,300V200M590,300V200M548,196h52"/></g>`;
      const waves = [0, 1, 2].map((k) => `<g class="ix-wave${k % 2 ? " b" : ""}"><path d="M0,${466 + k * 30} q20,-7 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0" stroke="${k ? "#5FC6CA" : "var(--ix-acc)"}" stroke-opacity="${0.6 - k * 0.18}" stroke-width="2" fill="none"/></g>`).join("");
      return SV("0 0 600 560", `<defs><linearGradient id="txs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A2F3A"/><stop offset=".55" stop-color="#145763"/><stop offset="1" stop-color="#1B6B72"/></linearGradient><radialGradient id="txg"><stop offset="0" stop-color="#F2B33D" stop-opacity=".55"/><stop offset="1" stop-color="#F2B33D" stop-opacity="0"/></radialGradient><linearGradient id="txw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0D3F49"/><stop offset="1" stop-color="#061C23"/></linearGradient></defs>
        <rect width="600" height="560" fill="url(#txs)"/><circle cx="430" cy="210" r="150" fill="url(#txg)"/><circle cx="430" cy="210" r="56" fill="var(--ix-acc3)"/>
        <path id="txr" d="M-20,150 Q260,10 640,96" fill="none" stroke="#E9F4F4" stroke-opacity=".35" stroke-width="1.5" class="ix-dash"/><circle r="4" fill="#fff"><animateMotion dur="14s" repeatCount="indefinite"><mpath href="#txr"/></animateMotion></circle>
        <text x="22" y="56" font-family="Geist Mono,monospace" font-size="10" fill="#E9F4F4" fill-opacity=".6" letter-spacing="1.5">SHANGHAI → JEBEL ALI · 21 DAYS</text>
        ${sky}${farCrane}<rect x="0" y="372" width="300" height="12" fill="#0B2C33"/>${yard}${crane}
        <rect x="0" y="440" width="600" height="120" fill="url(#txw)"/>${refl}
        <g class="ix-bob"><path d="M232,430H600V488H262Z" fill="#082A31"/><path d="M232,430H600" stroke="var(--ix-acc)" stroke-width="2.5"/><path d="M250,452H600" stroke="var(--ix-acc2)" stroke-width="3"/>${deck}<rect x="560" y="340" width="34" height="90" rx="3" fill="#E9F4F4"/><rect x="566" y="350" width="22" height="8" rx="2" fill="var(--ix-acc)"/><rect x="566" y="364" width="22" height="8" rx="2" fill="var(--ix-acc)" fill-opacity=".5"/></g>
        ${waves}`);
    },
    retail() {
      const shop = (x, w, c, name, kind) => {
        const n = 7, sw = w / n;
        let aw = "";
        for (let i = 0; i < n; i++) aw += `<path d="M${x + i * sw},150h${sw}v30a${sw / 2},${sw / 2.4} 0 0 1 -${sw},0Z" fill="${i % 2 ? "#FFE3D0" : c}"/>`;
        let disp = "";
        const wx = x + 14, ww = w - 66;
        if (kind === 0) { [0, 1, 2].forEach((r) => { for (let i = 0; i < 4; i++) disp += `<rect x="${wx + 10 + i * (ww - 20) / 4}" y="${232 + r * 40 - (i % 2) * 4}" width="${(ww - 40) / 4}" height="${18 + (i % 2) * 4}" rx="3" fill="${["var(--ix-acc)", "#fff", "var(--ix-acc3)", "var(--ix-acc2)"][(i + r) % 4]}"/>`; }); }
        if (kind === 1) { [0, 1].forEach((r) => { for (let i = 0; i < 3; i++) { const bx = wx + 14 + i * (ww - 28) / 3, by = 226 + r * 62; disp += `<rect x="${bx}" y="${by + 30}" width="${(ww - 50) / 3}" height="10" rx="2" fill="var(--ix-acc)"/><rect x="${bx}" y="${by + 18}" width="${(ww - 50) / 3}" height="10" rx="2" fill="#fff"/><rect x="${bx}" y="${by + 6}" width="${(ww - 50) / 3}" height="10" rx="2" fill="var(--ix-acc3)"/>`; } }); }
        if (kind === 2) { [[0.2, 34, "var(--ix-acc2)"], [0.48, 52, "var(--ix-acc)"], [0.76, 40, "var(--ix-acc3)"]].forEach(([f, h, cc]) => { const cx = wx + ww * f; disp += `<path d="M${cx - 12},${330 - h}q-6,${h / 2} 0,${h}h24q6,-${h / 2} 0,-${h}z" fill="${cc}"/><rect x="${cx - 20}" y="330" width="40" height="6" rx="2" fill="var(--ix-ink)" fill-opacity=".7"/>`; }); disp += `<path d="M${wx + 10},270h${ww - 20}" stroke="var(--ix-ink)" stroke-opacity=".15" stroke-width="3"/>`; }
        return `<rect x="${x}" y="110" width="${w}" height="330" fill="#fff"/><rect x="${x + 12}" y="120" width="${w - 24}" height="24" rx="5" fill="var(--ix-ink)"/><text x="${x + w / 2}" y="136" text-anchor="middle" font-family="Geist Mono,monospace" font-size="10.5" fill="#fff" letter-spacing="2">${name}</text>${aw}
          <rect x="${wx}" y="206" width="${ww}" height="146" rx="8" fill="var(--ix-soft)"/><rect x="${wx}" y="206" width="${ww}" height="146" rx="8" fill="url(#rtgl)"/>${disp}
          <rect x="${x + w - 46}" y="206" width="34" height="234" rx="4" fill="var(--ix-bg2)"/><circle cx="${x + w - 20}" cy="326" r="2.6" fill="var(--ix-ink)"/><rect x="${wx}" y="362" width="${ww}" height="66" rx="6" fill="var(--ix-bg)"/>`;
      };
      const bag = (x, y, c, cls) => `<g class="ix-float ${cls}"><path d="M${x},${y}h50l-5,58h-40z" fill="${c}"/><path d="M${x + 14},${y}v-9a11,11 0 0 1 22,0v9" stroke="var(--ix-ink)" stroke-width="2.5" fill="none"/></g>`;
      const palm = (x) => `<g><g fill="#3E9E7C">${[-64, -32, 0, 32, 64].map((d) => `<ellipse cx="${x}" cy="364" rx="9" ry="32" transform="rotate(${d} ${x} 396)"/>`).join("")}</g><path d="M${x - 15},398h30l-5,42h-20z" fill="var(--ix-ink)" fill-opacity=".85"/></g>`;
      let tiles = "";
      for (let i = -6; i <= 6; i++) tiles += `<path d="M${300 + i * 22},440L${300 + i * 70},560" stroke="var(--ix-ink)" stroke-opacity=".07"/>`;
      [462, 492, 528].forEach((y) => { tiles += `<path d="M0,${y}H600" stroke="var(--ix-ink)" stroke-opacity=".06"/>`; });
      return SV("0 0 600 560", `<defs><linearGradient id="rtw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE4D2"/><stop offset="1" stop-color="#FFD1B8"/></linearGradient><linearGradient id="rtgl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
        <rect width="600" height="560" fill="url(#rtw)"/><path d="M0,0H600V70H0Z" fill="#fff" fill-opacity=".35"/>${[90, 300, 510].map((x) => `<g><path d="M${x},0v28" stroke="var(--ix-ink)" stroke-opacity=".3"/><path d="M${x - 16},28h32l-6,14h-20z" fill="var(--ix-ink)"/><circle cx="${x}" cy="48" r="7" fill="var(--ix-acc3)" class="ix-blink"/></g>`).join("")}
        <rect x="10" y="100" width="580" height="340" rx="6" fill="#F4C9AE"/>${shop(20, 184, "var(--ix-acc2)", "HOME", 0)}${shop(208, 184, "var(--ix-acc)", "LINEN", 1)}${shop(396, 184, "var(--ix-acc3)", "GIFTS", 2)}
        <g class="ix-blink"><rect x="248" y="62" width="104" height="34" rx="17" fill="#FFF7F1" stroke="var(--ix-acc2)" stroke-width="3"/><text x="300" y="85" text-anchor="middle" font-family="Inter Tight,Inter,sans-serif" font-weight="700" font-size="17" fill="var(--ix-acc2)" letter-spacing="3">OPEN</text></g>
        <rect x="0" y="440" width="600" height="120" fill="#FBE6D8"/>${tiles}<rect x="0" y="436" width="600" height="8" fill="var(--ix-ink)" fill-opacity=".85"/>
        ${palm(34)}${palm(566)}${bag(120, 476, "var(--ix-acc)", "")}${bag(196, 488, "var(--ix-acc2)", "b")}${bag(404, 480, "var(--ix-acc3)", "c")}`);
    },
    manufacturing() {
      const gear = (cx, cy, r, n, cls) => {
        let t = "";
        for (let i = 0; i < n; i++) t += `<rect x="${cx - 5}" y="${cy - r - 8}" width="10" height="12" rx="2" transform="rotate(${(360 / n) * i} ${cx} ${cy})"/>`;
        return `<g class="ix-spin ${cls}" fill="none" stroke="var(--ix-acc)" stroke-width="2">${t}<circle cx="${cx}" cy="${cy}" r="${r}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.35}"/>${[0, 60, 120].map((a) => `<path d="M${cx},${cy - r * 0.35}V${cy - r + 4}" transform="rotate(${a} ${cx} ${cy})"/>`).join("")}</g>`;
      };
      let boxes = "";
      for (let i = 0; i < 8; i++) { const x = -300 + i * 104; boxes += `<g><rect x="${x}" y="404" width="56" height="38" rx="3" fill="#13254F" stroke="var(--ix-acc)" stroke-width="2"/><path d="M${x + 28},404v12" stroke="var(--ix-acc)" stroke-width="2"/><text x="${x + 6}" y="436" font-family="Geist Mono,monospace" font-size="8" fill="var(--ix-acc3)">CT-${900 + i}</text></g>`; }
      let rollers = "";
      for (let i = 0; i < 12; i++) rollers += `<circle cx="${44 + i * 46}" cy="455" r="6" fill="none" stroke="var(--ix-acc)" stroke-width="2"/>`;
      const dim = (d, t, tx, ty) => `<path d="${d}" stroke="var(--ix-acc3)" stroke-width="1.2" fill="none"/><text x="${tx}" y="${ty}" font-family="Geist Mono,monospace" font-size="10" fill="var(--ix-acc3)">${t}</text>`;
      const trolley = `<g stroke="var(--ix-acc)" stroke-width="2" fill="none"><rect x="250" y="214" width="190" height="26" rx="4"/><path d="M262,214V146h20v68M262,166h20"/><path d="M272,146h-16" stroke-width="3"/><rect x="330" y="186" width="70" height="28" rx="3" stroke-dasharray="5 4"/><circle cx="278" cy="262" r="16"/><circle cx="412" cy="262" r="16"/><circle cx="278" cy="262" r="5"/><circle cx="412" cy="262" r="5"/><path d="M278,240v6M412,240v6"/></g>
        <g fill="var(--ix-acc2)"><circle cx="365" cy="200" r="4"/></g>${dim("M250,292H440M250,286v12M440,286v12", "1,200", 330, 310)}${dim("M466,214V240M460,214h12M460,240h12", "26", 474, 231)}
        <g font-family="Geist Mono,monospace" font-size="9" fill="var(--ix-acc)"><text x="338" y="180">CB-24 · SHORT</text></g><path d="M365,196 L392,170 H470" stroke="var(--ix-acc2)" stroke-width="1.2" fill="none"/><text x="404" y="164" font-family="Geist Mono,monospace" font-size="9" fill="var(--ix-acc2)">PO-0452</text>`;
      return SV("0 0 600 560", `<defs><clipPath id="ixbelt"><rect x="20" y="380" width="560" height="70"/></clipPath><pattern id="ixhz" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="16" fill="var(--ix-acc2)"/></pattern><pattern id="ixgrid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24,0H0V24" fill="none" stroke="#5AA9FF" stroke-opacity=".12"/></pattern><radialGradient id="ixglow"><stop offset="0" stop-color="#5AA9FF" stop-opacity=".25"/><stop offset="1" stop-color="#5AA9FF" stop-opacity="0"/></radialGradient></defs>
        <rect width="600" height="560" fill="#0D1B3A"/><rect width="600" height="560" fill="url(#ixgrid)"/><circle cx="340" cy="230" r="220" fill="url(#ixglow)"/>
        <text x="24" y="40" font-family="Geist Mono,monospace" font-size="10.5" fill="var(--ix-acc)" letter-spacing="1.5">DRG CT-900 · CARGO TROLLEY · REV C</text><path d="M24,50H300" stroke="var(--ix-acc)" stroke-opacity=".4"/>
        ${gear(96, 150, 46, 12, "")}${gear(170, 214, 28, 9, "r")}${gear(70, 250, 20, 8, "")}${dim("M50,84H142M50,78v12M142,78v12", "Ø 92", 82, 74)}
        ${trolley}
        <g clip-path="url(#ixbelt)"><g class="ix-belt">${boxes}</g></g>
        <rect x="20" y="446" width="560" height="18" rx="9" fill="none" stroke="var(--ix-acc)" stroke-width="2"/>${rollers}<rect x="540" y="446" width="40" height="18" fill="url(#ixhz)"/><path d="M44,464v40M556,464v40M30,504h540" stroke="var(--ix-acc)" stroke-width="2" stroke-opacity=".55"/>
        <g><rect x="470" y="330" width="62" height="60" rx="6" fill="#13254F" stroke="var(--ix-acc)" stroke-width="2"/><path d="M478,390h46" stroke="url(#ixhz)" stroke-width="6"/>
          <g class="ix-arm1" style="transform-origin:501px 334px"><rect x="493" y="232" width="16" height="106" rx="8" fill="#13254F" stroke="var(--ix-acc3)" stroke-width="2"/><circle cx="501" cy="334" r="9" fill="var(--ix-acc2)"/>
            <g class="ix-arm2" style="transform-origin:501px 238px"><rect x="400" y="230" width="104" height="16" rx="8" fill="#13254F" stroke="var(--ix-acc3)" stroke-width="2"/><circle cx="501" cy="238" r="8" fill="var(--ix-acc2)"/><path d="M408,246v22M392,246v22M388,246h24" stroke="var(--ix-acc3)" stroke-width="3" stroke-linecap="round"/></g></g></g>
        <g><rect x="380" y="512" width="200" height="34" fill="none" stroke="var(--ix-acc)" stroke-opacity=".6"/><path d="M480,512v34" stroke="var(--ix-acc)" stroke-opacity=".6"/><g font-family="Geist Mono,monospace" font-size="9" fill="var(--ix-acc)"><text x="388" y="533">LINE 2 · STEP 4/6</text><text x="488" y="533">SCALE 1:10</text></g></g>
        <text x="24" y="534" font-family="Geist Mono,monospace" font-size="9.5" fill="var(--ix-acc3)">QC · PASS 11 / 12</text>`);
    },
    services() {
      const card = (x, y, tag, w = 132, extra = "") => `<g ${extra}><rect x="${x}" y="${y}" width="${w}" height="58" rx="11" fill="#fff"/><rect x="${x + 12}" y="${y + 12}" width="38" height="8" rx="4" fill="${tag}"/><path d="M${x + 12},${y + 33}h${w - 36}M${x + 12},${y + 44}h${w - 64}" stroke="var(--ix-ink)" stroke-opacity=".18" stroke-width="4" stroke-linecap="round"/><circle cx="${x + w - 18}" cy="${y + 16}" r="7" fill="${tag}" fill-opacity=".35"/></g>`;
      const col = (x, t, n) => `<rect x="${x}" y="70" width="160" height="290" rx="20" fill="#fff" fill-opacity=".5"/><text x="${x + 16}" y="98" font-family="Geist Mono,monospace" font-size="10" fill="var(--ix-deep)" letter-spacing="1">${t}</text><text x="${x + 144}" y="98" text-anchor="end" font-family="Geist Mono,monospace" font-size="10" fill="var(--ix-deep)" fill-opacity=".5">${n}</text>`;
      const av = (x, c, t) => `<circle cx="${x}" cy="540" r="15" fill="${c}" stroke="#F1E8FF" stroke-width="3"/><text x="${x}" y="544" text-anchor="middle" font-family="Inter,sans-serif" font-weight="600" font-size="10" fill="#fff">${t}</text>`;
      const W = 12, gx = 110, gw = 470;
      let grid = "";
      for (let i = 0; i <= W; i++) grid += `<path d="M${gx + (gw / W) * i},404V506" stroke="var(--ix-deep)" stroke-opacity=".08"/>`;
      const bars = [["Design", 0, 3, "var(--ix-acc)"], ["MEP works", 2, 7, "var(--ix-acc)"], ["Partitions", 6, 9, "var(--ix-acc3)"], ["Finishes", 8, 12, "#D9C8FF"]].map((b, i) => `<text x="20" y="${424 + i * 24}" font-family="Inter,sans-serif" font-size="10.5" fill="var(--ix-deep)">${b[0]}</text><rect x="${gx + (gw / W) * b[1]}" y="${412 + i * 24}" width="${(gw / W) * (b[2] - b[1])}" height="14" rx="7" fill="${b[3]}"/>`).join("");
      return SV("0 0 600 560", `<defs><linearGradient id="svb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EFE5FF"/><stop offset="1" stop-color="#E2D3FF"/></linearGradient></defs><rect width="600" height="560" fill="url(#svb)"/>
        <text x="22" y="46" font-family="Geist Mono,monospace" font-size="10.5" fill="var(--ix-deep)" letter-spacing="1.5">PRJ-0087 · CLINIC FIT-OUT</text>
        ${col(20, "PLAN", "2")}${col(196, "DOING", "1")}${col(372, "DONE", "3")}
        ${card(34, 112, "var(--ix-acc3)")}${card(210, 112, "var(--ix-acc2)")}${card(386, 112, "var(--ix-acc2)")}${card(386, 180, "var(--ix-acc)")}${card(386, 248, "var(--ix-acc3)")}
        ${card(34, 180, "var(--ix-acc)", 132, 'class="ix-move"')}
        <rect x="0" y="386" width="600" height="174" fill="#fff" fill-opacity=".55"/>${grid}${bars}<path d="M${gx + (gw / W) * 7.6},400V510" stroke="var(--ix-acc2)" stroke-width="2"/><rect x="${gx + (gw / W) * 7.6 - 22}" y="390" width="44" height="14" rx="7" fill="var(--ix-acc2)"/><text x="${gx + (gw / W) * 7.6}" y="400" text-anchor="middle" font-family="Geist Mono,monospace" font-size="8.5" fill="#fff">TODAY</text>
        ${av(36, "var(--ix-acc)", "KH")}${av(62, "var(--ix-acc2)", "AR")}${av(88, "var(--ix-acc3)", "JM")}${av(114, "var(--ix-deep)", "RS")}<text x="140" y="544" font-family="Geist Mono,monospace" font-size="10" fill="var(--ix-deep)">5 PEOPLE · 180 H THIS WEEK</text>
        `);
    },
  };
  const CHIPS = {
    trading: [["ship", "SHP-0412 · at sea", "Day 16 of 21", 72, ""], ["coin", "Landed cost", "AED 46,500", null, "+21% on the invoice"], ["check", "Bill of entry", "Cleared", null, "Duty AED 2,126"]],
    retail: [["store", "Sahara Centre", "1.5 days left", 15, "warn"], ["coin", "Today, 5 stores", "AED 127,860", null, "1,682 receipts"], ["truck", "Transfer TR-0388", "140 units", null, "Arrives Fri 10:00"]],
    manufacturing: [["cog", "WO-218 · Line 2", "Step 4 of 6", 66, ""], ["alert", "CB-24 boards", "12 short", null, "PO-0452 · Thu 08:00"], ["coin", "Unit cost", "AED 2,358", null, "Margin 20.1%"]],
    services: [["chart", "PRJ-0087 budget", "94% spent", 94, ""], ["clock", "Timesheets", "180 h", null, "This week · 5 people"], ["check", "Change order", "+AED 14,000", null, "Signed by the client"]],
  };
  const CI = {
    ship: '<path d="M3 15h18l-2.5 5h-13z"/><path d="M6 15V9h9v6M15 11h3l1 4"/>', coin: '<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16.5 9"/>', store: '<path d="M4 10v10h16V10M3 10l2-6h14l2 6zM9 20v-6h6v6"/>', truck: '<path d="M2 6h11v10H2zM13 9h5l3 3.5V16h-8"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>', alert: '<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4M12 17h.01"/>',
    chart: '<path d="M4 20h16"/><path d="M7 16v-5M12 16V7M17 16v-8"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  };
  const chipHTML = (c, i) => `<div class="ix-chip-w c${i + 1}"><div class="ix-chip${c[4] === "warn" ? " warn" : ""}"><span class="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${CI[c[0]]}</svg></span><span class="tx"><small>${c[1]}</small><b>${c[2]}</b>${c[3] != null ? `<i><u style="--w:${c[3]}%"></u></i>` : `<em>${c[4]}</em>`}</span></div></div>`;
  const MARK = {
    trading: '<path d="M3 15h18l-2.5 5h-13z"/><path d="M6 15V9h9v6M15 11h3l1 4"/>',
    retail: '<path d="M6 8h12l-1 12H7z"/><path d="M9 8V6a3 3 0 016 0v2"/>',
    manufacturing: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
    services: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  };

  /* ================= stage cards ================= */
  const bd = (b) => (b ? `<span class="ix-bd ${b[0]}">${b[1]}</span>` : "");
  const head = (c) => `<header><div><small>${c.k}</small><b>${c.t}</b></div>${bd(c.b)}</header>`;
  const rows = (r) => `<div class="ix-rows">${r.map((x) => `<div><span>${x[0]}</span><b>${x[1]}</b></div>`).join("")}</div>`;
  const CARD = {
    doc: (c) => head(c) + rows(c.rows) + (c.tot ? `<div class="ix-tot"><span>${c.tot[0]}</span><b>${c.tot[1]}</b></div>` : ""),
    route: (c) => head(c) + `<div class="ix-route"><svg viewBox="0 0 360 120" preserveAspectRatio="none"><path d="M10,96 C110,-10 250,-10 350,96" fill="none" stroke="#DADDE7" stroke-width="2" stroke-dasharray="4 6"/><path d="M10,96 C110,-10 250,-10 350,96" fill="none" stroke="var(--ix-acc)" stroke-width="3" pathLength="100" stroke-dasharray="${c.p} 100"/><circle cx="10" cy="96" r="5" fill="var(--ix-acc)"/><circle cx="350" cy="96" r="5" fill="#DADDE7"/></svg><span class="p"><b>${c.from[0]}</b>${c.from[1]}</span><span class="p r"><b>${c.to[0]}</b>${c.to[1]}</span></div>` + rows(c.rows),
    bars: (c) => head(c) + `<div class="ix-bars">${c.bars.map((x) => `<div class="${x[3] || ""}"><span>${x[0]}</span><b>${x[2]}</b><i><u style="--w:${x[1]}%"></u></i></div>`).join("")}</div>` + (c.f ? `<p class="ix-ft">${c.f}</p>` : ""),
    tiles: (c) => head(c) + `<div class="ix-tiles" style="--c:${c.c || 3}">${c.tiles.map((x) => `<div class="${x[2] || ""}"><small>${x[0]}</small><b>${x[1]}</b></div>`).join("")}</div>` + (c.f ? `<p class="ix-ft">${c.f}</p>` : ""),
    steps: (c) => head(c) + `<ol class="ix-steps">${c.steps.map((x, i) => `<li class="${x[2] || ""}"><i>${x[2] === "d" ? "✓" : x[2] === "x" ? "!" : ""}</i><span>${x[0]}<small>${x[1]}</small></span>${bd(x[3])}</li>`).join("")}</ol>`,
    stack: (c) => head(c) + `<div class="ix-stk">${c.segs.map((x, i) => `<i style="width:${x[2]}%;background:${["var(--ix-deep)", "var(--ix-acc)", "var(--ix-acc3)", "var(--ix-acc2)"][i]}"></i>`).join("")}</div>` + rows(c.segs.map((x) => [x[0], x[1]])) + `<div class="ix-tot"><span>${c.tot[0]}</span><b>${c.tot[1]}</b></div>` + (c.f ? `<p class="ix-ft">${c.f}</p>` : ""),
    hist: (c) => head(c) + `<div class="ix-hist" style="--n:${c.v.length}">${c.v.map((x) => `<span class="${x[2] ? "pk" : ""}" style="--h:${(x[1] / Math.max(...c.v.map((y) => y[1]))) * 100}%"></span>`).join("")}</div><div class="ix-hl">${c.v.filter((_, i) => i % 3 === 0).map((x) => `<span>${x[0]}</span>`).join("")}</div>` + (c.f ? `<p class="ix-ft">${c.f}</p>` : ""),
  };
  const card = (c) => `<div class="ix-cd">${CARD[c.kind](c)}</div>`;

  /* ================= the four guides ================= */
  const G = {
    trading: {
      issue: "Field guide · Trading in the UAE",
      h1: 'Buy abroad. Clear the port. <em>Sell on.</em>',
      lead: "Run a UAE trading company on one record: every shipment costed from the supplier's invoice to the customer's payment, with duty, VAT and currencies handled.",
      trust: ["Landed cost on every item", "Buy in USD, EUR or CNY, sell in AED", "Customs duty and import VAT built in"],
      who: ["Importers", "Distributors", "Wholesalers", "Re-exporters", "Free zone traders"],
      tick: ["SHP-0412 · Shanghai → Jebel Ali · 1×40ft", "BOE 101-4561 · duty 5% on CIF", "USD 10,456 at 3.6725 = AED 38,400", "SHP-0409 · Antwerp → Khalifa Port · cleared", "INV-2026-0556 · Desert Rose Hotels · paid", "Re-export · zero-rated · exit proof filed", "Landed cost · AED 46,500 · 3 items"],
      biz: { t: 'Margin is made at the port, <em>and lost there too.</em>', p: ["A trading company buys in one currency, ships across an ocean, pays duty and port charges in a second, and sells in a third. The price on the supplier's invoice is never what the goods really cost.", "When freight, duty and handling live in an accountant's spreadsheet instead of on the item, prices are set on a guess. Most traders only learn which lines lost money when the quarter closes, long after the stock has been sold."],
        facts: [["4", "documents behind every container: invoice, packing list, bill of lading and bill of entry"], ["5%", "customs duty on the CIF value of most goods entering the UAE"], ["+21%", "added to the supplier's price on our example container by freight, duty and port"]] },
      jr: { t: 'One container, <em>Shanghai to Deira.</em>', p: "Follow SHP-0412, 10,600 units of packaging, from the purchase order to the customer's payment. Scroll, and watch the record build itself.", nodes: ["Order", "At sea", "Port", "Costed", "Sold"] },
      ch: [
        { time: "Day 1 · Shanghai", t: "The order goes out in dollars", p: "A purchase order to Zhejiang Pack Co. for 10,600 units, USD 10,456. The dirham value sits beside every line, so the commitment is known before any money moves.", old: "Order emailed, rate guessed in a spreadsheet.", now: "Order in USD with the AED value at 3.6725 on every line.", uses: [["m", "procurement"], ["m", "finance"]],
          card: { kind: "doc", k: "Purchase order · PO-2026-0446", t: "Zhejiang Pack Co.", b: ["acc", "USD"], rows: [["Stretch film 500 mm × 1,200", "USD 4,980"], ["Packing tape 48 mm × 9,000", "USD 2,410"], ["Bubble wrap 1.2 m × 400", "USD 3,066"], ["Rate today", "3.6725"]], tot: ["In dirhams", "AED 38,400"] } },
        { time: "Day 16 · On the water", t: "21 days at sea, and nobody chasing", p: "Bill of lading, invoice and packing list are on the shipment. The team is told the day the vessel docks, not when the forwarder remembers to call.", old: "Documents spread across three inboxes.", now: "Every document on the shipment, arrival date tracked.", uses: [["m", "procurement"], ["p", "desk"]],
          card: { kind: "route", k: "SHP-0412 · 1×40ft", t: "Day 16 of 21 at sea", b: ["acc", "On the water"], p: 72, from: ["Shanghai", "Loaded 28 Sep"], to: ["Jebel Ali", "Due 19 Oct"], rows: [["Bill of lading", "COSU··4471"], ["Documents on file", "3 of 3"]] } },
        { time: "Day 21 · Jebel Ali", t: "Cleared, with the duty on record", p: "The bill of entry is filed. Customs duty and 5% import VAT are recorded against the shipment, and the delivery order is signed online.", old: "Duty paid, the receipt kept in a drawer.", now: "Duty and import VAT on the bill of entry. Delivery order signed in ONE Sign.", uses: [["m", "finance"], ["p", "sign"]],
          card: { kind: "doc", k: "Bill of entry · 101-••••-4561", t: "Cleared at Jebel Ali", b: ["ok", "Released"], rows: [["CIF value", "AED 42,520"], ["Customs duty 5%", "AED 2,126"], ["Import VAT 5%", "Reverse charge"], ["D/O and handling", "AED 1,854"]], tot: ["Charged to the shipment", "AED 3,980"] } },
        { time: "Day 22 · The warehouse", t: "Every item carries its real cost", p: "Freight, duty and port charges are spread across the three items by value. Bubble wrap turns out to make 15%, under the 20% floor, before a single roll is priced.", old: "Items priced from the supplier's invoice.", now: "Landed cost per item, and the margin before you set the price.", uses: [["m", "inventory"], ["m", "finance"]],
          card: { kind: "stack", k: "Landed cost · SHP-0412", t: "What the container really cost", b: ["warn", "1 item below floor"], segs: [["Supplier invoice", "38,400", 82.6], ["Freight and insurance", "4,120", 8.9], ["Duty, port and handling", "3,980", 8.6]], tot: ["Landed cost, AED", "46,500"], f: "Stretch film 28.8% · Packing tape 39.5% · Bubble wrap 15.0%" } },
        { time: "Day 41 · Deira", t: "Sold on, and paid", p: "Desert Rose Hotels orders 400 rolls. The credit limit is checked, the invoice carries 5% VAT, and the payment is matched the day it lands.", old: "Credit checked by memory, payment found at month-end.", now: "Limit checked before the goods leave, payment matched the same day.", uses: [["m", "sales"], ["m", "crm"], ["m", "finance"]],
          card: { kind: "doc", k: "Invoice · INV-2026-0556", t: "Desert Rose Hotels", b: ["ok", "Paid"], rows: [["Stretch film × 400", "AED 9,800"], ["Packing tape × 3,000", "AED 5,850"], ["VAT 5%", "AED 782.50"]], tot: ["Paid 18 Nov", "AED 16,432.50"] } },
      ],
      stack: { mods: { procurement: ["core", "Orders in the supplier's currency, documents on the shipment"], inventory: ["core", "Stock valued at landed cost, by warehouse"], sales: ["core", "Quotes, orders and invoices priced from the real cost"], finance: ["core", "Duty, import VAT, currency differences and the books"], crm: ["useful", "Customers, credit limits and follow-ups"], operations: ["useful", "Deliveries to customers, on time"], hr: ["later", "Visas and documents for the team"], payroll: ["later", "WPS salaries for warehouse and sales"] },
        others: [["sign", "useful", "Delivery orders, supplier contracts and customer agreements, signed and stamped online."], ["desk", "useful", "Customer and supplier questions as tickets with an owner, not lost in a chat group."], ["people", "later", "If you only need HR: visas, leave and payroll for a small team."], ["assets", "soon", "Forklifts, scanners and laptops: who has them and when they were serviced."]],
        start: "Most traders start with Inventory and Finance, then add Procurement once the first shipments are costed." },
      rules: [["5%", "Customs duty", "On the CIF value of most goods entering the UAE. <em>Recorded on each bill of entry and added to the landed cost.</em>"], ["5%", "Import VAT", "Accounted for on your return under the reverse charge. <em>Kept against every bill of entry.</em>"], ["0%", "Exports and re-exports", "Zero-rated with proof that the goods left the UAE. <em>Exit documents kept with the invoice.</em>"], ["9%", "Corporate tax", "On taxable profit above AED 375,000. <em>Profit per shipment and per customer is already in the books.</em>"], ["2027", "E-invoicing", "From 1 January 2027 for revenue of AED 50m or more, and 1 July 2027 for everyone else. <em>[ONE ERP sends and receives e-invoices.]</em>"], ["FZ", "Free zones", "Goods move between free zones and the mainland. <em>[Each move kept on record with its VAT and customs treatment. Confirm free-zone setup.]</em>"]],
      faq: [["Can it cost a shipment with several suppliers?", "Yes. Every invoice, freight bill and customs charge is added to the shipment, then spread across the items in it."], ["Does it handle imports in dollars?", "Yes. Each document keeps its own currency, with the dirham value shown beside it. [Confirm rate sources.]"], ["How are freight and duty split across items?", "By value, weight or quantity, chosen per shipment. The item's cost updates as soon as the charge is allocated."], ["Can we start with just stock and sales?", "Yes. Start with the modules you need and add others later; they share the same records."]],
    },
    retail: {
      issue: "Field guide · Retail in the UAE",
      h1: 'Several stores. <em>One stock.</em>',
      lead: "Every branch's stock, sales and takings in one place, so the right shelf is full before the busy weekend.",
      trust: ["One stock across every store", "Till, receipts and returns in one place", "VAT-inclusive prices and daily close"],
      who: ["Single shops", "Chains", "Mall stores", "Showrooms", "Online and in store"],
      tick: ["R-0612 · Dubai Mall · AED 214.50 · card", "TR-0388 · Yas → Sahara Centre · 140 units", "Z-0318 · till 2 · balanced", "Oud candle · 1.8 days left · PO drafted", "Busiest hour · 19:00", "Return R-0598 · refunded to card", "Average basket · AED 76.02"],
      biz: { t: 'The weekend <em>decides the month.</em>', p: ["In UAE retail, evenings and weekends carry the week. A store that runs out of its bestseller on Friday afternoon does not get that sale back on Monday, and the customer remembers the empty shelf.", "With several branches, stock is rarely short in total. It is in the wrong store. Without one shared count, the empty branch reorders while another sits on six days' cover, and the cash ties itself up in the wrong place."],
        facts: [["19:00", "the busiest hour across our example chain's five stores, on a Thursday"], ["5", "stores sharing one stock, so a transfer comes before a reorder"], ["AED 76", "average basket, tracked by store, day and hour"]] },
      jr: { t: 'One Thursday at <em>Palm &amp; Linen.</em>', p: "Five stores, one stock and one busy evening. Scroll through the day as the shops see it.", nodes: ["Open", "Rush", "Short", "Close", "Sunday"] },
      ch: [
        { time: "09:30 · Doors open", t: "Every till starts from the same stock", p: "Five stores open with one shared count. Prices are VAT-inclusive on the shelf and on the receipt, and each store sees its own weekend forecast.", old: "Stock checked by walking the aisles.", now: "Live count per store before the shutters go up.", uses: [["m", "inventory"], ["m", "sales"]],
          card: { kind: "tiles", k: "Stock cover · top 20 lines", t: "Ready for the weekend?", b: ["warn", "1 store short"], c: 3, tiles: [["Dubai Mall", "8.5 days", "on"], ["Yas Mall", "6.0 days"], ["Al Hamra", "7.1 days"], ["Ajman", "5.2 days"], ["Sahara Centre", "1.5 days", "bad"], ["Chain", "5.9 days"]] } },
        { time: "13:00 · Lunch rush", t: "A sale at the till is a sale in the books", p: "Each receipt takes stock out of that branch and posts to finance with its VAT. Returns go back against the original receipt, into the right store.", old: "Tills reconciled to stock once a month.", now: "Every receipt updates that store's stock and the books.", uses: [["m", "sales"], ["m", "finance"]],
          card: { kind: "doc", k: "Receipt · R-0612 · Dubai Mall", t: "Till 2 · 13:04", b: ["ok", "Card"], rows: [["Linen duvet set, queen", "149.00"], ["Oud candle × 2", "50.00"], ["Ceramic mug set", "15.50"], ["VAT 5% included", "10.21"]], tot: ["Total, AED", "214.50"] } },
        { time: "16:00 · Running short", t: "Sahara Centre is down to 1.5 days", p: "The candle and towel lines will be empty by Saturday. Yas Mall has six days of cover, so a transfer is suggested before anyone reorders from the supplier.", old: "Store calls head office, head office calls the supplier.", now: "Transfer from the branch with spare cover, on the van by Friday 10:00.", uses: [["m", "inventory"], ["m", "operations"]],
          card: { kind: "bars", k: "Transfer TR-0388", t: "Yas Mall → Sahara Centre", b: ["acc", "Suggested"], bars: [["Sahara Centre before", 15, "1.5 days", "bad"], ["Sahara Centre after", 48, "4.8 days"], ["Yas Mall after", 46, "4.6 days"]], f: "140 units · arrives Friday 10:00 · no purchase order needed" } },
        { time: "22:00 · Close", t: "Every till counted against its Z-report", p: "Cash by denomination, card totals matched to the terminal, and a reason for every dirham short. The takings are banked with a reference in the morning.", old: "Cash counted into an envelope, totals texted to the owner.", now: "Each till closed against its Z-report, differences explained the same night.", uses: [["m", "finance"], ["p", "people"]],
          card: { kind: "steps", k: "Daily close · Dubai Mall", t: "Thursday · 4 tills", b: ["ok", "Balanced"], steps: [["Tills counted", "Cash AED 9,840", "d"], ["Cards matched", "AED 38,420 to the terminal", "d"], ["Difference explained", "Till 3 · AED 20 short", "d"], ["Z-reports sent", "To head office", "n"], ["Banked", "Friday 09:00", ""]] } },
        { time: "Sunday · The week", t: "Read the week, plan the next", p: "Sales by store and hour, bestsellers about to run out, slow movers to mark down, and Friday's rota built around the 19:00 peak.", old: "A weekly spreadsheet nobody trusts.", now: "The week by store, line and hour, with next week's orders drafted.", uses: [["m", "sales"], ["m", "procurement"], ["p", "people"]],
          card: { kind: "hist", k: "All stores · Thursday", t: "Sales by hour", b: ["acc", "Peak 19:00"], v: [["10", 3.1], ["11", 4.8], ["12", 7.2], ["13", 8.9], ["14", 7.6], ["15", 7.9], ["16", 9.4], ["17", 11.8], ["18", 14.2], ["19", 16.9, 1], ["20", 15.6], ["21", 12.3], ["22", 8.2]], f: "AED 127,860 across five stores · 1,682 receipts" } },
      ],
      stack: { mods: { sales: ["core", "The till, receipts, returns and promotions"], inventory: ["core", "One stock across every store, with transfers"], procurement: ["core", "Reorders drafted from what sold"], finance: ["core", "Takings, card settlements and VAT"], operations: ["useful", "Deliveries between stores and to customers"], crm: ["useful", "Loyal customers and their purchases"], hr: ["later", "Documents and visas for store staff"], payroll: ["useful", "Shift pay, overtime and WPS"] },
        others: [["people", "core", "Shift staff, attendance with auto check-in, and leave planned around the busy season."], ["desk", "useful", "Customer complaints, online orders and returns as tickets with a time to reply."], ["sign", "later", "Mall leases and supplier agreements, signed online."], ["assets", "soon", "Tills, scanners and display units in every branch, with their warranty."]],
        start: "Most retailers start with Sales and Inventory across every store, then add Procurement and ONE People." },
      rules: [["5%", "VAT-inclusive prices", "Shelf prices show VAT included. <em>Every receipt shows the tax, worked out at the till.</em>"], ["10K", "Simplified tax invoices", "Sales under AED 10,000 can use a simplified invoice. <em>The till picks the right one.</em>"], ["Tourists", "VAT refunds", "Tourists can claim VAT back on what they buy. <em>[Refund tagging at the till. Confirm integration with the refund operator.]</em>"], ["WPS", "Shift wages", "Salaries paid through the Wage Protection System. <em>The file is built from the payroll run.</em>"], ["9%", "Corporate tax", "On taxable profit above AED 375,000. <em>Profit by store is already in the books.</em>"], ["2027", "E-invoicing", "From 1 January 2027 for revenue of AED 50m or more, and 1 July 2027 for everyone else. <em>[ONE ERP sends and receives e-invoices.]</em>"]],
      faq: [["Does it work with our point of sale?", "ONE ERP includes a point of sale. [Confirm integrations with existing tills.]"], ["Can one item have different prices by store?", "Yes. [Confirm price lists by branch.]"], ["How do we handle stock transfers?", "A transfer is raised in one store and received in the other, so the count is right in both."], ["Can staff check in at the store they work in?", "Yes, with ONE People's attendance and auto check-in."]],
    },
    manufacturing: {
      issue: "Field guide · Manufacturing in the UAE",
      h1: 'Know what each product <em>really costs.</em>',
      lead: "Bills of materials, work orders and the real cost of every unit, with the missing part flagged while there is still time to order it.",
      trust: ["Bills of materials and work orders", "Shortages flagged days early", "True cost for every unit"],
      who: ["Metal fabrication", "Food production", "Packaging", "Building materials", "Assembly"],
      tick: ["WO-218 · CT-900 ×12 · step 4 of 6", "CB-24 control board · 12 short · PO-0452", "QC · load test · pass 11 / 12", "Steel tube 40×40 · +9% since August", "Unit cost · AED 2,358 · margin 20.1%", "Line 2 · 86% of capacity"],
      biz: { t: 'A missing part costs more <em>than the part.</em>', p: ["A factory's margin hides in hundreds of small numbers: metres of tube, minutes on a weld, a board that arrives a day late. When they live in separate spreadsheets, a product's real cost is a guess made once a year.", "The expensive moments are the quiet ones before a stop: a part nobody checked, a price rise nobody passed on. Seeing them days ahead, instead of on the morning the line stands still, is the whole game."],
        facts: [["AED 1,562", "of parts in one cargo trolley, across ten lines of its bill of materials"], ["+2.7%", "rise in unit cost since the last batch, caught before the price list went out"], ["6", "steps on the line, each with an owner, a time and a quality check"]] },
      jr: { t: 'One batch of <em>12 cargo trolleys.</em>', p: "Follow work order WO-218 from the plan to the price list. Scroll, and watch the cost build up.", nodes: ["Plan", "Parts", "Line", "Test", "Cost"] },
      ch: [
        { time: "Monday · Plan", t: "Demand meets the bill of materials", p: "Twelve trolleys are needed by the 31st. Every part on the bill of materials is checked against stock and open orders, and Line 2's hours against the plan.", old: "Parts checked when the line asks for them.", now: "Every part and every hour checked before the order is released.", uses: [["m", "operations"], ["m", "inventory"], ["m", "sales"]],
          card: { kind: "bars", k: "WO-218 · CT-900 × 12", t: "Parts and capacity check", b: ["warn", "1 part short"], bars: [["Frame parts", 100, "In stock"], ["Motors 24 V", 100, "In stock"], ["Control boards CB-24", 0, "12 short", "bad"], ["Batteries 24 V", 60, "Low", "warn"], ["Line 2 hours", 86, "86%"]] } },
        { time: "Tuesday · Parts", t: "The shortage is found nine days early", p: "Twelve control boards are missing. A purchase request goes out with the date the step needs them, to the supplier who can deliver in time.", old: "Discovered on the morning of assembly.", now: "Ordered against the step's date, delivered a day before it.", uses: [["m", "procurement"], ["m", "inventory"]],
          card: { kind: "doc", k: "Purchase order · PO-0452", t: "Al Sanaa Electronics", b: ["ok", "Confirmed"], rows: [["Control board CB-24 × 12", "AED 2,232"], ["Needed by", "Fri 30 Oct, step 4"], ["Delivery", "Thu 29 Oct, 08:00"], ["Lead time", "2 days"]], tot: ["Line protected by", "1 day"] } },
        { time: "Wed to Fri · The line", t: "Cut, weld and paint, step by step", p: "Each step is started and finished on the floor, with time and scrap recorded. One frame is reworked, and the reason is kept with the job.", old: "Progress checked by walking the floor.", now: "Each step started, finished and timed on the floor.", uses: [["m", "operations"], ["p", "people"], ["p", "assets"]],
          card: { kind: "steps", k: "WO-218 · Line 2", t: "12 cargo trolleys", b: ["acc", "Step 4 of 6"], steps: [["Cut", "74.4 m of tube", "d"], ["Weld", "12 of 12 · 1 reworked", "d"], ["Paint", "Powder coat, cured", "d"], ["Assemble", "Boards arrive Thursday", "n"], ["Test", "Load and brake", ""], ["Pack", "To finished goods", ""]] } },
        { time: "Next Thursday · Test", t: "Nothing ships without a pass", p: "Load and brake tests are recorded on each unit. The one that fails goes back to the line with a reason, and the fix is checked again.", old: "A tick on a clipboard.", now: "A pass or fail on each unit, kept with the work order.", uses: [["m", "operations"], ["p", "sign"]],
          card: { kind: "tiles", k: "Quality check · WO-218", t: "Load and brake test", b: ["ok", "11 of 12 passed"], c: 4, tiles: [["#1", "Pass"], ["#2", "Pass"], ["#3", "Pass"], ["#4", "Pass"], ["#5", "Pass"], ["#6", "Pass"], ["#7", "Brake", "bad"], ["#8", "Pass"], ["#9", "Pass"], ["#10", "Pass"], ["#11", "Pass"], ["#12", "Pass"]], f: "Unit 7 back to the line: brake cable tension. Retest booked." } },
        { time: "Friday · Cost", t: "The real cost, before the price list goes out", p: "Materials, 6.5 hours of labour and overheads come to AED 2,358 a unit, up 2.7% on the last batch because steel rose 9%. The margin is still 20.1%, right on the floor.", old: "Costed once a year from the last invoice.", now: "Costed every batch from actual parts and hours.", uses: [["m", "finance"], ["m", "sales"]],
          card: { kind: "stack", k: "Unit cost · CT-900", t: "What one trolley really costs", b: ["warn", "+2.7% on last batch"], segs: [["Materials", "1,562.00", 66], ["Labour · 6.5 h", "442.00", 19], ["Overheads", "354.00", 15]], tot: ["Unit cost, AED", "2,358.00"], f: "Sells at AED 2,950 · margin AED 592 · 20.1%" } },
      ],
      stack: { mods: { operations: ["core", "Work orders, steps, time and quality checks"], inventory: ["core", "Parts, work in progress and finished goods"], procurement: ["core", "Shortages ordered against the date they are needed"], finance: ["core", "Unit cost from actual parts, hours and overheads"], sales: ["useful", "Orders that drive the production plan"], payroll: ["useful", "Shift pay, overtime and WPS"], hr: ["useful", "Documents and visas for the floor team"], crm: ["later", "Dealers and repeat customers"] },
        others: [["assets", "soon", "Machines, tools and moulds, with their service history and who is responsible."], ["people", "useful", "Shift workers, attendance and overtime, straight into payroll."], ["desk", "useful", "Machine breakdowns and customer warranty claims as tickets with a time to fix."], ["sign", "useful", "Quality certificates and supplier contracts, signed and stamped."]],
        start: "Most manufacturers start with Inventory and Operations for work orders, then add Procurement and Finance to cost every unit." },
      rules: [["ICV", "In-Country Value", "ICV certificates score local spend, Emirati staff and investment for government tenders. <em>[Confirm ONE ERP's ICV reporting.]</em>"], ["0%", "Duty on industrial inputs", "Licensed manufacturers can apply for exemptions on raw materials and machinery. <em>[Confirm setup.]</em>"], ["5%", "VAT on inputs", "Input VAT on materials is reclaimed on the return. <em>Kept on every supplier bill.</em>"], ["WPS", "Shift wages", "Salaries paid through the Wage Protection System. <em>The file is built from the payroll run.</em>"], ["9%", "Corporate tax", "On taxable profit above AED 375,000. <em>Profit per product is already in the books.</em>"], ["2027", "E-invoicing", "From 1 January 2027 for revenue of AED 50m or more, and 1 July 2027 for everyone else. <em>[ONE ERP sends and receives e-invoices.]</em>"]],
      faq: [["Can we cost a product from its parts?", "Yes. The cost is built up from materials, labour and overheads on the work order. [Confirm overhead rules.]"], ["Can a bill of materials have several levels?", "[Confirm multi-level bills of materials.]"], ["Does it connect to purchasing?", "Yes. A shortage can raise a purchase request straight away, with the date it is needed."], ["Can we record quality checks?", "Yes. Each step can carry a pass or fail, with the reason kept on the work order."]],
    },
    services: {
      issue: "Field guide · Services in the UAE",
      h1: 'Hours, budgets and invoices <em>on every project.</em>',
      lead: "Projects, timesheets and billing in one place, so the margin is protected while the work is still running.",
      trust: ["Timesheets on every project", "Budget warnings at 80%", "Bill by hour, milestone or retainer"],
      who: ["Consultancies", "Agencies", "Contractors", "IT firms", "Facilities management"],
      tick: ["PRJ-0087 · Marina Dental · 105% of budget", "Timesheet · Karim Haddad · 45 h", "CO-07 · glass partition · AED 14,000 · signed", "MS-4 · MEP works · invoiced", "Utilisation · 82% this week", "Retainer · Sahara Labs · renews 1 Dec"],
      biz: { t: 'Margin leaks <em>one favour at a time.</em>', p: ["A services firm sells time. The quote comes from an estimate, the hours are logged late if at all, and extra requests arrive as a quick word on site that nobody writes down.", "By the time the project closes, the margin has gone into unbilled changes and optimistic estimates. Seeing it while the work is running is the only time it can still be saved."],
        facts: [["22 h", "of unbilled work on one fit-out, found on the timesheet before month-end"], ["AED 14K", "change order raised for it, instead of being absorbed"], ["30%", "the margin the project was quoted at, and the number it is measured against every week"]] },
      jr: { t: 'One fit-out, <em>from pitch to paid.</em>', p: "Follow PRJ-0087, a clinic fit-out for Marina Dental Group, from the proposal to the payment. Scroll, and watch the budget move.", nodes: ["Pitch", "Kick-off", "On site", "Change", "Billed"] },
      ch: [
        { time: "Week 34 · Proposal", t: "Priced from your rates, not a hunch", p: "Scope, hours by role and past fit-outs give a fixed fee of AED 171,500 at a 30% margin. The client signs the proposal online the same afternoon.", old: "A fee from last year's spreadsheet.", now: "Hours by role, priced from your rates, signed online.", uses: [["m", "crm"], ["m", "sales"], ["p", "sign"]],
          card: { kind: "doc", k: "Proposal · PRJ-0087", t: "Clinic fit-out · Marina Dental", b: ["ok", "Signed"], rows: [["Design and permits · 160 h", "AED 31,200"], ["Site works · 540 h", "AED 86,400"], ["Materials and subcontract", "AED 53,900"], ["Planned margin", "30%"]], tot: ["Fixed fee", "AED 171,500"] } },
        { time: "Week 36 · Kick-off", t: "The right people, actually free", p: "Seven phases, a budget for each and a team booked against real availability. The client gets a start date the team can keep.", old: "Whoever is around gets the job.", now: "People booked against their real calendars before the date is promised.", uses: [["m", "operations"], ["p", "people"]],
          card: { kind: "bars", k: "Team for PRJ-0087", t: "Booked from week 36", b: ["acc", "5 people"], bars: [["Karim Haddad · site lead", 90, "90%"], ["Joel Mensah · MEP", 80, "80%"], ["Ana Ribeiro · design", 60, "60%"], ["Rania Saleh · project lead", 40, "40%"], ["Dev Patel · joinery", 70, "70%"]] } },
        { time: "Week 41 · On site", t: "Hours logged daily, not at month-end", p: "Five people log their time on their phones. Karim's 45-hour week shows up on Friday, not in a payroll dispute three weeks later.", old: "Timesheets filled in from memory at month-end.", now: "Hours logged daily against the project and the task.", uses: [["p", "people"], ["m", "payroll"]],
          card: { kind: "tiles", k: "Week 43 · this project", t: "180 hours logged", b: ["warn", "20 over plan"], c: 5, tiles: [["Mon", "39 h"], ["Tue", "41 h"], ["Wed", "40 h", "on"], ["Thu", "33 h"], ["Fri", "27 h"]], f: "Karim Haddad 45 h · overtime at 25% extra, sent to payroll" } },
        { time: "Week 43 · The change", t: "The favour becomes a change order", p: "A glass partition was added on site. The budget reaches 105%, the timesheet shows 22 hours nobody billed, and change order CO-07 goes to the client for AED 14,000.", old: "Absorbed, and remembered at the post-mortem.", now: "Caught on the timesheet, billed as a signed change order.", uses: [["m", "operations"], ["p", "sign"], ["p", "desk"]],
          card: { kind: "doc", k: "Change order · CO-07", t: "Glass partition, reception", b: ["ok", "Signed by client"], rows: [["Glazing and frame", "AED 9,600"], ["Installation · 22 h", "AED 4,400"], ["Budget before", "105% spent"], ["Budget after", "94% spent"]], tot: ["Added to the fee", "AED 14,000"] } },
        { time: "Week 44 · Billing", t: "Invoiced from what was done", p: "Milestone four and the change order are billed together, AED 44,800 with VAT, approved by the project lead and matched in finance when the client pays.", old: "Invoices drafted from a list in someone's notebook.", now: "Billed from milestones, hours and signed changes.", uses: [["m", "finance"], ["m", "sales"]],
          card: { kind: "doc", k: "Invoice · INV-2026-0611", t: "Marina Dental Group", b: ["acc", "Sent"], rows: [["MS-4 · MEP works complete", "AED 28,667"], ["CO-07 · glass partition", "AED 14,000"], ["VAT 5%", "AED 2,133"]], tot: ["Due 30 Nov", "AED 44,800"] } },
      ],
      stack: { mods: { operations: ["core", "Projects, phases, budgets and change orders"], finance: ["core", "Billing by hour, milestone or retainer, and the books"], crm: ["core", "Leads, proposals and repeat clients"], sales: ["useful", "Quotes and invoices from the same records"], payroll: ["useful", "Overtime from timesheets, WPS salaries"], hr: ["useful", "Contracts, visas and documents for consultants"], procurement: ["later", "Materials and subcontractors per project"], inventory: ["later", "Site stock, if you hold it"] },
        others: [["people", "core", "Timesheets, attendance and leave, so hours on every project are real."], ["sign", "core", "Proposals, change orders and client sign-offs, signed and stamped online."], ["desk", "useful", "Client requests and support with an owner and a time to reply."], ["assets", "soon", "Laptops and site equipment: who has them and where they are."]],
        start: "Most services firms start with Operations for projects, ONE People for timesheets and Finance for billing." },
      rules: [["25%", "Overtime", "Hours beyond the normal working day are paid at least 25% extra. <em>Worked out from the timesheet.</em>"], ["2%", "Emiratisation", "Firms with 50 or more employees raise Emirati staff in skilled roles by 2% a year. <em>[Confirm ONE People reporting.]</em>"], ["WPS", "Salaries", "Paid through the Wage Protection System. <em>The file is built from the payroll run.</em>"], ["5%", "VAT on services", "On every invoice, with your TRN. <em>Services exported to clients abroad may be zero-rated. [Confirm.]</em>"], ["9%", "Corporate tax", "On taxable profit above AED 375,000. <em>Profit per project is already in the books.</em>"], ["2027", "E-invoicing", "From 1 January 2027 for revenue of AED 50m or more, and 1 July 2027 for everyone else. <em>[ONE ERP sends and receives e-invoices.]</em>"]],
      faq: [["Can we bill by milestone as well as by hour?", "Yes. [Confirm billing options.]"], ["Do timesheets feed payroll?", "Yes, when ONE ERP and ONE People are used together, overtime flows into the payroll run."], ["Can clients see progress?", "[Confirm client access options.]"], ["How are change orders handled?", "Extra work is raised as a change order on the project, signed by the client in ONE Sign and added to the next invoice."]],
    },
  };
  const D = G[key];
  if (!D) return;
  const ind = INDUSTRIES.find((x) => x[2].includes(key)) || [];

  /* ================= cover ================= */
  const tile = INDICO[ind[0]] || "";
  $("#ix-cover").innerHTML = `<div class="ix-w ix-cw">
      <div class="ix-copy-c">
        <div class="h2-pill rv"><span class="ix-pt">${tile}</span>Industries · ${ind[0] || ""}</div>
        <h1 class="h2-title rv" style="--d:.05s">${D.h1.replace(/<em>(.*?)<\/em>/, '<span class="grad"><span class="t-in">$1</span></span>')}</h1>
        <p class="h2-lead rv" style="--d:.1s">${D.lead}</p>
        <div class="h2-cta rv" style="--d:.15s"><a class="btn btn-primary btn-lg" href="book-a-demo.html?industry=${ind[0] || ""}">Book a demo</a><a class="btn btn-soft btn-lg" href="#journey">Read the story</a></div>
        <ul class="h2-trust rv" style="--d:.2s">${D.trust.map((t) => `<li>${t}</li>`).join("")}</ul>
      </div>
      <div class="ix-art rv" style="--d:.1s"><div class="ix-scene">${ART[key]()}</div>${CHIPS[key].map(chipHTML).join("")}</div>
    </div>`;

  { const art = $(".ix-art"); if (art && !reduce && matchMedia("(pointer:fine)").matches) {
      art.addEventListener("pointermove", (e) => { const r = art.getBoundingClientRect(); art.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3)); art.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3)); });
      art.addEventListener("pointerleave", () => { art.style.setProperty("--mx", 0); art.style.setProperty("--my", 0); });
  } }

  /* ================= 01 business ================= */
  $("#business").innerHTML = `<div class="ix-w">
      <div class="rv"><span class="ix-k"><i></i>01 · The business</span><h2 class="ix-h2">${D.biz.t}</h2></div>
      <div class="ix-copy rv" style="--d:.08s">${D.biz.p.map((p) => `<p>${p}</p>`).join("")}</div>
    </div>`;

  /* ================= 02 journey ================= */
  const chip = (u) => {
    if (u[0] === "m") { const m = mod(u[1]); return `<a href="${m[3]}" style="--pc:${(P.erp || {}).c || "#3A4CE1"}"><i></i>ERP · ${m[1]}</a>`; }
    const p = P[u[1]] || { name: u[1], href: "#", c: "#999" }; return `<a href="${p.href}" style="--pc:${p.c}"><i></i>${p.name}</a>`;
  };
  const N = D.ch.length, pos = (i) => 8 + (84 / (N - 1)) * i;
  $("#journey").innerHTML = `<div class="ix-w">
      <div class="ix-jr-head rv"><span class="ix-k"><i></i>02 · The journey</span><h2 class="ix-h2">${D.jr.t}</h2><p class="ix-p">${D.jr.p}</p></div>
      <div class="ix-story">
        <div class="ix-stage" id="ix-stage" data-s="0">
          <div class="ix-path"><span class="ix-track" style="left:${pos(0)}%;right:${100 - pos(N - 1)}%"></span><span class="ix-fill" id="ix-fill" style="left:${pos(0)}%"></span>
            ${D.jr.nodes.map((n, i) => `<span class="nd" style="left:${pos(i)}%"><i></i>${n}</span>`).join("")}<span class="ix-mk" id="ix-mk" style="left:${pos(0)}%"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${MARK[key]}</svg></span></div>
          <div class="ix-arts"><span class="ix-big" id="ix-big">01</span>${D.ch.map((c, i) => `<div class="ix-art-c${i ? "" : " on"}">${card(c.card)}</div>`).join("")}</div>
        </div>
        <div class="ix-chs">${D.ch.map((c, i) => `<article class="ix-ch${i ? "" : " on"}" data-i="${i}"><time>${c.time}</time><h3>${c.t}</h3><p>${c.p}</p>
            <div class="ix-vs"><div><b>Before</b><span>${c.old}</span></div><div class="n"><b>With ONE</b><span>${c.now}</span></div></div>
            <div class="ix-uses">${c.uses.map(chip).join("")}</div>
            <div class="ix-inline">${card(c.card)}</div></article>`).join("")}</div>
      </div>
    </div>`;
  const stage = $("#ix-stage"), mk = $("#ix-mk"), nds = $$(".ix-path .nd"), arts = $$(".ix-art-c"), chs = $$(".ix-ch");
  const go = (i) => {
    stage.dataset.s = i; mk.style.left = pos(i) + "%"; $("#ix-fill").style.width = (pos(i) - pos(0)) + "%"; $("#ix-big").textContent = String(i + 1).padStart(2, "0");
    nds.forEach((n, k) => { n.classList.toggle("on", k === i); n.classList.toggle("done", k < i); });
    arts.forEach((a, k) => a.classList.toggle("on", k === i)); chs.forEach((c, k) => c.classList.toggle("on", k === i));
  };
  go(0);
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) go(+e.target.dataset.i); }), { rootMargin: "-45% 0px -45% 0px" });
  chs.forEach((c) => io.observe(c));

  /* ================= 03 products ================= */
  const erp = P.erp || { name: "ONE ERP", c: "#3A4CE1", href: "erp.html" };
  const LV = { core: "Core", useful: "Useful", later: "Later", soon: "Coming soon" };
  const order = Object.keys(D.stack.mods).sort((a, b) => ["core", "useful", "later"].indexOf(D.stack.mods[a][0]) - ["core", "useful", "later"].indexOf(D.stack.mods[b][0]));
  $("#stack").innerHTML = `<div class="ix-w">
      <div class="rv" style="max-width:760px"><span class="ix-k"><i></i>03 · Products that fit</span><h2 class="ix-h2">What a ${ind[0] ? ind[0].toLowerCase() : ""} business <em>runs on.</em></h2><p class="ix-p">Every CubeZixONE product, and how much it matters here. Start with the core, add the rest when you're ready; they all share one set of records.</p></div>
      <div class="ix-stack-g">
        <div class="ix-pc erp rv" style="--pc:${erp.c}"><header><span class="lg"><i>${ico("list")}</i>${erp.name}</span><span class="ix-lv core">Core</span></header>
          <p>${erp.short || ""} Here is how each module earns its place in ${ind[0] ? ind[0].toLowerCase() : "this industry"}.</p>
          <div class="ix-mods">${order.map((k) => { const m = mod(k), s = D.stack.mods[k]; return `<a class="ix-md ${s[0]}" href="${m[3]}"><span class="t">${m[1]}${ico(m[0])}</span><small>${s[1]}</small><em>${LV[s[0]]}</em></a>`; }).join("")}</div>
          <a class="go" href="${erp.href}">See ONE ERP →</a></div>
        ${D.stack.others.map((o, i) => { const p = P[o[0]] || { name: o[0], c: "#888", href: "#" }; return `<a class="ix-pc rv" style="--pc:${p.c};--d:${i * 0.06}s" href="${p.href}"><header><span class="lg"><i>${ico({ desk: "list", people: "users", sign: "doc", assets: "box" }[o[0]])}</i>${p.name}</span><span class="ix-lv ${o[1]}">${LV[o[1]]}</span></header><p>${o[2]}</p><span class="go">Explore ${p.name} →</span></a>`; }).join("")}
        <div class="ix-start rv"><b>Where to start</b><span>${D.stack.start}</span><a href="book-a-demo.html?industry=${ind[0] || ""}">Plan it with us →</a></div>
      </div>
    </div>`;

  /* ================= 04 rules ================= */
  $("#rules").innerHTML = `<div class="ix-w">
      <div class="rv" style="max-width:760px"><span class="ix-k"><i></i>04 · The rules</span><h2 class="ix-h2">The UAE rulebook, <em>already built in.</em></h2><p class="ix-p">The rules that shape a ${ind[0] ? ind[0].toLowerCase() : ""} business here, and what CubeZixONE does about each one.</p></div>
      <div class="ix-rg">${D.rules.map((r, i) => `<div class="ix-rule rv" style="--d:${(i % 3) * 0.06}s"><b>${r[0]}</b><h3>${r[1]}</h3><p>${r[2]}</p></div>`).join("")}</div>
      <p class="ix-note">A guide, not legal or tax advice. Items in brackets are to be confirmed by CubeZix.</p>
    </div>`;

  /* ================= 05 faq + other industries ================= */
  const acEl = $("#faq-list");
  acEl.innerHTML = D.faq.map((f, i) => `<div class="ac-i${i === 0 ? " open" : ""}"><h3><button class="ac-t" type="button" id="acq${i}" aria-expanded="${i === 0}" aria-controls="aca${i}"><span class="ac-n">0${i + 1}</span><span class="ac-q">${f[0]}</span><span class="ac-ch">${IC.chev || ""}</span></button></h3><div class="ac-c" id="aca${i}" role="region" aria-labelledby="acq${i}"><div><p>${f[1]}</p></div></div></div>`).join("");
  acEl.addEventListener("click", (e) => { const b = e.target.closest(".ac-t"); if (!b) return; const it = b.closest(".ac-i"), was = it.classList.contains("open"); $$(".ac-i", acEl).forEach((x) => { x.classList.remove("open"); $(".ac-t", x).setAttribute("aria-expanded", "false"); }); if (!was) { it.classList.add("open"); b.setAttribute("aria-expanded", "true"); } });
  $("#ix-more").innerHTML = INDUSTRIES.filter((x) => x !== ind).map((x) => `<a class="ix-mo" href="${x[2]}" style="--p:${x[5]};--d:${x[6]};--b:${x[4]}"><span class="tile">${INDICO[x[0]] || ""}</span><small>Field guide</small><b>${x[0]}</b><span>${x[1]}</span></a>`).join("");

  const cm = $("#cta-mark"); if (cm && NAV.mark) cm.innerHTML = NAV.mark(100);
  if (window.CZ_shaderBg) window.CZ_shaderBg($(".h2-cta-card"), [0.05, 0.35, 0.85]);
  if (window.ONEERP && ONEERP.observeReveal) ONEERP.observeReveal();
  else { const ro = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), ro.unobserve(e.target))), { threshold: 0.12 }); $$(".rv").forEach((x) => ro.observe(x)); }
  if (reduce) $$(".rv").forEach((x) => x.classList.add("in"));
})();
