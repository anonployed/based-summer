// FarcasterQuery.jsx
import React from 'react';
import { useQuery } from "@airstack/airstack-react";

const FarcasterQuery = ({ walletAddress }) => {
  const query = `
    query GetBalanceOfConnectedWallet {
      Ethereum: TokenBalances(
        input: {filter: {owner: {_eq: "${walletAddress}"}}, blockchain: ethereum, limit: 50}
      ) {
        TokenBalance {
          owner {
            socials(input: {filter: {dappName: {_eq: farcaster}}}) {
              profileName
            }
          }
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(query, { limit: 10, sortBy: "ASC" }, { cache: false });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const profileName = data?.Ethereum?.TokenBalance?.[0]?.owner?.socials?.[0]?.profileName;

  return (
    <div>
      {profileName ? (
        <p style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/img/farcaster.png" alt="Farcaster Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          {profileName}
        </p>
      ) : (
        <p style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/img/farcaster.png" alt="Farcaster Logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          No user
        </p>
      )}
    </div>
  );
};

export default FarcasterQuery;
