'use client';
import { useEffect, useState } from 'react';
import { AtSign, LayoutGrid, Terminal, User, Utensils } from 'lucide-react';
import { cx } from '@/components/primitive';

const SECTION_IDS = ['hero', 'about', 'gastronomy', 'development', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');

    useEffect(() => {
        let frame = 0;

        const updateActiveSection = () => {
            const probeLine = window.innerHeight * 0.38;
            let nextActiveSection: SectionId = SECTION_IDS[0];

            for (const id of SECTION_IDS) {
                const element = document.getElementById(id);

                if (!element) {
                    continue;
                }

                const rect = element.getBoundingClientRect();

                if (rect.top <= probeLine) {
                    nextActiveSection = id;
                }

                if (rect.top <= probeLine && rect.bottom >= probeLine) {
                    nextActiveSection = id;
                    break;
                }
            }

            setActiveSection((current) =>
                current === nextActiveSection ? current : nextActiveSection,
            );
        };

        const requestUpdate = () => {
            if (frame) {
                return;
            }

            frame = window.requestAnimationFrame(() => {
                updateActiveSection();
                frame = 0;
            });
        };

        updateActiveSection();
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate);

        return () => {
            if (frame) {
                window.cancelAnimationFrame(frame);
            }

            window.removeEventListener('scroll', requestUpdate);
            window.removeEventListener('resize', requestUpdate);
        };
    }, []);

    const getActiveStyles = (id: string) => {
        if (activeSection !== id) {
            return 'text-zinc-500 hover:-translate-y-0.5 hover:scale-[1.04] hover:text-white';
        }

        switch (id) {
            case 'hero': return 'bg-zinc-800 text-white shadow-[0_0_20px_rgba(255,255,255,0.12)] -translate-y-0.5 scale-[1.08]';
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
                    className={cx(
                        'relative z-[110] flex items-center justify-center rounded-full p-4 transition-[transform,color,background-color,box-shadow] duration-[260ms] ease-[cubic-bezier(0.16,1.18,0.32,1)]',
                        getActiveStyles('hero'),
                    )}>
                    <LayoutGrid size={20} strokeWidth={2.5} />
                </a>
            </div>
        </nav>
    );
}
