"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  showScanline?: boolean;
  direction?: "up" | "down" | "left" | "right" | "none";
}

/**
 * ScrollReveal
 *
 * Cyberpunk HUD scroll entrance animation.
 * Smoothly activates sections and cards as they enter the viewport.
 * Features optional neon laser beam scanlines across borders on activation.
 * Automatically respects prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.08,
  rootMargin = "0px 0px -40px 0px",
  showScanline = false,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scanActive, setScanActive] = useState(false);

  useEffect(() => {
    // Respect system reduced-motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (showScanline) {
            setScanActive(true);
          }
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, showScanline]);

  const getTransformStyle = () => {
    if (isVisible) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return "translate3d(0, 24px, 0)";
      case "down":
        return "translate3d(0, -24px, 0)";
      case "left":
        return "translate3d(24px, 0, 0)";
      case "right":
        return "translate3d(-24px, 0, 0)";
      case "none":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transform: getTransformStyle(),
        transitionDelay: `${delay}ms`,
      }}
      className={cn(
        "relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {/* Optional Cyber Laser Sweep across border upon scroll activation */}
      {showScanline && scanActive && (
        <div
          className="absolute -top-px left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00f5c8] to-[#00d9ff] pointer-events-none z-20 animate-pulse"
          style={{
            boxShadow: "0 0 12px rgba(0,245,200,0.6)",
          }}
          onAnimationEnd={() => setScanActive(false)}
        />
      )}
      {children}
    </div>
  );
}
