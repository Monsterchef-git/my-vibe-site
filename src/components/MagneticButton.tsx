'use client';

import { useRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

type MagneticButtonProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  strength?: number; // 0–1, qué tanto se mueve. Default 0.35
  as?: 'div' | 'span';
};

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  as = 'div',
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Component = as;

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  }

  return (
    <Component
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', willChange: 'transform' }}
      {...props}
    >
      {children}
    </Component>
  );
}
