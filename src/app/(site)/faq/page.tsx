import { db } from '@/lib/db';
import FaqSection from '@/components/rnaslut/FaqSection';

export const dynamic = 'force-dynamic';

export default async function FaqPage() {
  const faqs = await db.faqItem.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="pt-20">
      <FaqSection items={faqs} />
    </div>
  );
}
