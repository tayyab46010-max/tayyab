'use client';

import { useEffect, useState } from 'react';

export function DevToolsDetector() {
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        setDetected(true);
      } else {
        setDetected(false);
      }
    };

    const checkDebugger = () => {
      const start = performance.now();
      debugger;
      const end = performance.now();
      if (end - start > 100) {
        setDetected(true);
      }
    };

    const interval = setInterval(() => {
      detectDevTools();
    }, 1000);

    window.addEventListener('resize', detectDevTools);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', detectDevTools);
    };
  }, []);

  if (!detected) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
      <div className="text-center space-y-4">
        <div className="text-6xl">⚠️</div>
        <h2 className="text-2xl font-bold">Developer Tools Detected</h2>
        <p className="text-[var(--text-secondary)] max-w-md">
          This website is protected. Please close Developer Tools to continue browsing.
        </p>
        <button
          onClick={() => setDetected(false)}
          className="mt-4 px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          I've closed it
        </button>
      </div>
    </div>
  );
}
