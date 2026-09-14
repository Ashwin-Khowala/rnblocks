"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Layers } from "lucide-react";
import { GitHubIcon } from "./icons/GitHubIcon";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Layers size={17} />
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
          <a
            href="https://github.com/Ashwin-Khowala/rnblocks"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
            title="Star RNBlocks on GitHub"
          >
            <GitHubIcon size={14} />
            <span className="github-text">Star on GitHub</span>
            <span className="github-star-pill">★</span>
          </a>

          <Link href="/blocks" className="explore-btn">
            <span>Explore</span>
            <ArrowUpRight size={14} />
          </Link>

          {/* Mobile toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
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
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-github-link"
            >
              <GitHubIcon size={16} />
              <span>GitHub Repository</span>
              <span className="github-star-pill">★</span>
            </a>
            <Link
              href="/blocks"
              onClick={() => setMobileMenuOpen(false)}
              className="explore-btn"
              style={{ justifyContent: "center", width: "100%", height: "40px" }}
            >
              <span>Explore All Blocks</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .navbar-root {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(8, 8, 11, 0.82);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.5);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        :global(.brand-logo),
        .brand-logo {
          display: inline-flex !important;
          align-items: center !important;
          gap: 10px !important;
          text-decoration: none !important;
          cursor: pointer !important;
        }

        :global(.brand-icon),
        .brand-icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: linear-gradient(135deg, #22222b 0%, #121216 100%);
          border: 1px solid rgba(255, 255, 255, 0.14);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
          box-shadow: 0 0 12px rgba(50, 199, 152, 0.12);
          transition: all 0.2s ease;
        }

        .brand-logo:hover :global(.brand-icon),
        .brand-logo:hover .brand-icon {
          transform: translateY(-1px) scale(1.03);
          border-color: rgba(50, 199, 152, 0.4);
          box-shadow: 0 0 16px rgba(50, 199, 152, 0.25);
        }

        :global(.brand-name),
        .brand-name {
          font-weight: 700;
          font-size: 16.5px;
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
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 2.5px 7px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.09);
          color: #a1a1aa;
          margin-left: 4px;
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
          gap: 3px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          padding: 4px 5px;
          border-radius: 9999px;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.2);
        }

        .desktop-nav :global(.nav-link),
        .nav-link {
          display: inline-flex;
          align-items: center;
          font-size: 13.5px;
          font-weight: 500;
          color: #a1a1aa;
          padding: 6px 14px;
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

        /* ─── Right Action Buttons ─────────────────────────────────────────── */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .github-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          height: 35px;
          padding: 0 13px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #d1d5db;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          box-sizing: border-box;
          line-height: 1;
          transition: all 0.18s ease;
        }

        .github-btn:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.24);
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        }

        .github-star-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: #32c798;
          line-height: 1;
        }

        :global(.explore-btn),
        .explore-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 5px !important;
          height: 35px !important;
          padding: 0 16px !important;
          font-size: 13.5px !important;
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
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
        }

        :global(.explore-btn:hover),
        .explore-btn:hover {
          background: #f4f4f5 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 16px rgba(255, 255, 255, 0.22) !important;
        }

        .mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          color: #d1d5db;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          cursor: pointer;
          padding: 0;
          transition: color var(--transition-fast), border-color var(--transition-fast);
        }

        .mobile-toggle:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.25);
        }

        /* ─── Mobile Menu ──────────────────────────────────────────────────── */
        .mobile-menu {
          background: rgba(9, 9, 13, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px 20px 22px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.7);
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
          padding: 11px 16px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          color: #d1d5db;
          text-decoration: none;
          transition: background var(--transition-fast), color var(--transition-fast);
        }

        .mobile-nav-list :global(.mobile-nav-link:hover),
        .mobile-nav-link:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
        }

        .mobile-nav-list :global(.mobile-nav-link.mobile-nav-link-active),
        .mobile-nav-link-active {
          background: rgba(255, 255, 255, 0.09);
          color: #ffffff;
          font-weight: 600;
        }

        .mobile-active-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #32c798;
          box-shadow: 0 0 8px rgba(50, 199, 152, 0.8);
        }

        .mobile-menu-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 10px 0;
        }

        .mobile-github-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 16px;
          border-radius: 10px;
          font-size: 14.5px;
          color: #a1a1aa;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 8px;
        }

        .mobile-github-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }

        @media (max-width: 820px) {
          .desktop-nav,
          .github-text {
            display: none !important;
          }

          .github-btn {
            padding: 0 10px;
          }

          .mobile-toggle {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
