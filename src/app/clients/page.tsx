import type { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Clients',
  description: 'Photography and creative direction for Nike, Sony, Spotify, Samsung, American Express, and 20+ global brands.',
  alternates: { canonical: '/clients' },
  openGraph: {
    title: 'Clients — J.N. Silva',
    description: 'Photography and creative direction for Nike, Sony, Spotify, Samsung, and 20+ global brands.',
    url: '/clients',
  },
};

export default function ClientsPage() {
  return <PageContent />;
}
