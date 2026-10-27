import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { SkipLink } from '@/components/skip-link';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { CustomCursor } from '@/components/custom-cursor';
import { TerminalWidget } from '@/components/terminal-widget';
import { SpotlightEffect } from '@/components/spotlight-effect';
import { AnimatedBackground } from '@/components/animated-background';
import { SocialSidebar } from '@/components/social-sidebar';
import { CopyProtection } from '@/components/copy-protection';
import { DevToolsDetector } from '@/components/devtools-detector';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tayyab.co'),
  title: {
    default:
      'Tayyab Ali — Web Developer & UI/UX Designer | Shopify, Webflow, React',
    template: '%s | Tayyab Ali',
  },
  description:
    'Custom e-commerce stores (Shopify, Webflow, WordPress, Odoo), dropshipping setups, and clean React front-ends. Remote developer & UI/UX designer. Get a free quote.',
  creator: 'Tayyab Ali',
  authors: [{ name: 'Tayyab Ali' }],
  keywords: [
    'Shopify developer',
    'Webflow developer',
    'WordPress developer',
    'custom e-commerce setup',
    'dropshipping setup',
    'React developer',
    'UI/UX designer',
    'Odoo e-commerce',
    'frontend developer Pakistan',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tayyab.co',
    siteName: 'Tayyab Ali',
    title: 'Tayyab Ali — Web Developer & UI/UX Designer | Shopify, Webflow, React',
    description:
      'Custom e-commerce stores, dropshipping setups, and clean React front-ends. Remote developer & UI/UX designer.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tayyab Ali — Web Developer & UI/UX Designer',
    description:
      'Custom e-commerce stores (Shopify, Webflow, WordPress), dropshipping setups, and React front-ends.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://tayyab.co',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F9FA' },
    { media: '(prefers-color-scheme: dark)', color: '#0B132B' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <CopyProtection />
        <DevToolsDetector />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatedBackground />
          <SpotlightEffect />
          <CustomCursor />
          <SocialSidebar />
          <SkipLink />
          <Nav />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <TerminalWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
