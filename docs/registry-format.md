# Registry Format Specification

Every block and screen in RNBlocks is accompanied by a `registry.json` file. This document provides the complete schema specification, field definitions, and examples.

---

## Schema Overview

The registry schema is formally defined with Zod in `packages/registry/src/schema.ts`.

```json
{
  "name": "floating-docker",
  "title": "Floating Glassmorphic Docker",
  "description": "An interactive floating bottom dock navigation component with smooth sliding active pill capsule, notification badge indicators, and haptic feedback support.",
  "type": "block",
  "author": {
    "name": "Ashwin Khowala",
    "github": "Ashwin-Khowala"
  },
  "version": "1.0.0",
  "category": "navigation",
  "tags": ["navigation", "tab-bar", "animated", "dock"],
  "files": [
    {
      "path": "files/floating-docker.tsx",
      "type": "registry:component"
    }
  ],
  "dependencies": [],
  "devDependencies": {},
  "registryDependencies": [],
  "platforms": ["ios", "android", "web"],
  "frameworks": ["expo", "react-native"],
  "styling": ["StyleSheet"],
  "themes": ["dark", "light"]
}
```

---

## Field Reference

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `name` | `string` | Yes | - | Kebab-case identifier. Must exactly match the directory name (e.g. `floating-docker`). |
| `title` | `string` | Yes | - | Clean human-readable title shown in web directory and CLI lists. |
| `description` | `string` | Yes | - | Concise description explaining the component's functionality and visual characteristics. |
| `type` | `"block" \| "screen"` | Yes | - | `block` for isolated UI components; `screen` for full page/flow templates. |
| `author` | `string \| { name: string, github?: string }` | Yes | - | Creator attribution. Structured object recommended for proper link attribution. |
| `version` | `string` | No | `"1.0.0"` | Semver release version of the component. |
| `category` | `string` | No | `"general"` | Organizational category (e.g. `navigation`, `authentication`, `analytics`, `data-display`, `forms`). |
| `tags` | `string[]` | No | `[]` | Search and AI discoverability tags. Must be all lowercase strings without whitespace. |
| `files` | `RegistryItemFile[]` | Yes | - | List of source files belonging to this component. At least one file required. |
| `dependencies` | `string[]` | No | `[]` | External npm packages required at runtime (e.g. `["lucide-react-native", "react-native-svg"]`). |
| `devDependencies` | `Record<string, string>` | No | `{}` | Development dependencies (types, etc.). |
| `registryDependencies` | `string[]` | No | `[]` | Other RNBlocks item slugs that this component depends upon. |
| `platforms` | `("ios" \| "android" \| "web")[]` | No | `["ios", "android", "web"]` | Supported runtime platforms where the component has been tested. |
| `frameworks` | `("expo" \| "react-native")[]` | No | `["react-native"]` | Supported frameworks. Most components should support both `expo` and `react-native`. |
| `styling` | `string[]` | No | `["StyleSheet"]` | Styling mechanisms used (e.g. `["StyleSheet"]`, `["NativeWind"]`). |
| `themes` | `("dark" \| "light")[]` | No | - | Declared visual themes supported by the component. |

---

## Files Object

The `files` array defines every file distributed with the component:

```json
"files": [
  {
    "path": "files/floating-docker.tsx",
    "type": "registry:component",
    "target": "components/floating-docker.tsx"
  }
]
```

- **`path`**: Relative path from the component directory to the source file.
- **`type`**: Currently `"registry:component"`.
- **`target`** (optional): Preferred default relative destination inside the user's project.

---

## Validation Rules

The `scripts/validate-registry.ts` script enforces the following checks:
1. Every item must have a valid `registry.json` matching `RegistryItemSchema`.
2. Directory name must strictly match `name`.
3. No duplicate `name` values across all blocks and screens.
4. All referenced files in `files` must exist on disk and cannot be empty.
5. All items in `tags` must be lowercase with no leading or trailing whitespace.
6. Component files are scanned for prohibited patterns (`eval()`, `new Function()`, `child_process`).
