import { useCallback, useEffect, useRef, useState } from "react";
import { easeOutCubic, CHART_ENTER_DURATION_MS } from "./motion-constants";

export interface UseChartRevealOptions {
  /** Whether animation is enabled at all. Default true. */
  enabled?: boolean;
  /** Duration in ms. Default: CHART_ENTER_DURATION_MS (900ms) */
  duration?: number;
  /**
   * When this value changes, the reveal animation replays from 0.
   * Use a data version string, filter hash, or date range key.
   * Changing this does NOT remount the component.
   */
  revealKey?: string | number;
  /**
   * Whether reduced motion is active. When true, progress is immediately
   * set to 1 with no animation.
   */
  reduceMotion?: boolean;
}

export interface ChartRevealState {
  /** Animation progress from 0 → 1 */
  progress: number;
  /** True while animation is running */
  isRevealing: boolean;
  /** True once animation has completed at least once */
  isComplete: boolean;
  /** Imperatively trigger a replay */
  replay: () => void;
}

export function useChartReveal({
  enabled = true,
  duration = CHART_ENTER_DURATION_MS,
  revealKey,
  reduceMotion = false,
}: UseChartRevealOptions = {}): ChartRevealState {
  const [progress, setProgress] = useState(enabled && !reduceMotion ? 0 : 1);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isComplete, setIsComplete] = useState(!enabled || reduceMotion);
  const animFrameRef = useRef<number | null>(null);
  const prevRevealKeyRef = useRef(revealKey);

  const startReveal = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (!enabled || reduceMotion) {
      setProgress(1);
      setIsRevealing(false);
      setIsComplete(true);
      return;
    }

    setProgress(0);
    setIsRevealing(true);
    setIsComplete(false);

    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const rawT = Math.min(1, elapsed / duration);
      const easedT = easeOutCubic(rawT);
      setProgress(easedT);

      if (rawT < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(1);
        setIsRevealing(false);
        setIsComplete(true);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [enabled, duration, reduceMotion]);

  // Initial reveal on mount
  useEffect(() => {
    startReveal();
    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Replay when revealKey changes
  useEffect(() => {
    if (revealKey === undefined) return;
    if (prevRevealKeyRef.current !== revealKey) {
      prevRevealKeyRef.current = revealKey;
      startReveal();
    }
  }, [revealKey, startReveal]);

  // If reduceMotion changes at runtime (user toggles), immediately skip to end
  useEffect(() => {
    if (reduceMotion && isRevealing) {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      setProgress(1);
      setIsRevealing(false);
      setIsComplete(true);
    }
  }, [reduceMotion, isRevealing]);

  return { progress, isRevealing, isComplete, replay: startReveal };
}
