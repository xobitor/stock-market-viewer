import { Router } from 'express';
import { stockController } from '../controllers/stock.controller';

const router = Router();

// GET /api/stocks - Get all available stocks
router.get('/stocks', stockController.getAllStocks.bind(stockController));

// GET /api/stocks/popular - Get popular stocks list
router.get('/stocks/popular', stockController.getAllStocks.bind(stockController));

// GET /api/stocks/:symbol - Get stock data by symbol
router.get('/stocks/:symbol', stockController.getStockData.bind(stockController));

// GET /api/stocks/:symbol/history - Get historical price data
router.get('/stocks/:symbol/history', stockController.getStockHistory.bind(stockController));

// GET /api/stocks/:symbol/realtime - Get real-time stock price
router.get('/stocks/:symbol/realtime', stockController.getRealtimePrice.bind(stockController));

export { router };
