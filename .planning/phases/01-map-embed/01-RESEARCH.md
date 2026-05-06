# Phase 1: Map Embed - Research

**Researched:** 2026-05-06
**Domain:** Google Maps iframe embed, responsive CSS layout, Next.js 16 / React 19
**Confidence:** HIGH

---

## Summary

This phase adds a Google Maps iframe of Manhattan to the existing food section in `app/page.tsx`. The work is almost entirely HTML markup + CSS layout — no new dependencies, no API keys, no JavaScript logic beyond what ScrollReveal already provides.

The food section (lines 326–368) is currently single-column. The change restructures it into a flex-row two-column layout: text/links left, map iframe right. On narrow screens `flexWrap: "wrap"` collapses it to a single column with text above map. The iframe uses the no-API-key `pb=` embed URL obtained from Google Maps > Share > Embed a Map.

There are zero existing media queries in `globals.css`. The responsive mobile behavior must be handled either via an inline CSS media query added to `globals.css` or via a clever `minWidth` trick on the map column so it hits 100% when the viewport is too narrow. The UI-SPEC and CONTEXT.md specify the `minWidth` approach on the right column as the primary strategy.

**Primary recommendation:** Restructure food section inline styles to a flex-row wrapper, drop a `<div class="project-card">` around the iframe, set the `pb=` embed URL directly — no external packages, no new config, no API credentials.

---

## Project Constraints (from CLAUDE.md)

- Layout and spacing use inline `style` props — **not** Tailwind utility classes
- `app/page.tsx` is a Server Component (async); no `"use client"` needed for the map
- Design tokens accessed via `var(--color-*)` CSS custom properties
- Reusable CSS classes in `globals.css`: `.project-card`, `.link`, `.section-label`, etc.
- No test suite configured (`CLAUDE.md` states this explicitly)
- `npm run lint` (ESLint) is the only validation tool available

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Use the default Google Maps light UI — no CSS filter. Wrap the iframe in a styled container using `.project-card` (border `1px solid var(--color-border)`, consistent border-radius) to integrate into the dark section.
- **D-02:** Two-column layout inside the food section: left = heading + blurb + links; right = map iframe. Desktop: side by side. Mobile: stacks — text above, map below (full width).
- **D-03:** Both existing external links (Google Maps List, Beli) are preserved. The map is additive, not a replacement.
- **D-04:** Map iframe is square, approximately 350px × 350px on desktop. On mobile it fills full section width.
- **D-05:** Centered on Manhattan at zoom level 13.

### Claude's Discretion

- Exact column width split (e.g., 50/50 vs 55/45) — pick whatever looks balanced with the text.
- Border radius value — match existing `project-card` or other card-like elements on the page.
- `loading="lazy"` attribute on the iframe — include it (good practice, no functional impact).
- Whether to wrap the iframe in a `ScrollReveal` — follow the same pattern as sibling sections (the existing food section already uses `ScrollReveal`).

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MAP-01 | Visitor can see a Google Maps iframe embed of NYC in the food section | `pb=` URL from Google Maps Share > Embed works without API key; insert `<iframe>` inside food section |
| MAP-02 | The map embed is responsive and adapts to different screen widths | `flexWrap: "wrap"` + right column `minWidth: "100%"` override collapses to single column on mobile; iframe `width="100%"` fills container |
| MAP-03 | The map embed styling fits the existing dark-themed food section layout | `.project-card` CSS class provides matching surface/border; `overflow: hidden` clips iframe corners; no CSS filter on iframe (D-01) |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Map display | Browser / Client | — | `<iframe>` rendered client-side; loads Google Maps content directly from google.com |
| Layout (two-column) | Frontend Server (SSR) | — | `app/page.tsx` is a Server Component; layout markup is static HTML/CSS, no interactivity |
| Scroll animation | Browser / Client | — | `ScrollReveal` is a Client Component with IntersectionObserver; already wraps the food section |
| Responsive collapse | Browser / Client | — | CSS `flexWrap` + `minWidth` rules execute in the browser; no JS needed |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 (project), 16.2.5 (latest) [VERIFIED: npm registry] | SSR/SSG framework | Already in use |
| React | 19.2.3 | UI rendering | Already in use |
| Tailwind v4 | ^4 | CSS utilities (not used for this phase) | Already in use |

