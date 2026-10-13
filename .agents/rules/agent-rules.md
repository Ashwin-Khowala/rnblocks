# Workspace Agent Rules & Invariants

These rules are strictly enforced across the RNBlocks monorepo. Every agent working in this repository must comply with these invariants.

---

## 1. Git Safety & Operations (ZERO TOLERANCE)
- **NEVER run `git commit`, `git push`, or `git add` to stage commits without explicit user instruction.**
- Explicit commands: `"commit and push"`, `"commit these changes"`, `"make a git commit"`.
- Never auto-commit or auto-push upon completing a task or refactor.
- Always leave modified files cleanly in the working tree for user review.
- Branch workflow: Develop on feature branches / `develop`. Merge `develop` to `master` with `--no-ff`. Never rebase shared branches.
- Commit etiquette: Conventional commits, atomic grouping, NO emojis, and NEVER mention reference sources (e.g. "bklit") in commit messages.

---

## 2. Cross-Platform & Pure React Native Primitives
- **Zero Raw HTML/DOM in Registry Blocks:**
  - Strictly forbidden in `registry/blocks/`: `<svg>`, `<path>`, `<circle>`, `<line>`, `<rect>`, `<defs>`, `<linearGradient>`, `<div>`, `<span>`, `<button>`, `<a>`, `<p>`.
  - Always use `react-native-svg` primitives: `<Svg>`, `<Path>`, `<Circle>`, `<Line>`, `<Rect>`, `<Defs>`, `<LinearGradient>`, `<Stop>`, `<G>`.
  - Any web-only desktop hover features must be guarded with `Platform.OS === "web"` / `Platform.select({ web: ... })` and marked with `// platform:web-safe`.
- **PanResponder Touch Tracking:**
  - Continuous drag must use `.measure()` + `pageX` for scroll-immune tracking. Never rely solely on `locationX`.
- **Native Type Safety:**
  - Every block claiming `ios` or `android` support must be imported in `packages/native-check/src/index.ts` and pass `pnpm validate:native`.

---

## 3. Icon Imports & Zero Disallowed Dependencies
- **NEVER import external icon packages** (such as `lucide-react`, `@expo/vector-icons`, FontAwesome, etc.) into React Native blocks or web components when internal icons or SVG primitives exist.
- Always use the project's own icon components or `react-native-svg` primitives.
- Registry blocks are copy-paste modules: keep dependencies to zero (or standard peer dependencies like `react-native-svg`).

---

## 4. Barrel Exports & Unified Module Imports
- **NEVER force ad-hoc or fragmented imports** for components that belong to a cohesive module or package.
- Always export shared components and utilities through unified barrel files (e.g. `components/index.ts`, `_shared/index.ts`).
- Consumers must be able to import directly from the unified export point.

---

## 5. UI Design, Aesthetics & Mobile Hierarchy
- **No Pill Shape Overuse:** Avoid applying `rounded-full` / pill styling indiscriminately across cards, containers, or headers. Use intentional, proportional radii (`borderRadius: 16-24` for cards, `8-12` for buttons).
- **Harmonious Borders & Colors:** Use dark canvas palette (`#07070A` / `#0A0A0F`), clean neutral borders (`rgba(255,255,255,0.08)`), and optional blueprint dot grids.
- **Centralized Token Constant:** Every block must define a `const COLORS = { dark: {...}, light: {...} }` block at the top and accept `theme?: "dark" | "light"`.
- **Mobile Viewport Hierarchy:** Test from 375px (iPhone SE) to 1440px desktop. Subtitles and badges must never compete in size with primary headings. Text in fixed-pixel containers must specify `allowFontScaling={false}`.
- **Concise Copy (Anti-Bloat):** Keep mobile headings, subtitles, and tooltips short. Do not clutter cards with verbose paragraphs.

---

## 6. Data Integrity & Dynamic Calculation
- **NEVER hardcode metrics, percentages, or statistics:**
  - Props like `displayPct`, totals, deltas, or chart coordinates must always be dynamically computed from data props.
  - No fake or static mock numbers inside reusable blocks or documentation examples.

---

## 7. React Lifecycle & State Management
- **NEVER trigger state updates during the render phase:**
  - Avoid `Cannot update a component while rendering a different component`.
  - Pure derived values must be computed inline during render.
  - Side effects, listeners, and subscriptions must live inside `useEffect`, callbacks, or event handlers.

---

## 8. Motion Contract & 60fps Performance
- **Plain React Native `Animated` & `requestAnimationFrame` only.** Do not inject heavy dependencies like `react-native-reanimated` into reusable blocks unless explicitly instructed.
- Standardized motion constants from `_shared/animation` must be followed:
  - `CHART_ENTER_DURATION_MS = 1100`
  - `CHART_ENTER_EASING = Easing.bezier(0.16, 1, 0.3, 1)`
  - `BAR_STAGGER_DELAY_MS = 30`
- **Scrubbing Performance:** NEVER use spring physics during continuous high-frequency gesture scrubbing (e.g. `PanResponder` dragging on charts). Scrubbing must be decoupled from entrance transitions.
- **Accessibility:** Always support reduced motion (`useReducedMotion` hook and `reduceMotion` prop). When reduced motion is active, skip animations. Support `revealKey` for controlled re-triggering.

---

## 9. Registry & Monorepo Synchronization
- Whenever a block is created or modified:
  1. Ensure `registry/blocks/<slug>/registry.json` is accurate.
  2. Run `pnpm generate:registry` to compile registry manifests.
  3. Update `apps/web/data/block-docs.ts` and `apps/web/data/blocks.tsx`.
  4. Run `pnpm validate:all` (`validate:registry`, `validate:deps`, `validate:native`).
