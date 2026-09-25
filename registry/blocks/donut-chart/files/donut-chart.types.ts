import type { StyleProp, ViewStyle } from "react-native";

export type Theme = "dark" | "light";

export type DonutPattern =
  | "solid"
  | "diagonal-stripes"
  | "vertical-stripes"
  | "horizontal-stripes"
  | "dots";

export interface DonutDataPoint {
  /** Label for category/segment (e.g. "Category A", "Category B", "Housing") */
  label: string;
  /** Numerical value for this segment */
  value: number;
  /** Texture/pattern for this slice (e.g. "solid", "diagonal-stripes", "vertical-stripes") */
  pattern?: DonutPattern;
  /** Optional custom base color for this slice */
  color?: string;
  /** Optional custom active/highlight color for this slice */
  activeColor?: string;
  /** Optional custom stroke/hatch color for pattern lines */
  patternColor?: string;
  /** Optional custom accent color for text readout and highlights */
  accentColor?: string;
  /** Optional descriptive subtitle or breakdown info */
  description?: string;
  [key: string]: unknown;
}

export interface DonutSliceGeometry {
  index: number;
  item: DonutDataPoint;
  value: number;
  percentage: number;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  path: string;
  explodedPath: string;
  color: string;
  activeColor: string;
  pattern: DonutPattern;
  patternColor: string;
  accentColor: string;
  dx: number;
  dy: number;
  midX: number;
  midY: number;
}

export interface DonutThemeTokens {
  bg: string;
  surface: string;
  border: string;
  trackBg: string;
  centerHoleBg: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  patternLine: string;
  badgeBg: string;
  badgeText: string;
  legendBorder: string;
  activeLegendBg: string;
  activeLegendBorder: string;
}

export interface DonutChartProps {
  /**
   * Data items to render as donut slices.
   * Missing or non-finite values (undefined, null, NaN) safely default to 0.
   */
  data?: DonutDataPoint[];
  /** Theme mode: 'dark' | 'light'. Defaults to 'dark'. */
  theme?: Theme;
  /**
   * Styling variant:
   * - "brand": incorporates signature emerald, indigo, amber, and sky brand palette.
   * - "monochrome": technical charcoal, slate, and high-contrast monochrome hatching.
   * Defaults to "brand".
   */
  variant?: "brand" | "monochrome";
  /** Header title displayed above the chart card */
  title?: string;
  /** Optional subtitle displayed below title */
  subtitle?: string;
  /** Currency or unit prefix (e.g. "$"). Defaults to "". */
  valuePrefix?: string;
  /** Currency or unit suffix (e.g. " pts" or "%"). Defaults to "". */
  valueSuffix?: string;
  /**
   * Outer diameter in pixels of the SVG donut visualization.
   * Defaults to 250.
   */
  size?: number;
  /**
   * Ratio of the inner hole radius relative to the outer radius (0.2 to 0.85).
   * Defaults to 0.54 (giving a thick, bold ring matching the design spec).
   */
  innerRadiusRatio?: number;
  /**
   * Angular gap in degrees between slices.
   * Defaults to 0 (flush seamless ring with zero gaps).
   */
  padAngle?: number;
  /**
   * Distance in pixels by which the active slice explodes/translates outward.
   * Defaults to 8.
   */
  explosionDistance?: number;
  /**
   * Whether to animate slice entrance and transitions.
   * Defaults to true.
   */
  animated?: boolean;
  /**
   * Starting rotation offset in degrees (0 = 12 o'clock, 270 = 9 o'clock horizontal left).
   * Defaults to 270 (matching the technical quadrant layout).
   */
  startAngleOffset?: number;
  /**
   * Whether to render the interactive category legend breakdown below the chart.
   * Defaults to false (clean chart-first view matching technical design).
   */
  showLegend?: boolean;
  /**
   * Whether the chart is in a loading state, displaying a circular loading animation.
   * Defaults to false.
   */
  loading?: boolean;
  /**
   * Whether to render the reload/reset icon button in the header to return to idle total.
   * Defaults to false.
   */
  showResetButton?: boolean;
  /**
   * Default label displayed under the center total when idle.
   * Defaults to "Total".
   */
  centerLabel?: string;
  /**
   * Optional initial active slice index on mount.
   * Note: Follows React uncontrolled initial value semantics (evaluated on mount).
   */
  initialIndex?: number | null;
  /** Custom accessibility narrative for screen readers */
  accessibilityLabel?: string;
  /** Optional custom value formatter */
  formatValue?: (value: number) => string;
  /** Callback fired when a slice is tapped, clicked, or hovered */
  onSelectSlice?: (slice: DonutDataPoint | null, index: number | null) => void;
  /**
   * Custom font family for the center numbers.
   * Defaults to cross-platform technical monospace (JetBrains Mono / Menlo / monospace).
   */
  numberFontFamily?: string;
  /** Container style overrides */
  style?: StyleProp<ViewStyle>;
}

