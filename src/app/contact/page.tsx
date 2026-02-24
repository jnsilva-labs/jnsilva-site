import type { Metadata } from 'next';
import PageContent from './PageContent';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with J.N. Silva for photography, film, creative direction, NFT commissions, and collaborations. Based in New York City.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — J.N. Silva',
    description: 'Get in touch for photography, film, creative direction, and collaborations.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact J.N. Silva',
        description: 'Get in touch for photography, film, and creative direction.',
        url: 'https://jnsilva.com/contact',
      }} />
      <PageContent />
    </>
  );
}
