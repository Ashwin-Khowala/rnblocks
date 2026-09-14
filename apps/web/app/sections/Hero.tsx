"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { NextIcon } from "@/components/icons";
import { BLOCKS_DATA } from "@/data/blocks";

export function Hero() {
  const [pm, setPm] = useState<"npx" | "pnpm" | "bun">("npx");
  const [spotlightTab, setSpotlightTab] = useState("team");

  const dockerItem = BLOCKS_DATA.find((b) => b.slug === "floating-docker");
  const DockerComponent = dockerItem?.Component || (() => null);

  const cliCommands = {
    npx: "npx rnblocks add floating-docker",
    pnpm: "pnpm dlx rnblocks add floating-docker",
    bun: "bunx rnblocks add floating-docker",
  };

  return (
    <section className="relative overflow-hidden bg-[#070709] pt-[116px] pb-11 md:pt-[136px] md:pb-[108px]">
      {/* Continuous Ambient Glow (never clips on viewport edges) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(50, 199, 152, 0.09) 0%, transparent 80%), radial-gradient(ellipse 40% 60% at 75% 45%, rgba(99, 102, 241, 0.07) 0%, transparent 65%), radial-gradient(ellipse 40% 60% at 25% 45%, rgba(50, 199, 152, 0.06) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade transition */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[140px] bg-gradient-to-b from-transparent to-[#070709]"
        aria-hidden="true"
      />

      <div className="container-main relative z-20 grid grid-cols-1 items-center gap-6 md:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left Column: Headline, Description, CTAs, and CLI */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Main Title */}
          <h1 className="max-w-[440px] md:max-w-[640px] text-[35px] sm:text-[40px] md:text-[52px] lg:text-[64px] font-extrabold leading-[1.08] tracking-[-1px] md:tracking-[-2px] text-white text-balance mb-3.5 md:mb-5">
            UI blocks for{" "}
            <span className="font-editorial italic font-normal text-white pl-1">
              React Native.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-[320px] md:max-w-[520px] text-[13.5px] md:text-[16.5px] leading-[1.5] md:leading-[1.6] text-[#9ca3af] mb-5 md:mb-7">
            <span className="inline md:hidden">
              Open source copy-paste blocks. Zero dependencies.
            </span>
            <span className="hidden md:inline">
              Explore live previews, copy clean source code, or install directly into your codebase. Zero runtime dependencies and full New Architecture support.
            </span>
          </p>

          {/* Actions */}
          <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3.5 w-full md:w-auto mb-5 md:mb-7">
            <Link
              href="/blocks"
              className="btn-primary h-[35px] md:h-auto px-3.5 md:px-[22px] py-0 md:py-[11px] text-[12px] md:text-[14.5px] font-semibold rounded-full md:rounded-[10px] flex-1 max-w-[135px] md:max-w-none md:flex-initial"
            >
              <span>Explore Blocks</span>
              <NextIcon size={14} className="md:w-4 md:h-4" />
            </Link>

            <Link
              href="/docs"
              className="btn-secondary h-[35px] md:h-auto px-3.5 md:px-[22px] py-0 md:py-[11px] text-[12px] md:text-[14.5px] font-semibold rounded-full md:rounded-[10px] flex-1 max-w-[135px] md:max-w-none md:flex-initial"
            >
              <Terminal size={14} />
              <span>Docs</span>
            </Link>
          </div>

          {/* Quick CLI Bar with Package Manager Switcher (Desktop only) */}
          <div className="hidden md:flex flex-col w-full max-w-[460px] bg-[#0d0d10] border border-white/10 rounded-[14px] overflow-hidden shadow-[0_16px_32px_-8px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-1 bg-[#09090c] border-b border-white/[0.06] p-1 px-1.5">
              {(["npx", "pnpm", "bun"] as const).map((tool) => (
                <button
                  key={tool}
                  onClick={() => setPm(tool)}
                  className={`px-3 py-1 text-xs font-mono font-semibold rounded-md transition-colors ${
                    pm === tool
                      ? "text-white bg-white/[0.08]"
                      : "text-[#71717a] hover:text-white"
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between p-2.5 px-3.5 gap-3">
              <div className="flex items-center gap-2.5 font-mono text-[13px]">
                <span className="text-[#32c798] font-bold select-none">$</span>
                <span className="text-[#f3f4f6]">{cliCommands[pm]}</span>
              </div>
              <CopyButton text={cliCommands[pm]} label="Copy" />
            </div>
          </div>
        </div>

        {/* Right Column: Free-Floating Live Docker Component */}
        <div className="flex items-center justify-center w-full">
          <div className="relative w-full max-w-[440px] md:max-w-[540px] flex items-center justify-center">
            {/* Ambient blur glow under docker */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] md:w-[360px] h-[90px] md:h-[140px] bg-[radial-gradient(ellipse_at_center,rgba(50,199,152,0.16)_0%,rgba(99,102,241,0.08)_50%,transparent_75%)] blur-[20px] md:blur-[28px] pointer-events-none z-0"
              aria-hidden="true"
            />
            {/* Live Docker container with responsive scaling */}
            <div className="relative z-10 w-full flex items-center justify-center scale-[0.86] sm:scale-[0.94] md:scale-100 origin-center">
              <DockerComponent
                {...({
                  initialTab: spotlightTab,
                  onTabChange: (tab: string) => setSpotlightTab(tab),
                } as any)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
