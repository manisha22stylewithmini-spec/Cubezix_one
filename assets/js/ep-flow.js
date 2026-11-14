/* Wave flow for the "how work travels" stage: a curved line through hexagon nodes. Shared by erp.js and pp.js */
(function () {
  const CHECK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  window.EP_chain = function (steps) {
    const N = steps.length, W = 1000, H = 300, LO = 0.64, HI = 0.34;
    const y = (i) => (i % 2 === 0 ? LO : HI) * H, x = (i) => ((i + 0.5) / N) * W;
    // smooth path: horizontal tangents at every node, so it reads as one wave
    let d = `M0 ${(y(0) + (y(0) > H / 2 ? 34 : -34)).toFixed(1)} C ${(x(0) * 0.5).toFixed(1)} ${(y(0) + (y(0) > H / 2 ? 34 : -34)).toFixed(1)} ${(x(0) * 0.5).toFixed(1)} ${y(0).toFixed(1)} ${x(0).toFixed(1)} ${y(0).toFixed(1)}`;
    for (let i = 1; i < N; i++) { const mx = (x(i - 1) + x(i)) / 2; d += ` C ${mx.toFixed(1)} ${y(i - 1).toFixed(1)} ${mx.toFixed(1)} ${y(i).toFixed(1)} ${x(i).toFixed(1)} ${y(i).toFixed(1)}`; }
    const last = y(N - 1), end = last + (last > H / 2 ? -34 : 34), ex = (x(N - 1) + W) / 2;
    d += ` C ${ex.toFixed(1)} ${last.toFixed(1)} ${ex.toFixed(1)} ${end.toFixed(1)} ${W} ${end.toFixed(1)}`;
    const nodes = steps.map((t, i) => `<div class="ep-wn ${i % 2 ? "hi" : "lo"}" style="--x:${(((i + 0.5) / N) * 100).toFixed(2)};--y:${((i % 2 ? HI : LO) * 100).toFixed(1)};--i:${i};--n:${N}"><span class="ep-hexw"><i class="ep-hex">${CHECK}</i></span><div class="ep-wl" data-n="0${i + 1}"><small>Step 0${i + 1}</small><b>${t}</b></div></div>`).join("");
    return `<div class="ep-wave" style="--n:${N}"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="epwg" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#80D1D4"/><stop offset=".55" stop-color="#7B8CFF"/><stop offset="1" stop-color="#A27BFF"/></linearGradient></defs><path class="ep-w-sh" d="${d}" pathLength="1"/><path class="ep-w-ln" d="${d}" pathLength="1"/></svg>${nodes}</div>`;
  };

  /* Auto-advance the event list every `ms`, with a progress bar on the active item.
     Pauses on hover, restarts after a click, runs only while the section is on screen. */
  window.EP_auto = function (root, evs, count, go, start, ms) {
    ms = ms || 10000;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cur = start || 0, t = 0, vis = false, hover = false;
    function arm() {
      clearTimeout(t); evs.classList.remove("auto", "paused"); void evs.offsetWidth;
      if (calm || !vis || hover) return;
      evs.style.setProperty("--ms", ms + "ms"); evs.classList.add("auto");
      t = setTimeout(() => pick((cur + 1) % count), ms);
    }
    function pick(i) { cur = i; go(i); arm(); }
    root.addEventListener("pointerenter", () => { hover = true; clearTimeout(t); evs.classList.add("paused"); });
    root.addEventListener("pointerleave", () => { hover = false; arm(); });
    new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis) arm(); else { clearTimeout(t); evs.classList.remove("auto", "paused"); } }, { threshold: 0.4 }).observe(root);
    return { pick };
  };

  /* ---------- "while you sleep" fan: job cards in an arc, lines converge on the brand mark ---------- */
  const SV = (d) => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICON = {
    bank: '<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
    doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>',
    truck: '<path d="M2 6h11v10H2zM13 9h5l3 3.5V16h-8"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.6 3-5.2 6-5.2s5.4 1.6 6 5.2M16 5.4a3 3 0 010 5.4M18 14.5c1.7.6 2.8 2.2 3.2 4.5"/>',
    cart: '<path d="M3 4h2.5l2 11h10l2-8H7"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    inbox: '<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 2h6l1-2h5"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.4 3.8 5.2 3.8 8.5s-1.2 6.1-3.8 8.5c-2.6-2.4-3.8-5.2-3.8-8.5S9.4 5.9 12 3.5z"/>',
    book: '<path d="M5 4h10a3 3 0 013 3v13H8a3 3 0 01-3-3z"/><path d="M5 17a3 3 0 013-3h10"/>',
    shield: '<path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z"/><path d="M9 12l2.2 2.2L15 10.5"/>',
    pin: '<path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 00-13 0C5.5 15.4 12 21 12 21z"/><circle cx="12" cy="10" r="2.4"/>',
    laptop: '<rect x="4" y="5" width="16" height="11" rx="2"/><path d="M2 19h20"/>',
    undo: '<path d="M9 8L5 12l4 4"/><path d="M5 12h9a5 5 0 010 10h-2"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18M16 14.5h2"/>',
    pen: '<path d="M4 20l1-4L16.5 4.5a2 2 0 013 3L8 19z"/><path d="M14 7l3 3"/>',
    stamp: '<path d="M9 4h6v5l2 3H7l2-3z"/><path d="M5 16h14v4H5z"/>',
    bell: '<path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 004 0"/>',
    box: '<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.1M4 12h.1M4 18h.1"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    link: '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3A4 4 0 0011 18.7l1-1"/>',
    camera: '<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13.5" r="3.5"/>',
    tool: '<path d="M14.5 6.5a4 4 0 005 5L20 12l-8 8a2.8 2.8 0 01-4-4l8-8z"/>',
  };
  const BY = { finance: "bank", bank: "bank", quotes: "doc", orders: "box", reminders: "bell", targets: "pin", pipeline: "box", leads: "users", "follow-ups": "bell", contacts: "users", stock: "box", items: "box", counts: "list", suppliers: "cart", budget: "wallet", requests: "inbox", grn: "doc", invoices: "doc", reports: "list", attendance: "clock", leave: "calendar", gratuity: "shield", journal: "book", payslips: "receipt", visas: "shield", contracts: "doc", records: "doc", deliveries: "truck", routes: "pin", jobs: "tool", resources: "users", approvals: "shield", tickets: "inbox", followups: "bell", receivables: "wallet", payables: "cart", ledger: "book", vat: "doc", tax: "doc", returns: "undo", sales: "doc", platform: "cog", operations: "truck", hr: "users", procurement: "cart", routing: "users", sla: "clock", portal: "globe", "knowledge base": "book", tickets: "inbox", warranties: "shield", devices: "laptop", licences: "doc", locations: "pin", returns: "undo", assets: "box", attendance: "clock", leave: "calendar", payroll: "wallet", people: "users", sign: "pen", stamp: "stamp", reminders: "bell", "audit trail": "shield" };
  window.EP_fan = function (host, items) {
    const N = items.length, W = 1000, H = 760, BW = 92;
    const xs = items.map((_, i) => 8 + (i * 84) / (N - 1));
    const ys = items.map((_, i) => { const u = (i - (N - 1) / 2) / ((N - 1) / 2); return 3 + 11 * u * u; });
    const tx = 500, ty = 584;
    const lines = items.map((_, i) => { const x = (xs[i] / 100) * W, y = (ys[i] / 100) * H + BW + 8; return `M${x.toFixed(1)} ${y.toFixed(1)} C ${x.toFixed(1)} ${(y + 190).toFixed(1)} ${tx} ${(ty - 190).toFixed(1)} ${tx} ${ty}`; });
    const cards = items.map((e, i) => `<button class="ep-fc" type="button" style="--x:${xs[i].toFixed(2)};--y:${ys[i].toFixed(2)};--i:${i}" aria-label="${e[1]} at ${e[0]}: ${e[2]}"><span class="ep-fc-in"><i>${SV(ICON[BY[e[1].toLowerCase()]] || ICON.cog)}</i><b>${e[1]}</b><time>${e[0]}</time></span><span class="ep-fc-d"><small>${e[0]} · Done</small>${e[2]}</span></button>`).join("");
    host.insertAdjacentHTML("beforeend", `<svg class="ep-fan-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="epfl" gradientUnits="userSpaceOnUse" x1="0" y1="150" x2="0" y2="${ty}"><stop offset="0" stop-color="#7B8CFF" stop-opacity=".12"/><stop offset=".55" stop-color="#8B6CF0" stop-opacity=".55"/><stop offset="1" stop-color="#3A4CE1" stop-opacity="1"/></linearGradient><linearGradient id="epfl2" gradientUnits="userSpaceOnUse" x1="0" y1="150" x2="0" y2="${ty}"><stop offset="0" stop-color="#80D1D4" stop-opacity="0"/><stop offset=".6" stop-color="#80D1D4" stop-opacity=".5"/><stop offset="1" stop-color="#80D1D4" stop-opacity=".9"/></linearGradient></defs>${lines.map((d, i) => `<path class="ep-fl2" style="--i:${i}" d="${d}" pathLength="1"/><path class="ep-fl" style="--i:${i}" d="${d}" pathLength="1"/>`).join("")}</svg>${cards}<div class="ep-fan-logo" aria-hidden="true"><span class="ep-glow"></span><span class="ep-tile2">${window.CZ_NAV.mark(54)}</span></div>`);
    host.querySelectorAll(".ep-fc").forEach((c) => c.addEventListener("click", () => { const on = c.classList.contains("open"); host.querySelectorAll(".ep-fc.open").forEach((x) => x.classList.remove("open")); if (!on) c.classList.add("open"); }));
    new IntersectionObserver(([e], o) => { if (e.isIntersecting) { host.classList.add("in"); o.disconnect(); } }, { threshold: 0.25 }).observe(host);
  };

  /* ---------- feature cards with their own mini illustration (self-contained, no side panel) ---------- */
  window.EP_ico = (n) => SV(ICON[n] || ICON.cog);
  const ck = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const esc = (t) => String(t).replace(/^\[|\]$/g, "");
  const short = (t, n = 38) => { t = esc(t); return t.length > n ? t.slice(0, n - 1).replace(/[ ,;:]+\S*$/, "") + "…" : t; };
  const RATES = () => (window.ONEERP && window.ONEERP.rates) || { AED: 1, SAR: 1.0211, USD: 0.2723 };
  const money = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const VIZ = {
    toggles: (it) => `<div class="vz vz-tg">${it.bullets.slice(0, 3).map((b, i) => `<button type="button" class="vz-pill on" style="--i:${i}"><span>${short(b, 34)}</span><i class="vz-sw"></i></button>`).join("")}</div>`,
    stack: (it) => `<div class="vz vz-stack">${[it.bullets[1], it.bullets[0], it.head].map((t, i) => `<div class="vz-sc" style="--i:${i}"><i>${ck}</i><span>${short(t || it.head, 44)}</span></div>`).join("")}</div>`,
    orbit: (it, ctx) => `<div class="vz vz-orbit"><span class="vz-r r1"></span><span class="vz-r r2"></span><span class="vz-r r3"></span><span class="vz-core">${window.EP_ico(ctx.core || "cog")}</span>${(ctx.sat || ["users", "doc", "box"]).map((n, i) => `<span class="vz-sat s${i}">${window.EP_ico(n)}</span>`).join("")}</div>`,
    bars: () => `<div class="vz vz-bars"><div class="vz-bc">${[46, 68, 38, 82, 58, 92].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join("")}</div><span class="vz-chip">Response time</span><span class="vz-chip b">Workload</span></div>`,
    shield: () => `<div class="vz vz-shield"><span class="vz-r r1"></span><span class="vz-r r2"></span><span class="vz-core big">${window.EP_ico("shield")}</span><span class="vz-tag">To be confirmed</span></div>`,
    invoice: () => `<div class="vz vz-inv"><div class="vz-ih"><b>Tax invoice</b><code>INV-2026-0544</code><span class="vz-chip">TRN 100•••003</span></div><div class="vz-ir"><span>Subtotal</span><b>AED 24,000.00</b></div><div class="vz-ir hl"><span>VAT 5%</span><b>AED 1,200.00</b></div><div class="vz-ir tot"><span>Total</span><b>AED 25,200.00</b></div></div>`,
    threshold: () => `<div class="vz vz-th"><div class="vz-thb"><i class="a"></i><i class="b"></i><span class="vz-mk"><em>AED 375,000</em></span></div><div class="vz-thl"><span><b>0%</b>up to the threshold</span><span><b>9%</b>above it</span></div></div>`,
    einv: () => `<div class="vz vz-ein"><div class="vz-doc"><i>&lt;/&gt;</i><b>INV-0544.xml</b><span class="vz-ok">${ck}</span></div><span class="vz-ln"></span><div class="vz-net"><b>Peppol</b><small>PINT-AE</small></div><div class="vz-st"><span class="vz-chip">Sent</span><span class="vz-chip g">Accepted</span></div></div>`,
    wps: () => `<div class="vz vz-wps">${[["AR", "#80D1D4"], ["OK", "#3A4CE1"], ["FA", "#633ADD"]].map((e, i) => `<div class="vz-emp" style="--i:${i}"><i style="background:${e[1]}">${e[0]}</i><span>Bank details</span><em>${ck}</em></div>`).join("")}<div class="vz-btn">WPS file ready</div></div>`,
    gratuity: () => `<div class="vz vz-gr"><div class="vz-grt"><i></i><i></i><i></i><i></i><i></i><i class="x"></i><span class="vz-mk2">Year 6</span></div><div class="vz-thl"><span><b>21 days</b>a year, first five</span><span><b>30 days</b>a year after</span></div></div>`,
    currency: () => { const r = RATES(); return `<div class="vz vz-cur" data-base="25200"><div class="vz-seg">${["AED", "SAR", "USD"].map((c, i) => `<button type="button" class="${i ? "" : "on"}" data-c="${c}">${c}</button>`).join("")}</div><div class="vz-amt"><small>Invoice total</small><b data-amt>AED ${money(25200)}</b></div><div class="vz-note">Base currency AED · demo rates</div></div>`; },
    records: () => `<div class="vz vz-rec"><div class="vz-fl f1"></div><div class="vz-fl f2"></div><div class="vz-fl f3"><i>${window.EP_ico("doc")}</i><b>Audit export</b></div><span class="vz-lock">${window.EP_ico("shield")}</span></div>`,
  };
  const KIND = { vat: "invoice", "corporate tax": "threshold", "e-invoicing": "einv", wps: "wps", gratuity: "gratuity", currencies: "currency", records: "records" };
  function kindFor(it) {
    const n = it.name.toLowerCase();
    if (KIND[n]) return [KIND[n]];
    if (it.bullets.length >= 3) return ["toggles"];
    if (it.bullets.length >= 1) return ["stack"];
    if (/erp/.test(n)) return ["orbit", { core: "box", sat: ["users", "wallet", "doc"] }];
    if (/report/.test(n)) return ["bars"];
    return ["shield"];
  }
  window.EP_why = function (host, list, opts) {
    opts = opts || {};
    const items = list.map((r) => ({ name: r[0], head: r[1], bullets: r[2] || [] }));
    host.className = "ep-why" + (items.length % 3 === 1 ? " wide-last" : "");
    host.innerHTML = items.map((it, i) => {
      const custom = opts.viz && opts.viz[it.name.toLowerCase()], [k, ctx] = custom ? ["custom"] : kindFor(it), viz = custom ? custom() : VIZ[k](it, ctx || {}), showMore = it.bullets.length && k !== "toggles";
      const last = i === items.length - 1 && items.length % 3 === 1;
      return `<article class="ep-wc rv${last ? " wide" : ""}" style="--d:${(i % 3) * 0.06}s" tabindex="0"><div class="ep-wv">${viz}</div><div class="ep-wt"><h3>${it.name}</h3><p>${it.head}</p>${showMore ? `<ul class="ep-wm">${it.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}</div></article>`;
    }).join("");
    host.addEventListener("click", (e) => {
      const pill = e.target.closest(".vz-pill"); if (pill) { pill.classList.toggle("on"); return; }
      const cb = e.target.closest(".vz-seg button");
      if (cb) { const box = cb.closest(".vz-cur"), c = cb.dataset.c; box.querySelectorAll(".vz-seg button").forEach((b) => b.classList.toggle("on", b === cb)); box.querySelector("[data-amt]").textContent = c + " " + money(25200 * (RATES()[c] || 1)); return; }
      const card = e.target.closest(".ep-wc"); if (card && !e.target.closest("a")) card.classList.toggle("open");
    });
    if (window.ONEERP && window.ONEERP.observeReveal) window.ONEERP.observeReveal();
    new IntersectionObserver(([en], o) => { if (en.isIntersecting) { host.classList.add("in"); o.disconnect(); } }, { threshold: 0.2 }).observe(host);
  };
})();
