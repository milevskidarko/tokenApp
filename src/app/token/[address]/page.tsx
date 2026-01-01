import TokenPageClient from "../../../components/TokenPageClient";

interface TokenPageProps {
    params: { address: string };
}

export default async function TokenPage({ params }: TokenPageProps) {
    const resolvedParams = await params;
    return <TokenPageClient address={resolvedParams.address} />;
}

