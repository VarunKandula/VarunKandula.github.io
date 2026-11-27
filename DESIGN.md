---
name: Varun Kandula
description: A source-faithful personal portfolio with a quiet reading layout and live watches.
colors:
  light-bg: "#fbfbfa"
  light-fg: "#1a1a19"
  light-muted: "#6f6f6a"
  light-faint: "#c9c9c4"
  light-line: "#ebebe7"
  light-hover: "#f3f3f0"
  light-accent: "#b5552e"
  dark-bg: "#111110"
  dark-fg: "#ededea"
  dark-muted: "#94948e"
  dark-faint: "#4a4a47"
  dark-line: "#232321"
  dark-hover: "#1a1a19"
  dark-accent: "#e0805a"
typography:
  display:
    fontFamily: '"Instrument Serif", ui-serif, Georgia, serif'
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif'
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.006em"
  title:
    fontFamily: '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif'
    fontSize: "14.5px"
    fontWeight: 500
    lineHeight: 1.6
  label:
    fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace'
    fontSize: "10.5px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.06em"
  metadata:
    fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace'
    fontSize: "11.5px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
rounded:
  row: "8px"
  pill: "999px"
  circle: "50%"
spacing:
  compact: "6px"
  item: "10px"
  small: "12px"
  related: "16px"
  medium: "20px"
  section: "24px"
components:
  theme-toggle:
    rounded: "{rounded.circle}"
    width: "44px"
    height: "44px"
    padding: "0"
  portrait-close:
    rounded: "{rounded.circle}"
    width: "44px"
    height: "44px"
    padding: "0"
  tag:
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  experience-summary:
    rounded: "{rounded.row}"
    padding: "6px 10px"
---

# Design System: Varun Kandula

## Overview

**Creative North Star: "A quiet personal portfolio"**

The supplied Devin source and screenshot are the visual authority. The shipped site pairs a narrow reading column, fine section rules, understated metadata, supplied photography, and four drawn watch faces. This record describes that implementation rather than proposing a new identity.

**Key Characteristics:**
- Warm off-white and charcoal themes with restrained terracotta details.
- Serif identity, compact sans-serif prose, and monospaced labels and dates.
- Open sections and rows, with live SVG watches as the signature illustration.

Evidence: `css/styles.css`, `index.html`, `js/theme.js`, `js/main.js`; product constraints in `PRODUCT.md` and direction in `.context/design-contract.md`.

## Colors

### Primary

Terracotta (`light-accent` / `dark-accent`) marks watch details and keyboard focus. It does not color ordinary links.

### Neutral

Each theme provides the same semantic roles: `bg` for canvas and watch cases; `fg` for primary text and watch ink; `muted` for supporting text; `faint` for underlines and hover borders; `line` for section and control boundaries; `hover` for interaction surfaces. CSS aliases these roles to the corresponding theme values above. Selection reverses foreground and background; scrollbars use faint against background.

Header clocks and weather use supporting ink. Static weather icons replace the previous green pulsing status dot, keeping the three-city group quiet.

The sidecar's synthesized tonal strips serve documentation previews only; the shipped themes use the exact colors above.

**The Paired Theme Rule.** Change semantic roles together; retain the same hierarchy and geometry in both themes.

## Typography

Instrument Serif supplies the name; Inter carries prose and row titles; JetBrains Mono carries section headings, dates, time, and feedback. Font families and core sizes are normative in the frontmatter. Fonts load from Google Fonts with the recorded fallback stacks.

The ramp is compact rather than modular: display, body, and small metadata. Row titles use medium weight; section headings are uppercase, not introductory kickers. Watch captions use medium titles and smaller supporting text (12.5px, line-height 1.35); tags use 13px; the update stamp uses 11px. Dates and clock numerals are tabular.

**The Three Voices Rule.** Keep identity in serif, reading text in sans, and short labels or measurements in mono.

## Layout

The centered page has a maximum outer width of 680px, including 24px side padding. Desktop page padding is 96px top and 120px bottom. The header uses a horizontal identity/tools arrangement with 28px below it, followed by the Home / AIPath navigation and a 12px gap before the first section.

Sections have a 132px label column, a flexible content column, a 24px gap, 28px vertical padding, and a 1px top rule. Paragraphs separate by 14px. Rows keep dates at the right; side-project descriptions always stack below titles. Four watches share equal columns with 20px vertical and 16px horizontal gaps.

At widths up to and including 640px, page padding becomes 56px 20px 96px. Header spacing becomes 16px before the navigation; the complete three-city clock group moves below identity and toggle. Sections become one column with a 12px gap and 24px vertical padding. Row descriptions stack, titles wrap, and watches become two columns with 24px vertical and 20px horizontal gaps. Tags and contact links wrap naturally.

## Elevation & Depth

Sections and rows remain flat; thin rules and hover fills provide separation. The portrait uses a backdrop mixed from the active canvas at 70% opacity with an 8px blur. The toast reverses canvas and text colors without a shadow.

**The Open Surface Rule.** Preserve section rules and unboxed content as the page's structure.

