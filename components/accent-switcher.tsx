'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { pulseThemeTransition } from '@/lib/theme-transition';

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

const ACCENTS = [
  { id: 'emerald', label: 'Emerald', color: '#14B8A6', secondary: '#047857' },
  { id: 'cyan', label: 'Cyan', color: '#06B6D4', secondary: '#0891B2' },
  { id: 'blue', label: 'Blue', color: '#3A86EF', secondary: '#2563EB' },
  { id: 'violet', label: 'Violet', color: '#8B5CF6', secondary: '#7C3AED' },
  { id: 'amber', label: 'Amber', color: '#F59E0B', secondary: '#D97706' },
  { id: 'rose', label: 'Rose', color: '#F43F5E', secondary: '#E11D48' },
] as const;

function updateFavicon(accentColor: string, secondaryColor: string) {
  const isDark = document.documentElement.classList.contains('dark');
  const bgColor = isDark ? '#111827' : '#F8F9FA';
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect fill="${bgColor}" width="64" height="64" rx="14"/>
    <polyline points="18,20 32,32 18,44" fill="none" stroke="${accentColor}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="34" y="41" width="14" height="5" rx="2.5" fill="${secondaryColor}"/>
  </svg>`;
  
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
}

type AccentId = (typeof ACCENTS)[number]['id'];

export function AccentSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<AccentId>('emerald');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('accent') as AccentId | null;
      const id = stored && ACCENTS.some((a) => a.id === stored) ? stored : 'emerald';
      setActive(id);
      document.documentElement.setAttribute('data-accent', id);
      const accent = ACCENTS.find(a => a.id === id);
      if (accent) updateFavicon(accent.color, accent.secondary);
    } catch {
      // localStorage unavailable (iframe/security restrictions)
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const select = (id: AccentId, e: React.MouseEvent<HTMLButtonElement>) => {
    if (id === active) {
      setOpen(false);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const doc = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    pulseThemeTransition(820);

    if (!doc.startViewTransition || reduceMotion) {
      setActive(id);
      document.documentElement.setAttribute('data-accent', id);
      const accent = ACCENTS.find(a => a.id === id);
      if (accent) updateFavicon(accent.color, accent.secondary);
      try { localStorage.setItem('accent', id); } catch {}
      setOpen(false);
      return;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        setActive(id);
        setOpen(false);
      });
      document.documentElement.setAttribute('data-accent', id);
      const accent = ACCENTS.find(a => a.id === id);
      if (accent) updateFavicon(accent.color, accent.secondary);
      try { localStorage.setItem('accent', id); } catch {}
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 820,
            easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => undefined);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="btn btn-secondary !p-2"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Change accent color"
        data-cursor="true"
        data-cursor-text="Color"
      >
        <Palette
          className={`size-5 text-[var(--accent)] transition-transform duration-700 ${
            open ? 'rotate-12 scale-110' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="glass-card absolute right-0 top-12 z-50 flex gap-2 p-3"
            role="menu"
            aria-label="Accent colors"
          >
            {ACCENTS.map((accent, i) => (
              <motion.button
                key={accent.id}
                type="button"
                role="menuitemradio"
                aria-checked={active === accent.id}
                title={accent.label}
                onClick={(e) => select(accent.id, e)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.035, type: 'spring', stiffness: 500, damping: 24 }}
                className={`size-6 rounded-full border-2 transition-transform hover:scale-125 ${
                  active === accent.id
                    ? 'scale-110 border-[var(--foreground)]'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: accent.color }}
              >
                <span className="sr-only">{accent.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
