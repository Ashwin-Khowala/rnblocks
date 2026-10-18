"use client";

import React, { useState } from "react";
import { DeviceFrame } from "./DeviceFrame";
import { Moon, Sun, Smartphone, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveBlockPreviewProps {
  Component: React.ComponentType;
  title?: string;
  type?: "block" | "screen";
  defaultMode?: "device" | "expanded";
  className?: string;
}

export function LiveBlockPreview({
  Component,
  title,
  type = "block",
  defaultMode,
  className,
}: LiveBlockPreviewProps) {
  const initialMode = defaultMode || (type === "screen" ? "device" : "expanded");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mode, setMode] = useState<"device" | "expanded">(initialMode);

  return (
    <div
      className={cn(
        "border border-[#263238] rounded-[8px] overflow-hidden bg-[#07090b] flex flex-col relative",
        className
      )}
    >
      {/* Corner Precision Brackets */}
      <span className="absolute top-1.5 left-2 text-[10px] font-mono text-[#00f5c8]/40 select-none pointer-events-none z-20">┌</span>
      <span className="absolute top-1.5 right-2 text-[10px] font-mono text-[#00f5c8]/40 select-none pointer-events-none z-20">┐</span>

      {/* Canvas Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0b1012] border-b border-[#263238] gap-2">
        <div className="flex items-center gap-2 font-mono text-[11px] text-[#929da4]">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] shadow-[0_0_6px_#00f5c8] animate-pulse" />
          <span className="hidden sm:inline font-bold text-[#f3f6f5]">SIMULATION.ACTIVE</span>
          <span className="text-[#718087] hidden sm:inline">// LIVE REACT NATIVE WEB</span>
          <span className="sm:hidden font-bold text-[#f3f6f5]">SIM.ACTIVE</span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-[#101719] border border-[#263238] rounded-[4px] p-0.5">
            <button
              onClick={() => setMode("device")}
              className={cn(
                "inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-[3px] transition-all cursor-pointer",
                mode === "device"
                  ? "bg-[#00f5c8]/15 text-[#00f5c8] font-bold border border-[#00f5c8]/30 shadow-[0_0_8px_rgba(0,245,200,0.15)]"
                  : "text-[#718087] hover:text-[#f3f6f5]"
              )}
              title="Mobile Device Frame"
            >
              <Smartphone size={12} />
              <span>Mobile</span>
            </button>
            <button
              onClick={() => setMode("expanded")}
              className={cn(
                "inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-[3px] transition-all cursor-pointer",
                mode === "expanded"
                  ? "bg-[#00f5c8]/15 text-[#00f5c8] font-bold border border-[#00f5c8]/30 shadow-[0_0_8px_rgba(0,245,200,0.15)]"
                  : "text-[#718087] hover:text-[#f3f6f5]"
              )}
              title="Expanded Card View"
            >
              <Monitor size={12} />
              <span>Card</span>
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] bg-[#101719] border border-[#263238] text-[#929da4] hover:text-[#00f5c8] hover:border-[#00f5c8]/40 transition-all cursor-pointer"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} canvas`}
          >
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div
        className={cn(
          "p-2 sm:p-6 md:p-8 flex justify-center items-center min-h-[440px] sm:min-h-[460px] transition-colors duration-200 overflow-hidden relative",
          theme === "light"
            ? "bg-[#f4f7f6] bg-[radial-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:16px_16px]"
            : "bg-[#07090b] bg-[radial-gradient(rgba(0,245,200,0.06)_1px,transparent_1px)] bg-[size:16px_16px]"
        )}
      >
        {mode === "device" ? (
          <DeviceFrame theme={theme} width={360} maxHeight={580}>
            <div className="w-full min-h-full">
              <Component {...({ theme } as any)} />
            </div>
          </DeviceFrame>
        ) : (
          <div className="max-w-[460px] w-full flex items-center justify-center">
            <Component {...({ theme } as any)} />
          </div>
        )}
      </div>

      {/* Bottom Corner Precision Brackets */}
      <span className="absolute bottom-1.5 left-2 text-[10px] font-mono text-[#00f5c8]/40 select-none pointer-events-none z-20">└</span>
      <span className="absolute bottom-1.5 right-2 text-[10px] font-mono text-[#00f5c8]/40 select-none pointer-events-none z-20">┘</span>
    </div>
  );
}

