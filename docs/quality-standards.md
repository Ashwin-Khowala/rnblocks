# Quality Standards

RNBlocks maintains high standards for every contributed component. Each block and screen in the registry must satisfy this 6-part quality checklist before inclusion.

---

## 1. Functionality

- **Universal Mobile Support**: Components must render properly across iOS, Android, and Web in both Expo SDK and React Native CLI workflows.
- **Strict TypeScript**: All props, callback signatures, and internal states must have explicit TypeScript types. Never use `any`.
- **Complete State Handling**: Where applicable, components must cleanly render all necessary states: active, pressed, disabled, loading, and empty data states.
- **Minimal Dependencies**: Components should rely on standard React Native primitives. Only declare necessary, established open-source peer dependencies (such as `lucide-react-native` or `react-native-svg`).

---

## 2. Layout & Responsiveness

- **Container-Relative Sizing**: Always use `width: "100%"`, `flex: 1`, or flexbox alignments. Components must naturally adapt to whatever container, sheet, or screen they are embedded in.
- **Multi-Device Testing**: Visually test layouts across compact viewports (320pt, e.g. iPhone SE), standard modern devices (375pt-390pt), and larger displays (428pt+ or tablets).
- **No Hardcoded Viewport Assumptions**: Hardcoded screen assumptions (e.g. `width: 390`) are strictly prohibited because they break responsiveness on different devices.
- **Text & Overflow Safety**: Test with varying string lengths to ensure labels and descriptions wrap gracefully without clipping or overlapping.

---

## 3. Styling & Theming

- **StyleSheet Baseline**: Use standard React Native `StyleSheet.create`. Avoid external CSS-in-JS abstractions or mandatory theme providers.
- **Semantic Color Palettes**: Group color tokens into top-level semantic constants (`COLORS_DARK` and `COLORS_LIGHT`) at the beginning of the file. This allows developers to adjust the color scheme easily upon copying.
- **Optional Theme Prop**: Components supporting both light and dark modes should accept an optional `theme?: "dark" | "light"` prop (defaulting to `"dark"`), selecting the appropriate color object dynamically.
- **Pragmatic Values**: Sensible fixed design values for typography (`fontSize: 14`), spacing (`padding: 16`), borders (`borderRadius: 12`), and touch targets (`height: 48`) are expected and preferred over complex token abstractions.

---

## 4. Accessibility

- **Semantic Roles**: Pressable and interactive elements must declare an appropriate `accessibilityRole` (e.g. `"button"`, `"tab"`, `"link"`).
- **Descriptive Labels**: Icons and visual triggers lacking visible text must declare an `accessibilityLabel` describing the action.
- **Touch Target Sizing**: Ensure interactive touch targets meet the recommended 44x44pt minimum for comfortable thumb interaction.
- **Contrast**: Maintain sufficient contrast ratio between text, borders, and background surfaces across both dark and light modes.

---

## 5. Performance

- **Render Optimization**: Avoid expensive object or array instantiations directly inside render functions. Memoize complex calculations with `useMemo` and callbacks with `useCallback` where appropriate.
- **Animation Execution**: Run animations on the native UI thread using React Native's built-in `Animated` API with `useNativeDriver: true`, or React Native Reanimated.
- **List Virtualization**: Large datasets must use `FlatList` or `SectionList` with sensible `keyExtractor` and `getItemLayout` definitions.

---

## 6. Registry Manifest

- **Schema Conformance**: The component's `registry.json` must validate against `RegistryItemSchema` using `pnpm run validate:registry`.
- **Accurate Metadata**: Provide concise, descriptive titles, descriptions, and categories.
- **Searchable Tags**: Include relevant lowercase keywords in the `tags` array (e.g. `["navigation", "dock", "animated"]`).
- **Explicit Dependencies**: Every external package imported in the component must be declared under `dependencies` in `registry.json`.
