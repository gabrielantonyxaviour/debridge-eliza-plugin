import type { Plugin } from "@elizaos/core";
import { debridgeSupportedChainsProvider } from "./providers/supportedChains";
import { createBridgeTx } from "./actions/createBridgeTx";

export const debridgePlugin: Plugin = {
  name: "debridge",
  description: "Debridge plugin",
  actions: [createBridgeTx],
  providers: [debridgeSupportedChainsProvider],
  evaluators: [],
  services: [],
  clients: []
};

export default debridgePlugin;