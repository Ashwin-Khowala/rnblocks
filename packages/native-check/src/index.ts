/**
 * @rnblocks/native-check — Native-only type verification entry point.
 *
 * Every block in the registry is imported here and compiled against a
 * TypeScript environment that has ONLY:
 *   - react
 *   - react-native
 *   - react-native-svg
 *
 * It has NO:
 *   - DOM types (lib.dom.d.ts)
 *   - Next.js types
 *   - Browser-specific React types (e.g. react-dom, react-dom/client)
 *
 * If this file compiles cleanly (tsc --noEmit), every imported block is
 * provably safe for iOS and Android. If it fails, CI fails.
 *
 * Usage:
 *   pnpm validate:native
 *   pnpm --filter @rnblocks/native-check typecheck
 *
 * When adding a new block to the registry, add its import below.
 */

import FloatingDocker from "../../../registry/blocks/floating-docker/files/floating-docker";
import InteractiveCalendar from "../../../registry/blocks/interactive-calendar/files/interactive-calendar";
import SocialAuthButtons from "../../../registry/blocks/social-auth-buttons/files/social-auth-buttons";
import TrendChart from "../../../registry/blocks/trend-chart/files/trend-chart";
import BarChart from "../../../registry/blocks/bar-chart/files/bar-chart";
import GroupedBarChart from "../../../registry/blocks/grouped-bar-chart/files/grouped-bar-chart";
import DonutChart from "../../../registry/blocks/donut-chart/files/donut-chart";
import ComparisonChart from "../../../registry/blocks/comparison-chart/files/comparison-chart";

// Suppress "unused import" errors — imports exist to trigger type-checking only.
void FloatingDocker;
void InteractiveCalendar;
void SocialAuthButtons;
void TrendChart;
void BarChart;
void GroupedBarChart;
void DonutChart;
void ComparisonChart;
