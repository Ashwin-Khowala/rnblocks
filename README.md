# RNBlocks

Production-ready React Native and Expo UI components, delivered as source code you own. Every block is standalone, responsive, and customizable without forcing a styling framework or runtime dependency.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-000000?logo=turborepo)](https://turbo.build/)
[![React Native](https://img.shields.io/badge/React%20Native-0.76+-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2052+-000020?logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[Explore Registry](https://rnblocks.vercel.app/blocks) · [Documentation](https://rnblocks.vercel.app/docs) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md)

---

## Why RNBlocks?

- **Source Code Ownership**: You copy the component code into your repository. Modify styles, behavior, and layout directly.
- **Zero Runtime Dependencies**: No wrapper contexts, no mandatory `ThemeProvider`, no design-token dependencies.
- **React Native Primitives**: Authored using standard `StyleSheet.create` for universal compatibility. Adaptable to NativeWind or any styling library.
- **Universal Compatibility**: Tested across Expo (SDK 52+) and React Native CLI (0.76+ with New Architecture).
- **CLI Workflow**: Add components with a single command: `npx rnblocks add <block>`.

---

## Quick Start

Add a component directly into your project:

```bash
npx rnblocks add floating-docker
```

Or browse, preview, and copy components directly from the web registry at [rnblocks.vercel.app](https://rnblocks.vercel.app).

---

## Development

```bash
git clone https://github.com/Ashwin-Khowala/rnblocks.git
cd rnblocks
pnpm install
pnpm dev
```

### Common Commands

| Command | Description |
|---|---|
| `pnpm dev` | Run all applications and packages in watch mode |
| `pnpm build` | Build web registry, documentation site, and CLI |
| `pnpm typecheck` | Run TypeScript validation across all workspaces |
| `pnpm run validate:registry` | Validate registry items against schema and file checks |
| `pnpm run generate:registry` | Recompile `registry.json` and sync with web app |

---

## Documentation

- [Architecture Overview](docs/architecture.md)
- [Registry Schema Reference](docs/registry-format.md)
- [Creating a Block Guide](docs/creating-a-block.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)

---

## License

This project is licensed under the [MIT License](LICENSE).
