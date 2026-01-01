"use client";
import React from "react";
import { useTokenData } from "../lib/tokenData";
import RiskIndicator from "./RiskIndicator";
import TokenChart from "./TokenChart";
import CopyButton from "./CopyButton";

interface TokenPageClientProps {
  address: string;
}

const TokenPageClient: React.FC<TokenPageClientProps> = ({ address }) => {
  const { dex, dexError, dexLoading, goplus, goplusError, goplusLoading } = useTokenData(address);

  return (
    <div className="card mt-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="h1">Token:</h1>
        <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">{address}</span>
        <CopyButton value={address} />
      </div>
      {(dexLoading || goplusLoading) && <div>Loading token data...</div>}
      {(dexError || goplusError) && (
        <div className="text-red-500">Error loading token data.</div>
      )}
      {dex && dex.pairs && dex.pairs.length > 0 && (
        <div className="mb-4">
          <div className="font-semibold">Price:</div>
          <div>{dex.pairs[0].priceUsd ? `$${Number(dex.pairs[0].priceUsd).toFixed(6)}` : "-"}</div>
          <div className="font-semibold mt-2">Liquidity:</div>
          <div>{dex.pairs[0].liquidity && dex.pairs[0].liquidity.usd ? `$${Number(dex.pairs[0].liquidity.usd).toLocaleString()}` : "-"}</div>
          <div className="font-semibold mt-2">Volume (24h):</div>
          <div>{dex.pairs[0].volume && dex.pairs[0].volume.h24 ? `$${Number(dex.pairs[0].volume.h24).toLocaleString()}` : "-"}</div>
          <div className="font-semibold mt-2">Chart (1h):</div>
          <TokenChart candles={dex.pairs[0].chart?.candles?.slice(-24)} />
        </div>
      )}
      {goplus && goplus.result && goplus.result[address.toLowerCase()] && (
        <div className="mb-4">
          <div className="font-semibold">Buy Tax:</div>
          <div>{goplus.result[address.toLowerCase()].buy_tax ?? "-"}%</div>
          <div className="font-semibold mt-2">Sell Tax:</div>
          <div>{goplus.result[address.toLowerCase()].sell_tax ?? "-"}%</div>
          <div className="font-semibold mt-2">Honeypot:</div>
          <div>{goplus.result[address.toLowerCase()].is_honeypot === "1" ? "Yes" : "No"}</div>
          <div className="font-semibold mt-2">Ownership Renounced:</div>
          <div>{goplus.result[address.toLowerCase()].owner_address === "0x0000000000000000000000000000000000000000" ? "Yes" : "No"}</div>
          <div className="font-semibold mt-2">Risk Indicator:</div>
          <RiskIndicator
            buyTax={goplus.result[address.toLowerCase()].buy_tax}
            sellTax={goplus.result[address.toLowerCase()].sell_tax}
            isHoneypot={goplus.result[address.toLowerCase()].is_honeypot}
            ownerRenounced={goplus.result[address.toLowerCase()].owner_address === "0x0000000000000000000000000000000000000000"}
          />
        </div>
      )}
      {!dexLoading && !goplusLoading && (!dex || !dex.pairs || dex.pairs.length === 0) && (
        <div className="text-yellow-600">No liquidity or token not found.</div>
      )}
    </div>
  );
};

export default TokenPageClient;
