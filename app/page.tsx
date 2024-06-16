"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import WalletLink from "@coinbase/wallet-sdk";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import './globals.css';
import BasedText from './BasedText';


// Log the available exports from @coinbase/onchainkit
import * as OnchainKit from "@coinbase/onchainkit";
console.log(OnchainKit);

// Check the available exports
const { Avatar, Name } = OnchainKit;

export default function Home() {
  const [address, setAddress] = useState(null);
  const [status, setStatus] = useState('disconnected');

  useEffect(() => {
    const walletLink = new WalletLink({
      appName: "Based Summer",
      darkMode: false,
    });

    const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT; // Ensure this variable is defined in Vercel
    const ethereum = walletLink.makeWeb3Provider(rpcEndpoint, 1);

    window.coinbaseEthereum = ethereum; // Save the Coinbase provider in a different variable
  }, []);

  const connectWallet = async () => {
    // Check if the Coinbase Wallet extension is available
    if (typeof window.ethereum !== "undefined" && window.ethereum.isCoinbaseWallet) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAddress(accounts[0]);
        setStatus('connected');
        console.log("Connected account:", accounts[0]);
      } catch (error) {
        console.error("Error connecting to Coinbase wallet:", error);
      }
    } else if (typeof window.coinbaseEthereum !== "undefined") {
      // If not available, use the WalletLink provider
      try {
        const accounts = await window.coinbaseEthereum.request({ method: "eth_requestAccounts" });
        setAddress(accounts[0]);
        setStatus('connected');
        console.log("Connected account:", accounts[0]);
      } catch (error) {
        console.error("Error connecting to WalletLink:", error);
      }
    } else {
      console.error("Coinbase Wallet not found");
    }
  };

  const disconnect = () => {
    setAddress(null);
    setStatus('disconnected');
  };

  return (
    <OnchainKitProvider
      chain={{ name: "Ethereum", chainId: 1 }}
      schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
    >
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#344afb] relative">
        <div className="absolute top-0 right-0 w-1/6 h-1/6 overflow-hidden">
          <Image
            className="objectContain"
            src="/img/gm.svg"
            alt="gm Logo"
            fill
            priority
          />
        </div>
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <div className="absolute top-24 w-full flex justify-center items-center"></div>
          <div className="flex items-center justify-center mt-12 relative">
            <Image
              className="w-80 h-80"
              src="/img/bulmita.png"
              alt="Left Image"
              width={320}
              height={320}
              priority
            />
            <Image
              className="w-80 h-80"
              src="/img/vgtbase.png"
              alt="Right Image"
              width={320}
              height={320}
              priority
            />
            <button
              className="click-me-button absolute bottom-12"
              onClick={connectWallet}
            >
              LOGIN
            </button>
          </div>
          {status === 'connected' && (
            <div className="flex flex-grow mt-8">
              <div className="flex h-10 items-center space-x-4">
                <button type="button" onClick={disconnect}>
                  {Avatar && <Avatar address={address} showAttestation />}
                </button>
                <div className="flex flex-col text-sm">
                  <b>{Name && <Name address={address} />}</b>
                  {Name && <Name address={address} showAddress />}
                </div>
              </div>
            </div>
          )}
        </div>
        <BasedText />
      </main>
    </OnchainKitProvider>
  );
}
