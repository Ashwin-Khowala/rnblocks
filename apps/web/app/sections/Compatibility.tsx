"use client";

import React from "react";

export function Compatibility() {
  const technologies = [
    { name: "Expo SDK 52+", desc: "Managed & Bare workflows", tag: "Latest SDK" },
    { name: "React Native 0.76+", desc: "New Architecture baseline", tag: "TurboModules" },
    { name: "iOS 15+", desc: "Fluid 60-120 FPS native feel", tag: "Liquid UI" },
    { name: "Android API 24+", desc: "Material & edge-to-edge ready", tag: "Optimized" },
    { name: "NativeWind v4", desc: "Tailwind CSS v4 for mobile", tag: "Utility First" },
    { name: "Standard StyleSheet", desc: "Zero build tool requirements", tag: "Zero Config" },
    { name: "Strict TypeScript", desc: "Type-safe props and autocomplete", tag: "TS 5.8" },
    { name: "React Native Web", desc: "Instant browser preview runtime", tag: "Cross-Platform" },
  ];

  return (
    <section className="bg-[#09090c] border-t border-white/[0.06] py-16 md:py-24">
      <div className="container-main">
        {/* Header Center */}
        <div className="text-center mb-10 md:mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#32c798] block mb-2">
            Universal Stack Support
          </span>
          <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-extrabold text-white tracking-[-0.4px] md:tracking-[-0.8px] mb-3">
            Engineered for modern mobile runtimes
          </h2>
          <p className="text-sm md:text-base text-[#9ca3af] max-w-[580px] mx-auto leading-relaxed">
            Tested across Expo workflows, Bare React Native, and React Native Web.
          </p>
        </div>

        {/* Compatibility Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
          {technologies.map((tech, i) => (
            <div
              key={i}
              className="bg-[#0d0d10] border border-white/[0.08] hover:border-white/[0.16] rounded-xl p-4 sm:p-5 flex flex-col gap-1.5 transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <span className="text-[14.5px] font-bold text-white">
                  {tech.name}
                </span>
                <span className="text-[10.5px] font-mono text-[#71717a] bg-white/[0.04] px-1.5 py-0.5 rounded">
                  {tech.tag}
                </span>
              </div>
              <p className="text-[12.5px] text-[#9ca3af]">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
