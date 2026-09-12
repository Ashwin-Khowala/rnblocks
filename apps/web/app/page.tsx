"use client";

import React, { useState } from "react";
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
  ShieldCheck,
  Cpu,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const [pm, setPm] = useState<"npx" | "pnpm" | "bun">("npx");
  const [spotlightTab, setSpotlightTab] = useState("team");

  const dockerItem = BLOCKS_DATA.find((b) => b.slug === "floating-docker");
  const screenItem = BLOCKS_DATA.find((b) => b.slug === "teams-and-network");
  const DockerComponent = dockerItem?.Component || (() => null);
  const ScreenComponent = screenItem?.Component || (() => null);

  const cliCommands = {
    npx: "npx rnblocks add floating-docker",
    pnpm: "pnpm dlx rnblocks add floating-docker",
    bun: "bunx rnblocks add floating-docker",
  };

  return (
    <div className="landing-root">
      {/* =====================================================================
          SECTION 1: HERO
          ===================================================================== */}
      <section className="hero-section">
        {/* Subtle Ambient Background Gradients */}
        <div className="hero-ambient-glow" />

        <div className="container-main hero-container">
          {/* Left Column: Value Prop & CLI */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-pulse" />
              <span className="badge-text">Authentic React Native & Expo UI</span>
            </div>

            <h1 className="hero-title">
              Build better React Native apps,{" "}
              <span className="title-highlight">faster.</span>
            </h1>

            <p className="hero-description">
              Production-tested React Native blocks and full-flow mobile screens. Inspect
              interactive live previews, copy clean source code, or install directly into
              your Expo and Bare project with zero runtime dependencies.
            </p>

            <div className="hero-actions">
              <Link href="/blocks" className="btn-primary hero-btn-lg">
                <span>Browse Registry</span>
                <ArrowRight size={16} />
              </Link>

              <Link href="/screens" className="btn-secondary hero-btn-lg">
                <Smartphone size={16} />
                <span>Explore Screens</span>
              </Link>
            </div>

            {/* Quick CLI Bar with Package Manager Switcher */}
            <div className="cli-terminal-wrap">
              <div className="pm-tabs">
                {(["npx", "pnpm", "bun"] as const).map((tool) => (
                  <button
                    key={tool}
                    onClick={() => setPm(tool)}
                    className={`pm-tab-btn ${pm === tool ? "pm-tab-btn-active" : ""}`}
                  >
                    {tool}
                  </button>
                ))}
              </div>

              <div className="cli-bar-body">
                <div className="cli-prompt-group">
                  <span className="cli-dollar">$</span>
                  <span className="cli-code">{cliCommands[pm]}</span>
                </div>
                <CopyButton text={cliCommands[pm]} label="Copy" />
              </div>
            </div>

            {/* Micro Highlights */}
            <div className="hero-checks-row">
              <div className="hero-check-item">
                <Check size={14} className="check-icon" />
                <span>Zero npm package bloat</span>
              </div>
              <div className="hero-check-item">
                <Check size={14} className="check-icon" />
                <span>Strict TypeScript</span>
              </div>
              <div className="hero-check-item">
                <Check size={14} className="check-icon" />
                <span>Expo & Bare RN ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Teams & Network Mobile Screen Showcase */}
          <div className="hero-preview-wrapper">
            <div className="preview-label-tag">
              <span className="live-dot" />
              <span>Interactive React Native Web Preview</span>
            </div>

            <DeviceFrame width={348} maxHeight={640} theme="dark">
              <ScreenComponent />
            </DeviceFrame>

            <div className="preview-caption">
              <span>Teams & Network screen with authentic floating dock</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: COMPONENT SPOTLIGHT (NO PHONE FRAME)
          ===================================================================== */}
      <section className="spotlight-section">
        <div className="container-main">
          <div className="spotlight-card">
            <div className="spotlight-header">
              <div>
                <div className="spotlight-eyebrow">
                  <Sparkles size={13} />
                  <span>Component Spotlight</span>
                </div>
                <h2 className="spotlight-title">Floating Glassmorphic Docker</h2>
                <p className="spotlight-desc">
                  Presented directly in its natural dark studio backdrop. Seamless
                  white pill sliding indicator with vector icons extracted from Fyndr.
                </p>
              </div>

              <div className="spotlight-actions">
                <Link href="/blocks/floating-docker" className="btn-secondary">
                  <span>Inspect Component</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Dark Studio Canvas - NO PHONE FRAME */}
            <div className="spotlight-canvas">
              <div className="spotlight-canvas-glow" />
              <div className="spotlight-interactive-wrapper">
                <DockerComponent
                  {...({
                    initialTab: spotlightTab,
                    onTabChange: (tab: string) => setSpotlightTab(tab),
                  } as any)}
                />
              </div>
              <div className="spotlight-hint">
                <span>Active tab: <strong className="active-tab-highlight">{spotlightTab.toUpperCase()}</strong> • Click any tab above to test smooth indicator transition</span>
              </div>
            </div>

            <div className="spotlight-footer">
              <div className="spotlight-install-box">
                <Terminal size={14} className="spotlight-terminal-icon" />
                <code>npx rnblocks add floating-docker</code>
                <CopyButton text="npx rnblocks add floating-docker" label="Copy CLI" />
              </div>

              <div className="spotlight-meta-tags">
                <span className="spotlight-tag">Vector SVGs</span>
                <span className="spotlight-tag">Continuous Curve</span>
                <span className="spotlight-tag">Haptic Ready</span>
                <span className="spotlight-tag">Nunito Sans</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: FEATURED REGISTRY ITEMS
          ===================================================================== */}
      <section className="featured-section">
        <div className="container-main">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Ready to copy & paste</span>
              <h2 className="section-title">Featured blocks & screens</h2>
              <p className="section-subtitle">
                Designed for speed, polished aesthetics, and complete code ownership.
              </p>
            </div>
            <Link href="/blocks" className="btn-secondary view-all-btn">
              <span>View All in Registry</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="blocks-grid">
            {BLOCKS_DATA.map((block) => (
              <BlockCard key={block.slug} block={block} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: HOW IT WORKS
          ===================================================================== */}
      <section className="how-it-works-section">
        <div className="container-main">
          <div className="center-header">
            <span className="section-eyebrow">Developer Workflow</span>
            <h2 className="section-title">How RNBlocks works</h2>
            <p className="section-subtitle">
              Three effortless steps from discovery to shipping production mobile apps.
            </p>
          </div>

          <div className="steps-grid">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-num">01</div>
              <h3 className="step-title">Browse & Test</h3>
              <p className="step-desc">
                Find the exact component or full screen flow. Test real interactions in
                your browser powered by React Native Web without running an emulator.
              </p>
              <div className="step-footer">
                <span className="step-tag">Instant Browser Previews</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-card step-card-highlight">
              <div className="step-num">02</div>
              <h3 className="step-title">One-Line Install</h3>
              <p className="step-desc">
                Execute the CLI command in your project root. The component source is
                placed straight into your codebase with dependencies automatically resolved.
              </p>
              <div className="step-cli-box">
                <code>npx rnblocks add floating-docker</code>
                <CopyButton text="npx rnblocks add floating-docker" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-num">03</div>
              <h3 className="step-title">Customize & Ship</h3>
              <p className="step-desc">
                It's your code. Customize styles with StyleSheet or NativeWind, connect your
                API queries, and ship with 100% control and zero external version lock-in.
              </p>
              <div className="step-footer">
                <span className="step-tag">Zero Vendor Lock-in</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: BUILT FOR REACT NATIVE
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
              { name: "Expo SDK 52+", desc: "Managed & Bare workflows", tag: "Latest SDK" },
              { name: "React Native 0.76+", desc: "New Architecture ready", tag: "TurboModules" },
              { name: "iOS 15+", desc: "Smooth Swift runtime feel", tag: "Liquid UI" },
              { name: "Android API 24+", desc: "Material & edge-to-edge support", tag: "Optimized" },
              { name: "NativeWind v4", desc: "Tailwind CSS v4 for mobile", tag: "v4 Ready" },
              { name: "Reanimated 3", desc: "Silky 60-120 FPS animations", tag: "Worklets" },
              { name: "Strict TypeScript", desc: "Type safe props and schemas", tag: "TS 5.8" },
              { name: "Turborepo Monorepo", desc: "Optimized multi-package registry", tag: "Modern" },
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
          SECTION 6: FINAL CALL TO ACTION
          ===================================================================== */}
      <section className="cta-section">
        <div className="container-main">
          <div className="cta-inner">
            <h2 className="cta-headline">Stop rebuilding mobile UI from scratch.</h2>
            <p className="cta-subtext">
              Accelerate your Expo and React Native apps with copy-paste components that
              look and feel native.
            </p>
            <div className="cta-buttons">
              <Link href="/blocks" className="btn-primary hero-btn-lg">
                <span>Explore the Registry</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/screens" className="btn-secondary hero-btn-lg">
                <span>View Screen Flows</span>
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

        /* ─── Hero Section ─────────────────────────────────────────────────── */
        .hero-section {
          padding: 80px 0 96px;
          position: relative;
          overflow: hidden;
          background: #070709;
        }

        .hero-ambient-glow {
          position: absolute;
          top: -20%;
          left: 30%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(50, 199, 152, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
          position: relative;
          z-index: 1;
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
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          align-self: flex-start;
        }

        .badge-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #32c798;
          box-shadow: 0 0 8px #32c798;
        }

        .hero-title {
          font-size: 52px;
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin-bottom: 20px;
        }

        .title-highlight {
          font-family: var(--font-brand);
          font-style: italic;
          font-weight: 400;
          color: #ffffff;
          letter-spacing: -0.01em;
          padding-left: 2px;
        }

        .hero-description {
          font-size: 17px;
          line-height: 26px;
          color: #9ca3af;
          margin-bottom: 30px;
          max-width: 520px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 26px;
        }

        .hero-btn-lg {
          padding: 12px 24px;
          font-size: 15px;
        }

        /* CLI Terminal Wrap */
        .cli-terminal-wrap {
          display: flex;
          flex-direction: column;
          background: #111114;
          border: 1px solid #222228;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 24px;
          max-width: 480px;
        }

        .pm-tabs {
          display: flex;
          background: #0a0a0c;
          border-bottom: 1px solid #1c1c22;
          padding: 4px 8px;
          gap: 4px;
        }

        .pm-tab-btn {
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 6px;
          color: #71717a;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .pm-tab-btn:hover {
          color: #d4d4d8;
        }

        .pm-tab-btn-active {
          color: #ffffff;
          background: #1e1e24;
        }

        .cli-bar-body {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
        }

        .cli-prompt-group {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 13px;
        }

        .cli-dollar {
          color: #71717a;
        }

        .cli-code {
          color: #f4f4f5;
        }

        .hero-checks-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .hero-check-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          color: #8e8e93;
        }

        .check-icon {
          color: #32c798;
        }

        /* Hero Right Preview */
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
          color: #a1a1aa;
          margin-bottom: 12px;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #32c798;
          box-shadow: 0 0 6px #32c798;
        }

        .preview-caption {
          margin-top: 12px;
          font-size: 12px;
          color: #71717a;
          text-align: center;
        }

        /* ─── Spotlight Section (NO PHONE FRAME) ───────────────────────────── */
        .spotlight-section {
          padding: 40px 0 80px;
          background: #070709;
        }

        .spotlight-card {
          background: #0f0f13;
          border: 1px solid #1f1f26;
          border-radius: 20px;
          padding: 36px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .spotlight-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .spotlight-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #32c798;
          margin-bottom: 6px;
        }

        .spotlight-title {
          font-size: 26px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .spotlight-desc {
          font-size: 14px;
          color: #9ca3af;
          max-width: 580px;
          line-height: 22px;
        }

        .spotlight-canvas {
          background: #09090c;
          border: 1px solid #1a1a20;
          border-radius: 16px;
          padding: 48px 24px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 180px;
        }

        .spotlight-canvas-glow {
          position: absolute;
          width: 280px;
          height: 120px;
          background: radial-gradient(ellipse, rgba(255, 255, 255, 0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .spotlight-interactive-wrapper {
          width: 100%;
          max-width: 440px;
          position: relative;
          z-index: 1;
        }

        .spotlight-hint {
          margin-top: 20px;
          font-size: 11.5px;
          color: #71717a;
          font-family: var(--font-mono);
          text-align: center;
        }

        .active-tab-highlight {
          color: #32c798;
        }

        .spotlight-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 8px;
        }

        .spotlight-install-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #09090c;
          border: 1px solid #1c1c24;
          border-radius: 8px;
          padding: 6px 12px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: #f4f4f5;
        }

        .spotlight-terminal-icon {
          color: #71717a;
        }

        .spotlight-meta-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .spotlight-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 4px;
          background: #18181f;
          border: 1px solid #282832;
          color: #a1a1aa;
        }

        /* ─── Featured Section ─────────────────────────────────────────────── */
        .featured-section {
          padding: 80px 0;
          background: #0a0a0d;
          border-top: 1px solid #17171c;
          border-bottom: 1px solid #17171c;
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
          color: #71717a;
          display: block;
          margin-bottom: 8px;
        }

        .section-title {
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .section-subtitle {
          font-size: 15px;
          color: #9ca3af;
        }

        .view-all-btn {
          font-size: 13px;
          padding: 8px 16px;
        }

        .blocks-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        /* ─── How It Works ─────────────────────────────────────────────────── */
        .how-it-works-section {
          padding: 90px 0;
          background: #070709;
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
          background: #0f0f13;
          border: 1px solid #1f1f26;
          border-radius: 16px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .step-card-highlight {
          background: #131318;
          border-color: #2b2b36;
        }

        .step-num {
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 700;
          color: #71717a;
          margin-bottom: 16px;
        }

        .step-title {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 10px;
        }

        .step-desc {
          font-size: 14px;
          line-height: 22px;
          color: #9ca3af;
          margin-bottom: 24px;
          flex: 1;
        }

        .step-footer {
          margin-top: auto;
        }

        .step-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #a1a1aa;
          background: #18181f;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid #282832;
        }

        .step-cli-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #09090c;
          border: 1px solid #1c1c24;
          border-radius: 6px;
          padding: 6px 8px 6px 12px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: #f4f4f5;
        }

        /* ─── Compatibility ────────────────────────────────────────────────── */
        .compat-section {
          padding: 80px 0;
          background: #0a0a0d;
          border-top: 1px solid #17171c;
        }

        .compat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .compat-card {
          background: #0f0f13;
          border: 1px solid #1f1f26;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.15s ease;
        }

        .compat-card:hover {
          background: #14141a;
          border-color: #2b2b36;
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
          color: #ffffff;
        }

        .compat-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #71717a;
          background: #18181f;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid #282832;
        }

        .compat-desc {
          font-size: 12px;
          color: #9ca3af;
        }

        /* ─── Final CTA ────────────────────────────────────────────────────── */
        .cta-section {
          padding: 100px 0;
          background: #070709;
          border-top: 1px solid #17171c;
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
          color: #ffffff;
          margin-bottom: 14px;
        }

        .cta-subtext {
          font-size: 16px;
          line-height: 24px;
          color: #9ca3af;
          margin-bottom: 32px;
        }

        .cta-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }

        /* ─── Responsive Breakpoints ───────────────────────────────────────── */
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
          .cli-terminal-wrap {
            align-self: center;
          }

          .hero-checks-row {
            justify-content: center;
          }

          .spotlight-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .blocks-grid {
            grid-template-columns: 1fr;
          }

          .compat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 38px;
          }

          .steps-grid,
          .compat-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .spotlight-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
