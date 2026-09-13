# Contributing to RNBlocks

Thank you for your interest in contributing to RNBlocks! This guide outlines how to contribute components, report bugs, and propose new features.

---

## Before You Contribute

1. **Avoid Duplicates**: Search `registry/blocks/` and open pull requests before beginning work. If a similar block exists, propose an improvement or variant instead of creating a duplicate.
2. **Propose Complex Work**: For multi-screen flows or full-page templates, open a [Block Proposal](https://github.com/Ashwin-Khowala/rnblocks/issues/new?template=block_proposal.yml) first to discuss architecture with maintainers.
3. **Original Work Only**: All code must be your original creation or permissibly licensed open source with clear attribution. Never submit copyrighted or proprietary UI designs.
4. **No Secrets or Telemetry**: Never commit API keys, access tokens, analytics trackers, or unauthorized network calls.
5. **MIT License Agreement**: By contributing, you agree that your code will be licensed under the project's [MIT License](https://github.com/Ashwin-Khowala/rnblocks/blob/master/LICENSE).

---

## Local Development Setup

### 1. Prerequisites
- **Node.js**: v20 or higher (see `.nvmrc`)
- **pnpm**: v9.0 or higher (`npm install -g pnpm`)
- **Git**

### 2. Clone and Install

```bash
git clone https://github.com/Ashwin-Khowala/rnblocks.git
cd rnblocks
pnpm install
```

### 3. Start Local Environment

```bash
pnpm dev
```

This starts the web registry at `http://localhost:3000`.

---

## Common Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Run web application in development mode |
| `pnpm build` | Build web application and CLI packages |
| `pnpm typecheck` | Run strict TypeScript checks across all packages |
| `pnpm run validate:registry` | Validate registry items against schemas, duplicates, and security checks |
| `pnpm run generate:registry` | Compile `registry.json` and synchronize with web application |

---

## Submitting a Pull Request

1. **Branch Naming**: Use clear branch prefixes:
   - `feat/add-<block-name>` for new components
   - `fix/<issue-name>` for bug fixes
   - `docs/<description>` for documentation updates

2. **Commit Messages**: Follow Conventional Commits:
   ```
   feat: add notification-banner block
   fix: resolve flex overflow in trend-chart on android
   docs: clarify accessibility guidelines
   ```

3. **Verify Locally Before Submitting**:
   ```bash
   pnpm run validate:registry
   pnpm run typecheck
   pnpm run build
   ```

4. **Open Pull Request**: Complete the provided pull request template, attach visual previews or recordings, and check all relevant quality checklist items.
