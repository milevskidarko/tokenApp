"use client";
import React from "react";
import Web3Provider from "../providers/web3";

export default function Web3ProviderClient({ children }: { children: React.ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}
