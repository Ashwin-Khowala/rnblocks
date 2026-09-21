import React, { memo, useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  type TextStyle,
} from "react-native";
import { formatGrouped } from "./grouped-bar-chart.utils";

const DIGIT_CHARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export interface RollingDigitProps {
  digit: number;
  color: string;
  delay?: number;
  height?: number;
  fontSize?: number;
  slotWidth?: number;
  fontWeight?: TextStyle["fontWeight"];
}

export const RollingDigit = memo(function RollingDigit({
  digit,
  color,
  delay = 0,
  height = 18,
  fontSize = 13,
  slotWidth = 8.5,
  fontWeight = "700",
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
  }, [digit, height, delay, animY]);

  return (
    <View
      style={[
        styles.digitSlot,
        {
          width: slotWidth,
          height,
        },
      ]}
    >
      <Animated.View
        style={{
          transform: [{ translateY: animY }],
        }}
      >
        {DIGIT_CHARS.map((d) => (
          <View
            key={d}
            style={[
              styles.digitItem,
              {
                height,
              },
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                styles.digitText,
                {
                  fontSize,
                  lineHeight: height,
                  letterSpacing: -0.4,
                  color,
                  ...(fontWeight ? { fontWeight } : {}),
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

export interface RollingNumberProps {
  value: number;
  color: string;
  prefix?: string;
  suffix?: string;
  height?: number;
  fontSize?: number;
  slotWidth?: number;
  fontWeight?: TextStyle["fontWeight"];
  stagger?: boolean;
  formatter?: (val: number) => string;
}

export const RollingNumber = memo(function RollingNumber({
  value,
  color,
  prefix = "",
  suffix = "",
  height = 18,
  fontSize = 13,
  slotWidth = 8.5,
  fontWeight = "700",
  stagger = false,
  formatter,
}: RollingNumberProps) {
  const formatted = formatGrouped(value, formatter);
  const chars = formatted.split("");
  const totalLength = chars.length + (prefix ? prefix.length : 0) + (suffix ? suffix.length : 0);

  // Responsive font scaling for large numbers so they never overflow on narrow screens
  const scale = totalLength > 12 ? 0.72 : totalLength > 9 ? 0.85 : 1;
  const effectiveFontSize = Math.round(fontSize * scale);
  const effectiveHeight = Math.round(height * scale);
  const effectiveSlotWidth = Math.round(slotWidth * scale * 10) / 10;

  return (
    <View style={[styles.rollingNumberContainer, { height: effectiveHeight }]}>
      {prefix ? (
        <Text
          allowFontScaling={false}
          style={[
            styles.prefixText,
            {
              color,
              fontSize: effectiveFontSize * 0.88,
              lineHeight: effectiveHeight,
              ...(fontWeight ? { fontWeight } : {}),
            },
          ]}
        >
          {prefix}
        </Text>
      ) : null}

      {chars.map((char, i) => {
        const posFromRight = chars.length - 1 - i;
        if (char === "," || char === "." || char === " " || char === "'") {
          return (
            <Text
              key={`sep-${posFromRight}`}
              allowFontScaling={false}
              style={[
                styles.commaChar,
                {
                  color,
                  fontSize: effectiveFontSize * 0.85,
                  lineHeight: effectiveHeight,
                  ...(fontWeight ? { fontWeight } : {}),
                },
              ]}
            >
              {char}
            </Text>
          );
        }

        const digit = Number(char);
        if (isNaN(digit) || char.trim() === "") {
          return (
            <Text
              key={`char-${posFromRight}`}
              allowFontScaling={false}
              style={[
                styles.charSymbol,
                {
                  color,
                  fontSize: effectiveFontSize,
                  lineHeight: effectiveHeight,
                  ...(fontWeight ? { fontWeight } : {}),
                },
              ]}
            >
              {char}
            </Text>
          );
        }

        return (
          <RollingDigit
            key={`d-${posFromRight}`}
            digit={digit}
            color={color}
            delay={stagger ? (chars.length - 1 - i) * 12 : 0}
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
              ...(fontWeight ? { fontWeight } : {}),
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

export interface RollingPercentProps {
  pct: number;
  isPositive: boolean;
  positiveColor: string;
  negativeColor: string;
}

export const RollingPercent = memo(function RollingPercent({
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
        {isPositive ? "+" : "-"}
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

const styles = StyleSheet.create({
  rollingNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    maxWidth: "100%",
    flexShrink: 1,
  },
  digitSlot: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  digitItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  digitText: {
    textAlign: "center",
  },
  prefixText: {
    marginRight: 1.5,
    letterSpacing: -0.4,
  },
  suffixText: {
    marginLeft: 3,
    letterSpacing: -0.2,
  },
  commaChar: {
    marginHorizontal: 1,
    letterSpacing: -0.4,
    textAlign: "center",
  },
  charSymbol: {
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
});
