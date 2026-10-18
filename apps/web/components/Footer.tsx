"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GitHubIcon } from "./icons/GitHubIcon";

export function Footer() {
  return (
    <footer className="bg-[#07090b] border-t border-[#263238] mt-auto relative z-10 font-mono text-[12px]">
      <div className="container-main py-10 md:py-14 grid grid-cols-1 md:grid-cols-[1.5fr_2.5fr] gap-10 md:gap-14">
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-2.5 mb-3.5">
            <Image
              src="/logo.png"
              alt="RNBlocks - React Native Components"
              width={142}
              height={40}
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </div>
          <p className="text-[12px] leading-5 text-[#929da4] max-w-[320px] mb-4 font-sans">
            The open-source UI block registry for React Native and Expo developers. Discover, inspect, and copy production ready mobile components.
          </p>
          <div className="flex items-center gap-2 text-[10.5px] text-[#718087]">
            <span className="text-[#00f5c8]">MIT LICENSED</span>
            <span>•</span>
            <span>OPEN SOURCE</span>
            <span>•</span>
            <span>EXP-52</span>
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-7 md:gap-8 text-[12px]">
          <div className="flex flex-col gap-2.5">
            <h4 className="text-[10.5px] uppercase tracking-wider text-[#00f5c8] font-bold mb-1">
              // REGISTRY
            </h4>
            <Link href="/blocks" className="text-[#929da4] hover:text-[#00f5c8] transition-colors">
              Explore Blocks
            </Link>
            <Link href="/blocks?category=charts" className="text-[#929da4] hover:text-[#00f5c8] transition-colors">
              Charts &amp; Analytics
            </Link>
            <Link href="/contribute" className="text-[#929da4] hover:text-[#00f5c8] transition-colors">
              Contribute Unit
            </Link>
            <Link href="/docs" className="text-[#929da4] hover:text-[#00f5c8] transition-colors">
              Documentation
            </Link>
            <Link href="/blog" className="text-[#929da4] hover:text-[#00f5c8] transition-colors">
              Blog &amp; Architecture
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-[10.5px] uppercase tracking-wider text-[#00d9ff] font-bold mb-1">
              // COMMUNITY
            </h4>
            <Link href="/contribute" className="text-[#929da4] hover:text-[#00d9ff] transition-colors">
              Contribute
            </Link>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#929da4] hover:text-[#00d9ff] transition-colors"
            >
              GitHub Discussions
            </a>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#929da4] hover:text-[#00d9ff] transition-colors"
            >
              GitHub Issues
            </a>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/blob/master/CODE_OF_CONDUCT.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#929da4] hover:text-[#00d9ff] transition-colors"
            >
              Code of Conduct
            </a>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/blob/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#929da4] hover:text-[#00d9ff] transition-colors"
            >
              MIT License
            </a>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-[10.5px] uppercase tracking-wider text-[#f3f6f5] font-bold mb-1">
              // ECOSYSTEM
            </h4>
            <a
              href="https://reactnative.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#929da4] hover:text-[#f3f6f5] transition-colors"
            >
              React Native
            </a>
            <a
              href="https://expo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#929da4] hover:text-[#f3f6f5] transition-colors"
            >
              Expo
            </a>
            <a
              href="https://nativewind.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#929da4] hover:text-[#f3f6f5] transition-colors"
            >
              NativeWind
            </a>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#929da4] hover:text-[#f3f6f5] transition-colors"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#263238] py-4 bg-[#050608]">
        <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] text-[#718087]">
            SYS.COORDS: 42.18°N // © {new Date().getFullYear()} RNBLOCKS. BUILT FOR REACT NATIVE BUILDERS.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#718087] hover:text-[#00f5c8] transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
