import GalleryPage from '@/components/GalleryPage';
import { placesImages } from '@/data/galleries';

export const metadata = {
  title: 'Places Photography — J.N. Silva',
  description: 'Landscape and travel photography from Guatemala, Kenya, Yellowstone, and beyond.',
};

export default function PlacesPage() {
  return (
    <GalleryPage
      title="Places"
      subtitle="Landscapes, travel, and the quiet grandeur of the natural world."
      images={placesImages}
    />
  );
}
