---
name: registry-and-cli-ops
description: Registering blocks, generating the registry schema, syncing web showcase previews, and publishing @rnblocks/cli.
---

# Registry & CLI Ops Skill (`registry-and-cli-ops`)

Use this skill whenever adding/updating blocks in the registry, recompiling registry files, syncing the Next.js web documentation, or working with `@rnblocks/cli`.

---

## 1. Registry Block Lifecycle

### Adding a New Block
1. Create `registry/blocks/<slug>/files/<slug>.tsx`
2. Create `registry/blocks/<slug>/registry.json`:
   - Must specify: `name`, `type`, `title`, `description`, `category`, `platforms`, `dependencies`, `themes: ["dark", "light"]`, `files`.
3. Register block export in `packages/native-check/src/index.ts`.
4. Run code generator:
   ```bash
   pnpm generate:registry
   ```
   This synchronizes `packages/registry/src/index.ts` and generated registry artifacts.

---

## 2. Web Showcase & Documentation Sync

Whenever a block is added or modified, update `apps/web`:
1. **Block Registry Entry (`apps/web/data/blocks.tsx`)**:
   - Add the live block component to the preview map so it renders in `/blocks` and `/blocks/[slug]`.
2. **Block Docs & Props (`apps/web/data/block-docs.ts`)**:
   - Add drop-in copy-paste snippet.
   - Comprehensive props table: `Prop`, `Type`, `Default`, `Description`.
   - Accessibility feature breakdown.

---

## 3. CLI Publishing Operations (`@rnblocks/cli`)

### Version Bumping
In `packages/cli/package.json`:
- Bump version according to semver (`0.1.x`).
- Ensure `bin` points to `./dist/index.js` or `./bin/index.js`.

### CLI Build & Verification
```bash
# Build CLI
pnpm --filter @rnblocks/cli build

# Test CLI locally
node packages/cli/dist/index.js list
node packages/cli/dist/index.js add <slug> --dry-run
```

### Trusted Publishing (OIDC via GitHub Actions)
- The repo uses GitHub Actions with npm OIDC provenance for publishing `@rnblocks/cli`.
- Releases are triggered via git tags:
  ```bash
  git tag v0.1.x
  git push origin v0.1.x
  ```
