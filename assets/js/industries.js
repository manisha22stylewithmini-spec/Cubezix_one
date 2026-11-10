(function () {
  const { ICONS } = window.ONEERP;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const IND = [
    ["Trading", "trading", "Buy abroad, clear at the port, sell on. Every shipment costed from the supplier's invoice to the customer's payment.", "Importers, distributors, wholesalers and re-exporters, on the mainland or in a free zone", "1 landed cost to confirm", "href"],
    ["Retail", "retail", "Several stores, one stock. Every branch's sales and shelves in view, before the busy weekend, not after it.", "Shops, chains, showrooms and online stores", "1 store running short"],
    ["Manufacturing", "manufacturing", "Know what each product really costs, and which missing part will stop the line, while there is still time to order it.", "Fabricators, food producers, packaging and building-materials plants", "1 work order waiting for a part"],
    ["Services", "services", "Hours, budgets and invoices on every project, so the margin is protected while the work is still running.", "Consultancies, agencies, contractors and IT firms", "1 project heading over budget"],
  ];
  const vizHTML = {
    trading: `<div class="stage2 v-trade"><div class="path"><span class="tr1"></span><span class="pf"></span><span class="pt1" style="left:0"></span><span class="pt1" style="left:33%"></span><span class="pt1" style="left:66%"></span><span class="pt1 big" style="left:calc(100% - 14px)"></span></div><div class="lc"><span>Landed, a carton</span><b class="v">AED 36.73</b></div></div>`,
    retail: `<div class="stage2 v-retail"><div class="bars">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<i class="${i === 0 ? "" : ""}" ></i>`).join("")}</div><span class="mk"></span></div>`,
    manufacturing: `<div class="stage2 v-mfg"><div class="ticks">${[0, 1, 2, 3, 4, 5].map((i) => `<div class="${i === 2 ? "cur" : ""}">${i === 2 ? ICONS.clock : ICONS.check}</div>`).join("")}</div></div>`,
    services: `<div class="stage2 v-svc"><span class="top-line"></span><div class="bar6">${[0, 1, 2, 3, 4, 5].map(() => `<i></i>`).join("")}</div></div>`,
  };
  $("#irows").innerHTML = IND.map((r, i) => `<a class="irow rv" data-ind="${r[1]}" id="${r[1]}" href="${i === 0 ? "industries-trading.html" : "#" + r[1]}"><div><h3>${r[0]}</h3><p>${r[2]}</p><div class="who2">${r[3]}</div><span class="rg">Read the guide ${ICONS.arrow}</span></div><div class="viz" data-k="${r[1]}">${vizHTML[r[1]]}<div class="vf"><span>${r[4]}</span><i class="pill1 dark">1</i></div></div></a>`).join("");

  // animate each little viz when it scrolls into view
  const anim = {
    trading(el) {
      const pf = $(".pf", el), pts = $$(".pt1", el), v = $(".v", el);
      pf.style.transition = "width 1.4s cubic-bezier(.22,.7,.2,1)"; pf.style.width = "100%";
      pts.forEach((p, i) => { p.style.transition = `transform .4s ${i * 0.4}s`; p.style.transform = "scale(1)"; });
      const t0 = performance.now(); const from = 36.73, to = 44.78;
      (function tick(t) { const k = Math.min(1, (t - t0) / 1600); v.textContent = "AED " + (from + (to - from) * k).toFixed(2); if (k < 1) requestAnimationFrame(tick); })(t0);
    },
    retail(el) {
      const bars = $$(".bars i", el), W = [88, 74, 66, 72, 60, 70, 64];
      bars.forEach((b, i) => { b.style.width = W[i] + "%"; b.style.marginLeft = (100 - W[i]) + "%"; b.style.transition = `transform .8s ${i * 0.1}s cubic-bezier(.22,.7,.2,1)`; requestAnimationFrame(() => (b.style.transform = "scaleX(1)")); });
      $(".mk", el).style.transition = "opacity .5s 1s"; $(".mk", el).style.opacity = 1;
    },
    manufacturing(el) { $$(".ticks div", el).forEach((d, i) => setTimeout(() => (d.style.opacity = 1), i * 220)); },
    services(el) { $$(".bar6 i", el).forEach((b, i) => setTimeout(() => (b.style.height = 12 + i * 11 + "px"), i * 160)); },
  };
  $$(".viz").forEach((v) => window.ONEERP.inView(v, () => anim[v.dataset.k](v), 0.5));

  // typed industries
  const WORDS = ["construction company", "digital agency", "logistics business", "clinic", "restaurant group", "school", "property management firm"];
  const typed = $("#typed");
  $("#try-list").innerHTML = ["logistics business", "clinic", "restaurant group", "school", "contracting company", "property management firm"].map((w) => `<button type="button">${w}</button>`).join(" · ");
  let wi = 0, ci = 0, del = false, pause = 0, userTyping = false;
  (function type() {
    if (userTyping) return;
    const w = WORDS[wi];
    if (pause) { pause--; return setTimeout(type, 60); }
    ci += del ? -1 : 1;
    typed.textContent = w.slice(0, ci);
    if (!del && ci === w.length) { del = true; pause = 22; }
    else if (del && ci === 0) { del = false; wi = (wi + 1) % WORDS.length; pause = 4; }
    setTimeout(type, del ? 35 : 75);
  })();
  const input = $("#ask-in");
  input.addEventListener("focus", () => { userTyping = true; typed.textContent = input.value; });
  input.addEventListener("input", () => { userTyping = true; typed.textContent = input.value; $("#pl-ind").textContent = input.value || "business"; });
  $("#try-list").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; userTyping = true; input.value = b.textContent; typed.textContent = b.textContent; $("#pl-ind").textContent = b.textContent; });
  $("#ask").addEventListener("submit", (e) => { e.preventDefault(); location.href = "book-a-demo.html?industry=" + encodeURIComponent(input.value || typed.textContent); });
  window.ONEERP.observeReveal();
})();
