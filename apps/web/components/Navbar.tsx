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

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .brand-icon {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }

        .brand-name {
          font-weight: 700;
          font-size: 16px;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .brand-badge {
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-muted);
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
          gap: 12px;
        }

        .github-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          transition: border-color var(--transition-fast), color var(--transition-fast);
        }

        .github-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }


        .desktop-only-btn {
          padding: 7px 14px;
          font-size: 13px;
        }

        .mobile-toggle {
          display: none;
          color: var(--text-secondary);
          padding: 6px;
        }

        .mobile-menu {
          display: none;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          padding: 16px 24px;
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-nav-link {
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          font-size: 15px;
          color: var(--text-primary);
        }

        .mobile-nav-link:hover {
          background: var(--bg-card);
        }

        .mobile-menu-divider {
          height: 1px;
          background: var(--border);
          margin: 8px 0;
        }

        @media (max-width: 768px) {
          .desktop-nav,
          .desktop-only-btn,
          .github-text {
            display: none;
          }

          .mobile-toggle {
            display: block;
          }

          .mobile-menu {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
