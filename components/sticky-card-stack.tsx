'use client';

import { useEffect, useRef, useState } from 'react';

interface StickyCard {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
}

interface StickyCardStackProps {
  cards: StickyCard[];
  className?: string;
}

export function StickyCardStack({ cards, className = '' }: StickyCardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cardElements = container.querySelectorAll('[data-sticky-card]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    cardElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [cards.length]);

  return (
    <div ref={containerRef} className={`space-y-0 ${className}`}>
      {cards.map((card, index) => (
        <div
          key={index}
          data-sticky-card
          data-index={index}
          className="sticky top-24 mb-8 last:mb-0"
          style={{ zIndex: cards.length - index }}
        >
          <div
            className={`glass-card rounded-2xl border border-[var(--border)] p-6 transition-all duration-500 md:p-8 ${
              index === activeIndex
                ? 'scale-100 opacity-100 shadow-2xl'
                : 'scale-95 opacity-80'
            }`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              {card.image && (
                <div className="w-full md:w-48 md:flex-shrink-0">
                  <div className="aspect-video overflow-hidden rounded-lg bg-[var(--surface)]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="mono text-xs text-[var(--text-muted)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--foreground)] md:text-2xl">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">{card.description}</p>
                {card.tags && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
