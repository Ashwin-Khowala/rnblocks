"use client";

import React, { useState } from "react";
import { BLOCKS_DATA } from "@/data/blocks";
import { CadCornerScale } from "./CadCornerScale";

function AppleIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.56-.69.95-1.64.84-2.6-.82.04-1.83.56-2.41 1.24-.52.59-.97 1.57-.85 2.5.92.07 1.86-.48 2.42-1.14z" />
    </svg>
  );
}

function AndroidIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 2.23 12.95 2 12 2c-.96 0-1.86.23-2.66.63L7.85 1.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.3C6.73 4.2 5.5 5.95 5.25 8h13.5c-.25-2.05-1.48-3.8-3.22-4.84zM9 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  );
}

interface ComponentPreset {
  slug: string;
  name: string;
  label: string;
  accent: string;
  category: string;
  codeLines: string[];
}

const BENCH_PRESETS: ComponentPreset[] = [
  {
    slug: "trend-chart",
    name: "TrendChart.tsx",
    label: "01.TREND",
    accent: "#00f5c8",
    category: "ANALYTICS",
    codeLines: [
      'import React, { useState } from "react";',
      'import { SafeAreaView, View, Text } from "react-native";',
      'import { TrendChart } from "@/registry/blocks/trend-chart";',
      "",
      "export default function ActivityScreen() {",
      "  const [point, setPoint] = useState<any>(null);",
      "",
      "  return (",
      "    <SafeAreaView style={styles.container}>",
      "      <View style={styles.header}>",
      '        <Text style={styles.title}>Welcome to your</Text>',
      '        <Text style={styles.accent}>Application</Text>',
      "      </View>",
      "",
      "      <TrendChart",
      "        data={ACTIVITY_DATA}",
      "        height={210}",
      '        accentColor="#00f5c8"',
      '        theme="dark"',
      "        enableScrubbing",
      "        onScrub={(p) => setPoint(p)}",
      "      />",
      "    </SafeAreaView>",
      "  );",
      "}",
    ],
  },
  {
    slug: "bar-chart",
    name: "BarChart.tsx",
    label: "02.BARS",
    accent: "#00d9ff",
    category: "TELEMETRY",
    codeLines: [
      'import React, { useState } from "react";',
      'import { SafeAreaView, View, Text } from "react-native";',
      'import { BarChart } from "@/registry/blocks/bar-chart";',
      "",
      "export default function MetricsScreen() {",
      "  return (",
      "    <SafeAreaView style={styles.container}>",
      "      <View style={styles.header}>",
      '        <Text style={styles.title}>Throughput Rate</Text>',
      '        <Text style={styles.accent}>Diagnostics</Text>',
      "      </View>",
      "",
      "      <BarChart",
      "        data={VOLUME_DATA}",
      "        height={210}",
      '        accentColor="#00d9ff"',
      '        theme="dark"',
      "        enableScrubbing",
      "      />",
      "    </SafeAreaView>",
      "  );",
      "}",
    ],
  },
  {
    slug: "donut-chart",
    name: "DonutChart.tsx",
    label: "03.RADIAL",
    accent: "#818cf8",
    category: "STORAGE",
    codeLines: [
      'import React from "react";',
      'import { SafeAreaView, View, Text } from "react-native";',
      'import { DonutChart } from "@/registry/blocks/donut-chart";',
      "",
      "export default function CapacityScreen() {",
      "  return (",
      "    <SafeAreaView style={styles.container}>",
      "      <View style={styles.header}>",
      '        <Text style={styles.title}>Memory Array</Text>',
      '        <Text style={styles.accent}>Allocation</Text>',
      "      </View>",
      "",
      "      <DonutChart",
      "        value={74}",
      "        total={100}",
      '        accentColor="#818cf8"',
      '        theme="dark"',
      "      />",
      "    </SafeAreaView>",
      "  );",
      "}",
    ],
  },
  {
    slug: "floating-docker",
    name: "FloatingDocker.tsx",
    label: "04.NAV",
    accent: "#f59e0b",
    category: "SURFACES",
    codeLines: [
      'import React from "react";',
      'import { SafeAreaView, View, Text } from "react-native";',
      'import { FloatingDocker } from "@/registry/blocks/floating-docker";',
      "",
      "export default function ShellScreen() {",
      "  return (",
      "    <SafeAreaView style={styles.container}>",
      "      <View style={styles.header}>",
      '        <Text style={styles.title}>Gesture Dock</Text>',
      '        <Text style={styles.accent}>Docking Array</Text>',
      "      </View>",
      "",
      "      <FloatingDocker",
      '        theme="dark"',
      '        accentColor="#f59e0b"',
      "      />",
      "    </SafeAreaView>",
      "  );",
      "}",
    ],
  },
];

