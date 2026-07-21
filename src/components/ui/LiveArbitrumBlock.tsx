'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Live Arbitrum One block counter — polls /api/arbitrum-block on the
 * chain's ~12s pulse. Renders nothing until the first block arrives,
 * and goes quiet (rather than stale) if the RPC stops answering.
 */
export default function LiveArbitrumBlock() {
  const [block, setBlock] = useState<number | null>(null);
  const [pulse, setPulse] = useState(false);
  const lastBlockRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function tick() {
      try {
        const res = await fetch('/api/arbitrum-block');
        const data = await res.json();
        if (cancelled || typeof data.block !== 'number') return;
        if (data.block !== lastBlockRef.current) {
          lastBlockRef.current = data.block;
          setBlock(data.block);
          setPulse(true);
          setTimeout(() => setPulse(false), 600);
        }
      } catch {
        /* keep last value */
      }
    }

    tick();
    const interval = setInterval(tick, 12_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (block === null) return null;

  return (
    <span className="inline-flex items-center gap-2 text-[10px] font-[family-name:var(--font-mono)] tracking-wider text-[#C8C0B4]/70">
      <span
        className={`w-1.5 h-1.5 rounded-full bg-emerald-400 transition-all duration-500 ${
          pulse ? 'opacity-100 scale-125 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'opacity-60'
        }`}
        aria-hidden="true"
      />
      LIVE &middot; BLOCK {block.toLocaleString('en-US')}
    </span>
  );
}
