import fs from "node:fs";
import path from "node:path";
import { RegistryItemSchema } from "../packages/registry/src/schema";

const REGISTRY_DIR = path.join(process.cwd(), "registry");

function validateRegistry() {
  console.log("Validating RNBlocks Registry at:", REGISTRY_DIR);

  let errorCount = 0;
  let totalChecked = 0;

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

        // Verify each file physically exists
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
  if (errorCount > 0) {
    console.error(`[FAIL] Validation failed with ${errorCount} errors.`);
    process.exit(1);
  } else {
    console.log(`[SUCCESS] All registry items passed validation.`);
  }
}

validateRegistry();
