'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import ImageReveal from '@/components/ui/ImageReveal';
import { getAbstract } from '@/data/fractals';

const FRACTAL_LABELS = ['Infinitum', 'Fractal Portraits', 'Abstract'] as const;
const FRACTAL_ALTS = [
  'Fractal art from the Infinitum collection',
  'Fractal geometry projected onto portrait photography',
  'Abstract fractal composition with recursive geometry',
] as const;

const DEFAULT_FRACTAL_THUMBS = [
  '/images/fractals/051523_SkiPath3DFlower.jpg',
  '/images/fractals/051623_OrbitTrapCameos.jpg',
  '/images/fractals/SpiralColor3jpg.jpg',
];

function pickRandom<T>(arr: readonly T[], n: number): T[] {
  const copy = [...arr];
  const result: T[] = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy[idx]);
    copy[idx] = copy[copy.length - 1];
    copy.pop();
  }
  return result;
}

export default function FractalsSection() {
  const fractalsRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 });

  // Randomized fractal thumbnails — different set each visit
  const [fractalThumbs, setFractalThumbs] = useState(DEFAULT_FRACTAL_THUMBS);
  useEffect(() => {
    const pool = getAbstract();
    const picked = pickRandom(pool, 3);
    setFractalThumbs(picked.map((f) => f.src));
  }, []);

  return (
    <section className="relative z-20 bg-background py-32 lg:py-40 section-fade overflow-hidden">
      <div ref={fractalsRef} className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <p data-reveal className="text-gold-accent text-[11px] md:text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)] text-hover-expand">
          <span className="opacity-30 mr-3">05</span>Fractal Art
        </p>
        <h2 data-reveal="split" className="font-[family-name:var(--font-display)] text-4xl md:text-6xl text-foreground font-light mb-8 tracking-tight leading-tight">
          Kinesthesia
        </h2>
        <p data-reveal className="text-gradient-gold-accent text-lg md:text-xl font-[family-name:var(--font-display)] italic mb-6">
          Sold at Sotheby&apos;s London for &pound;90,000
        </p>
        <p data-reveal className="text-foreground/40 text-base leading-relaxed max-w-xl mb-4">
          Fractal geometry projected onto dancers in motion — inspired by Venezuelan kinetic
          masters Carlos Cruz-Diez and Jes&uacute;s Rafael Soto. The first Venezuelan NFT artist
          to exhibit and sell at a major auction house.
        </p>
        <p data-reveal className="text-foreground/30 text-sm leading-relaxed max-w-xl mb-10">
          Since 2020, exploring the infinite through fractal mathematics — merging recursive
          geometry, motion, and mysticism across collections exhibited globally.
        </p>

        {/* Kinesthesia hero image */}
        <div data-reveal className="mb-8">
          <a
            href="https://www.sothebys.com/en/buy/auction/2022/modern-contemporary-art-day-auction/kinesthesia"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <ImageReveal direction="up">
              <div className="relative aspect-[21/9] bg-surface overflow-hidden border border-gold-accent/10 group-hover:border-gold-accent/30 transition-colors duration-300">
                <Image
                  src="/images/fractals/kinesthesia.jpg"
                  alt="Kinesthesia — fractal geometry projected onto dancers, sold at Sotheby's"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  data-colorize
                />
              </div>
            </ImageReveal>
          </a>
        </div>

        {/* Preview thumbnails — Infinitum, Portrait, Abstract */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {FRACTAL_LABELS.map((label, i) => (
            <ImageReveal key={label} direction="up" delay={i * 0.1}>
              <Link href="/fractals" className="relative aspect-square bg-surface border border-gold-accent/10 overflow-hidden block group cursor-pointer" data-cursor="view">
                <Image
                  src={fractalThumbs[i]}
                  alt={FRACTAL_ALTS[i]}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-colorize
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
                  <p className="text-gold-accent/60 text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
                    {label}
                  </p>
                </div>
              </Link>
            </ImageReveal>
          ))}
        </div>

        <div data-reveal>
          <Link
            href="/fractals"
            className="inline-flex items-center gap-2 px-10 py-4 border border-gold-accent/30 text-gold-accent text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:bg-gold-accent/10 hover:border-gold-accent transition-all duration-300"
          >
            Enter the Fractal World
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-gold-accent/[0.02] blur-[120px] pointer-events-none" />
    </section>
  );
}
