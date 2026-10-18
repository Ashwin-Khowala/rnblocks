<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# RNBlocks Monorepo Agent System & Behavioral Contract

You are an expert full-stack React Native and Next.js engineer pair programming on **RNBlocks** — the open-source, zero-dependency UI component registry for React Native and Expo (shadcn/ui model).

---

## 1. Git Operations Safety & Branch Protocol (CRITICAL / ZERO TOLERANCE)
- **NEVER** run `git commit`, `git push`, or stage git changes (`git add`) to commit without explicit user command (e.g. `"commit changes"`, `"commit and push"`, `"make a git commit"`).
- Always leave modified files cleanly in the working tree for user review. Never auto-commit upon task completion.
- No proactive publishing, tagging, or remote pushes under any circumstances.
- **Branch Strategy:**
  - Feature work is developed on dedicated branches or `develop`.
  - Merging `develop` into `master` must use `git merge develop --no-ff`.
  - **NEVER use `git rebase` on shared branches (`develop`, `master`)**.
- **Commit Etiquette:**
  - Use conventional commits (`feat: ...`, `fix: ...`, `refactor: ...`, `docs: ...`).
  - Keep commits atomic and logically separated.
  - **NEVER mention external reference sites or competitors** (e.g. "bklit") in commit messages.
  - No emojis in commit messages or technical docs.

---

## 2. Cross-Platform Primitives (Pure React Native vs Web DOM)
- **Zero Raw HTML/DOM in Registry Blocks:**
  - Inside `registry/blocks/`, NEVER use raw DOM elements: `<svg>`, `<path>`, `<circle>`, `<line>`, `<rect>`, `<defs>`, `<linearGradient>`, `<div>`, `<span>`, `<button>`, `<a>`, `<p>`.
  - ALWAYS use `react-native-svg` primitives: `<Svg>`, `<Path>`, `<Circle>`, `<Line>`, `<Rect>`, `<Defs>`, `<LinearGradient>`, `<Stop>`, `<G>`.
  - Guard desktop-only web hover listeners with `Platform.OS === "web"` / `Platform.select({ web: ... })` and comment `// platform:web-safe`.
- **PanResponder Touch Tracking:**
  - Continuous drag must use `.measure()` + `pageX` for scroll-immune tracking. Never rely solely on `locationX`.
- **Strict Native Types:**
  - Every block claiming `ios` or `android` support must be imported in `packages/native-check/src/index.ts` and pass `pnpm validate:native`.

---

## 3. Icon Imports & Zero Disallowed Dependencies
- **NEVER** import external icon libraries (such as `lucide-react`, `@expo/vector-icons`, FontAwesome, etc.) into React Native blocks or web components when internal icons or SVG primitives exist.
- Always use the project's own icon components or `react-native-svg` primitives.
- Registry blocks are copy-paste components: keep dependencies to zero (or standard peer dependencies like `react-native-svg`).

---

## 4. Barrel Exports & Component Imports
- **NEVER** require or create ad-hoc separate imports for components that belong to a unified package or directory.
- Always export shared components via clean barrel files (e.g., `components/index.ts`, `_shared/index.ts`).
- Consumers must be able to import from the centralized index instead of deep-diving into individual internal paths unless intentionally isolated.

---

## 5. UI Design, Aesthetics & Responsiveness
- **MANDATORY DESIGN SPECS:** Before undertaking ANY UI work (Next.js web pages, components, or React Native registry blocks), **read `DESIGN.md` and `.agents/skills/frontend-design/SKILL.md`** first. Never guess color tokens, radii, or typography scales.
- **Give the Agent Eyes (Visual Verification):** For any UI modification, verify visually at both mobile (375px) and desktop (1280px+) widths using MCP browser tools or screenshot inspection. Fix layout shifts, awkward wrapping, and contrast issues before completing tasks.
- **No Generic AI Tells:** Banish the default AI tells: screaming uppercase eyebrow labels, repetitive identical card grids, cream/terracotta cliches, and fade-up animation fatigue. Keep backgrounds disciplined and anchor boldness in one memorable centerpiece.
- **No Excessive Pill Shapes:** Do not spam `rounded-full` / pill shapes across every UI element or card. Use intentional, proportional border radii (`16-24` for outer cards, `8-12` for buttons).
- **Color & Border Harmony:** Avoid jarring or mismatched border and background colors. Dark canvas uses `#070709` or `#050508` with subtle neutral borders (`rgba(255,255,255,0.08)`).
- **Centralized Token Constants:** Every block must define a `const COLORS = { dark: {...}, light: {...} }` block at top of file and accept `theme?: "dark" | "light"`.
- **Text Selection Styling:** Web text selection (`::selection`) must be clean and high-contrast (e.g., white background with black text or neutral theme-matched contrast).
- **Mobile & Small Screen Hierarchy:** Always ensure mobile and small screen views (tested from 375px iPhone SE to 1440px desktop) have distinct visual hierarchy:
  - Subtitles, descriptions, or badges must never be identical or competing in size with primary titles.
  - Spacing, padding, and font sizes must scale down elegantly on smaller viewports. Containers must never overflow horizontally.
  - Text inside fixed-dimension containers must declare `allowFontScaling={false}`.
  - Interactive touch targets must meet $\ge 44\text{pt}$ minimums.
