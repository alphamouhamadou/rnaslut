'use client';

import { useState, useEffect } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
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
      <div className="flex flex-col items-center gap-6">
        <img
          src="/img/logo-officiel.jpg"
          alt="RN-ASLUT Logo"
          className="w-20 h-20 rounded-full object-cover shadow-lg"
        />
        <span className="text-white font-heading text-xl font-bold tracking-wide">
          RN-ASLUT
        </span>
        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full gradient-main transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}