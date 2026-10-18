"use client";

import React from "react";

/**
 * CompatibilityBackground: Silicon Motherboard Bus & Multi-Channel Interconnects.
 * Displays a multi-lane horizontal bus conduit with channel drops feeding into each
 * of the 3 runtime specification matrix tiers.
 */
export function CompatibilityBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── 1. SVG Multi-Channel Bus Architecture ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 680"
      >
        <defs>
          <linearGradient id="compatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f5c8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00d9ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Horizontal Multi-Lane Bus Conduit spanning across top */}
        <g stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" fill="none">
          <line x1="0" y1="180" x2="1440" y2="180" />
          <line x1="0" y1="188" x2="1440" y2="188" />

          {/* Channel 1 Drop (Core Engines - Col 1) */}
          <path d="M 280 188 L 280 210 L 320 250 L 320 280" />

          {/* Channel 2 Drop (Target Platforms - Col 2 Center) */}
          <path d="M 720 188 L 720 280" />

          {/* Channel 3 Drop (Styling & Tooling - Col 3) */}
          <path d="M 1160 188 L 1160 210 L 1120 250 L 1120 280" />
        </g>

        {/* Traveling Signal Pulse along the Main Busline */}
        <line
          x1="0"
          y1="180"
          x2="1440"
          y2="180"
          stroke="url(#compatGrad)"
          strokeWidth="1.2"
          strokeDasharray="32 260"
          className="animate-pulse"
        />

        {/* Solder Via Nodes at Channel Drops */}
        <rect x="278" y="186" width="4" height="4" fill="#00f5c8" />
        <rect x="318" y="248" width="4" height="4" fill="#00f5c8" />
        <rect x="718" y="186" width="4" height="4" fill="#00d9ff" />
        <rect x="718" y="278" width="4" height="4" fill="#00d9ff" />
        <rect x="1158" y="186" width="4" height="4" fill="#818cf8" />
        <rect x="1118" y="248" width="4" height="4" fill="#818cf8" />
      </svg>

      {/* ── 2. Channel HUD Annotations ── */}
      <div className="hidden xl:flex items-center justify-between max-w-[1180px] mx-auto px-6 absolute top-[162px] left-0 right-0 font-mono text-[8px] text-white/20 select-none">
        <span className="text-[#00f5c8]/50">CHAN_01 // CORE_EXPO</span>
        <span className="text-[#00d9ff]/50">CHAN_02 // METAL_NDK</span>
        <span className="text-[#818cf8]/50">CHAN_03 // TS_ENGINE</span>
      </div>

      {/* ── 3. Atmospheric Backlight Wash ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,217,255,0.05)_0%,rgba(0,245,200,0.02)_50%,transparent_75%)] blur-[60px]" />
    </div>
  );
}
