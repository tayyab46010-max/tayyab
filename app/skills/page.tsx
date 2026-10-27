import type { Metadata } from 'next';
import { content } from '@/content';
import { skillGroups } from '@/content/skills';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Languages } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Technical and business skills — programming, data analytics, UI/UX design, digital marketing, and operations, each grounded in certified training or hands-on experience.',
};

export default function SkillsPage() {
  const { profile } = content;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Skills', url: '/skills' },
        ]}
      />

      <section className="section container-page">
        <ScrollReveal className="mb-12">
          <h1 className="text-4xl font-bold">Skills</h1>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Technical and business capabilities — each grounded in certified
            training or hands-on operational experience.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <ScrollReveal key={group.title} delay={i * 0.05}>
              <div
                className="glass-card h-full p-8"
                data-cursor="true"
                data-cursor-text="View"
              >
                <h2 className="text-xl font-bold">{group.title}</h2>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  {group.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}

          {profile.languages && profile.languages.length > 0 && (
            <ScrollReveal delay={skillGroups.length * 0.05}>
              <div
                className="glass-card h-full p-8"
                data-cursor="true"
                data-cursor-text="View"
              >
                <div className="flex items-center gap-3">
                  <Languages
                    className="size-5 text-[var(--accent)]"
                    aria-hidden="true"
                  />
                  <h2 className="text-xl font-bold">Languages</h2>
                </div>
                <ul className="mt-5 space-y-3">
                  {profile.languages.map((language) => (
                    <li
                      key={language.name}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="font-medium">{language.name}</span>
                      <span className="text-[var(--text-muted)]">
                        {language.proficiency}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
