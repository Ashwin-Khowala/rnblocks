"use client";

import React from "react";
import Link from "next/link";
import { Terminal, ArrowRight, Cpu, Layers, ShieldCheck, Zap } from "lucide-react";
import { HeroBackground, HeroWorkbench } from "@/components";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-transparent pt-[90px] pb-14 md:pt-[115px] md:pb-20">
      {/* ── Silicon Bus Traces & CAD Reticle Engine ── */}
      <HeroBackground />

      <div className="container-main relative z-10">
        {/* ── Asymmetric Top Command Deck ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 md:mb-14">
          {/* Left Column (7 cols): Headline, Technical Positioning & CTA Deck */}
          <div className="lg:col-span-7 text-left">
            {/* Top Announcement Badge (Industrial HUD Tag - Optimized for Mobile & Desktop) */}
            <Link
              href="/docs/getting-started"
              className="group mb-3 sm:mb-4 inline-flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 rounded-[4px] border border-[#263238] bg-[#0b1012]/90 backdrop-blur-md px-2 xs:px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9.5px] xs:text-[10.5px] sm:text-[11px] font-mono text-[#929da4] transition-all hover:border-[#00f5c8]/40 hover:text-[#f3f6f5] max-w-full"
            >
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-[1px] bg-[#00f5c8] opacity-75" />
                <span className="relative inline-flex rounded-[1px] h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#00f5c8]" />
              </span>
              <span className="text-[#00f5c8] font-bold shrink-0 text-[9px] xs:text-[10px] sm:text-[11px]">[LAB.01]</span>
              <span className="truncate hidden sm:inline">Expo SDK 52 • New Architecture Baseline</span>
              <span className="truncate inline sm:hidden">Expo SDK 52 • New Architecture</span>
              <span className="text-[#718087] group-hover:translate-x-0.5 transition-transform duration-150 shrink-0 text-[10px] sm:text-[11px]">→</span>
            </Link>

            {/* Headline: Engineered UI. Native by Design. */}
            <h1 className="text-[34px] sm:text-[48px] md:text-[58px] lg:text-[66px] font-extrabold leading-[1.02] tracking-tight text-[#f3f6f5] mb-4 text-balance">
              Engineered UI. <br />
              <span className="text-[#00f5c8] font-mono tracking-tight font-black">
                Native by Design.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-[14px] sm:text-[16px] md:text-[17px] leading-[1.6] text-[#929da4] mb-6 max-w-xl text-balance">
              Explore, inspect, and install reusable React Native and Expo components. Own the source. Build without unnecessary dependencies.
            </p>

            {/* Primary Action Deck: Responsive 50/50 Mobile Cockpit Bar -> Desktop Bar */}
            <div className="hero-action-deck">
              <Link
                href="/blocks"
                className="btn-primary font-mono font-bold rounded-[6px] shadow-[0_0_24px_rgba(0,245,200,0.35)]"
              >
                <span className="truncate">EXPLORE 9 UNITS</span>
                <ArrowRight size={13} className="shrink-0" />
              </Link>

              <Link
                href="/docs"
                className="btn-secondary font-mono font-semibold rounded-[6px] hover:border-[#00f5c8]/40 transition-all"
              >
                <Terminal size={13} className="text-[#00f5c8] shrink-0" />
                <span className="truncate">SYSTEM MANUAL</span>
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols): Robotic Engineering Diagnostics Schematic HUD (Desktop only to keep mobile hero punchy) */}
          <div className="hidden lg:block lg:col-span-5 w-full">
            <div className="relative bg-[#0b1012] border border-[#263238] rounded-[8px] p-5 font-mono text-[11.5px] shadow-[0_20px_48px_rgba(0,0,0,0.85)]">
              {/* Corner Reticles */}
              <div className="absolute top-2 left-2 text-[9px] text-[#718087]">┌ SYSTEM.DIAGNOSTICS</div>
              <div className="absolute top-2 right-2 text-[9px] text-[#00f5c8] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] animate-pulse" />
                <span>RUNNING</span> ┐
              </div>

              <div className="pt-5 pb-1 space-y-3">
                <div className="bg-[#101719] border border-[#263238] rounded-[5px] p-3 space-y-2">
                  <div className="flex items-center justify-between text-[#718087] text-[10px] border-b border-[#263238] pb-1.5">
                    <span>SUBSYSTEM</span>
                    <span>METRIC STATUS</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#929da4] flex items-center gap-2">
                      <Cpu size={12} className="text-[#00f5c8]" />
                      <span>RUNTIME OVERHEAD</span>
                    </span>
                    <span className="text-[#00f5c8] font-bold">0.00 KB</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#929da4] flex items-center gap-2">
                      <Zap size={12} className="text-[#00d9ff]" />
                      <span>TARGET FRAMERATE</span>
                    </span>
                    <span className="text-[#00d9ff] font-bold">60–120 FPS</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#929da4] flex items-center gap-2">
                      <Layers size={12} className="text-[#00f5c8]" />
                      <span>CODE DELIVERY</span>
                    </span>
                    <span className="text-[#f3f6f5] font-semibold">DIRECT COPY</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#929da4] flex items-center gap-2">
                      <ShieldCheck size={12} className="text-[#00d9ff]" />
                      <span>UPSTREAM SAFETY</span>
                    </span>
                    <span className="text-[#00d9ff] font-bold">LOCK-IN FREE</span>
                  </div>
                </div>

                {/* Animated Bus Trace Status */}
                <div className="bg-[#07090b] border border-[#263238] rounded-[5px] p-2.5 flex items-center justify-between text-[10.5px]">
                  <span className="text-[#718087]">DISPATCH TARGET:</span>
                  <span className="text-[#00f5c8] font-bold">@/components/</span>
                </div>
              </div>

              <div className="mt-2 text-[9px] text-[#718087] flex items-center justify-between">
                <span>└ PROTOCOL: SHADCN_FOR_REACT_NATIVE</span>
                <span>VER: 0.1.6 ┘</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Living Centerpiece: Dedicated Modular Split Workbench (Wide Layout) ── */}
      <div className="w-full max-w-[1380px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        <HeroWorkbench />
      </div>
    </section>
  );
}
