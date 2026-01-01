import React from "react";

interface RiskIndicatorProps {
  buyTax?: string;
  sellTax?: string;
  isHoneypot?: string;
  ownerRenounced?: boolean;
}

function getRiskLevel({ buyTax, sellTax, isHoneypot, ownerRenounced }: RiskIndicatorProps) {
  if (isHoneypot === "1") return { level: "Red", text: "Honeypot detected", color: "bg-red-500" };
  if (!ownerRenounced) return { level: "Yellow", text: "Ownership not renounced", color: "bg-yellow-400" };
  if (Number(buyTax) > 10 || Number(sellTax) > 10) return { level: "Yellow", text: "High tax", color: "bg-yellow-400" };
  return { level: "Green", text: "Low risk", color: "bg-green-500" };
}

const RiskIndicator: React.FC<RiskIndicatorProps> = (props) => {
  const risk = getRiskLevel(props);
  return (
    <div className={`inline-block px-3 py-1 rounded text-white text-xs font-bold ${risk.color}`}>
      {risk.text}
    </div>
  );
};

export default RiskIndicator;
