"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CopyButton } from "./CopyButton";
import { BLOCKS_DATA } from "@/data/blocks";
import { CadCornerScale } from "./CadCornerScale";

function AppleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.56-.69.95-1.64.84-2.6-.82.04-1.83.56-2.41 1.24-.52.59-.97 1.57-.85 2.5.92.07 1.86-.48 2.42-1.14z" />
    </svg>
  );
}

function AndroidIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 2.23 12.95 2 12 2c-.96 0-1.86.23-2.66.63L7.85 1.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.3C6.73 4.2 5.5 5.95 5.25 8h13.5c-.25-2.05-1.48-3.8-3.22-4.84zM9 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  );
}

interface Token {
  text: string;
  className: string;
}

function tokenizeLine(line: string): Token[] {
  if (!line) return [{ text: " ", className: "text-zinc-500" }];
  if (line.trim().startsWith("//")) {
    return [{ text: line, className: "text-[#6b7280] italic" }];
  }

  const regex =
    /(".*?"|'.*?'|`.*?`|\b(?:export|default|function|return|const|useState|import|from|null|true|false)\b|<\/?[A-Z]\w*|\/>|>|\b(?:style|data|height|color|strokeWidth|enableScrubbing|onScrub)\b|\b(?:SafeAreaView|View|Text|TrendChart|styles)\b|\b\d+(?:\.\d+)?\b|[{}()<>=,;:])/g;

  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        text: line.slice(lastIndex, match.index),
        className: "text-[#d1d5db]",
      });
    }

    const val = match[0];
    let cls = "text-[#f1f5f9]";

    if (val.startsWith('"') || val.startsWith("'") || val.startsWith("`")) {
      cls = "text-[#34d399]";
    } else if (
      /^(?:export|default|function|return|const|useState|import|from)$/.test(val)
    ) {
      cls = "text-[#d8b4fe]";
    } else if (val.startsWith("<") || val === "/>" || val === ">") {
      cls = "text-[#60a5fa]";
    } else if (
      /^(?:style|data|height|color|strokeWidth|enableScrubbing|onScrub)$/.test(
        val
      )
    ) {
      cls = "text-[#fcd34d]";
    } else if (/^(?:SafeAreaView|View|Text|TrendChart|styles)$/.test(val)) {
      cls = "text-[#38bdf8]";
    } else if (/^\d+(?:\.\d+)?$/.test(val)) {
      cls = "text-[#fb923c]";
    } else if (/^[{}()<>=,;:]$/.test(val)) {
      cls = "text-[#cbd5e1]";
    }

    tokens.push({ text: val, className: cls });
    lastIndex = match.index + val.length;
  }

  if (lastIndex < line.length) {
    tokens.push({
      text: line.slice(lastIndex),
      className: "text-[#f1f5f9]",
    });
  }

  return tokens;
}

const HERO_CODE_LINES = [
  'import React, { useState } from "react";',
  'import { SafeAreaView, View, Text } from "react-native";',
  'import { TrendChart } from "@/registry/blocks/trend-chart";',
  "",
  "export default function WelcomeAppScreen() {",
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
  '        color="#32c798"',
  "        enableScrubbing",
  "        onScrub={(p) => setPoint(p)}",
  "      />",
  "    </SafeAreaView>",
  "  );",
  "}",
];

