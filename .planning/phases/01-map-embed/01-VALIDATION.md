---
phase: 1
slug: map-embed
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-06
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — no test suite configured (CLAUDE.md) |
| **Config file** | none |
| **Quick run command** | `npm run lint` |
| **Full suite command** | `npm run lint && npm run build` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint`
- **After every plan wave:** Run `npm run lint && npm run build`
- **Before `/gsd-verify-work`:** Full suite must be green + manual visual check
- **Max feedback latency:** ~10 seconds (lint); build ~30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|--------|
| 1-01-01 | 01 | 1 | MAP-01 | — | referrerPolicy="no-referrer-when-downgrade" set on iframe | manual + lint | `npm run lint` | ⬜ pending |
| 1-01-02 | 01 | 1 | MAP-02 | — | N/A | manual | Chrome DevTools responsive mode | ⬜ pending |
| 1-01-03 | 01 | 1 | MAP-03 | — | N/A | manual | Visual inspection in browser | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework installation needed — `npm run lint` is available out of the box.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Google Maps iframe visible in food section | MAP-01 | No test suite; visual rendering cannot be asserted with lint | `npm run dev` → open localhost:3000 → scroll to food section → confirm map renders with correct NYC/Manhattan location |
| Map responsive on mobile (no horizontal overflow) | MAP-02 | CSS layout behavior requires viewport testing | Chrome DevTools → toggle device toolbar → set viewport to 375px width → verify no horizontal scrollbar, map fills full width |
| Map styling fits dark section (no white bleed) | MAP-03 | Visual design quality cannot be asserted with lint | Visual inspection — confirm `.project-card` border visible, no white iframe background bleeding into dark section, border-radius clips corners |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
