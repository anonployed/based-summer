// components/ConnectWalletButton.js
import React, { useState } from "react";
import ethereum from "../utils/coinbase";

const ConnectWalletButton = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="bg-blue-500 text-white py-2 px-4 rounded"
    >
      {account ? `Connected: ${account}` : "LOG IN"}
    </button>
  );
};

export default ConnectWalletButton;
