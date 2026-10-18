# RNBlocks Design System & Visual Token Contract (`DESIGN.md`)

This document defines the visual tokens, typography, hierarchy, component contracts, and aesthetic principles for **RNBlocks** — across the Next.js web showcase (`apps/web`) and React Native registry blocks (`registry/blocks`).

All AI agents, engineers, and contributors MUST adhere to this specification before authoring or modifying UI components.

---

## 1. Core Visual Principles

1. **Quiet Canvas, Vivid Anchor**:
   The background is a deep, disciplined dark canvas. Expressive boldness belongs to **one memorable focal centerpiece** (such as the interactive SVG chart with atmospheric emerald glow). Do not clutter the interface with competing visual accents.
2. **Anti-AI Tells (Zero SaaS Clichés)**:
   - **No screaming uppercase eyebrow labels**: Replace `font-mono text-xs uppercase tracking-wider` with quiet section indicators (`// 01 Workflow`, `spec 2.4`) or clean headlines.
   - **No repetitive identical card grids**: Use structured asymmetrical bento grids, connected progressive rails, or border-divided technical matrices.
   - **No pill shape spam**: Never apply `rounded-full` to cards, modals, or primary buttons.
   - **No jarring purple/pink blobs**: Keep ambient depth monochromatic or emerald-tinted, under 8–10% opacity.
3. **Tactile Technical Craft**:
   Crisp hairline borders (`rgba(255,255,255,0.08)`), micro-node dots, monospace metric annotations, and instant responsive feedback.

---

## 2. Color System & Design Tokens

### Dark Theme (Primary Brand Canvas)
| Token Name | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `bg-primary` | `#070709` | Deepest root canvas; baseline page background |
| `bg-secondary` | `#09090c` | Secondary section background; alternating section shelf |
| `bg-card` | `#0d0d12` | Main card and bento cell background |
| `bg-card-hover` | `#14141c` | Hover state for interactive cards and cells |
| `bg-elevated` | `#1a1a24` | Floating menus, tooltips, popovers, and elevated controls |
| `text-primary` | `#f5f5f5` | High-contrast headings, active labels, primary values |
| `text-secondary` | `#9ca3af` | Body text, descriptions, explanatory paragraphs |
| `text-muted` | `#71717a` | Micro-annotations, captions, keyboard shortcuts, disabled items |
| `accent-primary` | `#32c798` | Emerald brand accent; active indicators, success markers |
| `accent-hover` | `#4ade80` | Interactive hover state for accent elements |
| `accent-glow` | `rgba(50, 199, 152, 0.08)` | Subtle ambient radial lighting under heroes and focal blocks |
| `border-subtle` | `rgba(255, 255, 255, 0.08)` | Standard card, divider, and container hairline border |
| `border-hover` | `rgba(255, 255, 255, 0.16)` | Interactive hover border for cards and controls |
| `border-active` | `rgba(50, 199, 152, 0.35)` | Active selection, inspected block, or primary focus ring |

### Light Theme (Registry Blocks Dual Support)
| Token Name | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `bg-primary` | `#fafafa` | Clean slate light canvas |
| `bg-card` | `#ffffff` | Pure white card surfaces |
| `bg-elevated` | `#f4f4f5` | Elevated controls, tags, and tabs |
| `text-primary` | `#09090b` | Dark charcoal high-contrast text |
| `text-secondary` | `#52525b` | Medium zinc body copy |
| `text-muted` | `#a1a1aa` | Muted captions and borders |
| `border-subtle` | `rgba(0, 0, 0, 0.08)` | Light hairline border |
| `border-hover` | `rgba(0, 0, 0, 0.15)` | Hover border |

---

## 3. Typography System & Type Roles

### Font Families
- **Sans (`var(--font-sans)`)**: `Nunito Sans`, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif. Clean, geometric, legible at small viewports.
- **Editorial Brand (`var(--font-brand)`)**: `TimesNewRomanMT-Italic`, Georgia, serif. Used exclusively for one italicized word in major headings to create artisanal contrast.
- **Mono (`var(--font-mono)`)**: `JetBrains Mono`, SFMono-Regular, Menlo, monospace. Used for CLI commands, code snippets, specs, and numeric metadata.

### Typography Hierarchy Scale
| Role | Desktop Size / Line-Height | Mobile Size / Line-Height | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `64px` / `1.08` | `36px` / `1.12` | 800 (Extrabold) | `-0.035em` | Landing page hero headline only |
| **Section Title** | `32px – 36px` / `1.15` | `24px` / `1.2` | 800 (Extrabold) | `-0.025em` | Major section titles |
| **Subsection / Card Title** | `18px – 20px` / `1.3` | `16px` / `1.35` | 700 (Bold) | `-0.015em` | Bento card titles, feature headers |
| **Body Large** | `16px` / `1.6` | `14.5px` / `1.55` | 400 (Regular) | `0` | Hero description, lead paragraphs |
| **Body Regular** | `14px` / `1.55` | `13px` / `1.5` | 400 (Regular) | `0` | Card copy, documentation text |
| **Micro Annotation** | `11px – 12px` / `1.4` | `11px` / `1.4` | 500–600 (Mono) | `+0.02em` | Code badges, timestamps, step numbers |

