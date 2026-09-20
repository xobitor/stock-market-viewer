'use client';

import MarketIndicator from '@/components/MarketIndicator';
import StockChart from '@/components/StockChart';
import { Stock, StockHistory } from '@/types/stock.types';
import React, { useState, useEffect } from 'react';

interface StockDetailProps {
  params: Promise<{ symbol: string }>;
}

export default function StockDetail({ params }: StockDetailProps) {
  const [stock, setStock] = useState<Stock | null>(null);
  const [history, setHistory] = useState<StockHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('1mo');

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const { symbol } = await params;
        
        // Fetch stock data
        const stockResponse = await fetch(`/api/stocks/${encodeURIComponent(symbol)}`);
        if (stockResponse.ok) {
          const data = await stockResponse.json();
          setStock(data);
        }

        // Fetch history
        const historyResponse = await fetch(`/api/stocks/${encodeURIComponent(symbol)}/history?period=${selectedPeriod}`);
        if (historyResponse.ok) {
          const data = await historyResponse.json();
          setHistory(data);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [params, selectedPeriod]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Stock Details</h1>
        <a href="/" className="text-primary hover:underline">← Back to Dashboard</a>
      </div>

      {stock && (
        <div className="bg-card border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{stock.symbol}</h2>
              <p className="text-muted-foreground">{stock.name}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">${stock.price.toFixed(2)}</p>
              <p className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </p>
            </div>
          </div>
        </div>
      )}

      <MarketIndicator symbol={stock?.symbol || 'N/A'} stock={stock} />

      <div className="bg-card border rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Price History</h2>
          <select
            className="px-3 py-2 border rounded-lg bg-secondary"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="1d">1 Day</option>
            <option value="1mo">1 Month</option>
            <option value="3mo">3 Months</option>
            <option value="1y">1 Year</option>
            <option value="ytd">Year to Date</option>
          </select>
        </div>
        <StockChart history={history} symbol={stock?.symbol || 'N/A'} />
      </div>

      {stock && (
        <div className="bg-card border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Stock Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">Market Cap</p>
              <p className="font-semibold">
                ${(stock.marketCap ? stock.marketCap / 1000000 : 0).toFixed(2)}B
              </p>
            </div>
            {stock.peRatio && (
              <div>
                <p className="text-muted-foreground">P/E Ratio</p>
                <p className="font-semibold">{stock.peRatio.toFixed(2)}</p>
              </div>
            )}
            {stock.high52Week && (
              <div>
                <p className="text-muted-foreground">52 Week High</p>
                <p className="font-semibold">${stock.high52Week.toFixed(2)}</p>
              </div>
            )}
            {stock.low52Week && (
              <div>
                <p className="text-muted-foreground">52 Week Low</p>
                <p className="font-semibold">${stock.low52Week.toFixed(2)}</p>
              </div>
            )}
            {stock.currency && (
              <div>
                <p className="text-muted-foreground">Currency</p>
                <p className="font-semibold">{stock.currency}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground">Volume</p>
              <p className="font-semibold">
                {(stock.volume / 1000000).toFixed(2)}M
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}