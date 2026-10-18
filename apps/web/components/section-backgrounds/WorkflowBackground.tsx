"use client";

import React from "react";

/**
 * WorkflowBackground: Pipeline Data Flow & Compiler Conduit.
 * Renders directional circuit data traces that connect Step 01 -> Step 02 -> Step 03
 * and branch across the gap into the terminal compiler interface.
 */
export function WorkflowBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── 1. Conduit Traces connecting Pipeline Steps to Terminal ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 700"
      >
        <defs>
          <linearGradient id="pipelinePulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f5c8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Vertical Pipeline Spine running alongside steps (Desktop) */}
        <g stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" fill="none">
          {/* Main vertical bus alongside steps */}
          <path d="M 170 140 L 170 620" />
          {/* Step 01 horizontal branch */}
          <path d="M 170 200 L 220 200" />
          {/* Step 02 horizontal branch */}
          <path d="M 170 340 L 220 340" />
          {/* Step 03 horizontal branch */}
          <path d="M 170 480 L 220 480" />

          {/* Cross-pipeline branch bridging to terminal */}
          <path d="M 170 340 L 170 360 L 680 360 L 720 320 L 780 320" />

          {/* Terminal grounding trace running to right edge */}
          <path d="M 1240 320 L 1320 320 L 1360 360 L 1440 360" />
        </g>

        {/* Traveling Pipeline Laser Packet */}
        <path
          d="M 170 140 L 170 360 L 680 360 L 720 320 L 780 320"
          stroke="url(#pipelinePulse)"
          strokeWidth="1.4"
          fill="none"
          strokeDasharray="26 220"
          className="animate-pulse"
        />

        {/* Solder Via Nodes at Pipeline Junctions */}
        <rect x="168" y="198" width="4" height="4" fill="#00f5c8" />
        <rect x="168" y="338" width="4" height="4" fill="#00f5c8" />
        <rect x="168" y="478" width="4" height="4" fill="#00f5c8" />
        <rect x="678" y="358" width="4" height="4" fill="#00d9ff" />
        <rect x="718" y="318" width="4" height="4" fill="#00f5c8" />
        <rect x="1318" y="318" width="4" height="4" fill="#00d9ff" />
      </svg>

      {/* ── 2. Atmospheric Terminal Backlight Emitter ── */}
      <div className="absolute top-[55%] right-[10%] w-[520px] h-[360px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,217,255,0.06)_0%,rgba(0,245,200,0.03)_50%,transparent_75%)] blur-[50px]" />

      {/* ── 3. Pipeline Step Technical Coordinates ── */}
      <div className="hidden lg:block absolute left-8 top-32 font-mono text-[9px] text-[#00f5c8]/30">
        DATA.BUS // PIPELINE.03
      </div>
      <div className="hidden lg:block absolute right-8 top-32 font-mono text-[9px] text-[#00d9ff]/30">
        TERMINAL.SYNC // TTY0
      </div>
    </div>
  );
}
