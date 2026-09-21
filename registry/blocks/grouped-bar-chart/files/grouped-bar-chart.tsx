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
  Defs,
  G,
  Line,
  LinearGradient,
  Rect,
  Stop,
} from "react-native-svg";
import { generateGroupedBarA11ySummary } from "./grouped-bar-chart.a11y";
import { RollingNumber, RollingPercent } from "./grouped-bar-chart.rolling-number";
import type {
  BarSeriesConfig,
  GroupedBarChartProps,
  GroupedBarDataPoint,
} from "./grouped-bar-chart.types";
import {
  DEFAULT_BAR_SERIES,
  DEFAULT_GROUPED_BAR_DATA,
  GROUPED_BAR_THEME_TOKENS,
  getSeriesColors,
} from "./grouped-bar-chart.utils";

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const TOOLTIP_CARD_WIDTH = 144;

export function GroupedBarChart({
  data = DEFAULT_GROUPED_BAR_DATA,
  series = DEFAULT_BAR_SERIES,
  theme = "dark",
  title = "Financial Performance",
  subtitle,
  valuePrefix = "$",
  valueSuffix = "",
  height = 200,
  animated = true,
  showBackgroundTrack = true,
  showLegend = true,
  showMetricSummary = true,
  showTooltip = true,
  showGridLines = true,
  initialIndex = null,
  accessibilityLabel,
  formatValue,
  onSelectGroup,
  style,
}: GroupedBarChartProps) {
  const chartUid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const colors = GROUPED_BAR_THEME_TOKENS[theme] || GROUPED_BAR_THEME_TOKENS.dark;
  const isDark = theme === "dark";

  const safeData = useMemo(() => {
    return Array.isArray(data) && data.length > 0 ? data : DEFAULT_GROUPED_BAR_DATA;
  }, [data]);

  // Active scrubbed group index (defaults to null for clean idle state)
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(() => {
    if (typeof initialIndex === "number" && initialIndex >= 0 && initialIndex < safeData.length) {
      return initialIndex;
    }
    return null;
  });
  const activeGroupIndexRef = useRef<number | null>(activeGroupIndex);
  activeGroupIndexRef.current = activeGroupIndex;

  // Responsive chart width measured dynamically onLayout (fallback 320 for first frame)
  const [chartWidth, setChartWidth] = useState<number>(320);
  const chartWidthRef = useRef<number>(320);
  chartWidthRef.current = chartWidth;

  // Measurement ref for touch coordinates (scroll-immune on Android and iOS)
  const chartWrapperRef = useRef<React.ElementRef<typeof View>>(null);
  const chartLeftRef = useRef<number>(0);
  const tooltipSideRef = useRef<"left" | "right">("right");

  const measureChart = useCallback(() => {
    chartWrapperRef.current?.measure?.(
      (_x: number, _y: number, width: number, _height: number, pageX: number) => {
        if (pageX !== undefined && pageX > 0) {
          chartLeftRef.current = pageX;
        }
        if (width > 0) {
          chartWidthRef.current = width;
        }
      }
    );
  }, []);

  // Floating tooltip dual-axis animation values (X and Y tracking)
  const tooltipTranslateX = useRef(new Animated.Value(0)).current;
  const tooltipTranslateY = useRef(new Animated.Value(0)).current;
  const tooltipOpacity = useRef(
    new Animated.Value(activeGroupIndex !== null ? 1 : 0)
  ).current;

  // Sliding X-axis active indicator square box animation values
  const labelIndicatorX = useRef(new Animated.Value(0)).current;
  const labelIndicatorOpacity = useRef(
    new Animated.Value(activeGroupIndex !== null ? 1 : 0)
  ).current;

  // Staggered animated height values for bars
  const animValues = useRef<Animated.Value[]>([]);
  if (animValues.current.length !== safeData.length) {
    animValues.current = safeData.map(() => new Animated.Value(animated ? 0 : 1));
  }

  // Run staggered spring entrance on data change
  useEffect(() => {
    if (!animated) {
      animValues.current.forEach((val) => val.setValue(1));
      return;
    }

    animValues.current.forEach((val) => val.setValue(0));
    const animations = animValues.current.map((val) =>
      Animated.spring(val, {
        toValue: 1,
        stiffness: 220,
        damping: 19,
        mass: 0.8,
        useNativeDriver: false,
      })
    );

    Animated.stagger(35, animations).start();
  }, [safeData, animated]);

  // ── Mathematical Geometry & Pixel-Exact Bar Proportions ────────────────────
  const groupCount = Math.max(1, safeData.length);
  const slotWidth = chartWidth > 0 ? chartWidth / groupCount : 50;
  const seriesCount = Math.max(1, series.length);

  // Group width and individual bar widths (exact proportions like bar-chart)
  const maxAllowedGroupWidth = Math.max(12, slotWidth - 4);
  const groupWidth = Math.min(52, Math.max(12, Math.min(maxAllowedGroupWidth, slotWidth * 0.62)));
  const barGap = seriesCount > 1 ? (groupWidth < 28 ? 2 : 4) : 0;
  const barWidth = Math.max(4, Math.floor((groupWidth - barGap * (seriesCount - 1)) / seriesCount));
  const effectiveGroupWidth = barWidth * seriesCount + barGap * (seriesCount - 1);

  // Clean square highlight box for the active month label (not an elongated pill)
  const squareBoxWidth = Math.min(38, Math.max(28, slotWidth - 8));
  const radius = Math.min(5, barWidth / 2);

  // Find max value across all points and series with 16% headroom
  const maxDataValue = useMemo(() => {
    let max = 1;
    safeData.forEach((pt) => {
      series.forEach((s) => {
        const val = Number(pt[s.key]);
        if (Number.isFinite(val) && val > max) {
          max = val;
        }
      });
    });
    return max * 1.16;
  }, [safeData, series]);

  // Compute exact bar columns in real pixel coordinates (no SVG stretch)
  const barGroups = useMemo(() => {
    return safeData.map((pt, gIdx) => {
      const slotCenterX = gIdx * slotWidth + slotWidth / 2;
      const groupStartX = slotCenterX - effectiveGroupWidth / 2;

      const bars = series.map((s, sIdx) => {
        const val = Number(pt[s.key]);
        const numVal = Number.isFinite(val) ? val : 0;
        const targetHeight = Math.max(
          radius * 2,
          (numVal / maxDataValue) * (height - 20)
        );
        const barX = groupStartX + sIdx * (barWidth + barGap);
        const barY = height - targetHeight;

        return {
          seriesKey: s.key,
          value: numVal,
          x: barX,
          y: barY,
          width: barWidth,
          height: targetHeight,
          centerX: barX + barWidth / 2,
        };
      });

      const minBarY = bars.length > 0 ? Math.min(...bars.map((b) => b.y)) : height / 2;

      return {
        point: pt,
        index: gIdx,
        slotCenterX,
        groupStartX,
        effectiveGroupWidth,
        minBarY,
        bars,
      };
    });
  }, [
    safeData,
    series,
    slotWidth,
    effectiveGroupWidth,
    barWidth,
    barGap,
    radius,
    maxDataValue,
    height,
  ]);

  // Total summary values across all data points
  const totalSeriesValues = useMemo(() => {
    const sums: Record<string, number> = {};
    series.forEach((s) => {
      sums[s.key] = safeData.reduce(
        (acc, curr) => acc + (Number(curr[s.key]) || 0),
        0
      );
    });
    const combinedTotal = Object.values(sums).reduce((acc, v) => acc + v, 0);
    return { sums, combinedTotal };
  }, [safeData, series]);

  // Active hovered point
  const activePoint =
    activeGroupIndex !== null ? safeData[activeGroupIndex] : null;

  // Active total vs summary total
  const activeTotal = useMemo(() => {
    if (activePoint) {
      return series.reduce(
        (acc, s) => acc + (Number(activePoint[s.key]) || 0),
        0
      );
    }
    return totalSeriesValues.combinedTotal;
  }, [activePoint, series, totalSeriesValues.combinedTotal]);

  // Rolling percentage change computation (dynamically computed from data)
  const { displayPct, displayIsPositive } = useMemo(() => {
    if (safeData.length === 0) {
      return { displayPct: 0.0, displayIsPositive: true };
    }
    if (activeGroupIndex === null) {
      // Idle state: compute change from first point to last point
      const firstPt = safeData[0];
      const lastPt = safeData[safeData.length - 1];
      const firstVal = series.reduce(
        (acc, s) => acc + (Number(firstPt?.[s.key]) || 0),
        0
      );
      const lastVal = series.reduce(
        (acc, s) => acc + (Number(lastPt?.[s.key]) || 0),
        0
      );
      if (firstVal <= 0) {
        return { displayPct: lastVal > 0 ? 100.0 : 0.0, displayIsPositive: true };
      }
      const diff = ((lastVal - firstVal) / firstVal) * 100;
      return {
        displayPct: Math.round(Math.abs(diff) * 10) / 10,
        displayIsPositive: diff >= 0,
      };
    }
    if (activeGroupIndex === 0) {
      return { displayPct: 0.0, displayIsPositive: true };
    }
    const prevPt = safeData[activeGroupIndex - 1];
    const currPt = safeData[activeGroupIndex];
    const prevVal = series.reduce(
      (acc, s) => acc + (Number(prevPt?.[s.key]) || 0),
      0
    );
    const currVal = series.reduce(
      (acc, s) => acc + (Number(currPt?.[s.key]) || 0),
      0
    );
    if (prevVal <= 0) {
      return { displayPct: currVal > 0 ? 100.0 : 0.0, displayIsPositive: true };
    }
    const diff = ((currVal - prevVal) / prevVal) * 100;
    return {
      displayPct: Math.round(Math.abs(diff) * 10) / 10,
      displayIsPositive: diff >= 0,
    };
  }, [activeGroupIndex, safeData, series]);

  // ── Update Hover / Scrub with Tooltip Beside Highlighted Bars ──────────────
  const setScrubIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, groupCount - 1));
      if (clamped !== activeGroupIndexRef.current) {
        const isInitial = activeGroupIndexRef.current === null;
        setActiveGroupIndex(clamped);
        const item = safeData[clamped];
        onSelectGroup?.(item, clamped);

        // Position tooltip cleanly beside the active bars (never covering them)
        const slotCenterX = clamped * slotWidth + slotWidth / 2;
        const groupStartX = slotCenterX - effectiveGroupWidth / 2;
        const groupEndX = slotCenterX + effectiveGroupWidth / 2;

        const canFitLeft = groupStartX - 10 - TOOLTIP_CARD_WIDTH >= 6;
        const canFitRight = groupEndX + 10 + TOOLTIP_CARD_WIDTH <= chartWidth - 6;

        let side = tooltipSideRef.current;
        if (side === "right") {
          if (!canFitRight || (slotCenterX > chartWidth * 0.52 && canFitLeft)) {
            side = "left";
          }
        } else {
          if (!canFitLeft || (slotCenterX < chartWidth * 0.48 && canFitRight)) {
            side = "right";
          }
        }
        tooltipSideRef.current = side;

        const maxTooltipX = Math.max(0, chartWidth - TOOLTIP_CARD_WIDTH - 6);
        const preferredTooltipX =
          side === "left"
            ? groupStartX - 10 - TOOLTIP_CARD_WIDTH
            : groupEndX + 10;
        const targetTooltipX =
          maxTooltipX > 0
            ? Math.max(6, Math.min(maxTooltipX, preferredTooltipX))
            : 0;

        // Position beside the bars at a clean, comfortable canvas depth
        const targetTooltipY = 14;

        // Slide the X-axis square active box
        const targetSquareX = clamped * slotWidth + (slotWidth - squareBoxWidth) / 2;

        if (isInitial) {
          tooltipTranslateX.setValue(targetTooltipX);
          tooltipTranslateY.setValue(targetTooltipY);
          labelIndicatorX.setValue(targetSquareX);
        }

        const springPhysics = {
          stiffness: 280,
          damping: 28,
          mass: 0.8,
          useNativeDriver: true,
        };

        Animated.parallel([
          Animated.spring(tooltipTranslateX, {
            toValue: targetTooltipX,
            ...springPhysics,
          }),
          Animated.spring(tooltipTranslateY, {
            toValue: targetTooltipY,
            ...springPhysics,
          }),
          Animated.timing(tooltipOpacity, {
            toValue: 1,
            duration: 120,
            useNativeDriver: true,
          }),
          Animated.spring(labelIndicatorX, {
            toValue: targetSquareX,
            ...springPhysics,
          }),
          Animated.timing(labelIndicatorOpacity, {
            toValue: 1,
            duration: 120,
            useNativeDriver: true,
          }),
        ]).start();
      }
    },
    [
      groupCount,
      safeData,
      onSelectGroup,
      slotWidth,
      chartWidth,
      effectiveGroupWidth,
      squareBoxWidth,
      tooltipTranslateX,
      tooltipTranslateY,
      tooltipOpacity,
      labelIndicatorX,
      labelIndicatorOpacity,
    ]
  );

  const clearScrub = useCallback(() => {
    setActiveGroupIndex(null);
    Animated.timing(tooltipOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
    Animated.timing(labelIndicatorOpacity, {
      toValue: 0,
      duration: 160,
      useNativeDriver: true,
    }).start();
  }, [tooltipOpacity, labelIndicatorOpacity]);

  // ── Native PanResponder with .measure() + pageX (Scroll-Immune on Android & iOS) ──
  const updateIndexFromTouch = useCallback(
    (evt: GestureResponderEvent, gestureState?: PanResponderGestureState) => {
      const w = chartWidthRef.current || chartWidth;
      if (w <= 0 || groupCount <= 0) return;

      let relX: number | undefined;

      const pageX = evt?.nativeEvent?.pageX ?? gestureState?.moveX ?? gestureState?.x0;
      if (pageX !== undefined && chartLeftRef.current > 0) {
        relX = pageX - chartLeftRef.current;
      }

      if (relX === undefined || isNaN(relX)) {
        relX = evt?.nativeEvent?.locationX;
      }

      if (relX === undefined || isNaN(relX)) return;

      const clampedX = Math.max(0, Math.min(w, relX));
      const calculatedSlotWidth = w / groupCount;
      const index = Math.min(
        groupCount - 1,
        Math.max(0, Math.floor(clampedX / calculatedSlotWidth))
      );
      setScrubIndex(index);
    },
    [chartWidth, groupCount, setScrubIndex]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => false,

        onMoveShouldSetPanResponder: (_evt, gestureState) => {
          return (
            Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
            Math.abs(gestureState.dx) > 3
          );
        },
        onMoveShouldSetPanResponderCapture: (_evt, gestureState) => {
          return (
            Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
            Math.abs(gestureState.dx) > 5
          );
        },

        onPanResponderTerminationRequest: (_evt, gestureState) => {
          return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
        },

        onPanResponderGrant: (evt, gestureState) => {
          measureChart();
          updateIndexFromTouch(evt, gestureState);
        },
        onPanResponderMove: (evt, gestureState) => {
          updateIndexFromTouch(evt, gestureState);
        },
        onPanResponderRelease: () => {
          clearScrub();
        },
        onPanResponderTerminate: () => {
          clearScrub();
        },
      }),
    [measureChart, updateIndexFromTouch, clearScrub]
  );

  // Desktop web mouse hover & keyboard navigation support (matches bar-chart model)
  const webPointerProps = Platform.select({
    web: {
      tabIndex: 0 as const,
      onKeyDown: (e: any) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setScrubIndex(Math.max(0, (activeGroupIndexRef.current ?? 1) - 1));
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setScrubIndex(Math.min(groupCount - 1, (activeGroupIndexRef.current ?? -1) + 1));
        } else if (e.key === "Escape") {
          clearScrub();
        }
      },
      onPointerMove: (e: {
        currentTarget?: { getBoundingClientRect?: () => { left: number; width: number } };
        clientX?: number;
      }) => { // platform:web-safe
        const rect = e?.currentTarget?.getBoundingClientRect?.(); // platform:web-safe
        if (!rect || rect.width <= 0) return;
        if (Math.abs(rect.width - chartWidthRef.current) > 1) {
          chartWidthRef.current = Math.round(rect.width);
          setChartWidth(Math.round(rect.width));
        }
        const relX = (e.clientX ?? 0) - rect.left;
        const clampedX = Math.max(0, Math.min(rect.width, relX));
        const sw = rect.width / groupCount;
        const index = Math.min(groupCount - 1, Math.max(0, Math.floor(clampedX / sw)));
        setScrubIndex(index);
      },
      onPointerLeave: () => { // platform:web-safe
        clearScrub();
      },
    },
    default: {},
  }) as object;

  const a11ySummary = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    return generateGroupedBarA11ySummary(safeData, series, title);
  }, [accessibilityLabel, safeData, series, title]);

  const onChartLayout = useCallback((e: LayoutChangeEvent) => {
    const w = Math.round(e.nativeEvent.layout.width);
    if (w > 0 && Math.abs(w - chartWidthRef.current) > 1) {
      setChartWidth(w);
    }
  }, []);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {/* ── Card Header: Title & Subtitle + Series Legend Pills ───────────── */}
      <View style={styles.headerTopRow}>
        <View style={styles.titleGroup}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.titleText, { color: colors.textPrimary }]}
          >
            {title}
          </Text>
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

        {showLegend && (
          <View style={styles.legendRow}>
            {series.map((s, idx) => {
              const { color: dotColor } = getSeriesColors(s, idx, theme);
              const displayVal = activePoint
                ? Number(activePoint[s.key]) || 0
                : totalSeriesValues.sums[s.key] || 0;

              return (
                <View
                  key={s.key}
                  style={[
                    styles.legendPill,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View style={[styles.legendDot, { backgroundColor: dotColor }]} />
                  <Text
                    numberOfLines={1}
                    style={[styles.legendLabel, { color: colors.textSecondary }]}
                  >
                    {s.label}
                  </Text>
                  <RollingNumber
                    value={displayVal}
                    color={colors.textPrimary}
                    prefix={valuePrefix}
                    suffix={valueSuffix}
                    height={16}
                    fontSize={11.5}
                    slotWidth={7.4}
                    fontWeight="700"
                    formatter={formatValue}
                  />
                </View>
              );
            })}
          </View>
        )}
      </View>

      {/* ── Metric Readout Row with Rolling Number & Badge Pill ───────────── */}
      {showMetricSummary && (
        <View style={styles.metricRow}>
          <View style={styles.metricValueRow}>
            <RollingNumber
              value={activeTotal}
              color={colors.textPrimary}
              prefix={valuePrefix}
              suffix={valueSuffix}
              height={34}
              fontSize={28}
              slotWidth={17}
              fontWeight="800"
              stagger={true}
              formatter={formatValue}
            />

            <View
              style={[
                styles.badgePill,
                {
                  backgroundColor: displayIsPositive
                    ? colors.badgeBg
                    : isDark
                      ? "rgba(239, 68, 68, 0.15)"
                      : "rgba(239, 68, 68, 0.1)",
                },
              ]}
            >
              <RollingPercent
                pct={displayPct}
                isPositive={displayIsPositive}
                positiveColor={colors.badgeText}
                negativeColor={isDark ? "#f87171" : "#ef4444"}
              />
            </View>
          </View>
        </View>
      )}

      {/* ── Inner Chart & Labels Area with Dual-Axis Tooltip ─────────────── */}
      <View
        onLayout={onChartLayout}
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel={a11ySummary}
        style={styles.chartArea}
      >
        {/* Floating Tooltip Card (Square box card just like comparison chart) */}
        {showTooltip && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.floatingTooltipCard,
              {
                backgroundColor: colors.tooltipBg,
                borderColor: colors.tooltipBorder,
                opacity: tooltipOpacity,
                transform: [
                  { translateX: tooltipTranslateX },
                  { translateY: tooltipTranslateY },
                ],
              },
            ]}
          >
            {activePoint ? (
              <>
                {/* Header with Month Name */}
                <View style={styles.tooltipHeaderRow}>
                  <Text
                    numberOfLines={1}
                    style={[styles.tooltipMonthText, { color: colors.textPrimary }]}
                  >
                    {activePoint.fullDate || activePoint.label}
                  </Text>
                </View>

                {/* Metrics List with Series Rows */}
                <View style={styles.tooltipMetricsList}>
                  {series.map((s, idx) => {
                    const { color: dotColor } = getSeriesColors(s, idx, theme);
                    const val = Number(activePoint[s.key]) || 0;

                    return (
                      <View key={s.key} style={styles.tooltipMetricRow}>
                        <View style={styles.tooltipLabelGroup}>
                          <View
                            style={[
                              styles.tooltipDot,
                              { backgroundColor: dotColor },
                            ]}
                          />
                          <Text
                            numberOfLines={1}
                            style={[
                              styles.tooltipLabel,
                              { color: colors.textSecondary },
                            ]}
                          >
                            {s.label}
                          </Text>
                        </View>
                        <RollingNumber
                          value={val}
                          color={colors.textPrimary}
                          prefix={valuePrefix}
                          suffix={valueSuffix}
                          height={16}
                          fontSize={12.5}
                          slotWidth={7.8}
                          fontWeight="700"
                          formatter={formatValue}
                        />
                      </View>
                    );
                  })}
                </View>
              </>
            ) : null}
          </Animated.View>
        )}

        {/* SVG Chart with Touch/PanResponder and Web Hover */}
        <View
          ref={chartWrapperRef}
          {...panResponder.panHandlers}
          {...webPointerProps}
          style={[styles.chartWrapper, { height }]}
        >
          <Svg width="100%" height={height}>
            <Defs>
              {series.map((s, sIdx) => {
                const { color: startColor, activeColor: endColor } = getSeriesColors(
                  s,
                  sIdx,
                  theme
                );
                return (
                  <LinearGradient
                    key={`grad-${s.key}-${sIdx}`}
                    id={`grad_${chartUid}_${s.key}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <Stop offset="0%" stopColor={startColor} stopOpacity={1} />
                    <Stop offset="100%" stopColor={endColor} stopOpacity={0.84} />
                  </LinearGradient>
                );
              })}
            </Defs>

            {/* Background Horizontal Dashed Gridlines */}
            {showGridLines && (
              <G>
                {[0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const y = Math.round(height - (height - 20) * ratio);
                  return (
                    <Line
                      key={`grid-${idx}`}
                      x1={4}
                      y1={y}
                      x2={chartWidth - 4}
                      y2={y}
                      stroke={colors.gridLine}
                      strokeWidth={1}
                      strokeDasharray="4 4"
                    />
                  );
                })}
              </G>
            )}

            {/* Grouped Bars with Background Slot Tracks & Clean Capsule Sheen */}
            {barGroups.map((g) => {
              const isHovered = activeGroupIndex === g.index;
              const hasActiveSelection = activeGroupIndex !== null;
              const barOpacity = hasActiveSelection
                ? isHovered
                  ? 1
                  : 0.32
                : 1;
              const anim = animValues.current[g.index];

              return (
                <G key={`group-${g.index}`}>
                  {g.bars.map((bar) => {
                    const gradId = `grad_${chartUid}_${bar.seriesKey}`;

                    const animHeight = animated && anim
                      ? anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, bar.height],
                        })
                      : bar.height;

                    const animY = animated && anim
                      ? anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [height, bar.y],
                        })
                      : bar.y;

                    const animSheenY = animated && anim
                      ? anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [height + 1, bar.y + 1],
                        })
                      : bar.y + 1;

                    return (
                      <React.Fragment key={`bar-${g.index}-${bar.seriesKey}`}>
                        {/* Background Slot Track behind each bar */}
                        {showBackgroundTrack && (
                          <Rect
                            x={bar.x}
                            y={8}
                            width={bar.width}
                            height={height - 14}
                            rx={radius}
                            ry={radius}
                            fill={colors.trackBg}
                          />
                        )}

                        {/* Main Data Capsule Bar */}
                        <AnimatedRect
                          x={bar.x}
                          y={animY}
                          width={bar.width}
                          height={animHeight}
                          rx={radius}
                          ry={radius}
                          fill={`url(#${gradId})`}
                          opacity={barOpacity}
                        />

                        {/* Subtle metallic highlight sheen on top edge of active bars */}
                        {isHovered && (
                          <AnimatedRect
                            x={bar.x + 1.5}
                            y={animSheenY}
                            width={Math.max(2, bar.width - 3)}
                            height={2.5}
                            rx={1.25}
                            ry={1.25}
                            fill="#ffffff"
                            opacity={0.75}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </G>
              );
            })}
          </Svg>
        </View>

        {/* ── X-Axis Month Labels with Sliding Square Active Box ── */}
        <View style={styles.labelsContainer}>
          {/* Smooth Sliding Square Active Indicator Box (just like comparison chart / bar chart) */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.slidingLabelBlock,
              {
                width: squareBoxWidth,
                transform: [{ translateX: labelIndicatorX }],
                backgroundColor: colors.activeLabelBlockBg,
                borderColor: colors.activeLabelBlockBorder,
                opacity: labelIndicatorOpacity,
              },
            ]}
          />

          {/* Label Items (Exact 1:1 Column Alignment with slotWidth) */}
          <View style={styles.labelsRow}>
            {safeData.map((item, index) => {
              const isSelected = activeGroupIndex === index;

              return (
                <Pressable
                  key={`label-${index}`}
                  onPress={() => setScrubIndex(index)}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.label}, ${item.fullDate || ""}`}
                  accessibilityState={{ selected: isSelected }}
                  style={[styles.labelCol, { width: slotWidth }]}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.labelText,
                      {
                        color: isSelected
                          ? colors.activeLabelText
                          : colors.textMuted,
                        fontWeight: isSelected ? "700" : "500",
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

// ── Stylesheet ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 1,
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 16,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 12,
  },
  titleGroup: {
    minWidth: 140,
    flexShrink: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: 2,
    letterSpacing: -0.1,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  legendPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4.5,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendLabel: {
    fontSize: 11,
    fontWeight: "500",
    textTransform: "lowercase",
  },
  metricRow: {
    marginBottom: 14,
  },
  metricValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "nowrap",
    maxWidth: "100%",
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7.5,
    paddingVertical: 3,
    borderRadius: 8,
    flexShrink: 0,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  chartArea: {
    width: "100%",
    position: "relative",
  },
  floatingTooltipCard: {
    position: "absolute",
    top: 0,
    left: 0,
    width: TOOLTIP_CARD_WIDTH,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    zIndex: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  tooltipHeaderRow: {
    marginBottom: 8,
  },
  tooltipMonthText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  tooltipMetricsList: {
    gap: 6,
  },
  tooltipMetricRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tooltipLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 1,
    marginRight: 6,
  },
  tooltipDot: {
    width: 6.5,
    height: 6.5,
    borderRadius: 3.5,
  },
  tooltipLabel: {
    fontSize: 12,
    fontWeight: "400",
    textTransform: "lowercase",
    flexShrink: 1,
  },
  chartWrapper: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  labelsContainer: {
    width: "100%",
    height: 32,
    position: "relative",
    justifyContent: "center",
    marginTop: 8,
  },
  slidingLabelBlock: {
    position: "absolute",
    top: 2,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    zIndex: 1,
  },
  labelsRow: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
  labelCol: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    fontSize: 12,
    letterSpacing: -0.2,
  },
});

export default memo(GroupedBarChart);
