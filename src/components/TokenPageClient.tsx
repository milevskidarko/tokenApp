"use client";
import React, { useEffect, useState } from "react";
import { FiExternalLink, FiTrendingUp, FiShield, FiDollarSign, FiActivity, FiLayers } from "react-icons/fi";
import CopyButton from "./CopyButton";
import TokenChart from "./TokenChart";
import RiskIndicator from "./RiskIndicator";
import { useTokenData } from "@/lib/tokenData";
import InfoRow from "./InfoRow";
import SecurityStat from "./SecurityStat";
import StatCard from "./StatCard";

interface TokenPageClientProps {
  tokenAddress: string;
}

interface ChartData {
  candles?: Array<{
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
}

const TokenPageClient: React.FC<TokenPageClientProps> = ({ tokenAddress }) => {
  const { dex, dexError, dexLoading, goplus, goplusError, goplusLoading } =
    useTokenData(tokenAddress);

  const tokenKey = tokenAddress.toLowerCase();
  const goplusToken = goplus?.result?.[tokenKey];
  const [activePairIndex, setActivePairIndex] = useState(0);
  const [pairChart, setPairChart] = useState<ChartData | null>(null);
  const activePair = dex?.pairs?.[activePairIndex] || null;
  useEffect(() => {
    if (!activePair) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPairChart(null);
      return;
    }
    if (activePair.chart?.candles?.length > 0) {
      setPairChart(activePair.chart);
    } else if (activePair.pairAddress && activePair.chainId) {
      const url = `https://api.dexscreener.com/latest/dex/pairs/${activePair.chainId}/${activePair.pairAddress.toLowerCase()}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setPairChart(data.pair?.chart || null))
        .catch(() => setPairChart(null));
    } else {
      setPairChart(null);
    }
  }, [activePair]);

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Header Section */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-100/80 via-purple-100/80 to-pink-100/80 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-pink-900/40 p-6 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Token Analysis
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Comprehensive insights for {tokenAddress.slice(0, 8)}...{tokenAddress.slice(-6)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <code className="font-mono text-sm truncate text-gray-800 dark:text-gray-200">
                  {tokenAddress}
                </code>
              </div>
            </div>
            <CopyButton value={tokenAddress} />
            <button className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
              <FiExternalLink className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading & Error States */}
      {(dexLoading || goplusLoading) && (
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-3">
            <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping"></div>
            <span className="text-gray-600 dark:text-gray-400">Loading token data...</span>
          </div>
        </div>
      )}

      {(dexError || goplusError) && (
        <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 p-6 border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">Error loading token data. Please try again.</p>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Card */}
          <div className="rounded-2xl bg-white/90 dark:bg-gray-900/80 p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10">
                  <FiTrendingUp className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 dark:text-gray-200">Price Chart (1h)</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last 24 hours of trading</p>
                </div>
              </div>

              {dex?.pairs && dex.pairs.length > 1 && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Pair:</span>
                  <select
                    value={activePairIndex}
                    onChange={(e) => setActivePairIndex(Number(e.target.value))}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    {dex.pairs.map((p: {
                      pairAddress?: string;
                      baseToken?: { symbol?: string };
                      quoteToken?: { symbol?: string };
                      chain?: string;
                    }, idx: number) => {
                      const base = p.baseToken?.symbol || "Unknown";
                      const quote = p.quoteToken?.symbol || "Unknown";
                      const chain = p.chain || "-";
                      const pairAddr = p.pairAddress ? p.pairAddress.slice(0, 6) + "..." + p.pairAddress.slice(-4) : idx;
                      return (
                        <option key={p.pairAddress || idx} value={idx}>
                          {base} / {quote} ({chain}) [{pairAddr}]
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
            </div>

            {pairChart?.candles?.length ? (
              <div className="h-[300px]">
                <TokenChart
                  candles={pairChart.candles.slice(-24).map(candle => ({
                    t: candle.timestamp,
                    o: candle.open.toString(),
                    h: candle.high.toString(),
                    l: candle.low.toString(),
                    c: candle.close.toString(),
                    v: candle.volume.toString(),
                  }))}
                />
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-dashed border-gray-300 dark:border-gray-700">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto mb-3">
                    <FiActivity className="text-gray-400 text-xl" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">No recent trading activity</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Chart will appear when data is available</p>
                </div>
              </div>
            )}
          </div>

          {/* Market Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={<FiDollarSign />}
              title="Price"
              value={activePair?.priceUsd ? `$${Number(activePair.priceUsd).toFixed(8)}` : "-"}
              change="+2.4%"
              color="blue"
            />
            <StatCard
              icon={<FiLayers />}
              title="Liquidity"
              value={activePair?.liquidity?.usd ? formatNumber(Number(activePair.liquidity.usd)) : "-"}
              change="+1.2%"
              color="green"
            />
            <StatCard
              icon={<FiTrendingUp />}
              title="24h Volume"
              value={activePair?.volume?.h24 ? formatNumber(Number(activePair.volume.h24)) : "-"}
              change="+5.8%"
              color="purple"
            />
          </div>
        </div>

        {/* Right Column - Security & Info */}
        <div className="space-y-6">
          {/* Security Card */}
          <div className="rounded-2xl bg-white/90 dark:bg-gray-900/80 p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-red-500/10 to-orange-600/10">
                <FiShield className="text-red-600 dark:text-red-400 text-xl" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800 dark:text-gray-200">Security Analysis</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Contract verification</p>
              </div>
            </div>

            {goplusToken ? (
              <div className="space-y-4">
                <SecurityStat label="Buy Tax" value={`${goplusToken.buy_tax ?? "-"}%`} />
                <SecurityStat label="Sell Tax" value={`${goplusToken.sell_tax ?? "-"}%`} />
                <SecurityStat
                  label="Honeypot"
                  value={goplusToken.is_honeypot === "1" ? "⚠️ Detected" : "✅ Clear"}
                  isWarning={goplusToken.is_honeypot === "1"}
                />
                <SecurityStat
                  label="Ownership"
                  value={
                    goplusToken.owner_address === "0x0000000000000000000000000000000000000000"
                      ? "✅ Renounced"
                      : "⚠️ Centralized"
                  }
                  isWarning={goplusToken.owner_address !== "0x0000000000000000000000000000000000000000"}
                />

                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                  <RiskIndicator
                    buyTax={goplusToken.buy_tax}
                    sellTax={goplusToken.sell_tax}
                    isHoneypot={goplusToken.is_honeypot}
                    ownerRenounced={
                      goplusToken.owner_address === "0x0000000000000000000000000000000000000000"
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto mb-3">
                  <FiShield className="text-gray-400 text-xl" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">No security data available</p>
              </div>
            )}
          </div>

          {/* Token Info Card */}
          <div className="rounded-2xl bg-gradient-to-br from-gray-100/80 to-white/80 dark:from-gray-900/60 dark:to-gray-800/60 p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Token Information</h3>
            <div className="space-y-3">
              <InfoRow label="Chain" value={activePair?.chain || "-"} />
              <InfoRow label="DEX" value={activePair?.dexId || "-"} />
              <InfoRow label="Pair Created" value={activePair?.pairCreatedAt ?
                new Date(activePair.pairCreatedAt).toLocaleDateString() : "-"
              } />
              <InfoRow label="Market Cap" value={
                activePair?.fdv ? formatNumber(Number(activePair.fdv)) : "-"
              } />
            </div>
          </div>
        </div>
      </div>

      {/* No Data State */}
      {!dexLoading && !goplusLoading && (!dex?.pairs || dex.pairs.length === 0) && (
        <div className="rounded-2xl bg-yellow-50 dark:bg-yellow-900/40 p-6 border border-yellow-200 dark:border-yellow-800/40">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
            </div>
            <p className="text-yellow-800 dark:text-yellow-300">
              No liquidity pools found or token not tracked
            </p>
          </div>
        </div>
      )}
    </div>
  );
};




export default TokenPageClient;