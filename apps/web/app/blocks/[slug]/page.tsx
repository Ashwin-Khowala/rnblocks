"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { BLOCKS_DATA } from "@/data/blocks";
import { LiveBlockPreview } from "@/components/LiveBlockPreview";
import { CodeViewer } from "@/components/CodeViewer";
import { CopyButton } from "@/components/CopyButton";
import {
  ArrowLeft,
  CheckCircle2,
  Terminal,
  FileCode,
  Package,
  Layers,
  ExternalLink,
  Code2,
  Smartphone,
} from "lucide-react";

export default function BlockDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const block = BLOCKS_DATA.find((b) => b.slug === slug);

  if (!block) {
    return (
      <div className="container-main not-found-wrap">
        <h2>Block Not Found</h2>
        <p>The requested block "{slug}" does not exist in the registry.</p>
        <Link href="/blocks" className="btn-primary">
          Back to Blocks
        </Link>
        <style jsx>{`
          .not-found-wrap {
            padding: 100px 24px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }
        `}</style>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div className="detail-page-root">
      <div className="container-main">
        {/* Breadcrumb Back Link */}
        <div className="breadcrumb-bar">
          <Link href="/blocks" className="back-link">
            <ArrowLeft size={14} />
            <span>Back to Blocks</span>
          </Link>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-current">{block.title}</span>
        </div>

        {/* Title Header */}
        <div className="detail-header">
          <div className="header-left">
            <div className="category-tag">{block.category}</div>
            <h1 className="block-title">{block.title}</h1>
            <div className="author-line">
              <span className="by-label">by</span>
              <span className="author-name">{block.author}</span>
            </div>
          </div>

          <div className="header-right">
            <div className="cli-quick-install">
              <span className="cli-prompt">$</span>
              <span className="cli-text">npx rnblocks add {block.slug}</span>
              <CopyButton text={`npx rnblocks add ${block.slug}`} label="Copy" />
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="detail-layout">
          {/* Left Column: Preview & Code Tabs */}
          <div className="detail-main-col">
            {/* View Switcher Tabs */}
            <div className="tabs-header">
              <button
                onClick={() => setActiveTab("preview")}
                className={`tab-btn ${activeTab === "preview" ? "tab-btn-active" : ""}`}
              >
                <Smartphone size={15} />
                <span>Live Preview</span>
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`tab-btn ${activeTab === "code" ? "tab-btn-active" : ""}`}
              >
                <Code2 size={15} />
                <span>Source Code</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="tab-body">
              {activeTab === "preview" ? (
                <LiveBlockPreview Component={block.Component} title={block.title} type={block.type} />
              ) : (
                <CodeViewer
                  code={block.code}
                  filename={`components/${block.slug}.tsx`}
                  language="tsx"
                />
              )}
            </div>

            {/* About / Implementation Guide */}
            <div className="about-section">
              <h3 className="section-title">About this block</h3>
              <p className="about-text">{block.description}</p>

              <div className="usage-notes">
                <h4 className="notes-title">Integration details</h4>
                <ul className="notes-list">
                  <li>Drop-in ready for Expo Router, React Navigation, and Bare React Native.</li>
                  <li>Formatted with strict TypeScript types and zero third-party lock-in.</li>
                  <li>Styled with standard {Array.isArray(block.styling) ? block.styling.join(", ") : block.styling} patterns for straightforward customization.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata Sidebar */}
          <div className="detail-sidebar-col">
            {/* Installation Box */}
            <div className="sidebar-card">
              <h4 className="card-heading">
                <Terminal size={15} />
                <span>Installation</span>
              </h4>
              <p className="sidebar-subtext">Add this block directly into your project:</p>
              <div className="sidebar-cli-box">
                <code>npx rnblocks add {block.slug}</code>
                <CopyButton text={`npx rnblocks add ${block.slug}`} />
              </div>
            </div>

            {/* Compatibility Checklist */}
            <div className="sidebar-card">
              <h4 className="card-heading">
                <CheckCircle2 size={15} />
                <span>Compatibility</span>
              </h4>
              <div className="compat-checklist">
                <div className="check-item">
                  <CheckCircle2 size={13} className="check-icon-svg" />
                  <span className="check-name">Expo SDK</span>
                  <span className="check-val">Supported</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={13} className="check-icon-svg" />
                  <span className="check-name">React Native</span>
                  <span className="check-val">Bare & Managed</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={13} className="check-icon-svg" />
                  <span className="check-name">iOS & Android</span>
                  <span className="check-val">Native Tested</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={13} className="check-icon-svg" />
                  <span className="check-name">React Native Web</span>
                  <span className="check-val">Live In-Browser</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={13} className="check-icon-svg" />
                  <span className="check-name">Styling</span>
                  <span className="check-val">{Array.isArray(block.styling) ? block.styling.join(", ") : block.styling}</span>
                </div>
              </div>
            </div>

            {/* Files Included */}
            <div className="sidebar-card">
              <h4 className="card-heading">
                <FileCode size={15} />
                <span>Files Included</span>
              </h4>
              <div className="files-list">
                <div className="file-item">
                  <span className="file-tree-symbol">components/</span>
                </div>
                <div className="file-item indent-file">
                  <span className="file-name-tag">{block.slug}.tsx</span>
                </div>
              </div>
            </div>

            {/* Dependencies */}
            <div className="sidebar-card">
              <h4 className="card-heading">
                <Package size={15} />
                <span>Dependencies</span>
              </h4>
              {block.dependencies.length > 0 ? (
                <div className="deps-tags-wrap">
                  {block.dependencies.map((dep, idx) => (
                    <span key={idx} className="dep-badge">
                      {dep}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="no-deps-text">Zero external dependencies required.</p>
              )}
            </div>

            {/* GitHub Source CTA */}
            <div className="sidebar-card github-card">
              <a
                href={`https://github.com/Ashwin-Khowala/rnblocks/tree/master/registry/blocks/${block.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <span>View on GitHub</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .detail-page-root {
          padding: 40px 0 80px;
          background: var(--bg-primary);
          flex: 1;
        }

        .breadcrumb-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .back-link:hover {
          color: var(--text-primary);
        }

        .breadcrumb-divider {
          color: var(--border-hover);
        }

        .breadcrumb-current {
          color: var(--text-primary);
        }

        .detail-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
        }

        .category-tag {
          display: inline-flex;
          align-items: center;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #a1a1aa;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 3px 10px;
          border-radius: 9999px;
          margin-bottom: 10px;
        }

        .block-title {
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .author-line {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
        }

        .by-label {
          color: var(--text-muted);
        }

        .author-name {
          color: var(--text-primary);
          font-weight: 600;
        }

        .author-handle {
          color: var(--text-muted);
        }

        .cli-quick-install {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 8px 12px;
          font-family: var(--font-mono);
          font-size: 13px;
        }

        .cli-prompt {
          color: var(--text-muted);
        }

        .cli-text {
          color: var(--text-primary);
        }

        .detail-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
        }

        .tabs-header {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          border: 1px solid var(--border);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
        }

        .tab-btn:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
        }

        .tab-btn-active {
          background: var(--accent);
          color: var(--accent-foreground);
          border-color: transparent;
          font-weight: 600;
        }

        .tab-body {
          margin-bottom: 40px;
          text-align: left !important;
        }

        .about-section {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .about-text {
          font-size: 14px;
          line-height: 22px;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .usage-notes {
          border-top: 1px solid var(--border);
          padding-top: 20px;
        }

        .notes-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .notes-list {
          padding-left: 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 20px;
        }

        /* Sidebar Styles */
        .detail-sidebar-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sidebar-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 18px;
        }

        .card-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .sidebar-subtext {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 10px;
        }

        .sidebar-cli-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--code-bg);
          border: 1px solid var(--code-border);
          border-radius: var(--radius-sm);
          padding: 8px 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-primary);
        }

        .compat-checklist {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .check-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12.5px;
        }

        .check-icon {
          color: var(--success);
          font-weight: 700;
          margin-right: 6px;
        }

        .check-name {
          flex: 1;
          color: var(--text-secondary);
        }

        .check-val {
          color: var(--text-primary);
          font-weight: 500;
          font-size: 12px;
        }

        .files-list {
          font-family: var(--font-mono);
          font-size: 12px;
        }

        .file-item {
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .indent-file {
          padding-left: 14px;
        }

        .file-name-tag {
          color: var(--text-primary);
        }

        .deps-tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .dep-badge {
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          color: var(--text-secondary);
        }

        .no-deps-text {
          font-size: 12px;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .detail-layout {
            grid-template-columns: 1fr;
          }

          .detail-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}
