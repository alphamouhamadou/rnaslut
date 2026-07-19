'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
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
  { label: 'Accueil', href: '#accueil' },
  { label: 'La TB au Sénégal', href: '#tb-senegal' },
  { label: "L'Association", href: '#association' },
  { label: 'Activités', href: '#activites' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Actualités', href: '#actualites' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] h-20 transition-shadow duration-300 ${
        scrolled
          ? 'shadow-lg bg-background/80 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#accueil"
          onClick={(e) => {
            e.preventDefault();
            handleNav('#accueil');
          }}
          className="flex items-center gap-3 group"
        >
          <img
            src="/img/logo-officiel.jpg"
            alt="RN-ASLUT Logo"
            className="w-11 h-11 rounded-full object-cover border-2 border-rn-red/30 group-hover:border-rn-red transition-colors"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-heading font-bold text-base text-foreground">
              RN-ASLUT
            </span>
            <span className="text-xs text-rn-gray hidden sm:block">
              Lutte contre la TB au Sénégal
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNav(link.href);
              }}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-rn-red ${
                link.href === '#contact' ? 'gradient-main text-white hover:opacity-90' : 'text-foreground/80'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Basculer le thème"
            >
              {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button>
          )}

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-10">
              <SheetHeader>
                <SheetTitle className="text-left font-heading text-lg">
                  RN-ASLUT
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Navigation mobile">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.href);
                    }}
                    className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                      link.href === '#contact'
                        ? 'gradient-main text-white text-center mt-2'
                        : 'text-foreground/80 hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}