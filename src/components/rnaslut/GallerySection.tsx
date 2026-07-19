'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

interface GallerySectionProps {
  items: GalleryItem[];
}

const CATEGORIES = ['Toutes', 'Sensibilisation', 'Formation', 'Partenaires'] as const;

export default function GallerySection({ items }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>('Toutes');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  const visibleItems = activeFilter === 'Toutes'
    ? items
    : items.filter((item) => item.category === activeFilter);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goNext = useCallback(() => {
    if (visibleItems.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % visibleItems.length);
  }, [visibleItems.length]);

  const goPrev = useCallback(() => {
    if (visibleItems.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + visibleItems.length) % visibleItems.length);
  }, [visibleItems.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  const currentItem = visibleItems[lightboxIndex];

  return (
    <section id="galerie" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Notre <span className="text-rn-red">Galerie</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Découvrez nos activités sur le terrain à travers nos photos.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? 'gradient-main text-white shadow-sm'
                  : 'border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map((item, i) => {
            const isHidden = activeFilter !== 'Toutes' && item.category !== activeFilter;
            const visibleIndex = items
              .filter((it, idx) => idx <= i && (activeFilter === 'Toutes' || it.category === activeFilter))
              .length - 1;

            return (
              <div
                key={item.id}
                className={`aspect-[4/3] rounded-2xl overflow-hidden relative cursor-pointer group ${
                  isHidden ? 'hidden' : ''
                }`}
                onClick={() => !isHidden && openLightbox(visibleIndex >= 0 ? visibleIndex : 0)}
                role="button"
                tabIndex={isHidden ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isHidden) openLightbox(visibleIndex >= 0 ? visibleIndex : 0);
                }}
                aria-label={item.title}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <Maximize2 className="w-7 h-7 text-white" />
                  <span className="text-white text-sm font-medium px-3 text-center">
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox */}
        {lightboxOpen && currentItem && (
          <div
            ref={overlayRef}
            className="lightbox-overlay fixed inset-0 bg-black/92 z-[2000] flex items-center justify-center"
            onClick={(e) => {
              if (e.target === overlayRef.current) closeLightbox();
            }}
            role="dialog"
            aria-modal="true"
            aria-label={currentItem.title}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Prev button */}
            {visibleItems.length > 1 && (
              <button
                onClick={goPrev}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Image container */}
            <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="max-w-full max-h-[78vh] object-contain rounded-lg"
              />
              <p className="text-white/95 text-sm sm:text-base mt-3 text-center font-medium">
                {currentItem.title}
              </p>
              <p className="text-white/60 text-xs mt-1">
                {lightboxIndex + 1} / {visibleItems.length}
              </p>
            </div>

            {/* Next button */}
            {visibleItems.length > 1 && (
              <button
                onClick={goNext}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Suivant"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}