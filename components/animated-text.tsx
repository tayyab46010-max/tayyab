'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface WritingTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  once?: boolean;
}

export function WritingText({
  text,
  className = '',
  delay = 0,
  speed = 40,
  once = true,
}: WritingTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setDisplayed(text);
      return;
    }

    if (isInView && !started) {
      const timer = setTimeout(() => setStarted(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, started, delay, text]);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;
    if (!started) return;

    let current = 0;
    const chars = Array.from(text);
    
    const interval = setInterval(() => {
      current++;
      setDisplayed(chars.slice(0, current).join(''));
      if (current >= chars.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  const motionQuery = mounted ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  const visible = motionQuery ? text : displayed;

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{visible}</span>
      {!motionQuery && started && displayed.length < text.length && (
        <span className="type-caret" />
      )}
    </span>
  );
}

interface ScrollingTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
}

export function ScrollingText({
  children,
  className = '',
  speed = 30,
  direction = 'left',
}: ScrollingTextProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setWidth(trackRef.current.scrollWidth / 2);
    }
  }, [children]);

  const duration = width > 0 ? width / speed : 20;

  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <motion.div
        ref={trackRef}
        className="marquee-track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        <div className="marquee-group">{children}</div>
        <div className="marquee-group">{children}</div>
      </motion.div>
    </div>
  );
}
