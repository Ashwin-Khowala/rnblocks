import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  View,
  type TextStyle,
} from "react-native";
import { formatPieValue } from "./pie-chart.utils";

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

  const animY = useRef(
    new Animated.Value(
      active && animateOnMount ? 0 : -targetDigit * height
    )
  ).current;

  useEffect(() => {
    if (!active) {
      wasActiveRef.current = false;
      return;
    }

    const wasActive = wasActiveRef.current;
    wasActiveRef.current = true;

    if (!wasActive) {
      animY.setValue(0);
    }

    if (delay <= 0) {
      Animated.spring(animY, {
        toValue: -targetDigit * height,
        stiffness: 300,
        damping: 26,
        mass: 0.6,
        useNativeDriver: true,
      }).start();
      return;
    }

    const timer = setTimeout(() => {
      Animated.spring(animY, {
        toValue: -targetDigit * height,
        stiffness: 300,
        damping: 26,
        mass: 0.6,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [targetDigit, active, delay, height, animY]);

  const resolvedFontFamily = fontFamily || DEFAULT_MONO_FONT;

  return (
    <View style={[styles.digitSlot, { width: slotWidth, height }]}>
      <Animated.View
        style={{
          transform: [{ translateY: animY }],
        }}
      >
        {DIGIT_CHARS.map((char) => (
          <View key={char} style={[styles.digitCell, { width: slotWidth, height }]}>
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
              {char}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
});

export interface RollingDigitColumnProps {
  power: number;
  active: boolean;
  digit: number;
  color: string;
  slotWidth: number;
  height: number;
  fontSize: number;
  fontWeight: TextStyle["fontWeight"];
  fontFamily: string;
  delay: number;
  animateOnMount: boolean;
}

export const RollingDigitColumn = memo(function RollingDigitColumn({
  active,
  digit,
  color,
  slotWidth,
  height,
  fontSize,
  fontWeight,
  fontFamily,
  delay,
  animateOnMount,
}: RollingDigitColumnProps) {
  const animWidth = useRef(new Animated.Value(active ? slotWidth : 0)).current;
  const animOpacity = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(animWidth, {
        toValue: active ? slotWidth : 0,
        stiffness: 280,
        damping: 26,
        mass: 0.7,
        useNativeDriver: false,
      }),
      Animated.timing(animOpacity, {
        toValue: active ? 1 : 0,
        duration: active ? 180 : 120,
        useNativeDriver: false,
      }),
    ]).start();
  }, [active, slotWidth, animWidth, animOpacity]);

  return (
    <Animated.View
      style={{
        width: animWidth,
        height,
        opacity: animOpacity,
        overflow: "hidden",
      }}
    >
      <RollingDigit
        digit={digit}
        color={color}
        active={active}
        delay={delay}
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

export interface RollingPunctColumnProps {
  active: boolean;
  char: string;
  color: string;
  width: number;
  height: number;
  fontSize: number;
  fontWeight: TextStyle["fontWeight"];
  fontFamily: string;
}

export const RollingPunctColumn = memo(function RollingPunctColumn({
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
        stiffness: 280,
        damping: 26,
        mass: 0.7,
        useNativeDriver: false,
      }),
      Animated.timing(animOpacity, {
        toValue: active ? 1 : 0,
        duration: active ? 180 : 120,
        useNativeDriver: false,
      }),
    ]).start();
  }, [active, width, animWidth, animOpacity]);

  return (
    <Animated.View
      style={{
        width: animWidth,
        height,
        opacity: animOpacity,
        overflow: "hidden",
      }}
    >
      <View style={[styles.punctSlot, { width, height }]}>
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
      </View>
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
  formatter?: (val: number) => string;
  stagger?: boolean;
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
  formatter,
  stagger = true,
}: RollingNumberProps) {
  const safeValue = Math.max(0, Math.round(Number.isFinite(value) ? value : 0));
  const isCustomFormatted = typeof formatter === "function";

  const resolvedFontFamily = fontFamily || DEFAULT_MONO_FONT;

  const valueStr = useMemo(() => {
    if (isCustomFormatted) {
      return formatter!(safeValue);
    }
    return formatPieValue(safeValue);
  }, [isCustomFormatted, formatter, safeValue]);

  const maxPowerRef = useRef(Math.max(2, String(safeValue).length - 1));
  maxPowerRef.current = Math.max(
    maxPowerRef.current,
    String(safeValue).length - 1
  );

  const highestPower = maxPowerRef.current;

  const activeDigitsMap = useMemo(() => {
    const s = String(safeValue);
    const map = new Map<number, number>();
    for (let i = s.length - 1, p = 0; i >= 0; i--, p++) {
      map.set(p, parseInt(s[i]!, 10));
    }
    return map;
  }, [safeValue]);

  const columns = useMemo(() => {
    const cols: Array<
      | { type: "digit"; power: number; active: boolean; digit: number; key: string }
      | { type: "punct"; char: string; active: boolean; key: string }
    > = [];

    const numDigits = String(safeValue).length;

    for (let p = highestPower; p >= 0; p--) {
      const hasDigit = activeDigitsMap.has(p);
      const digitVal = hasDigit ? activeDigitsMap.get(p)! : 0;

      cols.push({
        type: "digit",
        power: p,
        active: hasDigit,
        digit: digitVal,
        key: `power-${p}`,
      });

      if (p > 0 && p % 3 === 0) {
        const commaActive = hasDigit && p < numDigits;
        cols.push({
          type: "punct",
          char: ",",
          active: commaActive,
          key: `comma-${p}`,
        });
      }
    }

    return cols;
  }, [highestPower, activeDigitsMap, safeValue]);

  const punctWidth = Math.max(4, Math.round(slotWidth * 0.45));

  if (isCustomFormatted) {
    return (
      <View style={[styles.numberRow, { height }]}>
        {prefix ? (
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
                marginRight: 2,
              },
            ]}
          >
            {prefix}
          </Text>
        ) : null}
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
          {valueStr}
        </Text>
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
  }

  return (
    <View style={[styles.numberRow, { height }]}>
      {prefix ? (
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
              marginRight: 2,
            },
          ]}
        >
          {prefix}
        </Text>
      ) : null}

      {columns.map((col) => {
        if (col.type === "digit") {
          const delay = stagger ? Math.min(100, col.power * 25) : 0;
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
  prefix?: string;
  suffix?: string;
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
  prefix,
  suffix = "%",
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
              marginRight: 1,
            },
          ]}
        >
          {prefix}
        </Text>
      ) : null}
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
          delay={0}
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
      {suffix ? (
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
          {suffix}
        </Text>
      ) : null}
    </View>
  );
});

