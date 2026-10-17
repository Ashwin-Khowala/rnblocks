# Awwwards Design Brief: RNBlocks

Generated from live Awwwards SOTD / Developer Award references:
- **Heron AI** (`heron-ai`): Site of the Day (Oct 12, 2026), Score 7.70 (Design 7.75, Creativity 7.85) — Interaction Design, Canvas API, GSAP, Preloader & Hero interaction.
- **Butter** (`butter`): Site of the Day (Sep 28, 2026), Score 7.50 — App Style, Timeline, React, WebGL, High-contrast navigation and dark canvas (`#1E1E1E` / `#F7F7F7`).
- **Townhouse** (`townhouse`): `https://townhouse.dev` — Living architectural visualization of code and developer tools.

---

## 1. Palette & Surface System
- **Obsidian Dark Foundation**: `#070709` / `#0a0a0f` background with `#1E1E1E` - `#282828` elevated component card surfaces.
- **Hairline Micro-Borders**: Subdued borders (`rgba(255, 255, 255, 0.08)` to `0.12`).
- **Technical Accent**: Focused emerald / cyan status signals (`#32c798` / `#10B981`) and restrained editorial warm accents.

---

## 2. Interaction & Motion Rules
- **Live Interactive Centerpieces**: Live React Native Web SVG rendering with 60fps gesture touch/drag tracking (`PanResponder`), never static mockups.
- **Micro-Interactions**: Direct feedback on hover, CLI copy confirmation toast/pill transitions, and fluid tab switches.
- **Motion Restraint**: Essential easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`), no chaotic bounce physics during dragging. Respect `prefers-reduced-motion`.

---

## 3. Architecture & Anti-AI Principles
- **No generic AI tropes**: No screaming uppercase labels, no uniform cards with identical text blocks, no cream/terracotta gradients.
- **Zero DOM in Registry Blocks**: Pure `react-native-svg` primitives only for cross-platform iOS, Android, and Web compatibility.
