/* Industry pages: short, minimal. Reads document.body.dataset.ind and fills the page. */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const { IC, INDICO, INDUSTRIES } = window.CZ_NAV;
  const iwin = (t, b) => `<div class="ic-win"><div class="ic-bar"><i></i><i></i><i></i><span>${t}</span></div><div class="ic-body">${b}</div></div>`;
  const rw = (l, r, c = "") => `<div class="iw-r ${c}"><span>${l}</span><b>${r}</b></div>`;
  const bar = (l, v, low) => `<div class="iw-b${low ? " low" : ""}"><span>${l}</span><i><u style="--w:${v}%"></u></i><b>${v}%</b></div>`;
  const st = (l, r, c = "") => `<div class="iw-s ${c}"><i></i>${l}<em>${r}</em></div>`;
  const M = { finance: ["Finance", "erp-finance.html"], sales: ["Sales", "erp-sales.html"], crm: ["CRM", "erp-crm.html"], inventory: ["Inventory", "erp-inventory.html"], procurement: ["Procurement", "erp-procurement.html"], payroll: ["Payroll", "erp-payroll.html"], hr: ["HR", "erp-hr.html"], operations: ["Operations", "erp-operations.html"] };
  const D = {
    trading: {
      name: "Trading", title: 'Buy abroad, clear at the port, <span class="grad">sell on.</span>',
      lead: "Every shipment costed from the supplier's invoice to the customer's payment, so you know the margin before the goods reach the shelf.",
      win: iwin("SHP-0412 · landed cost", rw("Supplier invoice", "AED 38,400") + rw("Freight", "4,120") + rw("Customs and port", "3,980") + `<div class="iw-stack"><u style="--w:82%"></u><u style="--w:9%"></u><u style="--w:9%"></u></div>` + rw("Landed cost", "AED 46,500", "tot")),
      chip: "1 landed cost to confirm",
      care: [["Landed cost", "Freight, customs and port charges added to what each item really cost."], ["Buying in dollars", "Supplier invoices in one currency, sales in dirhams, the rate difference shown."], ["VAT at 5%", "Import and sales VAT kept on every invoice, ready for your return."], ["Getting paid", "Who owes you, how late, and a reminder already on its way."]],
      day: ["Order placed", "On the water", "Cleared at port", "Sold on", "Paid"],
      mods: ["procurement", "inventory", "sales", "finance"],
      faq: [["Can it cost a shipment with several suppliers?", "Yes. Every invoice, freight bill and customs charge is added to the shipment, then spread across the items in it."], ["Does it handle imports in dollars?", "Yes. Each document keeps its own currency, with the dirham value shown beside it. [Confirm rate sources.]"], ["Can we start with just stock and sales?", "Yes. Start with the modules you need and add others later; they share the same records."]],
    },
    retail: {
      name: "Retail", title: 'Several stores, <span class="grad">one stock.</span>',
      lead: "Every branch's sales and shelves in view, before the busy weekend, not after it.",
      win: iwin("Stock by store", bar("Dubai Mall", 82) + bar("Abu Dhabi", 64) + bar("Sharjah", 18, true) + bar("Ajman", 71)),
      chip: "1 store running short",
      care: [["Stock in every store", "One count per branch, updated with every sale and transfer."], ["Reorder in time", "A purchase order is raised before a shelf runs empty."], ["Daily sales report", "Each store's day, in one report, when the doors close."], ["Moves between stores", "Send stock where it sells, and see it on the way."]],
      day: ["Open", "Sell", "Count", "Reorder", "Report"],
      mods: ["sales", "inventory", "procurement", "finance"],
      faq: [["Does it work with our point of sale?", "ONE ERP includes a point of sale. [Confirm integrations with existing tills.]"], ["Can one item have different prices by store?", "Yes. [Confirm price lists by branch.]"], ["How do we handle stock transfers?", "A transfer is raised in one store and received in the other, so the count is right in both."]],
    },
    manufacturing: {
      name: "Manufacturing", title: 'Know what each product <span class="grad">really costs.</span>',
      lead: "And which missing part will stop the line, while there is still time to order it.",
      win: iwin("WO-218 · Cargo trolley", st("Frame welded", "Done", "ok") + st("Motor fitted", "Done", "ok") + st("Control board", "Missing", "no") + st("Final test", "Waiting")),
      chip: "1 work order waiting for a part",
      care: [["Bill of materials", "Every product's parts and quantities, in one list that stays current."], ["Work orders", "What is being built, by whom, and at which step."], ["Shortages, early", "A missing part is flagged and ordered before it stops the line."], ["True product cost", "Parts, labour and overheads, added up for each unit made."]],
      day: ["Plan", "Buy parts", "Build", "Test", "Ship"],
      mods: ["operations", "inventory", "procurement", "finance"],
      faq: [["Can we cost a product from its parts?", "Yes. The cost is built up from materials, labour and overheads on the work order. [Confirm overhead rules.]"], ["Can a bill of materials have several levels?", "[Confirm multi-level bills of materials.]"], ["Does it connect to purchasing?", "Yes. A shortage can raise a purchase request straight away."]],
    },
    services: {
      name: "Services", title: 'Hours, budgets and invoices <span class="grad">on every project.</span>',
      lead: "The margin is protected while the work is still running, not found out at the end.",
      win: iwin("Project budget · Marina fit-out", `<div class="iw-chart"><u style="--h:34%"></u><u style="--h:48%"></u><u style="--h:57%"></u><u style="--h:71%"></u><u style="--h:88%"></u><u class="hot" style="--h:104%"></u></div>` + rw("Spent", "AED 126K of 120K", "bad") + rw("Margin", "22%")),
      chip: "1 project heading over budget",
      care: [["Hours on the job", "Time logged against the project, by person and by day."], ["Budget against spend", "A warning while there is still room to act."], ["Invoice from the work", "Bill by hours or by milestone, straight from what was done."], ["Margin per project", "What each project really earned, kept up to date."]],
      day: ["Win the work", "Plan it", "Do the work", "Invoice", "Get paid"],
      mods: ["crm", "operations", "hr", "finance"],
      faq: [["Can we bill by milestone as well as by hour?", "Yes. [Confirm billing options.]"], ["Do timesheets feed payroll?", "Yes, when ONE ERP and payroll are used together."], ["Can clients see progress?", "[Confirm client access options.]"]],
    },
  };
  const key = document.body.dataset.ind, d = D[key], n = INDUSTRIES.find((x) => x[0] === d.name), idx = INDUSTRIES.indexOf(n);
  document.documentElement.style.setProperty("--p", n[5]); document.documentElement.style.setProperty("--d", n[6]); document.documentElement.style.setProperty("--b", n[4]);
  $("#in-crumb").innerHTML = `<a href="industries.html">Industries</a>${IC.chev.replace("<svg", '<svg style="transform:rotate(-90deg)"')}<b>${d.name}</b>`;
  $("#in-tile").innerHTML = INDICO[d.name]; $("#in-eyebrow").textContent = "Industries · " + d.name;
  $("#in-h1").innerHTML = d.title; $("#in-lead").textContent = d.lead;
  $("#in-vis").innerHTML = d.win + `<div class="ic-chip"><i></i>${d.chip}</div>`;
  $("#in-care").innerHTML = d.care.map((c, i) => `<article class="in-c rv" style="--d:${i * 0.06}s"><span class="in-n">0${i + 1}</span><h3>${c[0]}</h3><p>${c[1]}</p></article>`).join("");
  $("#in-day").innerHTML = d.day.map((s, i) => `<li class="rv" style="--d:${i * 0.07}s"><i>${i + 1}</i><b>${s}</b></li>`).join("");
  $("#in-mods").innerHTML = d.mods.map((m) => `<a class="in-m" href="${M[m][1]}">${M[m][0]}${IC.arrow}</a>`).join("");
  const acEl = $("#faq-list");
  acEl.innerHTML = d.faq.map((f, i) => `<div class="ac-i${i === 0 ? " open" : ""}"><h3><button class="ac-t" type="button" id="acq${i}" aria-expanded="${i === 0}" aria-controls="aca${i}"><span class="ac-n">0${i + 1}</span><span class="ac-q">${f[0]}</span><span class="ac-ch">${IC.chev}</span></button></h3><div class="ac-c" id="aca${i}" role="region" aria-labelledby="acq${i}"><div><p>${f[1]}</p></div></div></div>`).join("");
  acEl.addEventListener("click", (e) => { const b = e.target.closest(".ac-t"); if (!b) return; const it = b.closest(".ac-i"), was = it.classList.contains("open"); $$(".ac-i", acEl).forEach((x) => { x.classList.remove("open"); $(".ac-t", x).setAttribute("aria-expanded", "false"); }); if (!was) { it.classList.add("open"); b.setAttribute("aria-expanded", "true"); } });
  $("#in-more").innerHTML = INDUSTRIES.filter((x) => x !== n).map((x) => `<a class="in-o" href="${x[2]}" style="--p:${x[5]};--d:${x[6]};--b:${x[4]}"><span class="tile">${INDICO[x[0]]}</span><b>${x[0]}</b>${IC.arrow}</a>`).join("");
  const cm = $("#cta-mark"); if (cm) cm.innerHTML = window.CZ_NAV.mark(100);
  if (window.CZ_shaderBg) window.CZ_shaderBg($(".h2-cta-card"), [0.05, 0.35, 0.85]);
  if (window.ONEERP && ONEERP.observeReveal) ONEERP.observeReveal();
  else { const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .15 }); $$(".rv").forEach((x) => io.observe(x)); }
})();
