"use client";

import React from "react";

/**
 * CommunityBackground: Distributed Git Network Mesh & Merge Vectors.
 * Visualizes open-source PR workflows with branching commit trees,
 * merge vectors, and solder via commit nodes.
 */
export function CommunityBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── 1. SVG Git Branch Mesh & Merge Vectors ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 600"
      >
        <defs>
          <linearGradient id="mergePulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#32c798" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#32c798" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Git Tree Hairline Traces (Main branch + Feature branch + Merge) */}
        <g stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" fill="none">
          {/* Main trunk line */}
          <line x1="0" y1="300" x2="1440" y2="300" />

          {/* Feature branch 1 (Top branch & merge) */}
          <path d="M 120 300 L 180 240 L 420 240 L 480 300" />

          {/* Feature branch 2 (Bottom branch & merge) */}
          <path d="M 600 300 L 660 360 L 900 360 L 960 300" />

          {/* Upstream Community Branch */}
          <path d="M 1080 300 L 1140 220 L 1340 220 L 1400 280 L 1440 280" />
        </g>

        {/* Traveling Merge Pulse */}
        <path
          d="M 120 300 L 180 240 L 420 240 L 480 300"
          stroke="url(#mergePulse)"
          strokeWidth="1.3"
          fill="none"
          strokeDasharray="20 140"
          className="animate-pulse"
        />

        {/* Git Commit Solder Vias */}
        <rect x="118" y="298" width="4" height="4" fill="#32c798" />
        <rect x="178" y="238" width="4" height="4" fill="#32c798" />
        <rect x="418" y="238" width="4" height="4" fill="#06b6d4" />
        <rect x="478" y="298" width="4" height="4" fill="#32c798" />

        <rect x="598" y="298" width="4" height="4" fill="#32c798" />
        <rect x="658" y="358" width="4" height="4" fill="#06b6d4" />
        <rect x="898" y="358" width="4" height="4" fill="#32c798" />
        <rect x="958" y="298" width="4" height="4" fill="#32c798" />
      </svg>

      {/* ── 2. Radial Emitter behind Submit CTA ── */}
      <div className="absolute top-[45%] left-[22%] -translate-x-1/2 -translate-y-1/2 w-[540px] h-[340px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(50,199,152,0.09)_0%,rgba(6,182,212,0.03)_40%,transparent_70%)] blur-[50px]" />

      {/* ── 3. Branch Meta Label ── */}
      <div className="hidden lg:block absolute left-12 bottom-8 font-mono text-[9px] text-[#32c798]/30">
        ORIGIN // HEAD {"->"} DEVELOP [MERGE_READY]
      </div>
    </div>
  );
}
