import type { Metadata } from 'next';
import { content } from '@/content';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { ContactForm } from '@/components/contact-form';
import { Mail, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Tayyab Ali for business development, operations, or freelance opportunities.',
};

export default function ContactPage() {
  const { profile } = content;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]}
      />

      <section className="section" style={{ width: 'min(55%, 1200px)', marginInline: 'auto', paddingInline: 'var(--spacing-6)' }}>
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="mt-4 text-lg text-[var(--foreground)]/80">
          Open to business development, operations, and freelance opportunities.
        </p>

        <div className="mt-12 space-y-8">
          <ContactForm email={profile.email} whatsapp={profile.whatsapp} />

          <div className="surface p-8">
            <h2 className="mb-6 text-2xl font-bold">Or reach out directly</h2>
            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-[var(--accent-secondary)] hover:text-[var(--accent)]"
              >
                <Mail className="size-5" aria-hidden="true" />
                {profile.email}
              </a>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[var(--accent-secondary)] hover:text-[var(--accent)]"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
