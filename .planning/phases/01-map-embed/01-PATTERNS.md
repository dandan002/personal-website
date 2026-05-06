# Phase 1: Map Embed - Pattern Map

**Mapped:** 2026-05-06
**Files analyzed:** 1 (app/page.tsx — food section modification only)
**Analogs found:** 1 / 1

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `app/page.tsx` (lines 326–368) | component (Server Component section) | request-response (static SSR markup) | `app/page.tsx` lines 404–419 (footer flex row) + lines 280–322 (projects section with card pattern) | exact — same file, same patterns |

---

## Pattern Assignments

### `app/page.tsx` — food section restructure (lines 326–368)

This is a markup-only change inside an existing Server Component. No new files are created. The change restructures the food section from single-column to a two-column flex layout and adds an iframe in a `.project-card` wrapper.

---

#### Imports pattern

No new imports needed. The food section already uses both components that are relevant:

**Source:** `app/page.tsx` lines 1–3
```tsx
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import { PERSONAL, EDUCATION, EXPERIENCE, SKILLS, FALLBACK_PROJECTS } from "@/lib/data";
```

---

#### Core pattern 1: Flex row with wrap (two-column layout)

**Analog source:** `app/page.tsx` lines 404–411 — footer `justifyContent: "space-between"` flex row; and food section's own existing link row at lines 347–366.

The footer is the closest existing flex-row-with-wrap pattern in the file:

```tsx
// app/page.tsx lines 404–411 — footer flex row analog
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  }}
>
```

**Adaptation for food section two-column layout:** Use `alignItems: "flex-start"` (not `center`) and `gap: "2rem"`. Left column uses `flex: 1, minWidth: "240px"`. Right column uses `width: "350px", flexShrink: 0, minWidth: "min(350px, 100%)"`.

```tsx
// Two-column wrapper — apply inside existing <ScrollReveal> at line 331
<div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "flex-start" }}>
  {/* Left column */}
  <div style={{ flex: 1, minWidth: "240px" }}>
    {/* existing food section content: label, h2, p, links — unchanged */}
  </div>
  {/* Right column */}
  <div style={{ width: "350px", flexShrink: 0, minWidth: "min(350px, 100%)" }}>
    {/* map container — see Pattern 2 below */}
  </div>
</div>
```

---

#### Core pattern 2: Card wrapper for iframe (.project-card)

**Analog source:** `app/globals.css` lines 141–151 (`.project-card` definition); used throughout the projects section in `app/page.tsx`.

```css
/* app/globals.css lines 141–146 */
.project-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 1.5rem;
  transition: border-color 0.2s ease, background 0.2s ease;
}
```

**How to apply:** Use `className="project-card"` with inline style overrides `padding: 0` and `overflow: "hidden"` to clip the iframe to the card border and suppress the default padding:

```tsx
<div
  className="project-card"
  style={{ padding: 0, overflow: "hidden", borderRadius: "2px" }}
>
  <iframe ... />
</div>
```

**Why `borderRadius: "2px"`:** Matches the only other non-zero border-radius in the project — the scrollbar thumb at `app/globals.css` line 52. `overflow: "hidden"` is required to clip the iframe corners to this radius.

---

#### Core pattern 3: iframe element attributes

**Analog source:** RESEARCH.md — Google Maps embed specification. No existing iframe in the codebase; this is a new element type. Use the following attribute set:

```tsx
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
```

Key attribute notes:
- `style={{ border: 0 }}` — removes default browser iframe border (do not use deprecated `frameborder` attribute)
- `display: "block"` — eliminates inline-element bottom gap that appears on some browsers
- `allowFullScreen` — camelCase JSX prop (not `allowfullscreen`)
- `referrerPolicy="no-referrer-when-downgrade"` — Google-recommended value for Maps embeds
- `loading="lazy"` — deferred load, no functional impact
- `width="100%"` — fills the 350px container; `height="350"` sets square dimensions

**Action required at implementation time:** Replace `pb=REPLACE_WITH_GENERATED_URL` with the URL copied from Google Maps UI: search "Manhattan, New York City" > Share > Embed a map > copy `src` value.

---

#### ScrollReveal pattern

**Analog source:** `app/page.tsx` lines 331–368 — the existing food section `<ScrollReveal>` wrapper.

Do NOT add a second `<ScrollReveal>`. The two-column flex div goes inside the existing single `<ScrollReveal>` at line 331. The whole section animates as one unit.

```tsx
// app/page.tsx line 331 — existing wrapper, keep as-is
<ScrollReveal>
  {/* Replace current single-column content with two-column flex div */}
</ScrollReveal>
```

---

#### Existing food section content (left column — unchanged)

**Source:** `app/page.tsx` lines 332–366 — move verbatim into left column div.

```tsx
// app/page.tsx lines 332–366 — existing content, move into left column unchanged
<p className="section-label">Food</p>
<h2
  style={{
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "clamp(1.4rem, 3vw, 2rem)",
    marginBottom: "1rem",
    letterSpacing: "-0.02em",
  }}
>
  Eating my way around.
</h2>
<p style={{ fontSize: "13px", color: "var(--color-muted)", maxWidth: "480px", lineHeight: 1.7, marginBottom: "2rem" }}>
  I keep a running list of places I&apos;ve been and want to go — hit me up for recs.
</p>
<div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
  <a
    href="https://maps.app.goo.gl/HnVFL9gccERuvyZH7"
    target="_blank"
    rel="noopener noreferrer"
    className="link"
    style={{ fontSize: "13px" }}
  >
    Google Maps List
  </a>
  <a
    href="https://beliapp.co/app/itsdaniel"
    target="_blank"
    rel="noopener noreferrer"
    className="link"
    style={{ fontSize: "13px" }}
  >
    Beli @itsdaniel
  </a>
</div>
```

---

## Shared Patterns

### Inline style props (layout and spacing)

**Source:** `CLAUDE.md` — "Most layout/spacing is done with inline `style` props rather than Tailwind utility classes"
**Apply to:** The two-column flex wrapper and right column div — do not use Tailwind classes for these.

### CSS custom property tokens

**Source:** `app/globals.css` lines 4–15
**Apply to:** Any color or font reference in the new markup — use `var(--color-border)`, `var(--color-surface)`, etc. Do not hardcode hex values.

```css
--color-bg: #0d0d0b;
--color-surface: #141410;
--color-border: #222220;
--color-text: #dbd7cf;
--color-muted: #56534d;
--color-accent: #b8845a;
```

### No media queries convention

**Source:** `app/globals.css` — zero existing media queries confirmed.
**Apply to:** Mobile responsiveness for the two-column layout — use `flexWrap: "wrap"` + `minWidth: "min(350px, 100%)"` on the right column. If `min()` approach fails in testing, add a single `.map-col` override to `globals.css` as a last resort (see RESEARCH.md Assumption A1).

---

## No Analog Found

No files in this phase lack an analog. The single modified file (`app/page.tsx`) provides its own analogs for every sub-pattern:
- Flex row layout: footer section (lines 404–411)
- Card border/background: `.project-card` class (globals.css lines 141–146)
- ScrollReveal wrapping: existing food section wrapper (line 331)
- Link styling: existing food section links (lines 348–365)

The only genuinely new element type is `<iframe>` — no existing iframe in the codebase. Attributes and values come from RESEARCH.md Pattern 2 (cited from Google Maps documentation).

---

## Metadata

**Analog search scope:** `app/page.tsx`, `app/globals.css`, `components/ScrollReveal.tsx`
**Files scanned:** 3
**Pattern extraction date:** 2026-05-06
