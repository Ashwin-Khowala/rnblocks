---
name: block-authoring
description: Authoring self-contained React Native registry blocks with zero runtime dependencies, full dark/light theming, strict TypeScript types, and accessibility.
---

# Block Authoring Skill (`block-authoring`)

Use this skill whenever creating a new React Native block or refactoring an existing block in `registry/blocks/`.

---

## Architecture Principles
1. **shadcn/ui Copy-Paste Philosophy**:
   - RNBlocks is a component registry, not an npm component library.
   - Every block lives in a single, self-contained file: `registry/blocks/<slug>/files/<slug>.tsx`.
   - Users copy-paste the component into their project. Zero external library dependencies (only peer dependencies: `react-native`, `react-native-svg`).
   - Hardcoded design constants (e.g. `const COLORS = ...`, fixed bar paddings) are centralized at the top of the file so users can easily edit them.
2. **Platform Universality**:
   - Must run on iOS, Android, and Web without runtime errors or crashes.
   - Zero raw DOM elements: always use `react-native-svg` primitives (`<Svg>`, `<Path>`, `<Circle>`, `<Line>`, `<Rect>`, `<Defs>`, `<LinearGradient>`, `<Stop>`, `<G>`).
   - Never import `"use client"` or `next/*`.
3. **Data Dynamic Computing**:
   - NEVER hardcode stats, percentages, totals, or deltas. Everything must derive dynamically from data props.
   - Zero fake mock statistics. Provide realistic default props so `<MyBlock />` can render out of the box.

---

## Step-by-Step Block Authoring Workflow

### Step 1: File Structure
Create the following files:
```text
registry/blocks/<slug>/
├── registry.json
└── files/
    └── <slug>.tsx
```

### Step 2: Component Blueprint
```tsx
import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Platform,
  AccessibilityInfo,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from "react-native-svg";

// ── Color & Theme Tokens ───────────────────────────────────────────────────────
const COLORS = {
  dark: {
    bg: "#07070A",
    card: "#0F0F14",
    border: "rgba(255, 255, 255, 0.08)",
    textPrimary: "#FFFFFF",
    textMuted: "#8E8E93",
    accent: "#32C798",
  },
  light: {
    bg: "#FFFFFF",
    card: "#F4F4F5",
    border: "rgba(0, 0, 0, 0.08)",
    textPrimary: "#09090B",
    textMuted: "#71717A",
    accent: "#10B981",
  },
};

// ── Exported Types ─────────────────────────────────────────────────────────────
export interface MyBlockProps {
  theme?: "dark" | "light";
  style?: ViewStyle;
  reduceMotion?: boolean;
  revealKey?: string | number;
}

// ── Implementation ─────────────────────────────────────────────────────────────
export function MyBlock({
  theme = "dark",
  style,
  reduceMotion = false,
  revealKey,
}: MyBlockProps) {
  const palette = COLORS[theme];

  return (
    <View
      style={[styles.container, { backgroundColor: palette.card, borderColor: palette.border }, style]}
      accessible
      accessibilityRole="summary"
      accessibilityLabel="Component overview"
    >
      <Text
        style={[styles.title, { color: palette.textPrimary }]}
        allowFontScaling={false}
      >
        Dynamic Title
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});
```

### Step 3: Write `registry.json`
```json
{
  "$schema": "../../../packages/registry/src/schema.json",
  "name": "my-block",
  "type": "block",
  "title": "My Block",
  "description": "Clean, responsive component for React Native and Expo.",
  "category": "analytics",
  "version": "1.0.0",
  "author": "Ashwin Khowala",
  "platforms": ["ios", "android", "web"],
  "dependencies": ["react-native-svg"],
  "themes": ["dark", "light"],
  "files": [
    {
      "path": "my-block.tsx",
      "type": "block"
    }
  ]
}
```

### Step 4: Register in Native Check
Add the export to `packages/native-check/src/index.ts`:
```ts
export * from "../../../registry/blocks/my-block/files/my-block";
```

### Step 5: Verification
Run:
```bash
pnpm generate:registry
pnpm validate:all
pnpm typecheck
```
