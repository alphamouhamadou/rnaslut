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
  const sorted = [...partners].sort((a, b) => a.order - b.order);

  return (
    <section id="partenaires" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <RevealOnScroll className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Nos <span className="text-rn-red">Partenaires</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nous collaborons avec des acteurs de référence pour renforcer
            notre impact dans la lutte contre la tuberculose.
          </p>
        </RevealOnScroll>

        {/* Partners grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {sorted.map((partner) => (
            <RevealOnScroll key={partner.id}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card border border-border rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center gap-3 group hover:-translate-y-1.5 hover:shadow-md hover:border-rn-red/25 transition-all duration-300"
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
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}