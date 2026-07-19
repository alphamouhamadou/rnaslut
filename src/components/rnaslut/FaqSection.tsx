'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface FaqSectionProps {
  items: FaqItem[];
}

export default function FaqSection({ items }: FaqSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Questions <span className="text-rn-red">Fréquentes</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Retrouvez les réponses aux questions les plus posées sur la
            tuberculose et nos actions.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {sortedItems.map((item) => {
            const isActive = activeId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? 'border-rn-red shadow-sm overflow-hidden'
                    : 'border-border bg-card'
                }`}
              >
                {/* Question button */}
                <button
                  onClick={() => toggle(item.id)}
                  className={`w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer transition-colors duration-300 ${
                    isActive ? 'bg-rn-red' : 'bg-card'
                  }`}
                  aria-expanded={isActive}
                >
                  <span
                    className={`font-heading font-semibold text-sm sm:text-base pr-4 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-foreground hover:text-rn-red'
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-white"
                    style={{
                      transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    <Plus className="w-4 h-4 text-rn-red" />
                  </span>
                </button>

                {/* Answer */}
                <div
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isActive ? '500px' : '0px',
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <div className="bg-rn-red text-white px-5 sm:px-6 pb-5 sm:pb-6 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}