import GalleryPage from '@/components/GalleryPage';
import { peopleImages } from '@/data/galleries';
import JsonLd from '@/components/JsonLd';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'People Photography',
  description: 'Portrait, editorial, and fashion photography exploring identity, style, and human connection.',
  alternates: { canonical: '/photography/people' },
  openGraph: {
    title: 'People Photography — J.N. Silva',
    description: 'Portrait and editorial photography exploring identity and human connection.',
    url: '/photography/people',
  },
};

export default function PeoplePage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'People Photography — J.N. Silva',
        description: 'Portrait, editorial, and fashion photography exploring identity and human connection.',
        url: 'https://jnsilva.com/photography/people',
        creator: { '@type': 'Person', name: 'J.N. Silva', url: 'https://jnsilva.com' },
      }} />
      <GalleryPage
        title="People"
        subtitle="Portraits, editorial work, and intimate moments of human connection."
        images={peopleImages}
      />
    </>
  );
}
