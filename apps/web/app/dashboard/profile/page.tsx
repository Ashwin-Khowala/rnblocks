"use client";

import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { DashboardTabs } from "@/components/DashboardTabs";
import { BLOCKS_DATA } from "@/data/blocks";

export default function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="header-info">
            <h1 className="page-title">Author Profile</h1>
            <p className="page-subtitle">
              Maintainer and contributor identity in the RNBlocks open-source ecosystem.
            </p>
          </div>
        </div>

        {/* Dashboard Nav Tabs */}
        <DashboardTabs />

        {/* Profile Content Grid */}
        <div className="profile-grid">
          {/* Left Column: Author Card */}
          <div className="author-card">
            <div className="author-avatar-large">AK</div>
            <div className="author-identity">
              <h2 className="author-name">Ashwin Khowala</h2>
              <a
                href="https://github.com/Ashwin-Khowala"
                target="_blank"
                rel="noreferrer"
                className="github-handle"
              >
                <GitHubIcon size={14} />
                <span>@Ashwin-Khowala</span>
              </a>
            </div>
            <div className="author-role-wrap">
              <span className="author-role-badge">Project Founder & Maintainer</span>
            </div>
          </div>

          {/* Right Column: Philosophy & Details */}
          <div className="details-card">
            <div className="section-block">
              <h3 className="section-heading">Registry Ownership & Philosophy</h3>
              <p className="section-text">
                RNBlocks components are authored directly in Git. All blocks are free and public. Every block includes full source code, platform compatibility tags, and zero proprietary lock-in.
              </p>
            </div>

            <div className="stats-subgrid">
              <div className="stat-box">
                <span className="stat-label">Published Blocks</span>
                <span className="stat-number">{BLOCKS_DATA.length}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Registry License</span>
                <span className="stat-number">MIT</span>
              </div>
            </div>

            <div className="action-buttons-row">
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <GitHubIcon size={14} />
                <span>Visit GitHub Repository</span>
              </a>
              <Link href="/docs" className="btn-secondary">
                <BookOpen size={14} />
                <span>CLI Documentation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-page {
          min-height: calc(100vh - 120px);
          background: var(--bg-primary);
          color: var(--text-primary);
          padding: 48px 0 80px;
          flex: 1;
        }

        .profile-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .profile-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
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

        .profile-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
        }

        .author-card {
          padding: 28px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          height: fit-content;
        }

        .author-avatar-large {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .author-identity {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .author-name {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .github-handle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .github-handle:hover {
          color: #ffffff;
        }

        .author-role-wrap {
          padding-top: 14px;
          border-top: 1px solid var(--border);
          width: 100%;
        }

        .author-role-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        .details-card {
          padding: 28px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .section-block {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .section-heading {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .section-text {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 22px;
          margin: 0;
        }

        .stats-subgrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .stat-box {
          padding: 16px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          font-size: 11.5px;
          color: var(--text-muted);
        }

        .stat-number {
          font-size: 24px;
          font-weight: 800;
          font-family: var(--font-mono);
          color: var(--text-primary);
        }

        .action-buttons-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          padding-top: 6px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #ffffff;
          color: #000000;
          font-size: 12.5px;
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
          background: var(--bg-elevated);
          color: var(--text-primary);
          font-size: 12.5px;
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

        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }

          .stats-subgrid {
            grid-template-columns: 1fr;
          }

          .action-buttons-row {
            flex-direction: column;
            width: 100%;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
