/* Finance page only: bank reconciliation hero and statement tabs. Runs after sv.js. */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const svg = (d, w = 14, sw = 2.4) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const CK = svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 12, 2.8);
  const LINK = svg('<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>', 13, 2);
  const fmt = (n) => (n < 0 ? "−" : "+") + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const money = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /* ---------- hero: bank statement against the ledger ---------- */
  const win = $("#sv-win");
  if (win) {
    const ROWS = [
      ["12 Nov", "Harbour Line Freight", "Incoming transfer", 8640, "INV-2026-0544"],
      ["12 Nov", "Gulf Pack Supplies", "Outgoing payment", -4120, "BILL-2026-0231"],
      ["12 Nov", "Marina Dental Group", "Incoming transfer", 12500, "INV-2026-0551"],
      ["11 Nov", "Al Noor Trading", "Cheque deposit", 3980, "INV-2026-0547"],
      ["11 Nov", "Transfer ref 88213", "Sender not recognised", 1260, ""],
    ];
    const STMT = 412860, BOOK = 411600;
    win.innerHTML = `<div class="sv-frame fn-frame"><div class="fn-rec">
      <div class="fn-rh"><div><small>Bank reconciliation</small><b>Current account · AED ··4821</b></div><span class="fn-badge" id="fn-badge"><em></em>Reconciling</span></div>
      <div class="fn-sum"><div><small>Statement balance</small><b>${money(STMT)}</b></div><div><small>Ledger balance</small><b id="fn-book">${money(BOOK)}</b></div><div class="dif" id="fn-dif"><small>Difference</small><b>${money(STMT - BOOK)}</b></div></div>
      <div class="fn-rt" role="table" aria-label="Bank lines and ledger entries">
        <div class="fn-rr fn-rhd" role="row"><span role="columnheader">Date</span><span role="columnheader">Bank statement</span><span role="columnheader" class="r">AED</span><span aria-hidden="true"></span><span role="columnheader">Ledger entry</span><span role="columnheader" class="r">Status</span></div>
        ${ROWS.map((r, i) => `<div class="fn-rr${r[4] ? "" : " need"}" role="row" data-i="${i}"><span class="fn-dt">${r[0]}</span><span class="fn-ds"><b>${r[1]}</b><small>${r[2]}</small></span><span class="fn-am ${r[3] < 0 ? "out" : "in"}">${fmt(r[3])}</span><span class="fn-lk" aria-hidden="true">${LINK}</span><span class="fn-lg">${r[4] || "—"}</span><span class="fn-st r"><u class="wait">Matching</u></span></div>`).join("")}
      </div>
      <div class="fn-sug" id="fn-sug"><span><small>Suggested match</small><b>INV-2026-0552 · Sahara Labs · AED 1,260.00</b></span><span class="fn-btns"><button type="button" class="ok" id="fn-yes">Match</button><button type="button" id="fn-no">Not this</button></span></div>
      <div class="fn-rf"><span id="fn-count">0 of 5 matched by your rules</span><span>Nothing typed by hand</span></div>
    </div></div>`;
    const rows = $$(".fn-rr[data-i]", win), count = $("#fn-count"), badge = $("#fn-badge"), sug = $("#fn-sug");
    const setStatus = (row, html, cls) => { $(".fn-st", row).innerHTML = `<u class="${cls}">${html}</u>`; };
    let done = 0;
    const finish = () => {
      rows.forEach((r) => { if (r.classList.contains("need")) setStatus(r, "Needs you", "need"); });
      sug.classList.add("show");
    };
    const step = () => {
      const r = rows[done];
      if (!r || r.classList.contains("need")) return finish();
      r.classList.add("m"); setStatus(r, CK + "Matched", "ok"); done++;
      count.textContent = `${done} of ${rows.length} matched by your rules`;
      setTimeout(step, 520);
    };
    const start = () => { if (reduce) { while (rows[done] && !rows[done].classList.contains("need")) { rows[done].classList.add("m"); setStatus(rows[done], CK + "Matched", "ok"); done++; } count.textContent = `${done} of ${rows.length} matched by your rules`; finish(); } else setTimeout(step, 700); };
    if (window.ONEERP && window.ONEERP.inView) window.ONEERP.inView(win, start, 0.3); else start();

    $("#fn-yes").addEventListener("click", () => {
      const r = rows.find((x) => x.classList.contains("need"));
      if (!r) return;
      r.classList.remove("need"); r.classList.add("m"); $(".fn-lg", r).textContent = "INV-2026-0552"; setStatus(r, CK + "Matched", "ok");
      count.textContent = `${rows.length} of ${rows.length} matched · 1 confirmed by you`;
      $("#fn-book").textContent = money(STMT);
      const dif = $("#fn-dif"); dif.classList.add("zero"); $("b", dif).textContent = "0.00";
      badge.classList.add("done"); badge.innerHTML = `${CK}Reconciled`;
      sug.innerHTML = `<span><small>Reconciled</small><b>Statement and ledger agree to the fils</b></span>`; sug.classList.add("fin");
    });
    $("#fn-no").addEventListener("click", () => {
      sug.innerHTML = `<span><small>Left for review</small><b>Kept aside and flagged in tomorrow's list</b></span>`; sug.classList.add("fin");
    });
  }

  /* ---------- statements: tabs ---------- */
  const st = $(".fn-stm");
  if (st) {
    const tabs = $$(".fn-tabs button", st), panels = $$(".fn-sp", st);
    const show = (k, focus) => {
      tabs.forEach((t) => { const on = t.dataset.p === k; t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; if (on && focus) t.focus(); });
      panels.forEach((p) => { const on = p.dataset.p === k; p.hidden = !on; p.classList.toggle("on", on); });
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => show(t.dataset.p));
      t.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault(); const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]; show(n.dataset.p, true);
      });
    });
    show("pl");
  }

  /* ---------- going live: pin the section and light each step as you scroll ---------- */
  if (window.EP_stickySteps) window.EP_stickySteps($("#live"));

  /* ---------- how finance runs: pinned card stack ---------- */
  const flow = $(".fn-flow");
  if (flow) {
    const fx = $$(".fn-fx", flow), cards = fx.map((x) => $(".fn-fc", x)), steps = fx.map((x) => $(".fn-fs", x)), btns = $$(".fn-fnav button", flow);
    const n = fx.length, mq = matchMedia("(max-width: 860px)");
    const clamp = (v) => Math.max(0, Math.min(1, v)), ease = (v) => v * v * (3 - 2 * v);
    const span = () => flow.offsetHeight - innerHeight * 0.95;
    let cur = -1, raf = 0;
    const render = () => {
      raf = 0;
      if (mq.matches) return;
      const raw = clamp(-flow.getBoundingClientRect().top / Math.max(1, span())) * (n - 1);
      const seg = Math.min(n - 2, Math.floor(raw)), s = raw - seg;
      /* each card holds still, then the next one slides up over it */
      const t = raw >= n - 1 ? n - 1 : seg + (reduce ? (s > 0.5 ? 1 : 0) : ease(clamp((s - 0.3) / 0.55)));
      const h = cards[0].offsetHeight + 40;
      cards.forEach((c, i) => {
        const d = t - i;
        if (d >= 0) { const k = Math.min(d, 1); c.style.transform = `translateY(${-16 * k}px) scale(${1 - 0.06 * k})`; c.style.opacity = d > 1.2 ? "0" : String(1 - 0.35 * k); }
        else { const e = Math.min(-d, 1); c.style.transform = `translateY(${e * h}px)`; c.style.opacity = e >= 1 ? "0" : "1"; }
      });
      steps.forEach((el, i) => {
        const o = clamp(1 - Math.abs(t - i) * 2.2);
        el.style.opacity = o; el.style.filter = reduce || o > 0.98 ? "none" : `blur(${(1 - o) * 6}px)`; el.style.pointerEvents = o > 0.5 ? "auto" : "none";
      });
      const a = Math.round(t);
      if (a !== cur) { cur = a; btns.forEach((b, i) => b.setAttribute("aria-current", String(i === a))); }
    };
    const ask = () => { if (!raf) raf = requestAnimationFrame(render); };
    addEventListener("scroll", ask, { passive: true }); addEventListener("resize", ask); mq.addEventListener("change", ask); render();
    btns.forEach((b, i) => b.addEventListener("click", () => {
      const top = scrollY + flow.getBoundingClientRect().top;
      scrollTo({ top: top + (span() * (i === 0 ? 0 : i - 0.12)) / (n - 1) + 1, behavior: reduce ? "auto" : "smooth" });
    }));
  }
})();
