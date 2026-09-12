"use client";

import React from "react";
import Link from "next/link";
import { GitPullRequest, GitMerge, ExternalLink, Plus } from "lucide-react";
import { DashboardTabs } from "@/components/DashboardTabs";

export default function SubmissionsPage() {
  return (
    <div className="submissions-page">
      <div className="submissions-container">
        {/* Header */}
        <div className="submissions-header">
          <div className="header-info">
            <h1 className="page-title">Submissions & Pull Requests</h1>
            <p className="page-subtitle">
              Track open and merged block contributions submitted to RNBlocks.
            </p>
          </div>

          <div className="header-actions">
            <Link href="/submit" className="btn-primary">
              <Plus size={15} />
              <span>New Submission</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Nav Tabs */}
        <DashboardTabs />

        {/* PR Flow Guide Card */}
        <div className="guide-card">
          <div className="guide-icon-box">
            <GitPullRequest size={22} />
          </div>
          <div className="guide-content">
            <h2 className="guide-title">How Contributions Work</h2>
            <p className="guide-text">
              RNBlocks does not require an external account or database. Fork the repository on GitHub, create a folder under{" "}
              <code className="inline-code">registry/blocks/your-block/</code>, and submit a Pull Request. Our automated CI validates your Zod schema and tests your code before maintainer review.
            </p>
            <div className="guide-action">
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks/pulls"
                target="_blank"
                rel="noreferrer"
                className="pr-link"
              >
                <span>View GitHub Pull Requests</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Recent Pipeline Activity */}
        <div className="activity-card">
          <div className="activity-header">
            <span className="activity-header-title">Verified Registry Core</span>
            <span className="ci-status-badge">CI Status: Passing</span>
          </div>

          <div className="activity-row">
            <div className="activity-meta">
              <div className="merge-icon-circle">
                <GitMerge size={16} />
              </div>
              <div className="activity-details">
                <span className="activity-name">floating-docker: Core Navigation Dock</span>
                <span className="activity-meta-text">PR #1 · Merged into master · 1 file added</span>
              </div>
            </div>

            <div className="activity-status">
              <span className="live-status-pill">Live in Registry</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .submissions-page {
          min-height: calc(100vh - 120px);
          background: var(--bg-primary);
          color: var(--text-primary);
          padding: 48px 0 80px;
          flex: 1;
        }

        .submissions-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .submissions-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 28px;
          border-bottom: 1px solid var(--border);
        }

        .header-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .page-title {
          font-size: 30px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0;
        }

        .page-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0;
          line-height: 20px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #ffffff;
          color: #000000;
          font-size: 13px;
          font-weight: 600;
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: background var(--transition-fast), transform var(--transition-fast);
        }

        .btn-primary:hover {
          background: #e4e4e7;
          transform: translateY(-1px);
        }

        .guide-card {
          padding: 24px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          display: flex;
          gap: 20px;
          margin-bottom: 28px;
          transition: border-color var(--transition-fast);
        }

        .guide-card:hover {
          border-color: var(--border-hover);
        }

        .guide-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .guide-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .guide-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .guide-text {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 22px;
          margin: 0;
          max-width: 780px;
        }

        .inline-code {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }

        .guide-action {
          margin-top: 4px;
        }

        .pr-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 600;
          color: #10b981;
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .pr-link:hover {
          color: #34d399;
        }

        .activity-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .activity-header {
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .activity-header-title {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .ci-status-badge {
          font-size: 11.5px;
          font-family: var(--font-mono);
          color: #10b981;
        }

        .activity-row {
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .activity-meta {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .merge-icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .activity-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .activity-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .activity-meta-text {
          font-size: 12px;
          color: var(--text-muted);
        }

        .live-status-pill {
          display: inline-flex;
          align-items: center;
          font-size: 11px;
          font-weight: 600;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .submissions-header {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .header-actions {
            width: 100%;
          }

          .btn-primary {
            justify-content: center;
            width: 100%;
          }

          .guide-card {
            flex-direction: column;
            gap: 14px;
          }

          .activity-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }

          .activity-status {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
