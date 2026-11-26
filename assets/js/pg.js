/* Careers, Blog and article pages. */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const page = document.body.dataset.page;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ================= careers ================= */
  if (page === "careers") {
    const TEAMS = ["Engineering", "Product and design", "Customer success", "Sales"];
    const ROLES = [
      ["Senior full-stack engineer", "Engineering", "Full time", "Build the modules UAE companies run on, from payroll runs to bank reconciliation, and own features end to end.", ["Design and ship features across the ERP, from database to screen", "Work with customers to understand how finance and HR teams really work", "Keep the code clean, tested and fast", "5+ years building web products; experience with business software is a plus"]],
      ["Frontend engineer", "Engineering", "Full time", "Make dense business screens feel simple: tables, forms and dashboards that finance teams use all day.", ["Build accessible, fast interfaces for web and mobile", "Turn designs into reusable components", "Care about the details: keyboard use, loading states, empty states", "3+ years with modern JavaScript frameworks"]],
      ["QA engineer", "Engineering", "Full time", "Make sure a payroll run, a VAT return and a stock count are right before a customer relies on them.", ["Write and run test plans for each release", "Automate the checks that matter most", "Reproduce customer issues and get them fixed", "Experience testing finance or ERP software is a strong plus"]],
      ["Product designer", "Product and design", "Full time", "Design the screens behind payslips, purchase orders and month-end closes, and make them obvious.", ["Lead design from research to shipped screens", "Sit with customers and watch how they work", "Keep the design system consistent across five products", "A portfolio showing complex workflows made simple"]],
      ["ERP implementation consultant", "Customer success", "Full time", "Take new customers from the first workshop to go-live: set up their modules, move their data and train their teams.", ["Run setup workshops with finance, HR and operations teams", "Configure modules and migrate data from spreadsheets and old systems", "Train users and stay on as their dedicated contact", "Knowledge of UAE VAT, WPS or inventory processes"]],
      ["Customer success manager (Arabic and English)", "Customer success", "Full time", "Be the one person our customers call, and make sure they get real value every month.", ["Look after a group of customers after go-live", "Spot problems early and fix them with the product team", "Help customers adopt more of the platform", "Fluent Arabic and English"]],
      ["Account executive", "Sales", "Full time", "Show UAE business owners how one platform replaces their spreadsheets, and help them choose where to start.", ["Run discovery calls and demos", "Shape proposals around how each company works", "Work closely with implementation for a smooth handover", "B2B software sales experience in the UAE or GCC"]],
    ];
    const f = $("#cr-filter"), list = $("#cr-list"), role = $("#cr-role");
    let team = "All";
    const counts = Object.fromEntries(TEAMS.map((t) => [t, ROLES.filter((r) => r[1] === t).length]));
    f.innerHTML = ["All", ...TEAMS].map((t) => `<button type="button" aria-pressed="${t === "All"}" data-t="${t}">${t}<span>${t === "All" ? ROLES.length : counts[t]}</span></button>`).join("");
    const draw = () => {
      const rows = ROLES.filter((r) => team === "All" || r[1] === team);
      list.innerHTML = rows.length ? rows.map((r) => `<article class="cr-job"><div><h3>${r[0]}</h3><p>${r[3]}</p><div class="cr-meta"><span class="t">${r[1]}</span><span>Dubai · on site</span><span>${r[2]}</span></div></div><a class="btn btn-primary" href="#apply" data-role="${esc(r[0])}">Apply</a>
        <details><summary>What you'll do</summary><ul>${r[4].map((x) => `<li>${x}</li>`).join("")}</ul></details></article>`).join("") : `<p class="cr-empty">No open roles in this team right now. Send an open application below.</p>`;
    };
    draw();
    role.innerHTML = `<option>Open application</option>` + ROLES.map((r) => `<option>${r[0]}</option>`).join("");
    f.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; team = b.dataset.t; $$("button", f).forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); });
    list.addEventListener("click", (e) => { const a = e.target.closest("[data-role]"); if (a) role.value = a.dataset.role; });
    $("#cr-form").addEventListener("submit", (e) => { e.preventDefault(); const fm = e.currentTarget; if (!fm.checkValidity()) { fm.reportValidity(); return; } fm.classList.add("sent"); });
  }

  /* ================= blog ================= */
  const B = window.CZ_BLOG;
  const art = (p, big) => {
    const c = B.cats[p.cat];
    const shapes = {
      vat: `<g fill="#fff"><rect x="62%" y="22%" width="22%" height="58%" rx="10" fill-opacity=".9"/><rect x="54%" y="18%" width="22%" height="58%" rx="10" fill-opacity=".55"/></g>`,
      people: `<g fill="#fff"><circle cx="62%" cy="44%" r="34" fill-opacity=".85"/><circle cx="76%" cy="52%" r="26" fill-opacity=".5"/><circle cx="50%" cy="58%" r="22" fill-opacity=".35"/></g>`,
      stock: `<g fill="#fff"><rect x="56%" y="40%" width="16%" height="28%" rx="6" fill-opacity=".85"/><rect x="73%" y="40%" width="16%" height="28%" rx="6" fill-opacity=".55"/><rect x="64%" y="16%" width="16%" height="23%" rx="6" fill-opacity=".7"/></g>`,
      news: `<g fill="#fff"><circle cx="68%" cy="46%" r="46" fill-opacity=".25"/><circle cx="68%" cy="46%" r="26" fill-opacity=".85"/></g>`,
    };
    return `<div class="bl-art" style="--a1:${c.a1};--a2:${c.a2}" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"><defs><pattern id="d-${p.slug}${big ? "b" : ""}" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.2" fill="#fff" fill-opacity=".18"/></pattern></defs><rect width="100%" height="100%" fill="url(#d-${p.slug}${big ? "b" : ""})"/>${shapes[p.cat]}</svg><strong class="bl-k">${p.k || ""}</strong><b>${c.name}</b></div>`;
  };
  const tag = (p) => { const c = B.cats[p.cat]; return `<span class="bl-tag" style="--ts:${c.ts};--tc:${c.tc}">${c.name}</span>`; };
  const meta = (p) => `<span class="bl-meta"><span>${p.date}</span><i></i><span>${p.read} min read</span></span>`;
  const link = (p) => `post.html?p=${p.slug}`;
  const card = (p) => `<a class="bl-card rv" href="${link(p)}">${art(p)}<div class="bl-body">${tag(p)}<h3>${p.title}</h3><p>${p.lead}</p>${meta(p)}</div></a>`;

  if (page === "blog" && B && !document.body.dataset.post) {
    const cats = $("#bl-cats"), q = $("#bl-q"), feat = $("#bl-feat"), grid = $("#bl-grid");
    let cat = "all";
    cats.innerHTML = [["all", "All", B.posts.length], ...Object.entries(B.cats).map(([k, c]) => [k, c.name, B.posts.filter((p) => p.cat === k).length])].map((x) => `<button type="button" aria-pressed="${x[0] === "all"}" data-c="${x[0]}">${x[1]}<span>${x[2]}</span></button>`).join("");
    const draw = () => {
      const term = q.value.trim().toLowerCase();
      const hits = B.posts.filter((p) => (cat === "all" || p.cat === cat) && (!term || (p.title + " " + p.lead + " " + B.cats[p.cat].name + " " + JSON.stringify(p.body)).toLowerCase().includes(term)));
      const showFeat = cat === "all" && !term;
      const f = showFeat ? hits.find((p) => p.featured) : null;
      feat.innerHTML = f ? `<a class="bl-feat rv in" href="${link(f)}">${art(f, true)}<div class="bl-body">${tag(f)}<h2>${f.title}</h2><p>${f.lead}</p>${meta(f)}</div></a>` : "";
      const rest = hits.filter((p) => p !== f);
      grid.innerHTML = rest.length ? rest.map(card).join("") : (f ? "" : `<p class="bl-none">No guides match “${esc(q.value)}”. Try VAT, WPS or stock.</p>`);
      $$(".rv", grid).forEach((x) => x.classList.add("in"));
    };
    draw();
    cats.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; cat = b.dataset.c; $$("button", cats).forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); });
    q.addEventListener("input", draw);
    $("#bl-sub").addEventListener("submit", (e) => { e.preventDefault(); const fm = e.currentTarget; if (!fm.checkValidity()) { fm.reportValidity(); return; } fm.classList.add("sent"); });
  }

  /* ================= article ================= */
  if (document.body.dataset.post && B) {
    const slug = new URLSearchParams(location.search).get("p");
    const p = B.posts.find((x) => x.slug === slug) || B.posts[0];
    const c = B.cats[p.cat];
    document.title = `${p.title} · CubeZixONE`;
    const md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute("content", p.lead);
    $("#ar-head").innerHTML = `<a class="ar-back" href="blog.html">← All guides</a><div style="margin-top:22px">${tag(p)}</div><h1>${p.title}</h1><p class="ar-lead">${p.lead}</p><div class="ar-by"><i>CZ</i><span>CubeZixONE team<small>${p.date} · ${p.read} min read</small></span></div>`;
    const cov = $("#ar-cover"); cov.outerHTML = art(p, true).replace('class="bl-art"', 'class="bl-art ar-cover" id="ar-cover"');
    let n = 0;
    const B2 = (b) => {
      if (b[0] === "h") { n++; return `<h2 id="s${n}">${b[1]}</h2>`; }
      if (b[0] === "p") return `<p>${b[1]}</p>`;
      if (b[0] === "ul" || b[0] === "ol") return `<${b[0]}>${b[1].map((x) => `<li>${x}</li>`).join("")}</${b[0]}>`;
      if (b[0] === "call") return `<div class="ar-call"><b>${b[1]}</b>${b[2]}</div>`;
      if (b[0] === "ex") return `<div class="ar-ex">${b[1].map((r) => `<div${r[2] === "h" ? ' class="h"' : ""}><span>${r[0]}</span><span>${r[1]}</span></div>`).join("")}</div>`;
      return "";
    };
    const body = p.body.map(B2).join("");
    const help = p.help ? `<div class="ar-help"><b>How CubeZixONE helps</b><p>${p.help.text}</p>${p.help.links.map((l) => `<a href="${l[1]}">${l[0]} →</a>`).join("")}</div>` : "";
    $("#ar-body").innerHTML = body + help + (p.legal ? `<p class="ar-disc">This guide is general information, not legal or tax advice. Rules change; check the latest official guidance or speak to an adviser before acting on it.</p>` : "");
    const heads = $$("#ar-body h2");
    $("#ar-toc").innerHTML = `<b>On this page</b>` + heads.map((h) => `<a href="#${h.id}">${h.textContent}</a>`).join("");
    const links = $$("#ar-toc a");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id)); }), { rootMargin: "-20% 0px -70% 0px" });
    heads.forEach((h) => io.observe(h));
    const more = B.posts.filter((x) => x !== p).sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat)).slice(0, 3);
    $("#ar-more").innerHTML = more.map(card).join("");
  }

  /* ================= shared ================= */
  const cm = $("#cta-mark"); if (cm && window.CZ_NAV) cm.innerHTML = window.CZ_NAV.mark(100);
  if (window.CZ_shaderBg) window.CZ_shaderBg($(".h2-cta-card"), [0.05, 0.35, 0.85]);
  if (window.ONEERP && ONEERP.observeReveal) ONEERP.observeReveal();
  else { const ro = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), ro.unobserve(e.target))), { threshold: 0.12 }); $$(".rv").forEach((x) => ro.observe(x)); }
})();
