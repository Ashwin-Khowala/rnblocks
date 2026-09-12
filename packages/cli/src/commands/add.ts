import fs from "node:fs";
import path from "node:path";
import pc from "picocolors";
import { resolveRegistryItem } from "../registry";
import { logger, ensureDir, detectProjectRoot } from "../utils";

interface AddOptions {
  path?: string;
  overwrite?: boolean;
  yes?: boolean;
}

export async function addCommand(name: string, options: AddOptions) {
  logger.title(`RNBlocks CLI — Adding "${name}"`);

  const item = await resolveRegistryItem(name);

  if (!item) {
    logger.error(`Could not find "${name}" in the RNBlocks registry.`);
    console.log(`Run ${pc.cyan("npx rnblocks list")} to see available blocks and screens.`);
    process.exit(1);
  }

  logger.info(`Found ${pc.bold(item.title)} (${item.type}) by ${pc.dim(item.author)}`);

  const projectRoot = detectProjectRoot();
  const defaultDir = item.type === "screen" ? "screens" : "components/rnblocks";
  const targetDir = path.resolve(projectRoot, options.path || defaultDir);

  ensureDir(targetDir);

  let writtenCount = 0;

  for (const file of item.codeFiles) {
    const fileName = path.basename(file.path);
    const destPath = path.join(targetDir, fileName);

    if (fs.existsSync(destPath) && !options.overwrite) {
      logger.warn(`File ${pc.bold(fileName)} already exists at ${pc.dim(destPath)}`);
      logger.info(`Use ${pc.cyan("--overwrite")} to replace existing files.`);
      continue;
    }

    fs.writeFileSync(destPath, file.content, "utf-8");
    logger.success(`Wrote ${pc.bold(fileName)} to ${pc.dim(path.relative(projectRoot, destPath))}`);
    writtenCount++;
  }

  if (writtenCount === 0) {
    logger.warn("No files written. Exiting.");
    return;
  }

  // Dependencies notification
  if (item.dependencies && item.dependencies.length > 0) {
    console.log(pc.yellow(`\nRequired dependencies:`));
    console.log(pc.dim(`Run one of the following in your project:\n`));
    console.log(`  ${pc.cyan(`npx expo install ${item.dependencies.join(" ")}`)}   ${pc.dim("(Expo)")}`);
    console.log(`  ${pc.cyan(`npm install ${item.dependencies.join(" ")}`)}         ${pc.dim("(React Native)")}`);
  }

  console.log(`\n${pc.green("Success:")} Import your component:`);
  const componentImport = item.files[0]
    ? path.basename(item.files[0].path, path.extname(item.files[0].path))
    : name;
  const relImport = path.relative(projectRoot, path.join(targetDir, componentImport)).replace(/\\/g, "/");
  console.log(`  ${pc.cyan(`import { ... } from "./${relImport}";`)}\n`);
}
