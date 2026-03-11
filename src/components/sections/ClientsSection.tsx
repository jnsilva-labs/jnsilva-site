'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { getFeaturedClients } from '@/data/clients';

const clientNames = [
  'Nike', 'Sony', 'Spotify', 'Samsung', 'American Express',
  'MTV', 'Lululemon', 'Ducati', 'Hypebeast', 'Don Julio',
  'Vans', 'Converse', 'Honda', 'Sephora', 'Interscope',
  'Baileys', 'Grey Goose', 'Johnnie Walker', 'Facebook', 'AT&T',
];

export default function ClientsSection() {
  const clientsRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });
  const featuredClients = getFeaturedClients();

  return (
    <section className="relative z-20 bg-background py-20 lg:py-24 section-fade">
      <div ref={clientsRef}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8">
          <p data-reveal className="text-gold text-[11px] md:text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)]">
            <span className="opacity-30 mr-3">03</span>Select Clients
          </p>
        </div>

        {/* Horizontal scroll strip */}
        <div data-reveal className="relative">
          {/* Right-edge scroll hint — mobile only */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-16 z-10 bg-gradient-to-l from-background to-transparent md:hidden" />
        <div className="overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          <div className="flex gap-3 px-6 md:px-12" style={{ width: 'max-content' }}>
            {featuredClients.map((client) => (
              <Link
                key={client.slug}
                href={`/clients/${client.slug}`}
                className="group relative flex-shrink-0 w-[260px] md:w-[320px] lg:w-[350px] overflow-hidden snap-start"
                data-cursor="view"
              >
                <div className="relative aspect-[3/4] bg-surface overflow-hidden">
                  <Image
                    src={client.coverImage}
                    alt={client.name}
                    fill
                    sizes="(max-width: 768px) 260px, 350px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    data-colorize
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                  {/* Client name */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-gold/50 text-[9px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)] mb-2">
                      {client.category}
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-foreground font-light leading-tight tracking-wide">
                      {client.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
          {/* Dot indicators — mobile only */}
          <div className="flex gap-2 justify-center mt-4 md:hidden">
            {featuredClients.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold/20" />
            ))}
          </div>
        </div>

        {/* Subtle marquee + CTA */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-8">
          <div data-reveal className="overflow-hidden py-4 border-t border-b border-foreground/[0.03] mb-8">
            <div className="flex animate-[scroll_40s_linear_infinite] whitespace-nowrap">
              {[...clientNames, ...clientNames].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="mx-8 font-[family-name:var(--font-display)] text-lg md:text-2xl text-foreground/[0.12] whitespace-nowrap"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div data-reveal className="text-center">
            <Link
              href="/clients"
              className="inline-flex items-center gap-2 text-gold/60 text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-gold transition-colors duration-300"
            >
              View All Client Work
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
