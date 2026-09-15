/**
 * validate-dependencies.ts
 *
 * Enforces the dependency contract:
 * Every external import used in a registry block source file must be
 * declared in that block's registry.json "dependencies" array.
 *
 * Gives consumers a reliable installation contract:
 *   source import → registry.json dependency → CLI knows to install it
 *
 * Run: pnpm validate:deps
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const REGISTRY_DIR = path.join(ROOT, "registry");

// Packages that are implicit peer dependencies and should not be listed in
// block-level "dependencies" (they are assumed by the React Native project itself).
const IMPLICIT_PEERS = new Set([
  "react",
  "react-native",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
]);

// Regex to capture all import/require sources from a TypeScript/JavaScript file.
const IMPORT_REGEX = /(?:import|from)\s+["']([^"'.][^"']*?)["']/g;

function extractImportedPackages(source: string): Set<string> {
  const packages = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = IMPORT_REGEX.exec(source)) !== null) {
    const raw = match[1];
    // Resolve package name (strip sub-path, e.g. "react-native-svg/src/xml" → "react-native-svg")
    const parts = raw.split("/");
    const pkgName = raw.startsWith("@") ? `${parts[0]}/${parts[1]}` : parts[0];
    if (!pkgName.startsWith(".") && pkgName.length > 0) {
      packages.add(pkgName);
    }
  }
  return packages;
}

function validateDependencies() {
  console.log("Validating registry block dependencies...\n");

  let errorCount = 0;
  let checkedBlocks = 0;

  for (const type of ["blocks", "screens"] as const) {
    const typeDir = path.join(REGISTRY_DIR, type);
    if (!fs.existsSync(typeDir)) continue;

    const slugs = fs
      .readdirSync(typeDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const slug of slugs) {
      const slugDir = path.join(typeDir, slug);
      const metaPath = path.join(slugDir, "registry.json");
      if (!fs.existsSync(metaPath)) continue;

      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      const declaredDeps: string[] = meta.dependencies ?? [];

      const filesDir = path.join(slugDir, "files");
      if (!fs.existsSync(filesDir)) continue;

      const sourceFiles = fs
        .readdirSync(filesDir)
        .filter((f) => /\.(tsx?|jsx?)$/.test(f))
        .map((f) => path.join(filesDir, f));

      let blockHasErrors = false;

      for (const filePath of sourceFiles) {
        const source = fs.readFileSync(filePath, "utf-8");
        const imported = extractImportedPackages(source);

        for (const pkg of imported) {
          if (IMPLICIT_PEERS.has(pkg)) continue;
          if (declaredDeps.includes(pkg)) continue;

          const rel = path.relative(ROOT, filePath);
          if (!blockHasErrors) {
            console.error(`[FAIL] ${type}/${slug}`);
            blockHasErrors = true;
          }
          console.error(
            `       "${pkg}" is imported in ${path.basename(filePath)} but NOT declared in registry.json "dependencies".`
          );
          errorCount++;
        }
      }

      if (!blockHasErrors) {
        console.log(`[OK]   ${type}/${slug} — dependencies match imports.`);
      }

      checkedBlocks++;
    }
  }

  console.log(`\nDependency validation: ${checkedBlocks} block(s) checked.`);

  if (errorCount > 0) {
    console.error(
      `\n[FAIL] ${errorCount} undeclared dependency(s) found.\n` +
        `       Add them to the block's registry.json "dependencies" array.\n`
    );
    process.exit(1);
  } else {
    console.log("[PASS] All declared dependencies match block imports.\n");
  }
}

validateDependencies();