> [!IMPORTANT]
> In React Native registry blocks, always specify `allowFontScaling={false}` on text elements inside fixed-dimension containers to prevent layout breakage from system accessibility text scaling.

---

## 4. Spacing, Grids & Container Constraints

- **Base Spacing Multiplier**: 4px.
  - Scale: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`, `64px`, `80px`, `96px`.
- **Max Container Widths**:
  - Main standard container: `max-w-[1200px] mx-auto px-4 sm:px-6`.
  - Floating navbar: `max-w-[1240px]` (docked) / `max-w-[1360px]` (expanded top).
  - Extended blocks gallery split view: `max-w-[1540px] mx-auto px-4 sm:px-8`.
- **Vertical Rhythm**:
  - Landing page sections: `py-16 md:py-24` with `border-t border-white/[0.06]`.
  - Section headers: `mb-10 md:mb-14`.

---

## 5. Proportional Border Radii System

| Element Type | Target Radius | Rationale |
| :--- | :--- | :--- |
| **Outer Shelves & Cards** | `16px – 24px` (`rounded-2xl` / `rounded-[20px]`) | Balanced frame for dense content |
| **Nested Sections & Modals** | `12px – 16px` (`rounded-xl` / `rounded-[14px]`) | Proportional step-down within cards |
| **Buttons & Input Controls** | `8px – 10px` (`rounded-lg` / `rounded-[10px]`) | Crisp, tactile, professional feel |
| **Tags, Chips, Code Badges** | `6px – 8px` (`rounded-md`) | Compact micro-containers |
| **Status Dots & Avatars Only** | `9999px` (`rounded-full`) | Strictly reserved for circular entities |

> [!WARNING]
> Do NOT use `rounded-full` for standard cards or action buttons. Spammed pill shapes make developer tools look toy-like and consume excessive horizontal margin.

---

## 6. Component Architecture & Rules

### 6.1 Floating Dock Navbar
- Fixed at top (`z-50`).
- Transparent on initial hero view; morphs into a docked floating pill container upon scrolling $>20\text{px}$ (`bg-[#060609]/95 backdrop-blur-xl border border-white/[0.09] shadow-2xl`).
- Contains accessible keyboard shortcut indicator (`⌘K` / `Ctrl K`) opening block search.

### 6.2 Hero Section
- **Visual Centerpiece**: Live interactive SVG chart (`TrendChart`) rendered with zero latency.
- **Atmospheric Depth**: Monochromatic radial gradient behind the chart with zero harsh clipping.
- **Developer Action Bar**: Desktop package manager switcher (`npx`, `pnpm`, `bun`) with instant one-click copy feedback.

### 6.3 Bento Grid & Block Cards
- Asymmetrical 12-column desktop layout (`7:5` / `5:7` row pairing).
- High-contrast dot grid preview canvas (`bg-[#050508]` with `radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)`).
- Discrete bottom metadata overlay (title, category tag, replay trigger, inspector button, copy CLI).
- Micro-node dots at structural intersections (`w-[7px] h-[7px] border border-white/40 bg-[#050508]`).

### 6.4 Developer Workflow & Philosophy
- Avoid identical 3-card or 4-card grids.
- Present workflow as a **continuous progressive technical rail** with connected step lines and real terminal code blocks.
- Present philosophy as an **architectural spec matrix** with hairline column dividers, distinct metric callouts, and quiet numbered indicators.

### 6.5 Code Viewer & Device Frame
- Shiki code highlighting with exact syntax colors matching the theme.
- Interactive toggle between pure TypeScript source code and interactive web preview.
- Frame options: Responsive canvas, iPhone SE (375pt), iPhone 16 (393pt), Pixel 8 (412pt).

---

## 7. Motion & Accessibility Quality Gates

1. **Native Animated Driver & RAF Only**:
   In React Native blocks, use standard `Animated` and `requestAnimationFrame`. No heavy unbundled dependencies.
2. **Motion Standards**:
   - `CHART_ENTER_DURATION_MS = 1100`
   - `CHART_ENTER_EASING = Easing.bezier(0.16, 1, 0.3, 1)`
   - `BAR_STAGGER_DELAY_MS = 30`
3. **WCAG Compliance**:
   - Primary text contrast $\ge 7:1$; secondary text $\ge 4.5:1$.
   - Interactive touch targets $\ge 44 \times 44\text{pt}$ on mobile.
   - Text selection is styled with high contrast: `::selection { background: #ffffff; color: #000000; }`.
   - Clear focus rings for keyboard navigation: `focus-visible:ring-2 focus-visible:ring-[#32c798]`.
