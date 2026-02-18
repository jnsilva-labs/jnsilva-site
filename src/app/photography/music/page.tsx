import GalleryPage from '@/components/GalleryPage';
import { musicImages } from '@/data/galleries';

export const metadata = {
  title: 'Music Photography — J.N. Silva',
  description: 'Live music photography from concerts, festivals, and studio sessions.',
};

export default function MusicPage() {
  return (
    <GalleryPage
      title="Music"
      subtitle="Concerts, festivals, and the energy of live performance captured through light and motion."
      images={musicImages}
    />
  );
}
