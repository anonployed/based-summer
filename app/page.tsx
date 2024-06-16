"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import WalletLink from "@coinbase/wallet-sdk";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import './globals.css';
import BasedText from './BasedText';

import * as OnchainKit from "@coinbase/onchainkit";
console.log(OnchainKit);

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
    try {
      let accounts;
      if (window.ethereum?.isCoinbaseWallet) {
        accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      } else if (window.coinbaseEthereum) {
        accounts = await window.coinbaseEthereum.request({ method: "eth_requestAccounts" });
      } else {
        console.error("Coinbase Wallet not found");
        return;
      }
      setAddress(accounts[0]);
      setStatus('connected');
      console.log("Connected account:", accounts[0]);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
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
            className="object-contain"
            src="/img/gm.svg"
            alt="gm Logo"
            fill
            priority
          />
        </div>
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <div className="absolute top-24 w-full flex justify-center items-center"></div>
          <div className="relative flex items-center justify-center mt-6">
          <div className="relative z-0 flex flex-col bottom-[100px] items-center">
              <Image
                src="/img/farca.png"
                alt="Farca Background"
                width={700}  
                height={550}
                priority
              />
              <button 
                className="click-me-button mt-4" 
                onClick={connectWallet}
              >
                LOGIN
              </button>
            </div>
          </div>
            <Image
              className="absolute center left-[250px] bottom-[100px] w-90 h-90 z-30"
              src="/img/vg.png"
              alt="Left Image"
              width={420}
              height={420}
              priority
            />
            <Image
              className="absolute center right-[300px] bottom-[100px] w-90 h-90 z-30"
              src="/img/bulmi.png"
              alt="Right Image"
              width={320}
              height={340}
              priority
            />
            
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
