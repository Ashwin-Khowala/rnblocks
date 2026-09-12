"use client";

import React, { useMemo } from "react";
import { CopyButton } from "./CopyButton";
import { FileCode, Check } from "lucide-react";

interface CodeViewerProps {
  code: string;
  filename?: string;
  language?: string;
}

// Tokenizing patterns for JSX/TSX syntax highlighting
const KEYWORDS = new Set([
  "import", "export", "from", "as", "default", "const", "let", "var",
  "function", "return", "interface", "type", "if", "else", "switch",
  "case", "break", "true", "false", "null", "undefined", "async",
  "await", "typeof", "keyof", "new", "void", "any", "string", "number",
  "boolean"
]);

const HOOKS_AND_PRIMITIVES = new Set([
  "useState", "useEffect", "useCallback", "useMemo", "useRef", "useContext",
  "StyleSheet", "React", "View", "Text", "TouchableOpacity", "Animated",
  "ScrollView", "Image", "Platform", "Dimensions"
]);

function highlightLine(line: string): React.ReactNode {
  if (!line || line.length === 0) {
    return " ";
  }

  // Check for whole-line comment (ignoring leading whitespace)
  const trimmed = line.trimStart();
  if (trimmed.startsWith("//")) {
    const indent = line.slice(0, line.indexOf("//"));
    return (
      <>
        <span>{indent}</span>
        <span className="tok-comment">{trimmed}</span>
      </>
    );
  }

  // Token regex for strings, comments, tags, attributes, words, numbers, punctuation
  const tokenRegex = /(?:\/\/.*$)|(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?[A-Za-z0-9_.]+|\/?>)|([A-Za-z0-9_]+(?=\=))|(\b[A-Za-z0-9_]+\b)|([{}()[\];,.:=><!&|?+\-*]+)|(\s+)/g;

  const elements: React.ReactNode[] = [];
  let match: RegExpExecArray | null;
  let lastIndex = 0;
  let keyIndex = 0;

  while ((match = tokenRegex.exec(line)) !== null) {
    // If there is unmatched gap, push as raw text
    if (match.index > lastIndex) {
      elements.push(
        <span key={`gap-${keyIndex++}`}>
          {line.slice(lastIndex, match.index)}
        </span>
      );
    }

    const token = match[0];
    lastIndex = tokenRegex.lastIndex;

    if (token.startsWith("//")) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="tok-comment">
          {token}
        </span>
      );
    } else if (token.startsWith('"') || token.startsWith("'") || token.startsWith("`")) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="tok-string">
          {token}
        </span>
      );
    } else if (token.startsWith("<") || token.endsWith(">")) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="tok-tag">
          {token}
        </span>
      );
    } else if (match[2]) {
      // Attribute name before =
      elements.push(
        <span key={`tok-${keyIndex++}`} className="tok-attr">
          {token}
        </span>
      );
    } else if (KEYWORDS.has(token)) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="tok-keyword">
          {token}
        </span>
      );
    } else if (HOOKS_AND_PRIMITIVES.has(token)) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="tok-primitive">
          {token}
        </span>
      );
    } else if (/^\d+(\.\d+)?$/.test(token)) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="tok-number">
          {token}
        </span>
      );
    } else if (/^[{}()[\];,.:=><!&|?+\-*]+$/.test(token)) {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="tok-punct">
          {token}
        </span>
      );
    } else {
      elements.push(
        <span key={`tok-${keyIndex++}`} className="tok-plain">
          {token}
        </span>
      );
    }
  }

  if (lastIndex < line.length) {
    elements.push(
      <span key={`tail-${keyIndex++}`}>
        {line.slice(lastIndex)}
      </span>
    );
  }

  return elements.length > 0 ? elements : line;
}

