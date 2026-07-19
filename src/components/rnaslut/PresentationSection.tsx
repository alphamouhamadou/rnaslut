import { CheckCircle2 } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const SPECIFIC_OBJECTIVES = [
  'Sensibiliser les populations sur la tuberculose, ses modes de transmission et les moyens de prévention.',
  'Former des relais communautaires capables d\'orienter les personnes présentant des symptômes évocateurs vers les structures de santé.',
  'Contribuer au dépistage précoce de la tuberculose en milieu communautaire.',
  'Accompagner les patients tuberculeux tout au long de leur traitement pour assurer l\'observance thérapeutique.',
  'Plaider auprès des autorités sanitaires pour le renforcement des politiques de lutte antituberculeuse.',
  'Développer des partenariats avec les organisations nationales et internationales.',
];

export default function PresentationSection() {
  return (
    <section id="association" className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left - Image + text */}
          <RevealOnScroll>
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/img/image4.jpeg"
                  alt="Équipe RN-ASLUT en action"
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-rn-dark/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-md">
                  Depuis 2005 · Dakar
                </span>
              </div>

              <p className="text-rn-gray leading-relaxed">
                Le Réseau National des Associations de Lutte contre la Tuberculose (RN-ASLUT)
                a été créé en 2005 pour fédérer les efforts des associations communautaires
                de lutte contre la TB au Sénégal. Il regroupe aujourd&apos;hui des associations
                actives dans les 14 régions du pays.
              </p>
            </div>
          </RevealOnScroll>

          {/* Right - Objectives card */}
          <RevealOnScroll>
            <div className="gradient-dark rounded-2xl p-6 sm:p-8 text-white h-full flex flex-col">
              <h3 className="font-heading text-xl font-bold mb-6 text-rn-yellow">
                Nos Objectifs
              </h3>

              <div className="mb-6">
                <h4 className="font-semibold text-white/90 mb-2 text-sm uppercase tracking-wider">
                  Objectif général
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Contribuer à la réduction de la morbidité et de la mortalité liées à la
                  tuberculose au Sénégal à travers l&apos;engagement communautaire.
                </p>
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-white/90 mb-3 text-sm uppercase tracking-wider">
                  Objectifs spécifiques
                </h4>
                <ul className="space-y-3">
                  {SPECIFIC_OBJECTIVES.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                      <CheckCircle2 className="size-4 text-rn-yellow mt-0.5 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-white/50 leading-relaxed">
                  Le RN-ASLUT compte des membres actifs dans les 14 régions du Sénégal,
                  intervenant aussi bien en milieu urbain que rural à travers un réseau
                  dense de relais communautaires.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}