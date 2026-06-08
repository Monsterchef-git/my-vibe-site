'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { cx } from '@/lib/utils/cx';

interface StatementRevealProps {
  children: ReactNode;
  className?: string;
}

function revealNode(node: ReactNode, index: { current: number }): ReactNode {
  if (typeof node === 'string') {
    return node.split(/(\s+)/).map((part) => {
      if (/^\s+$/.test(part)) {
        return part;
      }

      const wordIndex = index.current++;
      return (
        <span
          key={`${part}-${wordIndex}`}
          className="statement-reveal-word"
          style={{ '--word-index': wordIndex } as CSSProperties}
        >
          {part}
        </span>
      );
    });
  }

  if (!isValidElement(node)) {
    return node;
  }

  const element = node as ReactElement<{ children?: ReactNode }>;
  if (element.props.children === undefined) {
    return element;
  }

  return cloneElement(
    element,
    undefined,
    Children.map(element.props.children, (child) => revealNode(child, index)),
  );
}

export default function StatementReveal({
  children,
  className,
}: StatementRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const index = { current: 0 };

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={cx('statement-reveal', active && 'is-active', className)}
    >
      {Children.map(children, (child) => revealNode(child, index))}
    </span>
  );
}
