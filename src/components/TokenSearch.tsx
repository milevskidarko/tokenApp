"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const isValidAddress = (address: string) => {
    // Basic Ethereum address validation
    return /^0x[a-fA-F0-9]{40}$/.test(address);
};

const TokenSearch: React.FC = () => {
    const [address, setAddress] = useState('');
    const [touched, setTouched] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValidAddress(address)) {
            router.push(`/token/${address}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 card max-w-md mx-auto mt-8">
            <label htmlFor="token-address" className="font-semibold">Token Address</label>
            <input
                id="token-address"
                type="text"
                className="border rounded px-3 py-2 font-mono"
                placeholder="e.g. 0x..."
                value={address}
                onChange={e => setAddress(e.target.value)}
                onBlur={() => setTouched(true)}
                autoComplete="off"
            />
            <div className="text-xs text-muted-foreground">Example: 0x0000000000000000000000000000000000000000</div>
            {touched && address && !isValidAddress(address) && (
                <div className="text-xs text-red-500">Invalid address format</div>
            )}
            <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
                disabled={!isValidAddress(address)}
            >
                Search
            </button>
        </form>
    );
};

export default TokenSearch;
