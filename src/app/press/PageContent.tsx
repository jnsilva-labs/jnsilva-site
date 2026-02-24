'use client';

import { ExternalLink, Play } from 'lucide-react';

interface PressItem {
  publication: string;
  title: string;
  year: string;
  type: 'article' | 'podcast' | 'feature' | 'interview';
  url?: string;
  description?: string;
}

const pressItems: PressItem[] = [
  {
    publication: 'Sotheby\'s',
    title: 'Kinesthesia — Natively Digital: A Curated NFT Sale',
    year: '2022',
    type: 'feature',
    url: 'https://www.sothebys.com/en/buy/auction/2022/modern-contemporary-art-day-auction/kinesthesia',
    description: 'First Venezuelan NFT artist to exhibit and sell at Sotheby\'s. Kinesthesia sold for \u00A390,000.',
  },
  {
    publication: 'TIME Magazine',
    title: 'TIMEPieces Genesis Collection — Featured Artist',
    year: '2021',
    type: 'feature',
    description: 'Selected as one of 40 artists for TIME Magazine\'s landmark genesis NFT collection.',
    url: 'https://nft.time.com/collection/jn-silva/',
  },
  {
    publication: 'Sony Alpha Universe',
    title: 'NFT Artist JN Silva\'s Kinesthesia Sells at Sotheby\'s Auction',
    year: '2022',
    type: 'article',
    url: 'https://alphauniverse.com/stories/nft-artist-jn-silvas-kinesthesia-sells-at-sothebys-auction/',
    description: 'In-depth feature on the creative process and technical approach behind Kinesthesia.',
  },
  {
    publication: 'The New York Times',
    title: 'Sharing Cultural Jewels via Instagram',
    year: '2014',
    type: 'article',
    url: 'https://www.nytimes.com/2014/06/18/arts/design/sharing-cultural-jewels-via-instagram.html',
    description: 'Featured in the Times\' exploration of cultural voices shaping New York\'s creative landscape through Instagram.',
  },
  {
    publication: 'Entrepreneur',
    title: '3 Tips for Creatives Looking to Break Into the NFT Industry',
    year: '2021',
    type: 'article',
    url: 'https://www.entrepreneur.com/money-finance/3-tips-for-creatives-looking-to-break-into-the-nft-industry/366540',
    description: 'Practical insights on navigating the evolving intersection of art and blockchain technology.',
  },
  {
    publication: 'Yahoo Finance',
    title: 'Photographer JN Silva and ThankYouX Team Up for Digital Art Drop',
    year: '2020',
    type: 'article',
    url: 'https://finance.yahoo.com/news/photographer-jn-silva-artist-thankyoux-164724490.html',
    description: 'Coverage of the first photography NFT drop on Nifty Gateway with ThankYouX.',
  },
  {
    publication: 'Yahoo Finance',
    title: 'JN Silva and ThankYouX Return for Second NFT Drop',
    year: '2021',
    type: 'article',
    url: 'https://finance.yahoo.com/news/jn-silva-thankyoux-return-second-170007905.html',
    description: 'Follow-up coverage of the "Thank You Miami" collection on Nifty Gateway.',
  },
  {
    publication: 'NFT Now',
    title: 'Redefining Photography Through NFTs with JN Silva',
    year: '2021',
    type: 'interview',
    url: 'https://nftnow.com/podcasts/jn-silva-photography-nfts-interview/',
    description: 'Deep dive into how photographers are finding new economic models through blockchain.',
  },
  {
    publication: 'Modern Luxury',
    title: 'ThankYouX & JN Silva Launch Miami-Inspired NFT',
    year: '2021',
    type: 'article',
    url: 'https://www.modernluxury.com/jn-silva-thankyoux-miami-nft/',
    description: 'Feature on the "Thank You Miami" collaboration bridging fine art photography and blockchain.',
  },
  {
    publication: 'Caracas Chronicles',
    title: 'Talking NFTs with JN Silva',
    year: '2021',
    type: 'interview',
    url: 'https://www.caracaschronicles.com/2021/10/04/talking-nfts-with-jn-silva/',
    description: 'Venezuela Diaspora Project interview on the NFT movement and Animus Collective.',
  },
  {
    publication: 'The Source',
    title: 'DJ Premier and Animus Exclusive \'Golden Era Future\' NFT Auction',
    year: '2021',
    type: 'article',
    url: 'https://thesource.com/2021/04/28/dj-premier-and-animus-exclusive-golden-era-future-nft-drop-available-for-public-auction-today/',
    description: 'The Source covers DJ Premier\'s first NFT drop, created in collaboration with JN Silva\'s collective Animus.',
  },
  {
    publication: 'HotNewHipHop',
    title: 'DJ Premier Details \'Golden Era Future\' NFT Auction',
    year: '2021',
    type: 'article',
    url: 'https://www.hotnewhiphop.com/362611-dj-premier-details-golden-era-future-nft-auction-news',
    description: 'Coverage of the DJ Premier x Animus NFT collaboration on Nifty Gateway.',
  },
  {
    publication: 'NFT Now',
    title: 'The JN Silva Interview, Wicked Craniums & More',
    year: '2021',
    type: 'feature',
    url: 'https://nftnow.substack.com/p/jn-silva-wicked-craniums',
    description: 'Newsletter feature on the first photographer on Nifty Gateway, work with ThankYouX, and co-founding Animus.',
  },
];

