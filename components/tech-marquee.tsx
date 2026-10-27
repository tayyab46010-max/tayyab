import { Code2, Sparkles } from 'lucide-react';
import { Typewriter } from './typewriter';

const ROW_ONE = [
  'TypeScript',
  'JavaScript',
  'Python',
  'C++',
  'React',
  'Next.js',
  'Tailwind CSS',
  'HTML5',
  'CSS3',
  'SQL',
  'Git',
  'GitHub',
  'Node.js',
];

const ROW_TWO = [
  'Figma',
  'Framer Motion',
  'WordPress',
  'Vercel',
  'VS Code',
  'Business Intelligence',
  'Data Analytics',
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Python',
  'SQL',
];

function TechRow({ items }: { items: string[] }) {
  const sequence = [...items, ...items];
  return (
    <div className="marquee-group" aria-hidden="true">
      {sequence.map((item, index) => (
        <span className="tech-pill" key={`${item}-${index}`}>
          <span className="tech-dot" />
          {item}
        </span>
      ))}
    </div>
  );
}

export function TechMarquee() {
  return (
    <section
      className="relative overflow-hidden border-y border-[var(--border)] py-10 md:py-14"
      aria-label="Coding languages and tools"
    >
      <div className="container-wide mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mono mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
            <Sparkles className="size-3 text-[var(--accent)]" aria-hidden="true" />
            The toolkit
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Coding{' '}
            <span className="text-[var(--accent)]">
              <Typewriter
                phrases={['Languages', 'Tools', 'Stack', 'Daily Drivers']}
                ariaLabel="Coding Languages"
              />
            </span>
          </h2>
        </div>
        <p className="max-w-xs text-sm text-[var(--text-secondary)]">
          The languages, frameworks, and tools I reach for when turning an idea
          into something people can use.
        </p>
      </div>

      <div className="marquee-mask space-y-3">
        <div className="marquee-track is-slow">
          <TechRow items={ROW_ONE} />
        </div>
        <div className="marquee-track is-slow is-reversed">
          <TechRow items={ROW_TWO} />
        </div>
      </div>

      <span className="sr-only">
        Languages and tools: {ROW_ONE.join(', ')}, {ROW_TWO.join(', ')}.
      </span>
      <Code2 className="pointer-events-none absolute -right-6 -top-6 size-32 text-[var(--accent)] opacity-[0.04]" aria-hidden="true" />
    </section>
  );
}
