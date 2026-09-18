# RNBlocks Code & Engineering Standards

This document establishes the official engineering and code standards for **RNBlocks**, informed by production-grade developer registries (such as [shadcn/ui]) and the core RNBlocks design philosophy: **copy → own → customize**.

Every component, screen, and web interface authored for or contributed to RNBlocks must adhere to these standards.

---

## 1. Core Architecture Principles

1. **Zero-Runtime Overhead (Copy-and-Own)**:
   - Blocks are standalone source files meant to live directly in the user's codebase (`components/rnblocks/...`).
   - Never require runtime context providers (e.g., `<ThemeProvider>`, `<RNBlocksProvider>`).
   - No forced styling engines (no required CSS-in-JS, Tamagui, or NativeWind runtime dependencies).

2. **React Native New Architecture Baseline**:
   - Built and tested for **React Native 0.76+** (Fabric renderer, TurboModules) and **Expo SDK 52+**.
   - No legacy bridges or deprecated React Native APIs (e.g., avoid `AsyncStorage` from core, avoid `ViewPropTypes`).

3. **Universal Mobile + Web Compatibility**:
   - Every block must render cleanly across **iOS, Android, and Web** without runtime crashes or missing styles.

---

## 2. Component Code Structure & Anatomy

Every block file in `registry/blocks/<slug>/files/<slug>.tsx` must follow this standardized section order:

```tsx
// ❌ DO NOT add "use client" — this is a Next.js-only directive and has
// no meaning in React Native source. It must never appear in distributed
// registry block source files. See §3.7 Platform Compatibility Rules.

import React, { useState, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// Peer dependencies (e.g., lucide-react-native, react-native-svg)

// ─── 1. Sub-components / Icons / Helpers ─────────────────────────────────────
// Isolated SVG icons or internal sub-components

// ─── 2. Types & Interfaces ───────────────────────────────────────────────────
export type Theme = "dark" | "light";

export interface ItemType {
  id: string;
  label: string;
}

export interface MyBlockProps {
  /** Initial selected item ID. Defaults to the first item. */
  initialItem?: string;
  /** Callback fired when an item is selected. */
  onSelect?: (id: string) => void;
  /** Color theme mode. Defaults to "dark". */
  theme?: Theme;
  /** Custom item array to override defaults. */
  items?: ItemType[];
}

// ─── 3. Centralized Constants & Defaults ─────────────────────────────────────
export const DEFAULT_ITEMS: ItemType[] = [
  { id: "1", label: "Overview" },
  { id: "2", label: "Activity" },
];

export const COLORS_DARK = {
  background: "#0F0F12",
  surface: "#18181F",
  border: "rgba(255, 255, 255, 0.12)",
  textPrimary: "#FFFFFF",
  textSecondary: "#8E8E93",
  accent: "#32C798",
  shadow: "#000000",
};

export const COLORS_LIGHT = {
  background: "#FFFFFF",
  surface: "#F4F4F6",
  border: "rgba(0, 0, 0, 0.08)",
  textPrimary: "#111115",
  textSecondary: "#66666E",
  accent: "#10B981",
  shadow: "#0F172A",
};

// ─── 4. Main Component Export ────────────────────────────────────────────────
export function MyBlock({
  initialItem,
  onSelect,
  theme = "dark",
  items = DEFAULT_ITEMS,
}: MyBlockProps) {
  // Safe defaults and nullish coalescing
  const list = items && items.length > 0 ? items : DEFAULT_ITEMS;
  const [selected, setSelected] = useState<string>(initialItem ?? list[0]?.id ?? "");
  const colors = theme === "dark" ? COLORS_DARK : COLORS_LIGHT;

  // Handlers
  const handleSelect = useCallback(
    (id: string) => {
      setSelected(id);
      onSelect?.(id);
    },
    [onSelect]
  );

  return (
    <View style={styles.outerCanvas}>
      {/* Component JSX with accessibility */}
    </View>
  );
}

export default MyBlock;

// ─── 5. StyleSheet Definition ────────────────────────────────────────────────
const styles = StyleSheet.create({
  outerCanvas: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  // ...
});
```

---

## 3. Detailed Standards by Layer (Core Quality Criteria)

