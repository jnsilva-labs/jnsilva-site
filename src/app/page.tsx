'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollColorize } from '@/hooks/useScrollColorize';
import Lightbox from '@/components/Lightbox';
import { selectPhotography } from '@/data/photography';

// Static imports — above the fold (fast initial paint)
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PhotographySection from '@/components/sections/PhotographySection';
import ClientsSection from '@/components/sections/ClientsSection';
import FilmSection from '@/components/sections/FilmSection';

// Dynamic imports — below the fold (code-split)
const FractalsSection = dynamic(() => import('@/components/sections/FractalsSection'));
const DigitalArtSection = dynamic(() => import('@/components/sections/DigitalArtSection'));
const AwarenessParadoxSection = dynamic(() => import('@/components/sections/AwarenessParadoxSection'));
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'));

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const colorizeRef = useScrollColorize<HTMLDivElement>();

  // Lightbox state — managed here, PhotographySection calls onLightboxOpen
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const handleNavigate = useCallback((index: number) => setLightboxIndex(index), []);

  // Scroll progress bar — gold line at top of viewport
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!progressRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${self.progress})`;
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div ref={colorizeRef} className="relative">
      {/* Scroll progress bar */}
      <div ref={progressRef} className="scroll-progress w-full" style={{ transform: 'scaleX(0)' }} />

      {/* 1. HERO — Name Reveal (pinned) */}
      <HeroSection />

      {/* 2. ABOUT — Portrait + Mission */}
      <AboutSection />

      {/* 3. PHOTOGRAPHY — Cinematic Scrollytelling */}
      <PhotographySection onLightboxOpen={setLightboxIndex} />

      {/* 4. CLIENTS — Horizontal Scroll Gallery */}
      <ClientsSection />

      {/* 5. FILM — Buscando America + NEA */}
      <FilmSection />

      {/* 6. FRACTALS — Visual Showcase */}
      <FractalsSection />

      {/* 7. DIGITAL ART — On the Blockchain */}
      <DigitalArtSection />

      {/* 8. AWARENESS PARADOX — Philosophical Close */}
      <AwarenessParadoxSection />

      {/* 9. CONTACT CTA */}
      <ContactSection />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={selectPhotography.map((p) => p.src)}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
