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
│   ├── components/    # Individual UI components (e.g. floating-docker)
│   ├── screens/       # Full-screen template flows
│   └── registry.json  # Auto-generated registry bundle
└── scripts/           # Registry generation and validation scripts
```

---

## Adding a New Block or Screen to the Registry

Every block in RNBlocks lives under `registry/` and is validated against strict schemas before inclusion.

### Step 1: Create the Component Directory

Create a new directory in `registry/components/<your-block-name>` (or `registry/screens/<your-screen-name>`):

```
registry/components/my-block/
├── meta.json
└── files/
    └── my-block.tsx
```

### Step 2: Define `meta.json`

Every block must have a `meta.json` defining its metadata and dependencies:

```json
{
  "name": "My Block Name",
  "slug": "my-block",
  "description": "Clean, responsive mobile component designed for React Native & Expo.",
  "type": "component",
  "category": "navigation",
  "dependencies": ["lucide-react-native"],
  "peerDependencies": ["react-native-reanimated", "react-native-gesture-handler"],
  "files": [
    {
      "name": "my-block.tsx",
      "path": "files/my-block.tsx",
      "type": "component"
    }
  ]
}
```

#### Guidelines for Block Code:
- **Clean & Self-Contained**: Components should be copy-paste ready with minimal extraneous external setup.
- **Expo & React Native CLI Ready**: Use standard React Native APIs (`react-native` or Expo SDK primitives).
- **TypeScript**: Use strict TypeScript definitions for all props.
- **Icons**: Prefer `lucide-react-native` for lightweight, modern icons.
- **No Hardcoded Secrets or Mocks**: Provide clear default props or mock data structures that developers can easily replace.

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