### Supporting

No new libraries are introduced in this phase. All implementation uses:
- Native HTML `<iframe>` element
- Existing CSS classes from `globals.css` (`.project-card`)
- Existing `ScrollReveal` component
- Inline `style` props (established project pattern)

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Raw `<iframe>` with `pb=` URL | `@react-google-maps/api` | Requires API key + JS bundle; locked out by D-01/D-05 decisions |
| `flexWrap` for responsive | CSS media query | Media query is more explicit but globals.css has zero existing media queries; flexWrap is simpler and consistent with project style |

**Installation:** None required.

---

## Architecture Patterns

### System Architecture Diagram

```
Visitor browser
      |
      v
Next.js SSR (app/page.tsx — Server Component)
      |
      v
<section id="food">
  <ScrollReveal>           ← existing Client Component wrapper
    <div style="flex row, wrap">
      [Left col]           ← existing markup (label, heading, blurb, links)
      [Right col]
        <div.project-card> ← map container
          <iframe>         ← Google Maps embed (pb= URL, no API key)
        </div>
    </div>
  </ScrollReveal>
</section>
      |
      v
google.com/maps            ← external; loads inside iframe
```

### Recommended Project Structure

No new files. All changes are in two existing files:

```
app/
  page.tsx        ← food section restructured (lines 326–368)
  globals.css     ← optional: add .map-container media-query override if minWidth trick is insufficient
components/
  ScrollReveal.tsx ← no changes
```

### Pattern 1: Two-Column Flex Layout (inline style)

**What:** Flex row that wraps to single column on narrow viewports using `flexWrap` and `minWidth` on columns.
**When to use:** Any section that needs side-by-side desktop layout with mobile stacking, without introducing media queries.

```tsx
// Source: CLAUDE.md + existing project patterns (app/page.tsx flex rows)
// Right column minWidth: "100%" forces it full-width when container is <350px,
// which triggers flex wrapping and stacks below the left column.
<div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
  <div style={{ flex: 1, minWidth: "240px" }}>
    {/* text content */}
  </div>
  <div style={{ width: "350px", flexShrink: 0, minWidth: "min(350px, 100%)" }}>
    {/* map iframe container */}
  </div>
</div>
```

**Note on mobile full-width:** `minWidth: "min(350px, 100%)"` on the right column means it will be 350px when space allows, but shrinks to full container width on narrow screens and triggers flex-wrap. [ASSUMED] — `min()` CSS function is well-supported in modern browsers but has not been probed against the project's browser support matrix (none defined).

### Pattern 2: Google Maps No-API-Key Embed

**What:** Get the embed URL from Google Maps UI (Share > Embed a map) — produces a `pb=` encoded URL that does not require an API key.
**When to use:** Static location display only (no custom pins, no JS callbacks, no custom styling).

```html
<!-- Source: [CITED: developers.google.com/maps/documentation/embed/embedding-map] -->
<!-- pb= URL obtained from: maps.google.com > Share > Embed a map -->
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!..."
  width="100%"
  height="350"
  style="border: 0"
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  title="Google Maps — Manhattan, NYC"
/>
```

**pb= URL for Manhattan zoom 13:** Must be generated by visiting Google Maps, searching "Manhattan, New York", clicking Share > Embed a map, and copying the `src` value from the generated iframe code. [ASSUMED] — The `pb=` parameter is an opaque encoded string; it cannot be hand-constructed reliably. The correct URL must be retrieved from the Google Maps UI.

### Pattern 3: Map Container Using .project-card