### 3.1. Props & Public API
- **Strict Naming**: Use explicit, descriptive prop names:
  - Callbacks: `on[Action]` (e.g., `onTabChange`, `onDateSelect`, `onPress`)
  - States: `is[State]` or `has[Feature]` (e.g., `isLoading`, `isDisabled`, `hasIndicator`)
  - Values: `value`, `defaultValue`, `initialTab`
- **Sensible Defaults**: Every optional prop must have a sensible fallback defined in destructuring:
  ```tsx
  export function Block({
    theme = "dark",
    size = "md",
    disabled = false,
  }: BlockProps)
  ```
- **Never enforce required props when sensible fallbacks exist**: Users should be able to drop `<MyBlock />` in with zero props and have it render an attractive preview state.

### 3.2. Types & TypeScript
- **`strict: true`**: No `any`, no implicit `any`, no untyped index access.
- **Exported Interfaces**: Always export the main props interface as `[ComponentName]Props` and any data structure interfaces (`TabItem`, `ChartDataPoint`).
- **Union Types for Variants**: Use literal unions for variants:
  ```tsx
  export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
  export type ComponentSize = "sm" | "md" | "lg";
  ```

### 3.3. Responsive Layout & Sizing
- **Container-Relative**: Always use `width: "100%"`, `flex: 1`, or flexbox layout.
- **Never hardcode device screen widths**:
  - ❌ `width: 390` (breaks on iPhone SE 320pt and Pro Max 430pt)
  - ✅ `width: "100%"`, `maxWidth: 380`, `alignSelf: "center"`
- **Handling Overflow**:
  - Always set `numberOfLines={1}` with `ellipsizeMode="tail"` on dynamic single-line labels.
  - Wrap multi-column items gracefully or use horizontal `ScrollView` with `showsHorizontalScrollIndicator={false}`.

### 3.4. Styling & Theming Conventions
- **Standard `StyleSheet.create` Baseline**:
  - Keep structural styles (display, padding, radii, flex layout) inside `StyleSheet.create`.
  - Pass dynamic color values (from `colors.background`, `colors.border`) as array overrides in JSX:
    ```tsx
    style={[
      styles.card,
      { backgroundColor: colors.surface, borderColor: colors.border }
    ]}
    ```
- **Color Palettes**:
  - `COLORS_DARK` and `COLORS_LIGHT` must live at the top of the file.
  - Colors must meet WCAG AA contrast (minimum 4.5:1 for normal text, 3:1 for large text).
  - Primary accent default: `#32C798` (RNBlocks Emerald).

### 3.5. Accessibility (a11y) & Keyboard Navigation
- **Roles**: All interactive elements must declare `accessibilityRole` (`"button"`, `"tab"`, `"link"`, `"combobox"`).
- **Labels**: Every icon-only button must include a concise `accessibilityLabel` (e.g., `accessibilityLabel="Close dialog"`).
- **State**: Selected or expanded elements must declare `accessibilityState` (e.g., `accessibilityState={{ selected: isFocused, disabled: isDisabled }}`).
- **Touch Target Size**: Minimum **44x44pt** for interactive targets. If the visual icon is 20px, pad the touch wrapper (`hitSlop` or container padding) to reach 44px.
- **Visible Focus States**: Ensure interactive elements display clear, high-contrast focus rings when focused via keyboard navigation on Web/Desktop.
- **Native Pressable Activation**: Rely on native platform activation (Enter/Space on web, tap on native) for standard buttons; do not invent unnecessary custom `onKeyDown` listeners on simple pressables.
- **Screen Reader Ergonomics**: For data visualizations (e.g. charts), provide an overarching container summary rather than requiring users to swipe through 30+ separate points.

### 3.6. Animations & Performance
- **Native Driver**: When using React Native's built-in `Animated`, always set `useNativeDriver: true` for transform and opacity animations.
- **UI Thread First**: For complex gestures or physics, use `react-native-reanimated` with worklets (`"worklet"`).
- **Memoization**: Memoize callbacks (`useCallback`) and derived arrays (`useMemo`) to prevent needless re-renders of list items.

### 3.7. Platform Compatibility Rules

Every block that claims `ios` or `android` in `registry.json → platforms` **must** pass the platform API check:

