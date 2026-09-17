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
  type PanResponderGestureState,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Rect,
  Stop,
} from "react-native-svg";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export interface BarChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  date?: string;
}

export interface BarChartProps {
  /** Dataset of data points with label and numeric value */
  data?: BarChartDataPoint[];
  /** Theme palette: 'dark' | 'light' */
  theme?: "dark" | "light";
  /** Primary accent color (default emerald '#32c798') */
  accentColor?: string;
  /** Header title */
  title?: string;
  /** Currency/value prefix, e.g. '$' */
  valuePrefix?: string;
  /** Value suffix, e.g. ' hrs' or ' km' */
  valueSuffix?: string;
  /** Total height of the SVG chart area (default 175) */
  chartHeight?: number;
  /** Whether to animate bar heights with staggered spring on mount */
  animated?: boolean;
  /** Whether to render background slot tracks behind each bar */
  showBackgroundTrack?: boolean;
  /** Callback when a bar is selected/hovered */
  onSelectBar?: (point: BarChartDataPoint, index: number) => void;
  /** Additional container styling */
  style?: StyleProp<ViewStyle>;
}

// ── Default Sample Datasets (Weekly, Monthly, Yearly) ─────────────────────────

const SAMPLE_WEEKLY_DATA: BarChartDataPoint[] = [
  { label: "Mon", value: 1420, date: "Sep 15" },
  { label: "Tue", value: 2180, date: "Sep 16" },
  { label: "Wed", value: 3890, date: "Sep 17" },
  { label: "Thu", value: 4620, date: "Sep 18" },
  { label: "Fri", value: 3410, date: "Sep 19" },
  { label: "Sat", value: 2890, date: "Sep 20" },
  { label: "Sun", value: 5120, date: "Sep 21" },
];

const SAMPLE_MONTHLY_DATA: BarChartDataPoint[] = [
  { label: "W1", value: 12400, date: "Sep 1 – 7" },
  { label: "W2", value: 18900, date: "Sep 8 – 14" },
  { label: "W3", value: 15600, date: "Sep 15 – 21" },
  { label: "W4", value: 24800, date: "Sep 22 – 28" },
];

const SAMPLE_SIX_MONTH_DATA: BarChartDataPoint[] = [
  { label: "Jan", value: 3200 },
  { label: "Feb", value: 4100 },
  { label: "Mar", value: 5800 },
  { label: "Apr", value: 4900 },
  { label: "May", value: 6700 },
  { label: "Jun", value: 8400 },
];

export const DEFAULT_BAR_CHART_DATA = SAMPLE_WEEKLY_DATA;

const TIME_RANGES = ["1W", "1M", "6M"] as const;
type TimeRange = (typeof TIME_RANGES)[number];
const RANGE_BTN_WIDTH = 34;

// ─── Rolling Digits & Animated Numbers ───────────────────────────────────────

const DIGIT_CHARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function formatGrouped(val: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(val));
}

interface RollingDigitProps {
  digit: number;
  color: string;
  delay?: number;
  height?: number;
  fontSize?: number;
  slotWidth?: number;
  fontWeight?: TextStyle["fontWeight"];
}

/**
 * RollingDigit renders a vertical animated reel of digits (0-9).
 *
 * NOTE on allowFontScaling={false}:
 * System font scaling is intentionally disabled on the rolling digit reel and its
 * prefix/comma chars because translateY calculations (-digit * height) strictly
 * require fixed-height slot clipping. All outer text elements (title, subtitle,
 * range pills, and X-axis labels) fully respect accessibility font scaling.
 */
const RollingDigit = memo(function RollingDigit({
  digit,
  color,
  delay = 0,
  height = 34,
  fontSize = 28,
  slotWidth = 17,
  fontWeight = "800",
}: RollingDigitProps) {
  const animY = useRef(new Animated.Value(-digit * height)).current;

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        Animated.spring(animY, {
          toValue: -digit * height,
          useNativeDriver: true,
          stiffness: 260,
          damping: 26,
          mass: 0.8,
        }).start();
      }, delay);
      return () => clearTimeout(timer);
    } else {
      Animated.spring(animY, {
        toValue: -digit * height,
        useNativeDriver: true,
        stiffness: 260,
        damping: 26,
        mass: 0.8,
      }).start();
    }
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
                fontWeight,
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

