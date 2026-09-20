# Stock Market Viewer

A full-stack stock market visualizer with React/Next.js frontend and Node.js backend, both using TypeScript.

## 📋 Project Overview

This project provides a modern, responsive interface for viewing stock market data with real-time updates, interactive charts, and comprehensive market statistics.

## 🏗️ Project Structure

```
stock-market-viewer/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Express app entry point
│   │   ├── routes/
│   │   │   └── index.ts          # API route definitions
│   │   ├── controllers/
│   │   │   └── stockController.ts  # Request handlers
│   │   ├── services/
│   │   │   └── stockService.ts    # Yahoo Finance API integration
│   │   └── types/
│   │       └── stock.type.ts      # TypeScript interfaces
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/
│   │   ├── api/
│   │   │   └── stocks/           # API routes for backend communication
│   │   │       ├── [symbol]/
│   │   │       │   ├── history/
│   │   │       │   └── realtime/
│   │   │       ├── [symbol]/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx              # Dashboard
│   │   └── stock/
│   │       └── [symbol]/
│   │           └── page.tsx      # Stock details
│   ├── src/
│   │   ├── components/
│   │   │   ├── StockCard.tsx
│   │   │   ├── StockChart.tsx
│   │   │   ├── StockTable.tsx
│   │   │   └── MarketIndicator.tsx
│   │   └── types/
│   │       └── stock.types.ts
│   ├── public/
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## ✨ Features

### Frontend
- **Dashboard**: Overview of popular stocks with real-time data
- **Stock Details**: Individual stock pages with interactive charts
- **Price History**: Interactive charts showing price movements with multiple time period support
- **Market Data**: Comprehensive market statistics including market cap, P/E ratio, 52-week highs/lows
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode**: Automatic dark/light mode support
- **Real-time Updates**: Live stock price updates

### Backend
- **RESTful API**: Clean REST API endpoints for stock data
- **Yahoo Finance Integration**: Free, no API key required
- **TypeScript**: Type-safe backend code
- **Error Handling**: Comprehensive error handling and validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm run dev
# Backend runs at http://localhost:3001
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Frontend runs at http://localhost:3000
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/stocks | Get all popular stocks |
| GET | /api/stocks/:symbol | Get specific stock data |
| GET | /api/stocks/:symbol/history?period=X | Get historical price data |
| GET | /api/stocks/:symbol/realtime | Get real-time price |

## 🎨 Components

### StockCard
- Displays individual stock information
- Shows symbol, name, price, change, and volume
- Clickable to view stock details

### StockChart
- Interactive price history chart using Recharts
- Support for multiple time periods (1D, 1M, 3M, 1Y, YTD)
- Real-time tooltips and responsive design

### StockTable
- Grid layout displaying multiple stock cards
- Sorted by trading volume

### MarketIndicator
- Market status overview
- Comprehensive market statistics
- Expandable details view

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js / Express
- **Language**: TypeScript
- **Data Source**: Yahoo Finance API

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI**: React 19
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Type Safety**: TypeScript

## 🔧 Development Commands

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
npm start        # Start production server
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on the repository.
