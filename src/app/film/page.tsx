import type { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Film & Motion',
  description: 'Cinematic direction and filmmaking — documentaries, music videos, and brand campaigns for Nike, Sony, and Samsung.',
  alternates: { canonical: '/film' },
  openGraph: {
    title: 'Film & Motion — J.N. Silva',
    description: 'Cinematic direction and filmmaking — documentaries, music videos, and brand campaigns.',
    url: '/film',
  },
};

export default function FilmPage() {
  return <PageContent />;
}
