import type {
    IAgentRuntime, Provider, Memory, State, ProviderResult
} from "@elizaos/core";

import { supportedChains } from "src/constants";


export const debridgeSupportedChainsProvider: Provider = {
    name: 'DEBRIDGE_SUPPORTED_CHAINS_PROVIDER',
    description: 'Returns all the supported chains by Debridge',

    async get(
        runtime: IAgentRuntime,
        _message: Memory,
        _state?: State
    ): Promise<ProviderResult> {
        try {
            const chainStrings = supportedChains.map(chain =>
                `${chain.chain} (ID: ${chain.internalChainId})`
            );
            return { text: `Debridge Asset Bridging Supported chains: ${chainStrings.join(', ')}`, values: {}, data: {} }
        } catch (error) {
            console.error("Error in Story wallet provider:", error);
            return null;
        }
    },
};