- **No raw DOM SVG**: Never use `<svg>`, `<path>`, `<defs>`, `<linearGradient>`, `<circle>`, `<line>`, `<rect>` HTML elements. Use `react-native-svg` primitives (`<Svg>`, `<Path>`, `<Defs>`, `<LinearGradient>`, `<Circle>`, `<Line>`, `<Rect>`) instead and declare `"dependencies": ["react-native-svg"]` in `registry.json`.
- **No DOM globals**: No `document.`, `window.`, `getBoundingClientRect`, `HTMLElement`, `localStorage`, `sessionStorage`.
- **No Next.js directives**: No `"use client"` — this is a Next.js server/client boundary directive. It is meaningless in React Native and must not appear in registry source files.
- **No `next/*` imports**: Use `react-native` alternatives.
- **Guard web-only events**: `onMouseEnter`, `onPointerMove`, `onPointerLeave` are web-only. If needed, wrap them in `Platform.select({ web: { onPointerMove: handler }, default: {} })`.
- **Use `onLayout` not `getBoundingClientRect`**: To measure element size, use the `onLayout` callback prop instead of `getBoundingClientRect`.

The CI check (`pnpm run check:platform-compat`) enforces these rules automatically and blocks merges on violation.

### 3.8. Usage Documentation & Examples
- **Copy-Paste Snippet**: Every block must include a self-contained, drop-in `@example` usage snippet in its source header and registry documentation.
- **Self-Documented Props**: The block's TypeScript props interface must be documented with descriptive JSDoc comments for all public props, types, and defaults.
- **Sensible Zero-Prop Default**: Components should gracefully render an aesthetic default preview state when instantiated with zero props.

---

## 4. Web App (`apps/web`) Code Standards

For the marketing site, docs, and component registry studio in `apps/web`:

1. **Design System & Aesthetics**:
   - Dark-first theme: background `#070709`, secondary `#0f0f13`, borders `rgba(255, 255, 255, 0.08)`.
   - Primary Emerald Accent: `#32c798` (with hover `#38dbab` and glow `rgba(50, 199, 152, 0.15)`).
   - Typography Hierarchy:
     - Editorial/Italic accents: `var(--font-brand)` (TimesNewRomanMT-Italic)
     - Technical/Code/Badges: `var(--font-mono)` (JetBrains Mono)
     - UI/Body: `var(--font-sans)` (Nunito Sans / Inter)
2. **CSS Variables & Tokens**:
   - Never use arbitrary magic hex values scattered across components when tokens exist in `globals.css`.
   - Use `clamp()` for responsive headline typography (e.g., `clamp(44px, 5.5vw, 72px)`).
   - Ambient glow backgrounds must use viewport-percentage radials or centered coordinates to avoid clipping on edge cases.
3. **Card & Frame Standards**:
   - Component cards must feel like interactive mini-windows with window chrome (`●●●` mac dots) and a subtle header bar with the filename.
   - Live preview canvas minimum height: 220px.
   - Hover reveals should be soft and directional (e.g., subtle bottom gradient fade), never abrupt full-dark opacity slams.

---

## 5. Pre-Commit Quality Checklist

Before submitting code or committing changes:
- [ ] Run `pnpm run typecheck` across all workspaces (0 errors).
- [ ] Run `pnpm run validate:registry` (schema + platform compat checks — must be 0 violations).
- [ ] Visual preview in browser at 320px, 768px, 1280px, and 1440px viewports.
- [ ] No extraneous npm dependencies introduced (react-native-svg is approved for SVG blocks).
- [ ] Atomic, conventional commit messages (`feat(web/hero): ...`, `fix(registry): ...`).

---

## 6. Git Branching & Promotion Workflow

All code contributions and changes follow a strict 3-tier promotion lifecycle:

```
[Feature Branch] (feat/*, fix/*, polish/*)
        ↓
    [develop]    (Preview, verification & user testing)
        ↓
    [master]     (Production release)
```

1. **Feature Branch (`feat/<name>`, `fix/<name>`, `polish/<name>`)**:
   - For every change, a new branch is created.
   - Atomic, conventional commits are created on this branch.
2. **Preview & Testing (`develop`)**:
   - The feature branch is merged into `develop`.
   - `develop` serves as the active integration branch for live previews, visual QA, and testing before promotion.
3. **Production (`master`)**:
   - Once changes are tested, reviewed, and approved on `develop`, `develop` is merged to `master`.

