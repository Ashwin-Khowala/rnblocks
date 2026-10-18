"use client";

import React from "react";
import { Check, Cpu, Smartphone, Palette } from "lucide-react";
import { CadCornerScale, CompatibilityBackground, ScrollReveal } from "@/components";

export function Compatibility() {
  const tiers = [
    {
      title: "Core Engines",
      icon: Cpu,
      items: [
        {
          name: "Expo SDK 52+",
          badge: "v52.0",
          desc: "Full support for Managed & Bare workflows, prebuild, and Expo Router v4.",
          status: "100% Passed",
        },
        {
          name: "React Native 0.76+",
          badge: "New Arch",
          desc: "Built from day one for the New Architecture, TurboModules, and Bridgeless mode.",
          status: "100% Passed",
        },
      ],
    },
    {
      title: "Target Platforms",
      icon: Smartphone,
      items: [
        {
          name: "iOS 15+",
          badge: "Metal/UIKit",
          desc: "Liquid 60–120 FPS native animations and edge-to-edge layout safe area insets.",
          status: "Verified",
        },
        {
          name: "Android API 24+",
          badge: "NDK/V8",
          desc: "Hardware accelerated rendering, gesture navigation, and Material surfaces.",
          status: "Verified",
        },
        {
          name: "React Native Web",
          badge: "DOM SVG",
          desc: "Universal web shims without DOM leakage or layout distortion.",
          status: "Verified",
        },
      ],
    },
    {
      title: "Styling & Tooling",
      icon: Palette,
      items: [
        {
          name: "Standard StyleSheet",
          badge: "Pure RN",
          desc: "Zero external compiler or build step required. Runs directly in any bare project.",
          status: "Zero Config",
        },
        {
          name: "NativeWind v4",
          badge: "Tailwind v4",
          desc: "Compatible with Tailwind utility classes without runtime CSS interpreter cost.",
          status: "Supported",
        },
        {
          name: "Strict TypeScript",
          badge: "TS 5.8",
          desc: "Strictly typed props, callbacks, and theme tokens with full IDE autocomplete.",
          status: "Strict Types",
        },
      ],
    },
  ];

  return (
    <section id="runtime" className="bg-transparent border-t border-[#263238] py-20 md:py-28 relative overflow-hidden">
      <CompatibilityBackground />
      <div className="container-main max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal showScanline threshold={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#00f5c8] mb-2.5">
              <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] shadow-[0_0_6px_#00f5c8]" />
              <span>// RUNTIME SPECIFICATION MATRIX</span>
            </div>
            <h2 className="text-[26px] sm:text-[34px] md:text-[42px] font-extrabold text-[#f3f6f5] tracking-tight">
              Engineered for <span className="text-[#00f5c8] font-mono font-black">modern</span> runtimes
            </h2>
            <p className="mt-2 text-[14px] text-[#929da4] leading-relaxed">
              Validated against Expo SDK 52, React Native 0.76+ New Architecture, and cross-platform web runtimes.
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Column Engineering Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 100} threshold={0.08} className="h-full">
                <div
                  className="relative bg-[#0b1012] border border-[#263238] rounded-[8px] p-6 flex flex-col justify-between overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.8)] h-full"
                >
                  <CadCornerScale position="top-right" label={`ARCH.0${idx + 1}`} />
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#263238]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-[4px] bg-[#101719] border border-[#263238] flex items-center justify-center text-[#00f5c8]">
                          <Icon size={14} />
                        </div>
                        <h3 className="text-[14.5px] font-bold text-[#f3f6f5] font-mono">{tier.title}</h3>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] shadow-[0_0_6px_#00f5c8]" />
                    </div>

                    <div className="space-y-3.5">
                      {tier.items.map((item, i) => (
                        <div key={i} className="bg-[#07090b] border border-[#263238] rounded-[6px] p-3 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] font-semibold text-[#f3f6f5] font-mono">{item.name}</span>
                            <span className="font-mono text-[9px] text-[#00d9ff] bg-[#00d9ff]/10 border border-[#00d9ff]/30 px-1.5 py-0.5 rounded-[3px] font-semibold">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[12px] text-[#929da4] leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-[#263238] flex items-center justify-between font-mono text-[10.5px]">
                    <span className="text-[#718087]">STATUS</span>
                    <span className="text-[#00f5c8] font-bold flex items-center gap-1">
                      <Check size={11} strokeWidth={2.5} /> 100% PASSED
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
