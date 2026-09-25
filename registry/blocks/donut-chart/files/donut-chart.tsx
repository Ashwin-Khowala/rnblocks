import React, {
  memo,
  useCallback,
  useEffect,
  useId,
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
  ClipPath,
  Defs,
  G,
  Line,
  Path,
} from "react-native-svg";
import { generateDonutA11ySummary } from "./donut-chart.a11y";
import { RollingNumber, RollingPercent } from "./donut-chart.rolling-number";
import type {
  DonutChartProps,
  DonutDataPoint,
} from "./donut-chart.types";
import {
  DEFAULT_DONUT_DATA,
  DONUT_CHART_THEME_TOKENS,
  computeDonutSlices,
  describeDonutSlice,
} from "./donut-chart.utils";

export function DonutChart({
  data = DEFAULT_DONUT_DATA,
  theme = "dark",
  variant = "brand",
  title,
  subtitle,
  valuePrefix = "",
  valueSuffix = "",
  size = 250,
  innerRadiusRatio = 0.54,
  padAngle = 0,
  explosionDistance = 10,
  startAngleOffset = 270,
  animated = true,
  loading = false,
  showResetButton = false,
  centerLabel = "Total",
  initialIndex = null,
  accessibilityLabel,
  formatValue,
  onSelectSlice,
  numberFontFamily,
  style,
}: DonutChartProps) {
  const chartUid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const colors = DONUT_CHART_THEME_TOKENS[theme] || DONUT_CHART_THEME_TOKENS.dark;

  // Sanitize data
  const safeData = useMemo(() => {
    return Array.isArray(data) && data.length > 0 ? data : DEFAULT_DONUT_DATA;
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

  // Compute geometry for slices (padAngle=0 by default for continuous, flush ring)
  const { slices, total, centerX, centerY, outerRadius, innerRadius } = useMemo(() => {
    return computeDonutSlices(
      safeData,
      effectiveSize,
      innerRadiusRatio,
      padAngle,
      explosionDistance,
      theme,
      variant,
      startAngleOffset
    );
  }, [
    safeData,
    effectiveSize,
    innerRadiusRatio,
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

  // Track active touch scrubbing vs tap
  const isScrubbingRef = useRef(false);
  // Timestamp when touch interaction ended to suppress synthetic click events on mobile web
  const lastTouchEndTimeRef = useRef(0);

  // Measurement ref for touch coordinates (scroll-immune)
  const chartWrapperRef = useRef<React.ElementRef<typeof View>>(null);
  const chartOffsetRef = useRef({ pageX: 0, pageY: 0, width: effectiveSize, height: effectiveSize });

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

  // ── Circular Loading & Arc Sweep Animation for Each Part ──────────────────
  const [animProgress, setAnimProgress] = useState(animated && !loading ? 0 : 1);
  const [isLoaded, setIsLoaded] = useState(!animated || loading);
  const animFrameRef = useRef<number | null>(null);

  const startCircularLoading = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (!animated) {
      setAnimProgress(1);
      setIsLoaded(true);
      return;
    }
    setAnimProgress(0);
    setIsLoaded(false);

    const startTime = Date.now();
    const duration = 950; // Total sweep duration in ms

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(1, elapsed / duration);
      setAnimProgress(t);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setIsLoaded(true);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [animated]);

  useEffect(() => {
    if (!loading) {
      startCircularLoading();
    } else {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      setAnimProgress(0);
      setIsLoaded(false);
    }
    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [loading, safeData, startCircularLoading]);

  // Entrance spring animation value for whole container
  const entranceAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;

  useEffect(() => {
    if (!animated) {
      entranceAnim.setValue(1);
      return;
    }
    entranceAnim.setValue(0);
    Animated.spring(entranceAnim, {
      toValue: 1,
      stiffness: 220,
      damping: 22,
      mass: 0.8,
      useNativeDriver: true,
    }).start();
  }, [animated, safeData, entranceAnim]);

  // Active slice info
  const activeSlice = activeSliceIndex !== null ? slices[activeSliceIndex] : null;
  const activeValue = activeSlice ? activeSlice.value : total;
  const activeLabel = activeSlice ? activeSlice.item.label : centerLabel;
  const activePercent = activeSlice ? activeSlice.percentage : 100;

  // Compute vibrant accent color for label text:
  // For Category A: Emerald #32C798
  // For Category B: Indigo #818CF8
  // For Category C: Amber #FBBF24 (crisp, bold, 100% visible)
  // For Category D: Sky #38BDF8 (crisp, bold, 100% visible)
  // For Idle state: textSecondary (#8b8d98)
  const activeAccentColor = activeSlice
    ? activeSlice.accentColor
    : colors.textSecondary;

  // Precomputed stripe line sets for SVG patterns
  const verticalStripeLines = useMemo(() => {
    const lines: number[] = [];
    for (let x = 0; x <= effectiveSize; x += 4.8) {
      lines.push(x);
    }
    return lines;
  }, [effectiveSize]);

  const diagonalStripeLines = useMemo(() => {
    const lines: number[] = [];
    for (let x = -effectiveSize; x <= effectiveSize; x += 5.2) {
      lines.push(x);
    }
    return lines;
  }, [effectiveSize]);

  const horizontalStripeLines = useMemo(() => {
    const lines: number[] = [];
    for (let y = 0; y <= effectiveSize; y += 4.8) {
      lines.push(y);
    }
    return lines;
  }, [effectiveSize]);

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

  // Center hole tap handler: resets active selection or replays circular loading animation
  const handleCenterPress = useCallback(() => {
    if (activeSliceIndexRef.current !== null || pinnedSliceIndexRef.current !== null) {
      handleSelectIndex(null, true);
    } else {
      startCircularLoading();
    }
  }, [handleSelectIndex, startCircularLoading]);

  // Find slice index from touch coordinates relative to chart center
  const getSliceIndexFromCoords = useCallback(
    (relX: number, relY: number): number | null => {
      const dx = relX - centerX;
      const dy = relY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Tapped in center hole -> clear selection to total
      if (dist < innerRadius - 4) {
        return null;
      }
      // Tapped outside donut ring -> ignore
      if (dist > outerRadius + 32) {
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
    [centerX, centerY, innerRadius, outerRadius, slices]
  );

  // Helper to extract relative touch coordinates reliably across iOS, Android, and Web
  const getRelativeTouchCoords = useCallback(
    (evt: GestureResponderEvent) => {
      const locX = evt.nativeEvent?.locationX;
      const locY = evt.nativeEvent?.locationY;
      // If native location coordinates are available and lie within bounds
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

  // Mobile PanResponder for touch scrubbing (non-aggressive: lets parent ScrollView scroll, claims only on active scrub)
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onStartShouldSetPanResponderCapture: () => false,

        onMoveShouldSetPanResponder: (_evt: GestureResponderEvent, gestureState: PanResponderGestureState) =>
          Math.hypot(gestureState.dx, gestureState.dy) > 3,
        onMoveShouldSetPanResponderCapture: (_evt: GestureResponderEvent, gestureState: PanResponderGestureState) =>
          Math.hypot(gestureState.dx, gestureState.dy) > 3,

        // Allow surrounding ScrollView/FlatList to scroll if user initiates vertical drag
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
            handleSelectIndex(null, true);
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
      if (isScrubbingRef.current) return;
      if (Date.now() - lastTouchEndTimeRef.current < 450) return;
      const { relX, relY } = getRelativeTouchCoords(evt);
      const dx = relX - centerX;
      const dy = relY - centerY;
      // If tapped in center hole, let center Pressable handle it
      if (Math.hypot(dx, dy) < innerRadius) return;
      const idx = getSliceIndexFromCoords(relX, relY);
      if (idx !== null) {
        const next = pinnedSliceIndexRef.current === idx ? null : idx;
        handleSelectIndex(next, true);
      }
    },
    [getRelativeTouchCoords, centerX, centerY, innerRadius, getSliceIndexFromCoords, handleSelectIndex]
  );

  // Desktop Web pointer and keyboard handling
  const webPointerProps = Platform.select({
    web: {
      tabIndex: 0 as const,
      onClick: (e: any) => { // platform:web-safe
        // Ignore synthetic click event fired by mobile browsers after a touch gesture has finished
        if (Date.now() - lastTouchEndTimeRef.current < 450) return;
        const rect = e?.currentTarget?.getBoundingClientRect?.(); // platform:web-safe
        if (!rect || rect.width <= 0) return;
        const relX = (e.clientX ?? 0) - rect.left;
        const relY = (e.clientY ?? 0) - rect.top;
        const idx = getSliceIndexFromCoords(relX, relY);
        const next = pinnedSliceIndexRef.current === idx ? null : idx;
        handleSelectIndex(next, true);
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
      onPointerMove: (e: any) => { // platform:web-safe
        // Touch devices are handled with 100% precision by PanResponder
        if (e?.pointerType === "touch") return;
        const rect = e?.currentTarget?.getBoundingClientRect?.(); // platform:web-safe
        if (!rect || rect.width <= 0) return;
        const relX = (e.clientX ?? 0) - rect.left;
        const relY = (e.clientY ?? 0) - rect.top;
        const idx = getSliceIndexFromCoords(relX, relY);
        if (idx !== null && idx !== activeSliceIndexRef.current) {
          handleSelectIndex(idx, false);
        }
      },
      onPointerLeave: () => { // platform:web-safe
        handleSelectIndex(pinnedSliceIndexRef.current, false);
      },
    },
    default: {},
  }) as object;

  const a11ySummary = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    return generateDonutA11ySummary(safeData, total, activeSlice?.item ?? null, title || "Radial Chart");
  }, [accessibilityLabel, safeData, total, activeSlice, title]);

  const onWrapperLayout = useCallback((_e: LayoutChangeEvent) => {
    measureChart();
  }, [measureChart]);

  // Compute dynamic paths for circular loading animation for each part
  const sliceRenderList = useMemo(() => {
    const nSlices = slices.length;
    return slices.map((s) => {
      // Stagger each part along the 0..1 progression
      const sliceStaggerStart = (s.index / nSlices) * 0.58;
      const sliceStaggerEnd = Math.min(1, sliceStaggerStart + 0.54);
      const sliceRaw =
        animProgress <= sliceStaggerStart
          ? 0
          : animProgress >= sliceStaggerEnd
          ? 1
          : (animProgress - sliceStaggerStart) / (sliceStaggerEnd - sliceStaggerStart);

      // Decelerating cubic ease-out
      const sliceCurve = isLoaded ? 1 : 1 - Math.pow(1 - sliceRaw, 3);

      let currentPath = s.path;
      if (!isLoaded) {
        if (sliceCurve <= 0.002) {
          currentPath = "";
        } else if (sliceCurve < 0.999) {
          const currentSweep = (s.endAngle - s.startAngle) * sliceCurve;
          currentPath = describeDonutSlice(
            centerX,
            centerY,
            innerRadius,
            outerRadius,
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
  }, [slices, animProgress, isLoaded, centerX, centerY, innerRadius, outerRadius]);

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
        accessibilityLabel={`${title || "Donut chart"} data breakdown`}
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

      {/* ── Optional Clean Card Header ─────────────────────────────────────── */}
      {(title || subtitle) && (
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            {title ? (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.titleText, { color: colors.textPrimary }]}
              >
                {title}
              </Text>
            ) : null}
            {subtitle ? (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.subtitleText, { color: colors.textSecondary }]}
              >
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>
      )}

      {/* ── Radial Donut Visualization with Cutout Center Readout ─────────── */}
      <View
        ref={chartWrapperRef}
        onLayout={onWrapperLayout}
        {...panResponder.panHandlers}
        onTouchEnd={handleTouchEnd}
        {...webPointerProps}
        style={[styles.donutSection, { width: effectiveSize, height: effectiveSize }]}
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
            {/* Defs for clipPaths of patterned slices */}
            <Defs>
              {sliceRenderList.map((s) => {
                if (s.pattern === "solid") return null;
                return (
                  <ClipPath id={`clip-${chartUid}-${s.index}`} key={`clip-${s.index}`}>
                    <Path d={s.renderPath || s.path} />
                  </ClipPath>
                );
              })}
            </Defs>

            {/* Subtle background track circular slot */}
            <Circle
              cx={centerX}
              cy={centerY}
              r={(innerRadius + outerRadius) / 2}
              stroke={colors.trackBg}
              strokeWidth={outerRadius - innerRadius}
              fill="none"
            />

            {/* Precision geometric boundary rings */}
            <Circle
              cx={centerX}
              cy={centerY}
              r={innerRadius}
              stroke={colors.border}
              strokeWidth={1}
              fill="none"
              opacity={0.35}
            />
            <Circle
              cx={centerX}
              cy={centerY}
              r={outerRadius}
              stroke={colors.border}
              strokeWidth={1}
              fill="none"
              opacity={0.35}
            />

            {/* Optional circular loading spinner ring when loading=true */}
            {loading && (
              <Circle
                cx={centerX}
                cy={centerY}
                r={(innerRadius + outerRadius) / 2}
                stroke={variant === "brand" ? "#32C798" : colors.patternLine}
                strokeWidth={3}
                strokeDasharray={`${(outerRadius - innerRadius) * 1.5} 25`}
                strokeLinecap="round"
                fill="none"
                opacity={0.65}
              />
            )}

            {/* Donut Slices: Flush seamless continuous ring with zero gaps */}
            {sliceRenderList.map((s) => {
              if (!s.renderPath) return null;

              const isHovered = activeSliceIndex === s.index;
              const hasActiveSelection = activeSliceIndex !== null;
              const baseOpacity = hasActiveSelection
                ? isHovered
                  ? 1
                  : 0.32
                : 0.98;

              const opacity = isLoaded
                ? baseOpacity
                : s.sliceCurve > 0
                ? baseOpacity * (0.2 + 0.8 * s.sliceCurve)
                : 0;

              const sliceBgColor = isHovered ? s.activeColor : s.color;
              const patternLineColor = s.patternColor;

              const sliceStyle = Platform.select({
                web: {
                  transform: isHovered
                    ? `translate3d(${s.dx}px, ${s.dy}px, 0)`
                    : "translate3d(0px, 0px, 0)",
                  transition:
                    "transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease",
                  willChange: "transform, opacity",
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
                  key={`slice-grp-${s.index}`}
                  style={sliceStyle}
                >
                  {/* Base solid color fill with NO gap borders */}
                  <Path
                    d={s.renderPath}
                    fill={sliceBgColor}
                    opacity={opacity}
                    stroke={
                      isHovered
                        ? theme === "light"
                          ? "rgba(0, 0, 0, 0.15)"
                          : "rgba(255, 255, 255, 0.3)"
                        : "none"
                    }
                    strokeWidth={isHovered ? 1.5 : 0}
                  />

                  {/* Hatched geometric pattern overlay, clipped precisely to slice's arc */}
                  {s.pattern !== "solid" && (
                    <G clipPath={`url(#clip-${chartUid}-${s.index})`} opacity={opacity}>
                      {s.pattern === "vertical-stripes" &&
                        verticalStripeLines.map((x) => (
                          <Line
                            key={`vl-${x}`}
                            x1={x}
                            y1={0}
                            x2={x}
                            y2={effectiveSize}
                            stroke={patternLineColor}
                            strokeWidth={1.8}
                            strokeLinecap="round"
                          />
                        ))}
                      {s.pattern === "diagonal-stripes" &&
                        diagonalStripeLines.map((x) => (
                          <Line
                            key={`dl-${x}`}
                            x1={x}
                            y1={0}
                            x2={x + effectiveSize}
                            y2={effectiveSize}
                            stroke={patternLineColor}
                            strokeWidth={1.8}
                            strokeLinecap="round"
                          />
                        ))}
                      {s.pattern === "horizontal-stripes" &&
                        horizontalStripeLines.map((y) => (
                          <Line
                            key={`hl-${y}`}
                            x1={0}
                            y1={y}
                            x2={effectiveSize}
                            y2={y}
                            stroke={patternLineColor}
                            strokeWidth={1.8}
                            strokeLinecap="round"
                          />
                        ))}
                    </G>
                  )}
                </G>
              );
            })}
          </Svg>
        </Animated.View>

        {/* ── Refined Pure Cutout Center Hole Readout ── */}
        <Pressable
          onPress={handleCenterPress}
          accessibilityRole="button"
          accessibilityLabel={
            activeSlice
              ? `Selected: ${activeSlice.item.label}, ${activeSlice.value} points (${activeSlice.percentage}%). Double tap to reset to total.`
              : `Total: ${total}. Double tap to replay circular animation.`
          }
          accessibilityHint="Resets the selection or replays the circular loading animation"
          style={[
            styles.centerCutout,
            {
              width: Math.round(innerRadius * 2),
              height: Math.round(innerRadius * 2),
              left: centerX - innerRadius,
              top: centerY - innerRadius,
            },
          ]}
        >
          <RollingNumber
            value={activeValue}
            color={colors.textPrimary}
            prefix={valuePrefix}
            suffix={valueSuffix}
            height={42}
            fontSize={34}
            slotWidth={21}
            fontWeight="700"
            fontFamily={numberFontFamily}
            formatter={formatValue}
            stagger={true}
          />
          <Text
            numberOfLines={1}
            style={[
              styles.centerLabel,
              {
                color: activeSlice ? activeAccentColor : colors.textSecondary,
              },
              Platform.select({
                web: {
                  transition:
                    "color 260ms ease, transform 240ms cubic-bezier(0.16, 1, 0.3, 1)",
                } as any,
              }),
            ]}
          >
            {activeLabel}
          </Text>
          <View style={styles.centerSubtextWrapper}>
            <RollingPercent
              pct={activePercent}
              color={activeSlice ? activeAccentColor : colors.textMuted}
              height={16}
              fontSize={12}
              slotWidth={7.8}
              fontWeight="700"
              fontFamily={numberFontFamily}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

// ── Stylesheet ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    borderRadius: 24,
    borderWidth: 1,
    paddingTop: 18,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  header: {
    width: "100%",
    marginBottom: 8,
  },
  titleGroup: {
    width: "100%",
    alignItems: "flex-start",
  },
  titleText: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  subtitleText: {
    fontSize: 12,
    marginTop: 1,
    fontWeight: "400",
  },
  donutSection: {
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
    width: 1,
    height: 1,
    opacity: 0,
    overflow: "hidden",
  },
  centerCutout: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    ...Platform.select({
      web: {
        cursor: "pointer",
        userSelect: "none",
      } as any,
      default: {},
    }),
  },
  centerLabel: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
    marginTop: 3,
    textAlign: "center",
    maxWidth: "85%",
  },
  centerSubtextWrapper: {
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 16,
  },
  centerSubtext: {
    fontSize: 12,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      web: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace",
      default: "monospace",
    }),
    letterSpacing: -0.2,
    marginTop: 2,
    textAlign: "center",
  },
});

export default memo(DonutChart);
