import type {
  BarSeriesConfig,
  GroupedBarDataPoint,
  GroupedBarThemeTokens,
  SeriesColorPair,
  Theme,
} from "./grouped-bar-chart.types";

export const DEFAULT_GROUPED_BAR_DATA: GroupedBarDataPoint[] = [
  { label: "Jan", fullDate: "January", revenue: 11200, profit: 4200 },
  { label: "Feb", fullDate: "February", revenue: 15500, profit: 5200 },
  { label: "Mar", fullDate: "March", revenue: 10800, profit: 3400 },
  { label: "Apr", fullDate: "April", revenue: 14200, profit: 6100 },
  { label: "May", fullDate: "May", revenue: 13100, profit: 4500 },
  { label: "Jun", fullDate: "June", revenue: 16800, profit: 8200 },
];

export const DEFAULT_BAR_SERIES: BarSeriesConfig[] = [
  {
    key: "revenue",
    label: "revenue",
    color: "#32C798",
    activeColor: "#10B981",
  },
  {
    key: "profit",
    label: "profit",
    color: "#818CF8",
    activeColor: "#6366F1",
  },
];

/**
 * Curated theme-aware color palette for arbitrary grouped bar series.
 */
export const DEFAULT_SERIES_PALETTE: Record<Theme, SeriesColorPair[]> = {
  dark: [
    { color: "#32C798", activeColor: "#10B981" }, // Emerald (Brand)
    { color: "#818CF8", activeColor: "#6366F1" }, // Indigo (Brand)
    { color: "#FBBF24", activeColor: "#F59E0B" }, // Amber
    { color: "#38BDF8", activeColor: "#0EA5E9" }, // Sky
    { color: "#FB7185", activeColor: "#F43F5E" }, // Rose
    { color: "#A78BFA", activeColor: "#8B5CF6" }, // Purple
  ],
  light: [
    { color: "#10B981", activeColor: "#059669" }, // Emerald
    { color: "#6366F1", activeColor: "#4F46E5" }, // Indigo
    { color: "#F59E0B", activeColor: "#D97706" }, // Amber
    { color: "#0EA5E9", activeColor: "#0284C7" }, // Sky
    { color: "#F43F5E", activeColor: "#E11D48" }, // Rose
    { color: "#8B5CF6", activeColor: "#7C3AED" }, // Purple
  ],
};

/**
 * Resolves series gradient colors, respecting custom series colors with fallback to curated palette.
 */
export function getSeriesColors(
  s: BarSeriesConfig,
  index: number,
  theme: Theme
): SeriesColorPair {
  const palette = DEFAULT_SERIES_PALETTE[theme] || DEFAULT_SERIES_PALETTE.dark;
  const fallback = palette[index % palette.length];
  return {
    color: s.color || fallback.color,
    activeColor: s.activeColor || fallback.activeColor,
  };
}

export const GROUPED_BAR_THEME_TOKENS: Record<Theme, GroupedBarThemeTokens> = {
  dark: {
    bg: "#0c0c10",
    surface: "#14141b",
    border: "rgba(255, 255, 255, 0.08)",
    trackBg: "rgba(255, 255, 255, 0.035)",
    gridLine: "rgba(255, 255, 255, 0.05)",
    textPrimary: "#ffffff",
    textSecondary: "#8b8d98",
    textMuted: "#71717a",
    activeLabelText: "#ffffff",
    activeLabelBlockBg: "rgba(255, 255, 255, 0.09)",
    activeLabelBlockBorder: "rgba(255, 255, 255, 0.16)",
    badgeBg: "rgba(50, 199, 152, 0.12)",
    badgeText: "#32C798",
    gradStart0: "#32C798",
    gradEnd0: "#10B981",
    gradStart1: "#818CF8",
    gradEnd1: "#6366F1",
    dotFill: "#0c0c10",
    dotStroke0: "#32C798",
    dotStroke1: "#818CF8",
    tooltipBg: "#18181f",
    tooltipBorder: "rgba(255, 255, 255, 0.14)",
    tooltipText: "#ffffff",
    brandEmerald: "#32C798",
    brandIndigo: "#818CF8",
  },
  light: {
    bg: "#ffffff",
    surface: "#f8fafc",
    border: "rgba(0, 0, 0, 0.08)",
    trackBg: "rgba(0, 0, 0, 0.035)",
    gridLine: "rgba(0, 0, 0, 0.04)",
    textPrimary: "#09090b",
    textSecondary: "#64748b",
    textMuted: "#94a3b8",
    activeLabelText: "#09090b",
    activeLabelBlockBg: "rgba(0, 0, 0, 0.06)",
    activeLabelBlockBorder: "rgba(0, 0, 0, 0.12)",
    badgeBg: "rgba(16, 185, 129, 0.12)",
    badgeText: "#10b981",
    gradStart0: "#10b981",
    gradEnd0: "#059669",
    gradStart1: "#6366f1",
    gradEnd1: "#4f46e5",
    dotFill: "#ffffff",
    dotStroke0: "#10b981",
    dotStroke1: "#6366f1",
    tooltipBg: "#ffffff",
    tooltipBorder: "rgba(0, 0, 0, 0.10)",
    tooltipText: "#09090b",
    brandEmerald: "#10b981",
    brandIndigo: "#6366f1",
  },
};

/**
 * Format number with comma separation and optional custom formatter.
 */
export function formatGrouped(
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
