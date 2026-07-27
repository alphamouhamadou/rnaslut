'use client';

import { Heart, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 hero-animate-image">
        <img
          src="/img/image4.jpg"
          alt="Lutte contre la tuberculose au Sénégal"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <div className="hero-animate-badge">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full border border-white/20 shadow-lg">
            <Heart className="size-4 text-rn-yellow" />
            Ensemble contre la tuberculose depuis 2005
          </span>
        </div>

        <h1 className="hero-animate-title font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.1] mt-8 mb-6">
          La Lutte contre la{' '}
          <span className="hero-highlight">Tuberculose</span>
        </h1>

        <p className="hero-animate-desc text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-light" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
          Le R-N-ASLUT mobilise les communautés au Sénégal pour la prévention,
          le dépistage et l&apos;accompagnement des personnes touchées par la tuberculose.
        </p>

        <div className="hero-animate-btns flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/association"
            className="group gradient-main text-white font-semibold text-sm sm:text-base px-8 sm:px-10 py-4 rounded-full shadow-red hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 inline-flex items-center gap-2.5"
          >
            Découvrir l&apos;association
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
          <Link
            href="/contact"
            className="group border-2 border-white/50 backdrop-blur-sm text-white font-semibold text-sm sm:text-base px-8 sm:px-10 py-4 rounded-full hover:bg-white/15 hover:border-white/70 transition-all duration-300 inline-flex items-center gap-2.5"
          >
            Nous soutenir
            <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Link>
        </div>
      </div>

      <Link
        href="/tb-senegal"
        className="hero-animate-scroll absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        aria-label="Découvrir"
      >
        <span className="text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase">Découvrir</span>
        <ArrowDown className="w-5 h-5" style={{ animation: 'bounce 2s infinite' }} />
      </Link>
    </section>
  );
}
