---
name: cross-platform-auditor
description: Auditing React Native registry blocks for cross-platform safety, detecting DOM leaks, checking React Native strict types, and dependency alignment.
---

# Cross-Platform Auditor Skill (`cross-platform-auditor`)

Use this skill to audit blocks before submitting changes, ensuring zero native crashes on iOS/Android and clean rendering on Web.

---

## 1. Automated Verification Checks
Run the full automated platform audit suite:
```bash
pnpm validate:all
```
This runs three sub-validators:
1. `validate:registry`: Checks `registry.json` schema, platform declarations, themes array, and file paths.
2. `validate:deps`: Ensures all third-party imports in block code match dependencies declared in `registry.json`.
3. `validate:native`: Compiles `packages/native-check/src/index.ts` using strict React Native tsconfig (detects DOM types, missing native interfaces, or Next.js leaks).

---

## 2. Manual Inspection Checklist

### DOM Leak Audit (Regex Scan)
Search for forbidden DOM elements in `registry/blocks/`:
- `<svg`, `<path`, `<defs`, `<linearGradient`, `<circle`, `<line`, `<rect` -> Must be capitalized `<Svg>`, `<Path>`, etc. from `react-native-svg`.
- `document.`, `window.`, `HTMLElement` -> Forbidden in native code.
- `<div>`, `<span>`, `<button>`, `<p>`, `<a>` -> Forbidden in native code.

### Web Guard Audit
If web pointer listeners (`onMouseEnter`, `onPointerMove`, `getBoundingClientRect`) are used for web desktop previews:
- Are they wrapped in `Platform.OS === "web"` or `Platform.select({ web: ... })`?
- Are they marked with `// platform:web-safe`?

### Dependency Audit
- Are any unauthorized packages imported? (`lucide-react`, `@expo/vector-icons`, `reanimated`, etc.)
- Are internal icons or `react-native-svg` used instead?

### PanResponder Audit
- If `PanResponder.create` is used with touch tracking, does it use `.measure()` + `pageX` instead of raw `locationX`?

### Native Check Registration
- Is the block exported in `packages/native-check/src/index.ts`?
  ```ts
  export * from "../../../registry/blocks/<slug>/files/<slug>";
  ```

---

## 3. Web Preview & Hydration Verification
- Start dev server: `pnpm dev`
- Visit `http://localhost:3000/blocks/<slug>`
- Check browser console:
  - Zero hydration mismatch errors (`A tree hydrated but some attributes...`)
  - Zero `collapsable` warnings (`Received false for a non-boolean attribute collapsable`)
  - Zero unknown DOM attribute warnings
