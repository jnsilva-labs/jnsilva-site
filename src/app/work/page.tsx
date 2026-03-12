import type { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Photography',
  description: 'A decade of photography — music, street, portrait, aerial, and fine art. From Coachella to the streets of NYC.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Photography — J.N. Silva',
    description: 'A decade of photography — music, street, portrait, aerial, and fine art.',
    url: '/work',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Photography — J.N. Silva',
  description: 'A decade of photography — music, street, portrait, aerial, and fine art.',
  url: 'https://jnsilva.com/work',
  author: {
    '@type': 'Person',
    name: 'J.N. Silva',
    url: 'https://jnsilva.com',
  },
};

export default function WorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageContent />
    </>
  );
}
