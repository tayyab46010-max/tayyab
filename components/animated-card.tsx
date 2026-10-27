'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: boolean;
}

export function AnimatedCard({
  children,
  className = '',
  delay = 0,
  hoverScale = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={hoverScale ? { y: -8, scale: 1.02 } : {}}
      whileTap={hoverScale ? { scale: 0.98 } : {}}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface StaggerCardProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerCards({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggerCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerCardItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, rotateX: 10 },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: {
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}
