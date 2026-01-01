import useSWR from "swr";

const DEXSCREENER_API = "https://api.dexscreener.com/latest/dex/tokens/";
const GOPLUS_API = "https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=";

export async function fetchDexScreener(address: string) {
  const res = await fetch(`${DEXSCREENER_API}${address}`);
  if (!res.ok) throw new Error("Failed to fetch DexScreener data");
  return res.json();
}

export async function fetchGoPlus(address: string) {
  const res = await fetch(`${GOPLUS_API}${address}`);
  if (!res.ok) throw new Error("Failed to fetch GoPlus data");
  return res.json();
}

export function useTokenData(address: string) {
  const { data: dex, error: dexError, isLoading: dexLoading } = useSWR(
    address ? ["dex", address] : null,
    () => fetchDexScreener(address)
  );
  const { data: goplus, error: goplusError, isLoading: goplusLoading } = useSWR(
    address ? ["goplus", address] : null,
    () => fetchGoPlus(address)
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
