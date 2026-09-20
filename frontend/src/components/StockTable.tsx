import React from 'react';
import StockCard from './StockCard';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
}

interface StockTableProps {
  stocks: Stock[];
  onClick: (symbol: string) => void;
}

export default function StockTable({ stocks, onClick }: StockTableProps) {
  const sortedStocks = [...stocks].sort((a, b) => b.volume - a.volume);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedStocks.map((stock) => (
        <StockCard key={stock.symbol} stock={stock} onClick={onClick} />
      ))}
    </div>
  );
}