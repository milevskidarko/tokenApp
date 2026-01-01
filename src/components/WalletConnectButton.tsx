"use client";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const shorten = (address: string) =>
  address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

const WalletConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
            {shorten(address!)}
          </span>
          <button
            className="text-xs px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className="text-xs px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => open()}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnectButton;
