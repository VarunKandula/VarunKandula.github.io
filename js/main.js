(() => {
  // copy email
  const toast = document.querySelector("[data-toast]");
  let toastTimer;
  const say = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  };
  document.querySelectorAll("[data-copy]").forEach((el) =>
    el.addEventListener("click", async (event) => {
      event.preventDefault();
      const v = el.dataset.copy;
      try {
        await navigator.clipboard.writeText(v);
        say(`Copied ${v}`);
      } catch {
        location.href = `mailto:${v}`;
      }
    }),
  );

  // portrait
  const dlg = document.querySelector("[data-portrait-dialog]");
  document.querySelector("[data-portrait]")?.addEventListener("click", () => dlg.showModal());
  document.querySelector("[data-portrait-close]")?.addEventListener("click", () => dlg.close());
  dlg?.addEventListener("click", (event) => {
    if (event.target === dlg) dlg.close();
  });

  // watches
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    parent && parent.appendChild(n);
    return n;
  };
  const polar = (r, deg) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
  };
  const tick = (g, r1, r2, deg, cls, w) => {
    const [x1, y1] = polar(r1, deg);
    const [x2, y2] = polar(r2, deg);
    el("line", { x1, y1, x2, y2, class: cls, "stroke-width": w, "stroke-linecap": "round" }, g);
  };

  const faces = {
    diver(g) {
      el("circle", { cx: 50, cy: 50, r: 46, class: "case", "stroke-width": 1.2 }, g);
      el("circle", { cx: 50, cy: 50, r: 38, class: "case", "stroke-width": 0.6 }, g);
      for (let i = 0; i < 60; i += 5) tick(g, 42.5, i % 15 ? 44 : 45, i * 6, "ink-s", i % 15 ? 0.8 : 1.6);
      el("path", { d: "M50 5.5 l3 4.6 h-6 z", class: "acc" }, g);
      for (let i = 0; i < 12; i++) {
        const [x, y] = polar(32, i * 30);
        if (i % 3) el("circle", { cx: x, cy: y, r: 2.1, class: "ink" }, g);
        else el("rect", { x: x - 1.3, y: y - 3, width: 2.6, height: 6, rx: 0.6, class: "ink", transform: `rotate(${i * 30} ${x} ${y})` }, g);
      }
      return { h: [4, 19, "ink"], m: [2.6, 29, "ink"], s: [0.7, 33, "acc"] };
    },
    dress(g) {
      el("circle", { cx: 50, cy: 50, r: 46, class: "case", "stroke-width": 0.8 }, g);
      for (let i = 0; i < 12; i++) tick(g, 36, i % 3 ? 39 : 41, i * 30, "ink-s", i % 3 ? 0.6 : 0.9);
      const t = el("text", { x: 50, y: 34, "text-anchor": "middle", class: "mute", "font-size": 4.2, "font-family": "Instrument Serif, serif", "letter-spacing": 0.6 }, g);
      t.textContent = "V K";
      return { h: [1.6, 20, "ink"], m: [1, 32, "ink"], s: null };
    },
    field(g) {
      el("circle", { cx: 50, cy: 50, r: 46, class: "case", "stroke-width": 1.2 }, g);
      for (let i = 0; i < 60; i++) tick(g, 41, 43, i * 6, i % 5 ? "mute-s" : "ink-s", i % 5 ? 0.4 : 0.9);
      for (let i = 1; i <= 12; i++) {
        const [x, y] = polar(34, i * 30);
        const t = el("text", { x, y: y + 2.4, "text-anchor": "middle", class: "ink", "font-size": 7, "font-family": "Inter, sans-serif", "font-weight": 500 }, g);
        t.textContent = i;
      }
      return { h: [3, 18, "ink"], m: [2, 28, "ink"], s: [0.6, 36, "acc"] };
    },
    chrono(g) {
      el("circle", { cx: 50, cy: 50, r: 46, class: "case", "stroke-width": 1.2 }, g);
      for (let i = 0; i < 60; i++) tick(g, 40, i % 5 ? 42 : 43.5, i * 6, i % 5 ? "mute-s" : "ink-s", i % 5 ? 0.4 : 1);
      [[32, 50], [68, 50]].forEach(([cx, cy]) => {
        el("circle", { cx, cy, r: 10, class: "case", "stroke-width": 0.5 }, g);
        for (let i = 0; i < 12; i++) {
          const a = ((i * 30 - 90) * Math.PI) / 180;
          el("line", { x1: cx + 8 * Math.cos(a), y1: cy + 8 * Math.sin(a), x2: cx + 9.5 * Math.cos(a), y2: cy + 9.5 * Math.sin(a), class: "mute-s", "stroke-width": 0.4 }, g);
        }
      });
      return { h: [2.6, 20, "ink"], m: [1.8, 33, "ink"], s: [0.5, 38, "acc"], sub: [32, 50] };
    },
  };

  const hand = (g, [w, len, cls]) =>
    el("rect", { x: 50 - w / 2, y: 50 - len, width: w, height: len + 5, rx: w / 2, class: `hand ${cls}` }, g);

  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const watches = [];
  document.querySelectorAll("[data-watch]").forEach((li) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "watch-winder";
    button.setAttribute("aria-label", `Wind the ${li.dataset.name} watch`);
    button.title = "Give it a wind";
    const svg = el("svg", { viewBox: "0 0 100 100", "aria-hidden": "true" });
    const g = el("g", {}, svg);
    const spec = faces[li.dataset.watch](g);
    const hands = { h: hand(g, spec.h), m: hand(g, spec.m) };
    if (spec.s) hands.s = hand(g, spec.s);
    if (spec.sub) {
      const [cx, cy] = spec.sub;
      hands.sub = el("line", { x1: cx, y1: cy, x2: cx, y2: cy - 8, class: "ink-s", "stroke-width": 0.7, "stroke-linecap": "round", style: `transform-origin:${cx}px ${cy}px` }, g);
    }
    el("circle", { cx: 50, cy: 50, r: 1.8, class: spec.s ? spec.s[2] : "ink" }, g);
    button.append(svg);
    li.prepend(button);
    const watch = { hands, li, windingSince: null };
    watches.push(watch);
    button.addEventListener("click", () => {
      if (watch.windingSince !== null) return;
      say("Time well wasted.");
      if (motion.matches) return;
      watch.windingSince = performance.now();
      li.classList.add("is-winding");
    });
  });

  const drawWatches = (now) => {
    const d = new Date();
    const ms = d.getMilliseconds();
    const s = d.getSeconds() + (motion.matches ? 0 : ms / 1000);
    const m = d.getMinutes() + s / 60;
    const h = (d.getHours() % 12) + m / 60;
    for (const watch of watches) {
      let turn = 0;
      if (watch.windingSince !== null) {
        const progress = Math.min((now - watch.windingSince) / 1200, 1);
        if (progress === 1) {
          watch.windingSince = null;
          watch.li.classList.remove("is-winding");
        } else {
          turn = 1 - (1 - progress) ** 3;
        }
      }
      const w = watch.hands;
      w.h.style.transform = `rotate(${h * 30 + turn * 360}deg)`;
      w.m.style.transform = `rotate(${m * 6 + turn * 720}deg)`;
      if (w.s) w.s.style.transform = `rotate(${s * 6 + turn * 1080}deg)`;
      if (w.sub) w.sub.style.transform = `rotate(${s * 6 + turn * 1080}deg)`;
    }
  };

  let watchFrame;
  let watchTimer;
  let watchesVisible = false;
  const stopWatches = () => {
    cancelAnimationFrame(watchFrame);
    clearTimeout(watchTimer);
  };
  const frame = (now) => {
    if (!watchesVisible || document.hidden) return;
    drawWatches(now);
    if (motion.matches) watchTimer = setTimeout(() => frame(performance.now()), 1000 - new Date().getMilliseconds());
    else watchFrame = requestAnimationFrame(frame);
  };
  const syncWatches = () => {
    stopWatches();
    if (!watchesVisible || document.hidden || motion.matches) {
      for (const watch of watches) {
        watch.windingSince = null;
        watch.li.classList.remove("is-winding");
      }
    }
    drawWatches(performance.now());
    if (watchesVisible && !document.hidden) frame(performance.now());
  };
  if (watches.length) {
    drawWatches(performance.now());
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        watchesVisible = entry.isIntersecting;
        syncWatches();
      }).observe(document.querySelector("[data-watches]"));
    } else {
      watchesVisible = true;
      syncWatches();
    }
    document.addEventListener("visibilitychange", syncWatches);
    motion.addEventListener("change", syncWatches);
  }
})();
