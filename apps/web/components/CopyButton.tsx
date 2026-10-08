"use client";

import React, { useState } from "react";
import { track } from "@vercel/analytics";
import { CopyIcon, CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
  /** When true (default), hides text label on mobile screens */
  collapseOnMobile?: boolean;
}

export function CopyButton({ text, className, label, collapseOnMobile = true }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Track copy event in Vercel Analytics
      try {
        track("copy_code", {
          command: text.slice(0, 100),
          label: label || "copy",
        });
      } catch {
        // Safe no-op if analytics blocked or in dev
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-xs font-mono sm:font-medium bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#9ca3af] hover:text-white hover:border-white/20 transition-all cursor-pointer select-none shrink-0",
        copied && "border-[#32c798]/40 text-[#32c798] bg-[#32c798]/10",
        className
      )}
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <>
          <CheckIcon size={13} className="shrink-0 text-[#32c798]" />
          {label && (
            <span
              className={cn(
                "text-[#32c798] truncate text-[11px] sm:text-xs",
                collapseOnMobile && "hidden sm:inline"
              )}
            >
              {label === "Copy" ? "Copied!" : label}
            </span>
          )}
        </>
      ) : (
        <>
          <CopyIcon size={13} className="shrink-0" />
          {label && (
            <span
              className={cn(
                "truncate text-[11px] sm:text-xs",
                collapseOnMobile && "hidden sm:inline"
              )}
            >
              {label}
            </span>
          )}
        </>
      )}
    </button>
  );
}
