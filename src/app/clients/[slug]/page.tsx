import { getClientBySlug, getAllSlugs, clients } from '@/data/clients';
import ClientPortfolio from '@/components/ClientPortfolio';
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
    title: `${client.name} — J.N. Silva`,
    description: `Photography and creative direction for ${client.name}`,
  };
}

export default async function ClientPage({ params }: PageProps) {
  const { slug } = await params;
  const client = getClientBySlug(slug);
  if (!client) notFound();

  const idx = clients.indexOf(client);
  const prev = idx > 0 ? clients[idx - 1] : null;
  const next = idx < clients.length - 1 ? clients[idx + 1] : null;

  return <ClientPortfolio client={client} prevClient={prev} nextClient={next} />;
}
