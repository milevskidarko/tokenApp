"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const isValidAddress = (address: string) =>
    /^0x[a-fA-F0-9]{40}$/.test(address);

const TokenSearch: React.FC = () => {
    const [address, setAddress] = useState("");
    const [touched, setTouched] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValidAddress(address)) {
            router.push(`/token/${address}`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="card p-6 space-y-4 shadow-lg bg-white/90 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl"
        >
            <label className="text-sm font-medium">
                Token Address
            </label>

            <input
                type="text"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 font-mono text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={() => setTouched(true)}
            />

            <div className="text-xs text-gray-500 dark:text-gray-400">
                Example: 0xEa51801b8F5B88543DdaD3D1727400c15b209D8f
            </div>

            {touched && address && !isValidAddress(address) && (
                <div className="text-xs text-red-500">
                    Invalid address format
                </div>
            )}

            <button
                type="submit"
                disabled={!isValidAddress(address)}
                className="w-full rounded-md bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-40 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
                Analyze Token
            </button>
        </form>
    );
};

export default TokenSearch;
