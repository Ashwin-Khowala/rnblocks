import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const REGISTRY_DIR = path.join(process.cwd(), "registry", "blocks");
const NATIVE_CHECK_PATH = path.join(
  process.cwd(),
  "packages",
  "native-check",
  "src",
  "index.ts"
);

interface RuleViolation {
  file: string;
  line: number;
  rule: string;
  message: string;
  snippet: string;
}

const violations: RuleViolation[] = [];

console.log("🔍 Scanning repository for Agent Rules & Invariants compliance...\n");

// 1. Scan registry blocks
if (fs.existsSync(REGISTRY_DIR)) {
  const blockFolders = fs
    .readdirSync(REGISTRY_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("_") && !d.name.startsWith("."))
    .map((d) => d.name);

  const nativeCheckContent = fs.existsSync(NATIVE_CHECK_PATH)
    ? fs.readFileSync(NATIVE_CHECK_PATH, "utf-8")
    : "";

  for (const slug of blockFolders) {
    const blockDir = path.join(REGISTRY_DIR, slug);
    const metaPath = path.join(blockDir, "registry.json");
    const filesDir = path.join(blockDir, "files");

    // Check registry.json
    if (!fs.existsSync(metaPath)) {
      violations.push({
        file: path.relative(process.cwd(), blockDir),
        line: 1,
        rule: "REGISTRY_METADATA_MISSING",
        message: `Missing registry.json in ${slug}`,
        snippet: "registry.json not found",
      });
      continue;
    }

    let meta: any;
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    } catch {
      violations.push({
        file: path.relative(process.cwd(), metaPath),
        line: 1,
        rule: "REGISTRY_JSON_INVALID",
        message: `Invalid JSON in registry.json for ${slug}`,
        snippet: "JSON parse error",
      });
      continue;
    }

    // Check theme field in registry.json
    if (!Array.isArray(meta.themes) || !meta.themes.includes("dark") || !meta.themes.includes("light")) {
      violations.push({
        file: path.relative(process.cwd(), metaPath),
        line: 1,
        rule: "REGISTRY_THEMES_REQUIRED",
        message: `Block ${slug} must declare "themes": ["dark", "light"] in registry.json`,
        snippet: JSON.stringify(meta.themes || []),
      });
    }

    // Check native-check registration if claiming ios/android
    const platforms = meta.platforms || [];
    const claimsNative = platforms.includes("ios") || platforms.includes("android");
    if (claimsNative && !nativeCheckContent.includes(`registry/blocks/${slug}`)) {
      violations.push({
        file: path.relative(process.cwd(), NATIVE_CHECK_PATH),
        line: 1,
        rule: "NATIVE_CHECK_UNREGISTERED",
        message: `Block ${slug} claims native support but is not exported in packages/native-check/src/index.ts`,
        snippet: `export * from "../../../registry/blocks/${slug}/files/${slug}" missing`,
      });
    }

    // Scan source files
    if (fs.existsSync(filesDir)) {
      const sourceFiles = fs
        .readdirSync(filesDir)
        .filter((f) => /\.(tsx?|jsx?)$/.test(f))
        .map((f) => path.join(filesDir, f));

      // Main component file is usually `<slug>.tsx` or specified in registry.json
      const mainComponentFile = path.join(filesDir, `${slug}.tsx`);
      if (fs.existsSync(mainComponentFile)) {
        const mainContent = fs.readFileSync(mainComponentFile, "utf-8");
        const hasColors =
          mainContent.includes("const COLORS") ||
          mainContent.includes("COLORS_DARK") ||
          mainContent.includes("COLORS =") ||
          mainContent.includes("THEME_TOKENS") ||
          mainContent.includes("palette");
        if (!hasColors) {
          violations.push({
            file: path.relative(process.cwd(), mainComponentFile),
            line: 1,
            rule: "MISSING_COLORS_TOKEN_BLOCK",
            message: `Main block component must define centralized color token constants (COLORS or COLORS_DARK/LIGHT)`,
            snippet: "No color token constant found",
          });
        }

        const hasThemeProp =
          mainContent.includes("theme?:") ||
          mainContent.includes("theme:") ||
          mainContent.includes("theme =");
        if (!hasThemeProp) {
          violations.push({
            file: path.relative(process.cwd(), mainComponentFile),
            line: 1,
            rule: "MISSING_THEME_PROP",
            message: `Main block component must declare a 'theme' prop for dual light/dark mode support`,
            snippet: "No theme prop found",
          });
        }
      }

      for (const filePath of sourceFiles) {
        const relPath = path.relative(process.cwd(), filePath);
        const content = fs.readFileSync(filePath, "utf-8");
        const lines = content.split("\n");

        // Rule: PanResponder measure + pageX requirement
        if (content.includes("PanResponder.create") && content.includes("locationX")) {
          if (!content.includes("measure") && !content.includes("pageX")) {
            violations.push({
              file: relPath,
              line: 1,
              rule: "PAN_RESPONDER_LOCATION_X_FRAGILE",
              message: "PanResponder uses locationX without .measure() + pageX. Continuous drag on mobile requires scroll-immune tracking.",
              snippet: "PanResponder.create with locationX",
            });
          }
        }

        // Rule: Disallowed reanimated
        if (content.includes('from "react-native-reanimated"') || content.includes("from 'react-native-reanimated'")) {
          violations.push({
            file: relPath,
            line: 1,
            rule: "DISALLOWED_ANIMATION_LIB",
            message: "Do not import react-native-reanimated into reusable blocks. Use React Native Animated and RAF.",
            snippet: "react-native-reanimated import",
          });
        }

        // Rule: Disallowed external icons
        if (
          content.includes('from "lucide-react"') ||
          content.includes("from 'lucide-react'") ||
          content.includes('from "@expo/vector-icons"') ||
          content.includes("from '@expo/vector-icons'")
        ) {
          violations.push({
            file: relPath,
            line: 1,
            rule: "DISALLOWED_EXTERNAL_ICONS",
            message: "Do not import external icon packages (lucide-react, @expo/vector-icons). Use project internal icons or react-native-svg.",
            snippet: "external icon import",
          });
        }

        // Rule: Disallowed next/* or "use client" in blocks
        if (content.includes('"use client"') || content.includes("'use client'")) {
          violations.push({
            file: relPath,
            line: 1,
            rule: "DISALLOWED_USE_CLIENT",
            message: '"use client" is Next.js-only. Registry blocks are pure React Native components.',
            snippet: '"use client"',
          });
        }

        // Line-by-line checks
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const lineNum = i + 1;

          // Skip guarded web comments
          if (line.includes("// platform:web-safe")) continue;

          // Raw DOM elements in native blocks
          if (claimsNative) {
            const domTagMatch = line.match(/<(svg|path|circle|line|rect|defs|linearGradient|stop|g)\b/);
            if (domTagMatch) {
              violations.push({
                file: relPath,
                line: lineNum,
                rule: "RAW_DOM_SVG_TAG",
                message: `Raw DOM <${domTagMatch[1]}> tag detected. Use react-native-svg <${domTagMatch[1].charAt(0).toUpperCase() + domTagMatch[1].slice(1)}> instead.`,
                snippet: line.trim(),
              });
            }

            if (/\bdocument\./.test(line)) {
              violations.push({
                file: relPath,
                line: lineNum,
                rule: "DOM_DOCUMENT_LEAK",
                message: "document API is not available in React Native iOS/Android.",
                snippet: line.trim(),
              });
            }

            if (/\bwindow\./.test(line)) {
              violations.push({
                file: relPath,
                line: lineNum,
                rule: "DOM_WINDOW_LEAK",
                message: "window API is not available in React Native iOS/Android.",
                snippet: line.trim(),
              });
            }
          }

          // Hardcoded displayPct
          if (/\bdisplayPct:\s*[1-9]\d*(\.\d+)?/.test(line)) {
            violations.push({
              file: relPath,
              line: lineNum,
              rule: "HARDCODED_METRIC_PERCENTAGE",
              message: "Hardcoded displayPct percentage detected. Percentages must be dynamically computed from props.",
              snippet: line.trim(),
            });
          }
        }
      }
    }
  }
}

