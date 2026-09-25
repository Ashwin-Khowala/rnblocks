import type {
  DonutDataPoint,
  DonutPattern,
  DonutSliceGeometry,
  DonutThemeTokens,
  Theme,
} from "./donut-chart.types";

export const DEFAULT_DONUT_DATA: DonutDataPoint[] = [
  {
    label: "Category A",
    value: 40,
    pattern: "solid",
    description: "Emerald primary segment",
  },
  {
    label: "Category B",
    value: 25,
    pattern: "solid",
    description: "Indigo secondary segment",
  },
  {
    label: "Category C",
    value: 20,
    pattern: "vertical-stripes",
    description: "Amber vertical hatched segment",
  },
  {
    label: "Category D",
    value: 15,
    pattern: "diagonal-stripes",
    description: "Sky diagonal hatched segment",
  },
];

export const MONOCHROME_PALETTE: Record<
  Theme,
  Array<{ color: string; activeColor: string; pattern: DonutPattern; patternColor?: string }>
> = {
  dark: [
    { color: "#18181c", activeColor: "#272730", pattern: "solid" }, // Dark charcoal
    { color: "#4b4f5c", activeColor: "#646979", pattern: "solid" }, // Mid slate
    { color: "#141418", activeColor: "#202026", pattern: "vertical-stripes", patternColor: "rgba(255, 255, 255, 0.45)" },
    { color: "#141418", activeColor: "#202026", pattern: "diagonal-stripes", patternColor: "rgba(255, 255, 255, 0.45)" },
    { color: "#2f323c", activeColor: "#424652", pattern: "solid" },
    { color: "#141418", activeColor: "#202026", pattern: "horizontal-stripes", patternColor: "rgba(255, 255, 255, 0.45)" },
  ],
  light: [
    { color: "#d4d4d8", activeColor: "#a1a1aa", pattern: "solid" },
    { color: "#52525b", activeColor: "#3f3f46", pattern: "solid" },
    { color: "#f4f4f5", activeColor: "#e4e4e7", pattern: "vertical-stripes", patternColor: "rgba(0, 0, 0, 0.45)" },
    { color: "#f4f4f5", activeColor: "#e4e4e7", pattern: "diagonal-stripes", patternColor: "rgba(0, 0, 0, 0.45)" },
    { color: "#71717a", activeColor: "#52525b", pattern: "solid" },
    { color: "#f4f4f5", activeColor: "#e4e4e7", pattern: "horizontal-stripes", patternColor: "rgba(0, 0, 0, 0.45)" },
  ],
};

export const BRAND_PALETTE: Record<
  Theme,
  Array<{ color: string; activeColor: string; pattern: DonutPattern; patternColor?: string }>
> = {
  dark: [
    { color: "#32C798", activeColor: "#10B981", pattern: "solid" }, // Emerald
    { color: "#818CF8", activeColor: "#6366F1", pattern: "solid" }, // Indigo
    { color: "#181614", activeColor: "#24201a", pattern: "vertical-stripes", patternColor: "#FBBF24" }, // Amber
    { color: "#12161f", activeColor: "#18202d", pattern: "diagonal-stripes", patternColor: "#38BDF8" }, // Sky
    { color: "#FB7185", activeColor: "#F43F5E", pattern: "solid" }, // Rose
    { color: "#A78BFA", activeColor: "#8B5CF6", pattern: "solid" }, // Purple
  ],
  light: [
    { color: "#10B981", activeColor: "#059669", pattern: "solid" }, // Emerald
    { color: "#6366F1", activeColor: "#4F46E5", pattern: "solid" }, // Indigo
    { color: "#fef3c7", activeColor: "#fde68a", pattern: "vertical-stripes", patternColor: "#D97706" }, // Amber
    { color: "#e0f2fe", activeColor: "#bae6fd", pattern: "diagonal-stripes", patternColor: "#0284C7" }, // Sky
    { color: "#F43F5E", activeColor: "#E11D48", pattern: "solid" }, // Rose
    { color: "#8B5CF6", activeColor: "#7C3AED", pattern: "solid" }, // Purple
  ],
};

