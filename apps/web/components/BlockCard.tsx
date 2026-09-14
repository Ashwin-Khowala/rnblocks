"use client";

import React from "react";
import Link from "next/link";
import { BlockItem } from "@/data/blocks";
import { CopyButton } from "./CopyButton";

interface BlockCardProps {
  block: BlockItem;
  index?: number;
  total?: number;
}

export function BlockCard({ block, index = 0 }: BlockCardProps) {
  const { slug, title, category, styling, framework, Component } = block;
  const stylingLabel = Array.isArray(styling) ? styling.join(", ") : styling;

  // Tailored scaling for each block in desktop bento layout
  const previewScale =
    slug === "floating-docker"
      ? 1.0
      : slug === "interactive-calendar"
      ? 0.78
      : slug === "social-auth-buttons"
      ? 0.88
      : 1.0;

  const mobilePreviewScale =
    slug === "floating-docker"
      ? 0.84
      : slug === "interactive-calendar"
      ? 0.68
      : slug === "social-auth-buttons"
      ? 0.78
      : 0.82;

  const canvasMaxWidth =
    slug === "floating-docker"
      ? "400px"
      : slug === "trend-chart"
      ? "360px"
      : "360px";

  return (
    <div className={`grid-block-cell cell-${slug}`}>
      {/* Top Left Sleek Floating Control: Docs & Redirect to Component */}
      <div className="cell-top-actions">
        <div className="hover-action-pill">
          <Link href="/docs" className="hover-action-link hover-docs-link" title="Documentation">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
            <span>Docs</span>
          </Link>
          <span className="hover-action-sep" aria-hidden="true" />
          <Link
            href={`/blocks/${slug}`}
            className="hover-action-link hover-component-link"
            title={`View ${title}`}
          >
            <span>Component</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Top Right Quick Copy CLI */}
      <div className="cell-top-right">
        <CopyButton
          text={`npx rnblocks add ${slug}`}
          className="cell-cli-btn"
          label="CLI"
        />
      </div>

      {/* Interactive Canvas Preview */}
      <div className="cell-canvas">
        <div
          className="scaled-content-wrap"
          style={
            {
              width: "100%",
              maxWidth: canvasMaxWidth,
              "--scale-desktop": previewScale,
              "--scale-mobile": mobilePreviewScale,
            } as React.CSSProperties
          }
        >
          <Component />
        </div>
      </div>

      {/* Bottom Architectural Info Bar */}
      <div className="cell-footer-bar">
        <div className="cell-footer-left">
          <Link href={`/blocks/${slug}`} className="cell-title-link">
            <span className="cell-title">{title}</span>
          </Link>
          <span className="cell-category-pill">{category}</span>
        </div>
        <div className="cell-footer-right">
          <Link href="/docs" className="cell-docs-tag" title="Documentation">
            Docs
          </Link>
          <span className="cell-tech-pill">{stylingLabel}</span>
          <span className="cell-tech-pill">{framework === "expo" ? "Expo" : "React Native"}</span>
        </div>
      </div>

      <style jsx>{`
        .grid-block-cell {
          position: relative;
          background: #050508;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: background 0.2s ease;
        }

        .grid-block-cell:hover {
          background: #07070c;
        }

        /* ─── Top Left Actions (Docs & Redirect) ────────────────────────── */
        :global(.cell-top-actions) {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 25;
          opacity: 0;
          transform: translateY(-4px);
          pointer-events: none;
          transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .grid-block-cell:hover :global(.cell-top-actions),
        .grid-block-cell:focus-within :global(.cell-top-actions) {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        :global(.hover-action-pill) {
          display: inline-flex;
          align-items: center;
          background: rgba(12, 12, 16, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          padding: 3px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.04);
        }

        :global(.hover-action-link) {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          line-height: 1;
          color: #94a3b8 !important;
          text-decoration: none !important;
          transition: all 0.15s ease;
        }

        :global(.hover-action-link:hover) {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.08);
        }

        :global(.hover-action-link.hover-component-link) {
          color: #32c798 !important;
          font-weight: 600;
        }

        :global(.hover-action-link.hover-component-link:hover) {
          color: #4ade80 !important;
          background: rgba(50, 199, 152, 0.14);
        }

        :global(.hover-action-sep) {
          width: 1px;
          height: 12px;
          background: rgba(255, 255, 255, 0.15);
          margin: 0 1px;
        }

        :global(.hover-action-link svg) {
          display: block;
          flex-shrink: 0;
        }

        /* ─── Top Right CLI Copy ────────────────────────────────────────── */
        :global(.cell-top-right) {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 25;
          opacity: 0;
          transform: translateY(-4px);
          pointer-events: none;
          transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .grid-block-cell:hover :global(.cell-top-right),
        .grid-block-cell:focus-within :global(.cell-top-right) {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        :global(.cell-cli-btn) {
          background: rgba(12, 12, 16, 0.88) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          border-radius: 9999px !important;
          padding: 4px 10px !important;
          font-family: var(--font-mono) !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          color: #94a3b8 !important;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.04) !important;
          transition: all 0.15s ease !important;
        }

        :global(.cell-cli-btn:hover) {
          color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.22) !important;
          background: rgba(20, 20, 26, 0.95) !important;
        }

        /* ─── Canvas Preview ────────────────────────────────────────────── */
        .cell-canvas {
          position: relative;
          width: 100%;
          height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #050508;
          background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 18px 18px;
          overflow: hidden;
          padding: 24px 20px;
          box-sizing: border-box;
        }

        .scaled-content-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(var(--scale-desktop, 0.9));
          transform-origin: center center;
          pointer-events: auto;
          user-select: none;
          transition: transform 0.2s ease;
        }

        .scaled-content-wrap :global(> div) {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        /* ─── Bottom Footer Bar ─────────────────────────────────────────── */
        .cell-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #07070b;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          gap: 12px;
        }

        .cell-footer-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        :global(.cell-title-link) {
          text-decoration: none !important;
          min-width: 0;
          display: inline-flex;
          align-items: center;
        }

        .cell-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #f3f4f6;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.15s ease;
        }

        .cell-title:hover {
          color: #32c798;
        }

        .cell-category-pill {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #71717a;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2px 7px;
          border-radius: 9999px;
          white-space: nowrap;
        }

        .cell-footer-right {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        :global(.cell-docs-tag) {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          color: #94a3b8 !important;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2px 7px;
          border-radius: 4px;
          text-decoration: none !important;
          display: inline-flex;
          align-items: center;
          line-height: 1.2;
          transition: all 0.15s ease;
        }

        :global(.cell-docs-tag:hover) {
          color: #32c798 !important;
          border-color: rgba(50, 199, 152, 0.3);
          background: rgba(50, 199, 152, 0.08);
        }

        .cell-tech-pill {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          color: #a1a1aa;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2px 6px;
          border-radius: 4px;
          white-space: nowrap;
        }

        /* ─── Mobile Clean Layout (≤ 860px) ────────────────────────────── */
        @media (max-width: 860px) {
          :global(.cell-top-actions) {
            display: none !important;
          }

          :global(.cell-top-right) {
            display: none !important;
          }

          .cell-canvas {
            height: 290px;
            padding: 14px 10px;
          }

          .scaled-content-wrap {
            transform: scale(var(--scale-mobile, 0.76));
            width: 100% !important;
            max-width: 100% !important;
          }

          .cell-footer-bar {
            padding: 10px 14px;
          }

          .cell-title {
            font-size: 12.5px;
          }

          .cell-tech-pill:last-child {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default BlockCard;
