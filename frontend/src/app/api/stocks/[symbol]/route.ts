export async function GET(
  req: Request,
  { params }: { params: { symbol: string } }
) {
  try {
    const { symbol } = params;
    const response = await fetch(`http://localhost:3001/api/stocks/${encodeURIComponent(symbol)}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch stock data for ${symbol}: ${response.statusText}`);
    }

    const stock = await response.json();
    return new Response(JSON.stringify(stock), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Error in /api/stocks/${params.symbol}:`, error);
    return new Response(
      JSON.stringify({
        message: `Failed to fetch stock data for ${params.symbol}`,
        code: 'STOCK_NOT_FOUND',
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}