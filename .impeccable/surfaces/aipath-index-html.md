---
version: 1
slug: "aipath-index-html"
primary_target: "aipath/index.html"
related_targets: ["aipath/styles.css","css/site-tabs.css"]
---

# AIPath project page

Scope: `/aipath/`, linked from the personal site's AIPath entry and shared Home / AIPath tabs. Mode: Read, with a clear path to the original source code. The user approved the paper direction, then requested a visible tab on the personal website.

The reader is an engineer, researcher, or collaborator trying to understand the 2024 project. Explain the mechanism, show the implementation, and distinguish the prototype from proposed applications. Evidence is recorded in `.context/aipath-research.md` and the original frontend/backend repositories.

User-pinned direction: a research paper made for the web. Plain HTML and CSS, serif reading text, small monospaced technical labels, thin rules, and simple diagrams. Extend the portfolio's restrained palette and remembered light/dark preference. No concept selection is needed: the user specified the form. This is a code-led build with no image comp.

First viewport: Home / AIPath tabs in a small masthead, a centered two-line research title, project attribution and source links, a readable abstract, and a three-stage pipeline. The single diagram explains recording → reusable plan → browser execution. Below: numbered method, an illustrative request disclosure, implementation table, open questions, and references. Tabs are normal page links with an active underline and `aria-current`, supporting reloads, browser history, and direct links.

Signature interaction: a native disclosure opens a clearly labeled illustrative execution request. All reading, navigation, and disclosure work without JavaScript; only the shared theme toggle needs it. No decorative motion.

Constraints: no fake benchmarks, customers, publications, model-training claims, or live-agent CTA. Keep supplied portfolio copy intact apart from making AIPath a link. Support mobile, keyboard, print, and both themes. No dependencies or build step.

No unresolved product decisions.
