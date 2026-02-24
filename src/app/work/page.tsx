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

export default function WorkPage() {
  return <PageContent />;
}
