import React, { memo, useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { formatGrouped } from "./comparison-chart.utils";

const DIGIT_CHARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export interface RollingDigitProps {
  digit: number;
  color: string;
  delay?: number;
  height?: number;
  fontSize?: number;
  slotWidth?: number;
}

export const RollingDigit = memo(function RollingDigit({
  digit,
  color,
  delay = 0,
  height = 18,
  fontSize = 13,
  slotWidth = 8.5,
}: RollingDigitProps) {
  const animY = useRef(new Animated.Value(-digit * height)).current;

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        Animated.spring(animY, {
          toValue: -digit * height,
          useNativeDriver: true,
          stiffness: 260,
          damping: 24,
          mass: 0.65,
        }).start();
      }, delay);
      return () => clearTimeout(timer);
    } else {
      Animated.spring(animY, {
        toValue: -digit * height,
        useNativeDriver: true,
        stiffness: 260,
        damping: 24,
        mass: 0.65,
      }).start();
    }
  }, [digit, delay, height, animY]);

  return (
    <View style={[styles.digitSlot, { width: slotWidth, height }]}>
      <Animated.View style={{ transform: [{ translateY: animY }] }}>
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
            {/* allowFontScaling={false} is strictly retained here to guarantee exact vertical odometer slot clipping alignment across translateY steps */}
            <Text
              allowFontScaling={false}
              style={[
                styles.digitText,
                {
                  fontSize,
                  lineHeight: height,
                  color,
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
  stagger = false,
  formatter,
}: RollingNumberProps) {
  const formatted = formatGrouped(value, formatter);
  const chars = formatted.split("");

  return (
    <View style={styles.rollingNumberContainer}>
      {prefix ? (
        <Text
          style={[
            styles.rollingSymbol,
            {
              color,
              fontSize,
              lineHeight: height,
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
              style={[
                styles.rollingComma,
                {
                  color,
                  fontSize,
                  lineHeight: height,
                },
              ]}
            >
              {char}
            </Text>
          );
        }

        const digit = Number(char);
        if (isNaN(digit) || char.trim() === "") {
          // Render non-numeric characters literally (e.g. abbreviations like "K", "M", or symbols)
          return (
            <Text
              key={`char-${posFromRight}`}
              style={[
                styles.rollingSymbol,
                {
                  color,
                  fontSize,
                  lineHeight: height,
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
            delay={stagger ? i * 15 : 0}
            height={height}
            fontSize={fontSize}
            slotWidth={slotWidth}
          />
        );
      })}

      {suffix ? (
        <Text
          style={[
            styles.rollingSymbol,
            {
              color,
              fontSize,
              lineHeight: height,
            },
          ]}
        >
          {suffix}
        </Text>
      ) : null}
    </View>
  );
});

const monospaceFont = Platform.select({
  ios: "Menlo",
  android: "monospace",
  default: "monospace",
});

const styles = StyleSheet.create({
  digitSlot: {
    overflow: "hidden",
    alignItems: "center",
  },
  digitItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  digitText: {
    fontWeight: "700",
    letterSpacing: -0.3,
    fontFamily: monospaceFont,
  },
  rollingNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rollingSymbol: {
    fontWeight: "700",
    fontFamily: monospaceFont,
  },
  rollingComma: {
    fontWeight: "700",
    paddingHorizontal: 0.5,
    fontFamily: monospaceFont,
  },
});
