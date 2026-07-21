'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import LazyVideo from '@/components/ui/LazyVideo';
import { labProjects, type LabProject } from '@/data/lab';

/* ─── One chapter for the digital practice: fractals, blockchain,
       Cinética, and the Lab — replaces three full-height sections ─── */

interface DigitalCard {
  eyebrow: string;
  title: string;
  description: string;
  stat?: string;
  href: string;
  external?: boolean;
  image?: string;
  video?: { src: string; poster: string };
}

const staticCards: DigitalCard[] = [
  {
    eyebrow: 'Fractal Art',
    title: 'Sacred Geometry',
    description:
      'Fractal mathematics as fine art — Kinesthesia projected high-resolution fractals over dancers.',
    stat: "£90,000 at Sotheby's",
    href: '/fractals',
    image: '/images/fractals/kinesthesia.jpg',
  },
  {
    eyebrow: 'On the Blockchain',
    title: 'Digital Art & NFTs',
    description:
      'First photographer on Nifty Gateway. TIME Genesis artist. $1.6M+ in volume across 800+ editions.',
    stat: 'Sotheby’s · TIMEPieces · Latin GRAMMYs',
    href: '/digital-art',
    video: { src: '/videos/thank-you-ny.mp4', poster: '/images/nft/thank-you-ny-poster.jpg' },
  },
  {
    eyebrow: 'Generative',
    title: 'Cinética',
    description:
      'A generative homage to Venezuela’s kinetic masters — every mint unique, proceeds to earthquake relief.',
    href: 'https://cinetica.jnsilva.com',
    external: true,
    image: '/images/lab/cinetica-wide.jpg',
  },
];

/* Lab card image rotates per visit — picked client-side to avoid
   hydration mismatch (same pattern as the NFT featured rotation) */
function useRandomLabProject() {
  const [project, setProject] = useState<LabProject | null>(null);
  useEffect(() => {
    const pool = labProjects.filter((p) => p.slug !== 'cinetica');
    setProject(pool[Math.floor(Math.random() * pool.length)]);
  }, []);
  return project;
}

function CardMedia({ card }: { card: DigitalCard }) {
  if (card.video) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0D0D0D]">
        <LazyVideo
          src={card.video.src}
          poster={card.video.poster}
          fit="cover"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }
  if (card.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0D0D0D]">
        <Image
          src={card.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
        />
      </div>
    );
  }
  return null;
}

function CardBody({ card }: { card: DigitalCard }) {
  return (
    <div className="p-7 flex flex-col flex-1">
      <span className="text-gold/60 text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
        {card.eyebrow}
      </span>
      <h3 className="font-[family-name:var(--font-display)] text-2xl text-foreground font-light mt-3 mb-3 group-hover:text-gold transition-colors duration-300">
        {card.title}
      </h3>
      <p className="text-foreground/40 text-sm leading-relaxed mb-4">
        {card.description}
      </p>
      {card.stat && (
        <p className="text-gold-accent/80 text-xs font-[family-name:var(--font-mono)] tracking-wider mb-4">
          {card.stat}
        </p>
      )}
      <span className="inline-flex items-center gap-2 text-gold/30 group-hover:text-gold/60 transition-colors duration-300 text-[11px] md:text-[10px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] mt-auto">
        {card.external ? (
          <>Visit <ArrowUpRight size={12} /></>
        ) : (
          <>Explore <ArrowRight size={12} /></>
        )}
      </span>
    </div>
  );
}

export default function DigitalWorkSection() {
  const sectionRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 });
  const labPick = useRandomLabProject();

  const labCard: DigitalCard = {
    eyebrow: labPick ? `The Lab · ${labPick.category}` : 'The Lab',
    title: labPick ? labPick.title : 'The Lab',
    description: labPick
      ? labPick.description
      : 'Generative systems, games, and interactive builds — code as a medium.',
    stat: `${labProjects.length} projects shipped`,
    href: '/lab',
    image: labPick ? labPick.image : '/images/lab/arbitrumcity.jpg',
  };

  const cards = [...staticCards, labCard];

  return (
    <section className="relative z-20 bg-background py-28 lg:py-32 section-fade">
      <div ref={sectionRef} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p data-reveal className="text-gold text-[11px] md:text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)] text-hover-expand">
          <span className="opacity-30 mr-3">05</span>Digital Work
        </p>
        <h2 data-reveal="split" className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-foreground font-light mb-6 tracking-tight">
          Pixels &amp; Provenance
        </h2>
        <p data-reveal className="text-foreground/40 text-base leading-relaxed max-w-2xl mb-14">
          Fractals sold at Sotheby&apos;s, art living on-chain, generative
          systems, and a lab where the code is the medium.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cards.map((card) =>
            card.external ? (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="group bg-surface border border-foreground/[0.04] hover:border-gold/20 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <CardMedia card={card} />
                <CardBody card={card} />
              </a>
            ) : (
              <Link
                key={card.title}
                href={card.href}
                data-reveal
                className="group bg-surface border border-foreground/[0.04] hover:border-gold/20 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <CardMedia card={card} />
                <CardBody card={card} />
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
