import fs from "node:fs";
import path from "node:path";
import pc from "picocolors";

export const logger = {
  info: (msg: string) => console.log(`${pc.cyan("info")} ${msg}`),
  success: (msg: string) => console.log(`${pc.green("success")} ${msg}`),
  warn: (msg: string) => console.log(`${pc.yellow("warn")} ${msg}`),
  error: (msg: string) => console.error(`${pc.red("error")} ${msg}`),
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
