# RNBlocks Animation & Motion Contract

This document specifies the motion standards, easing curves, reduced-motion accessibility rules, and lifecycle replay semantics for all interactive blocks in RNBlocks.

---

## 1. Core Principles

1. **Zero External Motion Dependencies**
   - RNBlocks relies strictly on standard React Native `Animated` and `requestAnimationFrame`.
   - No `react-native-reanimated`, `framer-motion`, or runtime provider wrappers are required.
2. **First-Class Accessibility (Reduced Motion)**
   - Every animated chart automatically honors the operating system's reduced motion preferences (`AccessibilityInfo.isReduceMotionEnabled()`).
   - Slices, bars, and containers render immediately in their complete final state when motion is reduced.
3. **Touch Scrubbing & High-Frequency Decoupling**
   - High-frequency touch events (60fps PanResponder dragging) **never** trigger springs or rAF sweeps on underlying geometry.
   - Gestures update state directly (`setActiveIndex()`); springs are reserved exclusively for UI chrome (tooltip repositioning, pill sliding).
4. **Explicit Replay Semantics (`revealKey`)**
   - Filter, tab, and date range transitions replay smoothly without requiring component remounts via the `revealKey` prop.

---

## 2. Motion Constants & Easing Tokens

All shared motion physics and timings are centralized in `registry/blocks/_shared/animation/motion-constants.ts`:

```ts
/** Default duration for chart entrance reveal animations (ms) */
export const CHART_ENTER_DURATION_MS = 900;

/** Default duration for UI chrome element entrances (non-chart) */
export const UI_ENTER_DURATION_MS = 320;

/** Default stagger delay between grouped bars (ms) */
export const BAR_STAGGER_DELAY_MS = 30;

/**
 * Deliberate cubic decelerate curve matching fast start easing into final state.
 * Stiffness: 220, Damping: 24, Mass: 0.85
 */
export const CHART_ENTER_EASING = {
  stiffness: 220,
  damping: 24,
  mass: 0.85,
} as const;

/** Easing function for rAF-based arc sweeps (linear-to-ease-out cubic) */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Easing function for opacity and subtle entrance transitions */
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}
```

---

## 3. Standard Prop Surface

Every animated visualization block implements the following optional animation props:

| Prop | Type | Default | Description |
|---|---|---|---|
| `animated` | `boolean` | `true` | Enables or disables entrance and reveal animations. When `false`, renders in the final static state. |
| `animationDuration` | `number` | `900` | Duration in milliseconds for the reveal sweep or entrance transition. |
| `revealKey` | `string \| number` | `undefined` | Unique key that triggers a replay of the reveal animation when changed without remounting. |
| `reduceMotion` | `"system" \| "always" \| "never"` | `"system"` | Accessibility override: `"system"` obeys OS settings, `"always"` disables motion, `"never"` forces motion. |

---

## 4. Shared Hooks

### `useReducedMotion()`
Live subscription to `AccessibilityInfo.isReduceMotionEnabled()`:
```ts
import { useReducedMotion } from "../../_shared/animation";

const prefersReducedMotion = useReducedMotion();
const shouldReduceMotion =
  reduceMotion === "always" ? true :
  reduceMotion === "never" ? false :
  prefersReducedMotion;
```

### `useChartReveal()`
Unified `requestAnimationFrame` arc-sweep manager with automatic cleanups and `revealKey` replay:
```ts
import { useChartReveal, CHART_ENTER_DURATION_MS } from "../../_shared/animation";

const { progress, isComplete, replay } = useChartReveal({
  enabled: animated && !loading,
  duration: animationDuration ?? CHART_ENTER_DURATION_MS,
  revealKey,
  reduceMotion: shouldReduceMotion,
});
```

---

## 5. Chart-by-Chart Specifications

| Block | Reveal Mechanism | Motion Timing | Scrubbing Decoupling |
|---|---|---|---|
| **PieChart** | `useChartReveal` radial sweep + container spring | 900ms rAF + spring (`stiffness: 220, damping: 24`) | Direct slice selection on drag; spring on readout |
| **DonutChart** | `useChartReveal` radial sweep + container spring | 900ms rAF + spring (`stiffness: 220, damping: 24`) | Direct slice selection on drag; spring on readout |
| **BarChart** | Staggered spring cascade on bar heights | 30ms stagger + spring (`stiffness: 220, damping: 24`) | Direct column spotlighting; spring on tooltip X/Y |
| **GroupedBarChart** | Staggered spring cascade on group bars | 30ms stagger + spring (`stiffness: 220, damping: 24`) | Direct group spotlighting; spring on tooltip X/Y |
| **ComparisonChart** | Container fade + slide-in spring | Spring (`stiffness: 220, damping: 24, mass: 0.85`) | Direct bezier interpolation; instant drag tracking |
| **TrendChart** | Container fade + slide-in spring | Spring (`stiffness: 220, damping: 24, mass: 0.85`) | Direct coordinate spotlight; spring on glow indicator |
