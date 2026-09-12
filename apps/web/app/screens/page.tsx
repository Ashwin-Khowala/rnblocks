"use client";

import React from "react";
import Link from "next/link";
import { DeviceFrame } from "@/components/DeviceFrame";
import { CopyButton } from "@/components/CopyButton";
import { BLOCKS_DATA } from "@/data/blocks";
import {
  Smartphone,
  Layers,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  Terminal,
  Code2,
} from "lucide-react";

export default function ScreensPage() {
  const screenItem = BLOCKS_DATA.find((b) => b.slug === "teams-and-network");
  const ScreenComponent = screenItem?.Component || (() => null);

  return (
    <div className="screens-page">
      <div className="container-main">
        {/* Header */}
        <div className="screens-header">
          <div className="status-pill">
            <Sparkles size={13} className="sparkle-icon" />
            <span>Full-Flow Mobile Screens</span>
          </div>
          <h1 className="page-title">Production Screens</h1>
          <p className="page-subtitle">
            Complete, interconnected mobile screen experiences ready to drop into your
            Expo Router app. Fully functional with state, interactions, and native styling.
          </p>
        </div>

        {/* ─── Flagship Featured Screen: Teams & Network ───────────────────── */}
        <div className="featured-screen-card">
          <div className="featured-screen-left">
            <div className="screen-badge-row">
              <span className="live-status-badge">
                <span className="live-dot" />
                Live Screen
              </span>
              <span className="badge-tech">React Native</span>
              <span className="badge-tech">StyleSheet</span>
            </div>

            <h2 className="featured-screen-title">Teams & Network Screen</h2>
            <p className="featured-screen-desc">
              Production screen extracted from Fyndr. Features startup opportunity
              cards, match badges, compensation tags, search filter input, and the
              signature floating bottom dock with sliding capsule indicator.
            </p>

            <div className="screen-features-list">
              <div className="feature-row">
                <CheckCircle2 size={16} className="feature-check" />
                <span>Floating bottom docker with 5 vector SVG tabs</span>
              </div>
              <div className="feature-row">
                <CheckCircle2 size={16} className="feature-check" />
                <span>Zarwa & Curezy startup opportunity cards</span>
              </div>
              <div className="feature-row">
                <CheckCircle2 size={16} className="feature-check" />
                <span>Interactive filter tabs (Latest / For You / Network)</span>
              </div>
              <div className="feature-row">
                <CheckCircle2 size={16} className="feature-check" />
                <span>Continuous curved glassmorphic pill navigation</span>
              </div>
            </div>

            <div className="screen-install-cli">
              <div className="cli-badge-group">
                <Terminal size={14} className="term-icon" />
                <code>npx rnblocks add teams-and-network</code>
              </div>
              <CopyButton text="npx rnblocks add teams-and-network" label="Copy" />
            </div>

            <div className="screen-action-links">
              <Link href="/blocks/teams-and-network" className="btn-primary">
                <span>View Full Source Code</span>
                <Code2 size={15} />
              </Link>
            </div>
          </div>

          <div className="featured-screen-right">
            <DeviceFrame width={330} maxHeight={600} theme="dark">
              <ScreenComponent />
            </DeviceFrame>
          </div>
        </div>

        {/* Genuine Contribution & Ecosystem Banner */}
        <div className="screens-banner">
          <div>
            <h3 className="banner-title">Contribute Screen Flows</h3>
            <p className="banner-sub">
              Have a production React Native screen or flow to share with the community? Submit your component via Pull Request.
            </p>
          </div>
          <div className="banner-actions">
            <Link href="/submit" className="btn-primary">
              <span>Contribution Guide</span>
              <ArrowRight size={14} />
            </Link>
            <Link href="/blocks" className="btn-secondary">
              <span>Browse Blocks</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .screens-page {
          padding: 60px 0 100px;
          background: #070709;
          flex: 1;
        }

        .screens-header {
          max-width: 640px;
          margin-bottom: 40px;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 11px;
          font-family: var(--font-mono);
          color: #a1a1aa;
          margin-bottom: 16px;
        }

        .sparkle-icon {
          color: #32c798;
        }

        .page-title {
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .page-subtitle {
          font-size: 15px;
          line-height: 24px;
          color: #9ca3af;
        }

        /* ─── Flagship Featured Screen ─────────────────────────────────────── */
        .featured-screen-card {
          background: #0f0f13;
          border: 1px solid #1f1f26;
          border-radius: 24px;
          padding: 44px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
          margin-bottom: 64px;
        }

        .featured-screen-left {
          display: flex;
          flex-direction: column;
        }

        .screen-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .live-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-family: var(--font-mono);
          padding: 3px 8px;
          border-radius: 4px;
          background: rgba(50, 199, 152, 0.1);
          border: 1px solid rgba(50, 199, 152, 0.3);
          color: #32c798;
        }

        .live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #32c798;
        }

        .badge-tech {
          font-size: 11px;
          font-family: var(--font-mono);
          padding: 3px 8px;
          border-radius: 4px;
          background: #18181f;
          border: 1px solid #282832;
          color: #a1a1aa;
        }

        .featured-screen-title {
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .featured-screen-desc {
          font-size: 14.5px;
          line-height: 23px;
          color: #9ca3af;
          margin-bottom: 24px;
        }

        .screen-features-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }

        .feature-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          color: #d4d4d8;
        }

        .feature-check {
          color: #32c798;
          flex-shrink: 0;
        }

        .screen-install-cli {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #09090c;
          border: 1px solid #1f1f26;
          border-radius: 10px;
          padding: 8px 12px;
          margin-bottom: 24px;
          max-width: 440px;
        }

        .cli-badge-group {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 12.5px;
          color: #f4f4f5;
        }

        .term-icon {
          color: #71717a;
        }

        .screen-action-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .featured-screen-right {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* ─── Upcoming Section ─────────────────────────────────────────────── */
        .upcoming-section-header {
          margin-bottom: 24px;
        }

        .upcoming-title {
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .upcoming-sub {
          font-size: 14px;
          color: #71717a;
        }

        .screens-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }

        .screen-card {
          background: #0f0f13;
          border: 1px solid #1f1f26;
          border-radius: 16px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          transition: all 0.15s ease;
        }

        .screen-card:hover {
          background: #14141a;
          border-color: #2b2b36;
        }

        .screen-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .device-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #18181f;
          border: 1px solid #282832;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

        .screen-tags {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .screen-count-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 4px;
          background: #141418;
          border: 1px solid #22222a;
          color: #71717a;
        }

        .screen-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .screen-card-desc {
          font-size: 13.5px;
          color: #9ca3af;
          line-height: 20px;
          margin-bottom: 24px;
          flex: 1;
        }

        .screen-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid #1c1c24;
        }

        .status-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-family: var(--font-mono);
          color: #71717a;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f59e0b;
        }

        .propose-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 500;
          color: #ffffff;
          transition: all 0.15s ease;
        }

        .propose-link:hover {
          color: #32c798;
        }

        .screens-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #0f0f13;
          border: 1px solid #1f1f26;
          border-radius: 20px;
          padding: 32px 40px;
        }

        .banner-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .banner-sub {
          font-size: 14px;
          color: #9ca3af;
        }

        .banner-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        @media (max-width: 1024px) {
          .featured-screen-card {
            grid-template-columns: 1fr;
            padding: 32px;
          }
        }

        @media (max-width: 768px) {
          .screens-grid {
            grid-template-columns: 1fr;
          }

          .screens-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}
