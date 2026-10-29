import type { Metadata } from 'next';
import { content, certificateCount } from '@/content';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { ScrollReveal } from '@/components/scroll-reveal';
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons';
import {
  Award,
  BarChart3,
  Briefcase,
  Code2,
  Download,
  Globe,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  MessageSquare,
  Palette,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resume — Tayyab Ali | Shopify, Webflow & React Developer',
  description:
    'Downloadable CV and work history for Tayyab Ali — e-commerce development, inventory operations, and freelance web development. 22 verified certifications.',
  openGraph: {
    title: 'Resume — Tayyab Ali | Shopify, Webflow & React Developer',
    description:
      'View work experience, skills, certifications, and download CV. Available for freelance and full-time remote opportunities.',
  },
};

const SKILL_GROUPS = [
  {
    icon: Code2,
    label: 'Development',
    color: 'var(--accent)',
    skills: ['TypeScript / JavaScript', 'React & Next.js', 'C++ / Python', 'HTML5 / CSS3', 'PHP & MySQL'],
  },
  {
    icon: Palette,
    label: 'Design',
    color: 'var(--accent-secondary)',
    skills: ['UI/UX Design', 'Figma', 'Graphic Design', 'Design Systems', 'WordPress & Webflow'],
  },
  {
    icon: BarChart3,
    label: 'Data & Business',
    color: 'color-mix(in srgb, var(--accent) 60%, var(--accent-secondary))',
    skills: ['Data Analytics', 'Business Intelligence', 'SEO & Digital Marketing', 'Inventory Systems', 'E-Commerce (Shopify, Odoo)'],
  },
];

function formatDateRange(start: string, end: string) {
  const format = (date: string) => {
    if (date === 'present') return 'Present';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return month ? `${months[Number(month) - 1]} ${year}` : year;
  };
  return `${format(start)} — ${format(end)}`;
}

