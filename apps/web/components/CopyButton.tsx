"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
}

export function CopyButton({ text, className = "", label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`copy-btn ${copied ? "copied" : ""} ${className}`}
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check size={14} className="copy-icon" color="var(--success)" />
          {label && <span style={{ color: "var(--success)" }}>Copied!</span>}
        </>
      ) : (
        <>
          <Copy size={14} className="copy-icon" />
          {label && <span>{label}</span>}
        </>
      )}

      <style jsx>{`
        .copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 12px;
          font-family: var(--font-sans);
          font-weight: 500;
          transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
        }

        .copy-btn:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-hover);
          color: var(--text-primary);
        }

        .copy-btn.copied {
          border-color: rgba(34, 197, 94, 0.3);
        }

        .copy-icon {
          flex-shrink: 0;
        }
      `}</style>
    </button>
  );
}
