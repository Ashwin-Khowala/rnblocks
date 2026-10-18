# UI Aesthetics, Mobile Hierarchy & Copy Rules

## 0. Mandatory Design System Contract
- **Read `DESIGN.md` & `frontend-design` skill**: Before making UI changes, consult `DESIGN.md` for exact typography, border, color, and spacing tokens.
- **Anti-AI Tells**: Avoid screaming uppercase eyebrow labels (`font-mono text-xs uppercase tracking-wider`), repetitive identical card grids, cream/terracotta cliches, and fade-up animation fatigue. Keep backgrounds disciplined and anchor boldness in one memorable centerpiece.

## 1. No Pill Shape Overuse
- **DO NOT indiscriminately apply `rounded-full` / pill styling** to cards, containers, headers, or major structural wrappers.
- Use intentional, proportional border radii:
  - Outer cards: `borderRadius: 16` to `24`
  - Inner action buttons / filters: `borderRadius: 8` to `12`
  - Micro-chips / status indicators: `borderRadius: 9999` (only for true circular badges or single-word tags)

## 2. Color Tokens & Theme Consistency
- **Zero scattered magic hex codes**: Every block must define a centralized `COLORS` token object at the top of the file:
  ```tsx
  const COLORS = {
    dark: {
      bg: "#07070A",
      card: "#0F0F14",
      border: "rgba(255, 255, 255, 0.08)",
      textPrimary: "#FFFFFF",
      textMuted: "#8E8E93",
      accent: "#32C798",
    },
    light: {
      bg: "#FFFFFF",
      card: "#F4F4F5",
      border: "rgba(0, 0, 0, 0.08)",
      textPrimary: "#09090B",
      textMuted: "#71717A",
      accent: "#10B981",
    },
  };
  ```
- Every block must accept a `theme?: "dark" | "light"` prop and adapt its styling seamlessly.
- Subtle background styling: Dark surfaces use `#07070A` or `#0A0A0F`, clean neutral borders (`rgba(255,255,255,0.08)`), and optional blueprint dot grids. Avoid neon borders, mismatched purple accents, or chaotic gradients.

## 3. Mobile Viewport & Small Screen Hierarchy
- Components and web showcase views must be tested across mobile screen widths (375px iPhone SE, 390px iPhone standard, 430px iPhone Pro Max) up to 1440px desktop:
  - **No Competing Hierarchy:** Subtitles, descriptions, and badges must NEVER compete with or match the font size of primary headings.
  - **No Card Clipping:** Padding and margins must scale gracefully down on smaller viewports. Containers must never overflow horizontally.
  - **Fixed Dimension Safety:** Text rendered inside fixed-pixel containers (e.g. chart axis labels, dock labels) must declare `allowFontScaling={false}` to prevent severe UI clipping on devices with extra-large accessibility font settings.
  - **Touch Targets:** Interactive buttons, tabs, and filters must meet the minimum $44 \times 44\text{pt}$ touch target requirement.

## 4. Concise Copy & Anti-Bloat Standard
- **Never stuff excessive text on mobile screens:**
  - Avoid verbose multi-line descriptions on compact cards.
  - Keep button labels, metric subtitles, and tooltips concise (e.g. "Total Volume", not "Total volume for currently selected inspection period").
  - Simplify date formats on mobile: "Sat, Jan 27" rather than "Saturday (January 27th, 2026)".
