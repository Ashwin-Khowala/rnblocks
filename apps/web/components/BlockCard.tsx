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

  return (
    <div className="card-root">
      {/* Top Interactive Mini-Preview Canvas */}
      <Link href={`/blocks/${slug}`} className="preview-link" title={`View ${title}`}>
        <div className="preview-canvas-box">
          <div className="scaled-content">
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
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
        }

        .card-root:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-hover);
          transform: translateY(-2px);
        }

        .preview-link {
          display: block;
          position: relative;
          cursor: pointer;
        }

        .preview-canvas-box {
          height: 250px;
          background: #09090b;
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 14px 14px;
          border-bottom: 1px solid var(--border);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }

        .scaled-content {
          width: 320px;
          pointer-events: none;
          transform: scale(0.85);
          transform-origin: center center;
        }

        .preview-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 10, 0.4);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity var(--transition-fast);
        }

        .card-root:hover .preview-overlay {
          opacity: 1;
        }

        .view-details-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--accent);
          color: var(--accent-foreground);
          font-weight: 600;
          font-size: 12px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
        }

        .card-info {
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .badges-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .category-pill {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-secondary);
        }

        .tech-tags {
          display: flex;
          gap: 6px;
        }

        .title-link {
          display: inline-block;
          margin-bottom: 6px;
        }

        .card-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          transition: color var(--transition-fast);
        }

        .card-title:hover {
          color: #ffffff;
        }

        .card-desc {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 18px;
          margin-bottom: 18px;
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
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }

        .author-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .author-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
        }

        .author-text {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .author-handle {
          font-size: 11px;
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
