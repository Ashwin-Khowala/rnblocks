"use client";

import React from "react";
import Link from "next/link";
import { NextIcon } from "@/components/icons";

export function FinalCTA() {
  return (
    <section className="bg-[#09090c] border-t border-white/[0.06] py-16 md:py-24">
      <div className="container-main">
        <div className="text-center bg-[#0e0e12] [background:radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(50,199,152,0.06)_0%,#0e0e12_80%)] border border-[#32c798]/20 rounded-[24px] p-8 sm:p-12 md:py-[72px] md:px-9 flex flex-col items-center gap-4.5 relative overflow-hidden shadow-[0_24px_64px_-16px_rgba(0,0,0,0.8)]">
          <h2 className="text-[22px] sm:text-[28px] md:text-[34px] font-extrabold text-white tracking-[-0.4px] md:tracking-[-0.6px]">
            Stop rebuilding mobile UI <span className="font-editorial italic font-normal">from scratch</span>.
          </h2>
          <p className="text-[13px] md:text-base text-[#9ca3af] max-w-[520px] leading-[1.45] md:leading-normal mb-2 md:mb-3">
            Accelerate your Expo and React Native apps with copy-paste components that look and feel native.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-3.5 w-full sm:w-auto">
            <Link
              href="/blocks"
              className="btn-primary w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl font-semibold"
            >
              <span>Explore the Registry</span>
              <NextIcon size={16} />
            </Link>
            <Link
              href="/docs"
              className="btn-secondary w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl font-semibold"
            >
              <span>Read Documentation</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
