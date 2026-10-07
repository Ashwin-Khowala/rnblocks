# Workspace Agent Rules & Behavioral Constraints

These rules are strictly enforced across the repository to prevent recurring anti-patterns and maintain high engineering quality.

---

## 1. Git Safety & Operations (ZERO TOLERANCE)
- **NEVER run `git commit`, `git push`, or `git add` to stage commits without explicit user instruction.**
- Clear instructions require explicit user words such as: `"commit and push"`, `"commit these changes"`, or `"make a git commit"`.
- Never auto-commit or auto-push upon completing a task or refactor.
- Always leave modified files cleanly in the working tree for user review.

---

## 2. Icon Usage & Dependencies
- **NEVER import external icon packages** (such as `lucide-react`, `@expo/vector-icons`, FontAwesome, etc.) into React Native blocks or web components when internal icons or SVG primitives exist.
- Always use the project's own icon components or `react-native-svg` primitives.
- When creating or modifying components needing icons, inspect existing icon components in the repo first.

---

## 3. Component Imports & Barrel Files
- **NEVER force ad-hoc or fragmented imports** for components that belong to a cohesive module or package.
- Always export shared components and utilities through unified barrel files (e.g. `components/index.ts`, `_shared/index.ts`).
- Consumers must be able to import directly from the unified export point.

---

## 4. UI Design, Aesthetics & Responsiveness
- **No Overuse of Pill Shapes:** Avoid applying `rounded-full` / pill styling indiscriminately to all cards, chips, or containers. Use thoughtful, proportional border radii.
- **Harmonious Borders & Colors:** Do not use clashing border colors, loud backgrounds, or unnecessary popups/complex card headers.
- **Text Selection:** Selection (`::selection`) must have clean contrast (white background, black text or neutral theme-matched colors).
- **Mobile & Small Screen Hierarchy:**
  - Viewports must maintain strong typography hierarchy.
  - Subtitles, descriptions, or badges must never be identical or competing in size with primary headings.
  - Spacing, padding, and text must scale appropriately without clipping or awkward overflow.

---

## 5. Data Integrity & Dynamic Calculation
- **NEVER hardcode metrics, percentages, or statistics.**
- Values such as `displayPct`, star counts, aggregated sums, or chart points must always be calculated dynamically from the underlying data props.
- No fake or static mock numbers inside reusable blocks.

---

## 6. React Lifecycle & State Management
- **NEVER trigger state updates during the render phase.** Avoid:
  `Cannot update a component while rendering a different component`.
- Pure derived values must be computed inline during render.
- State changes, listeners, and subscriptions must live inside `useEffect`, callbacks, or event handlers.

---

## 7. Animation Contract & Performance
- **Plain React Native `Animated` & `requestAnimationFrame` only.** Do not inject heavy dependencies like `react-native-reanimated` into reusable blocks unless explicitly instructed.
- Standardized motion constants from `_shared/animation` must be followed:
  - `CHART_ENTER_DURATION_MS = 1100`
  - `CHART_ENTER_EASING = Easing.bezier(0.16, 1, 0.3, 1)`
  - `BAR_STAGGER_DELAY_MS = 30`
- **Accessibility:** Always support reduced motion (`useReducedMotion` hook and `reduceMotion` prop). When reduced motion is active, skip or minimize animations.
- **Replay Control:** Support `revealKey` for controlled replay of enter animations.
- **Gesture Scrubbing Performance:** Never use spring physics during 60fps high-frequency gesture scrubbing (e.g. `PanResponder` dragging on charts). Scrubbing must be decoupled from entrance transitions.
