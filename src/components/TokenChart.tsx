import React from "react";

interface TokenChartProps {
  candles?: Array<{ t: number; o: string; h: string; l: string; c: string; v: string }>;
}

const TokenChart: React.FC<TokenChartProps> = ({ candles }) => {
  if (!candles || candles.length === 0) return <div>No chart data.</div>;
  const width = 320;
  const height = 100;
  const margin = 10;
  const points = candles.map((c, i) => ({ x: i, y: Number(c.c) }));
  const minY = Math.min(...points.map(p => p.y));
  const maxY = Math.max(...points.map(p => p.y));
  const scaleY = (y: number) => height - margin - ((y - minY) / (maxY - minY || 1)) * (height - 2 * margin);
  const scaleX = (x: number) => margin + (x / (points.length - 1 || 1)) * (width - 2 * margin);
  return (
    <svg width={width} height={height} className="w-full h-24">
      <polyline
        fill="none"
        stroke="#2563eb"
        strokeWidth="2"
        points={points.map(p => `${scaleX(p.x)},${scaleY(p.y)}`).join(" ")}
      />
    </svg>
  );
};

export default TokenChart;
