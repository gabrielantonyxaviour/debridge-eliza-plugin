import { createPublicClient, createWalletClient, http, parseAbiItem, PublicClient, zeroHash } from "viem";
import type { Account, Hex } from "viem"
import { dlnDestination, dlnSource, supportedChains } from "../constants";
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
export async function getAssetByAddress(chainId: number, address: string): Promise<{ symbol: string } | null> {
    const response = await fetch("https://dln.debridge.finance/v1.0/token-list?chainId=" + chainId)
    const data: any = await response.json();

    if (!data || !('tokens' in data)) {
        throw new Error('API response does not contain tokens property');
    }

    const { tokens } = data as { tokens: Record<string, { symbol: string; }> };
    if (tokens[address]) {
        return { symbol: tokens[address].symbol };
    } else return null;

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

export const getFetchOrderTxHashes = async (orderId: `0x${string}`, sourceRpcUrl: string, destRpcUrl: string): Promise<{ errorMessage: string; sourceTxHash: Hex; destTxHash: Hex }> => {
    const { errorMessage: sourceErrorMessage, sourceTxHash } = await getOrderSourceTxHash(orderId, sourceRpcUrl);
    if (sourceErrorMessage) {
        return { sourceTxHash: '0x', destTxHash: '0x', errorMessage: sourceErrorMessage };
    }

    const { errorMessage: destErrorMessage, destTxHash } = await getOrderDestTxHash(orderId, destRpcUrl);
    if (destErrorMessage) {
        return { sourceTxHash: '0x', destTxHash: '0x', errorMessage: destErrorMessage };
    }

    return { sourceTxHash, destTxHash, errorMessage: '' };
}

export const getOrderSourceTxHash = async (orderId: `0x${string}`, sourceRpcUrl: string): Promise<{ errorMessage: string; sourceTxHash: Hex; }> => {
    const sourcePublicClient = createPublicClient({
        transport: http(sourceRpcUrl),
    })
    const createdOrderEvent = parseAbiItem(
        'event CreatedOrder(tuple order, bytes32 orderId, bytes affiliateFee, uint256 nativeFixFee, uint256 percentFee, uint32 referralCode, bytes metadata)'
    );
    const latestBlock = await sourcePublicClient.getBlockNumber();

    let fromBlock = 0;
    let toBlock = Number(latestBlock);
    let blockStep = 100000
    while (fromBlock <= toBlock) {
        const currentBatch = Math.min(toBlock - fromBlock, blockStep);
        const currentToBlock = fromBlock + currentBatch;

        console.log(`Searching blocks ${fromBlock} to ${currentToBlock}...`);

        try {
            const logs = await sourcePublicClient.getLogs({
                address: dlnSource,
                event: createdOrderEvent,
                fromBlock: BigInt(fromBlock),
                toBlock: BigInt(currentToBlock),
            });

            // Check if the target orderId is in this batch
            const targetEvent = logs.find(log => log.args.orderId === orderId);
            if (targetEvent) {
                console.log('Found event at block:', targetEvent.blockNumber);
                return { sourceTxHash: targetEvent.transactionHash, errorMessage: '' };
            }

            // Move to next batch
            fromBlock = currentToBlock + 1;
        } catch (error) {
            // If batch is too large (RPC error), reduce batch size
            if (error.message.includes('query returned more than')) {
                blockStep = Math.floor(blockStep / 2);
                console.log(`Reducing batch size to ${blockStep} blocks`);
                continue;
            }
            return { sourceTxHash: '0x', errorMessage: JSON.stringify(error) };
        }
    }
    return { sourceTxHash: '0x', errorMessage: 'Could not find the event' };

}

export const getOrderDestTxHash = async (orderId: `0x${string}`, destRpcUrl: string): Promise<{ errorMessage: string; destTxHash: Hex; }> => {
    // No good approach to get the tx hash

    return { destTxHash: zeroHash, errorMessage: '' };
}

export const cancelOrderHelper = async (orderId: `0x${string}`, account: Account): Promise<{ cancelOrderTx: Hex; error: string }> => {
    const response = await fetch(`https://dln.debridge.finance/v1.0/dln/order/${orderId}/cancel-tx`)
    const { errorMessage, to, data, value, chainId, from } = (await response.json()) as any;
    if (errorMessage) {
        return { cancelOrderTx: '0x', error: errorMessage };
    } else {
        if (account.address != from) {
            return { cancelOrderTx: '0x', error: "Unauthorized" };
        }

        const chain = getChain(chainId);
        if (!chain) {
            return { cancelOrderTx: '0x', error: "Chain not supported" };
        }

        const walletClient = createWalletClient({
            account: account,
            transport: http(chain.rpcUrl)
        })

        const txHash = await walletClient.sendTransaction({
            to,
            data,
            value: BigInt(value),
        } as any)

        elizaLogger.info("Order successfully cancelled");
        elizaLogger.info(`Cancel Order Tx Hash: ${txHash}`);

        return { cancelOrderTx: txHash, error: "" };
    }
}