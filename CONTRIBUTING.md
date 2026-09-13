# Contributing to RNBlocks

First off, thank you for considering contributing to **RNBlocks**! It's contributors like you that make building React Native apps faster, cleaner, and more accessible to everyone.

Please take a moment to review this document to make the contribution process smooth and effective for everyone involved.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any unacceptable behavior to [ashwinkhowala@gmail.com](mailto:ashwinkhowala@gmail.com).

---

## Getting Started

### Prerequisites
- **Node.js**: v18.18 or higher (v20+ recommended)
- **pnpm**: v9.0 or higher (`npm install -g pnpm`)
- **Git**

### Local Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/Ashwin-Khowala/rnblocks.git
   cd rnblocks
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start development server:**
   ```bash
   pnpm dev
   ```
   This launches the Next.js web registry app at [http://localhost:3000](http://localhost:3000) and documentation site.

4. **Verify build and types:**
   ```bash
   pnpm run typecheck
   pnpm run build
   ```

---

## Monorepo Architecture

RNBlocks is managed as a high-performance **Turborepo** monorepo:

```
rnblocks/
├── apps/
│   ├── web/           # Next.js 16 web registry, showcase, and component studio
│   └── docs/          # Next.js 16 documentation and API reference
├── packages/
│   ├── cli/           # 'rnblocks' CLI tool (Commander + tsup + zod)
│   ├── registry/      # Shared registry types and schema definitions
│   ├── ui/            # Shared UI components
│   ├── tsconfig/      # Shared TypeScript configuration
│   └── eslint-config/ # Shared ESLint configuration
├── registry/          # Source of truth for all components and screens
│   ├── blocks/        # Individual UI component blocks (e.g. floating-docker)
│   ├── screens/       # Full-screen template flows
│   └── registry.json  # Auto-generated registry bundle
└── scripts/           # Registry generation and validation scripts
```

---

## Adding a New Block or Screen to the Registry

Every block in RNBlocks lives under `registry/` and is validated against strict schemas before inclusion.

### Step 1: Create the Block Directory

Create a new directory in `registry/blocks/<your-block-slug>` (or `registry/screens/<your-screen-slug>`):

```
registry/blocks/my-block/
├── registry.json
└── files/
    └── my-block.tsx
```

### Step 2: Define `registry.json`

Every block must have a `registry.json` defining its metadata and dependencies:

```json
{
  "name": "my-block",
  "title": "My Block Title",
  "description": "Clean, responsive mobile component designed for React Native & Expo.",
  "type": "block",
  "author": "Your Name",
  "version": "1.0.0",
  "category": "navigation",
  "files": [
    {
      "path": "files/my-block.tsx",
      "type": "registry:component"
    }
  ],
  "dependencies": ["lucide-react-native"],
  "registryDependencies": [],
  "platforms": ["ios", "android", "web"],
  "framework": "react-native",
  "styling": ["StyleSheet"],
  "themes": ["dark", "light"]
}
```

### Design Philosophy

RNBlocks is built on a simple foundation:

**copy -> own -> customize**

Every block is:
- **Standalone and source-owned**: Delivered directly into the user's project codebase. There is no runtime npm package, no required `ThemeProvider`, and no forced styling dependency.
- **Built with standard React Native primitives**: Uses `StyleSheet.create` as the baseline. Developers who prefer NativeWind or other styling solutions can easily adapt the styles after copying.
- **Easy to customize without token bloat**: Semantic color constants (`COLORS_DARK`, `COLORS_LIGHT`) live directly at the top of each component file. Avoid multi-layered token or design-system abstractions.
- **Pragmatic about design values**: Fixed design values such as font sizes, spacing, radii, and component dimensions are acceptable in standalone blocks. Contributors should avoid unnecessary abstraction and keep styling easy to customize.
- **Responsive to containers, not screen assumptions**: Components must adapt to whatever container they are placed in. Never hardcode screen-width assumptions (e.g. `width: 390`).

---

### Block Quality Checklist

Before submitting a block or screen, verify it meets the RNBlocks quality standards:

#### Functionality
- [ ] Works across iOS, Android, and Web
- [ ] Fully compatible with Expo and React Native CLI
- [ ] Strict TypeScript definitions for all props
- [ ] Clean state handling (loading, disabled, active, empty states where applicable)
- [ ] No unnecessary third-party runtime dependencies

#### Layout
- [ ] Responsive to container width (`width: "100%"`, `flex: 1`, flexbox)
- [ ] Visually verified on compact (320pt), standard (375pt-390pt), and large (428pt+) viewports
- [ ] No unexplained layout assumptions or arbitrary values
- [ ] Dynamic and edge-case content handled cleanly without overflow

#### Styling
- [ ] Semantic color constants (`COLORS_DARK` / `COLORS_LIGHT`) at the top of the file
- [ ] Consistent `theme?: "dark" | "light"` prop where the block genuinely benefits from theming
- [ ] No unnecessary abstraction layers or external token systems
- [ ] Clean visual hierarchy and consistent spacing

#### Accessibility
- [ ] Interactive elements have accessible labels (`accessibilityLabel`)
- [ ] Buttons and pressable elements declare appropriate accessibility roles (`accessibilityRole`)
- [ ] Text remains readable with larger font settings where practical
- [ ] Sufficient contrast between foreground and background colors
- [ ] Touch targets are reasonably sized (minimum 44x44pt recommended for touch interactions)

#### Performance
- [ ] No unnecessary re-renders (leverage `useMemo` / `useCallback` where appropriate)
- [ ] No expensive calculations on every render cycle
- [ ] Lists use appropriate `FlatList` or `SectionList` patterns for large collections
- [ ] Animations use appropriate native or UI-thread mechanisms where needed

#### Registry
- [ ] Valid `registry.json` matching the schema with accurate metadata
- [ ] Accurate `themes` array declared (`["dark", "light"]` or `["dark"]`)
- [ ] All external dependencies explicitly listed
- [ ] Declared platform support tested and verified
- [ ] Web preview renders cleanly in the registry studio

---

### Step 3: Generate and Validate Registry

Run the registry builder to compile `registry/registry.json` and synchronize with `@rnblocks/web`:

```bash
pnpm run generate:registry
pnpm run validate:registry
```

### Step 4: Test in the Web App

Launch `pnpm dev` and visit [http://localhost:3000/blocks](http://localhost:3000/blocks) to verify your component appears in the registry, displays source code syntax highlighting, and passes all checks.

---

## Working on the CLI (`packages/cli`)

The `rnblocks` CLI allows developers to add blocks directly into their React Native and Expo projects via `npx rnblocks add <slug>`.

To test the CLI locally:
```bash
cd packages/cli
pnpm build
node dist/index.js --help
node dist/index.js add floating-docker
```

---

## Pull Request Guidelines

1. **Create a branch:**
   ```bash
   git checkout -b feat/add-custom-bottom-sheet
   ```

2. **Follow Conventional Commits:**
   - `feat:` for new components, screens, or CLI features
   - `fix:` for bug fixes in existing components or packages
   - `docs:` for documentation improvements
   - `chore:` for build tooling or dependency updates

3. **Check CI checks locally:**
   ```bash
   pnpm run typecheck
   pnpm run build
   ```

4. **Submit your Pull Request:**
   - Provide a clear title and description.
   - Include screenshots or screen recordings (for new mobile components/screens).
   - Link any related issues.

---

## Community & Questions

- **Issues**: If you discover a bug or have a feature request, please open a [GitHub Issue](https://github.com/Ashwin-Khowala/rnblocks/issues).
- **Discussions**: Share ideas, component suggestions, or show off apps built with RNBlocks on [GitHub Discussions](https://github.com/Ashwin-Khowala/rnblocks/discussions).

Thank you for helping build the future of React Native UI!
