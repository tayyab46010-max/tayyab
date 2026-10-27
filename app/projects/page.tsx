import type { Metadata } from 'next';
import { ProjectsTabs } from '@/components/projects-tabs';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected work including TayyabGPT, the Shagaf Gents Saloon live site, and this portfolio.',
};

export default function ProjectsPage() {
  return <ProjectsTabs />;
}
