'use client';

import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import ErrorBoundary from '@/components/ErrorBoundary';

const SacredGeometry = dynamic(() => import('@/components/SacredGeometry'), { ssr: false });

export default function AwarenessParadoxSection() {
  const paradoxRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <section className="relative z-20 bg-background py-32 lg:py-40 section-fade min-h-[70vh] flex items-center overflow-hidden">
      <div ref={paradoxRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p data-reveal className="text-gold-accent text-[11px] md:text-[10px] uppercase tracking-[0.4em] mb-6 font-[family-name:var(--font-mono)]">
          <span className="opacity-30 mr-3">07</span>New Project
        </p>
        <h2 data-reveal="split" className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-foreground font-light mb-6 leading-tight tracking-tight">
          Awareness Paradox
        </h2>
        <p data-reveal className="text-foreground/40 text-lg mb-10 leading-relaxed font-[family-name:var(--font-display)] italic">
          Exploring the intersection of contemplative philosophy,
          perception, and the creative act. A new kind of practice.
        </p>
        <div data-reveal>
          <MagneticButton
            as="a"
            href="/awareness-paradox"
            className="inline-flex items-center gap-2 px-10 py-4 border border-gold-accent/40 text-gold-accent text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:bg-gold-accent/10 hover:border-gold-accent transition-all duration-300"
          >
            Enter the Codex
            <ArrowRight size={14} />
          </MagneticButton>
        </div>
      </div>

      {/* Three.js Sacred Geometry — interactive background */}
      <div data-cursor="explore" className="absolute inset-0">
        <ErrorBoundary>
          <SacredGeometry
            className="absolute inset-0 pointer-events-auto"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        </ErrorBoundary>
      </div>
    </section>
  );
}
