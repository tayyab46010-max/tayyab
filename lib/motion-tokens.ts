export const motionTokens = {
  durations: {
    quick: 120,
    normal: 240,
    slow: 480,
    cinematic: 800,
  },
  easings: {
    out: [0.16, 1, 0.3, 1] as const,
    inOut: [0.65, 0, 0.35, 1] as const,
    in: [0.7, 0, 0.3, 0] as const,
  },
  springs: {
    gentle: { stiffness: 200, damping: 30 },
    default: { stiffness: 300, damping: 30 },
    snappy: { stiffness: 400, damping: 25 },
  },
} as const;

export type MotionDuration = keyof typeof motionTokens.durations;
export type MotionEasing = keyof typeof motionTokens.easings;
export type MotionSpring = keyof typeof motionTokens.springs;
