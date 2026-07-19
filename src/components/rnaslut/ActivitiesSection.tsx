import { Globe, Bus, School, type LucideIcon } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface ActivityCard {
  title: string;
  description: string;
  image?: string;
  badge?: string;
  icon?: LucideIcon;
  useGradient?: boolean;
}

const ACTIVITIES: ActivityCard[] = [
  {
    title: 'Sensibilisation',
    description:
      'Campagnes de sensibilisation dans les communautés pour informer sur les symptômes de la TB et l\'importance du dépistage précoce.',
    image: '/img/image2.jpg',
    badge: 'Communauté',
  },
  {
    title: 'Formation relais',
    description:
      'Formation de relais communautaires capables d\'identifier les cas suspects et d\'orienter les patients vers les centres de santé.',
    image: '/img/image5.jpeg',
    badge: 'Formation',
  },
  {
    title: 'Détection & accompagnement',
    description:
      'Dépistage actif en milieu communautaire et accompagnement des patients tout au long de leur parcours thérapeutique.',
    image: '/img/image6.jpeg',
    badge: 'Dépistage',
  },
  {
    title: 'Plaidoyer',
    description:
      'Actions de plaidoyer auprès des décideurs politiques et des partenaires techniques et financiers pour le renforcement de la lutte anti-TB.',
    icon: Globe,
    useGradient: true,
  },
  {
    title: 'Vigilance-Transport',
    description:
      'Système de vigilance dans les gares routières et les moyens de transport pour détecter les cas suspects de tuberculose.',
    icon: Bus,
    useGradient: true,
  },
  {
    title: 'Causeries écoles',
    description:
      'Sessions éducatives dans les établissements scolaires pour sensibiliser les jeunes à la prévention de la tuberculose.',
    icon: School,
    useGradient: true,
  },
];

export default function ActivitiesSection() {
  return (
    <section id="activites" className="bg-rn-bg-light dark:bg-rn-dark-soft py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos Activités
            </h2>
            <p className="text-rn-gray max-w-2xl mx-auto">
              Le RN-ASLUT déploie des actions diversifiées à travers le Sénégal
              pour lutter efficacement contre la tuberculose.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.map((activity) => (
            <RevealOnScroll key={activity.title}>
              <div className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col border border-border/50">
                {activity.image ? (
                  <div className="relative h-48">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                    {activity.badge && (
                      <span className="absolute top-3 left-3 bg-rn-dark/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                        {activity.badge}
                      </span>
                    )}
                  </div>
                ) : activity.useGradient && activity.icon ? (
                  <div className="gradient-main h-48 flex items-center justify-center relative">
                    <activity.icon className="size-16 text-white/30" />
                    {activity.badge && (
                      <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                        {activity.badge}
                      </span>
                    )}
                  </div>
                ) : null}

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-rn-gray leading-relaxed flex-1">
                    {activity.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}