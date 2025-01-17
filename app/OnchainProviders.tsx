// OnchainProviders.tsx
"use client";

import { ReactNode } from "react";
import { base } from "viem/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";

type Props = { children: ReactNode };

const OnchainProviders = ({ children }: Props) => {
  const apiKey = process.env.NEXT_PUBLIC_RPC_ENDPOINT;

  if (!apiKey) {
    throw new Error(
      "API key is not defined. Please set NEXT_PUBLIC_RPC_ENDPOINT_BASE_SEPOLIA environment variable.",
    );
  }

  return <OnchainKitProvider chain={base}>{children}</OnchainKitProvider>;
};

export default OnchainProviders;
