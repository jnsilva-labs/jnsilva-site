import type { Metadata } from 'next';
import PageContent from './PageContent';
import JsonLd from '@/components/JsonLd';
import { fetchSubstackPosts } from '@/lib/substack';

export const metadata: Metadata = {
  title: 'About',
  description: 'Venezuelan-born photographer, filmmaker, and creative director based in New York City. Featured in TIME, Vogue, NY Times. Sold at Sotheby\'s.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About J.N. Silva',
    description: 'Venezuelan-born photographer, filmmaker, and creative director based in New York City.',
    url: '/about',
  },
};

export default async function AboutPage() {
  const substackPosts = await fetchSubstackPosts('josensilva', 3);

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'J.N. Silva',
        alternateName: 'JN Silva',
        url: 'https://jnsilva.com',
        image: 'https://jnsilva.com/images/portrait/8x10_IG_JNSILVA.png',
        jobTitle: ['Photographer', 'Filmmaker', 'Creative Director'],
        description: 'Venezuelan-born photographer, filmmaker, and creative director based in NYC.',
        birthPlace: { '@type': 'Place', name: 'Venezuela' },
        workLocation: { '@type': 'Place', name: 'New York City, NY' },
        alumniOf: { '@type': 'EducationalOrganization', name: 'Rutgers University' },
        sameAs: [
          'https://instagram.com/jnsilva',
          'https://x.com/JNSilva_',
          'https://tiktok.com/@jnsilva',
          'https://substack.com/@josensilva',
          'https://superrare.com/jnsilva',
        ],
      }} />
      <PageContent substackPosts={substackPosts} />
    </>
  );
}
