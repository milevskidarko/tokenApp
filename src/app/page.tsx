"use client";
import TokenSearch from "../components/TokenSearch";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">🔍</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Token Analyzer
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Analyze any token across multiple chains
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Get real-time price, liquidity, volume and security insights
          </p>
        </div>

        <div className="bg-white/90 dark:bg-gray-900/80 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
          <TokenSearch />

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Try these example addresses:
            </p>
            <div className="flex flex-wrap gap-2">
              {/* Example buttons now use a custom event to update TokenSearch state */}
              {[
                { label: "BUSD", address: "0xe9e7cea3dedca5984780bafc599bd69add087d56" },
                { label: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
                { label: "WETH", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" }
              ].map((example, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-mono"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('fillTokenAddress', { detail: example.address }));
                  }}
                  title={example.label}
                >
                  {example.address.slice(0, 8)}...{example.address.slice(-6)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-100/80 to-blue-200/80 dark:from-blue-900/60 dark:to-blue-800/40 border border-blue-200 dark:border-blue-800/40">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Market Analytics</h3>
            <p className="text-sm text-blue-700/80 dark:text-blue-300/80">Real-time charts & liquidity</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-green-100/80 to-green-200/80 dark:from-green-900/60 dark:to-green-800/40 border border-green-200 dark:border-green-800/40">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Security Scan</h3>
            <p className="text-sm text-green-700/80 dark:text-green-300/80">Honeypot & tax detection</p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-100/80 to-purple-200/80 dark:from-purple-900/60 dark:to-purple-800/40 border border-purple-200 dark:border-purple-800/40">
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Multi-Chain</h3>
            <p className="text-sm text-purple-700/80 dark:text-purple-300/80">BSC, ETH & more</p>
          </div>
        </div>
      </div>
    </div>
  );
}