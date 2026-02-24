import GalleryPage from '@/components/GalleryPage';
import { placesImages } from '@/data/galleries';
import JsonLd from '@/components/JsonLd';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Places Photography',
  description: 'Landscape and travel photography from Guatemala, Kenya, Yellowstone, Qatar, Japan, Greece, and beyond.',
  alternates: { canonical: '/photography/places' },
  openGraph: {
    title: 'Places Photography — J.N. Silva',
    description: 'Landscape and travel photography from Guatemala, Kenya, Yellowstone, and beyond.',
    url: '/photography/places',
  },
};

export default function PlacesPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'Places Photography — J.N. Silva',
        description: 'Landscape and travel photography from Guatemala, Kenya, Yellowstone, and beyond.',
        url: 'https://jnsilva.com/photography/places',
        creator: { '@type': 'Person', name: 'J.N. Silva', url: 'https://jnsilva.com' },
      }} />
      <GalleryPage
        title="Places"
        subtitle="Landscapes, travel, and the quiet grandeur of the natural world."
        images={placesImages}
      />
    </>
  );
}
