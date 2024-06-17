"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import WalletLink from "@coinbase/wallet-sdk";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import './globals.css';
import BasedText from './BasedText';

import * as OnchainKit from "@coinbase/onchainkit";
console.log(OnchainKit);

export default function Home() {
  const [address, setAddress] = useState(null);
  const [status, setStatus] = useState('disconnected');
  const [bgImage, setBgImage] = useState('/img/basedbg.png');

  useEffect(() => {
    const walletLink = new WalletLink({
      appName: "Based Summer",
    });

    const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT;
    // const ethereum = walletLink.makeWeb3Provider(rpcEndpoint, 1);

    // window.coinbaseEthereum = ethereum;

    const updateBgImage = () => {
      if (window.innerWidth <= 500) {
        setBgImage('/img/basedbgphone.png');
      } else {
        setBgImage('/img/basedbg.png');
      }
    };

    window.addEventListener('resize', updateBgImage);
    updateBgImage(); // Initial check

    return () => window.removeEventListener('resize', updateBgImage);
  }, []);

  const connectWallet = async () => {
    try {
      let accounts;
      /* if (window.ethereum?.isCoinbaseWallet) {
        accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      } else if (window.coinbaseEthereum) {
        accounts = await window.coinbaseEthereum.request({ method: "eth_requestAccounts" });
      } else {
        console.error("Coinbase Wallet not found");
        return;
      } 
      setAddress(accounts[0]);
      setStatus('connected');
      console.log("Connected account:", accounts[0]);*/
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setStatus('disconnected');
  };

  return (
    <main className="flex items-center justify-center bg-[#344afb] fixed w-screen h-screen overflow-hidden">
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <div className="absolute top-24 w-full flex justify-center items-center"></div>
        <div className="relative flex items-center justify-center mt-6">
          <div className="relative z-0 flex flex-col bottom-[10px] items-center">
            <Image
              src={bgImage}
              alt="Combined Background"
              width={700}
              height={550}
              priority
            />
            <img 
              className="magic-orb" 
              src="img/ball.png" 
              alt="Login" 
              onClick={connectWallet} 
            />
          </div>
        </div>
        {status === 'connected' && (
          <div className="flex flex-grow mt-8">
            <div className="flex h-10 items-center space-x-4">
              <div className="flex flex-col text-sm">
              </div>
            </div>
          </div>
        )}
      </div>
      <BasedText />
    </main>
  );
}
