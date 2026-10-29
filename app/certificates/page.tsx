import type { Metadata } from 'next';
import { content, certificateCount } from '@/content';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { CertificateVault } from '@/components/certificate-vault';

export const metadata: Metadata = {
  title: `${certificateCount} Verified Certificates — Shopify, React, Data Analytics & More`,
  description: `Browse ${certificateCount} verified certificates in software development, data analytics, digital marketing, design, and communication from DigiSkills, Cisco, HP LIFE, and more. All verifiable online.`,
  openGraph: {
    title: `${certificateCount} Verified Certificates — Shopify, React, Data Analytics`,
    description: `All ${certificateCount} credentials verifiable via issuer links. Software, data analytics, marketing, design, and communication.`,
  },
};

export default function CertificatesPage() {
  const { certificates } = content;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Certificates', url: '/certificates' },
        ]}
      />

      <CertificateVault />
    </>
  );
}
