'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const PAGE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Projects',
  '/certificates': 'Certificates',
  '/skills': 'Skills',
  '/resume': 'Resume',
  '/contact': 'Contact',
  '/card': 'Business Card',
  '/legal': 'Legal',
  '/privacy': 'Privacy',
};

const PROGRESS_MS = 600;
const HIDE_AT_MS = 800;

export function PageStarter() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  const sectionLabel = PAGE_LABELS[pathname] ?? PAGE_LABELS['/' + (pathname.split('/')[1] || '')] ?? 'Portfolio';
  const overlayVisible = show;

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / PROGRESS_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const timer = setTimeout(() => setShow(false), HIDE_AT_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = overlayVisible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [overlayVisible]);

  return (
    <AnimatePresence>
      {overlayVisible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--background)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
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

          {/* Page name reveal */}
          <div className="relative text-center px-6">
            <motion.div
              className="font-mono text-xs text-[var(--accent-secondary)] mb-3 tracking-[0.4em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
            >
              Initializing
            </motion.div>
            <motion.h1
              className="font-display text-4xl md:text-6xl font-extrabold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[var(--foreground)]">{sectionLabel}</span>
            </motion.h1>
          </div>

          {/* Progress counter */}
          <div className="absolute bottom-8 right-8 text-right">
            <div className="font-mono text-4xl font-bold md:text-5xl glow-text">
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
            transition={{ duration: PROGRESS_MS / 1000, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
