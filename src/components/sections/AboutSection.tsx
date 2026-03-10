'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import ImageReveal from '@/components/ui/ImageReveal';

export default function AboutSection() {
  const aboutRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 });
  const [portraitError, setPortraitError] = useState(false);

  return (
    <section className="relative z-20 bg-background py-32 lg:py-40">
      <div ref={aboutRef} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Portrait */}
          <ImageReveal direction="left" className="relative aspect-[3/4] bg-surface">
            {!portraitError ? (
              <Image
                src="/images/portrait/jnsilva-portrait.png"
                alt="J.N. Silva portrait — photographer and creative director"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                data-colorize
                priority
                onError={() => setPortraitError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gold/20 text-xs uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
                  Portrait
                </p>
              </div>
            )}
          </ImageReveal>

          {/* Bio — tightened declaration */}
          <div>
            <p data-reveal className="text-gold text-[11px] md:text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)] text-hover-expand">
              <span className="opacity-30 mr-3">01</span>About
            </p>
            <h2 data-reveal="split" className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-foreground font-light mb-8 leading-tight tracking-tight">
              Devoted to the endless pursuit of wisdom, beauty, and truth.
            </h2>
            <div className="space-y-5 text-foreground/50 text-base leading-relaxed max-w-lg">
              <p data-reveal>
                Venezuelan-born photographer, filmmaker, and creative director on a
                relentless quest to master every medium that moves him. Studied Philosophy
                and English at Rutgers University — a foundation that turned a love of
                ancient wisdom, personal identity, and world religions into the lens
                through which all his work is made.
              </p>
              <p data-reveal>
                Over the last decade, capturing human truth through street, portrait,
                live music, and aerial photography, while directing cinematic projects
                for brands and artists. Kinesthesia was featured and sold at
                Sotheby&apos;s for &pound;90,000.
              </p>
              <p data-reveal>
                Today, creating across cinematic storytelling, visual worlds blending
                sacred symbolism with modern aesthetics, and educational content through
                the Awareness Paradox — turning esoteric wisdom into grounded tools for
                self-mastery.
              </p>
            </div>

            {/* Press badges */}
            <div data-reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              {['TIME', "Sotheby's", 'Vogue', 'NY Times', 'Entrepreneur'].map((badge) => (
                <span key={badge} className="text-foreground/20 text-[11px] uppercase tracking-[0.2em] font-[family-name:var(--font-mono)]">
                  {badge}
                </span>
              ))}
            </div>

            <div data-reveal className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-gold text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-foreground transition-colors duration-300"
              >
                Full Bio
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
