import { db } from '@/lib/db';
import Preloader from '@/components/rnaslut/Preloader';
import Header from '@/components/rnaslut/Header';
import HeroSection from '@/components/rnaslut/HeroSection';
import StatsBar from '@/components/rnaslut/StatsBar';
import AboutSection from '@/components/rnaslut/AboutSection';
import PresentationSection from '@/components/rnaslut/PresentationSection';
import ActivitiesSection from '@/components/rnaslut/ActivitiesSection';
import GallerySection from '@/components/rnaslut/GallerySection';
import ResultsSection from '@/components/rnaslut/ResultsSection';
import PerspectivesSection from '@/components/rnaslut/PerspectivesSection';
import BlogSection from '@/components/rnaslut/BlogSection';
import FaqSection from '@/components/rnaslut/FaqSection';
import PartnersSection from '@/components/rnaslut/PartnersSection';
import CtaSection from '@/components/rnaslut/CtaSection';
import ContactSection from '@/components/rnaslut/ContactSection';
import Footer from '@/components/rnaslut/Footer';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [stats, posts, faqs, gallery, partners] = await Promise.all([
    db.siteStat.findMany({ orderBy: { order: 'asc' } }),
    db.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } }),
    db.faqItem.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    db.galleryItem.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    db.partner.findMany({ orderBy: { order: 'asc' } }),
  ]);

  const statsData = stats.map((s) => ({
    label: s.label,
    value: parseInt(s.value, 10),
    suffix: s.suffix,
  }));

  return (
    <>
      <Preloader />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsBar stats={statsData} />
        <AboutSection />
        <PresentationSection />
        <ActivitiesSection />
        <GallerySection items={gallery} />
        <ResultsSection />
        <PerspectivesSection />
        <BlogSection posts={posts} />
        <FaqSection items={faqs} />
        <PartnersSection partners={partners} />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}