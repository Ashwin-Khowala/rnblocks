"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
            ? "max-w-[calc(100%-20px)] sm:max-w-[calc(100%-32px)] lg:max-w-[1240px] h-14 sm:h-[60px] md:h-[64px] mt-2 sm:mt-3 px-3.5 sm:px-5 md:px-6 bg-[#060609]/95 backdrop-blur-xl border border-white/[0.09] rounded-xl sm:rounded-2xl shadow-[0_16px_40px_-6px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.05)]"
            : "max-w-[1360px] h-16 sm:h-[68px] md:h-[72px] px-4 sm:px-6 md:px-8 bg-transparent border border-transparent shadow-none"
        )}
      >
        {/* Left Section: Brand Logo + Desktop Nav Links */}
        <div className="flex items-center gap-4 sm:gap-5">
          <Link href="/" className="group inline-flex items-center gap-2.5 select-none" aria-label="RNBlocks Registry Homepage">
            <div className="w-8 h-8 rounded-lg bg-[#0e0e13] border border-white/[0.12] inline-flex items-center justify-center text-white shrink-0 transition-all duration-200 group-hover:border-white/30 group-hover:bg-[#14141c]">
              <LayersIcon size={17} />
            </div>
            <span className="font-bold text-[15.5px] sm:text-[16px] tracking-[-0.025em] text-white whitespace-nowrap">
              RN<span className="text-[#d4d4d8] font-semibold">Blocks</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center text-[13.5px] font-medium px-3.5 py-2 rounded-lg transition-colors duration-150 whitespace-nowrap",
                    isActive
                      ? "text-white font-semibold bg-white/[0.09]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Search Trigger, Divider, GitHub Stars, Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Search Trigger Button */}
          <button
            type="button"
            className="hidden lg:inline-flex items-center gap-2 h-9 px-3 bg-white/[0.035] hover:bg-white/[0.07] border border-white/[0.09] hover:border-white/[0.18] rounded-lg text-zinc-400 hover:text-white text-xs cursor-pointer transition-all duration-150 select-none"
            onClick={handleSearchClick}
            aria-label="Search blocks (Ctrl+K)"
          >
            <SearchIcon size={14} className="text-zinc-400" />
            <span className="font-normal">Search blocks...</span>
            <kbd className="font-mono text-[10px] font-semibold text-zinc-500 bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5 leading-tight">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>

          <span className="hidden lg:block w-px h-4 bg-white/[0.12] mx-0.5" />

          {/* GitHub Star Button */}
          <a
            href="https://github.com/Ashwin-Khowala/rnblocks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-9 px-3 rounded-lg text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors duration-150 select-none"
            title="RNBlocks on GitHub"
            aria-label={starCount !== null ? `GitHub repository - ${starCount} stars` : "GitHub repository"}
          >
            <GitHubIcon size={16} />
            {starCount !== null && (
              <span className="font-mono text-xs font-medium text-zinc-300">
                {starCount}
              </span>
            )}
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/[0.22] rounded-lg cursor-pointer transition-colors duration-150 p-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-[999] animate-fade-in pointer-events-auto flex justify-center px-3.5"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={cn(
              "w-full max-w-[480px] bg-[#07070a] border border-white/10 rounded-2xl p-4 shadow-[0_20px_48px_rgba(0,0,0,0.92)] animate-slide-down h-fit",
              isScrolled ? "mt-[76px]" : "mt-[80px]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Quick Search Button in Mobile Drawer */}
            <button
              type="button"
              className="flex items-center justify-between w-full h-[40px] px-3 bg-white/[0.04] border border-white/[0.09] rounded-xl text-zinc-400 text-xs mb-3 cursor-pointer"
              onClick={() => {
                setMobileMenuOpen(false);
                handleSearchClick();
              }}
            >
              <div className="flex items-center gap-2">
                <SearchIcon size={15} className="text-zinc-500" />
                <span>Search blocks & components...</span>
              </div>
              <kbd className="font-mono text-[10px] font-semibold text-zinc-500 bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5 leading-tight">
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
                      "flex items-center justify-between p-2.5 px-3.5 rounded-xl text-sm font-medium transition-colors duration-150",
                      isActive
                        ? "bg-white/10 text-white font-semibold"
                        : "text-zinc-300 hover:bg-white/[0.06] hover:text-white"
                    )}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <div className="h-px bg-white/[0.08] my-2" />

              {/* Mobile GitHub Row with Star Count */}
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 px-3.5 rounded-xl text-xs text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] mb-2.5 transition-colors duration-150"
              >
                <div className="flex items-center gap-2.5">
                  <GitHubIcon size={16} />
                  <span>GitHub Repository</span>
                </div>
                {starCount !== null && (
                  <span className="font-mono text-xs font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2 py-0.5 rounded-md">
                    {starCount}
                  </span>
                )}
              </a>

              {/* Mobile Primary Explore Button */}
              <Link
                href="/blocks"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full h-10 text-xs font-semibold rounded-xl bg-white text-black shadow-md hover:bg-zinc-200 transition-colors duration-150"
              >
                <span className="font-bold">Explore All Blocks</span>
                <ArrowUpRightIcon size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
