'use client';

import Image from 'next/image';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

interface Drop {
  title: string;
  platform: string;
  date: string;
  description: string;
  type: 'personal' | 'collaboration' | 'auction' | 'installation' | 'charity';
  collaborator?: string;
  achievement?: string;
  links?: { label: string; url: string }[];
  price?: string;
  image?: string;
}

const milestones: Drop[] = [
  {
    title: 'Thank You New York',
    platform: 'Nifty Gateway',
    date: 'December 2020',
    description:
      'A 16-second NFT portraying Silva\'s still image of Manhattan being infiltrated by flowing blocks of ThankYouX\'s geometric cube art. Historic as the first Nifty Gateway drop to include photography.',
    type: 'collaboration',
    collaborator: 'ThankYouX',
    achievement: 'First Nifty Gateway drop to include photography',
    image: '/images/nft/thank-you-ny-poster.jpg',
    links: [
      { label: 'Nifty Gateway', url: 'https://www.niftygateway.com/collections/thankyouxsilva/' },
    ],
  },
  {
    title: 'Thank You Miami',
    platform: 'Nifty Gateway',
    date: 'March 2021',
    description:
      'Follow-up collaboration celebrating Miami culture and the Venezuelan diaspora. A fusion of Silva\'s photography with ThankYouX\'s geometric aesthetic.',
    type: 'collaboration',
    collaborator: 'ThankYouX',
    image: '/images/nft/thank-you-miami-poster.jpg',
    links: [
      { label: 'OpenSea', url: 'https://opensea.io/collection/thankyoux-and-jn-silva' },
    ],
  },
  {
    title: 'Golden Era Future',
    platform: 'Nifty Gateway',
    date: 'April 2021',
    description:
      'A groundbreaking collaboration between legendary hip-hop producer DJ Premier and Animus Collective. Nine instrumental tracks paired with accompanying visuals.',
    type: 'collaboration',
    collaborator: 'DJ Premier',
    image: '/images/nft/golden-era-future-poster.jpg',
    links: [
      { label: 'Nifty Gateway', url: 'https://www.niftygateway.com/collections/goldenerafutureopen' },
    ],
  },
  {
    title: 'Lost in the Moment',
    platform: 'Nifty Gateway',
    date: 'June 2021',
    description:
      'Historic first solo NFT drop by a photographer on Nifty Gateway. Three packs: "Back to Basics" (B&W), "Life in the Fast Lane," and "Found in Nature" — pioneering a new economic model for photographers.',
    type: 'personal',
    achievement: 'First photographer to release a solo drop on Nifty Gateway',
  },
  {
    title: 'TIME Genesis Collection',
    platform: 'TIMEPieces',
    date: 'September 2021',
    description:
      'Selected as one of 40 artists for TIME Magazine\'s landmark genesis NFT collection, launching the publication\'s evolution into Web3.',
    type: 'personal',
    achievement: 'Featured in TIME\'s inaugural NFT collection',
    image: '/images/nft/time-genesis-poster.jpg',
    links: [
      { label: 'TIME Collection', url: 'https://nft.time.com/collection/jn-silva/' },
    ],
  },
  {
    title: 'Kinesthesia',
    platform: "Sotheby's",
    date: '2021',
    description:
      'A transcendent fusion of fractal artwork and photography, inspired by Kineticism in Latin American art history. Projection of high-resolution fractals over dancers, merging sacred geometry with human movement.',
    type: 'auction',
    achievement: 'First Venezuelan NFT artist to exhibit at Sotheby\'s',
    price: '90,000 GBP (~$119,000 USD)',
    image: '/images/nft/kinesthesia-poster.jpg',
    links: [
      { label: "Sotheby's Auction", url: 'https://www.sothebys.com/en/buy/auction/2022/modern-contemporary-art-day-auction/kinesthesia' },
      { label: 'Sony Alpha Feature', url: 'https://alphauniverse.com/stories/nft-artist-jn-silvas-kinesthesia-sells-at-sothebys-auction/' },
    ],
  },
  {
    title: 'Infinitum',
    platform: 'Nifty Gateway',
    date: 'May 2022',
    description:
      'Open edition series exploring infinite recursion and sacred patterns. Released as two editions with live minting experiences.',
    type: 'personal',
    image: '/images/fractals/infinitum/infinitumhero.JPG',
  },
  {
    title: 'I Want to See My Friends Again',
    platform: 'TIMEPieces: Artists for Peace',
    date: '2022',
    description:
      '1/1 piece created for Ukrainian humanitarian relief. 100% of proceeds donated. 59 TIMEPieces artists contributed — all taking zero royalties on primary and secondary sales.',
    type: 'charity',
    links: [
      { label: 'OpenSea', url: 'https://opensea.io/item/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/99707506381095622123001165646892513100303268977477032461907971236645813878785' },
    ],
  },
  {
    title: 'Visión y Razón',
    platform: 'Artifex Project',
    date: '2022',
    description:
      'A 2:12 video montage featuring 47 photographs set to an original audio track composed by the artist. Immortalized as part of the Artifex Museum collection celebrating early NFT movement pioneers.',
    type: 'personal',
    image: '/images/nft/vision-y-razon-poster.png',
    links: [
      { label: 'Artifex', url: 'https://artifex.art/artists/j-n-silva' },
    ],
  },
  {
    title: 'Tonada De Orgullo',
    platform: 'OneOf / Latin GRAMMYs',
    date: 'November 2022',
    description:
      'One of five Latin artists selected for the 23rd Annual Latin GRAMMY Awards NFT collection, creatively directed by Carlos Vives. A celebration of Venezuelan musical heritage.',
    type: 'personal',
    image: '/images/nft/tonada-de-orgullo-poster.png',
    links: [
      { label: 'Latin GRAMMYs', url: 'https://www.latingrammy.com/en/news/the-latin-recording-academy-and-oneof-announce-carlos-vives-as-creative-director-of-the-23rd-annual-latin-grammy-awards-nft-and-capsule--' },
    ],
  },
];

