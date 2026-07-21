import { NextResponse } from 'next/server';

/**
 * Current Arbitrum One block number, via the public RPC.
 * Cached at the edge for 10s — the Lab page polls every ~12s (block pulse).
 */
export async function GET() {
  try {
    const res = await fetch('https://arb1.arbitrum.io/rpc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_blockNumber', params: [], id: 1 }),
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`RPC ${res.status}`);

    const data = await res.json();
    const block = parseInt(data.result, 16);
    if (!Number.isFinite(block)) throw new Error('bad block');

    return NextResponse.json(
      { block },
      { headers: { 'Cache-Control': 's-maxage=10, stale-while-revalidate=30' } }
    );
  } catch {
    return NextResponse.json({ block: null }, { status: 200 });
  }
}
