'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LandingAnimation() {
  const [showLanding, setShowLanding] = useState(true);
  const [stripes, setStripes] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setStripes(
      Array.from({ length: 8 }, () =>
        Array.from({ length: 20 }, () => (Math.random() > 0.5 ? '1' : '0')).join(' ')
      )
    );
  }, []);

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 2000);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowLanding(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Lock scroll while landing shows
  useEffect(() => {
    document.body.style.overflow = showLanding ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLanding]);

  return (
    <AnimatePresence>
      {showLanding && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--background)]"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Binary rain strips */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.07]" aria-hidden="true">
            {stripes.map((content, i) => (
              <motion.div
                key={i}
                className="absolute top-0 font-mono text-sm whitespace-nowrap"
                style={{ left: `${(i + 1) * 12}%` }}
                initial={{ y: '-100%' }}
                animate={{ y: '100vh' }}
                transition={{
                  duration: 1.5 + i * 0.2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {content}
              </motion.div>
            ))}
          </div>

          {/* Name reveal */}
          <div className="relative text-center">
            <motion.div
              className="font-mono text-sm text-[var(--accent-secondary)] mb-4 tracking-[0.4em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Initializing portfolio
            </motion.div>

            <motion.h1
              className="font-display text-5xl md:text-7xl font-extrabold tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[var(--foreground)]">Tayyab</span>{' '}
              <span className="glow-text">Ali</span>
            </motion.h1>

            <motion.div
              className="mt-6 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.span
                className="block h-0.5 w-16 bg-[var(--accent)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
              />
              <span className="font-mono text-xs text-[var(--text-muted)]">v2.0</span>
            </motion.div>
          </div>

          {/* Progress counter */}
          <div className="absolute bottom-8 right-8 text-right">
            <div className="font-mono text-5xl font-bold md:text-6xl glow-text">
              {progress}%
            </div>
            <div className="mono mt-1 text-xs text-[var(--text-muted)] uppercase tracking-[0.3em]">
              Loading
            </div>
          </div>

          {/* Bottom progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-[var(--accent)]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
