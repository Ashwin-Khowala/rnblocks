"use client";

import React from "react";
import { Wifi, BatteryMedium, Signal } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeviceFrameProps {
  children: React.ReactNode;
  width?: number | string;
  maxHeight?: number | string;
  theme?: "dark" | "light";
  className?: string;
}

export function DeviceFrame({
  children,
  width = 340,
  maxHeight = 540,
  theme = "dark",
  className,
}: DeviceFrameProps) {
  return (
    <div className={cn("w-full mx-auto flex justify-center", className)} style={{ maxWidth: width }}>
      {/* Device Bezel */}
      <div className="w-full bg-black border-[6px] border-[#262626] rounded-[42px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] overflow-hidden relative flex flex-col select-none">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 pt-2.5 pb-1.5 bg-black text-[#f5f5f5] text-[11px] font-semibold z-10">
          <span className="font-mono tracking-tight w-8 text-center">9:41</span>
          <div className="w-20 h-[18px] bg-black rounded-[10px] border border-[#1f1f1f]" />
          <div className="flex items-center gap-1.5 w-12 justify-end text-[#f5f5f5]">
            <Signal size={12} strokeWidth={2.5} />
            <Wifi size={12} strokeWidth={2.5} />
            <BatteryMedium size={14} strokeWidth={2.5} />
          </div>
        </div>

        {/* Screen Canvas */}
        <div
          className={cn(
            "overflow-y-auto overflow-x-hidden flex-1 flex flex-col transition-colors duration-200",
            theme === "light" ? "bg-[#f8fafc] text-[#0f172a]" : "bg-[#09090b] text-[#f5f5f5]"
          )}
          style={{ maxHeight }}
        >
          {children}
        </div>

        {/* Home Indicator */}
        <div className="pt-2 pb-2.5 bg-black flex justify-center items-center z-10">
          <div className="w-28 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}
