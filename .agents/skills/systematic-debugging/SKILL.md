---
name: systematic-debugging
description: Four-phase root-cause debugging methodology for React Native, Next.js hydration, SVG transforms, and gesture scrubbing bugs.
---

# Systematic Debugging Skill (`systematic-debugging`)

Use this skill whenever investigating bugs, runtime crashes, hydration errors, gesture lag, or visual regressions.

Inspired by systematic debugging standards in `agentic-awesome-skills`.

---

## The 4-Phase Debugging Methodology

### Phase 1: Root Cause Analysis (No Guesswork)
1. **Identify the exact failure mechanism**:
   - Is it a native crash (e.g. DOM `<svg>` tag on iOS/Android)?
   - Is it a TypeScript interface error?
   - Is it a runtime React warning (`collapsable={false}`, state update during render)?
   - Is it a 60fps frame drop during continuous gesture scrubbing?
   - Is it Next.js SSR hydration mismatch?
2. **Isolate the boundary**:
   - Check error logs, stack traces, and component boundary.
   - Do NOT immediately change code before finding the exact root cause.

---

### Phase 2: Minimal Reproduction
1. Reproduce the bug in the simplest isolated environment:
   - For native issues: `pnpm validate:native`
   - For registry issues: `pnpm validate:all`
   - For web/hydration issues: test specific block page at `http://localhost:3000/blocks/<slug>`
2. Verify you can trigger the failure deterministically.

---

### Phase 3: Surgical Minimal Fix
1. Apply the most targeted, minimal fix that addresses the root cause without side effects.
2. **Common Fix Patterns in RNBlocks**:
   - *DOM tag leak*: Replace raw `<svg>`/`<path>` with `react-native-svg` `<Svg>`/`<Path>`.
   - *Jittery scrubbing*: Switch from `Animated.spring` to direct `Animated.Value.setValue` or decoupled pointer tracking with `.measure()` + `pageX`.
   - *State update during render*: Move side effects to `useEffect` or pure inline derivation.
   - *SSR Hydration mismatch*: Ensure random IDs, timestamps, or client-only values use deterministic fallbacks on the initial server render.

---

### Phase 4: Multi-Platform Verification
1. Run automated checks:
   ```bash
   pnpm validate:all
   pnpm typecheck
   ```
2. Test both platforms:
   - Web preview at `http://localhost:3000/blocks/<slug>` (in dark and light modes).
   - Verify on mobile viewports (375px iPhone SE mode).
3. Ensure no regressions were introduced into sibling components.
