/* Video for home page: a 16 s timeline (1280x720 stage) driven by one clock. */
(function () {
  const D = 16; // seconds
  const q = new URLSearchParams(location.search);
  const capture = q.has("t");
  if (capture) document.body.classList.add("capture");
  const stage = document.getElementById("stage"), box = document.getElementById("box");
  const svg = (d) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = {
    sheet: svg('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M4 15h16M10 4v16"/>'),
    calc: svg('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2"/>'),
    bank: svg('<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>'),
    tasks: svg('<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>'),
    folder: svg('<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>'),
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
    pos: svg('<path d="M4 7V5h3M17 5h3v2M4 17v2h3M17 19h3v-2"/><path d="M8 9v6M11 9v6M14 9v6M17 9v6"/>'),
    cal: svg('<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
    chat: svg('<path d="M4 5h16v11H9l-5 4z"/>'),
  };
  // [icon, app, time, title, sub, badge, bucket]
  const N = [
    ["sheet", "Spreadsheet", "08:30", "Cash flow: November tab updated", "Edited by Youssef", "99+", "f"],
    ["calc", "Old accounting app", "now", "41 bank lines unmatched", "Current account", "47", "r"],
    ["bank", "Bank portal", "09:12", "3 cheques cleared", "Total AED 7,950", "23", "r"],
    ["tasks", "Tasks", "09:41", "Due Thursday: stock take", "Store 2", "12", "f"],
    ["folder", "Drive", "2m", "Contract_v3_final.pdf was shared", "Shared by Arjun", "8", "f"],
    ["mail", "Mail", "07:58", "Statement of account: October", "3 invoices open, 1 overdue", "31", "r"],
    ["pos", "Point of sale", "08:55", "Daily sales report", "Store 1 and Store 2", "312", "r"],
    ["cal", "Calendar", "09:12", "Month-end review moved to 16:00", "Room 2, with Hana and Youssef", "3", "f"],
    ["sheet", "Spreadsheet", "now", "Overtime sheet: 4 rows highlighted", "Payroll, November", "17", "r"],
    ["folder", "Drive", "4m", "Folder moved: HR / Visas 2026", "Moved by Aisha", "5", "f"],
    ["chat", "Chat", "09:20", "Fatima: visa photos needed by noon", "HR group", "9", "r"],
    ["pos", "Point of sale", "1m", "Price change not synced", "3 tills still on the old list", "6", "r"],
    ["sheet", "Spreadsheet", "1m", "Price list (copy) was shared", "Anyone with the link can view", "47", "f"],
    ["tasks", "Tasks", "08:20", "7 tasks moved to next week", "Operations board", "22", "f"],
    ["mail", "Mail", "09:02", "Re: can you confirm the PO number?", "Al Noor Trading", "14", "r"],
    ["calc", "Old accounting app", "09:33", "VAT export needs a re-run", "Q3, after late invoices", "2", "r"],
    ["bank", "Bank portal", "09:38", "New beneficiary added", "Added by Youssef, pending", "1", "f"],
    ["folder", "Drive", "09:41", "3 people edited Tender response", "Aisha, Arjun, Sara", "18", "f"],
    ["bank", "Bank portal", "09:41", "1 employee missing bank details", "WPS run due 25 Nov", "1", "n"],
  ];
  const ease = (a, b) => `cubic-bezier(${a},${b})`;
  const OUT = "cubic-bezier(.22,.61,.36,1)", INOUT = "cubic-bezier(.65,0,.25,1)";
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, p) => a + (b - a) * p;
  const eo = (p) => 1 - Math.pow(1 - clamp(p, 0, 1), 3);
  const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);

  /* ---- build stage ---- */
  const parts = [];
  const add = (html, cls, style) => { const el = document.createElement("div"); el.className = "abs " + (cls || ""); if (style) el.style.cssText = style; el.innerHTML = html; stage.appendChild(el); return el; };
  add('<i></i>ONE ERP', "brand");
  const cap1 = add('<span class="eyebrow">The problem</span><h2 class="h">Your business is<br>in <em>too many apps.</em></h2><p class="sub">Most of it isn\'t for you.</p>', "", "left:64px;top:215px;width:520px");
  const unread = add('<div class="unread"><small>Unread</small><b id="un">0</b></div>', "", "left:64px;top:480px");
  const cap2 = add('<span class="eyebrow">The fix</span><h2 class="h" style="font-size:50px">ONE ERP puts it all <em>in one place.</em></h2>', "", "left:64px;top:96px;width:900px");
  const cap3 = add('<span class="eyebrow">The result</span><h2 class="h" style="font-size:50px">Only <em>decisions</em> reach you.</h2>', "", "left:64px;top:96px;width:900px");
  const colX = [64, 64 + 353 + 30, 64 + 2 * (353 + 30)], colY = 290;
  const cols = [
    add('<span class="lab">Handled by your rules</span><span class="num" data-n="r">0</span><p class="cap">items sorted for you</p>', "col", `left:${colX[0]}px;top:${colY}px`),
    add('<span class="lab">Needs you</span><p class="cap" style="position:absolute;left:26px;bottom:24px">1 decision waiting</p>', "col nd", `left:${colX[1]}px;top:${colY}px`),
    add('<span class="lab">FYI</span><span class="num" data-n="f">0</span><p class="cap">updates in today\'s digest</p>', "col", `left:${colX[2]}px;top:${colY}px`),
  ];
  const fn = add("Sample figures for one working day.", "fn");
  const cards = N.map((n, i) => {
    const x = 560 + ((i * 137) % 330), y = 150 + ((i * 89) % 380), rot = ((i * 53) % 17) - 8;
    const el = add(`<span class="ic">${I[n[0]]}</span><span class="tx"><span>${n[1]} ${n[2]}</span><b>${n[3]}</b><small>${n[4]}</small></span><i class="bd" style="font-style:normal">${n[5]}</i>`, "card " + n[6], `left:${x}px;top:${y}px`);
    el.classList.remove("abs");
    return { el, x, y, rot, b: n[6], i };
  });
  const btnA = add("Review", "rev a", `left:${colX[1] + 26}px;top:${colY + 232}px`);
  const btnB = add("Reviewed ✓", "rev b", `left:${colX[1] + 26}px;top:${colY + 232}px`);
  const ptr = add("", "ptr", "left:0;top:0");
  const fade = add("", "fade");
  const unEl = document.getElementById("un");
  const numR = cols[0].querySelector("[data-n=r]"), numF = cols[2].querySelector("[data-n=f]");

  /* ---- per-frame state, computed from t (seconds) ---- */
  const nIdx = cards.findIndex((c) => c.b === "n");
  const ENTER0 = 0.8, GAP = 0.22;
  function render(t) {
    // captions
    const c1 = seg(t, 0.2, 0.9) * (1 - seg(t, 6.3, 6.9));
    cap1.style.opacity = c1; cap1.style.transform = `translateY(${(1 - eo(seg(t, 0.2, 0.9))) * 18}px)`;
    unread.style.opacity = seg(t, 0.8, 1.3) * (1 - seg(t, 6.2, 6.8));
    unEl.textContent = Math.round(252 * eo(seg(t, 0.9, 5.3)));
    const c2 = seg(t, 7.0, 7.7) * (1 - seg(t, 12.2, 12.7));
    cap2.style.opacity = c2; cap2.style.transform = `translateY(${(1 - eo(seg(t, 7.0, 7.7))) * 16}px)`;
    const c3 = seg(t, 12.7, 13.4);
    cap3.style.opacity = c3; cap3.style.transform = `translateY(${(1 - eo(seg(t, 12.7, 13.4))) * 16}px)`;
    // columns
    cols.forEach((c, k) => { const p = eo(seg(t, 7.0 + k * 0.18, 7.8 + k * 0.18)); c.style.opacity = p; c.style.transform = `translateY(${(1 - p) * 30}px)`; });
    numR.textContent = Math.round(49 * eo(seg(t, 7.6, 9.4)));
    numF.textContent = Math.round(37 * eo(seg(t, 7.8, 9.6)));
    fn.style.opacity = seg(t, 7.4, 8.0);
    // cards
    cards.forEach((c) => {
      const t0 = ENTER0 + c.i * GAP;
      const pIn = eo(seg(t, t0, t0 + 0.8));
      let tx = lerp(680, 0, pIn), ty = lerp(-30, 0, pIn), rot = lerp(c.rot + 10, c.rot, pIn), sc = lerp(.92, 1, pIn), op = pIn;
      if (c.b !== "n") {
        const fl = c.i * 0.05, pO = seg(t, 6.6 + fl, 7.6 + fl), e = pO * pO * (3 - 2 * pO);
        const k = c.b === "r" ? 0 : 2, tcx = colX[k] + 176 - (c.x + 150), tcy = colY + 120 - (c.y + 40);
        tx = lerp(tx, tcx, e); ty = lerp(ty, tcy, e); sc = lerp(sc, .3, e); op = op * (1 - e);
        if (e > 0) rot = lerp(rot, 0, e);
      } else {
        const pO = seg(t, 6.8, 8.2), e = pO * pO * (3 - 2 * pO);
        const tcx = colX[1] + 26 - c.x, tcy = colY + 82 - c.y; // card 300 wide inside 353 col with padding
        tx = lerp(tx, tcx, e); ty = lerp(ty, tcy, e); rot = lerp(rot, 0, e); sc = lerp(sc, 1, e);
      }
      c.el.style.opacity = op;
      c.el.style.transform = `translate(${tx}px,${ty}px) rotate(${rot}deg) scale(${sc})`;
    });
    // review button + pointer
    const bIn = seg(t, 9.6, 10.2), done = seg(t, 11.5, 11.8);
    btnA.style.opacity = eo(bIn) * (1 - done); btnA.style.transform = `translateY(${(1 - eo(bIn)) * 10}px) scale(${1 - 0.06 * Math.sin(Math.PI * seg(t, 11.3, 11.7))})`;
    btnB.style.opacity = done; btnB.style.transform = `scale(${lerp(.9, 1, eo(done))})`;
    const pp = seg(t, 10.2, 11.3), px = lerp(1180, colX[1] + 26 + 70, eo(pp)), py = lerp(560, colY + 232 + 21, eo(pp));
    ptr.style.left = px - 11 + "px"; ptr.style.top = py - 11 + "px"; ptr.style.opacity = seg(t, 10.2, 10.5) * (1 - seg(t, 12.0, 12.4));
    cols[1].style.boxShadow = `0 0 0 ${Math.round(done * 3)}px rgba(45,190,126,${done * 0.55})`;
    // loop fade
    fade.style.opacity = Math.max(1 - seg(t, 0, 0.35), seg(t, D - 0.4, D));
  }

  /* ---- scale stage to box ---- */
  function fit() { const s = box.clientWidth / 1280; stage.style.transform = `scale(${s})`; }
  fit(); addEventListener("resize", fit);

  if (capture) { document.fonts.ready.then(() => { render(parseFloat(q.get("t")) || 0); document.documentElement.dataset.ready = "1"; }); return; }

  /* ---- player ---- */
  const pp = document.getElementById("pp"), scr = document.getElementById("scr"), tm = document.getElementById("tm"), rs = document.getElementById("rs");
  const PLAY = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';
  const PAUSE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let t = reduce ? 13.5 : 0, playing = !reduce, last = 0;
  const mmss = (s) => `0:${String(Math.floor(s)).padStart(2, "0")}`;
  function paint() { render(t); scr.value = t * 1000; tm.textContent = `${mmss(t)} / ${mmss(D)}`; pp.innerHTML = playing ? PAUSE : PLAY; pp.setAttribute("aria-label", playing ? "Pause" : "Play"); }
  function tick(now) { if (playing) { const dt = last ? (now - last) / 1000 : 0; t += Math.min(dt, 0.1); if (t >= D) t = 0; paint(); } last = now; requestAnimationFrame(tick); }
  pp.addEventListener("click", () => { playing = !playing; paint(); });
  rs.addEventListener("click", () => { t = 0; playing = true; paint(); });
  scr.addEventListener("input", () => { t = scr.value / 1000; paint(); });
  document.fonts.ready.then(() => { paint(); requestAnimationFrame(tick); });
})();
