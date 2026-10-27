'use client';

import { useEffect, useState } from 'react';

interface TypewriterProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  ariaLabel?: string;
}

export function Typewriter({
  phrases,
  className = '',
  typingSpeed = 58,
  deletingSpeed = 26,
  pause = 1700,
  ariaLabel,
}: TypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = window.setTimeout(() => setStarted(true), 450);
    return () => window.clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!started) return;

    const current = phrases[phraseIndex % phrases.length];
    let timer: number;

    if (!deleting) {
      if (text.length < current.length) {
        timer = window.setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timer = window.setTimeout(() => setDeleting(true), pause);
      }
    } else if (text.length > 0) {
      timer = window.setTimeout(() => {
        setText(current.slice(0, text.length - 1));
      }, deletingSpeed);
    } else {
      timer = window.setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, 220);
    }

    return () => window.clearTimeout(timer);
  }, [text, deleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pause, started]);

  return (
    <span
      className={className}
      aria-label={ariaLabel ?? phrases.join(', ')}
      style={{ display: 'inline-block', minHeight: '1.1em' }}
    >
      <span aria-hidden="true">
        {text}
        <span className="type-caret" />
      </span>
    </span>
  );
}
