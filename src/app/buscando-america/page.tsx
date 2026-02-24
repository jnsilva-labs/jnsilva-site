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

export default function BuscandoAmericaPage() {
  return <PageContent />;
}
