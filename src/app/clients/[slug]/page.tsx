import { getClientBySlug, getAllSlugs, clients } from '@/data/clients';
import ClientPortfolio from '@/components/ClientPortfolio';
import JsonLd from '@/components/JsonLd';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const client = getClientBySlug(slug);
  if (!client) return {};
  return {
    title: `${client.name}`,
    description: `Photography and creative direction for ${client.name} by J.N. Silva.`,
    alternates: { canonical: `/clients/${slug}` },
    openGraph: {
      title: `${client.name} — J.N. Silva`,
      description: `Photography and creative direction for ${client.name}.`,
      url: `/clients/${slug}`,
      images: [{ url: client.coverImage, alt: `${client.name} — photography by J.N. Silva` }],
    },
  };
}

export default async function ClientPage({ params }: PageProps) {
  const { slug } = await params;
  const client = getClientBySlug(slug);
  if (!client) notFound();

  const idx = clients.indexOf(client);
  const prev = idx > 0 ? clients[idx - 1] : null;
  const next = idx < clients.length - 1 ? clients[idx + 1] : null;

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: `${client.name} — Photography by J.N. Silva`,
        creator: {
          '@type': 'Person',
          name: 'J.N. Silva',
          url: 'https://jnsilva.com',
        },
        image: `https://jnsilva.com${client.coverImage}`,
        url: `https://jnsilva.com/clients/${slug}`,
        genre: 'Photography',
      }} />
      <ClientPortfolio client={client} prevClient={prev} nextClient={next} />
    </>
  );
}
