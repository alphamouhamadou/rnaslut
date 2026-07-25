import { db } from '@/lib/db';
import ActivitiesSection from '@/components/rnaslut/ActivitiesSection';

export const dynamic = 'force-dynamic';

export default async function ActivitesPage() {
  const activities = await db.activity.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="pt-20">
      <ActivitiesSection activities={activities} />
    </div>
  );
}