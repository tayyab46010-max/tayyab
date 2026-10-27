'use client';

import { useTilt3D } from '@/hooks/use-tilt-3d';

export function TiltTimelineItem({ children }: { children: React.ReactNode }) {
  const tiltRef = useTilt3D();
  return (
    <div
      ref={tiltRef}
      className="timeline-item pb-8"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s ease-out',
      }}
    >
      <div className="card-glow" />
      {children}
    </div>
  );
}

export function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const tiltRef = useTilt3D();
  return (
    <div
      ref={tiltRef}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s ease-out',
      }}
    >
      <div className="card-glow" />
      {children}
    </div>
  );
}
