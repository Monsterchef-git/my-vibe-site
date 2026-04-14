import Image from 'next/image';
import Eyebrow from '@/components/Eyebrow';
import MonoToken from '@/components/MonoToken';
import ScrollSectionPrimitive from '@/components/ScrollSectionPrimitive';
import { cx } from '@/components/primitive';
import { SectionChrome } from '@/components/sections/SectionChrome';

interface AboutSectionProps {
  id?: string;
  className?: string;
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
}: AboutSectionProps) {
  return (
    <ScrollSectionPrimitive id={id} scrollTone="white" className={cx('pt-20 md:pt-8 overflow-hidden', className)}>
      <SectionChrome
        index="03"
        label="About"
        meta="Medellin, Colombia"
        tone="white"
      />

      {/* ── Headline editorial ── */}
      <div className="mb-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-stretch lg:gap-16">
        <div className="flex h-full flex-col justify-between gap-8">
          <div className="space-y-8">
            <Eyebrow role="muted">Chef · Builder</Eyebrow>
            <div className="group relative space-y-0">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[-8%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(202,253,0,0.16)_0,rgba(202,253,0,0.08)_28%,transparent_68%)] opacity-45 blur-2xl transition-all duration-700 ease-out group-hover:left-[-5%] group-hover:opacity-70 group-hover:blur-3xl"
              />
              <h2 className="font-headline text-[clamp(3rem,11vw,9rem)] italic leading-[0.9] text-white">
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 -z-10 translate-x-[0.03em] translate-y-[0.045em] text-white/18 blur-[1.5px] transition-all duration-500 ease-out group-hover:translate-x-[0.05em] group-hover:translate-y-[0.065em] group-hover:text-white/24"
                  >
                    John
                  </span>
                  <span className="relative z-[1] transition-transform duration-500 ease-out group-hover:-translate-x-[0.01em] group-hover:-translate-y-[0.01em]">
                    John
                  </span>
                </span>
              </h2>
              <h2 className="font-headline text-[clamp(3rem,11vw,9rem)] italic leading-[0.9] text-[var(--accent-primary)] night-glow">
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 -z-10 translate-x-[0.035em] translate-y-[0.05em] text-[var(--accent-primary)]/20 blur-[2px] transition-all duration-500 ease-out group-hover:translate-x-[0.055em] group-hover:translate-y-[0.07em] group-hover:text-[var(--accent-primary)]/30"
                  >
                    Herrera
                  </span>
                  <span className="relative z-[1] transition-transform duration-500 ease-out group-hover:-translate-x-[0.01em] group-hover:-translate-y-[0.01em]">
                    Herrera
                  </span>
                </span>
              </h2>
            </div>
          </div>
          <p className="max-w-xl border-l border-white/10 pl-6 font-mono text-sm leading-relaxed text-zinc-400">
            A way of working shaped by kitchens, now carried into digital.
          </p>
        </div>

        <div className="mx-auto flex h-full w-full max-w-[340px] lg:mx-0 lg:justify-self-end">
          <div className="grainy-bg group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(202,253,0,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_38%,rgba(0,0,0,0.16))]"
            />
            <Image
              src="/images/about-john-herrera.png"
              alt="Portrait of John Herrera smiling while cooking."
              width={1656}
              height={2944}
              loading="eager"
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 38vw, 80vw"
              className="relative z-[1] h-auto w-full rounded-[1.5rem] bg-white object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

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
