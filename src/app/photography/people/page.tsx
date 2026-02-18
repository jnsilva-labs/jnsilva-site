import GalleryPage from '@/components/GalleryPage';
import { peopleImages } from '@/data/galleries';

export const metadata = {
  title: 'People Photography — J.N. Silva',
  description: 'Portrait and editorial photography exploring identity and human connection.',
};

export default function PeoplePage() {
  return (
    <GalleryPage
      title="People"
      subtitle="Portraits, editorial work, and intimate moments of human connection."
      images={peopleImages}
    />
  );
}
