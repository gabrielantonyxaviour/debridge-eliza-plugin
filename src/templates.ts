export const createBridgeTemplate = `Look at your LAST RESPONSE in the conversation where you confirmed a bridge request.
Based on ONLY that last message, extract the bridging details:

For deBridge asset bridging:
- Bridging native to native assets:  
  "bridge 0.001 ETH from Ethereum to Arbitrum" -> { "source_chain": 1, "destination_chain": 42161, "source_asset": "NATIVE", "destination_asset": "NATIVE", "amount": "0.001" }  
  "move 1.3 ETH from Ethereum over to Arbitrum" -> { "source_chain": 1, "destination_chain": 42161, "source_asset": "NATIVE", "destination_asset": "NATIVE", "amount": "1.3" }  
  "bridge 50 MATIC from Polygon to BNB Chain" -> { "source_chain": 137, "destination_chain": 56, "source_asset": "NATIVE", "destination_asset": "NATIVE", "amount": "50" }  
  "transfer 21 MATIC to BNB Chain from Polygon" -> { "source_chain": 137, "destination_chain": 56, "source_asset": "NATIVE", "destination_asset": "NATIVE", "amount": "21" }  

- Bridging ERC20 tokens to ERC20 tokens:  
  "send 46 DAI from Ethereum to Optimism" -> { "source_chain": 1, "destination_chain": 10, "source_asset": "DAI", "destination_asset": "DAI", "amount": "46" }  
  "move 100 LINK from Ethereum to WETH on OP" -> { "source_chain": 1, "destination_chain": 10, "source_asset": "LINK", "destination_asset": "WETH", "amount": "100" }  
  "send 1 WETH from Arbitrum to USDC on Base" -> { "source_chain": 42161, "destination_chain": 8453, "source_asset": "WETH", "destination_asset": "USDC", "amount": "1" }  
  "transfer 0.4 WETH from Arbitrum over to Base" -> { "source_chain": 42161, "destination_chain": 8453, "source_asset": "WETH", "destination_asset": "WETH", "amount": "0.4" }  

- Bridging native to ERC20 tokens:  
  "send 1 ETH from Ethereum and receive USDC on Linea" -> { "source_chain": 1, "destination_chain": 59144, "source_asset": "NATIVE", "destination_asset": "USDC", "amount": "1" }  
  "swap 0.88 ETH from Ethereum to WETH on Linea" -> { "source_chain": 1, "destination_chain": 59144, "source_asset": "NATIVE", "destination_asset": "WETH", "amount": "0.88" }  

- Bridging ERC20 tokens to native:  
  "bridge 100 USDC from Avalanche to POL on Polygon" -> { "source_chain": 43114, "destination_chain": 137, "source_asset": "USDC", "destination_asset": "NATIVE", "amount": "100" }  
  "convert 23.45 USDC from Avalanche into native on Ethereum" -> { "source_chain": 43114, "destination_chain": 1, "source_asset": "USDC", "destination_asset": "NATIVE", "amount": "23.45" }  
  "convert 44 USDT from Avalanche into S on Sonic" -> { "source_chain": 43114, "destination_chain": 100000014, "source_asset": "USDT", "destination_asset": "NATIVE", "amount": "100" }  

\`\`\`json
{
    "source_chain": "<chain id>",
    "destination_chain": "<chain id>",
    "source_asset": "<Asset Symbol or NATIVE for native>",
    "destination_asset": "<Asset Symbol or NATIVE for native>",
    "amount": "<amount of the asset>"
}
\`\`\`

Note:  
- source_chain and destination_chain must be internal chain IDs.  
- source_asset:  
  - Use "NATIVE" for native tokens.  
  - Use the Asset Symbol for bridged tokens.  
- destination_asset:  
  - If bridging to native, use "NATIVE".  
  - If swapping to an ERC20, use the Asset Symbol.  
- amount is the quantity of the asset to bridge.  

Recent conversation:
{{recentMessages}}`;