const podcastAppearances = [
  {
    name: 'NFT Now Podcast',
    episode: 'Redefining Photography Through NFTs',
    url: 'https://nftnow.com/podcasts/jn-silva-photography-nfts-interview/',
  },
  {
    name: 'Venezuela Diaspora Project',
    episode: 'NFTs Explained by JN Silva',
    url: 'https://podcasts.apple.com/us/podcast/nfts-explained-by-jn-silva-artist-and-photographer/id1553654543?i=1000537411468',
  },
  {
    name: 'Edge of NFT',
    episode: 'From Caracas to Crypto Art',
    url: 'https://www.edgeofnft.com/podcasts',
  },
  {
    name: 'Sony Alpha Universe',
    episode: 'Hunters of Light — JN Silva',
    url: 'https://youtu.be/4vTWf0LYoDM',
  },
  {
    name: 'That Creative Life',
    episode: 'Making a Living on Instagram with J.N. Silva & Dave Krugman',
    url: 'https://podcasts.apple.com/us/podcast/making-a-living-on-instagram-with-j-n-silva-and-dave-krugman/id1341109677?i=1000466507912',
  },
];

const typeColors: Record<string, string> = {
  article: 'text-[#C8C0B4]',
  podcast: 'text-[#2563EB]',
  feature: 'text-[#10B981]',
  interview: 'text-[#8B5CF6]',
};

export default function PressPage() {
  return (
    <div className="relative z-10 bg-[#0A0A0A] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
          Media
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-8">
          Press &amp; Podcasts
        </h1>
        <p className="text-[#F5F0E8]/50 text-lg max-w-2xl leading-relaxed">
          Selected features, interviews, and media appearances documenting the
          journey at the intersection of art, technology, and culture.
        </p>
      </div>

      {/* Hero — Adorama Through The Lens */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="bg-[#141414] border border-[#C8C0B4]/5 overflow-hidden">
          {/* Video embed */}
          <div className="relative aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/IYEr_0aerSc?rel=0&modestbranding=1&color=white"
              title="Through The Lens | S06E11 - @jnsilva — Adorama"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Caption */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-[family-name:var(--font-display)] text-xl text-[#F5F0E8]">
                  Adorama
                </span>
                <span className="text-[#F5F0E8]/10">|</span>
                <span className="text-[#8B5CF6] text-xs uppercase tracking-wider font-[family-name:var(--font-mono)] opacity-60">
                  interview
                </span>
                <span className="text-[#F5F0E8]/10">|</span>
                <span className="text-[#F5F0E8]/30 text-xs font-[family-name:var(--font-mono)]">
                  2018
                </span>
              </div>
              <p className="text-[#F5F0E8]/50 text-sm">
                Through the Lens: Back in the USA — S06E11
              </p>
              <p className="text-[#F5F0E8]/25 text-xs mt-2 leading-relaxed max-w-xl">
                Featured episode in Adorama&apos;s Emmy-nominated docuseries profiling photographers across the country.
                From Caracas to New York — the journey through street, music, and aerial photography.
              </p>
            </div>
            <a
              href="https://www.adorama.com/alc/through-the-lens-back-in-the-usa-photographer-jose-silva-jnsilva/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#C8C0B4]/40 hover:text-[#C8C0B4] text-xs uppercase tracking-wider transition-colors flex-shrink-0"
            >
              Full Article
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Press & Features */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-12 font-[family-name:var(--font-mono)]">
          Press &amp; Features
        </p>

        <div className="space-y-1">
          {pressItems.map((item, index) => (
            <div
              key={index}
              className="group p-6 md:p-8 bg-[#141414] hover:bg-[#1A1A1A] transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-[family-name:var(--font-display)] text-lg text-[#F5F0E8]/70 group-hover:text-[#F5F0E8] transition-colors">
                      {item.publication}
                    </span>
                    <span className="text-[#F5F0E8]/10">|</span>
                    <span className={`text-xs uppercase tracking-wider font-[family-name:var(--font-mono)] ${typeColors[item.type]} opacity-60`}>
                      {item.type}
                    </span>
                    <span className="text-[#F5F0E8]/10">|</span>
                    <span className="text-[#F5F0E8]/30 text-xs font-[family-name:var(--font-mono)]">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-[#F5F0E8]/40 text-sm">{item.title}</p>
                  {item.description && (
                    <p className="text-[#F5F0E8]/25 text-xs mt-2 leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#C8C0B4]/40 hover:text-[#C8C0B4] text-xs uppercase tracking-wider transition-colors flex-shrink-0"
                  >
                    Read
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Podcasts */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-12 font-[family-name:var(--font-mono)]">
          Podcast Appearances
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {podcastAppearances.map((podcast) => (
            <a
              key={podcast.name}
              href={podcast.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 bg-[#141414] border border-[#C8C0B4]/5 group hover:border-[#C8C0B4]/20 transition-all duration-300 block"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-[family-name:var(--font-display)] text-xl text-[#F5F0E8] mb-2 group-hover:text-[#C8C0B4] transition-colors">
                    {podcast.name}
                  </p>
                  <p className="text-[#F5F0E8]/40 text-sm">
                    {podcast.episode}
                  </p>
                </div>
                <ExternalLink size={14} className="text-[#C8C0B4]/20 group-hover:text-[#C8C0B4] transition-colors flex-shrink-0" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
