import { Sparkles } from 'lucide-react';
import { Typewriter } from './typewriter';

const ROW_ONE = [
  'Clean Code',
  'Data Analyst',
  'Business Development',
  'UI/UX Design',
  'Software Engineering',
  'Data Analytics',
  'Inventory Management',
  'Problem Solving',
];

const ROW_TWO = [
  'TypeScript',
  'JavaScript',
  'Python',
  'C++',
  'React',
  'Next.js',
  'Tailwind CSS',
  'SQL',
  'Business Intelligence',
  'Digital Marketing',
];

function KeywordRow({ items }: { items: string[] }) {
  const sequence = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee-group" aria-hidden="true">
      {sequence.map((item, index) => (
        <span
          className="inline-flex items-center gap-3 px-8 py-2 font-display text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          key={`${item}-${index}`}
        >
          <span className="text-[var(--accent)]">{item}</span>
          <span className="text-[var(--border)]">•</span>
        </span>
      ))}
    </div>
  );
}

export function FocusMarquee() {
  return (
    <section
      className=""
    >
      <div className="container-wide mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mono mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
            <Sparkles className="size-3 text-[var(--accent)]" aria-hidden="true" />
            What drives me
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Focus{' '}
            <span className="text-[var(--accent)]">
              <Typewriter phrases={['Areas', 'Strengths', 'Values']} ariaLabel="Core focus areas" />
            </span>
          </h2>
        </div>
      </div>

      <div className="marquee-mask space-y-4">
        <div className="marquee-track is-fast">
          <KeywordRow items={ROW_ONE} />
        </div>
        <div className="marquee-track is-reversed is-fast">
          <KeywordRow items={ROW_TWO} />
        </div>
      </div>
    </section>
  );
}