interface Token {
  text: string;
  className: string;
}

function tokenizeLine(line: string): Token[] {
  if (!line) return [{ text: " ", className: "text-[#718087]" }];
  if (line.trim().startsWith("//")) {
    return [{ text: line, className: "text-[#718087] italic" }];
  }

  const regex =
    /(".*?"|'.*?'|`.*?`|\b(?:export|default|function|return|const|useState|import|from|null|true|false)\b|<\/?[A-Z]\w*|\/>|>|\b(?:style|data|height|color|accentColor|theme|strokeWidth|enableScrubbing|onScrub|value|total)\b|\b(?:SafeAreaView|View|Text|TrendChart|BarChart|DonutChart|FloatingDocker|styles)\b|\b\d+(?:\.\d+)?\b|[{}()<>=,;:])/g;

  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        text: line.slice(lastIndex, match.index),
        className: "text-[#929da4]",
      });
    }

    const val = match[0];
    let cls = "text-[#f3f6f5]";

    if (val.startsWith('"') || val.startsWith("'") || val.startsWith("`")) {
      cls = "text-[#00f5c8]";
    } else if (
      /^(?:export|default|function|return|const|useState|import|from)$/.test(val)
    ) {
      cls = "text-[#c084fc]";
    } else if (val.startsWith("<") || val === "/>" || val === ">") {
      cls = "text-[#00d9ff]";
    } else if (
      /^(?:style|data|height|color|accentColor|theme|strokeWidth|enableScrubbing|onScrub|value|total)$/.test(
        val
      )
    ) {
      cls = "text-[#fbbf24]";
    } else if (/^(?:SafeAreaView|View|Text|TrendChart|BarChart|DonutChart|FloatingDocker|styles)$/.test(val)) {
      cls = "text-[#38bdf8]";
    } else if (/^\d+(?:\.\d+)?$/.test(val)) {
      cls = "text-[#fb923c]";
    } else if (/^[{}()<>=,;:]$/.test(val)) {
      cls = "text-[#929da4]";
    }

    tokens.push({ text: val, className: cls });
    lastIndex = match.index + val.length;
  }

  if (lastIndex < line.length) {
    tokens.push({
      text: line.slice(lastIndex),
      className: "text-[#f3f6f5]",
    });
  }

  return tokens;
}

function getMobileSnippetLines(preset: ComponentPreset): string[] {
  const startIdx = preset.codeLines.findIndex((line) =>
    line.trim().startsWith("export default function")
  );
  if (startIdx === -1) return preset.codeLines.slice(0, 9);
  return preset.codeLines.slice(startIdx, startIdx + 9);
}

