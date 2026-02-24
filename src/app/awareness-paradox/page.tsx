import type { Metadata } from 'next';
import PageContent from './PageContent';

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

export default function AwarenessParadoxPage() {
  return <PageContent />;
}
