"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_express2 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));

// src/routes/index.ts
var import_express = require("express");

// src/services/stock.service.ts
var import_node_fetch = __toESM(require("node-fetch"));
var YAHOO_FINANCE_API_BASE = "https://query1.finance.yahoo.com";
var StockService = class {
  async getStockData(symbol) {
    try {
      const url = `${YAHOO_FINANCE_API_BASE}/v8/finance/${symbol}`;
      const response = await (0, import_node_fetch.default)(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch stock data for ${symbol}`);
      }
      const data = await response.json();
      const stock = {
        symbol: symbol.toUpperCase(),
        name: this.extractName(data),
        price: this.extractPrice(data),
        change: this.extractChange(data),
        changePercent: this.extractChangePercent(data),
        volume: this.extractVolume(data)
      };
      return stock;
    } catch (error) {
      console.error(`Error fetching stock data for ${symbol}:`, error);
      throw new Error(
        `Failed to fetch stock data for ${symbol}: ${error.message}`
      );
    }
  }
  async getStockHistory(symbol, period = "1mo") {
    try {
      const interval = "1d";
      const url = `${YAHOO_FINANCE_API_BASE}/v8/finance/chart/${symbol}?range=${period}&interval=${interval}`;
      const response = await (0, import_node_fetch.default)(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch historical data for ${symbol}`);
      }
      const data = await response.json();
      if (!data.chart?.result || data.chart.result.length === 0) {
        throw new Error("No historical data available");
      }
      const history = data.chart.result.map((item) => ({
        date: new Date(item.timestamp).toLocaleDateString(),
        open: item.indicators?.quote?.[0]?.open ?? 0,
        high: item.indicators?.quote?.[0]?.high ?? 0,
        low: item.indicators?.quote?.[0]?.low ?? 0,
        close: item.indicators?.quote?.[0]?.close ?? 0,
        volume: item.indicators?.quote?.[0]?.volume ?? 0
      }));
      return history;
    } catch (error) {
      console.error(`Error fetching historical data for ${symbol}:`, error);
      throw new Error(
        `Failed to fetch historical data for ${symbol}: ${error.message}`
      );
    }
  }
  async getMarketData(symbol) {
    try {
      const url = `${YAHOO_FINANCE_API_BASE}/v8/finance/${symbol}`;
      const response = await (0, import_node_fetch.default)(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch market data for ${symbol}`);
      }
      const data = await response.json();
      const marketData = {
        symbol: symbol.toUpperCase(),
        price: this.extractPrice(data),
        changePercent: this.extractChangePercent(data),
        volume: this.extractVolume(data),
        marketCap: this.extractMarketCap(data),
        high: this.extractHigh(data),
        low: this.extractLow(data),
        open: this.extractOpen(data),
        prevClose: this.extractPrevClose(data)
      };
      return marketData;
    } catch (error) {
      console.error(`Error fetching market data for ${symbol}:`, error);
      throw new Error(
        `Failed to fetch market data for ${symbol}: ${error.message}`
      );
    }
  }
  extractName(data) {
    const shortName = data.shortName?.toUpperCase() || "N/A";
    return shortName;
  }
  extractPrice(data) {
    const quote = data.quote?.[0] || data.quote;
    return quote?.price ?? 0;
  }
  extractChange(data) {
    const change = data.quote?.[0]?.change ?? 0;
    return change;
  }
  extractChangePercent(data) {
    const changePercent = data.quote?.[0]?.percentChange ?? 0;
    return changePercent;
  }
  extractVolume(data) {
    const quote = data.quote?.[0] || data.quote;
    return quote?.volume ?? 0;
  }
  extractMarketCap(data) {
    const marketCap = data.quote?.[0]?.marketCap ?? 0;
    return marketCap ? Number(marketCap) / 1e8 : 0;
  }
  extractHigh(data) {
    const quote = data.quote?.[0] || data.quote;
    return quote?.regularMarketDayHigh ?? 0;
  }
  extractLow(data) {
    const quote = data.quote?.[0] || data.quote;
    return quote?.regularMarketDayLow ?? 0;
  }
  extractOpen(data) {
    const quote = data.quote?.[0] || data.quote;
    return quote?.regularMarketOpen ?? 0;
  }
  extractPrevClose(data) {
    const prevClose = data.quote?.[0]?.previousClose ?? 0;
    return prevClose;
  }
};
var stockService = new StockService();

// src/controllers/stock.controller.ts
var StockController = class {
  async getAllStocks(req, res) {
    try {
      const popularStocks = [
        "AAPL",
        "GOOGL",
        "MSFT",
        "AMZN",
        "META",
        "NVDA",
        "TSLA",
        "BRK.B",
        "UNH",
        "JNJ"
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
      return res.json(stocks.filter((stock) => stock !== null));
    } catch (error) {
      console.error("Error in getAllStocks:", error);
      return res.status(500).json({
        message: "Failed to fetch stocks",
        error: "INTERNAL_SERVER_ERROR"
      });
    }
  }
  async getStockData(req, res) {
    const { symbol } = req.params;
    try {
      const stock = await stockService.getStockData(symbol);
      return res.json(stock);
    } catch (error) {
      console.error(`Error in getStockData for ${symbol}:`, error);
      return res.status(404).json(error);
    }
  }
  async getStockHistory(req, res) {
    const { symbol } = req.params;
    const { period = "1mo" } = req.query;
    try {
      const history = await stockService.getStockHistory(symbol, period);
      return res.json(history);
    } catch (error) {
      console.error(`Error in getStockHistory for ${symbol}:`, error);
      return res.status(404).json(error);
    }
  }
  async getRealtimePrice(req, res) {
    const { symbol } = req.params;
    try {
      const marketData = await stockService.getMarketData(symbol);
      return res.json(marketData);
    } catch (error) {
      console.error(`Error in getRealtimePrice for ${symbol}:`, error);
      return res.status(404).json(error);
    }
  }
};
var stockController = new StockController();

// src/routes/index.ts
var router = (0, import_express.Router)();
router.get("/stocks", stockController.getAllStocks.bind(stockController));
router.get("/stocks/popular", stockController.getAllStocks.bind(stockController));
router.get("/stocks/:symbol", stockController.getStockData.bind(stockController));
router.get("/stocks/:symbol/history", stockController.getStockHistory.bind(stockController));
router.get("/stocks/:symbol/realtime", stockController.getRealtimePrice.bind(stockController));

// src/index.ts
var app = (0, import_express2.default)();
var PORT = process.env.PORT || 3001;
app.use((0, import_cors.default)());
app.use(import_express2.default.json());
app.use(import_express2.default.urlencoded({ extended: true }));
app.use("/api", router);
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: "INTERNAL_SERVER_ERROR"
  });
});
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
var index_default = app;
