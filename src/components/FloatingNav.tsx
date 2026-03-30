'use client';
import { useEffect, useState } from 'react';
import { AtSign, LayoutGrid, Terminal, User, Utensils } from 'lucide-react';
import { cx } from '@/components/primitive';

export default function FloatingNav() {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.5 }
        );

        document.querySelectorAll('section[id], footer[id]').forEach((element) => {
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const getActiveStyles = (id: string) => {
        if (activeSection !== id) {
            return 'text-zinc-500 hover:-translate-y-0.5 hover:scale-[1.04] hover:text-white';
        }

        switch (id) {
            case 'about': return 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] -translate-y-0.5 scale-[1.08]';
            case 'gastronomy': return 'bg-lime-400 text-black shadow-[0_0_20px_rgba(202,253,0,0.5)] -translate-y-0.5 scale-[1.08]';
            case 'development': return 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.5)] -translate-y-0.5 scale-[1.08]';
            case 'contact': return 'bg-blue-400 text-black shadow-[0_0_20px_rgba(96,165,250,0.5)] -translate-y-0.5 scale-[1.08]';
            default: return 'bg-zinc-800 text-white';
        }
    };

    return (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[100] pointer-events-auto">
            <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-full px-2 py-2 flex justify-around items-center shadow-2xl">

                <a href="#about" aria-label="Sobre mí"
                    className={cx(
                        'relative z-[110] flex items-center justify-center rounded-full p-4 transition-[transform,color,background-color,box-shadow] duration-[260ms] ease-[cubic-bezier(0.16,1.18,0.32,1)]',
                        getActiveStyles('about'),
                    )}>
                    <User size={20} strokeWidth={2.5} />
                </a>

                <a href="#gastronomy" aria-label="Gastronomía"
                    className={cx(
                        'relative z-[110] flex items-center justify-center rounded-full p-4 transition-[transform,color,background-color,box-shadow] duration-[260ms] ease-[cubic-bezier(0.16,1.18,0.32,1)]',
                        getActiveStyles('gastronomy'),
                    )}>
                    <Utensils size={20} strokeWidth={2.5} />
                </a>

                <a href="#development" aria-label="Desarrollo"
                    className={cx(
                        'relative z-[110] flex items-center justify-center rounded-full p-4 transition-[transform,color,background-color,box-shadow] duration-[260ms] ease-[cubic-bezier(0.16,1.18,0.32,1)]',
                        getActiveStyles('development'),
                    )}>
                    <Terminal size={20} strokeWidth={2.5} />
                </a>

                <a href="#contact" aria-label="Contacto"
                    className={cx(
                        'relative z-[110] flex items-center justify-center rounded-full p-4 transition-[transform,color,background-color,box-shadow] duration-[260ms] ease-[cubic-bezier(0.16,1.18,0.32,1)]',
                        getActiveStyles('contact'),
                    )}>
                    <AtSign size={20} strokeWidth={2.5} />
                </a>

                <a href="#hero" aria-label="Inicio"
                    className="relative z-[110] flex items-center justify-center p-4 text-zinc-500 transition-[transform,color] duration-[220ms] ease-[cubic-bezier(0.16,1.18,0.32,1)] hover:-translate-y-0.5 hover:scale-[1.04] hover:text-white">
                    <LayoutGrid size={20} strokeWidth={2.5} />
                </a>
            </div>
        </nav>
    );
}
