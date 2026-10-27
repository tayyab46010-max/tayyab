import Link from 'next/link';
import { content, certificateCount } from '@/content';
import { PersonJsonLd, WebSiteJsonLd, ProfessionalServiceJsonLd } from '@/components/json-ld';
import { AnimatedCounter } from '@/components/animated-counter';
import { FloatingResumeButton } from '@/components/floating-resume-button';
import { LandingAnimation } from '@/components/landing-animation';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ScrollMarquee } from '@/components/scroll-marquee';
import { TechMarquee } from '@/components/tech-marquee';
import { Typewriter } from '@/components/typewriter';
import { WordReveal } from '@/components/word-reveal';
import { WritingText } from '@/components/animated-text';
import { StaggerCards, StaggerCardItem } from '@/components/animated-card';
import { HoverCard } from '@/components/hover-card';
import { TiltCard, TiltTimelineItem } from '@/components/tilt-card';
import { ProfileCarousel } from '@/components/profile-carousel';
import {
  Mail,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Palette,
  BarChart3,
  ExternalLink,
  CheckCircle2,
  Zap,
  Shield,
} from 'lucide-react';

export default function HomePage() {
  const { profile, experiences, education, certificates, projects } = content;
  const featuredProject = projects.find((p) => p.featured) || projects[0];

  const engineeringCerts = certificates.filter((c) => c.domain === 'software');
  const designCerts = certificates.filter((c) => c.domain === 'design' || c.domain === 'marketing');
  const analyticsCerts = certificates.filter((c) => c.domain === 'data' || c.domain === 'office' || c.domain === 'communication');

  return (
    <>
      <LandingAnimation />
      <PersonJsonLd />
      <WebSiteJsonLd />
      <ProfessionalServiceJsonLd />
      <FloatingResumeButton />

      {/* Hero Section - Split Layout (7:5) */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="relative z-10 container-page py-24">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Side - Text (7 cols) */}
            <div className="lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 glass-card px-4 py-2">
                <span className="status-dot" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Open to work
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                <span className="text-[var(--foreground)]">Hi, I&apos;m </span>
                <span className="glow-text">Tayyab Ali</span>
              </h1>

              <p className="mt-4 flex min-h-[1.8em] items-center text-xl font-semibold text-[var(--accent-secondary)] md:text-2xl">
                <Typewriter
                  phrases={[
                    'Software Engineer',
                    'Data Analyst',
                    'Graphics Designer',
                    'Marketing Expert',
                    'Business Development',
                  ]}
                  ariaLabel="Software Engineer & Data Analyst"
                />
              </p>

              <WordReveal className="mt-6 text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                Software engineering student with hands-on experience in warehouse operations,
                inventory management, and full-stack development.
              </WordReveal>
              <WordReveal className="mt-3 text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                Seeking a business development or operations role where data-driven thinking,
                vendor coordination, and technical fluency drive measurable growth.
              </WordReveal>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-primary" data-cursor="true" data-cursor-text="Contact">
                  <Mail className="size-4" aria-hidden="true" />
                  Send message
                </Link>
                <Link href="/resume" className="btn btn-ghost" data-cursor="true" data-cursor-text="Resume">
                  <ArrowRight className="size-4" aria-hidden="true" />
                  View resume
                </Link>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  data-cursor="true"
                  data-cursor-text="Chat"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Right Side - Profile Image (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <TiltCard className="relative group">
                {/* Image with glass border */}
                <div className="img-reveal relative w-72 aspect-[3/4] xl:w-80 2xl:w-96 overflow-hidden rounded-[2rem] border-2 border-[var(--border-glass)] glass-card" style={{ animationDelay: '2.3s' }}>
                  <ProfileCarousel photos={profile.photos ?? []} />
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Data Ticker Strip */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="container-page grid gap-8 py-12 md:grid-cols-3">
          <div className="text-center">
            <AnimatedCounter value={99.8} suffix="%" decimals={1} />
            <div className="mt-2 text-sm text-[var(--text-secondary)]">
              Data accuracy at Lay&apos;s Warehouse
            </div>
            <div className="mono mt-1 text-xs text-[var(--text-muted)]">
              KPO Executive · 2024
            </div>
          </div>
          <div className="text-center">
            <AnimatedCounter value={certificateCount} suffix="" />
            <div className="mt-2 text-sm text-[var(--text-secondary)]">
              Certifications completed
            </div>
            <div className="mono mt-1 text-xs text-[var(--text-muted)]">
              Across 6 domains
            </div>
          </div>
          <div className="text-center">
            <AnimatedCounter value={experiences.length} suffix="" />
            <div className="mt-2 text-sm text-[var(--text-secondary)]">
              Operations roles
            </div>
            <div className="mono mt-1 text-xs text-[var(--text-muted)]">
              Inventory & logistics
            </div>
          </div>
        </div>
      </section>

      {/* Scroll-driven horizontal marquee */}
      <ScrollMarquee />

      {/* Continuously scrolling coding languages */}
      <TechMarquee />

      {/* Bento Grid - Skills & Credibility Hub */}
      <section className="section container-page">
        <ScrollReveal className="mb-12">
          <h2 className="text-3xl font-bold md:text-4xl">
            <WritingText text="Skills & Certifications" />
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            Grouped by domain — every claim backed by a verifiable certificate.
          </p>
        </ScrollReveal>

        <StaggerCards className="bento-grid">
          {/* Tile 1: Engineering */}
          <StaggerCardItem>
            <HoverCard className="glass-card bento-tile p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]">
                  <Code2 className="size-5 text-[var(--accent)]" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold">Engineering</h3>
              </div>
              <div className="space-y-3">
                {engineeringCerts.map((cert) => (
                  <div key={cert.id || cert.title} className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">{cert.title}</div>
                      <div className="mono text-xs text-[var(--text-muted)]">
                        {cert.date}
                      </div>
                    </div>
                    {cert.verifyUrl && cert.id && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="verify-badge shrink-0"
                        title={`Verify: ${cert.id}`}
                      >
                        <Shield className="size-3" aria-hidden="true" />
                        Verify
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <Zap className="size-3 text-[var(--accent)]" aria-hidden="true" />
                  <span>{engineeringCerts.length} certificates</span>
                </div>
              </div>
            </HoverCard>
          </StaggerCardItem>

          {/* Tile 2: Design & Growth */}
          <StaggerCardItem>
            <HoverCard className="glass-card bento-tile p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)]">
                  <Palette className="size-5 text-[var(--accent-secondary)]" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold">Design & Growth</h3>
              </div>
              <div className="space-y-3">
                {designCerts.slice(0, 5).map((cert) => (
                  <div key={cert.id || cert.title} className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">{cert.title}</div>
                      <div className="mono text-xs text-[var(--text-muted)]">
                        {cert.date}
                      </div>
                    </div>
                    {cert.verifyUrl && cert.id && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="verify-badge shrink-0"
                        title={`Verify: ${cert.id}`}
                      >
                        <Shield className="size-3" aria-hidden="true" />
                        Verify
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <Zap className="size-3 text-[var(--accent-secondary)]" aria-hidden="true" />
                  <span>{designCerts.length} certificates</span>
                </div>
              </div>
            </HoverCard>
          </StaggerCardItem>

          {/* Tile 3: Analytics & Business */}
          <StaggerCardItem>
            <HoverCard className="glass-card bento-tile p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]">
                  <BarChart3 className="size-5 text-[var(--accent)]" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold">Analytics & Business</h3>
              </div>
              <div className="space-y-3">
                {analyticsCerts.slice(0, 5).map((cert) => (
                  <div key={cert.id || cert.title} className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">{cert.title}</div>
                      <div className="mono text-xs text-[var(--text-muted)]">
                        {cert.date}
                      </div>
                    </div>
                    {cert.verifyUrl && cert.id && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="verify-badge shrink-0"
                        title={`Verify: ${cert.id}`}
                      >
                        <Shield className="size-3" aria-hidden="true" />
                        Verify
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <Zap className="size-3 text-[var(--accent)]" aria-hidden="true" />
                  <span>{analyticsCerts.length} certificates</span>
                </div>
              </div>
            </HoverCard>
          </StaggerCardItem>
        </StaggerCards>

        <ScrollReveal className="mt-8 text-center">
          <Link
            href="/certificates"
            className="btn btn-secondary inline-flex"
          >
            View all {certificateCount} certificates
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </ScrollReveal>
      </section>

      {/* Interactive Logistics Timeline */}
      <section className="section bg-[var(--surface)]">
        <div className="container-page">
          <ScrollReveal className="mb-8">
            <h2 className="text-3xl font-bold md:text-4xl">
              Experience <span className="glow-text">Timeline</span>
            </h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              From warehouse operations to software engineering.
            </p>
          </ScrollReveal>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Work Experience */}
            <div>
              <h3 className="mb-6 text-xl font-bold flex items-center gap-2">
                <span className="size-2 rounded-full bg-[var(--accent)]" />
                Work Experience
              </h3>
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <TiltTimelineItem key={i}>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="font-bold text-lg">{exp.role}</div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          {exp.company}
                        </div>
                      </div>
                      <div className="mono text-xs text-[var(--accent)] shrink-0">
                        {exp.start} → {exp.end}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Interactive micro-dashboard for Lay's experience */}
                    {exp.role.includes('KPO') && (
                      <div className="mt-4 glass-card p-4">
                        <div className="mono text-xs text-[var(--text-muted)] mb-3">
                          SUPPLY CHAIN DATA STREAM
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="data-ticker text-2xl">99.8%</div>
                            <div className="text-xs text-[var(--text-muted)] mt-1">
                              Accuracy
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="mono text-2xl font-bold text-[var(--accent-secondary)]">
                              HIGH
                            </div>
                            <div className="text-xs text-[var(--text-muted)] mt-1">
                              Volume
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="mono text-2xl font-bold text-[var(--foreground)]">
                              6mo
                            </div>
                            <div className="text-xs text-[var(--text-muted)] mt-1">
                              Duration
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {exp.role.includes('Inventory') && (
                      <div className="mt-4 glass-card p-4">
                        <div className="mono text-xs text-[var(--text-muted)] mb-3">
                          INVENTORY OPERATIONS
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="data-ticker text-2xl">99.8%</div>
                            <div className="text-xs text-[var(--text-muted)] mt-1">
                              Accuracy
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="mono text-2xl font-bold text-[var(--accent-secondary)]">
                              DAILY
                            </div>
                            <div className="text-xs text-[var(--text-muted)] mt-1">
                              Tracking
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="mono text-2xl font-bold text-[var(--foreground)]">
                              ACTIVE
                            </div>
                            <div className="text-xs text-[var(--text-muted)] mt-1">
                              Status
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <ul className="mt-3 space-y-1">
                      {exp.highlights.map((h, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                        >
                          <CheckCircle2
                            className="size-4 text-[var(--accent)] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </TiltTimelineItem>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="mb-6 text-xl font-bold flex items-center gap-2">
                <span className="size-2 rounded-full bg-[var(--accent-secondary)]" />
                Education
              </h3>
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <TiltTimelineItem key={i}>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="font-bold text-lg">{edu.degree}</div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          {edu.institution}
                          {edu.campus && ` · ${edu.campus}`}
                        </div>
                      </div>
                      <div className="mono text-xs text-[var(--accent)] shrink-0">
                        {edu.start} → {edu.end}
                      </div>
                    </div>
                  </TiltTimelineItem>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      {featuredProject && (
        <section className="section container-page">
          <ScrollReveal className="mb-12">
            <h2 className="text-3xl font-bold md:text-4xl">
              Featured <span className="glow-text">Project</span>
            </h2>
          </ScrollReveal>

          <TiltCard className="glass-card p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="chip">
                    <span className="status-dot mr-2" />
                    {featuredProject.status === 'in-development'
                      ? 'In Development'
                      : featuredProject.status}
                  </span>
                </div>
                <h3 className="text-3xl font-bold">{featuredProject.title}</h3>
                <p className="mt-3 text-lg text-[var(--text-secondary)]">
                  {featuredProject.tagline}
                </p>
                <p className="mt-4 text-sm text-[var(--text-muted)] leading-relaxed">
                  {featuredProject.problem}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {featuredProject.stack.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${featuredProject.slug}`}
                  className="link-morph mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-secondary)]"
                >
                  View case study
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="aspect-video glass-card flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Code2 className="size-12 text-[var(--accent)] mx-auto opacity-50" />
                  <div className="mono text-sm text-[var(--text-muted)]">
                    Project preview
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </section>
      )}

      {/* All Projects — including the live Shagaf Gents Saloon site */}
      <section className="section bg-[var(--surface)]">
        <div className="container-page">
          <ScrollReveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Selected <span className="glow-text">Work</span>
              </h2>
              <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
                Live products, case studies, and the builds behind them — each
                shipped, measured, and still running.
              </p>
            </div>
            <span className="chip mono">
              <span className="status-dot mr-2" />
              {projects.length} projects
            </span>
          </ScrollReveal>

          <StaggerCards className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <StaggerCardItem key={project.slug}>
                <div className="glass-card project-card p-6">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="mono text-xs text-[var(--text-muted)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
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

                  <h3 className="text-xl font-bold">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-[var(--foreground)] no-underline transition-colors hover:text-[var(--accent)]"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {project.tagline}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="link-morph text-sm font-semibold text-[var(--accent)]"
                    >
                      Case study
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
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </StaggerCardItem>
            ))}
          </StaggerCards>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section bg-[var(--surface)]">
        <ScrollReveal className="container-narrow text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Let&apos;s build <span className="glow-text">something great</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Available for business development, operations, and freelance
            engagements — let&apos;s discuss how data-driven execution can
            support your goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-primary" data-cursor="true" data-cursor-text="Contact">
              <Mail className="size-4" aria-hidden="true" />
              Send message
            </Link>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              data-cursor="true"
              data-cursor-text="Chat"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
            <Link href="/certificates" className="btn btn-secondary" data-cursor="true" data-cursor-text="Verify">
              <ExternalLink className="size-4" aria-hidden="true" />
              Verify certificates
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
