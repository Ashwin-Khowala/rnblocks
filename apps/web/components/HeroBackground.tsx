"use client";

import React, { useEffect, useRef, useState } from "react";

interface CircuitTrace {
  startX: number;
  startY: number;
  segments: { x: number; y: number }[];
  color: string;
  speed: number;
  dashLength: number;
  gapLength: number;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    isHovering: false,
  });
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
      traces = buildTraces(width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = Math.round(e.clientX - rect.left);
      const my = Math.round(e.clientY - rect.top);
      mouseRef.current.targetX = mx;
      mouseRef.current.targetY = my;
      mouseRef.current.isHovering = true;
      setCoords({ x: Math.max(0, mx), y: Math.max(0, my) });
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Generate precision circuit bus traces routing down toward workbench
    const buildTraces = (w: number, h: number): CircuitTrace[] => {
      const traces: CircuitTrace[] = [];
      const benchTop = h * 0.52;
      const cX = w / 2;

      // Mobile: route strictly on outer margins and along horizon
      if (w < 768) {
        traces.push({
          startX: 6,
          startY: 16,
          segments: [
            { x: 6, y: 80 },
            { x: 16, y: 90 },
            { x: 16, y: benchTop - 12 },
            { x: 30, y: benchTop },
          ],
          color: "#32c798",
          speed: 1.2,
          dashLength: 18,
          gapLength: 140,
        });

        traces.push({
          startX: w - 6,
          startY: 16,
          segments: [
            { x: w - 6, y: 80 },
            { x: w - 16, y: 90 },
            { x: w - 16, y: benchTop - 12 },
            { x: w - 30, y: benchTop },
          ],
          color: "#06b6d4",
          speed: 1.0,
          dashLength: 18,
          gapLength: 150,
        });

        traces.push({
          startX: 0,
          startY: benchTop,
          segments: [{ x: w, y: benchTop }],
          color: "#32c798",
          speed: 1.5,
          dashLength: 26,
          gapLength: 200,
        });

        return traces;
      }

      // Desktop / Tablet layout
      traces.push({
        startX: 40,
        startY: 90,
        segments: [
          { x: w * 0.2, y: 90 },
          { x: w * 0.26, y: 140 },
          { x: cX - 300, y: 140 },
          { x: cX - 240, y: benchTop },
        ],
        color: "#32c798",
        speed: 1.4,
        dashLength: 24,
        gapLength: 180,
      });

      traces.push({
        startX: 0,
        startY: 180,
        segments: [
          { x: w * 0.16, y: 180 },
          { x: w * 0.22, y: 230 },
          { x: cX - 340, y: 230 },
          { x: cX - 280, y: benchTop + 40 },
        ],
        color: "#06b6d4",
        speed: 1.0,
        dashLength: 20,
        gapLength: 220,
      });

      traces.push({
        startX: w - 40,
        startY: 90,
        segments: [
          { x: w * 0.8, y: 90 },
          { x: w * 0.74, y: 140 },
          { x: cX + 300, y: 140 },
          { x: cX + 240, y: benchTop },
        ],
        color: "#32c798",
        speed: 1.2,
        dashLength: 24,
        gapLength: 190,
      });

      traces.push({
        startX: w,
        startY: 180,
        segments: [
          { x: w * 0.84, y: 180 },
          { x: w * 0.78, y: 230 },
          { x: cX + 340, y: 230 },
          { x: cX + 280, y: benchTop + 40 },
        ],
        color: "#06b6d4",
        speed: 0.9,
        dashLength: 20,
        gapLength: 240,
      });

      traces.push({
        startX: 0,
        startY: benchTop,
        segments: [{ x: w, y: benchTop }],
        color: "#32c798",
        speed: 1.8,
        dashLength: 32,
        gapLength: 260,
      });

      return traces;
    };

    let traces = buildTraces(1200, 800);
    handleResize();
    window.addEventListener("resize", handleResize);

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += prefersReducedMotion ? 0.002 : 0.016;

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const cX = width / 2;

      // ── 1. Top Horizon Ambient Wash ──
      const topGlow = ctx.createRadialGradient(cX, -40, 0, cX, -40, width * 0.6);
      topGlow.addColorStop(0, "rgba(50, 199, 152, 0.10)");
      topGlow.addColorStop(0.5, "rgba(6, 182, 212, 0.03)");
      topGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, width, height * 0.5);

      // ── 2. Precision Architectural Caliper Ruler (Top Edge) ──
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.font = "8px monospace";
      ctx.lineWidth = 1;

      const tickSpacing = 16;
      for (let x = 0; x < width; x += tickSpacing) {
        const isMajor = x % (tickSpacing * 5) === 0;
        const tickH = isMajor ? 8 : 4;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, tickH);
        ctx.stroke();

        if (isMajor && x > 0 && x < width - 40) {
          ctx.fillText(`${x}`, x + 2, 16);
        }
      }
      ctx.restore();

      // ── 3. Architectural CAD Grid with Crosshairs (Text Zone Excluded) ──
      const gridSize = 80;
      const startX = (width % gridSize) / 2;
      const startY = 32;

      ctx.save();
      ctx.lineWidth = 1;

      for (let x = startX; x < width; x += gridSize) {
        for (let y = startY; y < height; y += gridSize) {
          // Exclude center text area to ensure 100% typography purity
          const distToCenter = Math.hypot(x - cX, y - height * 0.26);
          if (distToCenter < 260) continue;

          const distToMouse = Math.hypot(x - mouse.x, y - mouse.y);
          let alpha = 0.035;

          if (mouse.isHovering && distToMouse < 220) {
            const factor = 1 - distToMouse / 220;
            alpha = 0.035 + factor * 0.22;
          }

          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          const cross = 2.5;
          ctx.beginPath();
          ctx.moveTo(x - cross, y);
          ctx.lineTo(x + cross, y);
          ctx.moveTo(x, y - cross);
          ctx.lineTo(x, y + cross);
          ctx.stroke();
        }
      }
      ctx.restore();

      // ── 4. High-Voltage Silicon Bus Traces with Traveling Data Pulses ──
      ctx.save();
      traces.forEach((trace) => {
        // Draw underlying static hairline trace
        ctx.beginPath();
        ctx.moveTo(trace.startX, trace.startY);
        trace.segments.forEach((seg) => ctx.lineTo(seg.x, seg.y));

        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.stroke();

        // Draw animated traveling laser data packet
        const offset = -time * trace.speed * 60;
        ctx.strokeStyle = trace.color;
        ctx.shadowColor = trace.color;
        ctx.shadowBlur = 10;
        ctx.lineWidth = 1.4;
        ctx.setLineDash([trace.dashLength, trace.gapLength]);
        ctx.lineDashOffset = offset;
        ctx.stroke();

        // Draw solder via pads (square dies) at key vertices
        ctx.setLineDash([]);
        ctx.shadowBlur = 0;
        ctx.fillStyle = trace.color;
        trace.segments.forEach((seg) => {
          ctx.fillRect(seg.x - 2, seg.y - 2, 4, 4);
        });
      });
      ctx.restore();

      // ── 5. Perspective Ground Grid Behind Workbench ──
      const horizonY = height * 0.52;
      const deckBottom = height;
      const perspectiveSteps = 8;

      ctx.save();
      const tilt = mouse.isHovering ? (mouse.x - cX) * 0.03 : 0;

      for (let i = 1; i <= perspectiveSteps; i++) {
        const p = Math.pow(i / perspectiveSteps, 2.2);
        const y = horizonY + p * (deckBottom - horizonY);
        const alpha = Math.min(0.16, 0.03 + p * 0.12);

        const hGrad = ctx.createLinearGradient(0, y, width, y);
        hGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        hGrad.addColorStop(0.3, `rgba(50, 199, 152, ${alpha * 0.4})`);
        hGrad.addColorStop(0.5, `rgba(50, 199, 152, ${alpha})`);
        hGrad.addColorStop(0.7, `rgba(6, 182, 212, ${alpha * 0.4})`);
        hGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = hGrad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Converging perspective lines toward workbench
      const rayCount = 12;
      for (let i = -rayCount / 2; i <= rayCount / 2; i++) {
        if (i === 0) continue;
        const xBottom = cX + tilt + i * (width / rayCount) * 1.3;
        const xTop = cX + tilt + i * 24;

        const rayGrad = ctx.createLinearGradient(xTop, horizonY, xBottom, deckBottom);
        rayGrad.addColorStop(0, "rgba(50, 199, 152, 0.01)");
        rayGrad.addColorStop(0.5, "rgba(50, 199, 152, 0.07)");
        rayGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = rayGrad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xTop, horizonY);
        ctx.lineTo(xBottom, deckBottom);
        ctx.stroke();
      }
      ctx.restore();

      // ── 6. Interactive Cursor Reticle (Corner Brackets) ──
      if (mouse.isHovering && mouse.x > 0 && mouse.y > 0) {
        ctx.save();
        ctx.strokeStyle = "rgba(50, 199, 152, 0.4)";
        ctx.lineWidth = 1;

        const bSize = 10;
        const offset = 14;

        // Top-Left bracket ┌
        ctx.beginPath();
        ctx.moveTo(mouse.x - offset - bSize, mouse.y - offset);
        ctx.lineTo(mouse.x - offset, mouse.y - offset);
        ctx.lineTo(mouse.x - offset, mouse.y - offset - bSize);
        ctx.stroke();

        // Top-Right bracket ┐
        ctx.beginPath();
        ctx.moveTo(mouse.x + offset + bSize, mouse.y - offset);
        ctx.lineTo(mouse.x + offset, mouse.y - offset);
        ctx.lineTo(mouse.x + offset, mouse.y - offset - bSize);
        ctx.stroke();

        // Bottom-Left bracket └
        ctx.beginPath();
        ctx.moveTo(mouse.x - offset - bSize, mouse.y + offset);
        ctx.lineTo(mouse.x - offset, mouse.y + offset);
        ctx.lineTo(mouse.x - offset, mouse.y + offset + bSize);
        ctx.stroke();

        // Bottom-Right bracket ┘
        ctx.beginPath();
        ctx.moveTo(mouse.x + offset + bSize, mouse.y + offset);
        ctx.lineTo(mouse.x + offset, mouse.y + offset);
        ctx.lineTo(mouse.x + offset, mouse.y + offset + bSize);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* HTML5 Canvas for precision PCB bus traces and interactive reticle */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* ── Precision Horizon Emitter (Behind Phone Workbench) ── */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] md:w-[940px] h-[300px] bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(50,199,152,0.14)_0%,rgba(6,182,212,0.06)_40%,transparent_75%)] blur-[50px] pointer-events-none" />

    </div>
  );
}
