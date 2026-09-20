import fetch from 'node-fetch';
import { StockResponse, StockHistory, MarketData, ErrorResponse } from '../types/stock.type';

const YAHOO_FINANCE_API_BASE = 'https://query1.finance.yahoo.com';

export class StockService {
  async getStockData(symbol: string): Promise<StockResponse> {
    try {
      const url = `${YAHOO_FINANCE_API_BASE}/v8/finance/${symbol}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch stock data for ${symbol}`);
      }

      const data = await response.json();
      
      const stock: StockResponse = {
        symbol: symbol.toUpperCase(),
        name: this.extractName(data),
        price: this.extractPrice(data),
        change: this.extractChange(data),
        changePercent: this.extractChangePercent(data),
        volume: this.extractVolume(data),
      };
      
      return stock;
    } catch (error) {
      console.error(`Error fetching stock data for ${symbol}:`, error);
      throw new Error(
        `Failed to fetch stock data for ${symbol}: ${(error as Error).message}`
      );
    }
  }

  async getStockHistory(symbol: string, period: string = '1mo'): Promise<StockHistory[]> {
    try {
      const interval = '1d';
      const url = `${YAHOO_FINANCE_API_BASE}/v8/finance/chart/${symbol}?range=${period}&interval=${interval}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch historical data for ${symbol}`);
      }

      const data: any = await response.json();
      
      if (!data.chart?.result || data.chart.result.length === 0) {
        throw new Error('No historical data available');
      }

      const history: StockHistory[] = data.chart.result.map((item: any) => ({
        date: new Date(item.timestamp).toLocaleDateString(),
        open: item.indicators?.quote?.[0]?.open ?? 0,
        high: item.indicators?.quote?.[0]?.high ?? 0,
        low: item.indicators?.quote?.[0]?.low ?? 0,
        close: item.indicators?.quote?.[0]?.close ?? 0,
        volume: item.indicators?.quote?.[0]?.volume ?? 0,
      }));
      
      return history;
    } catch (error) {
      console.error(`Error fetching historical data for ${symbol}:`, error);
      throw new Error(
        `Failed to fetch historical data for ${symbol}: ${(error as Error).message}`);
    }
  }

  async getMarketData(symbol: string): Promise<MarketData> {
    try {
      const url = `${YAHOO_FINANCE_API_BASE}/v8/finance/${symbol}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch market data for ${symbol}`);
      }

      const data = await response.json();
      
      const marketData: MarketData = {
        symbol: symbol.toUpperCase(),
        price: this.extractPrice(data),
        changePercent: this.extractChangePercent(data),
        volume: this.extractVolume(data),
        marketCap: this.extractMarketCap(data),
        high: this.extractHigh(data),
        low: this.extractLow(data),
        open: this.extractOpen(data),
        prevClose: this.extractPrevClose(data),
      };
      
      return marketData;
    } catch (error) {
      console.error(`Error fetching market data for ${symbol}:`, error);
      throw new Error(
        `Failed to fetch market data for ${symbol}: ${(error as Error).message}`);
    }
  }

  private extractName(data: any): string {
    const shortName = data.shortName?.toUpperCase() || 'N/A';
    return shortName;
  }

  private extractPrice(data: any): number {
    const quote = data.quote?.[0] || data.quote;
    return quote?.price ?? 0;
  }

  private extractChange(data: any): number {
    const change = data.quote?.[0]?.change ?? 0;
    return change;
  }

  private extractChangePercent(data: any): number {
    const changePercent = data.quote?.[0]?.percentChange ?? 0;
    return changePercent;
  }

  private extractVolume(data: any): number {
    const quote = data.quote?.[0] || data.quote;
    return quote?.volume ?? 0;
  }

  private extractMarketCap(data: any): number {
    const marketCap = data.quote?.[0]?.marketCap ?? 0;
    return marketCap ? Number(marketCap) / 100000000 : 0;
  }

  private extractHigh(data: any): number {
    const quote = data.quote?.[0] || data.quote;
    return quote?.regularMarketDayHigh ?? 0;
  }

  private extractLow(data: any): number {
    const quote = data.quote?.[0] || data.quote;
    return quote?.regularMarketDayLow ?? 0;
  }

  private extractOpen(data: any): number {
    const quote = data.quote?.[0] || data.quote;
    return quote?.regularMarketOpen ?? 0;
  }

  private extractPrevClose(data: any): number {
    const prevClose = data.quote?.[0]?.previousClose ?? 0;
    return prevClose;
  }
}

export const stockService = new StockService();
