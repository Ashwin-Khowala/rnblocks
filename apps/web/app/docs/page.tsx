"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import {
  Terminal,
  BookOpen,
  Code2,
  FolderTree,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    { id: "getting-started", title: "Getting Started" },
    { id: "cli", title: "CLI Reference" },
    { id: "styling", title: "Styling Guide" },
    { id: "project-structure", title: "Project Structure" },
    { id: "authoring", title: "Creating Blocks" },
  ];

  return (
    <div className="docs-page">
      <div className="container-main docs-container">
        {/* Sidebar Nav */}
        <aside className="docs-sidebar">
          <div className="sidebar-group">
            <span className="sidebar-group-title">Documentation</span>
            <div className="sidebar-links">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`sidebar-btn ${activeSection === sec.id ? "active" : ""}`}
                >
                  <span>{sec.title}</span>
                  {activeSection === sec.id && <ChevronRight size={14} />}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-cta-box">
            <span className="cta-box-title">Need help?</span>
            <p className="cta-box-desc">
              Have questions or request a block? Open an issue on GitHub.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: 12, padding: "6px 10px" }}
            >
              GitHub Issues
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <article className="docs-content">
          {activeSection === "getting-started" && (
            <div>
              <span className="doc-eyebrow">Overview</span>
              <h1 className="doc-h1">Getting Started with RNBlocks</h1>
              <p className="doc-lead">
                RNBlocks is an open-source registry of production-ready React Native components and screens. Unlike traditional component libraries packaged as npm binaries, RNBlocks provides direct source code that you own, inspect, and customize.
              </p>

              <h2 className="doc-h2">Why source installation?</h2>
              <p className="doc-text">
                Mobile UI evolves rapidly. By installing the actual component source directly into your repository:
              </p>
              <ul className="doc-ul">
                <li>You have complete control over styling, animation timing, and layout adjustments.</li>
                <li>Zero wrapper dependencies or breaking third-party package upgrades.</li>
                <li>Seamless integration with your existing NativeWind or StyleSheet design tokens.</li>
              </ul>

              <h2 className="doc-h2">Quick Install</h2>
              <p className="doc-text">
                Run the CLI in your React Native or Expo project root:
              </p>
              <div className="doc-code-block">
                <code>npx rnblocks add pricing-card</code>
                <CopyButton text="npx rnblocks add pricing-card" />
              </div>
              <p className="doc-caption">
                This copies the component files into <code>components/pricing-card.tsx</code> and installs any required dependencies.
              </p>
            </div>
          )}

          {activeSection === "cli" && (
            <div>
              <span className="doc-eyebrow">Reference</span>
              <h1 className="doc-h1">CLI Reference</h1>
              <p className="doc-lead">
                The <code>rnblocks</code> CLI is lightweight and works seamlessly with <code>npx</code> or <code>bunx</code>.
              </p>

              <h2 className="doc-h2">Add Command</h2>
              <div className="doc-code-block">
                <code>npx rnblocks add &lt;block-slug&gt;</code>
                <CopyButton text="npx rnblocks add <block-slug>" />
              </div>

              <h3 className="doc-h3">Flags & Options</h3>
              <div className="table-wrap">
                <table className="doc-table">
                  <thead>
                    <tr>
                      <th>Flag</th>
                      <th>Description</th>
                      <th>Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>-d, --dir &lt;path&gt;</code></td>
                      <td>Target directory for installed components</td>
                      <td><code>components/</code></td>
                    </tr>
                    <tr>
                      <td><code>--no-deps</code></td>
                      <td>Skip automatic npm/bun dependency installation</td>
                      <td><code>false</code></td>
                    </tr>
                    <tr>
                      <td><code>-h, --help</code></td>
                      <td>Display command arguments and help</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="doc-h2">List Command</h2>
              <p className="doc-text">
                Browse available blocks from your terminal:
              </p>
              <div className="doc-code-block">
                <code>npx rnblocks list</code>
                <CopyButton text="npx rnblocks list" />
              </div>
            </div>
          )}

          {activeSection === "styling" && (
            <div>
              <span className="doc-eyebrow">Design Systems</span>
              <h1 className="doc-h1">Styling with NativeWind & StyleSheet</h1>
              <p className="doc-lead">
                Blocks in the registry are primarily built with either <strong>NativeWind v4</strong> or standard React Native <strong>StyleSheet</strong> primitives.
              </p>

              <h2 className="doc-h2">NativeWind (Tailwind CSS)</h2>
              <p className="doc-text">
                NativeWind translates Tailwind utility classes directly into performant native styles. Most blocks with the "NativeWind" badge use utility classes that you can edit instantly:
              </p>
              <div className="doc-code-block">
                <code>{'<View className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800" />'}</code>
              </div>

              <h2 className="doc-h2">Standard StyleSheet</h2>
              <p className="doc-text">
                Blocks tagged with "StyleSheet" use zero CSS preprocessors and work in any bare React Native or Expo project out of the box with zero setup.
              </p>
            </div>
          )}

          {activeSection === "project-structure" && (
            <div>
              <span className="doc-eyebrow">Conventions</span>
              <h1 className="doc-h1">Recommended Project Structure</h1>
              <p className="doc-lead">
                When installing blocks into your Expo or React Native app, here is how files are organized:
              </p>
              <div className="doc-code-block">
                <pre>{`my-rn-app/
├── app/                  # Expo Router navigation
│   ├── (tabs)/
│   └── index.tsx
├── components/           # Installed UI Blocks live here
│   ├── pricing-card.tsx
│   ├── login-form.tsx
│   └── paywall.tsx
├── package.json
└── tailwind.config.js    # (if using NativeWind)`}</pre>
              </div>
            </div>
          )}

          {activeSection === "authoring" && (
            <div>
              <span className="doc-eyebrow">Contribution</span>
              <h1 className="doc-h1">Authoring & Creating Blocks</h1>
              <p className="doc-lead">
                Want to publish your own block to the registry? Follow our simple authoring standard:
              </p>

              <h2 className="doc-h2">Guidelines</h2>
              <ul className="doc-ul">
                <li>Create clean, focused components that solve one clear mobile design challenge.</li>
                <li>Avoid hardcoded business logic or non-standard third-party SDK dependencies.</li>
                <li>Always provide TypeScript prop types so developers get instant autocomplete.</li>
              </ul>

              <Link href="/submit" className="btn-primary" style={{ marginTop: 24 }}>
                View Full Contribution Guide
              </Link>
            </div>
          )}
        </article>
      </div>

      <style jsx>{`
        .docs-page {
          padding: 48px 0 90px;
          background: var(--bg-primary);
          flex: 1;
        }

        .docs-container {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 60px;
        }

        .docs-sidebar {
          position: sticky;
          top: 80px;
          height: fit-content;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sidebar-group-title {
          font-size: 11px;
          font-family: var(--font-mono);
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 12px;
        }

        .sidebar-links {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sidebar-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-secondary);
          text-align: left;
          transition: background var(--transition-fast), color var(--transition-fast);
        }

        .sidebar-btn:hover {
          background: var(--bg-card);
          color: var(--text-primary);
        }

        .sidebar-btn.active {
          background: var(--bg-card-hover);
          color: var(--text-primary);
          font-weight: 600;
        }

        .sidebar-cta-box {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px;
        }

        .cta-box-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          display: block;
          margin-bottom: 4px;
        }

        .cta-box-desc {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 16px;
          margin-bottom: 12px;
        }

        .docs-content {
          max-width: 760px;
        }

        .doc-eyebrow {
          font-size: 11px;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          display: block;
          margin-bottom: 8px;
        }

        .doc-h1 {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .doc-lead {
          font-size: 16px;
          line-height: 26px;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .doc-h2 {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 36px;
          margin-bottom: 12px;
        }

        .doc-h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-top: 24px;
          margin-bottom: 12px;
        }

        .doc-text {
          font-size: 14.5px;
          line-height: 24px;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .doc-ul {
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 14.5px;
          color: var(--text-secondary);
          line-height: 22px;
          margin-bottom: 24px;
        }

        .doc-code-block {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--code-bg);
          border: 1px solid var(--code-border);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-primary);
          margin: 14px 0;
          overflow-x: auto;
        }

        .doc-code-block pre {
          margin: 0;
          line-height: 20px;
        }

        .doc-caption {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: -6px;
          margin-bottom: 20px;
        }

        .table-wrap {
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          margin: 16px 0;
        }

        .doc-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          text-align: left;
        }

        .doc-table th {
          background: var(--bg-card);
          padding: 10px 14px;
          color: var(--text-primary);
          font-weight: 600;
          border-bottom: 1px solid var(--border);
        }

        .doc-table td {
          padding: 10px 14px;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border);
        }

        .doc-table tr:last-child td {
          border-bottom: none;
        }

        .doc-table code {
          background: var(--bg-elevated);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--text-primary);
        }

        @media (max-width: 860px) {
          .docs-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .docs-sidebar {
            position: static;
          }
        }
      `}</style>
    </div>
  );
}
