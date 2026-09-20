import React from 'react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
}

interface StockCardProps {
  stock: Stock;
  onClick: (symbol: string) => void;
}

export default function StockCard({ stock, onClick }: StockCardProps) {
  const isPositive = stock.change >= 0;
  
  return (
    <div
      className="bg-card border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(stock.symbol)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold">{stock.symbol}</h3>
          <p className="text-sm text-muted-foreground truncate max-w-[150px]">{stock.name}</p>
        </div>
        <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">${stock.price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">
          Vol: {(stock.volume / 1000000).toFixed(1)}M
        </p>
      </div>
      
      {stock.marketCap && (
        <p className="text-xs text-muted-foreground mt-2">
          Market Cap: ${(stock.marketCap / 1000000).toFixed(2)}B
        </p>
      )}
    </div>
  );
}