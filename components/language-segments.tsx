'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface LanguageSegment {
  name: string;
  level: number;
  color: string;
}

const LANGUAGE_SEGMENTS: LanguageSegment[] = [
  { name: 'TypeScript', level: 90, color: 'var(--accent)' },
  { name: 'JavaScript', level: 95, color: 'var(--accent)' },
  { name: 'React/Next.js', level: 85, color: 'var(--accent-secondary)' },
  { name: 'Python', level: 75, color: 'var(--accent-secondary)' },
  { name: 'C++', level: 60, color: 'var(--accent)' },
  { name: 'SQL', level: 80, color: 'var(--accent-secondary)' },
  { name: 'HTML/CSS', level: 95, color: 'var(--accent)' },
  { name: 'Tailwind CSS', level: 90, color: 'var(--accent)' },
];

export function LanguageSegments() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <section className="section container-wide" ref={ref}>
      <div className="mb-8">
        <p className="mono mb-2 text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
          Proficiency Levels
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Coding <span className="glow-text">Languages</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {LANGUAGE_SEGMENTS.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="hover-card glass-card p-5"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s ease-out' }}
          >
            <div className="card-glow" />
            <div className="relative z-10">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold">{lang.name}</span>
                <span className="mono text-sm text-[var(--text-muted)]">
                  {lang.level}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--glass-bg)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${lang.level}%` } : {}}
                  transition={{
                    delay: index * 0.08 + 0.3,
                    duration: 0.8,
                    ease: 'easeOut',
                  }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
