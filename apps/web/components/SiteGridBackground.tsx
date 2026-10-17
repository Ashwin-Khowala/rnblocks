import React from "react";

/**
 * Site-wide Architectural CAD Micro-Dot Grid & Atmospheric Horizon Background.
 * Provides consistent CAD drafting aesthetic and subtle radial lighting across all pages.
 */
export function SiteGridBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Precision CAD Micro-Dot Grid (24px spacing) */}
      <div
        className="absolute inset-0 bg-[#070709]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* 2. Top Horizon Ambient Radial Wash (Signature Emerald / Cyan Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[500px] bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(50,199,152,0.06)_0%,rgba(6,182,212,0.025)_45%,transparent_75%)] blur-[60px]" />

      {/* 3. Bottom Atmospheric Horizon Vignette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[1000px] h-[400px] bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(50,199,152,0.035)_0%,transparent_70%)] blur-[70px]" />

      {/* 4. Peripheral Viewport CAD Caliper Corner Marks */}
      <div className="hidden sm:block absolute top-3 left-4 font-mono text-[9px] text-white/[0.15] select-none">
        ┌ <span className="text-[8px] text-white/[0.08]">SYS.00</span>
      </div>
      <div className="hidden sm:block absolute top-3 right-4 font-mono text-[9px] text-white/[0.15] select-none text-right">
        <span className="text-[8px] text-white/[0.08]">CAD.FABRIC</span> ┐
      </div>
      <div className="hidden sm:block absolute bottom-3 left-4 font-mono text-[9px] text-white/[0.15] select-none">
        └ <span className="text-[8px] text-white/[0.08]">RN.BLOCKS</span>
      </div>
      <div className="hidden sm:block absolute bottom-3 right-4 font-mono text-[9px] text-white/[0.15] select-none text-right">
        <span className="text-[8px] text-white/[0.08]">60FPS.NATIVE</span> ┘
      </div>
    </div>
  );
}
