'use client';

import { Heart, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 hero-animate-image">
        <img
          src="/img/image4.jpg"
          alt="Lutte contre la tuberculose au Sénégal"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center">
        {/* Badge */}
        

        {/* Title */}
        <h1 className="hero-animate-title font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.1] mt-6 sm:mt-8 mb-4 sm:mb-6">
          La Lutte contre la{' '}
          <span className="hero-highlight">Tuberculose</span>
        </h1>

        {/* Description with backdrop */}
        <div className="hero-animate-desc">
          <div className="inline-block bg-black/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl px-5 sm:px-8 py-4 sm:py-5 mb-8 sm:mb-12">
            <p className="text-white/95 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Le RN ASLUT mobilise les communautés au Sénégal pour la prévention,
              le dépistage et l&apos;accompagnement des personnes touchées par la tuberculose.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="hero-animate-btns flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/association"
            className="group gradient-main text-white font-semibold text-sm sm:text-base px-7 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-red hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 inline-flex items-center gap-2.5 w-full sm:w-auto justify-center"
          >
            Découvrir 
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
         
        </div>
      </div>

      {/* Scroll indicator */}
      
    </section>
  );
}
