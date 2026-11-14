(function () {
  const cm = document.getElementById("cta-mark"); if (cm) cm.innerHTML = window.CZ_NAV.mark(100);
  if (window.CZ_shaderBg) window.CZ_shaderBg(document.querySelector(".h2-cta-card"), [0.05, 0.35, 0.85]);
  if (window.ONEERP && ONEERP.observeReveal) ONEERP.observeReveal();
  else { const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .15 }); document.querySelectorAll(".rv").forEach((x) => io.observe(x)); }
})();
