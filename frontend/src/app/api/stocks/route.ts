export async function GET() {
  try {
    const response = await fetch('http://localhost:3001/api/stocks', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch stocks: ${response.statusText}`);
    }

    const stocks = await response.json();
    return new Response(JSON.stringify(stocks), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in /api/stocks:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to fetch stocks',
        error: 'INTERNAL_SERVER_ERROR',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}