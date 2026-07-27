'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Moon, Sun, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'La TB au Sénégal', href: '/tb-senegal' },
  { label: "L'Association", href: '/association' },
  { label: 'Activités', href: '/activites' },
  { label: 'Galerie', href: '/galerie' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/';
      return pathname.startsWith(href);
    },
    [pathname]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] h-20 transition-all duration-500 ${
        isScrolled ? 'header-glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-5 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/img/logo-officiel.jpg"
            alt="R-N-ASLUT Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white/30 group-hover:border-rn-red transition-all duration-300 group-hover:scale-105 shadow-md"
          />
          <div className="flex flex-col leading-tight">
            <span className={`font-heading font-bold text-sm sm:text-base transition-colors duration-300 ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}>
              R<span className="text-rn-red">-</span>N<span className="text-rn-red">-</span>ASLUT
            </span>
            <span className={`text-[10px] sm:text-xs transition-colors duration-300 ${
              isScrolled ? 'text-rn-gray' : 'text-white/70'
            }`}>
              Lutte contre la TB au Sénégal
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            const isContact = link.href === '/contact';
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${active ? 'nav-active' : ''} ${isContact ? '!text-white hover:!text-white' : ''} ${
                  !isScrolled && !active && !isContact ? 'text-white/90 hover:text-white' : ''
                } ${
                  isScrolled && !active && !isContact ? 'text-foreground/70 hover:text-foreground' : ''
                } px-3 xl:px-3.5 py-2 text-[13px] font-medium rounded-lg transition-colors duration-300 ${
                  isContact
                    ? 'gradient-main !rounded-full px-5 ml-2 shadow-red hover:scale-[1.03] transition-transform duration-300'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Basculer le thème"
              className={`rounded-full transition-colors duration-300 ${
                !isScrolled ? 'text-white/80 hover:text-white hover:bg-white/10' : ''
              }`}
            >
              {theme === 'dark' ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </Button>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden rounded-full transition-colors duration-300 ${
                  !isScrolled ? 'text-white/80 hover:text-white hover:bg-white/10' : ''
                }`}
                aria-label="Menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 pt-8 border-l-border/50">
              <SheetHeader className="mb-8">
                <div className="flex items-center gap-3">
                  <img
                    src="/img/logo-officiel.jpg"
                    alt="R-N-ASLUT Logo"
                    className="w-10 h-10 rounded-full object-cover border-2 border-rn-red/20"
                  />
                  <SheetTitle className="text-left font-heading text-lg">
                    R<span className="text-rn-red">-</span>N<span className="text-rn-red">-</span>ASLUT
                  </SheetTitle>
                </div>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-2" aria-label="Navigation mobile">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  const isContact = link.href === '/contact';
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        active
                          ? 'bg-rn-red/10 text-rn-red font-semibold'
                          : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                      } ${
                        isContact
                          ? 'gradient-main text-white text-center mt-3 !rounded-xl font-semibold'
                          : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
