"use client";
import Head from 'next/head';
import OnchainProviders from './OnchainProviders';
import Home from './page';

export default function App() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Mint BᗩᔑEᗪ ᔑᑌᗰᗰEᖇ vibes on Base" />
        <meta property="og:title" content="BᗩᔑEᗪ ᔑᑌᗰᗰEᖇ" />
        <meta property="og:description" content="BᗩᔑEᗪ ᔑᑌᗰᗰEᖇ" />
        <meta property="og:image" content="/summer.jpg" />
        <meta property="og:url" content="https://basedsummer.vercel.app" />
      </Head>
      <OnchainProviders>
        <Home />
      </OnchainProviders>
    </>
  );
}
