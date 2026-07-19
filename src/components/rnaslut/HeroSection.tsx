'use client';

import { Heart, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToAbout = () => {
    const el = document.querySelector('#tb-senegal');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/img/image4.jpeg"
          alt="Lutte contre la tuberculose au Sénégal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
          <Heart className="size-4 text-rn-yellow" />
          Ensemble contre la tuberculose depuis 2005
        </span>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          La Lutte contre la{' '}
          <span className="hero-highlight">Tuberculose</span>
        </h1>

        <p className="text-white/85 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Le RN-ASLUT mobilise les communautés au Sénégal pour la prévention,
          le dépistage et l&apos;accompagnement des personnes touchées par la tuberculose.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#association"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#association')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="gradient-main text-white font-semibold px-8 py-3.5 rounded-lg shadow-red hover:shadow-xl transition-shadow inline-flex items-center gap-2"
          >
            Découvrir l&apos;association
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="border-2 border-white/60 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center gap-2"
          >
            Nous soutenir
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        aria-label="Défiler vers le bas"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Découvrir</span>
        <div className="relative w-6 h-10 rounded-full border-2 border-current flex items-start justify-center pt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
        </div>
      </button>
    </section>
  );
}