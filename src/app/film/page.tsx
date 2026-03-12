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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Film & Motion — J.N. Silva',
  description: 'Cinematic direction and filmmaking — documentaries, music videos, and brand campaigns.',
  url: 'https://jnsilva.com/film',
  author: {
    '@type': 'Person',
    name: 'J.N. Silva',
    url: 'https://jnsilva.com',
  },
};

export default function FilmPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageContent />
    </>
  );
}
