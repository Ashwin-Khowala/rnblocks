"use client";

import React from "react";
import { CopyButton } from "@/components/CopyButton";

export function HowItWorks() {
  return (
    <section className="bg-[#070709] border-t border-white/[0.06] py-16 md:py-24">
      <div className="container-main">
        {/* Header Center */}
        <div className="text-center mb-10 md:mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#32c798] block mb-2">
            Developer Workflow
          </span>
          <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-extrabold text-white tracking-[-0.4px] md:tracking-[-0.8px] mb-3">
            Three <span className="font-editorial italic font-normal">effortless</span> steps to ship
          </h2>
          <p className="text-sm md:text-base text-[#9ca3af] max-w-[580px] mx-auto leading-relaxed">
            From web discovery to production mobile screen in seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Step 1 */}
          <div className="bg-[#0d0d12] border border-white/[0.08] hover:border-white/[0.16] rounded-[18px] p-5 md:p-8 flex flex-col transition-all duration-200 hover:-translate-y-0.5">
            <div className="inline-flex items-center justify-center w-fit font-mono text-xs font-bold text-[#32c798] bg-[#32c798]/[0.08] border border-[#32c798]/20 px-2.5 py-0.5 rounded-full mb-4">
              01
            </div>
            <h3 className="text-base md:text-[19px] font-bold text-white mb-2.5 tracking-[-0.2px]">
              Inspect & Test Live
            </h3>
            <p className="text-[12.5px] md:text-sm text-[#9ca3af] leading-relaxed">
              Interact with components directly in your web browser. Test tabs, state toggles, and review
              the exact TypeScript source code before adding anything.
            </p>
          </div>

          {/* Step 2 (Highlighted) */}
          <div className="bg-[#0d0d12] border border-[#32c798]/40 border-t-2 border-t-[#32c798] rounded-[18px] p-5 md:p-8 flex flex-col transition-all duration-200 hover:-translate-y-0.5 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] [background:radial-gradient(circle_at_top,rgba(50,199,152,0.06),#0d0d12_70%)]">
            <div className="inline-flex items-center justify-center w-fit font-mono text-xs font-bold text-[#32c798] bg-[#32c798]/[0.08] border border-[#32c798]/20 px-2.5 py-0.5 rounded-full mb-4">
              02
            </div>
            <h3 className="text-base md:text-[19px] font-bold text-white mb-2.5 tracking-[-0.2px]">
              Install with One Line
            </h3>
            <p className="text-[12.5px] md:text-sm text-[#9ca3af] leading-relaxed">
              Run the CLI command in your project root. The full component code is placed
              directly into your <code className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-xs text-white">components/rnblocks</code> folder.
            </p>
            <div className="mt-5 flex items-center justify-between bg-[#08080a] border border-white/10 rounded-lg p-2 px-3 font-mono text-xs text-[#f3f4f6]">
              <code className="truncate mr-2">npx rnblocks add floating-docker</code>
              <CopyButton text="npx rnblocks add floating-docker" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#0d0d12] border border-white/[0.08] hover:border-white/[0.16] rounded-[18px] p-5 md:p-8 flex flex-col transition-all duration-200 hover:-translate-y-0.5">
            <div className="inline-flex items-center justify-center w-fit font-mono text-xs font-bold text-[#32c798] bg-[#32c798]/[0.08] border border-[#32c798]/20 px-2.5 py-0.5 rounded-full mb-4">
              03
            </div>
            <h3 className="text-base md:text-[19px] font-bold text-white mb-2.5 tracking-[-0.2px]">
              Customize & Ship
            </h3>
            <p className="text-[12.5px] md:text-sm text-[#9ca3af] leading-relaxed">
              It's your source code. Adjust palette constants, hook into your app navigation, adapt
              to NativeWind if you choose, and ship without library lock-in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
