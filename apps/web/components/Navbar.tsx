"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  GitHubIcon,
  SearchIcon,
  LayersIcon,
  MenuIcon,
  CloseIcon,
  ArrowUpRightIcon,
} from "./icons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [starCount, setStarCount] = useState<number | null>(null);
  const [isMac, setIsMac] = useState(false);

  // Platform detection for keyboard shortcut display
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
    }
  }, []);

  // Fetch latest GitHub stars
  useEffect(() => {
    fetch("/api/github-stars")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stars === "number") {
          setStarCount(data.stars);
        }
      })
      .catch(() => {});
  }, []);

  // Detect scroll to toggle floating dock state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K to trigger search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        handleSearchClick();
      }
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname, mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleSearchClick = () => {
    if (pathname === "/blocks") {
      const existingInput = document.querySelector<HTMLInputElement>("input[type='text']");
      if (existingInput) {
        existingInput.focus();
        existingInput.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }
    router.push("/blocks");
  };

  // RNBlocks navigation items
  const navLinks = [
    { label: "Blocks", href: "/blocks" },
    { label: "Blog", href: "/blog" },
    { label: "Contribute", href: "/contribute" },
    { label: "Docs", href: "/docs" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 pointer-events-none p-0">
      <div
        className={cn(
          "pointer-events-auto w-full mx-auto flex items-center justify-between transition-all duration-300",
          isScrolled
            ? "max-w-[calc(100%-20px)] sm:max-w-[calc(100%-32px)] lg:max-w-[1280px] h-14 sm:h-[58px] mt-2 sm:mt-2.5 px-3.5 sm:px-5 bg-[#0b1012]/95 backdrop-blur-xl border border-[#263238] rounded-[8px] shadow-[0_16px_40px_-6px_rgba(0,0,0,0.85),0_0_0_1px_rgba(0,245,200,0.06)]"
            : "max-w-[1380px] h-16 sm:h-[66px] px-4 sm:px-6 bg-transparent border border-transparent shadow-none"
        )}
      >
        {/* Left Section: Brand Logo + System Telemetry + Desktop Nav Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="group inline-flex items-center select-none py-1"
            aria-label="RNBlocks Registry Homepage"
          >
            <Image
              src="/logo.png"
              alt="RNBlocks - React Native Components"
              width={142}
              height={40}
              className="h-7 sm:h-8 w-auto object-contain transition-all duration-200 group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(0,245,200,0.3)]"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-2 border-l border-[#263238] pl-4" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "nav-hud-item inline-flex items-center gap-1.5 text-[12px] font-mono tracking-wide px-3 py-1.5 rounded-[4px] whitespace-nowrap cursor-pointer",
                    isActive
                      ? "text-[#00f5c8] font-semibold bg-[#00f5c8]/10 border border-[#00f5c8]/30 shadow-[0_0_10px_rgba(0,245,200,0.15)]"
                      : "text-[#929da4] border border-transparent"
                  )}
                >
                  <span className="nav-bracket-l text-[10px] opacity-40 select-none inline-block transition-transform duration-150">[</span>
                  <span>{link.label.toUpperCase()}</span>
                  <span className="nav-bracket-r text-[10px] opacity-40 select-none inline-block transition-transform duration-150">]</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: System Status, Search Trigger, GitHub Stars, Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Subtle Telemetry Pill */}
          <div className="hidden xl:inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#101719] border border-[#263238] font-mono text-[10px] text-[#718087]">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#00f5c8] animate-pulse" />
            <span>SYS.ONLINE</span>
          </div>

          {/* Search Trigger Button */}
          <button
            type="button"
            className="hidden lg:inline-flex items-center gap-2.5 h-8 px-3 bg-[#101719] hover:bg-[#151d20] border border-[#263238] hover:border-[#00f5c8]/40 rounded-[6px] text-[#929da4] hover:text-[#f3f6f5] text-xs cursor-pointer transition-all duration-150 select-none font-mono"
            onClick={handleSearchClick}
            aria-label="Search blocks (Ctrl+K)"
          >
            <SearchIcon size={13} className="text-[#00f5c8]" />
            <span className="font-normal text-[11px] tracking-wide">FILTER_BLOCKS</span>
            <kbd className="font-mono text-[9px] font-bold text-[#00f5c8] bg-[#07090b] border border-[#263238] rounded-[3px] px-1.5 py-0.5 leading-tight">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>

          <span className="hidden lg:block w-px h-4 bg-[#263238] mx-0.5" />

          {/* GitHub Star Button (Telemetry Readout) */}
          <a
            href="https://github.com/Ashwin-Khowala/rnblocks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-8 px-2.5 rounded-[6px] bg-[#101719] border border-[#263238] hover:border-[#00d9ff]/50 text-[#f3f6f5] hover:text-[#00d9ff] transition-all duration-150 select-none font-mono text-[11px]"
            title="RNBlocks on GitHub"
            aria-label={starCount !== null ? `GitHub repository - ${starCount} stars` : "GitHub repository"}
          >
            <GitHubIcon size={14} className="text-[#929da4]" />
            {starCount !== null && (
              <span className="text-[#00d9ff] font-bold">
                {starCount}★
              </span>
            )}
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden inline-flex items-center justify-center w-8 h-8 text-[#f3f6f5] bg-[#101719] hover:bg-[#151d20] border border-[#263238] hover:border-[#00f5c8]/50 rounded-[6px] cursor-pointer transition-colors duration-150 p-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <CloseIcon size={16} /> : <MenuIcon size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#07090b]/85 backdrop-blur-md z-[999] animate-fade-in pointer-events-auto flex justify-center px-3.5"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={cn(
              "w-full max-w-[480px] bg-[#0b1012] border border-[#263238] rounded-[10px] p-4 shadow-[0_20px_48px_rgba(0,0,0,0.95)] animate-slide-down h-fit relative",
              isScrolled ? "mt-[70px]" : "mt-[76px]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Quick Search Button in Mobile Drawer */}
            <button
              type="button"
              className="flex items-center justify-between w-full h-[38px] px-3 bg-[#101719] border border-[#263238] rounded-[6px] text-[#929da4] text-xs mb-3 cursor-pointer font-mono"
              onClick={() => {
                setMobileMenuOpen(false);
                handleSearchClick();
              }}
            >
              <div className="flex items-center gap-2">
                <SearchIcon size={14} className="text-[#00f5c8]" />
                <span>FILTER_REGISTRY...</span>
              </div>
              <kbd className="font-mono text-[9px] font-bold text-[#00f5c8] bg-[#07090b] border border-[#263238] rounded px-1.5 py-0.5 leading-tight">
                {isMac ? "⌘K" : "Ctrl K"}
              </kbd>
            </button>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(`${link.href}/`));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "nav-hud-item flex items-center justify-between p-2.5 px-3 rounded-[6px] text-xs font-mono tracking-wide cursor-pointer",
                      isActive
                        ? "bg-[#00f5c8]/10 text-[#00f5c8] font-bold border border-[#00f5c8]/30"
                        : "text-[#929da4] border border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="nav-bracket-l text-[10px] text-[#00f5c8] opacity-60 inline-block transition-transform duration-150">[</span>
                      <span>{link.label.toUpperCase()}</span>
                      <span className="nav-bracket-r text-[10px] text-[#00f5c8] opacity-60 inline-block transition-transform duration-150">]</span>
                    </div>
                    <span className="text-[10px] text-[#718087]">→</span>
                  </Link>
                );
              })}

              <div className="h-px bg-[#263238] my-2" />

              {/* Mobile GitHub Row with Star Count */}
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 px-3 rounded-[6px] text-xs font-mono text-[#f3f6f5] bg-[#101719] hover:bg-[#151d20] border border-[#263238] mb-2.5 transition-colors duration-150"
              >
                <div className="flex items-center gap-2.5">
                  <GitHubIcon size={15} />
                  <span>GITHUB REPO</span>
                </div>
                {starCount !== null && (
                  <span className="font-mono text-xs font-bold text-[#00d9ff] bg-[#07090b] border border-[#263238] px-2 py-0.5 rounded-[4px]">
                    {starCount}★
                  </span>
                )}
              </a>

              {/* Mobile Primary Explore Button */}
              <Link
                href="/blocks"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary flex items-center justify-center gap-1.5 w-full h-10 text-xs font-mono font-bold rounded-[6px]"
              >
                <span>OPEN REGISTRY [9 BLOCKS]</span>
                <ArrowUpRightIcon size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
