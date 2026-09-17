# @rnblocks/cli

> The Open Source React Native & Expo UI Registry CLI.

Add beautiful, copy-pasteable React Native components and blocks directly into your project with a single command.

[![npm version](https://img.shields.io/npm/v/@rnblocks/cli.svg)](https://www.npmjs.com/package/@rnblocks/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)

---

## ⚡ Quick Start

You don't need to install this package globally. Just run it using `npx`:

```bash
# Add a component directly into your React Native or Expo project
npx @rnblocks/cli add trend-chart

# List all available blocks and screens in the registry
npx @rnblocks/cli list
```

---

## 📦 What is RNBlocks?

**RNBlocks** is an open-source registry of crafted, animated, and fully responsive UI components for **React Native** and **Expo**.

- **Zero Vendor Lock-In**: Components are copied directly into your codebase (`components/rnblocks/`). You own the code.
- **Cross-Platform**: Built for iOS, Android, and Web using pure React Native primitives and `react-native-svg`.
- **Theme-Ready**: First-class support for dark and light modes.
- **Zero Third-Party Bloat**: No mandatory runtime wrappers, no heavy animation engines, no native build steps required.

---

## 🛠️ CLI Commands

### `add <name>`
Downloads the component from the registry and saves it into your project:

```bash
npx @rnblocks/cli add <component-name>
```

Options:
- `-p, --path <dir>`: Custom destination directory (default: `components/rnblocks` for blocks, `screens` for screens).
- `-o, --overwrite`: Overwrite existing files if they already exist.
- `-y, --yes`: Skip confirmation prompts.

Example:
```bash
npx @rnblocks/cli add trend-chart --path src/components/charts
```

### `list`
Lists all available components, categories, dependencies, and supported platforms:

```bash
npx @rnblocks/cli list
```

---

## 🌐 Registry & Documentation

Browse live interactive previews, code snippets, and design tokens:

- **Documentation**: [https://rnblocks.vercel.app](https://rnblocks.vercel.app)
- **GitHub Repository**: [https://github.com/Ashwin-Khowala/rnblocks](https://github.com/Ashwin-Khowala/rnblocks)

---

## 📄 License

MIT © [Ashwin Khowala](https://github.com/Ashwin-Khowala)
