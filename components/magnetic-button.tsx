'use client';

import { useRef, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  cursorText?: string;
}

export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  cursorText,
}: MagneticButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
  };

  const commonProps = {
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    'data-cursor': 'true',
    'data-cursor-text': cursorText || '',
  };

  if (href) {
    return (
      <a href={href} ref={anchorRef} {...commonProps}>
        {children}
      </a>
    );
  }

  return (
    <button ref={buttonRef} onClick={onClick} {...commonProps}>
      {children}
    </button>
  );
}
