import type {
  ChartThemeTokens,
  ComparisonDataPoint,
  SeriesConfig,
  Theme,
} from "./comparison-chart.types";

// ─── Default Sample Data (Matches Reference Aesthetic & Values) ────────────────

export const DEFAULT_SERIES: SeriesConfig[] = [
  { key: "revenue", label: "revenue", color: "#32C798" },
  { key: "costs", label: "costs", color: "#818CF8" },
];

export const DEFAULT_COMPARISON_DATA: ComparisonDataPoint[] = [
  { label: "Sun", date: "Jan 21", fullDate: "Sun, Jan 21", revenue: 3200, costs: 5800 },
  { label: "Mon", date: "Jan 22", fullDate: "Mon, Jan 22", revenue: 3900, costs: 5100 },
  { label: "Tue", date: "Jan 23", fullDate: "Tue, Jan 23", revenue: 4800, costs: 4300 },
  { label: "Wed", date: "Jan 24", fullDate: "Wed, Jan 24", revenue: 5800, costs: 3600 },
  { label: "Thu", date: "Jan 25", fullDate: "Thu, Jan 25", revenue: 6400, costs: 3300 },
  { label: "Fri", date: "Jan 26", fullDate: "Fri, Jan 26", revenue: 6200, costs: 3800 },
  { label: "Sat", date: "Jan 27", fullDate: "Sat, Jan 27", revenue: 5500, costs: 4700 },
  { label: "Sun", date: "Jan 28", fullDate: "Sun, Jan 28", revenue: 4800, costs: 5800 },
];

// ─── Theme Token Palettes ──────────────────────────────────────────────────────

export const THEME_TOKENS: Record<Theme, ChartThemeTokens> = {
  dark: {
    bg: "#08080B",
    surface: "#111216",
    border: "rgba(255, 255, 255, 0.08)",
    gridLine: "rgba(255, 255, 255, 0.05)",
    scrubberLine: "rgba(255, 255, 255, 0.35)",
    tooltipBg: "#111216",
    tooltipBorder: "rgba(255, 255, 255, 0.10)",
    pillBg: "#16171F",
    pillText: "#FFFFFF",
    pillBorder: "rgba(255, 255, 255, 0.12)",
    textPrimary: "#FFFFFF",
    textSecondary: "#8A8F9E",
    textMuted: "#5F6575",
    legendInactive: "rgba(255, 255, 255, 0.22)",
    shadowColor: "#000000",
  },
  light: {
    bg: "#FFFFFF",
    surface: "#F8FAFC",
    border: "rgba(0, 0, 0, 0.08)",
    gridLine: "rgba(0, 0, 0, 0.04)",
    scrubberLine: "rgba(15, 23, 42, 0.25)",
    tooltipBg: "#FFFFFF",
    tooltipBorder: "rgba(0, 0, 0, 0.10)",
    pillBg: "#FFFFFF",
    pillText: "#0F172A",
    pillBorder: "rgba(0, 0, 0, 0.10)",
    textPrimary: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#94A3B8",
    legendInactive: "rgba(0, 0, 0, 0.22)",
    shadowColor: "#000000",
  },
};

// ─── Layout Constants ──────────────────────────────────────────────────────────

export const SVG_VB_W = 400;
export const SVG_VB_H = 180;
export const PAD_T = 20;
export const PAD_B = 20;
export const PAD_X = 18;

export const TOOLTIP_WIDTH = 156;
export const ACTIVE_PILL_WIDTH = 70;

// ─── Formatting & Parsing Utilities ────────────────────────────────────────────

export function formatGrouped(num: number, customFormatter?: (value: number) => string): string {
  if (customFormatter) {
    return customFormatter(num);
  }
  return Math.round(num).toLocaleString();
}

export function parseDateParts(dateStr?: string): { prefix: string; day: number | null; suffix: string } {
  if (!dateStr) return { prefix: "", day: null, suffix: "" };
  const match = dateStr.match(/^(.*?)(\d{1,2})(.*?)$/);
  if (match) {
    return {
      prefix: match[1],
      day: parseInt(match[2], 10),
      suffix: match[3],
    };
  }
  return { prefix: dateStr, day: null, suffix: "" };
}
