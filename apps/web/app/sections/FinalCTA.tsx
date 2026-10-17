"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { CadCornerScale, FinalCtaBackground } from "@/components";

export function FinalCTA() {
  return (
    <section className="bg-transparent border-t border-white/[0.08] py-20 md:py-28 relative overflow-hidden">
      <FinalCtaBackground />
      <div className="container-main max-w-[1000px] mx-auto text-center relative z-10">
        <div className="relative bg-[#0a0a0f] border border-white/[0.1] rounded-[16px] px-6 py-12 sm:py-16 md:px-12 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.9)] [background:radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(50,199,152,0.1)_0%,#0a0a0f_80%)]">
          <CadCornerScale position="top-right" label="SHIP.READY" />
          <CadCornerScale position="bottom-left" label="CAD.INIT" />
          {/* Subtle Indicator */}
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#32c798] mb-3">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#32c798] shadow-[0_0_6px_#32c798]" />
            <span>// START BUILDING</span>
          </div>

          <h2 className="text-[28px] sm:text-[38px] md:text-[46px] font-extrabold text-white tracking-[-1px] md:tracking-[-1.5px] max-w-2xl mx-auto mb-3 text-balance">
            Stop rebuilding mobile UI <span className="font-editorial italic font-normal text-white">from scratch.</span>
          </h2>

          <p className="text-[14px] sm:text-[15px] text-[#9ca3af] max-w-lg mx-auto leading-relaxed mb-7">
            Fluid, zero-dependency copy-paste components for production Expo and React Native apps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              href="/blocks"
              className="btn-primary min-h-[44px] px-6 py-2 text-[14px] font-semibold rounded-[8px] w-full sm:w-auto flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(255,255,255,0.2)]"
            >
              <span>Explore the Registry</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/docs"
              className="btn-secondary min-h-[44px] px-6 py-2 text-[14px] font-semibold rounded-[8px] w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Terminal size={14} className="text-[#9ca3af]" />
              <span>Read Documentation</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
