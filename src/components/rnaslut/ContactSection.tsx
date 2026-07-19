'use client';

import { useState, type FormEvent } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Dakar, Sénégal',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+221 (à compléter)',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@rn-aslut.sn',
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lundi – Vendredi · 9h – 17h',
  },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Le nom est requis.';
    }

    if (!form.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = "L'adresse email est invalide.";
    }

    if (!form.message.trim()) {
      newErrors.message = 'Le message est requis.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Erreur serveur');

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rn-red/40 focus:border-rn-red transition-colors';

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <RevealOnScroll className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Contactez-<span className="text-rn-red">nous</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Une question, une suggestion ou envie de nous rejoindre ?
            N&apos;hésitez pas à nous écrire.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left column – Contact info */}
          <RevealOnScroll>
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-6">
                  Informations de contact
                </h3>
                <div className="flex flex-col gap-5">
                  {CONTACT_INFO.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.label} className="flex items-start gap-4">
                        <div className="gradient-main w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                            {info.label}
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social links */}
              <div>
                <h4 className="font-heading font-semibold text-sm text-foreground mb-4">
                  Suivez-nous
                </h4>
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-rn-red hover:border-rn-red/30 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <Icon className="w-4.5 h-4.5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right column – Form */}
          <RevealOnScroll>
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-foreground mb-1.5">
                    Nom complet <span className="text-rn-red">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Votre nom"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className={`${inputBase} ${errors.name ? 'border-rn-red focus:ring-rn-red' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rn-red mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-foreground mb-1.5">
                    Email <span className="text-rn-red">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className={`${inputBase} ${errors.email ? 'border-rn-red focus:ring-rn-red' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rn-red mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-foreground mb-1.5">
                  Sujet
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Objet de votre message"
                  value={form.subject}
                  onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  className={inputBase}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-foreground mb-1.5">
                  Message <span className="text-rn-red">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Écrivez votre message ici..."
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className={`${inputBase} resize-none ${errors.message ? 'border-rn-red focus:ring-rn-red' : ''}`}
                />
                {errors.message && (
                  <p className="text-xs text-rn-red mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="gradient-main w-full flex items-center justify-center gap-2 text-white font-semibold text-sm px-6 py-3.5 rounded-xl hover:opacity-90 disabled:opacity-60 transition-all duration-300 cursor-pointer"
              >
                <Send className="w-4.5 h-4.5" />
                {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {/* Feedback messages */}
              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  Message envoyé avec succès ! Nous vous répondrons rapidement.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-rn-red bg-rn-red/5 border border-rn-red/20 rounded-xl px-4 py-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  Une erreur est survenue. Veuillez réessayer plus tard.
                </div>
              )}
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}