"use client";

import React, { useState } from "react";
import { DeviceFrame } from "./DeviceFrame";
import { Moon, Sun, Smartphone, Monitor } from "lucide-react";

interface LiveBlockPreviewProps {
  Component: React.ComponentType;
  title?: string;
  type?: "block" | "screen";
  defaultMode?: "device" | "expanded";
}

export function LiveBlockPreview({
  Component,
  title,
  type = "block",
  defaultMode,
}: LiveBlockPreviewProps) {
  const initialMode = defaultMode || (type === "screen" ? "device" : "expanded");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mode, setMode] = useState<"device" | "expanded">(initialMode);

  return (
    <div className="preview-container">
      {/* Canvas Controls Bar */}
      <div className="preview-toolbar">
        <div className="toolbar-left">
          <span className="live-status-pill">
            <span className="live-dot" />
            Interactive Live React Native Preview
          </span>
        </div>

        <div className="toolbar-right">
          {/* View mode toggle */}
          <div className="toggle-group">
            <button
              onClick={() => setMode("device")}
              className={`toggle-btn ${mode === "device" ? "active" : ""}`}
              title="Mobile Device Frame"
            >
              <Smartphone size={13} />
              <span>Mobile</span>
            </button>
            <button
              onClick={() => setMode("expanded")}
              className={`toggle-btn ${mode === "expanded" ? "active" : ""}`}
              title="Expanded Card View"
            >
              <Monitor size={13} />
              <span>Card</span>
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="icon-action-btn"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} canvas`}
          >
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div
        className={`preview-canvas ${theme === "light" ? "canvas-light" : "canvas-dark"}`}
      >
        {mode === "device" ? (
          <DeviceFrame theme={theme} width={360} maxHeight={580}>
            <div className="device-component-wrap">
              <Component {...({ theme } as any)} />
            </div>
          </DeviceFrame>
        ) : (
          <div className="expanded-card-wrap">
            <Component {...({ theme } as any)} />
          </div>
        )}
      </div>

      <style jsx>{`
        .preview-container {
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card);
          display: flex;
          flex-direction: column;
        }

        .preview-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
        }

        .live-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-secondary);
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
          box-shadow: 0 0 6px var(--success);
        }

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .toggle-group {
          display: flex;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 2px;
        }

        .toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
          color: var(--text-muted);
          font-weight: 500;
          transition: color var(--transition-fast), background var(--transition-fast);
        }

        .toggle-btn.active {
          color: var(--text-primary);
          background: var(--bg-elevated);
        }

        .icon-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          transition: border-color var(--transition-fast), color var(--transition-fast);
        }

        .icon-action-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }

        .preview-canvas {
          padding: 36px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 480px;
          transition: background var(--transition-smooth);
        }

        .canvas-dark {
          background: #0f0f11;
          /* Subtle dot pattern */
          background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 16px 16px;
        }

        .canvas-light {
          background: #e4e4e7;
          background-image: radial-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px);
          background-size: 16px 16px;
        }

        .device-component-wrap {
          width: 100%;
          min-height: 100%;
        }

        .expanded-card-wrap {
          max-width: 460px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
