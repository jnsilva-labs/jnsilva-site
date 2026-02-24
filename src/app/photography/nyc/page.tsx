import type { Metadata } from 'next';
import GalleryPage from '@/components/GalleryPage';
import { nycImages } from '@/data/galleries';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'NYC Street Photography',
  description: 'New York City street photography — fog, steam, reflections, aerial views, and the rhythm of urban life.',
  alternates: { canonical: '/photography/nyc' },
  openGraph: {
    title: 'NYC Street Photography — J.N. Silva',
    description: 'New York City street photography — fog, light, and urban rhythm.',
    url: '/photography/nyc',
  },
};

export default function NYCPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'NYC Street Photography — J.N. Silva',
        description: 'New York City street photography — fog, steam, reflections, and urban rhythm.',
        url: 'https://jnsilva.com/photography/nyc',
        creator: { '@type': 'Person', name: 'J.N. Silva', url: 'https://jnsilva.com' },
      }} />
      <GalleryPage
        title="New York City"
        subtitle="Street photography from the city that never sleeps. Fog, steam, reflections, and light."
        images={nycImages}
      />
    </>
  );
}
