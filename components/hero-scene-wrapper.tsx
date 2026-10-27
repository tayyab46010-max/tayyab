'use client';

import dynamic from 'next/dynamic';

const HeroSceneCanvas = dynamic(
  () => import('@/components/hero-scene').then((m) => ({ default: m.HeroScene })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-32 rounded-2xl border border-[var(--border)] bg-[var(--glass-bg)] animate-pulse" />
      </div>
    ),
  }
);

export function HeroSceneWrapper() {
  return <HeroSceneCanvas />;
}