**What:** Wrap the iframe in a `<div className="project-card">` with `overflow: hidden` and zero padding to clip iframe to the card's border-radius.

```tsx
// Source: app/globals.css:141 — .project-card definition
// padding: 0 overrides the default 1.5rem from .project-card
<div
  className="project-card"
  style={{ padding: 0, overflow: "hidden", borderRadius: "2px" }}
>
  <iframe ... />
</div>
```

**Why `borderRadius: "2px"`:** Matches the project's only non-zero border-radius (scrollbar thumb: `border-radius: 2px` at `globals.css:52`). Without `overflow: hidden`, the iframe corners bleed outside the border-radius. [VERIFIED: globals.css inspection]

### Anti-Patterns to Avoid

- **CSS filter on iframe:** `filter: invert(1)` or `filter: grayscale(1)` — locked out by D-01. Do not apply.
- **Google Maps JS API or @react-google-maps/api:** Requires API key. Out of scope.
- **Adding `"use client"` to page.tsx:** The food section change is static HTML; no client-side code needed. The existing `<ScrollReveal>` client boundary already handles animation.
- **New CSS class for the flex wrapper:** Inline `style` props are the established pattern. Don't add `.food-layout` or similar to globals.css unless a media query is necessary.
- **Setting iframe `height` in CSS instead of attribute:** `height="350"` on the element is the correct pattern for `<iframe>` (same as `width`). CSS `height` also works but attribute is standard practice here.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive iframe sizing | Custom JS resize observer | `width="100%"` on iframe + fixed container width | Browser handles it natively |
| Mobile layout collapse | JS window resize listener | CSS `flexWrap: "wrap"` | Pure CSS, zero JS |
| Map display | Custom canvas/SVG map | Google Maps iframe | Complexity, tile management, zoom logic |
| Card styling | New CSS class | `.project-card` from globals.css | Already exists, matches design system |

**Key insight:** This phase has no logic to implement — it's markup restructuring and a URL. Any hand-rolled solution adds complexity without value.

---

## Common Pitfalls

### Pitfall 1: iframe Default Border
**What goes wrong:** Browsers render a default `border` on `<iframe>` elements — visible as a white or gray line inside the card.
**Why it happens:** Default browser stylesheet.
**How to avoid:** Set `style={{ border: 0 }}` directly on the `<iframe>` element (not the container).
**Warning signs:** A thin white line visible at iframe edges in browser dev tools.

### Pitfall 2: Overflow Visible on Border-Radius
**What goes wrong:** Card has `border-radius: 2px` but iframe corners are still square, creating a visual mismatch.
**Why it happens:** `border-radius` on a container only clips child elements if `overflow: hidden` is set.
**How to avoid:** Add `overflow: "hidden"` to the map container div.
**Warning signs:** iframe corners appear outside the rounded container in browser rendering.

### Pitfall 3: Map Column Not Going Full-Width on Mobile
**What goes wrong:** On small screens the map column stays 350px and overflows the viewport, causing horizontal scroll.
**Why it happens:** `width: 350px; flexShrink: 0` on the right column prevents shrinking below 350px.
**How to avoid:** Use `minWidth: "min(350px, 100%)"` or add a CSS media query override in globals.css that sets the right column to `width: 100%` below a breakpoint.
**Warning signs:** Horizontal scrollbar appears on mobile viewport sizes in browser dev tools.

### Pitfall 4: ScrollReveal Double-Wrapping
**What goes wrong:** Adding a second `<ScrollReveal>` around only the map column causes the rest of the section to animate separately (or not at all).
**Why it happens:** The entire food section content is already inside a `<ScrollReveal>` at line 331. Adding a nested one creates a second IntersectionObserver trigger.
**How to avoid:** Keep the single existing `<ScrollReveal>` wrapper. The two-column flex div goes inside it — do not add another `<ScrollReveal>`.
**Warning signs:** Food section heading animates in separately from the map, or map never animates.

