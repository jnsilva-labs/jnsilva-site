'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import ImageReveal from '@/components/ui/ImageReveal';
import ParallaxImage from '@/components/ui/ParallaxImage';
import MagneticButton from '@/components/ui/MagneticButton';
import { handleKeyActivate } from '@/utils/a11y';
import { selectPhotography } from '@/data/photography';

interface PhotographySectionProps {
  onLightboxOpen: (index: number) => void;
}

export default function PhotographySection({ onLightboxOpen }: PhotographySectionProps) {
  return (
    <section className="relative z-20 bg-background section-fade">
      {/* Section header — tight */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-4 pb-2">
        <p className="text-gold text-[11px] md:text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)] text-hover-expand">
          <span className="opacity-30 mr-3">02</span>Select Photography
        </p>
      </div>

      {/* All frames — tight consistent spacing */}
      <div className="flex flex-col gap-4">

      {/* Frame 1: BENTO MOSAIC — "The Wall" — 8 images, all categories */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] lg:auto-rows-[280px] gap-2 md:grid-flow-dense">
          {/* A: Laser show — wide, spans 2 cols */}
          <ImageReveal direction="left" delay={0} triggerStart="top 98%" className="col-span-2 row-span-1">
            <div
              className="relative h-full bg-surface cursor-pointer group overflow-hidden"
              data-cursor="view"
              role="button"
              tabIndex={0}
              onClick={() => onLightboxOpen(0)}
              onKeyDown={handleKeyActivate(() => onLightboxOpen(0))}
            >
              <Image
                src={selectPhotography[0].src}
                alt={selectPhotography[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                data-colorize
                priority
              />
            </div>
          </ImageReveal>
          {/* B: Gesaffelstein — tall, spans 2 rows */}
          <ImageReveal direction="up" delay={0.05} triggerStart="top 98%" className="row-span-2">
            <div
              className="relative h-full bg-surface cursor-pointer group overflow-hidden"
              data-cursor="view"
              role="button"
              tabIndex={0}
              onClick={() => onLightboxOpen(1)}
              onKeyDown={handleKeyActivate(() => onLightboxOpen(1))}
            >
              <Image
                src={selectPhotography[1].src}
                alt={selectPhotography[1].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-colorize
                priority
              />
            </div>
          </ImageReveal>
          {/* D: Grand Prismatic — tall, spans 2 rows */}
          <ImageReveal direction="right" delay={0.1} triggerStart="top 98%" className="row-span-2">
            <div
              className="relative h-full bg-surface cursor-pointer group overflow-hidden"
              data-cursor="view"
              role="button"
              tabIndex={0}
              onClick={() => onLightboxOpen(3)}
              onKeyDown={handleKeyActivate(() => onLightboxOpen(3))}
            >
              <Image
                src={selectPhotography[3].src}
                alt={selectPhotography[3].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-colorize
                priority
              />
            </div>
          </ImageReveal>
          {/* C: NYC Steam — wide, spans 2 cols */}
          <ImageReveal direction="up" delay={0.08} triggerStart="top 98%" className="col-span-2 row-span-1">
            <div
              className="relative h-full bg-surface cursor-pointer group overflow-hidden"
              data-cursor="view"
              role="button"
              tabIndex={0}
              onClick={() => onLightboxOpen(2)}
              onKeyDown={handleKeyActivate(() => onLightboxOpen(2))}
            >
              <Image
                src={selectPhotography[2].src}
                alt={selectPhotography[2].alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                data-colorize
                priority
              />
            </div>
          </ImageReveal>
          {/* E: Fashion Week — tall, spans 2 rows */}
          <ImageReveal direction="left" delay={0.12} triggerStart="top 98%" className="row-span-2">
            <div
              className="relative h-full bg-surface cursor-pointer group overflow-hidden"
              data-cursor="view"
              role="button"
              tabIndex={0}
              onClick={() => onLightboxOpen(4)}
              onKeyDown={handleKeyActivate(() => onLightboxOpen(4))}
            >
              <Image
                src={selectPhotography[4].src}
                alt={selectPhotography[4].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-colorize
              />
            </div>
          </ImageReveal>
          {/* F: Coachella — wide, spans 2 cols */}
          <ImageReveal direction="up" delay={0.14} triggerStart="top 98%" className="col-span-2 row-span-1">
            <div
              className="relative h-full bg-surface cursor-pointer group overflow-hidden"
              data-cursor="view"
              role="button"
              tabIndex={0}
              onClick={() => onLightboxOpen(5)}
              onKeyDown={handleKeyActivate(() => onLightboxOpen(5))}
            >
              <Image
                src={selectPhotography[5].src}
                alt={selectPhotography[5].alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                data-colorize
              />
            </div>
          </ImageReveal>
          {/* G: Brooklyn Bridge Fog — hidden on mobile, tall on desktop */}
          <ImageReveal direction="up" delay={0.16} triggerStart="top 98%" className="hidden md:block md:row-span-2">
            <div
              className="relative h-full bg-surface cursor-pointer group overflow-hidden"
              data-cursor="view"
              role="button"
              tabIndex={0}
              onClick={() => onLightboxOpen(6)}
              onKeyDown={handleKeyActivate(() => onLightboxOpen(6))}
            >
              <Image
                src={selectPhotography[6].src}
                alt={selectPhotography[6].alt}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-colorize
              />
            </div>
          </ImageReveal>
          {/* H: Guatemala Rays — fills remaining gap */}
          <ImageReveal direction="right" delay={0.18} triggerStart="top 98%" className="col-span-2 row-span-1">
            <div
              className="relative h-full bg-surface cursor-pointer group overflow-hidden"
              data-cursor="view"
              role="button"
              tabIndex={0}
              onClick={() => onLightboxOpen(7)}
              onKeyDown={handleKeyActivate(() => onLightboxOpen(7))}
            >
              <Image
                src={selectPhotography[7].src}
                alt={selectPhotography[7].alt}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                data-colorize
              />
            </div>
          </ImageReveal>
          {/* I: Kesha — Vogue featured, tall portrait */}
          <ImageReveal direction="up" delay={0.2} triggerStart="top 98%" className="row-span-2">
            <div
              className="relative h-full bg-surface cursor-pointer group overflow-hidden"
              data-cursor="view"
              role="button"
              tabIndex={0}
              onClick={() => onLightboxOpen(8)}
              onKeyDown={handleKeyActivate(() => onLightboxOpen(8))}
            >
              <Image
                src={selectPhotography[8].src}
                alt={selectPhotography[8].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-colorize
              />
            </div>
          </ImageReveal>
          {/* J: Concert performance — tall portrait */}
          <ImageReveal direction="right" delay={0.22} triggerStart="top 98%" className="row-span-2">
            <div
              className="relative h-full bg-surface cursor-pointer group overflow-hidden"
              data-cursor="view"
              role="button"
              tabIndex={0}
              onClick={() => onLightboxOpen(9)}
              onKeyDown={handleKeyActivate(() => onLightboxOpen(9))}
            >
              <Image
                src={selectPhotography[9].src}
                alt={selectPhotography[9].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-colorize
              />
            </div>
          </ImageReveal>
          {/* K: Japan — wide, fills gap next to I+J portraits */}
          <ImageReveal direction="up" delay={0.24} triggerStart="top 98%" className="col-span-2 row-span-2">
            <div
              className="relative h-full bg-surface cursor-pointer group overflow-hidden"
              data-cursor="view"
              role="button"
              tabIndex={0}
              onClick={() => onLightboxOpen(10)}
              onKeyDown={handleKeyActivate(() => onLightboxOpen(10))}
            >
              <Image
                src={selectPhotography[10].src}
                alt={selectPhotography[10].alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-colorize
              />
            </div>
          </ImageReveal>
        </div>
      </div>

      {/* Frame 2: FULL-BLEED PARALLAX HERO — White Sands */}
      <div className="relative w-screen -mx-[calc((100vw-100%)/2)] h-[60vh] md:h-[100vh] overflow-hidden">
        <ParallaxImage speed={0.2} className="h-full">
          <div className="relative w-full h-full" data-colorize>
            <Image
              src="/images/hero/DSC07671.JPG"
              alt="White Sands dunes stretching to the horizon under bright sky"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </ParallaxImage>
      </div>

      {/* Frame 3: OFFSET ASYMMETRIC — Film Noir + Qatar */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 items-end">
          <ImageReveal direction="left" delay={0} triggerStart="top 100%">
            <div
              className="relative aspect-[2/3] bg-surface cursor-pointer group overflow-hidden"
              data-cursor="view"
              role="button"
              tabIndex={0}
              onClick={() => onLightboxOpen(12)}
              onKeyDown={handleKeyActivate(() => onLightboxOpen(12))}
            >
              <Image
                src={selectPhotography[12].src}
                alt={selectPhotography[12].alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-colorize
              />
            </div>
          </ImageReveal>
          <ImageReveal direction="right" delay={0.15} triggerStart="top 100%">
            <div
              className="relative aspect-[3/2] bg-surface cursor-pointer group overflow-hidden"
              data-cursor="view"
              role="button"
              tabIndex={0}
              onClick={() => onLightboxOpen(13)}
              onKeyDown={handleKeyActivate(() => onLightboxOpen(13))}
            >
              <Image
                src={selectPhotography[13].src}
                alt={selectPhotography[13].alt}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-colorize
              />
            </div>
          </ImageReveal>
        </div>
      </div>

      {/* Frame 4: TRIPTYCH — Kendrick, Solar Eclipse, Underwater */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { src: selectPhotography[14].src, alt: selectPhotography[14].alt, idx: 14 },
            { src: selectPhotography[15].src, alt: selectPhotography[15].alt, idx: 15 },
            { src: selectPhotography[16].src, alt: selectPhotography[16].alt, idx: 16 },
          ].map((item, i) => (
            <ImageReveal key={item.src} direction="up" delay={i * 0.12} triggerStart="top 100%">
              <div
                className="relative aspect-[2/3] bg-surface cursor-pointer group overflow-hidden"
                data-cursor="view"
                role="button"
                tabIndex={0}
                onClick={() => onLightboxOpen(item.idx)}
                onKeyDown={handleKeyActivate(() => onLightboxOpen(item.idx))}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-colorize
                />
              </div>
            </ImageReveal>
          ))}
        </div>
      </div>

      {/* Frame 5: FULL-BLEED PARALLAX HERO — Sintra Well */}
      <div className="relative w-screen -mx-[calc((100vw-100%)/2)] h-[60vh] md:h-[100vh] overflow-hidden">
        <ParallaxImage speed={0.2} className="h-full">
          <div className="relative w-full h-full" data-colorize>
            <Image
              src="/images/hero/DSC08845.JPG"
              alt="Sintra Initiation Well spiraling staircase with golden light"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </ParallaxImage>
      </div>

      {/* Frame 6: CLOSING SINGLE — Centered portrait */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-center w-full">
        <ImageReveal direction="up" triggerStart="top 100%">
          <div
            className="relative aspect-[2/3] w-[280px] md:w-[360px] bg-surface cursor-pointer group overflow-hidden"
            data-cursor="view"
            role="button"
            tabIndex={0}
            onClick={() => onLightboxOpen(18)}
            onKeyDown={handleKeyActivate(() => onLightboxOpen(18))}
          >
            <Image
              src={selectPhotography[18].src}
              alt={selectPhotography[18].alt}
              fill
              sizes="360px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              data-colorize
            />
          </div>
        </ImageReveal>
      </div>

      </div>{/* end frames wrapper */}

      {/* CTA */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 pb-16 text-center">
        <MagneticButton as="a" href="/work" className="inline-flex items-center gap-2 px-10 py-4 border border-gold/30 text-gold text-sm uppercase tracking-[0.15em] hover:bg-gold hover:text-background hover:border-gold transition-all duration-300 font-[family-name:var(--font-mono)]">
          See All Photography
          <ArrowRight size={14} />
        </MagneticButton>
      </div>
    </section>
  );
}
