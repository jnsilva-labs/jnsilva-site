'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useScrollColorize } from '@/hooks/useScrollColorize';
import ParallaxImage from '@/components/ui/ParallaxImage';
import TextReveal from '@/components/ui/TextReveal';
import ImageReveal from '@/components/ui/ImageReveal';
import type { SubstackPost } from '@/lib/substack';

const skills = [
  { category: 'Photography', items: ['Street & Documentary', 'Portrait & Editorial', 'Live Music & Events', 'Aerial & Drone', 'Fine Art'] },
  { category: 'Film & Motion', items: ['Short-Form Direction', 'Documentary', 'Music Videos', 'Brand Content', 'Post-Production'] },
  { category: 'Digital Art', items: ['NFT Creation', 'Sacred Geometry', 'Fractal Art', 'Projection Mapping', 'Generative Art'] },
  { category: 'Creative Direction', items: ['Brand Strategy', 'Campaign Concepts', 'Art Direction', 'Visual Identity', 'Experiential Design'] },
];

// Curated Instagram posts — update images in /public/images/instagram/ and URLs here
const instagramPosts = [
  { image: '/images/instagram/ig-1.jpg', url: 'https://instagram.com/jnsilva', alt: 'J.N. Silva on Instagram' },
  { image: '/images/instagram/ig-2.jpg', url: 'https://instagram.com/jnsilva', alt: 'J.N. Silva on Instagram' },
  { image: '/images/instagram/ig-3.jpg', url: 'https://instagram.com/jnsilva', alt: 'J.N. Silva on Instagram' },
  { image: '/images/instagram/ig-4.jpg', url: 'https://instagram.com/jnsilva', alt: 'J.N. Silva on Instagram' },
  { image: '/images/instagram/ig-5.jpg', url: 'https://instagram.com/jnsilva', alt: 'J.N. Silva on Instagram' },
  { image: '/images/instagram/ig-6.jpg', url: 'https://instagram.com/jnsilva', alt: 'J.N. Silva on Instagram' },
];

interface Props {
  substackPosts: SubstackPost[];
}

