import { Request, Response } from 'express';
import { StockResponse } from '../types/stock.type';
import { stockService } from '../services/stock.service';

export class StockController {
  async getAllStocks(_: Request, res: Response): Promise<Response> {
    try {
      const popularStocks = [
        'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META',
        'NVDA', 'TSLA', 'BRK.B', 'UNH', 'JNJ'
      ];

      const stocks = await Promise.all(
        popularStocks.map(async (symbol) => {
          try {
            const stock = await stockService.getStockData(symbol);
            return stock;
          } catch (error) {
            console.error(`Error fetching ${symbol}:`, error);
            return null;
          }
        })
      );

      return res.json(stocks.filter((stock): stock is StockResponse => stock !== null));
    } catch (error) {
      console.error('Error in getAllStocks:', error);
      return res.status(500).json({
        message: 'Failed to fetch stocks',
        error: 'INTERNAL_SERVER_ERROR',
      });
    }
  }

  async getStockData(req: Request, res: Response): Promise<Response> {
    const { symbol } = req.params;

    try {
      if (!symbol || typeof symbol !== 'string') {
        return res.status(400).json({ message: 'Symbol is required and must be a string' });
      }
      const stock = await stockService.getStockData(symbol);
      return res.json(stock);
    } catch (error) {
      console.error(`Error in getStockData for ${symbol}:`, error);
      return res.status(404).json({
        message: 'Stock not found',
        code: 'STOCK_NOT_FOUND',
      });
    }
  }

  async getStockHistory(req: Request, res: Response): Promise<Response> {
    const { symbol } = req.params;
    const { period = '1mo' } = req.query;

    try {
      if (!symbol || typeof symbol !== 'string') {
        return res.status(400).json({ message: 'Symbol is required and must be a string' });
      }
      const history = await stockService.getStockHistory(symbol, period as string);
      return res.json(history);
    } catch (error) {
      console.error(`Error in getStockHistory for ${symbol}:`, error);
      return res.status(404).json({
        message: 'Historical data not found',
        code: 'HISTORY_NOT_FOUND',
      });
    }
  }

  async getRealtimePrice(req: Request, res: Response): Promise<Response> {
    const { symbol } = req.params;

    try {
      if (!symbol || typeof symbol !== 'string') {
        return res.status(400).json({ message: 'Symbol is required and must be a string' });
      }
      const marketData = await stockService.getMarketData(symbol);
      return res.json(marketData);
    } catch (error) {
      console.error(`Error in getRealtimePrice for ${symbol}:`, error);
      return res.status(404).json({
        message: 'Market data not found',
        code: 'MARKET_DATA_NOT_FOUND',
      });
    }
  }
}

export const stockController = new StockController();
