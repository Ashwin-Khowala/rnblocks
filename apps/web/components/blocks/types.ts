export type ViewMode = "grid" | "split" | "compact";

export interface CategoryOption {
  id: string;
  label: string;
  count?: number;
}

export type FeatureFilter = "all" | "pure-svg" | "interactive" | "animated" | "themeable";

export interface FilterState {
  searchQuery: string;
  category: string;
  feature: FeatureFilter;
  sortBy: "featured" | "name" | "category";
}
