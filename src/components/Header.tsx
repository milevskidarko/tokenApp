"use client";
import dynamic from 'next/dynamic';

const WalletConnectButton = dynamic(() => import('./WalletConnectButton'), { ssr: false });

const Header = () => (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-background">
        <div className="font-bold text-xl">Crypto Token Dashboard</div>
        <div>
            <WalletConnectButton />
        </div>
    </header>
);

export default Header;
