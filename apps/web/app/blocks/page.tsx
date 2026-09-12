"use client";

import React, { useState, useMemo } from "react";
import { BLOCKS_DATA, BlockItem } from "@/data/blocks";
import { BlockCard } from "@/components/BlockCard";
import { Search, Filter, Layers, X } from "lucide-react";

export default function BlocksGalleryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [stylingFilter, setStylingFilter] = useState<string>("all");
  const [frameworkFilter, setFrameworkFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Blocks" },
    { id: "payments", label: "Payments" },
    { id: "auth", label: "Authentication" },
    { id: "profile", label: "Profile" },
    { id: "commerce", label: "Commerce" },
    { id: "chat", label: "Communication" },
  ];

  // Filtering logic
  const filteredBlocks = useMemo(() => {
    return BLOCKS_DATA.filter((block) => {
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
              <span className="count-label">blocks</span>
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
              <select
                className="filter-select"
                value={stylingFilter}
                onChange={(e) => setStylingFilter(e.target.value)}
              >
                <option value="all">Styling: All</option>
                <option value="NativeWind">NativeWind</option>
                <option value="StyleSheet">StyleSheet</option>
              </select>

              <select
                className="filter-select"
                value={frameworkFilter}
                onChange={(e) => setFrameworkFilter(e.target.value)}
              >
                <option value="all">Framework: All</option>
                <option value="expo">Expo</option>
                <option value="react-native">Bare React Native</option>
              </select>
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
          <div className="gallery-grid">
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
          gap: 14px;
          align-items: center;
          margin-bottom: 18px;
        }

        .search-input-wrap {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 12px 38px 12px 42px;
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--text-primary);
          outline: none;
          transition: border-color var(--transition-fast), background var(--transition-fast);
        }

        .search-input:focus {
          border-color: var(--border-hover);
          background: var(--bg-card-hover);
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .clear-search-btn {
          position: absolute;
          right: 12px;
          color: var(--text-muted);
          padding: 4px;
          display: flex;
          align-items: center;
        }

        .clear-search-btn:hover {
          color: var(--text-primary);
        }

        .dropdown-filters {
          display: flex;
          gap: 10px;
        }

        .filter-select {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 13px;
          outline: none;
          cursor: pointer;
          transition: border-color var(--transition-fast);
        }

        .filter-select:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
        }

        .category-pills-row {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
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
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
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
          .search-control-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .dropdown-filters {
            width: 100%;
          }

          .filter-select {
            flex: 1;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .gallery-title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
