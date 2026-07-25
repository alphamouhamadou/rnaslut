import { db } from '@/lib/db';
import PresentationSection from '@/components/rnaslut/PresentationSection';
import ResultsSection from '@/components/rnaslut/ResultsSection';
import PerspectivesSection from '@/components/rnaslut/PerspectivesSection';
import PartnersSection from '@/components/rnaslut/PartnersSection';
import CtaSection from '@/components/rnaslut/CtaSection';

export const dynamic = 'force-dynamic';

export default async function AssociationPage() {
  const [perspectives, partners] = await Promise.all([
    db.perspective.findMany({ orderBy: { order: 'asc' } }),
    db.partner.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <div className="pt-20">
      <PresentationSection />
      <ResultsSection />
      <PerspectivesSection perspectives={perspectives} />
      <PartnersSection partners={partners} />
      <CtaSection />
    </div>
  );
}