// 2. Git Safety Check
try {
  const gitStatus = execSync("git status --porcelain", { encoding: "utf-8" }).trim();
  if (gitStatus.length > 0) {
    console.log("ℹ️  Git Working Tree: Contains uncommitted modifications (safe for user review):");
    const statusLines = gitStatus.split("\n").slice(0, 5);
    statusLines.forEach((l) => console.log(`   ${l}`));
    if (gitStatus.split("\n").length > 5) {
      console.log(`   ...and ${gitStatus.split("\n").length - 5} more files.`);
    }
    console.log("   REMINDER: Agents must NEVER auto-commit or auto-push without explicit user request.\n");
  } else {
    console.log("ℹ️  Git Working Tree: Clean.\n");
  }
} catch {
  // Ignore git check errors if not in git repo
}

// 3. Print Results
if (violations.length === 0) {
  console.log("✅ [PASS] All Agent Rules & Invariants verified successfully! (0 violations)\n");
  process.exit(0);
} else {
  console.error(`❌ [FAIL] Found ${violations.length} Agent Rule violation(s):\n`);
  for (const v of violations) {
    console.error(`  - [${v.rule}] ${v.file}:${v.line}`);
    console.error(`    ${v.message}`);
    console.error(`    Snippet: ${v.snippet}\n`);
  }
  process.exit(1);
}