export const DEFAULT_DONUT_PALETTE = BRAND_PALETTE;


export const DONUT_CHART_THEME_TOKENS: Record<Theme, DonutThemeTokens> = {
  dark: {
    bg: "#0c0c10",
    surface: "#14141b",
    border: "rgba(255, 255, 255, 0.08)",
    trackBg: "rgba(255, 255, 255, 0.035)",
    centerHoleBg: "#0c0c10",
    textPrimary: "#ffffff",
    textSecondary: "#8b8d98",
    textMuted: "#52525b",
    patternLine: "rgba(255, 255, 255, 0.42)",
    badgeBg: "rgba(255, 255, 255, 0.07)",
    badgeText: "#ffffff",
    legendBorder: "rgba(255, 255, 255, 0.06)",
    activeLegendBg: "rgba(255, 255, 255, 0.08)",
    activeLegendBorder: "rgba(255, 255, 255, 0.22)",
  },
  light: {
    bg: "#ffffff",
    surface: "#f8fafc",
    border: "rgba(0, 0, 0, 0.08)",
    trackBg: "rgba(0, 0, 0, 0.035)",
    centerHoleBg: "#ffffff",
    textPrimary: "#09090b",
    textSecondary: "#64748b",
    textMuted: "#94a3b8",
    patternLine: "rgba(0, 0, 0, 0.48)",
    badgeBg: "rgba(0, 0, 0, 0.05)",
    badgeText: "#09090b",
    legendBorder: "rgba(0, 0, 0, 0.06)",
    activeLegendBg: "rgba(0, 0, 0, 0.04)",
    activeLegendBorder: "rgba(0, 0, 0, 0.16)",
  },
};

/**
 * Converts polar coordinates (radius, angle in degrees) to cartesian (x, y).
 * 0 degrees corresponds to 12 o'clock (top).
 */
export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

/**
 * Generates an SVG path `d` string for an annular donut slice.
 */
