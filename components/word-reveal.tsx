'use client';

import { useEffect, useRef, useState } from 'react';

interface WordRevealProps {
  children: string;
  className?: string;
}

export function WordReveal({ children, className = '' }: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visibleWords, setVisibleWords] = useState(0);
  const words = children.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const viewportHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementHeight = rect.height;

            const scrollProgress = Math.max(
              0,
              Math.min(1, (viewportHeight - elementTop) / (viewportHeight + elementHeight))
            );

            setVisibleWords(Math.ceil(scrollProgress * words.length));
          }
        });
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [words.length]);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Reveal words faster: start revealing when element enters viewport,
      // fully reveal by the time it's scrolled 60% through viewport
      const scrollProgress = Math.max(
        0,
        Math.min(1, (viewportHeight - elementTop) / (viewportHeight * 0.6 + elementHeight))
      );

      setVisibleWords(Math.ceil(scrollProgress * words.length));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-500 ease-out"
          style={{
            opacity: i < visibleWords ? 1 : 0.15,
            filter: i < visibleWords ? 'blur(0px)' : 'blur(4px)',
            marginRight: '0.25em',
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}
