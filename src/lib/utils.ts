import { createPublicClient, createWalletClient, http, parseAbiItem, PublicClient, zeroHash } from "viem";
import type { Account, Hex } from "viem"
import { dlnDestination, dlnSource, supportedChains } from "../constants";
import { OrderFulfillmentResponseData, SupportedChain } from "../types";
import { logger } from "@elizaos/core";

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
): Promise<OrderFulfillmentResponseData> => {
    const publicClient = createPublicClient({
        transport: http(rpcUrl),
    })
    logger.info("Waiting for order fulfillment on destination chain...");
    let destTxHash: `0x${string}` | undefined; // Initialize as undefined
    let attempts = 0;
    while (destTxHash === undefined) {
        const blockNumber = await publicClient.getBlockNumber();
        const startBlock = BigInt(blockNumber) - BigInt(1000);
        const logs = await publicClient.getLogs({
            address: dlnDestination,
            fromBlock: startBlock,
        })

        for (const log of logs) {
            const dataWithoutPrefix = log.data.slice(2);
            const parsedOrderId = `0x${dataWithoutPrefix.slice(64, 128)}`;

            if (parsedOrderId.toLowerCase() === orderId.toLowerCase()) {
                logger.info("Received Assets on Destination Chain");
                destTxHash = log.transactionHash;
                break;
            }
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
        logger.info(`Attempt ${attempts}`);
        if (attempts > 10) {
            break;
        }
    }
    if (destTxHash === undefined) {
        return {
            destinationTxHash: '0x',
            fulfillmentError: 'Could not find fullfillment event'
        }
    }
    return {
        destinationTxHash: destTxHash,
        fulfillmentError: ''
    }


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
    const createdOrderEvent = {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint64",
                        "name": "makerOrderNonce",
                        "type": "uint64"
                    },
                    {
                        "internalType": "bytes",
                        "name": "makerSrc",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "giveChainId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "giveTokenAddress",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "giveAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "takeChainId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "takeTokenAddress",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "takeAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "receiverDst",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "givePatchAuthoritySrc",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "orderAuthorityAddressDst",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "allowedTakerDst",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "allowedCancelBeneficiarySrc",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "externalCall",
                        "type": "bytes"
                    }
                ],
                "indexed": false,
                "internalType": "struct DlnOrderLib.Order",
                "name": "order",
                "type": "tuple"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "orderId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "bytes",
                "name": "affiliateFee",
                "type": "bytes"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "nativeFixFee",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "percentFee",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "referralCode",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "bytes",
                "name": "metadata",
                "type": "bytes"
            }
        ],
        "name": "CreatedOrder",
        "type": "event" as 'event'
    };
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

            const targetEvent = logs.find(log => log.args[0] === orderId);
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

        logger.info("Order successfully cancelled");
        logger.info(`Cancel Order Tx Hash: ${txHash}`);

        return { cancelOrderTx: txHash, error: "" };
    }
}