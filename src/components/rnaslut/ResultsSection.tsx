'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Users,
  MapPin,
  UserCheck,
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
  type LucideIcon,
  Quote,
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface ResultStat {
  icon: LucideIcon;
  gradient: string;
  value: number;
  suffix?: string;
  label: string;
}

const RESULT_STATS: ResultStat[] = [
  {
    icon: Users,
    gradient: 'bg-gradient-to-br from-rn-red to-rn-orange',
    value: 250,
    label: 'Membres actifs',
  },
  {
    icon: MapPin,
    gradient: 'bg-gradient-to-br from-rn-orange to-rn-yellow',
    value: 14,
    label: 'Régions couvertes',
  },
  {
    icon: UserCheck,
    gradient: 'bg-gradient-to-br from-rn-yellow to-rn-teal',
    value: 1500,
    suffix: '+',
    label: 'Personnes sensibilisées',
  },
  {
    icon: Stethoscope,
    gradient: 'bg-gradient-to-br from-rn-teal to-rn-blue',
    value: 272,
    label: 'Cas orientés',
  },
  {
    icon: ShieldCheck,
    gradient: 'bg-gradient-to-br from-rn-blue to-rn-red',
    value: 53,
    label: 'Cas positifs confirmés',
  },
  {
    icon: CheckCircle2,
    gradient: 'bg-gradient-to-br from-rn-red to-rn-teal',
    value: 1,
    label: 'Vigilance-Transport validée',
  },
];

function AnimatedCounter({
  value,
  suffix = '',
  started,
}: {
  value: number;
  suffix?: string;
  started: boolean;
}) {
  const [display, setDisplay] = useState(0);

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

  const formatted =
    value === 1
      ? '✓'
      : `${display.toLocaleString('fr-FR')}${suffix}`;

  return (
    <span className="text-3xl sm:text-4xl font-heading font-bold text-rn-yellow">
      {formatted}
    </span>
  );
}

export default function ResultsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  return (
    <section className="gradient-dark py-16 md:py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        className="text-center mb-12 reveal visible"
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Nos Résultats
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Des chiffres qui témoignent de l&apos;engagement quotidien du réseau
            pour la lutte contre la tuberculose au Sénégal.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESULT_STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/6 backdrop-blur-md border border-white/12 rounded-xl p-6 flex items-center gap-5 reveal visible"
            >
              <div
                className={`w-14 h-14 ${stat.gradient} rounded-xl flex items-center justify-center shrink-0`}
              >
                <stat.icon className="size-6 text-white" />
              </div>
              <div>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  started={started}
                />
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote callout */}
        <RevealOnScroll>
          <div className="mt-12 border-l-4 border-rn-yellow bg-white/5 backdrop-blur-sm rounded-r-xl p-6 md:p-8 flex items-start gap-4">
            <Quote className="size-6 text-rn-yellow shrink-0 mt-1" />
            <p className="text-white/70 leading-relaxed italic">
              Chaque cas détecté est une vie sauvée. Chaque sensibilisation est un
              pas de plus vers un Sénégal sans tuberculose. Notre force réside dans
              l&apos;engagement de nos membres et la confiance des communautés que nous servons.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
