"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Layers } from "lucide-react";
import { GitHubIcon } from "./icons/GitHubIcon";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [starCount, setStarCount] = useState<number>(2);

  // Fetch latest GitHub stars with fallback
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

  const navLinks = [
    { label: "Blocks", href: "/blocks" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Submit", href: "/submit" },
    { label: "Contribute", href: "/contribute" },
    { label: "Docs", href: "/docs" },
  ];

  return (
    <header className="navbar-root">
      <div className="container-main navbar-inner">
        {/* Left: Brand */}
        <Link href="/" className="brand-logo" aria-label="RNBlocks Registry Homepage">
          <div className="brand-icon">
            <Layers size={16} />
          </div>
          <span className="brand-name">
            RN<span className="brand-name-sub">Blocks</span>
          </span>
          <span className="brand-badge">
            <span className="badge-dot" />
            Registry
          </span>
        </Link>

        {/* Center: Desktop Segmented Pill Nav */}
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
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="navbar-actions">
          {/* GitHub Star Pill Button */}
          <a
            href="https://github.com/Ashwin-Khowala/rnblocks"
            target="_blank"
            rel="noopener noreferrer"
            className="github-pill-btn"
            title="RNBlocks on GitHub"
            aria-label="GitHub repository and star count"
          >
            <GitHubIcon size={14} />
            <span className="github-divider" />
            <span className="github-stars">
              <svg
                className="star-svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>{starCount}</span>
            </span>
          </a>

          {/* Desktop Explore CTA */}
          <Link href="/blocks" className="explore-btn">
            <span>Explore</span>
            <ArrowUpRight size={14} />
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
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

              {/* Mobile GitHub Direct Row */}
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
        .navbar-root {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(8, 8, 11, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow: 0 4px 24px -2px rgba(0, 0, 0, 0.55);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
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
          width: 30px;
          height: 30px;
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
          font-size: 16px;
          letter-spacing: -0.025em;
          color: #ffffff;
          white-space: nowrap;
        }

        :global(.brand-name-sub),
        .brand-name-sub {
          color: #d4d4d8;
          font-weight: 600;
        }

        :global(.brand-badge),
        .brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #a1a1aa;
          margin-left: 2px;
          white-space: nowrap;
        }

        .badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #32c798;
          box-shadow: 0 0 6px rgba(50, 199, 152, 0.8);
        }

        /* ─── Segmented Pill Desktop Navigation ────────────────────────────── */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          padding: 3.5px 5px;
          border-radius: 9999px;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.2);
        }

        .desktop-nav :global(.nav-link),
        .nav-link {
          display: inline-flex;
          align-items: center;
          font-size: 13px;
          font-weight: 500;
          color: #a1a1aa;
          padding: 5px 13px;
          border-radius: 9999px;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.16s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .desktop-nav :global(.nav-link:hover),
        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }

        .desktop-nav :global(.nav-link.nav-link-active),
        .nav-link-active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
          font-weight: 600;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        /* ─── Right Actions ────────────────────────────────────────────────── */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        /* Modern GitHub Pill with Star Count */
        .github-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 33px;
          padding: 0 11px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #d1d5db;
          font-size: 12.5px;
          font-weight: 500;
          text-decoration: none;
          box-sizing: border-box;
          line-height: 1;
          transition: all 0.18s ease;
          user-select: none;
        }

        .github-pill-btn:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
        }

        .github-divider {
          width: 1px;
          height: 12px;
          background: rgba(255, 255, 255, 0.14);
        }

        .github-stars {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono, monospace);
          font-size: 11.5px;
          font-weight: 600;
          color: #d1d5db;
        }

        .star-svg {
          color: #32c798;
        }

        /* Desktop Explore Button */
        :global(.explore-btn),
        .explore-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 5px !important;
          height: 33px !important;
          padding: 0 14px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          border-radius: 9999px !important;
          background: #ffffff !important;
          color: #09090b !important;
          text-decoration: none !important;
          border: none !important;
          box-sizing: border-box !important;
          line-height: 1 !important;
          white-space: nowrap !important;
          transition: all 0.18s ease !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25) !important;
        }

        :global(.explore-btn:hover),
        .explore-btn:hover {
          background: #f4f4f5 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 14px rgba(255, 255, 255, 0.2) !important;
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
          border-radius: 9999px;
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
          top: 60px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 999;
          animation: fadeIn 0.2s ease-out;
        }

        .mobile-menu {
          background: rgba(10, 10, 14, 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 16px 20px 24px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85);
          animation: slideDown 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile-nav-list :global(.mobile-nav-link),
        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 15px;
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
          margin: 10px 0;
        }

        .mobile-github-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14.5px;
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
          height: 42px;
          font-size: 14.5px;
          font-weight: 600;
          border-radius: 12px;
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
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }

          .mobile-toggle {
            display: flex;
          }
        }

        @media (max-width: 640px) {
          .brand-badge {
            display: none !important;
          }

          :global(.explore-btn),
          .explore-btn {
            display: none !important;
          }

          .github-pill-btn {
            padding: 0 9px;
          }
        }
      `}</style>
    </header>
  );
}
