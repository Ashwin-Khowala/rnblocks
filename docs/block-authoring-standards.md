# RNBlocks — Block Authoring Standards

> **Purpose**: Prevent the class of bugs that broke `trend-chart` across an entire session.
> Every item below maps to a real regression we shipped and then had to fix.

---

## 1. Cross-Platform Safety (P0 — will crash on native)

### 1.1  Never use raw DOM APIs without a platform guard
DOM APIs (`addEventListener`, `removeEventListener`, `getBoundingClientRect`, `document`, `window`) do not exist on iOS/Android. Using them unconditionally causes a silent crash on native.

**Rule:** Wrap every DOM call in `Platform.OS === "web"` or `Platform.select({ web: …, default: {} })`. The `useEffect` that attaches DOM listeners must also return early on native.

```tsx
// ✅ Correct — gated
useEffect(() => {
  if (Platform.OS !== "web") return;
  const node = ref.current as any;
  node?.addEventListener("pointermove", handler); // platform:web-safe
  return () => node?.removeEventListener("pointermove", handler);
}, [handler]);

// ❌ Wrong — crashes on native
useEffect(() => {
  ref.current?.addEventListener("pointermove", handler);
}, []);
```

Add the comment `// platform:web-safe` on every line that calls a DOM API. The `check-platform-compat.ts` script scans for this comment; any DOM call without it will be flagged as a violation.

### 1.2  Use `react-native-svg` primitives, not raw SVG DOM tags
Inside any `.tsx` that targets React Native, SVG must come from `react-native-svg`. Raw `<svg>`, `<path>`, `<line>` etc. are DOM tags and are unknown to the RN renderer.

```tsx
// ✅ Correct
import Svg, { Path, Line, G, Rect } from "react-native-svg";

// ❌ Wrong — will throw on native
<svg viewBox="0 0 400 150">
  <path d={linePath} />
</svg>
```

### 1.3  Use the RN Responder System for touch, not DOM pointer events
On native there are no `onPointerMove` / `onPointerDown` props. Use:
- `onStartShouldSetResponder`, `onMoveShouldSetResponder`
- `onResponderGrant`, `onResponderMove`, `onResponderRelease`, `onResponderTerminate`
- `onTouchStart`, `onTouchMove`, `onTouchEnd`, `onTouchCancel`

Web-only pointer props (`onPointerDown`, `onPointerMove`, `onPointerLeave`) may be added **only** via `Platform.select({ web: { … }, default: {} })`.

---

## 2. Registry Metadata (P0 — will fail `npx rnblocks add <block>` for consumers)

### 2.1  `registry.json` must declare every native dependency
If a block imports a native module (anything that has a native `.podspec` or `build.gradle`), it **must** be listed in `"dependencies"` in the block's `registry.json`. The `validate:deps` script enforces this automatically — but only for packages already in `package.json`. Do not rely on implicit transitive installs.

```json
// ✅ trend-chart/registry.json
{
  "dependencies": ["react-native-svg"]
}

// ❌ — consumer gets a red import after `npx rnblocks add trend-chart`
{
  "dependencies": []
}
```

**Checklist when adding a new import to a block:**
1. Does the package ship native code? → add to `registry.json` `dependencies`.
2. Run `pnpm validate:deps` locally before every commit.

---

## 3. Text & Accessibility (P1 — breaks on real user devices)

### 3.1  `allowFontScaling={false}` on pixel-math-dependent Text nodes
Any `Text` whose parent has a fixed pixel height (slot-based odometer, day badge, indicator) **must** set `allowFontScaling={false}`. Without it, iOS/Android large-text accessibility settings make the text taller than its container and clip it visually.

```tsx
// ✅ Safe
<Text allowFontScaling={false} style={{ fontSize: 24, lineHeight: 32 }}>
  {digit}
</Text>

// ❌ Will clip on large-text devices
<Text style={{ fontSize: 24, lineHeight: 32 }}>{digit}</Text>
```

**Rule of thumb:** If you set a numeric `height` on the parent `View` *and* render a `Text` inside it, add `allowFontScaling={false}` to that `Text`.

