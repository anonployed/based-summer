import React from "react";
import { useQuery } from "@airstack/airstack-react";
import "./globals.css";

const FarcasterQuery = ({ walletAddress, onProfileImageChange }) => {
  const query = `
    query GetBalanceOfConnectedWalletAndNouns {
      Ethereum: TokenBalances(
        input: {filter: {owner: {_eq: "${walletAddress}"}}, blockchain: base, limit: 50}
      ) {
        TokenBalance {
          owner {
            socials(input: {filter: {dappName: {_eq: farcaster}}}) {
              profileName
              profileImage
              isFarcasterPowerUser
            }
          }
        }
      }
      nouns: TokenBalances(
        input: {filter: {owner: {_eq: "${walletAddress}"}, tokenAddress: {_eq: "0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03"}}, blockchain: ethereum, limit: 50}
      ) {
        TokenBalance {
          tokenAddress
          tokenId
          formattedAmount
        }
        pageInfo {
          nextCursor
          prevCursor
        }
      }
      lilNouns: TokenBalances(
        input: {filter: {owner: {_eq: "${walletAddress}"}, tokenAddress: {_eq: "0x4b10701bfd7bfedc47d50562b76b436fbb5bdb3b"}}, blockchain: ethereum, limit: 50}
      ) {
        TokenBalance {
          tokenAddress
          tokenId
          formattedAmount
        }
        pageInfo {
          nextCursor
          prevCursor
        }
      }
      Aerodrome: TokenBalances(
        input: {filter: {owner: {_eq: "${walletAddress}"}, tokenAddress: {_eq: "0x940181a94a35a4569e4529a3cdfb74e38fd98631"}}, blockchain: base, limit: 50}
      ) {
        TokenBalance {
          owner {
            identity
          }
          formattedAmount
          tokenAddress
        }
      }
      Synthetix: TokenBalances(
        input: {filter: {owner: {_eq: "${walletAddress}"}, tokenAddress: {_eq: "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f"}}, blockchain: ethereum, limit: 50}
      ) {
        TokenBalance {
          owner {
            identity
          }
          formattedAmount
          tokenAddress
        }
      }
      Zora: TokenBalances(
        input: {filter: {owner: {_eq: "${walletAddress}"}}, blockchain: zora, limit: 50}
      ) {
        TokenBalance {
          formattedAmount
        }
      }
    }
  `;

  console.log("GraphQL Query:", query);

  const { data, loading, error } = useQuery(
    query,
    { limit: 10, sortBy: "ASC" },
    { cache: false },
  );

  if (loading) {
    return <p>Cooking 🧑🏻‍🍳</p>;
  }

  if (error) {
    return <p> 🫵😹 {error.message}</p>;
  }

  console.log("GraphQL Data:", data);

  const profile = data?.Ethereum?.TokenBalance?.[0]?.owner?.socials?.[0];
  const profileName = profile?.profileName;
  const profileImage = profile?.profileImage;
  const isPowerUser = profile?.isFarcasterPowerUser;
  const isNounsHolder = data?.nouns?.TokenBalance?.some(
    (balance) => parseFloat(balance.formattedAmount) > 0,
  );
  const isLilNounsHolder = data?.lilNouns?.TokenBalance?.some(
    (balance) => parseFloat(balance.formattedAmount) > 0,
  );
  const isAerodromeUser = data?.Aerodrome?.TokenBalance?.some(
    (balance) => parseFloat(balance.formattedAmount) > 0,
  );
  const isSynthetixUser = data?.Synthetix?.TokenBalance?.some(
    (balance) => parseFloat(balance.formattedAmount) > 0,
  );
  const isZoraUser = data?.Zora?.TokenBalance?.some(
    (balance) => parseFloat(balance.formattedAmount) > 0,
  );

  // Notify parent component about the Farcaster profile image
  if (profileImage) {
    onProfileImageChange(profileImage);
  }

  const elements = [
    {
      condition: profileName,
      content: (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            filter: profileName ? "none" : "grayscale(100%)",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
          title="You own a Farcaster account"
        >
          <img
            src="/img/farcaster.png"
            alt="Farcaster Logo"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          {profileName}
          {profileName && (
            <img
              src="/img/ActiveBadge.webp"
              alt="User Badge"
              style={{
                width: "20px",
                height: "20px",
                marginLeft: "8px",
                filter: isPowerUser ? "none" : "grayscale(100%)",
              }}
              title="POWER USER on Warpcast"
            />
          )}
        </p>
      ),
    },
    {
      condition: isNounsHolder,
      content: (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            filter: isNounsHolder ? "none" : "grayscale(100%)",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
          title="You're a Nouns holder"
        >
          <img
            src="/img/nouns.svg"
            alt="Noun Logo"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          {isNounsHolder && "nouner"}
        </p>
      ),
    },
    {
      condition: isLilNounsHolder,
      content: (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            filter: isLilNounsHolder ? "none" : "grayscale(100%)",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
          title="You're a Lil Nouns holder"
        >
          <img
            src="/img/lilnouns.png"
            alt="Lil Noun Logo"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          {isLilNounsHolder && "lil nouner"}
        </p>
      ),
    },
    {
      condition: isAerodromeUser,
      content: (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            filter: isAerodromeUser ? "none" : "grayscale(100%)",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
          title="Aerodrome user"
        >
          <img
            src="/img/aerodrome.png"
            alt="Aerodrome Logo"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          {isAerodromeUser && "Aero Miles"}
        </p>
      ),
    },
    {
      condition: isSynthetixUser,
      content: (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            filter: isSynthetixUser ? "none" : "grayscale(100%)",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
          title="Synthethix user on mainnet"
        >
          <img
            src="/img/synthetix.png"
            alt="Synthetix Logo"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          {isSynthetixUser && "Spartan"}
        </p>
      ),
    },
    {
      condition: isZoraUser,
      content: (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            filter: isZoraUser ? "none" : "grayscale(100%)",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
          title="Enjoyed something on zora"
        >
          <img
            src="/img/zorb.png"
            alt="Zora Logo"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          {isZoraUser && "Enjoy"}
        </p>
      ),
    },
  ];

  const sortedElements = elements.sort((a, b) => (a.condition ? -1 : 1));
  const noConditionsMet = elements.every((element) => !element.condition);

  return (
    <div>
      {sortedElements.map((element, index) => (
        <React.Fragment key={index}>{element.content}</React.Fragment>
      ))}
      {noConditionsMet && <p>nothing??</p>}

    </div>
  
  );
};

export default FarcasterQuery;
