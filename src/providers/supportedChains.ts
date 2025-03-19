import type { IAgentRuntime, Provider, Memory, State } from "@elizaos/core";

import type { SupportedChain, } from "../types";
import { supportedChains } from "src/constants";


export const debridgeSupportedChainsProvider: Provider = {
    async get(
        runtime: IAgentRuntime,
        // eslint-disable-next-line
        _message: Memory,
        // eslint-disable-next-line
        _state?: State
    ): Promise<string | null> {
        try {
            const chainStrings = supportedChains.map(chain =>
                `${chain.chain} (ID: ${chain.internalChainId})`
            );

            // Join with commas and add context
            return `Debridge Asset Bridging Supported chains: ${chainStrings.join(', ')}`;
        } catch (error) {
            console.error("Error in Story wallet provider:", error);
            return null;
        }
    },
};