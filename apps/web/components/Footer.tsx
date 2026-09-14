"use client";

import React from "react";
import Link from "next/link";
import { Layers } from "lucide-react";
import { GitHubIcon } from "./icons/GitHubIcon";

export function Footer() {
  return (
    <footer className="bg-[#070709] border-t border-white/[0.08] mt-auto">
      <div className="container-main py-10 md:py-14 grid grid-cols-1 md:grid-cols-[1.5fr_2.5fr] gap-10 md:gap-14">
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className="w-[26px] h-[26px] rounded-md bg-[#1a1a24] border border-white/[0.08] flex items-center justify-center text-[#f5f5f5]">
              <Layers size={16} />
            </div>
            <span className="font-bold text-base text-[#f5f5f5] tracking-[-0.01em]">
              RNBlocks
            </span>
          </div>
          <p className="text-[13px] leading-5 text-[#71717a] max-w-[320px] mb-4">
            The open-source UI block registry for React Native and Expo developers. Discover, inspect, and copy production ready mobile components.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
            <span>MIT Licensed</span>
            <span className="text-[#71717a]">•</span>
            <span>Open Source</span>
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-7 md:gap-8">
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-[#f5f5f5] font-semibold mb-1.5">
              Registry
            </h4>
            <Link href="/blocks" className="text-[13px] text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
              Explore Blocks
            </Link>
            <Link href="/screens" className="text-[13px] text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
              Explore Screens
            </Link>
            <Link href="/submit" className="text-[13px] text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
              Submit a Block
            </Link>
            <Link href="/docs" className="text-[13px] text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
              Documentation
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-[#f5f5f5] font-semibold mb-1.5">
              Community
            </h4>
            <Link href="/contribute" className="text-[13px] text-[#9ca3af] hover:text-[#f5f5f5] transition-colors">
              Contribute
            </Link>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/blob/master/CODE_OF_CONDUCT.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#9ca3af] hover:text-[#f5f5f5] transition-colors"
            >
              Code of Conduct
            </a>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#9ca3af] hover:text-[#f5f5f5] transition-colors"
            >
              GitHub Issues
            </a>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/blob/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#9ca3af] hover:text-[#f5f5f5] transition-colors"
            >
              MIT License
            </a>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-[#f5f5f5] font-semibold mb-1.5">
              Ecosystem
            </h4>
            <a
              href="https://reactnative.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#9ca3af] hover:text-[#f5f5f5] transition-colors"
            >
              React Native
            </a>
            <a
              href="https://expo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#9ca3af] hover:text-[#f5f5f5] transition-colors"
            >
              Expo
            </a>
            <a
              href="https://nativewind.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#9ca3af] hover:text-[#f5f5f5] transition-colors"
            >
              NativeWind
            </a>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#9ca3af] hover:text-[#f5f5f5] transition-colors"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08] py-5">
        <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-[#71717a]">
            © {new Date().getFullYear()} RNBlocks. Built for React Native builders.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#71717a] hover:text-[#f5f5f5] transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
