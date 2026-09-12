import pc from "picocolors";
import { fetchAvailableItems } from "../registry";
import { logger } from "../utils";

export async function listCommand() {
  logger.title("RNBlocks Registry — Available Components");

  const items = await fetchAvailableItems();

  if (items.length === 0) {
    logger.warn("No components found in the registry.");
    return;
  }

  const blocks = items.filter((i) => i.type === "block");
  const screens = items.filter((i) => i.type === "screen");

  if (blocks.length > 0) {
    console.log(pc.bold(pc.white("🧱 Blocks:")));
    for (const b of blocks) {
      console.log(
        `  ${pc.cyan(b.name.padEnd(24))} ${pc.dim(b.title.padEnd(36))} ${pc.gray(`by ${b.author}`)}`
      );
    }
    console.log();
  }

  if (screens.length > 0) {
    console.log(pc.bold(pc.white("📱 Screens:")));
    for (const s of screens) {
      console.log(
        `  ${pc.cyan(s.name.padEnd(24))} ${pc.dim(s.title.padEnd(36))} ${pc.gray(`by ${s.author}`)}`
      );
    }
    console.log();
  }

  console.log(pc.dim(`Install any component with:`));
  console.log(`  ${pc.cyan("npx rnblocks add <name>")}\n`);
}
