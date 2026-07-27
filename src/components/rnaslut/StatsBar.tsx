'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

interface StatsBarProps {
  stats: Stat[];
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [started, value]);

  return (
    <span ref={ref} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold bg-gradient-to-r from-rn-yellow to-rn-orange bg-clip-text text-transparent">
      {display.toLocaleString('fr-FR')}{suffix}
    </span>
  );
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-rn-dark-soft rounded-2xl sm:rounded-3xl shadow-xl dark:shadow-2xl border border-border/50 p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="stat-card text-center relative group"
              >
                {i < stats.length - 1 && i % 2 !== 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border/60" />
                )}
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                <p className="text-rn-gray dark:text-white/50 text-xs sm:text-sm mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
