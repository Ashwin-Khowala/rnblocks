"use client";

import React from "react";
import Link from "next/link";
import { Terminal, ArrowRight } from "lucide-react";
import { HeroBackground, HeroWorkbench } from "@/components";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-transparent pt-[100px] pb-14 md:pt-[124px] md:pb-20">
      {/* ── Silicon Bus Traces & CAD Reticle Engine ── */}
      <HeroBackground />

      <div className="container-main relative z-10 flex flex-col items-center text-center">
        {/* ── Top Announcement Badge (No Pill) ── */}
        <Link
          href="/docs/getting-started"
          className="group mb-4 inline-flex items-center gap-2 rounded-[6px] border border-white/[0.08] bg-[#0c0d12]/90 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-[#a1a1aa] transition-all hover:border-white/20 hover:text-white shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-[1px] bg-[#32c798] opacity-75" />
            <span className="relative inline-flex rounded-[1px] h-2 w-2 bg-[#32c798]" />
          </span>
          <span>Expo SDK 52 • New Architecture Baseline</span>
          <span className="text-[#71717a] group-hover:translate-x-0.5 transition-transform duration-150">→</span>
        </Link>

        {/* ── Headline ── */}
        <h1 className="max-w-4xl text-[36px] sm:text-[48px] md:text-[62px] lg:text-[72px] font-extrabold leading-[1.05] tracking-[-1.5px] md:tracking-[-2.5px] text-white text-balance mb-3.5">
          The UI component registry for{" "}
          <span className="font-editorial italic font-normal text-white">
            React Native.
          </span>
        </h1>

        {/* ── Subtitle (Concise) ── */}
        <p className="max-w-xl text-[14.5px] sm:text-[16px] md:text-[17px] leading-[1.5] text-[#9ca3af] mb-6 text-balance">
          Zero-dependency, copy-paste blocks for Expo and React Native. Pure TypeScript, 60 FPS native motion.
        </p>

        {/* ── Value Props Strip (Concise, No Pills) ── */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11.5px] font-mono text-[#a1a1aa] mb-7">
          <span className="flex items-center gap-1.5 text-white/90">
            <span className="w-1.5 h-1.5 bg-[#32c798] rounded-[1px]" /> Zero Lock-in
          </span>
          <span className="text-[#3f3f46]">•</span>
          <span className="flex items-center gap-1.5 text-white/90">
            <span className="w-1.5 h-1.5 bg-[#32c798] rounded-[1px]" /> Pure StyleSheet & SVG
          </span>
          <span className="text-[#3f3f46]">•</span>
          <span className="flex items-center gap-1.5 text-white/90">
            <span className="w-1.5 h-1.5 bg-[#32c798] rounded-[1px]" /> iOS • Android • Web
          </span>
          <span className="text-[#3f3f46]">•</span>
          <span className="flex items-center gap-1.5 text-white/90">
            <span className="w-1.5 h-1.5 bg-[#32c798] rounded-[1px]" /> Strict TypeScript
          </span>
        </div>

        {/* ── Primary Action CTAs ── */}
        <div className="flex items-center justify-center gap-3 w-full sm:w-auto mb-10">
          <Link
            href="/blocks"
            className="btn-primary min-h-[44px] px-6 py-2 text-[14px] font-semibold rounded-[8px] shadow-[0_8px_20px_-4px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_28px_-6px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2"
          >
            <span>Explore 9 Components</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href="/docs"
            className="btn-secondary min-h-[44px] px-6 py-2 text-[14px] font-semibold rounded-[8px] hover:border-white/25 transition-all flex items-center gap-2"
          >
            <Terminal size={14} className="text-[#9ca3af]" />
            <span>Documentation</span>
          </Link>
        </div>
      </div>

      {/* ── Living Centerpiece: Dedicated Modular Split Workbench (Wide Layout) ── */}
      <div className="w-full max-w-[1380px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        <HeroWorkbench />
      </div>
    </section>
  );
}