export interface SmoothLabelProps {
  label: string;
  color: string;
  style?: TextStyle | TextStyle[];
  duration?: number;
}

export const SmoothLabel = memo(function SmoothLabel({
  label,
  color,
  style,
  duration = 140,
}: SmoothLabelProps) {
  const [currentLabel, setCurrentLabel] = useState(label);
  const [prevLabel, setPrevLabel] = useState<string | null>(null);

  const anim = useRef(new Animated.Value(1)).current;

  // Track label updates during render so React synchronously updates state before paint
  if (label !== currentLabel) {
    setPrevLabel(currentLabel);
    setCurrentLabel(label);
    anim.setValue(0);
  }

  useEffect(() => {
    if (prevLabel !== null) {
      anim.setValue(0);
      const animation = Animated.timing(anim, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      });

      animation.start(({ finished }) => {
        if (finished) {
          setPrevLabel(null);
        }
      });

      return () => {
        animation.stop();
      };
    }
  }, [currentLabel, prevLabel, anim, duration]);

  const outgoingOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const outgoingTranslateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -3],
  });

  const incomingOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [prevLabel !== null ? 0 : 1, 1],
  });

  const incomingTranslateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [prevLabel !== null ? 3 : 0, 0],
  });

  return (
    <View style={styles.smoothLabelContainer}>
      {prevLabel !== null && (
        <Animated.View
          pointerEvents="none"
          accessibilityElementsHidden={true}
          importantForAccessibility="no-hide-descendants"
          style={[
            styles.smoothLabelAbsolute,
            {
              opacity: outgoingOpacity,
              transform: [{ translateY: outgoingTranslateY }],
            },
          ]}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            allowFontScaling={false}
            style={[style, { color }]}
          >
            {prevLabel}
          </Text>
        </Animated.View>
      )}

      <Animated.View
        style={{
          opacity: incomingOpacity,
          transform: [{ translateY: incomingTranslateY }],
        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          allowFontScaling={false}
          style={[style, { color }]}
        >
          {currentLabel}
        </Text>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  smoothLabelContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  smoothLabelAbsolute: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  numberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  percentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
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
