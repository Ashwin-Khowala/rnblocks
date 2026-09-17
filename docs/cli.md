# RNBlocks CLI Reference

The `@rnblocks/cli` package allows developers to explore, resolve, and install components from the RNBlocks registry directly into React Native and Expo applications.

---

## Invocation

You do not need to install the CLI globally. Execute commands using `npx`:

```bash
npx @rnblocks/cli <command> [options]
```

Or install it globally if preferred:

```bash
npm install -g @rnblocks/cli
rnblocks --version
```

---

## Commands

### `add <block-name>`

Downloads and places the specified block or screen into your local project directory:

```bash
npx @rnblocks/cli add floating-docker
```

#### Options:

| Option | Shorthand | Description | Default |
|---|---|---|---|
| `--path <dir>` | `-p <dir>` | Target directory for generated component files | `components/rnblocks` (blocks) or `screens` (screens) |
| `--overwrite` | `-o` | Overwrites destination files if they already exist on disk | `false` |
| `--yes` | `-y` | Skips interactive prompts | `false` |

#### Examples:

```bash
# Add to custom components folder
npx @rnblocks/cli add trend-chart --path src/components/charts

# Overwrite an existing component with latest registry version
npx @rnblocks/cli add interactive-calendar --overwrite
```

---

### `list`

Lists all available blocks and screens currently published in the RNBlocks registry, along with their categories and authors:

```bash
npx @rnblocks/cli list
```

#### Output:

```
RNBlocks Registry — Available Components

Blocks:
  floating-docker          Floating Glassmorphic Docker         by Ashwin Khowala
  interactive-calendar     Interactive Calendar                 by Ashwin Khowala
  social-auth-buttons      Social OAuth Authentication Buttons  by Ashwin Khowala
  trend-chart              SVG Gradient Area Trend Line Chart   by Ashwin Khowala

Install any component with:
  npx @rnblocks/cli add <name>
```

---

### `init`

Scaffolds initial project configuration for RNBlocks, establishing target component directory preferences:

```bash
npx @rnblocks/cli init
```

---

## Dependency Resolution

When a component relies on peer dependencies (such as vector icons or SVG engines), the CLI checks your project environment and displays copy-paste commands tailored to your setup:

- For **Expo** projects:
  ```bash
  npx expo install lucide-react-native
  ```
- For standard **React Native CLI** projects:
  ```bash
  npm install lucide-react-native
  ```
