import { db } from '@/lib/db';
import HeroSection from '@/components/rnaslut/HeroSection';
import StatsBar from '@/components/rnaslut/StatsBar';
import PresidentSection from '@/components/rnaslut/PresidentSection';
import PresentationSection from '@/components/rnaslut/PresentationSection';
import ResultsSection from '@/components/rnaslut/ResultsSection';
import PartnersSection from '@/components/rnaslut/PartnersSection';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const stats = await db.siteStat.findMany({ orderBy: { order: 'asc' } });
  const partners = await db.partner.findMany({ orderBy: { order: 'asc' } });

  const statsData = stats.map((s) => ({
    label: s.label,
    value: parseInt(s.value, 10),
    suffix: s.suffix,
  }));

  return (
    <>
      <HeroSection />
      <StatsBar stats={statsData} />
      <PresidentSection />
      <PresentationSection />
      <ResultsSection />
      <PartnersSection partners={partners} />
    </>
  );
}
