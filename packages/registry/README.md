# @rnblocks/registry

> Schema definitions, validation rules, and loader utilities for the RNBlocks registry.

[![npm version](https://img.shields.io/npm/v/@rnblocks/registry.svg?style=flat-square&color=32C798)](https://www.npmjs.com/package/@rnblocks/registry)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

This package contains the core data structures and Zod schema contracts that power [RNBlocks](https://rnblocks.vercel.app) and the [`@rnblocks/cli`](https://www.npmjs.com/package/@rnblocks/cli).

---

## 📦 What's Inside

- **Zod Schemas**: Strict runtime validation schemas for registry manifests, component blocks, metadata, and dependencies.
- **TypeScript Types**: Full type definitions for `RegistryItem`, `BlockManifest`, `DependencyConfig`, and `AuthorConfig`.
- **Validation Utilities**: Automated checks to ensure platform compatibility, mobile compliance, and clean dependency declarations.

---

## 🛠️ Usage

```ts
import { registryItemSchema, type RegistryItem } from "@rnblocks/registry";

// Validate a registry item
const parsedItem = registryItemSchema.parse(rawJsonData);
```

---

## 🌐 Links

- **Website**: [https://rnblocks.vercel.app](https://rnblocks.vercel.app)
- **CLI**: [`@rnblocks/cli`](https://www.npmjs.com/package/@rnblocks/cli)
- **GitHub**: [https://github.com/Ashwin-Khowala/rnblocks](https://github.com/Ashwin-Khowala/rnblocks)

---

## 📄 License

MIT © [Ashwin Khowala](https://github.com/Ashwin-Khowala)
