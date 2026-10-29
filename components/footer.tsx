import Link from 'next/link';
import { content } from '@/content';
import { GithubIcon, LinkedinIcon } from './brand-icons';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

const pageLinks = [
  { href: '/', label: 'Home' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
  { href: '/card', label: 'Business Card' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/legal', label: 'Legal' },
];

const linkStyle =
  'text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { profile } = content;

  return (
    <footer
      className="border-t border-[var(--border)] bg-[var(--surface)]"
      role="contentinfo"
    >
      <div className="container-wide grid grid-cols-1 gap-10 py-12 md:grid-cols-[1.1fr_1fr_1fr] md:gap-8">
        {/* Brand / contact */}
        <div className="space-y-3">
          <p className="font-display text-lg font-extrabold text-[var(--foreground)]">
            Tayyab<span className="text-[var(--accent)]">.</span>
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Software Engineer & UI/UX Designer
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <MapPin className="h-4 w-4 text-[var(--accent)]" aria-hidden />
              <span>Sialkot, Pakistan</span>
            </li>
            <li>
              <a
                href="mailto:tayyab46010@gmail.com"
                className="flex items-center gap-2 text-sm text-[var(--accent-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden />
                <span>tayyab46010@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Pages */}
        <nav aria-label="Footer navigation">
          <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Pages
          </p>
          <ul className="flex flex-col flex-wrap gap-2.5 max-h-64">
            {pageLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={linkStyle}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect */}
        <div>
          <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Connect
          </p>
          <ul className="flex flex-col gap-3">
            {profile.links.linkedin && (
              <li>
                <a
                  href={profile.links.linkedin}
                  className="inline-flex items-center gap-2.5 text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]">
                    <LinkedinIcon className="h-4 w-4" />
                  </span>
                  <span>LinkedIn</span>
                </a>
              </li>
            )}
            {profile.links.github && (
              <li>
                <a
                  href={profile.links.github}
                  className="inline-flex items-center gap-2.5 text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]">
                    <GithubIcon className="h-4 w-4" />
                  </span>
                  <span>GitHub</span>
                </a>
              </li>
            )}
            <li>
              <a
                href={profile.whatsapp}
                className="inline-flex items-center gap-2.5 text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <span>WhatsApp</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="container-wide py-4">
          <p className="mono text-xs text-[var(--text-muted)]">
            &copy; {currentYear} Tayyab Ali. All rights reserved. Unauthorized copying or distribution is prohibited. See <Link href="/legal" className="text-[var(--accent)] hover:underline">Legal</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
