import { SupportedChain } from "./types";

const dlnDestination = "0xE7351Fd770A37282b91D153Ee690B63579D6dd7f"
const dlnCrosschainForwarder = '0x663dc15d3c1ac63ff12e45ab68fea3f0a883c251'
const dlnSource = '0xeF4fB24aD0916217251F553c0596F8Edc630EB66'
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

const dlnDestinationAbi = [{ "inputs": [], "name": "AdminBadRole", "type": "error" }, { "inputs": [{ "internalType": "bytes", "name": "expectedBeneficiary", "type": "bytes" }], "name": "AllowOnlyForBeneficiary", "type": "error" }, { "inputs": [], "name": "CallProxyBadRole", "type": "error" }, { "inputs": [], "name": "EthTransferFailed", "type": "error" }, { "inputs": [], "name": "GovMonitoringBadRole", "type": "error" }, { "inputs": [], "name": "IncorrectOrderStatus", "type": "error" }, { "inputs": [], "name": "MismatchGiveChainId", "type": "error" }, { "inputs": [], "name": "MismatchNativeTakerAmount", "type": "error" }, { "inputs": [], "name": "MismatchTakerAmount", "type": "error" }, { "inputs": [], "name": "MismatchedOrderId", "type": "error" }, { "inputs": [], "name": "MismatchedTransferAmount", "type": "error" }, { "inputs": [{ "internalType": "bytes", "name": "nativeSender", "type": "bytes" }, { "internalType": "uint256", "name": "chainIdFrom", "type": "uint256" }], "name": "NativeSenderBadRole", "type": "error" }, { "inputs": [], "name": "NotSupportedDstChain", "type": "error" }, { "inputs": [], "name": "SignatureInvalidV", "type": "error" }, { "inputs": [], "name": "TransferAmountNotCoverFees", "type": "error" }, { "inputs": [], "name": "Unauthorized", "type": "error" }, { "inputs": [], "name": "UnexpectedBatchSize", "type": "error" }, { "inputs": [], "name": "UnknownEngine", "type": "error" }, { "inputs": [], "name": "WrongAddressLength", "type": "error" }, { "inputs": [], "name": "WrongArgument", "type": "error" }, { "inputs": [], "name": "WrongChain", "type": "error" }, { "inputs": [], "name": "WrongToken", "type": "error" }, { "inputs": [], "name": "ZeroAddress", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bytes32", "name": "orderId", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "orderTakeFinalAmount", "type": "uint256" }], "name": "DecreasedTakeAmount", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "oldAdapter", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newAdapter", "type": "address" }], "name": "ExternalCallAdapterUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "components": [{ "internalType": "uint64", "name": "makerOrderNonce", "type": "uint64" }, { "internalType": "bytes", "name": "makerSrc", "type": "bytes" }, { "internalType": "uint256", "name": "giveChainId", "type": "uint256" }, { "internalType": "bytes", "name": "giveTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "giveAmount", "type": "uint256" }, { "internalType": "uint256", "name": "takeChainId", "type": "uint256" }, { "internalType": "bytes", "name": "takeTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "takeAmount", "type": "uint256" }, { "internalType": "bytes", "name": "receiverDst", "type": "bytes" }, { "internalType": "bytes", "name": "givePatchAuthoritySrc", "type": "bytes" }, { "internalType": "bytes", "name": "orderAuthorityAddressDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedTakerDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedCancelBeneficiarySrc", "type": "bytes" }, { "internalType": "bytes", "name": "externalCall", "type": "bytes" }], "indexed": false, "internalType": "struct DlnOrderLib.Order", "name": "order", "type": "tuple" }, { "indexed": false, "internalType": "bytes32", "name": "orderId", "type": "bytes32" }, { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "address", "name": "unlockAuthority", "type": "address" }], "name": "FulfilledOrder", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint8", "name": "version", "type": "uint8" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "oldValue", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newValue", "type": "uint256" }], "name": "MaxOrderCountPerBatchEvmUnlockChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "oldValue", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newValue", "type": "uint256" }], "name": "MaxOrderCountPerBatchSolanaUnlockChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "components": [{ "internalType": "uint64", "name": "makerOrderNonce", "type": "uint64" }, { "internalType": "bytes", "name": "makerSrc", "type": "bytes" }, { "internalType": "uint256", "name": "giveChainId", "type": "uint256" }, { "internalType": "bytes", "name": "giveTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "giveAmount", "type": "uint256" }, { "internalType": "uint256", "name": "takeChainId", "type": "uint256" }, { "internalType": "bytes", "name": "takeTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "takeAmount", "type": "uint256" }, { "internalType": "bytes", "name": "receiverDst", "type": "bytes" }, { "internalType": "bytes", "name": "givePatchAuthoritySrc", "type": "bytes" }, { "internalType": "bytes", "name": "orderAuthorityAddressDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedTakerDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedCancelBeneficiarySrc", "type": "bytes" }, { "internalType": "bytes", "name": "externalCall", "type": "bytes" }], "indexed": false, "internalType": "struct DlnOrderLib.Order", "name": "order", "type": "tuple" }, { "indexed": false, "internalType": "bytes32", "name": "orderId", "type": "bytes32" }, { "indexed": false, "internalType": "bytes", "name": "cancelBeneficiary", "type": "bytes" }, { "indexed": false, "internalType": "bytes32", "name": "submissionId", "type": "bytes32" }], "name": "SentOrderCancel", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bytes32", "name": "orderId", "type": "bytes32" }, { "indexed": false, "internalType": "bytes", "name": "beneficiary", "type": "bytes" }, { "indexed": false, "internalType": "bytes32", "name": "submissionId", "type": "bytes32" }], "name": "SentOrderUnlock", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "chainIdFrom", "type": "uint256" }, { "indexed": false, "internalType": "bytes", "name": "dlnSourceAddress", "type": "bytes" }, { "indexed": false, "internalType": "enum DlnOrderLib.ChainEngine", "name": "chainEngine", "type": "uint8" }], "name": "SetDlnSourceAddress", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "inputs": [], "name": "BPS_DENOMINATOR", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "EVM_ADDRESS_LENGTH", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "GOVMONITORING_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_ADDRESS_LENGTH", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "NATIVE_AMOUNT_DIVIDER_FOR_TRANSFER_TO_SOLANA", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "SOLANA_ADDRESS_LENGTH", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "chainEngines", "outputs": [{ "internalType": "enum DlnOrderLib.ChainEngine", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "deBridgeGate", "outputs": [{ "internalType": "contract IDeBridgeGate", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "dlnSourceAddresses", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "externalCallAdapter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint64", "name": "makerOrderNonce", "type": "uint64" }, { "internalType": "bytes", "name": "makerSrc", "type": "bytes" }, { "internalType": "uint256", "name": "giveChainId", "type": "uint256" }, { "internalType": "bytes", "name": "giveTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "giveAmount", "type": "uint256" }, { "internalType": "uint256", "name": "takeChainId", "type": "uint256" }, { "internalType": "bytes", "name": "takeTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "takeAmount", "type": "uint256" }, { "internalType": "bytes", "name": "receiverDst", "type": "bytes" }, { "internalType": "bytes", "name": "givePatchAuthoritySrc", "type": "bytes" }, { "internalType": "bytes", "name": "orderAuthorityAddressDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedTakerDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedCancelBeneficiarySrc", "type": "bytes" }, { "internalType": "bytes", "name": "externalCall", "type": "bytes" }], "internalType": "struct DlnOrderLib.Order", "name": "_order", "type": "tuple" }, { "internalType": "uint256", "name": "_fulFillAmount", "type": "uint256" }, { "internalType": "bytes32", "name": "_orderId", "type": "bytes32" }, { "internalType": "bytes", "name": "_permitEnvelope", "type": "bytes" }, { "internalType": "address", "name": "_unlockAuthority", "type": "address" }, { "internalType": "address", "name": "_externalCallRewardBeneficiary", "type": "address" }], "name": "fulfillOrder", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint64", "name": "makerOrderNonce", "type": "uint64" }, { "internalType": "bytes", "name": "makerSrc", "type": "bytes" }, { "internalType": "uint256", "name": "giveChainId", "type": "uint256" }, { "internalType": "bytes", "name": "giveTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "giveAmount", "type": "uint256" }, { "internalType": "uint256", "name": "takeChainId", "type": "uint256" }, { "internalType": "bytes", "name": "takeTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "takeAmount", "type": "uint256" }, { "internalType": "bytes", "name": "receiverDst", "type": "bytes" }, { "internalType": "bytes", "name": "givePatchAuthoritySrc", "type": "bytes" }, { "internalType": "bytes", "name": "orderAuthorityAddressDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedTakerDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedCancelBeneficiarySrc", "type": "bytes" }, { "internalType": "bytes", "name": "externalCall", "type": "bytes" }], "internalType": "struct DlnOrderLib.Order", "name": "_order", "type": "tuple" }, { "internalType": "uint256", "name": "_fulFillAmount", "type": "uint256" }, { "internalType": "bytes32", "name": "_orderId", "type": "bytes32" }, { "internalType": "bytes", "name": "_permitEnvelope", "type": "bytes" }, { "internalType": "address", "name": "_unlockAuthority", "type": "address" }], "name": "fulfillOrder", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getChainId", "outputs": [{ "internalType": "uint256", "name": "cid", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint64", "name": "makerOrderNonce", "type": "uint64" }, { "internalType": "bytes", "name": "makerSrc", "type": "bytes" }, { "internalType": "uint256", "name": "giveChainId", "type": "uint256" }, { "internalType": "bytes", "name": "giveTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "giveAmount", "type": "uint256" }, { "internalType": "uint256", "name": "takeChainId", "type": "uint256" }, { "internalType": "bytes", "name": "takeTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "takeAmount", "type": "uint256" }, { "internalType": "bytes", "name": "receiverDst", "type": "bytes" }, { "internalType": "bytes", "name": "givePatchAuthoritySrc", "type": "bytes" }, { "internalType": "bytes", "name": "orderAuthorityAddressDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedTakerDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedCancelBeneficiarySrc", "type": "bytes" }, { "internalType": "bytes", "name": "externalCall", "type": "bytes" }], "internalType": "struct DlnOrderLib.Order", "name": "_order", "type": "tuple" }], "name": "getOrderId", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract IDeBridgeGate", "name": "_deBridgeGate", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "maxOrderCountPerBatchEvmUnlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxOrderCountPerBatchSolanaUnlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint64", "name": "makerOrderNonce", "type": "uint64" }, { "internalType": "bytes", "name": "makerSrc", "type": "bytes" }, { "internalType": "uint256", "name": "giveChainId", "type": "uint256" }, { "internalType": "bytes", "name": "giveTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "giveAmount", "type": "uint256" }, { "internalType": "uint256", "name": "takeChainId", "type": "uint256" }, { "internalType": "bytes", "name": "takeTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "takeAmount", "type": "uint256" }, { "internalType": "bytes", "name": "receiverDst", "type": "bytes" }, { "internalType": "bytes", "name": "givePatchAuthoritySrc", "type": "bytes" }, { "internalType": "bytes", "name": "orderAuthorityAddressDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedTakerDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedCancelBeneficiarySrc", "type": "bytes" }, { "internalType": "bytes", "name": "externalCall", "type": "bytes" }], "internalType": "struct DlnOrderLib.Order", "name": "_order", "type": "tuple" }, { "internalType": "uint256", "name": "_newSubtrahend", "type": "uint256" }], "name": "patchOrderTake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32[]", "name": "_orderIds", "type": "bytes32[]" }, { "internalType": "address", "name": "_beneficiary", "type": "address" }, { "internalType": "uint256", "name": "_executionFee", "type": "uint256" }], "name": "sendBatchEvmUnlock", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint64", "name": "makerOrderNonce", "type": "uint64" }, { "internalType": "bytes", "name": "makerSrc", "type": "bytes" }, { "internalType": "uint256", "name": "giveChainId", "type": "uint256" }, { "internalType": "bytes", "name": "giveTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "giveAmount", "type": "uint256" }, { "internalType": "uint256", "name": "takeChainId", "type": "uint256" }, { "internalType": "bytes", "name": "takeTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "takeAmount", "type": "uint256" }, { "internalType": "bytes", "name": "receiverDst", "type": "bytes" }, { "internalType": "bytes", "name": "givePatchAuthoritySrc", "type": "bytes" }, { "internalType": "bytes", "name": "orderAuthorityAddressDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedTakerDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedCancelBeneficiarySrc", "type": "bytes" }, { "internalType": "bytes", "name": "externalCall", "type": "bytes" }], "internalType": "struct DlnOrderLib.Order[]", "name": "_orders", "type": "tuple[]" }, { "internalType": "bytes32", "name": "_beneficiary", "type": "bytes32" }, { "internalType": "uint256", "name": "_executionFee", "type": "uint256" }, { "internalType": "uint64", "name": "_initWalletIfNeededInstructionReward", "type": "uint64" }, { "internalType": "uint64", "name": "_claimUnlockInstructionReward", "type": "uint64" }], "name": "sendBatchSolanaUnlock", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint64", "name": "makerOrderNonce", "type": "uint64" }, { "internalType": "bytes", "name": "makerSrc", "type": "bytes" }, { "internalType": "uint256", "name": "giveChainId", "type": "uint256" }, { "internalType": "bytes", "name": "giveTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "giveAmount", "type": "uint256" }, { "internalType": "uint256", "name": "takeChainId", "type": "uint256" }, { "internalType": "bytes", "name": "takeTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "takeAmount", "type": "uint256" }, { "internalType": "bytes", "name": "receiverDst", "type": "bytes" }, { "internalType": "bytes", "name": "givePatchAuthoritySrc", "type": "bytes" }, { "internalType": "bytes", "name": "orderAuthorityAddressDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedTakerDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedCancelBeneficiarySrc", "type": "bytes" }, { "internalType": "bytes", "name": "externalCall", "type": "bytes" }], "internalType": "struct DlnOrderLib.Order", "name": "_order", "type": "tuple" }, { "internalType": "address", "name": "_cancelBeneficiary", "type": "address" }, { "internalType": "uint256", "name": "_executionFee", "type": "uint256" }], "name": "sendEvmOrderCancel", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_orderId", "type": "bytes32" }, { "internalType": "address", "name": "_beneficiary", "type": "address" }, { "internalType": "uint256", "name": "_executionFee", "type": "uint256" }], "name": "sendEvmUnlock", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint64", "name": "makerOrderNonce", "type": "uint64" }, { "internalType": "bytes", "name": "makerSrc", "type": "bytes" }, { "internalType": "uint256", "name": "giveChainId", "type": "uint256" }, { "internalType": "bytes", "name": "giveTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "giveAmount", "type": "uint256" }, { "internalType": "uint256", "name": "takeChainId", "type": "uint256" }, { "internalType": "bytes", "name": "takeTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "takeAmount", "type": "uint256" }, { "internalType": "bytes", "name": "receiverDst", "type": "bytes" }, { "internalType": "bytes", "name": "givePatchAuthoritySrc", "type": "bytes" }, { "internalType": "bytes", "name": "orderAuthorityAddressDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedTakerDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedCancelBeneficiarySrc", "type": "bytes" }, { "internalType": "bytes", "name": "externalCall", "type": "bytes" }], "internalType": "struct DlnOrderLib.Order", "name": "_order", "type": "tuple" }, { "internalType": "bytes32", "name": "_cancelBeneficiary", "type": "bytes32" }, { "internalType": "uint256", "name": "_executionFee", "type": "uint256" }, { "internalType": "uint64", "name": "_reward1", "type": "uint64" }, { "internalType": "uint64", "name": "_reward2", "type": "uint64" }], "name": "sendSolanaOrderCancel", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint64", "name": "makerOrderNonce", "type": "uint64" }, { "internalType": "bytes", "name": "makerSrc", "type": "bytes" }, { "internalType": "uint256", "name": "giveChainId", "type": "uint256" }, { "internalType": "bytes", "name": "giveTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "giveAmount", "type": "uint256" }, { "internalType": "uint256", "name": "takeChainId", "type": "uint256" }, { "internalType": "bytes", "name": "takeTokenAddress", "type": "bytes" }, { "internalType": "uint256", "name": "takeAmount", "type": "uint256" }, { "internalType": "bytes", "name": "receiverDst", "type": "bytes" }, { "internalType": "bytes", "name": "givePatchAuthoritySrc", "type": "bytes" }, { "internalType": "bytes", "name": "orderAuthorityAddressDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedTakerDst", "type": "bytes" }, { "internalType": "bytes", "name": "allowedCancelBeneficiarySrc", "type": "bytes" }, { "internalType": "bytes", "name": "externalCall", "type": "bytes" }], "internalType": "struct DlnOrderLib.Order", "name": "_order", "type": "tuple" }, { "internalType": "bytes32", "name": "_beneficiary", "type": "bytes32" }, { "internalType": "uint256", "name": "_executionFee", "type": "uint256" }, { "internalType": "uint64", "name": "_initWalletIfNeededInstructionReward", "type": "uint64" }, { "internalType": "uint64", "name": "_claimUnlockInstructionReward", "type": "uint64" }], "name": "sendSolanaUnlock", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_chainIdFrom", "type": "uint256" }, { "internalType": "bytes", "name": "_dlnSourceAddress", "type": "bytes" }, { "internalType": "enum DlnOrderLib.ChainEngine", "name": "_chainEngine", "type": "uint8" }], "name": "setDlnSourceAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_externalCallAdapter", "type": "address" }], "name": "setExternalCallAdapter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newEvmCount", "type": "uint256" }, { "internalType": "uint256", "name": "_newSolanaCount", "type": "uint256" }], "name": "setMaxOrderCountsPerBatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "takeOrders", "outputs": [{ "internalType": "enum DlnDestination.OrderTakeStatus", "name": "status", "type": "uint8" }, { "internalType": "address", "name": "takerAddress", "type": "address" }, { "internalType": "uint256", "name": "giveChainId", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "takePatches", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" }]

export { supportedChains, dlnDestination, dlnCrosschainForwarder, dlnSource, dlnDestinationAbi };
