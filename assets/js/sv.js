/* Inner service page (ONE ERP module): one template, content from assets/js/sv-data.js */
(function () {
  const key = document.body.dataset.sv, D = (window.SV || {})[key];
  if (!D) return;
  const { IC } = window.CZ_NAV;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- hero: live product window ---------- */
  const H = D.hero, ck = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  if (H.img) {
    $("#sv-win").innerHTML = `<div class="sv-shot"><img src="${H.img}" alt="${H.alt || ""}" width="1125" height="750" decoding="async"></div>`;
  } else {
    const n = H.rows.length, toL = H.to || "To match", verb = H.verb || "matched";
    $("#sv-win").innerHTML = `<div class="sv-frame"><div class="sv-screen"><div class="sv-top"><div><b>${H.title}</b><small>${H.sub}</small></div><span class="sv-live"><em></em>Live</span></div>
    <div class="sv-rows">${H.rows.map((r, i) => `<div class="sv-r${r[2] ? "" : " need"}" style="--i:${i}"><i class="sv-av">${r[2] ? r[0].split(" ").map((w) => w[0]).slice(0, 2).join("") : "?"}</i><span class="sv-nm"><b>${r[0]}</b><small>${r[1]}</small></span>${r[2] ? `<span class="sv-st"><span class="sv-to">${toL}</span><span class="sv-ok">${ck} ${r[2]}</span></span>` : `<span class="sv-st"><span class="sv-nd">Needs you</span></span>`}</div>`).join("")}</div>
    <div class="sv-ft"><span>${n - 1} of ${n} ${verb} · 1 needs you</span><div class="sv-bar"><i></i></div></div></div></div>`;
  }

  /* ---------- stats ---------- */
  const st = D.stats;
  $("#sv-stats").innerHTML = st.items.map((s, i) => `<div class="h2-stat${s[3] == null ? " nobar" : ""}" style="--d:${i * 0.06}s" data-pct="${s[3] == null ? 0 : s[3]}">${s[3] == null ? "" : `<div class="st-bar"><span class="st-lo">${s[4]}</span><span class="st-hi">${s[5]}</span><i class="st-mk"></i><div class="st-track"><em class="st-fill"></em><em class="st-rest"></em></div></div>`}<b data-to="${s[0]}" data-suf="${s[1]}">${s[0]}<i>${s[1]}</i></b><span>${s[2]}</span></div>`).join("");
  $$("#sv-stats .h2-stat:not(.nobar)").forEach((card) => {
    const b = $("b", card), raw = b.dataset.to, to = parseFloat(raw), suf = b.dataset.suf, pct = +card.dataset.pct, num = /^\d+$/.test(raw);
    const put = (k) => { b.innerHTML = (num ? Math.round(to * k) : raw) + (suf ? `<i>${suf}</i>` : ""); card.style.setProperty("--p", (pct * k).toFixed(2)); };
    put(0);
    window.ONEERP.inView(card, () => { if (still) return put(1); const t0 = performance.now(); (function tick(t) { const k = window.ONEERP.ease(Math.min(1, (t - t0) / 1400)); put(k); if (k < 1) requestAnimationFrame(tick); })(t0); }, 0.5);
  });
  $("#sv-foot").textContent = st.foot;

  /* ---------- feature cards with infographics ---------- */
  window.EP_why($("#ep-why"), D.features.list, { viz: (window.EP_VIZ || {})[key] });

  /* ---------- how money travels ---------- */
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
  flow(0);
  const flowAuto = window.EP_auto($(".ep-flow"), evs, D.events.length, flow, 0, 10000);
  evs.addEventListener("click", (ev) => { const b = ev.target.closest(".ep-ev"); if (b) flowAuto.pick(+b.dataset.i); });

  /* ---------- night shift fan ---------- */
  window.EP_fan($("#ep-fan"), D.night.items);

  /* ---------- UAE cards ---------- */
  window.EP_why($("#ep-uae"), D.uae.list, { viz: (window.EP_VIZ || {})[key] });

  /* ---------- related modules ---------- */
  $("#sv-rel").innerHTML = D.related.items.map((r, i) => `<a class="sv-rc rv" href="${r[3]}" style="--d:${i * 0.06}s"><i class="sv-ri">${IC[r[0]]}</i><div><b>${r[1]}</b><p>${r[2]}</p></div><span class="sv-go">Open ${r[1]} ${IC.arrow}</span></a>`).join("");

  /* ---------- steps, faq, pager, cta ---------- */
  $("#ep-steps").innerHTML = D.steps.map((s, i) => `<article class="ep-step rv" style="--d:${i * 0.08}s"><div class="ep-sn"><span>0${i + 1}</span><i></i></div><h3>${s[0]}</h3><p>${s[1]}</p><span class="ep-when">${s[2]}</span></article>`).join("");
  const acEl = $("#faq-list");
  acEl.innerHTML = D.faq.map((f, i) => `<div class="ac-i${i === 0 ? " open" : ""}"><h3><button class="ac-t" type="button" id="acq${i}" aria-expanded="${i === 0}" aria-controls="aca${i}"><span class="ac-n">0${i + 1}</span><span class="ac-q">${f[0]}</span><span class="ac-ch">${IC.chev}</span></button></h3><div class="ac-c" id="aca${i}" role="region" aria-labelledby="acq${i}"><div><p>${f[1]}</p></div></div></div>`).join("");
  acEl.addEventListener("click", (e) => {
    const b = e.target.closest(".ac-t"); if (!b) return;
    const item = b.closest(".ac-i"), was = item.classList.contains("open");
    $$(".ac-i", acEl).forEach((x) => { x.classList.remove("open"); $(".ac-t", x).setAttribute("aria-expanded", "false"); });
    if (!was) { item.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
  });
  $("#sv-pager").innerHTML = `<a class="sv-pg prev" href="${D.prev[1]}"><small>Previous module</small><b>${IC.arrow}${D.prev[0]}</b></a><a class="sv-pg all" href="${D.parent[1]}"><small>Back to</small><b>All ${D.parent[0]} modules</b></a><a class="sv-pg next" href="${D.next[1]}"><small>Next module</small><b>${D.next[0]}${IC.arrow}</b></a>`;
  { const cm = $("#cta-mark"); if (cm) cm.innerHTML = window.CZ_NAV.mark(100); }
  if (window.CZ_shaderBg) window.CZ_shaderBg($(".h2-cta-card"), [0.05, 0.35, 0.85]);
  window.ONEERP.observeReveal();
})();
