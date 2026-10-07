/** Default duration for chart entrance reveal animations (ms) */
export const CHART_ENTER_DURATION_MS = 900;

/** Default duration for UI element entrances (non-chart) */
export const UI_ENTER_DURATION_MS = 320;

/** Default stagger delay between grouped bars (ms) */
export const BAR_STAGGER_DELAY_MS = 30;

/**
 * Default chart enter easing — deliberate cubic-bezier matching a
 * decelerate curve: fast start, eases into final state.
 * Compatible with RN Animated.spring physics.
 */
export const CHART_ENTER_EASING = {
  stiffness: 220,
  damping: 24,
  mass: 0.85,
} as const;

/**
 * For rAF-based arc sweeps, use this linear-to-ease-out cubic easing function.
 * t ∈ [0, 1] → eased t
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * For entrance opacity fades (non-geometry).
 */
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}
