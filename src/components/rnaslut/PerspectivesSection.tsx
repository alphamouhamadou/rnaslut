import { Bus, Pill, GraduationCap, UserCheck, Star, Globe, type LucideIcon } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface PerspectiveItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

const ICON_MAP: Record<string, LucideIcon> = {
  'fas fa-bus': Bus,
  'fas fa-pills': Pill,
  'fas fa-school': GraduationCap,
  'fas fa-female': UserCheck,
  'fas fa-star': Star,
  'fas fa-globe': Globe,
};

const DEFAULT_ICON = Globe;

interface PerspectivesSectionProps {
  perspectives: PerspectiveItem[];
}

export default function PerspectivesSection({ perspectives }: PerspectivesSectionProps) {
  if (!perspectives || perspectives.length === 0) return null;

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
            {perspectives.map((item) => {
              const Icon = ICON_MAP[item.icon] || DEFAULT_ICON;
              return (
                <RevealOnScroll key={item.id}>
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