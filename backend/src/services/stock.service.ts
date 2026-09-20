import YahooFinance from 'yahoo-finance2';
import { StockResponse, StockHistory, MarketData } from '../types/stock.type';

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey', 'ripHistorical'] });

export class StockService {
  async getStockData(symbol: string): Promise<StockResponse> {
    try {
      const quote = await yahooFinance.quote(symbol);
      const summary = await yahooFinance.quoteSummary(symbol, {
        modules: ['summaryDetail', 'defaultKeyStatistics', 'price']
      });

      const stock: StockResponse = {
        symbol: symbol.toUpperCase(),
        name: this.extractCompanyName(quote, summary),
        price: this.extractPrice(quote),
        change: this.extractChange(summary),
        changePercent: this.extractChangePercent(summary),
        volume: this.extractVolume(quote),
        marketCap: this.extractMarketCap(quote, summary),
        peRatio: this.extractPeRatio(summary),
        high52Week: this.extractHigh52Week(quote),
        low52Week: this.extractLow52Week(quote),
        companyName: this.extractCompanyName(quote, summary),
        currency: quote.currency,
      };
      return stock;
    } catch (error) {
      //console.error(`Error fetching stock data for ${symbol}:`, error);
      throw new Error(
        `Failed to fetch stock data for ${symbol}: ${(error as Error).message}`
      );
    }
  }

  async getStockHistory(symbol: string, period: string = '1mo'): Promise<StockHistory[]> {
    try {
      const endDate = new Date();
      const startDate = new Date();

      let months = 1;
      if (period === '1mo') months = 1;
      else if (period === '3mo') months = 3;
      else if (period === '6mo') months = 6;
      else if (period === '1y') months = 12;
      else if (period === '5y') months = 60;
      else if (period === 'max') months = 252 * 5;

      startDate.setMonth(endDate.getMonth() - months);

      const historicalData = await yahooFinance.historical(symbol, {
        period1: startDate.toISOString(),
        period2: endDate.toISOString(),
      });

      if (!historicalData || historicalData.length === 0) {
        throw new Error('No historical data available');
      }

      const history: StockHistory[] = historicalData.map((item) => ({
        date: new Date(item.date).toLocaleDateString(),
        open: item.open ?? 0,
        high: item.high ?? 0,
        low: item.low ?? 0,
        close: item.close ?? 0,
        volume: item.volume ?? 0,
      }));

      return history;
    } catch (error) {
      //console.error(`Error fetching historical data for ${symbol}:`, error);
      throw new Error(
        `Failed to fetch historical data for ${symbol}: ${(error as Error).message}`
      );
    }
  }

  async getMarketData(symbol: string): Promise<MarketData> {
    try {
      const quote = await yahooFinance.quote(symbol);
      const summary = await yahooFinance.quoteSummary(symbol, {
        modules: ['summaryDetail', 'defaultKeyStatistics', 'price'],
      });

      const priceData = summary.price || summary.summaryDetail;

      const marketData: MarketData = {
        symbol: symbol.toUpperCase(),
        price: this.extractPrice(quote),
        changePercent: this.extractChangePercent(summary),
        volume: this.extractVolume(quote),
        marketCap: this.extractMarketCap(quote, summary),
        high: this.extractDayHigh(priceData),
        low: this.extractDayLow(priceData),
        open: this.extractOpen(priceData),
        prevClose: this.extractPrevClose(priceData),
      };

      return marketData;
    } catch (error) {
      //console.error(`Error fetching market data for ${symbol}:`, error);
      throw new Error(
        `Failed to fetch market data for ${symbol}: ${(error as Error).message}`
      );
    }
  }

  private extractCompanyName(quote: any, summary: any): string {
    if (quote.shortName) return quote.shortName;
    if (summary.summaryProfile?.companyName) return summary.summaryProfile.companyName;
    if (summary.summaryDetail?.shortName) return summary.summaryDetail.shortName;
    return 'N/A';
  }

  private extractPrice(quote: any): number {
    return quote.regularMarketPrice ?? 0;
  }

  private extractChange(summary: any): number {
    const priceData = summary.price || summary.summaryDetail;
    return priceData.regularMarketChange ?? 0;
  }

  private extractChangePercent(summary: any): number {
    const priceData = summary.price || summary.summaryDetail;
    return priceData.regularMarketChangePercent ?? 0;
  }

  private extractVolume(quote: any): number {
    return quote.regularMarketVolume ?? 0;
  }

  private extractMarketCap(quote: any, summary: any): number {
    const marketCap = quote.marketCap ?? summary.defaultKeyStatistics?.marketCap;
    return marketCap ? Number(marketCap) / 100000000 : 0;
  }

  private extractPeRatio(summary: any): number {
    const pe = summary.defaultKeyStatistics?.trailingPE ?? summary.summaryDetail?.trailingPE;
    return pe ?? 0;
  }

  private extractHigh52Week(quote: any): number {
    return quote.fiftyTwoWeekHigh ?? 0;
  }

  private extractLow52Week(quote: any): number {
    return quote.fiftyTwoWeekLow ?? 0;
  }

  private extractDayHigh(priceData: any): number {
    return priceData.regularMarketDayHigh ?? 0;
  }

  private extractDayLow(priceData: any): number {
    return priceData.regularMarketDayLow ?? 0;
  }

  private extractOpen(priceData: any): number {
    return priceData.regularMarketOpen ?? 0;
  }

  private extractPrevClose(priceData: any): number {
    return priceData.regularMarketPreviousClose ?? 0;
  }
}

export const stockService = new StockService();