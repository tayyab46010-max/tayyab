'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Vertical scroll drives horizontal gliding: the wrapper is as tall as the
 * track's horizontal overflow, the inner viewport is sticky, and scroll
 * progress translates the track left/right 1:1 with pixels scrolled.
 */
export function HorizontalScroll({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let raf = 0;

    // Recomputed on every update so a stale measurement (e.g. after switching
    // tabs and back) self-heals on the next scroll frame.
    const update = () => {
      // clientWidth excludes the desktop scrollbar that innerWidth includes.
      const maxShift = Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
      wrap.style.height = `${maxShift + window.innerHeight}px`;
      const rect = wrap.getBoundingClientRect();
      const scrollable = wrap.offsetHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      track.style.transform = `translate3d(${(-progress * maxShift).toFixed(1)}px, 0, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const onResize = () => update();

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      {/* Full-bleed breakout: the clip window must span the real viewport so it
          matches the scroll math; inside the 80% container it would cut off
          every card. */}
      <div className="sticky top-0 flex h-dvh w-screen ml-[calc(50%-50vw)] items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 px-[8vw] will-change-transform"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