interface RollingNumberProps {
  value: number;
  color: string;
  prefix?: string;
  suffix?: string;
  height?: number;
  fontSize?: number;
  slotWidth?: number;
  fontWeight?: TextStyle["fontWeight"];
  staggerDelay?: number;
}

const RollingNumber = memo(function RollingNumber({
  value,
  color,
  prefix = "",
  suffix = "",
  height = 34,
  fontSize = 28,
  slotWidth = 17,
  fontWeight = "800",
  staggerDelay = 0,
}: RollingNumberProps) {
  const formatted = formatGrouped(value);
  const chars = formatted.split("");
  const totalLength = chars.length + (prefix ? prefix.length : 0) + (suffix ? suffix.length : 0);

  // Responsive font scaling for large numbers (e.g. $1,242,000,000) so they never clip on narrow screens
  const scale = totalLength > 12 ? 0.72 : totalLength > 9 ? 0.85 : 1;
  const effectiveFontSize = Math.round(fontSize * scale);
  const effectiveHeight = Math.round(height * scale);
  const effectiveSlotWidth = Math.round(slotWidth * scale * 10) / 10;

  return (
    <View style={[styles.rollingNumber, { height: effectiveHeight }]}>
      {prefix ? (
        <Text
          allowFontScaling={false}
          style={[
            styles.prefixText,
            {
              color,
              fontSize: effectiveFontSize * 0.85,
              lineHeight: effectiveHeight,
              fontWeight,
            },
          ]}
        >
          {prefix}
        </Text>
      ) : null}

      {chars.map((char, i) => {
        const posFromRight = chars.length - 1 - i;
        if (char === ",") {
          return (
            <Text
              key={`comma-${posFromRight}`}
              allowFontScaling={false}
              style={[
                styles.commaChar,
                {
                  color,
                  fontSize: effectiveFontSize * 0.85,
                  lineHeight: effectiveHeight,
                  fontWeight,
                },
              ]}
            >
              ,
            </Text>
          );
        }
        const digit = Number(char);
        if (isNaN(digit)) return null;
        return (
          <RollingDigit
            key={`d-${posFromRight}`}
            digit={digit}
            color={color}
            delay={staggerDelay > 0 ? (chars.length - 1 - i) * staggerDelay : 0}
            height={effectiveHeight}
            fontSize={effectiveFontSize}
            slotWidth={effectiveSlotWidth}
            fontWeight={fontWeight}
          />
        );
      })}

      {suffix ? (
        <Text
          allowFontScaling={false}
          style={[
            styles.suffixText,
            {
              color,
              fontSize: effectiveFontSize * 0.65,
              lineHeight: effectiveHeight,
              fontWeight: "600",
            },
          ]}
        >
          {suffix}
        </Text>
      ) : null}
    </View>
  );
});

const PCT_DIGIT_H = 18;
const PCT_FONT_SIZE = 11.5;
const PCT_SLOT_W = 7.5;

interface RollingPercentProps {
  pct: number;
  isPositive: boolean;
  positiveColor: string;
  negativeColor: string;
}

const RollingPercent = memo(function RollingPercent({
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
      <Text
        allowFontScaling={false}
        style={[styles.pctSign, { color, lineHeight: PCT_DIGIT_H, fontSize: PCT_FONT_SIZE }]}
      >
        {isPositive ? "+" : "−"}
      </Text>
      {intDigits.map((d, i) => {
        const posFromRight = intDigits.length - 1 - i;
        return (
          <RollingDigit
            key={`int-${posFromRight}`}
            digit={isNaN(d) ? 0 : d}
            color={color}
            delay={0}
            height={PCT_DIGIT_H}
            fontSize={PCT_FONT_SIZE}
            slotWidth={PCT_SLOT_W}
            fontWeight="700"
          />
        );
      })}
      {decDigit !== null && (
        <>
          <Text
            allowFontScaling={false}
            style={[styles.pctDot, { color, lineHeight: PCT_DIGIT_H, fontSize: PCT_FONT_SIZE }]}
          >
            .
          </Text>
          <RollingDigit
            key="dec"
            digit={isNaN(decDigit) ? 0 : decDigit}
            color={color}
            delay={0}
            height={PCT_DIGIT_H}
            fontSize={PCT_FONT_SIZE}
            slotWidth={PCT_SLOT_W}
            fontWeight="700"
          />
        </>
      )}
      <Text
        allowFontScaling={false}
        style={[styles.pctUnit, { color, lineHeight: PCT_DIGIT_H, fontSize: PCT_FONT_SIZE }]}
      >
        %
      </Text>
    </View>
  );
});

