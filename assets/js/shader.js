/* WebGL waves background (logo colours). Used by pages that do not load home2.js. */
(function () {
  function shaderBg(card, stops = [0, 0.5, 1]) {
    if (!card) return;
    const canvas = document.createElement("canvas"); canvas.className = "cta-shader"; canvas.setAttribute("aria-hidden", "true");
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false }); if (!gl) return;
    card.prepend(canvas); card.classList.add("has-shader");
    const VERT = "attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}";
    const FRAG = "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform vec3 u_colors[8];\nuniform vec4 u_scene;\nuniform vec4 u_shape;\nuniform vec4 u_surface;\nuniform vec4 u_finish;\nuniform vec4 u_transform;\nuniform vec4 u_space;\nuniform vec4 u_cursor;\n#define u_resolution u_scene.xy\n#define u_time u_scene.z\n#define u_colorCount u_scene.w\n#define u_scale u_shape.x\n#define u_intensity u_shape.y\n#define u_paramA u_shape.z\n#define u_warp u_shape.w\n#define u_detail u_surface.x\n#define u_contrast u_surface.y\n#define u_brightness u_surface.z\n#define u_saturation u_surface.w\n#define u_hue u_finish.x\n#define u_vignette u_finish.y\n#define u_blur u_finish.z\n#define u_grain u_finish.w\n#ifdef GL_FRAGMENT_PRECISION_HIGH\n#define u_seed u_transform.x\n#else\n#define u_seed mod(u_transform.x, 31.0)\n#endif\n#define u_rotate u_transform.y\n#define u_drift u_transform.z\n#define u_oklab u_transform.w\n#define u_offset u_space.xy\n#define u_mouse u_space.zw\nfloat hash21(vec2 p) {\n#ifndef GL_FRAGMENT_PRECISION_HIGH\n  p = mod(p, 31.0);\n#endif\n  p = fract(p * vec2(234.34, 435.345));\n  p += dot(p, p + 34.23);\n  return fract(p.x * p.y);\n}\nfloat grainHash(vec2 p) {\n  vec3 p3 = fract(vec3(p.xyx) * 0.1031);\n  p3 += dot(p3, p3.yzx + 33.33);\n  return fract((p3.x + p3.y) * p3.z);\n}\nfloat noise(vec2 p) {\n  vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);\n  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x), mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);\n}\nfloat fbm(vec2 p) {\n  float v = 0.0; float a = 0.5;\n  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + vec2(17.0, 9.2); a *= 0.5; }\n  return v;\n}\nuniform vec3 u_stops;\nvec3 palette(float x) {\n  x = clamp(x, 0.0, 1.0);\n  vec3 col = mix(u_colors[0], u_colors[1], smoothstep(u_stops.x, u_stops.y, x));\n  return mix(col, u_colors[2], smoothstep(u_stops.y, u_stops.z, x));\n}\nvec3 shade(vec2 uv, vec2 p, float t) {\n  float y = uv.y + sin(uv.x * (3.0 + u_intensity * 9.0) + t * 0.8) * 0.08 + (fbm(p * 2.0 + t * 0.1) - 0.5) * u_intensity * 0.6;\n  return palette(y);\n}\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\n  vec2 screenUv = uv;\n  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);\n  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;\n  p *= u_scale;\n  if (abs(u_rotate) > 0.0001) { float cr = cos(u_rotate), sr = sin(u_rotate); p = mat2(cr, -sr, sr, cr) * p; }\n  p += u_offset;\n  if (u_drift > 0.0001) p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));\n  if (u_warp > 0.0) p += u_warp * (vec2(fbm(p * u_detail + u_seed), fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);\n  vec3 col;\n  if (u_blur > 0.0) {\n    float e = u_blur; float pe = e * u_scale;\n    vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;\n    col  = shade(uv, p, u_time) * 0.36;\n    col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;\n    col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;\n    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;\n    col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;\n  } else { col = shade(uv, p, u_time); }\n  if (abs(u_contrast - 1.0) > 0.0001) col = (col - 0.5) * u_contrast + 0.5;\n  if (abs(u_saturation - 1.0) > 0.0001) { float luma = dot(col, vec3(0.299, 0.587, 0.114)); col = mix(vec3(luma), col, u_saturation); }\n  if (abs(u_brightness) > 0.0001) col += u_brightness;\n  if (u_vignette > 0.0001) { float vd = length(screenUv - 0.5) * 1.41421356; col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd); }\n  if (u_grain > 0.0001) col += (grainHash(gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;\n  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);\n}";
    const U = { colors: [[0.388235, 0.227451, 0.866667], [0.227451, 0.298039, 0.882353], [0.501961, 0.819608, 0.831373], [0.501961, 0.819608, 0.831373], [0.501961, 0.819608, 0.831373], [0.501961, 0.819608, 0.831373], [0.501961, 0.819608, 0.831373], [0.501961, 0.819608, 0.831373]], colorCount: 3, scale: 2.0, intensity: 0.54, paramA: 0.47, warp: 0.042, detail: 1.536, contrast: 1.12, brightness: -0.02, saturation: 1.0, hue: 0, vignette: 0.21, blur: 0.002, grain: 0.07, seed: 4012.0, rotate: 5.6549, offsetX: 0.11, offsetY: -0.19, drift: 0.116, oklab: 0, timeScale: -0.727 };
    const sh = (t, src) => { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.remove(); card.classList.remove("has-shader"); return; }
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_position"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const L = (n) => gl.getUniformLocation(prog, n);
    const uScene = L("u_scene"), uSpace = L("u_space");
    gl.uniform3fv(L("u_colors"), new Float32Array(U.colors.flat())); gl.uniform3f(L("u_stops"), stops[0], stops[1], stops[2]);
    gl.uniform4f(L("u_shape"), U.scale, U.intensity, U.paramA, U.warp);
    gl.uniform4f(L("u_surface"), U.detail, U.contrast, U.brightness, U.saturation);
    gl.uniform4f(L("u_finish"), U.hue, U.vignette, U.blur, U.grain);
    gl.uniform4f(L("u_transform"), U.seed, U.rotate, U.drift, U.oklab);
    gl.uniform4f(L("u_cursor"), 0, 2, 0.65, 0.46);
    gl.uniform4f(uSpace, U.offsetX, U.offsetY, 0, 0);
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, inView = false, visible = document.visibilityState === "visible";
    const start = performance.now();
    const fit = () => {
      const b = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      let w = Math.max(1, Math.round(b.width * dpr)), h = Math.max(1, Math.round(b.height * dpr));
      const k = Math.min(1, Math.sqrt(2000000 / (w * h))); w = Math.round(w * k); h = Math.round(h * k);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    };
    const render = (now) => {
      raf = 0; if (!inView || !visible) return;
      fit();
      gl.uniform4f(uScene, canvas.width, canvas.height, still ? 0 : ((now - start) / 1000) * U.timeScale, U.colorCount);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!still) raf = requestAnimationFrame(render);
    };
    const go = () => { if (!raf && inView && visible) raf = requestAnimationFrame(render); };
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; if (inView) go(); else if (raf) { cancelAnimationFrame(raf); raf = 0; } }, { rootMargin: "100px" }).observe(card);
    document.addEventListener("visibilitychange", () => { visible = document.visibilityState === "visible"; if (visible) go(); });
    addEventListener("resize", () => { if (still) { raf = 0; go(); } });
  }
  window.CZ_shaderBg = shaderBg;
})();
