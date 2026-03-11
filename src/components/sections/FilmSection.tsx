'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import YouTubeFacade from '@/components/ui/YouTubeFacade';

export default function FilmSection() {
  const filmRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 });

  return (
    <section className="relative z-20 bg-background py-32 lg:py-40 section-fade">
      <div ref={filmRef} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p data-reveal className="text-gold text-[11px] md:text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)] text-hover-expand">
          <span className="opacity-30 mr-3">04</span>Buscando America
        </p>

        {/* Buscando America — title + IDIOSINCRASIA documentary */}
        <div data-reveal className="mb-6">
          <p className="text-gold/40 text-[11px] md:text-[10px] uppercase tracking-[0.4em] font-[family-name:var(--font-mono)] mb-4">
            Looking for America
          </p>
          <h3 className="font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,6rem)] text-foreground font-light tracking-wide leading-none mb-2">
            Buscando America
          </h3>
          <p className="text-gold/30 text-xs font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase">
            A fiction film under construction in Web3
          </p>
        </div>
        <div data-reveal className="relative overflow-hidden mb-16 border border-foreground/[0.04]">
          <div className="relative aspect-video bg-[#0D0D0D]" data-cursor="play">
            <YouTubeFacade
              videoId="VhJgK1K4fc4"
              title="IDIOSINCRASIA — A Buscando America Documentary"
              start={34}
            />
          </div>
        </div>

        {/* Info beneath */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end mb-16">
          <div>
            <p className="text-foreground/40 text-base leading-relaxed max-w-xl">
              A Web3 ecosystem built by Latino filmmakers. 2,500 NFT photographs documenting
              Medell&iacute;n&apos;s idiosyncrasy. Co-directed by Alex Ulises &amp; Nelson G. Navarrete.
              JN Silva as Web3 Executive Producer. Screened at NFT Now&apos;s The Gateway.
            </p>
          </div>
          <Link
            href="/buscando-america"
            className="inline-flex items-center gap-2 text-gold text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-foreground transition-colors duration-300 whitespace-nowrap"
          >
            Explore the Universe
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
