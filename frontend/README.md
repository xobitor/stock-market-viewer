# Stock Market Viewer - Frontend

A modern, responsive stock market visualizer built with Next.js 16, React 19, and TypeScript.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts

## Project Structure

```
frontend/
├── app/
│   ├── api/
│   │   └── stocks/
│   │       ├── [symbol]/
│   │       │   ├── history/
│   │       │   │   └── route.ts
│   │       │   └── realtime/
│   │       │       └── route.ts
│   │       ├── [symbol]/
│   │       │   └── route.ts
│   │       └── route.ts
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   └── stock/
│       └── [symbol]/
│           └── page.tsx
├── src/
│   ├── components/
│   │   ├── StockCard.tsx
│   │   ├── StockChart.tsx
│   │   ├── StockTable.tsx
│   │   └── MarketIndicator.tsx
│   └── types/
│       └── stock.types.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Features

- **Dashboard**: Overview of popular stocks with real-time data
- **Stock Details**: Individual stock pages with interactive charts
- **Price History**: Interactive charts showing price movements
- **Market Data**: Comprehensive market statistics
- **Responsive Design**: Works seamlessly on desktop and mobile

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
# Opens at http://localhost:3000
```

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## API Endpoints

The frontend connects to the backend API at `http://localhost:3001`:

- `GET /api/stocks` - Get all popular stocks
- `GET /api/stocks/:symbol` - Get specific stock data
- `GET /api/stocks/:symbol/history?period=X` - Get historical data
- `GET /api/stocks/:symbol/realtime` - Get real-time price

## Components

### StockCard
Displays individual stock information including symbol, name, price, change, and volume.

### StockChart
Interactive price history chart using Recharts with support for multiple time periods.

### StockTable
Grid layout displaying multiple stock cards for easy browsing.

### MarketIndicator
Shows market status and detailed statistics for a stock.

## Styling

The frontend uses Tailwind CSS 4 with custom CSS variables for theming. Supports dark mode automatically.

## Development Guidelines

1. Use TypeScript for type safety
2. Follow Next.js App Router best practices
3. Use the `@/` alias for imports
4. Keep components small and focused
5. Use proper accessibility attributes

## License

MIT
