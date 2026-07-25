import { db } from '@/lib/db';
import GallerySection from '@/components/rnaslut/GallerySection';

export const dynamic = 'force-dynamic';

export default async function GaleriePage() {
  const gallery = await db.galleryItem.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="pt-20">
      <GallerySection items={gallery} />
    </div>
  );
}
