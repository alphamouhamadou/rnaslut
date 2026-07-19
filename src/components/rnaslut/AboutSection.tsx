import {
  Activity,
  Pill,
  BarChart3,
  Target,
  type LucideIcon,
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface InfoCard {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const INFO_CARDS: InfoCard[] = [
  {
    icon: Activity,
    title: 'Transmission',
    description:
      'La tuberculose se transmet par voie aérienne lorsqu\'une personne infectée tousse ou éternue. Un seul patient peut infecter 10 à 15 personnes par an.',
    gradient: 'bg-gradient-to-br from-rn-red to-rn-red/70',
  },
  {
    icon: Pill,
    title: 'Traitement',
    description:
      'Un traitement de 6 mois est disponible et gratuit au Sénégal. L\'observance thérapeutique est essentielle pour éviter les formes résistantes.',
    gradient: 'bg-gradient-to-br from-rn-orange to-rn-orange/70',
  },
  {
    icon: BarChart3,
    title: 'Prévalence',
    description:
      'Le Sénégal enregistre environ 12 000 nouveaux cas de tuberculose chaque année, avec une incidence de 71 pour 100 000 habitants.',
    gradient: 'bg-gradient-to-br from-rn-teal to-rn-teal/70',
  },
  {
    icon: Target,
    title: 'Objectif 2035',
    description:
      'L\'OMS vise une réduction de 95% des décès et de 90% de l\'incidence de la TB d\'ici 2035 par rapport à 2015.',
    gradient: 'bg-gradient-to-br from-rn-blue to-rn-blue/70',
  },
];

export default function AboutSection() {
  return (
    <section
      id="tb-senegal"
      className="bg-rn-bg-light dark:bg-rn-dark-soft py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column - Text */}
          <RevealOnScroll>
            <div className="space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                La Tuberculose au Sénégal
              </h2>

              <p className="text-rn-gray leading-relaxed">
                La tuberculose reste l&apos;une des maladies infectieuses les plus meurtrières au
                Sénégal, malgré les progrès réalisés ces deux dernières décennies. Le pays
                fait face à des défis majeurs liés au diagnostic tardif, à la co-infection
                TB/VIH et à l&apos;émergence de souches résistantes aux traitements.
              </p>

              <p className="text-rn-gray leading-relaxed">
                Les populations les plus vulnérables — personnes vivant dans la précarité,
                détenus, diabétiques — sont les plus touchées. C&apos;est pourquoi le
                RN-ASLUT intervient à travers tout le territoire sénégalais pour renforcer
                la lutte communautaire contre cette maladie.
              </p>

              <div className="border-l-4 border-rn-yellow bg-rn-yellow/10 rounded-r-lg p-5">
                <p className="text-sm font-semibold text-rn-dark dark:text-white">
                  La tuberculose est la 13<sup>e</sup> cause de mortalité dans le monde et
                  la première cause de décès par maladie infectieuse, devant le VIH/SIDA.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right column - Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INFO_CARDS.map((card, i) => (
              <RevealOnScroll key={card.title}>
                <div className="bg-background rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow h-full border border-border/50">
                  <div
                    className={`w-12 h-12 ${card.gradient} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <card.icon className="size-6 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-rn-gray leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}