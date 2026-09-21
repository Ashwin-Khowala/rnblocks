import type { StyleProp, ViewStyle } from "react-native";

export type Theme = "dark" | "light";

export interface GroupedBarDataPoint {
  /** X-axis category label (e.g. "Jan", "Feb", "Q1", "Mon") */
  label: string;
  /** Full date or verbose label shown in tooltip and screen readers (e.g. "February 2026") */
  fullDate?: string;
  /** Dynamic numeric series values (e.g. revenue: 15500, profit: 5200) */
  [key: string]: number | string | undefined;
}

export interface SeriesColorPair {
  /** Gradient start or solid base color */
  color: string;
  /** Gradient end or active highlight color */
  activeColor: string;
}

export interface BarSeriesConfig {
  /** Key matching property on GroupedBarDataPoint (e.g. "revenue") */
  key: string;
  /** Display label for tooltip and legend (e.g. "revenue") */
  label: string;
  /** Gradient start color or solid base color. Defaults to theme palette color for this series index. */
  color?: string;
  /** Gradient end color or active highlight color. Defaults to theme palette active color for this series index. */
  activeColor?: string;
}

export interface GroupedBarChartProps {
  /**
   * Dataset of category data points with numeric series values.
   * Note on semantics: Missing or non-finite values (undefined, null, NaN) safely default to 0.
   */
  data?: GroupedBarDataPoint[];
  /**
   * Array of series configurations defining key, display label, and optional custom colors.
   * Supports 1, 2, or arbitrary multiple series with theme-harmonious fallback palettes.
   */
  series?: BarSeriesConfig[];
  /** Theme mode: 'dark' | 'light'. Defaults to 'dark'. */
  theme?: Theme;
  /** Header title displayed above the chart visualization */
  title?: string;
  /** Optional subtitle displayed below title */
  subtitle?: string;
  /** Currency or unit prefix displayed before numbers (e.g. "$") */
  valuePrefix?: string;
  /** Currency or unit suffix displayed after numbers (e.g. " pts") */
  valueSuffix?: string;
  /** Height of the SVG visualization in pixels. Defaults to 200. */
  height?: number;
  /** Whether to animate bar heights with a smooth staggered entrance. Defaults to true. */
  animated?: boolean;
  /** Whether to render subtle background vertical tracks behind each individual bar. Defaults to true. */
  showBackgroundTrack?: boolean;
  /** Whether to display interactive series legend pills in the card header. Defaults to true. */
  showLegend?: boolean;
  /** Whether to show the metric summary row with prominent total and percentage badge. Defaults to true. */
  showMetricSummary?: boolean;
  /** Whether to show the floating glassmorphic tooltip card. Defaults to true. */
  showTooltip?: boolean;
  /** Whether to render dashed horizontal grid lines. Defaults to true. */
  showGridLines?: boolean;
  /**
   * Initial selected group index on mount (uncontrolled; defaults to null for clean idle state).
   */
  initialIndex?: number | null;
  /** Custom accessibility narrative override for screen readers */
  accessibilityLabel?: string;
  /** Custom formatter function for numeric values */
  formatValue?: (value: number) => string;
  /** Callback fired when a category group is scrubbed or tapped */
  onSelectGroup?: (point: GroupedBarDataPoint, index: number) => void;
  /** Custom outer container style */
  style?: StyleProp<ViewStyle>;
}

export interface GroupedBarThemeTokens {
  bg: string;
  surface: string;
  border: string;
  trackBg: string;
  gridLine: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  activeLabelText: string;
  activeLabelBlockBg: string;
  activeLabelBlockBorder: string;
  badgeBg: string;
  badgeText: string;
  gradStart0: string;
  gradEnd0: string;
  gradStart1: string;
  gradEnd1: string;
  dotFill: string;
  dotStroke0: string;
  dotStroke1: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipText: string;
  brandEmerald: string;
  brandIndigo: string;
}
