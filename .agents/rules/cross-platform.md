# Cross-Platform & React Native Compatibility Rule

## 1. Zero Raw DOM Invariants (CRITICAL)
- **NEVER use raw HTML / DOM elements** inside React Native registry blocks (`registry/blocks/`):
  - NO `<svg>`, `<path>`, `<circle>`, `<line>`, `<rect>`, `<defs>`, `<linearGradient>`, `<stop>`, `<g>` from standard DOM.
  - NO `<div>`, `<span>`, `<button>`, `<p>`, `<a>`, `<input>`.
- **ALWAYS use `react-native-svg` primitives**:
  - `<Svg>`, `<Path>`, `<Circle>`, `<Line>`, `<Rect>`, `<Defs>`, `<LinearGradient>`, `<Stop>`, `<G>`.
  - Always import from `"react-native-svg"`.

## 2. Touch & Gesture Architecture
- **NEVER use web pointer APIs** (`onMouseEnter`, `onMouseMove`, `onPointerMove`, `onPointerLeave`, `onClick`) in the primary render path.
- **ALWAYS use the React Native Responder System / `PanResponder`**:
  - Use `PanResponder.create(...)` for continuous gestures (e.g. chart scrubbing, sliders).
  - Use `.measure()` + `pageX` for scroll-immune touch tracking. Never rely solely on `locationX` during continuous drags because `locationX` shifts dynamically as the view scrolls or moves.
  - If web pointer listeners are needed for desktop hover preview, wrap them strictly inside `Platform.select({ web: { ... } })` or guard with `Platform.OS === "web"` with a `// platform:web-safe` comment.

## 3. Strict React Native Types & Dependencies
- Every block claiming `ios` or `android` support MUST be imported in `packages/native-check/src/index.ts`.
- `pnpm validate:native` (`tsc --noEmit -p packages/native-check/tsconfig.json`) must pass with ZERO errors.
- Never import Next.js modules (`next/*`), `"use client"` directives, or Node.js built-ins in registry blocks.
- Never import external icon libraries (`lucide-react`, `@expo/vector-icons`, etc.). Use internal icon components or `react-native-svg`.

## 4. Web Preview Warning Suppression & Hydration Safety
- When rendering in Next.js web preview (`apps/web`):
  - Do NOT pass `collapsable={false}` to components where React Native Web prints DOM warnings.
  - Ensure dynamic dates or random IDs are deterministic between SSR and client render to eliminate hydration mismatch errors.
