import { z } from "zod";

export interface SupportedChain {
    chain: string;
    chainId: number;
    internalChainId: number;
    flatFee: number;
    currency: string;
    rpcUrl: string;
}

export interface DebrigeConfig {
    privateKey: string;
    walletAddress?: string;
}

export interface OrderFulfillmentResponseData {
    destinationTxHash: `0x${string}`,
    fulfillmentError: string
}

export const BridgeTxSchema = z.object({
    source_chain: z.number().int().positive(), // Chain ID of source
    destination_chain: z.number().int().positive(), // Chain ID of destination
    source_asset: z.string().min(1).default("NATIVE"), // Asset symbol or "NATIVE" for native tokens
    destination_asset: z.string().min(1).default("NATIVE"), // Asset symbol or "NATIVE" for native tokens
    amount: z.number().positive(), // Amount of asset to bridge
});

export class DebridgeError extends Error {
    constructor(
        message: string,
        public code?: number,
        public details?: unknown
    ) {
        super(message);
        this.name = "HyperliquidError";
    }
}
