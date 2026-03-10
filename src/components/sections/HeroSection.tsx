'use client';

import { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Hero GSAP timeline — "Blur to Focus" cinematic rack focus (waits for montage to complete)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set initial hidden state (montage covers the hero, so elements start invisible)
    if (!prefersReduced) {
      gsap.set('.hero-name', { opacity: 0, scale: 1.03, filter: 'blur(18px) brightness(1.3)' });
      gsap.set('.hero-line', { scaleX: 0 });
      gsap.set('.hero-subtitle-word', { opacity: 0, y: 12 });
      gsap.set('.hero-scroll', { opacity: 0 });
    }

    function playReveal() {
      const ctx = gsap.context(() => {
        if (prefersReduced) {
          gsap.set('.hero-name', { opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' });
          gsap.set('.hero-line', { scaleX: 1 });
          gsap.set('.hero-subtitle-word', { opacity: 1, y: 0 });
          gsap.set('.hero-scroll', { opacity: 1 });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, delay: 0.3 });

        // Phase 1: Soft glow emerges from black
        tl.to('.hero-name', {
          opacity: 1, duration: 0.6, ease: 'power2.out',
        });

        // Phase 2: Rack focus — blur resolves, brightness normalizes, scale settles
        tl.to('.hero-name', {
          filter: 'blur(0px) brightness(1)',
          scale: 1,
          duration: 1.8,
          ease: 'power3.out',
        }, '-=0.3');

        // Phase 3: Gold line expands from center + subtitle stagger + scroll
        tl.to('.hero-line', {
          scaleX: 1, duration: 0.8, ease: 'power2.inOut',
        }, '-=0.3');
        tl.to('.hero-subtitle-word', {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        }, '-=0.4');
        tl.to('.hero-scroll', {
          opacity: 1, duration: 0.6,
        }, '-=0.2');
      }, heroRef);

      return ctx;
    }

    // Listen for montage completion
    const handler = () => {
      playReveal();
    };
    window.addEventListener('montageComplete', handler);

    // Reduced motion: play immediately (montage is skipped)
    if (prefersReduced) {
      playReveal();
    }

    return () => {
      window.removeEventListener('montageComplete', handler);
    };
  }, []);

  // Hero pin — next section scrolls over it (desktop only)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Only pin on desktop — wastes scroll distance on mobile
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) return;

    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: '+=50%',
      pin: true,
      pinSpacing: false,
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative z-10 h-screen flex flex-col items-center justify-center bg-[#0A0A0A]"
    >
      {/* Atmospheric particles */}
      <div className="hero-particles" />

      <div className="relative z-10 text-center">
        {/* Name — Blur to Focus cinematic reveal */}
        <h1
          className="hero-name font-[family-name:var(--font-display)] text-[clamp(3rem,10vw,10rem)] text-[#F5F0E8] font-light tracking-wide leading-none select-none"
        >
          JN SILVA
        </h1>

        {/* Gold accent line — expands from center */}
        <div className="hero-line h-[1px] w-32 sm:w-48 mx-auto mt-4 bg-[#C9A84C] origin-center" />

        {/* Subtitle — word-by-word fade in */}
        <p className="mt-6 text-[#C8C0B4] text-xs sm:text-sm uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
          {'Artist. Photographer. Creative Director. Alchemist.'.split(' ').map((word, i) => (
            <span key={i} className="hero-subtitle-word inline-block mr-[0.6em]">
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 flex flex-col items-center gap-2">
        <span className="text-[#F5F0E8]/20 text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-[#C8C0B4]/40 animate-[gentleBounce_2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
