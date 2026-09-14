"use client";

import React from "react";
import { Code2, Zap, Box, Sparkles } from "lucide-react";

export function Philosophy() {
  const pillars = [
    {
      icon: Code2,
      title: "100% Code Ownership",
      desc: (
        <>
          Components install straight into your <code className="bg-white/10 px-1 py-0.5 rounded font-mono text-xs text-white">components/</code> folder. Modify styling, swap icons, and tune animation parameters directly in your codebase.
        </>
      ),
    },
    {
      icon: Zap,
      title: "Zero Runtime Baggage",
      desc: "Engineered with standard React Native primitives. No mandatory root ThemeProvider or CSS-in-JS runtime engine required.",
    },
    {
      icon: Box,
      title: "Fluid & Adaptive Layouts",
      desc: "Designed with container-relative dimensions and standard spacing tokens. Never breaks due to arbitrary hardcoded screen width assumptions.",
    },
    {
      icon: Sparkles,
      title: "Native 60-120 FPS Physics",
      desc: "Smooth cubic-bezier animations using React Native's native driver for butter-smooth performance across iOS, Android, and Web.",
    },
  ];

  return (
    <section className="bg-[#070709] border-t border-white/[0.06] py-16 md:py-24">
      <div className="container-main">
        {/* Header Center */}
        <div className="text-center mb-10 md:mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#32c798] block mb-2">
            Engineering Philosophy
          </span>
          <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-extrabold text-white tracking-[-0.4px] md:tracking-[-0.8px] mb-3">
            Built for <span className="font-editorial italic font-normal">developer</span> ownership
          </h2>
          <p className="text-sm md:text-base text-[#9ca3af] max-w-[580px] mx-auto leading-relaxed">
            Eliminate the frustration of bloated npm dependencies, rigid wrappers, and abandoned UI libraries.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-[#0d0d10] border border-white/[0.08] hover:border-[#32c798]/30 rounded-2xl p-4.5 sm:p-6 md:p-7 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(50,199,152,0.15),0_14px_30px_-8px_rgba(0,0,0,0.65)]"
              >
                <div className="w-10 h-10 md:w-[42px] md:h-[42px] rounded-[10px] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#32c798] mb-1">
                  <Icon size={20} />
                </div>
                <h3 className="text-[15.5px] md:text-[17px] font-bold text-white tracking-[-0.2px]">
                  {pillar.title}
                </h3>
                <p className="text-[12.5px] md:text-[13.5px] leading-[1.4] md:leading-[1.55] text-[#9ca3af]">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
