'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { PageStarter } from '@/components/page-starter';

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
    >
      <PageStarter />
      {children}
    </motion.div>
  );
}
