## Description

Describe the changes in this pull request and what problem it solves.

---

## Contribution Type

- [ ] New Block (`registry/blocks/<slug>`)
- [ ] New Screen (`registry/screens/<slug>`)
- [ ] Block / Screen bug fix or enhancement
- [ ] CLI feature or fix (`packages/cli`)
- [ ] Registry schema or tooling (`packages/registry`, `scripts/`)
- [ ] Web app or docs improvement (`apps/web`, `apps/docs`)
- [ ] Documentation only

---

## Component Details (If submitting a Block or Screen)

- **Name / Slug**:
- **Title**:
- **Category**:
- **Frameworks Supported**:
  - [ ] Expo
  - [ ] React Native CLI
- **Platforms Tested**:
  - [ ] iOS (Simulator or physical device)
  - [ ] Android (Emulator or physical device)
  - [ ] Web

---

## Quality Checklist

Please verify each item before requesting a review:

### Functionality
- [ ] Strict TypeScript definitions for all props with no `any` types.
- [ ] Works cleanly across all declared platforms.
- [ ] Handles edge cases (empty states, loading, long text strings).
- [ ] No unnecessary third-party runtime dependencies.

### Layout & Responsiveness
- [ ] Responsive to container width (`width: "100%"`, `flex: 1`, flexbox).
- [ ] Tested on compact (320pt), standard (375pt-390pt), and large (428pt+) screens.
- [ ] No unexplained layout assumptions or arbitrary fixed screen widths.

### Styling
- [ ] Semantic color constants (`COLORS_DARK` / `COLORS_LIGHT`) at the top of the file.
- [ ] Exposes a `theme?: "dark" | "light"` prop if theming is supported.
- [ ] Built with standard React Native primitives (`StyleSheet.create`).
- [ ] No token bloat or external design-system dependencies.

### Accessibility
- [ ] Interactive elements declare `accessibilityRole` and descriptive `accessibilityLabel`.
- [ ] Touch targets meet minimum touch target recommendations (44x44pt).
- [ ] High contrast between foreground and background elements.

### Performance
- [ ] No expensive computations on render; callbacks and derivations memoized where appropriate.
- [ ] Smooth animations without JS thread bottlenecks.

### Registry & Tooling
- [ ] `registry.json` includes `name`, `title`, `description`, `author`, `tags`, `frameworks`, `platforms`, `files`.
- [ ] All external npm dependencies listed in `dependencies`.
- [ ] `pnpm run validate:registry` passes with zero errors.
- [ ] `pnpm run typecheck` passes with zero errors.
- [ ] Web registry preview verified locally in `apps/web`.

---

## Screenshots / Preview

Attach screenshots, screen recordings, or GIF previews showing the component in action (both light and dark modes where applicable).

---

## Attestation

- [ ] This contribution is my original work (or carries compliant open-source attribution).
- [ ] I agree that my contribution is licensed under the project's [MIT License](LICENSE).
- [ ] No API keys, credentials, unauthorized telemetry, or network tracking are included.
- [ ] I have read and followed the [Contributing Guidelines](CONTRIBUTING.md).
