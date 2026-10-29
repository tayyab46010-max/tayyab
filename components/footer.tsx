import Link from 'next/link';
import { content } from '@/content';
import { GithubIcon, LinkedinIcon } from './brand-icons';
import { MessageCircle } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--border)] bg-[var(--surface)]"
      role="contentinfo"
    >
      <div className="container-wide flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="font-display text-lg font-extrabold text-[var(--foreground)]">
            Tayyab<span className="text-[var(--accent)]">.</span>
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Software Engineer & UI/UX Designer
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Sialkot, Pakistan
          </p>
          <a
            href="mailto:tayyab46010@gmail.com"
            className="text-sm text-[var(--accent-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            tayyab46010@gmail.com
          </a>
        </div>

        <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
          <Link
            href="/"
            className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/certificates"
            className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
          >
            Certificates
          </Link>
          <Link
            href="/projects"
            className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/skills"
            className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
          >
            Skills
          </Link>
          <Link
            href="/resume"
            className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
          >
            Resume
          </Link>
          <Link
            href="/contact"
            className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/card"
            className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
          >
            Business Card
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/legal"
            className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors"
          >
            Legal
          </Link>
        </nav>

        <div className="flex gap-3">
          {content.profile.links.linkedin && (
            <a
              href={content.profile.links.linkedin}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          )}
          {content.profile.links.github && (
            <a
              href={content.profile.links.github}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
          <a
            href={content.profile.whatsapp}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
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
