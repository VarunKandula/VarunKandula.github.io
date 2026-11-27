// Run before the stylesheet so a saved theme is applied before the first paint.
(() => {
  const key = "varun-theme";
  const root = document.documentElement;
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const validTheme = (value) => (value === "light" || value === "dark" ? value : null);
  let preference = null;
  let toggle;

  try {
    preference = validTheme(localStorage.getItem(key));
  } catch {
    // The toggle still works when browser privacy settings block storage.
  }

  const render = () => {
    const theme = preference || (system.matches ? "dark" : "light");
    root.dataset.theme = theme;
    themeColor?.setAttribute("content", theme === "dark" ? "#111110" : "#fbfbfa");

    if (toggle) {
      const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
      toggle.setAttribute("aria-label", label);
      toggle.title = label;
    }
  };

  render();

  system.addEventListener("change", () => {
    if (!preference) render();
  });

  // Keep an open tab in sync when the preference changes in another tab.
  window.addEventListener("storage", (event) => {
    if (event.key !== key && event.key !== null) return;
    preference = validTheme(event.newValue);
    render();
  });

  document.addEventListener("DOMContentLoaded", () => {
    toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;

    render();
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      preference = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(key, preference);
      } catch {
        // Keep the selected theme for this visit even if it cannot be saved.
      }
      render();
    });
  });
})();
