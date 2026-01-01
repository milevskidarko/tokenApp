"use client";
import { useEffect } from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { wagmiConfig } from "../w3m";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo";

export default function Web3ModalInitializer() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      createWeb3Modal({ wagmiConfig, projectId });
    }
  }, []);
  return null;
}
