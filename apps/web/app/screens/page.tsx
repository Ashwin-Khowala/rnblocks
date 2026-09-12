"use client";

import React from "react";
import Link from "next/link";
import { Smartphone, Layers, ArrowRight, Sparkles, Clock, CheckCircle2 } from "lucide-react";

export default function ScreensPage() {
  const upcomingScreens = [
    {
      title: "Full Authentication Flow",
      subtitle: "Login, Signup, Forgot Password, and 2FA OTP verification screens wired with navigation.",
      screensCount: "4 Screens",
      framework: "Expo Router",
      tag: "Planned",
    },
    {
      title: "In-App Subscription & Paywall Flow",
      subtitle: "Feature highlights, customer review carousel, annual vs monthly pricing, and restore purchases.",
      screensCount: "2 Screens",
      framework: "NativeWind",
      tag: "In Review",
    },
    {
      title: "Interactive Onboarding Carousel",
      subtitle: "Swipeable feature introduction cards, permission request screen, and completion celebration.",
      screensCount: "3 Screens",
      framework: "Reanimated",
      tag: "Planned",
    },
    {
      title: "Checkout & Payment Flow",
      subtitle: "Shipping address form, order review item list, payment selector (Apple Pay / Credit Card), and success screen.",
      screensCount: "3 Screens",
      framework: "Expo Router",
      tag: "Planned",
    },
  ];

  return (
    <div className="screens-page">
      <div className="container-main">
        {/* Header */}
        <div className="screens-header">
          <div className="status-pill">
            <Clock size={13} />
            <span>Coming Next in Phase 2</span>
          </div>
          <h1 className="page-title">Full Screen Flows</h1>
          <p className="page-subtitle">
            While blocks provide individual components, screens provide complete, interconnected multi-step application flows ready to drop into your Expo Router app.
          </p>
        </div>

        {/* Screens Grid */}
        <div className="screens-grid">
          {upcomingScreens.map((screen, idx) => (
            <div key={idx} className="screen-card">
              <div className="screen-card-header">
                <div className="device-icon-box">
                  <Smartphone size={20} />
                </div>
                <div className="screen-tags">
                  <span className="badge-tech">{screen.framework}</span>
                  <span className="screen-count-tag">{screen.screensCount}</span>
                </div>
              </div>

              <h3 className="screen-card-title">{screen.title}</h3>
              <p className="screen-card-desc">{screen.subtitle}</p>

              <div className="screen-card-footer">
                <span className="status-label">
                  <span className="status-dot" />
                  {screen.tag}
                </span>
                <Link href="/submit" className="propose-link">
                  <span>Help Build It</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Banner CTA */}
        <div className="screens-banner">
          <div>
            <h3 className="banner-title">Need individual blocks right now?</h3>
            <p className="banner-sub">
              Browse 24+ production-ready UI blocks available for immediate installation.
            </p>
          </div>
          <Link href="/blocks" className="btn-primary">
            <span>Browse Blocks Registry</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .screens-page {
          padding: 60px 0 100px;
          background: var(--bg-primary);
          flex: 1;
        }

        .screens-header {
          max-width: 640px;
          margin-bottom: 48px;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          background: var(--bg-card);
          border: 1px solid var(--border);
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .page-title {
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .page-subtitle {
          font-size: 15px;
          line-height: 24px;
          color: var(--text-secondary);
        }

        .screens-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }

        .screen-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
          display: flex;
          flex-direction: column;
          transition: background var(--transition-fast), border-color var(--transition-fast);
        }

        .screen-card:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-hover);
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
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
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
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-muted);
        }

        .screen-card-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .screen-card-desc {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 20px;
          margin-bottom: 24px;
          flex: 1;
        }

        .screen-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .status-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--warning);
        }

        .propose-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
          transition: color var(--transition-fast);
        }

        .propose-link:hover {
          color: #ffffff;
        }

        .screens-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 32px 40px;
        }

        .banner-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .banner-sub {
          font-size: 14px;
          color: var(--text-secondary);
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
