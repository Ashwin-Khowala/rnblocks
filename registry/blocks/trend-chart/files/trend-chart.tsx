import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  memo,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from "react-native";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Line,
  G,
  Rect,
} from "react-native-svg";

// ─── Types & Interfaces ────────────────────────────────────────────────────────

export interface TrendDataPoint {
  value: number;
  label: string;
}

export type Theme = "dark" | "light";

export interface TrendChartProps {
  /**
   * Array of data points to plot. Each item has a `value` (number) and a `label` (x-axis string).
   * Minimum 2 points required for a meaningful chart.
   */
  data?: TrendDataPoint[];
  /** Height of the SVG chart canvas in pixels. Defaults to 150. */
  height?: number;
  /** Color theme. Defaults to "dark". */
  theme?: Theme;
  /** Accent color for the chart line, gradient, and indicator. Defaults to "#10B981". */
  accentColor?: string;
  /** Title displayed above the metrics. Defaults to "7-Day Activity Trend". */
  title?: string;
  /** Subtitle note displayed beside the metrics. Defaults to "growth vs last week". */
  subtitle?: string;
  /** Metric unit label displayed beside the rolling number. Defaults to "". */
  unit?: string;
  /** Callback fired when a data point is hovered or tapped. */
  onPointSelect?: (point: TrendDataPoint, index: number) => void;
}

// ─── Default Sample Data ───────────────────────────────────────────────────────

export const DEMO_CHART_DATA: TrendDataPoint[] = [
  { value: 1200, label: "Mon" },
  { value: 2400, label: "Tue" },
  { value: 1800, label: "Wed" },
  { value: 3600, label: "Thu" },
  { value: 2900, label: "Fri" },
  { value: 4800, label: "Sat" },
  { value: 4100, label: "Sun" },
];

// ─── Theme Color Palettes ──────────────────────────────────────────────────────

const COLORS_DARK = {
  bg: "#0B0C10",
  surface: "#13151D",
  border: "rgba(255, 255, 255, 0.08)",
  textPrimary: "#FFFFFF",
  textSecondary: "#94A3B8",
  axisText: "#94A3B8",
  gridLine: "rgba(255, 255, 255, 0.07)",
  badgeBg: "rgba(16, 185, 129, 0.08)",
  badgeBorder: "rgba(16, 185, 129, 0.35)",
  pillBg: "rgba(16, 185, 129, 0.16)",
  pillBorder: "rgba(16, 185, 129, 0.35)",
  positiveChange: "#10B981",
  negativeChange: "#EF4444",
};

const COLORS_LIGHT = {
  bg: "#FFFFFF",
  surface: "#F8FAFC",
  border: "rgba(0, 0, 0, 0.08)",
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
  axisText: "#64748B",
  gridLine: "rgba(0, 0, 0, 0.06)",
  badgeBg: "rgba(5, 150, 105, 0.08)",
  badgeBorder: "rgba(5, 150, 105, 0.30)",
  pillBg: "rgba(5, 150, 105, 0.12)",
  pillBorder: "rgba(5, 150, 105, 0.28)",
  positiveChange: "#059669",
  negativeChange: "#DC2626",
};

// ─── SVG Layout Constants ──────────────────────────────────────────────────────

const SVG_VB_W = 400;
const SVG_VB_H = 150;
const PAD_T = 16;
const PAD_B = 16;

// ─── Number Formatter ──────────────────────────────────────────────────────────

