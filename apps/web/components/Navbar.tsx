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
    { label: "Screens", href: "/screens" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Submit", href: "/submit" },
    { label: "Contribute", href: "/contribute" },
    { label: "Docs", href: "/docs" },
  ];

  return (
    <header className="navbar-root">
      <div className="container-main navbar-inner">
        {/* Left: Brand */}
        <Link href="/" className="brand-logo">
          <div className="brand-icon">
            <Layers size={18} />
          </div>
          <span className="brand-name">RNBlocks</span>
          <span className="brand-badge">Registry</span>
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
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
            title="GitHub Repository"
          >
            <GitHubIcon size={15} />
            <span className="github-text">GitHub</span>
          </a>

          <Link href="/blocks" className="btn-primary desktop-only-btn">
            <span>Explore</span>
            <ArrowUpRight size={14} />
          </Link>

          {/* Mobile toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-list">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                {link.label}
              </Link>
            ))}
            <div className="mobile-menu-divider" />
            <Link
              href="/blocks"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary"
              style={{ justifyContent: "center", width: "100%" }}
            >
              Explore All Blocks
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .navbar-root {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(9, 9, 11, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
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
          gap: 8px !important;
          text-decoration: none !important;
          cursor: pointer !important;
        }

        :global(.brand-icon),
        .brand-icon {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          background: #18181b;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
        }

        :global(.brand-name),
        .brand-name {
          font-weight: 700;
          font-size: 16px;
          letter-spacing: -0.02em;
          color: #ffffff;
          white-space: nowrap;
        }

        :global(.brand-badge),
        .brand-badge {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #a1a1aa;
          margin-left: 2px;
          white-space: nowrap;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .desktop-nav :global(.nav-link),
        .nav-link {
          display: inline-flex;
          align-items: center;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 6px 13px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          white-space: nowrap;
          transition: color var(--transition-fast), background var(--transition-fast);
        }

        .desktop-nav :global(.nav-link:hover),
        .nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-card);
        }

        .desktop-nav :global(.nav-link.nav-link-active),
        .nav-link-active {
          color: var(--text-primary);
          background: var(--bg-card-hover);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .github-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          height: 34px;
          padding: 0 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #d1d5db;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          box-sizing: border-box;
          line-height: 1;
          transition: border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
        }

        .github-btn:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.08);
        }

        :global(.desktop-only-btn),
        .desktop-only-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          height: 34px !important;
          padding: 0 14px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          border-radius: 8px !important;
          background: #ffffff !important;
          color: #09090b !important;
          text-decoration: none !important;
          border: none !important;
          box-sizing: border-box !important;
          line-height: 1 !important;
          white-space: nowrap !important;
          transition: opacity var(--transition-fast) !important;
        }

        :global(.desktop-only-btn:hover),
        .desktop-only-btn:hover {
          opacity: 0.9 !important;
        }

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
          transition: color var(--transition-fast), border-color var(--transition-fast);
        }

        .mobile-toggle:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.2);
        }

        .mobile-menu {
          background: rgba(9, 9, 11, 0.98);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          padding: 16px 20px 20px;
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile-nav-list :global(.mobile-nav-link),
        .mobile-nav-link {
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14.5px;
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

        .mobile-menu-divider {
          height: 1px;
          background: var(--border);
          margin: 8px 0;
        }

        @media (max-width: 768px) {
          .desktop-nav,
          :global(.desktop-only-btn),
          .desktop-only-btn,
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
