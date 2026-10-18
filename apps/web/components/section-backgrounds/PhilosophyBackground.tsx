"use client";

import React from "react";

/**
 * PhilosophyBackground: Dual Architecture Differential.
 * Features contrasting electrical zones:
 * - Left zone (Monolithic Trap): degraded, fragmented circuit hairlines in muted red/crimson.
 * - Right zone (RNBlocks Standard): pristine, parallel high-voltage silicon buslines in signature emerald.
 */
export function PhilosophyBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── 1. Dual Tone Ambient Atmosphere ── */}
      {/* Left Monolith Aura (Subtle Warning Red) */}
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[460px] h-[360px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(239,68,68,0.035)_0%,transparent_70%)] blur-[60px]" />

      {/* Right RNBlocks Aura (Vibrant Mint Glow) */}
      <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[520px] h-[400px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,245,200,0.07)_0%,transparent_70%)] blur-[50px]" />

      {/* ── 2. SVG Circuit Traces: Fragmented vs Sovereign ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 680"
      >
        {/* Left Side: Fragmented / Broken Traces (Monolith) */}
        <g stroke="rgba(239, 68, 68, 0.22)" strokeWidth="1" strokeDasharray="5 7" fill="none">
          <path d="M 0 220 L 120 220 L 160 260 L 220 260" />
          <path d="M 40 400 L 140 400 L 180 360 L 260 360" />
          <path d="M 80 540 L 160 540 L 200 500" />
        </g>
        {/* Fragmented Red Via Dies */}
        <rect x="118" y="218" width="4" height="4" fill="rgba(239, 68, 68, 0.4)" />
        <rect x="158" y="258" width="4" height="4" fill="rgba(239, 68, 68, 0.3)" />
        <rect x="138" y="398" width="4" height="4" fill="rgba(239, 68, 68, 0.4)" />

        {/* Right Side: High-Voltage Pristine Parallel Buslines (RNBlocks Standard) */}
        <g stroke="rgba(0, 245, 200, 0.18)" strokeWidth="1" fill="none">
          <path d="M 1440 220 L 1320 220 L 1280 260 L 1220 260" />
          <path d="M 1440 240 L 1330 240 L 1290 280 L 1220 280" />
          <path d="M 1440 440 L 1340 440 L 1300 400 L 1220 400" />
          <path d="M 1440 460 L 1350 460 L 1310 420 L 1220 420" />
        </g>

        {/* Animated Sovereign Mint Pulse along Right Busline */}
        <path
          d="M 1440 220 L 1320 220 L 1280 260 L 1220 260"
          stroke="#00f5c8"
          strokeWidth="1.4"
          fill="none"
          strokeDasharray="24 180"
          className="animate-pulse"
        />

        {/* Solid Sovereign Via Pads in Mint */}
        <rect x="1318" y="218" width="4" height="4" fill="#00f5c8" />
        <rect x="1278" y="258" width="4" height="4" fill="#00f5c8" />
        <rect x="1338" y="438" width="4" height="4" fill="#00f5c8" />
        <rect x="1298" y="398" width="4" height="4" fill="#00d9ff" />
      </svg>

      {/* ── 3. CAD Architecture Labels ── */}
      <div className="hidden lg:block absolute left-8 bottom-12 font-mono text-[9px] text-red-400/30">
        STATUS // DEPRECATED_NPM
      </div>
      <div className="hidden lg:block absolute right-8 bottom-12 font-mono text-[9px] text-[#00f5c8]/40">
        STATUS // IMMUTABLE_SOURCE
      </div>
    </div>
  );
}
