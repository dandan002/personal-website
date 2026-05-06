# Phase 1: Map Embed - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Embed a Google Maps iframe of Manhattan into the food section of `app/page.tsx`. The embed is responsive, fits a two-column desktop layout (text/links left, map right), and stacks text-above-map on mobile. No API key; no custom map theming.

</domain>

<decisions>
## Implementation Decisions

### Dark theme treatment
- **D-01:** Use the default Google Maps light UI — no CSS filter (no `invert`, no `grayscale`). Wrap the iframe in a styled container (border `1px solid var(--color-border)`, `border-radius` consistent with other cards) to integrate it visually into the dark section.

### Map placement
- **D-02:** Two-column layout inside the food section: left column = heading + blurb + links; right column = map iframe. On desktop the columns sit side by side. On mobile, columns stack — text above, map below (full width).
- **D-03:** Both existing external links (Google Maps List, Beli) are preserved; the map is additive, not a replacement.

### Map dimensions & zoom
- **D-04:** Map iframe is square, approximately 350px × 350px on desktop. On mobile it fills full section width.
- **D-05:** Centered on Manhattan at zoom level 13.

### Claude's Discretion
- Exact column width split (e.g., 50/50 vs 55/45) — pick whatever looks balanced with the text.
- Border radius value — match existing `project-card` or other card-like elements on the page.
- `loading="lazy"` attribute on the iframe — include it (good practice, no functional impact).
- Whether to wrap the iframe in a `ScrollReveal` — follow the same pattern as sibling sections (the existing food section already uses `ScrollReveal`).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Source of truth
- `app/page.tsx` — food section lives at lines 326–368; all edits go here
- `app/globals.css` — design tokens (`--color-border`, `--color-surface`, `--color-bg`, etc.) and reusable CSS classes (`project-card`, `section-label`, `.divider`, `.link`)

### Project config / design system
- `CLAUDE.md` — project architecture, styling conventions, and inline `style` prop pattern
- `.planning/REQUIREMENTS.md` — MAP-01, MAP-02, MAP-03 (requirements that must pass)

No external specs beyond the above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/ScrollReveal.tsx` — used by every section for scroll-in animation; wrap the map container with it following the existing food section pattern
- `.project-card` CSS class (`globals.css:141`) — `background: var(--color-surface); border: 1px solid var(--color-border);` — use this or its token values for the map container border/background

### Established Patterns
- Layout/spacing uses inline `style` props (not Tailwind utility classes) — follow this for the two-column flex layout
- Section structure: `<section id="food">` → `<ScrollReveal>` → section content
- Responsive behavior is CSS-only (no JS) — use `flexWrap: "wrap"` or a media-query-free approach where possible

### Integration Points
- Food section at `app/page.tsx:326–368` — the map iframe and two-column flex wrapper are inserted inside the existing `<ScrollReveal>` block, replacing or augmenting the current single-column layout

</code_context>

<specifics>
## Specific Ideas

- Square map (~350px) centered on Manhattan, zoom 13
- Default Google Maps iframe (light UI accepted)
- Two-column desktop layout with text on left, map on right

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 1-map-embed*
*Context gathered: 2026-05-06*
