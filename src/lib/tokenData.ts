import useSWR from "swr";

const DEXSCREENER_API = "https://api.dexscreener.com/latest/dex/tokens/";
const GOPLUS_API =
  "https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=";

export async function fetchDexScreener(tokenAddress: string) {
  const res = await fetch(`${DEXSCREENER_API}${tokenAddress}`);
  if (!res.ok) throw new Error("Failed to fetch DexScreener data");
  return res.json();
}

export async function fetchGoPlus(tokenAddress: string) {
  const res = await fetch(`${GOPLUS_API}${tokenAddress}`);
  if (!res.ok) throw new Error("Failed to fetch GoPlus data");
  return res.json();
}

export function useTokenData(tokenAddress: string) {
  const {
    data: dex,
    error: dexError,
    isLoading: dexLoading,
  } = useSWR(tokenAddress ? ["dex", tokenAddress] : null, () =>
    fetchDexScreener(tokenAddress)
  );
  const {
    data: goplus,
    error: goplusError,
    isLoading: goplusLoading,
  } = useSWR(tokenAddress ? ["goplus", tokenAddress] : null, () =>
    fetchGoPlus(tokenAddress)
  );
  return {
    dex,
    dexError,
    dexLoading,
    goplus,
    goplusError,
    goplusLoading,
  };
}
