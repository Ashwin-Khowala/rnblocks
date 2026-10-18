import { homedir } from "node:os";
import { join } from "node:path";
import { AwwwardsClient } from "../node_modules/.pnpm/awwwards-mcp@1.8.0/node_modules/awwwards-mcp/dist/awwwards.js";
import { Cache } from "../node_modules/.pnpm/awwwards-mcp@1.8.0/node_modules/awwwards-mcp/dist/cache.js";
import { createHandlers } from "../node_modules/.pnpm/awwwards-mcp@1.8.0/node_modules/awwwards-mcp/dist/server.js";

const cacheRoot = join(homedir(), ".awwwards-mcp");
const cache = new Cache(cacheRoot);
const client = new AwwwardsClient();
const handlers = createHandlers({
  client,
  cache,
  captureFn: async () => {},
});

async function main() {
  const cats = await handlers.list_categories();
  const catData = JSON.parse(cats.content[0].text);
  console.log("Filters sample:", catData.filters.slice(0, 40));
  
  console.log("\n--- GENERATING DESIGN BRIEF VIA AWWWARDS-MCP ---");
  const brief = await handlers.create_design_brief({
    slugs: ["heron-ai", "butter", "townhouse"],
    goal: "High-end React Native and Expo component registry with live 60fps mobile SVG previews, instant copy-paste CLI, and tactile developer console aesthetic",
    audience: "Frontend, mobile, and full-stack React Native / Expo engineers",
    constraints: [
      "Zero DOM elements in registry blocks (pure react-native-svg)",
      "Dark-first obsidian canvas with hairline micro-borders",
      "No generic AI templates or multi-color gradients without purpose",
      "Interactive component previews must be primary visual centerpiece"
    ]
  });
  console.log(brief.content[0].text);
}

main().catch(console.error);
