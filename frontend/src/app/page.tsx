'use client';

import MarketIndicator from '@/components/MarketIndicator';
import StockTable from '@/components/StockTable';
import React, { useState, useEffect } from 'react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
}

interface DashboardProps {
  params: Promise<{ search?: string }>;
}

export default function Dashboard({ params }: DashboardProps) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const searchParam = (await params).search || '';
        
        if (searchParam) {
          console.log('Searching for:', searchParam);
        }

        const response = await fetch('/api/stocks');
        if (!response.ok) {
          throw new Error('Failed to fetch stocks');
        }
        
        const data = await response.json();
        
        console.log(data)
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
        setStocks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [params]);

  const handleStockClick = (symbol: string) => {
    setSelectedStock(symbol);
  };

  const handleBackToDashboard = () => {
    setSelectedStock(null);
  };

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
        <h1 className="text-3xl font-bold">Stock Dashboard</h1>
        {selectedStock && (
          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            ← Back to Dashboard
          </button>
        )}
      </div>

      {selectedStock && (
        <div className="bg-card border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Stock Details</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{selectedStock}</h3>
              <p className="text-muted-foreground">Click on a stock card to view details</p>
            </div>
          </div>
        </div>
      )}

      {/* <MarketIndicator symbol="MARKET" stock={stocks.length > 0 ? stocks[0] : null} /> */}

      <div className="bg-card border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Popular Stocks</h2>
        {stocks.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No stocks available. Please check the backend server.
          </p>
        ) : (
          <StockTable stocks={stocks} onClick={handleStockClick} />
        )}
      </div>
    </div>
  );
}
