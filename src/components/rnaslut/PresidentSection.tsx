import RevealOnScroll from './RevealOnScroll';
import { Quote } from 'lucide-react';

export default function PresidentSection() {
  return (
    <section className="py-16 md:py-24 bg-rn-bg-light dark:bg-rn-dark-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <RevealOnScroll className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs sm:text-sm font-semibold text-rn-red uppercase tracking-[0.2em] mb-3">
            Témoignage
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Mot du <span className="text-rn-red">Président</span>
          </h2>
        </RevealOnScroll>

        {/* Card */}
        <RevealOnScroll>
          <div className="relative bg-white dark:bg-rn-dark rounded-3xl shadow-xl dark:shadow-2xl overflow-hidden">
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 gradient-main" />

            <div className="p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                {/* Photo column */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className="relative">
                    {/* Decorative rings */}
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-rn-red/20 to-rn-orange/20" aria-hidden="true" />
                    <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-rn-red/40 to-rn-orange/40" aria-hidden="true" />
                    <img
                      src="/img/president.jpg"
                      alt="Photo du Président du R-N-ASLUT"
                      className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full object-cover border-4 border-white dark:border-rn-dark shadow-lg"
                    />
                  </div>
                  <div className="mt-5 text-center">
                    <h3 className="font-heading font-bold text-foreground text-lg">
                      Adama Niang
                    </h3>
                    <p className="text-rn-red font-semibold text-sm mt-0.5">
                      Président du RN ASLUT
                    </p>
                    <div className="mt-3 w-10 h-0.5 gradient-main rounded-full mx-auto" />
                  </div>
                </div>

                {/* Text column */}
                <div className="flex-1 relative">
                  {/* Large quote mark */}
                  <Quote className="absolute -top-2 -left-1 sm:-top-4 sm:-left-2 w-10 h-10 sm:w-14 sm:h-14 text-rn-red/10 dark:text-rn-red/15" aria-hidden="true" />

                  <div className="relative">
                    <blockquote className="text-foreground/80 dark:text-white/80 text-base sm:text-lg leading-relaxed sm:leading-loose italic">
                      <p className="mb-5">
                        La lutte contre la tuberculose au Sénégal est plus qu&apos;un combat sanitaire — c&apos;est un engagement profond envers nos communautés, les plus vulnérables. Depuis 2005, notre réseau n&apos;a cessé de grandir, porté par la conviction qu&apos;ensemble, nous pouvons faire reculer cette maladie.
                      </p>
                      <p className="mb-5">
                        Chaque cas détecté à temps est une vie sauvée. Chaque relais communautaire formé est un maillon supplémentaire dans notre chaîne de solidarité. Notre force réside dans cette mobilisation citoyenne qui transcende les frontières régionales.
                      </p>
                      <p>
                        Je lance un appel à toutes les bonnes volontés, partenaires techniques et financiers, autorités sanitaires, société civile, à se joindre à nous pour construire un Sénégal libre de la tuberculose. Ensemble, rien n&apos;est impossible.
                      </p>
                    </blockquote>

                    {/* Signature line */}
                    <div className="mt-8 flex items-center gap-4">
                      <div className="h-px flex-1 bg-border" />
                      <p className="text-xs sm:text-sm text-rn-gray dark:text-white/40 font-medium tracking-wide">
                        Président du R-N-ASLUT
                      </p>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