export default function ResumePage() {
  const { profile, experiences, education, certificates, projects } = content;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Resume', url: '/resume' },
        ]}
      />

      <section className="section container-page">
        {/* ── Header Card ─────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="glass-card relative overflow-hidden rounded-2xl p-6 md:p-10">
            <div
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full opacity-10 blur-2xl"
              style={{ background: 'var(--accent)' }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--glass-bg)] px-3 py-1">
                  <span className="status-dot" aria-hidden="true" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    Open to work
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                  {profile.name}
                </h1>
                <p className="mt-1 text-lg font-semibold text-[var(--accent-secondary)]">
                  {profile.title}
                </p>
                <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--text-secondary)]">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
                    {profile.location.city}, {profile.location.country}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Globe className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
                    tayyab.co
                  </span>
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-wrap gap-3">
                <a href="/cv.pdf" download className="btn btn-primary">
                  <Download className="size-4" aria-hidden="true" />
                  Download PDF
                </a>
                <a
                  href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Quick stats */}
            <div className="relative mt-8 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
              {[
                { value: `${experiences.length}`, label: 'Operations roles' },
                { value: `${certificateCount}`, label: 'Certifications' },
                { value: `${projects.length}`, label: 'Projects built' },
                { value: '99.8%', label: 'Data accuracy' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-center sm:px-4 sm:py-3"
                >
                  <p className="font-display text-xl sm:text-2xl font-extrabold text-[var(--accent)]">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-10 space-y-12 print:space-y-8">
          {/* ── Summary ─────────────────────────────────────────────── */}
          <ScrollReveal>
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--glass-bg)]">
                  <Sparkles className="size-4 text-[var(--accent)]" aria-hidden="true" />
                </span>
                Professional Summary
              </h2>
              <div className="glass-card rounded-xl p-6">
                <p className="leading-relaxed text-[var(--text-secondary)]">
                  {profile.summary}
                </p>
              </div>
            </section>
          </ScrollReveal>

          {/* ── Experience Timeline ─────────────────────────────────── */}
          <ScrollReveal>
            <section>
              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
                <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--glass-bg)]">
                  <Briefcase className="size-4 text-[var(--accent)]" aria-hidden="true" />
                </span>
                Work Experience
              </h2>
              <div className="relative space-y-6 before:absolute before:bottom-2 before:left-[19px] before:top-2 before:w-px before:bg-[var(--border)] md:before:left-[23px]">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative flex gap-4 md:gap-6">
                    <div className="relative z-10 flex size-10 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] md:size-12">
                      <Briefcase className="size-4 text-[var(--accent)] md:size-5" aria-hidden="true" />
                    </div>
                    <div className="glass-card min-w-0 flex-1 rounded-xl p-5 transition-shadow duration-300 hover:shadow-lg md:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold">{exp.role}</h3>
                          <p className="text-sm font-medium text-[var(--accent-secondary)]">
                            {exp.company}
                          </p>
                        </div>
                        <span className="mono rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--accent)]">
                          {formatDateRange(exp.start, exp.end)}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {exp.description}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <ShieldCheck className="mt-0.5 size-3.5 flex-shrink-0 text-[var(--accent)]" aria-hidden="true" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* ── Education ───────────────────────────────────────────── */}
          <ScrollReveal>
            <section>
              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
                <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--glass-bg)]">
                  <GraduationCap className="size-4 text-[var(--accent)]" aria-hidden="true" />
                </span>
                Education
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className="glass-card rounded-xl p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold leading-snug">{edu.degree}</h3>
                      <GraduationCap className="size-5 flex-shrink-0 text-[var(--accent)] opacity-50" aria-hidden="true" />
                    </div>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {edu.institution}
                      {edu.campus && ` · ${edu.campus}`}
                    </p>
                    <span className="mono mt-3 inline-block rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--accent)]">
                      {formatDateRange(edu.start, edu.end)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* ── Skills ──────────────────────────────────────────────── */}
          <ScrollReveal>
            <section>
              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
                <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--glass-bg)]">
                  <Code2 className="size-4 text-[var(--accent)]" aria-hidden="true" />
                </span>
                Skills & Expertise
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {SKILL_GROUPS.map((group) => (
                  <div
                    key={group.label}
                    className="glass-card rounded-xl p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className="flex size-9 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `color-mix(in srgb, ${group.color} 12%, transparent)`, color: group.color }}
                      >
                        <group.icon className="size-4" aria-hidden="true" />
                      </span>
                      <h3 className="font-bold">{group.label}</h3>
                    </div>
                    <ul className="space-y-2">
                      {group.skills.map((skill) => (
                        <li key={skill} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <span
                            className="mt-[7px] size-1.5 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: group.color }}
                            aria-hidden="true"
                          />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* ── Certificates ────────────────────────────────────────── */}
          <ScrollReveal>
            <section>
              <h2 className="mb-2 flex flex-wrap items-center gap-2 text-xl font-bold">
                <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--glass-bg)]">
                  <Award className="size-4 text-[var(--accent)]" aria-hidden="true" />
                </span>
                Certifications
                <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
                  {certificateCount}
                </span>
              </h2>
              <p className="mb-6 text-sm text-[var(--text-muted)]">
                Every credential verifiable via issuer links on the{' '}
                <a href="/certificates" className="text-[var(--accent)] underline-offset-4 hover:underline">
                  certificates page
                </a>
                .
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert, i) => (
                  <div
                    key={i}
                    className="group flex items-start justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 transition-colors duration-300 hover:border-[var(--accent)]"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug">
                        {cert.title}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {cert.issuer}
                      </p>
                      {cert.id && (
                        <p className="mono mt-1 text-[10px] text-[var(--text-muted)]">
                          ID: {cert.id}
                        </p>
                      )}
                    </div>
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 flex-shrink-0 text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                        aria-label={`Verify ${cert.title}`}
                      >
                        <ShieldCheck className="size-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* ── Languages ───────────────────────────────────────────── */}
          {profile.languages && profile.languages.length > 0 && (
            <ScrollReveal>
              <section>
                <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--glass-bg)]">
                    <Languages className="size-4 text-[var(--accent)]" aria-hidden="true" />
                  </span>
                  Languages
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {profile.languages.map((language) => (
                    <div
                      key={language.name}
                      className="glass-card rounded-xl p-5 text-center"
                    >
                      <MessageSquare className="mx-auto mb-2 size-5 text-[var(--accent)]" aria-hidden="true" />
                      <p className="font-bold">{language.name}</p>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {language.proficiency}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {/* ── Contact CTA ─────────────────────────────────────────── */}
          <ScrollReveal>
            <section>
              <div className="glass-card relative overflow-hidden rounded-2xl p-6 text-center md:p-10">
                <div
                  className="pointer-events-none absolute -left-16 -bottom-16 size-56 rounded-full opacity-10 blur-2xl"
                  style={{ background: 'var(--accent-secondary)' }}
                  aria-hidden="true"
                />
                <h2 className="relative text-2xl font-bold md:text-3xl">
                  Let&apos;s work together
                </h2>
                <p className="relative mx-auto mt-2 max-w-md text-sm text-[var(--text-secondary)]">
                  Available for business development, operations, and freelance
                  e-commerce engagements worldwide.
                </p>
                <div className="relative mt-6 flex flex-wrap justify-center gap-3">
                  <a href={`mailto:${profile.email}`} className="btn btn-primary">
                    <Mail className="size-4" aria-hidden="true" />
                    Email me
                  </a>
                  {profile.links.linkedin && (
                    <a
                      href={profile.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                    >
                      <LinkedinIcon className="size-4" />
                      LinkedIn
                    </a>
                  )}
                  {profile.links.github && (
                    <a
                      href={profile.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                    >
                      <GithubIcon className="size-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
