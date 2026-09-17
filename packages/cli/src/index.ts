import { Command } from "commander";
import { addCommand } from "./commands/add";
import { listCommand } from "./commands/list";

const program = new Command();

program
  .name("rnblocks")
  .description("Add production-ready React Native blocks and screens directly to your project")
  .version("0.1.1");

program
  .command("add")
  .description("Add a block or screen from the registry into your project")
  .argument("<name>", "Name/slug of the block or screen (e.g. floating-docker)")
  .option("-p, --path <path>", "Destination directory (default: components/rnblocks)")
  .option("-o, --overwrite", "Overwrite existing files if present")
  .option("-y, --yes", "Skip interactive prompts")
  .action(addCommand);

program
  .command("list")
  .description("List all available blocks and screens from the registry")
  .action(listCommand);

program.parse(process.argv);
