'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const provenanceIngredients = [
  { label: 'Cacao_nativo', origin: 'Antioquia', image: '/images/cacao_nativo.png' },
  { label: 'Plátano_hartón', origin: 'Urabá', image: '/images/platano_harton.png' },
  { label: 'Trucha', origin: 'Eje_Cafetero', image: '/images/trucha_eje.png' },
  { label: 'Mora', origin: 'Boyacá', image: '/images/mora_boyaca.png' },
  { label: 'Maíz_criollo', origin: 'Córdoba', image: '/images/maiz_criollo.png' },
] as const;

export default function ProvenanceTokens() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (hoveredImage) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredImage]);

  return (
    <>
      <div className="flex flex-wrap gap-2 pt-1">
        {provenanceIngredients.map((item) => (
          <span
            key={item.label}
            onMouseEnter={() => setHoveredImage(item.image)}
            onMouseLeave={() => setHoveredImage(null)}
            className="inline-flex cursor-crosshair items-center gap-1.5 rounded-full border border-lime-400/18 bg-black/60 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.22em] text-zinc-500 backdrop-blur-sm transition-colors duration-300 hover:border-lime-400/40 hover:text-lime-300"
          >
            <span className="text-lime-400/80">{item.label}</span>
            <span className="text-zinc-700">→</span>
            <span>{item.origin}</span>
          </span>
        ))}
      </div>

      {hoveredImage && (
        <div
          className="pointer-events-none fixed z-[9999] overflow-hidden rounded-xl border border-lime-400/30 bg-black/80 shadow-[0_0_40px_rgba(202,253,0,0.15)] backdrop-blur-3xl transition-transform duration-75 ease-out"
          style={{
            left: mousePos.x + 20, // Offset text
            top: mousePos.y + 20,
            width: '280px',
            height: '280px',
          }}
        >
          <Image
            src={hoveredImage}
            alt="Provenance detail"
            fill
            className="object-cover opacity-85 transition-opacity duration-300"
            sizes="280px"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
          <div className="grainy-bg absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" />
        </div>
      )}
    </>
  );
}
