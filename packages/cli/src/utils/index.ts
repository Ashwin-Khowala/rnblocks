import fs from "node:fs";
import path from "node:path";
import pc from "picocolors";

export const logger = {
  info: (msg: string) => console.log(`${pc.cyan("ℹ")} ${msg}`),
  success: (msg: string) => console.log(`${pc.green("✔")} ${msg}`),
  warn: (msg: string) => console.log(`${pc.yellow("⚠")} ${msg}`),
  error: (msg: string) => console.error(`${pc.red("✖")} ${msg}`),
  title: (msg: string) => console.log(pc.bold(pc.white(`\n${msg}\n`))),
};

export function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function detectProjectRoot(startDir: string = process.cwd()): string {
  let current = startDir;
  for (let i = 0; i < 6; i++) {
    if (
      fs.existsSync(path.join(current, "package.json")) ||
      fs.existsSync(path.join(current, "app.json"))
    ) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return startDir;
}
