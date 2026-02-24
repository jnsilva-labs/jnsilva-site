import type { Metadata } from 'next';
import PageContent from './PageContent';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Digital Art',
  description: 'NFT and blockchain-native art across Sotheby\'s, Nifty Gateway, SuperRare, and Foundation. First photographer on Nifty Gateway.',
  alternates: { canonical: '/digital-art' },
  openGraph: {
    title: 'Digital Art — J.N. Silva',
    description: 'NFT and blockchain-native art across Sotheby\'s, Nifty Gateway, SuperRare, and Foundation.',
    url: '/digital-art',
  },
};

export default function DigitalArtPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Digital Art — J.N. Silva',
        description: 'NFT and blockchain-native art across Sotheby\'s, Nifty Gateway, SuperRare, and Foundation.',
        url: 'https://jnsilva.com/digital-art',
        creator: { '@type': 'Person', name: 'J.N. Silva', url: 'https://jnsilva.com' },
      }} />
      <PageContent />
    </>
  );
}
