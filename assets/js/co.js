/* Company page: product orbit, manifesto reveal, principles, product bento, timeline, team. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const N = window.CZ_NAV || {};
  const P = N.PRODUCTS || [];
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const svg = (d, w = 1.8) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICO = {
    erp: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
    desk: '<path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-6l-4 3.5V17H6a2 2 0 01-2-2z"/><path d="M8.5 9.5h7M8.5 12.5h4"/>',
    assets: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.3 3-5.3 6-5.3s5.4 2 6 5.3M16 4.6a3.2 3.2 0 010 6.3M18.5 14.9c1.4.8 2.3 2.4 2.5 5.1"/>',
    sign: '<path d="M4 20c3-1 4-5 6-5s1 3 3 3 2.5-2 4-2 2 1.5 3 1.5"/><path d="M14.5 4.5l3 3L9 16H6v-3z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  };
  const go = svg(ICO.arrow, 2);

  /* ---------- 1 · hero hub ---------- */
  const LIVE = {
    erp: ["VAT return", "Ready to file", "Finance"],
    desk: ["Ticket #2041", "Owner set, due 4 pm", "Helpdesk"],
    assets: ["Laptop LT-118", "Handed to a new joiner", "Assets"],
    people: ["Visa renewal", "Flagged 30 days ahead", "HR"],
    sign: ["Supplier contract", "Signed and stamped", "e-Sign"],
  };
  const ORDER = ["erp", "people", "assets", "sign", "desk"];
  const orbit = $("#co-orbit");
  if (orbit && P.length) {
    const byK = Object.fromEntries(P.map((p) => [p.k, p]));
    const ks = ORDER.filter((k) => byK[k]);
    orbit.innerHTML = `<div class="co-au" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="co-rings" aria-hidden="true"><i></i><i></i><i></i></div>
      <svg class="co-wires" aria-hidden="true"><defs><linearGradient id="co-wg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#80D1D4"/><stop offset=".5" stop-color="#3A4CE1"/><stop offset="1" stop-color="#633ADD"/></linearGradient></defs>
        ${ks.map((k) => `<path id="co-w-${k}" data-k="${k}"/>`).join("")}</svg>
      <div class="co-hub"><div class="co-hub-in">
        <div class="co-hub-top"><span class="co-hub-m">${N.mark ? N.mark(34) : ""}</span><span><b>One set of records</b><small>Live sync</small></span></div>
        <ul class="co-feed" id="co-feed" aria-hidden="true"></ul>
      </div></div>
      ${ks.map((k) => { const p = byK[k], l = LIVE[k]; return `<a class="co-node" data-k="${k}" href="${p.href}" style="--c:${p.c};--s:${p.soft}"><i>${svg(ICO[k] || ICO.erp)}</i><span><b>${p.name}<em>${l[2]}</em></b><small>${l[0]}</small><span class="co-st">${svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 2.4)}${l[1]}</span></span></a>`; }).join("")}`;
    const wires = orbit.querySelector(".co-wires"), hub = orbit.querySelector(".co-hub"), feed = $("#co-feed");
    const nodes = Object.fromEntries([...orbit.querySelectorAll(".co-node")].map((n) => [n.dataset.k, n]));
    const paths = Object.fromEntries([...wires.querySelectorAll("path")].map((p) => [p.dataset.k, p]));
    const NS = "http://www.w3.org/2000/svg";
    /* travelling data pulses: a soft one on every wire, a bright one on the active wire */
    if (!RM) ks.forEach((k, j) => {
      const mk = (cls, r, dur, begin) => {
        const c = document.createElementNS(NS, "circle"); c.setAttribute("r", r); if (cls) c.setAttribute("class", cls); c.dataset.k = k;
        const m = document.createElementNS(NS, "animateMotion"); m.setAttribute("dur", dur); m.setAttribute("begin", begin); m.setAttribute("repeatCount", "indefinite"); m.setAttribute("calcMode", "spline"); m.setAttribute("keyTimes", "0;1"); m.setAttribute("keySplines", ".45 0 .55 1");
        const mp = document.createElementNS(NS, "mpath"); mp.setAttribute("href", "#co-w-" + k); m.appendChild(mp); c.appendChild(m); wires.appendChild(c); return c;
      };
      mk("", 2.5, (3.6 + j * .5) + "s", (-j * .9) + "s");
      mk("hot", 5, "1.2s", "0s");
    });
    /* draw curved wires from each card's inner edge to the hub */
    const layout = () => {
      if (getComputedStyle(wires).display === "none") return;
      const o = orbit.getBoundingClientRect(), h = hub.getBoundingClientRect();
      wires.setAttribute("viewBox", `0 0 ${o.width} ${o.height}`);
      const hx = h.left - o.left + h.width / 2, hy = h.top - o.top + h.height / 2;
      ks.forEach((k) => {
        const r = nodes[k].getBoundingClientRect(), cx = r.left - o.left + r.width / 2, cy = r.top - o.top + r.height / 2;
        let d;
        if (Math.abs(cx - hx) < 40) { /* card under the hub */
          const y1 = r.top - o.top, y2 = h.bottom - o.top;
          d = `M${cx} ${y1} C${cx} ${(y1 + y2) / 2} ${hx} ${(y1 + y2) / 2} ${hx} ${y2}`;
        } else {
          const left = cx < hx, x1 = left ? r.right - o.left : r.left - o.left, x2 = left ? h.left - o.left : h.right - o.left;
          const y2 = hy + (cy < hy ? -h.height * .22 : h.height * .22), mx = (x1 + x2) / 2;
          d = `M${x1} ${cy} C${mx} ${cy} ${mx} ${y2} ${x2} ${y2}`;
        }
        paths[k].setAttribute("d", d);
      });
    };
    let i = 0;
    const tick = () => {
      const k = ks[i % ks.length], l = LIVE[k], p = byK[k];
      Object.values(nodes).forEach((n) => n.classList.toggle("on", n.dataset.k === k));
      Object.values(paths).forEach((w) => w.classList.toggle("on", w.dataset.k === k));
      wires.querySelectorAll("circle.hot").forEach((c) => c.classList.toggle("on", c.dataset.k === k));
      if (feed) {
        const li = document.createElement("li"); li.style.setProperty("--c", p.c);
        li.innerHTML = `<i></i><span>${l[0]} · ${l[1]}</span><time>now</time>`;
        feed.prepend(li);
        [...feed.children].forEach((x, j) => { const t = x.querySelector("time"); if (j) t.textContent = (j * 3) + "s ago"; if (j > 3) x.remove(); });
      }
      i++;
    };
    /* start with a few recent events so the feed is never empty */
    if (feed) ["assets", "sign", "desk"].filter((k) => byK[k]).forEach((k, j) => { const li = document.createElement("li"); li.style.cssText = `--c:${byK[k].c};animation:none`; li.innerHTML = `<i></i><span>${LIVE[k][0]} · ${LIVE[k][1]}</span><time></time>`; feed.prepend(li); });
    layout(); tick();
    addEventListener("resize", layout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    if (!RM) setInterval(() => { if (!document.hidden) tick(); }, 2600);
    if (!RM && matchMedia("(pointer:fine)").matches) {
      orbit.addEventListener("pointermove", (e) => { const r = orbit.getBoundingClientRect(); orbit.style.setProperty("--mx", ((e.clientX - r.left) / r.width - .5).toFixed(3)); orbit.style.setProperty("--my", ((e.clientY - r.top) / r.height - .5).toFixed(3)); });
      orbit.addEventListener("pointerleave", () => { orbit.style.setProperty("--mx", 0); orbit.style.setProperty("--my", 0); });
    }
  }

  /* ---------- 2 · manifesto, words light up as you scroll ---------- */
  const mf = $("#co-mf");
  if (mf) {
    const words = mf.textContent.trim().split(/\s+/);
    mf.innerHTML = words.map((w) => `<span>${w}</span>`).join(" ");
    const sp = [...mf.children];
    if (RM) sp.forEach((s) => s.classList.add("on"));
    else {
      let raf = 0;
      const upd = () => {
        raf = 0;
        const r = mf.getBoundingClientRect(), vh = innerHeight;
        const p = Math.min(1, Math.max(0, (vh * .85 - r.top) / (r.height + vh * .3)));
        const n = Math.round(p * sp.length);
        sp.forEach((s, j) => s.classList.toggle("on", j < n));
      };
      addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
      addEventListener("resize", upd);
      upd();
    }
  }

  /* ---------- 4 · principles ---------- */
  const PR = [
    ["UAE rules by default", "VAT returns, WPS files, gratuity and e-invoicing are built in, not bolted on. You never buy a plug-in to stay compliant.", "The WPS file is ready the moment payroll is approved.", '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'],
    ["One person per customer", "The person who sets you up stays your contact after go-live. No ticket queue between you and an answer.", "You have their name and number from the first demo.", '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.8 7-5.8s6.2 2.2 7 5.8"/>'],
    ["Typed once", "Every record lives in one place. An invoice, a payslip or a laptop is entered once and every product sees it.", "A new hire shows up in HR, Payroll and Assets on day one.", '<path d="M4 7h16M4 12h10M4 17h6"/><circle cx="18" cy="16" r="3"/>'],
    ["Plain English", "Screens, reports and help written for owners and finance teams, not for consultants. If it needs a manual, we fix the screen.", "Our guide explains gratuity on one page, not twenty.", '<path d="M4 5h11a4 4 0 014 4v10H8a4 4 0 01-4-4z"/><path d="M8 9h7M8 13h5"/>'],
  ];
  const pr = $("#co-pr");
  if (pr) pr.innerHTML = PR.map((x, j) => `<article class="co-p rv" style="--d:${(j * .06).toFixed(2)}s"><div class="co-p-top"><i>${svg(x[3])}</i><span>0${j + 1}</span></div><h3>${x[0]}</h3><p>${x[1]}</p><em><b>In practice</b>${x[2]}</em></article>`).join("");

  /* ---------- 5 · product bento ---------- */
  const bento = $("#co-bento");
  if (bento && P.length) {
    bento.innerHTML = P.map((p, j) => {
      const big = p.k === "erp";
      const mods = big && p.modules ? `<ul class="co-mods">${p.modules.map((m) => `<li><a href="${m[3]}">${m[1]}</a></li>`).join("")}</ul>` : "";
      return `<article class="co-b rv${big ? " big" : ""}" style="--c:${p.c};--s:${p.soft};--dp:${p.deep};--d:${(j * .05).toFixed(2)}s">
        <div class="co-b-top"><i>${svg(ICO[p.k] || ICO.erp)}</i>${p.flag ? `<em>${p.flag}</em>` : ""}</div>
        <h3><a href="${p.href}">${p.name}</a></h3><p>${p.short}</p>${mods}
        <span class="co-b-go">${big ? "Explore all eight modules" : "Explore " + p.name} ${go}</span></article>`;
    }).join("");
  }

  /* ---------- 6 · timeline ---------- */
  const TL = [
    ["[Year]", "CubeZix starts in Dubai", "Custom software for local companies, built close to the people who use it."],
    ["[Year]", "The first ERP projects", "Finance, payroll and stock for trading and services companies across the UAE."],
    ["[Year]", "Desk, Assets and Sign", "Helpdesk, asset tracking and e-signing for the same customers' teams."],
    ["[Year]", "CubeZixONE", "Five products brought together on one shared set of records."],
    ["2027", "Ready for e-invoicing", "The UAE e-invoicing rollout, handled inside ONE ERP.", 1],
  ];
  const tl = $("#co-tl");
  if (tl) {
    tl.innerHTML = TL.map((x) => `<li class="${x[3] ? "next" : ""}"><span class="co-tl-y">${x[3] ? "Next · " : ""}${x[0]}</span><i></i><h3>${x[1]}</h3><p>${x[2]}</p></li>`).join("");
    const jr = $("#journey"), fill = $("#co-tl-fill"), box = $(".co-tl-box"), items = [...tl.children];
    if (RM) items.forEach((li) => li.classList.add("on"));
    else {
      jr.classList.add("co-jr-on");
      const wide = matchMedia("(min-width:1001px)");
      let raf = 0;
      const upd = () => {
        raf = 0;
        const vh = innerHeight, b = box.getBoundingClientRect();
        let p;
        if (wide.matches) {
          /* pinned: progress runs from the moment the section reaches the top until its end */
          const r = jr.getBoundingClientRect(), run = r.height - vh;
          p = run > 0 ? (-r.top) / run : 1;
          p = (p - .04) / .82;
        } else {
          p = (vh * .7 - b.top) / b.height;
        }
        p = Math.min(1, Math.max(0, p));
        /* dot centres along the timeline axis, relative to the box */
        const dots = items.map((li) => { const d = li.querySelector("i").getBoundingClientRect(); return wide.matches ? d.left + d.width / 2 - b.left : d.top + d.height / 2 - b.top; });
        const a = dots[0], z = dots[dots.length - 1], at = a + (z - a) * p;
        fill.style.setProperty("--len", Math.max(0, at - a) + "px");
        let cur = -1;
        items.forEach((li, j) => { const on = at >= dots[j] - 1; li.classList.toggle("on", on); if (on) cur = j; });
        items.forEach((li, j) => li.classList.toggle("cur", j === cur));
      };
      const ask = () => { if (!raf) raf = requestAnimationFrame(upd); };
      addEventListener("scroll", ask, { passive: true });
      addEventListener("resize", ask);
      upd();
    }
  }

  /* ---------- 7 · team ---------- */
  const TEAM = [["Leadership", "#3A4CE1"], ["Engineering", "#633ADD"], ["Implementation", "#0AA7A4"], ["Customer success", "#3F7FE0"], ["Finance consulting", "#2B2FA0"]];
  const team = $("#co-team");
  if (team) team.innerHTML = TEAM.map((t, j) => `<article class="co-m rv" style="--c:${t[1]};--d:${(j * .05).toFixed(2)}s"><span class="co-av">${svg('<circle cx="12" cy="9" r="4"/><path d="M4 21c1-4 4.2-6.2 8-6.2s7 2.2 8 6.2"/>', 1.5)}</span><b>[Name]</b><small>[Role]</small><span class="co-tag">${t[0]}</span></article>`).join("")
    + `<a class="co-m co-join rv" href="careers.html" style="--d:.25s"><span class="co-av">${svg('<path d="M12 5v14M5 12h14"/>', 2)}</span><b>This could be you</b><small>See open roles in Dubai</small><span class="co-tag">Careers ${go}</span></a>`;

  /* ---------- shared bits ---------- */
  const cm = $("#cta-mark"); if (cm && N.mark) cm.innerHTML = N.mark(100);
  if (window.CZ_shaderBg) { window.CZ_shaderBg($(".h2-cta-card"), [0.05, 0.35, 0.85]); window.CZ_shaderBg($(".co-mv-c.m"), [0.05, 0.35, 0.85]); }
  if (window.ONEERP && ONEERP.observeReveal) ONEERP.observeReveal();
  else { const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .15 }); document.querySelectorAll(".rv").forEach((x) => io.observe(x)); }
})();
