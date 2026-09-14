"use client";

import React from "react";
import Link from "next/link";
import { BlockItem } from "@/data/blocks";
import { CopyButton } from "./CopyButton";
import { ArrowUpRight, Terminal } from "lucide-react";

interface BlockCardProps {
  block: BlockItem;
}

export function BlockCard({ block }: BlockCardProps) {
  const { slug, title, description, category, author, styling, framework, Component } = block;

  const authorInitials = typeof author === "string" ? author.slice(0, 2).toUpperCase() : "RN";
  const stylingLabel = Array.isArray(styling) ? styling.join(", ") : styling;

  const previewScale =
    slug === "floating-docker"
      ? 0.76
      : slug === "interactive-calendar"
      ? 0.58
      : slug === "trend-chart"
      ? 0.68
      : 0.70;

  return (
    <div className="card-root">
      {/* Top Interactive Mini-Preview Canvas with Window Bar */}
      <div className="card-window-bar">
        <div className="window-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
          <span className="card-filename">{slug}.tsx</span>
        </div>
        <span className="card-status-pill">Interactive</span>
      </div>

      <Link href={`/blocks/${slug}`} className="preview-link" title={`View ${title}`}>
        <div className="preview-canvas-box">
          <div
            className="scaled-content"
            style={{ transform: `scale(${previewScale})` }}
          >
            <Component />
          </div>
          <div className="preview-overlay">
            <span className="view-details-tag">
              <span>Inspect Block</span>
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </Link>

      {/* Card Info Content */}
      <div className="card-info">
        {/* Badges Row */}
        <div className="badges-row">
          <span className="category-pill">{category}</span>
          <div className="tech-tags">
            <span className="badge-tech">{stylingLabel}</span>
            <span className="badge-tech">{framework === "expo" ? "Expo" : "React Native"}</span>
          </div>
        </div>

        {/* Title & Description */}
        <Link href={`/blocks/${slug}`} className="title-link">
          <h3 className="card-title">{title}</h3>
        </Link>
        <p className="card-desc">{description}</p>

        {/* Author & Install Footer */}
        <div className="card-footer">
          <div className="author-wrap">
            <div className="author-avatar">{authorInitials}</div>
            <div className="author-text">
              <span className="author-name">{author}</span>
              <span className="author-handle">Maintainer</span>
            </div>
          </div>

          <div className="quick-install">
            <CopyButton
              text={`npx rnblocks add ${slug}`}
              className="install-copy-btn"
              label="CLI"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-root {
          background: #0d0d12;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .card-root:hover {
          background: #101017;
          border-color: rgba(50, 199, 152, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(50, 199, 152, 0.15);
        }

        .card-window-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: #08080b;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .window-dots {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot-red { background: #ff5f56; }
        .dot-yellow { background: #ffbd2e; }
        .dot-green { background: #27c93f; }

        .card-filename {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #71717a;
          margin-left: 6px;
          font-weight: 500;
        }

        .card-status-pill {
          font-family: var(--font-mono);
          font-size: 9.5px;
          color: #32c798;
          background: rgba(50, 199, 152, 0.08);
          border: 1px solid rgba(50, 199, 152, 0.2);
          padding: 1px 6px;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .preview-link {
          display: block;
          position: relative;
          cursor: pointer;
        }

        .preview-canvas-box {
          height: 220px;
          background: #09090b;
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 14px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }

        .scaled-content {
          width: 340px;
          pointer-events: none;
          transform-origin: center center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(7, 7, 9, 0.75) 0%, rgba(7, 7, 9, 0.2) 40%, transparent 80%);
          opacity: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 14px;
          transition: opacity 0.2s ease;
        }

        .card-root:hover .preview-overlay {
          opacity: 1;
        }

        .view-details-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #32c798;
          color: #070709;
          font-weight: 700;
          font-size: 11.5px;
          padding: 6px 14px;
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(50, 199, 152, 0.35);
          transform: translateY(4px);
          transition: transform 0.2s ease;
        }

        .card-root:hover .view-details-tag {
          transform: translateY(0);
        }

        .card-info {
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .badges-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          gap: 6px;
        }

        .category-pill {
          display: inline-flex;
          align-items: center;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #a1a1aa;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2px 7px;
          border-radius: 9999px;
        }

        .tech-tags {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .badge-tech {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 500;
          padding: 2px 6px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #d1d5db;
          white-space: nowrap;
        }

        .title-link {
          display: inline-block;
          margin-bottom: 4px;
        }

        .card-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          transition: color var(--transition-fast);
        }

        .card-title:hover {
          color: #ffffff;
        }

        .card-desc {
          font-size: 12.5px;
          color: var(--text-muted);
          line-height: 17px;
          margin-bottom: 14px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid var(--border);
        }

        .author-wrap {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .author-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9.5px;
          font-weight: 700;
        }

        .author-text {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .author-handle {
          font-size: 10px;
          color: var(--text-muted);
        }

        .quick-install {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
