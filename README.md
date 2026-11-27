# Varun Kandula

Personal site rebuilt from the supplied Devin export. Plain HTML, CSS, and JavaScript; no dependencies or build step.

## Run locally

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [localhost:8000](http://localhost:8000).

## Edit

- `index.html`: biography, experience, projects, investments, watch captions, and links.
- `css/styles.css`: layout and light/dark theme tokens.
- `js/theme.js`: applies the theme before first paint, follows the system until a choice is made, and saves the choice in `localStorage` as `varun-theme`.
- `js/main.js`: San Francisco time, live watch faces and winding, email copying, and portrait dialog.
- `js/squash.js`: the small rally game hidden in the Squash interest tag.
- `assets/`: the supplied avatar and portrait.

The investment company names and watch reference labels are placeholders from the supplied source. Replace them in `index.html` when the details are ready.

## Easter eggs

- Click or keyboard-activate any watch to wind its hands forward, then return to the current time. Reduced motion keeps the confirmation and skips the spin.
- Click **Squash** in Interests for a short rally game. Press Serve, then use your mouse, drag on the court, or use the arrow keys. Space pauses/resumes; Escape closes. The game pauses when the tab is hidden or the window loses focus, and reduced motion selects a slower pace.

Both use the existing theme and require no new dependencies. Watch animation stops while the collection is offscreen.

## Publish

GitHub Pages is configured to publish the root of `main` at [varunkandula.github.io](https://varunkandula.github.io/). Merging this rebuild into `main` publishes it through the existing Pages deployment.

See [DOMAIN_SETUP.md](DOMAIN_SETUP.md) for the GoDaddy records and GitHub settings needed to connect `varunkandula.com`.