const platforms = [
  { name: 'SuperRare', url: 'https://superrare.com/jnsilva' },
  { name: 'Nifty Gateway', url: 'https://www.niftygateway.com/@jnsilva/collections/' },
  { name: 'OpenSea', url: 'https://opensea.io/jnsilva' },
  { name: 'Foundation', url: 'https://foundation.app/@jnsilva' },
  { name: '1stDibs', url: 'https://www.1stdibs.com/nft/profile/jnsilva/' },
  { name: 'Artifex', url: 'https://artifex.art/artists/j-n-silva' },
];

const typeColors: Record<string, string> = {
  personal: 'border-[#C8C0B4]',
  collaboration: 'border-[#2563EB]',
  auction: 'border-[#DC2626]',
  installation: 'border-[#8B5CF6]',
  charity: 'border-[#10B981]',
};

const typeLabels: Record<string, string> = {
  personal: 'Personal Drop',
  collaboration: 'Collaboration',
  auction: 'Auction',
  installation: 'Installation',
  charity: 'Charity',
};

const typeDots: Record<string, string> = {
  personal: 'bg-[#C8C0B4]',
  collaboration: 'bg-[#2563EB]',
  auction: 'bg-[#DC2626]',
  installation: 'bg-[#8B5CF6]',
  charity: 'bg-[#10B981]',
};

