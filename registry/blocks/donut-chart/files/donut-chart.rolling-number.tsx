import React, { memo, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  View,
  type TextStyle,
} from "react-native";
import { formatDonutValue } from "./donut-chart.utils";

export const DEFAULT_MONO_FONT = Platform.select({
  ios: "Menlo",
  android: "monospace",
  web: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace",
  default: "monospace",
});

const DIGIT_CHARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export interface RollingDigitProps {
  digit: number;
  color: string;
  active?: boolean;
  delay?: number;
  height?: number;
  fontSize?: number;
  slotWidth?: number;
  fontWeight?: TextStyle["fontWeight"];
  fontFamily?: string;
  animateOnMount?: boolean;
}

/**
 * RollingDigit renders a vertical animated reel of digits (0-9).
 * Animated via translateY on the native driver for 60fps performance.
 */
export const RollingDigit = memo(function RollingDigit({
  digit,
  color,
  active = true,
  delay = 0,
  height = 42,
  fontSize = 34,
  slotWidth = 21,
  fontWeight = "700",
  fontFamily,
  animateOnMount = true,
}: RollingDigitProps) {
  const targetDigit = Math.max(
    0,
    Math.min(9, Math.round(Number.isFinite(digit) ? digit : 0))
  );

  const wasActiveRef = useRef(active);

  // When mounting on first render, start at 0 so non-zero digits visibly roll up on page load
  const animY = useRef(
    new Animated.Value(
      active && animateOnMount ? 0 : -targetDigit * height
    )
  ).current;

  useEffect(() => {
    // If this column was inactive and is now becoming active,
    // immediately set animY to targetDigit so it never rolls from 0 or shows a stray 0!
    if (!wasActiveRef.current && active) {
      animY.setValue(-targetDigit * height);
    }
    wasActiveRef.current = active;

    if (!active) {
      return;
    }

    const targetY = -targetDigit * height;

    const runSpring = () => {
      Animated.spring(animY, {
        toValue: targetY,
        useNativeDriver: true,
        stiffness: 220,
        damping: 24,
        mass: 0.8,
      }).start();
    };

    if (delay > 0) {
      const timer = setTimeout(runSpring, delay);
      return () => clearTimeout(timer);
    } else {
      runSpring();
    }
  }, [active, targetDigit, height, delay, animY]);

  const resolvedFontFamily = fontFamily || DEFAULT_MONO_FONT;

  return (
    <View style={[styles.digitSlot, { height, width: slotWidth }]}>
      <Animated.View
        style={[
          {
            transform: [{ translateY: animY }],
          },
          Platform.select({
            web: {
              transform: `translate3d(0, ${-targetDigit * height}px, 0)`,
              transition: `transform 300ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
              willChange: "transform",
            } as any,
            default: {},
          }),
        ]}
      >
        {DIGIT_CHARS.map((d) => (
          <View
            key={`cell-${d}`}
            style={[styles.digitCell, { height, width: slotWidth }]}
          >
            <Text
              allowFontScaling={false}
              style={[
                styles.digitText,
                {
                  color,
                  fontSize,
                  lineHeight: height,
                  fontWeight,
                  fontFamily: resolvedFontFamily,
                },
              ]}
            >
              {d}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
});

interface RollingDigitColumnProps {
  power: number;
  active: boolean;
  digit: number;
  color: string;
  slotWidth: number;
  height: number;
  fontSize: number;
  fontWeight?: TextStyle["fontWeight"];
  fontFamily?: string;
  delay?: number;
  animateOnMount?: boolean;
}

/**
 * RollingDigitColumn wraps a single digit slot in an animated accordion.
 * When expanding (e.g. 25 -> 100): smoothly animates width 0 -> slotWidth and opacity 0 -> 1.
 * When collapsing (e.g. 100 -> 25): smoothly animates width slotWidth -> 0 and opacity 1 -> 0.
 * As the width animates, the centered container smoothly glides the remaining digits
 * into the exact middle without any abrupt jumping or popping.
 */
const RollingDigitColumn = memo(function RollingDigitColumn({
  power,
  active,
  digit,
  color,
  slotWidth,
  height,
  fontSize,
  fontWeight,
  fontFamily,
  delay = 0,
  animateOnMount = true,
}: RollingDigitColumnProps) {
  const animWidth = useRef(new Animated.Value(active ? slotWidth : 0)).current;
  const animOpacity = useRef(new Animated.Value(active ? 1 : 0)).current;

  // Preserve the last visible digit so when collapsing, it smoothly fades out without snapping to 0
  const lastDigitRef = useRef(digit);
  if (active) {
    lastDigitRef.current = digit;
  }
  const displayDigit = active ? digit : lastDigitRef.current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(animWidth, {
        toValue: active ? slotWidth : 0,
        stiffness: 260,
        damping: 28,
        mass: 0.8,
        useNativeDriver: false,
      }),
      Animated.spring(animOpacity, {
        toValue: active ? 1 : 0,
        stiffness: 260,
        damping: 28,
        mass: 0.8,
        useNativeDriver: false,
      }),
    ]).start();
  }, [active, slotWidth, animWidth, animOpacity]);

  const clampedWidth = animWidth.interpolate({
    inputRange: [0, slotWidth],
    outputRange: [0, slotWidth],
    extrapolate: "clamp",
  });

  const clampedOpacity = animOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        {
          width: clampedWidth,
          opacity: clampedOpacity,
          height,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "flex-start",
        },
        Platform.select({
          web: {
            width: active ? slotWidth : 0,
            opacity: active ? 1 : 0,
            transition:
              "width 280ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "width, opacity",
          } as any,
          default: {},
        }),
      ]}
    >
      <RollingDigit
        active={active}
        digit={displayDigit}
        color={color}
        delay={active ? delay : 0}
        height={height}
        fontSize={fontSize}
        slotWidth={slotWidth}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        animateOnMount={animateOnMount}
      />
    </Animated.View>
  );
});

interface RollingPunctColumnProps {
  active: boolean;
  char: string;
  color: string;
  width: number;
  height: number;
  fontSize: number;
  fontWeight?: TextStyle["fontWeight"];
  fontFamily?: string;
}

/**
 * RollingPunctColumn smoothly expands/collapses punctuation (commas and periods)
 * in lockstep with the associated digit power.
 */
const RollingPunctColumn = memo(function RollingPunctColumn({
  active,
  char,
  color,
  width,
  height,
  fontSize,
  fontWeight,
  fontFamily,
}: RollingPunctColumnProps) {
  const animWidth = useRef(new Animated.Value(active ? width : 0)).current;
  const animOpacity = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(animWidth, {
        toValue: active ? width : 0,
        stiffness: 260,
        damping: 28,
        mass: 0.8,
        useNativeDriver: false,
      }),
      Animated.spring(animOpacity, {
        toValue: active ? 1 : 0,
        stiffness: 260,
        damping: 28,
        mass: 0.8,
        useNativeDriver: false,
      }),
    ]).start();
  }, [active, width, animWidth, animOpacity]);

  const clampedWidth = animWidth.interpolate({
    inputRange: [0, width],
    outputRange: [0, width],
    extrapolate: "clamp",
  });

  const clampedOpacity = animOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        {
          width: clampedWidth,
          opacity: clampedOpacity,
          height,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        },
        Platform.select({
          web: {
            width: active ? width : 0,
            opacity: active ? 1 : 0,
            transition:
              "width 280ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "width, opacity",
          } as any,
          default: {},
        }),
      ]}
    >
      <Text
        allowFontScaling={false}
        style={[
          styles.punctText,
          {
            color,
            fontSize,
            lineHeight: height,
            fontWeight,
            fontFamily,
          },
        ]}
      >
        {char}
      </Text>
    </Animated.View>
  );
});

export interface RollingNumberProps {
  value: number;
  color: string;
  prefix?: string;
  suffix?: string;
  height?: number;
  fontSize?: number;
  slotWidth?: number;
  fontWeight?: TextStyle["fontWeight"];
  fontFamily?: string;
  stagger?: boolean;
  formatter?: (val: number) => string;
}

export const RollingNumber = memo(function RollingNumber({
  value,
  color,
  prefix = "",
  suffix = "",
  height = 42,
  fontSize = 34,
  slotWidth = 21,
  fontWeight = "700",
  fontFamily,
  stagger = false,
  formatter,
}: RollingNumberProps) {
  const safeVal = Math.max(0, Math.round(Number.isFinite(value) ? value : 0));
  const formattedStr = formatter
    ? formatter(safeVal)
    : formatDonutValue(safeVal);

  const resolvedFontFamily = fontFamily || DEFAULT_MONO_FONT;

  // Parse active digits and punctuation by power-of-10 from the right:
  // e.g. "1,000" -> active digits at powers 3, 2, 1, 0; comma at power 3
  // e.g. "25" -> active digits at powers 1, 0; comma: none
  const { activeDigitsMap, activePunctMap, maxActivePower } = useMemo(() => {
    const rawChars = formattedStr.split("");
    let power = 0;
    const digitsMap = new Map<number, number>();
    const punctMap = new Map<number, string>();

    for (let i = rawChars.length - 1; i >= 0; i--) {
      const char = rawChars[i]!;
      if (/\d/.test(char)) {
        digitsMap.set(power, parseInt(char, 10));
        power++;
      } else {
        punctMap.set(power, char);
      }
    }

    return {
      activeDigitsMap: digitsMap,
      activePunctMap: punctMap,
      maxActivePower: Math.max(0, power - 1),
    };
  }, [formattedStr]);

  // Pre-mount powers up to at least 5 (up to 999,999) so all columns exist from initial mount
  // and smoothly expand / collapse without any layout jumps or mounting flashes
  const minPreMountPower = 5;
  const maxPowerRef = useRef(Math.max(minPreMountPower, maxActivePower));
  maxPowerRef.current = Math.max(maxPowerRef.current, maxActivePower);
  const highestPower = maxPowerRef.current;

  // Build the list of columns to render from highestPower down to 0
  const columns = useMemo(() => {
    const items: Array<
      | { type: "digit"; key: string; power: number; active: boolean; digit: number }
      | { type: "punct"; key: string; power: number; active: boolean; char: string }
    > = [];

    for (let p = highestPower; p >= 0; p--) {
      const hasDigit = activeDigitsMap.has(p);
      items.push({
        type: "digit",
        key: `col-digit-${p}`,
        power: p,
        active: hasDigit,
        digit: hasDigit ? activeDigitsMap.get(p)! : 0,
      });

      // Insert punctuation (comma) between groups of 3 digits (e.g. after thousands place, before hundreds)
      if (p > 0 && p % 3 === 0) {
        const hasPunct = activePunctMap.has(p);
        items.push({
          type: "punct",
          key: `col-punct-${p}`,
          power: p,
          active: hasPunct,
          char: hasPunct ? activePunctMap.get(p)! : ",",
        });
      }
    }

    return items;
  }, [highestPower, activeDigitsMap, activePunctMap]);

  const punctWidth = Math.max(5, Math.round(slotWidth * 0.48));

  return (
    <View style={[styles.numberRow, { height }]}>
      {prefix ? (
        <Text
          allowFontScaling={false}
          style={[
            styles.affixText,
            {
              color,
              fontSize: fontSize * 0.9,
              lineHeight: height,
              fontWeight,
              fontFamily: resolvedFontFamily,
            },
          ]}
        >
          {prefix}
        </Text>
      ) : null}

      {columns.map((col) => {
        if (col.type === "digit") {
          const delay = stagger ? Math.min(160, col.power * 24) : 0;
          return (
            <RollingDigitColumn
              key={col.key}
              power={col.power}
              active={col.active}
              digit={col.digit}
              color={color}
              slotWidth={slotWidth}
              height={height}
              fontSize={fontSize}
              fontWeight={fontWeight}
              fontFamily={resolvedFontFamily}
              delay={delay}
              animateOnMount={true}
            />
          );
        }

        return (
          <RollingPunctColumn
            key={col.key}
            active={col.active}
            char={col.char}
            color={color}
            width={punctWidth}
            height={height}
            fontSize={fontSize}
            fontWeight={fontWeight}
            fontFamily={resolvedFontFamily}
          />
        );
      })}

      {suffix ? (
        <Text
          allowFontScaling={false}
          style={[
            styles.affixText,
            {
              color,
              fontSize: fontSize * 0.82,
              lineHeight: height,
              fontWeight,
              fontFamily: resolvedFontFamily,
              marginLeft: 2,
            },
          ]}
        >
          {suffix}
        </Text>
      ) : null}
    </View>
  );
});

export interface RollingPercentProps {
  pct: number;
  color: string;
  height?: number;
  fontSize?: number;
  slotWidth?: number;
  fontWeight?: TextStyle["fontWeight"];
  fontFamily?: string;
  decimals?: number;
}

export const RollingPercent = memo(function RollingPercent({
  pct,
  color,
  height = 16,
  fontSize = 12,
  slotWidth = 7.8,
  fontWeight = "700",
  fontFamily,
  decimals,
}: RollingPercentProps) {
  const safePct = Math.max(0, Math.min(100, Number.isFinite(pct) ? pct : 0));
  const hasDecimals =
    decimals !== undefined ? decimals > 0 : safePct % 1 !== 0;
  const numDecimals = decimals !== undefined ? decimals : hasDecimals ? 1 : 0;
  const formatted = safePct.toFixed(numDecimals);
  const [intPart = "0", decPart = ""] = formatted.split(".");

  const resolvedFontFamily = fontFamily || DEFAULT_MONO_FONT;

  // Integer digits from right
  const intDigits = intPart.split("");
  const maxIntPower = Math.max(0, intDigits.length - 1);
  const maxIntPowerRef = useRef(Math.max(2, maxIntPower));
  maxIntPowerRef.current = Math.max(maxIntPowerRef.current, maxIntPower);
  const highestPower = maxIntPowerRef.current;

  const intMap = new Map<number, number>();
  for (let i = intDigits.length - 1, p = 0; i >= 0; i--, p++) {
    intMap.set(p, parseInt(intDigits[i]!, 10));
  }

  const columns: Array<{ power: number; active: boolean; digit: number }> = [];
  for (let p = highestPower; p >= 0; p--) {
    const hasD = intMap.has(p);
    columns.push({
      power: p,
      active: hasD,
      digit: hasD ? intMap.get(p)! : 0,
    });
  }

  const punctWidth = Math.max(3, Math.round(slotWidth * 0.45));

  return (
    <View style={[styles.percentRow, { height }]}>
      {columns.map((col) => (
        <RollingDigitColumn
          key={`pct-col-${col.power}`}
          power={col.power}
          active={col.active}
          digit={col.digit}
          color={color}
          slotWidth={slotWidth}
          height={height}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={resolvedFontFamily}
          delay={Math.min(80, col.power * 20)}
          animateOnMount={true}
        />
      ))}
      <RollingPunctColumn
        active={hasDecimals}
        char="."
        color={color}
        width={punctWidth}
        height={height}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={resolvedFontFamily}
      />
      {hasDecimals || decPart ? (
        <RollingDigitColumn
          power={-1}
          active={hasDecimals}
          digit={parseInt(decPart || "0", 10)}
          color={color}
          slotWidth={slotWidth}
          height={height}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={resolvedFontFamily}
          delay={0}
          animateOnMount={true}
        />
      ) : null}
      <Text
        allowFontScaling={false}
        style={[
          styles.affixText,
          {
            color,
            fontSize: fontSize * 0.9,
            lineHeight: height,
            fontWeight,
            fontFamily: resolvedFontFamily,
            marginLeft: 1,
          },
        ]}
      >
        %
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  numberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  percentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  digitSlot: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  digitCell: {
    alignItems: "center",
    justifyContent: "center",
  },
  digitText: {
    fontVariant: ["tabular-nums"],
    textAlign: "center",
    includeFontPadding: false,
    fontFamily: DEFAULT_MONO_FONT,
    letterSpacing: -0.5,
  },
  affixText: {
    textAlign: "center",
    includeFontPadding: false,
    fontFamily: DEFAULT_MONO_FONT,
  },
  punctSlot: {
    alignItems: "center",
    justifyContent: "center",
  },
  punctText: {
    textAlign: "center",
    includeFontPadding: false,
    fontFamily: DEFAULT_MONO_FONT,
  },
});