export function describeDonutSlice(
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
): string {
  const sweep = Math.min(359.99, Math.max(0.01, endAngle - startAngle));
  const effectiveEnd = startAngle + sweep;

  const outerStart = polarToCartesian(centerX, centerY, outerRadius, startAngle);
  const outerEnd = polarToCartesian(centerX, centerY, outerRadius, effectiveEnd);
  const innerEnd = polarToCartesian(centerX, centerY, innerRadius, effectiveEnd);
  const innerStart = polarToCartesian(centerX, centerY, innerRadius, startAngle);

  const largeArcFlag = sweep > 180 ? 1 : 0;

  return [
    `M ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)}`,
    `A ${outerRadius.toFixed(2)} ${outerRadius.toFixed(2)} 0 ${largeArcFlag} 1 ${outerEnd.x.toFixed(2)} ${outerEnd.y.toFixed(2)}`,
    `L ${innerEnd.x.toFixed(2)} ${innerEnd.y.toFixed(2)}`,
    `A ${innerRadius.toFixed(2)} ${innerRadius.toFixed(2)} 0 ${largeArcFlag} 0 ${innerStart.x.toFixed(2)} ${innerStart.y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

/**
 * Computes all slice geometries, bisector explosion offsets, percentages, patterns, and colors.
 */
export function computeDonutSlices(
  data: DonutDataPoint[],
  size: number,
  innerRadiusRatio = 0.54,
  padAngle = 0,
  explosionDistance = 8,
  theme: Theme = "dark",
  variant: "monochrome" | "brand" = "brand",
  startAngleOffset = 270
): {
  slices: DonutSliceGeometry[];
  total: number;
  centerX: number;
  centerY: number;
  outerRadius: number;
  innerRadius: number;
} {
  const centerX = size / 2;
  const centerY = size / 2;
  // Reserve space for the outward explosion translation
  const outerRadius = Math.max(20, size / 2 - explosionDistance - 8);
  const innerRadius = outerRadius * Math.min(0.85, Math.max(0.2, innerRadiusRatio));

  const validItems = (Array.isArray(data) && data.length > 0 ? data : DEFAULT_DONUT_DATA).map(
    (d) => ({
      ...d,
      value: Number.isFinite(Number(d.value)) && Number(d.value) > 0 ? Number(d.value) : 0,
    })
  );

  const total = validItems.reduce((acc, curr) => acc + curr.value, 0);

  if (total <= 0) {
    return {
      slices: [],
      total: 0,
      centerX,
      centerY,
      outerRadius,
      innerRadius,
    };
  }

  const paletteMap = variant === "brand" ? BRAND_PALETTE : MONOCHROME_PALETTE;
  const palette = paletteMap[theme] || paletteMap.dark;
  const tokens = DONUT_CHART_THEME_TOKENS[theme] || DONUT_CHART_THEME_TOKENS.dark;

  const hasMultiple = validItems.filter((i) => i.value > 0).length > 1;
  const effectivePadAngle = hasMultiple ? padAngle : 0;
  const totalAvailableDegrees = 360 - validItems.length * effectivePadAngle;
  const seamOverlap = effectivePadAngle === 0 && hasMultiple ? 0.08 : 0;

  let currentAngle = startAngleOffset;

  const slices: DonutSliceGeometry[] = validItems.map((item, index) => {
    const fraction = item.value / total;
    const sweepAngle = Math.max(0.5, fraction * totalAvailableDegrees + seamOverlap);
    const startAngle = currentAngle + effectivePadAngle / 2;
    const endAngle = startAngle + sweepAngle;
    currentAngle = (startAngle + fraction * totalAvailableDegrees) + effectivePadAngle / 2;

    const midAngle = (startAngle + endAngle) / 2;
    const midRad = ((midAngle - 90) * Math.PI) / 180;
    const midRadius = (innerRadius + outerRadius) / 2;

    const midX = centerX + midRadius * Math.cos(midRad);
    const midY = centerY + midRadius * Math.sin(midRad);

    const normalPath = describeDonutSlice(
      centerX,
      centerY,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle
    );

    // Exploded translation offset along the bisector angle
    const dx = Math.round(explosionDistance * Math.cos(midRad) * 100) / 100;
    const dy = Math.round(explosionDistance * Math.sin(midRad) * 100) / 100;

    const explodedPath = describeDonutSlice(
      centerX + dx,
      centerY + dy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle
    );

    const fallbackConfig = palette[index % palette.length];
    const isDefaultDarkColor =
      item.color === "#181614" ||
      item.color === "#12161f" ||
      item.color === "#32C798" ||
      item.color === "#818CF8";

    const color =
      item.color && !(theme === "light" && isDefaultDarkColor)
        ? item.color
        : fallbackConfig.color;
    const activeColor =
      item.activeColor && !(theme === "light" && isDefaultDarkColor)
        ? item.activeColor
        : fallbackConfig.activeColor;
    const pattern = item.pattern || fallbackConfig.pattern;
    const patternColor =
      item.patternColor && !(theme === "light" && isDefaultDarkColor)
        ? item.patternColor
        : fallbackConfig.patternColor || tokens.patternLine;
    const accentColor =
      item.accentColor && !(theme === "light" && isDefaultDarkColor)
        ? item.accentColor
        : (pattern !== "solid" && (fallbackConfig.patternColor || item.patternColor)
            ? (fallbackConfig.patternColor || item.patternColor)!
            : color);

    return {
      index,
      item,
      value: item.value,
      percentage: Math.round(fraction * 1000) / 10,
      startAngle,
      endAngle,
      midAngle,
      path: normalPath,
      explodedPath,
      color,
      activeColor,
      pattern,
      patternColor,
      accentColor,
      dx,
      dy,
      midX,
      midY,
    };
  });

  return {
    slices,
    total,
    centerX,
    centerY,
    outerRadius,
    innerRadius,
  };
}

/**
 * Format number with comma separation and optional custom formatter.
 */
export function formatDonutValue(
  num: number,
  customFormatter?: (value: number) => string
): string {
  if (customFormatter) {
    return customFormatter(num);
  }
  const parts = Math.round(num).toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
