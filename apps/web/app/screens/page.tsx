"use client";

import React from "react";
import Link from "next/link";
import { BLOCKS_DATA } from "@/data/blocks";
import {
  Smartphone,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Terminal,
  Code2,
  Compass,
  FolderPlus,
} from "lucide-react";

export default function ScreensPage() {
  const screens = BLOCKS_DATA.filter((b) => b.type === "screen");

  return (
    <div className="screens-page">
      <div className="container-main">
        {/* Header */}
        <div className="screens-header">
          <div className="status-pill">
            <Sparkles size={13} className="sparkle-icon" />
            <span>Full-Flow Mobile Screens</span>
          </div>
          <h1 className="page-title">Screens Directory</h1>
          <p className="page-subtitle">
            Complete, interconnected mobile screen experiences ready to drop into your
            Expo Router app. Fully functional with state, interactions, and native styling.
          </p>
        </div>

        {screens.length > 0 ? (
          <div className="screens-grid">
            {screens.map((screen) => {
              const ScreenComp = screen.Component;
              return (
                <div key={screen.slug} className="featured-screen-card">
                  <div className="featured-screen-left">
                    <div className="screen-badge-row">
                      <span className="live-status-badge">
                        <span className="live-dot" />
                        Live Screen
                      </span>
                      <span className="badge-tech">{screen.framework}</span>
                      {screen.styling.map((s) => (
                        <span key={s} className="badge-tech">{s}</span>
                      ))}
                    </div>

                    <h2 className="featured-screen-title">{screen.title}</h2>
                    <p className="featured-screen-desc">{screen.description}</p>

                    <div className="screen-install-cli">
                      <div className="cli-badge-group">
                        <Terminal size={14} className="term-icon" />
                        <code>npx rnblocks add {screen.name}</code>
                      </div>
                    </div>

                    <div className="screen-action-links">
                      <Link href={`/blocks/${screen.slug}`} className="btn-primary">
                        <span>View Source Code</span>
                        <Code2 size={15} />
                      </Link>
                    </div>
                  </div>

                  <div className="featured-screen-right">
                    {ScreenComp && <ScreenComp />}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ─── Curation & Roadmap State ───────────────────────────────────── */
          <div className="curation-card">
            <div className="curation-content">
              <div className="curation-badge">
                <Compass size={14} className="curation-badge-icon" />
                <span>Active Curation</span>
              </div>
              <h2 className="curation-title">Screen Flows Under Curation</h2>
              <p className="curation-desc">
                We are curating complete, production-grade mobile screen experiences
                designed specifically for React Native and Expo Router. In the meantime,
                explore modular UI blocks like the Floating Docker, or contribute a screen.
              </p>

              <div className="curation-roadmap-grid">
                <div className="roadmap-item">
                  <div className="roadmap-icon-box">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h4 className="roadmap-item-title">Onboarding & Walkthrough</h4>
                    <p className="roadmap-item-desc">
                      Multi-step swipeable carousel with pagination dots, haptic feedback, and permission triggers.
                    </p>
                  </div>
                </div>

                <div className="roadmap-item">
                  <div className="roadmap-icon-box">
                    <Layers size={18} />
                  </div>
                  <div>
                    <h4 className="roadmap-item-title">Auth & Social Login</h4>
                    <p className="roadmap-item-desc">
                      Clean input forms, phone OTP verification states, and OAuth action buttons.
                    </p>
                  </div>
                </div>

                <div className="roadmap-item">
                  <div className="roadmap-icon-box">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="roadmap-item-title">Subscription Paywall</h4>
                    <p className="roadmap-item-desc">
                      Annual/monthly billing toggle, feature comparison list, and terms disclaimer.
                    </p>
                  </div>
                </div>

                <div className="roadmap-item">
                  <div className="roadmap-icon-box">
                    <FolderPlus size={18} />
                  </div>
                  <div>
                    <h4 className="roadmap-item-title">Profile & Preferences</h4>
                    <p className="roadmap-item-desc">
                      Avatar photo selector, account management settings, and switch toggles.
                    </p>
                  </div>
                </div>
              </div>

              <div className="curation-actions">
                <Link href="/blocks" className="btn-primary">
                  <span>Explore UI Blocks</span>
                  <ArrowRight size={14} />
                </Link>
                <Link href="/submit" className="btn-secondary">
                  <span>Propose a Screen</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ─── Contribution Banner ─────────────────────────────────────────── */}
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

        /* ─── Curation Card ────────────────────────────────────────────────── */
        .curation-card {
          background: #0d0d11;
          border: 1px solid #1a1a22;
          border-radius: 24px;
          padding: 48px;
          margin-bottom: 48px;
        }

        .curation-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 10px;
          border-radius: 6px;
          background: rgba(50, 199, 152, 0.08);
          border: 1px solid rgba(50, 199, 152, 0.25);
          color: #32c798;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .curation-badge-icon {
          color: #32c798;
        }

        .curation-title {
          font-size: 26px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .curation-desc {
          font-size: 15px;
          line-height: 24px;
          color: #9ca3af;
          max-width: 680px;
          margin-bottom: 36px;
        }

        .curation-roadmap-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 36px;
        }

        .roadmap-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: #111116;
          border: 1px solid #1c1c24;
          border-radius: 14px;
          padding: 20px;
        }

        .roadmap-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #181820;
          border: 1px solid #282834;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
        }

        .roadmap-item-title {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .roadmap-item-desc {
          font-size: 13px;
          line-height: 19px;
          color: #8e8e98;
        }

        .curation-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        /* ─── Featured Screen ─────────────────────────────────────────────── */
        .featured-screen-card {
          background: #0f0f13;
          border: 1px solid #1f1f26;
          border-radius: 24px;
          padding: 44px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
          margin-bottom: 48px;
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

        /* ─── Contribution Banner ─────────────────────────────────────────── */
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

        @media (max-width: 900px) {
          .curation-roadmap-grid {
            grid-template-columns: 1fr;
          }

          .curation-card {
            padding: 32px 24px;
          }
        }

        @media (max-width: 768px) {
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
