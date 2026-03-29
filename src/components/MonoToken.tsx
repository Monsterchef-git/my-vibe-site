import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '@/components/primitive';

type MonoTokenKind = 'comment' | 'location' | 'project' | 'status';

const kindClassNames: Record<MonoTokenKind, string> = {
  comment: 'token-comment',
  location: 'token-location',
  project: 'token-project',
  status: 'token-status',
};

interface MonoTokenProps extends ComponentPropsWithoutRef<'span'> {
  kind: MonoTokenKind;
}

export default function MonoToken({
  kind,
  className,
  ...props
}: MonoTokenProps) {
  return (
    <span
      className={cx('mono-token', kindClassNames[kind], className)}
      {...props}
    />
  );
}
