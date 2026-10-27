import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Legal & Copyright',
  description: 'Copyright notice and terms of use for tayyab.co',
};

export default function LegalPage() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Legal', url: '/legal' },
        ]}
      />

      <section className="section container-page">
        <h1 className="text-4xl font-bold">Legal & Copyright</h1>

        <div className="mt-8 space-y-6 text-[var(--foreground)]/80">
          <section>
            <h2 className="mb-3 text-xl font-bold">Copyright Notice</h2>
            <p>
              &copy; {currentYear} Tayyab Ali. All rights reserved.
            </p>
            <p className="mt-3">
              All content published on this website, including but not limited to text,
              graphics, logos, images, software, and design elements, is the property of
              Tayyab Ali and is protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">Restricted Use</h2>
            <p>
              Without prior written permission from Tayyab Ali, you may not:
            </p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Reproduce, duplicate, copy, sell, or exploit any portion of this website</li>
              <li>Redistribute, display, or transmit content without attribution</li>
              <li>Modify or create derivative works based on this website's content</li>
              <li>Use this website's design, code, or structure for any purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">Portfolio Content</h2>
            <p>
              Projects, certificates, and work samples displayed on this website are for
              informational purposes only. Unauthorized use of portfolio content is strictly
              prohibited.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">Technical Protection</h2>
            <p>
              This website employs technical measures to protect its content, including
              Content Security Policy headers, source map restrictions, and client-side
              protections. Circumvention of these measures is prohibited.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">Permitted Use</h2>
            <p>
              You may view and browse this website for personal, non-commercial purposes.
              Sharing links to this website is permitted, provided proper attribution is
              maintained.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">Contact for Permissions</h2>
            <p>
              For licensing inquiries or permission requests, contact{' '}
              <a href="mailto:tayyab46010@gmail.com" className="text-[var(--accent)] hover:underline">
                tayyab46010@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
