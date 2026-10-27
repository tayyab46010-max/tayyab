'use client';

import { useEffect, useRef } from 'react';

export function SpotlightEffect() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    let mouseX = 0;
    let mouseY = 0;
    let spotlightX = 0;
    let spotlightY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      spotlightX += (mouseX - spotlightX) * 0.1;
      spotlightY += (mouseY - spotlightY) * 0.1;

      spotlight.style.background = `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, color-mix(in srgb, var(--accent) 8%, transparent), transparent 40%)`;

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'radial-gradient(600px circle at 50% 50%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 40%)',
      }}
      aria-hidden="true"
    />
  );
}
