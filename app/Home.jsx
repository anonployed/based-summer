// Home.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import WalletLink from "@coinbase/wallet-sdk";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import './globals.css';
import BasedText from './BasedText';
import FarcasterQuery from './FarcasterQuery';
import './airstack-init'; // Importar la inicialización de Airstack

const queryClient = new QueryClient();

const Home = () => {
  const [address, setAddress] = useState(null);
  const [status, setStatus] = useState('disconnected');
  const [bgImage, setBgImage] = useState('/img/basedbg.png');
  const [ethereum, setEthereum] = useState(null);

  useEffect(() => {
    const walletLink = new WalletLink({
      appName: "Based Summer",
    });

    const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT;

    const ethereumProvider = walletLink.makeWeb3Provider(rpcEndpoint, 1);
    setEthereum(ethereumProvider);

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

  const toggleWalletConnection = () => {
    if (status === 'disconnected') {
      console.log("Connecting wallet...");
      if (ethereum) {
        ethereum.enable().then((accounts) => {
          setAddress(accounts[0]);
          setStatus('connected');
        }).catch((error) => {
          console.error("Error connecting wallet:", error);
        });
      } else {
        console.error("Ethereum provider is not set");
      }
    } else {
      setAddress(null);
      setStatus('disconnected');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex items-center justify-center bg-ocsblue fixed w-screen h-screen overflow-hidden">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <div className="absolute top-24 w-full flex justify-center items-center"></div>
          <div className="relative flex items-center justify-center mt-6">
            <div className="relative z-0 flex flex-col items-center">
              
              <Image
                src={bgImage}
                alt="Combined Background"
                width={600}
                height={450}
                priority
              />
              
              {status === 'connected' && (
                <div className="wallet-info">
                  <OnchainKitProvider 
                    chain={base} 
                    schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
                  >
                    <div className="flex h-10 items-center space-x-4">
                      <Avatar address={address} showAttestation />
                      <div className="flex flex-col text-sm">
                        <b>
                          <Name address={address} showAttestation/>
                          <FarcasterQuery walletAddress={address} />
                        </b>
                      </div>
                    </div>
                  </OnchainKitProvider>
                </div>
              )}
              <img 
                className={`magic-orb ${status === 'connected' ? 'connected' : ''}`} 
                src="img/ball.png" 
                alt={status === 'connected' ? 'Disconnect' : 'Connect'} 
                onClick={toggleWalletConnection} 
              />
            </div>
          </div>
          <BasedText />
        </div>
      </main>
    </QueryClientProvider>
  );
};

export default Home;