### Pitfall 5: pb= URL Is Stale or Wrong Location
**What goes wrong:** Using a placeholder or hand-crafted `pb=` URL shows the wrong location or a blank map.
**Why it happens:** The `pb=` parameter is an opaque binary encoding; any manual edit breaks it.
**How to avoid:** Generate the URL fresh from Google Maps > Share > Embed a map, searching "Manhattan, New York City" and setting zoom level 13 in the Google Maps UI before copying.
**Warning signs:** Map shows wrong city, wrong zoom, or blank gray tiles.

---

## Code Examples

### Complete food section restructure skeleton

```tsx
// Source: app/page.tsx:326–368 (existing) + CONTEXT.md patterns
// This shows the structural change — left col keeps existing content, right col is new

{/* ── Food ── */}
<section id="food" style={{ padding: "6rem 0" }}>
  <ScrollReveal>
    {/* Two-column flex wrapper */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "flex-start" }}>
      {/* Left column — existing content, unchanged */}
      <div style={{ flex: 1, minWidth: "240px" }}>
        <p className="section-label">Food</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
          Eating my way around.
        </h2>
        <p style={{ fontSize: "13px", color: "var(--color-muted)", maxWidth: "480px", lineHeight: 1.7, marginBottom: "2rem" }}>
          I keep a running list of places I&apos;ve been and want to go — hit me up for recs.
        </p>
        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          <a href="https://maps.app.goo.gl/HnVFL9gccERuvyZH7" target="_blank" rel="noopener noreferrer" className="link" style={{ fontSize: "13px" }}>
            Google Maps List
          </a>
          <a href="https://beliapp.co/app/itsdaniel" target="_blank" rel="noopener noreferrer" className="link" style={{ fontSize: "13px" }}>
            Beli @itsdaniel
          </a>
        </div>
      </div>
      {/* Right column — new map */}
      <div style={{ width: "350px", flexShrink: 0, minWidth: "min(350px, 100%)" }}>
        <div className="project-card" style={{ padding: 0, overflow: "hidden", borderRadius: "2px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=REPLACE_WITH_GENERATED_URL"
            width="100%"
            height="350"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps — Manhattan, NYC"
          />
        </div>
      </div>
    </div>
  </ScrollReveal>
</section>
```

**Action required before implementation:** Replace `pb=REPLACE_WITH_GENERATED_URL` with the actual encoded URL from Google Maps Share > Embed a map.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Google Maps JS API for all embeds | iframe embed with `pb=` URL for static display | ~2016 | No API key needed for read-only map display |
| `frameborder="0"` HTML attribute | `style="border:0"` (CSS) | HTML5 | `frameborder` is deprecated in HTML5 |

**Deprecated/outdated:**
- `frameborder="0"` attribute on `<iframe>`: Replaced by `style={{ border: 0 }}` in HTML5. [CITED: MDN Web Docs]
- `allowfullscreen` (lowercase): React expects camelCase `allowFullScreen` as a JSX prop.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `min()` CSS function is supported in all target browsers for this site | Architecture Patterns — Pattern 1 | Mobile layout fails to collapse; fix: add media query to globals.css instead |
| A2 | `pb=` URL generated from Google Maps UI for "Manhattan" at zoom 13 will center on Midtown/Lower Manhattan correctly | Pitfalls — Pitfall 5 | Wrong map viewport; fix: re-generate URL from Maps UI with adjusted pan |

**If A1 is a concern:** Alternative is to add a CSS media query to `globals.css`:
```css
@media (max-width: 600px) {
  .map-col { width: 100% !important; }
}
```
Then add `className="map-col"` to the right column div. This is explicit and reliable but introduces the first media query and CSS class to the project.

---

## Open Questions (RESOLVED)