export function HeroWorkbench() {
  const [activeSlug, setActiveSlug] = useState<string>("trend-chart");
  const [platform, setPlatform] = useState<"android" | "ios">("android");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const currentPreset =
    BENCH_PRESETS.find((p) => p.slug === activeSlug) || BENCH_PRESETS[0];
  const mobileSnippetLines = getMobileSnippetLines(currentPreset);

  const activeBlock =
    BLOCKS_DATA.find((b) => b.slug === activeSlug) || BLOCKS_DATA[0];
  const ActiveComponent = activeBlock?.Component || (() => null);

  return (
    <div className="relative w-full max-w-[1400px] 2xl:max-w-[1440px] mx-auto select-none">
      {/* ── Chromatic Ambient Reactive Backlight ── */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[900px] md:w-[1240px] h-[360px] blur-[60px] pointer-events-none z-0 transition-all duration-500 opacity-60"
        style={{
          background: `radial-gradient(ellipse at center, ${currentPreset.accent}33 0%, rgba(0, 217, 255, 0.08) 45%, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* ── Main Robotic Workbench Container ── */}
      <div
        className="relative z-10 w-full bg-[#0b1012] border-t border-x border-b-0 border-[#263238] rounded-t-[10px] overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.95),0_0_0_1px_rgba(0,245,200,0.06)]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black calc(100% - 220px), rgba(0,0,0,0.6) calc(100% - 110px), transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black calc(100% - 220px), rgba(0,0,0,0.6) calc(100% - 110px), transparent 100%)",
        }}
      >
        {/* CAD Corner Calipers (Hidden on mobile to prevent tab collision) */}
        <CadCornerScale position="top-left" label="CHAMBER.01" className="hidden sm:flex" />

        {/* ── 1. Workbench Command Toolbar ── */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 bg-[#07090b] border-b border-[#263238] gap-2 sm:gap-2.5">
          {/* Left: Component Unit Tabs with Horizontal Scroll Rail */}
          <div className="min-w-0 flex-1 overflow-x-auto no-scrollbar scroll-smooth touch-pan-x">
            <div className="flex items-center gap-1.5 w-max pr-2">
              <span className="font-mono text-[9px] text-[#718087] tracking-wider pr-1 hidden xl:inline-block">
                UNITS:
              </span>
              {BENCH_PRESETS.map((preset) => {
                const isActive = activeSlug === preset.slug;
                return (
                  <button
                    key={preset.slug}
                    onClick={() => setActiveSlug(preset.slug)}
                    className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] font-mono text-[11px] transition-all cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? "bg-[#151d20] text-[#f3f6f5] border-[#00f5c8]/50 shadow-[0_0_12px_rgba(0,245,200,0.15)] font-semibold"
                        : "bg-[#101719]/60 text-[#929da4] border-transparent hover:text-[#f3f6f5] hover:bg-[#151d20]"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-[1px]"
                      style={{ backgroundColor: preset.accent }}
                    />
                    <span>{preset.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Theme Switcher + Platform Switcher (Desktop) */}
          <div className="flex items-center justify-end gap-2 shrink-0">
            {/* Theme Toggle (OLED Dark vs Paper Light) */}
            <div className="flex items-center bg-[#101719] border border-[#263238] rounded-[5px] p-0.5">
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`px-2 py-0.5 rounded-[3px] font-mono text-[10.5px] transition-all cursor-pointer ${
                  theme === "dark"
                    ? "bg-[#1b262c] text-[#00f5c8] font-bold shadow-sm"
                    : "text-[#718087] hover:text-[#f3f6f5]"
                }`}
                title="OLED Dark Mode"
              >
                DARK
              </button>
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`px-2 py-0.5 rounded-[3px] font-mono text-[10.5px] transition-all cursor-pointer ${
                  theme === "light"
                    ? "bg-[#1b262c] text-[#00d9ff] font-bold shadow-sm"
                    : "text-[#718087] hover:text-[#f3f6f5]"
                }`}
                title="Paper Light Mode"
              >
                LIGHT
              </button>
            </div>

            {/* Apple & Android Platform Switcher (Desktop Toolbar) */}
            <div className="hidden lg:flex items-center bg-[#101719] border border-[#263238] rounded-[5px] p-0.5">
              <button
                type="button"
                onClick={() => setPlatform("ios")}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] text-[11px] font-mono transition-all cursor-pointer ${
                  platform === "ios"
                    ? "bg-[#1b262c] text-[#f3f6f5] font-semibold"
                    : "text-[#718087] hover:text-[#f3f6f5]"
                }`}
                title="iOS (Dynamic Island)"
              >
                <AppleIcon />
                <span>iOS</span>
              </button>
              <button
                type="button"
                onClick={() => setPlatform("android")}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] text-[11px] font-mono transition-all cursor-pointer ${
                  platform === "android"
                    ? "bg-[#00f5c8]/15 text-[#00f5c8] font-semibold border border-[#00f5c8]/30 shadow-sm"
                    : "text-[#718087] hover:text-[#f3f6f5]"
                }`}
                title="Android (Punch-Hole)"
              >
                <AndroidIcon />
                <span>Android</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── 2A. Desktop Split Stage Body (7-5 Split, >= 1024px) ── */}
        <div className="hidden lg:grid grid-cols-12 bg-[#07090b]">
          {/* Left Side: Source Inspector (7 cols on lg) */}
          <div className="lg:col-span-7 relative flex flex-col border-r border-[#263238] bg-[#07090b] font-mono text-left p-6 pb-20 select-text overflow-hidden">
            {/* Corner Caliper */}
            <CadCornerScale position="top-right" label={currentPreset.name.toUpperCase()} />

            <div className="flex flex-col">
              {currentPreset.codeLines.map((line, idx) => {
                const tokens = tokenizeLine(line);
                return (
                  <div
                    key={idx}
                    className="flex hover:bg-[#151d20]/50 transition-colors py-[2px]"
                  >
                    <span className="w-8 shrink-0 text-right pr-3.5 text-[11px] text-[#718087] font-mono select-none border-r border-[#263238]">
                      {idx + 1}
                    </span>
                    <span className="flex-1 pl-3.5 text-[12.5px] leading-[1.65] whitespace-pre">
                      {tokens.map((tok, ti) => (
                        <span key={ti} className={tok.className}>
                          {tok.text}
                        </span>
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Robotic Simulator Canvas (5 cols on lg) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center px-6 pt-8 pb-20 bg-[#0b1012] overflow-hidden">
            {/* Ambient Radial Backlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 transition-colors duration-500"
              style={{
                background: `radial-gradient(circle at center, ${currentPreset.accent}25 0%, rgba(0, 217, 255, 0.05) 40%, transparent 70%)`,
              }}
              aria-hidden="true"
            />
            {/* Micro-dot CAD Grid Overlay */}
            <div
              className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"
              aria-hidden="true"
            />

            <CadCornerScale position="top-right" label="SIM.CANVAS" />

            {/* Mobile Simulator Frame */}
            <div
              className={`relative w-full max-w-[360px] border-t-[3px] border-x-[3px] border-b-0 border-[#263238] rounded-t-[36px] overflow-hidden shadow-[0_24px_64px_-12px_rgba(0,0,0,0.98),0_0_0_1px_rgba(0,245,200,0.12)] transition-colors duration-300 ${
                theme === "dark" ? "bg-[#0b0c12]" : "bg-[#ffffff]"
              }`}
            >
              {/* Millimeter-Accurate Mobile Status Bar */}
              <div
                className={`flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-mono select-none ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                <span className="font-bold tracking-tight">9:41</span>

                {/* Hardware Cutout */}
                <div className="flex items-center justify-center">
                  {platform === "ios" ? (
                    <div className="w-[84px] h-[22px] bg-black rounded-full ring-1 ring-white/10" />
                  ) : (
                    <div className="w-4 h-4 bg-black rounded-full ring-1 ring-white/10" />
                  )}
                </div>

                {/* Cellular / Wi-Fi / Battery Glyph */}
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span className="font-mono text-[9px] tracking-tighter">5G</span>
                  <div
                    className={`w-4 h-2 rounded-[2px] border ${
                      theme === "dark" ? "border-white/80" : "border-black/80"
                    } p-[1px] flex items-center`}
                  >
                    <div
                      className={`h-full w-[70%] rounded-[1px] ${
                        theme === "dark" ? "bg-white" : "bg-black"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Screen Stage */}
              <div className="px-5 pt-3 pb-8 flex flex-col text-left select-none">
                <div className="mb-3.5">
                  <h3
                    className={`text-[22px] font-extrabold leading-[1.12] tracking-tight ${
                      theme === "dark" ? "text-[#f3f6f5]" : "text-[#07090b]"
                    }`}
                  >
                    Welcome to your <br />
                    <span style={{ color: currentPreset.accent }}>Application</span>
                  </h3>
                </div>

                {/* Real Live Component */}
                <div className="w-full">
                  <ActiveComponent
                    key={`${activeSlug}-${platform}-${theme}-desktop`}
                    {...({
                      theme: theme,
                      accentColor: currentPreset.accent,
                      showLiveBadge: false,
                    } as any)}
                  />
                </div>
              </div>

              {/* Bottom Home Indicator */}
              <div className="flex justify-center pb-2 pt-1">
                <div
                  className={`w-32 h-1 rounded-full ${
                    theme === "dark" ? "bg-white/20" : "bg-black/20"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── 2B. Mobile Stacked View (< 1024px): Code Peek + Floating Switcher Pill + Curved Simulator ── */}
        <div className="flex lg:hidden flex-col items-center w-full bg-[#07090b] px-3 pt-5 pb-20 overflow-hidden relative">
          {/* Ambient Reactive Radial Backlight on Mobile */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 transition-colors duration-500"
            style={{
              background: `radial-gradient(circle at center, ${currentPreset.accent}20 0%, transparent 70%)`,
            }}
            aria-hidden="true"
          />
          {/* Micro-dot CAD Grid Background */}
          <div
            className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Upper Code Peek Container (with gradient fade at bottom) */}
          <div className="relative w-full max-w-[340px] xs:max-w-[360px] overflow-hidden select-text">
            <div className="font-mono text-[11px] xs:text-[11.5px] leading-[1.65] text-left pb-6">
              {mobileSnippetLines.map((line, idx) => {
                const tokens = tokenizeLine(line);
                return (
                  <div key={idx} className="whitespace-pre">
                    {tokens.map((tok, ti) => (
                      <span key={ti} className={tok.className}>
                        {tok.text}
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Downward Gradient Fade Mask right above the phone */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#07090b] via-[#07090b]/90 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Floating Switcher Pill: Centered directly at the seam straddling the phone rim */}
          <div className="relative -mb-3.5 z-30 flex items-center justify-center">
            <div className="inline-flex items-center gap-1 bg-[#0b1012] border border-[#263238] rounded-full p-1 shadow-[0_8px_24px_rgba(0,0,0,0.9),0_0_12px_rgba(0,245,200,0.15)]">
              <button
                type="button"
                onClick={() => setPlatform("ios")}
                className={`flex items-center justify-center w-7 h-7 rounded-full transition-all cursor-pointer ${
                  platform === "ios"
                    ? "bg-[#222a2e] text-white shadow-sm"
                    : "text-[#718087] hover:text-[#f3f6f5]"
                }`}
                title="iOS (Dynamic Island)"
                aria-label="Switch to iOS preview"
              >
                <AppleIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setPlatform("android")}
                className={`flex items-center justify-center w-7 h-7 rounded-full transition-all cursor-pointer ${
                  platform === "android"
                    ? "bg-[#00f5c8]/20 text-[#00f5c8] shadow-sm"
                    : "text-[#718087] hover:text-[#f3f6f5]"
                }`}
                title="Android (Punch-Hole)"
                aria-label="Switch to Android preview"
              >
                <AndroidIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Lower Mobile Phone Simulator Frame with Curved Top */}
          <div
            className={`relative w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[360px] border-t-[3px] border-x-[3px] border-b-0 border-[#263238] rounded-t-[34px] sm:rounded-t-[38px] overflow-hidden shadow-[0_24px_64px_-12px_rgba(0,0,0,0.98),0_0_0_1px_rgba(0,245,200,0.12)] transition-colors duration-300 ${
              theme === "dark" ? "bg-[#0b0c12]" : "bg-[#ffffff]"
            }`}
          >
            {/* Mobile Hardware Status Bar */}
            <div
              className={`flex items-center justify-between px-4 sm:px-6 pt-3 pb-1 text-[11px] font-mono select-none ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <span className="font-bold tracking-tight">9:41</span>

              {/* Hardware Cutout: iOS Dynamic Island or Android Punch Hole */}
              <div className="flex items-center justify-center">
                {platform === "ios" ? (
                  <div className="w-[84px] h-[22px] bg-black rounded-full ring-1 ring-white/10" />
                ) : (
                  <div className="w-4 h-4 bg-black rounded-full ring-1 ring-white/10" />
                )}
              </div>

              {/* Cellular / Wi-Fi / Battery Glyphs */}
              <div className="flex items-center gap-1.5 text-[10px]">
                <span className="font-mono text-[9px] tracking-tighter">5G</span>
                <div
                  className={`w-4 h-2 rounded-[2px] border ${
                    theme === "dark" ? "border-white/80" : "border-black/80"
                  } p-[1px] flex items-center`}
                >
                  <div
                    className={`h-full w-[70%] rounded-[1px] ${
                      theme === "dark" ? "bg-white" : "bg-black"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Screen Title & Live Component */}
            <div className="px-3.5 sm:px-5 pt-3 pb-6 flex flex-col text-left select-none">
              <div className="mb-3">
                <h3
                  className={`text-[20px] sm:text-[22px] font-extrabold leading-[1.12] tracking-tight ${
                    theme === "dark" ? "text-[#f3f6f5]" : "text-[#07090b]"
                  }`}
                >
                  Welcome to your <br />
                  <span style={{ color: currentPreset.accent }}>Application</span>
                </h3>
              </div>

              {/* Real Live Component */}
              <div className="w-full">
                <ActiveComponent
                  key={`${activeSlug}-${platform}-${theme}-mobile`}
                  {...({
                    theme: theme,
                    accentColor: currentPreset.accent,
                    showLiveBadge: false,
                  } as any)}
                />
              </div>
            </div>

            {/* Home Indicator Bar */}
            <div className="flex justify-center pb-2 pt-1">
              <div
                className={`w-32 h-1 rounded-full ${
                  theme === "dark" ? "bg-white/20" : "bg-black/20"
                }`}
              />
            </div>
          </div>
        </div>

        {/* ── Seamless Multi-Stop Bottom Gradient Fade Overlay ── */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 sm:h-64 bg-gradient-to-t from-[#07090b] from-15% via-[#07090b]/90 via-45% via-[#07090b]/40 via-72% to-transparent z-30"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
