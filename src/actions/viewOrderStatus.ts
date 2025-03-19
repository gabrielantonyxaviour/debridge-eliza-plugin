import {
    type Action,
    type IAgentRuntime,
    type Memory,
    type State,
    type HandlerCallback,
    elizaLogger,
} from "@elizaos/core";
import {
    DebridgeError,
} from "../types";
import { Hex } from "viem"

import { privateKeyToAccount } from "viem/accounts"
import { getChain, getFetchOrderTxHashes } from "../lib/utils";

export const viewOrderStatus: Action = {
    name: "VIEW_ORDER_STATUS",
    similes: ["CHECK_ORDER", "ORDER_STATUS", "TRACK_ORDER", "GET_ORDER_DETAILS", "SHOW_ORDER"],
    description: "Checks the status of one or more orders and provides relevant order details",
    validate: async (runtime: IAgentRuntime) => {
        return !!runtime.getSetting("DEBRIDGE_PRIVATE_KEY");
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: Record<string, unknown>,
        callback?: HandlerCallback
    ) => {
        try {
            const privateKey = runtime.getSetting("DEBRIDGE_PRIVATE_KEY");
            const account = privateKeyToAccount(privateKey as Hex);

            const messageText = message.content.text

            if (messageText.includes('0x')) {
                const hexRegex = /\b([0-9a-fA-F]{64})\b/;
                const match = messageText.match(hexRegex);
                if (match) {
                    const hash = match[0];

                    const txResponse = await fetch(`https://dln.debridge.finance/v1.0/dln/tx/${hash}/order-ids`)
                    const { errorMessage: error, orderIds } = (await txResponse.json()) as any;
                    if (error) {
                        elizaLogger.error(error);
                        throw new DebridgeError(error);
                    } else {
                        if (orderIds.length === 0) {
                            const orderResponse = await fetch(`https://dln.debridge.finance/v1.0/dln/order/${hash}`)
                            const { errorMessage, status, orderStruct } = (await orderResponse.json()) as any;
                            if (errorMessage) {
                                elizaLogger.error(errorMessage);
                                throw new DebridgeError(errorMessage);
                            } else {
                                const sourceChain = getChain(orderStruct.giveOffer.chainId)
                                const destinationChain = getChain(orderStruct.takeOffer.chainId)
                                const { sourceTxHash, destTxHash, errorMessage } = await getFetchOrderTxHashes(hash as Hex, sourceChain.rpcUrl, destinationChain.rpcUrl)
                                if (errorMessage) {
                                    elizaLogger.error(errorMessage);
                                    throw new DebridgeError(errorMessage);
                                }
                                elizaLogger.info('Fetched Order details successfully')
                                if (callback) {
                                    callback({
                                        text: `Order details:
Order Id: ${hash}
Status: ${status}
Maker: ${account.address}
Source chain: ${sourceChain.chain}
Destination chain: ${destinationChain.chain}
Source Tx Hash: ${sourceTxHash}
Destination Tx Hash: ${destTxHash}`
                                    })
                                }
                                return true;

                            }
                        } else {
                            const orderId = orderIds[0];
                            const orderResponse = await fetch(`https://dln.debridge.finance/v1.0/dln/order/${orderId}`)
                            const { status, orderStruct } = (await orderResponse.json()) as any;

                            const sourceChain = getChain(orderStruct.giveOffer.chainId)
                            const destinationChain = getChain(orderStruct.takeOffer.chainId)
                            const { sourceTxHash, destTxHash, errorMessage } = await getFetchOrderTxHashes(orderId as Hex, sourceChain.rpcUrl, destinationChain.rpcUrl)

                            if (errorMessage) {
                                elizaLogger.error(errorMessage);
                                throw new DebridgeError(errorMessage);
                            }
                            elizaLogger.info('Fetched Order details successfully')
                            if (callback) {
                                callback({
                                    text: `Order details:
Order Id: ${hash}
Status: ${status}
Maker: ${account.address}
Source chain: ${sourceChain.chain}
Destination chain: ${destinationChain.chain}
Source Tx Hash: ${sourceTxHash}
Destination Tx Hash: ${destTxHash}`
                                })
                            }
                            return true;
                        }
                    }

                } else {
                    elizaLogger.error("Invalid Order Id string or Tx Hash. Make sure its properly formatted");
                    throw new DebridgeError("Invalid Order Id string or Tx Hash. Make sure its properly formatted")
                }
            } else {
                elizaLogger.info("Could not find Order Id or Tx Hash in the message");
                throw new DebridgeError("Could not find Order Id or Tx Hash in the message")
            }
        } catch (error) {
            elizaLogger.error("Error fetching order status with debridge: ", error);
            if (callback) {
                callback({
                    text: `Error  fetching order status with debridge: ${error.message}`,
                    content: { error: error.message },
                });
            }
            return false;
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "What's the status of order with Tx Hash 0x0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll check the status of order with Tx Hash 0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5.",
                    action: "VIEW_ORDER_STATUS",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: `Order details:
Order Id: 0x69bd821cb60368ea1fc4edea221f15154fd33327fa52352def9ebabf7993c3dc
Status: Completed
Maker: 0x833589fcd6edb6e08f4c7c32d4f71b54bda02913
Source chain: Ethereum
Destination chain: Arbitrum
Source Tx Hash: 0x0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5
Destination Tx Hash: 0x1b606c97629d98e04741dd5f90f6f0745c079587ea021c8c55bb63111fa2914b
`
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Show me order with Order Id 0x0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll retrieve information for order with Order Id 0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5.",
                    action: "VIEW_ORDER_STATUS",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: `Order details:
Order Id: 0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5
Status: Completed
Maker: 0xee5c50573a8af1b8ee2d89cb9eb27dc298c5f75d
Source chain: Linea
Destination chain: Arbitrum
Source Tx Hash: 0x69bd821cb60368ea1fc4edea221f15154fd33327fa52352def9ebabf7993c3dc
Destination Tx Hash: 0x1b606c97629d98e04741dd5f90f6f0745c079587ea021c8c55bb63111fa2914b`
                },
            },
        ],
    ],

};

export default viewOrderStatus;