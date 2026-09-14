import fs from "node:fs";
import path from "node:path";

const REGISTRY_DIR = path.join(process.cwd(), "registry");

// ── Platform Violation Patterns ────────────────────────────────────────────────
// These patterns are NEVER allowed in registry block source files that claim
// ios or android platform support. The validator reads each block's registry.json
// to know which platforms it claims to support, then checks accordingly.

/** Violations that apply to ALL platforms (including web-only blocks) */
const UNIVERSAL_VIOLATIONS: { regex: RegExp; label: string }[] = [
  {
    regex: /^"use client"|^'use client'/m,
    label:
      '"use client" directive — Next.js-only, meaningless in React Native source. Remove it entirely.',
  },
  {
    regex: /from ["']next\//,
    label:
      'next/* import — Next.js-only. Registry blocks must be framework-agnostic React Native source.',
  },
];

/** Violations that apply when a block claims ios or android support */
const NATIVE_PLATFORM_VIOLATIONS: { regex: RegExp; label: string }[] = [
  {
    regex: /<svg[\s>]/,
    label:
      'Raw DOM <svg> — crashes on iOS/Android. Use react-native-svg <Svg> instead.',
  },
  {
    regex: /<path[\s/]/,
    label:
      'Raw DOM <path> — crashes on iOS/Android. Use react-native-svg <Path> instead.',
  },
  {
    regex: /<defs[\s>]/,
    label:
      'Raw DOM <defs> — crashes on iOS/Android. Use react-native-svg <Defs> instead.',
  },
  {
    regex: /<linearGradient[\s>]/,
    label:
      'Raw DOM <linearGradient> — crashes on iOS/Android. Use react-native-svg <LinearGradient> instead.',
  },
  {
    regex: /<circle[\s/]/,
    label:
      'Raw DOM <circle> — crashes on iOS/Android. Use react-native-svg <Circle> instead.',
  },
  {
    regex: /<line[\s/]/,
    label:
      'Raw DOM <line> — crashes on iOS/Android. Use react-native-svg <Line> instead.',
  },
  {
    regex: /<rect[\s/]/,
    label:
      'Raw DOM <rect> — crashes on iOS/Android. Use react-native-svg <Rect> instead.',
  },
  {
    regex: /\bdocument\./,
    label: "DOM document API — not available on iOS/Android.",
  },
  {
    regex: /\bwindow\./,
    label: "Browser window API — not available on iOS/Android.",
  },
  {
    regex: /\bgetBoundingClientRect\b/,
    label:
      "getBoundingClientRect — web-only DOM API. Guard with Platform.select or use onLayout.",
  },
  {
    regex: /\bonMouseEnter\b/,
    label: "onMouseEnter — web-only. Guard with Platform.select({ web: ... }) or remove.",
  },
  {
    regex: /\bonPointerMove\b/,
    label:
      "onPointerMove — web-only pointer API. Guard with Platform.select({ web: { onPointerMove: ... } }).",
  },
  {
    regex: /\bonPointerLeave\b/,
    label:
      "onPointerLeave — web-only pointer API. Guard with Platform.select({ web: { onPointerLeave: ... } }).",
  },
  {
    regex: /\bHTMLElement\b/,
    label: "HTMLElement — DOM type, not available on iOS/Android.",
  },
];

// ── Runner ─────────────────────────────────────────────────────────────────────

function checkPlatformCompat() {
  console.log("Checking platform compatibility in registry blocks...\n");

  let errorCount = 0;
  let checkedFiles = 0;

  for (const type of ["blocks", "screens"] as const) {
    const typeDir = path.join(REGISTRY_DIR, type);
    if (!fs.existsSync(typeDir)) continue;

    const slugs = fs
      .readdirSync(typeDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const slug of slugs) {
      const itemDir = path.join(typeDir, slug);
      const metaPath = path.join(itemDir, "registry.json");
      if (!fs.existsSync(metaPath)) continue;

      let meta: any;
      try {
        meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      } catch {
        continue;
      }

      const platforms: string[] = meta.platforms ?? [];
      const claimsNative = platforms.includes("ios") || platforms.includes("android");
      const filesDir = path.join(itemDir, "files");
      if (!fs.existsSync(filesDir)) continue;

      const sourceFiles = fs
        .readdirSync(filesDir)
        .filter((f) => /\.(tsx?|jsx?)$/.test(f))
        .map((f) => path.join(filesDir, f));

      for (const filePath of sourceFiles) {
        checkedFiles++;
        const rel = path.relative(process.cwd(), filePath);
        const lines = fs.readFileSync(filePath, "utf-8").split("\n");

        const checkPatterns = (patterns: { regex: RegExp; label: string }[]) => {
          // Track whether we are inside a Platform.select({ web: ... }) block
          // or inside a function named handleWeb* — these are explicitly web-only
          // and platform-violating APIs are intentionally guarded there.
          let platformSelectWebDepth = 0;
          let insideWebGuardedFn = false;

          for (let idx = 0; idx < lines.length; idx++) {
            const line = lines[idx];

            // Track entry/exit of Platform.select({ web: blocks
            if (/Platform\.select\s*\(\s*\{/.test(line) && /\bweb\s*:/.test(line)) {
              platformSelectWebDepth++;
            }
            if (/Platform\.select/.test(line) && /}\s*\)\s*;?/.test(line)) {
              platformSelectWebDepth = Math.max(0, platformSelectWebDepth - 1);
            }

            // Track functions explicitly named handleWeb* (intentionally web-only)
            if (/const handle[Ww]eb\w+\s*=/.test(line)) {
              insideWebGuardedFn = true;
            }
            // Rough heuristic: reset on next top-level const/function declaration
            if (insideWebGuardedFn && /^  const \w+(?!Web)/.test(line)) {
              insideWebGuardedFn = false;
            }

            const isWebGuardedContext = platformSelectWebDepth > 0 || insideWebGuardedFn;

            // Allow: lines with explicit escape-hatch comment
            if (/\/\/\s*platform:web-safe/.test(line)) continue;

            for (const { regex, label } of patterns) {
              if (!regex.test(line)) continue;

              // For pointer events and getBoundingClientRect, skip if in a web-guarded context
              const isPointerOrBCR = /onPointerMove|onPointerLeave|onMouseEnter|getBoundingClientRect/.test(label);
              if (isPointerOrBCR && isWebGuardedContext) continue;

              console.error(
                `[FAIL] ${rel}:${idx + 1}\n       ${label}\n       Line: ${line.trim()}\n`
              );
              errorCount++;
            }
          }
        };

        checkPatterns(UNIVERSAL_VIOLATIONS);
        if (claimsNative) {
          checkPatterns(NATIVE_PLATFORM_VIOLATIONS);
        }
      }
    }
  }

  console.log(`Platform compat check: ${checkedFiles} source file(s) scanned.`);

  if (errorCount > 0) {
    console.error(
      `\n[FAIL] ${errorCount} platform violation(s) found. Fix them before merging.\n`
    );
    process.exit(1);
  } else {
    console.log("[PASS] No platform violations found.\n");
  }
}

checkPlatformCompat();
