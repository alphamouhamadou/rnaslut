'use client';

import { useState, useEffect } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);

    const timer = setTimeout(() => {
      setHidden(true);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${hidden ? 'hidden' : ''}`}>
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <img
            src="/img/logo-officiel.jpg"
            alt="R-N-ASLUT Logo"
            className="w-24 h-24 rounded-full object-cover shadow-2xl border-4 border-white/20"
          />
          <div className="absolute -inset-2 rounded-full border-2 border-rn-red/30" style={{ animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }} />
        </div>
        <div className="text-center">
          <h2 className="text-white font-heading text-2xl font-bold tracking-wide">
            R<span className="text-rn-red">-</span>N<span className="text-rn-red">-</span>ASLUT
          </h2>
          <p className="text-white/40 text-xs mt-1 tracking-[0.2em] uppercase">Réseau National de Lutte contre la TB</p>
        </div>
        <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full gradient-main"
            style={{ width: `${progress}%`, transition: 'width 0.15s linear' }}
          />
        </div>
      </div>
    </div>
  );
}
