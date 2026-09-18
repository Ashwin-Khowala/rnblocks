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

## 4. Accessibility & Assistive Technology

- **Semantic Roles**: Pressable and interactive elements must declare an appropriate `accessibilityRole` (e.g. `"button"`, `"tab"`, `"link"`, `"header"`).
- **Descriptive Labels**: Icons and visual triggers lacking visible text must declare a concise `accessibilityLabel` describing the purpose or action.
- **Interactive State**: Dynamic elements must communicate their current state using `accessibilityState` (e.g. `{ selected: true }`, `{ disabled: true }`, `{ expanded: false }`). Never conflate state with role or label.
- **Touch Target Sizing**: Interactive touch targets must meet the recommended **44x44pt** minimum. If a visual icon or badge is smaller, pad the touch wrapper (`hitSlop` or container padding) to ensure comfortable thumb activation.
- **Color Contrast**: Maintain sufficient contrast ratio between text, borders, and background surfaces across both dark and light modes (minimum 4.5:1 for normal text, 3:1 for large text).
- **Screen Reader Ergonomics**: Avoid forcing screen reader users (VoiceOver/TalkBack) to swipe through dozens of granular data points sequentially. For complex visualizations (such as charts), provide a high-level container summary (e.g. `accessibilityLabel="Weekly active users chart, ranging from 1,200 to 3,890, trending upward"`).
- **Font Scaling Safety**: Text elements inside containers with fixed pixel heights must set `allowFontScaling={false}` to prevent clipping under large-text accessibility settings, while descriptive paragraph text should wrap and scale gracefully.

---

## 5. Keyboard Interaction & Focus Management

- **Platform-Native Activation**: Standard pressable elements (buttons, links, action cards) must rely on platform-native focus and activation behavior (e.g. Enter/Space on Web/Desktop, tap on mobile). Do not inject unnecessary custom `onKeyDown` listeners into simple buttons where native `Pressable` handles activation out of the box.
- **Visible Focus States**: Sighted keyboard users (on Web, iPad with hardware keyboard, or Desktop) must be able to track active focus. Interactive elements must display a clear, high-contrast focus indicator (e.g. `:focus-visible` outline or `Pressable` `({ focused })` styling).
- **Complex Composite Controls**: 2D controls, date pickers, or composite widgets where keyboard interaction is part of expected desktop UX should implement standard navigation (such as Arrow key navigation: Left/Right for day, Up/Down for week, Enter to select) using platform-safe handlers.
- **Virtual Software Keyboard Handling**: When components contain text inputs, they must properly account for mobile software keyboards by utilizing `KeyboardAvoidingView`, `keyboardShouldPersistTaps="handled"`, and auto-dismissal gestures.

---

## 6. Performance

- **Render Optimization**: Avoid expensive object or array instantiations directly inside render functions. Memoize complex calculations with `useMemo` and callbacks with `useCallback` where appropriate.
- **Animation Execution**: Run animations on the native UI thread using React Native's built-in `Animated` API with `useNativeDriver: true`, or React Native Reanimated.
- **List Virtualization**: Large datasets must use `FlatList` or `SectionList` with sensible `keyExtractor` and `getItemLayout` definitions.

---

## 7. Usage Documentation & Copy-Paste Snippets

- **Copy-Paste Usage Example**: Every block must provide a clear, drop-in usage code example in its documentation and registry entry. Users must be able to copy the snippet directly into a screen without having to reverse-engineer hundreds of lines of source code.
- **Props Table & Types**: All public props, configuration options, and custom data types must be explicitly documented with: Prop Name, Type, Default Value, and Description.
- **Sensible Zero-Config Defaults**: Dropping `<MyBlock />` into a screen with zero required props must render a functional, aesthetic default state rather than throwing runtime errors or rendering blank space.

---

## 8. Registry Manifest

- **Schema Conformance**: The component's `registry.json` must validate against `RegistryItemSchema` using `pnpm run validate:registry`.
- **Accurate Metadata**: Provide concise, descriptive titles, descriptions, and categories.
- **Searchable Tags**: Include relevant lowercase keywords in the `tags` array (e.g. `["navigation", "dock", "animated"]`).
- **Explicit Dependencies**: Every external package imported in the component must be declared under `dependencies` in `registry.json`.
