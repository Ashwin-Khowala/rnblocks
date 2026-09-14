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
  /** Height of the SVG chart canvas in pixels. Defaults to 160. */
  height?: number;
  /** Color theme. Defaults to "dark". */
  theme?: Theme;
  /** Accent color for the chart line, gradient, and indicator. Defaults to "#32C798". */
  accentColor?: string;
  /** Title displayed above the rolling number display. Defaults to "Total Views". */
  title?: string;
  /** Metric unit label displayed beside the rolling number. Defaults to "". */
  unit?: string;
  /** Callback fired when a data point is hovered or tapped. */
  onPointSelect?: (point: TrendDataPoint, index: number) => void;
}

// ─── Default Sample Data ───────────────────────────────────────────────────────

export const DEMO_CHART_DATA: TrendDataPoint[] = [
  { value: 4200, label: "Mon" },
  { value: 6100, label: "Tue" },
  { value: 5400, label: "Wed" },
  { value: 8900, label: "Thu" },
  { value: 7300, label: "Fri" },
  { value: 9600, label: "Sat" },
  { value: 12500, label: "Sun" },
];

// ─── Theme Color Palettes ──────────────────────────────────────────────────────

const COLORS_DARK = {
  bg: "#0F0F12",
  surface: "#18181F",
  border: "rgba(255,255,255,0.08)",
  textPrimary: "#FFFFFF",
  textSecondary: "#64748B",
  axisText: "#4A5568",
  gridLine: "rgba(255,255,255,0.05)",
  badgeBg: "rgba(255,255,255,0.06)",
  badgeBorder: "rgba(255,255,255,0.10)",
  positiveChange: "#22C55E",
  negativeChange: "#EF4444",
};

const COLORS_LIGHT = {
  bg: "#FFFFFF",
  surface: "#F8FAFC",
  border: "rgba(0,0,0,0.08)",
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
  axisText: "#94A3B8",
  gridLine: "rgba(0,0,0,0.04)",
  badgeBg: "rgba(0,0,0,0.04)",
  badgeBorder: "rgba(0,0,0,0.08)",
  positiveChange: "#16A34A",
  negativeChange: "#DC2626",
};

// ─── SVG Layout Constants ──────────────────────────────────────────────────────

const SVG_VB_W = 400;
const SVG_VB_H = 160;
const PAD_L = 0;
const PAD_R = 0;
const PAD_T = 14;
const PAD_B = 6;

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
      {/* Animated guideline */}
      <AnimatedLine
        x1={animX as any}
        x2={animX as any}
        y1={guideTop}
        y2={guideBottom}
        stroke={accentColor}
        strokeWidth={1.5}
        strokeDasharray="3,3"
        strokeOpacity={0.75}
        opacity={animOpacity as any}
      />
      {/* Animated glowing node */}
      <AnimatedG
        x={animX as any}
        y={animY as any}
        opacity={animOpacity as any}
      >
        {/* outer glow ring */}
        <Rect
          x={-12}
          y={-12}
          width={24}
          height={24}
          rx={12}
          fill={accentColor}
          fillOpacity={0.18}
        />
        {/* mid ring */}
        <Rect
          x={-7}
          y={-7}
          width={14}
          height={14}
          rx={7}
          fill={accentColor}
          fillOpacity={0.35}
        />
        {/* center dot */}
        <Rect
          x={-4}
          y={-4}
          width={8}
          height={8}
          rx={4}
          fill="#FFFFFF"
        />
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

const DIGIT_HEIGHT = 22;
const DIGIT_CHARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface RollingDigitProps {
  digit: number;
  color: string;
  delay?: number;
}

