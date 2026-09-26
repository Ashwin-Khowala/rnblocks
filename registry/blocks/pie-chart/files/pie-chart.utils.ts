import type {
  ComputedPieSlice,
  PieChartThemeTokens,
  PieDataPoint,
  PiePattern,
  PieTheme,
  PieVariant,
} from "./pie-chart.types";

export const DEFAULT_PIE_DATA: PieDataPoint[] = [
  { label: "Category A", value: 40, pattern: "solid" },
  { label: "Category B", value: 25, pattern: "solid" },
  { label: "Category C", value: 20, pattern: "solid" },
  { label: "Category D", value: 15, pattern: "solid" },
];

export const PIE_CHART_THEME_TOKENS: Record<PieTheme, PieChartThemeTokens> = {
  dark: {
    bg: "#0d0f14",
    cardBg: "#12151c",
    border: "#1e2330",
    textPrimary: "#f1f3f9",
    textSecondary: "#8b8d98",
    trackBg: "rgba(255, 255, 255, 0.04)",
    patternLine: "rgba(255, 255, 255, 0.45)",
    activeShadow: "rgba(0, 0, 0, 0.6)",
    palette: [
      "#32C798", // Emerald
      "#818CF8", // Indigo
      "#FBBF24", // Amber
      "#38BDF8", // Sky
      "#FB7185", // Rose
      "#A78BFA", // Purple
      "#34D399", // Mint
      "#F472B6", // Pink
    ],
    activePalette: [
      "#4EEDB8",
      "#A5B4FC",
      "#FCD34D",
      "#7DD3FC",
      "#FDA4AF",
      "#C4B5FD",
      "#6EE7B7",
      "#F9A8D4",
    ],
  },
  light: {
    bg: "#ffffff",
    cardBg: "#f8f9fa",
    border: "#e5e7eb",
    textPrimary: "#111827",
    textSecondary: "#6b7280",
    trackBg: "rgba(0, 0, 0, 0.04)",
    patternLine: "rgba(0, 0, 0, 0.35)",
    activeShadow: "rgba(0, 0, 0, 0.12)",
    palette: [
      "#059669", // Emerald
      "#4F46E5", // Indigo
      "#D97706", // Amber
      "#0284C7", // Sky
      "#E11D48", // Rose
      "#7C3AED", // Purple
      "#0D9488", // Teal
      "#DB2777", // Pink
    ],
    activePalette: [
      "#10B981",
      "#6366F1",
      "#F59E0B",
      "#0EA5E9",
      "#F43F5E",
      "#8B5CF6",
      "#14B8A6",
      "#EC4899",
    ],
  },
};

const MONOCHROME_DARK_PALETTE = [
  "#2a303c",
  "#3a4252",
  "#4b5568",
  "#5d697f",
  "#718096",
];

const MONOCHROME_LIGHT_PALETTE = [
  "#e2e8f0",
  "#cbd5e1",
  "#94a3b8",
  "#64748b",
  "#475569",
];

export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

/**
 * Generates an SVG path string for a single pie slice wedge meeting at the center (cx, cy).
 */
export function describePieSlice(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const sweep = endAngle - startAngle;

  // Full circle fallback (sweep >= 360)
  if (sweep >= 359.999) {
    const top = polarToCartesian(centerX, centerY, radius, 0);
    const bottom = polarToCartesian(centerX, centerY, radius, 180);
    return [
      `M ${centerX} ${centerY}`,
      `L ${top.x.toFixed(3)} ${top.y.toFixed(3)}`,
      `A ${radius} ${radius} 0 0 1 ${bottom.x.toFixed(3)} ${bottom.y.toFixed(3)}`,
      `A ${radius} ${radius} 0 0 1 ${top.x.toFixed(3)} ${top.y.toFixed(3)}`,
      "Z",
    ].join(" ");
  }

  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const largeArcFlag = sweep <= 180 ? 0 : 1;

  return [
    `M ${centerX.toFixed(3)} ${centerY.toFixed(3)}`,
    `L ${end.x.toFixed(3)} ${end.y.toFixed(3)}`,
    `A ${radius.toFixed(3)} ${radius.toFixed(3)} 0 ${largeArcFlag} 1 ${start.x.toFixed(3)} ${start.y.toFixed(3)}`,
    "Z",
  ].join(" ");
}

