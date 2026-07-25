import Preloader from '@/components/rnaslut/Preloader';
import Header from '@/components/rnaslut/Header';
import Footer from '@/components/rnaslut/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Preloader />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}