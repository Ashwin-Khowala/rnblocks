"use client";

import React from "react";
import { Check, ShieldCheck, Cpu, Smartphone, Palette } from "lucide-react";
import { CadCornerScale, CompatibilityBackground } from "@/components";

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
    <section id="runtime" className="bg-transparent border-t border-white/[0.08] py-20 md:py-28 relative overflow-hidden">
      <CompatibilityBackground />
      <div className="container-main max-w-[1180px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#32c798] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#32c798] shadow-[0_0_6px_#32c798]" />
            <span>// RUNTIME SPECIFICATION MATRIX</span>
          </div>
          <h2 className="text-[26px] sm:text-[34px] md:text-[42px] font-extrabold text-white tracking-[-0.8px] md:tracking-[-1.2px]">
            Engineered for <span className="font-editorial italic font-normal text-white">modern</span> runtimes
          </h2>
          <p className="mt-2 text-[14px] text-[#9ca3af] leading-relaxed">
            Validated against Expo SDK 52, React Native 0.76+ New Architecture, and cross-platform web runtimes.
          </p>
        </div>

        {/* 3-Column Engineering Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#0a0a0f] border border-white/[0.08] rounded-[16px] p-6 flex flex-col justify-between overflow-hidden"
              >
                <CadCornerScale position="top-right" label={`ARCH.0${idx + 1}`} />
                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-[6px] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#32c798]">
                        <Icon size={14} />
                      </div>
                      <h3 className="text-[15px] font-bold text-white">{tier.title}</h3>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#32c798] shadow-[0_0_6px_#32c798]" />
                  </div>

                  <div className="space-y-4">
                    {tier.items.map((item, i) => (
                      <div key={i} className="bg-[#060608] border border-white/[0.05] rounded-[12px] p-3.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[13.5px] font-semibold text-white">{item.name}</span>
                          <span className="font-mono text-[10px] text-[#9ca3af] bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-[4px]">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#71717a] leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3.5 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px]">
                  <span className="text-zinc-500">Compatibility</span>
                  <span className="text-[#32c798] font-medium flex items-center gap-1">
                    <Check size={11} strokeWidth={2.5} /> 100% Passed
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
