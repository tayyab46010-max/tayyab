'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface RingTarget {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
}

const IDLE_SIZE = 34;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const hoveredElRef = useRef<HTMLElement | null>(null);
  const isHoveringRef = useRef(false);
  const ringTargetRef = useRef<RingTarget>({
    x: -100,
    y: -100,
    width: IDLE_SIZE,
    height: IDLE_SIZE,
    radius: IDLE_SIZE / 2,
  });
  const ringCurrentRef = useRef<RingTarget>({ ...ringTargetRef.current });
  const pointerRef = useRef({ x: -100, y: -100 });
  const pathname = usePathname();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let frame = 0;

    const measure = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const parsedRadius = parseFloat(style.borderTopLeftRadius);
      const height = rect.height + 12;
      const width = rect.width + 14;
      const radius = Number.isFinite(parsedRadius)
        ? Math.min(parsedRadius + 7, height / 2)
        : 999;

      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: Math.max(width, 40),
        height: Math.max(height, 40),
        radius,
      };
    };

    const syncPointer = (x: number, y: number) => {
      pointerRef.current = { x, y };
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      if (!hoveredElRef.current) {
        ringTargetRef.current = {
          x,
          y,
          width: isHoveringRef.current ? 44 : IDLE_SIZE,
          height: isHoveringRef.current ? 44 : IDLE_SIZE,
          radius: 999,
        };
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      syncPointer(e.clientX, e.clientY);
    };

    const clearHover = () => {
      hoveredElRef.current = null;
      isHoveringRef.current = false;
      setIsHovering(false);
    };

    const handlePointerOver = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>(
        'a, button, [role="button"], [data-cursor]'
      );

      if (!interactive) return;
      if (hoveredElRef.current === interactive) return;

      hoveredElRef.current = interactive;
      isHoveringRef.current = true;
      setIsHovering(true);
      ringTargetRef.current = measure(interactive);
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>(
        'a, button, [role="button"], [data-cursor]'
      );
      if (!interactive) return;

      const related = e.relatedTarget as HTMLElement | null;
      if (related && interactive.contains(related)) return;

      clearHover();
      ringTargetRef.current = {
        x: pointerRef.current.x,
        y: pointerRef.current.y,
        width: 44,
        height: 44,
        radius: 999,
      };
    };

    const handlePointerLeaveWindow = () => {
      clearHover();
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const handlePointerEnterWindow = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const handleScroll = () => {
      if (hoveredElRef.current) {
        // A page swap can detach the hovered element; its rect collapses to 0,0.
        if (hoveredElRef.current.isConnected) {
          ringTargetRef.current = measure(hoveredElRef.current);
        } else {
          clearHover();
          ringTargetRef.current = {
            x: pointerRef.current.x,
            y: pointerRef.current.y,
            width: IDLE_SIZE,
            height: IDLE_SIZE,
            radius: IDLE_SIZE / 2,
          };
        }
      }
    };

    const animate = () => {
      if (hoveredElRef.current && !hoveredElRef.current.isConnected) {
        clearHover();
        ringTargetRef.current = {
          x: pointerRef.current.x,
          y: pointerRef.current.y,
          width: IDLE_SIZE,
          height: IDLE_SIZE,
          radius: IDLE_SIZE / 2,
        };
      }
      const target = ringTargetRef.current;
      const current = ringCurrentRef.current;
      const ease = 0.16;

      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      current.width += (target.width - current.width) * 0.2;
      current.height += (target.height - current.height) * 0.2;
      current.radius += (target.radius - current.radius) * 0.24;

      ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      ring.style.width = `${current.width}px`;
      ring.style.height = `${current.height}px`;
      ring.style.borderRadius = `${Math.max(current.radius, 8)}px`;

      frame = requestAnimationFrame(animate);
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeaveWindow);
    document.documentElement.addEventListener('pointerenter', handlePointerEnterWindow);
    window.addEventListener('scroll', handleScroll, { passive: true });
    animate();

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeaveWindow);
      document.documentElement.removeEventListener('pointerenter', handlePointerEnterWindow);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    hoveredElRef.current = null;
    isHoveringRef.current = false;
    setIsHovering(false);
    
    ringTargetRef.current = {
      x: pointerRef.current.x,
      y: pointerRef.current.y,
      width: IDLE_SIZE,
      height: IDLE_SIZE,
      radius: IDLE_SIZE / 2,
    };
    ringCurrentRef.current = {
      x: pointerRef.current.x,
      y: pointerRef.current.y,
      width: IDLE_SIZE,
      height: IDLE_SIZE,
      radius: IDLE_SIZE / 2,
    };
    ring.style.transform = `translate3d(${pointerRef.current.x}px, ${pointerRef.current.y}px, 0) translate(-50%, -50%)`;
    ring.style.width = `${IDLE_SIZE}px`;
    ring.style.height = `${IDLE_SIZE}px`;
    ring.style.borderRadius = `${IDLE_SIZE / 2}px`;
  }, [pathname]);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 1,
          transition: 'width 0.25s ease, height 0.25s ease, opacity 0.25s ease',
          ...(isHovering && { width: '0px', height: '0px', opacity: 0 }),
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: IDLE_SIZE,
          height: IDLE_SIZE,
          border: `1.5px solid ${isHovering ? 'var(--accent)' : 'color-mix(in srgb, var(--accent) 70%, transparent)'}`,
          borderRadius: IDLE_SIZE / 2,
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 1,
          backgroundColor: isHovering
            ? 'color-mix(in srgb, var(--accent) 14%, transparent)'
            : 'transparent',
          transition:
            'background-color 0.28s ease, border-color 0.28s ease, opacity 0.25s ease',
        }}
      />
    </>
  );
}
