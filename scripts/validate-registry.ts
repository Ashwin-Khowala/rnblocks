import fs from "node:fs";
import path from "node:path";
import { RegistryItemSchema } from "../packages/registry/src/schema";

const REGISTRY_DIR = path.join(process.cwd(), "registry");

const SUSPICIOUS_PATTERNS = [
  { regex: /\beval\s*\(/, label: "eval() call" },
  { regex: /\bXMLHttpRequest\b/, label: "XMLHttpRequest usage" },
  { regex: /require\s*\(\s*["']child_process["']\s*\)/, label: "child_process execution" },
  { regex: /\bnew\s+Function\s*\(/, label: "Function constructor" },
];

function validateRegistry() {
  console.log("Validating RNBlocks Registry at:", REGISTRY_DIR);

  let errorCount = 0;
  let warningCount = 0;
  let totalChecked = 0;

  const seenNames = new Map<string, string>();

  for (const type of ["blocks", "screens"] as const) {
    const typeDir = path.join(REGISTRY_DIR, type);
    if (!fs.existsSync(typeDir)) continue;

    const subdirs = fs
      .readdirSync(typeDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const slug of subdirs) {
      totalChecked++;
      const itemDir = path.join(typeDir, slug);
      const metaPath = path.join(itemDir, "registry.json");

      if (!fs.existsSync(metaPath)) {
        console.error(`[ERROR] [${type}/${slug}] Missing registry.json`);
        errorCount++;
        continue;
      }

      try {
        const raw = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
        const parsed = RegistryItemSchema.safeParse(raw);

        if (!parsed.success) {
          console.error(`[ERROR] [${type}/${slug}] Schema validation failed:`);
          for (const issue of parsed.error.issues) {
            console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
          }
          errorCount++;
          continue;
        }

        // Verify that slug matches name
        if (parsed.data.name !== slug) {
          console.error(
            `[ERROR] [${type}/${slug}] Directory name "${slug}" does not match item name "${parsed.data.name}"`
          );
          errorCount++;
        }

        // Duplicate name detection across registry
        if (seenNames.has(parsed.data.name)) {
          console.error(
            `[ERROR] [${type}/${slug}] Duplicate item name detected: "${parsed.data.name}" already used in "${seenNames.get(parsed.data.name)}"`
          );
          errorCount++;
        } else {
          seenNames.set(parsed.data.name, `${type}/${slug}`);
        }

        // Validate tags formatting
        if (parsed.data.tags) {
          for (const tag of parsed.data.tags) {
            if (tag !== tag.toLowerCase() || tag.trim() !== tag) {
              console.error(
                `[ERROR] [${type}/${slug}] Tag "${tag}" must be lowercase with no leading or trailing whitespace.`
              );
              errorCount++;
            }
          }
        }

        // Verify each file physically exists and scan for suspicious patterns
        for (const file of parsed.data.files) {
          const filePath = path.join(itemDir, file.path);
          if (!fs.existsSync(filePath)) {
            console.error(
              `[ERROR] [${type}/${slug}] Referenced file not found: ${file.path}`
            );
            errorCount++;
          } else {
            const stat = fs.statSync(filePath);
            if (stat.size === 0) {
              console.error(
                `[ERROR] [${type}/${slug}] Referenced file is empty: ${file.path}`
              );
              errorCount++;
            } else {
              const content = fs.readFileSync(filePath, "utf-8");
              // Scan for imports: validate internal sibling files and external dependencies
              const importMatches = content.matchAll(
                /(?:import|from)\s+['"]([^'"]+)['"]/g
              );
              const declaredDeps = new Set(parsed.data.dependencies || []);
              for (const match of importMatches) {
                const importPkg = match[1];

                if (importPkg.startsWith(".")) {
                  // Internal relative import: verify target exists and is registered in registry.json
                  const candidateDir = path.dirname(filePath);
                  const resolvedBase = path.resolve(candidateDir, importPkg);
                  const extensions = ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx"];
                  let resolvedFile: string | null = null;
                  for (const ext of extensions) {
                    const candidate = resolvedBase + ext;
                    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
                      resolvedFile = candidate;
                      break;
                    }
                  }

                  if (!resolvedFile) {
                    console.error(
                      `[ERROR] [${type}/${slug}] File ${file.path} imports sibling "${importPkg}", but the target file does not exist.`
                    );
                    errorCount++;
                  } else {
                    const relToItem = path.relative(itemDir, resolvedFile).replace(/\\/g, "/");
                    const isRegistered = parsed.data.files.some(
                      (f) => f.path.replace(/\\/g, "/") === relToItem
                    );
                    if (!isRegistered) {
                      console.error(
                        `[ERROR] [${type}/${slug}] File ${file.path} imports "${importPkg}" (${relToItem}), but it is not listed in registry.json "files" array.`
                      );
                      errorCount++;
                    }
                  }
                  continue;
                }

                if (
                  importPkg === "react" ||
                  importPkg === "react-native" ||
                  importPkg.startsWith("react/") ||
                  importPkg.startsWith("react-native/") ||
                  importPkg.startsWith("node:")
                ) {
                  continue;
                }
                const basePkg = importPkg.startsWith("@")
                  ? importPkg.split("/").slice(0, 2).join("/")
                  : importPkg.split("/")[0];
                if (!declaredDeps.has(basePkg) && !declaredDeps.has(importPkg)) {
                  console.error(
                    `[ERROR] [${type}/${slug}] File ${file.path} imports "${importPkg}" but "${basePkg}" is not declared in registry.json dependencies`
                  );
                  errorCount++;
                }
              }

              for (const check of SUSPICIOUS_PATTERNS) {
                if (check.regex.test(content)) {
                  console.warn(
                    `[WARN] [${type}/${slug}] Flagged pattern in ${file.path}: ${check.label} (requires manual security review before merge)`
                  );
                  warningCount++;
                }
              }
            }
          }
        }

        console.log(`[OK] [${type}/${slug}] Validated successfully`);
      } catch (err) {
        console.error(`[ERROR] [${type}/${slug}] JSON syntax error:`, err);
        errorCount++;
      }
    }
  }

  console.log(`\nRegistry validation summary: ${totalChecked} items checked.`);
  if (warningCount > 0) {
    console.warn(`[NOTICE] ${warningCount} warnings flagged for maintainer review.`);
  }

  if (errorCount > 0) {
    console.error(`[FAIL] Validation failed with ${errorCount} errors.`);
    process.exit(1);
  } else {
    console.log(`[SUCCESS] All registry items passed validation.`);
  }
}

validateRegistry();
