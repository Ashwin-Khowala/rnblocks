import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

/**
 * Returns true when the user's system accessibility setting requests
 * reduced or no motion.
 *
 * Platform behavior:
 * - iOS: reads "Reduce Motion" from Accessibility settings
 * - Android: reads "Remove Animations" from Accessibility settings  
 * - Web (RN Web): reads prefers-reduced-motion via AccessibilityInfo
 *
 * Usage:
 *   const prefersReducedMotion = useReducedMotion();
 *   if (prefersReducedMotion) { // skip animation, show final state }
 */
export function useReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Read initial value safely
    AccessibilityInfo.isReduceMotionEnabled?.()
      ?.then((val: boolean) => {
        setReduceMotion(Boolean(val));
      })
      ?.catch(() => {
        setReduceMotion(false);
      });

    const handleChange = (val: boolean) => setReduceMotion(Boolean(val));

    // Subscribe to changes (user toggles setting while app is open)
    const subscription = AccessibilityInfo.addEventListener?.(
      "reduceMotionChanged",
      handleChange
    );

    return () => {
      if (subscription?.remove) {
        subscription.remove();
      } else if (
        typeof (AccessibilityInfo as unknown as { removeEventListener?: (event: string, handler: (val: boolean) => void) => void }).removeEventListener === "function"
      ) {
        (AccessibilityInfo as unknown as { removeEventListener: (event: string, handler: (val: boolean) => void) => void }).removeEventListener(
          "reduceMotionChanged",
          handleChange
        );
      }
    };
  }, []);

  return reduceMotion;
}
