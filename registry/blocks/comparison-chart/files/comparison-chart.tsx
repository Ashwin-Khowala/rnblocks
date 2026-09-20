import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Easing,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from "react-native";
import Svg, {
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

import type {
  ComparisonChartProps,
  ComparisonDataPoint,
  SeriesConfig,
  Theme,
} from "./comparison-chart.types";
import {
  ACTIVE_PILL_WIDTH,
  DEFAULT_COMPARISON_DATA,
  DEFAULT_SERIES,
  PAD_B,
  PAD_T,
  PAD_X,
  SVG_VB_H,
  SVG_VB_W,
  THEME_TOKENS,
  TOOLTIP_WIDTH,
  formatGrouped,
  parseDateParts,
} from "./comparison-chart.utils";
import { createMonotoneCubicSpline } from "./comparison-chart.spline";
import { buildA11ySummary } from "./comparison-chart.a11y";
import { RollingNumber } from "./comparison-chart.rolling-number";

// Re-export types and defaults for convenience
export type { Theme, SeriesConfig, ComparisonDataPoint, ComparisonChartProps } from "./comparison-chart.types";
export { DEFAULT_SERIES, DEFAULT_COMPARISON_DATA } from "./comparison-chart.utils";

// ─── Main Comparison Chart Component ──────────────────────────────────────────

export function ComparisonChart({
  data = DEFAULT_COMPARISON_DATA,
  series = DEFAULT_SERIES,
  theme = "dark",
  title = "Performance Overview",
  subtitle = "Revenue vs Costs",
  valuePrefix = "$",
  valueSuffix = "",
  height = 220,
  showTooltip = true,
  missingData = "interpolate",
  accessibilityLabel: userA11yLabel,
  formatValue,
  onPointSelect,
}: ComparisonChartProps) {
  const colors = THEME_TOKENS[theme] || THEME_TOKENS.dark;
  const uniqueId = useId().replace(/:/g, "_");

  // Fallback safety if empty or single point dataset passed
  const safeData = useMemo(() => {
    if (!data || data.length === 0) return DEFAULT_COMPARISON_DATA;
    if (data.length === 1) {
      return [
        data[0],
        { ...data[0], label: `${data[0].label} (end)`, date: data[0].date },
      ];
    }
    return data;
  }, [data]);

  // Measured responsive container dimensions
  const [containerWidth, setContainerWidth] = useState(0);
  const chartLeftRef = useRef(0);
  const chartWidthRef = useRef(0);
  const overlayRef = useRef<React.ElementRef<typeof View>>(null);

  // Active hover/scrub data index (null = idle, defaults to last point)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [persistedIndex, setPersistedIndex] = useState<number>(safeData.length - 1);
  const activeIndexRef = useRef<number | null>(null);
  activeIndexRef.current = activeIndex;

  // Track dragging state to prevent collision between springs and instant drags
  const isScrubbingRef = useRef(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const tooltipSideRef = useRef<"left" | "right">("right");

  // Keep persistent index in bounds if safeData length changes
  useEffect(() => {
    if (persistedIndex >= safeData.length) {
      setPersistedIndex(Math.max(0, safeData.length - 1));
    }
  }, [safeData.length, persistedIndex]);

  const inspectedIndex = activeIndex !== null ? activeIndex : persistedIndex;
  const currentPoint = safeData[inspectedIndex] || safeData[safeData.length - 1];

  // ─── Value Domain Scaling ──────────────────────────────────────────────────
  const { minVal, maxVal } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;

    safeData.forEach((d) => {
      series.forEach((s) => {
        const val = d[s.key];
        if (val !== undefined && val !== null && val !== "") {
          const num = Number(val);
          if (Number.isFinite(num)) {
            if (num < min) min = num;
            if (num > max) max = num;
          }
        }
      });
    });

    if (min === Infinity || max === -Infinity) {
      return { minVal: 0, maxVal: 100 };
    }
    if (min === max) {
      return { minVal: min * 0.9, maxVal: max * 1.1 || 10 };
    }

    const padding = (max - min) * 0.08;
    return {
      minVal: Math.floor(min - padding),
      maxVal: Math.ceil(max + padding),
    };
  }, [safeData, series]);

  // ─── Continuous Coordinate Mapping ──────────────────────────────────────────
  const drawW = SVG_VB_W - PAD_X * 2;
  const drawH = SVG_VB_H - PAD_T - PAD_B;

  const seriesCoords = useMemo(() => {
    const valRange = maxVal - minVal || 1;

    return series.map((s) => {
      const parsedValues = safeData.map((pt) => {
        const raw = pt[s.key];
        if (raw === null || raw === undefined || raw === "") return null;
        const num = Number(raw);
        return Number.isFinite(num) ? num : null;
      });

      const firstValid = parsedValues.find((v): v is number => v !== null) ?? minVal;

      const coords = safeData.map((pt, idx) => {
        const x = PAD_X + (idx / (safeData.length - 1)) * drawW;
        let val = parsedValues[idx];

        if (val === null) {
          if (missingData === "zero") {
            val = 0;
          } else {
            // "interpolate" (default) or "gap"
            let prevVal = firstValid;
            let prevIdx = 0;
            for (let i = idx - 1; i >= 0; i--) {
              if (parsedValues[i] !== null) {
                prevVal = parsedValues[i]!;
                prevIdx = i;
                break;
              }
            }

            let nextVal = prevVal;
            let nextIdx = idx;
            for (let i = idx + 1; i < parsedValues.length; i++) {
              if (parsedValues[i] !== null) {
                nextVal = parsedValues[i]!;
                nextIdx = i;
                break;
              }
            }

            if (nextIdx > prevIdx) {
              const t = (idx - prevIdx) / (nextIdx - prevIdx);
              val = prevVal + t * (nextVal - prevVal);
            } else {
              val = prevVal;
            }
          }
        }

        const normalized = (val - minVal) / valRange;
        const y = PAD_T + drawH - normalized * drawH;
        return { x, y };
      });

      const baselineY = SVG_VB_H - PAD_B;
      const spline = createMonotoneCubicSpline(coords, baselineY);

      return {
        series: s,
        coords,
        spline,
      };
    });
  }, [safeData, series, minVal, maxVal, drawW, drawH, missingData]);

  // ─── Progressive Line Generation Animation ──────────────────────────────────
  const animDrawProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animDrawProgress.setValue(0);
    Animated.timing(animDrawProgress, {
      toValue: 1,
      duration: 1100,
      easing: Easing.bezier(0.2, 0.85, 0.32, 1),
      useNativeDriver: false,
    }).start();
  }, [safeData, animDrawProgress]);

  // ─── Hairline, Scrubber & Tooltip Animated Drivers ──────────────────────────
  const initialIndexX = safeData.length > 1 ? safeData.length - 1 : 0;
  const initialSvgX = PAD_X + (initialIndexX / (safeData.length - 1)) * drawW;

  const [scrubSvgX, setScrubSvgX] = useState(initialSvgX);
  const animOverlayOpacity = useRef(new Animated.Value(0)).current;
  const animHairlineX = useRef(new Animated.Value(0)).current;
  const animPillX = useRef(new Animated.Value(0)).current;
  const animTooltipX = useRef(new Animated.Value(0)).current;

  // Measurement helper
  const measureOverlay = useCallback(() => {
    overlayRef.current?.measure?.(
      (_x: number, _y: number, width: number, _height: number, pageX: number) => {
        if (width > 0) {
          chartLeftRef.current = pageX;
          chartWidthRef.current = width;
          if (width !== containerWidth) {
            setContainerWidth(width);
          }
        }
      }
    );
  }, [containerWidth]);

  // Continuous Scrubbing Calculation
  const updateContinuousScrub = useCallback(
    (pointerPixelX: number, totalWidth: number) => {
      if (totalWidth <= 0 || safeData.length < 2) return;

      setIsScrubbing(true);
      const ratio = Math.max(0, Math.min(1, pointerPixelX / totalWidth));
      const targetSvgX = ratio * SVG_VB_W;
      const clampedSvgX = Math.max(PAD_X, Math.min(SVG_VB_W - PAD_X, targetSvgX));
      setScrubSvgX(clampedSvgX);

      const currentScreenX = (clampedSvgX / SVG_VB_W) * totalWidth;
      const maxPillX = Math.max(0, totalWidth - ACTIVE_PILL_WIDTH);
      const targetPillX = Math.max(0, Math.min(maxPillX, currentScreenX - ACTIVE_PILL_WIDTH / 2));

      const canFitLeft = currentScreenX - TOOLTIP_WIDTH - 14 >= 8;
      const canFitRight = currentScreenX + TOOLTIP_WIDTH + 14 <= totalWidth - 8;

      let side = tooltipSideRef.current;
      if (side === "right") {
        if (!canFitRight || (currentScreenX > totalWidth * 0.55 && canFitLeft)) {
          side = "left";
        }
      } else {
        if (!canFitLeft || (currentScreenX < totalWidth * 0.45 && canFitRight)) {
          side = "right";
        }
      }
      tooltipSideRef.current = side;

      const maxTooltipX = Math.max(0, totalWidth - TOOLTIP_WIDTH - 8);
      const preferredTooltipX =
        side === "left"
          ? currentScreenX - TOOLTIP_WIDTH - 14
          : currentScreenX + 14;
      const targetTooltipX =
        maxTooltipX > 0 ? Math.max(8, Math.min(maxTooltipX, preferredTooltipX)) : 0;

      animHairlineX.setValue(currentScreenX);
      animPillX.setValue(targetPillX);

      const wasScrubbing = isScrubbingRef.current;
      isScrubbingRef.current = true;

      if (!wasScrubbing) {
        animTooltipX.setValue(targetTooltipX);
      } else {
        Animated.spring(animTooltipX, {
          toValue: targetTooltipX,
          stiffness: 280,
          damping: 26,
          mass: 0.65,
          useNativeDriver: true,
        }).start();
      }

      Animated.timing(animOverlayOpacity, {
        toValue: 1,
        duration: 70,
        useNativeDriver: true,
      }).start();

      const progress = (clampedSvgX - PAD_X) / drawW;
      const closestIdx = Math.max(
        0,
        Math.min(safeData.length - 1, Math.round(progress * (safeData.length - 1)))
      );

      if (closestIdx !== activeIndexRef.current) {
        setActiveIndex(closestIdx);
        setPersistedIndex(closestIdx);
        onPointSelect?.(safeData[closestIdx], closestIdx);
      }
    },
    [
      drawW,
      safeData,
      onPointSelect,
      animHairlineX,
      animPillX,
      animTooltipX,
      animOverlayOpacity,
    ]
  );

  // Discrete point selection (keyboard navigation / accessibility focus)
  const selectPointByIndex = useCallback(
    (index: number) => {
      const clampedIdx = Math.max(0, Math.min(safeData.length - 1, index));
      setActiveIndex(clampedIdx);
      setPersistedIndex(clampedIdx);
      onPointSelect?.(safeData[clampedIdx], clampedIdx);

      const targetSvgX = PAD_X + (clampedIdx / (safeData.length - 1)) * drawW;
      setScrubSvgX(targetSvgX);

      const totalWidth = chartWidthRef.current || containerWidth;
      if (totalWidth <= 0) return;

      const currentScreenX = (targetSvgX / SVG_VB_W) * totalWidth;
      const maxPillX = Math.max(0, totalWidth - ACTIVE_PILL_WIDTH);
      const targetPillX = Math.max(0, Math.min(maxPillX, currentScreenX - ACTIVE_PILL_WIDTH / 2));

      const canFitLeft = currentScreenX - TOOLTIP_WIDTH - 14 >= 8;
      const canFitRight = currentScreenX + TOOLTIP_WIDTH + 14 <= totalWidth - 8;

      let side = tooltipSideRef.current;
      if (side === "right") {
        if (!canFitRight || (currentScreenX > totalWidth * 0.55 && canFitLeft)) {
          side = "left";
        }
      } else {
        if (!canFitLeft || (currentScreenX < totalWidth * 0.45 && canFitRight)) {
          side = "right";
        }
      }
      tooltipSideRef.current = side;

      const maxTooltipX = Math.max(0, totalWidth - TOOLTIP_WIDTH - 8);
      const preferredTooltipX =
        side === "left"
          ? currentScreenX - TOOLTIP_WIDTH - 14
          : currentScreenX + 14;
      const targetTooltipX =
        maxTooltipX > 0 ? Math.max(8, Math.min(maxTooltipX, preferredTooltipX)) : 0;

      animHairlineX.setValue(currentScreenX);
      animPillX.setValue(targetPillX);

      if (!isScrubbingRef.current) {
        animTooltipX.setValue(targetTooltipX);
      } else {
        Animated.spring(animTooltipX, {
          toValue: targetTooltipX,
          stiffness: 280,
          damping: 26,
          mass: 0.65,
          useNativeDriver: true,
        }).start();
      }
      isScrubbingRef.current = true;

      Animated.timing(animOverlayOpacity, {
        toValue: 1,
        duration: 70,
        useNativeDriver: true,
      }).start();
    },
    [
      containerWidth,
      safeData,
      drawW,
      onPointSelect,
      animHairlineX,
      animPillX,
      animTooltipX,
      animOverlayOpacity,
    ]
  );

  const handleTouch = useCallback(
    (evt: GestureResponderEvent, gestureState?: PanResponderGestureState) => {
      const w = chartWidthRef.current || containerWidth;
      if (w <= 0) return;

      let relX: number | undefined;

      const pageX = evt?.nativeEvent?.pageX ?? gestureState?.moveX ?? gestureState?.x0;
      if (pageX !== undefined && chartLeftRef.current > 0) {
        relX = pageX - chartLeftRef.current;
      }

      if (relX === undefined || isNaN(relX)) {
        relX = evt?.nativeEvent?.locationX;
      }

      if (relX === undefined || isNaN(relX)) return;

      updateContinuousScrub(relX, w);
    },
    [containerWidth, updateContinuousScrub]
  );

  const stopScrubbing = useCallback(() => {
    Animated.timing(animOverlayOpacity, {
      toValue: 0,
      duration: 140,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        isScrubbingRef.current = false;
        setIsScrubbing(false);
        setActiveIndex(null);
      }
    });
  }, [animOverlayOpacity]);

  const handleTouchRef = useRef(handleTouch);
  handleTouchRef.current = handleTouch;

  const stopScrubbingRef = useRef(stopScrubbing);
  stopScrubbingRef.current = stopScrubbing;

  const measureOverlayRef = useRef(measureOverlay);
  measureOverlayRef.current = measureOverlay;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (evt, gestureState) => {
          measureOverlayRef.current?.();
          handleTouchRef.current?.(evt, gestureState);
        },
        onPanResponderMove: (evt, gestureState) => {
          handleTouchRef.current?.(evt, gestureState);
        },
        onPanResponderRelease: () => {
          stopScrubbingRef.current?.();
        },
        onPanResponderTerminate: () => {
          stopScrubbingRef.current?.();
        },
      }),
    []
  );

  const screenX = containerWidth > 0 ? (scrubSvgX / SVG_VB_W) * containerWidth : 0;

  // Sync positions on container resize
  useEffect(() => {
    if (isScrubbing && containerWidth > 0) {
      const currentScreenX = (scrubSvgX / SVG_VB_W) * containerWidth;
      const maxPillX = Math.max(0, containerWidth - ACTIVE_PILL_WIDTH);
      const targetPillX = Math.max(0, Math.min(maxPillX, currentScreenX - ACTIVE_PILL_WIDTH / 2));

      const canFitLeft = currentScreenX - TOOLTIP_WIDTH - 14 >= 8;
      const canFitRight = currentScreenX + TOOLTIP_WIDTH + 14 <= containerWidth - 8;

      let side = tooltipSideRef.current;
      if (side === "right") {
        if (!canFitRight || (currentScreenX > containerWidth * 0.55 && canFitLeft)) {
          side = "left";
        }
      } else {
        if (!canFitLeft || (currentScreenX < containerWidth * 0.45 && canFitRight)) {
          side = "right";
        }
      }
      tooltipSideRef.current = side;

      const maxTooltipX = Math.max(0, containerWidth - TOOLTIP_WIDTH - 8);
      const preferredTooltipX =
        side === "left"
          ? currentScreenX - TOOLTIP_WIDTH - 14
          : currentScreenX + 14;
      const targetTooltipX =
        maxTooltipX > 0 ? Math.max(8, Math.min(maxTooltipX, preferredTooltipX)) : 0;

      animHairlineX.setValue(currentScreenX);
      animPillX.setValue(targetPillX);
      animTooltipX.setValue(targetTooltipX);
    }
  }, [containerWidth]);

  // Web-safe mouse & keyboard event handlers
  const webInteractiveProps = Platform.select({
    web: {
      tabIndex: 0 as const,
      role: "region" as const,
      "aria-label": `${title}. Use Left and Right Arrow keys to inspect points across dates.`,
      onPointerMove: (e: any) => {
        if (!e?.currentTarget) return;
        const rect = e.currentTarget?.getBoundingClientRect?.();
        if (rect && rect.width > 0) {
          const clientX = e.clientX ?? e.nativeEvent?.clientX ?? 0;
          const relX = clientX - rect.left;
          updateContinuousScrub(relX, rect.width);
        }
      },
      onPointerEnter: (e: any) => {
        if (!e?.currentTarget) return;
        const rect = e.currentTarget?.getBoundingClientRect?.();
        if (rect && rect.width > 0) {
          const clientX = e.clientX ?? e.nativeEvent?.clientX ?? 0;
          const relX = clientX - rect.left;
          updateContinuousScrub(relX, rect.width);
        }
      },
      onPointerLeave: () => {
        stopScrubbing();
      },
      onKeyDown: (e: any) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault?.();
          const curr = inspectedIndex;
          selectPointByIndex(Math.max(0, curr - 1));
        } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault?.();
          const curr = inspectedIndex;
          selectPointByIndex(Math.min(safeData.length - 1, curr + 1));
        } else if (e.key === "Home") {
          e.preventDefault?.();
          selectPointByIndex(0);
        } else if (e.key === "End") {
          e.preventDefault?.();
          selectPointByIndex(safeData.length - 1);
        } else if (e.key === "Escape") {
          stopScrubbing();
        }
      },
      onFocus: () => {
        selectPointByIndex(inspectedIndex);
      },
      onBlur: () => {
        stopScrubbing();
      },
    },
    default: {},
  });

  const a11ySummary = useMemo(() => {
    return buildA11ySummary({
      userA11yLabel,
      currentPoint,
      series,
      valuePrefix,
      valueSuffix,
      title,
      formatValue,
    });
  }, [
    userA11yLabel,
    currentPoint,
    series,
    valuePrefix,
    valueSuffix,
    title,
    formatValue,
  ]);

  const headerDateParts = useMemo(
    () => parseDateParts(currentPoint.date || currentPoint.label),
    [currentPoint]
  );
  const pillDateParts = useMemo(
    () => parseDateParts(currentPoint.date || currentPoint.label),
    [currentPoint]
  );

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
      ]}
    >
      {/* ── Header: Title & Interactive Series Legend with Rolling Values ── */}
      <View style={styles.headerRow}>
        <View style={styles.titleColumn}>
          <Text style={[styles.chartTitle, { color: colors.textPrimary }]}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[styles.chartSubtitle, { color: colors.textMuted }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <View style={styles.legendContainer}>
          {series.map((s) => {
            const currentVal = currentPoint[s.key];
            const numVal = typeof currentVal === "number" ? currentVal : 0;

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
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: s.color },
                  ]}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.legendLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  {s.label}
                </Text>
                {typeof currentVal === "number" ? (
                  <RollingNumber
                    value={numVal}
                    color={colors.textPrimary}
                    prefix={valuePrefix}
                    suffix={valueSuffix}
                    height={16}
                    fontSize={11.5}
                    slotWidth={7.5}
                    formatter={formatValue}
                  />
                ) : (
                  <Text
                    style={[styles.legendMutedText, { color: colors.legendInactive }]}
                  >
                    —
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </View>

      {/* ── Interactive Canvas & Vector Graphics (With Progressive Line Generation) ── */}
      <View
        ref={overlayRef}
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel={a11ySummary}
        style={[
          styles.canvasWrapper,
          {
            height,
          },
        ]}
        onLayout={(e) => {
          const w = e.nativeEvent.layout.width;
          if (w > 0 && w !== containerWidth) {
            setContainerWidth(w);
            chartWidthRef.current = w;
          }
          measureOverlay();
        }}
        {...panResponder.panHandlers}
        {...webInteractiveProps}
      >
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${SVG_VB_W} ${SVG_VB_H}`}
          preserveAspectRatio="none"
        >
          <Defs>
            {series.map((s) => (
              <LinearGradient
                key={`grad-${s.key}`}
                id={`grad_${uniqueId}_${s.key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <Stop offset="0%" stopColor={s.color} stopOpacity={0.22} />
                <Stop offset="80%" stopColor={s.color} stopOpacity={0.03} />
                <Stop offset="100%" stopColor={s.color} stopOpacity={0.0} />
              </LinearGradient>
            ))}
          </Defs>

          {/* Clean Subtle Horizontal Grid Guidelines */}
          {[0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = PAD_T + drawH * (1 - pct);
            return (
              <Line
                key={`grid-${idx}`}
                x1={PAD_X}
                y1={y}
                x2={SVG_VB_W - PAD_X}
                y2={y}
                stroke={colors.gridLine}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            );
          })}
        </Svg>

        {/* ── Progressive Reveal of Spline Curves & Area Gradients ── */}
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              overflow: "hidden",
              width: animDrawProgress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        >
          <View style={{ width: containerWidth > 0 ? containerWidth : "100%", height: "100%" }}>
            <Svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${SVG_VB_W} ${SVG_VB_H}`}
              preserveAspectRatio="none"
            >
              <Defs>
                {series.map((s) => (
                  <LinearGradient
                    key={`grad-${s.key}`}
                    id={`grad_${uniqueId}_${s.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <Stop offset="0%" stopColor={s.color} stopOpacity={0.22} />
                    <Stop offset="80%" stopColor={s.color} stopOpacity={0.03} />
                    <Stop offset="100%" stopColor={s.color} stopOpacity={0.0} />
                  </LinearGradient>
                ))}
              </Defs>

              {/* Area Fills under Spline Paths */}
              {seriesCoords.map(({ series: s, spline }) => (
                <Path
                  key={`area-${s.key}`}
                  d={spline.areaPath}
                  fill={`url(#grad_${uniqueId}_${s.key})`}
                />
              ))}

              {/* Monotone Spline Stroke Curves */}
              {seriesCoords.map(({ series: s, spline }) => (
                <Path
                  key={`stroke-${s.key}`}
                  d={spline.linePath}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </Svg>
          </View>
        </Animated.View>

        {/* ── Interactive Vertical Scrubber Line ── */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.scrubberHairline,
            {
              top: PAD_T - 4,
              bottom: PAD_B - 4,
              backgroundColor: colors.scrubberLine,
              opacity: animOverlayOpacity,
              transform: [{ translateX: animHairlineX }],
            },
          ]}
        />

        {/* ── Point Dots Anchored on Spline Curves ── */}
        {seriesCoords.map(({ series: s, coords, spline }) => {
          let dotSvgY = coords[coords.length - 1]?.y ?? 0;

          if (spline.segments && spline.segments.length > 0) {
            const seg = spline.segments.find(
              (sg) => scrubSvgX >= sg.p0.x && scrubSvgX <= sg.p1.x
            );
            if (seg) {
              const segWidth = seg.p1.x - seg.p0.x;
              const t = segWidth > 0 ? (scrubSvgX - seg.p0.x) / segWidth : 0;
              const mt = 1 - t;
              dotSvgY =
                mt * mt * mt * seg.p0.y +
                3 * mt * mt * t * seg.cp1.y +
                3 * mt * t * t * seg.cp2.y +
                t * t * t * seg.p1.y;
            } else if (scrubSvgX < spline.segments[0].p0.x) {
              dotSvgY = spline.segments[0].p0.y;
            } else {
              dotSvgY = spline.segments[spline.segments.length - 1].p1.y;
            }
          }

          const dotScreenY = (dotSvgY / SVG_VB_H) * height;

          return (
            <Animated.View
              key={`native-dot-${s.key}`}
              pointerEvents="none"
              style={[
                styles.simplePointerDot,
                {
                  backgroundColor: s.color,
                  borderColor: colors.bg,
                  shadowColor: s.color,
                  opacity: animOverlayOpacity,
                  transform: [
                    { translateX: screenX - 4.5 },
                    { translateY: dotScreenY - 4.5 },
                  ],
                },
              ]}
            />
          );
        })}

        {/* ── Floating Tooltip Card (Smooth Spring Glide) ── */}
        {showTooltip && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.floatingTooltip,
              {
                opacity: animOverlayOpacity,
                backgroundColor: colors.tooltipBg,
                borderColor: colors.tooltipBorder,
                shadowColor: colors.shadowColor,
                transform: [{ translateX: animTooltipX }],
              },
            ]}
          >
            {/* Header with Rolling Date Numbers */}
            <View style={styles.rollingDateHeaderRow}>
              <Text style={[styles.tooltipDateHeader, { color: colors.textSecondary }]}>
                {headerDateParts.prefix}
              </Text>
              {headerDateParts.day !== null ? (
                <RollingNumber
                  value={headerDateParts.day}
                  color={colors.textSecondary}
                  height={16}
                  fontSize={12.5}
                  slotWidth={7.5}
                  stagger={false}
                />
              ) : null}
              {headerDateParts.suffix ? (
                <Text style={[styles.tooltipDateHeader, { color: colors.textSecondary }]}>
                  {headerDateParts.suffix}
                </Text>
              ) : null}
            </View>

            {/* Metrics List with Series Colors */}
            <View style={styles.tooltipMetricsList}>
              {series.map((s) => {
                const val = currentPoint[s.key];
                const numVal = typeof val === "number" ? val : 0;

                return (
                  <View key={s.key} style={styles.tooltipMetricRow}>
                    <View style={styles.tooltipLabelGroup}>
                      <View
                        style={[
                          styles.tooltipDot,
                          { backgroundColor: s.color },
                        ]}
                      />
                      <Text
                        numberOfLines={1}
                        style={[styles.tooltipLabel, { color: colors.textSecondary }]}
                      >
                        {s.label}
                      </Text>
                    </View>

                    {typeof val === "number" ? (
                      <RollingNumber
                        value={numVal}
                        color={colors.textPrimary}
                        prefix={valuePrefix}
                        suffix={valueSuffix}
                        height={18}
                        fontSize={13.5}
                        slotWidth={8.5}
                        formatter={formatValue}
                      />
                    ) : (
                      <Text
                        style={[styles.tooltipFallbackVal, { color: colors.textPrimary }]}
                      >
                        —
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          </Animated.View>
        )}

        {/* ── Bottom Active Date Pill Badge ── */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.activeDatePill,
            {
              opacity: animOverlayOpacity,
              backgroundColor: colors.pillBg,
              borderColor: colors.pillBorder,
              transform: [{ translateX: animPillX }],
            },
          ]}
        >
          <View style={styles.rollingDatePillRow}>
            <Text
              numberOfLines={1}
              style={[styles.activeDatePillText, { color: colors.pillText }]}
            >
              {pillDateParts.prefix}
            </Text>
            {pillDateParts.day !== null ? (
              <RollingNumber
                value={pillDateParts.day}
                color={colors.pillText}
                height={15}
                fontSize={11}
                slotWidth={7}
                stagger={false}
              />
            ) : null}
            {pillDateParts.suffix ? (
              <Text
                numberOfLines={1}
                style={[styles.activeDatePillText, { color: colors.pillText }]}
              >
                {pillDateParts.suffix}
              </Text>
            ) : null}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 12,
  },
  titleColumn: {
    minWidth: 140,
    flexShrink: 1,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  chartSubtitle: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  legendPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    gap: 6,
    maxWidth: "100%",
    flexShrink: 1,
  },
  legendDot: {
    width: 6.5,
    height: 6.5,
    borderRadius: 999,
  },
  legendLabel: {
    fontSize: 11,
    textTransform: "capitalize",
    fontWeight: "500",
    maxWidth: 130,
    flexShrink: 1,
  },
  legendMutedText: {
    fontSize: 11.5,
    fontWeight: "600",
  },
  canvasWrapper: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
  },
  scrubberHairline: {
    position: "absolute",
    left: 0,
    width: 1,
    zIndex: 25,
  },
  simplePointerDot: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 9,
    height: 9,
    borderRadius: 999,
    borderWidth: 2,
    zIndex: 30,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  floatingTooltip: {
    position: "absolute",
    top: 14,
    left: 0,
    width: TOOLTIP_WIDTH,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 12,
    zIndex: 40,
  },
  rollingDateHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tooltipDateHeader: {
    fontSize: 12.5,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  tooltipMetricsList: {
    gap: 7,
  },
  tooltipMetricRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tooltipLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
    marginRight: 6,
  },
  tooltipDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
  },
  tooltipLabel: {
    fontSize: 13,
    fontWeight: "400",
    textTransform: "lowercase",
    flexShrink: 1,
  },
  tooltipFallbackVal: {
    fontSize: 13.5,
    fontWeight: "700",
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
  },
  activeDatePill: {
    position: "absolute",
    bottom: 4,
    left: 0,
    width: ACTIVE_PILL_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 35,
  },
  rollingDatePillRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  activeDatePillText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: -0.2,
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
  },
});

export default ComparisonChart;
