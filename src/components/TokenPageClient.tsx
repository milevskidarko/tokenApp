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
    const {
        dex,
        dexError,
        dexLoading,
        goplus,
        goplusError,
        goplusLoading,
    } = useTokenData(address);

    const pair = dex?.pairs?.[0];
    const tokenKey = address.toLowerCase();
    const goplusToken = goplus?.result?.[tokenKey];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
            {/* HEADER */}
            <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold">Token Overview</h1>
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                    {address}
                </span>
                <CopyButton value={address} />
            </div>

            {(dexLoading || goplusLoading) && (
                <div className="text-sm text-muted-foreground">
                    Loading token data...
                </div>
            )}

            {(dexError || goplusError) && (
                <div className="text-red-500">
                    Error loading token data
                </div>
            )}

            {/* MAIN GRID */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* CHART */}
                <div className="md:col-span-2 card p-6">
                    <h2 className="font-semibold mb-4">Price Chart (1h)</h2>
                    {pair ? (
                        <TokenChart
                            candles={pair.chart?.candles?.slice(-24) ?? []}
                        />
                    ) : (
                        <div className="text-sm text-muted-foreground">
                            No chart data available
                        </div>
                    )}
                </div>

                {/* MARKET DATA */}
                <div className="card p-6 space-y-4">
                    <h2 className="font-semibold">Market Data</h2>

                    <Stat label="Price">
                        {pair?.priceUsd
                            ? `$${Number(pair.priceUsd).toFixed(6)}`
                            : "-"}
                    </Stat>

                    <Stat label="Liquidity">
                        {pair?.liquidity?.usd
                            ? `$${Number(pair.liquidity.usd).toLocaleString()}`
                            : "-"}
                    </Stat>

                    <Stat label="Volume (24h)">
                        {pair?.volume?.h24
                            ? `$${Number(pair.volume.h24).toLocaleString()}`
                            : "-"}
                    </Stat>
                </div>

                {/* SECURITY */}
                <div className="card p-6 space-y-4">
                    <h2 className="font-semibold">Security</h2>

                    {goplusToken ? (
                        <>
                            <Stat label="Buy Tax">
                                {goplusToken.buy_tax ?? "-"}%
                            </Stat>

                            <Stat label="Sell Tax">
                                {goplusToken.sell_tax ?? "-"}%
                            </Stat>

                            <Stat label="Honeypot">
                                {goplusToken.is_honeypot === "1"
                                    ? "Yes"
                                    : "No"}
                            </Stat>

                            <Stat label="Ownership Renounced">
                                {goplusToken.owner_address ===
                                    "0x0000000000000000000000000000000000000000"
                                    ? "Yes"
                                    : "No"}
                            </Stat>

                            <RiskIndicator
                                buyTax={goplusToken.buy_tax}
                                sellTax={goplusToken.sell_tax}
                                isHoneypot={goplusToken.is_honeypot}
                                ownerRenounced={
                                    goplusToken.owner_address ===
                                    "0x0000000000000000000000000000000000000000"
                                }
                            />
                        </>
                    ) : (
                        <div className="text-sm text-muted-foreground">
                            No security data available
                        </div>
                    )}
                </div>
            </div>

            {!dexLoading &&
                !goplusLoading &&
                (!dex?.pairs || dex.pairs.length === 0) && (
                    <div className="text-yellow-600">
                        No liquidity or token not found
                    </div>
                )}
        </div>
    );
};

/* Small reusable stat component */
const Stat = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{children}</span>
    </div>
);

export default TokenPageClient;
