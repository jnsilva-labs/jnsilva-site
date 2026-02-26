import type { Metadata } from 'next';
import PageContent from './PageContent';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'NEA — Short Film',
  description:
    'NEA is a short film proposing "Nearrealismo Mágico" — a fusion of Italian Neorealism and Latin American Magical Realism. World premiered at Tribeca 2024. Macondo Award nominee. Executive produced by J.N. Silva.',
  alternates: { canonical: '/nea' },
  openGraph: {
    title: 'NEA — Short Film | J.N. Silva',
    description:
      'A Tribeca 2024 premiere. Winner of Best International Short Film at NewFilmmakers LA. Nominated for Colombia\'s Macondo Award.',
    url: '/nea',
  },
};

export default function NeaPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Movie',
          name: 'NEA',
          description:
            'A short film proposing "Nearrealismo Mágico" — a fusion of Italian Neorealism and Latin American Magical Realism. Set in Medellín, Colombia.',
          url: 'https://jnsilva.com/nea',
          dateCreated: '2024',
          duration: 'PT23M',
          contentRating: 'PG-13',
          inLanguage: 'es',
          countryOfOrigin: {
            '@type': 'Country',
            name: 'Colombia',
          },
          director: [
            { '@type': 'Person', name: 'Alex Ulises' },
            { '@type': 'Person', name: 'Nelson G. Navarrete' },
          ],
          producer: [
            { '@type': 'Person', name: 'J.N. Silva', url: 'https://jnsilva.com' },
            { '@type': 'Person', name: 'Jesús Peña' },
            { '@type': 'Person', name: 'Astrid Cordero' },
            { '@type': 'Person', name: 'Johanna Ipial Troncos' },
          ],
          productionCompany: {
            '@type': 'Organization',
            name: 'Códigos, LLC',
          },
          actor: {
            '@type': 'Person',
            name: 'Julián Sánchez Jiménez',
          },
          sameAs: [
            'https://www.imdb.com/title/tt29218083/',
            'https://www.youtube.com/buscandoamerica',
            'https://www.instagram.com/buscandoam3rica',
          ],
        }}
      />
      <PageContent />
    </>
  );
}
