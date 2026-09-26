import type { PieDataPoint } from "./pie-chart.types";
import { formatPieValue } from "./pie-chart.utils";

export function generatePieA11ySummary(
  data: PieDataPoint[],
  total: number,
  activeSlice: PieDataPoint | null,
  title = "Pie Chart"
): string {
  if (!data || data.length === 0 || total <= 0) {
    return `${title}. No data available.`;
  }

  const valid = data.filter((d) => Number(d.value) > 0);
  const sorted = [...valid].sort((a, b) => Number(b.value) - Number(a.value));
  const largest = sorted[0];
  const largestPct = largest ? Math.round((Number(largest.value) / total) * 100) : 0;

  const baseSummary = `${title}. Total value of ${formatPieValue(total)} distributed across ${valid.length} categories. Largest category is ${largest?.label} at ${formatPieValue(Number(largest?.value))} (${largestPct}%).`;

  if (activeSlice) {
    const activePct = Math.round((Number(activeSlice.value) / total) * 100);
    return `${baseSummary} Currently selected: ${activeSlice.label} with ${formatPieValue(Number(activeSlice.value))} (${activePct}%).`;
  }

  return baseSummary;
}
