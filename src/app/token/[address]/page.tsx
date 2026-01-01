"use client";
import { useParams } from "next/navigation";
import TokenPageClient from "../../../components/TokenPageClient";

export default function TokenPage() {
    const params = useParams();
    const address = typeof params.address === "string" ? params.address : params.address?.[0];

    if (!address) {
        return <div>Invalid token address.</div>;
    }

    return <TokenPageClient address={address} />;
}