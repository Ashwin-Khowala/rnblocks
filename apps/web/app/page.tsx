"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BLOCKS_DATA } from "@/data/blocks";
import { CopyButton } from "@/components/CopyButton";
import { CodeViewer } from "@/components/CodeViewer";
import { BlockCard } from "@/components/BlockCard";
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Layers,
  Code2,
  Check,
  Zap,
  Box,
  Compass,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  GitPullRequest,
  Users,
  Eye,
  Sliders,
  Maximize2,
} from "lucide-react";

export default function HomePage() {
  const [pm, setPm] = useState<"npx" | "pnpm" | "bun">("npx");
  const [spotlightTab, setSpotlightTab] = useState("team");
  const [heroViewMode, setHeroViewMode] = useState<"preview" | "code">("preview");

  const dockerItem = BLOCKS_DATA.find((b) => b.slug === "floating-docker");
  const DockerComponent = dockerItem?.Component || (() => null);

  const cliCommands = {
    npx: "npx rnblocks add floating-docker",
    pnpm: "pnpm dlx rnblocks add floating-docker",
    bun: "bunx rnblocks add floating-docker",
  };

  const featuredBlocks = BLOCKS_DATA.filter((b) => b.type === "block").slice(0, 4);

  return (
    <div className="landing-root">
      {/* =====================================================================
          SECTION 1: HERO
          ===================================================================== */}
      <section className="hero-section">
        {/* Ambient Glows */}
        <div className="hero-ambient-glow" />
        <div className="hero-ambient-glow-secondary" />

        <div className="container-main hero-container">
          {/* Top Pill Eyebrow */}
          <div className="hero-badge">
            <span className="badge-pulse" />
            <span className="badge-text">React Native UI Registry • Open Source • 100% Free</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            Production-ready UI for
            <br />
            <span className="title-highlight">React Native & Expo.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-description">
            Explore live previews, copy clean source code, or install directly into your codebase.
            Zero runtime dependencies, standard StyleSheet primitives, and full New Architecture support.
          </p>

          {/* Actions */}
          <div className="hero-actions">
            <Link href="/blocks" className="btn-primary hero-btn-lg">
              <span>Explore Registry</span>
              <ArrowRight size={16} />
            </Link>

            <Link href="/docs" className="btn-secondary hero-btn-lg">
              <Terminal size={15} />
              <span>Documentation</span>
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
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: FEATURED REGISTRY BLOCKS (SHOWCASE THE PRODUCT)
          ===================================================================== */}
      <section className="registry-preview-section">
        <div className="container-main">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">Available in Registry</span>
              <h2 className="section-title">Components you copy and own</h2>
              <p className="section-subtitle">
                No third-party runtime wrappers or mandatory theme providers. Every block is standalone TypeScript.
              </p>
            </div>
            <Link href="/blocks" className="view-all-link">
              <span>View all components</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="blocks-grid">
            {featuredBlocks.map((block) => (
              <BlockCard key={block.slug} block={block} />
            ))}
          </div>

          <div className="grid-footer-cta">
            <Link href="/blocks" className="btn-secondary">
              <span>Explore all {BLOCKS_DATA.length} components in registry</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: HOW IT WORKS (3 STEPS)
          ===================================================================== */}
      <section className="workflow-section">
        <div className="container-main">
          <div className="section-header-center">
            <span className="section-eyebrow">Developer Workflow</span>
            <h2 className="section-title">Three effortless steps to ship</h2>
            <p className="section-subtitle">
              From web discovery to production mobile screen in seconds.
            </p>
          </div>

          <div className="steps-row">
            <div className="workflow-step-card">
              <div className="step-badge">01</div>
              <h3 className="step-name">Inspect & Test Live</h3>
              <p className="step-text">
                Interact with components directly in your web browser. Test tabs, state toggles, and review
                the exact TypeScript source code before adding anything.
              </p>
            </div>

            <div className="workflow-step-card highlight">
              <div className="step-badge">02</div>
              <h3 className="step-name">Install with One Line</h3>
              <p className="step-text">
                Run the CLI command in your project root. The full component code is placed
                directly into your <code>components/rnblocks</code> folder.
              </p>
              <div className="step-cli-preview">
                <code>npx rnblocks add floating-docker</code>
                <CopyButton text="npx rnblocks add floating-docker" />
              </div>
            </div>

            <div className="workflow-step-card">
              <div className="step-badge">03</div>
              <h3 className="step-name">Customize & Ship</h3>
              <p className="step-text">
                It's your source code. Adjust palette constants, hook into your app navigation, adapt
                to NativeWind if you choose, and ship without library lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: INTERACTIVE COMPONENT STUDIO
          ===================================================================== */}
      <section className="studio-section">
        <div className="container-main">
          <div className="section-header-center">
            <span className="section-eyebrow">Interactive Studio</span>
            <h2 className="section-title">Test animations before installing</h2>
            <p className="section-subtitle">
              Test the Floating Glassmorphic Docker below to experience fluid sliding pill physics and inspect its code.
            </p>
          </div>

          <div className="studio-wrapper">
            <div className="hero-studio-stage">
              {/* Studio Header HUD */}
              <div className="studio-hud-header">
                <div className="window-dots">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                  <span className="window-file-name">floating-docker.tsx</span>
                </div>

                <div className="studio-status-pill">
                  <span className="live-pulse-dot" />
                  <span>
                    Active Tab: <strong className="status-tab-text">{spotlightTab.toUpperCase()}</strong>
                  </span>
                </div>

                <div className="studio-mode-toggle">
                  <button
                    onClick={() => setHeroViewMode("preview")}
                    className={`toggle-btn ${heroViewMode === "preview" ? "active" : ""}`}
                  >
                    <span>Interactive Preview</span>
                  </button>
                  <button
                    onClick={() => setHeroViewMode("code")}
                    className={`toggle-btn ${heroViewMode === "code" ? "active" : ""}`}
                  >
                    <Code2 size={13} />
                    <span>Code</span>
                  </button>
                </div>
              </div>

              {/* Studio Canvas Area */}
              {heroViewMode === "preview" ? (
                <div className="studio-canvas">
                  <div className="canvas-grid-bg" />
                  <div className="canvas-spotlight-glow" />

                  <div className="docker-interactive-container">
                    <DockerComponent
                      {...({
                        initialTab: spotlightTab,
                        onTabChange: (tab: string) => setSpotlightTab(tab),
                      } as any)}
                    />
                  </div>

                  <div className="canvas-hint">
                    <span className="hint-pill">
                      Tap any tab above to test smooth sliding pill animation
                    </span>
                  </div>
                </div>
              ) : (
                <div className="studio-code-view">
                  <CodeViewer
                    code={dockerItem?.code || "// Loading component code..."}
                    filename="floating-docker.tsx"
                    language="tsx"
                  />
                </div>
              )}

              {/* Studio Footer Info */}
              <div className="studio-footer">
                <div className="studio-tags">
                  <span className="studio-tag">Zero Dependencies</span>
                  <span className="studio-tag">StyleSheet Primitives</span>
                  <span className="studio-tag">Vector SVGs</span>
                  <span className="studio-tag">Expo & Bare RN</span>
                </div>

                <div className="studio-cli-pill">
                  <code>npx rnblocks add floating-docker</code>
                  <CopyButton text="npx rnblocks add floating-docker" label="Copy CLI" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: ENGINEERING PHILOSOPHY (4 PILLARS)
          ===================================================================== */}
      <section className="features-section">
        <div className="container-main">
          <div className="section-header-center">
            <span className="section-eyebrow">Engineering Philosophy</span>
            <h2 className="section-title">Built for developer ownership</h2>
            <p className="section-subtitle">
              Eliminate the frustration of bloated npm dependencies, rigid wrappers, and abandoned UI libraries.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Code2 size={20} />
              </div>
              <h3 className="pillar-title">100% Code Ownership</h3>
              <p className="pillar-desc">
                Components install straight into your <code>components/</code> folder. Modify styling,
                swap icons, and tune animation parameters directly in your codebase.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Zap size={20} />
              </div>
              <h3 className="pillar-title">Zero Runtime Baggage</h3>
              <p className="pillar-desc">
                Engineered with standard React Native primitives. No mandatory root ThemeProvider or
                CSS-in-JS runtime engine required.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Box size={20} />
              </div>
              <h3 className="pillar-title">Fluid & Adaptive Layouts</h3>
              <p className="pillar-desc">
                Designed with container-relative dimensions and standard spacing tokens. Never breaks
                due to arbitrary hardcoded screen width assumptions.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Sparkles size={20} />
              </div>
              <h3 className="pillar-title">Native 60–120 FPS Physics</h3>
              <p className="pillar-desc">
                Smooth cubic-bezier animations using React Native's native driver for butter-smooth
                performance across iOS, Android, and Web.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: ECOSYSTEM COMPATIBILITY
          ===================================================================== */}
      <section className="compat-section">
        <div className="container-main">
          <div className="section-header-center">
            <span className="section-eyebrow">Universal Stack Support</span>
            <h2 className="section-title">Engineered for modern mobile runtimes</h2>
            <p className="section-subtitle">
              Tested across Expo workflows, Bare React Native, and React Native Web.
            </p>
          </div>

          <div className="compat-grid">
            {[
              { name: "Expo SDK 52+", desc: "Managed & Bare workflows", tag: "Latest SDK" },
              { name: "React Native 0.76+", desc: "New Architecture baseline", tag: "TurboModules" },
              { name: "iOS 15+", desc: "Fluid 60-120 FPS native feel", tag: "Liquid UI" },
              { name: "Android API 24+", desc: "Material & edge-to-edge ready", tag: "Optimized" },
              { name: "NativeWind v4", desc: "Tailwind CSS v4 for mobile", tag: "Utility First" },
              { name: "Standard StyleSheet", desc: "Zero build tool requirements", tag: "Zero Config" },
              { name: "Strict TypeScript", desc: "Type-safe props and autocomplete", tag: "TS 5.8" },
              { name: "React Native Web", desc: "Instant browser preview runtime", tag: "Cross-Platform" },
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
          SECTION 7: OPEN SOURCE & COMMUNITY PITCH
          ===================================================================== */}
      <section className="community-section">
        <div className="container-main">
          <div className="community-card">
            <div className="community-content">
              <span className="section-eyebrow">Open Source Community</span>
              <h2 className="community-title">Contribute your production UI blocks</h2>
              <p className="community-text">
                RNBlocks is fully open-source and community driven. If you've built a refined card, sheet,
                navigation pattern, or flow, submit it to the registry. Submitting takes less than 30 minutes.
              </p>

              <div className="community-perks">
                <div className="perk-item">
                  <CheckCircle2 size={16} className="perk-icon" />
                  <span>Strict schema validation ensures high code quality</span>
                </div>
                <div className="perk-item">
                  <CheckCircle2 size={16} className="perk-icon" />
                  <span>Interactive web previews automatically rendered</span>
                </div>
                <div className="perk-item">
                  <CheckCircle2 size={16} className="perk-icon" />
                  <span>Full author credit and direct links to your GitHub profile</span>
                </div>
              </div>

              <div className="community-actions">
                <Link href="/contribute" className="btn-primary">
                  <GitPullRequest size={15} />
                  <span>Contribution Guide</span>
                </Link>
                <Link href="/submit" className="btn-secondary">
                  <span>Submit a Component</span>
                </Link>
                <a
                  href="https://github.com/Ashwin-Khowala/rnblocks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <span>View on GitHub</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: FINAL CTA
          ===================================================================== */}
      <section className="cta-section">
        <div className="container-main">
          <div className="cta-box">
            <h2 className="cta-headline">Stop rebuilding mobile UI from scratch.</h2>
            <p className="cta-subtext">
              Accelerate your Expo and React Native apps with copy-paste components that look and feel native.
            </p>
            <div className="cta-buttons">
              <Link href="/blocks" className="btn-primary hero-btn-lg">
                <span>Explore the Registry</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/docs" className="btn-secondary hero-btn-lg">
                <span>Read Documentation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-root {
          display: flex;
          flex-direction: column;
          background-color: #070709;
        }

        /* ─── Hero Section ─────────────────────────────────────────────────── */
        .hero-section {
          padding: 80px 0 64px;
          position: relative;
          overflow: hidden;
          background: #070709;
        }

        .hero-ambient-glow {
          position: absolute;
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(circle, rgba(50, 199, 152, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-ambient-glow-secondary {
          position: absolute;
          top: 200px;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 600px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 24px;
        }

        .badge-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #32c798;
          box-shadow: 0 0 10px rgba(50, 199, 152, 0.8);
        }

        .badge-text {
          font-size: 13px;
          font-weight: 600;
          color: #d1d5db;
          letter-spacing: -0.2px;
        }

        .hero-title {
          font-size: 58px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1.8px;
          color: #ffffff;
          margin-bottom: 20px;
          max-width: 840px;
        }

        .title-highlight {
          color: #d4d4d8;
          font-weight: 700;
        }

        .hero-description {
          font-size: 18px;
          line-height: 1.6;
          color: #9ca3af;
          max-width: 660px;
          margin-bottom: 32px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
        }

        .hero-btn-lg {
          padding: 11px 22px;
          font-size: 14.5px;
          font-weight: 600;
          border-radius: 10px;
        }

        /* ─── CLI Terminal Bar ─────────────────────────────────────────────── */
        .cli-terminal-wrap {
          display: flex;
          flex-direction: column;
          background: #0d0d10;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          overflow: hidden;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.6);
          margin-bottom: 12px;
        }

        .pm-tabs {
          display: flex;
          background: #09090c;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 4px 6px;
          gap: 4px;
        }

        .pm-tab-btn {
          padding: 4px 12px;
          font-size: 12px;
          font-family: var(--font-mono);
          font-weight: 600;
          color: #71717a;
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .pm-tab-btn:hover {
          color: #ffffff;
        }

        .pm-tab-btn-active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }

        .cli-bar-body {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          gap: 12px;
        }

        .cli-prompt-group {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 13px;
        }

        .cli-dollar {
          color: #32c798;
          user-select: none;
          font-weight: 700;
        }

        .cli-code {
          color: #f3f4f6;
        }

        /* ─── Registry Preview Grid Section ────────────────────────────────── */
        .registry-preview-section {
          padding: 64px 0 80px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: #09090c;
        }

        .section-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 36px;
          gap: 20px;
        }

        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: #32c798;
          transition: color 0.15s ease;
          white-space: nowrap;
        }

        .view-all-link:hover {
          color: #4ade80;
        }

        .blocks-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .grid-footer-cta {
          display: flex;
          justify-content: center;
        }

        /* ─── Workflow Steps Section ───────────────────────────────────────── */
        .workflow-section {
          padding: 96px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: #070709;
        }

        .steps-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .workflow-step-card {
          background: #0d0d12;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
        }

        .workflow-step-card.highlight {
          border-color: rgba(50, 199, 152, 0.35);
          background: radial-gradient(circle at top, rgba(50, 199, 152, 0.04), #0d0d12 70%);
        }

        .step-badge {
          font-size: 13px;
          font-family: var(--font-mono);
          font-weight: 700;
          color: #32c798;
          margin-bottom: 16px;
        }

        .step-name {
          font-size: 19px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 10px;
          letter-spacing: -0.2px;
        }

        .step-text {
          font-size: 14px;
          color: #9ca3af;
          line-height: 1.6;
        }

        .step-cli-preview {
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #08080a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 8px 12px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: #f3f4f6;
        }

        /* ─── Studio Showcase Section ──────────────────────────────────────── */
        .studio-section {
          padding: 96px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: #09090c;
        }

        .studio-wrapper {
          display: flex;
          justify-content: center;
        }

        .hero-studio-stage {
          width: 100%;
          max-width: 920px;
          background: #0c0c10;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          overflow: hidden;
          text-align: left !important;
          box-shadow:
            0 24px 64px -16px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .studio-hud-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #09090d;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .window-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .window-dots .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #222226;
        }

        .window-file-name {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #71717a;
          margin-left: 10px;
        }

        .studio-status-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 4px 12px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 12px;
          color: #9ca3af;
        }

        .live-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #32c798;
          box-shadow: 0 0 8px rgba(50, 199, 152, 0.8);
        }

        .status-tab-text {
          color: #ffffff;
          font-weight: 700;
        }

        .studio-mode-toggle {
          display: flex;
          align-items: center;
          background: #141418;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 2px;
          gap: 2px;
        }

        .toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 11px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #71717a;
          transition: all 0.15s ease;
        }

        .toggle-btn:hover {
          color: #ffffff;
        }

        .toggle-btn.active {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .studio-canvas {
          padding: 64px 24px;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #07070a;
        }

        .canvas-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        .canvas-spotlight-glow {
          position: absolute;
          width: 380px;
          height: 180px;
          background: radial-gradient(circle, rgba(50, 199, 152, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .docker-interactive-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 420px;
          display: flex;
          justify-content: center;
        }

        .canvas-hint {
          margin-top: 24px;
          position: relative;
          z-index: 2;
        }

        .hint-pill {
          display: inline-flex;
          align-items: center;
          font-size: 12px;
          color: #71717a;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 5px 14px;
          border-radius: 9999px;
        }

        .studio-code-view {
          padding: 0;
          background: #0d0d10;
          text-align: left !important;
        }

        .studio-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: #09090d;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          gap: 16px;
        }

        .studio-tags {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .studio-tag {
          font-size: 11px;
          font-family: var(--font-mono);
          color: #71717a;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 3px 8px;
          border-radius: 5px;
        }

        .studio-cli-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: #d1d5db;
        }

        /* ─── Architectural Pillars Section ─────────────────────────────────── */
        .features-section {
          padding: 96px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: #070709;
        }

        .section-header-center {
          text-align: center;
          margin-bottom: 56px;
        }

        .section-eyebrow {
          font-size: 12px;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #32c798;
          display: block;
          margin-bottom: 8px;
        }

        .section-title {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.8px;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .section-subtitle {
          font-size: 16px;
          color: #9ca3af;
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .pillar-card {
          background: #0d0d10;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.2s ease;
        }

        .pillar-card:hover {
          border-color: rgba(255, 255, 255, 0.18);
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.5);
        }

        .pillar-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #32c798;
          margin-bottom: 4px;
        }

        .pillar-title {
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.2px;
        }

        .pillar-desc {
          font-size: 13.5px;
          line-height: 1.55;
          color: #9ca3af;
        }

        /* ─── Ecosystem Compatibility Grid ─────────────────────────────────── */
        .compat-section {
          padding: 96px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: #09090c;
        }

        .compat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .compat-card {
          background: #0d0d10;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: border-color 0.15s ease;
        }

        .compat-card:hover {
          border-color: rgba(255, 255, 255, 0.16);
        }

        .compat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .compat-name {
          font-size: 14.5px;
          font-weight: 700;
          color: #ffffff;
        }

        .compat-tag {
          font-size: 10.5px;
          font-family: var(--font-mono);
          color: #71717a;
          background: rgba(255, 255, 255, 0.04);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .compat-desc {
          font-size: 12.5px;
          color: #9ca3af;
        }

        /* ─── Community Contribution Pitch ─────────────────────────────────── */
        .community-section {
          padding: 80px 0 96px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: #070709;
        }

        .community-card {
          background: radial-gradient(circle at top left, rgba(50, 199, 152, 0.06), #0d0d12 60%);
          border: 1px solid rgba(50, 199, 152, 0.25);
          border-radius: 24px;
          padding: 56px 48px;
        }

        .community-content {
          max-width: 720px;
        }

        .community-title {
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -0.6px;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .community-text {
          font-size: 16px;
          color: #9ca3af;
          line-height: 1.6;
          margin-bottom: 28px;
        }

        .community-perks {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 36px;
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14.5px;
          color: #d1d5db;
        }

        .perk-icon {
          color: #32c798;
          flex-shrink: 0;
        }

        .community-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* ─── Final CTA ─────────────────────────────────────────────────────── */
        .cta-section {
          padding: 80px 0 108px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: #09090c;
        }

        .cta-box {
          text-align: center;
          background: #0e0e12;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 64px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          position: relative;
          overflow: hidden;
        }

        .cta-headline {
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -0.6px;
          color: #ffffff;
        }

        .cta-subtext {
          font-size: 16px;
          color: #9ca3af;
          max-width: 520px;
          margin-bottom: 12px;
          line-height: 1.5;
        }

        .cta-buttons {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        /* ─── Responsive Layout ─────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .hero-title {
            font-size: 46px;
            letter-spacing: -1.2px;
          }

          .blocks-grid {
            grid-template-columns: 1fr;
          }

          .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .compat-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .community-card {
            padding: 40px 32px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 48px 0 56px;
          }

          .hero-title {
            font-size: 36px;
            letter-spacing: -0.8px;
          }

          .hero-description {
            font-size: 15px;
          }

          .hero-actions {
            flex-direction: column;
            width: 100%;
          }

          .hero-btn-lg {
            width: 100%;
            justify-content: center;
          }

          .section-header-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .studio-hud-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .studio-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .pillars-grid {
            grid-template-columns: 1fr;
          }

          .steps-row {
            grid-template-columns: 1fr;
          }

          .compat-grid {
            grid-template-columns: 1fr;
          }

          .community-card {
            padding: 32px 20px;
          }

          .community-title {
            font-size: 26px;
          }

          .community-actions {
            flex-direction: column;
            width: 100%;
          }

          .community-actions > * {
            width: 100%;
            justify-content: center;
          }

          .cta-box {
            padding: 40px 20px;
          }

          .cta-headline {
            font-size: 26px;
          }

          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
