import { db } from '@/lib/db';
import BlogSection from '@/components/rnaslut/BlogSection';

export const dynamic = 'force-dynamic';

export default async function ActualitesPage() {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  const serialized = posts.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="pt-20">
      <BlogSection posts={serialized} />
    </div>
  );
}
