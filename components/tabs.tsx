'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

export function Tabs({ tabs, className = '' }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeTab = tabRefs.current[activeIndex];
    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeIndex]);

  return (
    <div className={className}>
      <div className="relative flex border-b border-[var(--border-glass)] mb-8">
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => setActiveIndex(index)}
            className={`relative px-6 py-3 text-sm font-semibold transition-colors duration-300 ${
              activeIndex === index
                ? 'text-[var(--accent)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-[var(--accent)]"
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />
      </div>

      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {tabs[activeIndex].content}
      </motion.div>
    </div>
  );
}
