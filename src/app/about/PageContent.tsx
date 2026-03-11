'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useScrollColorize } from '@/hooks/useScrollColorize';
import ParallaxImage from '@/components/ui/ParallaxImage';
import TextReveal from '@/components/ui/TextReveal';
import ImageReveal from '@/components/ui/ImageReveal';

const skills = [
  { category: 'Photography', items: ['Street & Documentary', 'Portrait & Editorial', 'Live Music & Events', 'Aerial & Drone', 'Fine Art'] },
  { category: 'Film & Motion', items: ['Short-Form Direction', 'Documentary', 'Music Videos', 'Brand Content', 'Post-Production'] },
  { category: 'Digital Art', items: ['NFT Creation', 'Sacred Geometry', 'Fractal Art', 'Projection Mapping', 'Generative Art'] },
  { category: 'Creative Direction', items: ['Brand Strategy', 'Campaign Concepts', 'Art Direction', 'Visual Identity', 'Experiential Design'] },
];

export default function AboutPage() {
  const colorizeRef = useScrollColorize<HTMLDivElement>();
  const bioRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });
  const disciplinesRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });
  const quoteRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 });
  const ctaRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

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
                I&apos;m J.N. Silva — a Venezuelan-born photographer, filmmaker, and creative
                director working at the intersection of storytelling, technology, and
                modern mysticism. I studied Philosophy and English at Rutgers University
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
      <div ref={quoteRef} className="max-w-[1400px] mx-auto px-6 md:px-12">
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
    </div>
  );
}
