import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'La TB', href: '#tb-senegal' },
  { label: "L'Association", href: '#association' },
  { label: 'Activités', href: '#activites' },
  { label: 'Galerie', href: '#galerie' },
];

const ASSOCIATION_LINKS = [
  { label: 'Actualités', href: '#actualites' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Perspectives', href: '#perspectives' },
  { label: 'Nous rejoindre', href: '#contact' },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rn-dark text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-8 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-4">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/img/logo-officiel.jpg"
                alt="RN-ASLUT Logo"
                className="w-11 h-11 rounded-full object-cover border-2 border-white/20"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-bold text-base text-white">
                  RN-ASLUT
                </span>
                <span className="text-xs text-white/50">
                  Lutte contre la TB au Sénégal
                </span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5 max-w-xs">
              Réseau National d&apos;Appui à la Lutte contre la Tuberculose.
              Depuis 2005, nous agissons pour un Sénégal sans tuberculose.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-rn-red flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-rn-orange transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Association column */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-5">
              L&apos;Association
            </h4>
            <ul className="flex flex-col gap-2.5">
              {ASSOCIATION_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-rn-orange transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-5">
              Contact
            </h4>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rn-orange mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">Dakar, Sénégal</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-rn-orange mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">contact@rn-aslut.sn</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-rn-orange mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">+221 (à compléter)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40 text-center sm:text-left">
            © {currentYear} RN-ASLUT. Tous droits réservés.
          </p>
          <p className="text-xs text-white/30">
            Lutte contre la Tuberculose au Sénégal depuis 2005
          </p>
          <a
            href="/admin/login"
            className="text-xs text-white/20 hover:text-white/50 transition-colors"
          >
            Administration
          </a>
        </div>
      </div>
    </footer>
  );
}