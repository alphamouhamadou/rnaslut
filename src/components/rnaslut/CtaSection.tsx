import { Heart } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative py-20 gradient-main overflow-hidden">
      {/* Decorative circles */}
      <div
        className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full bg-white/8"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-40px] left-[-40px] w-56 h-56 rounded-full bg-white/6"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
          Ensemble, éliminons la tuberculose
        </h2>
        <p className="text-white/95 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Chaque contribution compte. Rejoignez notre combat pour un Sénégal
          sans tuberculose. Votre soutien permet de sauver des vies et de
          renforcer les communautés.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2.5 bg-white text-rn-red font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full hover:bg-white/90 hover:shadow-lg transition-all duration-300"
        >
          <Heart className="w-5 h-5" />
          Faire un don / Devenir membre
        </a>
      </div>
    </section>
  );
}