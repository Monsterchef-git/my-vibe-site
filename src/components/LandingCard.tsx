'use client';
import Image from 'next/image';
import { useState } from 'react';
// Cambiamos ArrowOutward por ArrowUpRight
import { PenTool, Rocket, Layers3, ArrowUpRight } from 'lucide-react';

interface LandingCardProps {
    image: string;
    alt?: string;
    title: string;
    link: string;
    stack: 'next' | 'vite' | 'react' | 'design';
}

const stackLogos = {
    next: { logo: <Rocket size={20} className="text-lime-400" />, label: 'Next.js' },
    vite: { logo: <Layers3 size={20} className="text-cyan-400" />, label: 'Vite' },
    react: { logo: <Rocket size={20} className="text-blue-400" />, label: 'React' },
    // Cambiamos Figma por PenTool
    design: { logo: <PenTool size={20} className="text-orange-400" />, label: 'Design' },
};

export default function LandingCard({ image, alt, title, link, stack }: LandingCardProps) {
    const [hover, setHover] = useState(false);
    const { logo, label } = stackLogos[stack];

    const stackBorderColor = stack === 'next' ? 'border-lime-500/50 hover:shadow-[0_0_20px_#cafd00]' :
        stack === 'vite' ? 'border-cyan-500/50 hover:shadow-[0_0_20px_#22d3ee]' :
            stack === 'design' ? 'border-orange-500/50 hover:shadow-[0_0_20px_#f97316]' :
                'border-blue-500/50 hover:shadow-[0_0_20px_#60a5fa]';

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative aspect-video w-full block bg-zinc-900/50 rounded-2xl border ${stackBorderColor} overflow-hidden backdrop-blur-sm transition-all duration-700`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Background with Grain & Image */}
            <Image
                src={image}
                alt={alt ?? `Captura del proyecto ${title}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`absolute inset-0 object-cover ${hover ? 'grayscale-0 opacity-100 scale-105' : 'grayscale-0 opacity-80'} transition-all duration-1000 z-10`}
            />
            <div className="absolute inset-0 grainy-bg opacity-30 pointer-events-none z-15" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-20" />

            {/* Stack Icon & Label (Bottom Left, always visible but dim) */}
            <div className={`absolute bottom-5 left-5 z-30 flex items-center gap-3 ${hover ? 'opacity-100' : 'opacity-70'} transition-all duration-500`}>
                <div className={`p-2 rounded-lg ${stack === 'next' ? 'bg-lime-950/40' : stack === 'vite' ? 'bg-cyan-950/40' : stack === 'design' ? 'bg-orange-950/40' : 'bg-blue-950/40'}`}>
                    {logo}
                </div>
                <div>
                    <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white night-glow">{title}</h4>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">{label}</p>
                </div>
            </div>

            {/* Link Icon (Top Right, shows on hover) */}
            <div className={`absolute top-5 right-5 z-30 p-2.5 rounded-full bg-zinc-800 border border-zinc-700 ${hover ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'} transition-all duration-500`}>
                <ArrowUpRight size={14} className="text-zinc-400" />
            </div>
        </a>
    );
}
