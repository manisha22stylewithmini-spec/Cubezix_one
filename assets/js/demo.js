(function () {
  const { ICONS, av, store } = window.ONEERP;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  $(".sent-line").innerHTML = `${ICONS.check.replace("<svg", '<svg width="14" height="14" style="color:var(--ok)"')}<span>Handed to your dedicated contact</span><span class="t" id="sent-t"></span>`;
  $(".who-c .av").innerHTML = ICONS.users.replace("<svg", '<svg width="15" height="15"');

  const form = $("#demo-form");
  const f = (n) => $(`[name=${n}]`, form);
  let size = "", notes = new Set(), sent = false;

  // prefill from the homepage form and the ?industry= link
  const draft = store.get("draft", {}) || {};
  ["name", "email", "company", "phone"].forEach((k) => { if (draft[k]) f(k).value = draft[k]; });
  if (draft.size) { size = draft.size; $$("#size-chips button").forEach((b) => b.classList.toggle("on", b.textContent === size)); }
  const ind = new URLSearchParams(location.search).get("industry");
  if (ind) { $("#ind-fld").classList.remove("hide"); f("industry").value = ind; }

  function crm() {
    const v = (k) => f(k).value.trim();
    const name = v("name"), first = name.split(" ")[0] || "";
    const row = (k, val, mono) => `<div class="row"><span class="k">${k}</span><span class="v ${mono ? "mono" : ""}">${val}</span></div>`;
    const dash = '<span style="color:var(--faint)">—</span>';
    $("#crm").className = "card crm rv in" + (sent ? " rcv" : "");
    $("#crm").innerHTML = `<div class="ticket-head"><span class="ticket-ico">${ICONS.inbox}</span><div><div class="ticket-meta" style="font-family:var(--mono);font-size:10.5px">CRM · from cubezixone.com</div><div class="ticket-title">Demo request <span class="mono">DR-2026-0141</span></div></div>${sent || v("name") ? `<span class="needs">Needs you <i class="pill1">1</i></span>` : ""}</div>
      <div class="rows">${row("Company", v("company") || dash)}${row("Company size", size || dash)}${row("From", name ? `${av(name, "", 1)} ${first}` : dash)}${row("Work email", v("email") ? v("email") : dash, true)}${row("Phone", v("phone") || (name ? "Not given" : dash))}${ind || v("industry") ? row("Industry", v("industry") || dash) : ""}${notes.size ? row("Notes", [...notes].join(", ")) : ""}</div>
      <div class="cf">${sent ? `${ICONS.check.replace("<svg", '<svg width="13" height="13" style="color:var(--ok)"')} Received <span class="t">${$("#sent-t").textContent}</span>` : "Preview · not sent"}</div>`;
    $("#d-st").textContent = sent ? "1 thing: your demo" : name ? "1 thing: your demo" : "Nothing waiting";
  }
  $$("input", form).forEach((i) => i.addEventListener("input", crm));
  $("#size-chips").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; size = b.textContent; $$("#size-chips button").forEach((x) => x.classList.toggle("on", x === b)); crm(); });
  $("#know-chips").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; b.classList.toggle("on"); b.classList.contains("on") ? notes.add(b.textContent) : notes.delete(b.textContent); crm(); });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (sent) return;
    const bad = ["name", "email", "company"].filter((k) => !f(k).value.trim());
    if (bad.length) { f(bad[0]).focus(); bad.forEach((k) => (f(k).style.borderColor = "var(--danger)")); return; }
    sent = true;
    const d = new Date(), t = [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, "0")).join(":");
    $("#sent-t").textContent = t;
    form.classList.add("is-sent");
    $("#d-title").innerHTML = `All caught up. <span class="gray" style="font-weight:500">It's</span> ours <span class="gray" style="font-weight:500">now.</span>`;
    $("#d-msg").textContent = "It's on their list now, not yours. They'll reply [within one working day] to arrange a time that suits you.";
    store.set("draft", {});
    window.ONEERP.clear();
    crm();
  });
  $$("input", form).forEach((i) => i.addEventListener("input", () => (i.style.borderColor = "")));
  if (store.get("cleared", false)) { /* a returning visitor who already booked still sees the form */ }
  crm();
  window.ONEERP.observeReveal();
})();
