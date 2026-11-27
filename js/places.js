(() => {
  const group = document.querySelector("[data-places]");
  if (!group) return;

  const fahrenheit = group.dataset.temperatureUnit === "fahrenheit";
  const places = [...group.querySelectorAll("[data-place]")].map((row) => ({
    row,
    name: row.dataset.name,
    latitude: Number(row.dataset.latitude),
    longitude: Number(row.dataset.longitude),
    time: row.querySelector("[data-clock]"),
    weather: row.querySelector("[data-weather]"),
    icon: row.querySelector("[data-weather-icon]"),
    temperature: row.querySelector("[data-temperature]"),
    clock: new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: row.dataset.timeZone }),
    date: new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short", timeZone: row.dataset.timeZone }),
  }));

  const refreshAfter = 15 * 60 * 1000;
  const expireAfter = 60 * 60 * 1000;
  const cacheKey = "varun-weather-v1";
  const locationKey = places.map(({ latitude, longitude }) => `${latitude},${longitude}`).join(";");
  let snapshot = null;
  let clockTimer;
  let weatherTimer;
  let fetching = false;

  // Authored SVGs share the theme-toggle's quiet line weight.
  const sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>';
  const moon = '<path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z"/>';
  const cloud = '<path d="M6 18a4 4 0 0 1-.6-8 6 6 0 0 1 11.5-1.5A4.8 4.8 0 0 1 18 18Z" fill="var(--bg)"/>';
  const rainCloud = '<path d="M6 14a3.7 3.7 0 0 1-.3-7.4 5.6 5.6 0 0 1 10.6-.9A4.2 4.2 0 0 1 18 14"/>';
  const icons = {
    sun,
    moon,
    cloud,
    partlyDay: `<g transform="translate(-1 -2) scale(.75)">${sun}</g>${cloud}`,
    partlyNight: `<g transform="translate(-1 -2) scale(.75)">${moon}</g>${cloud}`,
    fog: '<path d="M4 6h16M2 10h20M5 14h14M7 18h10"/>',
    drizzle: `${rainCloud}<path d="m8 18-.5 1m5-1-.5 1m5-1-.5 1"/>`,
    rain: `${rainCloud}<path d="m8 17-1 3m6-3-1 3m6-3-1 3"/>`,
    snow: `${rainCloud}<path d="M12 16v6m-2.6-4.5 5.2 3m-5.2 0 5.2-3"/>`,
    storm: `${rainCloud}<path d="m13 13-4 5h4l-2 5 6-7h-4Z"/>`,
    temperature: '<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0Z"/><path d="M12 9v8"/>',
  };
  const conditions = new Map([
    [0, ["Clear sky", "clear"]], [1, ["Mostly clear", "clear"]],
    [2, ["Partly cloudy", "partly"]], [3, ["Overcast", "cloud"]],
    [45, ["Fog", "fog"]], [48, ["Freezing fog", "fog"]],
    [51, ["Light drizzle", "drizzle"]], [53, ["Drizzle", "drizzle"]], [55, ["Heavy drizzle", "drizzle"]],
    [56, ["Freezing drizzle", "drizzle"]], [57, ["Freezing drizzle", "drizzle"]],
    [61, ["Light rain", "rain"]], [63, ["Rain", "rain"]], [65, ["Heavy rain", "rain"]],
    [66, ["Freezing rain", "rain"]], [67, ["Freezing rain", "rain"]],
    [71, ["Light snow", "snow"]], [73, ["Snow", "snow"]], [75, ["Heavy snow", "snow"]], [77, ["Snow grains", "snow"]],
    [80, ["Light showers", "rain"]], [81, ["Showers", "rain"]], [82, ["Heavy showers", "rain"]],
    [85, ["Snow showers", "snow"]], [86, ["Heavy snow showers", "snow"]],
    [95, ["Thunderstorm", "storm"]], [96, ["Thunderstorm with hail", "storm"]],
    [97, ["Heavy thunderstorm", "storm"]], [99, ["Thunderstorm with hail", "storm"]],
  ]);

  const usable = (item) => item && Number.isFinite(item.temperature) && item.temperature >= -100 && item.temperature <= 70
    && Number.isInteger(item.code) && (item.isDay === 0 || item.isDay === 1) && Number.isFinite(item.time)
    && Date.now() - item.time >= -5 * 60 * 1000 && Date.now() - item.time < expireAfter;

  const renderWeather = () => {
    places.forEach((place, index) => {
      const item = snapshot?.items[index];
      if (!usable(item)) {
        place.icon.replaceChildren();
        place.temperature.textContent = "—";
        place.weather.setAttribute("aria-label", `${place.name}: weather unavailable`);
        place.weather.title = "Weather unavailable";
        return;
      }
      const [description, kind] = conditions.get(item.code) || ["Current temperature", "temperature"];
      const icon = kind === "clear" ? (item.isDay ? "sun" : "moon") : kind === "partly" ? (item.isDay ? "partlyDay" : "partlyNight") : kind;
      const temperature = Math.round(fahrenheit ? item.temperature * 9 / 5 + 32 : item.temperature);
      place.icon.innerHTML = icons[icon];
      place.icon.dataset.condition = icon;
      place.temperature.textContent = `${temperature}°${fahrenheit ? "F" : "C"}`;
      place.weather.setAttribute("aria-label", `${place.name}: ${description}, ${temperature} degrees ${fahrenheit ? "Fahrenheit" : "Celsius"}`);
      place.weather.title = `${description} · Updated ${place.clock.format(new Date(item.time)).toLowerCase()} · Open-Meteo`;
    });
  };

  const tickClocks = () => {
    clearTimeout(clockTimer);
    if (document.hidden) return;
    const now = new Date();
    places.forEach((place) => {
      place.time.textContent = place.clock.format(now).toLowerCase();
      place.time.dateTime = now.toISOString();
      place.time.title = place.date.format(now);
      place.time.setAttribute("aria-label", `${place.name}: ${place.date.format(now)}`);
    });
    renderWeather();
    clockTimer = setTimeout(tickClocks, 60000 - Date.now() % 60000 + 10);
  };

  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey));
    if (cached?.locations === locationKey && Number.isFinite(cached.fetchedAt) && cached.fetchedAt <= Date.now()
      && Date.now() - cached.fetchedAt < expireAfter && Array.isArray(cached.items) && cached.items.length === places.length
      && cached.items.some(usable)) snapshot = cached;
  } catch {
    // Weather and clocks still work when storage is blocked or the cache is corrupt.
  }

  const parameters = new URLSearchParams({
    latitude: places.map((place) => place.latitude).join(","),
    longitude: places.map((place) => place.longitude).join(","),
    current: "temperature_2m,weather_code,is_day",
    temperature_unit: "celsius",
    timeformat: "unixtime",
    forecast_days: "1",
  });
  const updateWeather = async () => {
    clearTimeout(weatherTimer);
    if (document.hidden || fetching) return;
    renderWeather();
    const age = snapshot ? Date.now() - snapshot.fetchedAt : Infinity;
    if (age < refreshAfter) {
      weatherTimer = setTimeout(updateWeather, refreshAfter - age);
      return;
    }

    fetching = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    let retryAfter = 5 * 60 * 1000;
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${parameters}`, {
        signal: controller.signal, credentials: "omit", referrerPolicy: "no-referrer",
      });
      if (!response.ok) throw new Error("Weather unavailable");
      const data = await response.json();
      if (!Array.isArray(data) || data.length !== places.length) throw new Error("Incomplete weather response");
      const items = data.map((result) => {
        const current = result?.current;
        const item = current && { temperature: current.temperature_2m, code: current.weather_code, isDay: current.is_day, time: current.time * 1000 };
        return usable(item) ? item : null;
      });
      if (!items.some(Boolean)) throw new Error("Weather unavailable");
      snapshot = { locations: locationKey, fetchedAt: Date.now(), items };
      try { localStorage.setItem(cacheKey, JSON.stringify(snapshot)); } catch { /* This visit can use the in-memory cache. */ }
      retryAfter = refreshAfter;
    } catch {
      // Keep recent cached conditions; otherwise a quiet dash is more honest than a guess.
    } finally {
      clearTimeout(timeout);
      fetching = false;
      renderWeather();
      if (!document.hidden) weatherTimer = setTimeout(updateWeather, retryAfter);
    }
  };

  tickClocks();
  updateWeather();
  document.addEventListener("visibilitychange", () => {
    clearTimeout(clockTimer);
    clearTimeout(weatherTimer);
    if (!document.hidden) { tickClocks(); updateWeather(); }
  });
  window.addEventListener("online", updateWeather);
})();
