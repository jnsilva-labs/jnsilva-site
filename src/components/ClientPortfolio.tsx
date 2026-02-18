'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useScrollColorize } from '@/hooks/useScrollColorize';
import Lightbox from '@/components/Lightbox';
import type { ClientData } from '@/data/clients';

interface ClientPortfolioProps {
  client: ClientData;
  prevClient: ClientData | null;
  nextClient: ClientData | null;
}

export default function ClientPortfolio({ client, prevClient, nextClient }: ClientPortfolioProps) {
  const colorizeRef = useScrollColorize<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>({ stagger: 0.06 });
  const ctaRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const handleNavigate = useCallback((index: number) => setLightboxIndex(index), []);

  const allImages = client.photos.map((p) => p.src);

  return (
    <div ref={colorizeRef} className="relative z-10 bg-[#0A0A0A] pt-24 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-10">
        <Link
          href="/clients"
          className="inline-flex items-center gap-2 text-[#F5F0E8]/30 hover:text-[#C8C0B4] text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-mono)] transition-colors duration-300"
        >
          <ArrowLeft size={14} />
          Back to Clients
        </Link>
      </div>

      {/* Hero cover image */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <div className="relative aspect-[21/9] overflow-hidden bg-[#141414]">
          <Image
            src={client.coverImage}
            alt={client.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-3 font-[family-name:var(--font-mono)]">
              {client.category}
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light">
              {client.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Photo count */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
        <p className="text-[#F5F0E8]/20 text-xs uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
          {client.photos.length} photograph{client.photos.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Masonry photo grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div ref={gridRef} className="columns-2 lg:columns-3 gap-4 space-y-4">
          {client.photos.map((photo, index) => (
            <div
              key={photo.src}
              data-reveal
              className="group relative overflow-hidden break-inside-avoid bg-[#141414] cursor-pointer"
              data-cursor="view"
              onClick={() => setLightboxIndex(index)}
            >
              <div className={`relative ${photo.aspect === 'tall' ? 'aspect-[2/3]' : 'aspect-[3/2]'}`}>
                <Image
                  src={photo.src}
                  alt={`${client.name} — ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-colorize
                />
                <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/30 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next navigation */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-2 gap-4 border-t border-b border-[#F5F0E8]/[0.04] py-8">
          {/* Previous */}
          <div>
            {prevClient ? (
              <Link
                href={`/clients/${prevClient.slug}`}
                className="group flex items-center gap-3 text-[#F5F0E8]/30 hover:text-[#C8C0B4] transition-colors duration-300"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-[family-name:var(--font-mono)] mb-1">
                    Previous
                  </p>
                  <p className="font-[family-name:var(--font-display)] text-xl text-[#F5F0E8] group-hover:text-[#C8C0B4] transition-colors duration-300">
                    {prevClient.name}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Next */}
          <div className="text-right">
            {nextClient ? (
              <Link
                href={`/clients/${nextClient.slug}`}
                className="group inline-flex items-center gap-3 text-[#F5F0E8]/30 hover:text-[#C8C0B4] transition-colors duration-300"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-[family-name:var(--font-mono)] mb-1">
                    Next
                  </p>
                  <p className="font-[family-name:var(--font-display)] text-xl text-[#F5F0E8] group-hover:text-[#C8C0B4] transition-colors duration-300">
                    {nextClient.name}
                  </p>
                </div>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <div data-reveal className="p-16 bg-[#141414] border border-[#C8C0B4]/10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#F5F0E8] mb-6">
            Interested in working together?
          </h2>
          <p className="text-[#F5F0E8]/40 text-base mb-8 max-w-md mx-auto">
            Let&apos;s create something meaningful for your brand.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 border border-[#C8C0B4] text-[#C8C0B4] text-sm uppercase tracking-[0.15em] hover:bg-[#C8C0B4] hover:text-[#0A0A0A] transition-all duration-300"
          >
            Start a Conversation
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
