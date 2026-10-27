import type { ComponentType } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { content } from '@/content';
import { GithubIcon, LinkedinIcon } from './brand-icons';

export function SocialSidebar() {
  const { profile } = content;

  const links: Array<{ href: string; label: string; Icon: ComponentType<{ className?: string }> }> = [];
  if (profile.links.github) {
    links.push({ href: profile.links.github, label: 'GitHub', Icon: GithubIcon });
  }
  if (profile.links.linkedin) {
    links.push({ href: profile.links.linkedin, label: 'LinkedIn', Icon: LinkedinIcon });
  }
  if (profile.whatsapp) {
    links.push({ href: profile.whatsapp, label: 'WhatsApp', Icon: MessageCircle });
  }
  links.push({ href: `mailto:${profile.email}`, label: 'Send a message', Icon: Mail });

  return (
    <aside className="social-sidebar" aria-label="Social profiles">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="social-sidebar-link"
          aria-label={label}
          title={label}
          data-cursor="true"
          data-cursor-text={label === 'Send a message' ? 'Email' : label}
        >
          <Icon className="size-[18px]" />
        </a>
      ))}
      <span className="social-sidebar-line" aria-hidden="true" />
    </aside>
  );
}
