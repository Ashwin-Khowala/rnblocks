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
  "type": "block",
  "author": {
    "name": "Your Name",
    "github": "your_github_username"
  },
  "version": "1.0.0",
  "category": "payments",
  "tags": ["pricing", "subscription", "cards"],
  "files": [
    {
      "path": "files/subscription-card.tsx",
      "type": "registry:component"
    }
  ],
  "dependencies": ["lucide-react-native"],
  "devDependencies": {},
  "registryDependencies": [],
  "platforms": ["ios", "android", "web"],
  "frameworks": ["expo", "react-native"],
  "styling": ["StyleSheet"],
  "themes": ["dark", "light"]
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
                  Create a self-contained component in <code>registry/blocks/[your-block-name]/files/</code> using standard React Native primitives (<code>StyleSheet</code>). Keep it responsive to its container, extract semantic colors at the top of the file, and include accessibility attributes.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number-col">
                <span className="step-num-badge">3</span>
                <div className="step-line" />
              </div>
              <div className="step-content-col">
                <h3 className="step-item-title">Add metadata (registry.json)</h3>
                <p className="step-item-desc">
                  Every component requires a <code>registry.json</code> file declaring its name, title, category, dependencies, supported themes, and platforms:
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
                <h3 className="step-item-title">Validate locally</h3>
                <p className="step-item-desc">
                  Run <code>pnpm run validate:registry</code> and <code>pnpm run typecheck</code> to verify that your block adheres to schema rules and passes TypeScript checks.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number-col">
                <span className="step-num-badge">5</span>
                <div className="step-line" />
              </div>
              <div className="step-content-col">
                <h3 className="step-item-title">Open a Pull Request</h3>
                <p className="step-item-desc">
                  Push your branch to your fork and open a Pull Request against <code>master</code>. Our GitHub Actions CI will automatically run type checking and registry validation.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number-col">
                <span className="step-num-badge">6</span>
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
            <h3 className="quality-title">Author & Quality Standards</h3>
          </div>
          <div className="guidelines-grid">
            <div className="guide-box">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Standalone & Source-Owned</strong>
                <p>Follow copy → own → customize. No mandatory ThemeProvider wrappers, forced runtime packages, or token abstraction bloat.</p>
              </div>
            </div>
            <div className="guide-box">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Container-Responsive</strong>
                <p>Components adapt to container width (tested across 320pt to 428pt+). No hardcoded screen-width assumptions (e.g. width: 390).</p>
              </div>
            </div>
            <div className="guide-box">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Semantic Colors & Theming</strong>
                <p>Place semantic color constants (COLORS_DARK / COLORS_LIGHT) at the top of the file. Provide theme?: "dark" | "light" where appropriate.</p>
              </div>
            </div>
            <div className="guide-box">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Accessibility & Performance</strong>
                <p>Declare accessibilityRole, accessibilityLabel, reasonable touch targets, sufficient color contrast, and avoid unnecessary re-renders.</p>
              </div>
            </div>
            <div className="guide-box">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Strict TypeScript</strong>
                <p>All component props and exported interfaces must be strictly typed without any or untyped callback handlers.</p>
              </div>
            </div>
            <div className="guide-box">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Expo & Native Verified</strong>
                <p>Verify that components render without layout errors across iOS, Android, and web previews.</p>
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
          padding: 96px 0 100px;
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
          .submit-page {
            padding: 86px 0 60px;
          }

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
