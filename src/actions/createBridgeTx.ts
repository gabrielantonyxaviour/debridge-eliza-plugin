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

export const createBridgeTx: Action = {
    name: "CREATE_BRIDGE_TX",
    similes: ["BRIDGE_ASSETS", "CROSSCHAIN_BRIDGE", "BRIDGE_TX", 'CREATE_BRIDGE', 'BRIDGE'],
    description: "Bridges assets from one chain to another using deBridge",
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
            // Initialize or update state
            const currentState = !state
                ? await runtime.composeState(message)
                : await runtime.updateRecentMessageState(state);

            const context = composeContext({
                state: currentState,
                template: createBridgeTemplate,
            });

            const content = await generateObjectDeprecated({
                runtime,
                context,
                modelClass: ModelClass.LARGE,
            });

            if (!content) {
                throw new DebridgeError(
                    "Could not parse trading parameters from conversation"
                );
            }

            elizaLogger.info(
                "Raw content from LLM:",
                JSON.stringify(content, null, 2)
            );

            // Validate order parameters
            const validatedOrder = BridgeTxSchema.parse(content);
            elizaLogger.info("Validated bridge order:", validatedOrder);
            const { source_chain, destination_chain, source_asset, destination_asset, amount } = validatedOrder;

            const sourceChain = getChain(source_chain);
            if (!sourceChain) {
                throw new DebridgeError("Could not find source chain");
            }
            const sourceAssetData = source_asset == "NATIVE" ? { address: zeroAddress, decimals: 18, symbol: sourceChain.currency } : await getAsset(source_chain, source_asset);
            if (!sourceAssetData) {
                throw new DebridgeError("Could not find source asset");
            }
            elizaLogger.info("Found Source Asset: ", sourceAssetData.symbol, " with address: ", sourceAssetData.address);
            const destinationChain = getChain(destination_chain);
            if (!destinationChain) {
                throw new DebridgeError("Could not find destination chain");
            }
            const destinationAssetData = destination_asset == "NATIVE" ? { address: zeroAddress, decimals: 18, symbol: destinationChain.currency } : await getAsset(destination_chain, destination_asset);
            if (!destinationAssetData) {
                throw new DebridgeError("Could not find destination asset");
            }
            elizaLogger.info("Found Destination Asset: ", destinationAssetData.symbol, " with address: ", destinationAssetData.address);

            const account = privateKeyToAccount(privateKey as Hex);

            const sourcePublicClient = createPublicClient({
                transport: http(sourceChain.rpcUrl),
            })

            const walletClient = createWalletClient({
                account: account,
                transport: http(sourceChain.rpcUrl),
            })
            const sourceAmount = parseUnits(amount.toString(), sourceAssetData.decimals);
            const requestUrl = `https://dln.debridge.finance/v1.0/dln/order/create-tx?srcChainId=${sourceChain.internalChainId}&srcChainTokenIn=${sourceAssetData.address}&srcChainTokenInAmount=${sourceAmount}&dstChainId=${destinationChain.internalChainId}&dstChainTokenOut=${destinationAssetData.address}&dstChainTokenOutAmount=auto&dstChainTokenOutRecipient=${account.address}&senderAddress=${account.address}&srcChainOrderAuthorityAddress=${account.address}&affiliateFeePercent=0&dstChainOrderAuthorityAddress=${account.address}&enableEstimate=true&prependOperatingExpenses=false&skipSolanaRecipientValidation=false`;
            const response = await fetch(requestUrl)
            const responseData: any = await response.json()
            const { errorMessage, tx } = responseData
            if (errorMessage) {
                throw new DebridgeError(errorMessage)
            }
            elizaLogger.info("Transaction Estimation Successful")
            const txData = {
                to: tx.to as Hex,
                data: tx.data as Hex,
                value: BigInt(tx.value),
            }
            elizaLogger.info("Transaction Data: ", JSON.stringify(txData, null, 2))
            const txHash = await walletClient.sendTransaction(txData as any)
            const receipt = await sourcePublicClient.waitForTransactionReceipt({
                hash: txHash
            })

            const createdOrderTopic = '0xfc8703fd57380f9dd234a89dce51333782d49c5902f307b02f03e014d18fe471';

            // Find the log with the CreatedOrder topic
            const createdOrderLog = receipt.logs.find(
                (log) => log.topics[0].toLowerCase() === createdOrderTopic.toLowerCase()
            );

            if (!createdOrderLog) {
                throw new DebridgeError('CreatedOrder event not found in transaction logs');
            }

            const dataWithoutPrefix = createdOrderLog.data.slice(2);
            const orderId = `0x${dataWithoutPrefix.slice(64, 128)}` as Hex;

            const { destinationTxHash, fulfillmentError } = await waitForOrderFulfillment(orderId, destinationChain.rpcUrl, 30)

            if (fulfillmentError) {
                throw new DebridgeError(fulfillmentError)
            }
            elizaLogger.info(`Successfully bridged ${amount + " " + source_asset == 'NATIVE' ? sourceChain.currency : sourceAssetData.symbol} from ${source_chain} to ${destination_asset == "NATIVE" ? destinationChain.currency : destinationAssetData.symbol} on ${destination_chain}\nSource Tx Hash: ${txHash}\nDestination Tx Hash: ${destinationTxHash}\nOrder Id: ${orderId}`)
            if (callback) {
                elizaLogger.info("Returning repsonse to callback function")
                callback({
                    text: `Successfully bridged ${amount + " " + source_asset == 'NATIVE' ? sourceChain.currency : sourceAssetData.symbol} from ${source_chain} to ${destination_asset == "NATIVE" ? destinationChain.currency : destinationAssetData.symbol} on ${destination_chain}\nSource Tx Hash: ${txHash}\nDestination Tx Hash: ${destinationTxHash}\nOrder Id: ${orderId}`,
                    content: {
                        sourceTxHash: txHash,
                        destinationTxHash,
                        orderId
                    }
                })
            }

            return true;
        } catch (error) {
            elizaLogger.error("Error bridging assets using debridge: ", error);
            if (callback) {
                callback({
                    text: `Error bridging assets using debridge: ${error.message}`,
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
                    text: "Bridge 0.001 ETH from Ethereum to Arbitrum",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll bridge 0.001 ETH from Ethereum to Arbitrum.",
                    action: "BRIDGE_ASSETS",
                    details: {
                        source_chain: 1,
                        destination_chain: 42161,
                        source_asset: "NATIVE",
                        destination_asset: "NATIVE",
                        amount: "0.001"
                    }
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Successfully bridged 0.001 ETH from Ethereum to Arbitrum.",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Send 46 DAI from Ethereum to Optimism",
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "I'll send 46 DAI from Ethereum to Optimism.",
                    action: "BRIDGE_ASSETS",
                    details: {
                        source_chain: 1,
                        destination_chain: 10,
                        source_asset: "DAI",
                        destination_asset: "DAI",
                        amount: "46"
                    }
                },
            },
            {
                user: "{{agent}}",
                content: {
                    text: "Successfully sent 46 DAI from Ethereum to Optimism.",
                },
            },
        ],
    ] as ActionExample[][],

};

export default createBridgeTx;