import type { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Buscando America',
  description: 'A Web3 fiction film built by Latino filmmakers. 2,500 NFT photographs documenting Medellín\'s idiosyncrasy.',
  alternates: { canonical: '/buscando-america' },
  openGraph: {
    title: 'Buscando America — J.N. Silva',
    description: 'A Web3 fiction film built by Latino filmmakers. 2,500 NFT photographs documenting Medellín.',
    url: '/buscando-america',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Movie',
  name: 'Buscando America',
  description: 'A Web3 fiction film built by Latino filmmakers. 2,500 NFT photographs documenting Medellín.',
  url: 'https://jnsilva.com/buscando-america',
  director: {
    '@type': 'Person',
    name: 'J.N. Silva',
    url: 'https://jnsilva.com',
  },
};

export default function BuscandoAmericaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageContent />
    </>
  );
}
