"use client";

import React from "react";
import Link from "next/link";
import { BLOCKS_DATA } from "@/data/blocks";
import { BlockCard } from "@/components/BlockCard";
import { DeviceFrame } from "@/components/DeviceFrame";
import { CopyButton } from "@/components/CopyButton";
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Layers,
  Smartphone,
  Code2,
  CheckCircle2,
  GitPullRequest,
  Check,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  const featuredBlocks = BLOCKS_DATA.slice(0, 6);
  const heroBlock = BLOCKS_DATA.find((b) => b.slug === "floating-docker") || BLOCKS_DATA[0];
  const HeroComponent = heroBlock.Component;

  return (
    <div className="landing-root">
      {/* =====================================================================
          SECTION 1: HERO
          ===================================================================== */}
      <section className="hero-section">
        <div className="container-main hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-pulse" />
              <span className="badge-text">Open-source React Native Registry</span>
            </div>

            <h1 className="hero-title">
              Build better React Native apps, <span className="title-highlight">faster.</span>
            </h1>

            <p className="hero-description">
              Production-ready React Native blocks and screens. Browse interactive live previews, copy clean source code, or install directly into your Expo and Bare project with one command.
            </p>

            <div className="hero-actions">
              <Link href="/blocks" className="btn-primary hero-btn-lg">
                <span>Explore Blocks</span>
                <ArrowRight size={16} />
              </Link>

              <Link href="/submit" className="btn-secondary hero-btn-lg">
                <span>Submit a Block</span>
              </Link>
            </div>

            {/* Quick CLI Bar */}
            <div className="hero-cli-bar">
              <div className="cli-badge">
                <Terminal size={14} className="terminal-icon" />
                <span className="cli-code">npx rnblocks add floating-docker</span>
              </div>
              <CopyButton text="npx rnblocks add floating-docker" label="Copy" />
            </div>
          </div>

          {/* Hero Live Phone Preview */}
          <div className="hero-preview-wrapper">
            <div className="preview-glow-backdrop" />
            <div className="preview-label-tag">
              <span className="live-dot" />
              <span>Live React Native Web Preview</span>
            </div>
            <DeviceFrame width={340} maxHeight={530} theme="dark">
              <div style={{ width: "100%" }}>
                <HeroComponent />
              </div>
            </DeviceFrame>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: FEATURED / LATEST BLOCKS
          ===================================================================== */}
      <section className="featured-section">
        <div className="container-main">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Production-Ready Content</span>
              <h2 className="section-title">Latest blocks added</h2>
              <p className="section-subtitle">
                Battle-tested pieces of mobile UI ready for direct drop-in.
              </p>
            </div>
            <Link href="/blocks" className="btn-secondary view-all-btn">
              <span>View All 24+ Blocks</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="blocks-grid">
            {featuredBlocks.map((block) => (
              <BlockCard key={block.slug} block={block} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: HOW IT WORKS
          ===================================================================== */}
      <section className="how-it-works-section">
        <div className="container-main">
          <div className="center-header">
            <span className="section-eyebrow">Developer Workflow</span>
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">
              Three effortless steps from discovery to shipping your app.
            </p>
          </div>

          <div className="steps-grid">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-num">01</div>
              <h3 className="step-title">Browse</h3>
              <p className="step-desc">
                Find the exact UI block you need. Test interactivity live in the browser with real React Native Web rendering.
              </p>
              <div className="step-footer">
                <span className="step-tag">Live Previews</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-card step-card-highlight">
              <div className="step-num">02</div>
              <h3 className="step-title">Install</h3>
              <p className="step-desc">
                Run the CLI command in your project root. The component source is copied straight into your code with dependencies resolved.
              </p>
              <div className="step-cli-box">
                <code>npx rnblocks add pricing-card</code>
                <CopyButton text="npx rnblocks add pricing-card" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-num">03</div>
              <h3 className="step-title">Customize</h3>
              <p className="step-desc">
                It's your source code. Tweak styles with NativeWind or StyleSheet, wire up business logic, and ship with full ownership.
              </p>
              <div className="step-footer">
                <span className="step-tag">Zero Vendor Lock-in</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: BUILT FOR REACT NATIVE
          ===================================================================== */}
      <section className="compat-section">
        <div className="container-main">
          <div className="center-header">
            <span className="section-eyebrow">Ecosystem Compatibility</span>
            <h2 className="section-title">Built for modern mobile stacks</h2>
            <p className="section-subtitle">
              Engineered with clean separation of concerns and tested on real mobile runtimes.
            </p>
          </div>

          <div className="compat-grid">
            {[
              { name: "Expo", desc: "Managed & Bare workflows", tag: "SDK 50+" },
              { name: "React Native", desc: "0.74+ architecture", tag: "Latest" },
              { name: "iOS", desc: "Swift & Native runtime", tag: "iOS 15+" },
              { name: "Android", desc: "Material & Jetpack compatible", tag: "API 24+" },
              { name: "NativeWind", desc: "Tailwind CSS v4 for mobile", tag: "v4" },
              { name: "Reanimated", desc: "Smooth 60FPS gestures", tag: "v3" },
              { name: "TypeScript", desc: "Strict type safety out-of-box", tag: "TS 5+" },
            ].map((tech, i) => (
              <div key={i} className="compat-card">
                <div className="compat-top">
                  <span className="compat-name">{tech.name}</span>
                  <span className="compat-tag">{tech.tag}</span>
                </div>
                <p className="compat-desc">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: FOR CONTRIBUTORS
          ===================================================================== */}
      <section className="contributors-section">
        <div className="container-main">
          <div className="contribute-box">
            <div className="contribute-left">
              <div className="git-icon-wrap">
                <GitPullRequest size={24} />
              </div>
              <h2 className="contribute-title">Have a block worth sharing?</h2>
              <p className="contribute-desc">
                Contribute your components directly through GitHub. Every submission goes through automated validation and maintainer review.
              </p>

              <div className="contribute-pipeline">
                <span className="pipe-node">Build</span>
                <span className="pipe-arrow">→</span>
                <span className="pipe-node">Submit PR</span>
                <span className="pipe-arrow">→</span>
                <span className="pipe-node">Review</span>
                <span className="pipe-arrow">→</span>
                <span className="pipe-node pipe-node-done">Published</span>
              </div>
            </div>

            <div className="contribute-right">
              <Link href="/submit" className="btn-primary contribute-btn">
                <span>Read Contribution Guide</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                <span>View GitHub Repo</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6 & 7: FINAL CALL TO ACTION
          ===================================================================== */}
      <section className="cta-section">
        <div className="container-main">
          <div className="cta-inner">
            <h2 className="cta-headline">Stop rebuilding the same UI.</h2>
            <p className="cta-subtext">
              Join mobile engineers accelerating development with the open-source React Native block registry.
            </p>
            <div className="cta-buttons">
              <Link href="/blocks" className="btn-primary hero-btn-lg">
                <span>Explore the Registry</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/docs" className="btn-secondary hero-btn-lg">
                <span>Read Docs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-root {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Hero */
        .hero-section {
          padding: 80px 0 90px;
          position: relative;
          overflow: hidden;
          background: var(--bg-primary);
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          background: var(--bg-card);
          border: 1px solid var(--border);
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          align-self: flex-start;
        }

        .badge-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-primary);
        }

        .hero-title {
          font-size: 52px;
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .title-highlight {
          color: #ffffff;
        }

        .hero-description {
          font-size: 17px;
          line-height: 26px;
          color: var(--text-secondary);
          margin-bottom: 32px;
          max-width: 520px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
        }

        .hero-btn-lg {
          padding: 12px 24px;
          font-size: 15px;
        }

        .hero-cli-bar {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 6px 10px 6px 12px;
          align-self: flex-start;
        }

        .cli-badge {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .terminal-icon {
          color: var(--text-muted);
        }

        .cli-code {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-primary);
        }

        .hero-preview-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .preview-label-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
        }

        /* Featured Section */
        .featured-section {
          padding: 80px 0;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .section-eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          display: block;
          margin-bottom: 8px;
        }

        .section-title {
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .section-subtitle {
          font-size: 15px;
          color: var(--text-secondary);
        }

        .view-all-btn {
          font-size: 13px;
          padding: 8px 16px;
        }

        .blocks-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* How It Works */
        .how-it-works-section {
          padding: 90px 0;
          background: var(--bg-primary);
        }

        .center-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .step-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .step-card-highlight {
          background: var(--bg-card-hover);
          border-color: var(--border-hover);
        }

        .step-num {
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .step-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .step-desc {
          font-size: 14px;
          line-height: 22px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          flex: 1;
        }

        .step-footer {
          margin-top: auto;
        }

        .step-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          background: var(--bg-elevated);
          padding: 3px 8px;
          border-radius: 4px;
        }

        .step-cli-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--code-bg);
          border: 1px solid var(--code-border);
          border-radius: var(--radius-sm);
          padding: 6px 8px 6px 12px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--text-primary);
        }

        /* Compatibility */
        .compat-section {
          padding: 80px 0;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
        }

        .compat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .compat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px;
          transition: background var(--transition-fast), border-color var(--transition-fast);
        }

        .compat-card:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-hover);
        }

        .compat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .compat-name {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .compat-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          background: var(--bg-elevated);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .compat-desc {
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* Contributors */
        .contributors-section {
          padding: 80px 0;
          background: var(--bg-primary);
        }

        .contribute-box {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 48px;
          display: grid;
          grid-template-columns: 1.4fr 0.6fr;
          gap: 40px;
          align-items: center;
        }

        .git-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .contribute-title {
          font-size: 26px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .contribute-desc {
          font-size: 14px;
          line-height: 22px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          max-width: 500px;
        }

        .contribute-pipeline {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 12px;
        }

        .pipe-node {
          padding: 4px 10px;
          border-radius: 6px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          color: var(--text-secondary);
        }

        .pipe-node-done {
          border-color: rgba(34, 197, 94, 0.4);
          color: var(--success);
        }

        .pipe-arrow {
          color: var(--text-muted);
        }

        .contribute-right {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contribute-btn {
          width: 100%;
          padding: 12px 20px;
        }

        /* Final CTA */
        .cta-section {
          padding: 100px 0;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          text-align: center;
        }

        .cta-inner {
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-headline {
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 14px;
        }

        .cta-subtext {
          font-size: 16px;
          line-height: 24px;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .cta-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-content {
            align-items: center;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-badge,
          .hero-cli-bar {
            align-self: center;
          }

          .blocks-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .compat-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .contribute-box {
            grid-template-columns: 1fr;
            padding: 32px;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 38px;
          }

          .blocks-grid,
          .steps-grid,
          .compat-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}
