# Phase 1: Map Embed - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-06
**Phase:** 1-map-embed
**Areas discussed:** Dark theme treatment, Map placement & links, Map dimensions & zoom

---

## Dark theme treatment

| Option | Description | Selected |
|--------|-------------|----------|
| CSS filter: invert + hue-rotate | Flip map dark using CSS filter — roads readable but colors shift | |
| Dark border container only | Wrap in dark border, map stays light inside | |
| Grayscale only | Desaturate map to neutral grey | |
| Default light UI | Accept Google Maps default light UI as-is | ✓ |

**User's choice:** Keep the default Google Maps light UI with no CSS filter treatment.
**Notes:** User explicitly typed "Just keep the iframe with the default light UI."

---

## Map placement & links

| Option | Description | Selected |
|--------|-------------|----------|
| Above the links | Map first, then external links below | |
| Below the links | Links stay at top, map underneath | |
| Replace Google Maps List link | Embed replaces text link | |
| To the right of the links | Two-column layout — text/links left, map right | ✓ |

**User's choice:** Map appears to the right of the text content in a two-column layout.
**Notes:** Follow-up confirmed mobile stacking order: text above, map below.

---

## Map dimensions & zoom

| Option | Description | Selected |
|--------|-------------|----------|
| 16:9, ~300px tall | Standard widescreen ratio | |
| Square, ~350px | 1:1 ratio, more map-like | ✓ |
| Custom height | User-specified | |

**Zoom:** Manhattan (zoom 13)

**User's choice:** Square iframe ~350px, centered on Manhattan at zoom 13.
**Notes:** On mobile, iframe fills full section width.

---

## Claude's Discretion

- Exact column width split on desktop
- Border radius value for iframe container
- Whether to add `loading="lazy"` to iframe
- Whether to wrap map container in `ScrollReveal`

## Deferred Ideas

None — discussion stayed within phase scope.
