"use client";

import React from "react";

/**
 * FinalCtaBackground: Launch Conduit & Converging Horizon Accelerator.
 * Projects converging perspective guideways and concentric radar arcs
 * directly toward the central call-to-action buttons.
 */
export function FinalCtaBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── 1. Concentric Accelerator Arcs & Converging Lines ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 600"
      >
        <defs>
          <linearGradient id="ctaRayGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#32c798" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>

        {/* Concentric Architectural Radar Rings Centered on CTA */}
        <g stroke="rgba(50, 199, 152, 0.08)" strokeWidth="1" fill="none">
          <ellipse cx="720" cy="300" rx="340" ry="170" />
          <ellipse cx="720" cy="300" rx="520" ry="260" strokeDasharray="6 8" />
          <ellipse cx="720" cy="300" rx="700" ry="350" stroke="rgba(255,255,255,0.03)" />
        </g>

        {/* Converging Runway Perspective Lines pointing to Center Box */}
        <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" fill="none">
          <line x1="120" y1="600" x2="480" y2="300" />
          <line x1="280" y1="600" x2="560" y2="300" />
          <line x1="1320" y1="600" x2="960" y2="300" />
          <line x1="1160" y1="600" x2="880" y2="300" />
        </g>

        {/* Animated Lead Runway Beacons */}
        <line
          x1="280"
          y1="600"
          x2="560"
          y2="300"
          stroke="url(#ctaRayGrad)"
          strokeWidth="1.2"
          strokeDasharray="20 120"
          className="animate-pulse"
        />
        <line
          x1="1160"
          y1="600"
          x2="880"
          y2="300"
          stroke="url(#ctaRayGrad)"
          strokeWidth="1.2"
          strokeDasharray="20 120"
          className="animate-pulse"
        />

        {/* Solder Via Nodes along Accelerator Perimeter */}
        <rect x="478" y="298" width="4" height="4" fill="#32c798" />
        <rect x="558" y="298" width="4" height="4" fill="#06b6d4" />
        <rect x="958" y="298" width="4" height="4" fill="#32c798" />
        <rect x="878" y="298" width="4" height="4" fill="#06b6d4" />
      </svg>

      {/* ── 2. Focused Core Emitter behind CTA ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(50,199,152,0.12)_0%,rgba(6,182,212,0.04)_45%,transparent_75%)] blur-[50px]" />
    </div>
  );
}
