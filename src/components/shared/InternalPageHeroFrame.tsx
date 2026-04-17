import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cx } from '@/lib/utils/cx';

interface InternalPageHeroFrameProps extends ComponentPropsWithoutRef<'header'> {
  as?: ElementType;
  children: ReactNode;
  sectionClassName?: string;
  contentClassName?: string;
}

export default function InternalPageHeroFrame({
  as: Tag = 'header',
  children,
  className,
  sectionClassName,
  contentClassName,
  ...props
}: InternalPageHeroFrameProps) {
  return (
    <Tag className={cx('mt-14 md:mt-20', className)} {...props}>
      <section className={cx('relative min-h-[64svh] pt-10 md:min-h-[70svh] md:pt-14', sectionClassName)}>
        <div
          className={cx(
            'mx-auto flex min-h-[64svh] w-full max-w-6xl flex-col justify-end pb-8 md:min-h-[70svh] md:pb-12',
            contentClassName,
          )}
        >
          {children}
        </div>
      </section>
    </Tag>
  );
}
