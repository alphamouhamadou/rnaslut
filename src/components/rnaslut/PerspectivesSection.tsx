import { Bus, Pill, GraduationCap, UserCheck, Star, Globe } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const PERSPECTIVES = [
  {
    icon: Bus,
    title: 'Vigilance-Transport',
    description:
      'Renforcer la surveillance de la tuberculose dans les gares routières et les points de transport à haut risque de transmission.',
  },
  {
    icon: Pill,
    title: 'Implication communautaire',
    description:
      'Mobiliser les communautés locales pour une prise en charge précoce des cas de tuberculose et un meilleur suivi des traitements.',
  },
  {
    icon: GraduationCap,
    title: 'Écoles & Daaras',
    description:
      "Intégrer les programmes de sensibilisation contre la TB dans les écoles et les daaras pour toucher les jeunes publics.",
  },
  {
    icon: UserCheck,
    title: 'Médiatrices TB',
    description:
      'Former et déployer des médiatrices de santé communautaire spécialisées dans la détection et l\'accompagnement des patients tuberculeux.',
  },
  {
    icon: Star,
    title: 'Ambassadeurs & Partenaires',
    description:
      "Développer un réseau d'ambassadeurs et renforcer les partenariats avec les institutions de santé publiques et privées.",
  },
  {
    icon: Globe,
    title: 'Visibilité & Renforcement',
    description:
      "Augmenter la visibilité de l'association et renforcer ses capacités organisationnelles pour une action durable à l'échelle nationale.",
  },
];

export default function PerspectivesSection() {
  return (
    <section id="perspectives" className="py-20 bg-background">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Nos <span className="text-rn-red">Perspectives</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Les axes stratégiques que nous nous fixons pour renforcer la lutte
            contre la tuberculose au Sénégal.
          </p>
        </RevealOnScroll>

        <div className="relative pl-8 sm:pl-10">
          {/* Vertical gradient line */}
          <div
            className="timeline-line absolute left-[6px] sm:left-[7px] top-2 bottom-2 w-[3px] rounded-full"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-6">
            {PERSPECTIVES.map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealOnScroll key={item.title}>
                  <div className="relative flex items-start gap-5 group">
                    {/* Timeline dot */}
                    <div className="absolute -left-8 sm:-left-10 top-6 flex items-center justify-center">
                      <div className="w-[22px] h-[22px] rounded-full border-4 border-rn-red bg-background group-hover:bg-rn-red transition-colors duration-300" />
                    </div>

                    {/* Card */}
                    <div className="bg-card rounded-2xl border border-border shadow-sm p-5 sm:p-6 flex items-start gap-4 flex-1 group-hover:translate-x-1.5 transition-transform duration-300">
                      <div className="gradient-main w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-foreground text-base sm:text-lg mb-1">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}