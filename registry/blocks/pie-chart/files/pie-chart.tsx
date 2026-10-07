import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type PanResponderGestureState,
} from "react-native";
import Svg, {
  Circle,
  G,
  Path,
} from "react-native-svg";
import { generatePieA11ySummary } from "./pie-chart.a11y";
import { RollingPercent, SmoothLabel } from "./pie-chart.rolling-number";
import type {
  PieChartProps,
  PieDataPoint,
} from "./pie-chart.types";
import {
  DEFAULT_PIE_DATA,
  PIE_CHART_THEME_TOKENS,
  computePieSlices,
  describePieSlice,
} from "./pie-chart.utils";
import {
  CHART_ENTER_DURATION_MS,
  CHART_ENTER_EASING,
  useChartReveal,
  useReducedMotion,
} from "../../_shared/animation";

export function PieChart({
  data = DEFAULT_PIE_DATA,
  theme = "dark",
  variant = "brand",
  title = "Distribution",
  subtitle = "Interactive breakdown",
  valuePrefix = "",
  valueSuffix = "",
  size = 250,
  padAngle = 0,
  explosionDistance = 10,
  startAngleOffset = 270,
  animated = true,
  animationDuration,
  revealKey,
  reduceMotion = "system",
  loading = false,
  centerLabel = "Total",
  initialIndex = null,
  accessibilityLabel,
  onSelectSlice,
  numberFontFamily,
  style,
}: PieChartProps) {
  const colors = PIE_CHART_THEME_TOKENS[theme] || PIE_CHART_THEME_TOKENS.dark;

  // Sanitize data: respect explicit empty array data={[]} while defaulting undefined/null to DEFAULT_PIE_DATA
  const safeData = useMemo(() => {
    return Array.isArray(data) ? data : DEFAULT_PIE_DATA;
  }, [data]);

  // Responsive layout: measure card container to guarantee chart never overflows narrow viewports
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const onCardLayout = useCallback((e: LayoutChangeEvent) => {
    const width = e.nativeEvent?.layout?.width;
    if (typeof width === "number" && width > 0) {
      setContainerWidth(width);
    }
  }, []);

  // Responsive size calculation: adapt to narrow cards while preserving requested size when space permits
  const effectiveSize = useMemo(() => {
    if (containerWidth <= 0) return size;
    const maxAvailable = Math.max(120, containerWidth - 40); // 40px = card paddingHorizontal 20 * 2
    return Math.min(size, maxAvailable);
  }, [size, containerWidth]);

  // Compute geometry for slices (padAngle=0 by default for continuous, flush pie wedges)
  const { slices, total, centerX, centerY, radius } = useMemo(() => {
    return computePieSlices(
      safeData,
      effectiveSize,
      padAngle,
      explosionDistance,
      theme,
      variant,
      startAngleOffset
    );
  }, [
    safeData,
    effectiveSize,
    padAngle,
    explosionDistance,
    theme,
    variant,
    startAngleOffset,
  ]);

  // Active selected or scrubbed slice index (null = idle state showing overall total)
  const [activeSliceIndex, setActiveSliceIndex] = useState<number | null>(() => {
    if (typeof initialIndex === "number" && initialIndex >= 0 && initialIndex < slices.length) {
      return initialIndex;
    }
    return null;
  });
  const [pinnedSliceIndex, setPinnedSliceIndex] = useState<number | null>(() => {
    if (typeof initialIndex === "number" && initialIndex >= 0 && initialIndex < slices.length) {
      return initialIndex;
    }
    return null;
  });
  const activeSliceIndexRef = useRef<number | null>(activeSliceIndex);
  activeSliceIndexRef.current = activeSliceIndex;
  const pinnedSliceIndexRef = useRef<number | null>(pinnedSliceIndex);
  pinnedSliceIndexRef.current = pinnedSliceIndex;

  // Track active touch scrubbing vs stationary tap
  const isScrubbingRef = useRef(false);
  // Timestamp when touch interaction ended to suppress synthetic click events on mobile web
  const lastTouchEndTimeRef = useRef(0);

  // Measurement ref for touch coordinates (scroll-immune)
  const chartWrapperRef = useRef<React.ElementRef<typeof View>>(null);
  const chartOffsetRef = useRef({ pageX: 0, pageY: 0, width: effectiveSize, height: effectiveSize });
  const cachedRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const measureChart = useCallback(() => {
    const node = chartWrapperRef.current as any;
    if (Platform.OS === "web") {
      const rect = node?.getBoundingClientRect?.(); // platform:web-safe
      if (rect && rect.width > 0) {
        const g = globalThis as any;
        const scrollX = g?.window ? (g.window.scrollX ?? g.window.pageXOffset ?? 0) : 0; // platform:web-safe
        const scrollY = g?.window ? (g.window.scrollY ?? g.window.pageYOffset ?? 0) : 0; // platform:web-safe
        chartOffsetRef.current = {
          pageX: rect.left + scrollX,
          pageY: rect.top + scrollY,
          width: rect.width,
          height: rect.height,
        };
        return;
      }
    }
    node?.measure?.(
      (_x: number, _y: number, width: number, height: number, pageX: number, pageY: number) => {
        if (width > 0 && height > 0) {
          chartOffsetRef.current = { pageX, pageY, width, height };
        }
      }
    );
  }, []);

  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion =
    reduceMotion === "always"
      ? true
      : reduceMotion === "never"
      ? false
      : prefersReducedMotion;

  // ── Circular Sweep Reveal Animation for Each Pie Slice ─────────────────────
  const {
    progress: animProgress,
    isComplete: isLoaded,
    replay,
  } = useChartReveal({
    enabled: animated && !loading,
    duration: animationDuration ?? CHART_ENTER_DURATION_MS,
    revealKey,
    reduceMotion: shouldReduceMotion,
  });

  // Entrance spring animation value for whole container
  const entranceAnim = useRef(
    new Animated.Value(animated && !shouldReduceMotion ? 0 : 1)
  ).current;

  useEffect(() => {
    if (!animated || shouldReduceMotion) {
      entranceAnim.setValue(1);
      return;
    }
    entranceAnim.setValue(0);
    Animated.spring(entranceAnim, {
      toValue: 1,
      stiffness: CHART_ENTER_EASING.stiffness,
      damping: CHART_ENTER_EASING.damping,
      mass: CHART_ENTER_EASING.mass,
      useNativeDriver: true,
    }).start();
  }, [animated, shouldReduceMotion, entranceAnim]);

  // Active slice info
  const activeSlice = activeSliceIndex !== null ? slices[activeSliceIndex] : null;
  const activeLabel = activeSlice ? activeSlice.item.label : centerLabel;
  const activePercent = activeSlice ? activeSlice.percentage : total > 0 ? 100 : 0;

  // Update selection callback
  const handleSelectIndex = useCallback(
    (index: number | null, pin = false) => {
      const nextIndex = index !== null && index >= 0 && index < slices.length ? index : null;
      if (pin) {
        setPinnedSliceIndex(nextIndex);
      }
      if (nextIndex !== activeSliceIndexRef.current) {
        setActiveSliceIndex(nextIndex);
        const item = nextIndex !== null ? slices[nextIndex]?.item ?? null : null;
        onSelectSlice?.(item, nextIndex);
      }
    },
    [slices, onSelectSlice]
  );

  // Clear / reset handler
  const handleResetPress = useCallback(() => {
    if (activeSliceIndexRef.current !== null || pinnedSliceIndexRef.current !== null) {
      handleSelectIndex(null, true);
    } else {
      replay();
    }
  }, [handleSelectIndex, replay]);

  // Find slice index from touch coordinates relative to chart center
  const getSliceIndexFromCoords = useCallback(
    (relX: number, relY: number): number | null => {
      const dx = relX - centerX;
      const dy = relY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Outside pie perimeter -> ignore
      if (dist > radius + 18) {
        return null;
      }

      // Compute angle in degrees where 0deg = 12 o'clock, 90deg = 3 o'clock
      const rad = Math.atan2(dy, dx);
      let deg = (rad * 180) / Math.PI + 90;
      if (deg < 0) deg += 360;

      // Find which slice covers this angle
      for (const s of slices) {
        const sStart = ((s.startAngle % 360) + 360) % 360;
        const sEnd = ((s.endAngle % 360) + 360) % 360;

        if (sStart <= sEnd) {
          if (deg >= sStart && deg <= sEnd) {
            return s.index;
          }
        } else {
          // Spans 0° / 360° boundary
          if (deg >= sStart || deg <= sEnd) {
            return s.index;
          }
        }
      }
      return null;
    },
    [centerX, centerY, radius, slices]
  );

  // Helper to extract relative touch coordinates reliably across iOS, Android, and Web
  const getRelativeTouchCoords = useCallback(
    (evt: any) => {
      if (Platform.OS === "web") {
        const node = chartWrapperRef.current as any;
        const rect = node?.getBoundingClientRect?.(); // platform:web-safe
        if (rect && rect.width > 0) {
          const ne = evt.nativeEvent || evt;
          const touch =
            (ne.changedTouches && ne.changedTouches[0]) ||
            (ne.touches && ne.touches[0]) ||
            ne;
          const g = globalThis as any;
          const scrollX = g?.window ? (g.window.scrollX ?? g.window.pageXOffset ?? 0) : 0; // platform:web-safe
          const scrollY = g?.window ? (g.window.scrollY ?? g.window.pageYOffset ?? 0) : 0; // platform:web-safe
          const clientX =
            touch.clientX ?? (typeof touch.pageX === "number" ? touch.pageX - scrollX : undefined);
          const clientY =
            touch.clientY ?? (typeof touch.pageY === "number" ? touch.pageY - scrollY : undefined);
          if (typeof clientX === "number" && typeof clientY === "number") {
            return {
              relX: clientX - rect.left,
              relY: clientY - rect.top,
            };
          }
        }
      }

      const locX = evt.nativeEvent?.locationX;
      const locY = evt.nativeEvent?.locationY;
      if (
        typeof locX === "number" &&
        typeof locY === "number" &&
        locX >= 0 &&
        locX <= effectiveSize &&
        locY >= 0 &&
        locY <= effectiveSize
      ) {
        return { relX: locX, relY: locY };
      }
      const pageX = evt.nativeEvent?.pageX ?? 0;
      const pageY = evt.nativeEvent?.pageY ?? 0;
      return {
        relX: pageX - chartOffsetRef.current.pageX,
        relY: pageY - chartOffsetRef.current.pageY,
      };
    },
    [effectiveSize]
  );

  // ── High-Frequency Interaction Rule ──────────────────────────────────────────
  // Touch-move events fire at 60fps. We NEVER run Animated.spring() or
  // requestAnimationFrame sweeps during scrubbing. Only direct state
  // updates: setActiveIndex(), setActiveSliceIndex().
  // Springs are only used for UI chrome (tooltip position, opacity).

  // Mobile PanResponder for touch scrubbing (non-aggressive: lets parent ScrollView scroll, claims only on active scrub)
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onStartShouldSetPanResponderCapture: () => false,

        // Allow gestures to pass through to parent ScrollView/FlatList on vertical swipes
        onMoveShouldSetPanResponder: (_evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          const dist = Math.hypot(gestureState.dx, gestureState.dy);
          if (dist < 8) return false;
          // Predominantly vertical drag -> defer to surrounding ScrollView
          const isPredominantlyVertical = Math.abs(gestureState.dy) > Math.abs(gestureState.dx) * 1.8;
          return !isPredominantlyVertical;
        },
        // Never claim gesture in capture phase so parent ScrollView can negotiate
        onMoveShouldSetPanResponderCapture: () => false,

        // Allow surrounding ScrollView/FlatList to reclaim the touch gesture if scroll begins
        onPanResponderTerminationRequest: () => true,

        onPanResponderGrant: (evt: GestureResponderEvent) => {
          measureChart();
          isScrubbingRef.current = true;
          const { relX, relY } = getRelativeTouchCoords(evt);
          const idx = getSliceIndexFromCoords(relX, relY);
          handleSelectIndex(idx, false);
        },

        onPanResponderMove: (evt: GestureResponderEvent) => {
          const { relX, relY } = getRelativeTouchCoords(evt);
          const idx = getSliceIndexFromCoords(relX, relY);
          handleSelectIndex(idx, false);
        },

        onPanResponderRelease: () => {
          lastTouchEndTimeRef.current = Date.now();
          if (isScrubbingRef.current) {
            const currentIdx = activeSliceIndexRef.current;
            if (currentIdx !== null) {
              setPinnedSliceIndex(currentIdx);
            }
          }
          isScrubbingRef.current = false;
        },

        onPanResponderTerminate: () => {
          lastTouchEndTimeRef.current = Date.now();
          handleSelectIndex(null, true);
          isScrubbingRef.current = false;
        },
      }),
    [measureChart, getRelativeTouchCoords, getSliceIndexFromCoords, handleSelectIndex]
  );

  // Native touch tap handler for discrete stationary taps on slices without claiming PanResponder
  const handleTouchEnd = useCallback(
    (evt: GestureResponderEvent) => {
      lastTouchEndTimeRef.current = Date.now();
      if (isScrubbingRef.current) return;
      const { relX, relY } = getRelativeTouchCoords(evt);
      const idx = getSliceIndexFromCoords(relX, relY);
      if (idx !== null) {
        const isCurrentActive =
          pinnedSliceIndexRef.current === idx || activeSliceIndexRef.current === idx;
        const next = isCurrentActive ? null : idx;
        handleSelectIndex(next, true);
      } else {
        handleSelectIndex(null, true);
      }
    },
    [getRelativeTouchCoords, getSliceIndexFromCoords, handleSelectIndex]
  );

  // Desktop Web pointer and keyboard handling
  const webPointerProps = Platform.select({
    web: {
      tabIndex: 0 as const,
      onClick: (e: any) => { // platform:web-safe
        if (Date.now() - lastTouchEndTimeRef.current < 450) return;
        const rect = e?.currentTarget?.getBoundingClientRect?.(); // platform:web-safe
        if (!rect || rect.width <= 0) return;
        const relX = (e.clientX ?? 0) - rect.left;
        const relY = (e.clientY ?? 0) - rect.top;
        const idx = getSliceIndexFromCoords(relX, relY);
        if (idx !== null) {
          const isCurrentActive =
            pinnedSliceIndexRef.current === idx || activeSliceIndexRef.current === idx;
          const next = isCurrentActive ? null : idx;
          handleSelectIndex(next, true);
        } else {
          handleSelectIndex(null, true);
        }
      },
      onKeyDown: (e: any) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          const current = activeSliceIndexRef.current ?? 1;
          const next = (current - 1 + slices.length) % slices.length;
          handleSelectIndex(next, true);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          const current = activeSliceIndexRef.current ?? -1;
          const next = (current + 1) % slices.length;
          handleSelectIndex(next, true);
        } else if (e.key === "Escape") {
          handleSelectIndex(null, true);
        }
      },
      onPointerEnter: (e: any) => { // platform:web-safe
        cachedRectRef.current = e?.currentTarget?.getBoundingClientRect?.() ?? null;
      },
      onPointerMove: (e: any) => { // platform:web-safe
        if (e?.pointerType === "touch") return;
        const rect = cachedRectRef.current ?? e?.currentTarget?.getBoundingClientRect?.(); // platform:web-safe
        if (!rect || rect.width <= 0) return;
        const relX = (e.clientX ?? 0) - rect.left;
        const relY = (e.clientY ?? 0) - rect.top;
        const idx = getSliceIndexFromCoords(relX, relY);
        if (idx !== null) {
          if (idx !== activeSliceIndexRef.current) {
            handleSelectIndex(idx, false);
          }
        } else {
          if (activeSliceIndexRef.current !== null) {
            handleSelectIndex(null, false);
          }
        }
      },
      onPointerLeave: () => { // platform:web-safe
        cachedRectRef.current = null;
        setPinnedSliceIndex(null);
        handleSelectIndex(null, true);
      },
    },
    default: {},
  }) as object;

  const a11ySummary = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    return generatePieA11ySummary(safeData, total, activeSlice?.item ?? null, title || "Pie Chart");
  }, [accessibilityLabel, safeData, total, activeSlice, title]);

  const onWrapperLayout = useCallback((_e: LayoutChangeEvent) => {
    measureChart();
  }, [measureChart]);

  // Compute dynamic paths for circular sweep animation for each slice
  const sliceRenderList = useMemo(() => {
    const nSlices = slices.length;
    return slices.map((s) => {
      const sliceStaggerStart = (s.index / nSlices) * 0.58;
      const sliceStaggerEnd = Math.min(1, sliceStaggerStart + 0.54);
      const sliceRaw =
        animProgress <= sliceStaggerStart
          ? 0
          : animProgress >= sliceStaggerEnd
          ? 1
          : (animProgress - sliceStaggerStart) / (sliceStaggerEnd - sliceStaggerStart);

      const sliceCurve = isLoaded ? 1 : 1 - Math.pow(1 - sliceRaw, 3);

      let currentPath = s.path;
      if (!isLoaded) {
        if (sliceCurve <= 0.002) {
          currentPath = "";
        } else if (sliceCurve < 0.999) {
          const currentSweep = (s.endAngle - s.startAngle) * sliceCurve;
          currentPath = describePieSlice(
            centerX,
            centerY,
            radius,
            s.startAngle,
            s.startAngle + currentSweep
          );
        }
      }

      return {
        ...s,
        sliceCurve,
        renderPath: currentPath,
      };
    });
  }, [slices, animProgress, isLoaded, centerX, centerY, radius]);

  return (
    <View
      onLayout={onCardLayout}
      style={[
        styles.card,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {/* ── Screen-reader accessible data breakdown for VoiceOver & TalkBack ── */}
      <View
        accessible={true}
        accessibilityRole="list"
        accessibilityLabel={`${title || "Pie chart"} data breakdown`}
        style={styles.srOnly}
      >
        {slices.map((s) => (
          <View
            key={`sr-item-${s.index}`}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel={`${s.item.label}: ${s.value} (${s.percentage}%)`}
          />
        ))}
      </View>

      {/* ── Interactive Header Card Readout with Rolling Numbers ────────────── */}
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.titleText, { color: colors.textPrimary }]}
          >
            {title}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.subtitleText, { color: colors.textSecondary }]}
          >
            {subtitle}
          </Text>
        </View>

        {/* Readout in Header — Shows category and its percentage proportion */}
        <Pressable
          onPress={handleResetPress}
          accessibilityRole="button"
          accessibilityLabel={
            activeSlice
              ? `Selected: ${activeSlice.item.label}, ${activeSlice.percentage}%. Tap to reset to total.`
              : `Total: 100%. Tap to replay animation.`
          }
          accessibilityHint="Resets the active slice selection or replays the sweep animation"
          style={styles.readoutBox}
        >
          <View style={styles.readoutTopRow}>
            <SmoothLabel
              label={activeLabel}
              color={colors.textSecondary}
              style={styles.readoutLabel}
            />
          </View>

          <RollingPercent
            pct={activePercent}
            color={colors.textPrimary}
            prefix={valuePrefix}
            suffix={valueSuffix || "%"}
            height={32}
            fontSize={26}
            slotWidth={16}
            fontWeight="700"
            fontFamily={numberFontFamily}
          />
        </Pressable>
      </View>

      {/* ── Radial Pie Visualization with Precision Outward Slice Explosion ── */}
      <View
        ref={chartWrapperRef}
        onLayout={onWrapperLayout}
        onTouchStart={measureChart}
        {...panResponder.panHandlers}
        onTouchEnd={handleTouchEnd}
        {...webPointerProps}
        style={[styles.pieSection, { width: effectiveSize, height: effectiveSize }]}
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel={a11ySummary}
      >
        <Animated.View
          style={{
            width: effectiveSize,
            height: effectiveSize,
            alignItems: "center",
            justifyContent: "center",
            transform: [
              {
                scale: entranceAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.92, 1],
                }),
              },
            ],
            opacity: entranceAnim,
          }}
        >
          <Svg width={effectiveSize} height={effectiveSize} viewBox={`0 0 ${effectiveSize} ${effectiveSize}`}>
            {/* Subtle background track circular perimeter */}
            <Circle
              cx={centerX}
              cy={centerY}
              r={radius}
              stroke={colors.trackBg}
              strokeWidth={2}
              strokeDasharray={safeData.length === 0 ? "5 5" : undefined}
              fill="none"
            />

            {/* Optional circular loading spinner ring when loading=true */}
            {loading && (
              <Circle
                cx={centerX}
                cy={centerY}
                r={radius}
                stroke={variant === "brand" ? "#32C798" : colors.textSecondary}
                strokeWidth={3}
                strokeDasharray={`${radius * 1.2} 24`}
                strokeLinecap="round"
                fill="none"
                opacity={0.65}
              />
            )}

            {/* Pie Slices: Full continuous circular wedges meeting at the center with solid colors */}
            {sliceRenderList.map((s) => {
              if (!s.renderPath) return null;

              const isHovered = activeSliceIndex === s.index;
              const hasActiveSelection = activeSliceIndex !== null;
              const baseOpacity = hasActiveSelection
                ? isHovered
                  ? 1
                  : 0.78
                : 1;

              const opacity = isLoaded
                ? baseOpacity
                : s.sliceCurve > 0
                ? baseOpacity * (0.2 + 0.8 * s.sliceCurve)
                : 0;

              const sliceBgColor = isHovered ? s.activeColor : s.color;

              const sliceStyle = Platform.select({
                web: {
                  transform: isHovered
                    ? `translate(${s.dx}px, ${s.dy}px)`
                    : "translate(0px, 0px)",
                  transition:
                    "transform 160ms cubic-bezier(0.2, 0, 0, 1), opacity 120ms ease",
                  willChange: "transform",
                  cursor: "pointer",
                } as any,
                default: {
                  transform: [
                    { translateX: isHovered ? s.dx : 0 },
                    { translateY: isHovered ? s.dy : 0 },
                  ],
                },
              });

              return (
                <G
                  key={`pie-slice-grp-${s.index}`}
                  style={sliceStyle}
                >
                  {/* Solid color wedge fill */}
                  <Path
                    d={s.renderPath}
                    fill={sliceBgColor}
                    opacity={opacity}
                    stroke={
                      isHovered
                        ? theme === "light"
                          ? "rgba(0, 0, 0, 0.2)"
                          : "rgba(255, 255, 255, 0.35)"
                        : "none"
                    }
                    strokeWidth={isHovered ? 1.5 : 0}
                  />
                </G>
              );
            })}

            {/* Subtle center apex pin */}
            {safeData.length > 0 && (
              <Circle
                cx={centerX}
                cy={centerY}
                r={2.5}
                fill={theme === "light" ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.22)"}
              />
            )}
          </Svg>

          {/* Empty state label when data is explicitly empty */}
          {safeData.length === 0 && !loading && (
            <View pointerEvents="none" style={styles.emptyCenter}>
              <Text style={[styles.emptyCenterText, { color: colors.textSecondary }]}>
                No data
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  titleGroup: {
    flex: 1,
    alignItems: "flex-start",
    marginRight: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  subtitleText: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "400",
  },
  readoutBox: {
    alignItems: "flex-end",
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 90,
  },
  readoutTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    gap: 6,
  },
  readoutLabel: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  pieSection: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: {
        touchAction: "pan-y",
        userSelect: "none",
      } as any,
      default: {},
    }),
  },
  srOnly: {
    position: "absolute",
    left: -9999,
    width: 1,
    height: 1,
    overflow: "hidden",
  },
  emptyCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCenterText: {
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: -0.2,
  },
});

export default memo(PieChart);
