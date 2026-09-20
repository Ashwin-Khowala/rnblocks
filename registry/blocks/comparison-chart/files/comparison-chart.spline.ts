import type { SplineResult, SplineSegment } from "./comparison-chart.types";

/**
 * Computes ultra-smooth, continuous Monotone Cubic Spline paths (Fritsch-Carlson algorithm).
 * - Eliminates stair-stepping / terracing on slopes by aligning tangents with continuous gradients.
 * - Guarantees zero slope at local peaks and valleys for natural rounded crests/troughs without overshoot.
 * - Produces exact cubic Bézier control points for 100% SVG and pointer sync.
 */
export function createMonotoneCubicSpline(
  points: { x: number; y: number }[],
  baselineY: number
): SplineResult {
  const n = points.length;
  if (n < 2) return { linePath: "", areaPath: "", segments: [] };

  // 1. Calculate secant slopes (deltas)
  const dxs: number[] = [];
  const deltas: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    dxs.push(dx);
    deltas.push(dx !== 0 ? dy / dx : 0);
  }

  // 2. Initialize tangents m with slope averages
  const m: number[] = new Array(n).fill(0);
  m[0] = deltas[0];
  m[n - 1] = deltas[n - 2];

  for (let i = 1; i < n - 1; i++) {
    const d0 = deltas[i - 1];
    const d1 = deltas[i];
    // If sign flips or either slope is zero, local extremum (crest/trough) -> flat slope
    if (d0 * d1 <= 0) {
      m[i] = 0;
    } else {
      m[i] = (d0 + d1) / 2;
    }
  }

  // 3. Fritsch-Carlson monotonicity check to prevent any overshoot
  for (let i = 0; i < n - 1; i++) {
    const delta = deltas[i];
    if (delta === 0) {
      m[i] = 0;
      m[i + 1] = 0;
    } else {
      const alpha = m[i] / delta;
      const beta = m[i + 1] / delta;
      const dist = alpha * alpha + beta * beta;
      if (dist > 9) {
        const tau = 3 / Math.sqrt(dist);
        m[i] = tau * alpha * delta;
        m[i + 1] = tau * beta * delta;
      }
    }
  }

  // 4. Derive cubic Bézier control points & SVG path strings
  const segments: SplineSegment[] = [];
  let linePath = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (let i = 0; i < n - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const dx = dxs[i];

    const cp1x = p0.x + dx / 3;
    const cp1y = p0.y + (m[i] * dx) / 3;
    const cp2x = p1.x - dx / 3;
    const cp2y = p1.y - (m[i + 1] * dx) / 3;

    segments.push({
      p0,
      p1,
      cp1: { x: cp1x, y: cp1y },
      cp2: { x: cp2x, y: cp2y },
    });

    linePath += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
  }

  const first = points[0];
  const last = points[n - 1];
  const areaPath = `${linePath} L ${last.x.toFixed(2)} ${baselineY.toFixed(2)} L ${first.x.toFixed(2)} ${baselineY.toFixed(2)} Z`;

  return { linePath, areaPath, segments };
}
