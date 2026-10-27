'use client';

import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const initDots = () => {
      const dotCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
      dotsRef.current = Array.from({ length: dotCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 0.8,
      }));
    };

    const getAccentColor = () => {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue('--accent').trim();
    };

    const isDarkMode = () => {
      return document.documentElement.classList.contains('dark');
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const accentColor = getAccentColor();
      const isDark = isDarkMode();
      const dotOpacity = isDark ? 0.6 : 0.8;
      const lineOpacity = isDark ? 0.2 : 0.35;
      const connectionDistance = 150;
      const mouseDistance = 200;

      ctx.clearRect(0, 0, width, height);

      // Draw cursor glow
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          300
        );
        // Parse accent color and add alpha
        const accentRgb = accentColor.startsWith('rgb') 
          ? accentColor.replace('rgb(', 'rgba(').replace(')', ', 0.08)')
          : accentColor + '15';
        gradient.addColorStop(0, accentRgb);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 300, 0, Math.PI * 2);
        ctx.fill();
      }

      dotsRef.current.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        const dx = mouseRef.current.x - dot.x;
        const dy = mouseRef.current.y - dot.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        if (distToMouse < mouseDistance) {
          const force = (mouseDistance - distToMouse) / mouseDistance;
          dot.vx -= (dx / distToMouse) * force * 0.08;
          dot.vy -= (dy / distToMouse) * force * 0.08;
        }

        // Keep minimum velocity for continuous movement
        const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
        if (speed < 0.3) {
          dot.vx *= 1.02;
          dot.vy *= 1.02;
        } else {
          dot.vx *= 0.99;
          dot.vy *= 0.99;
        }
      });

      dotsRef.current.forEach((dot1, i) => {
        dotsRef.current.slice(i + 1).forEach((dot2) => {
          const dx = dot1.x - dot2.x;
          const dy = dot1.y - dot2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * lineOpacity;
            ctx.strokeStyle = accentColor;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(dot1.x, dot1.y);
            ctx.lineTo(dot2.x, dot2.y);
            ctx.stroke();
          }
        });
      });

      dotsRef.current.forEach((dot) => {
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = dotOpacity;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      initDots();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resizeCanvas();
    initDots();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
