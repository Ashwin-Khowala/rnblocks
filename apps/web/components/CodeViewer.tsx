"use client";

import React from "react";
import { CopyButton } from "./CopyButton";
import { FileCode } from "lucide-react";

interface CodeViewerProps {
  code: string;
  filename?: string;
  language?: string;
}

export function CodeViewer({
  code,
  filename = "component.tsx",
  language = "tsx",
}: CodeViewerProps) {
  // Simple syntax tokenizer for fast client rendering without heavy runtime
  const lines = code.trim().split("\n");

  return (
    <div className="code-viewer-container">
      {/* Header bar */}
      <div className="code-viewer-header">
        <div className="file-tab">
          <FileCode size={14} className="file-icon" />
          <span className="file-name">{filename}</span>
        </div>
        <div className="header-actions">
          <span className="lang-tag">{language}</span>
          <CopyButton text={code} label="Copy Code" />
        </div>
      </div>

      {/* Code body with line numbers */}
      <div className="code-viewer-body">
        <pre className="code-pre">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="code-line">
                <span className="line-num">{idx + 1}</span>
                <span className="line-content">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      <style jsx>{`
        .code-viewer-container {
          background: var(--code-bg);
          border: 1px solid var(--code-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: var(--font-mono);
        }

        .code-viewer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: var(--bg-card);
          border-bottom: 1px solid var(--border);
        }

        .file-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .file-icon {
          color: var(--text-secondary);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .lang-tag {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          background: var(--bg-elevated);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .code-viewer-body {
          padding: 16px 0;
          overflow-x: auto;
          max-height: 540px;
        }

        .code-pre {
          margin: 0;
          font-size: 12.5px;
          line-height: 20px;
          color: var(--text-primary);
        }

        .code-line {
          display: flex;
          padding: 0 16px;
          min-width: 100%;
        }

        .code-line:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .line-num {
          width: 38px;
          flex-shrink: 0;
          color: var(--text-muted);
          user-select: none;
          text-align: right;
          padding-right: 18px;
          font-size: 11px;
        }

        .line-content {
          white-space: pre;
          flex: 1;
        }
      `}</style>
    </div>
  );
}
