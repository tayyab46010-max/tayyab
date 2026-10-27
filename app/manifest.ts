import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tayyab Ali — Portfolio',
    short_name: 'Tayyab Ali',
    description:
      'Software engineering student in Sialkot with warehouse operations experience and 22 certificates in AI, data, marketing, and design.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF7',
    theme_color: '#E5A910',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
    ],
  };
}
