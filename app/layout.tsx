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
      'Tayyab Ali — Shopify, Webflow & WordPress Developer | E-Commerce Specialist',
    template: '%s | Tayyab Ali',
  },
  description:
    'Freelance e-commerce developer specializing in Shopify, Webflow, WordPress & Odoo setups. Custom online stores, dropshipping configurations, and responsive React/Next.js front-ends. Available for remote projects worldwide.',
  creator: 'Tayyab Ali',
  authors: [{ name: 'Tayyab Ali' }],
  keywords: [
    'Shopify developer',
    'Shopify store setup',
    'Webflow developer',
    'WordPress developer',
    'WooCommerce developer',
    'Odoo e-commerce',
    'custom e-commerce store',
    'dropshipping setup',
    'dropshipping store',
    'React developer',
    'Next.js developer',
    'frontend developer',
    'UI/UX designer',
    'freelance web developer',
    'e-commerce freelancer',
    'online store developer',
    'web developer Pakistan',
    'remote web developer',
    'freelance developer for hire',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tayyab.co',
    siteName: 'Tayyab Ali',
    title: 'Tayyab Ali — Shopify, Webflow & WordPress Developer',
    description:
      'Freelance e-commerce developer. Custom Shopify, Webflow, WordPress & Odoo stores. Dropshipping setups and responsive React front-ends.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tayyab Ali — Shopify, Webflow & WordPress Developer',
    description:
      'Freelance e-commerce developer. Custom stores, dropshipping setups, and responsive React front-ends. Available worldwide.',
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
