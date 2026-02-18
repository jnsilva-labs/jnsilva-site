'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ChevronDown, ArrowRight, ExternalLink, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useScrollColorize } from '@/hooks/useScrollColorize';
import Lightbox from '@/components/Lightbox';
import ImageReveal from '@/components/ui/ImageReveal';
import ParallaxImage from '@/components/ui/ParallaxImage';
import MagneticButton from '@/components/ui/MagneticButton';
import { getFeaturedClients } from '@/data/clients';

const SacredGeometry = dynamic(() => import('@/components/SacredGeometry'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */

const selectPhotography = [
  // Frame 1: BENTO MOSAIC — 8 images, all categories
  { src: '/images/hero/DSC05043.JPG', aspect: 'wide' as const },            // A: laser show
  { src: '/images/hero/jnsilva_day1_DSC06940.JPG', aspect: 'tall' as const }, // B: Gesaffelstein
  { src: '/images/nyc/Steam_and_Light.jpg', aspect: 'wide' as const },       // C: NYC steam
  { src: '/images/places/Grand_Prismatic.jpg', aspect: 'tall' as const },    // D: Yellowstone
  { src: '/images/people/Fashion_Week.jpg', aspect: 'tall' as const },       // E: fashion
  { src: '/images/music/Coachella_4_2018_.jpg', aspect: 'wide' as const },   // F: Coachella
  { src: '/images/nyc/Brooklyn_Bridge_Fog.jpg', aspect: 'tall' as const },   // G: Brooklyn fog
  { src: '/images/places/Guatemala_Rays.jpg', aspect: 'wide' as const },     // H: god rays
  // Frame 2: Cinematic letterbox divider (B&W)
  { src: '/images/hero/blackandwhitehero1.jpg', aspect: 'wide' as const },   // B&W concert — disco ball
  // Frame 3: Offset asymmetric
  { src: '/images/people/Film_Noir_2.jpg', aspect: 'tall' as const },        // Film Noir
  { src: '/images/hero/Qatar2025_147.JPG', aspect: 'wide' as const },        // Qatar
  // Frame 4: Staggered triptych
  { src: '/images/music/Kendrick_3.jpg', aspect: 'tall' as const },          // Kendrick
  { src: '/images/places/Solar_Eclipse.jpg', aspect: 'tall' as const },      // Solar Eclipse
  { src: '/images/hero/DSC09866.JPG', aspect: 'tall' as const },             // underwater
  // Frame 5: Cinematic letterbox divider (B&W)
  { src: '/images/hero/blackandwhitehero2.jpg', aspect: 'wide' as const },   // B&W Greek busts
  // Frame 6: Closing single
  { src: '/images/hero/DSC00056.JPG', aspect: 'tall' as const },             // closing portrait
];

const clientNames = [
  'Nike', 'Sony', 'Spotify', 'Samsung', 'American Express',
  'MTV', 'Lululemon', 'Ducati', 'Hypebeast', 'Don Julio',
  'Vans', 'Converse', 'Honda', 'Sephora', 'Interscope',
  'Baileys', 'Grey Goose', 'Johnnie Walker', 'Facebook', 'AT&T',
];

const featuredClientNames = ['Nike', 'Sony', 'Spotify', 'Samsung', 'Sephora', 'American Express'];

const nftCollections = [
  {
    title: 'Kinesthesia',
    platform: "Sotheby's",
    date: 'March 2022',
    description: 'Fractal study projected onto dancers, inspired by Latin American kinetic artists. First Venezuelan NFT artist to exhibit and sell at Sotheby\'s.',
    price: '£90,000',
    link: 'https://www.sothebys.com/en/buy/auction/2022/modern-contemporary-art-day-auction/kinesthesia',
    highlight: true,
  },
  {
    title: 'Thank You New York',
    platform: 'Nifty Gateway',
    date: 'December 2020',
    description: 'Collaboration with ThankYouX. The first drop on Nifty Gateway to include photography.',
    link: 'https://opensea.io/item/ethereum/0xf2129ea3cf8f356da9dbaa276773fbf8259d6690/3800010192',
    video: 'https://media.niftygateway.com/video/upload/v1609275397/ThankYouX/AvenueoftheStars_l2pbjb.mp4',
  },
  {
    title: 'Thank You Miami',
    platform: 'Nifty Gateway',
    date: 'March 2021',
    description: 'Second collaboration with ThankYouX, celebrating all things Miami.',
    link: 'https://opensea.io/item/ethereum/0xea70a9e62057dd7629e7c9ca7500290544d13e56/14200020029',
    video: 'https://media.niftygateway.com/video/upload/v1614875643/Ashley/ThankYouxSilva2/Suspension_of_Disbelief_-_ThankYouX_nq75my.mp4',
  },
  {
    title: 'Infinitum',
    platform: 'Nifty Gateway',
    date: 'May 2022',
    description: 'Solo collection exploring infinite recursion, sacred patterns, and fractal imagery.',
    link: 'https://opensea.io/jnsilva',
    image: '/images/fractals/infinitum/infinitumhero.JPG',
  },
  {
    title: 'Visión y Razón',
    platform: 'Artifex',
    date: 'October 2021',
    description: 'A 1/1 video NFT — 47 photographs set to an original audio track. Part of the Artifex Digital Icons collection celebrating early NFT movement pioneers.',
    link: 'https://artifex.art/waves/digital-icons/vision-y-razon/vision-y-razon',
    video: 'https://artifex-project.storage.googleapis.com/2021/06/22132652/Wave-2-J.N.-Silva-%40jnsilva_.mp4',
  },
];

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/jnsilva', handle: '@jnsilva' },
  { name: 'TikTok', url: 'https://tiktok.com/@jnsilva', handle: '@jnsilva' },
  { name: 'X (Twitter)', url: 'https://x.com/JNSilva_', handle: '@JNSilva_' },
  { name: 'Substack', url: 'https://jnsilva.substack.com', handle: 'jnsilva' },
];

/* ─── Featured NFT (rotates on each visit) ─── */

function FeaturedNFT({ collections }: { collections: typeof nftCollections }) {
  const [featured, setFeatured] = useState<(typeof nftCollections)[number] | null>(null);
  const [orientation, setOrientation] = useState<'landscape' | 'portrait' | 'square'>('landscape');

  useEffect(() => {
    const withVideo = collections.filter((c) => c.video);
    if (withVideo.length === 0) return;
    const pick = withVideo[Math.floor(Math.random() * withVideo.length)];
    setFeatured(pick);
  }, [collections]);

  if (!featured || !featured.video) return null;

  const isPortrait = orientation === 'portrait';

  return (
    <div data-reveal className="mb-12">
      <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
        Featured Project
      </p>
      <a
        href={featured.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block relative overflow-hidden border border-[#F5F0E8]/[0.04] hover:border-[#C8C0B4]/20 transition-all duration-300 ${isPortrait ? 'max-w-xs mx-auto' : ''}`}
      >
        <div className={`relative bg-[#0D0D0D] ${isPortrait ? 'aspect-[3/4]' : orientation === 'square' ? 'aspect-square' : 'aspect-video'}`}>
          <video
            src={featured.video}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full ${isPortrait ? 'object-contain' : 'object-cover'}`}
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              if (v.videoWidth && v.videoHeight) {
                const ratio = v.videoWidth / v.videoHeight;
                if (ratio < 0.9) setOrientation('portrait');
                else if (ratio > 1.1) setOrientation('landscape');
                else setOrientation('square');
              }
            }}
          />
        </div>
        <div className="flex items-center justify-between p-5 bg-[#141414]">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[#C8C0B4]/60 text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
                {featured.platform}
              </span>
              <span className="text-[#F5F0E8]/10">&middot;</span>
              <span className="text-[#F5F0E8]/20 text-[10px] font-[family-name:var(--font-mono)]">
                {featured.date}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-[#F5F0E8] font-light group-hover:text-[#C8C0B4] transition-colors duration-300">
              {featured.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-[#C8C0B4]/30 group-hover:text-[#C8C0B4]/60 transition-colors duration-300">
            <span className="text-[10px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hidden sm:inline">View</span>
            <ExternalLink size={12} />
          </div>
        </div>
      </a>
    </div>
  );
}

/* ─── Component ─── */

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const colorizeRef = useScrollColorize<HTMLDivElement>();

  // Scroll reveal refs
  const aboutRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 });
  const clientsRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });
  const filmRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 });
  const fractalsRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 });
  const digitalArtRef = useScrollReveal<HTMLDivElement>({ stagger: 0.15 });
  const paradoxRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });
  const contactRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

  // Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const handleNavigate = useCallback((index: number) => setLightboxIndex(index), []);

  // Featured clients for horizontal scroll
  const featuredClients = getFeaturedClients();

  // Portrait fallback
  const [portraitError, setPortraitError] = useState(false);

  // Hero GSAP timeline — per-character reveal (waits for montage to complete)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set initial hidden state (montage covers the hero, so chars start invisible)
    if (!prefersReduced) {
      gsap.set('.hero-char', { y: 60, opacity: 0, rotateX: -90 });
      gsap.set('.hero-line', { clipPath: 'inset(0 100% 0 0)' });
      gsap.set('.hero-subtitle-word', { y: 15, opacity: 0 });
      gsap.set('.hero-scroll', { opacity: 0 });
    }

    function playReveal() {
      const ctx = gsap.context(() => {
        if (prefersReduced) {
          gsap.set('.hero-char', { y: 0, opacity: 1, rotateX: 0 });
          gsap.set('.hero-line', { clipPath: 'inset(0 0% 0 0)' });
          gsap.set('.hero-subtitle-word', { y: 0, opacity: 1 });
          gsap.set('.hero-scroll', { opacity: 1 });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

        tl.fromTo(
          '.hero-char',
          { y: 60, opacity: 0, rotateX: -90 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.0, stagger: 0.04 }
        );

        tl.fromTo(
          '.hero-line',
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.8 },
          '-=0.3'
        );

        tl.fromTo(
          '.hero-subtitle-word',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
          '-=0.4'
        );

        tl.fromTo(
          '.hero-scroll',
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.2'
        );
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

  // Hero pin — next section scrolls over it
  useEffect(() => {
    // Skip pin for reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: '+=50%',
      pin: true,
      pinSpacing: false,
    });

    return () => trigger.kill();
  }, []);

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
      {/* ═══════════════════════════════════════════════════════
          1. HERO — Name Reveal (pinned)
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative z-10 h-screen flex flex-col items-center justify-center bg-[#0A0A0A]"
      >
        {/* Atmospheric particles */}
        <div className="hero-particles" />

        <div className="relative z-10 text-center">
          {/* Name — per-character animation */}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,10vw,10rem)] text-[#F5F0E8] font-light tracking-wide leading-none"
            style={{ perspective: '600px' }}
          >
            {'JN SILVA'.split('').map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block"
                style={{
                  transformOrigin: 'bottom center',
                  ...(char === ' ' ? { width: '0.3em' } : {}),
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Gold accent line */}
          <div className="hero-line h-[1px] w-32 sm:w-48 mx-auto mt-4 bg-[#C9A84C]" />

          {/* Subtitle — word-by-word stagger */}
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
          <span className="text-[#F5F0E8]/20 text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5 text-[#C8C0B4]/40 animate-[gentleBounce_2s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. ABOUT — Portrait + Mission
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-20 bg-[#0A0A0A] py-32 lg:py-40">
        <div ref={aboutRef} className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Portrait */}
            <ImageReveal direction="left" className="relative aspect-[3/4] bg-[#141414]">
              {!portraitError ? (
                <Image
                  src="/images/portrait/JNSilvaProfile.jpg"
                  alt="J.N. Silva"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  data-colorize
                  priority
                  onError={() => setPortraitError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[#C8C0B4]/20 text-xs uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
                    Portrait
                  </p>
                </div>
              )}
            </ImageReveal>

            {/* Bio — tightened declaration */}
            <div>
              <p data-reveal className="text-[#C8C0B4] text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)] text-hover-expand">
                <span className="opacity-30 mr-3">01</span>About
              </p>
              <h2 data-reveal="split" className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[#F5F0E8] font-light mb-8 leading-tight tracking-tight">
                At the intersection of storytelling, technology, and modern mysticism.
              </h2>
              <div className="space-y-5 text-[#F5F0E8]/50 text-base leading-relaxed max-w-lg">
                <p data-reveal>
                  Venezuelan-born photographer, filmmaker, and creative director working
                  at the intersection of storytelling, technology, and modern mysticism.
                  Studied Philosophy and English at Rutgers University with a focus on
                  personal identity, free will, and world religions.
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
                  <span key={badge} className="text-[#F5F0E8]/20 text-[11px] uppercase tracking-[0.2em] font-[family-name:var(--font-mono)]">
                    {badge}
                  </span>
                ))}
              </div>

              <div data-reveal className="mt-10">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[#C8C0B4] text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-[#F5F0E8] transition-colors duration-300"
                >
                  Full Bio
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. PHOTOGRAPHY — Cinematic Scrollytelling
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-20 bg-[#0A0A0A] section-fade">
        {/* Section header — tight */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-4 pb-2">
          <p className="text-[#C8C0B4] text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)] text-hover-expand">
            <span className="opacity-30 mr-3">02</span>Select Photography
          </p>
        </div>

        {/* All frames — tight consistent spacing */}
        <div className="flex flex-col gap-4">

        {/* Frame 1: BENTO MOSAIC — "The Wall" — 8 images, all categories */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[240px] md:auto-rows-[220px] lg:auto-rows-[280px] gap-2 grid-flow-dense">
            {/* A: Laser show — wide, spans 2 cols */}
            <ImageReveal direction="left" delay={0} triggerStart="top 98%" className="col-span-2 row-span-1">
              <div
                className="relative h-full bg-[#141414] cursor-pointer group overflow-hidden"
                data-cursor="view"
                onClick={() => setLightboxIndex(0)}
              >
                <Image
                  src={selectPhotography[0].src}
                  alt=""
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
                className="relative h-full bg-[#141414] cursor-pointer group overflow-hidden"
                data-cursor="view"
                onClick={() => setLightboxIndex(1)}
              >
                <Image
                  src={selectPhotography[1].src}
                  alt=""
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
                className="relative h-full bg-[#141414] cursor-pointer group overflow-hidden"
                data-cursor="view"
                onClick={() => setLightboxIndex(3)}
              >
                <Image
                  src={selectPhotography[3].src}
                  alt=""
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
                className="relative h-full bg-[#141414] cursor-pointer group overflow-hidden"
                data-cursor="view"
                onClick={() => setLightboxIndex(2)}
              >
                <Image
                  src={selectPhotography[2].src}
                  alt=""
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
                className="relative h-full bg-[#141414] cursor-pointer group overflow-hidden"
                data-cursor="view"
                onClick={() => setLightboxIndex(4)}
              >
                <Image
                  src={selectPhotography[4].src}
                  alt=""
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
                className="relative h-full bg-[#141414] cursor-pointer group overflow-hidden"
                data-cursor="view"
                onClick={() => setLightboxIndex(5)}
              >
                <Image
                  src={selectPhotography[5].src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                  data-colorize
                />
              </div>
            </ImageReveal>
            {/* G: Brooklyn Bridge Fog — hidden on mobile, tall on desktop */}
            <ImageReveal direction="up" delay={0.16} triggerStart="top 98%" className="hidden md:block row-span-2">
              <div
                className="relative h-full bg-[#141414] cursor-pointer group overflow-hidden"
                data-cursor="view"
                onClick={() => setLightboxIndex(6)}
              >
                <Image
                  src={selectPhotography[6].src}
                  alt=""
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
                className="relative h-full bg-[#141414] cursor-pointer group overflow-hidden"
                data-cursor="view"
                onClick={() => setLightboxIndex(7)}
              >
                <Image
                  src={selectPhotography[7].src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                  data-colorize
                />
              </div>
            </ImageReveal>
          </div>
        </div>

        {/* Frame 2: CINEMATIC LETTERBOX — B&W Concert */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <ImageReveal direction="up" triggerStart="top 100%">
            <div
              className="relative aspect-[21/9] bg-[#141414] cursor-pointer group overflow-hidden"
              data-cursor="view"
              onClick={() => setLightboxIndex(8)}
            >
              <Image
                src={selectPhotography[8].src}
                alt=""
                fill
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </ImageReveal>
        </div>

        {/* Frame 3: OFFSET ASYMMETRIC — Film Noir + Qatar */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 items-end">
            <ImageReveal direction="left" delay={0} triggerStart="top 100%">
              <div
                className="relative aspect-[2/3] bg-[#141414] cursor-pointer group overflow-hidden"
                data-cursor="view"
                onClick={() => setLightboxIndex(9)}
              >
                <Image
                  src={selectPhotography[9].src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-colorize
                />
              </div>
            </ImageReveal>
            <ImageReveal direction="right" delay={0.15} triggerStart="top 100%">
              <div
                className="relative aspect-[3/2] bg-[#141414] cursor-pointer group overflow-hidden"
                data-cursor="view"
                onClick={() => setLightboxIndex(10)}
              >
                <Image
                  src={selectPhotography[10].src}
                  alt=""
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
              { src: selectPhotography[11].src, idx: 11 },
              { src: selectPhotography[12].src, idx: 12 },
              { src: selectPhotography[13].src, idx: 13 },
            ].map((item, i) => (
              <ImageReveal key={item.src} direction="up" delay={i * 0.12} triggerStart="top 100%">
                <div
                  className="relative aspect-[2/3] bg-[#141414] cursor-pointer group overflow-hidden"
                  data-cursor="view"
                  onClick={() => setLightboxIndex(item.idx)}
                >
                  <Image
                    src={item.src}
                    alt=""
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

        {/* Frame 5: CINEMATIC LETTERBOX — B&W Greek Busts */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <ImageReveal direction="up" triggerStart="top 100%">
            <div
              className="relative aspect-[21/9] bg-[#141414] cursor-pointer group overflow-hidden"
              data-cursor="view"
              onClick={() => setLightboxIndex(14)}
            >
              <Image
                src={selectPhotography[14].src}
                alt=""
                fill
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </ImageReveal>
        </div>

        {/* Frame 6: CLOSING SINGLE — Centered portrait */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-center w-full">
          <ImageReveal direction="up" triggerStart="top 100%">
            <div
              className="relative aspect-[2/3] w-[280px] md:w-[360px] bg-[#141414] cursor-pointer group overflow-hidden"
              data-cursor="view"
              onClick={() => setLightboxIndex(15)}
            >
              <Image
                src={selectPhotography[15].src}
                alt=""
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
          <MagneticButton as="a" href="/work" className="inline-flex items-center gap-2 px-10 py-4 border border-[#C8C0B4]/30 text-[#C8C0B4] text-sm uppercase tracking-[0.15em] hover:bg-[#C8C0B4] hover:text-[#0A0A0A] hover:border-[#C8C0B4] transition-all duration-300 font-[family-name:var(--font-mono)]">
            See All Photography
            <ArrowRight size={14} />
          </MagneticButton>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. CLIENTS — Horizontal Scroll Gallery
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-20 bg-[#0A0A0A] py-20 lg:py-24 section-fade">
        <div ref={clientsRef}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8">
            <p data-reveal className="text-[#C8C0B4] text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)]">
              <span className="opacity-30 mr-3">03</span>Select Clients
            </p>
          </div>

          {/* Horizontal scroll strip */}
          <div data-reveal className="overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            <div className="flex gap-3 px-6 md:px-12" style={{ width: 'max-content' }}>
              {featuredClients.map((client) => (
                <Link
                  key={client.slug}
                  href={`/clients/${client.slug}`}
                  className="group relative flex-shrink-0 w-[260px] md:w-[320px] lg:w-[350px] overflow-hidden"
                  data-cursor="view"
                >
                  <div className="relative aspect-[3/4] bg-[#141414] overflow-hidden">
                    <Image
                      src={client.coverImage}
                      alt={client.name}
                      fill
                      sizes="(max-width: 768px) 260px, 350px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      data-colorize
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                    {/* Client name */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-[#C8C0B4]/50 text-[9px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)] mb-2">
                        {client.category}
                      </p>
                      <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#F5F0E8] font-light leading-tight tracking-wide">
                        {client.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Subtle marquee + CTA */}
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-8">
            <div data-reveal className="overflow-hidden py-4 border-t border-b border-[#F5F0E8]/[0.03] mb-8">
              <div className="flex animate-[scroll_40s_linear_infinite] whitespace-nowrap">
                {[...clientNames, ...clientNames].map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="mx-8 font-[family-name:var(--font-display)] text-2xl text-[#F5F0E8]/[0.12] whitespace-nowrap"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div data-reveal className="text-center">
              <Link
                href="/clients"
                className="inline-flex items-center gap-2 text-[#C8C0B4]/60 text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-[#C8C0B4] transition-colors duration-300"
              >
                View All Client Work
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. NEA / BUSCANDO AMERICA — Film Teaser
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-20 bg-[#0A0A0A] py-32 lg:py-40 section-fade">
        <div ref={filmRef} className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p data-reveal className="text-[#C8C0B4] text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)] text-hover-expand">
            <span className="opacity-30 mr-3">04</span>Buscando America
          </p>

          {/* Buscando America — title + IDIOSINCRASIA documentary */}
          <div data-reveal className="mb-6">
            <p className="text-[#C8C0B4]/40 text-[10px] uppercase tracking-[0.4em] font-[family-name:var(--font-mono)] mb-4">
              Looking for America
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,6rem)] text-[#F5F0E8] font-light tracking-wide leading-none mb-2">
              Buscando America
            </h3>
            <p className="text-[#C8C0B4]/30 text-xs font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase">
              A fiction film under construction in Web3
            </p>
          </div>
          <div data-reveal className="relative overflow-hidden mb-16 border border-[#F5F0E8]/[0.04]">
            <div className="relative aspect-video bg-[#0D0D0D]">
              <iframe
                src="https://www.youtube.com/embed/VhJgK1K4fc4?start=34&rel=0&modestbranding=1&color=white"
                title="IDIOSINCRASIA — A Buscando America Documentary"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </div>

          {/* Info beneath */}
          <div data-reveal className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <p className="text-[#F5F0E8]/40 text-base leading-relaxed max-w-xl">
                A Web3 ecosystem built by Latino filmmakers. 2,500 NFT photographs documenting
                Medell&iacute;n&apos;s idiosyncrasy. Co-directed by Alex Ulises &amp; Nelson G. Navarrete.
                JN Silva as Web3 Executive Producer. Screened at NFT Now&apos;s The Gateway.
              </p>
            </div>
            <Link
              href="/buscando-america"
              className="inline-flex items-center gap-2 text-[#C8C0B4] text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-[#F5F0E8] transition-colors duration-300 whitespace-nowrap"
            >
              Explore the Universe
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. FRACTALS — Visual Showcase
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-20 bg-[#0A0A0A] py-32 lg:py-40 section-fade overflow-hidden">
        <div ref={fractalsRef} className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <p data-reveal className="text-[#C9A84C] text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)] text-hover-expand">
            <span className="opacity-30 mr-3">05</span>Fractal Art
          </p>
          <h2 data-reveal="split" className="font-[family-name:var(--font-display)] text-4xl md:text-6xl text-[#F5F0E8] font-light mb-8 tracking-tight leading-tight">
            Kinesthesia
          </h2>
          <p data-reveal className="text-gradient-gold-accent text-lg md:text-xl font-[family-name:var(--font-display)] italic mb-6">
            Sold at Sotheby&apos;s London for &pound;90,000
          </p>
          <p data-reveal className="text-[#F5F0E8]/40 text-base leading-relaxed max-w-xl mb-4">
            Fractal geometry projected onto dancers in motion — inspired by Venezuelan kinetic
            masters Carlos Cruz-Diez and Jes&uacute;s Rafael Soto. The first Venezuelan NFT artist
            to exhibit and sell at a major auction house.
          </p>
          <p data-reveal className="text-[#F5F0E8]/30 text-sm leading-relaxed max-w-xl mb-10">
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
                <div className="relative aspect-[21/9] bg-[#141414] overflow-hidden border border-[#C9A84C]/10 group-hover:border-[#C9A84C]/30 transition-colors duration-300">
                  <Image
                    src="/images/fractals/kinesthesia.jpg"
                    alt="Kinesthesia"
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
            {[
              { src: '/images/fractals/infinitum/jnsilva_infinitum_swingonthespiral.JPG', label: 'Infinitum' },
              { src: '/images/fractals/fractalportraits1.JPG', label: 'Fractal Portraits' },
              { src: '/images/fractals/NeonPinkSpirals.jpg', label: 'Abstract' },
            ].map((item, i) => (
              <ImageReveal key={item.src} direction="up" delay={i * 0.1}>
                <Link href="/fractals" className="relative aspect-square bg-[#141414] border border-[#C9A84C]/10 overflow-hidden block group cursor-pointer" data-cursor="view">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    data-colorize
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent">
                    <p className="text-[#C9A84C]/60 text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
                      {item.label}
                    </p>
                  </div>
                </Link>
              </ImageReveal>
            ))}
          </div>

          <div data-reveal>
            <Link
              href="/fractals"
              className="inline-flex items-center gap-2 px-10 py-4 border border-[#C9A84C]/30 text-[#C9A84C] text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:bg-[#C9A84C]/10 hover:border-[#C9A84C] transition-all duration-300"
            >
              Enter the Fractal World
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[#C9A84C]/[0.02] blur-[120px] pointer-events-none" />
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. DIGITAL / CRYPTO ART — Credibility
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-20 bg-[#0A0A0A] py-32 lg:py-40 section-fade">
        <div ref={digitalArtRef} className="max-w-[1400px] mx-auto px-6 md:px-12">
          <p data-reveal className="text-[#C8C0B4] text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)] text-hover-expand">
            <span className="opacity-30 mr-3">06</span>Digital Art
          </p>
          <h2 data-reveal="split" className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[#F5F0E8] font-light mb-12 tracking-tight">
            On the Blockchain
          </h2>

          {/* Stats bar — gold accent */}
          <div data-reveal className="flex flex-wrap gap-x-8 gap-y-3 mb-16 py-6 border-t border-b border-[#C9A84C]/10">
            {[
              "£90,000 Sotheby's",
              'TIME Genesis',
              '$1.6M+ Volume',
              '800+ Editions',
            ].map((stat) => (
              <span key={stat} className="text-[#C9A84C] text-sm font-[family-name:var(--font-mono)] tracking-wider">
                {stat}
              </span>
            ))}
          </div>

          {/* Featured Project — cycles randomly on each visit */}
          <FeaturedNFT collections={nftCollections.slice(1)} />

          {/* Collection cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
            {nftCollections.slice(1).map((collection) => (
              <a
                key={collection.title}
                href={collection.link}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="group bg-[#141414] border border-[#F5F0E8]/[0.04] hover:border-[#C8C0B4]/20 transition-all duration-300 overflow-hidden"
              >
                {collection.video ? (
                  <div className="relative aspect-square overflow-hidden bg-[#0D0D0D]">
                    <video
                      src={collection.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                ) : 'image' in collection && collection.image ? (
                  <div className="relative aspect-square overflow-hidden bg-[#0D0D0D]">
                    <Image
                      src={collection.image as string}
                      alt={collection.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#C8C0B4]/60 text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
                      {collection.platform}
                    </span>
                    <span className="text-[#F5F0E8]/10">&middot;</span>
                    <span className="text-[#F5F0E8]/20 text-[10px] font-[family-name:var(--font-mono)]">
                      {collection.date}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-[#F5F0E8] font-light mb-2 group-hover:text-[#C8C0B4] transition-colors duration-300">
                    {collection.title}
                  </h3>
                  <p className="text-[#F5F0E8]/40 text-xs leading-relaxed mb-3">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#C8C0B4]/30 group-hover:text-[#C8C0B4]/60 transition-colors duration-300">
                    <span className="text-[10px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)]">View</span>
                    <ExternalLink size={10} />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Platform links */}
          <div data-reveal className="flex flex-wrap items-center gap-6 mb-12">
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
                className="text-[#F5F0E8]/20 text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-mono)] hover:text-[#C8C0B4] transition-colors duration-300"
              >
                {platform.name} <ExternalLink size={10} className="inline ml-1 -mt-0.5" />
              </a>
            ))}
          </div>

          <div data-reveal className="text-center">
            <MagneticButton as="a" href="/digital-art" className="inline-flex items-center gap-2 px-10 py-4 border border-[#C8C0B4]/30 text-[#C8C0B4] text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:bg-[#C8C0B4] hover:text-[#0A0A0A] hover:border-[#C8C0B4] transition-all duration-300">
              Explore Digital Art
              <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. AWARENESS PARADOX — Philosophical Close
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-20 bg-[#0A0A0A] py-32 lg:py-40 section-fade min-h-[70vh] flex items-center overflow-hidden">
        <div ref={paradoxRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p data-reveal className="text-[#C9A84C] text-[10px] uppercase tracking-[0.4em] mb-6 font-[family-name:var(--font-mono)]">
            <span className="opacity-30 mr-3">07</span>New Project
          </p>
          <h2 data-reveal="split" className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-6 leading-tight tracking-tight">
            Awareness Paradox
          </h2>
          <p data-reveal className="text-[#F5F0E8]/40 text-lg mb-10 leading-relaxed font-[family-name:var(--font-display)] italic">
            Exploring the intersection of contemplative philosophy,
            perception, and the creative act. A new kind of practice.
          </p>
          <div data-reveal>
            <MagneticButton
              as="a"
              href="/awareness-paradox"
              className="inline-flex items-center gap-2 px-10 py-4 border border-[#C9A84C]/40 text-[#C9A84C] text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:bg-[#C9A84C]/10 hover:border-[#C9A84C] transition-all duration-300"
            >
              Enter the Codex
              <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </div>

        {/* Three.js Sacred Geometry — interactive background */}
        <SacredGeometry
          className="absolute inset-0 pointer-events-auto"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. CONTACT CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-20 bg-[#0A0A0A] py-32 lg:py-48 section-fade">
        <div ref={contactRef} className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 data-reveal="split" className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl text-[#F5F0E8] font-light mb-10 leading-tight tracking-tight">
            Let&apos;s Create Together
          </h2>

          <div data-reveal className="mb-12">
            <a
              href="mailto:studio@jnsilva.com"
              className="text-[#C8C0B4] text-lg md:text-xl font-[family-name:var(--font-mono)] hover:text-[#F5F0E8] transition-colors duration-300"
            >
              studio@jnsilva.com
            </a>
          </div>

          {/* Social links — inline */}
          <div data-reveal className="flex flex-wrap items-center justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F0E8]/30 text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-[#C8C0B4] transition-colors duration-300"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Lightbox ─── */}
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
