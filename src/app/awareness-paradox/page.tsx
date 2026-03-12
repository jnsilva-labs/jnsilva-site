import type { Metadata } from 'next';
import PageContent from './PageContent';
import { fetchSubstackPosts } from '@/lib/substack';

export const metadata: Metadata = {
  title: 'Awareness Paradox',
  description: 'Exploring Hermetic philosophy, perception, and consciousness through visual storytelling and contemplative practice.',
  alternates: { canonical: '/awareness-paradox' },
  openGraph: {
    title: 'Awareness Paradox — J.N. Silva',
    description: 'Exploring Hermetic philosophy, perception, and consciousness through visual storytelling.',
    url: '/awareness-paradox',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Awareness Paradox — J.N. Silva',
  description: 'Exploring Hermetic philosophy, perception, and consciousness through visual storytelling.',
  url: 'https://jnsilva.com/awareness-paradox',
  author: {
    '@type': 'Person',
    name: 'J.N. Silva',
    url: 'https://jnsilva.com',
  },
};

export default async function AwarenessParadoxPage() {
  const substackPosts = await fetchSubstackPosts('awarenessparadox', 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageContent substackPosts={substackPosts} />
    </>
  );
}
