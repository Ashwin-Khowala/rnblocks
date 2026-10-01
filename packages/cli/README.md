# @rnblocks/cli

> The Open Source React Native & Expo UI Registry CLI.

Add beautiful, production-ready React Native components and blocks directly into your project with a single command. Just like shadcn/ui, but designed from the ground up for mobile.

[![npm version](https://img.shields.io/npm/v/@rnblocks/cli.svg?style=flat-square&color=32C798)](https://www.npmjs.com/package/@rnblocks/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.74+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2050+-000020?style=flat-square&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## ⚡ Quick Start

You don't need to install this package globally. Run it directly with `npx`:

```bash
# Add a component directly into your React Native or Expo project
npx @rnblocks/cli add <component-name>

# Example: add the interactive grouped bar chart
npx @rnblocks/cli add grouped-bar-chart

# List all available blocks in the registry
npx @rnblocks/cli list
```

---

## 🌟 Why RNBlocks?

- **100% Code Ownership**: Components are copied directly as readable TypeScript source code into your repository (`components/rnblocks/`). You own the code and can edit anything.
- **Zero Runtime Providers**: No mandatory wrapper providers, no `ThemeProvider`, no CSS-in-JS runtime overhead.
- **Universal Mobile Primitives**: Written with pure `StyleSheet.create` and standard `react-native-svg`. Works out of the box with bare React Native, Expo, and React Native Web.
- **Dark & Light Modes**: Pre-configured with sleek, modern dark and light design tokens.
- **New Architecture Ready**: Fully compatible with React Native 0.76+, TurboModules, and the New Architecture.

---

## 📦 Available Components

| Component | Slug | Category | Description | Install Command |
|---|---|---|---|---|
| **Grouped Bar Chart** | `grouped-bar-chart` | Charts & Analytics | Multi-series bar chart with fluid scrub tooltips, rolling numbers, and metric pills. | `npx @rnblocks/cli add grouped-bar-chart` |
| **Interactive Bar Chart** | `bar-chart` | Charts & Analytics | Animated single-series bar chart with custom time intervals and scrub highlighting. | `npx @rnblocks/cli add bar-chart` |
| **SVG Trend Chart** | `trend-chart` | Charts & Analytics | Smooth Bézier spline trend chart with dual-axis touch scrub and rolling percentage badge. | `npx @rnblocks/cli add trend-chart` |
| **Comparison Chart** | `comparison-chart` | Charts & Analytics | Dual-dataset comparison chart with interactive hairline cursor and synchronized metrics. | `npx @rnblocks/cli add comparison-chart` |
| **Exploding Pie Chart** | `pie-chart` | Charts & Analytics | Radial pie chart with multi-slice touch explosion, dynamic legend, and sweep animation. | `npx @rnblocks/cli add pie-chart` |
| **Radial Donut Chart** | `donut-chart` | Charts & Analytics | Circular radial progress donut chart with sweep intro animation and center readout. | `npx @rnblocks/cli add donut-chart` |
| **Interactive Calendar** | `interactive-calendar` | Date & Calendars | Full-month calendar with dot indicators, selected date state, and month navigation. | `npx @rnblocks/cli add interactive-calendar` |
| **Floating Docker** | `floating-docker` | Navigation & Docks | Glassmorphic floating dock with icon magnification physics and smooth micro-animations. | `npx @rnblocks/cli add floating-docker` |
| **Social OAuth Buttons** | `social-auth-buttons` | Authentication | High-converting social auth buttons (Apple, Google, GitHub) with native press feedback. | `npx @rnblocks/cli add social-auth-buttons` |

---

## 🛠️ CLI Commands & Options

### `add <name>`

Fetches the component and all associated multi-file modules from the registry and places them in your project:

```bash
npx @rnblocks/cli add <name> [options]
```

#### Flags & Options

| Option | Flag | Description | Default |
|---|---|---|---|
| `--path <dir>` | `-p` | Custom destination directory for the component files | `components/rnblocks` |
| `--overwrite` | `-o` | Automatically overwrite existing files without prompting | `false` |
| `--yes` | `-y` | Skip all interactive confirmation prompts | `false` |

#### Examples

```bash
# Add to default directory (components/rnblocks/grouped-bar-chart/)
npx @rnblocks/cli add grouped-bar-chart

# Add to a custom directory
npx @rnblocks/cli add trend-chart --path src/components/analytics

# Overwrite existing installation with the latest version
npx @rnblocks/cli add pie-chart --overwrite --yes
```

---

### `list`

Inspects the live registry and prints all available blocks, authors, categories, and one-click install commands:

```bash
npx @rnblocks/cli list
```

---

## 📋 Compatibility

- **Expo**: SDK 50, SDK 51, SDK 52+
- **Bare React Native**: 0.74+, 0.75+, 0.76+ (Old and New Architecture)
- **Web**: React Native Web 0.19+ / Next.js
- **TypeScript**: 5.0+

---

## 🌐 Web Registry & Interactive Previews

Test and interact with live versions of every component in your browser:

- **Web Registry**: [https://rnblocks.vercel.app/blocks](https://rnblocks.vercel.app/blocks)
- **Documentation**: [https://rnblocks.vercel.app/docs](https://rnblocks.vercel.app/docs)
- **GitHub Repository**: [https://github.com/Ashwin-Khowala/rnblocks](https://github.com/Ashwin-Khowala/rnblocks)

---

## 📄 License

MIT © [Ashwin Khowala](https://github.com/Ashwin-Khowala)
