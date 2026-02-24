import type { Metadata } from 'next';
import PageContent from './PageContent';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Fractal Art',
  description: 'Sacred geometry and fractal mathematics transformed into digital art. Kinesthesia sold at Sotheby\'s for £90,000.',
  alternates: { canonical: '/fractals' },
  openGraph: {
    title: 'Fractal Art — J.N. Silva',
    description: 'Sacred geometry and fractal mathematics transformed into digital art.',
    url: '/fractals',
  },
};

export default function FractalsPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'VisualArtwork',
        name: 'Kinesthesia',
        creator: { '@type': 'Person', name: 'J.N. Silva', url: 'https://jnsilva.com' },
        artMedium: 'Digital Art / Fractal Mathematics',
        artform: 'NFT',
        description: 'Sacred geometry and fractal mathematics projected onto dancers. Sold at Sotheby\'s for \u00A390,000.',
        url: 'https://jnsilva.com/fractals',
        image: 'https://jnsilva.com/images/fractals/Kinesthesia.JPG',
      }} />
      <PageContent />
    </>
  );
}
