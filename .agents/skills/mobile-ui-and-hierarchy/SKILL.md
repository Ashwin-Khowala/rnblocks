---
name: mobile-ui-and-hierarchy
description: Reviewing and optimizing UI aesthetics, responsive mobile hierarchy (375px to 1440px), proportional border radii, and anti-bloat copy.
---

# Mobile UI & Aesthetic Hierarchy Skill (`mobile-ui-and-hierarchy`)

Use this skill whenever designing or modifying UI components, blocks, cards, or web showcase pages.

---

## 1. Responsive Viewport Testing Matrix

Always verify components at four standard viewports:
1. **Compact Mobile (375px)**: iPhone SE / older devices (tests minimum width tolerance and clipping).
2. **Standard Mobile (390px - 402px)**: iPhone 14/15/16.
3. **Large Mobile (430px)**: iPhone Pro Max / Plus.
4. **Desktop (1024px - 1440px)**: Full web preview and card gallery.

---

## 2. Typography & Hierarchy Invariants
- **Primary Headings:** `fontSize: 22` to `26` (mobile), `28` to `36` (desktop). Bold, high-contrast text (`#FFFFFF` in dark, `#09090B` in light).
- **Subtitles & Badges:** Must NEVER compete with primary titles.
  - Subtitles: `fontSize: 13` to `14`, muted color (`#8E8E93` or `#71717A`).
  - Category / platform chips: `fontSize: 10` to `11`, uppercase font-mono tracking.
- **Fixed-Pixel Safety:** Any text rendered inside cards with fixed pixel constraints (e.g., chart axis labels, tab labels) must have `allowFontScaling={false}` to avoid clipping when system accessibility font scaling is increased.

---

## 3. Aesthetic Proportions & Border Radii
- **The Anti-Pill Rule:**
  - DO NOT use `rounded-full` / pill shapes for everything.
  - Outer cards: `borderRadius: 16` to `24`
  - Inner action buttons / filters: `borderRadius: 8` to `12`
  - Pill shapes (`borderRadius: 9999`) are reserved STRICTLY for tiny indicator dots or single-word chips.
- **Color Harmony:**
  - Dark background: `#07070A` or `#0A0A0F`.
  - Subtle borders: `rgba(255, 255, 255, 0.08)` (dark mode) / `rgba(0, 0, 0, 0.08)` (light mode).
  - Accent: `#32C798` (emerald) or `#10B981`. Avoid discordant neon purples or overly saturated gradients.

---

## 4. Copy De-Bloating & Mobile Readability
- **Eliminate Verbose Copy:** Mobile screens have limited vertical and horizontal real estate.
  - BAD: "Total cumulative volume recorded for the currently active inspection interval"
  - GOOD: "Total Volume"
  - BAD: "Saturday, September 13th, 2026 (Selected Period)"
  - GOOD: "Sat, Sep 13"
- **No Text Collisions:** Never pack multiple statistics, dates, and labels into a single tight horizontal row on mobile. Break into vertical key-value pairs or concise cards.

---

## 5. Touch Target Standards
- Minimum touch target for any interactive button, filter pill, or toggle is $44 \times 44\text{pt}$.
- If visual size is smaller (e.g., a 28px icon button), use `hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}` to maintain touch compliance.
