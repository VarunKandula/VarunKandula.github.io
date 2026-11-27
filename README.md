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
- `js/main.js`: San Francisco time, live watch faces, email copying, and portrait dialog.
- `assets/`: the supplied avatar and portrait.

The investment company names and watch reference labels are placeholders from the supplied source. Replace them in `index.html` when the details are ready.

## Publish

GitHub Pages is configured to publish the root of `main` at [varunkandula.github.io](https://varunkandula.github.io/). Merging this rebuild into `main` publishes it through the existing Pages deployment.

See [DOMAIN_SETUP.md](DOMAIN_SETUP.md) for the GoDaddy records and GitHub settings needed to connect `varunkandula.com`.