const RollingDigit = memo(function RollingDigit({
  digit,
  color,
  delay = 0,
}: RollingDigitProps) {
  const animY = useRef(new Animated.Value(-digit * DIGIT_HEIGHT)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.spring(animY, {
        toValue: -digit * DIGIT_HEIGHT,
        useNativeDriver: true,
        stiffness: 180,
        damping: 22,
        mass: 1,
      }).start();
    }, delay);
    return () => clearTimeout(timer);
  }, [digit, delay, animY]);

  return (
    <View style={styles.digitSlot}>
      <Animated.View
        style={[
          styles.digitStrip,
          { transform: [{ translateY: animY }] },
        ]}
      >
        {DIGIT_CHARS.map((d) => (
          <View key={d} style={styles.singleDigitBox}>
            <Text style={[styles.digitChar, { color }]}>{d}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
});

// ─── Rolling Number Display ────────────────────────────────────────────────────

interface RollingNumberProps {
  value: number;
  color: string;
}

function RollingNumber({ value, color }: RollingNumberProps) {
  const digits = String(Math.round(value)).split("").map(Number);
  return (
    <View style={styles.rollingNumber}>
      {digits.map((d, i) => (
        <RollingDigit
          key={i}
          digit={d}
          color={color}
          delay={i * 25}
        />
      ))}
    </View>
  );
}

// ─── Rolling Day Badge ─────────────────────────────────────────────────────────

const DAY_BADGE_H = 24;

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
      damping: 26,
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
        {data.map((item, idx) => (
          <View key={idx} style={styles.dayBadgeItem}>
            <Text
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

// ─── Rolling Percent Digits ────────────────────────────────────────────────────

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
  const absStr = String(Math.abs(Math.round(pct)));
  const digits = absStr.split("").map(Number);

  return (
    <View style={styles.rollingPct}>
      <Text style={[styles.pctSign, { color }]}>{isPositive ? "+" : "−"}</Text>
      {digits.map((d, i) => (
        <RollingDigit key={i} digit={d} color={color} delay={i * 20} />
      ))}
      <Text style={[styles.pctUnit, { color }]}>%</Text>
    </View>
  );
}

// ─── X-Axis Sliding Pill ──────────────────────────────────────────────────────

interface XAxisPillProps {
  data: TrendDataPoint[];
  activeIndex: number | null;
  accentColor: string;
  axisTextColor: string;
  badgeBg: string;
  badgeBorder: string;
}

function XAxisPill({
  data,
  activeIndex,
  accentColor,
  axisTextColor,
  badgeBg,
  badgeBorder,
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
      useNativeDriver: false, // layout prop — cannot use native driver
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
      {/* Sliding active pill */}
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

      {/* Labels */}
      {data.map((item, idx) => {
        const isActive = idx === activeIndex;
        return (
          <View key={idx} style={[styles.xAxisLabel, { width: pillWidth || undefined, flex: pillWidth ? 0 : 1 }]}>
            <Text
              numberOfLines={1}
              style={[
                styles.xAxisText,
                { color: isActive ? accentColor : axisTextColor },
                isActive && styles.xAxisTextActive,
              ]}
            >
              {item.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

// ─── Main Chart Component ─────────────────────────────────────────────────────

export function TrendChart({
  data = DEMO_CHART_DATA,
  height = 160,
  theme = "dark",
  accentColor = "#32C798",
  title = "Total Views",
  unit = "",
  onPointSelect,
}: TrendChartProps) {
  const safeData = data && data.length >= 2 ? data : DEMO_CHART_DATA;
  const colors = theme === "dark" ? COLORS_DARK : COLORS_LIGHT;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [overlayWidth, setOverlayWidth] = useState(0);

  // SVG coordinate calculations
  const pointCoords = useMemo(() => {
    const values = safeData.map((d) => d.value);
    const minV = Math.min(...values);
    const maxV = Math.max(...values);
    const rangeV = maxV - minV || 1;

    const drawW = SVG_VB_W - PAD_L - PAD_R;
    const drawH = SVG_VB_H - PAD_T - PAD_B;
    const step = drawW / (safeData.length - 1);

    return safeData.map((d, i) => ({
      x: PAD_L + i * step,
      y: PAD_T + drawH * (1 - (d.value - minV) / rangeV),
    }));
  }, [safeData]);

  // Smooth curve path
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

  // Gradient filled area path
  const areaPath = useMemo(() => {
    if (!linePath || pointCoords.length < 2) return "";
    const first = pointCoords[0];
    const last = pointCoords[pointCoords.length - 1];
    return `${linePath} L ${last.x} ${SVG_VB_H - PAD_B} L ${first.x} ${SVG_VB_H - PAD_B} Z`;
  }, [linePath, pointCoords]);

  // Y-axis grid/label values
  const yTicks = useMemo(() => {
    const values = safeData.map((d) => d.value);
    const minV = Math.min(...values);
    const maxV = Math.max(...values);
    const mid = (minV + maxV) / 2;
    return [maxV, mid, minV];
  }, [safeData]);

  const drawH = SVG_VB_H - PAD_T - PAD_B;

  const inspectedIdx = activeIndex !== null ? activeIndex : safeData.length - 1;
  const inspectedPoint = safeData[inspectedIdx];
  const prevIdx = inspectedIdx > 0 ? inspectedIdx - 1 : null;
  const prevValue = prevIdx !== null ? safeData[prevIdx].value : null;
  const pctChange = prevValue !== null && prevValue !== 0
    ? ((inspectedPoint.value - prevValue) / prevValue) * 100
    : 0;
  const isPositive = pctChange >= 0;

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
        Animated.spring(animX, { toValue: coord.x, useNativeDriver: false, stiffness: 200, damping: 28 }),
        Animated.spring(animY, { toValue: coord.y, useNativeDriver: false, stiffness: 200, damping: 28 }),
        Animated.timing(animOpacity, { toValue: 1, duration: 200, useNativeDriver: false }),
      ]).start();
    } else {
      Animated.timing(animOpacity, { toValue: 0, duration: 180, useNativeDriver: false }).start();
    }
  }, [activeIndex, pointCoords, animX, animY, animOpacity]);

  // ── Interaction handlers ──

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

  const handleWebPointerMove = useCallback(
    (e: any) => {
      if (!e?.currentTarget) return;
      const rect = (e.currentTarget as Element).getBoundingClientRect(); // platform:web-safe
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

  // Platform-specific pointer props (web-only)
  const webPointerProps = Platform.select({
    web: {
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
      {/* ── Header ─────────────────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          {/* Day badge reel */}
          <RollingDayBadge
            data={safeData}
            activeIndex={inspectedIdx}
            accentColor={accentColor}
            badgeBg={colors.badgeBg}
            badgeBorder={colors.badgeBorder}
          />

          {/* Title */}
          <Text style={[styles.titleText, { color: colors.textSecondary }]}>
            {title}
          </Text>
        </View>

        {/* Percent change + rolling number */}
        <View style={styles.headerRight}>
          <View style={styles.pctRow}>
            <RollingPercent
              pct={Math.abs(pctChange)}
              isPositive={isPositive}
              positiveColor={colors.positiveChange}
              negativeColor={colors.negativeChange}
            />
            <Text style={[styles.vsLabel, { color: colors.axisText }]}>
              {" "}vs prev
            </Text>
          </View>

          {/* Rolling number */}
          <View style={styles.valueRow}>
            <RollingNumber
              value={inspectedPoint.value}
              color={colors.textPrimary}
            />
            {unit ? (
              <Text style={[styles.unitLabel, { color: colors.textSecondary }]}>
                {" "}{unit}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      {/* ── SVG Chart ───────────────────────────────────────────────── */}
      <View style={[styles.svgWrap, { height }]}>
        <Svg
          width="100%"
          height={height}
          viewBox={`0 0 ${SVG_VB_W} ${SVG_VB_H}`}
          preserveAspectRatio="none"
        >
          <Defs>
            <LinearGradient id="tcGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={accentColor} stopOpacity={0.35} />
              <Stop offset="100%" stopColor={accentColor} stopOpacity={0} />
            </LinearGradient>
          </Defs>

          {/* Grid lines */}
          {yTicks.map((tick, i) => {
            const yPos = PAD_T + drawH * (1 - (tick - Math.min(...safeData.map(d => d.value))) / (Math.max(...safeData.map(d => d.value)) - Math.min(...safeData.map(d => d.value)) || 1));
            return (
              <Line
                key={i}
                x1={PAD_L}
                x2={SVG_VB_W - PAD_R}
                y1={yPos}
                y2={yPos}
                stroke={colors.gridLine}
                strokeWidth={1}
              />
            );
          })}

          {/* Area fill */}
          <Path d={areaPath} fill="url(#tcGrad)" />

          {/* Line */}
          <Path
            d={linePath}
            fill="none"
            stroke={accentColor}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Animated indicator (guideline + node) */}
          <SvgIndicator
            accentColor={accentColor}
            guideTop={PAD_T - 6}
            guideBottom={SVG_VB_H - PAD_B}
            animX={animX}
            animY={animY}
            animOpacity={animOpacity}
          />
        </Svg>

        {/* Interaction overlay — covers the full chart area */}
        <View
          style={StyleSheet.absoluteFill}
          onTouchMove={handleNativeTouchMove}
          onTouchEnd={handlePointerLeave}
          onLayout={(e) => setOverlayWidth(e.nativeEvent.layout.width)}
          {...webPointerProps}
        />

        {/* Per-column tap targets (also handle discrete taps on native) */}
        <View style={[StyleSheet.absoluteFill, styles.columnTapRow]}>
          {safeData.map((point, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.columnTap}
              activeOpacity={1}
              onPress={() => {
                setActiveIndex(idx === activeIndex ? null : idx);
                onPointSelect?.(point, idx);
              }}
              accessibilityRole="button"
              accessibilityLabel={`${point.label}: ${point.value}${unit}`}
            />
          ))}
        </View>
      </View>

      {/* ── X-Axis Labels with Sliding Pill ─────────────────────────── */}
      <XAxisPill
        data={safeData}
        activeIndex={activeIndex}
        accentColor={accentColor}
        axisTextColor={colors.axisText}
        badgeBg={colors.badgeBg}
        badgeBorder={colors.badgeBorder}
      />
    </View>
  );
}

// ─── StyleSheet ─────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
    gap: 4,
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 2,
  },
  titleText: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  dayBadgeWindow: {
    height: DAY_BADGE_H,
    borderRadius: 6,
    borderWidth: 1,
    overflow: "hidden",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  dayBadgeStrip: {
    flexDirection: "column",
  },
  dayBadgeItem: {
    height: DAY_BADGE_H,
    justifyContent: "center",
  },
  dayBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  pctRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rollingPct: {
    flexDirection: "row",
    alignItems: "center",
    height: DIGIT_HEIGHT,
    overflow: "hidden",
  },
  pctSign: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: DIGIT_HEIGHT,
  },
  pctUnit: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: DIGIT_HEIGHT,
  },
  vsLabel: {
    fontSize: 11,
    fontWeight: "500",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  rollingNumber: {
    flexDirection: "row",
    height: DIGIT_HEIGHT,
    overflow: "hidden",
  },
  digitSlot: {
    width: 14,
    height: DIGIT_HEIGHT,
    overflow: "hidden",
    alignItems: "center",
  },
  digitStrip: {
    flexDirection: "column",
  },
  singleDigitBox: {
    height: DIGIT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  digitChar: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: DIGIT_HEIGHT,
  },
  unitLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  svgWrap: {
    width: "100%",
    position: "relative",
  },
  columnTapRow: {
    flexDirection: "row",
  },
  columnTap: {
    flex: 1,
    height: "100%",
  },
  xAxisTrack: {
    flexDirection: "row",
    position: "relative",
    marginTop: 8,
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
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  xAxisText: {
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  xAxisTextActive: {
    fontWeight: "700",
  },
});

export default TrendChart;
