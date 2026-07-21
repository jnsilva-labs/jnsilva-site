import type { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Catalogue',
  description: 'The complete photographic record — a decade of music, street, portrait, aerial, and fine art photography. From Coachella to the streets of NYC.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Catalogue — J.N. Silva',
    description: 'The complete photographic record — music, street, portrait, aerial, and fine art.',
    url: '/work',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Catalogue — J.N. Silva',
  description: 'The complete photographic record — music, street, portrait, aerial, and fine art.',
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