// ── Main BarChart Component ──────────────────────────────────────────────────

export function BarChart({
  data: propData,
  theme = "dark",
  accentColor = "#32c798",
  title,
  valuePrefix = "$",
  valueSuffix = "",
  chartHeight = 175,
  animated = true,
  showBackgroundTrack = true,
  onSelectBar,
  style,
}: BarChartProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("1W");

  // Dynamic contextual title when not explicitly provided
  const resolvedTitle =
    title ??
    (propData
      ? "Volume"
      : selectedRange === "1W"
        ? "Weekly Volume"
        : selectedRange === "1M"
          ? "Monthly Volume"
          : "6-Month Volume");

  // Determine active dataset based on prop or range
  const currentData = useMemo(() => {
    if (propData !== undefined) return propData;
    if (selectedRange === "1M") return SAMPLE_MONTHLY_DATA;
    if (selectedRange === "6M") return SAMPLE_SIX_MONTH_DATA;
    return SAMPLE_WEEKLY_DATA;
  }, [propData, selectedRange]);

  // Responsive chart width measured dynamically onLayout (fallback 320 for first frame)
  const [chartWidth, setChartWidth] = useState<number>(320);

  // Active scrubbed bar index (null when inactive/idle)
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);
  const activeBarIndexRef = useRef<number | null>(null);
  activeBarIndexRef.current = activeBarIndex;

  // Floating tooltip measured width (defaults to 84, measured dynamically via onLayout)
  const [tooltipWidth, setTooltipWidth] = useState<number>(84);
  const tooltipWidthRef = useRef<number>(84);
  tooltipWidthRef.current = tooltipWidth;

  // Measurement ref for touch coordinates (scroll-immune on Android and iOS)
  const chartWrapperRef = useRef<React.ElementRef<typeof View>>(null);
  const chartLeftRef = useRef<number>(0);
  const chartWidthRef = useRef<number>(0);

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

  // React 18/19 SSR safe gradient IDs
  const reactId = useId();
  const safeId = useMemo(
    () => `barGrad-${theme}-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [theme, reactId]
  );

  // Staggered animated height values for bars
  const animValues = useRef<Animated.Value[]>([]);
  if (animValues.current.length !== currentData.length) {
    animValues.current = currentData.map(() => new Animated.Value(animated ? 0 : 1));
  }

  // Floating tooltip dual-axis animation values (X and Y tracking)
  const tooltipOpacity = useRef(new Animated.Value(0)).current;
  const tooltipTranslateX = useRef(new Animated.Value(0)).current;
  const tooltipTranslateY = useRef(new Animated.Value(0)).current;

  // Sliding X-axis active indicator block animation values
  const labelIndicatorX = useRef(new Animated.Value(0)).current;
  const labelIndicatorOpacity = useRef(new Animated.Value(0)).current;

  // Range switcher sliding indicator and chart page slide transitions
  const rangeIndicatorX = useRef(new Animated.Value(0)).current;
  const chartSlideX = useRef(new Animated.Value(0)).current;
  const chartOpacity = useRef(new Animated.Value(1)).current;

  // Run staggered spring entrance on data change
  useEffect(() => {
    if (!animated) {
      animValues.current.forEach((val) => val.setValue(1));
      return;
    }

    // Reset to 0
    animValues.current.forEach((val) => val.setValue(0));

    // Staggered spring cascade
    const animations = animValues.current.map((val) =>
      Animated.spring(val, {
        toValue: 1,
        stiffness: 220,
        damping: 19,
        mass: 0.8,
        useNativeDriver: false,
      })
    );

    Animated.stagger(45, animations).start();
  }, [currentData, animated]);

  // Color tokens
  const isDark = theme === "dark";
  const colors = useMemo(() => {
    return {
      cardBg: isDark ? "#0c0c10" : "#ffffff",
      cardBorder: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
      trackBg: isDark ? "rgba(255, 255, 255, 0.035)" : "rgba(0, 0, 0, 0.035)",
      title: isDark ? "#8b8d98" : "#64748b",
      valueText: isDark ? "#ffffff" : "#09090b",
      labelText: isDark ? "#71717a" : "#71717a",
      activeLabelText: isDark ? "#ffffff" : "#09090b",
      activeLabelBlockBg: isDark
        ? "rgba(255, 255, 255, 0.09)"
        : "rgba(0, 0, 0, 0.06)",
      activeLabelBlockBorder: isDark
        ? "rgba(255, 255, 255, 0.16)"
        : "rgba(0, 0, 0, 0.12)",
      subText: isDark ? "#9ca3af" : "#64748b",
      badgeBg: "rgba(50, 199, 152, 0.12)",
      badgeText: accentColor,
      pillBg: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
      pillActiveBg: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)",
      pillText: isDark ? "#9ca3af" : "#64748b",
      pillActiveText: isDark ? "#ffffff" : "#09090b",
      tooltipBg: isDark ? "#18181f" : "#ffffff",
      tooltipBorder: isDark ? "rgba(255, 255, 255, 0.14)" : "rgba(0, 0, 0, 0.1)",
      tooltipText: isDark ? "#ffffff" : "#09090b",
      gradStart: accentColor,
      gradEnd: isDark ? "#10b981" : "#059669",
    };
  }, [isDark, accentColor]);

  // ── Exact Mathematical Alignment ──────────────────────────────────────────
  const barCount = Math.max(1, currentData.length);
  const slotWidth = chartWidth > 0 ? chartWidth / barCount : 40;

  // Dynamic bar width that smoothly scales with data density:
  // - Never forces a minimum larger than the slot allows (prevents bar overlap with 20+ or 30+ items)
  // - Leaves at least 1-2px gap between adjacent bars
  // - Has a maximum cap of 34px for clean aesthetic proportions
  const maxAllowedBarWidth = Math.max(2, slotWidth - 2);
  const barWidth = Math.min(34, Math.max(2, Math.min(maxAllowedBarWidth, slotWidth * 0.56)));
  const pillWidth = Math.max(8, Math.min(slotWidth - 1, barWidth + 8));
  const maxDataValue = Math.max(...currentData.map((d) => d.value), 1);

  // Label spacing: when slotWidth is tight (< 28px), display labels at intervals
  // but always guarantee the currently active/selected bar's label is visible
  const labelInterval = slotWidth < 18 ? 4 : slotWidth < 28 ? 2 : 1;

  // Total summary value
  const totalValue = useMemo(() => {
    return currentData.reduce((acc, curr) => acc + curr.value, 0);
  }, [currentData]);

  // Active hovered point
  const activePoint = activeBarIndex !== null ? currentData[activeBarIndex] : null;

  // Rolling percentage change computation (always computed from real data, zero hardcoded numbers)
  const { displayPct, displayIsPositive } = useMemo(() => {
    if (currentData.length === 0) {
      return { displayPct: 0.0, displayIsPositive: true };
    }
    if (activeBarIndex === null) {
      // Idle state: compute period change from first to last point in currentData
      const firstVal = currentData[0]?.value ?? 0;
      const lastVal = currentData[currentData.length - 1]?.value ?? 0;
      if (firstVal <= 0) {
        return { displayPct: lastVal > 0 ? 100.0 : 0.0, displayIsPositive: true };
      }
      const diff = ((lastVal - firstVal) / firstVal) * 100;
      return {
        displayPct: Math.round(Math.abs(diff) * 10) / 10,
        displayIsPositive: diff >= 0,
      };
    }
    if (activeBarIndex === 0) {
      return { displayPct: 0.0, displayIsPositive: true };
    }
    const prevVal = currentData[activeBarIndex - 1]?.value ?? 0;
    const currVal = currentData[activeBarIndex]?.value ?? 0;
    if (prevVal <= 0) {
      return { displayPct: currVal > 0 ? 100.0 : 0.0, displayIsPositive: true };
    }
    const diff = ((currVal - prevVal) / prevVal) * 100;
    return {
      displayPct: Math.round(Math.abs(diff) * 10) / 10,
      displayIsPositive: diff >= 0,
    };
  }, [activeBarIndex, currentData]);

  // ── Smooth Slide Transition on Range Change ───────────────────────────────
  const handleRangeChange = useCallback(
    (newRange: TimeRange) => {
      if (newRange === selectedRange) return;

      const oldIdx = TIME_RANGES.indexOf(selectedRange);
      const newIdx = TIME_RANGES.indexOf(newRange);
      const direction = newIdx > oldIdx ? -1 : 1; // slide direction

      // Slide the range pill indicator
      Animated.spring(rangeIndicatorX, {
        toValue: newIdx * RANGE_BTN_WIDTH,
        stiffness: 320,
        damping: 28,
        mass: 0.75,
        useNativeDriver: true,
      }).start();

      // Smooth slide out old chart
      Animated.parallel([
        Animated.timing(chartSlideX, {
          toValue: direction * 24,
          duration: 90,
          useNativeDriver: true,
        }),
        Animated.timing(chartOpacity, {
          toValue: 0.1,
          duration: 90,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setSelectedRange(newRange);
        setActiveBarIndex(null);
        tooltipOpacity.setValue(0);
        labelIndicatorOpacity.setValue(0);

        // Slide in new chart from opposite direction like swiping
        chartSlideX.setValue(-direction * 24);
        Animated.parallel([
          Animated.spring(chartSlideX, {
            toValue: 0,
            stiffness: 280,
            damping: 26,
            mass: 0.8,
            useNativeDriver: true,
          }),
          Animated.timing(chartOpacity, {
            toValue: 1,
            duration: 140,
            useNativeDriver: true,
          }),
        ]).start();
      });
    },
    [selectedRange, rangeIndicatorX, chartSlideX, chartOpacity, tooltipOpacity, labelIndicatorOpacity]
  );

  // ── Update Hover / Scrub with Dual-Axis Tooltip Movement ───────────────────
  const setScrubIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, barCount - 1));
      if (clamped !== activeBarIndexRef.current) {
        const isInitial = activeBarIndexRef.current === null;
        setActiveBarIndex(clamped);
        const item = currentData[clamped];
        onSelectBar?.(item, clamped);

        // Calculate exact center of the active bar column
        const columnCenterX = clamped * slotWidth + slotWidth / 2;

        // Tooltip is centered using { translateX: -measuredWidth / 2 }.
        // Clamping targetTooltipX ensures the floating pill never clips beyond left or right card boundaries on narrow mobile screens
        const measuredWidth = tooltipWidthRef.current || 84;
        const halfTooltip = measuredWidth / 2;
        const targetTooltipX =
          chartWidth > measuredWidth + 8
            ? Math.max(halfTooltip + 4, Math.min(chartWidth - halfTooltip - 4, columnCenterX))
            : columnCenterX;

        // Calculate top of active bar in SVG coordinates
        const radius = Math.min(6, barWidth / 2);
        const targetHeight = Math.max(
          radius * 2,
          (item.value / maxDataValue) * (chartHeight - 12)
        );
        const barTop = chartHeight - targetHeight;

        // Tooltip floats right above the active bar's top cap
        const targetTooltipY = Math.max(-14, barTop - 34);

        // Slide the X-axis active block target position
        const targetPillX = clamped * slotWidth + (slotWidth - pillWidth) / 2;

        // On initial touch/hover from idle: place indicators directly at target so they don't fly in from left edge
        if (isInitial) {
          tooltipTranslateX.setValue(targetTooltipX);
          tooltipTranslateY.setValue(targetTooltipY);
          labelIndicatorX.setValue(targetPillX);
        }

        // Unified, critically-damped spring physics for ultra-smooth lockstep movement across points
        const springPhysics = {
          stiffness: 280,
          damping: 28,
          mass: 0.8,
          useNativeDriver: true,
        };

        // Slide floating tooltip and X-axis active block in lockstep smoothly
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
            toValue: targetPillX,
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
      barCount,
      currentData,
      onSelectBar,
      slotWidth,
      barWidth,
      maxDataValue,
      chartHeight,
      chartWidth,
      pillWidth,
      tooltipTranslateX,
      tooltipTranslateY,
      tooltipOpacity,
      labelIndicatorX,
      labelIndicatorOpacity,
    ]
  );

  const clearScrub = useCallback(() => {
    setActiveBarIndex(null);
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
      if (w <= 0 || barCount <= 0) return;

      let relX: number | undefined;

      // 1. Try pageX relative to measured chart left (Android & iOS scroll-immune)
      const pageX = evt?.nativeEvent?.pageX ?? gestureState?.moveX ?? gestureState?.x0;
      if (pageX !== undefined && chartLeftRef.current > 0) {
        relX = pageX - chartLeftRef.current;
      }

      // 2. Fallback to locationX
      if (relX === undefined || isNaN(relX)) {
        relX = evt?.nativeEvent?.locationX;
      }

      if (relX === undefined || isNaN(relX)) return;

      const clampedX = Math.max(0, Math.min(w, relX));
      const calculatedSlotWidth = w / barCount;
      const index = Math.min(barCount - 1, Math.max(0, Math.floor(clampedX / calculatedSlotWidth)));
      setScrubIndex(index);
    },
    [chartWidth, barCount, setScrubIndex]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        // Allow instant tap/scrub response on press
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => false,

        // Only capture horizontal movements (scrubbing). If user is scrolling vertically,
        // yield to parent ScrollView / FlatList so the screen scroll isn't hijacked.
        onMoveShouldSetPanResponder: (_evt, gestureState) => {
          return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 3;
        },
        onMoveShouldSetPanResponderCapture: (_evt, gestureState) => {
          return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 5;
        },

        // Yield to parent vertical scroll container if vertical gesture takes precedence
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

  // Desktop web mouse hover support (matches trend-chart interaction model)
  const webPointerProps = Platform.select({
    web: {
      onPointerMove: (e: {
        currentTarget?: { getBoundingClientRect?: () => { left: number; width: number } };
        clientX?: number;
      }) => { // platform:web-safe
        const rect = e?.currentTarget?.getBoundingClientRect?.(); // platform:web-safe
        if (!rect || rect.width <= 0) return;
        const relX = (e.clientX ?? 0) - rect.left;
        const clampedX = Math.max(0, Math.min(rect.width, relX));
        const sw = rect.width / barCount;
        const index = Math.min(barCount - 1, Math.max(0, Math.floor(clampedX / sw)));
        setScrubIndex(index);
      },
      onPointerLeave: () => { // platform:web-safe
        clearScrub();
      },
    },
    default: {},
  }) as object;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBg,
          borderColor: colors.cardBorder,
        },
        style,
      ]}
    >
      {/* ── Top Header Row ──────────────────────────────────────────────── */}
      <View style={styles.headerTopRow}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.titleText, { color: colors.title }]}
        >
          {resolvedTitle.toUpperCase()}
        </Text>

        {/* Range Selector Switch with Sliding Segmented Pill */}
        {!propData && (
          <View style={[styles.rangePillRow, { backgroundColor: colors.pillBg }]}>
            {/* Sliding Pill Background Indicator */}
            <Animated.View
              style={[
                styles.rangePillSlider,
                {
                  backgroundColor: colors.pillActiveBg,
                  transform: [{ translateX: rangeIndicatorX }],
                },
              ]}
            />

            {TIME_RANGES.map((range) => {
              const isSelected = selectedRange === range;
              return (
                <Pressable
                  key={range}
                  onPress={() => handleRangeChange(range)}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${range} view`}
                  accessibilityState={{ selected: isSelected }}
                  style={styles.rangeButton}
                >
                  <Text
                    style={[
                      styles.rangeButtonText,
                      {
                        color: isSelected
                          ? colors.pillActiveText
                          : colors.pillText,
                        fontWeight: isSelected ? "700" : "500",
                      },
                    ]}
                  >
                    {range}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>

      {/* ── Metric Readout Row with Rolling Number & Badge Pill ─────────── */}
      <View style={styles.metricRow}>
        <View style={styles.metricValueRow}>
          <RollingNumber
            value={activePoint ? activePoint.value : totalValue}
            color={colors.valueText}
            prefix={valuePrefix}
            suffix={valueSuffix}
            height={34}
            fontSize={28}
            slotWidth={17}
            fontWeight="800"
            staggerDelay={10}
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

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.metricSubtitle, { color: colors.subText }]}
        >
          {activePoint
            ? activePoint.date
              ? `${activePoint.label}, ${activePoint.date}`
              : activePoint.label
            : "Total volume"}
        </Text>
      </View>

      {/* ── Inner Chart & Labels Area with Sliding Transition ───────────── */}
      <Animated.View
        onLayout={(e) => {
          const w = e.nativeEvent.layout.width;
          if (w > 0 && Math.abs(w - chartWidth) > 1) {
            setChartWidth(w);
          }
        }}
        style={[
          styles.chartArea,
          {
            opacity: chartOpacity,
            transform: [{ translateX: chartSlideX }],
          },
        ]}
      >
        {/* Floating Dual-Axis Value Tooltip Pill (Moves in X & Y with Rolling Digits) */}
        {/* Floating Dual-Axis Value Tooltip Pill (Moves in X & Y with Rolling Digits) */}
        <Animated.View
          pointerEvents="none"
          onLayout={(e) => {
            const w = Math.round(e.nativeEvent.layout.width);
            if (w > 0 && Math.abs(w - tooltipWidthRef.current) > 1) {
              setTooltipWidth(w);
            }
          }}
          style={[
            styles.floatingTooltip,
            {
              backgroundColor: colors.tooltipBg,
              borderColor: colors.tooltipBorder,
              opacity: tooltipOpacity,
              transform: [
                { translateX: tooltipTranslateX },
                { translateY: tooltipTranslateY },
                { translateX: -tooltipWidth / 2 },
              ],
            },
          ]}
        >
          <View style={[styles.tooltipDot, { backgroundColor: accentColor }]} />
          {activePoint ? (
            <RollingNumber
              value={activePoint.value}
              color={colors.tooltipText}
              prefix={valuePrefix}
              suffix={valueSuffix}
              height={18}
              fontSize={12}
              slotWidth={7.5}
              fontWeight="700"
              staggerDelay={0}
            />
          ) : null}
        </Animated.View>

        {/* SVG Chart with Touch/PanResponder and Web Hover */}
        <View
          ref={chartWrapperRef}
          {...panResponder.panHandlers}
          {...webPointerProps}
          style={[styles.chartWrapper, { height: chartHeight }]}
        >
          <Svg width="100%" height={chartHeight}>
            <Defs>
              <LinearGradient id={safeId} x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={colors.gradStart} stopOpacity={1} />
                <Stop offset="100%" stopColor={colors.gradEnd} stopOpacity={0.82} />
              </LinearGradient>
            </Defs>

            {currentData.map((item, index) => {
              // Exact mathematical alignment with slotWidth
              const barX = index * slotWidth + (slotWidth - barWidth) / 2;

              const radius = Math.min(6, barWidth / 2);
              const targetHeight = Math.max(
                radius * 2,
                (item.value / maxDataValue) * (chartHeight - 12)
              );
              const barY = chartHeight - targetHeight;

              const isHovered = activeBarIndex === index;
              const hasActiveSelection = activeBarIndex !== null;
              const barOpacity = hasActiveSelection
                ? isHovered
                  ? 1
                  : 0.32
                : 1;

              const anim = animValues.current[index];
              const animHeight = animated && anim
                ? anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, targetHeight],
                  })
                : targetHeight;
              const animY = animated && anim
                ? anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [chartHeight, barY],
                  })
                : barY;
              const animSheenY = animated && anim
                ? anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [chartHeight + 1, barY + 1],
                  })
                : barY + 1;

              return (
                <React.Fragment key={`bar-${index}`}>
                  {/* Background Slot Track */}
                  {showBackgroundTrack && (
                    <Rect
                      x={barX}
                      y={6}
                      width={barWidth}
                      height={chartHeight - 12}
                      rx={radius}
                      ry={radius}
                      fill={colors.trackBg}
                    />
                  )}

                  {/* Main Data Capsule Bar */}
                  <AnimatedRect
                    x={barX}
                    y={animY}
                    width={barWidth}
                    height={animHeight}
                    rx={radius}
                    ry={radius}
                    fill={`url(#${safeId})`}
                    opacity={barOpacity}
                  />

                  {/* Subtle highlight sheen on top edge of active bar */}
                  {isHovered && (
                    <AnimatedRect
                      x={barX + 2}
                      y={animSheenY}
                      width={Math.max(2, barWidth - 4)}
                      height={3}
                      rx={1.5}
                      ry={1.5}
                      fill="#ffffff"
                      opacity={0.7}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </Svg>
        </View>

        {/* ── X-Axis Labels with Sliding Block Indicator ─────────────────── */}
        <View style={styles.labelsContainer}>
          {/* Smooth Sliding Active Block */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.slidingLabelBlock,
              {
                width: pillWidth,
                transform: [{ translateX: labelIndicatorX }],
                backgroundColor: colors.activeLabelBlockBg,
                borderColor: colors.activeLabelBlockBorder,
                opacity: labelIndicatorOpacity,
              },
            ]}
          />

          {/* Label Items (Perfect 1:1 Column Alignment) */}
          <View style={styles.labelsRow}>
            {currentData.map((item, index) => {
              const isSelected = activeBarIndex === index;
              const shouldShowText =
                isSelected ||
                labelInterval === 1 ||
                index % labelInterval === 0 ||
                index === currentData.length - 1;

              return (
                <Pressable
                  key={`label-${index}`}
                  onPress={() => setScrubIndex(index)}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.label}, ${formatGrouped(item.value)}`}
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
                          : colors.labelText,
                        fontWeight: isSelected ? "700" : "500",
                        opacity: shouldShowText ? 1 : 0,
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
      </Animated.View>
    </View>
  );
}

// ── Stylesheet ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 580,
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 8,
  },
  titleText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    flexShrink: 1,
    marginRight: 8,
  },
  rangePillRow: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 2.5,
    position: "relative",
    flexShrink: 0,
  },
  rangePillSlider: {
    position: "absolute",
    top: 2.5,
    left: 2.5,
    width: RANGE_BTN_WIDTH,
    height: 24,
    borderRadius: 7.5,
    zIndex: 1,
  },
  rangeButton: {
    width: RANGE_BTN_WIDTH,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  rangeButtonText: {
    fontSize: 11.5,
  },
  metricRow: {
    marginBottom: 14,
  },
  metricValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    maxWidth: "100%",
    flexShrink: 1,
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7.5,
    paddingVertical: 3,
    borderRadius: 8,
  },
  metricSubtitle: {
    fontSize: 12.5,
    marginTop: 4,
    fontWeight: "400",
  },
  rollingNumber: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    maxWidth: "100%",
    flexShrink: 1,
  },
  digitStrip: {
    flexDirection: "column",
  },
  prefixText: {
    marginRight: 1.5,
    letterSpacing: -0.4,
  },
  suffixText: {
    marginLeft: 3,
  },
  commaChar: {
    marginHorizontal: 0.5,
    letterSpacing: -0.4,
  },
  rollingPct: {
    flexDirection: "row",
    alignItems: "center",
    height: PCT_DIGIT_H,
    overflow: "hidden",
  },
  pctSign: {
    marginRight: 0.5,
    fontWeight: "700",
  },
  pctDot: {
    marginHorizontal: 0.5,
    fontWeight: "700",
  },
  pctUnit: {
    marginLeft: 0.5,
    fontWeight: "700",
  },
  chartArea: {
    width: "100%",
    position: "relative",
  },
  floatingTooltip: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 9,
    paddingVertical: 4.5,
    borderRadius: 8,
    borderWidth: 1,
    zIndex: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  tooltipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: "700",
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

export default BarChart;
