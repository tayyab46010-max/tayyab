'use client';

import { Download } from 'lucide-react';

export function FloatingResumeButton() {
  return (
    <a
      href="/resume"
      className="floating-action-button"
      aria-label="Download resume"
      title="Download Resume"
    >
      <Download className="size-6" aria-hidden="true" />
    </a>
  );
}
