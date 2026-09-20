import type { ComparisonDataPoint, SeriesConfig } from "./comparison-chart.types";
import { formatGrouped } from "./comparison-chart.utils";

export interface A11ySummaryParams {
  userA11yLabel?: string;
  currentPoint: ComparisonDataPoint;
  series: SeriesConfig[];
  valuePrefix: string;
  valueSuffix: string;
  title: string;
  formatValue?: (value: number) => string;
}

/**
 * Builds a dynamic screen reader accessibility description supporting arbitrary series.
 */
export function buildA11ySummary({
  userA11yLabel,
  currentPoint,
  series,
  valuePrefix,
  valueSuffix,
  title,
  formatValue,
}: A11ySummaryParams): string {
  if (userA11yLabel) return userA11yLabel;

  const dateLabel = currentPoint.fullDate || currentPoint.date || currentPoint.label;

  const seriesDescriptions = series.map((s) => {
    const raw = currentPoint[s.key];
    const isValid =
      raw !== null && raw !== undefined && raw !== "" && Number.isFinite(Number(raw));
    const formattedVal = isValid
      ? `${valuePrefix}${formatGrouped(Number(raw), formatValue)}${valueSuffix}`
      : "unavailable";
    return `${s.label} is ${formattedVal}`;
  });

  const seriesText =
    seriesDescriptions.length > 0
      ? seriesDescriptions.join(", ")
      : "no series";

  return `Comparison chart: ${title}. ${dateLabel}: ${seriesText}.`;
}
