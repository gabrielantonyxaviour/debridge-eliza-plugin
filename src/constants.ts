import { SupportedChain } from "./types";

const dlnDestination = "0xE7351Fd770A37282b91D153Ee690B63579D6dd7f"

const supportedChains: SupportedChain[] = [
    {
        "chain": "Arbitrum",
        "chainId": 42161,
        "internalChainId": 42161,
        "flatFee": 0.001,
        "currency": "ETH",
        "rpcUrl": "https://arbitrum.llamarpc.com"
    },
    {
        "chain": "Avalanche",
        "chainId": 43114,
        "internalChainId": 43114,
        "flatFee": 0.05,
        "currency": "AVAX",
        "rpcUrl": "https://avax.meowrpc.com"
    },
    {
        "chain": "BNB Chain",
        "chainId": 56,
        "internalChainId": 56,
        "flatFee": 0.005,
        "currency": "BNB",
        "rpcUrl": "https://binance.llamarpc.com"
    },
    {
        "chain": "Ethereum",
        "chainId": 1,
        "internalChainId": 1,
        "flatFee": 0.001,
        "currency": "ETH",
        "rpcUrl": "https://eth.llamarpc.com"
    },
    {
        "chain": "Polygon",
        "chainId": 137,
        "internalChainId": 137,
        "flatFee": 0.5,
        "currency": "MATIC",
        "rpcUrl": "https://polygon.llamarpc.com"
    },
    {
        "chain": "Solana",
        "chainId": 7565164,
        "internalChainId": 7565164,
        "flatFee": 0.015,
        "currency": "SOL",
        "rpcUrl": "https://api.mainnet-beta.solana.com"
    },
    {
        "chain": "Linea",
        "chainId": 59144,
        "internalChainId": 59144,
        "flatFee": 0.001,
        "currency": "ETH",
        "rpcUrl": "https://linea.drpc.org"
    },
    {
        "chain": "Base",
        "chainId": 8453,
        "internalChainId": 8453,
        "flatFee": 0.001,
        "currency": "ETH",
        "rpcUrl": "https://1rpc.io/base"
    },
    {
        "chain": "Optimism",
        "chainId": 10,
        "internalChainId": 10,
        "flatFee": 0.001,
        "currency": "ETH",
        "rpcUrl": "https://optimism.llamarpc.com"
    },
    {
        "chain": "Neon",
        "chainId": 245022934,
        "internalChainId": 100000001,
        "flatFee": 0.75,
        "currency": "NEON",
        "rpcUrl": "https://neon-proxy-mainnet.solana.p2p.org"
    },
    {
        "chain": "Gnosis",
        "chainId": 100,
        "internalChainId": 100000002,
        "flatFee": 1,
        "currency": "xDAI",
        "rpcUrl": "https://1rpc.io/gnosis"
    },
    {
        "chain": "Metis",
        "chainId": 1088,
        "internalChainId": 100000004,
        "flatFee": 0.02,
        "currency": "METIS",
        "rpcUrl": "https://andromeda.metis.io/?owner=1088"
    },
    {
        "chain": "Bitrock",
        "chainId": 7171,
        "internalChainId": 100000005,
        "flatFee": 20,
        "currency": "BROCK",
        "rpcUrl": "https://connect.bit-rock.io"
    },
    {
        "chain": "Sonic",
        "chainId": 146,
        "internalChainId": 100000014,
        "flatFee": 1,
        "currency": "S",
        "rpcUrl": "https://sonic.drpc.org"
    },
    {
        "chain": "CrossFi",
        "chainId": 4158,
        "internalChainId": 100000006,
        "flatFee": 1,
        "currency": "XFI",
        "rpcUrl": "https://rpc.mainnet.ms"
    },
    {
        "chain": "Cronos zkEVM",
        "chainId": 388,
        "internalChainId": 100000010,
        "flatFee": 7,
        "currency": "zkCRO",
        "rpcUrl": "https://cronos.drpc.org"
    },
    {
        "chain": "Abstract",
        "chainId": 2741,
        "internalChainId": 100000017,
        "flatFee": 0.0004,
        "currency": "ETH",
        "rpcUrl": "https://api.mainnet.abs.xyz"
    },
    {
        "chain": "Berachain",
        "chainId": 80094,
        "internalChainId": 100000020,
        "flatFee": 0.02,
        "currency": "BERA",
        "rpcUrl": "https://berachain-rpc.publicnode.com"
    },
    {
        "chain": "Story",
        "chainId": 1514,
        "internalChainId": 100000013,
        "flatFee": 0.01,
        "currency": "IP",
        "rpcUrl": "https://mainnet.storyrpc.io"
    },
    {
        "chain": "HyperEVM",
        "chainId": 999,
        "internalChainId": 100000022,
        "flatFee": 0.05,
        "currency": "WHYPE",
        "rpcUrl": "https://rpc.hyperliquid.xyz/evm"
    },
    {
        "chain": "Zircuit",
        "chainId": 48900,
        "internalChainId": 100000015,
        "flatFee": 0.001,
        "currency": "ETH",
        "rpcUrl": "https://mainnet.zircuit.com"
    }
];

export { supportedChains, dlnDestination };
