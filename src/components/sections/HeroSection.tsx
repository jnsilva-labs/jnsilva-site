'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ErrorBoundary from '@/components/ErrorBoundary';
import { onMontageComplete } from '@/utils/montage';

const HeroParticles3D = dynamic(() => import('@/components/HeroParticles3D'), { ssr: false });

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
      gsap.set('.hero-photo', { opacity: 0, scale: 1.06 });
    } else {
      gsap.set('.hero-photo', { opacity: 0.3, scale: 1 });
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

        // Phase 0: Photograph breathes in slowly beneath everything
        tl.to('.hero-photo', {
          opacity: 0.3, scale: 1, duration: 2.6, ease: 'power2.out',
        }, 0);

        // Phase 1: Soft glow emerges from black
        tl.to('.hero-name', {
          opacity: 1, duration: 0.6, ease: 'power2.out',
        }, 0.2);

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

    // Play once the montage completes — fires immediately if it already has,
    // which covers returning visitors whose Preloader mounts (and signals)
    // before this listener would otherwise attach.
    let played = false;
    const unsubscribe = onMontageComplete(() => {
      if (played) return;
      played = true;
      playReveal();
    });

    // Reduced motion: play immediately (montage is skipped)
    if (prefersReduced && !played) {
      played = true;
      playReveal();
    }

    return unsubscribe;
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
      className="relative z-10 h-[80vh] md:h-screen flex flex-col items-center justify-center bg-background"
    >
      {/* Signature photograph — luminous field behind the wordmark.
          Starts invisible; the reveal timeline fades it to ~0.3. */}
      <div className="hero-photo absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/images/hero/greecebw-04771.JPG"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Vignette keeps edges black and the wordmark legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.75) 62%, #0A0A0A 100%)',
          }}
        />
      </div>

      {/* Atmospheric particles */}
      <ErrorBoundary>
        <HeroParticles3D />
      </ErrorBoundary>

      <div className="relative z-10 text-center">
        {/* Name — Blur to Focus cinematic reveal */}
        <h1
          className="hero-name font-[family-name:var(--font-display)] text-[clamp(3rem,10vw,14rem)] text-foreground font-light tracking-wide leading-none select-none"
        >
          JN SILVA
        </h1>

        {/* Gold accent line — expands from center */}
        <div className="hero-line h-[2px] w-32 sm:w-48 mx-auto mt-4 bg-gold-accent origin-center shadow-[0_0_20px_rgba(200,192,180,0.3)]" />

        {/* Subtitle — word-by-word fade in */}
        <p className="mt-6 text-gold text-xs sm:text-sm uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
          {'Artist. Photographer. Creative Director. Alchemist.'.split(' ').map((word, i) => (
            <span key={i} className="hero-subtitle-word inline-block mr-[0.6em]">
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 flex flex-col items-center gap-2">
        <span className="text-foreground/20 text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-gold/40 animate-[gentleBounce_2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
