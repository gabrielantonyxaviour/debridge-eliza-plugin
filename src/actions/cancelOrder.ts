import {
    type Action,
    type ActionExample,
    type IAgentRuntime,
    type Memory,
    type State,
    type HandlerCallback,
    composeContext,
    elizaLogger,
    generateObjectDeprecated,
    ModelClass,
} from "@elizaos/core";
import {
    BridgeTxSchema,
    DebridgeError,
} from "../types";
import { createBridgeTemplate } from "../templates";
import { createPublicClient, createWalletClient, Hex, http, zeroAddress, parseUnits, parseAbiItem } from "viem"

import { privateKeyToAccount } from "viem/accounts"
import { getAsset, getChain, waitForOrderFulfillment } from "../lib/utils";

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
                    // TODO: Check if its order id or tx hash
                    // TODO: Cancel the order if still active
                } else {
                    elizaLogger.error("Invalid Order Id string or Tx Hash. Make sure its properly formatted");
                    throw new DebridgeError("Invalid Order Id string or Tx Hash. Make sure its properly formatted")
                }
            } else {
                // TODO: Cancel all orders
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
                user: "{{user1}}",
                content: {
                    text: "Cancel order with Tx Hash 0x0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll cancel order with Tx Hash 0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5.",
                    action: "CANCEL_ORDERS",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Successfully cancelled the order. \nOrder Id: 0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5\nTx Hash: 0x1b606c97629d98e04741dd5f90f6f0745c079587ea021c8c55bb63111fa2914b",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Cancel order with Order Id 0x0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll cancel order with order Id 0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5.",
                    action: "CANCEL_ORDERS",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Successfully cancelled the order. \nOrder Id: 0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5\nTx Hash: 0x1b606c97629d98e04741dd5f90f6f0745c079587ea021c8c55bb63111fa2914b",
                },
            },
        ],
    ] as ActionExample[][],
};

export default cancelOrder;