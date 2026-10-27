import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { content } from '@/content';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export async function generateStaticParams() {
  return content.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = content.projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = content.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Projects', url: '/projects' },
          { name: project.title, url: `/projects/${project.slug}` },
        ]}
      />

      <article className="section container-narrow">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--accent-secondary)] hover:text-[var(--accent)]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to projects
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <p className="mt-4 text-xl text-[var(--foreground)]/80">
            {project.tagline}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="badge">
              {project.status === 'in-development'
                ? 'In Development'
                : project.status}
            </span>
          </div>
        </header>

        <div className="space-y-12">
          <section>
            <h2 className="mb-4 text-2xl font-bold">Problem</h2>
            <p className="text-[var(--foreground)]/80">{project.problem}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">My Role</h2>
            <p className="text-[var(--foreground)]/80">{project.role}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {project.whatShipped && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">What Shipped</h2>
              <ul className="space-y-2">
                {project.whatShipped.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[var(--foreground)]/80"
                  >
                    <span className="mt-1 text-[var(--accent)]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.whatLearned && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">What I Learned</h2>
              <ul className="space-y-2">
                {project.whatLearned.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[var(--foreground)]/80"
                  >
                    <span className="mt-1 text-[var(--accent)]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(project.demoUrl || project.repoUrl) && (
            <section className="flex flex-wrap gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  View live site
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  Source Code
                </a>
              )}
            </section>
          )}
        </div>
      </article>
    </>
  );
}
