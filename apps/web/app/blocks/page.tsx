"use client";

import React, { useState, useMemo } from "react";
import { BLOCKS_DATA, BlockItem } from "@/data/blocks";
import { BlockCard } from "@/components/BlockCard";
import { Search, Filter, Layers, X, ChevronDown } from "lucide-react";

export default function BlocksGalleryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [stylingFilter, setStylingFilter] = useState<string>("all");
  const [frameworkFilter, setFrameworkFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Blocks" },
    { id: "navigation", label: "Navigation & Docks" },
    { id: "payments", label: "Payments" },
    { id: "auth", label: "Authentication" },
    { id: "profile", label: "Profile" },
    { id: "chat", label: "Communication" },
  ];

  // Filtering logic
  const filteredBlocks = useMemo(() => {
    return BLOCKS_DATA.filter((block) => {
      // Only include blocks in the blocks gallery
      if (block.type !== "block") {
        return false;
      }

      // Category match
      if (selectedCategory !== "all" && block.category !== selectedCategory) {
        return false;
      }

      // Styling filter
      if (stylingFilter !== "all" && !block.styling.includes(stylingFilter)) {
        return false;
      }

      // Framework filter
      if (frameworkFilter !== "all" && block.framework !== frameworkFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = block.title.toLowerCase().includes(q);
        const matchesDesc = block.description.toLowerCase().includes(q);
        const matchesSlug = block.slug.toLowerCase().includes(q);
        const matchesAuthor = block.author.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesSlug || matchesAuthor;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, stylingFilter, frameworkFilter]);

  const hasActiveFilters =
    selectedCategory !== "all" || stylingFilter !== "all" || frameworkFilter !== "all" || searchQuery !== "";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setStylingFilter("all");
    setFrameworkFilter("all");
  };

  return (
    <div className="gallery-page">
      <div className="container-main">
        {/* Gallery Header */}
        <div className="gallery-header">
          <div className="gallery-title-row">
            <div>
              <h1 className="page-title">Explore Blocks</h1>
              <p className="page-subtitle">
                Browse production-ready React Native components with live previews and copy-paste source code.
              </p>
            </div>
            <div className="blocks-count-pill">
              <span className="count-num">{filteredBlocks.length}</span>
              <span className="count-label">{filteredBlocks.length === 1 ? "block" : "blocks"}</span>
            </div>
          </div>

          {/* Search & Quick Controls */}
          <div className="search-control-bar">
            <div className="search-input-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search blocks (pricing, login, paywall, chat, profile)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="dropdown-filters">
              <div className="filter-select-wrap">
                <select
                  className="filter-select"
                  value={stylingFilter}
                  onChange={(e) => setStylingFilter(e.target.value)}
                  aria-label="Filter by styling"
                >
                  <option value="all">Styling: All</option>
                  <option value="NativeWind">NativeWind</option>
                  <option value="StyleSheet">StyleSheet</option>
                </select>
                <ChevronDown size={14} className="select-chevron" />
              </div>

              <div className="filter-select-wrap">
                <select
                  className="filter-select"
                  value={frameworkFilter}
                  onChange={(e) => setFrameworkFilter(e.target.value)}
                  aria-label="Filter by framework"
                >
                  <option value="all">Framework: All</option>
                  <option value="expo">Expo</option>
                  <option value="react-native">Bare React Native</option>
                </select>
                <ChevronDown size={14} className="select-chevron" />
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="category-pills-row">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-pill-btn ${selectedCategory === cat.id ? "pill-active" : ""}`}
              >
                {cat.label}
              </button>
            ))}

            {hasActiveFilters && (
              <button onClick={resetFilters} className="reset-filter-btn">
                <span>Reset filters</span>
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Blocks Grid or Empty State */}
        {filteredBlocks.length > 0 ? (
          <div className={`gallery-grid ${filteredBlocks.length === 1 ? "gallery-grid-single" : ""}`}>
            {filteredBlocks.map((block) => (
              <BlockCard key={block.slug} block={block} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <Layers size={28} />
            </div>
            <h3 className="empty-title">No blocks found</h3>
            <p className="empty-desc">
              We couldn't find any blocks matching "{searchQuery}". Try adjusting your filters or search query.
            </p>
            <button onClick={resetFilters} className="btn-secondary">
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .gallery-page {
          padding: 48px 0 80px;
          background: var(--bg-primary);
          flex: 1;
        }

        .gallery-header {
          margin-bottom: 36px;
        }

        .gallery-title-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .page-title {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .page-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .blocks-count-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          background: var(--bg-card);
          border: 1px solid var(--border);
        }

        .count-num {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .count-label {
          font-size: 12px;
          color: var(--text-muted);
        }

        .search-control-bar {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 20px;
        }

        .search-input-wrap {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .search-input-wrap :global(.search-icon) {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #71717a;
          pointer-events: none;
          z-index: 2;
        }

        .search-input {
          width: 100%;
          height: 42px;
          background: #111114;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 0 38px 0 42px;
          font-family: var(--font-sans);
          font-size: 13.5px;
          color: #ffffff;
          outline: none;
          box-sizing: border-box;
          transition: border-color var(--transition-fast), background var(--transition-fast);
        }

        .search-input:focus {
          border-color: rgba(255, 255, 255, 0.25);
          background: #141418;
        }

        .search-input::placeholder {
          color: #71717a;
        }

        .clear-search-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #71717a;
          background: none;
          border: none;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 4px;
          z-index: 2;
        }

        .clear-search-btn:hover {
          color: #ffffff;
        }

        .dropdown-filters {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .filter-select-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .filter-select {
          height: 42px;
          background: #111114;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 0 36px 0 14px;
          color: #d1d5db;
          font-family: var(--font-sans);
          font-size: 13px;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          white-space: nowrap;
          box-sizing: border-box;
          transition: border-color var(--transition-fast), color var(--transition-fast);
        }

        .filter-select:hover {
          border-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        .filter-select:focus {
          border-color: rgba(255, 255, 255, 0.3);
        }

        .filter-select-wrap :global(.select-chevron) {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #71717a;
          z-index: 2;
        }

        .category-pills-row {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 6px;
          -webkit-overflow-scrolling: touch;
        }

        .category-pill-btn {
          padding: 6px 14px;
          border-radius: var(--radius-full);
          background: var(--bg-card);
          border: 1px solid var(--border);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
          white-space: nowrap;
        }

        .category-pill-btn:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
        }

        .category-pill-btn.pill-active {
          background: var(--accent);
          color: var(--accent-foreground);
          border-color: transparent;
          font-weight: 600;
        }

        .reset-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-muted);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast);
        }

        .reset-filter-btn:hover {
          color: var(--text-primary);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 330px));
          gap: 20px;
        }

        .gallery-grid.gallery-grid-single {
          grid-template-columns: minmax(280px, 330px);
          max-width: 330px;
        }

        .empty-state {
          text-align: center;
          padding: 80px 24px;
          background: var(--bg-card);
          border: 1px dashed var(--border);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .empty-icon {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .empty-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .empty-desc {
          font-size: 14px;
          color: var(--text-secondary);
          max-width: 420px;
          margin-bottom: 20px;
          line-height: 20px;
        }

        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .gallery-header {
            margin-bottom: 24px;
          }

          .gallery-title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .page-title {
            font-size: 26px;
          }

          .search-control-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .dropdown-filters {
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;
            gap: 8px;
          }

          .filter-select-wrap {
            width: 100%;
          }

          .filter-select {
            width: 100%;
          }

          .category-pills-row {
            margin-right: -16px;
            padding-right: 16px;
          }

          .gallery-grid {
            grid-template-columns: 1fr !important;
            max-width: 100% !important;
          }

          .gallery-grid.gallery-grid-single {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
