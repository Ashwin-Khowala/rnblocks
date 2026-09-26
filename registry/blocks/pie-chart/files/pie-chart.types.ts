import type { ViewStyle } from "react-native";

export type PieTheme = "dark" | "light";
export type PieVariant = "brand" | "monochrome";

export type PiePattern =
  | "solid"
  | "vertical-stripes"
  | "diagonal-stripes"
  | "horizontal-stripes"
  | "dots";

export interface PieDataPoint {
  label: string;
  value: number;
  color?: string;
  pattern?: PiePattern;
  accentColor?: string;
  [key: string]: unknown;
}

export interface ComputedPieSlice {
  index: number;
  item: PieDataPoint;
  value: number;
  percentage: number;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  midAngleDeg: number;
  dx: number;
  dy: number;
  centroidX: number;
  centroidY: number;
  path: string;
  color: string;
  activeColor: string;
  pattern: PiePattern;
  patternColor: string;
  accentColor: string;
}

export interface PieChartThemeTokens {
  bg: string;
  cardBg: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  trackBg: string;
  patternLine: string;
  activeShadow: string;
  palette: string[];
  activePalette: string[];
}

export interface PieChartProps {
  /** Array of data items to visualize */
  data?: PieDataPoint[];
  /** Visual theme color scheme */
  theme?: PieTheme;
  /** Palette variant: brand colors or monochrome patterns */
  variant?: PieVariant;
  /** Card title shown above chart */
  title?: string;
  /** Subtitle context text */
  subtitle?: string;
  /** Prefix attached to the active value (e.g. "$") */
  valuePrefix?: string;
  /** Suffix attached to the active value (e.g. "pts", "%") */
  valueSuffix?: string;
  /** Dimension in points (width and height) of the pie chart */
  size?: number;
  /** Angular gap between slices in degrees (default: 0 for seamless continuous pie) */
  padAngle?: number;
  /** Offset distance in points when a slice explodes outward on selection */
  explosionDistance?: number;
  /** Angle in degrees where the first slice starts (default: 270 for 12 o'clock) */
  startAngleOffset?: number;
  /** Enable entrance and sweep animations */
  animated?: boolean;
  /** Show loading spinner placeholder */
  loading?: boolean;
  /** Label displayed in header readout when no slice is selected (default: "Total") */
  centerLabel?: string;
  /** Initial selected slice index */
  initialIndex?: number | null;
  /** Custom accessibility description */
  accessibilityLabel?: string;
  /** Callback fired when a slice is selected or unselected */
  onSelectSlice?: (item: PieDataPoint | null, index: number | null) => void;
  /** Custom font family for monospace rolling numbers */
  numberFontFamily?: string;
  /** Optional custom container style overrides */
  style?: ViewStyle;
}
