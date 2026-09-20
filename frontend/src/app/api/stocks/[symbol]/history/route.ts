export async function GET(
  req: Request,
  { params }: { params: { symbol: string } }
) {
  try {
    const { symbol } = params;
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || '1mo';
    
    const response = await fetch(
      `http://localhost:3001/api/stocks/${encodeURIComponent(symbol)}/history?period=${period}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch historical data for ${symbol}: ${response.statusText}`);
    }

    const history = await response.json();
    return new Response(JSON.stringify(history), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Error in /api/stocks/${params.symbol}/history:`, error);
    return new Response(
      JSON.stringify({
        message: `Failed to fetch historical data for ${params.symbol}`,
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