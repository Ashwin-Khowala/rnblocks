# RNBlocks Autonomous Agent System

This directory (`.agents/`) contains the complete agent specification, rules, skills, and subagent architectures governing automated development and pair programming in the **RNBlocks** repository.

---

## Architecture Overview

RNBlocks is an open-source, zero-dependency copy-paste component registry for React Native and Expo (shadcn/ui model), backed by a Next.js 15+ showcase and documentation portal.

To guarantee quality, prevent regressions, and enforce strict safety standards, this agent system operates on 4 layered tiers:

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

## 1. Rules Directory (`.agents/rules/`)

| Rule File | Invariant Enforced |
|---|---|
| [`agent-rules.md`](./rules/agent-rules.md) | Master workspace invariants across code, dependencies, and design. |
| [`git-safety.md`](./rules/git-safety.md) | **Zero-Tolerance**: NEVER auto-commit or auto-push. Feature -> develop -> master (`--no-ff`). |
| [`cross-platform.md`](./rules/cross-platform.md) | No raw HTML/DOM elements. `react-native-svg` primitives only. `PanResponder` `.measure()` + `pageX`. |
| [`motion-contract.md`](./rules/motion-contract.md) | 60fps gesture scrubbing without spring physics. Decoupled pointer tracking. Reduced motion contract. |
| [`ui-aesthetics.md`](./rules/ui-aesthetics.md) | Proportional border radii (anti-pill spam). Mobile hierarchy (375px-1440px). Concise copy. |

---

## 2. Skills Directory (`.agents/skills/`)

Skills follow standard `SKILL.md` format with YAML frontmatter for progressive disclosure:

1. **[`block-authoring`](./skills/block-authoring/SKILL.md)**:
   Authoring self-contained React Native registry blocks with zero runtime dependencies, full dark/light theming, strict TypeScript types, and accessibility.
2. **[`chart-and-motion-engine`](./skills/chart-and-motion-engine/SKILL.md)**:
   Designing and implementing 60fps gesture-driven charts, timelines, and interactive animations in pure React Native using Animated, RAF, and PanResponder.
3. **[`cross-platform-auditor`](./skills/cross-platform-auditor/SKILL.md)**:
   Auditing React Native registry blocks for cross-platform safety, detecting DOM leaks, checking React Native strict types, and dependency alignment.
4. **[`mobile-ui-and-hierarchy`](./skills/mobile-ui-and-hierarchy/SKILL.md)**:
   Reviewing and optimizing UI aesthetics, responsive mobile hierarchy (375px to 1440px), proportional border radii, and anti-bloat copy.
5. **[`git-workflow-guardian`](./skills/git-workflow-guardian/SKILL.md)**:
   Enforcing git safety, branch isolation, develop-to-master merges with `--no-ff`, conventional commit messages, and zero auto-commits.
6. **[`registry-and-cli-ops`](./skills/registry-and-cli-ops/SKILL.md)**:
   Registering blocks, generating the registry schema, syncing web showcase previews, and publishing `@rnblocks/cli`.
7. **[`systematic-debugging`](./skills/systematic-debugging/SKILL.md)**:
   Four-phase root-cause debugging methodology for React Native, Next.js hydration, SVG transforms, and gesture scrubbing bugs.

---

## 3. Subagents Directory (`.agents/subagents/`)

Specialized personas configured for pair-programming and delegation:

- **`block-architect`**: Authors and refactors pure React Native components in `registry/blocks/`.
- **`cross-platform-auditor`**: Audits blocks against native crashes, DOM leaks, and dependency mismatches.
- **`motion-perf-specialist`**: Implements 60fps gesture scrubbing, rolling numbers, and motion contracts.
- **`web-showcase-engineer`**: Maintains Next.js 15+ showcase, Tailwind CSS styling, responsive layouts, and docs.
- **`git-guardian`**: Enforces git branching, commit hygiene, and prevents unprompted commits.

---

## 4. Automated Verification Commands

Before proposing or completing any work, run:
```bash
# Full validation suite (agent rules, registry JSON, dependencies, native types)
pnpm validate:all

# Monorepo typecheck across all 7 workspace packages
pnpm typecheck

# Recompile registry metadata when blocks change
pnpm generate:registry
```
