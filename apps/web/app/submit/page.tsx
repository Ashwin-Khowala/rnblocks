"use client";

import React from "react";
import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import {
  GitPullRequest,
  CheckCircle2,
  Terminal,
  FileCode,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";

export default function SubmitPage() {
  const metaJsonExample = `{
  "name": "subscription-card",
  "title": "Subscription Pricing Card",
  "description": "A responsive pricing card for in-app mobile subscriptions.",
  "category": "payments",
  "author": "your_github_username",
  "platforms": ["ios", "android", "web"],
  "frameworks": ["expo", "react-native"],
  "styling": "NativeWind",
  "dependencies": ["nativewind", "lucide-react-native"]
}`;

  return (
    <div className="submit-page">
      <div className="container-main">
        {/* Header */}
        <div className="submit-header">
          <div className="header-badge">
            <GitPullRequest size={14} />
            <span>Community Contributions</span>
          </div>
          <h1 className="page-title">Submit a React Native Block</h1>
          <p className="page-subtitle">
            RNBlocks is completely open-source and GitHub-driven. We keep quality exceptionally high through structured Pull Request reviews.
          </p>
        </div>

        {/* 6 Step Guide */}
        <div className="steps-container">
          <h2 className="steps-heading">The GitHub Contribution Workflow</h2>

          <div className="steps-list">
            <div className="step-item">
              <div className="step-number-col">
                <span className="step-num-badge">1</span>
                <div className="step-line" />
              </div>
              <div className="step-content-col">
                <h3 className="step-item-title">Fork the repository</h3>
                <p className="step-item-desc">
                  Fork the official RNBlocks repo to your GitHub account and clone it locally.
                </p>
                <div className="code-box">
                  <code>git clone https://github.com/Ashwin-Khowala/rnblocks.git</code>
                  <CopyButton text="git clone https://github.com/Ashwin-Khowala/rnblocks.git" />
                </div>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number-col">
                <span className="step-num-badge">2</span>
                <div className="step-line" />
              </div>
              <div className="step-content-col">
                <h3 className="step-item-title">Build your component</h3>
                <p className="step-item-desc">
                  Create a self-contained component in <code>registry/blocks/[your-block-name]/</code>. Use NativeWind or standard StyleSheet. Ensure clean props and zero unnecessary dependencies.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number-col">
                <span className="step-num-badge">3</span>
                <div className="step-line" />
              </div>
              <div className="step-content-col">
                <h3 className="step-item-title">Add metadata (meta.json)</h3>
                <p className="step-item-desc">
                  Every component requires a <code>meta.json</code> file describing its category, dependencies, and author information:
                </p>
                <div className="meta-preview-box">
                  <pre>{metaJsonExample}</pre>
                  <CopyButton text={metaJsonExample} label="Copy Template" />
                </div>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number-col">
                <span className="step-num-badge">4</span>
                <div className="step-line" />
              </div>
              <div className="step-content-col">
                <h3 className="step-item-title">Open a Pull Request</h3>
                <p className="step-item-desc">
                  Push your branch to your fork and open a Pull Request against <code>main</code>. Our GitHub Actions CI will automatically run type checking and registry validation.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number-col">
                <span className="step-num-badge">5</span>
              </div>
              <div className="step-content-col">
                <h3 className="step-item-title">Review & Published</h3>
                <p className="step-item-desc">
                  Once approved and merged, the registry rebuilds automatically. Your block instantly appears in the web gallery and becomes installable via <code>npx rnblocks add [your-block]</code>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Guidelines Card */}
        <div className="quality-card">
          <div className="quality-header">
            <ShieldCheck size={20} className="shield-icon" />
            <h3 className="quality-title">Author & Quality Guidelines</h3>
          </div>
          <div className="guidelines-grid">
            <div className="guide-box">
              <span className="guide-dot">✓</span>
              <div>
                <strong>Self-Contained</strong>
                <p>Blocks should not require complex global state or hidden providers unless explicitly documented.</p>
              </div>
            </div>
            <div className="guide-box">
              <span className="guide-dot">✓</span>
              <div>
                <strong>TypeScript First</strong>
                <p>All component props and exported interfaces must be strictly typed.</p>
              </div>
            </div>
            <div className="guide-box">
              <span className="guide-dot">✓</span>
              <div>
                <strong>Native & Expo Tested</strong>
                <p>Verify that components render without layout errors on both iOS and Android devices.</p>
              </div>
            </div>
            <div className="guide-box">
              <span className="guide-dot">✓</span>
              <div>
                <strong>Clean Styling</strong>
                <p>Support light and dark mode colors or provide sensible defaults.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="submit-cta-bar">
          <div>
            <h3 className="cta-bar-title">Ready to contribute?</h3>
            <p className="cta-bar-sub">Check out open block requests or submit your original creation.</p>
          </div>
          <div className="cta-bar-actions">
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <GitHubIcon size={16} />
              <span>Open GitHub Repository</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .submit-page {
          padding: 60px 0 100px;
          background: var(--bg-primary);
          flex: 1;
        }

        .submit-header {
          max-width: 640px;
          margin-bottom: 50px;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
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

        .steps-container {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 40px;
          margin-bottom: 36px;
        }

        .steps-heading {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 32px;
        }

        .steps-list {
          display: flex;
          flex-direction: column;
        }

        .step-item {
          display: flex;
          gap: 20px;
          position: relative;
        }

        .step-number-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-num-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-family: var(--font-mono);
          font-weight: 700;
          flex-shrink: 0;
        }

        .step-line {
          width: 1px;
          flex: 1;
          background: var(--border);
          margin: 8px 0;
          min-height: 40px;
        }

        .step-content-col {
          padding-bottom: 32px;
          flex: 1;
        }

        .step-item-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .step-item-desc {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 22px;
          margin-bottom: 12px;
        }

        .step-item-desc code {
          background: var(--bg-elevated);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-primary);
        }

        .code-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--code-bg);
          border: 1px solid var(--code-border);
          border-radius: var(--radius-md);
          padding: 8px 12px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-primary);
          max-width: 500px;
        }

        .meta-preview-box {
          position: relative;
          background: var(--code-bg);
          border: 1px solid var(--code-border);
          border-radius: var(--radius-md);
          padding: 14px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-primary);
          line-height: 18px;
          max-width: 540px;
        }

        .meta-preview-box pre {
          margin: 0;
          margin-bottom: 10px;
        }

        .quality-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px;
          margin-bottom: 36px;
        }

        .quality-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        .shield-icon {
          color: var(--text-primary);
        }

        .quality-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .guidelines-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .guide-box {
          display: flex;
          gap: 12px;
        }

        .guide-dot {
          color: var(--success);
          font-weight: 800;
          font-size: 14px;
        }

        .guide-box strong {
          display: block;
          font-size: 14px;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .guide-box p {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 18px;
        }

        .submit-cta-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 32px;
        }

        .cta-bar-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .cta-bar-sub {
          font-size: 13px;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .guidelines-grid {
            grid-template-columns: 1fr;
          }

          .submit-cta-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
          }
        }
      `}</style>
    </div>
  );
}
