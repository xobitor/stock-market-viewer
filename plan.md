
## Overview
A full-stack stock market visualizer with React/Next.js frontend and Node.js backend, both using TypeScript.

## Project Structure
```
stock-market-viewer/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Express app entry point
│   │   ├── routes/
│   │   │   └── index.ts      # API route definitions
│   │   ├── controllers/
│   │   │   └── stockController.ts  # Request handlers
│   │   ├── services/
│   │   │   └── stockService.ts       # Yahoo Finance API integration
│   │   └── types/
│   │       └── stock.ts     # TypeScript interfaces
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.tsx     # Dashboard
│   │   │   └── stock/[id].tsx # Stock details
│   │   ├── components/
│   │   │   ├── StockCard.tsx
│   │   │   ├── StockChart.tsx
│   │   │   └── StockTable.tsx
│   │   └── styles/
│   │       └── globals.css
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/stocks | Get all popular stocks |
| GET | /api/stocks/:symbol | Get specific stock data |
| GET | /api/stocks/:symbol/history | Get historical price data |
| GET | /api/stocks/popular | Get popular stocks list |
| GET | /api/stocks/search?q=query | Search stocks |
| GET | /api/stocks/:symbol/realtime | Get real-time price |
| GET | /api/stocks/sentiment | Get market sentiment |

## Data Source
- **Yahoo Finance API** (free, no API key required)
  - Provides real-time quotes, historical data, and market statistics

## Frontend Features
- Dashboard with stock overview
- Individual stock detail pages
- Interactive charts using Recharts
- Real-time price updates
- Search functionality

## Technology Stack

### Backend
- Node.js / Express
- TypeScript
- Yahoo Finance API

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Recharts (for charts)

## Development Commands

### Backend
```bash
cd backend
npm run dev      # Development server (port 3001)
npm run build    # Build for production
npm start        # Start production server
```

### Frontend
```bash
cd frontend
npm run dev      # Development server (port 3000)
npm run build    # Build for production
```

# Phase 1: Backend API Setup
### 1.1 Update Backend Configuration
Update package.json scripts for development and production
Update tsconfig.json to match the commonjs module system
Add proper output directory configuration

### 1.2 Create API Structure
Create the following directory structure in backend/src/:

```bash
src/
├── index.ts          # Express app entry point
├── config/
│   └── database.ts   # (Optional) Database config if needed
├── routes/
│   └── index.ts      # Route definitions
├── controllers/
│   └── stock.controller.ts  # Request handlers
├── services/
│   └── stock.service.ts      # Business logic / API integration
└── types/
    └── stock.type.ts     # TypeScript interfaces
```

### 1.3 Define API Endpoints
I'll implement the following REST API:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/stocks | Get all available stocks
| GET | /api/stocks/:symbol | Get stock data by symbol
| GET | /api/stocks/:symbol/history | Get historical price data
| GET | /api/stocks/:symbol/realtime | Get real-time stock price

### 1.4 Stock Data Model

```ts
interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

interface StockHistory {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

```

Also, I'll use zod for type validation.

### 1.5 Data Source Strategy
For a simple implementation, I'll use:

Yahoo Finance API (free, no API key required) for stock data
Alternative: Alpha Vantage or similar if needed

# Phase 2: Frontend Development (After Backend)
### 2.1 Create Pages
/ - Dashboard with stock overview
/stock/[symbol] - Individual stock details with charts
/market - Market overview

### 2.2 Components
StockCard: Display individual stock info

StockChart: Use a charting library (Recharts or Chart.js)

StockTable: List of stocks

MarketIndicator: Market sentiment

### 2.3 Styling
Tailwind CSS for responsive design
Dark/Light mode support

# Phase 3: Testing & Deployment
### Test API endpoints
### Connect frontend to backend