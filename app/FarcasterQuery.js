import React from 'react';
import { useQuery } from "@airstack/airstack-react";
import './globals.css';

const FarcasterQuery = ({ walletAddress }) => {
  const query = `
    query GetBalanceOfConnectedWalletAndNouns {
      Ethereum: TokenBalances(
        input: {filter: {owner: {_eq: "${walletAddress}"}}, blockchain: base, limit: 50}
      ) {
        TokenBalance {
          owner {
            socials(input: {filter: {dappName: {_eq: farcaster}}}) {
              profileName
              isFarcasterPowerUser
            }
          }
        }
      }
      nouns: Accounts(
        input: {filter: {tokenAddress: {_eq: "0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03"}}, blockchain: ethereum, limit: 50}
      ) {
        Account {
          address {
            addresses
          }
        }
      }
      lilNouns: Accounts(
        input: {filter: {tokenAddress: {_eq: "0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B"}}, blockchain: ethereum, limit: 50}
      ) {
        Account {
          address {
            addresses
          }
        }
      }
      Aerodrome: TokenBalances(
        input: {filter: {owner: {_eq: "${walletAddress}"}}, blockchain: base, limit: 50}
      ) {
        TokenBalance {
          tokenAddress
          tokenId
          formattedAmount
        }
      }
      Synthetix: TokenBalances(
        input: {filter: {owner: {_eq: "${walletAddress}"}}, blockchain: ethereum, limit: 50}
      ) {
        TokenBalance {
          tokenAddress
          tokenId
          formattedAmount
        }
      }
      Zora: TokenBalances(
        input: {filter: {owner: {_eq: "${walletAddress}"}}, blockchain: zora, limit: 50}
      ) {
        TokenBalance {
          tokenAddress
          tokenId
          formattedAmount
        }
      }
    }
  `;

  console.log("GraphQL Query:", query);

  const { data, loading, error } = useQuery(query, { limit: 10, sortBy: "ASC" }, { cache: false });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log("GraphQL Data:", data);

  const profile = data?.Ethereum?.TokenBalance?.[0]?.owner?.socials?.[0];
  const profileName = profile?.profileName;
  const isPowerUser = profile?.isFarcasterPowerUser;
  const isNounsHolder = data?.nouns?.Account?.some(account => account.address.addresses.includes(walletAddress));
  const isLilNounsHolder = data?.lilNouns?.Account?.some(account => account.address.addresses.includes(walletAddress));
  const isAerodromeUser = data?.Aerodrome?.TokenBalance?.length > 0;
  const isSynthetixUser = data?.Synthetix?.TokenBalance?.length > 0;
  const isZoraUser = data?.Zora?.TokenBalance?.length > 0;

  return (
    <div>
      {profileName ? (
        <>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <img src="/img/farcaster.png" alt="Farcaster Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            {profileName}
            <img
              src="/img/ActiveBadge.webp"
              alt="User Badge"
              className={!isPowerUser ? "nopoweruser" : ""}
              style={{ width: '20px', height: '20px', marginLeft: '8px' }}
            />
          </p>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', filter: isNounsHolder ? 'none' : 'grayscale(100%)' }}>
            <img src="/img/nouns.svg" alt="Noun Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            {isNounsHolder && 'Noun'}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', filter: isLilNounsHolder ? 'none' : 'grayscale(100%)' }}>
            <img src="/img/lilnouns.png" alt="Lil Noun Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            {isLilNounsHolder && 'lilNoun'}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', filter: isAerodromeUser ? 'none' : 'grayscale(100%)' }}>
            <img src="/img/aerodrome.png" alt="Aerodrome Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            {isAerodromeUser && 'Aerodrome'}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', filter: isSynthetixUser ? 'none' : 'grayscale(100%)' }}>
            <img src="/img/synthetix.png" alt="Synthetix Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            {isSynthetixUser && 'Synthetix User'}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', filter: isZoraUser ? 'none' : 'grayscale(100%)' }}>
            <img src="/img/zorb.png" alt="Zora Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            {isZoraUser && 'Zora User'}
          </p>
        </>
      ) : (
        <>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', filter: 'grayscale(100%)' }}>
            <img src="/img/farcaster.png" alt="Farcaster Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            No user
          </p>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', filter: 'grayscale(100%)' }}>
            <img src="/img/nouns.svg" alt="Noun Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          </p>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', filter: 'grayscale(100%)' }}>
            <img src="/img/lilnouns.png" alt="Lil Noun Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          </p>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', filter: 'grayscale(100%)' }}>
            <img src="/img/aerodrome.png" alt="Aerodrome Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          </p>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', filter: 'grayscale(100%)' }}>
            <img src="/img/synthetix.png" alt="Synthetix Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          </p>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', filter: 'grayscale(100%)' }}>
            <img src="/img/zorb.png" alt="Zora Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          </p>
        </>
      )}
    </div>
  );
};

export default FarcasterQuery;
