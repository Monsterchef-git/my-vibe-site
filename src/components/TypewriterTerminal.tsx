'use client';
import { useState, useEffect } from 'react';
import MonoToken from '@/components/MonoToken';
import { cx } from '@/components/primitive';

const MESSAGES = [
  "// Desplegando TecnicalApp Landing v1.2.0",
  "import { Primitive, cx } from '@/components/primitive';",
  "import { TypewriterTerminal } from '@/components/TypewriterTerminal';",
  "",
  "> Inicializando tema: Stitch-Surface/4",
  "> Aplicando: backdrop-blur-xl grain-overlay",
  "",
  "// Renderizando secciones de producto",
  "const Layout = () => (",
  "  <Primitive.Section className={cx('bg-zinc-950/70')}>",
  "    <TypewriterTerminal className='font-mono' />",
  "  </Primitive.Section>",
  ");",
  "",
  "→ LCP optimizado: 0.8s",
  "→ Estado: 100% operativo | Success-Pulse: ON",
  "// En vivo: https://www.tecnical.app"
];

interface TypewriterTerminalProps {
  className?: string;
}

function renderLine(line: string) {
  if (line === "// Desplegando TecnicalApp Landing v1.2.0") {
    return (
      <>
        <span>{'// Desplegando '}</span>
        <MonoToken kind="project">TecnicalApp</MonoToken>
        <span>{' Landing v1.2.0'}</span>
      </>
    );
  }

  if (line === "→ Estado: 100% operativo | Success-Pulse: ON") {
    return (
      <>
        <span>{'→ Estado: '}</span>
        <MonoToken kind="status">100% operativo</MonoToken>
        <span>{' | '}</span>
        <MonoToken kind="status">Success-Pulse: ON</MonoToken>
      </>
    );
  }

  if (line === "// En vivo: https://www.tecnical.app") {
    return (
      <>
        <span>{'// En vivo: '}</span>
        <MonoToken kind="project">tecnical.app</MonoToken>
      </>
    );
  }

  return line;
}

export default function TypewriterTerminal({
  className,
}: TypewriterTerminalProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < MESSAGES.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, MESSAGES[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    }
    else {
      const restartTimer = setTimeout(() => {
        setLines([]);
        setCurrentLineIndex(0);
      }, 3000);
      return () => clearTimeout(restartTimer);
    }
  }, [currentLineIndex]);

  return (
    <div
      className={cx(
        'h-[280px] overflow-hidden space-y-1.5 font-mono text-[10px] md:h-[300px] md:text-xs',
        className,
      )}
    >
      {lines.map((line, i) => (
        <p key={i} className={
          line.startsWith('//') ? 'text-zinc-600 italic' :
            line.startsWith('>') ? 'text-cyan-400/80' :
              line.startsWith('→') ? 'text-lime-400' :
                line.includes('Success-Pulse') ? 'text-lime-400 font-bold' :
                  'text-zinc-400 tracking-tighter'
        }>
          {renderLine(line)}
          {i === lines.length - 1 && currentLineIndex < MESSAGES.length && (
            <span className="inline-block w-1.5 h-3 bg-lime-400 ml-1 animate-pulse" />
          )}
        </p>
      ))}
    </div>
  );
}
