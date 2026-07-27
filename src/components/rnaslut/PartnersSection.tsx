'use client';

import { useEffect, useRef } from 'react';
import RevealOnScroll from './RevealOnScroll';

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url: string;
  order: number;
}

interface PartnersSectionProps {
  partners: Partner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const sorted = [...partners].sort((a, b) => a.order - b.order);
  const doubled = [...sorted, ...sorted]; // duplicate for seamless loop

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || sorted.length === 0) return;

    let animId: number;
    let pos = 0;

    const step = () => {
      pos += 0.5;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      animId = requestAnimationFrame(step);
    };

    el.style.overflowX = 'auto';
    el.style.scrollbarWidth = 'none';
    animId = requestAnimationFrame(step);

    // pause on hover
    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(step); };

    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
    };
  }, [sorted.length]);

  return (
    <section id="partenaires" className="py-20 bg-muted overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Nos <span className="text-rn-red">Partenaires</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nous collaborons avec des acteurs de référence pour renforcer
            notre impact dans la lutte contre la tuberculose.
          </p>
        </RevealOnScroll>
      </div>

      {/* Horizontal scrolling row */}
      <div
        ref={scrollRef}
        className="flex gap-5 sm:gap-6 px-4"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {doubled.map((partner, i) => (
          <a
            key={`${partner.id}-${i}`}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-40 sm:w-48 bg-card border border-border rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center gap-3 group hover:-translate-y-1.5 hover:shadow-md hover:border-rn-red/25 transition-all duration-300"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 sm:h-14 w-auto object-contain grayscale group-hover:grayscale-0 group-hover:scale-108 transition-all duration-300"
              loading="lazy"
            />
            <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
              {partner.name}
            </span>
          </a>
        ))}
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted to-transparent" />
    </section>
  );
}
