---
name: chart-and-motion-engine
description: Designing and implementing 60fps gesture-driven charts, timelines, and interactive animations in pure React Native using Animated, RAF, and PanResponder.
---

# Chart & Motion Engine Skill (`chart-and-motion-engine`)

Use this skill whenever building data charts (lines, splines, bars, donuts, comparisons), timeline scrubbing, or gesture-interactive components in React Native.

---

## 1. Core Motion Invariants

### Animation Primitives
- Use React Native's built-in `Animated` and `requestAnimationFrame`.
- Do NOT import `react-native-reanimated` unless requested by the user.

### Standardized Constants (Import from `_shared/animation`)
```ts
import {
  CHART_ENTER_DURATION_MS, // 1100
  CHART_ENTER_EASING,      // Easing.bezier(0.16, 1, 0.3, 1)
  BAR_STAGGER_DELAY_MS,    // 30
} from "../_shared/animation";
```

### Decoupled 60fps Scrubbing
- **NEVER use spring physics (`Animated.spring`) during high-frequency gesture scrubbing.**
- Scrubbing must be instant and decoupled from entrance transitions.
- Use `Animated.Value` or `requestAnimationFrame` to update cursor X/Y coordinates directly.

---

## 2. Scroll-Immune `PanResponder` Pattern

Using `evt.nativeEvent.locationX` alone causes jitter on mobile whenever the chart container is embedded in a scrollable list. Always use `.measure()` + `pageX`:

```tsx
const containerRef = useRef<View>(null);
const containerLayout = useRef({ pageX: 0, width: 0 });

const updateContainerLayout = useCallback(() => {
  containerRef.current?.measure((_x, _y, width, _height, pageX) => {
    containerLayout.current = { pageX, width };
  });
}, []);

const panResponder = useMemo(
  () =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        updateContainerLayout();
        handleScrub(evt.nativeEvent.pageX);
      },
      onPanResponderMove: (evt) => {
        handleScrub(evt.nativeEvent.pageX);
      },
      onPanResponderRelease: () => {
        // Optional: snap or reset
      },
    }),
  [updateContainerLayout, handleScrub]
);
```

---

## 3. Smooth Number Rolling / Animated Value Transitions

Do not abruptly jump numeric values during scrubbing or period switches. Use rolling number animation or RAF interpolation:

```tsx
// Smooth rolling value updater
const displayValueAnim = useRef(new Animated.Value(initialValue)).current;

useEffect(() => {
  if (reduceMotion) {
    displayValueAnim.setValue(targetValue);
    return;
  }
  Animated.timing(displayValueAnim, {
    toValue: targetValue,
    duration: 250,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: false,
  }).start();
}, [targetValue, reduceMotion]);
```

---

## 4. Floating Tooltip Anti-Clipping Logic

Prevent tooltips from clipping off the left or right screen edges:
```tsx
const tooltipX = useMemo(() => {
  const halfTooltipWidth = 60;
  const padding = 12;
  const rawX = activePointX;
  const minX = halfTooltipWidth + padding;
  const maxX = chartWidth - halfTooltipWidth - padding;
  return Math.max(minX, Math.min(rawX, maxX));
}, [activePointX, chartWidth]);
```

---

## 5. Reduced Motion & Replay Support

```tsx
// Respect user preferences & prop
const shouldAnimate = !reduceMotion;

useEffect(() => {
  if (!shouldAnimate) {
    progressAnim.setValue(1);
    return;
  }
  progressAnim.setValue(0);
  Animated.timing(progressAnim, {
    toValue: 1,
    duration: CHART_ENTER_DURATION_MS,
    easing: CHART_ENTER_EASING,
    useNativeDriver: true,
  }).start();
}, [revealKey, shouldAnimate]);
```
