# RNBlocks Agent System & Quality Assurance Architecture

This document describes the engineering philosophy, behavioral contracts, automated guardrails, and agent skills that protect the RNBlocks codebase against regressions.

---

## Why an Agent System?

RNBlocks is a **copy-paste component registry** (shadcn/ui model) rather than a packaged npm library. This architecture demands high standards:
1. When developers copy code into their projects, **the source code must be pristine, zero-dependency, and work immediately on iOS, Android, and Web**.
2. Any web DOM leaks (`<svg>`, `<div>`, `window`, etc.) immediately crash native mobile apps.
3. Overcomplicated animations or spring physics cause severe 60fps frame drops during touch scrubbing.
4. Unclear branching or accidental git commits destroy working tree review.

To eliminate these issues, RNBlocks implements an **Autonomous Agent System** built on strict rules, progressive skills, specialized subagents, and automated validation gates.

---

## System Architecture

```text
┌────────────────────────────────────────────────────────┐
│                   Layer 1: Rules                       │
│  .agents/rules/*.md  &  AGENTS.md                      │
│  (Zero-Tolerance Git Safety, Pure React Native, etc.)   │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│                   Layer 2: Skills                      │
│  .agents/skills/<skill-name>/SKILL.md                  │
│  (Step-by-step progressive operational playbooks)      │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│                 Layer 3: Subagents                     │
│  .agents/subagents/*.md  (Specialized roles)           │
│  (block-architect, cross-platform-auditor, etc.)       │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│                Layer 4: Automated Gates                │
│  pnpm validate:all (check:agent-rules, native-check)   │
│  (Automated deterministic invariant verification)      │
└────────────────────────────────────────────────────────┘
```

---

## 1. Quality Invariants

### 1. Git Safety
- **NEVER auto-commit or auto-push.** Always leave changes in the working tree for user review.
- Branching workflow: Feature branch -> `develop` (testing/preview) -> `master` via `git merge develop --no-ff`.
- Never use `git rebase` on shared branches.
- Conventional commits, atomic commits, no emojis, no external competitor references.

### 2. Cross-Platform Primitives
- 100% vector SVG using `react-native-svg` primitives (`<Svg>`, `<Path>`, `<Circle>`, `<Line>`, `<Rect>`, `<Defs>`, `<LinearGradient>`, `<Stop>`, `<G>`).
- Zero raw HTML/DOM tags in `registry/blocks/`.
- Native touch handling via `PanResponder` with `.measure()` + `pageX` (never `locationX` alone).
- Web pointer listeners strictly guarded with `Platform.OS === "web"` / `Platform.select({ web: ... })` with `// platform:web-safe`.

### 3. Aesthetics & Mobile Hierarchy
- Proportional border radii (outer cards: `16-24`, buttons: `8-12`). No indiscriminate `rounded-full` pill spam.
- Viewports tested from 375px (iPhone SE) to 1440px (desktop).
- Fixed-dimension text elements specify `allowFontScaling={false}`.
- De-bloated copy: concise subtitles, labels, and stats descriptions.

### 4. 60fps Motion Contract
- Native `Animated` & `requestAnimationFrame` only (no heavy external libraries like `reanimated` in blocks).
- Decoupled gesture scrubbing: never run spring physics during high-frequency dragging.
- Smooth number rolling / ticker transitions.
- Reduced motion support (`useReducedMotion` hook and `reduceMotion` prop).

---

## 2. Automated Quality Gates

Every change must pass the automated gate runner:
```bash
pnpm validate:all
```
This single command executes:
1. `pnpm check:agent-rules`: Scans block files for DOM leaks, hardcoded stats, missing theme tokens, external icon imports, and PanResponder safety.
2. `pnpm validate:registry`: Validates `registry.json` files against the registry schema.
3. `pnpm check:platform-compat`: Analyzes 30+ source files for platform-specific violations.
4. `pnpm validate:deps`: Verifies imported packages match declared registry dependencies.
5. `pnpm validate:native`: Compiles `packages/native-check` with strict React Native compiler options.

Additionally, workspace-wide typing must pass:
```bash
pnpm typecheck
```

---

## 3. Directory Navigation

- Rules: [`.agents/rules/`](../.agents/rules/)
- Skills: [`.agents/skills/`](../.agents/skills/)
- Subagents: [`.agents/subagents/`](../.agents/subagents/)
- Root Contract: [`AGENTS.md`](../AGENTS.md)
