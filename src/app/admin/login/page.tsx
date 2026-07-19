'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Email ou mot de passe incorrect.');
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rn-dark to-rn-dark-soft p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <img src="/img/logo-officiel.jpg" alt="RN-ASLUT" className="w-12 h-12 rounded-full object-cover" />
            <div className="text-left">
              <div className="text-white font-heading text-xl font-bold">RN-ASLUT</div>
              <div className="text-rn-gray-light text-xs">Panneau d&apos;administration</div>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Connexion</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Accédez au panneau de gestion du contenu
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@rn-aslut.sn"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg gradient-main text-white font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connexion...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-rn-gray-light text-xs mt-6">
          © {new Date().getFullYear()} RN-ASLUT — Administration
        </p>
      </div>
    </div>
  );
}