export function HeroWorkbench() {
  const [platform, setPlatform] = useState<"android" | "ios">("android");
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [pm, setPm] = useState<"npx" | "pnpm" | "bun">("npx");

  const trendBlock =
    BLOCKS_DATA.find((b) => b.slug === "trend-chart") || BLOCKS_DATA[0];
  const ActiveComponent = trendBlock?.Component || (() => null);

  const getCliCommand = (tool: "npx" | "pnpm" | "bun") => {
    switch (tool) {
      case "pnpm":
        return `pnpm dlx @rnblocks/cli add trend-chart`;
      case "bun":
        return `bunx @rnblocks/cli add trend-chart`;
      default:
        return `npx @rnblocks/cli add trend-chart`;
    }
  };

  const activeCommand = getCliCommand(pm);

  return (
    <div className="relative w-full max-w-[1380px] 2xl:max-w-[1440px] mx-auto px-2 sm:px-4">
      {/* Ambient Radial Spotlight */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[340px] bg-[radial-gradient(ellipse_at_center,rgba(50,199,152,0.16)_0%,rgba(99,102,241,0.06)_50%,transparent_75%)] blur-[54px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Main Workbench Card */}
      <div className="relative z-10 w-full bg-[#0a0a0f] border border-white/[0.12] rounded-[16px] overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.06)]">
        {/* 1. Workbench Header: Window Controls, File Tab, Platform Selector */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#060608] border-b border-white/[0.08] gap-3">
          {/* Left: Window Controls + File Tab */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#ef4444]/80" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#f59e0b]/80" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10b981]/80" />
            </div>

            <div className="flex items-center gap-2 px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-[4px] text-[11px] font-mono text-[#f3f4f6]">
              <span className="text-[#32c798] font-bold">TSX</span>
              <span>WelcomeAppScreen.tsx</span>
            </div>
          </div>

          {/* Center: Apple & Android Platform Switcher (High Contrast with Badges) */}
          <div className="flex items-center bg-[#0d0e14] border border-white/[0.14] rounded-[8px] p-0.5 shadow-inner">
            <button
              type="button"
              onClick={() => setPlatform("ios")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[11.5px] font-mono transition-all cursor-pointer ${
                platform === "ios"
                  ? "bg-white/[0.18] text-white shadow-sm ring-1 ring-white/20 font-semibold"
                  : "text-[#9ca3af] hover:text-white"
              }`}
              title="iOS Preview (Dynamic Island)"
            >
              <AppleIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">iOS</span>
            </button>
            <button
              type="button"
              onClick={() => setPlatform("android")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[11.5px] font-mono transition-all cursor-pointer ${
                platform === "android"
                  ? "bg-[#32c798]/25 text-[#32c798] ring-1 ring-[#32c798]/50 shadow-sm font-semibold"
                  : "text-[#9ca3af] hover:text-white"
              }`}
              title="Android Preview (Punch-Hole)"
            >
              <AndroidIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Android</span>
            </button>
          </div>

          {/* Right: Mobile View Mode only on small screens (< 1024px) */}
          <div className="flex items-center gap-2">
            <div className="flex lg:hidden items-center bg-[#0d0e14] border border-white/[0.08] rounded-[6px] p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("preview")}
                className={`px-2.5 py-1 rounded-[4px] text-[11px] font-mono transition-all cursor-pointer ${
                  viewMode === "preview"
                    ? "bg-white/[0.14] text-white font-semibold"
                    : "text-[#71717a] hover:text-white"
                }`}
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => setViewMode("code")}
                className={`px-2.5 py-1 rounded-[4px] text-[11px] font-mono transition-all cursor-pointer ${
                  viewMode === "code"
                    ? "bg-white/[0.14] text-white font-semibold"
                    : "text-[#71717a] hover:text-white"
                }`}
              >
                Code
              </button>
            </div>
          </div>
        </div>

        {/* 2. Workbench Body: High-Contrast 7-5 Split (IDE Code + Mobile Simulator) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 bg-[#050608]">
          {/* Left Side: IDE Code Editor (7 cols on lg, non-scrollable, high contrast) */}
          <div
            className={`lg:col-span-7 relative flex-col border-b lg:border-b-0 lg:border-r border-white/[0.1] bg-[#07080d] font-mono text-left p-4 sm:p-6 md:p-7 select-text overflow-hidden ${
              viewMode === "preview" ? "hidden lg:flex" : "flex"
            }`}
            style={{
              maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
            }}
          >
            <CadCornerScale position="top-right" label="SRC.TSX" />

            <div className="flex flex-col">
              {HERO_CODE_LINES.map((line, idx) => {
                const tokens = tokenizeLine(line);
                return (
                  <div
                    key={idx}
                    className="flex hover:bg-white/[0.03] transition-colors py-[2px]"
                  >
                    <span className="w-8 shrink-0 text-right pr-3.5 text-[11px] text-[#71717a] font-mono select-none border-r border-white/[0.1]">
                      {idx + 1}
                    </span>
                    <span className="flex-1 pl-3.5 text-[12px] sm:text-[12.5px] leading-[1.7] whitespace-pre">
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

          {/* Right Side: Mobile Simulator Canvas (5 cols on lg, high-contrast framing) */}
          <div
            className={`lg:col-span-5 relative flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 bg-[#040406] overflow-hidden ${
              viewMode === "code" ? "hidden lg:flex" : "flex"
            }`}
          >
            {/* High-Luminance Ambient Radial Backlighting centered directly behind phone */}
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,199,152,0.22)_0%,rgba(6,182,212,0.08)_35%,transparent_70%)] pointer-events-none"
              aria-hidden="true"
            />
            {/* Micro-dot CAD Grid Overlay */}
            <div
              className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none opacity-60"
              aria-hidden="true"
            />

            {/* CAD Precision Calipers framing the simulator canvas */}
            <CadCornerScale position="top-right" label="SIM.CANVAS" />
            <CadCornerScale position="bottom-left" label="390x844" />

            {/* Authentic Mobile Phone Frame: Reduced width max-w-[390px] with titanium contrast border */}
            <div
              className="relative w-full max-w-[340px] sm:max-w-[370px] md:max-w-[390px] bg-[#0b0c12] border-[4px] border-[#252836] ring-1 ring-white/25 rounded-t-[44px] overflow-hidden shadow-[0_24px_64px_-12px_rgba(0,0,0,0.98),0_0_0_1px_rgba(255,255,255,0.12),0_0_36px_rgba(50,199,152,0.14)]"
              style={{
                maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
              }}
            >
              {/* Exact Cutouts Matching Reference */}
              {platform === "ios" ? (
                /* iOS Dynamic Island: Centered black capsule cutout with subtle edge definition */
                <div className="w-[96px] h-[26px] bg-black rounded-full mx-auto mt-4 mb-4 shadow-sm ring-1 ring-white/[0.12]" />
              ) : (
                /* Android Camera: Centered circular black punch-hole dot */
                <div className="w-5 h-5 bg-black rounded-full mx-auto mt-4 mb-4 shadow-sm ring-1 ring-white/[0.15]" />
              )}

              {/* Mobile Screen Content */}
              <div className="px-5 sm:px-6 pt-1 pb-8 flex flex-col text-left select-none">
                <div className="mb-3.5">
                  <h3 className="text-[24px] sm:text-[26px] font-extrabold text-white leading-[1.14] tracking-tight">
                    Welcome to your <br />
                    <span className="text-[#32c798]">Application</span>
                  </h3>
                </div>

                {/* Live Component Centerpiece (Zero pills) */}
                <div className="w-full">
                  <ActiveComponent
                    key={`hero-trend-${platform}`}
                    {...({
                      theme: "dark",
                      accentColor: "#32c798",
                      showLiveBadge: false,
                    } as any)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Atmosphere Gradient Fade (Subtle, so code and chart remain crisp) */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-[#060608] via-[#060608]/70 to-transparent z-10"
            aria-hidden="true"
          />
        </div>

        {/* 3. Interactive CLI Command Strip & Source Link */}
        <div className="relative z-20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 sm:px-6 py-3.5 bg-[#060608] border-t border-white/[0.08] gap-3">
          {/* Package Manager Selector + Command */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center bg-[#0d0d12] border border-white/[0.08] rounded-[6px] p-0.5 shrink-0">
              {(["npx", "pnpm", "bun"] as const).map((tool) => (
                <button
                  key={tool}
                  onClick={() => setPm(tool)}
                  className={`px-2.5 py-0.5 text-[11px] font-mono transition-colors rounded-[4px] cursor-pointer ${
                    pm === tool
                      ? "bg-white/[0.15] text-white font-semibold"
                      : "text-[#71717a] hover:text-white"
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 font-mono text-[12px] sm:text-[13px] text-[#f3f4f6] truncate min-w-0">
              <span className="text-[#32c798] font-bold select-none">$</span>
              <span className="truncate">{activeCommand}</span>
            </div>
          </div>

          {/* Copy Button & View Details */}
          <div className="flex items-center justify-end gap-2.5 shrink-0">
            <CopyButton
              text={activeCommand}
              className="!bg-white/[0.05] !border-white/[0.1] hover:!border-white/[0.25] hover:!bg-white/[0.1] !rounded-[8px] !px-3 !py-1.5 !font-mono !text-[12px] !text-white shadow-sm"
              label="Copy CLI"
            />
            <Link
              href="/blocks/trend-chart"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12px] font-mono text-[#a1a1aa] hover:text-white hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/[0.08]"
            >
              <span>Inspect Code</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Global Bottom Fade (Entire Hero Showcase fades out smoothly at the bottom into the next section) */}
      <div
        className="pointer-events-none absolute -bottom-10 left-0 right-0 h-36 sm:h-48 bg-gradient-to-t from-[#070709] via-[#070709]/90 to-transparent z-20"
        aria-hidden="true"
      />
    </div>
  );
}
