import { useEffect, useState } from "react";
import Image from "next/image";
import WalletLink from "@coinbase/wallet-sdk";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { Name, getName } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import './globals.css';
import BasedText from './BasedText';
import FarcasterQuery from './FarcasterQuery';
import './airstack-init';
import checkIfJesseIsBald from './checkIfJesseIsBald';
import PreloadImage from './PreloadImage';
import { disconnect } from "process";

const queryClient = new QueryClient();

const Home = () => {
  const [address, setAddress] = useState(null);
  const [status, setStatus] = useState('disconnected');
  const [bgImage, setBgImage] = useState('/img/basedbg.png');
  const [ethereum, setEthereum] = useState(null);
  const [ensName, setEnsName] = useState(null);
  const [farcasterImage, setFarcasterImage] = useState(null);
  const [showGif, setShowGif] = useState(false);
  const [isHolder, setIsHolder] = useState(false);
  const [showMintButton, setShowMintButton] = useState(false);
  const [showSummerImage, setShowSummerImage] = useState(false);

  useEffect(() => {
    const walletLink = new WalletLink({
      appName: "ᗷᗩᔑEᗪ ᔑᑌᗰᗰEᖇ",
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
    updateBgImage();

    return () => window.removeEventListener('resize', updateBgImage);
  }, []);

  useEffect(() => {
    const fetchName = async () => {
      if (address) {
        console.log(`Fetching ENS name for address: ${address}`);
        const name = await getName({ address });
        console.log(`ENS name: ${name}`);
        setEnsName(name);
        await verifyHolderStatus(address);
      }
    };
    fetchName();
  }, [address]);

  const toggleWalletConnection = () => {
    if (status === 'disconnected') {
      console.log("Connecting wallet...");
      if (ethereum) {
        ethereum.enable().then(async (accounts) => {
          console.log(`Wallet connected: ${accounts[0]}`);
          setAddress(accounts[0]);
          setStatus('connected');
          const isBald = await checkIfJesseIsBald(accounts[0]);
          if (isHolder) {
            showGifAnimation();
          }
          const delay = isBald ? 4000 : 1000;
          setTimeout(() => setShowMintButton(true), delay);
        }).catch((error) => {
          console.error("Error connecting wallet:", error);
        });
      } else {
        console.error("Ethereum provider is not set");
      }
    } else {
      console.log("Disconnecting wallet...");
      setAddress(null);
      setStatus('disconnected');
      const mintButton = document.querySelector('.mint-button');
      if (mintButton) {
        mintButton.classList.add('hide-mint-button');
        setTimeout(() => {
          setShowMintButton(false);
        }, 200);
      } else {
        setShowMintButton(false);
      }
    }
  };

  const verifyHolderStatus = async (address) => {
    try {
      console.log(`Verifying holder status for address: ${address}`);
      const holderStatus = await checkIfJesseIsBald(address);
      setIsHolder(holderStatus);
      if (holderStatus) {
        showGifAnimation();
      } else {
        console.log("Address is not a holder");
      }
    } catch (error) {
      console.error("Error checking holder:", error);
    }
  };

  const showGifAnimation = () => {
    setShowGif(true);
    setTimeout(() => {
      setShowGif(false);
      console.log("Hiding GIF after 2.5 seconds");
    }, 2500);
  };

  const handleProfileImageChange = (image) => {
    console.log(`Profile image changed: ${image}`);
    setFarcasterImage(image);
  };

  const handleMintButtonClick = () => {
    setShowSummerImage(true);
    toggleWalletConnection();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PreloadImage src="/img/mint.png" />
      <main className="flex items-center justify-center bg-ocsblue fixed w-screen h-screen overflow-hidden">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {showSummerImage && (
            <div className="summer">
              <div className="moving-background"></div>
            </div>
          )}
          <div className="absolute top-24 w-full flex justify-center items-center"></div>
          <div className="relative flex items-center justify-center mt-6 z-10">
            <div className="absolute z-10 flex items-center justify-center text-white text-5xl font-bold responsive-ocs" style={{ top: '5%', transform: 'translateY(-50%)' }}>
              <span>ᗷ</span>
              <span className="ocs-font">a</span>
              <span>ᔑ</span>
              <span>E</span>
              <span>ᗪ ᔑ</span>
              <span className="ocs-font font-normal">u</span>
              <span>M</span>
              <span className="ocs-font font-normal">m</span>
              <span className="ocs-font font-normal">e</span>
              <span>ᖇ</span>
            </div>
            <div className="relative flex flex-col items-center z-3">
              <Image
                src={bgImage}
                alt="Combined Background"
                width={600}
                height={450}
                priority
              />
              {status === 'connected' && (
                <div
                  className="wallet-info flex flex-col items-center justify-center text-center relative"
                  style={
                    showGif 
                      ? { backgroundImage: `url(/img/bald.gif)`, backgroundSize: 'cover', backgroundPosition: 'center' }
                      : farcasterImage 
                        ? { backgroundImage: `url(${farcasterImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                        : ensName 
                          ? { backgroundImage: `url(https://euc.li/${ensName})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                          : {}
                  }
                >
                  <div className="overlay"></div>
                  <OnchainKitProvider
                    chain={base}
                    schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
                  >
                    <div className="flex h-20 items-center space-x-4">
                      <div className="flex flex-col text-sm text-center">
                        <b>
                          <div style={{ paddingBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                            <Name address={address} showAttestation /></div>
                          <FarcasterQuery walletAddress={address} onProfileImageChange={handleProfileImageChange} />
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
              {showMintButton && (
                <img
                  src="img/mint.png"
                  alt="Mint"
                  className="mint-button"
                  onClick={handleMintButtonClick}
                />
              )}
            </div>
          </div>
          <BasedText />
        </div>
      </main>
    </QueryClientProvider>
  );
};

export default Home;
