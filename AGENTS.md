<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Rules & Behavioral Constraints

## 1. Git Operations Safety (CRITICAL)
- **NEVER** run `git commit`, `git push`, or stage git changes (`git add`) to commit without explicit user command (e.g. "commit changes", "commit and push").
- Always leave modified files in working tree for user review. Never auto-commit upon task completion.
- No proactive publishing, tagging, or remote pushes under any circumstances.

## 2. Icon Imports & Usage
- **NEVER** import external icon libraries (such as `lucide-react`, `@expo/vector-icons`, FontAwesome, etc.) into React Native blocks or web components when internal icons or SVG primitives exist.
- Always use the project's own icon components or `react-native-svg` primitives.
- If a new icon is required, implement it cleanly using `react-native-svg` or the repository's native SVG conventions.

## 3. Barrel Exports & Component Imports
- **NEVER** require or create ad-hoc separate imports for components that belong to a unified package or directory.
- Always export shared components via clean barrel files (e.g., `components/index.ts`, `_shared/index.ts`).
- Consumers must be able to import from the centralized index instead of deep-diving into individual internal paths unless intentionally isolated.

## 4. UI Design, Aesthetics & Responsiveness
- **No Excessive Pill Shapes:** Do not spam `rounded-full` / pill shapes across every UI element or card. Use intentional, proportional border radii.
- **Color & Border Harmony:** Avoid jarring or mismatched border and background colors. Avoid cluttering cards with unnecessary popups or convoluted headers.
- **Text Selection Styling:** Web text selection (`::selection`) must be clean and high-contrast (e.g., white background with black text or neutral theme-matched contrast).
- **Mobile & Small Screen Hierarchy:** Always ensure mobile and small screen views have distinct visual hierarchy:
  - Subtitles, descriptions, or badges must never be identical or competing in size with primary titles.
  - Spacing, padding, and font sizes must scale down elegantly on smaller viewports.

## 5. Data Integrity & Dynamic Computation
- **NEVER hardcode stats or metrics:** Percentages (e.g., `displayPct`), star ratings, total counts, and summary figures must always be dynamically computed from data props.
- No fake hardcoded numbers in components, blocks, or documentation examples.

## 6. React Lifecycle & State Management
- **NEVER perform state updates during render:** Avoid `Cannot update a component while rendering a different component`.
- Pure derived values must be computed directly within the render flow.
- Side effects and external subscriptions must strictly live inside `useEffect` or event callbacks.

## 7. Animation Architecture & Motion Contract
- **Native Animated & RAF Only:** In React Native blocks, use standard `Animated` and `requestAnimationFrame`. Do not add heavy external animation libraries (such as `react-native-reanimated`) unless explicitly requested.
- **Shared Motion Standards:** Adhere to standardized motion constants (`CHART_ENTER_DURATION_MS`, `CHART_ENTER_EASING`, `BAR_STAGGER_DELAY_MS` in `_shared/animation`).
- **Accessibility:** Always support reduced motion (`useReducedMotion` / `reduceMotion` prop) to gracefully skip or minimize animations.
- **Replay Control:** Support `revealKey` / signature for controlled re-triggering of animations.
- **Gesture Scrubbing Performance:** Never use spring physics during 60fps high-frequency gesture scrubbing (e.g. `PanResponder` dragging on charts). Scrubbing must be decoupled from entrance transitions.


