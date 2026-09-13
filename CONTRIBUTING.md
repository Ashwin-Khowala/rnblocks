# Contributing to RNBlocks

First off, thank you for considering contributing to **RNBlocks**! It's contributors like you that make building React Native apps faster, cleaner, and more accessible to everyone.

Please take a moment to review this document to make the contribution process smooth and effective for everyone involved.

---

## Before You Contribute

Before opening a pull request or building a new component, please ensure your contribution satisfies these core criteria:

1. **Search existing blocks**: Avoid duplicate implementations. Check `registry/blocks/` and open issues before starting. If a similar block exists, consider proposing an enhancement or variant rather than creating a near-duplicate.
2. **Open a proposal for complex items**: For full-screen templates, complex multi-screen flows, or non-trivial dependencies, open a [Block Proposal](https://github.com/Ashwin-Khowala/rnblocks/issues/new?template=block_proposal.yml) first so maintainers can align on direction.
3. **Original work only**: All contributed code must be your original work or permissibly licensed open-source code with explicit attribution. Do not submit proprietary designs, copied commercial UI kits, or copyrighted assets.
4. **No secrets or unauthorized network calls**: Never include API keys, tokens, credentials, analytics telemetry, or hidden network requests. All dependencies must be explicitly declared and open-source.
5. **Zero-runtime principle**: Blocks must remain standalone React Native source code that users copy into their repositories. Do not add runtime provider requirements or global state dependencies.

### License Agreement

By submitting a pull request or contribution to RNBlocks, you agree that your contribution is provided under the terms of the project's [MIT License](LICENSE), and you confirm that you have the right to submit the code under this license.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any unacceptable behavior to [ashwinkhowala@gmail.com](mailto:ashwinkhowala@gmail.com).

---

## Getting Started

### Prerequisites
- **Node.js**: v20 or higher (v20 LTS recommended, see `.nvmrc`)
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
├── docs/              # In-depth architectural & reference documentation
└── scripts/           # Registry generation and validation scripts
```

For complete architecture details, see [docs/architecture.md](docs/architecture.md).

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
  "author": {
    "name": "Your Name",
    "github": "your-username"
  },
  "version": "1.0.0",
  "category": "navigation",
  "tags": ["navigation", "tab-bar", "animated"],
  "files": [
    {
      "path": "files/my-block.tsx",
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

For detailed schema documentation, see [docs/registry-format.md](docs/registry-format.md).

---

### Design Philosophy

RNBlocks is built on a simple foundation:

**copy → own → customize**

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
- [ ] Accurate `tags` array declared with lowercase keywords
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

---

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
   pnpm run validate:registry
   pnpm run typecheck
   pnpm run build
   ```

4. **Submit your Pull Request:**
   - Use the provided PR template.
   - Complete the quality checklist.
   - Attach screenshots or screen recordings.
   - Confirm licensing agreement.

---

## Community & Questions

- **Security**: Report vulnerabilities privately to [ashwinkhowala@gmail.com](mailto:ashwinkhowala@gmail.com). See [SECURITY.md](SECURITY.md).
- **Issues**: If you discover a bug or have a feature request, please open a [GitHub Issue](https://github.com/Ashwin-Khowala/rnblocks/issues).
- **Discussions**: Share ideas, component suggestions, or show off apps built with RNBlocks on [GitHub Discussions](https://github.com/Ashwin-Khowala/rnblocks/discussions).

Thank you for helping build the future of React Native UI!
