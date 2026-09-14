"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowUpRight, Layers, Search } from "lucide-react";
import { GitHubIcon } from "./icons/GitHubIcon";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [starCount, setStarCount] = useState<number>(2);
  const [isMac, setIsMac] = useState(false);

  // Platform detection for keyboard shortcut display
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
    }
  }, []);

  // Fetch latest GitHub stars with cached fallback
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
      const existingInput = document.querySelector<HTMLInputElement>(".search-input");
      if (existingInput) {
        existingInput.focus();
        existingInput.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }
    router.push("/blocks");
  };

  // RNBlocks navigation items (preserved per requirements)
  const navLinks = [
    { label: "Blocks", href: "/blocks" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Submit", href: "/submit" },
    { label: "Contribute", href: "/contribute" },
    { label: "Docs", href: "/docs" },
  ];

  return (
    <header className="navbar-fixed-wrapper">
      <div className={`navbar-dock ${isScrolled ? "is-scrolled" : ""}`}>
        {/* Left Section: Brand Logo + Desktop Nav Links */}
        <div className="navbar-left">
          <Link href="/" className="brand-logo" aria-label="RNBlocks Registry Homepage">
            <div className="brand-icon">
              <Layers size={16} />
            </div>
            <span className="brand-name">
              RN<span className="brand-name-sub">Blocks</span>
            </span>
          </Link>

          {/* Inline Desktop Nav (directly next to logo, clean typography) */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="nav-link-dot" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Search Trigger, Divider, GitHub Stars, Mobile Toggle */}
        <div className="navbar-right">
          {/* Search Trigger Button */}
          <button
            type="button"
            className="search-trigger-btn"
            onClick={handleSearchClick}
            aria-label="Search blocks (Ctrl+K)"
          >
            <Search size={13} className="search-icon" />
            <span className="search-placeholder">Search...</span>
            <kbd className="search-kbd">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>

          <span className="action-divider" />

          {/* GitHub Star Pill Button */}
          <a
            href="https://github.com/Ashwin-Khowala/rnblocks"
            target="_blank"
            rel="noopener noreferrer"
            className="github-star-link"
            title="RNBlocks on GitHub"
            aria-label={`GitHub repository - ${starCount} stars`}
          >
            <GitHubIcon size={15} />
            <span className="github-star-count">{starCount}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div
            className={`mobile-drawer ${isScrolled ? "is-scrolled" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Quick Search Button in Mobile Drawer */}
            <button
              type="button"
              className="mobile-search-bar"
              onClick={() => {
                setMobileMenuOpen(false);
                handleSearchClick();
              }}
            >
              <Search size={15} className="mobile-search-icon" />
              <span>Search blocks & components...</span>
              <kbd className="search-kbd">{isMac ? "⌘K" : "Ctrl K"}</kbd>
            </button>

            {/* Mobile Nav Links */}
            <div className="mobile-nav-list">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(`${link.href}/`));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-nav-link ${isActive ? "mobile-nav-link-active" : ""}`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="mobile-active-dot" />}
                  </Link>
                );
              })}

              <div className="mobile-menu-divider" />

              {/* Mobile GitHub Row with Star Count */}
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-github-row"
              >
                <div className="mobile-gh-left">
                  <GitHubIcon size={16} />
                  <span>GitHub Repository</span>
                </div>
                <span className="mobile-stars-badge">
                  ★ {starCount}
                </span>
              </a>

              {/* Mobile Primary Explore Button */}
              <Link
                href="/blocks"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-explore-cta"
              >
                <span>Explore All Blocks</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ─── Outer Fixed Shell (Zero click-blocking on sides) ─────────────── */
        .navbar-fixed-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;
          pointer-events: none;
          padding: 0;
          box-sizing: border-box;
        }

        /* ─── Inner Floating Dock Container ────────────────────────────────── */
        .navbar-dock {
          pointer-events: auto;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 58px;
          padding: 0 24px;
          box-sizing: border-box;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 0;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          transform: translateY(0);
          transition:
            max-width 0.32s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
            background 0.3s ease,
            border-color 0.3s ease,
            border-radius 0.3s ease,
            box-shadow 0.3s ease,
            backdrop-filter 0.3s ease,
            height 0.32s cubic-bezier(0.16, 1, 0.3, 1),
            padding 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Scrolled state: Morph into a detached floating island dock */
        .navbar-dock.is-scrolled {
          max-width: 1140px;
          height: 52px;
          margin-top: 14px;
          padding: 0 18px;
          background: rgba(6, 6, 9, 0.94);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 14px;
          box-shadow:
            0 16px 40px -6px rgba(0, 0, 0, 0.85),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        /* ─── Left Section ─────────────────────────────────────────────────── */
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        :global(.brand-logo),
        .brand-logo {
          display: inline-flex !important;
          align-items: center !important;
          gap: 9px !important;
          text-decoration: none !important;
          cursor: pointer !important;
          user-select: none;
        }

        :global(.brand-icon),
        .brand-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: linear-gradient(135deg, #1f1f27 0%, #101014 100%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(50, 199, 152, 0.12);
          transition: all 0.2s ease;
        }

        .brand-logo:hover :global(.brand-icon),
        .brand-logo:hover .brand-icon {
          transform: translateY(-1px) scale(1.02);
          border-color: rgba(50, 199, 152, 0.4);
          box-shadow: 0 0 14px rgba(50, 199, 152, 0.25);
        }

        :global(.brand-name),
        .brand-name {
          font-weight: 700;
          font-size: 15.5px;
          letter-spacing: -0.025em;
          color: #ffffff;
          white-space: nowrap;
        }

        :global(.brand-name-sub),
        .brand-name-sub {
          color: #d4d4d8;
          font-weight: 600;
        }

        /* Desktop Nav: Clean typography links aligned inline next to logo */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-left: 12px;
        }

        .desktop-nav :global(.nav-link),
        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 13.5px;
          font-weight: 500;
          color: #a1a1aa;
          padding: 6px 12px;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.16s ease;
        }

        .desktop-nav :global(.nav-link:hover),
        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .desktop-nav :global(.nav-link.nav-link-active),
        .nav-link-active {
          color: #ffffff;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.08);
        }

        .nav-link-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #32c798;
          box-shadow: 0 0 6px rgba(50, 199, 152, 0.9);
        }

        /* ─── Right Section ────────────────────────────────────────────────── */
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Search Trigger Button */
        .search-trigger-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 32px;
          padding: 0 10px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 8px;
          color: #9ca3af;
          font-size: 12.5px;
          cursor: pointer;
          transition: all 0.18s ease;
          user-select: none;
        }

        .search-trigger-btn:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.18);
          color: #ffffff;
        }

        .search-trigger-btn :global(.search-icon) {
          color: #9ca3af;
          transition: color 0.18s ease;
        }

        .search-trigger-btn:hover :global(.search-icon) {
          color: #ffffff;
        }

        .search-placeholder {
          font-weight: 400;
        }

        .search-kbd {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          font-weight: 600;
          color: #71717a;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          padding: 1px 5px;
          line-height: 1.2;
        }

        /* Subtle Vertical Action Divider */
        .action-divider {
          width: 1px;
          height: 16px;
          background: rgba(255, 255, 255, 0.12);
          margin: 0 3px;
        }

        /* GitHub Star Action Button */
        .github-star-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          padding: 0 9px;
          border-radius: 8px;
          color: #d1d5db;
          text-decoration: none;
          transition: all 0.18s ease;
          user-select: none;
        }

        .github-star-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }

        .github-star-count {
          font-family: var(--font-mono, monospace);
          font-size: 12.5px;
          font-weight: 500;
          color: #d1d5db;
        }

        /* Mobile Hamburger Toggle */
        .mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          color: #d1d5db;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          cursor: pointer;
          padding: 0;
          transition: all 0.18s ease;
        }

        .mobile-toggle:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.08);
        }

        /* ─── Mobile Drawer Overlay ────────────────────────────────────────── */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 999;
          animation: fadeIn 0.2s ease-out;
          pointer-events: auto;
          display: flex;
          justify-content: center;
          padding: 0 14px;
          box-sizing: border-box;
        }

        .mobile-drawer {
          width: 100%;
          max-width: 480px;
          margin-top: 68px;
          background: rgba(6, 6, 9, 0.98);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.92);
          animation: slideDown 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          height: fit-content;
          box-sizing: border-box;
        }

        .mobile-drawer.is-scrolled {
          margin-top: 72px;
        }

        .mobile-search-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 38px;
          padding: 0 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 10px;
          color: #9ca3af;
          font-size: 13px;
          margin-bottom: 12px;
          cursor: pointer;
        }

        .mobile-search-bar :global(.mobile-search-icon) {
          color: #71717a;
          margin-right: 8px;
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-nav-list :global(.mobile-nav-link),
        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 14.5px;
          font-weight: 500;
          color: #d1d5db;
          text-decoration: none;
          transition: all 0.16s ease;
        }

        .mobile-nav-list :global(.mobile-nav-link:hover),
        .mobile-nav-link:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
        }

        .mobile-nav-list :global(.mobile-nav-link.mobile-nav-link-active),
        .mobile-nav-link-active {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-weight: 600;
        }

        .mobile-active-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #32c798;
          box-shadow: 0 0 8px rgba(50, 199, 152, 0.9);
        }

        .mobile-menu-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 8px 0;
        }

        .mobile-github-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 14px;
          color: #d1d5db;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 10px;
          transition: all 0.16s ease;
        }

        .mobile-github-row:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .mobile-gh-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mobile-stars-badge {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          font-weight: 600;
          color: #32c798;
          background: rgba(50, 199, 152, 0.1);
          border: 1px solid rgba(50, 199, 152, 0.25);
          padding: 2px 8px;
          border-radius: 9999px;
        }

        .mobile-explore-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          height: 40px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 10px;
          background: #ffffff;
          color: #09090b;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(255, 255, 255, 0.18);
          transition: all 0.18s ease;
        }

        .mobile-explore-cta:hover {
          background: #f4f4f5;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ─── Responsive Media Queries ─────────────────────────────────────── */
        @media (max-width: 880px) {
          .desktop-nav,
          .search-trigger-btn,
          .action-divider {
            display: none !important;
          }

          .mobile-toggle {
            display: inline-flex;
          }

          .navbar-dock {
            padding: 0 16px;
            height: 54px;
          }

          .navbar-dock.is-scrolled {
            max-width: calc(100% - 24px);
            margin-top: 10px;
            height: 48px;
            padding: 0 14px;
            border-radius: 12px;
          }
        }

        @media (max-width: 480px) {
          .navbar-dock {
            padding: 0 12px;
          }

          .navbar-dock.is-scrolled {
            max-width: calc(100% - 16px);
            margin-top: 8px;
            padding: 0 12px;
          }

          .brand-name {
            font-size: 15px;
          }
        }
      `}</style>
    </header>
  );
}