export default function AboutPage({ substackPosts }: Props) {
  const colorizeRef = useScrollColorize<HTMLDivElement>();
  const bioRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });
  const disciplinesRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });
  const quoteRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 });
  const ctaRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });
  const igRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });
  const substackRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <div className="relative z-10 bg-[#0A0A0A] pt-32 pb-24">
      {/* Hero section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — portrait */}
          <div ref={colorizeRef} className="relative">
            <ImageReveal direction="left">
              <ParallaxImage speed={0.15}>
                <div className="aspect-[3/4] bg-[#141414] border border-[#C8C0B4]/10 relative overflow-hidden">
                  <Image
                    src="/images/portrait/jnsilva-portrait.png"
                    alt="J.N. Silva"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    data-colorize
                    priority
                  />
                </div>
              </ParallaxImage>
            </ImageReveal>
          </div>

          {/* Right — bio */}
          <div>
            <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
              About
            </p>
            <TextReveal as="h1" mode="words" className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-8">
              J.N. Silva
            </TextReveal>

            <div ref={bioRef} className="space-y-6 text-[#F5F0E8]/50 text-base leading-relaxed">
              <p data-reveal>
                I&apos;m J.N. Silva — a Venezuelan-born artist and creative technologist
                working across photography, film, and creative direction. I studied
                Philosophy and English at Rutgers University
                with a focus on personal identity, free will, and world religions —
                questions that continue to shape everything I create.
              </p>
              <p data-reveal>
                Over the last decade, I&apos;ve built a career capturing human truth through
                street, portrait, live music, and aerial photography, while directing
                cinematic short-form and documentary-style projects for brands and artists.
                My commercial work includes campaigns for Nike, Sony, Spotify, Samsung,
                American Express, MTV, Lululemon, and Ducati, with editorial features in
                TIME, The New York Times, Vogue, and Entrepreneur.
              </p>
              <p data-reveal>
                In 2020, I became one of the earliest photographers to embrace blockchain
                technology and NFTs, founding Animus Collective — a global artist community
                that has onboarded thousands into the Web3 ecosystem. I was the first
                photographer to release a solo drop on Nifty Gateway, and the first
                Venezuelan NFT artist to exhibit at Sotheby&apos;s, where my piece
                &ldquo;Kinesthesia&rdquo; sold for &pound;90,000.
              </p>
              <p data-reveal>
                After my mother passed away, I stepped into a more reflective chapter. The
                grief cracked something open — and what came through was the Awareness
                Paradox: a living body of work weaving together Hermetic philosophy, sacred
                geometry, archetypes, and contemplative traditions. It&apos;s not a brand.
                It&apos;s a practice — one that lives in short-form content, digital art,
                and immersive experiences designed to turn esoteric wisdom into grounded
                tools for self-mastery.
              </p>
              <p data-reveal>
                Today, I create across three lanes: cinematic storytelling for brands and
                artists, visual worlds blending sacred symbolism with modern aesthetics,
                and educational content through the Awareness Paradox. Everything I make
                is rooted in the same impulse — to reveal the unseen, to honor what&apos;s
                sacred in the ordinary, and to build bridges between ancient wisdom and
                the modern creative experience.
              </p>
              <p data-reveal className="text-[#C8C0B4]/70 italic font-[family-name:var(--font-display)] text-lg">
                If that resonates, let&apos;s work together.
              </p>
            </div>

            <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                data-reveal
                className="group flex items-center gap-2 px-8 py-3 border border-[#C8C0B4]/40 text-[#C8C0B4] text-sm uppercase tracking-[0.15em] hover:bg-[#C8C0B4]/10 hover:border-[#C8C0B4] transition-all duration-300"
              >
                Get in Touch
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://instagram.com/jnsilva"
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="flex items-center gap-2 px-8 py-3 text-[#F5F0E8]/40 text-sm uppercase tracking-[0.15em] hover:text-[#F5F0E8] transition-colors duration-300"
              >
                Instagram
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Skills / Disciplines */}
      <div ref={disciplinesRef} className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p data-reveal className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-12 font-[family-name:var(--font-mono)]">
          Disciplines
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <div key={skill.category} data-reveal className="p-8 bg-[#141414] border border-[#C8C0B4]/5">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#F5F0E8] mb-6">
                {skill.category}
              </h3>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="text-[#F5F0E8]/40 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#C8C0B4]/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy quote */}
      <div ref={quoteRef} className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div data-reveal className="p-12 md:p-20 bg-[#141414] border border-[#C8C0B4]/10 text-center">
          <blockquote className="font-[family-name:var(--font-display)] text-2xl md:text-4xl text-[#F5F0E8]/80 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            &ldquo;Every photograph is a prayer. Every frame is a conversation
            between what is seen and what is felt.&rdquo;
          </blockquote>
          <p className="text-[#C8C0B4]/60 text-sm uppercase tracking-[0.2em] font-[family-name:var(--font-mono)]">
            J.N. Silva
          </p>
        </div>
      </div>

      {/* Instagram — Curated Grid */}
      <div ref={igRef} className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p data-reveal className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
              Follow the Work
            </p>
            <h2 data-reveal className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#F5F0E8] font-light">
              Instagram
            </h2>
          </div>
          <a
            href="https://instagram.com/jnsilva"
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="flex items-center gap-2 text-[#C8C0B4]/40 hover:text-[#C8C0B4] text-xs uppercase tracking-wider transition-colors pb-1"
          >
            @jnsilva
            <ExternalLink size={10} />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {instagramPosts.map((post, i) => (
            <a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              className="relative aspect-square bg-[#141414] border border-[#C8C0B4]/5 overflow-hidden group"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Substack — Latest Writing */}
      {substackPosts.length > 0 && (
        <div ref={substackRef} className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p data-reveal className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
                Latest Writing
              </p>
              <h2 data-reveal className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#F5F0E8] font-light">
                Substack
              </h2>
            </div>
            <a
              href="https://substack.com/@josensilva"
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              className="flex items-center gap-2 text-[#C8C0B4]/40 hover:text-[#C8C0B4] text-xs uppercase tracking-wider transition-colors pb-1"
            >
              Subscribe
              <ExternalLink size={10} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {substackPosts.map((post) => (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="group p-8 bg-[#141414] border border-[#C8C0B4]/5 hover:border-[#C8C0B4]/20 transition-all duration-300"
              >
                <p className="text-[#C8C0B4]/40 text-xs uppercase tracking-wider font-[family-name:var(--font-mono)] mb-4">
                  {post.date}
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-xl text-[#F5F0E8] mb-4 group-hover:text-[#C8C0B4] transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>
                <p className="text-[#F5F0E8]/40 text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <span className="flex items-center gap-2 text-[#C8C0B4]/40 group-hover:text-[#C8C0B4] text-xs uppercase tracking-wider transition-colors">
                  Read on Substack
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
