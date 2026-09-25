import type { DonutDataPoint } from "./donut-chart.types";
import { formatDonutValue } from "./donut-chart.utils";

export function generateDonutA11ySummary(
  data: DonutDataPoint[],
  total: number,
  activeSlice: DonutDataPoint | null,
  title = "Donut Chart"
): string {
  if (!data || data.length === 0 || total <= 0) {
    return `${title}. No data available.`;
  }

  const valid = data.filter((d) => Number(d.value) > 0);
  const sorted = [...valid].sort((a, b) => Number(b.value) - Number(a.value));
  const largest = sorted[0];
  const largestPct = largest ? Math.round((Number(largest.value) / total) * 100) : 0;

  const baseSummary = `${title}. Total value of ${formatDonutValue(total)} distributed across ${valid.length} categories. Largest category is ${largest?.label} at ${formatDonutValue(Number(largest?.value))} (${largestPct}%).`;

  if (activeSlice) {
    const activePct = Math.round((Number(activeSlice.value) / total) * 100);
    return `${baseSummary} Currently selected: ${activeSlice.label} with ${formatDonutValue(Number(activeSlice.value))} (${activePct}%).`;
  }

  return baseSummary;
}
