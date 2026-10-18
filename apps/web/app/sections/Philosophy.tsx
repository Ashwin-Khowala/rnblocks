"use client";

import React from "react";
import { Check, X, ShieldAlert, ShieldCheck } from "lucide-react";
import { CadCornerScale, PhilosophyBackground, ScrollReveal } from "@/components";

export function Philosophy() {
  const comparison = [
    {
      feature: "Code Delivery",
      monolith: "npm package trapped inside node_modules",
      rnblocks: "Direct copy into your components/ directory",
    },
    {
      feature: "Runtime Overhead",
      monolith: "Heavy ThemeProvider & CSS-in-JS interpreter",
      rnblocks: "Zero extra runtime weight — pure StyleSheet",
    },
    {
      feature: "Upgrade Safety",
      monolith: "Breaks on Expo / React Native version bumps",
      rnblocks: "Immune to upstream breaking changes",
    },
    {
      feature: "Customization",
      monolith: "Limited to exposed props & arbitrary theme overrides",
      rnblocks: "100% freedom to modify every line, SVG path & style",
    },
    {
      feature: "Motion Physics",
      monolith: "Unoptimized JS-thread animations that drop frames",
      rnblocks: "Native-driver 60–120 FPS Animated & RAF curves",
    },
  ];

  return (
    <section id="manifesto" className="bg-transparent border-t border-[#263238] py-20 md:py-28 relative overflow-hidden">
      <PhilosophyBackground />
      <div className="container-main max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal showScanline threshold={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#00f5c8] mb-2.5">
              <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] shadow-[0_0_6px_#00f5c8]" />
              <span>// ARCHITECTURAL SCHEMATIC</span>
            </div>
            <h2 className="text-[26px] sm:text-[34px] md:text-[42px] font-extrabold text-[#f3f6f5] tracking-tight">
              Built for <span className="text-[#00f5c8] font-mono font-black">developer</span> ownership
            </h2>
            <p className="mt-2 text-[14px] text-[#929da4] leading-relaxed">
              Stop fighting npm library version locks. Own your UI code directly with clean, copy-paste React Native components.
            </p>
          </div>
        </ScrollReveal>

        {/* Side-by-Side Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Monolithic Library Trap (Warning State) */}
          <ScrollReveal delay={100} threshold={0.08} className="h-full">
            <div className="bg-[#0b1012] border border-[#263238] rounded-[8px] p-6 sm:p-7 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-[#263238]">
                <div className="w-8 h-8 rounded-[4px] bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <ShieldAlert size={16} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#f3f6f5] font-mono">Monolithic Library Trap</h3>
                  <span className="text-[10.5px] font-mono text-[#718087]">npm package dependencies</span>
                </div>
              </div>

              <div className="space-y-4">
                {comparison.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-[13px]">
                    <div className="w-5 h-5 rounded-[2px] bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={12} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="font-mono text-[10.5px] text-[#718087] block uppercase">{item.feature}</span>
                      <span className="text-[#929da4] leading-snug">{item.monolith}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#263238] text-[11px] font-mono text-[#718087] text-center">
              Result: Bloated bundles, upgrade lock-in, and abandoned repos.
            </div>
          </div>
        </ScrollReveal>

        {/* Card 2: The RNBlocks Standard (Success State) */}
        <ScrollReveal delay={200} threshold={0.08} className="h-full">
          <div className="relative bg-[#0b1012] border border-[#00f5c8]/30 rounded-[8px] p-6 sm:p-7 flex flex-col justify-between shadow-[0_20px_48px_-12px_rgba(0,245,200,0.12)] [background:radial-gradient(circle_at_top,rgba(0,245,200,0.06),#0b1012_70%)] overflow-hidden h-full">
            <CadCornerScale position="top-right" label="MANIFESTO.04" />
            <CadCornerScale position="bottom-left" label="OWNED" />
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-[#263238]">
                <div className="w-8 h-8 rounded-[4px] bg-[#00f5c8]/10 border border-[#00f5c8]/30 flex items-center justify-center text-[#00f5c8]">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#f3f6f5] font-mono">The RNBlocks Standard</h3>
                  <span className="text-[10.5px] font-mono text-[#00f5c8]">Direct code ownership</span>
                </div>
              </div>

              <div className="space-y-4">
                {comparison.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-[13px]">
                    <div className="w-5 h-5 rounded-[2px] bg-[#00f5c8]/15 text-[#00f5c8] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="font-mono text-[10.5px] text-[#00f5c8] block uppercase">{item.feature}</span>
                      <span className="text-[#f3f6f5] leading-snug font-medium">{item.rnblocks}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#263238] text-[11px] font-mono text-[#00f5c8] text-center font-semibold">
              Result: Zero runtime overhead, 60 FPS speed, and infinite longevity.
            </div>
          </div>
        </ScrollReveal>
      </div>
      </div>
    </section>
  );
}