function formatYValue(num: number): string {
  if (num === 0) return "0";
  if (Math.abs(num) >= 1000000) return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (Math.abs(num) >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(Math.round(num));
}

/** Locale-safe thousands-grouped number. Always uses ',' as separator. */
function formatGrouped(num: number): string {
  return Math.round(num).toLocaleString("en-US");
}

// ─── AnimatedG and AnimatedLine via createAnimatedComponent ────────────────────

const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedLine = Animated.createAnimatedComponent(Line);

// ─── Animated SVG Indicator ───────────────────────────────────────────────────

interface SvgIndicatorProps {
  accentColor: string;
  guideTop: number;
  guideBottom: number;
  animX: Animated.Value;
  animY: Animated.Value;
  animOpacity: Animated.Value;
}

function SvgIndicator({
  accentColor,
  guideTop,
  guideBottom,
  animX,
  animY,
  animOpacity,
}: SvgIndicatorProps) {
  return (
    <>
      {/* Animated dashed guideline */}
      <AnimatedLine
        x1={animX as any}
        x2={animX as any}
        y1={guideTop}
        y2={guideBottom}
        stroke={accentColor}
        strokeWidth={1.5}
        strokeDasharray="3,3"
        strokeOpacity={0.8}
        opacity={animOpacity as any}
      />
      {/* Animated glowing node */}
      <AnimatedG
        x={animX as any}
        y={animY as any}
        opacity={animOpacity as any}
      >
        {/* Outer glow ring */}
        <Rect
          x={-12}
          y={-12}
          width={24}
          height={24}
          rx={12}
          fill={accentColor}
          fillOpacity={0.2}
        />
        {/* Mid glow ring */}
        <Rect
          x={-7}
          y={-7}
          width={14}
          height={14}
          rx={7}
          fill={accentColor}
          fillOpacity={0.4}
        />
        {/* Center white core */}
        <Rect
          x={-4}
          y={-4}
          width={8}
          height={8}
          rx={4}
          fill="#FFFFFF"
        />
        {/* Inner accent dot */}
        <Rect
          x={-3}
          y={-3}
          width={6}
          height={6}
          rx={3}
          fill={accentColor}
          fillOpacity={0.9}
        />
      </AnimatedG>
    </>
  );
}

// ─── Rolling Digit ─────────────────────────────────────────────────────────────

const DIGIT_CHARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface RollingDigitProps {
  digit: number;
  color: string;
  delay?: number;
  height?: number;
  fontSize?: number;
  slotWidth?: number;
}

const RollingDigit = memo(function RollingDigit({
  digit,
  color,
  delay = 0,
  height = 28,
  fontSize = 24,
  slotWidth = 15,
}: RollingDigitProps) {
  const animY = useRef(new Animated.Value(-digit * height)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.spring(animY, {
        toValue: -digit * height,
        useNativeDriver: true,
        stiffness: 180,
        damping: 22,
        mass: 1,
      }).start();
    }, delay);
    return () => clearTimeout(timer);
  }, [digit, delay, height, animY]);

  return (
    <View style={{ width: slotWidth, height, overflow: "hidden", alignItems: "center" }}>
      <Animated.View
        style={[
          styles.digitStrip,
          { transform: [{ translateY: animY }] },
        ]}
      >
        {DIGIT_CHARS.map((d) => (
          <View
            key={d}
            style={{
              height,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontSize,
                fontWeight: "700",
                lineHeight: height,
                letterSpacing: -0.4,
                color,
              }}
            >
              {d}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
});

// ─── Rolling Number Display (with Comma Support) ───────────────────────────────

const NUM_DIGIT_H = 32;
const NUM_FONT_SIZE = 26;
const NUM_SLOT_W = 16;

interface RollingNumberProps {
  value: number;
  color: string;
}

function RollingNumber({ value, color }: RollingNumberProps) {
  // formatGrouped always uses ',' so we can split on it safely
  const formatted = formatGrouped(value);
  const chars = formatted.split("");

  return (
    <View style={styles.rollingNumber}>
      {chars.map((char, i) => {
        if (char === ",") {
          return (
            <Text
              key={`comma-${i}`}
              allowFontScaling={false}
              style={[
                styles.commaChar,
                {
                  color,
                  fontSize: NUM_FONT_SIZE - 2,
                  lineHeight: NUM_DIGIT_H,
                },
              ]}
            >
              ,
            </Text>
          );
        }
        const digit = Number(char);
        if (isNaN(digit)) return null; // skip any unexpected non-numeric chars
        return (
          <RollingDigit
            key={i}
            digit={digit}
            color={color}
            delay={i * 20}
            height={NUM_DIGIT_H}
            fontSize={NUM_FONT_SIZE}
            slotWidth={NUM_SLOT_W}
          />
        );
      })}
    </View>
  );
}

// ─── Rolling Day Badge ────────────────────────────────────────────────────────

const DAY_BADGE_H = 22;

interface RollingDayBadgeProps {
  data: TrendDataPoint[];
  activeIndex: number;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
}

function RollingDayBadge({
  data,
  activeIndex,
  accentColor,
  badgeBg,
  badgeBorder,
}: RollingDayBadgeProps) {
  const animY = useRef(new Animated.Value(-activeIndex * DAY_BADGE_H)).current;

  useEffect(() => {
    Animated.spring(animY, {
      toValue: -activeIndex * DAY_BADGE_H,
      useNativeDriver: true,
      stiffness: 200,
      damping: 24,
      mass: 1,
    }).start();
  }, [activeIndex, animY]);

  return (
    <View
      style={[
        styles.dayBadgeWindow,
        { backgroundColor: badgeBg, borderColor: badgeBorder },
      ]}
    >
      <Animated.View
        style={[
          styles.dayBadgeStrip,
          { transform: [{ translateY: animY }] },
        ]}
      >
        {data.map((item, i) => (
          <View key={i} style={styles.dayBadgeItem}>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={[styles.dayBadgeText, { color: accentColor }]}
            >
              {item.label.toUpperCase()}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

// ─── Rolling Percent Display ──────────────────────────────────────────────────

const PCT_DIGIT_H = 20;
const PCT_FONT_SIZE = 13.5;
const PCT_SLOT_W = 9;

interface RollingPercentProps {
  pct: number;
  isPositive: boolean;
  positiveColor: string;
  negativeColor: string;
}

function RollingPercent({
  pct,
  isPositive,
  positiveColor,
  negativeColor,
}: RollingPercentProps) {
  const color = isPositive ? positiveColor : negativeColor;
  const absVal = Math.abs(pct);
  const formatted = absVal.toFixed(1);
  const [intPart, decPart] = formatted.split(".");
  const intDigits = intPart.split("").map(Number);
  const decDigit = decPart ? Number(decPart) : null;

  return (
    <View style={styles.rollingPct}>
      <Text allowFontScaling={false} style={[styles.pctSign, { color }]}>
        {isPositive ? "+" : "−"}
      </Text>
      {intDigits.map((d, i) => (
        <RollingDigit
          key={`int-${i}`}
          digit={isNaN(d) ? 0 : d}
          color={color}
          delay={i * 20}
          height={PCT_DIGIT_H}
          fontSize={PCT_FONT_SIZE}
          slotWidth={PCT_SLOT_W}
        />
      ))}
      {decDigit !== null && (
        <>
          <Text allowFontScaling={false} style={[styles.pctDot, { color }]}>.</Text>
          <RollingDigit
            key="dec"
            digit={isNaN(decDigit) ? 0 : decDigit}
            color={color}
            delay={intDigits.length * 20}
            height={PCT_DIGIT_H}
            fontSize={PCT_FONT_SIZE}
            slotWidth={PCT_SLOT_W}
          />
        </>
      )}
      <Text allowFontScaling={false} style={[styles.pctUnit, { color }]}>%</Text>
    </View>
  );
}

// ─── X-Axis Sliding Pill with Single-Letter Labels ─────────────────────────────

interface XAxisPillProps {
  data: TrendDataPoint[];
  activeIndex: number | null;
  accentColor: string;
  axisTextColor: string;
  badgeBg: string;
  badgeBorder: string;
  onSelectIndex?: (index: number) => void;
}

function XAxisPill({
  data,
  activeIndex,
  accentColor,
  axisTextColor,
  badgeBg,
  badgeBorder,
  onSelectIndex,
}: XAxisPillProps) {
  const [containerW, setContainerW] = useState(0);

  const pillWidth = containerW > 0 ? containerW / data.length : 0;
  const inspectedIdx = activeIndex !== null ? activeIndex : data.length - 1;

  const pillLeft = useRef(new Animated.Value(inspectedIdx * pillWidth)).current;
  const pillOpacity = useRef(new Animated.Value(activeIndex !== null ? 1 : 0)).current;

  useEffect(() => {
    if (containerW <= 0) return;
    const targetLeft = inspectedIdx * pillWidth;
    Animated.spring(pillLeft, {
      toValue: targetLeft,
      useNativeDriver: false,
      stiffness: 200,
      damping: 26,
      mass: 1,
    }).start();
  }, [inspectedIdx, pillWidth, containerW, pillLeft]);

  useEffect(() => {
    Animated.timing(pillOpacity, {
      toValue: activeIndex !== null ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [activeIndex, pillOpacity]);

  return (
    <View
      style={styles.xAxisTrack}
      onLayout={(e) => setContainerW(e.nativeEvent.layout.width)}
    >
      {/* Sliding active pill indicator */}
      {containerW > 0 && (
        <Animated.View
          style={[
            styles.xAxisActivePill,
            {
              width: pillWidth,
              left: pillLeft,
              opacity: pillOpacity,
              backgroundColor: badgeBg,
              borderColor: badgeBorder,
            },
          ]}
        />
      )}

      {/* Day single-letter labels (M, T, W, T, F, S, S) */}
      {data.map((item, idx) => {
        const isActive = idx === activeIndex;
        const letter = item.label.length === 1 ? item.label : item.label.charAt(0).toUpperCase();

        return (
          <TouchableOpacity
            key={idx}
            activeOpacity={0.7}
            onPress={() => onSelectIndex?.(idx)}
            {...(Platform.OS === "web" ? { onClick: () => onSelectIndex?.(idx) } : {})}
            style={styles.xAxisLabel}
            accessibilityRole="button"
            accessibilityLabel={item.label}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.xAxisText,
                { color: isActive ? accentColor : axisTextColor },
                isActive && styles.xAxisTextActive,
              ]}
            >
              {letter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─── Main Chart Component ─────────────────────────────────────────────────────

export function TrendChart({
  data = DEMO_CHART_DATA,
  height = 150,
  theme = "dark",
  accentColor = "#10B981",
  title = "7-Day Activity Trend",
  subtitle = "growth vs last week",
  unit = "",
  onPointSelect,
}: TrendChartProps) {
  const safeData = data && data.length >= 2 ? data : DEMO_CHART_DATA;
  const colors = theme === "dark" ? COLORS_DARK : COLORS_LIGHT;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [overlayWidth, setOverlayWidth] = useState(0);

  // SVG coordinate calculations — supports negative values by using actual data min
  const { pointCoords, yTicks, minV, maxV, drawW, drawH } = useMemo(() => {
    const values = safeData.map((d) => d.value);
    const rawMax = Math.max(...values);
    const rawMin = Math.min(...values, 0); // include 0 so baseline is always visible
    const range = rawMax - rawMin || 1;
    const maxVal = rawMax + range * 0.05; // 5% headroom above peak
    const minVal = rawMin;
    const midVal = Math.round((maxVal + minVal) / 2);

    const dH = SVG_VB_H - PAD_T - PAD_B;
    const colW = SVG_VB_W / safeData.length;

    const coords = safeData.map((d, i) => ({
      x: colW * (i + 0.5),
      y: PAD_T + dH * (1 - (d.value - minVal) / (maxVal - minVal || 1)),
    }));

    return {
      pointCoords: coords,
      yTicks: [maxVal, midVal, minVal],
      minV: minVal,
      maxV: maxVal,
      drawW: SVG_VB_W - colW,
      drawH: dH,
    };
  }, [safeData]);

  // Smooth cubic Bézier curve path
  const linePath = useMemo(() => {
    if (pointCoords.length < 2) return "";
    let d = `M ${pointCoords[0].x} ${pointCoords[0].y}`;
    for (let i = 0; i < pointCoords.length - 1; i++) {
      const cp1x = pointCoords[i].x + (pointCoords[i + 1].x - pointCoords[i].x) * 0.45;
      const cp2x = pointCoords[i + 1].x - (pointCoords[i + 1].x - pointCoords[i].x) * 0.45;
      d += ` C ${cp1x} ${pointCoords[i].y} ${cp2x} ${pointCoords[i + 1].y} ${pointCoords[i + 1].x} ${pointCoords[i + 1].y}`;
    }
    return d;
  }, [pointCoords]);

  // Gradient-filled area path closing at the baseline
  const areaPath = useMemo(() => {
    if (!linePath || pointCoords.length < 2) return "";
    const first = pointCoords[0];
    const last = pointCoords[pointCoords.length - 1];
    const baselineY = PAD_T + drawH;
    return `${linePath} L ${last.x} ${baselineY} L ${first.x} ${baselineY} Z`;
  }, [linePath, pointCoords, drawH]);

  // Inspected index: the hovered/tapped point when active, last point when idle.
  // Semantics: badge, number, and percent always describe the SAME point.
  const inspectedIdx = activeIndex !== null ? activeIndex : safeData.length - 1;
  const inspectedPoint = safeData[inspectedIdx];
  const prevIdx = inspectedIdx > 0 ? inspectedIdx - 1 : null;
  const prevValue = prevIdx !== null ? safeData[prevIdx].value : null;

  /**
   * % change relative to the previous point.
   * Idle state → uses last-to-second-last change (real data, no magic constant).
   * Active state → same formula applied to the currently hovered point.
   */
  const pctChange =
    prevValue !== null && prevValue !== 0
      ? ((inspectedPoint.value - prevValue) / prevValue) * 100
      : prevValue === 0
      ? inspectedPoint.value > 0 ? 100 : 0 // avoid ÷0; treat as +100% from zero
      : 0;

  const displayPct = pctChange; // always computed from real data
  const displayIsPositive = displayPct >= 0;
  const cleanSubtitle = subtitle.replace(/^[+-]?\d+(\.\d+)?%?\s*/, "") || subtitle;

  // Both number and badge describe the same inspected point for semantic consistency.
  const displayValue = inspectedPoint.value;

  // ── Animated indicator values ──
  const defaultCoord = pointCoords[safeData.length - 1] ?? { x: 0, y: 0 };
  const animX = useRef(new Animated.Value(defaultCoord.x)).current;
  const animY = useRef(new Animated.Value(defaultCoord.y)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const coord = pointCoords[activeIndex !== null ? activeIndex : safeData.length - 1];
    if (!coord) return;
    if (activeIndex !== null) {
      Animated.parallel([
        Animated.spring(animX, { toValue: coord.x, useNativeDriver: false, stiffness: 220, damping: 28 }),
        Animated.spring(animY, { toValue: coord.y, useNativeDriver: false, stiffness: 220, damping: 28 }),
        Animated.timing(animOpacity, { toValue: 1, duration: 180, useNativeDriver: false }),
      ]).start();
    } else {
      Animated.timing(animOpacity, { toValue: 0, duration: 180, useNativeDriver: false }).start();
    }
  }, [activeIndex, pointCoords, animX, animY, animOpacity]);

  // ── Native touch handlers ──
  const handleNativeTouchMove = useCallback(
    (e: any) => {
      if (overlayWidth <= 0) return;
      const locationX = e.nativeEvent?.locationX ?? 0;
      const pct = Math.max(0, Math.min(1, locationX / overlayWidth));
      const idx = Math.round(pct * (safeData.length - 1));
      if (idx !== activeIndex) {
        setActiveIndex(idx);
        onPointSelect?.(safeData[idx], idx);
      }
    },
    [overlayWidth, safeData, activeIndex, onPointSelect]
  );

  // ── Web pointer handlers ──
  const handleWebPointerMove = useCallback(
    (e: any) => {
      if (!e?.currentTarget) return;
      const rect = (e.currentTarget as any)?.getBoundingClientRect?.(); // platform:web-safe
      if (!rect || rect.width <= 0) return;
      const relX = (e.clientX ?? 0) - rect.left;
      const pct = Math.max(0, Math.min(1, relX / rect.width));
      const idx = Math.round(pct * (safeData.length - 1));
      if (idx !== activeIndex) {
        setActiveIndex(idx);
        onPointSelect?.(safeData[idx], idx);
      }
    },
    [safeData, activeIndex, onPointSelect]
  );

  const handlePointerLeave = useCallback(() => setActiveIndex(null), []);

  const overlayRef = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const node = overlayRef.current as any;
    if (!node || !node.addEventListener) return;

    const handlePointer = (e: any) => {
      handleWebPointerMove(e);
    };
    const handleLeave = () => {
      handlePointerLeave();
    };

    node.addEventListener("pointerdown", handlePointer); // platform:web-safe
    node.addEventListener("pointermove", handlePointer); // platform:web-safe
    node.addEventListener("pointerleave", handleLeave); // platform:web-safe

    return () => {
      node.removeEventListener("pointerdown", handlePointer); // platform:web-safe
      node.removeEventListener("pointermove", handlePointer); // platform:web-safe
      node.removeEventListener("pointerleave", handleLeave); // platform:web-safe
    };
  }, [handleWebPointerMove, handlePointerLeave]);

  // Platform-specific pointer props (web-only)
  const webPointerProps = Platform.select({
    web: {
      onPointerDown: handleWebPointerMove, // platform:web-safe
      onPointerMove: handleWebPointerMove, // platform:web-safe
      onPointerLeave: handlePointerLeave, // platform:web-safe
    },
    default: {},
  }) as object;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.bg, borderColor: colors.border },
      ]}
    >
      {/* ── Header: Title + Big Value Display + Supporting Metric Row (Top Left) ── */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          {/* Title */}
          <Text style={[styles.titleText, { color: colors.textSecondary }]}>
            {title}
          </Text>

          {/* Big Number on its own line: Total when nothing selected, point value when scrubbing */}
          <View style={styles.valueRow}>
            <RollingNumber
              value={displayValue}
              color={colors.textPrimary}
            />
            {unit ? (
              <Text style={[styles.unitLabel, { color: colors.textSecondary }]}>
                {unit}
              </Text>
            ) : null}
          </View>

          {/* Supporting Metric Row on its own line: Day Badge + Rolling Percent + Subtitle */}
          <View style={styles.badgeRow}>
            {/* Rolling Day Badge Reel */}
            <RollingDayBadge
              data={safeData}
              activeIndex={inspectedIdx}
              accentColor={accentColor}
              badgeBg={colors.badgeBg}
              badgeBorder={colors.badgeBorder}
            />

            {/* Smooth Rolling Percentage Animation */}
            <RollingPercent
              pct={displayPct}
              isPositive={displayIsPositive}
              positiveColor={colors.positiveChange}
              negativeColor={colors.negativeChange}
            />

            {/* Subtitle / Growth Text: 'vs prev day' when scrubbing, cleanSubtitle when idle */}
            <Text style={[styles.vsLabel, { color: colors.textSecondary }]}>
              {cleanSubtitle}
            </Text>
          </View>
        </View>

        {/* Top Right: Live Badge */}
        <View
          style={[
            styles.liveBadge,
            { backgroundColor: colors.badgeBg, borderColor: colors.badgeBorder },
          ]}
        >
          <Text style={[styles.liveText, { color: accentColor }]}>LIVE</Text>
        </View>
      </View>

      {/* ── Chart Main Area: Y-Axis Reference Numbers + SVG Canvas ────── */}
      <View style={styles.chartMainArea}>
        {/* Y-Axis Numbers Column (4.8K / 2.4K / 0) */}
        <View style={[styles.yAxisColumn, { height }]}>
          {yTicks.map((tick, i) => {
            const yPos = PAD_T + drawH * (1 - (tick - minV) / (maxV - minV || 1));
            const topPx = (yPos / SVG_VB_H) * height - 8;
            return (
              <Text
                key={i}
                style={[
                  styles.yLabelText,
                  {
                    color: colors.axisText,
                    top: topPx,
                  },
                ]}
              >
                {formatYValue(tick)}
              </Text>
            );
          })}
        </View>

        {/* SVG Chart Canvas */}
        <View style={[styles.svgWrap, { height }]}>
          <Svg
            width="100%"
            height={height}
            viewBox={`0 0 ${SVG_VB_W} ${SVG_VB_H}`}
            preserveAspectRatio="none"
          >
            <Defs>
              <LinearGradient id="tcGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={accentColor} stopOpacity={0.25} />
                <Stop offset="100%" stopColor={accentColor} stopOpacity={0.0} />
              </LinearGradient>
            </Defs>

            {/* Horizontal Dashed Grid Lines matching Y-Axis numbers */}
            {yTicks.map((tick, i) => {
              const yPos = PAD_T + drawH * (1 - (tick - minV) / (maxV - minV || 1));
              return (
                <Line
                  key={i}
                  x1={0}
                  x2={SVG_VB_W}
                  y1={yPos}
                  y2={yPos}
                  stroke={colors.gridLine}
                  strokeWidth={1}
                  strokeDasharray="4, 4"
                />
              );
            })}

            {/* Area Fill under the Curve */}
            <Path d={areaPath} fill="url(#tcGrad)" />

            {/* Linear Curve Line matching screenshot */}
            <Path
              d={linePath}
              fill="none"
              stroke={accentColor}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Animated Indicator (Dashed Guideline + Glowing Node) */}
            <SvgIndicator
              accentColor={accentColor}
              guideTop={PAD_T}
              guideBottom={PAD_T + drawH}
              animX={animX}
              animY={animY}
              animOpacity={animOpacity}
            />
          </Svg>

          {/* Per-column accessible labels (read-only — not interactive) */}
          <View style={[StyleSheet.absoluteFill, styles.columnTapRow]} pointerEvents="none">
            {safeData.map((point, idx) => (
              <View
                key={idx}
                style={styles.columnTap}
                accessibilityLabel={`${point.label}: ${point.value}${unit}`}
              />
            ))}
          </View>

          {/* Interaction overlay — covers the full chart area for continuous touch & pointer scrubbing */}
          <View
            ref={overlayRef}
            style={StyleSheet.absoluteFill}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderGrant={handleNativeTouchMove}
            onResponderMove={handleNativeTouchMove}
            onResponderRelease={handlePointerLeave}
            onResponderTerminate={handlePointerLeave}
            onTouchStart={handleNativeTouchMove}
            onTouchMove={handleNativeTouchMove}
            onTouchEnd={handlePointerLeave}
            onTouchCancel={handlePointerLeave}
            onLayout={(e) => setOverlayWidth(e.nativeEvent.layout.width)}
            {...webPointerProps}
          />
        </View>
      </View>

      {/* ── X-Axis Labels Row: Aligned with the chart points ──────────── */}
      <View style={styles.xAxisContainer}>
        {/* Spacer aligning with Y-axis column width */}
        <View style={styles.yAxisSpacer} />

        {/* Sliding Pill Track with Single-Letter Day Labels */}
        <XAxisPill
          data={safeData}
          activeIndex={activeIndex}
          accentColor={accentColor}
          axisTextColor={colors.textSecondary}
          badgeBg={colors.pillBg}
          badgeBorder={colors.pillBorder}
          onSelectIndex={(idx) => {
            const next = idx === activeIndex ? null : idx;
            setActiveIndex(next);
            if (next !== null) onPointSelect?.(safeData[next], next);
          }}
        />
      </View>
    </View>
  );
}

// ─── StyleSheet ─────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
    gap: 4,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginVertical: 2,
  },
  rollingNumber: {
    flexDirection: "row",
    height: NUM_DIGIT_H,
    alignItems: "center",
    overflow: "hidden",
    flexShrink: 1,    // degrade gracefully on narrow screens / large values
    maxWidth: "100%",
  },
  digitStrip: {
    flexDirection: "column",
  },
  commaChar: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: NUM_DIGIT_H,
    marginHorizontal: 1,
  },
  unitLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 2,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 2,
  },
  dayBadgeWindow: {
    height: DAY_BADGE_H,
    borderRadius: 6,
    borderWidth: 1,
    overflow: "hidden",
    paddingHorizontal: 7,
    justifyContent: "flex-start",
  },
  dayBadgeStrip: {
    flexDirection: "column",
  },
  dayBadgeItem: {
    height: DAY_BADGE_H,
    justifyContent: "center",
    alignItems: "center",
  },
  dayBadgeText: {
    fontSize: 10.5,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  rollingPct: {
    flexDirection: "row",
    alignItems: "center",
    height: PCT_DIGIT_H,
    overflow: "hidden",
  },
  pctSign: {
    fontSize: 13.5,
    fontWeight: "700",
    lineHeight: PCT_DIGIT_H,
  },
  pctDot: {
    fontSize: 13.5,
    fontWeight: "700",
    lineHeight: PCT_DIGIT_H,
  },
  pctUnit: {
    fontSize: 12.5,
    fontWeight: "700",
    lineHeight: PCT_DIGIT_H,
  },
  vsLabel: {
    fontSize: 12.5,
    fontWeight: "500",
  },
  liveBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  liveText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  chartMainArea: {
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
  },
  yAxisColumn: {
    width: 36,
    position: "relative",
  },
  yLabelText: {
    position: "absolute",
    left: 0,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  svgWrap: {
    flex: 1,
    position: "relative",
  },
  columnTapRow: {
    flexDirection: "row",
  },
  columnTap: {
    flex: 1,
    height: "100%",
  },
  xAxisContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    width: "100%",
  },
  yAxisSpacer: {
    width: 36,
  },
  xAxisTrack: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
    borderRadius: 8,
  },
  xAxisActivePill: {
    position: "absolute",
    height: "100%",
    borderRadius: 6,
    borderWidth: 1,
    top: 0,
    bottom: 0,
  },
  xAxisLabel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    zIndex: 2,
  },
  xAxisText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  xAxisTextActive: {
    fontWeight: "700",
  },
});

export default TrendChart;
