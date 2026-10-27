'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  CreditCard,
  FileText,
  FolderGit2,
  Home,
  Mail,
  Menu,
  Scale,
  Wrench,
  X,
} from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { AccentSwitcher } from './accent-switcher';
import { clsx } from 'clsx';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home, description: 'Introduction & highlights' },
  { href: '/certificates', label: 'Certificates', icon: Award, description: 'Verified credentials' },
  { href: '/projects', label: 'Projects', icon: FolderGit2, description: 'Shipped work & case studies' },
  { href: '/skills', label: 'Skills', icon: Wrench, description: 'Tools & capabilities' },
  { href: '/resume', label: 'Resume', icon: FileText, description: 'Experience & education' },
  { href: '/contact', label: 'Contact', icon: Mail, description: 'Start a conversation' },
  { href: '/card', label: 'Business Card', icon: CreditCard, description: 'Digital contact card' },
  { href: '/legal', label: 'Legal', icon: Scale, description: 'Copyright & terms' },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const desktopPanelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const currentPage = NAV_ITEMS.find(
    (item) => item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
  );

  useEffect(() => {
    setMobileOpen(false);
    setDesktopOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        toggleRef.current?.contains(target)
      ) {
        return;
      }
      setMobileOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!desktopOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDesktopOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (desktopPanelRef.current?.contains(target)) {
        return;
      }
      setDesktopOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [desktopOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/60 backdrop-blur-2xl">
        <nav
          className="container-wide flex h-16 items-center justify-between"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="font-display text-lg font-extrabold tracking-tight text-[var(--foreground)] no-underline transition-colors hover:text-[var(--accent)]"
            data-cursor="true"
            data-cursor-text="Home"
          >
            Tayyab<span className="text-[var(--accent)]">.</span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <div className="relative">
              <button
                type="button"
                className="group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-[var(--glass-bg)]"
                onClick={() => setDesktopOpen(!desktopOpen)}
                aria-expanded={desktopOpen}
                aria-label="Page navigation"
              >
                <span className="text-[var(--text-secondary)] group-hover:text-[var(--foreground)]">
                  {currentPage?.label || 'Pages'}
                </span>
                <motion.svg
                  animate={{ rotate: desktopOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="size-4 text-[var(--text-muted)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {desktopOpen && (
                  <motion.div
                    ref={desktopPanelRef}
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="nav-panel absolute right-0 top-full mt-2 w-80 p-3"
                    role="menu"
                  >
                    <div className="mb-2 flex items-center justify-between px-2">
                      <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                        Browse pages
                      </span>
                      <span className="live-dot" aria-hidden="true" />
                    </div>
                    <div className="nav-page-grid">
                      {NAV_ITEMS.map((item, index) => {
                        const isActive =
                          item.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(item.href);
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.03 + index * 0.03, duration: 0.25 }}
                          >
                            <Link
                              href={item.href}
                              className="nav-page-card"
                              data-active={isActive}
                              role="menuitem"
                              aria-current={isActive ? 'page' : undefined}
                              onClick={() => setDesktopOpen(false)}
                            >
                              <span className="nav-page-icon">
                                <Icon className="size-[18px]" aria-hidden="true" />
                              </span>
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-semibold">
                                  {item.label}
                                </span>
                                <span className="block truncate text-[11px] text-[var(--text-muted)]">
                                  {item.description}
                                </span>
                              </span>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="ml-2 flex items-center gap-2">
              <AccentSwitcher />
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <AccentSwitcher />
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              className={clsx(
                'relative flex size-10 items-center justify-center rounded-lg border transition-all duration-300',
                mobileOpen
                  ? 'border-[var(--accent)] bg-[var(--glass-bg)] text-[var(--accent)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:border-[var(--border-glass)] hover:bg-[var(--glass-bg)] hover:text-[var(--foreground)]'
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close page menu' : 'Open page menu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  {mobileOpen ? (
                    <X className="size-5" aria-hidden="true" />
                  ) : (
                    <Menu className="size-5" aria-hidden="true" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="nav-panel fixed inset-x-3 top-[4.4rem] z-40 p-3 md:hidden"
            role="dialog"
            aria-modal="false"
            aria-label="Page menu"
          >
            <div className="mb-2 flex items-center justify-between px-2">
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Browse pages
              </span>
              <span className="live-dot" aria-hidden="true" />
            </div>
            <div className="nav-page-grid" role="menu">
              {NAV_ITEMS.map((item, index) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + index * 0.035, duration: 0.28 }}
                  >
                    <Link
                      href={item.href}
                      className="nav-page-card"
                      data-active={isActive}
                      role="menuitem"
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="nav-page-icon">
                        <Icon className="size-[18px]" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">
                          {item.label}
                        </span>
                        <span className="block truncate text-[11px] text-[var(--text-muted)]">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
