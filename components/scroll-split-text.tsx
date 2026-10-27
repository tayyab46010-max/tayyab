'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollSplitTextProps {
  children: string;
  className?: string;
  splitBy?: 'word' | 'char';
}

export function ScrollSplitText({
  children,
  className = '',
  splitBy = 'word',
}: ScrollSplitTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [revealedItems, setRevealedItems] = useState(0);

  const items = splitBy === 'word' ? children.split(' ') : children.split('');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      const scrollProgress = Math.max(
        0,
        Math.min(1, (viewportHeight - elementTop) / (viewportHeight * 0.8 + elementHeight))
      );

      setRevealedItems(Math.ceil(scrollProgress * items.length));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items.length]);

  return (
    <h2 ref={ref} className={className}>
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-700 ease-out"
          style={{
            opacity: i < revealedItems ? 1 : 0.2,
            transform: i < revealedItems ? 'translateY(0)' : 'translateY(20px)',
            marginRight: splitBy === 'word' ? '0.25em' : '0',
          }}
        >
          {item}
        </span>
      ))}
    </h2>
  );
}
