import TokenSearch from "../components/TokenSearch";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-2">
          Token Analyzer
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Enter a token address to view price, liquidity and security data
        </p>
        <TokenSearch />
      </div>
    </div>
  );
}
