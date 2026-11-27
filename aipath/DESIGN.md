---
name: AIPath Project Note
description: Research-paper styling for the AIPath route within Varun Kandula's personal site.
colors:
  paper: "#fbfbfa"
  ink: "#1a1a19"
  secondary: "#62625e"
  rule: "#d8d8d2"
  subtle: "#f2f2ef"
  link: "#34558f"
  paper-dark: "#111110"
  ink-dark: "#ededea"
  secondary-dark: "#adada5"
  rule-dark: "#3d3d38"
  subtle-dark: "#1b1b19"
  link-dark: "#a3bde9"
typography:
  headline:
    fontFamily: 'Georgia, "Times New Roman", serif'
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-.02em"
  title:
    fontFamily: 'Georgia, "Times New Roman", serif'
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.5
  body:
    fontFamily: 'Georgia, "Times New Roman", serif'
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace'
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.6
  interface:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.6
spacing:
  compact: "8px"
  text: "14px"
  paragraph: "18px"
  inset: "24px"
  section: "43px"
  section-mobile: "34px"
components:
  theme-toggle:
    textColor: "{colors.secondary}"
    width: "44px"
    height: "44px"
    padding: "0"
  theme-toggle-hover:
    backgroundColor: "{colors.subtle}"
    textColor: "{colors.ink}"
  back-link:
    textColor: "{colors.secondary}"
    minHeight: "44px"
  request-summary:
    typography: "{typography.interface}"
    padding: "10px 15px"
  request-summary-hover:
    backgroundColor: "{colors.subtle}"
  request-content:
    backgroundColor: "{colors.subtle}"
    textColor: "{colors.ink}"
    padding: "14px 18px 18px"
---

# Design System: AIPath Project Note

## Overview

**Creative North Star: "A research paper made for the web"**

This document covers `/aipath/` only. It extends the personal site's neutral palette and remembered theme. Readers enter through the AIPath project entry and return through a simple back link. The root `DESIGN.md` continues to govern the portfolio; this route adds the user's approved engineering-paper form.

Serif paragraphs carry the explanation, thin rules divide technical material, and small monospaced labels identify sources and notation. The implementation uses local font stacks, HTML, CSS, inline SVG, and the shared theme script, with no external font dependency.

**Key Characteristics:**

- Narrow serif reading column inside a wider figure column.
- Restrained blue links on neutral light and dark surfaces.
- Numbered sections, simple line drawings, and source references.
- Native disclosure and ordinary page links, without decorative motion.

Evidence: `index.html`, `styles.css`, and `../js/theme.js`. The route brief remains in `../.impeccable/surfaces/aipath-index-html.md`; page strategy belongs there.

## Colors

The palette is warm-neutral paper and ink, with blue reserved for links and keyboard focus. Sidecar tonal ramps are synthesized panel previews, not additional shipped palette tokens.

### Primary

- **Source blue** (`link`, `link-dark`): source links, citations, and visible focus outlines. Navigation and attribution may use neutral ink instead.

### Neutral

- **Paper** (`paper`, `paper-dark`): the uninterrupted page background.
- **Ink** (`ink`, `ink-dark`): reading text and headings.
- **Secondary ink** (`secondary`, `secondary-dark`): metadata, diagram strokes, captions, and navigation.
- **Fine rule** (`rule`, `rule-dark`): section, figure, table, and disclosure boundaries.
- **Subtle surface** (`subtle`, `subtle-dark`): disclosed code and hover feedback.

**The Shared Theme Rule.** Use the shared `varun-theme` preference across routes. Follow the system until a valid saved choice exists; preserve the CSS system-theme fallback when JavaScript is absent.

## Typography

**Body Font:** Georgia with Times New Roman and serif fallbacks.
**Label/Mono Font:** SFMono-Regular with Consolas, Liberation Mono, and monospace fallbacks.
**Interface Font:** the platform sans stack for navigation, table contents, diagram labels, and the disclosure control.

The hierarchy combines a large, regular-weight paper title with bold section headings and an even reading rhythm. It is role-based, not a mathematical modular scale. The local serif is the user's chosen reading material; this is not a prescription to use system UI faces for display typography elsewhere.

### Hierarchy

- **Paper title:** regular serif (43px, 1.18 line height, -.035em tracking); reduces to 34px at 700px and 31px at 440px. This title treatment is specific to the page, not a reusable display token.
- **Headline:** numbered section headings use the frontmatter headline role; reduce to 22px at 700px.
- **Title:** method subheadings use the title role; reduce to 16px at 700px.
- **Body:** the frontmatter body role reduces to 16px at 700px. The abstract is slightly smaller (16px desktop, 15px mobile) with the same generous line height.
- **Label:** small mono identifies publication metadata and example fields. Navigation uses the platform sans stack.

