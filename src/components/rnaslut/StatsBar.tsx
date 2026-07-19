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
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [started, value]);

  return (
    <span ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-rn-yellow">
      {display.toLocaleString('fr-FR')}{suffix}
    </span>
  );
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="gradient-dark py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center reveal">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-white/60 text-sm mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}