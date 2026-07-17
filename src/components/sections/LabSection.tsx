'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';

/* ─── Featured + supporting lab projects ─── */

const supporting = [
  {
    title: 'Awareness Paradox',
    tag: 'Interactive 3D',
    description:
      'A meditative Three.js experience — sacred geometry, particles, and a camera that listens to the cursor.',
    href: '/awareness-paradox',
    cta: 'Explore',
  },
  {
    title: 'This Site',
    tag: 'Design + Engineering',
    description:
      'Designed and engineered end to end — Next.js, GSAP scroll choreography, and a custom render pipeline for 500+ images.',
    href: '/contact',
    cta: 'Work With Me',
  },
];

export default function LabSection() {
  const labRef = useScrollReveal<HTMLDivElement>({ stagger: 0.15 });

  return (
    <section className="relative z-20 bg-background py-32 lg:py-40 section-fade">
      <div ref={labRef} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p data-reveal className="text-gold text-[11px] md:text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)] text-hover-expand">
          <span className="opacity-30 mr-3">07</span>Creative Technology
        </p>
        <h2 data-reveal="split" className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-foreground font-light mb-6 tracking-tight">
          Code as a Medium
        </h2>
        <p data-reveal className="text-foreground/40 text-base leading-relaxed max-w-2xl mb-16">
          Beyond the camera — systems, engines, and experiments where the
          artwork is written, not shot.
        </p>

        {/* Featured: Cinética */}
        <div data-reveal className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">
          <a
            href="https://cinetica.jnsilva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden border border-foreground/[0.04] hover:border-gold/20 transition-all duration-300"
          >
            <div className="relative aspect-[2/3] max-h-[640px] w-full bg-[#0D0D0D]">
              <Image
                src="/images/cinetica/syn-hero.jpg"
                alt="Cinética — generative kinetic artwork in Venezuelan tricolor palette"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-gold/70 text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
                Generative &middot; Deterministic &middot; Infinite
              </span>
            </div>
          </a>

          <div>
            <p className="text-gold-accent text-[11px] md:text-[10px] uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
              Featured Project
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-foreground font-light mb-6">
              Cinética
            </h3>
            <p className="text-foreground/50 text-base leading-relaxed mb-4">
              A generative art system honoring Venezuela&apos;s kinetic art
              masters — Carlos Cruz-Diez, Jes&uacute;s Rafael Soto, and Gego —
              arranged through a sacred-geometry composition engine.
            </p>
            <p className="text-foreground/40 text-sm leading-relaxed mb-8">
              Every piece is deterministic, browser-rendered, and provably
              unique — no two works can ever repeat. Proceeds support
              Venezuelan earthquake relief.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-10 max-w-sm">
              <Image
                src="/images/cinetica/syn-2.jpg"
                alt="Cinética output — Cruz-Diez palette study"
                width={280}
                height={420}
                className="w-full border border-foreground/[0.04]"
              />
              <Image
                src="/images/cinetica/syn-3.jpg"
                alt="Cinética output — Orquídea palette study"
                width={280}
                height={420}
                className="w-full border border-foreground/[0.04]"
              />
            </div>
            <MagneticButton
              as="a"
              href="https://cinetica.jnsilva.com"
              className="inline-flex items-center gap-2 px-10 py-4 border border-gold/30 text-gold text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:bg-gold hover:text-background hover:border-gold transition-all duration-300"
            >
              Enter Cinética
              <ArrowUpRight size={14} />
            </MagneticButton>
          </div>
        </div>

        {/* Supporting lab projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {supporting.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              data-reveal
              className="group bg-surface border border-foreground/[0.04] hover:border-gold/20 transition-all duration-300 p-8"
            >
              <span className="text-gold/60 text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
                {project.tag}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-foreground font-light mt-3 mb-3 group-hover:text-gold transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-foreground/40 text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <span className="inline-flex items-center gap-2 text-gold/30 group-hover:text-gold/60 transition-colors duration-300 text-[11px] md:text-[10px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)]">
                {project.cta} <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
