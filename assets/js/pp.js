/* Product pages (Desk, Assets, People, Sign): one template, content from assets/js/pp-data.js */
(function () {
  const key = document.body.dataset.pp, D = (window.PP || {})[key];
  if (!D) return;
  const { IC } = window.CZ_NAV;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const S = (d) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICO = {
    ...IC,
    inbox: S('<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 2h6l1-2h5"/>'),
    clock: S('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
    chat: S('<path d="M4 5h16v11H9l-5 4z"/>'),
    book: S('<path d="M5 4h10a3 3 0 013 3v13H8a3 3 0 01-3-3z"/><path d="M5 17a3 3 0 013-3h10"/>'),
    globe: S('<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.4 3.8 5.2 3.8 8.5s-1.2 6.1-3.8 8.5c-2.6-2.4-3.8-5.2-3.8-8.5S9.4 5.9 12 3.5z"/>'),
    pen: S('<path d="M4 20l1-4L16.5 4.5a2 2 0 013 3L8 19z"/><path d="M14 7l3 3"/>'),
    tool: S('<path d="M14.5 6.5a4 4 0 005 5L20 12l-8 8a2.8 2.8 0 01-4-4l8-8z"/><path d="M8 17h.01"/>'),
    undo: S('<path d="M9 8L5 12l4 4"/><path d="M5 12h9a5 5 0 010 10h-2"/>'),
    shield: S('<path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z"/><path d="M9 12l2.2 2.2L15 10.5"/>'),
    pin: S('<path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 00-13 0C5.5 15.4 12 21 12 21z"/><circle cx="12" cy="10" r="2.4"/>'),
    calendar: S('<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
    receipt: S('<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>'),
    userplus: S('<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.6 3-5.2 6-5.2s5.4 1.6 6 5.2"/><path d="M18 8v6M15 11h6"/>'),
    stamp: S('<path d="M9 4h6v5l2 3H7l2-3z"/><path d="M5 16h14v4H5z"/>'),
    bell: S('<path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 004 0"/>'),
    laptop: S('<rect x="4" y="5" width="16" height="11" rx="2"/><path d="M2 19h20"/>'),
  };
  const ic = (n) => ICO[n] || ICO.doc;
  document.documentElement.style.setProperty("--pa", D.color);

  /* hero extras */
  if (D.badge) { const e = $(".ep-hero-copy .eyebrow"); e.insertAdjacentHTML("afterend", `<span class="ep-badge">${D.badge}</span>`); }

  /* ---------- console ---------- */
  const ITEMS = D.items;
  const rail = $("#ep-rail"), main = $("#ep-main"), con = $("#ep-con");
  rail.innerHTML = ITEMS.map((m, i) => `<button class="ep-tab" role="tab" type="button" data-i="${i}" aria-selected="false"><i>${ic(m[2])}</i><span>${m[1]}</span></button>`).join("");
  let cur = -1, auto = true, timer = 0;
  function show(i) {
    cur = i; const m = ITEMS[i], p = m[7];
    $$(".ep-tab", rail).forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-selected", k === i); });
    main.classList.remove("in"); void main.offsetWidth;
    main.innerHTML = `<div class="ep-mh"><i class="ep-tile">${ic(m[2])}</i><div><small>${D.name}</small><b>${m[1]}</b></div><span class="ep-live"><em></em>${D.badge ? "Preview" : "Live"}</span></div>
      <p class="ep-d">${m[3]}</p>
      <div class="ep-tk"><div class="ep-tk-h"><i>${ic(m[2])}</i><div><small>${m[1]}</small><b>${p[0]} <code>${p[1]}</code></b></div><span class="ep-need">Needs you <u>1</u></span></div>${p[2].map((r) => `<div class="ep-tk-r"><span>${r[0]}</span><b>${r[1]}</b></div>`).join("")}</div>
      <div class="ep-hold"><small>Includes</small>${m[5].map((h) => `<span>${h}</span>`).join("")}</div>`;
    main.classList.add("in");
  }
  rail.addEventListener("click", (e) => { const b = e.target.closest(".ep-tab"); if (!b) return; auto = false; clearInterval(timer); show(+b.dataset.i); });
  con.addEventListener("pointerenter", () => clearInterval(timer));
  con.addEventListener("pointerleave", () => { if (auto && !still) loop(); });
  function loop() { clearInterval(timer); timer = setInterval(() => show((cur + 1) % ITEMS.length), 4200); }
  show(0);
  new IntersectionObserver(([e]) => { if (e.isIntersecting && auto && !still) loop(); else clearInterval(timer); }, { threshold: 0.35 }).observe(con);

  /* ---------- lanes (layered cards) ---------- */
  const LC = ["#633ADD", "#3A4CE1", "#80D1D4"], AVC = ["#80D1D4", "#3A4CE1", "#633ADD", "#2B2FA0"];
  const TABC = [["#8B5CF6", "#633ADD"], ["#5B6CF0", "#3A4CE1"], ["#80D1D4", "#4FB6BB"]];
  const lcard = (i) => {
    const m = ITEMS[i], calm = /all caught|all counted/i.test(m[6]), tc = calm ? TABC[2] : TABC[i % 2], need = calm ? 0 : 1;
    return `<article class="ep-lc" id="f-${m[0]}" tabindex="0" style="--s1:${tc[0]};--s2:${tc[1]}"><div class="ep-lc-tag">${D.tabs[i]}</div><div class="ep-lc-body"><div class="ep-lc-dash"><div class="ep-lc-top"><i class="ep-lc-ic">${ic(m[2])}</i><h3>${m[1]}</h3></div><p class="ep-lc-p">${m[3]}</p><div class="ep-lc-more"><div><p>${m[4]}</p></div></div><div class="ep-lc-row"><span class="ep-av">${D.owners[i].map((o, k) => `<b style="--c:${AVC[(i + k) % 4]}">${o}</b>`).join("")}</span><span class="ep-lc-st"><em></em>${m[6]}</span></div></div><div class="ep-lc-foot"><span title="What it includes"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12M4 6h.1M4 12h.1M4 18h.1"/></svg>${m[5].length}</span><span title="Needs you"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 004 0"/></svg>${need}</span><span class="ep-lc-hold">${m[5].slice(0, 2).join(", ")}${m[5].length > 2 ? " +" + (m[5].length - 2) : ""}</span></div></div></article>`;
  };
  const grid = $("#ep-grid"); grid.className = "ep-lanes l3";
  grid.innerHTML = D.lanes.map((l, n) => `<div class="ep-lane rv" style="--lc:${LC[n % 3]};--d:${n * 0.06}s"><div class="ep-lane-h"><i></i><div><b>${l[0]}</b><small>${l[1]}</small></div><span>${l[2].length} features</span></div>${l[2].map(lcard).join("")}<a class="ep-lane-add" href="book-a-demo.html"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>Ask about ${l[0].toLowerCase()}</a></div>`).join("");
  grid.addEventListener("click", (e) => { const c = e.target.closest(".ep-lc"); if (c && !e.target.closest("a")) c.classList.toggle("open"); });
  grid.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("ep-lc")) { e.preventDefault(); e.target.classList.toggle("open"); } });

  /* ---------- flow ---------- */
  const evs = $("#ep-evs"), stage = $("#ep-stage");
  evs.innerHTML = D.events.map((e, i) => `<button class="ep-ev" type="button" role="tab" data-i="${i}"><span>${String(i + 1).padStart(2, "0")}</span>${e[0]}</button>`).join("");
  function flow(i) {
    const e = D.events[i];
    $$(".ep-ev", evs).forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-selected", k === i); });
    { const on = evs.children[i]; if (on && evs.scrollWidth > evs.clientWidth) evs.scrollTo({ left: on.offsetLeft - (evs.clientWidth - on.offsetWidth) / 2, behavior: "smooth" }); }
    stage.classList.remove("go");
    stage.innerHTML = `<div class="ep-st-h"><small>When this happens</small><b>${e[0]}</b></div><div class="ep-tags">${e[1].map((t) => `<span>${t}</span>`).join("")}</div>${window.EP_chain(e[2])}`;
    void stage.offsetWidth; stage.classList.add("go");
  }
  flow(Math.min(1, D.events.length - 1));
  const flowAuto = window.EP_auto($(".ep-flow"), evs, D.events.length, flow, Math.min(1, D.events.length - 1), 10000);
  evs.addEventListener("click", (ev) => { const b = ev.target.closest(".ep-ev"); if (b) flowAuto.pick(+b.dataset.i); });

  /* ---------- timeline ---------- */
  window.EP_fan($("#ep-fan"), D.timeline);

  /* ---------- feature cards with illustrations ---------- */
  window.EP_why($("#ep-why"), D.spot.list, { viz: (window.EP_VIZ || {})[key] });

  /* ---------- steps ---------- */
  $("#ep-steps").innerHTML = D.steps.map((s, i) => `<article class="ep-step rv" style="--d:${i * 0.08}s"><div class="ep-sn"><span>0${i + 1}</span><i></i></div><h3>${s[0]}</h3><p>${s[1]}</p><span class="ep-when">${s[2]}</span></article>`).join("");

  /* ---------- faq ---------- */
  const acEl = $("#faq-list");
  acEl.innerHTML = D.faq.map((f, i) => `<div class="ac-i${i === 0 ? " open" : ""}"><h3><button class="ac-t" type="button" id="acq${i}" aria-expanded="${i === 0}" aria-controls="aca${i}"><span class="ac-n">0${i + 1}</span><span class="ac-q">${f[0]}</span><span class="ac-ch">${IC.chev}</span></button></h3><div class="ac-c" id="aca${i}" role="region" aria-labelledby="acq${i}"><div><p>${f[1]}</p></div></div></div>`).join("");
  acEl.addEventListener("click", (e) => {
    const b = e.target.closest(".ac-t"); if (!b) return;
    const item = b.closest(".ac-i"), was = item.classList.contains("open");
    $$(".ac-i", acEl).forEach((x) => { x.classList.remove("open"); $(".ac-t", x).setAttribute("aria-expanded", "false"); });
    if (!was) { item.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
  });

  /* ---------- cta ---------- */
  { const cm = $("#cta-mark"); if (cm) cm.innerHTML = window.CZ_NAV.mark(100); }
  if (window.CZ_shaderBg) window.CZ_shaderBg($(".h2-cta-card"), [0.05, 0.35, 0.85]);

  window.ONEERP.observeReveal();
})();
