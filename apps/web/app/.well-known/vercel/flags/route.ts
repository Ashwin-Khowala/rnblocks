import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next";
import { registryFlags } from "@/flags";

export const GET = createFlagsDiscoveryEndpoint(async () => {
  return getProviderData(registryFlags);
});

