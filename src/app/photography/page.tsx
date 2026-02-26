import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Photography',
  description:
    'Photography by J.N. Silva — music, concerts, New York City, portraits, editorial, landscapes, and travel photography.',
  alternates: { canonical: '/photography' },
  openGraph: {
    title: 'Photography — J.N. Silva',
    description:
      'Music, NYC, people, and places — through the lens of J.N. Silva.',
    url: '/photography',
  },
};

const galleries = [
  {
    title: 'Music',
    subtitle: 'Concerts & Festivals',
    href: '/photography/music',
    image: '/images/music/Kendrick_3.jpg',
    count: 31,
  },
  {
    title: 'People',
    subtitle: 'Portraits & Editorial',
    href: '/photography/people',
    image: '/images/people/Fashion_Week.jpg',
    count: 25,
  },
  {
    title: 'NYC',
    subtitle: 'Street & Urban',
    href: '/photography/nyc',
    image: '/images/nyc/NYOverEmpire.jpg',
    count: 21,
  },
  {
    title: 'Places',
    subtitle: 'Landscapes & Travel',
    href: '/photography/places',
    image: '/images/places/Kenya_Zebras.jpg',
    count: 27,
  },
];

export default function PhotographyPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Photography — J.N. Silva',
          description:
            'Photography collections spanning music, New York City, portraits, and travel.',
          url: 'https://jnsilva.com/photography',
          creator: {
            '@type': 'Person',
            name: 'J.N. Silva',
            url: 'https://jnsilva.com',
          },
        }}
      />

      <div className="relative z-10 bg-[#0A0A0A] pt-32 pb-24 min-h-screen">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
          <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
            Collections
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-6">
            Photography
          </h1>
          <p className="text-[#F5F0E8]/40 text-lg max-w-2xl leading-relaxed">
            From the mosh pit to the mountaintop — a decade of images across
            four collections.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {galleries.map((gallery) => (
              <Link
                key={gallery.href}
                href={gallery.href}
                className="group relative overflow-hidden bg-[#141414] aspect-[4/3]"
                data-cursor="view"
              >
                <Image
                  src={gallery.image}
                  alt={`${gallery.title} photography by J.N. Silva`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <p className="text-[#C8C0B4]/60 text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-mono)] mb-2">
                    {gallery.subtitle}
                  </p>
                  <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#F5F0E8] font-light group-hover:text-[#C8C0B4] transition-colors duration-300">
                    {gallery.title}
                  </h2>
                  <p className="text-[#F5F0E8]/30 text-xs font-[family-name:var(--font-mono)] mt-3 tracking-wider">
                    {gallery.count} photographs
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-8 right-8 text-[#F5F0E8]/0 group-hover:text-[#C8C0B4]/60 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
