import type { CSSProperties } from 'react';
import { glowPreset } from '@/design/tokens/primitives/atmosphere';
import { cx } from '@/lib/utils/cx';

type AmbientTone = keyof typeof glowPreset;
type AmbientIntensity = 'soft' | 'medium' | 'strong';
type AmbientPosition = 'center' | 'top-right' | 'bottom-left';

interface AmbientGlowProps {
  tone: AmbientTone;
  intensity?: AmbientIntensity;
  position?: AmbientPosition;
  className?: string;
  style?: CSSProperties;
}

const intensityScale: Record<AmbientIntensity, number> = {
  soft: 0.75,
  medium: 1,
  strong: 1.25,
};

const positionClassName: Record<AmbientPosition, string> = {
  center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  'top-right': 'right-0 top-0 translate-x-[18%] -translate-y-[18%]',
  'bottom-left': 'bottom-0 left-0 -translate-x-[18%] translate-y-[18%]',
};

export default function AmbientGlow({
  tone,
  intensity = 'medium',
  position = 'center',
  className,
  style,
}: AmbientGlowProps) {
  const preset = glowPreset[tone];
  const opacity = preset.opacity * intensityScale[intensity];

  return (
    <div
      aria-hidden="true"
      className={cx(
        'pointer-events-none absolute rounded-full blur-3xl',
        positionClassName[position],
        className,
      )}
      style={{
        width: preset.size,
        height: preset.size,
        background: `radial-gradient(circle, ${preset.color} 0%, transparent 70%)`,
        opacity,
        ...style,
      }}
    />
  );
}
