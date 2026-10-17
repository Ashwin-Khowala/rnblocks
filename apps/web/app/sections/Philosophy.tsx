"use client";

import React from "react";
import { Check, X, ShieldAlert, ShieldCheck } from "lucide-react";
import { CadCornerScale, PhilosophyBackground } from "@/components";

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
    <section id="manifesto" className="bg-transparent border-t border-white/[0.08] py-20 md:py-28 relative overflow-hidden">
      <PhilosophyBackground />
      <div className="container-main max-w-[1180px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#32c798] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#32c798] shadow-[0_0_6px_#32c798]" />
            <span>// ARCHITECTURAL MANIFESTO</span>
          </div>
          <h2 className="text-[26px] sm:text-[34px] md:text-[42px] font-extrabold text-white tracking-[-0.8px] md:tracking-[-1.2px]">
            Built for <span className="font-editorial italic font-normal text-white">developer</span> ownership
          </h2>
          <p className="mt-2 text-[14px] text-[#9ca3af] leading-relaxed">
            Stop fighting npm library version locks. Own your UI code directly with clean, copy-paste React Native components.
          </p>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Monolithic Library Trap (Warning State) */}
          <div className="bg-[#0a0a0f] border border-white/[0.08] rounded-[16px] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/[0.06]">
                <div className="w-8 h-8 rounded-[6px] bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <ShieldAlert size={16} />
                </div>
                <div>
                  <h3 className="text-[15.5px] font-bold text-white">The Monolithic Library Trap</h3>
                  <span className="text-[11px] font-mono text-zinc-500">npm package dependencies</span>
                </div>
              </div>

              <div className="space-y-4">
                {comparison.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-[13px]">
                    <div className="w-5 h-5 rounded-[3px] bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={12} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-zinc-500 block">{item.feature}</span>
                      <span className="text-zinc-400 leading-snug">{item.monolith}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11.5px] font-mono text-zinc-500 text-center">
              Result: Bloated bundles, upgrade lock-in, and abandoned repos.
            </div>
          </div>

          {/* Card 2: The RNBlocks Standard (Success State) */}
          <div className="relative bg-[#0a0a0f] border border-[#32c798]/30 rounded-[16px] p-6 sm:p-7 flex flex-col justify-between shadow-[0_20px_48px_-12px_rgba(50,199,152,0.1)] [background:radial-gradient(circle_at_top,rgba(50,199,152,0.06),#0a0a0f_70%)] overflow-hidden">
            <CadCornerScale position="top-right" label="MANIFESTO.04" />
            <CadCornerScale position="bottom-left" label="OWNED" />
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/[0.08]">
                <div className="w-8 h-8 rounded-[6px] bg-[#32c798]/10 border border-[#32c798]/30 flex items-center justify-center text-[#32c798]">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h3 className="text-[15.5px] font-bold text-white">The RNBlocks Standard</h3>
                  <span className="text-[11px] font-mono text-[#32c798]">Direct code ownership</span>
                </div>
              </div>

              <div className="space-y-4">
                {comparison.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-[13px]">
                    <div className="w-5 h-5 rounded-[3px] bg-[#32c798]/15 text-[#32c798] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-[#32c798] block">{item.feature}</span>
                      <span className="text-zinc-200 leading-snug font-medium">{item.rnblocks}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] text-[11.5px] font-mono text-[#32c798] text-center font-medium">
              Result: Zero runtime overhead, 60 FPS speed, and infinite longevity.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
