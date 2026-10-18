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
    let touchFadeTimer: ReturnType<typeof setTimeout> | null = null;

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

    const updatePosition = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const mx = Math.round(clientX - rect.left);
      const my = Math.round(clientY - rect.top);

      if (touchFadeTimer) {
        clearTimeout(touchFadeTimer);
        touchFadeTimer = null;
      }

      // If pointer is within or touching the hero area
      if (my >= -20 && my <= rect.height + 20 && mx >= 0 && mx <= rect.width) {
        // Snap immediately if entering or previously off-screen
        if (!mouseRef.current.isHovering || mouseRef.current.x < 0) {
          mouseRef.current.x = mx;
          mouseRef.current.y = my;
        }
        mouseRef.current.targetX = mx;
        mouseRef.current.targetY = my;
        mouseRef.current.isHovering = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      if (touchFadeTimer) clearTimeout(touchFadeTimer);
      touchFadeTimer = setTimeout(() => {
        mouseRef.current.isHovering = false;
      }, 1500);
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Generate precision circuit bus traces routing down toward workbench
    const buildTraces = (w: number, h: number): CircuitTrace[] => {
      const traces: CircuitTrace[] = [];
      const isMobile = w < 768;
      const benchTop = isMobile ? 385 : h * 0.52;
      const cX = w / 2;

      // Mobile: generous, uncluttered circuit telemetry avoiding the screen corners
      if (isMobile) {
        // Trace 1: Upper Horizon Telemetry Bus (runs under navbar with 24px inset, 45° cyber step)
        traces.push({
          startX: 24,
          startY: 70,
          segments: [
            { x: Math.round(w * 0.52), y: 70 },
            { x: Math.round(w * 0.52) + 12, y: 82 },
            { x: w - 24, y: 82 },
          ],
          color: "#00f5c8",
          speed: 1.0,
          dashLength: 32,
          gapLength: 420,
        });

        // Trace 2: Workbench Ingress Bus (runs in open seam between buttons and workbench with 45° step, 20px inset)
        traces.push({
          startX: 20,
          startY: benchTop - 16,
          segments: [
            { x: Math.round(w * 0.40), y: benchTop - 16 },
            { x: Math.round(w * 0.40) + 12, y: benchTop - 4 },
            { x: w - 20, y: benchTop - 4 },
          ],
          color: "#00d9ff",
          speed: 1.15,
          dashLength: 34,
          gapLength: 460,
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
      mouse.x += (mouse.targetX - mouse.x) * 0.22;
      mouse.y += (mouse.targetY - mouse.y) * 0.22;

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
      const isMobile = width < 768;
      const rulerY = isMobile ? 56 : 0;
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
      ctx.font = "8px monospace";
      ctx.lineWidth = 1;

      const tickSpacing = isMobile ? 24 : 16;
      for (let x = 0; x < width; x += tickSpacing) {
        const isMajor = x % (tickSpacing * (isMobile ? 4 : 5)) === 0;
        const tickH = isMajor ? (isMobile ? 6 : 8) : (isMobile ? 3 : 4);
        ctx.beginPath();
        ctx.moveTo(x, rulerY);
        ctx.lineTo(x, rulerY + tickH);
        ctx.stroke();

        if (isMajor && x > 20 && x < width - 40) {
          ctx.fillText(`${x}`, x + 2, rulerY + 12);
        }
      }
      ctx.restore();

      // ── 3. Architectural CAD Grid with Crosshairs (Text Zone Excluded) ──
      const gridSize = 80;
      const startX = (width % gridSize) / 2;
      const startY = isMobile ? 64 : 32;

      ctx.save();
      ctx.lineWidth = 1;

      for (let x = startX; x < width; x += gridSize) {
        for (let y = startY; y < height; y += gridSize) {
          // Exclude center text area to ensure 100% typography purity
          const distToCenter = Math.hypot(x - cX, y - (isMobile ? 220 : height * 0.26));
          if (distToCenter < (isMobile ? 180 : 260)) continue;

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
        ctx.shadowBlur = isMobile ? 6 : 10;
        ctx.lineWidth = isMobile ? 1.2 : 1.4;
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
      const horizonY = isMobile ? Math.min(440, height * 0.34) : height * 0.52;
      const deckBottom = height;
      const perspectiveSteps = isMobile ? 5 : 8;

      ctx.save();
      const tilt = mouse.isHovering ? (mouse.x - cX) * 0.03 : 0;

      for (let i = 1; i <= perspectiveSteps; i++) {
        const p = Math.pow(i / perspectiveSteps, 2.2);
        const y = horizonY + p * (deckBottom - horizonY);
        const baseAlpha = isMobile ? 0.07 : 0.16;
        const alpha = Math.min(baseAlpha, 0.02 + p * (isMobile ? 0.05 : 0.12));

        const hGrad = ctx.createLinearGradient(0, y, width, y);
        hGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        hGrad.addColorStop(0.3, `rgba(0, 245, 200, ${alpha * 0.4})`);
        hGrad.addColorStop(0.5, `rgba(0, 245, 200, ${alpha})`);
        hGrad.addColorStop(0.7, `rgba(0, 217, 255, ${alpha * 0.4})`);
        hGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = hGrad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Converging perspective lines toward workbench (desktop only to keep mobile background ultra-clean)
      if (!isMobile) {
        const rayCount = 12;
        for (let i = -rayCount / 2; i <= rayCount / 2; i++) {
          if (i === 0) continue;
          const xBottom = cX + tilt + i * (width / rayCount) * 1.3;
          const xTop = cX + tilt + i * 24;

          const rayGrad = ctx.createLinearGradient(xTop, horizonY, xBottom, deckBottom);
          rayGrad.addColorStop(0, "rgba(0, 245, 200, 0.01)");
          rayGrad.addColorStop(0.5, "rgba(0, 245, 200, 0.07)");
          rayGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.strokeStyle = rayGrad;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(xTop, horizonY);
          ctx.lineTo(xBottom, deckBottom);
          ctx.stroke();
        }
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
      if (touchFadeTimer) clearTimeout(touchFadeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
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

      {/* ── Precision Horizon Emitter (Behind Phone Workbench, desktop only) ── */}
      <div className="hidden md:block absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] md:w-[940px] h-[220px] md:h-[300px] bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(0,245,200,0.12)_0%,rgba(0,217,255,0.05)_40%,transparent_75%)] blur-[50px] pointer-events-none" />

    </div>
  );
}
