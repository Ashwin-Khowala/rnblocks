"use client";

import React, { useState } from "react";
import { Copy, CheckCheck, Terminal } from "lucide-react";
import { WorkflowBackground, ScrollReveal } from "@/components";

export function HowItWorks() {
  const [copied, setCopied] = useState(false);
  const sampleCli = "npx @rnblocks/cli add trend-chart";

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCli);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: "01",
      title: "Inspect & Test Live",
      desc: "Preview components live in your browser with 60 FPS gesture scrubbing and full TypeScript source inspection.",
      badge: "ZERO BLIND INSTALLS",
    },
    {
      num: "02",
      title: "Add via CLI in Seconds",
      desc: "Run one CLI command. Source files land directly in your components directory with zero wrapper lock-in.",
      badge: "STANDARD SHADCN MODEL",
    },
    {
      num: "03",
      title: "Customize & Ship",
      desc: "Modify tokens, tweak SVG paths, and connect handlers. 100% owned code, zero breaking upgrades.",
      badge: "TOTAL CODE OWNERSHIP",
    },
  ];

  return (
    <section id="workflow" className="bg-transparent border-t border-[#263238] py-20 md:py-28 relative overflow-hidden">
      <WorkflowBackground />
      <div className="container-main max-w-[1200px] mx-auto relative z-10">
        {/* Header with Scroll Reveal */}
        <ScrollReveal showScanline threshold={0.1}>
          <div className="mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#00f5c8] mb-2.5">
              <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] shadow-[0_0_6px_#00f5c8]" />
              <span>// DEPLOYMENT PIPELINE</span>
            </div>
            <h2 className="text-[26px] sm:text-[34px] md:text-[42px] font-extrabold text-[#f3f6f5] tracking-tight">
              Three <span className="text-[#00f5c8] font-mono font-black">effortless</span> steps to ship
            </h2>
            <p className="mt-2 text-[14px] text-[#929da4] max-w-lg leading-relaxed">
              From web preview to production screen in seconds. Zero wrappers, zero lock-in.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Workflow Layout: Pipeline Rail + Realistic Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Progressive Pipeline Rail (7 Cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={100} threshold={0.08} className="space-y-3.5">
              {steps.map((step) => (
              <div
                key={step.num}
                className="group relative bg-[#0b1012] border border-[#263238] hover:border-[#00f5c8]/40 rounded-[8px] p-5 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* Step Number Badge */}
                  <div className="w-8 h-8 rounded-[4px] bg-[#101719] border border-[#263238] flex items-center justify-center font-mono text-[12px] font-bold text-[#00f5c8] shrink-0 mt-0.5">
                    {step.num}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1">
                      <h3 className="text-[15px] font-bold text-[#f3f6f5] tracking-tight font-mono">
                        {step.title}
                      </h3>
                      <span className="font-mono text-[9px] text-[#00d9ff] bg-[#00d9ff]/10 border border-[#00d9ff]/30 px-2 py-0.5 rounded-[3px] shrink-0 font-semibold w-fit">
                        {step.badge}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#929da4] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            </ScrollReveal>
          </div>

          {/* Right Column: High-Craft Developer Terminal (5 Cols) */}
          <div className="lg:col-span-5 w-full">
            <ScrollReveal delay={200} threshold={0.08}>
              <div className="relative bg-[#07090b] border border-[#263238] rounded-[8px] overflow-hidden shadow-[0_24px_56px_-12px_rgba(0,0,0,0.9)] font-mono text-[12px]">
                {/* Terminal Title Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0b1012] border-b border-[#263238]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-[1px] bg-[#ef4444]" />
                    <div className="w-2.5 h-2.5 rounded-[1px] bg-[#f59e0b]" />
                    <div className="w-2.5 h-2.5 rounded-[1px] bg-[#00f5c8]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#718087]">
                    <Terminal size={12} className="text-[#00f5c8]" />
                    <span>terminal — zsh</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-1 text-[#718087] hover:text-[#f3f6f5] transition-colors cursor-pointer"
                    title="Copy command"
                  >
                    {copied ? <CheckCheck size={13} className="text-[#00f5c8]" /> : <Copy size={13} />}
                  </button>
                </div>

                {/* Terminal Body */}
                <div className="p-4 sm:p-5 space-y-2.5 leading-relaxed text-[#d4d4d8]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00f5c8] font-bold select-none">$</span>
                    <span className="text-white font-semibold">{sampleCli}</span>
                  </div>

                  <div className="text-[#718087] pt-1">
                    <span className="text-[#00f5c8]">✔</span> <span className="text-[#929da4]">Fetching block metadata from registry...</span>
                  </div>

                  <div className="text-[#718087]">
                    <span className="text-[#00f5c8]">✔</span> <span className="text-[#929da4]">Checking peer deps (react-native-svg)...</span>
                  </div>

                  <div className="text-[#718087]">
                    <span className="text-[#00f5c8]">✔</span> <span className="text-[#f3f6f5]">Created</span> <span className="text-[#00d9ff]">components/trend-chart.tsx</span> <span className="text-[#718087]">(2.4 kB)</span>
                  </div>

                  <div className="text-[#718087]">
                    <span className="text-[#00f5c8]">✔</span> <span className="text-[#f3f6f5]">Created</span> <span className="text-[#00d9ff]">_shared/animation.ts</span> <span className="text-[#718087]">(0.8 kB)</span>
                  </div>

                  <div className="pt-2 border-t border-[#263238] text-[#00f5c8] font-semibold">
                    <span>Unit ready to deploy in screen</span>
                  </div>

                  <div className="bg-[#0b1012] border border-[#263238] rounded-[5px] p-2.5 text-[11px] text-[#929da4] space-y-1">
                    <div className="text-[#718087]">// In your screen file:</div>
                    <div className="text-[#f3f6f5]">
                      <span className="text-[#c084fc]">import</span> TrendChart <span className="text-[#c084fc]">from</span> <span className="text-[#00f5c8]">&quot;@/components/trend-chart&quot;</span>;
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
