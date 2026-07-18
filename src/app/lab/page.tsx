import type { Metadata } from 'next';
import PageContent from './PageContent';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'The Lab',
  description:
    'Developer work by J.N. Silva — generative art systems, on-chain visualizations, AI tools for creatives, games, and client sites. Code as a medium.',
  alternates: { canonical: '/lab' },
  openGraph: {
    title: 'The Lab — J.N. Silva',
    description:
      'Generative art systems, on-chain visualizations, AI tools for creatives, games, and client sites.',
    url: '/lab',
  },
};

export default function LabPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'The Lab — Developer Work by J.N. Silva',
          url: 'https://jnsilva.com/lab',
          creator: { '@type': 'Person', name: 'J.N. Silva', url: 'https://jnsilva.com' },
          description:
            'Generative art systems, on-chain visualizations, AI tools for creatives, games, and client sites.',
        }}
      />
      <PageContent />
    </>
  );
}
