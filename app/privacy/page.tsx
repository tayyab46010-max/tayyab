import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for tayyab.co — data handling, contact form protection, analytics.',
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Privacy', url: '/privacy' },
        ]}
      />

      <section className="section container-page">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>

        <div className="mt-8 space-y-6 text-[var(--foreground)]/80">
          <section>
            <h2 className="mb-3 text-xl font-bold">Data Collection</h2>
            <p>
              This site collects minimal data. The contact form collects your
              name, email, and message content to respond to your inquiry. No
              personal data is stored beyond the scope of that conversation.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">Analytics</h2>
            <p>
              This site uses privacy-respecting analytics (no cookies, no
              personal data collection) to understand traffic patterns. No
              consent banner is required.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">Contact Form Protection</h2>
            <p>
              The contact form uses server-side validation, a honeypot field,
              and Cloudflare Turnstile to prevent spam. Submissions are
              rate-limited per IP address.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">Your Rights</h2>
            <p>
              You can request deletion of any data collected via the contact
              form by emailing tayyab46010@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">Contact</h2>
            <p>
              For privacy concerns, contact{' '}
              <a href="mailto:tayyab46010@gmail.com">tayyab46010@gmail.com</a>.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