**The Reading Roles Rule.** Use serif for explanations, sans for compact interface and technical comparison text, and mono for notation and source metadata.

## Layout

Three centered widths organize the page: masthead/footer (936px maximum), paper/figures (820px), and reading text (660px). Desktop masthead padding is 14px vertically; the back link and paper navigation align across a fine bottom rule. The paper title starts 65px below its container's top.

At 1020px and below, the masthead/footer have 32px side gutters and the paper has 40px. At 700px, the masthead uses 22px gutters and 9px vertical padding; the paper/footer use 24px gutters. The paper title's top spacing becomes 43px. Section spacing follows the section tokens; paragraph spacing uses the paragraph token.

The figure is a three-column sequence connected by narrow arrows. At 440px and below it becomes a vertical sequence with the SVG drawings beside their labels and arrows rotated downward. The example's label/value pairs also stack. The implementation table remains a two-column table; code scrolls within its own region. Footer metadata wraps below its links at 700px.

Print removes the masthead/footer, returns to white paper and black text, removes width constraints, restores the horizontal figure, wraps code, and avoids breaks within figure, method-step, example, reference, and table-row units. Print does not automatically open a closed disclosure.

## Elevation & Depth

There are no shadows, gradients, floating cards, or decorative transitions in this route. Fine rules and the subtle code surface distinguish regions; the reading page stays flat.

**The Paper Surface Rule.** Separate technical material through whitespace, fine rules, and the existing subtle surface rather than elevation.

## Shapes

Containers and controls are square. Borders are fine (1px). The line drawings use simple rectangles, paths, and circles, including minimal corner rounding inside browser-window illustrations. The disclosure chevron is drawn with CSS borders; theme controls use inline SVG.

## Components

### Navigation

The homepage's AIPath project entry is the only navigation into the paper. A plain “Back to portfolio” link in the masthead returns to the homepage. It uses 12px/1.5 platform sans, a 44px minimum height, and secondary text; hover promotes it to ink with an underline. There are no site tabs.

A separate sans paper navigation holds section anchors, GitHub, and the theme toggle. It uses 28px gaps, reducing to 17px at 700px; the Implementation shortcut is hidden at that breakpoint while its section remains available in the document.

### Theme button and focus

The transparent theme button has a 44px square target with an inline moon/sun SVG. Hover adds the subtle surface and ink color. The shared script exposes the initially hidden control, updates its accessible action label, saves valid preferences when storage permits, and synchronizes changes from another tab.

Interactive elements inherit the route's visible focus outline (2px source blue, 5px offset). A focus-revealed skip link targets the paper. Links are underlined by default; source-navigation links add an underline on hover while ordinary links hide their underline color on hover.

### Native request disclosure

A square, fine-bordered `details` element contains a summary with a minimum 44px height and a border-drawn chevron. Opening rotates the chevron and reveals a subtle-background code region. The JSON label stays at the summary's far end. The request is explicitly marked illustrative; its preformatted region is keyboard-focusable and scrolls horizontally when needed. Native opening and closing work without JavaScript.

### Diagram, table, and references

The figure uses inline SVG strokes in secondary ink, plain stage labels, mono notation, and a numbered caption. Keep the diagram semantic explanation in readable text; the decorative SVGs are hidden from assistive technology.

The implementation table uses horizontal row rules, left alignment, a 37% first column (40% at 700px), sans cell text, and smaller secondary notes. A visually hidden caption and scoped headers preserve its structure. References use mono numbers and repository paths beside serif link text, with long paths allowed to wrap.

## Do's and Don'ts

### Do:

- **Do** preserve the shared theme and palette, with the project entry as the only homepage link into the paper.
- **Do** keep reading text narrow and allow figures to use the wider paper column.
- **Do** use semantic figures, tables, links, and native disclosure with visible keyboard focus.
- **Do** keep technical diagrams simple, inline, and legible in both themes and print.

### Don't:

- **Don't** extend this route's paper hierarchy into unrelated portfolio surfaces by default.
- **Don't** replace ordinary navigation links or native disclosure with JavaScript-only controls.
- **Don't** add decorative motion, floating shadows, or external font dependencies to this approved paper treatment.

Not canonized: isolated title geometry, tiny intermediate-breakpoint diagram annotations, and one-off spacing adjustments are not reusable tokens; their presence does not establish a general display or minimum-text-size standard.