1. RESOLVED: **Exact pb= URL for Manhattan zoom 13** — handled in 01-01-PLAN.md Task 1 Step 1: implementer generates the URL live from Google Maps UI (Share > Embed a map, search "Manhattan, New York City", zoom ~13) during execution. Cannot be pre-constructed; plan mandates live generation.

2. RESOLVED: **Mobile responsive strategy: minWidth vs media query** — plan specifies `minWidth: "min(350px, 100%)"` as the primary approach (consistent with project's zero-media-query convention). If `min()` fails in browser testing, fallback is a single `@media (max-width: 600px)` rule in `globals.css` adding `.map-col { width: 100% !important; }`. Task 2 checkpoint verifies mobile behavior at 375px.

---

## Environment Availability

Step 2.6: SKIPPED — no external CLI tools or services required. The Google Maps iframe is a static URL loaded by the visitor's browser. No server-side external dependencies.

---

## Validation Architecture

No test suite configured (`CLAUDE.md` states this explicitly). `workflow.nyquist_validation` not present in config (config.json does not exist).

**Verification approach for this phase:**

| Req ID | Behavior | Test Type | How to Verify |
|--------|----------|-----------|---------------|
| MAP-01 | Google Maps iframe visible in food section | Manual | `npm run dev`, scroll to food section, confirm map renders |
| MAP-02 | Map responsive on mobile | Manual | Chrome DevTools > responsive mode, verify no horizontal overflow at 375px |
| MAP-03 | Map styling fits dark section | Manual | Visual inspection — border matches other cards, no white bleed |

**Lint check (automated):**
```bash
npm run lint
```
Run after implementation to catch JSX attribute errors (e.g., `allowfullscreen` vs `allowFullScreen`).

---

## Security Domain

This phase adds a cross-origin `<iframe>` embedding google.com. No user input, authentication, or data handling is introduced.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | — |
| V3 Session Management | no | — |
| V4 Access Control | no | — |
| V5 Input Validation | no | Static URL, no user input |
| V6 Cryptography | no | — |

**iframe-specific concerns:**

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Clickjacking via embedded iframe | Spoofing | Not applicable — we are the embedder, not the embedded |
| google.com CSP blocking our embed | Tampering | Google Maps explicitly supports embedding; `pb=` URL is the sanctioned no-API-key embed method [CITED: developers.google.com/maps/documentation/embed] |
| `referrerPolicy` leaking origin | Information Disclosure | `referrerPolicy="no-referrer-when-downgrade"` is the Google-recommended value for Maps embeds — sends origin on HTTPS→HTTPS, withholds on HTTPS→HTTP |

No new security surface beyond the iframe itself.

---

## Sources

### Primary (HIGH confidence)
- `app/page.tsx` lines 326–368 — exact food section markup verified by direct read
- `app/globals.css` — `.project-card` definition at line 141, full token set at lines 4–15, zero existing media queries confirmed
- `components/ScrollReveal.tsx` — component signature and behavior verified by direct read
- [CITED: developers.google.com/maps/documentation/embed/embedding-map] — confirms iframe attributes, `referrerPolicy` recommendation, minimum dimensions

### Secondary (MEDIUM confidence)
- `CLAUDE.md` — project architecture, inline style prop convention, no test suite
- `01-CONTEXT.md` — locked decisions D-01 through D-05
- `01-UI-SPEC.md` — approved visual contract, spacing values, exact CSS class assignments

### Tertiary (LOW confidence)
- `min()` CSS function cross-browser support — [ASSUMED] based on training knowledge (MDN shows >95% support as of 2024); not verified against a project-specific browser support target

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; all existing packages verified in package.json
- Architecture: HIGH — single file change, patterns directly observed in codebase
- Pitfalls: HIGH — all pitfalls derived from direct code inspection (not training data guesses)
- pb= URL: LOW — must be generated at implementation time; cannot be pre-verified

**Research date:** 2026-05-06
**Valid until:** Stable — Google Maps embed URL format has been unchanged for years; Next.js/React versions don't affect this change
