"use client";

import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

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
}

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
  primaryColor = "#10B981",
  strokeWidth = 2.5,
  height = 140,
}: TrendChartProps) {
  const points = useMemo(() => data.map((d) => Math.max(d.value, 0)), [data]);
  const maxVal = useMemo(() => Math.max(...points, 1), [points]);
  const midVal = useMemo(() => Math.round(maxVal / 2), [maxVal]);

  const formatLabel = (val: number) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
    if (val >= 1000) return (val / 1000).toFixed(1) + "K";
    return val.toString();
  };

  const chartWidth = 400;
  const chartHeight = 120;
  const stepX = chartWidth / Math.max(data.length - 1, 1);

  // Generate SVG path for line and area fill
  const { linePath, fillPath } = useMemo(() => {
    if (!points.length) {
      return { linePath: "M0 120 L 400 120", fillPath: "M0 120 L 400 120 Z" };
    }

    let lPath = `M0 ${chartHeight - (points[0] / maxVal) * (chartHeight - 20) - 10}`;
    for (let i = 1; i < points.length; i++) {
      const x = i * stepX;
      const y = chartHeight - (points[i] / maxVal) * (chartHeight - 20) - 10;
      lPath += ` L ${x} ${y}`;
    }

    const fPath = `${lPath} V ${chartHeight} H 0 Z`;
    return { linePath: lPath, fillPath: fPath };
  }, [points, maxVal, stepX, chartHeight]);

  return (
    <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.chartTitle}>{title}</Text>
          <Text style={styles.chartSubtitle}>{subtitle}</Text>
        </View>
        <View style={styles.growthBadge}>
          <Text style={styles.growthBadgeText}>Live</Text>
        </View>
      </View>

      {/* Main Chart Area */}
      <View style={[styles.chartMainArea, { height }]}>
        {/* Y Axis Labels */}
        <View style={styles.yAxisColumn}>
          <Text style={styles.yLabelText}>{formatLabel(maxVal)}</Text>
          <Text style={styles.yLabelText}>{formatLabel(midVal)}</Text>
          <Text style={styles.yLabelText}>0</Text>
        </View>

        {/* Vector SVG Canvas */}
        <View style={styles.svgCanvasWrap}>
          <svg
            width="100%"
            height={height - 20}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={primaryColor} stopOpacity="0.35" />
                <stop offset="100%" stopColor={primaryColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Dotted Reference Gridlines */}
            <path
              d={`M0 10 H${chartWidth}`}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <path
              d={`M0 ${chartHeight / 2} H${chartWidth}`}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <path
              d={`M0 ${chartHeight - 1} H${chartWidth}`}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
            />

            {/* Gradient Area Fill */}
            <path d={fillPath} fill="url(#trendGradient)" />

            {/* Glowing Accent Line */}
            <path
              d={linePath}
              fill="none"
              stroke={primaryColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </View>
      </View>

      {/* X Axis Labels */}
      <View style={styles.xAxisRow}>
        <View style={{ width: 34 }} />
        {data.map((item, idx) => (
          <Text key={idx} style={styles.xLabelText}>
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
    backgroundColor: "#111116",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
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
    color: "#FFFFFF",
    letterSpacing: -0.2,
  },
  chartSubtitle: {
    fontSize: 12,
    color: "#10B981",
    marginTop: 2,
    fontWeight: "500",
  },
  growthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.25)",
  },
  growthBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#10B981",
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
    color: "#71717A",
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
    color: "#A1A1AA",
  },
});

export default TrendChart;