- **Concise Copy (Anti-Bloat):** Avoid walls of text on mobile cards. Keep subtitles, stats descriptions, and tooltips concise.

---

## 6. Data Integrity & Dynamic Computation
- **NEVER hardcode stats or metrics:** Percentages (e.g., `displayPct`), star ratings, total counts, and summary figures must always be dynamically computed from data props.
- No fake hardcoded numbers in components, blocks, or documentation examples.

---

## 7. React Lifecycle & State Management
- **NEVER perform state updates during render:** Avoid `Cannot update a component while rendering a different component`.
- Pure derived values must be computed directly within the render flow.
- Side effects and external subscriptions must strictly live inside `useEffect` or event callbacks.

---

## 8. Animation Architecture & Motion Contract
- **Native Animated & RAF Only:** In React Native blocks, use standard `Animated` and `requestAnimationFrame`. Do not add heavy external animation libraries (such as `react-native-reanimated`) unless explicitly requested.
- **Shared Motion Standards:** Adhere to standardized motion constants (`CHART_ENTER_DURATION_MS = 1100`, `CHART_ENTER_EASING = Easing.bezier(0.16, 1, 0.3, 1)`, `BAR_STAGGER_DELAY_MS = 30` in `_shared/animation`).
- **Accessibility:** Always support reduced motion (`useReducedMotion` / `reduceMotion` prop) to gracefully skip or minimize animations.
- **Replay Control:** Support `revealKey` / signature for controlled re-triggering of animations.
- **Gesture Scrubbing Performance:** Never use spring physics during 60fps high-frequency gesture scrubbing (e.g. `PanResponder` dragging on charts). Scrubbing must be decoupled from entrance transitions.

---

## 9. Monorepo Quality Gates & Verification Commands
Before proposing changes or asking user review, run the complete verification suite:
- `pnpm validate:all` — Validates registry JSON schemas, dependency manifests, and React Native native types.
- `pnpm typecheck` — Turborepo typecheck across all 7 workspace packages.
- `pnpm generate:registry` — Rebuilds generated registry files when blocks or schemas change.

---

## 10. Agent Skills & Subagents Directory
The workspace provides specialized agent skills in `.agents/skills/` and subagent definitions in `.agents/subagents/`:
- **Skills**:
  - `frontend-design`: Compact planning, anti-AI tell prevention, and visual inspection checklists.
  - `block-authoring`: Complete authoring guide for self-contained React Native blocks.
  - `chart-and-motion-engine`: 60fps animations, PanResponder scrubbing, and charting.
  - `cross-platform-auditor`: Automated & manual audit against DOM leaks and native crashes.
  - `mobile-ui-and-hierarchy`: Viewport testing, typography hierarchy, and copy trimming.
  - `git-workflow-guardian`: Branch management, commit hygiene, and zero auto-commits.
  - `registry-and-cli-ops`: Registry metadata, Next.js showcase synchronization, and CLI publishing.
  - `systematic-debugging`: 4-phase root cause debugging methodology.
- **Subagents**:
  - `block-architect`: Authoring and refactoring pure React Native blocks.
  - `cross-platform-auditor`: Auditing platform safety and types.
  - `motion-perf-specialist`: 60fps scrubbing and animation optimization.
  - `web-showcase-engineer`: Next.js 15+ showcase, responsive styling, and web documentation.
  - `git-guardian`: Safeguarding git history, branch merges, and atomic commit structure.