export default function DigitalArtPage() {
  return (
    <div className="relative z-10 bg-[#0A0A0A] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
          Web3 &middot; NFT &middot; Crypto Art
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-8">
          Digital Art
        </h1>
        <p className="text-[#F5F0E8]/50 text-lg max-w-2xl leading-relaxed">
          Pioneering the intersection of photography and blockchain technology.
          First photographer on Nifty Gateway. First Venezuelan NFT artist at
          Sotheby&apos;s. Founder of Animus Collective — onboarding thousands of
          artists into the Web3 ecosystem.
        </p>
      </div>

      {/* Key Stats */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { stat: '90K GBP', label: 'Sotheby\'s Sale' },
            { stat: '1st', label: 'Photographer on Nifty Gateway' },
            { stat: '40', label: 'Artists in TIME Genesis' },
            { stat: '6+', label: 'Major Platforms' },
          ].map((item) => (
            <div key={item.label} className="p-8 bg-[#141414] border border-[#C8C0B4]/10">
              <p className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#C8C0B4] mb-2">
                {item.stat}
              </p>
              <p className="text-[#F5F0E8]/40 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Animus Collective */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="p-10 md:p-16 bg-[#141414] border border-[#C8C0B4]/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#C8C0B4" strokeWidth="0.5" />
              <circle cx="100" cy="20" r="80" fill="none" stroke="#C8C0B4" strokeWidth="0.5" />
              <circle cx="100" cy="180" r="80" fill="none" stroke="#C8C0B4" strokeWidth="0.5" />
            </svg>
          </div>
          <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
            Founded 2020
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#F5F0E8] mb-6">
            Animus Collective
          </h2>
          <p className="text-[#F5F0E8]/50 text-base leading-relaxed max-w-2xl">
            A global artist collective dedicated to advancing the future of NFT
            and crypto art. Through Animus, thousands of artists have been
            onboarded into the Web3 ecosystem, fostering community, mentorship,
            and creative collaboration across borders.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
          Timeline
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#F5F0E8] mb-16">
          Drops, Collaborations & Milestones
        </h2>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mb-12">
          {Object.entries(typeLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${typeDots[key]}`} />
              <span className="text-[#F5F0E8]/40 text-xs uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {milestones.map((drop, index) => (
            <div
              key={index}
              className={`group relative p-8 md:p-10 bg-[#141414] border-l-2 ${typeColors[drop.type]} hover:bg-[#1A1A1A] transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {drop.image ? (
                  <div className="relative aspect-[2/3] w-32 md:w-40 flex-shrink-0 overflow-hidden bg-[#0D0D0D] border border-[#C8C0B4]/10">
                    <Image src={drop.image} alt={drop.title} fill className="object-cover" sizes="160px" />
                  </div>
                ) : (
                  <div className="w-32 md:w-40 aspect-[2/3] flex-shrink-0 rounded bg-surface flex items-center justify-center border border-gold/10">
                    <span className="text-gold/30 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider text-center px-2">
                      {drop.platform}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#F5F0E8]/30 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider">
                      {drop.date}
                    </span>
                    <span className="text-[#F5F0E8]/10">|</span>
                    <span className="text-[#F5F0E8]/30 text-xs font-[family-name:var(--font-mono)]">
                      {drop.platform}
                    </span>
                    {drop.collaborator && (
                      <>
                        <span className="text-[#F5F0E8]/10">|</span>
                        <span className="text-[#2563EB]/60 text-xs font-[family-name:var(--font-mono)]">
                          w/ {drop.collaborator}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[#F5F0E8] mb-3 group-hover:text-[#C8C0B4] transition-colors">
                    {drop.title}
                  </h3>

                  <p className="text-[#F5F0E8]/40 text-sm leading-relaxed max-w-2xl mb-4">
                    {drop.description}
                  </p>

                  {drop.achievement && (
                    <p className="text-[#C8C0B4]/80 text-xs uppercase tracking-wider font-[family-name:var(--font-mono)] mb-4">
                      {drop.achievement}
                    </p>
                  )}

                  {drop.price && (
                    <p className="text-[#F5F0E8]/60 text-sm">
                      Sold for <span className="text-[#C8C0B4] font-medium">{drop.price}</span>
                    </p>
                  )}
                </div>

                {/* Links */}
                {drop.links && (
                  <div className="flex flex-col gap-2 mt-2 md:mt-0">
                    {drop.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#C8C0B4]/50 hover:text-[#C8C0B4] text-xs uppercase tracking-wider transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-12 font-[family-name:var(--font-mono)]">
          Collect & View
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 p-6 bg-[#141414] border border-[#C8C0B4]/5 hover:border-[#C8C0B4]/30 transition-all duration-300"
            >
              <span className="text-[#F5F0E8]/50 group-hover:text-[#F5F0E8] text-sm transition-colors">
                {platform.name}
              </span>
              <ExternalLink size={12} className="text-[#C8C0B4]/0 group-hover:text-[#C8C0B4]/60 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
