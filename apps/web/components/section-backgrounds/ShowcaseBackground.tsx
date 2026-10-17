"use client";

import React from "react";

/**
 * ShowcaseBackground: Bus Matrix & Socket Interconnects.
 * Adapts the CAD circuit aesthetic with horizontal IC bus traces,
 * perimeter socket via nodes, and top engineering caliper ruler.
 */
export function ShowcaseBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── 1. Top Engineering Caliper Ruler ── */}
      <div className="absolute top-0 left-0 right-0 h-6 overflow-hidden opacity-40">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 24"
          fill="none"
        >
          {Array.from({ length: 90 }).map((_, i) => {
            const x = i * 16;
            const isMajor = i % 5 === 0;
            return (
              <React.Fragment key={i}>
                <line
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={isMajor ? 8 : 4}
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="1"
                />
                {isMajor && i > 0 && i < 88 && (
                  <text
                    x={x + 3}
                    y={14}
                    fill="rgba(255, 255, 255, 0.28)"
                    fontSize="7.5"
                    fontFamily="monospace"
                  >
                    {x}
                  </text>
                )}
              </React.Fragment>
            );
          })}
        </svg>
      </div>

      {/* ── 2. SVG Circuit Buslines Routing from Viewport Margins toward Bento ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <defs>
          <linearGradient id="showcaseGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#32c798" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Left Peripheral Bus Traces */}
        <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" fill="none">
          <path d="M 0 160 L 110 160 L 150 200 L 180 200" />
          <path d="M 0 320 L 80 320 L 120 360 L 160 360 L 160 480 L 190 510" />
          <path d="M 0 640 L 90 640 L 130 600 L 210 600" />
        </g>

        {/* Animated Traveling Pulse along Left Bus Trace */}
        <path
          d="M 0 160 L 110 160 L 150 200 L 180 200"
          stroke="url(#showcaseGlow)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="20 160"
          className="animate-pulse"
        />

        {/* Solder Via Pads (Square Dies) Left */}
        <rect x="108" y="158" width="4" height="4" fill="#32c798" />
        <rect x="148" y="198" width="4" height="4" fill="#06b6d4" />
        <rect x="178" y="198" width="4" height="4" fill="#32c798" />
        <rect x="78" y="318" width="4" height="4" fill="#32c798" />
        <rect x="118" y="358" width="4" height="4" fill="#06b6d4" />

        {/* Right Peripheral Bus Traces */}
        <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" fill="none">
          <path d="M 1440 180 L 1330 180 L 1290 220 L 1250 220" />
          <path d="M 1440 380 L 1350 380 L 1310 420 L 1260 420" />
          <path d="M 1440 580 L 1340 580 L 1300 540 L 1230 540" />
        </g>

        {/* Animated Traveling Pulse along Right Bus Trace */}
        <path
          d="M 1440 180 L 1330 180 L 1290 220 L 1250 220"
          stroke="url(#showcaseGlow)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="24 180"
          className="animate-pulse"
        />

        {/* Solder Via Pads (Square Dies) Right */}
        <rect x="1328" y="178" width="4" height="4" fill="#32c798" />
        <rect x="1288" y="218" width="4" height="4" fill="#06b6d4" />
        <rect x="1248" y="218" width="4" height="4" fill="#32c798" />
        <rect x="1348" y="378" width="4" height="4" fill="#06b6d4" />
      </svg>

      {/* ── 3. Peripheral Vertical Ruler (Engineering Coordinates) ── */}
      <div className="hidden 2xl:flex flex-col justify-between absolute left-5 top-28 bottom-28 font-mono text-[8.5px] text-white/20 select-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-px bg-white/20" /> Y:0100
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-px bg-white/20" /> Y:0250
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-px bg-white/20" /> Y:0400
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-px bg-white/20" /> Y:0550
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-px bg-white/20" /> Y:0700
        </span>
      </div>

      {/* ── 4. Precision CAD Intersecting Crosshairs ── */}
      <div className="hidden lg:block absolute left-[12%] top-[35%] font-mono text-[10px] text-white/10">
        +
      </div>
      <div className="hidden lg:block absolute right-[12%] top-[35%] font-mono text-[10px] text-white/10">
        +
      </div>
      <div className="hidden lg:block absolute left-[8%] bottom-[20%] font-mono text-[10px] text-white/10">
        +
      </div>
      <div className="hidden lg:block absolute right-[8%] bottom-[20%] font-mono text-[10px] text-white/10">
        +
      </div>

      {/* ── 5. Atmospheric Radial Backlight behind Bento Grid ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1050px] h-[450px] bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(50,199,152,0.06)_0%,rgba(6,182,212,0.025)_45%,transparent_75%)] blur-[60px]" />
    </div>
  );
}
