"use client";

import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

export type Theme = "dark" | "light";

export interface DataPoint {
  label: string;
  value: number;
}

export interface TrendChartProps {
  data?: DataPoint[];
  title?: string;
  subtitle?: string;
  primaryColor?: string;
  strokeWidth?: number;
  height?: number;
  theme?: Theme;
}

// SVG viewBox coordinate space (not fixed pixel layout -- the SVG scales
// responsively to fill its container via width="100%" and preserveAspectRatio="none").
const SVG_VIEWBOX_WIDTH = 400;
const SVG_VIEWBOX_HEIGHT = 120;

const COLORS_DARK = {
  background: "#111116",
  border: "rgba(255, 255, 255, 0.1)",
  title: "#FFFFFF",
  gridline: "rgba(255, 255, 255, 0.08)",
  gridlineBase: "rgba(255, 255, 255, 0.12)",
  axisText: "#71717A",
  xLabelText: "#A1A1AA",
  defaultPrimary: "#10B981",
  badgeBg: "rgba(16, 185, 129, 0.12)",
  badgeBorder: "rgba(16, 185, 129, 0.25)",
};

const COLORS_LIGHT = {
  background: "#FFFFFF",
  border: "rgba(0, 0, 0, 0.08)",
  title: "#0F172A",
  gridline: "rgba(0, 0, 0, 0.06)",
  gridlineBase: "rgba(0, 0, 0, 0.12)",
  axisText: "#64748B",
  xLabelText: "#475569",
  defaultPrimary: "#059669",
  badgeBg: "rgba(5, 150, 105, 0.10)",
  badgeBorder: "rgba(5, 150, 105, 0.22)",
};

const DEFAULT_DATA: DataPoint[] = [
  { label: "Mon", value: 1200 },
  { label: "Tue", value: 2400 },
  { label: "Wed", value: 1800 },
  { label: "Thu", value: 3600 },
  { label: "Fri", value: 2900 },
  { label: "Sat", value: 4800 },
  { label: "Sun", value: 4100 },
];

export function TrendChart({
  data = DEFAULT_DATA,
  title = "7-Day Activity Trend",
  subtitle = "+18.4% growth vs last week",
  primaryColor,
  strokeWidth = 2.5,
  height = 140,
  theme = "dark",
}: TrendChartProps) {
  const colors = theme === "dark" ? COLORS_DARK : COLORS_LIGHT;
  const accentColor = primaryColor || colors.defaultPrimary;

  const points = useMemo(() => data.map((d) => Math.max(d.value, 0)), [data]);
  const maxVal = useMemo(() => Math.max(...points, 1), [points]);
  const midVal = useMemo(() => Math.round(maxVal / 2), [maxVal]);

  const formatLabel = (val: number) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
    if (val >= 1000) return (val / 1000).toFixed(1) + "K";
    return val.toString();
  };

  const stepX = SVG_VIEWBOX_WIDTH / Math.max(data.length - 1, 1);

  // Generate SVG path for line and area fill
  const { linePath, fillPath } = useMemo(() => {
    if (!points.length) {
      return {
        linePath: `M0 ${SVG_VIEWBOX_HEIGHT} L ${SVG_VIEWBOX_WIDTH} ${SVG_VIEWBOX_HEIGHT}`,
        fillPath: `M0 ${SVG_VIEWBOX_HEIGHT} L ${SVG_VIEWBOX_WIDTH} ${SVG_VIEWBOX_HEIGHT} Z`,
      };
    }

    let lPath = `M0 ${SVG_VIEWBOX_HEIGHT - (points[0] / maxVal) * (SVG_VIEWBOX_HEIGHT - 20) - 10}`;
    for (let i = 1; i < points.length; i++) {
      const x = i * stepX;
      const y = SVG_VIEWBOX_HEIGHT - (points[i] / maxVal) * (SVG_VIEWBOX_HEIGHT - 20) - 10;
      lPath += ` L ${x} ${y}`;
    }

    const fPath = `${lPath} V ${SVG_VIEWBOX_HEIGHT} H 0 Z`;
    return { linePath: lPath, fillPath: fPath };
  }, [points, maxVal, stepX]);

  const summaryLabel = `${title}: ${subtitle}. Current: ${data[data.length - 1]?.value ?? 0}`;

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
      ]}
      accessibilityRole="summary"
      accessibilityLabel={summaryLabel}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.chartTitle, { color: colors.title }]}>{title}</Text>
          <Text style={[styles.chartSubtitle, { color: accentColor }]}>{subtitle}</Text>
        </View>
        <View
          style={[
            styles.growthBadge,
            {
              backgroundColor: colors.badgeBg,
              borderColor: colors.badgeBorder,
            },
          ]}
        >
          <Text style={[styles.growthBadgeText, { color: accentColor }]}>Live</Text>
        </View>
      </View>

      {/* Main Chart Area */}
      <View style={[styles.chartMainArea, { height }]}>
        {/* Y Axis Labels */}
        <View style={styles.yAxisColumn} aria-hidden={true}>
          <Text style={[styles.yLabelText, { color: colors.axisText }]}>{formatLabel(maxVal)}</Text>
          <Text style={[styles.yLabelText, { color: colors.axisText }]}>{formatLabel(midVal)}</Text>
          <Text style={[styles.yLabelText, { color: colors.axisText }]}>0</Text>
        </View>

        {/* Vector SVG Canvas */}
        <View style={styles.svgCanvasWrap}>
          <svg
            width="100%"
            height={height - 20}
            viewBox={`0 0 ${SVG_VIEWBOX_WIDTH} ${SVG_VIEWBOX_HEIGHT}`}
            preserveAspectRatio="none"
            style={{ overflow: "visible" }}
            aria-hidden={true}
          >
            <defs>
              <linearGradient id={`trendGradient-${theme}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accentColor} stopOpacity={0.35} />
                <stop offset="100%" stopColor={accentColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            {/* Dotted Reference Gridlines */}
            <path
              d={`M0 10 H${SVG_VIEWBOX_WIDTH}`}
              stroke={colors.gridline}
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <path
              d={`M0 ${SVG_VIEWBOX_HEIGHT / 2} H${SVG_VIEWBOX_WIDTH}`}
              stroke={colors.gridline}
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <path
              d={`M0 ${SVG_VIEWBOX_HEIGHT - 1} H${SVG_VIEWBOX_WIDTH}`}
              stroke={colors.gridlineBase}
              strokeWidth="1"
            />

            {/* Gradient Area Fill */}
            <path d={fillPath} fill={`url(#trendGradient-${theme})`} />

            {/* Accent Line */}
            <path
              d={linePath}
              fill="none"
              stroke={accentColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </View>
      </View>

      {/* X Axis Labels */}
      <View style={styles.xAxisRow} aria-hidden={true}>
        <View style={{ width: 34 }} />
        {data.map((item, idx) => (
          <Text key={idx} style={[styles.xLabelText, { color: colors.xLabelText }]}>
            {item.label.charAt(0)}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  chartSubtitle: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  growthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
  },
  growthBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  chartMainArea: {
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
  },
  yAxisColumn: {
    width: 34,
    justifyContent: "space-between",
    paddingBottom: 6,
  },
  yLabelText: {
    fontSize: 10.5,
    fontFamily: "monospace",
  },
  svgCanvasWrap: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  xAxisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    paddingRight: 6,
  },
  xLabelText: {
    flex: 1,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
  },
});

export default TrendChart;
