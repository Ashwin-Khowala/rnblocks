"use client";

import React from "react";
import { Wifi, BatteryMedium, Signal } from "lucide-react";

interface DeviceFrameProps {
  children: React.ReactNode;
  width?: number | string;
  maxHeight?: number | string;
  theme?: "dark" | "light";
}

export function DeviceFrame({
  children,
  width = 340,
  maxHeight = 540,
  theme = "dark",
}: DeviceFrameProps) {
  return (
    <div className="device-outer" style={{ maxWidth: width }}>
      {/* Device Bezel */}
      <div className="device-bezel">
        {/* Status Bar */}
        <div className="status-bar">
          <span className="status-time">9:41</span>
          <div className="dynamic-island" />
          <div className="status-icons">
            <Signal size={12} strokeWidth={2.5} />
            <Wifi size={12} strokeWidth={2.5} />
            <BatteryMedium size={14} strokeWidth={2.5} />
          </div>
        </div>

        {/* Screen Canvas */}
        <div
          className={`screen-canvas ${theme === "light" ? "screen-light" : "screen-dark"}`}
          style={{ maxHeight }}
        >
          {children}
        </div>

        {/* Home Indicator */}
        <div className="home-bar-wrapper">
          <div className="home-bar" />
        </div>
      </div>

      <style jsx>{`
        .device-outer {
          width: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: center;
        }

        .device-bezel {
          width: 100%;
          background: #000000;
          border: 6px solid #262626;
          border-radius: 42px;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          user-select: none;
        }

        .status-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px 6px;
          background: #000000;
          color: #f5f5f5;
          font-size: 11px;
          font-weight: 600;
          z-index: 10;
        }

        .status-time {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
          letter-spacing: -0.01em;
          width: 32px;
        }

        .dynamic-island {
          width: 80px;
          height: 18px;
          background: #000000;
          border-radius: 10px;
          border: 1px solid #1f1f1f;
        }

        .status-icons {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 48px;
          justify-content: flex-end;
          color: #f5f5f5;
        }

        .screen-canvas {
          overflow-y: auto;
          overflow-x: hidden;
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #09090b;
        }

        .screen-dark {
          background: #09090b;
          color: #f5f5f5;
        }

        .screen-light {
          background: #f8fafc;
          color: #0f172a;
        }

        .home-bar-wrapper {
          padding: 8px 0 10px;
          background: #000000;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }

        .home-bar {
          width: 110px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
