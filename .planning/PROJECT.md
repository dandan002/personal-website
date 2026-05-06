# Personal Website

## What This Is

Daniel Jung's personal website — a single-page portfolio built with Next.js and Tailwind CSS. It showcases his background, experience, projects, and food recommendations to recruiters, researchers, and peers.

## Core Value

A fast, minimal portfolio that communicates who Daniel is and makes it easy to get in touch.

## Current Milestone: v1.0 Google Maps Embed Integration

**Goal:** Add a Google Maps iframe embed of NYC to the food section.

**Target features:**
- Google Maps iframe embed of NYC in the food section
- Responsive sizing that fits the existing layout
- Styled to match the dark site theme

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] MAP-01: Visitor can see a Google Maps iframe embed of NYC in the food section
- [ ] MAP-02: The map embed is responsive and adapts to different screen widths
- [ ] MAP-03: The map embed styling fits the existing dark-themed food section layout

### Out of Scope

- Custom map pins/markers — requires Google Maps JS API key
- Interactive food list filtering by map location — out of scope for this milestone
- Custom map styles/theming — requires Maps JS API

## Context

- Single-page Next.js 15 app (App Router, TypeScript)
- Tailwind v4 with CSS-first config in `globals.css`
- Food section already exists in `app/page.tsx` (lines 326–368) with links to Google Maps List and Beli
- Design tokens: BG `#0d0d0b`, Surface `#141410`, Border `#222220`, Text `#dbd7cf`, Muted `#56534d`, Accent `#b8845a`
- Fonts: Syne (display), DM Mono (body)
- No Google Maps API key — using free iframe embed only

## Constraints

- **Tech**: No Google Maps API key — iframe embed approach only
- **Styling**: Must match existing dark theme, not default Google Maps light UI

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use iframe embed over Maps JS API | No API key setup required, simpler integration | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-06 after milestone v1.0 start*
