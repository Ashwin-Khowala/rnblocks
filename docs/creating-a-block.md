# Creating a Block: Step-by-Step Guide

This guide walks you through authoring and submitting a production-ready component block to RNBlocks.

---

## Step 1: Check for Duplicates

Before writing code:
1. Search `registry/blocks/` to verify that a similar component does not already exist.
2. If a similar block exists, consider proposing an enhancement or variant rather than building a duplicate.
3. For large components or multi-screen flows, open a [Block Proposal](https://github.com/Ashwin-Khowala/rnblocks/issues/new?template=block_proposal.yml) first.

---

## Step 2: Create the Directory Structure

Create a directory under `registry/blocks/` named with your component's kebab-case slug:

```bash
mkdir -p registry/blocks/my-component/files
```

Your component directory will contain two items:
```
registry/blocks/my-component/
├── registry.json
└── files/
    └── my-component.tsx
```

---

## Step 3: Write the Component

### Key Requirements

1. **Self-Contained**: Place all component code, subcomponents, and types inside `files/my-component.tsx`. Do not import from parent repository paths or relative packages.
2. **Standard React Native Primitives**: Use `StyleSheet.create` for universal compatibility across Expo and bare React Native.
3. **Semantic Colors**: Define color constants at the top of the file so users can easily customize the palette:

```tsx
const COLORS_DARK = {
  background: "#18181b",
  card: "#27272a",
  border: "#3f3f46",
  text: "#fafafa",
  subtext: "#a1a1aa",
  accent: "#6366f1",
};

const COLORS_LIGHT = {
  background: "#f4f4f5",
  card: "#ffffff",
  border: "#e4e4e7",
  text: "#09090b",
  subtext: "#71717a",
  accent: "#4f46e5",
};
```

4. **Expose a Theme Prop**: If your component supports theming, provide a `theme?: "dark" | "light"` prop:

```tsx
export interface MyComponentProps {
  theme?: "dark" | "light";
  // other props...
}

export default function MyComponent({ theme = "dark", ...props }: MyComponentProps) {
  const colors = theme === "light" ? COLORS_LIGHT : COLORS_DARK;
  // ...
}
```

5. **Container-Relative Layout**:
   - Use `width: "100%"`, `flex: 1`, and flexbox layouts.
   - Never assume fixed device widths (e.g. `width: 390`).
   - Test that the component looks natural in compact (320pt) containers as well as full-width tablets.

6. **Accessibility & Focus**:
   - Add `accessibilityRole` on pressable elements (e.g. `"button"`, `"tab"`).
   - Add clear `accessibilityLabel` attributes to icons and buttons.
   - Use `accessibilityState` for dynamic state (e.g. `{ selected: isSelected, disabled: isDisabled }`).
   - Ensure interactive touch targets meet the recommended **44x44pt** minimum.
   - Provide visible focus styling for keyboard and web users (e.g. outline or high-contrast focus state).
   - For chart components, provide an accessible container summary rather than forcing screen-reader users through dozens of granular swipes.

7. **Header JSDoc with Copy-Paste Usage Example**:
   Include a concise `@example` block at the top of `files/my-component.tsx` showing how consumers can copy and immediately render your component:

```tsx
/**
 * @example
 * import MyComponent from "./components/my-component";
 *
 * export default function Screen() {
 *   return (
 *     <MyComponent
 *       theme="dark"
 *       onAction={() => console.log("Pressed")}
 *     />
 *   );
 * }
 */
```

---

## Step 4: Document Props & Quick Usage

Every block must be easy for consumers to drop into their projects without guessing prop names or parsing 500 lines of implementation code.

1. **Self-Documented Props Interface**:
   ```tsx
   export interface MyComponentProps {
     /** Color theme variant. Defaults to "dark". */
     theme?: "dark" | "light";
     /** Primary accent color used for highlights and active states. */
     accentColor?: string;
     /** Callback fired when an item is selected. */
     onSelect?: (id: string) => void;
   }
   ```

2. **Sensible Zero-Prop Default**:
   Whenever possible, allow `<MyComponent />` to render with default mock data so developers can preview it immediately after running `npx @rnblocks/cli add <slug>`.

---

## Step 5: Write `registry.json`

Create `registry/blocks/my-component/registry.json`:

```json
{
  "name": "my-component",
  "title": "My Interactive Component",
  "description": "Clear description of component functionality, interaction, and visual traits.",
  "type": "block",
  "author": {
    "name": "Your Name",
    "github": "your-github-username"
  },
  "version": "1.0.0",
  "category": "navigation",
  "tags": ["navigation", "animated", "menu"],
  "files": [
    {
      "path": "files/my-component.tsx",
      "type": "registry:component"
    }
  ],
  "dependencies": ["lucide-react-native"],
  "devDependencies": {},
  "registryDependencies": [],
  "platforms": ["ios", "android", "web"],
  "frameworks": ["expo", "react-native"],
  "styling": ["StyleSheet"],
  "themes": ["dark", "light"]
}
```

---

## Step 6: Validate and Generate

Run the automated validation script:

```bash
pnpm run validate:registry
```

If validation passes, compile the registry and generate web artifacts:

```bash
pnpm run generate:registry
```

---

## Step 7: Test Locally in Web Preview

Start the local development server:

```bash
pnpm dev
```

Visit `http://localhost:3000/blocks` in your browser. Verify:
- Your component card appears in the gallery with proper metadata.
- Interactive live preview renders cleanly in both dark and light modes.
- Source code view displays the exact component source.
- Quick usage snippet is clearly presented and copyable.

---

## Step 8: Submit Your Pull Request

1. Commit your changes following Conventional Commits (`feat: add my-component block`).
2. Push your branch and open a Pull Request.
3. Fill out the Pull Request template completely, including the quality checklist (roles, labels, states, touch targets, focus indicators, usage examples) and preview screenshot.
4. Confirm the licensing agreement attestation in the PR description.
