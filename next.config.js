// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_RPC_ENDPOINT_BASE_SEPOLIA: process.env.NEXT_PUBLIC_RPC_ENDPOINT_BASE_SEPOLIA,
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    RPC_ENDPOINT_BASE_SEPOLIA: process.env.RPC_ENDPOINT_BASE_SEPOLIA,
    RPC_ENDPOINT_BASE_MAINNET: process.env.RPC_ENDPOINT_BASE_MAINNET,
    AIRSTACK: process.env.AIRSTACK,
    BASESCAN_API: process.env.BASESCAN_API,
  },
};

module.exports = nextConfig;
