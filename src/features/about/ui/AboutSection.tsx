import { Eyebrow, MonoToken, CulinaryTerm } from '@/design/primitives';
import {
  sectionBodyClassName,
  sectionMicroClassName,
  sectionSupportClassName,
} from '@/design/tokens/components/sectionStyles';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { SectionChrome } from '@/design/ui';
import { cx } from '@/lib/utils/cx';

interface AboutSectionProps {
  id?: string;
  className?: string;
  compact?: boolean;
}

const specRows = [
  { key: 'CITY', value: 'Medellin, Colombia' },
  { key: 'CUISINE', value: 'Contemporary tropical' },
  { key: 'TOOLS', value: 'Next.js · Tailwind · AI' },
  { key: 'FOCUS', value: 'Brand sites · SEO · visual direction' },
  { key: 'APPROACH', value: <span><CulinaryTerm term="service">Service</CulinaryTerm>-led · editorial · clear</span> },
];

export default function AboutSection({
  id = 'about',
  className,
  compact = false,
}: AboutSectionProps) {
  return (
    <section
      id={id}
      data-scroll-tone="white"
      data-cursor-role="chef"
      className={cx(
        'relative w-full overflow-hidden',
        compact ? 'pt-4 md:pt-6' : 'py-32 md:py-52',
        className
      )}
    >
      {!compact && (
        <SectionChrome
          index="03"
          label="About"
          meta="Medellin, Colombia"
          tone="white"
        />
      )}

      <div
        className={cx(
          !compact && 'reveal',
          'grid gap-12 border-t border-zinc-800/60 pt-8 lg:grid-cols-[1fr_auto] lg:gap-20',
        )}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <p className={sectionBodyClassName}>
            I spent more than a decade in kitchens, learning how to work with pace,
            pressure, and <CulinaryTerm term="service">service</CulinaryTerm> without losing clarity.
          </p>
          <p className={sectionSupportClassName}>
            Today that same way of thinking informs the digital side of my work: brand
            sites, visual systems, and a more editorial approach to structure. I work as
            Creative Chef at <MonoToken kind="project">Wink Eventos</MonoToken>.
          </p>
        </div>

        <div className="shrink-0 lg:w-60">
          <Eyebrow as="span" role="dim" className="mb-4 block">
            Profile
          </Eyebrow>
          <div className="space-y-0">
            {specRows.map((item, i) => (
              <div
                key={item.key}
                className={cx(
                  'py-3',
                  i < specRows.length - 1 && 'border-b border-zinc-800/50',
                )}
              >
                <Eyebrow as="span" role="dim" className={cx('block', tracking.label)}>
                  {item.key}
                </Eyebrow>
                <span className={cx(sectionMicroClassName, 'mt-1 block normal-case text-zinc-300/76')}>
                  {item.value}
                </span>
              </div>
            ))}

            <div className="border-t border-zinc-800/50 pt-4">
              <Eyebrow as="span" role="dim" className={cx('block', tracking.label)}>
                AVAILABILITY
              </Eyebrow>
              <MonoToken kind="status" className={cx('mt-2 inline-block font-mono text-[10px] uppercase', tracking.label)}>
                Private inquiries
              </MonoToken>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
