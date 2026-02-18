import GalleryPage from '@/components/GalleryPage';
import { nycImages } from '@/data/galleries';

export const metadata = {
  title: 'NYC Street Photography — J.N. Silva',
  description: 'New York City street photography — fog, light, and urban rhythm.',
};

export default function NYCPage() {
  return (
    <GalleryPage
      title="New York City"
      subtitle="Street photography from the city that never sleeps. Fog, steam, reflections, and light."
      images={nycImages}
    />
  );
}
