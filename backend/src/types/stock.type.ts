// Stock TypeScript interfaces

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export interface StockHistory {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockResponse extends Stock {
  marketCap?: number;
  peRatio?: number;
  high52Week?: number;
  low52Week?: number;
  companyName?: string;
  currency?: string;
}

export interface ErrorResponse {
  message: string;
  code: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
}
