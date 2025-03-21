# ElizaOS Debridge Protocol Plugin

A plugin for ElizaOS that enables interaction with Debridge - a cross-chain asset bridging protocol that allows for instant movement of assets across different blockchains.

## Features

- **Cross-Chain Bridging**: Bridge assets between supported blockchains instantly
- **Order Status Tracking**: Check the status of bridge transactions using order ID or transaction hash
- **Order Cancellation**: Cancel pending or delayed orders through natural language commands
- **Natural Language Interface**: Perform complex bridging operations with simple prompts
- **Multi-Chain Support**: Bridge assets across all Debridge-supported blockchains

## Prerequisites

Before using this plugin, you'll need:

1. A Debridge private key for transaction signing
2. ElizaOS installed and configured

## Installation

Install the plugin via the ElizaOS CLI:

```bash
npx @elizaos/cli plugins add @elizaos/plugin-debridge
```

To remove the plugin:

```bash
npx @elizaos/cli plugins remove @elizaos/plugin-debridge
```

## Configuration

Add the plugin to your ElizaOS agent configuration and provide the necessary credentials:

```javascript
// agent.config.js
export default {
  // Other ElizaOS configuration
  plugins: ["debridge"],
  settings: {
    DEBRIDGE_PRIVATE_KEY: "0x...",  // Your Debridge private key
    DEBRIDGE_API_KEY: "..."        // Optional: Your Debridge API key for better rate limits
  }
}
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DEBRIDGE_PRIVATE_KEY` | Yes | Private key for signing Debridge transactions |
| `DEBRIDGE_API_KEY` | No | API key for Debridge services (provides better rate limits) |

## Usage

Once configured, the plugin provides the following actions through natural language prompts. All operations use native currencies with their respective flat fees (as listed in the Supported Blockchains section):

### Bridge Assets

Bridge assets between supported blockchains:

```
User: Bridge 0.0005 ETH from Base to Arbitrum
Agent: I'll initiate bridging 0.0005 ETH from Base to Arbitrum.
*Agent processes bridge transaction and provides order details*
```

### Check Order Status

Track the status of a bridging transaction:

```
User: What's the status of my order with ID 0x1234...
Agent: Let me check the status of your order.
*Agent displays current order status and details*
```

### Track Transaction

Check bridging status using a transaction hash:

```
User: Check the status of transaction 0x5678...
Agent: Here's the current status of your bridging transaction:
*Agent displays transaction status and related order details*
```

### Cancel Order

Cancel a pending or delayed bridging transaction:

```
User: Cancel my order with ID 0x1234...
Agent: I'll initiate cancellation of your bridging order.
*Agent cancels order and provides confirmation details*
```

## Supported Actions

| Action | Description |
|---|---|
| `BRIDGE_ASSETS` | Bridge assets between supported blockchains |
| `CHECK_ORDER` | Check status of a bridging order by order ID |
| `TRACK_TRANSACTION` | Track a bridging transaction by transaction hash |
| `CANCEL_ORDER` | Cancel a pending or delayed bridging order |

## Debridge Protocol Integration

This plugin integrates with Debridge Protocol, which provides:

- Cross-chain asset bridging without liquidity pools
- Deep liquidity for all supported assets
- Tight spreads and guaranteed rates
- Decentralized validation through independent validators
- Support for arbitrary data transfer across chains

## Technical Details

### Transaction Signing

The plugin uses the provided private key to sign all bridging transactions, enabling secure asset transfers across blockchains.

### API Integration

When an API key is provided, the plugin leverages enhanced rate limits and additional features available through the Debridge API.

### Supported Blockchains

The plugin supports the following blockchains integrated with Debridge Protocol:

| Chain | Chain ID | Native Currency | Flat Fee |
|-------|----------|----------------|----------|
| Arbitrum | 42161 | ETH | 0.001 |
| Avalanche | 43114 | AVAX | 0.05 |
| BNB Chain | 56 | BNB | 0.005 |
| Ethereum | 1 | ETH | 0.001 |
| Polygon | 137 | MATIC | 0.5 |
| Solana | 7565164 | SOL | 0.015 |
| Linea | 59144 | ETH | 0.001 |
| Base | 8453 | ETH | 0.001 |
| Optimism | 10 | ETH | 0.001 |
| Neon | 245022934 | NEON | 0.75 |
| Gnosis | 100 | xDAI | 1 |
| Metis | 1088 | METIS | 0.02 |
| Bitrock | 7171 | BROCK | 20 |
| Sonic | 146 | S | 1 |
| CrossFi | 4158 | XFI | 1 |
| Cronos zkEVM | 388 | zkCRO | 7 |
| Abstract | 2741 | ETH | 0.0004 |
| Berachain | 80094 | BERA | 0.02 |
| Story | 1514 | IP | 0.01 |
| HyperEVM | 999 | WHYPE | 0.05 |
| Zircuit | 48900 | ETH | 0.001 |

## Troubleshooting

### Common Issues

1. **Transaction Failures**: 
   - Ensure your private key has sufficient funds on the source blockchain
   - Verify that the destination chain is supported and operational

2. **Order Delays**: 
   - Check network congestion on the source or destination chain
   - Verify transaction parameters are correct

3. **API Rate Limiting**:
   - Consider adding a DEBRIDGE_API_KEY for better rate limits
   - Reduce the frequency of status check requests

## Links and Resources

- [Debridge Protocol Documentation](https://docs.debridge.finance)
- [Debridge Explorer](https://explorer.debridge.finance)
- [ElizaOS Documentation](https://docs.elizaos.com)