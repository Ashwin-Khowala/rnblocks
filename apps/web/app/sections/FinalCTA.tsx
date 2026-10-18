"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { CadCornerScale, FinalCtaBackground } from "@/components";

export function FinalCTA() {
  return (
    <section className="bg-transparent border-t border-[#263238] py-20 md:py-28 relative overflow-hidden">
      <FinalCtaBackground />
      <div className="container-main max-w-[1040px] mx-auto text-center relative z-10">
        <div className="relative bg-[#0b1012] border border-[#263238] rounded-[10px] px-6 py-12 sm:py-16 md:px-12 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.95)] [background:radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(0,245,200,0.12)_0%,#0b1012_80%)]">
          <CadCornerScale position="top-right" label="SHIP.READY" />
          <CadCornerScale position="bottom-left" label="CAD.INIT" />

          {/* Indicator */}
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#00f5c8] mb-3">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] shadow-[0_0_6px_#00f5c8]" />
            <span>// START BUILDING</span>
          </div>

          <h2 className="text-[28px] sm:text-[38px] md:text-[46px] font-extrabold text-[#f3f6f5] tracking-tight max-w-2xl mx-auto mb-3 text-balance">
            Stop rebuilding mobile UI <span className="text-[#00f5c8] font-mono font-black">from scratch.</span>
          </h2>

          <p className="text-[14px] sm:text-[15px] text-[#929da4] max-w-lg mx-auto leading-relaxed mb-7">
            Fluid, zero-dependency copy-paste components for production Expo and React Native apps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              href="/blocks"
              className="btn-primary min-h-[44px] px-6 py-2 text-[13px] font-mono font-bold rounded-[6px] w-full sm:w-auto flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,245,200,0.3)]"
            >
              <span>EXPLORE REGISTRY</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/docs"
              className="btn-secondary min-h-[44px] px-6 py-2 text-[13px] font-mono font-semibold rounded-[6px] w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Terminal size={14} className="text-[#00f5c8]" />
              <span>READ SYSTEM MANUAL</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
