'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import LazyVideo from '@/components/ui/LazyVideo';
import { nftCollections } from '@/data/nft';

/* ─── NFT Content (featured hero + cards, with deduplication) ─── */

function NFTContent({ collections }: { collections: typeof nftCollections }) {
  const [featuredTitle, setFeaturedTitle] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<'landscape' | 'portrait' | 'square'>('landscape');

  useEffect(() => {
    const withVideo = collections.filter((c) => c.video);
    if (withVideo.length === 0) return;
    const pick = withVideo[Math.floor(Math.random() * withVideo.length)];
    setFeaturedTitle(pick.title);
  }, [collections]);

  const featured = collections.find((c) => c.title === featuredTitle);
  const cards = collections.filter((c) => c.title !== featuredTitle);
  const isPortrait = orientation === 'portrait';

  return (
    <>
      {/* Featured Project — cycles randomly on each visit */}
      {featured && featured.video && (
        <div data-reveal className="mb-12">
          <p className="text-gold-accent text-[11px] md:text-[10px] uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
            Featured Project
          </p>
          <a
            href={featured.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block relative overflow-hidden border border-foreground/[0.04] hover:border-gold/20 transition-all duration-300 ${isPortrait ? 'max-w-xs mx-auto' : ''}`}
          >
            <div className={`relative bg-[#0D0D0D] ${isPortrait ? 'aspect-[3/4]' : orientation === 'square' ? 'aspect-square' : 'aspect-video'}`}>
              <LazyVideo
                src={featured.video}
                className="absolute inset-0 w-full h-full"
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget as HTMLVideoElement;
                  if (v.videoWidth && v.videoHeight) {
                    const ratio = v.videoWidth / v.videoHeight;
                    if (ratio < 0.9) setOrientation('portrait');
                    else if (ratio > 1.1) setOrientation('landscape');
                    else setOrientation('square');
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-between p-5 bg-surface">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-gold/60 text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
                    {featured.platform}
                  </span>
                  <span className="text-foreground/10">&middot;</span>
                  <span className="text-foreground/20 text-[10px] font-[family-name:var(--font-mono)]">
                    {featured.date}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-foreground font-light group-hover:text-gold transition-colors duration-300">
                  {featured.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-gold/30 group-hover:text-gold/60 transition-colors duration-300">
                <span className="text-[11px] md:text-[10px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hidden sm:inline">View</span>
                <ExternalLink size={12} />
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Collection cards — featured item excluded */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        {cards.map((collection) => (
          <a
            key={collection.title}
            href={collection.link}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="group bg-surface border border-foreground/[0.04] hover:border-gold/20 transition-all duration-300 overflow-hidden"
          >
            {collection.video ? (
              <div className="relative aspect-square overflow-hidden bg-[#0D0D0D]">
                <LazyVideo src={collection.video} className="absolute inset-0 w-full h-full" />
              </div>
            ) : 'image' in collection && collection.image ? (
              <div className="relative aspect-square overflow-hidden bg-[#0D0D0D]">
                <Image
                  src={collection.image as string}
                  alt={collection.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-gold/60 text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-[family-name:var(--font-mono)]">
                  {collection.platform}
                </span>
                <span className="text-foreground/10">&middot;</span>
                <span className="text-foreground/20 text-[10px] font-[family-name:var(--font-mono)]">
                  {collection.date}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl text-foreground font-light mb-2 group-hover:text-gold transition-colors duration-300">
                {collection.title}
              </h3>
              <p className="text-foreground/40 text-xs leading-relaxed mb-3">
                {collection.description}
              </p>
              <div className="flex items-center gap-2 text-gold/30 group-hover:text-gold/60 transition-colors duration-300">
                <span className="text-[11px] md:text-[10px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)]">View</span>
                <ExternalLink size={10} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

export default function DigitalArtSection() {
  const digitalArtRef = useScrollReveal<HTMLDivElement>({ stagger: 0.15 });

  return (
    <section className="relative z-20 bg-background py-32 lg:py-40 section-fade">
      <div ref={digitalArtRef} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p data-reveal className="text-gold text-[11px] md:text-[10px] uppercase tracking-[0.4em] mb-4 font-[family-name:var(--font-mono)] text-hover-expand">
          <span className="opacity-30 mr-3">06</span>Digital Art
        </p>
        <h2 data-reveal="split" className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-foreground font-light mb-12 tracking-tight">
          On the Blockchain
        </h2>

        {/* Stats bar — gold accent */}
        <div data-reveal className="flex flex-wrap gap-x-8 gap-y-3 mb-16 py-6 border-t border-b border-gold-accent/10">
          {[
            "£90,000 Sotheby's",
            'TIME Genesis',
            '$1.6M+ Volume',
            '800+ Editions',
          ].map((stat) => (
            <span key={stat} className="text-gold-accent text-sm font-[family-name:var(--font-mono)] tracking-wider">
              {stat}
            </span>
          ))}
        </div>

        {/* Featured Project + Collection cards (deduplicated) */}
        <NFTContent collections={nftCollections.slice(1)} />

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
              className="text-foreground/20 text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-mono)] hover:text-gold transition-colors duration-300"
            >
              {platform.name} <ExternalLink size={10} className="inline ml-1 -mt-0.5" />
            </a>
          ))}
        </div>

        <div data-reveal className="text-center">
          <MagneticButton as="a" href="/digital-art" className="inline-flex items-center gap-2 px-10 py-4 border border-gold/30 text-gold text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:bg-gold hover:text-background hover:border-gold transition-all duration-300">
            Explore Digital Art
            <ArrowRight size={14} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
