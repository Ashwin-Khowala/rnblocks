export interface BlockPropDoc {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface BlockDocInfo {
  usageCode: string;
  props: BlockPropDoc[];
  a11yFeatures: string[];
}

export const BLOCK_DOCS: Record<string, BlockDocInfo> = {
  "comparison-chart": {
    usageCode: `import ComparisonChart from "@/components/comparison-chart";

export default function PerformanceScreen() {
  const performanceData = [
    { label: "Jan 21", fullDate: "Sun, Jan 21", revenue: 3200, costs: 5800 },
    { label: "Jan 22", fullDate: "Mon, Jan 22", revenue: 3900, costs: 5100 },
    { label: "Jan 23", fullDate: "Tue, Jan 23", revenue: 4800, costs: 4300 },
    { label: "Jan 24", fullDate: "Wed, Jan 24", revenue: 5800, costs: 3600 },
    { label: "Jan 25", fullDate: "Thu, Jan 25", revenue: 6400, costs: 3300 },
    { label: "Jan 26", fullDate: "Fri, Jan 26", revenue: 6200, costs: 3800 },
    { label: "Jan 27", fullDate: "Sat, Jan 27", revenue: 5500, costs: 4700 },
    { label: "Jan 28", fullDate: "Sun, Jan 28", revenue: 4800, costs: 5800 },
  ];

  return (
    <ComparisonChart
      data={performanceData}
      series={[
        { key: "revenue", label: "revenue", color: "#32C798" },
        { key: "costs", label: "costs", color: "#818CF8" },
      ]}
      theme="dark"
      title="Revenue vs Costs"
      valuePrefix="$"
      height={220}
      onPointSelect={(point, index) => {
        console.log("Scrubbed point:", point, "at index:", index);
      }}
    />
  );
}`,
    props: [
      {
        name: "data",
        type: "ComparisonDataPoint[]",
        default: "DEFAULT_COMPARISON_DATA",
        required: false,
        description: "Dataset containing multi-series numeric values, short x-axis labels, and full formatted dates.",
      },
      {
        name: "series",
        type: "SeriesConfig[]",
        default: "DEFAULT_SERIES",
        required: false,
        description: "Array defining each data series with key, display label, and line/indicator color.",
      },
      {
        name: "theme",
        type: '"dark" | "light"',
        default: '"dark"',
        required: false,
        description: "Color theme mode for card surface, grid lines, text tokens, and tooltip backdrop.",
      },
      {
        name: "title",
        type: "string",
        default: '"Performance Overview"',
        required: false,
        description: "Header title displayed above the comparative spline visualization.",
      },
      {
        name: "valuePrefix",
        type: "string",
        default: '"$"',
        required: false,
        description: "Prefix formatted before numerical metrics in the tooltip and legend (e.g. '$').",
      },
      {
        name: "valueSuffix",
        type: "string",
        default: '""',
        required: false,
        description: "Suffix formatted after numerical metrics in the tooltip and legend (e.g. ' pts').",
      },
      {
        name: "height",
        type: "number",
        default: "220",
        required: false,
        description: "Height in pixels of the interactive SVG canvas area.",
      },
      {
        name: "showTooltip",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to render the floating glassmorphic tooltip card that tracks the scrub cursor.",
      },
      {
        name: "missingData",
        type: '"interpolate" | "zero" | "gap"',
        default: '"interpolate"',
        required: false,
        description: "Strategy for handling null or undefined values in series data points ('interpolate' linearly estimates missing points smoothly, 'zero' plots missing values at 0, 'gap' gracefully interpolates).",
      },
      {
        name: "accessibilityLabel",
        type: "string",
        default: "undefined",
        required: false,
        description: "Custom accessibility narrative override for screen readers.",
      },
      {
        name: "formatValue",
        type: "(value: number) => string",
        default: "undefined",
        required: false,
        description: "Custom formatter function for numerical values in legend and tooltip.",
      },
      {
        name: "onPointSelect",
        type: "(point: ComparisonDataPoint, index: number) => void",
        default: "undefined",
        required: false,
        description: "Callback fired when a data point is scrubbed or tapped.",
      },
    ],
    a11yFeatures: [
      "Container declares accessibilityRole='summary' with a dynamic, high-level spoken narrative.",
      "Interactive series legend pills declare accessibilityRole='button' and accessibilityState={{ selected }}.",
      "allowFontScaling={false} on fixed-pixel tooltip numbers and active date pills prevents text truncation.",
      "Touch responder maintains comfortable continuous touch and mouse tracking across mobile and desktop.",
    ],
  },
  "bar-chart": {
    usageCode: `import BarChart from "@/components/bar-chart";

export default function AnalyticsScreen() {
  const chartData = [
    { label: "Mon", value: 1200 },
    { label: "Tue", value: 2180 },
    { label: "Wed", value: 1850 },
    { label: "Thu", value: 2900 },
    { label: "Fri", value: 2400 },
    { label: "Sat", value: 3800 },
    { label: "Sun", value: 3100 },
  ];

  return (
    <BarChart
      data={chartData}
      theme="dark"
      accentColor="#32C798"
      chartHeight={175}
      animated={true}
      onSelectBar={(point, index) => {
        console.log("Selected point:", point, "at index:", index);
      }}
    />
  );
}`,
    props: [
      {
        name: "data",
        type: "BarChartDataPoint[]",
        default: "SAMPLE_DATA",
        required: false,
        description: "Array of chart data points with label, value, and optional secondaryValue or date.",
      },
      {
        name: "theme",
        type: '"dark" | "light"',
        default: '"dark"',
        required: false,
        description: "Color theme mode for background surfaces, text, and track borders.",
      },
      {
        name: "accentColor",
        type: "string",
        default: '"#32C798"',
        required: false,
        description: "Primary accent color for active bars, highlights, and gradient fills.",
      },
      {
        name: "title",
        type: "string",
        default: '"Activity Overview"',
        required: false,
        description: "Header title displayed at the top of the chart card.",
      },
      {
        name: "valuePrefix",
        type: "string",
        default: '""',
        required: false,
        description: "Optional prefix formatted before numeric values (e.g. '$').",
      },
      {
        name: "valueSuffix",
        type: "string",
        default: '""',
        required: false,
        description: "Optional suffix formatted after numeric values (e.g. ' hrs', ' km').",
      },
      {
        name: "chartHeight",
        type: "number",
        default: "175",
        required: false,
        description: "Height of the SVG chart visualization in pixels.",
      },
      {
        name: "animated",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to animate bar heights with a staggered spring animation on mount.",
      },
      {
        name: "showBackgroundTrack",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to display subtle background slot tracks behind each bar.",
      },
      {
        name: "onSelectBar",
        type: "(point: BarChartDataPoint, index: number) => void",
        default: "undefined",
        required: false,
        description: "Callback fired when a bar is pressed or hovered.",
      },
    ],
    a11yFeatures: [
      "Individual accessible buttons for each bar declaring accessibilityRole='button'.",
      "Dynamic accessibilityLabel announcing day name and formatted numerical value.",
      "accessibilityState={{ selected }} communicating the active scrub position.",
      "Meets 44x44pt minimum touch target requirements for thumb interaction.",
    ],
  },
  "grouped-bar-chart": {
    usageCode: `import GroupedBarChart from "@/components/grouped-bar-chart";

export default function FinancialPerformanceScreen() {
  const financialData = [
    { label: "Jan", fullDate: "January 2026", revenue: 10400, profit: 3600 },
    { label: "Feb", fullDate: "February 2026", revenue: 15500, profit: 5200 },
    { label: "Mar", fullDate: "March 2026", revenue: 12200, profit: 4100 },
    { label: "Apr", fullDate: "April 2026", revenue: 18900, profit: 7800 },
    { label: "May", fullDate: "May 2026", revenue: 14200, profit: 4900 },
    { label: "Jun", fullDate: "June 2026", revenue: 21000, profit: 9200 },
  ];

  return (
    <GroupedBarChart
      data={financialData}
      series={[
        { key: "revenue", label: "revenue" },
        { key: "profit", label: "profit" },
      ]}
      theme="dark"
      title="Financial Performance"
      valuePrefix="$"
      height={240}
      onSelectGroup={(point, index) => {
        console.log("Selected group:", point.label, "at index:", index);
      }}
    />
  );
}`,
    props: [
      {
        name: "data",
        type: "GroupedBarDataPoint[]",
        default: "DEFAULT_GROUPED_BAR_DATA",
        required: false,
        description: "Dataset containing multi-series numeric values, category labels, and optional full date descriptions.",
      },
      {
        name: "series",
        type: "BarSeriesConfig[]",
        default: "DEFAULT_BAR_SERIES",
        required: false,
        description: "Array defining each data series with key, display label, and optional custom colors.",
      },
      {
        name: "theme",
        type: '"dark" | "light"',
        default: '"dark"',
        required: false,
        description: "Color theme mode for canvas surface, grid lines, text tokens, bars, and tooltip backdrop.",
      },
      {
        name: "title",
        type: "string",
        default: "undefined",
        required: false,
        description: "Optional header title displayed above the grouped bar chart.",
      },
      {
        name: "subtitle",
        type: "string",
        default: "undefined",
        required: false,
        description: "Optional secondary description displayed below the title.",
      },
      {
        name: "valuePrefix",
        type: "string",
        default: '""',
        required: false,
        description: "Prefix formatted before numerical metrics in the tooltip (e.g. '$').",
      },
      {
        name: "valueSuffix",
        type: "string",
        default: '""',
        required: false,
        description: "Suffix formatted after numerical metrics in the tooltip (e.g. ' pts').",
      },
      {
        name: "height",
        type: "number",
        default: "240",
        required: false,
        description: "Height in pixels of the interactive SVG chart visualization.",
      },
      {
        name: "animated",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to animate bar heights with a staggered spring entrance on mount.",
      },
      {
        name: "showBackgroundTrack",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to render subtle background vertical tracks behind each group slot.",
      },
      {
        name: "showLegend",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to display interactive series legend pills with live rolling numbers in the header.",
      },
      {
        name: "showTooltip",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to render the floating glassmorphic tooltip with animated rolling numbers.",
      },
      {
        name: "showGridLines",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to render dashed horizontal grid lines across the chart area.",
      },
      {
        name: "initialIndex",
        type: "number | null",
        default: "null",
        required: false,
        description: "Optional initial active group index on mount (defaults to null for clean idle state).",
      },
      {
        name: "onSelectGroup",
        type: "(point: GroupedBarDataPoint, index: number) => void",
        default: "undefined",
        required: false,
        description: "Callback fired when a category group is scrubbed, clicked, or tapped.",
      },
    ],
    a11yFeatures: [
      "Chart container declares accessibilityRole='summary' with a high-level spoken narrative generated from data.",
      "allowFontScaling={false} on fixed-pixel tooltip numbers and active category pill to prevent text truncation.",
      "ArrowLeft and ArrowRight keyboard navigation support for full web accessibility.",
      "Mobile PanResponder gesture tracking with auto-clamping ensures accurate thumb scrubbing across all screen widths.",
    ],
  },
  "floating-docker": {
    usageCode: `import FloatingDocker from "@/components/floating-docker";

export default function AppNavigation() {
  return (
    <FloatingDocker
      initialTab="home"
      theme="dark"
      onTabChange={(tabId) => {
        console.log("Navigated to tab:", tabId);
      }}
    />
  );
}`,
    props: [
      {
        name: "initialTab",
        type: "string",
        default: '"team"',
        required: false,
        description: "ID of the initially selected tab item.",
      },
      {
        name: "theme",
        type: '"dark" | "light"',
        default: '"dark"',
        required: false,
        description: "Color theme mode for dock backdrop blur, icons, and indicator pill.",
      },
      {
        name: "onTabChange",
        type: "(tabId: string) => void",
        default: "undefined",
        required: false,
        description: "Callback triggered when a tab item is pressed.",
      },
      {
        name: "tabs",
        type: "TabItem[]",
        default: "DEFAULT_TABS",
        required: false,
        description: "Custom array of tab items with id, label, and renderIcon function.",
      },
    ],
    a11yFeatures: [
      "Declares accessibilityRole='tab' on each dock item.",
      "Clear accessibilityLabel reflecting the tab destination (e.g. 'Home', 'Team').",
      "Dynamic accessibilityState={{ selected: isActive }} announcing selected tab.",
      "Generous touch target sizing (>48pt) for effortless mobile navigation.",
    ],
  },
  "interactive-calendar": {
    usageCode: `import { InteractiveCalendar } from "@/components/interactive-calendar";

export default function BookingScreen() {
  return (
    <InteractiveCalendar
      theme="dark"
      accentColor="#4F46E5"
      showTodayButton={true}
      onSelectDate={(selectedDate) => {
        console.log("User picked date:", selectedDate.toISOString());
      }}
      markedDates={{
        "2025-03-15": { marked: true, dotColor: "#10B981" },
        "2025-03-22": { dots: [{ color: "#EF4444" }, { color: "#3B82F6" }] },
      }}
    />
  );
}`,
    props: [
      {
        name: "initialDate",
        type: "Date",
        default: "new Date()",
        required: false,
        description: "Initial calendar month and default selected day.",
      },
      {
        name: "selectedDate",
        type: "Date",
        default: "undefined",
        required: false,
        description: "Controlled selected date prop for controlled state management.",
      },
      {
        name: "theme",
        type: '"dark" | "light"',
        default: '"dark"',
        required: false,
        description: "Color theme mode for calendar card, month header, and grid cells.",
      },
      {
        name: "accentColor",
        type: "string",
        default: '"#4F46E5"',
        required: false,
        description: "Color of the active selected day circle and event markers.",
      },
      {
        name: "showTodayButton",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to render a quick 'Today' shortcut button in the header.",
      },
      {
        name: "markedDates",
        type: "Record<string, MarkedDateConfig>",
        default: "undefined",
        required: false,
        description: "Map of ISO date keys (YYYY-MM-DD) to event dot badges or marking configs.",
      },
      {
        name: "onSelectDate",
        type: "(date: Date) => void",
        default: "undefined",
        required: false,
        description: "Callback fired when any day in the month grid is selected.",
      },
    ],
    a11yFeatures: [
      "Container declares accessibilityRole='grid' for assistive technology recognition.",
      "Each day cell declares accessibilityRole='button' with descriptive date announcement.",
      "Dynamic accessibilityState={{ selected: isSelected }} on active date.",
      "Header controls declare accessible labels for 'Previous month', 'Next month', and 'Go to today'.",
    ],
  },
  "social-auth-buttons": {
    usageCode: `import SocialAuthButtons from "@/components/social-auth-buttons";

export default function LoginScreen() {
  return (
    <SocialAuthButtons
      theme="dark"
      showDivider={true}
      dividerText="or continue with"
      onGooglePress={async () => {
        console.log("Initiate Google OAuth");
      }}
      onApplePress={async () => {
        console.log("Initiate Apple Sign-In");
      }}
      onGithubPress={async () => {
        console.log("Initiate GitHub OAuth");
      }}
    />
  );
}`,
    props: [
      {
        name: "theme",
        type: '"dark" | "light"',
        default: '"dark"',
        required: false,
        description: "Color theme mode for button backgrounds, borders, and brand labels.",
      },
      {
        name: "onApplePress",
        type: "() => void | Promise<void>",
        default: "undefined",
        required: false,
        description: "Callback fired when the Apple authentication button is pressed.",
      },
      {
        name: "onGooglePress",
        type: "() => void | Promise<void>",
        default: "undefined",
        required: false,
        description: "Callback fired when the Google authentication button is pressed.",
      },
      {
        name: "onGithubPress",
        type: "() => void | Promise<void>",
        default: "undefined",
        required: false,
        description: "Callback fired when the GitHub authentication button is pressed.",
      },
      {
        name: "showDivider",
        type: "boolean",
        default: "false",
        required: false,
        description: "Whether to render a stylized divider above the social auth button stack.",
      },
      {
        name: "dividerText",
        type: "string",
        default: '"Or continue with"',
        required: false,
        description: "Text displayed in the center of the divider.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description: "Disables interaction across all buttons during active authentication flows.",
      },
    ],
    a11yFeatures: [
      "All provider triggers declare accessibilityRole='button'.",
      "Explicit accessibilityLabel for each brand (e.g. 'Continue with Google', 'Continue with Apple').",
      "accessibilityState={{ disabled }} dynamically announced during loading/disabled state.",
      "48pt touch target height ensures comfortable thumb activation and WCAG compliance.",
    ],
  },
  "trend-chart": {
    usageCode: `import TrendChart from "@/components/trend-chart";

export default function PerformanceScreen() {
  const trendData = [
    { label: "Mon", value: 1200 },
    { label: "Tue", value: 2400 },
    { label: "Wed", value: 1800 },
    { label: "Thu", value: 3600 },
    { label: "Fri", value: 2900 },
    { label: "Sat", value: 4800 },
    { label: "Sun", value: 4100 },
  ];

  return (
    <TrendChart
      data={trendData}
      theme="dark"
      accentColor="#10B981"
      title="Revenue Growth"
      subtitle="vs previous period"
      height={150}
      onPointSelect={(point, index) => {
        console.log("Selected trend point:", point, "at index:", index);
      }}
    />
  );
}`,
    props: [
      {
        name: "data",
        type: "TrendDataPoint[]",
        default: "DEMO_CHART_DATA",
        required: false,
        description: "Array of data points with numeric value and string label.",
      },
      {
        name: "height",
        type: "number",
        default: "150",
        required: false,
        description: "Height of the SVG trend line canvas in pixels.",
      },
      {
        name: "theme",
        type: '"dark" | "light"',
        default: '"dark"',
        required: false,
        description: "Color theme mode for card background, borders, and typography.",
      },
      {
        name: "accentColor",
        type: "string",
        default: '"#10B981"',
        required: false,
        description: "Accent color for the smooth spline line, gradient glow, and indicator.",
      },
      {
        name: "title",
        type: "string",
        default: '"7-Day Activity Trend"',
        required: false,
        description: "Title displayed in the metrics header.",
      },
      {
        name: "subtitle",
        type: "string",
        default: '"growth vs last week"',
        required: false,
        description: "Context note displayed beside the delta percentage badge.",
      },
      {
        name: "unit",
        type: "string",
        default: '""',
        required: false,
        description: "Optional metric unit label displayed beside the rolling value.",
      },
      {
        name: "onPointSelect",
        type: "(point: TrendDataPoint, index: number) => void",
        default: "undefined",
        required: false,
        description: "Callback fired when a data point along the spline is scrubbed or tapped.",
      },
    ],
    a11yFeatures: [
      "Read-only badges and values declare explicit accessibilityLabel without misleading button roles.",
      "allowFontScaling={false} on slot-based odometer numbers prevents clipping on large text devices.",
      "Accessible touch responder coordinates scrubber location across mobile touch events.",
      "High contrast colors tuned for AA compliance across dark and light palettes.",
    ],
  },
};
