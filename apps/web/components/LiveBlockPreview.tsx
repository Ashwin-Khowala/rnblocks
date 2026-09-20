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
        "border border-white/10 rounded-2xl overflow-hidden bg-[#07070a] flex flex-col",
        className
      )}
    >
      {/* Canvas Controls Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0a0a0e] border-b border-white/[0.08] gap-2">
        <div className="flex items-center gap-2 font-mono text-[11px] text-[#9ca3af]">
          <span className="w-2 h-2 rounded-full bg-[#32c798] shadow-[0_0_8px_#32c798] animate-pulse" />
          <span className="hidden sm:inline">Interactive Live React Native Preview</span>
          <span className="sm:hidden">Live Preview</span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-white/[0.04] border border-white/[0.08] rounded-lg p-0.5">
            <button
              onClick={() => setMode("device")}
              className={cn(
                "inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded-md transition-colors cursor-pointer",
                mode === "device"
                  ? "bg-white/[0.1] text-white font-semibold"
                  : "text-[#71717a] hover:text-white"
              )}
              title="Mobile Device Frame"
            >
              <Smartphone size={13} />
              <span>Mobile</span>
            </button>
            <button
              onClick={() => setMode("expanded")}
              className={cn(
                "inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded-md transition-colors cursor-pointer",
                mode === "expanded"
                  ? "bg-white/[0.1] text-white font-semibold"
                  : "text-[#71717a] hover:text-white"
              )}
              title="Expanded Card View"
            >
              <Monitor size={13} />
              <span>Card</span>
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#9ca3af] hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} canvas`}
          >
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div
        className={cn(
          "p-3 sm:p-6 md:p-9 flex justify-center items-center min-h-[460px] transition-colors duration-200 overflow-hidden",
          theme === "light"
            ? "bg-[#e4e4e7] bg-[radial-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:16px_16px]"
            : "bg-[#09090c] bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:16px_16px]"
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
    </div>
  );
}
