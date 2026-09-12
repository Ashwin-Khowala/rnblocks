"use client";

import React from "react";
import Link from "next/link";
import { Layers } from "lucide-react";
import { GitHubIcon } from "./icons/GitHubIcon";

export function Footer() {
  return (
    <footer className="footer-root">
      <div className="container-main footer-content">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="brand-logo">
            <div className="brand-icon">
              <Layers size={16} />
            </div>
            <span className="brand-name">RNBlocks</span>
          </div>
          <p className="brand-desc">
            The open-source UI block registry for React Native and Expo developers. Discover, inspect, and copy production-ready mobile components.
          </p>
          <div className="license-tag">
            <span>MIT Licensed</span>
            <span className="dot">•</span>
            <span>Open Source</span>
          </div>
        </div>

        {/* Links Columns */}
        <div className="footer-links-grid">
          <div className="links-col">
            <h4 className="col-title">Registry</h4>
            <Link href="/blocks" className="footer-link">
              Explore Blocks
            </Link>
            <Link href="/screens" className="footer-link">
              Explore Screens
            </Link>
            <Link href="/submit" className="footer-link">
              Submit a Block
            </Link>
            <Link href="/docs" className="footer-link">
              Documentation
            </Link>
          </div>

          <div className="links-col">
            <h4 className="col-title">Community</h4>
            <Link href="/contribute" className="footer-link">
              Contribute
            </Link>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/blob/master/CODE_OF_CONDUCT.md"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Code of Conduct
            </a>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub Issues
            </a>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks/blob/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              MIT License
            </a>
          </div>

          <div className="links-col">
            <h4 className="col-title">Ecosystem</h4>
            <a
              href="https://reactnative.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              React Native
            </a>
            <a
              href="https://expo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Expo
            </a>
            <a
              href="https://nativewind.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              NativeWind
            </a>
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container-main bottom-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} RNBlocks. Built for React Native builders.
          </p>


          <div className="bottom-socials">
            <a
              href="https://github.com/Ashwin-Khowala/rnblocks"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="GitHub"
            >
              <GitHubIcon size={16} />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-root {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border);
          margin-top: auto;
        }

        .footer-content {
          padding: 60px 24px 48px;
          display: grid;
          grid-template-columns: 1.5fr 2.5fr;
          gap: 60px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .brand-icon {
          width: 26px;
          height: 26px;
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
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .brand-desc {
          font-size: 13px;
          line-height: 20px;
          color: var(--text-muted);
          max-width: 320px;
          margin-bottom: 16px;
        }

        .license-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .dot {
          color: var(--text-muted);
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .col-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          font-weight: 600;
          margin-bottom: 6px;
        }

        .links-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .links-col :global(.footer-link) {
          display: block;
          font-size: 13px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .links-col :global(.footer-link:hover) {
          color: var(--text-primary);
        }

        .footer-bottom {
          border-top: 1px solid var(--border);
          padding: 20px 0;
        }

        .bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .copyright-text {
          font-size: 12px;
          color: var(--text-muted);
        }

        .vercel-badge-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          font-size: 12px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
        }

        .vercel-badge-link:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.06);
        }

        .vercel-logo {
          font-size: 10px;
          color: #ffffff;
        }

        .social-icon-btn {
          color: var(--text-muted);
          transition: color var(--transition-fast);
          display: flex;
          align-items: center;
        }

        .social-icon-btn:hover {
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 40px 24px 32px;
          }

          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }

          .bottom-inner {
            flex-direction: column;
            gap: 16px;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
