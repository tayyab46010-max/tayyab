import type { Metadata } from 'next';
import { content, certificateCount } from '@/content';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { CertificateVault } from '@/components/certificate-vault';

export const metadata: Metadata = {
  title: 'Certificates & Training',
  description: `${certificateCount} verified certificates in software, data analytics, digital marketing, design, and communication from DigiSkills, Cisco, HP LIFE, and more.`,
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
