import RevealOnScroll from './RevealOnScroll';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  image: string;
  order: number;
  active: boolean;
}

interface ActivitiesSectionProps {
  activities: ActivityItem[];
}

export default function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  if (!activities || activities.length === 0) return null;

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
          {activities.map((activity) => (
            <RevealOnScroll key={activity.id}>
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
                ) : (
                  <div className="gradient-main h-48 flex items-center justify-center relative">
                    <i className={`${activity.icon} size-16 text-white/30`} />
                    {activity.badge && (
                      <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                        {activity.badge}
                      </span>
                    )}
                  </div>
                )}

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