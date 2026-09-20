import React, { useState } from 'react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  peRatio?: number;
  high52Week?: number;
  low52Week?: number;
  companyName?: string;
  currency?: string;
}

interface MarketIndicatorProps {
  symbol: string;
  stock: Stock | null;
}

export default function MarketIndicator({ symbol, stock }: MarketIndicatorProps) {
  const [showDetails, setShowDetails] = useState(false);
  const isPositive = stock?.changePercent && stock?.changePercent >= 0;

  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 border rounded-lg p-4 mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{symbol}</h2>
          <p className="text-sm text-muted-foreground">Market Status</p>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-primary hover:underline"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      
      <div className="mt-2">
        <p className={`text-2xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {stock ? `$${stock.price.toFixed(2)}` : 'N/A'}
        </p>
        
        {showDetails && (
          <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
            {stock && (
              <>
                <div>
                  <span className="text-muted-foreground">Change:</span>
                  <span className={`font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '+' : ''}{(stock.changePercent / 100 * stock.price).toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Volume:</span>
                  <span className="font-medium">{(stock.volume / 1000000).toFixed(2)}M</span>
                </div>
                {stock.marketCap && (
                  <div>
                    <span className="text-muted-foreground">Market Cap:</span>
                    <span className="font-medium">
                      ${(stock.marketCap / 1000000).toFixed(2)}B
                    </span>
                  </div>
                )}
                {stock.peRatio && (
                  <div>
                    <span className="text-muted-foreground">P/E Ratio:</span>
                    <span className="font-medium">{stock.peRatio.toFixed(2)}</span>
                  </div>
                )}
                {stock.high52Week && (
                  <div>
                    <span className="text-muted-foreground">52 Week High:</span>
                    <span className="font-medium">${stock.high52Week.toFixed(2)}</span>
                  </div>
                )}
                {stock.low52Week && (
                  <div>
                    <span className="text-muted-foreground">52 Week Low:</span>
                    <span className="font-medium">${stock.low52Week.toFixed(2)}</span>
                  </div>
                )}
                {stock.currency && (
                  <div>
                    <span className="text-muted-foreground">Currency:</span>
                    <span className="font-medium">{stock.currency}</span>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
