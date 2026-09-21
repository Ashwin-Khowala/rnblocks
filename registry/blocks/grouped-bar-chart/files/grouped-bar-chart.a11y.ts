import type { BarSeriesConfig, GroupedBarDataPoint } from "./grouped-bar-chart.types";

/**
 * Generates an audio narrative summary for screen readers.
 */
export function generateGroupedBarA11ySummary(
  data: GroupedBarDataPoint[],
  series: BarSeriesConfig[],
  title?: string
): string {
  if (!data || data.length === 0) {
    return `${title || "Grouped Bar Chart"}: No data available.`;
  }

  const seriesNames = series.map((s) => s.label).join(" and ");
  const totalCategories = data.length;
  const firstCategory = data[0].label;
  const lastCategory = data[data.length - 1].label;

  return `${title || "Grouped Bar Chart"} comparing ${seriesNames} across ${totalCategories} periods from ${firstCategory} to ${lastCategory}. Use touch or keyboard arrows to navigate across periods.`;
}
