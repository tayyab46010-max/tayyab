'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { pulseThemeTransition } from '@/lib/theme-transition';

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

const ACCENT_COLORS: Record<string, { color: string; secondary: string }> = {
  emerald: { color: '#14B8A6', secondary: '#047857' },
  cyan: { color: '#06B6D4', secondary: '#0891B2' },
  blue: { color: '#3A86EF', secondary: '#2563EB' },
  violet: { color: '#8B5CF6', secondary: '#7C3AED' },
  amber: { color: '#F59E0B', secondary: '#D97706' },
  rose: { color: '#F43F5E', secondary: '#E11D48' },
};

function updateFaviconForTheme(isDark: boolean) {
  const accent = document.documentElement.getAttribute('data-accent') || 'emerald';
  const colors = ACCENT_COLORS[accent] || ACCENT_COLORS.emerald;
  const bgColor = isDark ? '#111827' : '#F8F9FA';
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect fill="${bgColor}" width="64" height="64" rx="14"/>
    <polyline points="18,20 32,32 18,44" fill="none" stroke="${colors.color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="34" y="41" width="14" height="5" rx="2.5" fill="${colors.secondary}"/>
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

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (resolvedTheme) {
      updateFaviconForTheme(resolvedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (mounted && resolvedTheme) {
      updateFaviconForTheme(resolvedTheme === 'dark');
    }
  }, [resolvedTheme, mounted]);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!mounted) return;
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const doc = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    pulseThemeTransition(900);

    if (!doc.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
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
            duration: 850,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => undefined);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="btn btn-secondary !p-2"
        aria-label="Toggle theme"
        disabled
      >
        <span className="size-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      className="btn btn-secondary !p-2 group relative overflow-hidden"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      data-cursor="true"
      data-cursor-text="Mode"
    >
      <span className="relative block size-5">
        <Sun
          className={`absolute inset-0 size-5 text-[var(--accent)] transition-all duration-850 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
          aria-hidden="true"
        />
        <Moon
          className={`absolute inset-0 size-5 text-[var(--accent)] transition-all duration-850 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
