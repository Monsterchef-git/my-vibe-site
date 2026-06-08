import { tracking } from '@/design/tokens/primitives/atmosphere';
import { sectionGutterClassName } from '@/design/tokens/components/sectionStyles';
import { cx } from '@/lib/utils/cx';

const links = [
  {
    href: 'https://www.instagram.com/johnherrerachef/',
    label: 'Instagram',
    color: 'text-lime-300 hover:text-lime-200 focus-visible:text-lime-200',
  },
  {
    href: 'https://github.com/Monsterchef-git',
    label: 'GitHub',
    color: 'text-lime-300 hover:text-lime-200 focus-visible:text-lime-200',
  },
  {
    href: 'https://www.linkedin.com/in/john-herrera-chef/',
    label: 'LinkedIn',
    color: 'text-blue-300 hover:text-blue-200 focus-visible:text-blue-200',
  },
] as const;

export default function SiteFooter() {
  return (
    <footer
      className={cx(
        'relative z-10 bg-[#0a0a0a] pb-[calc(4.5rem+env(safe-area-inset-bottom))] pt-24 text-white md:pt-32',
        sectionGutterClassName,
      )}
    >
      <div className="grid border-y border-zinc-900/60 md:grid-cols-3">
        {links.map(({ href, label, color }, index) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(
              'flex min-h-11 items-center justify-between border-zinc-900/60 py-5 font-mono text-[11px] uppercase transition-colors duration-[700ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-inset motion-reduce:transition-none md:px-6',
              index < links.length - 1 && 'border-b md:border-b-0 md:border-r',
              tracking.label,
              color,
            )}
          >
            <span>{label}</span>
            <span aria-hidden="true" className="text-zinc-600">↗</span>
          </a>
        ))}
      </div>
      <p className={cx('pt-5 font-mono text-[11px] uppercase text-zinc-500', tracking.label)}>
        © 2026
      </p>
    </footer>
  );
}
