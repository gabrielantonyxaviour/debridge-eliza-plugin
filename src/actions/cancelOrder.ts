import {
    type Action,
    type ActionExample,
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
import { cancelOrderHelper } from "../lib/utils";

export const cancelOrder: Action = {
    name: "CANCEL_ORDER",
    similes: ["CANCEL_TX", "REVOKE_ORDER", "ABORT_ORDER", "STOP_ORDER", "WITHDRAW_ORDER"],
    description: "Cancels an existing order on the blockchain exchange or marketplace",
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
                            const orderResponse = await fetch(`https://dln.debridge.finance/v1.0/dln/order/${hash}/status`)
                            const { errorMessage, status } = (await orderResponse.json()) as any;
                            if (errorMessage) {
                                elizaLogger.error(errorMessage);
                                throw new DebridgeError(errorMessage);
                            } else {
                                if (status === 'Completed') {
                                    elizaLogger.error("Order already completed");
                                    throw new DebridgeError("Order already completed");
                                } else {
                                    const { cancelOrderTx, error } = await cancelOrderHelper(hash as Hex, account)
                                    if (error) {
                                        elizaLogger.error(error);
                                        throw new DebridgeError(error);
                                    }

                                    if (callback) {
                                        callback({
                                            text: `Successfully cancelled the order. \nOrder Id: ${hash}\nTx Hash: ${cancelOrderTx}`,
                                            actions: ['CANCEL_ORDER']
                                        })
                                    }
                                    return true
                                }
                            }
                        } else {
                            const orderId = orderIds[0];
                            const orderResponse = await fetch(`https://dln.debridge.finance/v1.0/dln/order/${orderId}/status`)
                            const { status } = (await orderResponse.json()) as any;
                            if (status === 'Completed') {
                                elizaLogger.error("Order already completed");
                                throw new DebridgeError("Order already completed");
                            } else {
                                const { cancelOrderTx, error } = await cancelOrderHelper(orderId as Hex, account)
                                if (error) {
                                    elizaLogger.error(error);
                                    throw new DebridgeError(error);
                                }

                                if (callback) {
                                    callback({
                                        text: `Successfully cancelled the order. \nOrder Id: ${orderId}\nTx Hash: ${cancelOrderTx}`,
                                        actions: ['CANCEL_ORDER']
                                    })
                                }
                                return true
                            }
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
            elizaLogger.error("Error cancelling orders with debridge: ", error);
            if (callback) {
                callback({
                    text: `Error cancelling orders with debridge: ${error.message}`,
                    content: { error: error.message },
                });
            }
            return false;
        }
    },
    examples: [
        [
            {
                name: "{{name1}}",
                content: {
                    text: "Cancel order with Tx Hash 0x0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5",
                },
            },
            {
                name: "{{name2}}",
                content: {
                    text: "I'll cancel order with Tx Hash 0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5.",
                    action: "CANCEL_ORDER",
                },
            },
            {
                name: "{{name2}}",
                content: {
                    text: "Successfully cancelled the order. \nOrder Id: 0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5\nTx Hash: 0x1b606c97629d98e04741dd5f90f6f0745c079587ea021c8c55bb63111fa2914b",
                },
            },
        ],
        [
            {
                name: "{{name1}}",
                content: {
                    text: "Cancel order with Order Id 0x0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5",
                },
            },
            {
                name: "{{name2}}",
                content: {
                    text: "I'll cancel order with order Id 0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5.",
                    action: "CANCEL_ORDER",
                },
            },
            {
                name: "{{name2}}",
                content: {
                    text: "Successfully cancelled the order. \nOrder Id: 0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5\nTx Hash: 0x1b606c97629d98e04741dd5f90f6f0745c079587ea021c8c55bb63111fa2914b",
                },
            },
        ],
    ] as ActionExample[][],
};

export default cancelOrder;