'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useScrollColorize } from '@/hooks/useScrollColorize';
import Lightbox from '@/components/Lightbox';
import ImageReveal from '@/components/ui/ImageReveal';
import ParallaxImage from '@/components/ui/ParallaxImage';
import MagneticButton from '@/components/ui/MagneticButton';
import {
  getAllFractals,
  getKinesthesia,
  getInfinitum,
  getPortraits,
  getAbstract,
} from '@/data/fractals';

export default function FractalsPage() {
  const colorizeRef = useScrollColorize<HTMLDivElement>();
  const introRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 });
  const infinitumRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });
  const portraitsRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });
  const galleryRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });
  const linksRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

  // Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const handleNavigate = useCallback((index: number) => setLightboxIndex(index), []);

  // Build flat image array for lightbox
  const kinesthesia = getKinesthesia();
  const infinitum = getInfinitum();
  const portraits = getPortraits();
  const abstracts = getAbstract();

  const allImages = useMemo(() => {
    return [kinesthesia, ...infinitum, ...portraits, ...abstracts];
  }, []);

  const allSrcs = useMemo(() => allImages.map((f) => f.src), [allImages]);

  // Helper: get index in flat array
  const getIdx = (src: string) => allSrcs.indexOf(src);

  return (
    <div ref={colorizeRef} className="relative z-10 bg-[#0A0A0A] min-h-screen overflow-hidden">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#C8C0B4]/50 text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-[#C8C0B4] transition-colors duration-300"
        >
          <ArrowLeft size={12} />
          Home
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════
          1. INTRO — About Fractals
      ═══════════════════════════════════════════════════════ */}
      <div ref={introRef} className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16 relative z-10">
        <p data-reveal className="text-[#C9A84C] text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)]">
          Fractal Art
        </p>
        <h1 data-reveal="split" className="font-[family-name:var(--font-display)] text-5xl md:text-8xl text-[#F5F0E8] font-light mb-8 tracking-tight leading-tight">
          The Infinite Within
        </h1>
        <div data-reveal className="text-[#F5F0E8]/50 text-base leading-relaxed max-w-2xl space-y-6">
          <p>
            Since 2020, J.N. Silva has explored the infinite through fractal geometry —
            drawing from Venezuelan kinetic art traditions of Carlos Cruz-Diez and
            Jes&uacute;s Rafael Soto to create works that merge mathematics, motion,
            and mysticism.
          </p>
          <p>
            From the landmark Kinesthesia sale at Sotheby&apos;s to the Infinitum collection
            on Nifty Gateway, this body of work bridges the algorithmic and the organic —
            projecting recursive patterns onto the human form and discovering beauty
            in infinite recursion.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          2. KINESTHESIA — Hero Piece
      ═══════════════════════════════════════════════════════ */}
      <div className="mb-24">
        {/* Full-width image */}
        <div
          className="relative w-full h-[60vh] overflow-hidden cursor-pointer"
          data-cursor="view"
          onClick={() => setLightboxIndex(getIdx(kinesthesia.src))}
        >
          <ParallaxImage speed={0.15} className="absolute inset-0">
            <div className="relative w-full h-[110%] -mt-[5%]">
              <Image
                src={kinesthesia.src}
                alt="Kinesthesia"
                fill
                sizes="100vw"
                className="object-cover"
                data-colorize
                priority
              />
            </div>
          </ParallaxImage>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        </div>

        {/* Title + description below */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-10">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl text-[#F5F0E8] font-light mb-4 tracking-tight">
            Kinesthesia
          </h2>
          <p className="text-gradient-gold-accent text-xl md:text-2xl font-[family-name:var(--font-display)] italic mb-6">
            Sold at Sotheby&apos;s London for &pound;90,000
          </p>
          <p className="text-[#F5F0E8]/40 text-base leading-relaxed max-w-xl mb-6">
            Fractal geometry projected onto dancers in motion — a marriage of mathematics
            and human expression. The first Venezuelan NFT artist to exhibit and sell at
            a major auction house, marking a pivotal moment for Latin American digital art.
          </p>
          <a
            href="https://www.sothebys.com/en/buy/auction/2022/modern-contemporary-art-day-auction/kinesthesia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C9A84C]/60 text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-[#C9A84C] transition-colors duration-300"
          >
            View on Sotheby&apos;s
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          3. INFINITUM COLLECTION
      ═══════════════════════════════════════════════════════ */}
      <div ref={infinitumRef} className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24 relative z-10">
        <p data-reveal className="text-[#C9A84C]/60 text-[10px] uppercase tracking-[0.4em] mb-3 font-[family-name:var(--font-mono)]">
          Collection
        </p>
        <h3 data-reveal="split" className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-[#F5F0E8] font-light mb-4 tracking-tight">
          Infinitum
        </h3>
        <p data-reveal className="text-[#F5F0E8]/40 text-sm leading-relaxed max-w-xl mb-10">
          Solo collection exploring infinite recursion, sacred patterns, and fractal imagery.
          Released on Nifty Gateway in May 2022 with live minting experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {infinitum.map((item, i) => (
            <ImageReveal key={item.src} direction="up" delay={i * 0.1}>
              <div
                className="relative aspect-[2/3] bg-[#141414] border border-[#C9A84C]/10 overflow-hidden cursor-pointer group"
                data-cursor="view"
                onClick={() => setLightboxIndex(getIdx(item.src))}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-colorize
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent">
                  <p className="text-[#C9A84C]/50 text-[10px] uppercase tracking-[0.2em] font-[family-name:var(--font-mono)]">
                    {item.title}
                  </p>
                </div>
              </div>
            </ImageReveal>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          4. FRACTAL PORTRAITS
      ═══════════════════════════════════════════════════════ */}
      <div ref={portraitsRef} className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24 relative z-10">
        <p data-reveal className="text-[#C9A84C]/60 text-[10px] uppercase tracking-[0.4em] mb-3 font-[family-name:var(--font-mono)]">
          Series
        </p>
        <h3 data-reveal="split" className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-[#F5F0E8] font-light mb-10 tracking-tight">
          Fractal Portraits
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {portraits.map((item, i) => (
            <ImageReveal key={item.src} direction="up" delay={i * 0.1}>
              <div
                className={`relative ${item.aspect === 'tall' ? 'aspect-[2/3]' : 'aspect-[3/2]'} bg-[#141414] border border-[#C9A84C]/10 overflow-hidden cursor-pointer group`}
                data-cursor="view"
                onClick={() => setLightboxIndex(getIdx(item.src))}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-colorize
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent">
                  <p className="text-[#C9A84C]/50 text-[10px] uppercase tracking-[0.2em] font-[family-name:var(--font-mono)]">
                    {item.title}
                  </p>
                </div>
              </div>
            </ImageReveal>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          5. PROCEDURAL FRACTALS — Masonry Gallery
      ═══════════════════════════════════════════════════════ */}
      <div ref={galleryRef} className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24 relative z-10">
        <p data-reveal className="text-[#C9A84C]/60 text-[10px] uppercase tracking-[0.4em] mb-3 font-[family-name:var(--font-mono)]">
          Gallery
        </p>
        <h3 data-reveal="split" className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-[#F5F0E8] font-light mb-4 tracking-tight">
          Procedural Fractals
        </h3>
        <p data-reveal className="text-[#F5F0E8]/30 text-sm mb-10 font-[family-name:var(--font-mono)]">
          {abstracts.length} works
        </p>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
          {abstracts.map((item) => (
            <div
              key={item.src}
              data-reveal
              className="break-inside-avoid"
            >
              <div
                className={`relative ${item.aspect === 'tall' ? 'aspect-[2/3]' : item.aspect === 'square' ? 'aspect-square' : 'aspect-[3/2]'} bg-[#141414] border border-[#C9A84C]/5 overflow-hidden cursor-pointer group`}
                data-cursor="view"
                onClick={() => setLightboxIndex(getIdx(item.src))}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-colorize
                />
                <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/30 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent">
                  <p className="text-[#F5F0E8] text-xs font-[family-name:var(--font-mono)]">
                    {item.title}
                  </p>
                  {item.year && (
                    <p className="text-[#C9A84C]/40 text-[10px] font-[family-name:var(--font-mono)]">
                      {item.year}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          6. PLATFORM LINKS + CTA
      ═══════════════════════════════════════════════════════ */}
      <div ref={linksRef} className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32 relative z-10">
        {/* Platform links */}
        <div data-reveal className="flex flex-wrap items-center gap-6 mb-8">
          <span className="text-[#F5F0E8]/30 text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-mono)]">
            Available on:
          </span>
          {[
            { name: 'SuperRare', url: 'https://superrare.com/jnsilva' },
            { name: 'OpenSea', url: 'https://opensea.io/jnsilva' },
            { name: '1stDibs', url: 'https://www.1stdibs.com/creators/jn-silva/' },
          ].map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A84C]/60 text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-mono)] hover:text-[#C9A84C] transition-colors duration-300"
            >
              {platform.name} <ExternalLink size={10} className="inline ml-1 -mt-0.5" />
            </a>
          ))}
        </div>

        <div data-reveal className="text-center mt-12">
          <MagneticButton
            as="a"
            href="/digital-art"
            className="inline-flex items-center gap-2 px-10 py-4 border border-[#C9A84C]/30 text-[#C9A84C] text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:bg-[#C9A84C]/10 hover:border-[#C9A84C] transition-all duration-300"
          >
            See All Digital Art
            <ArrowRight size={14} />
          </MagneticButton>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[#C9A84C]/[0.015] blur-[150px] pointer-events-none" />
      <div className="absolute top-[60%] left-1/4 w-[50vw] h-[50vw] rounded-full bg-[#C9A84C]/[0.01] blur-[120px] pointer-events-none" />

      {/* ─── Lightbox ─── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={allSrcs}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
