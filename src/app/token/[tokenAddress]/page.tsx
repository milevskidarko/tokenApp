"use client";
import { useParams } from "next/navigation";
import TokenPageClient from "../../../components/TokenPageClient";

export default function TokenPage() {
    const params = useParams();
    const tokenAddress = typeof params.tokenAddress === "string" ? params.tokenAddress : params.tokenAddress?.[0];

    if (!tokenAddress) {
        return <div>Invalid token address.</div>;
    }

    return <TokenPageClient tokenAddress={tokenAddress} />;
}
