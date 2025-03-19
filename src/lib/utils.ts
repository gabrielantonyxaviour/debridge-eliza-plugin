import { createPublicClient, http, PublicClient } from "viem";
import { dlnDestination, supportedChains } from "../constants";
import { OrderFulfillmentResponseData, SupportedChain } from "../types";
import { elizaLogger } from "@elizaos/core";

export function camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

export function getChain(chainId: number): SupportedChain | undefined {
    const supportedChain = supportedChains.filter((chain) => chain.chainId === chainId);
    if (supportedChain.length === 0) return undefined;
    return supportedChain[0];
}


export async function getAsset(chainId: number, symbol: string): Promise<{ address: string; decimals: number; symbol: string } | null> {
    const searchSymbol = symbol.toUpperCase();
    const response = await fetch("https://dln.debridge.finance/v1.0/token-list?chainId=" + chainId)
    const data: any = await response.json();

    if (!data || !('tokens' in data)) {
        throw new Error('API response does not contain tokens property');
    }

    const { tokens } = data as { tokens: Record<string, { address: string; symbol: string; decimals: number }> };
    for (const address in tokens) {
        const token = tokens[address];

        if (token.symbol.toUpperCase() === searchSymbol) {
            return {
                address: token.address,
                symbol: token.symbol,
                decimals: token.decimals
            };
        }
    }

    return null;

}
export const waitForOrderFulfillment = async (
    orderId: `0x${string}`,
    rpcUrl: string,
    timeoutMinutes: number = 30,
): Promise<OrderFulfillmentResponseData> => {
    const publicClient = createPublicClient({
        transport: http(rpcUrl),
    })
    return new Promise((resolve) => {
        let isResolved = false;
        let timeoutId: NodeJS.Timeout;
        let unwatch: (() => void) | undefined;

        // Helper function to cleanup and resolve
        const cleanupAndResolve = (response: OrderFulfillmentResponseData) => {
            if (isResolved) return;
            isResolved = true;

            if (unwatch) unwatch();
            if (timeoutId) clearTimeout(timeoutId);

            resolve(response);
        };

        try {
            let destTxHash: `0x${string}` | undefined; // Initialize as undefined

            // Set up event listener
            unwatch = publicClient.watchEvent({
                address: dlnDestination,

                onLogs: (logs) => {
                    const completedOrderTopic = `0xd281ee92bab1446041582480d2c0a9dc91f855386bb27ea295faac1e992f7fe4`;

                    for (const log of logs) {
                        // Check if this is the event we're looking for by topic
                        const dataWithoutPrefix = log.data.slice(2);
                        const parsedOrderId = `0x${dataWithoutPrefix.slice(64, 128)}`;

                        if (parsedOrderId.toLowerCase() === orderId.toLowerCase()) {
                            console.log("Received Assets on Destination Chain");
                            destTxHash = log.transactionHash;

                            // Resolve with success
                            cleanupAndResolve({
                                destinationTxHash: destTxHash,
                                fulfillmentError: ""
                            });
                        }
                    }
                },
                onError: (error) => {
                    console.error("Error while listening for events:", error);

                    cleanupAndResolve({
                        fulfillmentError: "Error while listening for events: " + error,
                        destinationTxHash: "0x"
                    });
                },
            });

            // Set timeout
            timeoutId = setTimeout(() => {
                console.log();

                cleanupAndResolve({
                    fulfillmentError: `Event listening timeout reached after ${timeoutMinutes} minutes`,
                    destinationTxHash: "0x"
                });
            }, timeoutMinutes * 60 * 1000);

        } catch (error) {
            cleanupAndResolve({
                fulfillmentError: `Failed to set up event listener: ${error}`,
                destinationTxHash: "0x"
            });
        }
    });
};

