import type { Metadata } from 'next';
import GalleryPage from '@/components/GalleryPage';
import { musicImages } from '@/data/galleries';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Music Photography',
  description: 'Live music and concert photography — Tool, Kendrick Lamar, Tame Impala, Coachella, Governors Ball, and more.',
  alternates: { canonical: '/photography/music' },
  openGraph: {
    title: 'Music Photography — J.N. Silva',
    description: 'Live music and concert photography from festivals and tours.',
    url: '/photography/music',
  },
};

export default function MusicPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'Music Photography — J.N. Silva',
        description: 'Live music and concert photography from festivals and tours.',
        url: 'https://jnsilva.com/photography/music',
        creator: { '@type': 'Person', name: 'J.N. Silva', url: 'https://jnsilva.com' },
      }} />
      <GalleryPage
        title="Music"
        subtitle="Concerts, festivals, and the energy of live performance captured through light and motion."
        images={musicImages}
      />
    </>
  );
}