export function CodeViewer({
  code,
  filename = "component.tsx",
  language = "tsx",
}: CodeViewerProps) {
  const lines = useMemo(() => {
    return (code || "").trim().split("\n");
  }, [code]);

  return (
    <div className="code-viewer-container">
      {/* Header bar */}
      <div className="code-viewer-header">
        <div className="header-left">
          <div className="window-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="file-tab">
            <FileCode size={13} className="file-icon" />
            <span className="file-name">{filename}</span>
          </div>
        </div>

        <div className="header-actions">
          <span className="line-count">{lines.length} lines</span>
          <span className="lang-tag">{language.toUpperCase()}</span>
          <CopyButton text={code} label="Copy" />
        </div>
      </div>

      {/* Code body with line numbers */}
      <div className="code-viewer-body">
        <pre className="code-pre">
          <code className="code-block">
            {lines.map((line, idx) => (
              <div key={idx} className="code-line">
                <span className="line-num">{idx + 1}</span>
                <span className="line-content">
                  {highlightLine(line)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      <style jsx>{`
        .code-viewer-container {
          background: #09090c;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: var(--font-mono, "JetBrains Mono", monospace);
          text-align: left !important;
          box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.5);
        }

        .code-viewer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: #0f0f13;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          text-align: left;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .window-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dot {
          width: 9px;
          height: 9px;
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

        .file-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          color: #e4e4e7;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.05);
          padding: 3px 10px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .file-icon {
          color: #9ca3af;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .line-count {
          font-size: 11px;
          color: #71717a;
          font-weight: 500;
        }

        .lang-tag {
          font-size: 10.5px;
          color: #a1a1aa;
          font-weight: 600;
          letter-spacing: 0.04em;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2px 7px;
          border-radius: 4px;
        }

        .code-viewer-body {
          padding: 16px 0;
          overflow-x: auto;
          overflow-y: auto;
          max-height: 560px;
          text-align: left !important;
          background: #09090c;
        }

        /* Custom dark sleek scrollbar */
        .code-viewer-body::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }

        .code-viewer-body::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        .code-viewer-body::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }

        .code-viewer-body::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .code-pre {
          margin: 0;
          font-size: 12.5px;
          line-height: 22px;
          color: #f3f4f6;
          font-family: inherit;
          text-align: left !important;
          display: block;
        }

        .code-block {
          display: block;
          text-align: left !important;
          min-width: 100%;
        }

        .code-line {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 0 16px;
          min-width: 100%;
          text-align: left !important;
          box-sizing: border-box;
          transition: background 0.12s ease;
        }

        .code-line:hover {
          background: rgba(255, 255, 255, 0.035);
        }

        .line-num {
          width: 42px;
          flex-shrink: 0;
          color: #4b5563;
          user-select: none;
          text-align: right !important;
          padding-right: 14px;
          font-size: 11.5px;
          border-right: 1px solid rgba(255, 255, 255, 0.07);
          margin-right: 16px;
          line-height: 22px;
        }

        .line-content {
          white-space: pre !important;
          flex: 1;
          min-width: 0;
          text-align: left !important;
          tab-size: 2;
          font-family: inherit;
          line-height: 22px;
        }

        /* Syntax Highlight Token Colors */
        :global(.tok-comment) {
          color: #6b7280 !important;
          font-style: italic;
        }

        :global(.tok-string) {
          color: #4ade80 !important;
        }

        :global(.tok-keyword) {
          color: #c084fc !important;
          font-weight: 600;
        }

        :global(.tok-primitive) {
          color: #38bdf8 !important;
          font-weight: 500;
        }

        :global(.tok-tag) {
          color: #67e8f9 !important;
        }

        :global(.tok-attr) {
          color: #fcd34d !important;
        }

        :global(.tok-number) {
          color: #fb7185 !important;
        }

        :global(.tok-punct) {
          color: #94a3b8 !important;
        }

        :global(.tok-plain) {
          color: #f1f5f9 !important;
        }
      `}</style>
    </div>
  );
}
