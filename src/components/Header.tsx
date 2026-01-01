import Link from "next/link";

const Header = () => (
    <header className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg">
                TokenAnalyzer
            </Link>
            <div className="text-xs text-muted-foreground">
                BSC / ETH
            </div>
        </div>
    </header>
);

export default Header;