### 3.2  Do not assign `accessibilityRole="button"` to non-interactive views
`pointerEvents="none"` renders a view unpressable. Announcing it as a `"button"` to screen readers is misleading — VoiceOver/TalkBack will navigate to it and read "button" but activating it does nothing.

```tsx
// ✅ Correct — read-only label, no role
<View accessibilityLabel={`${point.label}: ${point.value}`} />

// ❌ Lies to screen readers
<View
  accessibilityRole="button"
  accessibilityLabel={`${point.label}: ${point.value}`}
  pointerEvents="none"
/>
```

---

## 4. Number Formatting (P1 — silent data corruption on non-EN locales)

### 4.1  Always pin a locale when calling `toLocaleString()`
`Number.prototype.toLocaleString()` with no argument uses the device locale. A device set to `de-DE` returns `"1.200"` (dot as thousands separator), `"fr-FR"` returns `"1 200"` (space). If your rendering code then splits on `","` to find the separator, it silently produces wrong output (renders `NaN` → `0` in an odometer slot).

```tsx
// ✅ Always explicit
const formatted = Math.round(value).toLocaleString("en-US"); // always ","

// ❌ Device-locale dependent
const formatted = value.toLocaleString();
```

---

## 5. Layout Resilience (P2 — overflow on narrow devices / large values)

### 5.1  Add `flexShrink` to any fixed-slot container that grows with data
A rolling-number display with 7+ digit slots at `width: 16px` each can overflow a narrow card. The parent row must be able to compress it.

```tsx
// ✅
rollingNumber: {
  flexDirection: "row",
  overflow: "hidden",
  flexShrink: 1,    // compress before overflowing the card
  maxWidth: "100%",
},
```

### 5.2  Support negative values in chart baselines
Don't hardcode `minVal = 0`. If a consumer passes negative trend data (debt metrics, temperature below 0°C, stock drawdowns), a `0` floor causes all negative points to plot below the drawable area and get silently clipped by `overflow: hidden`. Compute min from actual data:

```tsx
const rawMin = Math.min(...values, 0); // include 0 so upward baseline is always shown
const rawMax = Math.max(...values);
const range = rawMax - rawMin || 1;
const maxVal = rawMax + range * 0.05; // 5% headroom above peak
const minVal = rawMin;
```

---

## 6. Data Integrity (P2 — misleading UI for any custom data)

### 6.1  Never hardcode demo values into display logic
Any constant that makes the idle/default state look good in the demo but is wrong for real consumer data is a bug waiting to be filed. Examples:
- `defaultGrowthPct = 18.4` — this is a lie when `data` produces a different last-point delta.
- `totalValue` shown while the day badge says "SUN" — the two elements describe different things.

**Rule:** The UI's number, badge, and percentage must always refer to the *same data point*. If the idle state shows the last point, all three elements show the last point's value/label/delta. Decide on one semantic model and apply it consistently.

---

## 7. Validation Gates (must pass before every PR)

```sh
pnpm generate:registry   # re-generate from source
pnpm validate:all        # runs validate:registry, validate:deps, validate:native
```

`validate:native` runs `tsc --noEmit` against a strict `tsconfig` that targets React Native types. Any DOM-type leak (e.g. accessing `.getBoundingClientRect` without a platform guard) will produce a type error here.

These three commands are the minimum bar. They do not replace testing on a real device — always sanity-check interactive components on at least one physical iOS or Android device before publishing to the registry.

---

## 8. PR Checklist

Before opening a PR that touches a registry block:

- [ ] `pnpm generate:registry` run and generated files committed
- [ ] `pnpm validate:all` passes with exit code 0
- [ ] Every new native dependency is listed in `registry.json` `"dependencies"`
- [ ] Every DOM API call has a `Platform.OS === "web"` guard **and** a `// platform:web-safe` comment
- [ ] Every fixed-height `Text` inside a slot has `allowFontScaling={false}`
- [ ] `toLocaleString` calls pin `"en-US"` locale
- [ ] No `accessibilityRole="button"` on `pointerEvents="none"` views
- [ ] Displayed numbers, badges, and percentages all describe the same data point
- [ ] Chart supports negative input values without clipping