/**
 * Precomputes all geometry, percentages, explosion vectors, and pattern styling for pie slices.
 */
export function computePieSlices(
  data: PieDataPoint[],
  size: number,
  padAngle = 0,
  explosionDistance = 10,
  theme: PieTheme = "dark",
  variant: PieVariant = "brand",
  startAngleOffset = 270
): {
  slices: ComputedPieSlice[];
  total: number;
  centerX: number;
  centerY: number;
  radius: number;
} {
  const total = data.reduce((sum, item) => sum + Math.max(0, item.value || 0), 0);
  const centerX = size / 2;
  const centerY = size / 2;
  // Radius accounts for explosion margin
  const radius = Math.max(10, size / 2 - explosionDistance - 6);

  const themeTokens = PIE_CHART_THEME_TOKENS[theme] || PIE_CHART_THEME_TOKENS.dark;
  const isMono = variant === "monochrome";
  const palette = isMono
    ? theme === "dark"
      ? MONOCHROME_DARK_PALETTE
      : MONOCHROME_LIGHT_PALETTE
    : themeTokens.palette;
  const activePalette = isMono ? palette : themeTokens.activePalette;

  let currentAngle = startAngleOffset;
  const n = data.length;

  const slices: ComputedPieSlice[] = data.map((item, index) => {
    const rawVal = Math.max(0, item.value || 0);
    const fraction = total > 0 ? rawVal / total : 1 / n;
    const sweepAngle = Math.max(0, fraction * 360);

    const startAngle = currentAngle + padAngle / 2;
    const endAngle = currentAngle + sweepAngle - padAngle / 2;
    currentAngle += sweepAngle;

    const midAngleDeg = (startAngle + endAngle) / 2;
    const midAngleRad = ((midAngleDeg - 90) * Math.PI) / 180;

    // Outward explosion offset along radial bisector
    const dx = Number((Math.cos(midAngleRad) * explosionDistance).toFixed(2));
    const dy = Number((Math.sin(midAngleRad) * explosionDistance).toFixed(2));

    // Centroid of the circular wedge (located at ~2/3 radius along midpoint)
    const centroidDistance = radius * 0.62;
    const centroidX = Number((centerX + Math.cos(midAngleRad) * centroidDistance).toFixed(2));
    const centroidY = Number((centerY + Math.sin(midAngleRad) * centroidDistance).toFixed(2));

    const path = describePieSlice(centerX, centerY, radius, startAngle, endAngle);

    const baseColor =
      item.color || palette[index % palette.length];
    const activeColor =
      isMono
        ? theme === "dark"
          ? "#ffffff"
          : "#000000"
        : activePalette[index % activePalette.length];

    const pattern: PiePattern = item.pattern || "solid";
    const patternColor = themeTokens.patternLine;
    const accentColor = item.accentColor || baseColor;

    return {
      index,
      item,
      value: rawVal,
      percentage: total > 0 ? Math.round((rawVal / total) * 100) : 0,
      startAngle,
      endAngle,
      midAngle: midAngleRad,
      midAngleDeg,
      dx,
      dy,
      centroidX,
      centroidY,
      path,
      color: baseColor,
      activeColor,
      pattern,
      patternColor,
      accentColor,
    };
  });

  return {
    slices,
    total,
    centerX,
    centerY,
    radius,
  };
}

export function formatPieValue(val: number): string {
  if (!Number.isFinite(val)) return "0";
  if (val >= 1_000_000) {
    return `${(val / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (val >= 1_000) {
    return `${(val / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(Math.round(val));
}
