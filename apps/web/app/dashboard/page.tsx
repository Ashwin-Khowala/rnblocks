"use client";

import React from "react";
import Link from "next/link";
import { GitPullRequest, Layers, CheckCircle2, ArrowUpRight, ShieldCheck } from "lucide-react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { DashboardTabs } from "@/components/DashboardTabs";
import { BLOCKS_DATA } from "@/data/blocks";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Top Header */}
        <div className="dashboard-header">
          <div className="header-info">
            <div className="arch-badge">
              <span className="status-dot"></span>
              <span>Git-First Registry Architecture</span>
            </div>
            <h1 className="page-title">Contributor Hub</h1>
            <p className="page-subtitle">
              Explore live registry components, contribution status, and GitHub PR pipeline.
            </p>
          </div>

          <div className="header-actions">
            <Link href="/submit" className="btn-primary">
              <GitPullRequest size={15} />
              <span>Submit Component via PR</span>
            </Link>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <GitHubIcon size={15} />
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <DashboardTabs />

        {/* Overview Metric Cards */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Live in Registry</span>
              <Layers size={18} className="metric-icon" />
            </div>
            <div className="metric-value">{BLOCKS_DATA.length}</div>
            <div className="metric-status status-success">
              <CheckCircle2 size={13} />
              <span>100% verified & tested</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Contribution Model</span>
              <GitPullRequest size={18} className="metric-icon" />
            </div>
            <div className="metric-value metric-value-text">Git-as-Database</div>
            <p className="metric-desc">
              Every block is a folder in Git with automated CI Zod validation.
            </p>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Access Model</span>
              <ShieldCheck size={18} className="metric-icon" />
            </div>
            <div className="metric-value metric-value-text">100% Free & Open</div>
            <p className="metric-desc">
              Zero paywalls or auth walls until author tiers are introduced.
            </p>
          </div>
        </div>

        {/* Current Registry Components */}
        <div className="registry-section">
          <div className="section-title-row">
            <h2 className="section-title">Current Registry Components</h2>
            <Link href="/blocks" className="browse-link">
              <span>Browse Gallery</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="components-card-list">
            {BLOCKS_DATA.map((item) => (
              <div key={item.slug} className="component-row">
                <div className="component-meta">
                  <div className="component-headline">
                    <span className="component-title">{item.title}</span>
                    <span className="component-slug">{item.slug}</span>
                    <span className="status-badge-active">Active</span>
                  </div>
                  <p className="component-desc">{item.description}</p>
                </div>

                <div className="component-actions">
                  <span className="component-author">by {item.author}</span>
                  <Link href={`/blocks/${item.slug}`} className="view-detail-btn">
                    <span>View Detail</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-page {
          min-height: calc(100vh - 120px);
          background: var(--bg-primary);
          color: var(--text-primary);
          padding: 48px 0 80px;
          flex: 1;
        }

        .dashboard-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .dashboard-header {
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

        .arch-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
          width: fit-content;
          margin-bottom: 4px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
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
          gap: 12px;
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

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--bg-card);
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 500;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: background var(--transition-fast), border-color var(--transition-fast);
        }

        .btn-secondary:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-hover);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }

        .metric-card {
          padding: 22px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          transition: border-color var(--transition-fast), background var(--transition-fast);
        }

        .metric-card:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-hover);
        }

        .metric-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .metric-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .metric-icon {
          color: var(--text-muted);
        }

        .metric-value {
          font-size: 32px;
          font-weight: 800;
          font-family: var(--font-mono);
          color: var(--text-primary);
          margin-bottom: 8px;
          letter-spacing: -0.03em;
        }

        .metric-value-text {
          font-size: 20px;
          font-family: var(--font-sans);
          letter-spacing: -0.01em;
          font-weight: 700;
        }

        .metric-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-success {
          color: #10b981;
        }

        .metric-desc {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 17px;
          margin: 0;
        }

        .registry-section {
          margin-top: 10px;
        }

        .section-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .browse-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .browse-link:hover {
          color: var(--text-primary);
        }

        .components-card-list {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .component-row {
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 1px solid var(--border);
          transition: background var(--transition-fast);
        }

        .component-row:last-child {
          border-bottom: none;
        }

        .component-row:hover {
          background: var(--bg-card-hover);
        }

        .component-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .component-headline {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .component-title {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .component-slug {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          padding: 2px 7px;
          border-radius: var(--radius-sm);
        }

        .status-badge-active {
          font-size: 10.5px;
          font-weight: 600;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 1px 7px;
          border-radius: var(--radius-full);
        }

        .component-desc {
          font-size: 12.5px;
          color: var(--text-muted);
          margin: 0;
          line-height: 18px;
          max-width: 600px;
        }

        .component-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .component-author {
          font-size: 11.5px;
          color: var(--text-muted);
        }

        .view-detail-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: var(--bg-elevated);
          color: var(--text-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          transition: background var(--transition-fast), border-color var(--transition-fast);
        }

        .view-detail-btn:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-hover);
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .header-actions {
            flex-direction: column;
            width: 100%;
          }

          .btn-primary,
          .btn-secondary {
            justify-content: center;
            width: 100%;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .component-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .component-actions {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
