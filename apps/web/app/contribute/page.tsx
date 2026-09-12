"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GitPullRequest,
  Heart,
  Sparkles,
  Terminal,
  FileCode,
  Shield,
  Layers,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Code2,
  Cpu,
  BookOpen,
  Boxes,
} from "lucide-react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";

export default function ContributePage() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const wishlist = [
    {
      title: "Interactive Bottom Sheet",
      type: "Component",
      category: "Surfaces & Overlays",
      description: "Smooth gesture-driven bottom sheet with spring physics and backdrop blur.",
      tags: ["Gesture Handler", "Reanimated"],
    },
    {
      title: "Biometric Auth Screen",
      type: "Screen",
      category: "Authentication",
      description: "FaceID/Fingerprint authentication prompt with fallback passcode keypad.",
      tags: ["Local Authentication", "NativeWind"],
    },
    {
      title: "Swipeable Card Deck",
      type: "Component",
      category: "Commerce & Discovery",
      description: "Tinder-style swipe gestures with smooth rotation and card dismissal.",
      tags: ["Gestures", "Animations"],
    },
    {
      title: "OTP Verification Flow",
      type: "Component",
      category: "Authentication",
      description: "6-digit auto-focusing OTP pin boxes with SMS auto-fill and countdown timer.",
      tags: ["Forms", "Inputs"],
    },
    {
      title: "Audio / Podcast Player Bar",
      type: "Component",
      category: "Media",
      description: "Mini expandable floating player with scrub bar, play/pause, and queue controls.",
      tags: ["Audio", "Dock"],
    },
    {
      title: "Dark Minimalist Settings Screen",
      type: "Screen",
      category: "Settings & Profile",
      description: "Segmented sections, toggle switches, destructive action dialogs, and avatar upload.",
      tags: ["Screens", "Navigation"],
    },
  ];

  return (
    <div className="contribute-page">
      <div className="container-main">
        {/* Hero Header */}
        <div className="contribute-hero">
          <div className="oss-badge">
            <Heart size={14} className="text-red-400" />
            <span>Open Source Community</span>
            <span className="badge-divider">•</span>
            <span className="license-pill">MIT Licensed</span>
          </div>

          <h1 className="hero-title">
            Build the future of <span className="gradient-text">React Native</span> UI
          </h1>
          <p className="hero-desc">
            RNBlocks is 100% free and open source. We empower mobile developers to own their code instead of wrestling with bloated npm dependencies. Join us in curating the finest blocks, screens, and CLI utilities for Expo and React Native.
          </p>

          {/* Vercel OSS Sponsorship Callout */}
          <div className="vercel-oss-banner">
            <div className="vercel-pill">
              <span className="triangle-icon">▲</span>
              <span>Vercel OSS Program</span>
            </div>
            <p className="vercel-banner-text">
              RNBlocks is built for the global open-source community and hosted on high-performance Vercel Edge infrastructure.
            </p>
            <a
              href="https://vercel.com?utm_source=rnblocks&utm_campaign=oss"
              target="_blank"
              rel="noopener noreferrer"
              className="vercel-link-btn"
            >
              <span>Powered by Vercel</span>
              <ExternalLink size={13} />
            </a>
          </div>

          <div className="hero-cta-row">
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <GitHubIcon size={16} />
              <span>Fork on GitHub</span>
            </a>
            <Link href="/submit" className="btn-secondary">
              <GitPullRequest size={16} />
              <span>Submit Block Guide</span>
            </Link>
            <Link href="/docs" className="btn-ghost">
              <BookOpen size={16} />
              <span>CLI & Architecture Docs</span>
            </Link>
          </div>
        </div>

        {/* 4 Pillars of Contribution */}
        <section className="contrib-section">
          <h2 className="section-title">Ways to Contribute</h2>
          <p className="section-subtitle">
            No matter your skillset, there are impactful ways to contribute to RNBlocks.
          </p>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon">
                <Boxes size={22} />
              </div>
              <h3 className="pillar-title">Craft UI Blocks</h3>
              <p className="pillar-desc">
                Design self-contained, responsive React Native components like dockers, pricing cards, bottom sheets, or navigation headers using clean TypeScript.
              </p>
              <Link href="/submit" className="pillar-link">
                <span>Block submission format</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <Layers size={22} />
              </div>
              <h3 className="pillar-title">Design Full Screen Flows</h3>
              <p className="pillar-desc">
                Build end-to-end mobile screens like authentication carousels, paywalls, onboarding flows, and dashboards that developers can drop into Expo Router.
              </p>
              <Link href="/screens" className="pillar-link">
                <span>View screens gallery</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <Terminal size={22} />
              </div>
              <h3 className="pillar-title">Enhance the CLI</h3>
              <p className="pillar-desc">
                Help improve <code className="inline-code">npx rnblocks</code> in <code className="inline-code">packages/cli</code> with automated dependency installation, project scaffolding, and conflict resolution.
              </p>
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks/tree/master/packages/cli"
                target="_blank"
                rel="noopener noreferrer"
                className="pillar-link"
              >
                <span>Explore CLI package</span>
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon">
                <Code2 size={22} />
              </div>
              <h3 className="pillar-title">Docs & Code Reviews</h3>
              <p className="pillar-desc">
                Review community pull requests, optimize animations for low-end devices, improve TypeScript types, or expand documentation.
              </p>
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks/pulls"
                target="_blank"
                rel="noopener noreferrer"
                className="pillar-link"
              >
                <span>View open Pull Requests</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* Quickstart Local Setup */}
        <section className="contrib-section setup-box">
          <div className="setup-header">
            <Terminal size={20} className="text-zinc-400" />
            <h2 className="setup-title">Local Development Quickstart</h2>
          </div>
          <p className="setup-desc">
            Get the Turborepo monorepo running on your machine in under 2 minutes:
          </p>

          <div className="terminal-window">
            <div className="terminal-top">
              <div className="terminal-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="terminal-filename">bash — setup monorepo</span>
              <button
                onClick={() =>
                  copyToClipboard(
                    "git clone https://github.com/Ashwin-Khowala/rnblocks.git\ncd rnblocks\npnpm install\npnpm dev",
                    "quickstart"
                  )
                }
                className="copy-btn"
                title="Copy commands"
              >
                {copiedCmd === "quickstart" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>
            <pre className="terminal-body">
              <code>
                <span className="comment"># 1. Clone repository</span>
                {"\n"}
                <span className="prompt">$</span> git clone https://github.com/Ashwin-Khowala/rnblocks.git
                {"\n"}
                <span className="prompt">$</span> cd rnblocks
                {"\n\n"}
                <span className="comment"># 2. Install monorepo dependencies (pnpm v9+)</span>
                {"\n"}
                <span className="prompt">$</span> pnpm install
                {"\n\n"}
                <span className="comment"># 3. Start local development server (web + docs)</span>
                {"\n"}
                <span className="prompt">$</span> pnpm dev
                {"\n\n"}
                <span className="comment"># 4. Run tests and typecheck</span>
                {"\n"}
                <span className="prompt">$</span> pnpm run typecheck
              </code>
            </pre>
          </div>
        </section>

        {/* Wishlist / In-Demand Blocks */}
        <section className="contrib-section">
          <div className="section-head-flex">
            <div>
              <h2 className="section-title">Community Wishlist</h2>
              <p className="section-subtitle">
                Looking for inspiration? These are the top requested mobile components and screens requested by the community:
              </p>
            </div>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/issues/new?title=Block+Request:+"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <span>Suggest an Idea</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="wishlist-grid">
            {wishlist.map((item, idx) => (
              <div key={idx} className="wishlist-card">
                <div className="wishlist-meta">
                  <span className="wishlist-type">{item.type}</span>
                  <span className="wishlist-cat">{item.category}</span>
                </div>
                <h4 className="wishlist-title">{item.title}</h4>
                <p className="wishlist-desc">{item.description}</p>
                <div className="wishlist-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="wishlist-action">
                  <a
                    href={`https://github.com/Ashwin-Khowala/rnblocks/issues/new?title=I'd+like+to+build:+${encodeURIComponent(item.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="claim-link"
                  >
                    <span>Claim this block</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code of Conduct & Standards */}
        <section className="contrib-section standards-box">
          <div className="standards-inner">
            <div className="standards-icon">
              <Shield size={28} />
            </div>
            <div className="standards-text">
              <h3 className="standards-title">Our Quality & Community Standards</h3>
              <p className="standards-desc">
                We believe in an inclusive, welcoming environment. All contributions must adhere to our{" "}
                <a
                  href="https://github.com/Ashwin-Khowala/rnblocks/blob/master/CODE_OF_CONDUCT.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-highlight"
                >
                  Code of Conduct
                </a>
                . Furthermore, every block must be written in strict TypeScript, maintain zero security vulnerabilities, and work without proprietary licensing fees.
              </p>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .contribute-page {
          padding: 60px 0 100px;
          min-height: 80vh;
        }

        .contribute-hero {
          max-width: 840px;
          margin: 0 auto 72px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .oss-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .badge-divider {
          color: var(--text-muted);
        }

        .license-pill {
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-size: 11px;
        }

        .hero-title {
          font-size: clamp(32px, 5vw, 54px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 30%, #9ca3af 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-desc {
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 720px;
          margin-bottom: 32px;
        }

        .vercel-oss-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 12px 20px;
          margin-bottom: 32px;
          width: 100%;
          max-width: 680px;
        }

        .vercel-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.06);
          padding: 4px 10px;
          border-radius: 4px;
          white-space: nowrap;
        }

        .triangle-icon {
          font-size: 10px;
        }

        .vercel-banner-text {
          font-size: 12.5px;
          color: var(--text-muted);
          text-align: left;
          flex: 1;
          margin: 0;
        }

        .vercel-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-hover);
          padding-bottom: 2px;
          transition: border-color var(--transition-fast);
          white-space: nowrap;
        }

        .vercel-link-btn:hover {
          border-color: var(--text-primary);
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .contrib-section {
          margin-bottom: 80px;
        }

        .section-title {
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .section-subtitle {
          font-size: 15px;
          color: var(--text-secondary);
          margin-bottom: 32px;
          max-width: 620px;
        }

        .section-head-flex {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }

        .section-head-flex .section-subtitle {
          margin-bottom: 0;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .pillar-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: border-color var(--transition-fast), transform var(--transition-fast);
        }

        .pillar-card:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
        }

        .pillar-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          margin-bottom: 18px;
        }

        .pillar-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .pillar-desc {
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--text-muted);
          margin-bottom: 20px;
          flex: 1;
        }

        .inline-code {
          font-family: var(--font-mono);
          font-size: 12px;
          background: rgba(255, 255, 255, 0.07);
          padding: 2px 4px;
          border-radius: 3px;
          color: var(--text-primary);
        }

        .pillar-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
          transition: gap var(--transition-fast);
        }

        .pillar-link:hover {
          gap: 9px;
        }

        .setup-box {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px;
        }

        .setup-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .setup-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .setup-desc {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .terminal-window {
          background: #000000;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .terminal-top {
          background: #111111;
          border-bottom: 1px solid var(--border);
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .terminal-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dot-red {
          background: #ff5f56;
        }
        .dot-yellow {
          background: #ffbd2e;
        }
        .dot-green {
          background: #27c93f;
        }

        .terminal-filename {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }

        .copy-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          transition: color var(--transition-fast);
        }

        .copy-btn:hover {
          color: var(--text-primary);
        }

        .terminal-body {
          padding: 20px;
          margin: 0;
          font-family: var(--font-mono);
          font-size: 13.5px;
          line-height: 1.65;
          color: #f3f4f6;
          overflow-x: auto;
        }

        .comment {
          color: #6b7280;
        }

        .prompt {
          color: #38bdf8;
          user-select: none;
          margin-right: 6px;
        }

        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .wishlist-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .wishlist-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .wishlist-type {
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 2px 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-secondary);
        }

        .wishlist-cat {
          font-size: 12px;
          color: var(--text-muted);
        }

        .wishlist-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .wishlist-desc {
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-muted);
          margin-bottom: 16px;
          flex: 1;
        }

        .wishlist-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .tag-pill {
          font-size: 11px;
          padding: 2px 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          color: var(--text-secondary);
        }

        .wishlist-action {
          border-top: 1px solid var(--border);
          padding-top: 14px;
        }

        .claim-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
          transition: gap var(--transition-fast);
        }

        .claim-link:hover {
          gap: 9px;
        }

        .standards-box {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.005) 100%);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px;
        }

        .standards-inner {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .standards-icon {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          flex-shrink: 0;
        }

        .standards-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .standards-desc {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }

        .link-highlight {
          color: var(--text-primary);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        @media (max-width: 1024px) {
          .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .wishlist-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .pillars-grid,
          .wishlist-grid {
            grid-template-columns: 1fr;
          }
          .vercel-oss-banner {
            flex-direction: column;
            align-items: flex-start;
          }
          .standards-inner {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
