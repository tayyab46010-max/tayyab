'use client';

import Link from 'next/link';
import { content } from '@/content';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { Tabs } from '@/components/tabs';
import { ScrollReveal } from '@/components/scroll-reveal';
import { StaggerCards, StaggerCardItem } from '@/components/animated-card';
import { HorizontalScroll } from '@/components/horizontal-scroll';
import { ArrowRight } from 'lucide-react';
import {
  Code2,
  Palette,
  BarChart3,
  Database,
  Globe,
} from 'lucide-react';

const TECH_GROUPS = [
  {
    icon: Code2,
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'C++', 'Python'],
  },
  {
    icon: Globe,
    label: 'Web',
    items: ['Next.js', 'React', 'Tailwind CSS', 'WordPress'],
  },
  {
    icon: Database,
    label: 'Data',
    items: ['SQL', 'Business Intelligence', 'Data Analytics'],
  },
  {
    icon: Palette,
    label: 'Design',
    items: ['UI/UX', 'Figma', 'Graphic Design'],
  },
  {
    icon: BarChart3,
    label: 'Business',
    items: ['Digital Marketing', 'SEO', 'Affiliate Marketing'],
  },
];

export function ProjectsTabs() {
  const { projects } = content;

  const projectsTab = (
    <HorizontalScroll>
      {projects.map((project) => (
        <div key={project.slug} className="w-[88vw] shrink-0 sm:w-[540px]">
          <article className="glass-card project-card p-8 group h-full">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-[var(--foreground)] no-underline transition-colors hover:text-[var(--accent)]"
                >
                  {project.title}
                </Link>
              </h2>
              <span className="chip">
                {project.status === 'shipped'
                  ? 'Shipped'
                  : project.status === 'in-development'
                    ? 'In Development'
                    : project.status === 'planned'
                      ? 'Planned'
                      : 'Archived'}
              </span>
            </div>
            <p className="mt-2 text-[var(--text-secondary)]">{project.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-all group-hover:gap-3"
              >
                View case study
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-live"
                  aria-label={`Open live site for ${project.title}`}
                >
                  <span className="live-dot" aria-hidden="true" />
                  Live site
                  <ArrowRight className="size-3.5 -rotate-45" aria-hidden="true" />
                </a>
              )}
            </div>
          </article>
        </div>
      ))}
    </HorizontalScroll>
  );

  const techTab = (
    <StaggerCards className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {TECH_GROUPS.map((group) => (
        <StaggerCardItem key={group.label}>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--glass-bg)]">
                <group.icon className="size-4 text-[var(--accent)]" aria-hidden="true" />
              </div>
              <h3 className="font-bold">{group.label}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </StaggerCardItem>
      ))}
    </StaggerCards>
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Projects', url: '/projects' },
        ]}
      />

      <section className="section container-page">
        <ScrollReveal className="mb-12">
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            A selection of engineering work — the problem, the approach, and
            the outcome of each build.
          </p>
        </ScrollReveal>

        <Tabs
          tabs={[
            { label: 'Case Studies', content: projectsTab },
            { label: 'Tech Stack', content: techTab },
          ]}
        />
      </section>
    </>
  );
}
