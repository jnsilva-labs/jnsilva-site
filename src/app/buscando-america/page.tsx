'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function BuscandoAmericaPage() {
  const heroRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 });
  const detailsRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });
  const linksRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <div className="relative z-10 bg-[#0A0A0A] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#C8C0B4]/50 text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-[#C8C0B4] transition-colors duration-300"
        >
          <ArrowLeft size={12} />
          Home
        </Link>
      </div>

      {/* Hero — title + IDIOSINCRASIA documentary */}
      <div ref={heroRef} className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="mb-8">
          <p data-reveal className="text-[#C8C0B4]/40 text-[10px] uppercase tracking-[0.4em] font-[family-name:var(--font-mono)] mb-4">
            Looking for America
          </p>
          <h1 data-reveal="split" className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,10vw,10rem)] text-[#F5F0E8] font-light tracking-wide leading-none mb-2">
            Buscando America
          </h1>
          <p data-reveal className="text-[#C8C0B4]/30 text-xs font-[family-name:var(--font-mono)] tracking-[0.2em] uppercase">
            A fiction film under construction in Web3
          </p>
        </div>
        <div data-reveal className="relative overflow-hidden border border-[#F5F0E8]/[0.04]">
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
      </div>

      {/* Details */}
      <div ref={detailsRef} className="max-w-[1000px] mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* About the Project */}
          <div>
            <p data-reveal className="text-[#C8C0B4] text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)]">
              About
            </p>
            <p data-reveal className="text-[#F5F0E8]/50 text-base leading-relaxed mb-6">
              Buscando America is a Web3 ecosystem built by Latino filmmakers who aspire to
              produce an independent fiction film. Rather than using traditional crowdfunding,
              the project leverages blockchain technology, NFTs, and community-driven financing
              to fund the filmmaking process.
            </p>
            <p data-reveal className="text-[#F5F0E8]/50 text-base leading-relaxed mb-6">
              Set in Medell&iacute;n, Colombia &mdash; the city serves as both the research location
              and the creative inspiration for the film. The project blurs the line between film
              production and startup, treating the entire filmmaking journey as a decentralized,
              community-involved endeavor.
            </p>

            <p data-reveal className="text-[#C8C0B4] text-[10px] uppercase tracking-[0.4em] mb-4 mt-10 font-[family-name:var(--font-mono)]">
              IDIOSINCRASIA Collection
            </p>
            <p data-reveal className="text-[#F5F0E8]/50 text-base leading-relaxed">
              2,500 one-of-one photographs created during the research stage and case study
              of Medell&iacute;n. The collection documents the search for characters and places
              that represent the idiosyncrasy of the city &mdash; portraits, colors, and situations
              that serve as inspiration for the film&apos;s script. Selected by OpenSea as a standout collection.
            </p>
          </div>

          {/* Details */}
          <div>
            <p data-reveal className="text-[#C8C0B4] text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)]">
              Details
            </p>
            <div className="space-y-4">
              {[
                { label: 'Format', value: 'Fiction Film (Feature) + NFT Collections' },
                { label: 'Co-Directors', value: 'Alex Ulises & Nelson G. Navarrete' },
                { label: 'Web3 Exec. Producer', value: 'JN Silva' },
                { label: 'Location', value: 'Medellín, Colombia' },
                { label: 'Event', value: 'NFT Now: The Gateway' },
                { label: 'Funding', value: 'Community-driven NFT collections' },
              ].map((detail) => (
                <div key={detail.label} data-reveal className="flex justify-between py-3 border-b border-[#F5F0E8]/[0.04]">
                  <span className="text-[#F5F0E8]/30 text-sm font-[family-name:var(--font-mono)]">
                    {detail.label}
                  </span>
                  <span className="text-[#F5F0E8]/70 text-sm text-right">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Roadmap */}
            <p data-reveal className="text-[#C8C0B4] text-[10px] uppercase tracking-[0.4em] mb-4 mt-10 font-[family-name:var(--font-mono)]">
              Production Roadmap
            </p>
            <p data-reveal className="text-[#F5F0E8]/40 text-sm leading-relaxed mb-4">
              Each phase of cinema production has its own NFT collection to raise funding
              and build community:
            </p>
            <div className="space-y-2">
              {['Development', 'Pre-production', 'Production', 'Post-production', 'Exhibition / Distribution'].map((phase, i) => (
                <div key={phase} data-reveal className="flex items-center gap-3">
                  <span className="text-[#C8C0B4]/30 text-xs font-[family-name:var(--font-mono)] w-4">
                    {i + 1}
                  </span>
                  <span className="text-[#F5F0E8]/50 text-sm">
                    {phase}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div ref={linksRef} className="max-w-[1000px] mx-auto px-6 md:px-12 pb-32">
        <div className="border-t border-[#F5F0E8]/[0.04] pt-12">
          <p data-reveal className="text-[#C8C0B4] text-[10px] uppercase tracking-[0.4em] mb-6 font-[family-name:var(--font-mono)]">
            Links
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { label: 'buscandoamerica.co', href: 'https://buscandoamerica.co' },
              { label: 'OpenSea', href: 'https://opensea.io/collection/buscandoamerica' },
              { label: '@buscandoam3rica', href: 'https://instagram.com/buscandoam3rica' },
              { label: 'X / Twitter', href: 'https://twitter.com/buscandoam3rica' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="inline-flex items-center gap-2 text-[#C8C0B4] text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-[#F5F0E8] transition-colors duration-300"
              >
                {link.label}
                <ExternalLink size={12} />
              </a>
            ))}
          </div>

          <div data-reveal className="mt-12">
            <Link
              href="/film"
              className="inline-flex items-center gap-2 text-[#C8C0B4] text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-[#F5F0E8] transition-colors duration-300"
            >
              Film &amp; Motion
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
