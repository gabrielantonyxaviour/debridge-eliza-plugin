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
                    text: "Check all my orders",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll check all your open orders.",
                    action: "VIEW_ORDER_STATUS",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "You have 2 open orders:\n1. Order Id: 0x123abc... - Status: Pending\n2. Order Id: 0x456def... - Status: Processing",
                },
            },
        ],
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
                    text: "Order status information:\nOrder Id: 0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5\nStatus: Completed\nTx Hash: 0x1b606c97629d98e04741dd5f90f6f0745c079587ea021c8c55bb63111fa2914b\nTimestamp: 2025-03-18 14:22:31 UTC",
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
                    text: "Order details:\nOrder Id: 0992a5970e525ad22eb73e7e213621c731723a776663e3fdb3acafbec06787c5\nStatus: Completed\nTx Hash: 0x1b606c97629d98e04741dd5f90f6f0745c079587ea021c8c55bb63111fa2914b\nAmount: 1.5 ETH\nFrom: Ethereum\nTo: Arbitrum\nTimestamp: 2025-03-18 14:22:31 UTC",
                },
            },
        ],
    ],

};

export default viewOrderStatus;