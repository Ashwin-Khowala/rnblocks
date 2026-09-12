<div align="center">

# RNBlocks

### The Open Source React Native & Expo UI Block Registry

Crafted mobile blocks, screens, and components ready to drop into your Expo or React Native app. No bloated libraries. Zero vendor lock-in. Full code ownership.

<br />

[![Powered by Vercel](https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg)](https://vercel.com?utm_source=rnblocks&utm_campaign=oss)

<br />

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-000000?logo=turborepo)](https://turbo.build/)
[![React Native](https://img.shields.io/badge/React%20Native-0.78+-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2052+-000020?logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<br />

[**Explore Registry**](https://rnblocks.vercel.app/blocks) · [**Documentation**](https://rnblocks.vercel.app/docs) · [**Contribute**](CONTRIBUTING.md) · [**Submit Block**](https://rnblocks.vercel.app/submit)

</div>

---

## ⚡ Why RNBlocks?

Web developers have had game-changing registry tools like **shadcn/ui** that revolutionized frontend engineering by advocating for **code ownership over monolithic npm packages**.

Mobile developers building on React Native and Expo deserve the same superpower.

RNBlocks is an open-source registry designed specifically for React Native and Expo:
- **Copy, Don't Install**: You own the component code. Modify colors, curves, haptics, and physics directly in your repository.
- **Automated CLI**: Run `npx rnblocks add <block>` to automatically place component files and install required peer dependencies.
- **Universal Mobile Compatibility**: Tested across Expo SDK (Managed & Bare workflows) and standard React Native CLI.
- **Type Safe & Modular**: Written in strict TypeScript with minimal third-party runtime baggage.
- **NativeWind & StyleSheet Friendly**: Built to look crisp whether you use NativeWind v4 (Tailwind) or classic React Native `StyleSheet`.

---

## 🚀 Quick Start

### 1. Initialize your project
Configure your project directory and preferences:

```bash
npx rnblocks init
```

### 2. Add a block
Fetch production-ready components directly into your codebase:

```bash
# Add the interactive floating docker component
npx rnblocks add floating-docker
```

The CLI will:
1. Fetch the component metadata and code from the registry.
2. Resolve and install necessary peer dependencies (e.g. `lucide-react-native`).
3. Place clean, formatted TypeScript source files directly into your project's `components/` directory.

### 3. Or copy directly from the Web Registry
Visit [rnblocks.vercel.app](https://rnblocks.vercel.app) to inspect the component live in dark mode, browse the full source code, and copy it with one click.

---

## 🧱 Repository Architecture

RNBlocks is organized as a high-performance **Turborepo** monorepo using **pnpm workspaces**:

```
rnblocks/
├── apps/
│   ├── web/           # Next.js 16 web registry showcase, studio inspection, & API routes
│   └── docs/          # Next.js 16 documentation and API specification site
├── packages/
│   ├── cli/           # 'rnblocks' CLI tool (Commander + tsup + zod)
│   ├── registry/      # Shared registry types and schema definitions
│   ├── ui/            # Shared UI design system
│   ├── tsconfig/      # Shared TypeScript configs
│   └── eslint-config/ # Shared ESLint configs
├── registry/          # Source-of-truth component directory
│   ├── components/    # Registered mobile UI components
│   ├── screens/       # Registered mobile full-screen templates
│   └── registry.json  # Auto-generated registry bundle consumed by web & CLI
└── scripts/           # Registry generation and schema validation scripts
```

---

## 🛠️ Local Development

Clone and run RNBlocks locally in under two minutes:

```bash
# 1. Clone the repository
git clone https://github.com/Ashwin-Khowala/rnblocks.git
cd rnblocks

# 2. Install monorepo dependencies
pnpm install

# 3. Start local development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the web registry.

### Common Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Run all applications and packages in watch mode |
| `pnpm build` | Build all apps (`@rnblocks/web`, `@rnblocks/docs`, `rnblocks` CLI) |
| `pnpm typecheck` | Run strict TypeScript validation across the entire monorepo |
| `pnpm run generate:registry` | Scan `registry/` and generate `registry.json` |
| `pnpm run validate:registry` | Validate registry items against zod schemas |

---

## 🤝 Contributing

We welcome contributions of all kinds! Whether you're designing new React Native blocks, adding full-screen templates, improving documentation, or enhancing the CLI:

1. Read our [Contributing Guide](CONTRIBUTING.md).
2. Check out our [Code of Conduct](CODE_OF_CONDUCT.md).
3. Visit our interactive [Contribution Portal](https://rnblocks.vercel.app/contribute) or submit a block directly via the [Web Submission Form](https://rnblocks.vercel.app/submit).

---

## 💖 Open Source Sponsorship & Acknowledgements

RNBlocks is proud to be built for the global React Native and Expo developer community.

- **Hosted and Powered by [Vercel](https://vercel.com?utm_source=rnblocks&utm_campaign=oss)** — Thank you to Vercel for empowering open source creators with ultra-fast edge infrastructure and analytics.
- Inspired by the architectural brilliance of [shadcn/ui](https://ui.shadcn.com).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Feel free to use the blocks in personal, commercial, and client applications.
