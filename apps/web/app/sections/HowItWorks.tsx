"use client";

import React, { useState } from "react";
import { Check, Copy, CheckCheck, Terminal } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { CadCornerScale, WorkflowBackground } from "@/components";

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
      badge: "Zero Blind Installs",
    },
    {
      num: "02",
      title: "Add via CLI in Seconds",
      desc: "Run one CLI command. Source files land directly in your components directory with zero wrapper lock-in.",
      badge: "Standard shadcn Model",
    },
    {
      num: "03",
      title: "Customize & Ship",
      desc: "Modify tokens, tweak SVG paths, and connect handlers. 100% owned code, zero breaking upgrades.",
      badge: "Total Code Ownership",
    },
  ];

  return (
    <section id="workflow" className="bg-transparent border-t border-white/[0.08] py-20 md:py-28 relative overflow-hidden">
      <WorkflowBackground />
      <div className="container-main max-w-[1180px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#32c798] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#32c798] shadow-[0_0_6px_#32c798]" />
            <span>// DEVELOPER WORKFLOW</span>
          </div>
          <h2 className="text-[26px] sm:text-[34px] md:text-[42px] font-extrabold text-white tracking-[-0.8px] md:tracking-[-1.2px]">
            Three <span className="font-editorial italic font-normal text-white">effortless</span> steps to ship
          </h2>
          <p className="mt-2 text-[14px] text-[#9ca3af] max-w-lg leading-relaxed">
            From web preview to production screen in seconds. Zero wrappers, zero lock-in.
          </p>
        </div>

        {/* 2-Column Workflow Layout: Pipeline Rail + Realistic Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Progressive Pipeline Rail (7 Cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="group relative bg-[#0a0a0f] border border-white/[0.08] hover:border-white/[0.18] rounded-[12px] p-5 sm:p-5.5 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* Step Number Badge */}
                  <div className="w-8 h-8 rounded-[6px] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center font-mono text-[12px] font-bold text-[#32c798] shrink-0 mt-0.5">
                    {step.num}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-[15.5px] font-bold text-white tracking-[-0.2px]">
                        {step.title}
                      </h3>
                      <span className="font-mono text-[10px] text-[#71717a] bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-[3px] shrink-0">
                        {step.badge}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#9ca3af] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: High-Craft Developer Terminal (5 Cols) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative bg-[#060609] border border-white/[0.12] rounded-[14px] overflow-hidden shadow-[0_24px_56px_-12px_rgba(0,0,0,0.85)] font-mono text-[12px] sm:text-[12.5px]">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#08080c] border-b border-white/[0.08]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.12]" />
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.08]" />
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.08]" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#71717a]">
                  <Terminal size={12} />
                  <span>terminal — zsh</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-1 text-[#71717a] hover:text-white transition-colors cursor-pointer"
                  title="Copy command"
                >
                  {copied ? <CheckCheck size={13} className="text-[#32c798]" /> : <Copy size={13} />}
                </button>
              </div>

              {/* Terminal Body */}
              <div className="p-4 sm:p-5 space-y-2.5 leading-relaxed text-[#d4d4d8]">
                <div className="flex items-center gap-2">
                  <span className="text-[#32c798] font-bold select-none">$</span>
                  <span className="text-white font-semibold">{sampleCli}</span>
                </div>

                <div className="text-[#71717a] pt-1">
                  <span>✔</span> <span className="text-[#a1a1aa]">Fetching block metadata from registry...</span>
                </div>

                <div className="text-[#71717a]">
                  <span>✔</span> <span className="text-[#a1a1aa]">Checking peer deps (react-native-svg)...</span>
                </div>

                <div className="text-[#71717a]">
                  <span>✔</span> <span className="text-[#d1d5db]">Created</span> <span className="text-white">components/trend-chart.tsx</span> <span className="text-[#71717a]">(2.4 kB)</span>
                </div>

                <div className="text-[#71717a]">
                  <span>✔</span> <span className="text-[#d1d5db]">Created</span> <span className="text-white">_shared/animation.ts</span> <span className="text-[#71717a]">(0.8 kB)</span>
                </div>

                <div className="pt-2 border-t border-white/[0.06] text-[#32c798]">
                  <span>Component ready to use</span>
                </div>

                <div className="bg-[#0a0a10] border border-white/[0.06] rounded-[8px] p-2.5 text-[11.5px] text-[#9ca3af] space-y-1">
                  <div className="text-[#71717a]">// In your screen file:</div>
                  <div className="text-white">
                    <span className="text-[#818cf8]">import</span> TrendChart <span className="text-[#818cf8]">from</span> <span className="text-[#32c798]">&quot;@/components/trend-chart&quot;</span>;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
