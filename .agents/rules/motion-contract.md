# Motion Contract & 60fps Performance Rule

## 1. Native Animated & RAF Only
- Reusable registry blocks must rely on standard React Native `Animated` and `requestAnimationFrame`.
- **DO NOT add heavy third-party animation libraries** (such as `react-native-reanimated`) into registry blocks unless explicitly requested by the user. Blocks are copy-paste components and must remain zero-dependency.

## 2. Standardized Motion Constants
All charts, entries, and interactive micro-animations must adhere to standardized motion constants (exported from `registry/blocks/_shared/animation`):
- `CHART_ENTER_DURATION_MS = 1100`
- `CHART_ENTER_EASING = Easing.bezier(0.16, 1, 0.3, 1)` (smooth deceleration curve)
- `BAR_STAGGER_DELAY_MS = 30`

## 3. High-Frequency Gesture Scrubbing (60fps Rule)
- **NEVER use spring physics during continuous high-frequency gesture scrubbing** (e.g. `PanResponder` dragging across charts or timelines). Spring oscillations cause severe visual lag and jitter.
- Gesture scrubbing must be strictly decoupled from entrance transitions:
  - Entrance animations animate `scaleY`, `opacity`, or path lengths once on mount / `revealKey`.
  - Scrubbing directly updates pointer indicator positions and active metric values without triggering re-renders of the static chart background.
- Keep SVG path math efficient. Precompute path strings or point arrays; do not re-run full spline calculations inside raw render loops if values have not changed.

## 4. Smooth Value Transitions & Number Rolling
- When scrubbing between data points, numeric values and deltas should transition smoothly (rolling number animation or smooth ticker) rather than abruptly flashing new numbers.
- Active scrub indicators (hairline indicator, glowing intersection circle, floating tooltip) must track touch smoothly across all screen widths.

## 5. Accessibility & Reduced Motion
- Every interactive block with motion must support reduced motion:
  - Provide a `reduceMotion?: boolean` prop.
  - Utilize `useReducedMotion()` hook or check `AccessibilityInfo.isReduceMotionEnabled()`.
  - When reduced motion is active, skip all duration-based entrance transitions and render components immediately in their settled state.
- Support `revealKey` / signature prop to allow deterministic, controlled replay of entrance animations when requested by parent components.
