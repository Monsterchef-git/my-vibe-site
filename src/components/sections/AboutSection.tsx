import Eyebrow from '@/components/Eyebrow';
import MonoToken from '@/components/MonoToken';
import ScrollSectionPrimitive from '@/components/ScrollSectionPrimitive';
import { cx } from '@/components/primitive';
import { SectionChrome } from '@/components/sections/SectionChrome';

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
  { key: 'APPROACH', value: 'Service-led · editorial · clear' },
];

export default function AboutSection({
  id = 'about',
  className,
  compact = false,
}: AboutSectionProps) {
  return (
    <ScrollSectionPrimitive id={id} scrollTone="white" className={cx(compact ? 'overflow-hidden pt-4 md:pt-6' : 'overflow-hidden pt-20 md:pt-8', className)}>
      {!compact && (
        <SectionChrome
          index="03"
          label="About"
          meta="Medellin, Colombia"
          tone="white"
        />
      )}

      <div className="grid gap-12 border-t border-zinc-800/60 pt-8 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div className="grid gap-6 md:grid-cols-2">
          <p className="font-mono text-sm leading-relaxed text-zinc-400">
            I spent more than a decade in kitchens, learning how to work with pace,
            pressure, and service without losing clarity.
          </p>
          <p className="font-mono text-sm leading-relaxed text-zinc-500">
            Today that same way of thinking informs the digital side of my work: brand
            sites, visual systems, and a more editorial approach to structure. I work as
            Creative Chef at <MonoToken kind="project">Wink Eventos</MonoToken> and lead
            the landing experience for <MonoToken kind="project">tecnical.app</MonoToken>.
          </p>
        </div>

        <div className="shrink-0 lg:w-60">
          <Eyebrow as="span" role="dim" className="mb-4 block">Profile</Eyebrow>
          <div className="space-y-0">
            {specRows.map((item, i) => (
              <div
                key={item.key}
                className={cx(
                  'py-3',
                  i < specRows.length - 1 && 'border-b border-zinc-800/50',
                )}
              >
                <Eyebrow as="span" role="dim" className="block tracking-[0.18em]">
                  {item.key}
                </Eyebrow>
                <Eyebrow as="span" role="muted" className="mt-0.5 block tracking-[0.18em]">
                  {item.value}
                </Eyebrow>
              </div>
            ))}

            {/* Status note */}
            <div className="border-t border-zinc-800/50 pt-4">
              <Eyebrow as="span" role="dim" className="block tracking-[0.18em]">
                AVAILABILITY
              </Eyebrow>
              <MonoToken kind="status" className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.24em]">
                Private inquiries
              </MonoToken>
            </div>
          </div>
        </div>
      </div>

    </ScrollSectionPrimitive>
  );
}