## Shapes

Rows have gently rounded hover surfaces; tags and toast use pill shapes. Avatar and icon controls are circular. The avatar crops the supplied image to 40px square; the portrait uses 14px corners and keeps the photograph's aspect ratio. Icons are inline SVG strokes (18px artwork, 1.5-unit stroke), not text glyphs.

## Components

### Site navigation and project notes

Home and AIPath are ordinary page links styled as tabs, with a 2px foreground underline and `aria-current="page"` identifying the active page. Shared styles live in `css/site-tabs.css`: 44px minimum link height, 24px gaps, and 12px monospaced labels. At 440px and below, the gap becomes 20px and labels become 11px. The AIPath project note at `/aipath/` uses the same tabs and saved theme. Its research-paper composition is documented separately in `aipath/DESIGN.md`.

### Theme and portrait controls

Theme and close buttons share 44px circular targets. The theme control has a line-colored border and muted icon, gaining foreground ink, hover fill, and a faint border on hover. Moon and sun indicate the next available theme; its accessible label names that action. All interactive elements receive a 1.5px accent focus outline, offset 3px, with 3px focus corners.

Theme follows the operating system until an explicit choice, saved under `varun-theme` when storage works. Changes synchronize across tabs. Without JavaScript the theme button stays hidden and CSS follows the system preference.

### Portrait

The supplied avatar opens a native modal dialog containing `assets/portrait.jpg`. Width is bounded by `min(360px, 80vw, calc(80vh * 599 / 900))`. The close control sits 12px from the top/right; native Escape dismissal, the explicit button, and backdrop clicks close the viewer. The close button receives initial focus.

### Local times and weather

An unboxed list shows SF, Boro, and HYD in three aligned rows of city, local time, and weather. It uses the existing 11.5px monospaced supporting text, 4px row gaps, and 16px static weather icons with the toggle's 1.5-unit strokes. Weather columns reserve space while loading or unavailable; a dash replaces missing or expired data. Each weather reading links to Open-Meteo's licence, with attribution in the tooltip and accessible label. Time and date tooltips carry full location and timezone details without adding visual density. Both themes share the same structure, with the entire group moving below identity on mobile.

### Rows

Experience uses native details/summary with hidden default markers. Summary padding extends 10px into the gutter so text stays aligned; dates do not shrink. Hover fills the summary, and an open row promotes its subtitle to foreground ink. Expanded text remains muted, with a 46ch maximum measure. Static project and investment rows preserve the same title/metadata alignment without disclosure behavior.

### Tags and links

Tags are outlined pills with optional muted text after a middle dot; hover changes border and fill, with no selected state. The Squash tag progressively becomes a button that opens a small rally game; the others remain informational. Links inherit text color and use a faint 1px underline offset 3px, becoming current-color on hover. Contact links wrap with 6px/20px gaps. Email copies the address and displays an inverted, polite live-status toast for 1.8 seconds; mailto remains the fallback.

### Live watches and motion

Diver, dress, field, and chronograph faces are generated as inline SVG in 100-by-100 viewboxes. Cases use canvas fill and foreground strokes; tick marks mix foreground and muted ink; terracotta marks select hands and details. They show the visitor's local time, independently of the San Francisco header clock. Captions exist in HTML even without JavaScript.

Each watch face is a native button. Activating it winds the hands through full rotations over 1.2 seconds and returns to actual time, with a short "Time well wasted." toast. Reduced motion skips the winding; watch updates stop offscreen and when the document is hidden.

The shared easing is `cubic-bezier(0.25, 1, 0.5, 1)`. State changes generally take 0.2s; avatar hover rotates/scales over 0.4s, watches over 0.5s. Disclosure, portrait, and entry motion use small translations/scales; entry motion never hides content. Reduced-motion CSS disables animations and transitions; watches update in whole-second steps and respond to live preference changes. Sidecar watch previews are static illustrations, not runtime clocks.

### Squash break

A native dialog provides protected keyboard focus for the optional game. It uses the existing serif display face, monospaced rally counters, warm canvas, thin court markings, and terracotta front wall and ball. The court is a responsive SVG with mouse, pointer, and arrow-key controls. Play starts only after Serve; pause, resume, replay, Escape, backdrop dismissal, and focus restoration remain explicit. The game pauses when the window loses focus or the document becomes hidden. Reduced motion selects a slower pace for the user-initiated game. Both themes share the same geometry.

## Do's and Don'ts

### Do:
- **Do** preserve the supplied typography, photography, thin rules, and watch geometry.
- **Do** use paired theme roles and visible keyboard focus.
- **Do** keep native disclosures, readable captions, and responsive row wrapping.

### Don't:
- **Don't** turn the open sections into a dashboard of cards.
- **Don't** promote the clock's green status decoration into a general action color.
- **Don't** treat supplied investment and watch-reference placeholders as reusable copy rules.

Not canonized: content placeholders and page-specific stagger timings are retained source details, not reusable design rules. No craft-floor refusal is promoted into the system; the uppercase labels are actual section headings, not eyebrows.
