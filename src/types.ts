import { logger } from "@elizaos/core";
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


/**
 * Defines the configuration schema for the Debridge plugin, including validation rules
 * for the private key and API key.
 *
 * @type {import('zod').ZodObject<{
*   DEBRIDGE_PRIVATE_KEY: import('zod').ZodString,
*   DEBRIDGE_API_KEY: import('zod').ZodOptional<import('zod').ZodString>
* }>}
*/
export const configSchema = z.object({
    DEBRIDGE_PRIVATE_KEY: z
        .string()
        .min(1, 'Debridge private key is not provided'),
    DEBRIDGE_API_KEY: z
        .string()
        .min(1, 'Debridge API key is not provided')
        .optional()
        .transform((val) => {
            if (!val) {
                logger.warn('Debridge API key is not provided (this is optional)');
            }
            return val;
        }),
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
