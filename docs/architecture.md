# RNBlocks Architecture

This document outlines the repository structure, workspace packages, and data flow of the RNBlocks project.

---

## Monorepo Layout

RNBlocks is structured as a Turborepo monorepo powered by pnpm workspaces:

```
rnblocks/
├── apps/
│   └── web/                     # Showcase web registry, live preview studio, dynamic /docs site
├── packages/
│   ├── cli/                     # 'rnblocks' CLI tool (Commander + tsup + zod)
│   ├── registry/                # Core Zod schema, types, and registry loader
│   ├── ui/                      # Shared design system components
│   ├── tsconfig/                # Base TypeScript configurations
│   └── eslint-config/           # Base ESLint linting configurations
├── registry/
│   ├── blocks/                  # Production-ready mobile UI blocks
│   │   ├── floating-docker/
│   │   ├── interactive-calendar/
│   │   ├── social-auth-buttons/
│   │   └── trend-chart/
│   ├── screens/                 # Full-screen template flows (future)
│   └── registry.json            # Generated registry manifest
├── docs/                        # Canonical Markdown documentation source
└── scripts/
    ├── generate-registry.ts     # Generates registry.json & blocks.tsx
    └── validate-registry.ts     # Validates schema, files, tags, and security
```

---

## Core Packages

### 1. `@rnblocks/registry` (`packages/registry`)
The single source of truth for schema definitions and registry parsing:
- **`schema.ts`**: Defines `RegistryItemSchema`, `RegistryAuthorSchema`, `RegistryItemFileSchema`, and `RegistryManifestSchema` using Zod.
- **`loader.ts`**: Provides file-system scanning helpers to discover items, validate schemas, and read associated component source code.

### 2. `@rnblocks/cli` (`packages/cli`)
The command-line distribution tool invoked via `npx rnblocks`:
- **`add <slug>`**: Resolves a component from the local filesystem (in development) or from GitHub Raw (`master` branch). Places TypeScript source directly into the user's `components/rnblocks` or custom directory and instructs on required dependencies.
- **`list`**: Enumerates available blocks and screens in the registry.
- **`init`**: Guides initial project setup and component destination preferences.

### 3. `@rnblocks/web` (`apps/web`)
The public-facing registry and documentation website at [rnblocks.vercel.app](https://rnblocks.vercel.app):
- Next.js 16 App Router application.
- Renders live component previews, interactive theme toggling, source code syntax highlighting, and copy buttons.
- Dynamically loads and renders canonical Markdown documentation from root `docs/` at `/docs/[slug]`.
- Consumes generated registry metadata from `apps/web/data/blocks.tsx`.

---

## Data Flow: From Component to User

```
1. Authoring
   Developer writes component in registry/blocks/<slug>/files/<slug>.tsx
   and defines metadata in registry/blocks/<slug>/registry.json

2. Validation & Generation
   pnpm run validate:registry (verifies schema, file paths, tags, security patterns)
   pnpm run generate:registry (compiles registry/registry.json & apps/web/data/blocks.tsx)

3. Distribution
   Web: apps/web imports generated data and renders preview + copyable source code
   CLI: npx rnblocks add <slug> fetches component files from registry and writes to user project
```

---

## Design Principles

1. **Standalone Components**: Each block contains its own styles, types, and logic in one or two files. Users do not need a runtime library or global configuration.
2. **Standard StyleSheet Baseline**: Components use `StyleSheet.create`. Adapting to NativeWind, Tamagui, or Restyle requires only swapping container and element styles after copying.
3. **Container-Relative Sizing**: Components flex to fit whatever container or modal they are placed in. Never hardcode fixed device widths.
