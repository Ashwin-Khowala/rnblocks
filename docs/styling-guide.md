# Styling & Customization Guide

RNBlocks is engineered around a simple philosophy: **copy → own → customize**.

Unlike heavy UI libraries that impose runtime context providers, design token engines, or specific CSS-in-JS abstractions, every RNBlocks component is authored using standard React Native `StyleSheet.create` primitives.

This ensures:
- **Zero runtime overhead**: No runtime styling engine, context overhead, or build-time plugin requirements.
- **Universal compatibility**: Works seamlessly in Expo (SDK 52+), bare React Native (0.76+ New Architecture), and React Native Web.
- **Direct code ownership**: You can edit styles, swap tokens, or convert components to your preferred styling library in seconds.

---

## 1. Top-Level Color Palettes

Every RNBlocks component exposes its color palettes as readable constants at the top of the component file:

```tsx
const COLORS_DARK = {
  background: "#0D0D10",
  surface: "#141418",
  border: "rgba(255, 255, 255, 0.08)",
  textPrimary: "#F3F4F6",
  textSecondary: "#9CA3AF",
  accent: "#32C798",
};

const COLORS_LIGHT = {
  background: "#FFFFFF",
  surface: "#F8FAFC",
  border: "rgba(0, 0, 0, 0.08)",
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
  accent: "#10B981",
};
```

### Customizing to Your Brand

To align a block with your app's brand palette:
1. Open the copied component file in your `components/` folder.
2. Edit the color hex values in `COLORS_DARK` or `COLORS_LIGHT`.
3. Alternatively, replace the constants with imports from your app's existing design token system.

---

## 2. Dynamic Theme Resolution

Components accept an optional `theme` prop (`"dark" | "light"`) and can seamlessly hook into React Native's native `useColorScheme`:

```tsx
import { useColorScheme } from "react-native";
import { FloatingDocker } from "@/components/rnblocks/floating-docker";

export function AppNavigation() {
  const colorScheme = useColorScheme();
  const activeTheme = colorScheme === "dark" ? "dark" : "light";

  return <FloatingDocker theme={activeTheme} />;
}
```

No root `ThemeProvider` wrapper is required anywhere in your app tree.

---

## 3. Adapting to NativeWind (Tailwind CSS)

If your project uses [NativeWind v4](https://www.nativewind.dev/), you can convert any RNBlocks component to utility classes after installing:

### Before (Standard StyleSheet)
```tsx
<TouchableOpacity
  style={[
    styles.socialBtn,
    { backgroundColor: colors.appleBg, borderColor: colors.appleBorder }
  ]}
  onPress={handlePress}
>
  <Text style={[styles.btnText, { color: colors.appleText }]}>
    Continue with Apple
  </Text>
</TouchableOpacity>
```

### After (NativeWind v4)
```tsx
<TouchableOpacity
  className="w-full h-12 rounded-xl flex-row items-center justify-center gap-2.5 px-4 border bg-white dark:bg-black border-slate-200 dark:border-zinc-800"
  onPress={handlePress}
>
  <Text className="text-sm font-semibold text-black dark:text-white">
    Continue with Apple
  </Text>
</TouchableOpacity>
```

Because you own the source code, converting styles is a one-time change with zero lock-in.

---

## 4. Layout Architecture & Fluid Sizing

To prevent layout breakage across varying screen dimensions and orientations, RNBlocks adheres to strict layout rules:

### Fluid Widths Over Rigid Dimensions
- **Good**: `width: "100%"`, `maxWidth: 400`, `alignSelf: "center"`
- **Avoid**: Hardcoded device widths such as `width: 390` or `width: 414` (which break on smaller devices like the iPhone SE or larger tablets).

### Standard Spacing Tokens
Layouts employ standard mobile design intervals (e.g. 4, 8, 12, 16, 20, 24, 32) for padding, margins, and border radii to ensure visual harmony across components.

### Safe Area Respect
Sticky and floating navigation components accept top or bottom offset props, allowing easy integration with `react-native-safe-area-context`:

```tsx
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function MyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <FloatingDocker
      containerStyle={{ bottom: insets.bottom + 16 }}
    />
  );
}
```

---

## 5. Animation Primitives

Interactive blocks rely on React Native's built-in `Animated` API with `useNativeDriver: true` for 60–120 FPS transitions on the native UI thread, ensuring optimal performance on both high-end and budget devices.
