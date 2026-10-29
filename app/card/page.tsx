import type { Metadata } from 'next';
import { content } from '@/content';
import { BusinessCard } from '@/components/business-card';

export const metadata: Metadata = {
  title: 'Business Card — Tayyab Ali',
  description: 'Digital business card for Tayyab Ali — Software Engineer & Business Development. Scan QR, save contact, or share.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CardPage() {
  return (
    <section className="section flex flex-col items-center justify-start min-h-[calc(100dvh-8rem)] relative sm:justify-center">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, color-mix(in srgb, var(--accent) 6%, transparent), transparent)',
        }}
      />
      <div className="relative z-10 w-full">
        <BusinessCard profile={content.profile} />
      </div>
    </section>
  );
}
