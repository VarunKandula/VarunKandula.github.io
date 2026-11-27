(() => {
  const tag = document.querySelector("[data-squash-trigger]");
  const dialog = document.querySelector("[data-squash-dialog]");
  const court = document.querySelector("[data-squash-court]");
  if (!tag || !dialog || !court) return;

  // Leave a normal interest tag in place when JavaScript is unavailable.
  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "squash-trigger";
  trigger.title = "Up for a rally?";
  trigger.setAttribute("aria-label", "Squash — play a quick rally");
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.append(...tag.childNodes);
  tag.append(trigger);
  tag.classList.add("has-squash-game");

  const play = dialog.querySelector("[data-squash-play]");
  const status = dialog.querySelector("[data-squash-status]");
  const score = dialog.querySelector("[data-squash-score]");
  const bestScore = dialog.querySelector("[data-squash-best]");
  const ball = dialog.querySelector("[data-squash-ball]");
  const racket = dialog.querySelector("[data-squash-racket]");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const keys = new Set();
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const racketY = 292;
  const halfRacket = 36;
  const radius = 5;
  let racketX = 200;
  let x = 200;
  let y = 250;
  let vx = 0;
  let vy = 0;
  let rally = 0;
  let best = 0;
  let state = "ready";
  let frameId;
  let lastFrame = 0;

  const speed = () => motion.matches ? Math.min(180 + rally * 6, 240) : Math.min(270 + rally * 12, 420);
  const draw = () => {
    ball.setAttribute("cx", x);
    ball.setAttribute("cy", y);
    racket.setAttribute("transform", `translate(${racketX} ${racketY})`);
  };
  const setState = (next, message) => {
    state = next;
    dialog.dataset.state = next;
    play.textContent = { ready: "Serve", playing: "Pause", paused: "Resume", over: "Again?" }[next];
    status.textContent = message;
  };
  const stop = () => {
    cancelAnimationFrame(frameId);
    lastFrame = 0;
    keys.clear();
  };
  const pause = () => {
    if (state !== "playing") return;
    stop();
    setState("paused", "Take your time.");
  };
  const updateScore = () => {
    best = Math.max(best, rally);
    score.textContent = String(rally).padStart(2, "0");
    bestScore.textContent = String(best).padStart(2, "0");
  };
  const reset = () => {
    stop();
    racketX = x = 200;
    y = 250;
    rally = 0;
    updateScore();
    draw();
    setState("ready", "You found the squash court.");
  };

  const frame = (now) => {
    if (state !== "playing" || !dialog.open || document.hidden) {
      pause();
      return;
    }
    const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.032) : 0;
    lastFrame = now;
    const direction = Number(keys.has("ArrowRight")) - Number(keys.has("ArrowLeft"));
    racketX = clamp(racketX + direction * 360 * dt, 18 + halfRacket, 382 - halfRacket);

    const previousX = x;
    const previousY = y;
    x += vx * dt;
    y += vy * dt;
    if (x < 18 + radius) { x = 18 + radius; vx = Math.abs(vx); }
    if (x > 382 - radius) { x = 382 - radius; vx = -Math.abs(vx); }
    if (y < 18 + radius) { y = 18 + radius; vy = Math.abs(vy); }

    // Check where the ball crosses the racket, even between rendered frames.
    const contactY = racketY - 3 - radius;
    if (vy > 0 && y > previousY && previousY <= contactY && y >= contactY) {
      const contactX = previousX + (x - previousX) * (contactY - previousY) / (y - previousY);
      if (Math.abs(contactX - racketX) <= halfRacket + radius) {
        x = contactX;
        y = contactY;
        rally += 1;
        updateScore();
        const angle = clamp((x - racketX) / halfRacket, -1, 1) * Math.PI / 3;
        vx = speed() * Math.sin(angle);
        vy = -speed() * Math.cos(angle);
      }
    }

    draw();
    if (y > 322 - radius) {
      stop();
      setState("over", rally ? `${rally} ${rally === 1 ? "return" : "returns"}. One more?` : "That was the warm-up. One more?");
      return;
    }
    frameId = requestAnimationFrame(frame);
  };

  const togglePlay = () => {
    if (state === "playing") {
      pause();
      return;
    }
    if (state !== "paused") {
      reset();
      vx = speed() * 0.4;
      vy = -speed() * Math.sqrt(1 - 0.4 ** 2);
    }
    setState("playing", "Keep it off the back wall.");
    court.focus({ preventScroll: true });
    frameId = requestAnimationFrame(frame);
  };

  trigger.addEventListener("click", () => {
    reset();
    dialog.showModal();
  });
  play.addEventListener("click", togglePlay);
  dialog.querySelector("[data-squash-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    reset();
    trigger.focus({ preventScroll: true });
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });

  const moveRacket = (event) => {
    if (state !== "playing") return;
    const bounds = court.getBoundingClientRect();
    racketX = clamp((event.clientX - bounds.left) * 400 / bounds.width, 18 + halfRacket, 382 - halfRacket);
    draw();
  };
  court.addEventListener("pointermove", moveRacket);
  court.addEventListener("pointerdown", (event) => {
    court.setPointerCapture(event.pointerId);
    court.focus({ preventScroll: true });
    moveRacket(event);
  });
  court.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      keys.add(event.key);
    } else if (event.code === "Space" || event.key === "Enter") {
      event.preventDefault();
      if (!event.repeat) togglePlay();
    }
  });
  court.addEventListener("keyup", (event) => keys.delete(event.key));
  court.addEventListener("blur", () => keys.clear());
  document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); });
  window.addEventListener("blur", pause);
  motion.addEventListener("change", () => {
    pause();
    const velocity = Math.hypot(vx, vy);
    if (velocity) {
      const ratio = speed() / velocity;
      vx *= ratio;
      vy *= ratio;
    }
  });
})();
