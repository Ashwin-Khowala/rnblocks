# Getting Started with RNBlocks

RNBlocks is an open-source UI component registry designed for React Native and Expo. Unlike traditional UI libraries distributed as compiled npm packages, RNBlocks provides standalone source code that you copy directly into your project.

---

## Core Principles

- **Source Code Ownership**: When you add a block, the complete TypeScript source code is written directly to your project. You own the code, inspect every line, and customize styles or behavior without waiting for upstream library updates.
- **Zero Runtime Baggage**: RNBlocks does not require a root `ThemeProvider`, context wrapper, or runtime CSS-in-JS engine. Components render immediately with standard React Native primitives.
- **Universal Mobile Compatibility**: All blocks are built with standard `StyleSheet.create` and tested across Expo (SDK 52+) and bare React Native CLI projects (0.78+).
- **Easy Customization**: Semantic color palettes are exposed as top-level constants at the start of each component file, making brand customization straightforward.

---

## Quick Start

### Using the CLI (Recommended)

To install a block, run the `rnblocks` CLI in your project root:

```bash
npx rnblocks add floating-docker
```

The CLI executes the following steps automatically:
1. Fetches the block metadata and source code from the registry.
2. Identifies any required peer dependencies (e.g. `lucide-react-native`, `react-native-svg`).
3. Writes clean TypeScript code into `components/rnblocks/floating-docker.tsx` (or your preferred target folder).
4. Prints instructions for importing and using the component.

### Manual Copying from the Web Registry

You can also browse blocks on the web at [rnblocks.vercel.app/blocks](https://rnblocks.vercel.app/blocks). Inspect live previews in dark or light mode, inspect the source code, and copy the TypeScript file directly into your codebase.

---

## Example Usage

After adding a component such as `floating-docker`, import and use it in your screen or navigation layout:

```tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FloatingDocker from "./components/rnblocks/floating-docker";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <View style={styles.container}>
      <FloatingDocker
        activeTab={activeTab}
        onTabPress={(tabId) => setActiveTab(tabId)}
        theme="dark"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
    justifyContent: "flex-end",
  },
});
```

---

## Adapting to NativeWind or Other Styling Solutions

Because you own the component source, migrating any block to Tailwind CSS / NativeWind is simple:
1. Replace `style={styles.container}` with your desired `className="w-full rounded-2xl bg-zinc-900 p-4"`.
2. Remove the `StyleSheet.create` block at the bottom of the file.
3. Keep the same props and state logic intact.
