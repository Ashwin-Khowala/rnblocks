export type Theme = "dark" | "light";

export interface SeriesConfig {
  key: string;
  label: string;
  color: string;
}

export interface ComparisonDataPoint {
  label: string;
  date?: string;
  fullDate?: string;
  [seriesKey: string]: string | number | undefined;
}

export interface ComparisonChartProps {
  /** Dataset of comparative data points */
  data?: ComparisonDataPoint[];
  /** Array of series to render on the chart */
  series?: SeriesConfig[];
  /** Color theme mode. Defaults to 'dark'. */
  theme?: Theme;
  /** Primary title displayed above chart metrics. */
  title?: string;
  /** Subtitle displayed below title. Defaults to 'Revenue vs Costs'. */
  subtitle?: string;
  /** Currency or value prefix (e.g. '$'). */
  valuePrefix?: string;
  /** Value suffix (e.g. ' hrs', ' pts'). */
  valueSuffix?: string;
  /** Height of the chart visualization in pixels. Defaults to 220. */
  height?: number;
  /** Whether to show the floating glassmorphic tooltip card. Defaults to true. */
  showTooltip?: boolean;
  /** Strategy for handling null/missing data points in series lines. 'interpolate' estimates missing points smoothly; 'zero' plots missing points at 0; 'gap' currently interpolates smoothly as a fallback until multi-segment rendering is finalized. Defaults to 'interpolate'. */
  missingData?: "interpolate" | "zero" | "gap";
  /** Custom accessibility summary label for screen readers. */
  accessibilityLabel?: string;
  /** Optional custom value formatter function for locale-aware formatting. */
  formatValue?: (value: number) => string;
  /** Callback fired when a data point is scrubbed or tapped. */
  onPointSelect?: (point: ComparisonDataPoint, index: number) => void;
}

export interface ChartThemeTokens {
  bg: string;
  surface: string;
  border: string;
  gridLine: string;
  scrubberLine: string;
  tooltipBg: string;
  tooltipBorder: string;
  pillBg: string;
  pillText: string;
  pillBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  legendInactive: string;
  shadowColor: string;
}

export interface SplineSegment {
  p0: { x: number; y: number };
  p1: { x: number; y: number };
  cp1: { x: number; y: number };
  cp2: { x: number; y: number };
}

export interface SplineResult {
  linePath: string;
  areaPath: string;
  segments: SplineSegment[];
}
