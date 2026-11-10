/* Shared shell: header, footer, icons, state, scroll helpers */
(function () {
  const S = (d, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
  const ICONS = {
    check: S('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    warn: S('<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17.2v.1"/>'),
    chev: S('<path d="M6 9l6 6 6-6"/>'),
    arrow: S('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    doc: S('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>'),
    bank: S('<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>'),
    users: S('<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.6 3-5.2 6-5.2s5.4 1.6 6 5.2M16 5.4a3 3 0 010 5.4M18.5 14.8c1.6.6 2.5 2.2 2.8 4.2"/>'),
    wallet: S('<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18M16 14.5h2"/>'),
    box: S('<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>'),
    cart: S('<path d="M3 4h2.5l2 11h10l2-8H6.5"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>'),
    target: S('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>'),
    truck: S('<path d="M2 6h11v10H2zM13 9h5l3 3.5V16h-8"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>'),
    pinI: S('<path d="M9 3h6l-1 6 3 3v1.5H7V12l3-3z"/><path d="M12 13.5V21"/>'),
    clock: S('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
    mail: S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>'),
    chat: S('<path d="M4 5h16v11H9l-5 4z"/>'),
    cal: S('<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
    list: S('<path d="M8 6h12M8 12h12M8 18h12M4 6h.1M4 12h.1M4 18h.1"/>'),
    shield: S('<path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z"/>'),
    cog: S('<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>'),
    cur: S('<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.2c-.6-.8-1.6-1.2-2.7-1.2-1.6 0-2.8.9-2.8 2.1 0 3 5.8 1.3 5.8 4.2 0 1.2-1.2 2.1-2.9 2.1-1.2 0-2.3-.5-3-1.4M12 6.3V8M12 16v1.7"/>'),
    plug: S('<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0zM12 17v4"/>'),
    inbox: S('<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 2h6l1-2h5"/>'),
    x: S('<path d="M6 6l12 12M18 6L6 18"/>'),
    cube: S('<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>'),
  };
  const AVC = ["#7896B0", "#A57CD2", "#4AA969", "#0AA7A4", "#C670AB", "#C48225", "#D67064", "#8B939C"];
  const av = (name, cls = "", i) => {
    const initials = name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const c = AVC[(i !== undefined ? i : name.charCodeAt(0)) % AVC.length];
    return `<span class="av ${cls}" style="--c:${c}">${initials}</span>`;
  };

  const store = {
    get(k, d) { try { const v = sessionStorage.getItem("oneerp:" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { sessionStorage.setItem("oneerp:" + k, JSON.stringify(v)); } catch (e) {} },
  };

  const page = document.body.dataset.page || "";
  const NAV = [["product.html", "Product", "product"], ["industries.html", "Industries", "industries"], ["pricing.html", "Pricing", "pricing"], ["customers.html", "Customers", "customers"], ["company.html", "Company", "company"]];
  const logo = (cls = "") => `<span class="logo ${cls}"><span class="logo-o"><i>1</i></span><b>NE</b><span class="rp">ERP</span></span>`;

  const CZ = window.CZ_NAV;
  const header = document.createElement("header");
  header.className = "site-header cz";
  header.innerHTML = CZ.headerHTML(page);
  document.body.prepend(header);
  let bar = null;
  try { if (!sessionStorage.getItem("cz:bar")) { const tpl = document.createElement("div"); tpl.innerHTML = CZ.announceHTML(); bar = tpl.firstElementChild; document.body.prepend(bar); } } catch (e) {}
  CZ.bind(header, bar);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = CZ.footerHTML();
  document.body.appendChild(footer);

  // pending state ("one thing needs you") drives the logo badge, tab title, footer status
  const TITLES = { home: "Run your whole company from one place", oneerp: "The one thing that needs you", product: "Product", industries: "Industries", "industries-trading": "ONEERP for trading businesses in the UAE", demo: "Book a demo" };
  function applyPending() {
    const cleared = store.get("cleared", false);
    document.body.classList.toggle("has-pending", !cleared);
    const base = TITLES[page] || "ONEERP";
    document.title = (page === "home") ? "CubeZixONE · ERP, helpdesk, assets, HR and e-sign for UAE businesses" : cleared ? "ONEERP · All caught up" : `(1) ONEERP · ${base}`;
  }
  window.ONEERP = { ICONS, av, store, applyPending, logo, clear() { store.set("cleared", true); applyPending(); } };
  applyPending();

  // One rAF-batched scroll pump for every scroll-driven effect on the page.
  const scrollFns = [];
  let ticking = false;
  const pump = () => { ticking = false; for (const fn of scrollFns) fn(); };
  const onScrollEvt = () => { if (!ticking) { ticking = true; requestAnimationFrame(pump); } };
  addEventListener("scroll", onScrollEvt, { passive: true });
  addEventListener("resize", onScrollEvt, { passive: true });
  window.ONEERP.onScroll = (fn) => { scrollFns.push(fn); fn(); };

  // Smooth, inertial scrolling (skipped for people who ask for reduced motion).
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new window.Lenis({ lerp: 0.11, wheelMultiplier: 0.95, smoothWheel: true });
    const loop = (t) => { lenis.raf(t); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
    document.documentElement.classList.add("lenis-on");
  }
  window.ONEERP.scrollTo = (target, opts = {}) => {
    const offset = opts.offset ?? -84;
    if (lenis) return lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : offset, duration: 1.1 });
    const top = typeof target === "number" ? target : target.getBoundingClientRect().top + scrollY + offset;
    scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute("href").length < 2) return;
    const t = document.querySelector(a.getAttribute("href"));
    if (!t) return;
    e.preventDefault();
    window.ONEERP.scrollTo(t);
    header.classList.remove("open","m-open"); document.documentElement.classList.remove("no-scroll");
  });

  // header: hairline when scrolled, dark when over a dark section
  let lastScrolled = null, lastDark = null;
  window.ONEERP.onScroll(() => {
    CZ.offset(header);
    const scrolled = scrollY > 8;
    const dark = [...document.querySelectorAll("[data-theme=dark]")].some((d) => { const r = d.getBoundingClientRect(); return r.top <= 40 && r.bottom >= 40; });
    if (scrolled !== lastScrolled) { header.classList.toggle("scrolled", scrolled); lastScrolled = scrolled; }
    if (dark !== lastDark) { header.classList.toggle("on-dark", dark); lastDark = dark; }
  });

  // reveal on scroll
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  window.ONEERP.observeReveal = (root = document) => root.querySelectorAll(".rv:not(.in)").forEach((el) => io.observe(el));
  window.ONEERP.observeReveal();

  // generic helpers
  window.ONEERP.progress = (el) => { const r = el.getBoundingClientRect(); const total = r.height - innerHeight; return Math.min(1, Math.max(0, -r.top / Math.max(1, total))); };
  window.ONEERP.clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  window.ONEERP.ease = (t) => 1 - Math.pow(1 - t, 3);
  window.ONEERP.fmt = (n, d = 2) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  window.ONEERP.rates = { AED: 1, SAR: 3.75 / 3.6725, USD: 1 / 3.6725 };
  window.ONEERP.inView = (el, cb, th = 0.35) => { const o = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { cb(e.target); o.unobserve(el); } }), { threshold: th }); o.observe(el); };

  // hash scrolling for in-page module anchors
  if (location.hash) setTimeout(() => { const t = document.querySelector(location.hash); if (t) window.ONEERP.scrollTo(t); }, 400);
})();
