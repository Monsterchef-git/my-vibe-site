import Image from 'next/image';
import ErrorBoundary from '@/components/ErrorBoundary';
import MonoToken from '@/components/MonoToken';
import FloatingNav from '@/components/FloatingNav';
import ScrollReveal from '@/components/ScrollReveal';
import SplitReveal from '@/components/SplitReveal';
import MagneticButton from '@/components/MagneticButton';
import { Primitive, cx } from '@/components/primitive';
import StitchCardStack from '@/components/StitchCardStack';
import TypewriterTerminal from '@/components/TypewriterTerminal';

const sectionIntroClassName = 'space-y-3';
const sectionEyebrowClassName = 'font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-500';
const sectionTitleClassName = 'text-5xl md:text-7xl font-headline italic leading-none';
const sectionBodyClassName = 'max-w-4xl font-mono text-sm leading-relaxed text-zinc-500';

const culinaryScanMetrics = [
  { label: 'GRASA', value: 'RENDER_RATIO...88%' },
  { label: 'CALOR', value: 'BRASAS_ACTIVAS' },
  { label: 'TEXTURA', value: 'CORTEZA_ESTABLE' },
  { label: 'SERVICIO', value: 'VENTANA_DE_PASE...42S' },
] as const;

export default function Home() {

  return (
    <main id="main-content" className="min-h-screen grainy-bg bg-[#0a0a0a] text-white px-6 md:px-24 pb-40 relative z-0">
      <ErrorBoundary>
        <ScrollReveal />
      </ErrorBoundary>

      {/* Global Header Limpio - Solo Identidad y Disponibilidad */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-[150] pointer-events-none">
        <MagneticButton as="div" className="pointer-events-auto" strength={0.4}>
          <span className="font-black text-2xl tracking-tighter hover-glitch cursor-pointer">JH.</span>
        </MagneticButton>

        <MagneticButton as="div" className="pointer-events-auto" strength={0.3}>
          <div className="flex items-center gap-3 bg-zinc-900/80 backdrop-blur-2xl px-5 py-2.5 rounded-full border border-white/10 shadow-2xl transition-all hover:border-lime-400/50">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-400 shadow-[0_0_10px_#cafd00]"></span>
            </div>
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-lime-400">
              <MonoToken kind="status">Exploremos ideas</MonoToken>
            </span>
          </div>
        </MagneticButton>
      </header>

      {/* Hero Section — Puro impacto tipográfico */}
      <section id="hero" className="flex flex-col justify-center min-h-screen pt-28 pb-16 px-6">
        <div className="space-y-6">
          <div className="text-lime-400 uppercase tracking-[0.3em] font-black text-xs md:text-sm hover-glitch cursor-default inline-block">
            <SplitReveal as="span" by="char" delay={100} stagger={35}>
              John Herrera _
            </SplitReveal>
          </div>
          <SplitReveal
            as="h1"
            by="word"
            delay={300}
            stagger={80}
            className="text-7xl md:text-8xl lg:text-9xl font-headline italic leading-[0.9] text-zinc-200 pb-2"
          >
            Chef by Day,
          </SplitReveal>
          <SplitReveal
            as="h2"
            by="word"
            delay={500}
            stagger={80}
            className="text-7xl md:text-8xl lg:text-9xl font-bold text-[#cafd00] uppercase tracking-tighter leading-[0.85] night-glow pb-2"
          >
            Vibe-Coder by Night
          </SplitReveal>
          <p
            className="max-w-lg border-l border-[#cafd00]/30 pt-8 pl-6 font-mono text-sm leading-relaxed text-zinc-500 opacity-0 translate-y-4 transition-all duration-700 delay-[800ms]"
            style={{ animation: 'hero-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s forwards' }}
          >
            Dos disciplinas, un mismo estándar: precisión, producto y ejecución sin ruido.
            {' '}Desde <MonoToken kind="location">Medellín</MonoToken> para marcas con ambición global.
          </p>
        </div>
      </section>

      {/* SECCIÓN 0: ABOUT — Dossier Personal */}
      <Primitive.Section id="about" className="mt-32 pt-20 md:pt-8 reveal bg-zinc-950/70">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">

          {/* Columna izquierda: Bio narrativa */}
          <div className="space-y-8">
            <div className={sectionIntroClassName}>
              <p className={sectionEyebrowClassName}>
                Medellín, Colombia • +10 años en cocina • vibe-coder
              </p>
              <h2 className={cx(sectionTitleClassName, 'text-white')}>
                Sobre <span className="text-[#cafd00] night-glow">mí</span>
              </h2>
            </div>

            <div className="space-y-5 border-l border-zinc-800/80 pl-6">
              <p className="font-mono text-sm leading-relaxed text-zinc-400">
                Soy John Herrera — chef con más de una década en cocinas de hoteles, restaurantes
                y clubes de <MonoToken kind="location">Medellín</MonoToken>. Mi cocina es contemporánea
                con esencia tropical: técnica de alta cocina, producto local y orgánico, y una obsesión
                por que cada plato cuente una historia.
              </p>
              <p className="font-mono text-sm leading-relaxed text-zinc-400">
                En paralelo, construyo experiencias digitales con el mismo rigor que aplico en un
                servicio. Desarrollo landings de alto impacto, optimizo SEO y despliegue, y diseño
                sistemas visuales para marcas que necesitan presencia real en internet.
              </p>
              <p className="font-mono text-sm leading-relaxed text-zinc-500">
                Actualmente soy chef creativo en <MonoToken kind="project">Wink Eventos</MonoToken> y
                lidero el producto digital de <MonoToken kind="project">TecnicalApp</MonoToken>.
              </p>
            </div>
          </div>

          {/* Columna derecha: Spec Sheet estilo terminal */}
          <div className="flex items-center">
            <div className="w-full space-y-4 rounded-[2rem] border border-zinc-800/60 bg-black/50 p-6 backdrop-blur-xl md:p-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.42em] text-zinc-600">
                {'// spec_sheet.yml'}
              </p>

              {[
                { key: 'NOMBRE', value: 'John Herrera' },
                { key: 'BASE', value: 'Medellín, Antioquia' },
                { key: 'COCINA', value: 'Contemporánea tropical' },
                { key: 'STACK', value: 'Next.js • Tailwind • IA aplicada' },
                { key: 'EXPERTISE', value: 'Landings • SEO • Diseño • Deploy' },
                { key: 'FILOSOFÍA', value: 'Precisión, producto local, alma' },
                { key: 'STATUS', value: 'Exploremos ideas' },
              ].map((item, index) => (
                <div
                  key={item.key}
                  className={cx(
                    'flex items-start justify-between gap-6 pb-3 font-mono text-[11px] uppercase tracking-[0.18em]',
                    index < 6 && 'border-b border-zinc-800/50',
                  )}
                >
                  <span className="shrink-0 text-zinc-600">{item.key}</span>
                  <span className={cx(
                    'text-right',
                    item.key === 'STATUS' ? 'text-lime-400' : 'text-zinc-300',
                  )}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Primitive.Section>

      {/* Bridge: About → Gastronomy */}
      <div className="my-24 flex items-center gap-6 reveal">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-lime-400/20 to-transparent" />
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-600">
          Lo que cocino _
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-lime-400/20 to-transparent" />
      </div>

      {/* SECCIÓN 1: GASTRONOMÍA (Wink Eventos) */}
      <Primitive.Section id="gastronomy" className="space-y-10 reveal bg-zinc-950/70">
        <div className={sectionIntroClassName}>
          <p className={sectionEyebrowClassName}>
            Chef creativo • eventos • cenas privadas • <MonoToken kind="location">Medellín</MonoToken>
          </p>
          <h2 className={cx(sectionTitleClassName, 'text-lime-400 night-glow')}>
            Culinaria Creativa
          </h2>
          <p className={sectionBodyClassName}>
            Diseño experiencias donde la alta cocina y la estrategia se encuentran. Desde el desarrollo
            de menús para <MonoToken kind="project">Wink Eventos</MonoToken> hasta cenas privadas en <MonoToken kind="location">Medellín</MonoToken>, cada servicio combina ingredientes
            locales, técnica precisa y una puesta en escena pensada para quedarse en la memoria.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 auto-rows-[250px] md:grid-cols-4 md:auto-rows-[300px]">
          <Primitive.Card tone="lime" className="culinary-glitch-card col-span-2 row-span-2 relative group overflow-hidden border-lime-400/30 bg-black p-0 shadow-[0_30px_120px_rgba(0,0,0,0.58)] backdrop-blur-xl">
            <div className="absolute inset-0">
              <Image
                src="/images/culinary-plating.jpeg"
                alt="Platos de carne emplatados para servicio premium"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                className="object-cover object-center opacity-55 transition-[transform,filter,opacity] duration-700 ease-out grayscale group-hover:scale-[1.04] group-hover:opacity-85 group-hover:grayscale-0"
              />
              <Image
                src="/images/culinary-plating.jpeg"
                alt=""
                aria-hidden="true"
                fill
                sizes="1px"
                loading="lazy"
                className="pointer-events-none object-cover object-center opacity-0 mix-blend-screen transition-all duration-300 ease-out group-hover:-translate-x-1.5 group-hover:translate-y-0.5 group-hover:opacity-25"
                style={{ filter: 'sepia(1) saturate(8) hue-rotate(24deg) brightness(1.15)' }}
              />
              <Image
                src="/images/culinary-plating.jpeg"
                alt=""
                aria-hidden="true"
                fill
                sizes="1px"
                loading="lazy"
                className="pointer-events-none object-cover object-center opacity-0 mix-blend-screen transition-all duration-300 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-0.5 group-hover:opacity-20"
                style={{ filter: 'sepia(1) saturate(8) hue-rotate(164deg) brightness(1.1)' }}
              />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(202,253,0,0.16),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.52)_52%,rgba(0,0,0,0.9)_100%)] transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(202,253,0,0.05)_0,transparent_28%,transparent_72%,rgba(202,253,0,0.08)_100%)] opacity-30 transition-opacity duration-500 group-hover:opacity-60" />
            <div className="culinary-glitch-noise absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="culinary-scanline absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="culinary-scanbar absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(202,253,0,0),rgba(202,253,0,0.16),rgba(202,253,0,0))] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <span className="inline-flex rounded-full border border-lime-400/30 bg-black/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.36em] text-lime-400 backdrop-blur-xl">
                    SERVICIO: PREMIUM_EVENT_01
                  </span>
                  <div className="max-w-[16rem] font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 transition-colors duration-300 group-hover:text-lime-300/80">
                    Lectura sensorial / secuencia de emplatado premium
                  </div>
                </div>

                <div className="rounded-2xl border border-lime-400/20 bg-black/55 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500 backdrop-blur-xl transition-colors duration-300 group-hover:border-lime-400/40 group-hover:text-lime-400">
                  LECTURA EN VIVO
                </div>
              </div>

                <div className="flex flex-col gap-5">
                  <div className="space-y-2">
                    <h3 className="max-w-[14rem] text-3xl font-bold uppercase tracking-[-0.05em] text-white transition-all duration-500 group-hover:text-lime-100 md:text-4xl">
                      Experiencias a Medida
                    </h3>
                    <p className="max-w-[22rem] font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors duration-300 group-hover:text-lime-300/90">
                      Producto local / señal precisa / ejecución al fuego
                    </p>
                  </div>

                <div className="grid gap-2.5 rounded-[1.75rem] border border-lime-400/18 bg-black/58 p-4 backdrop-blur-xl transition-all duration-500 group-hover:border-lime-400/38 group-hover:bg-black/72 sm:max-w-[28rem]">
                  {culinaryScanMetrics.map((metric, index) => (
                    <div
                      key={metric.label}
                      className={cx(
                        'flex items-center justify-between gap-4 border-b border-lime-400/10 pb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400 transition-all duration-300',
                        index === culinaryScanMetrics.length - 1 && 'border-b-0 pb-0',
                        'group-hover:text-lime-200',
                      )}
                    >
                      <span className="text-zinc-500 transition-colors duration-300 group-hover:text-lime-400">
                        {metric.label}
                      </span>
                      <span className="text-right">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Primitive.Card>

          <Primitive.Card tone="neutral" className="group row-span-2 relative overflow-hidden">
            <Image
              src="/images/culinary-chef.jpeg"
              alt="Chef emplatando durante un servicio gastronómico"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              loading="lazy"
              className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] leading-relaxed text-zinc-200">
                Chef <br /> en <br /> servicio _
              </p>
            </div>
          </Primitive.Card>

          <Primitive.Card tone="lime" className="group relative overflow-hidden border-lime-400/20 bg-transparent transition-colors hover:border-lime-400/50">
            <Image
              src="/images/culinary-fresh.jpeg"
              alt="Bowl de atún sellado con vegetales frescos y microgreens"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              loading="lazy"
              className="object-cover opacity-50 grayscale transition-all duration-700 group-hover:opacity-85 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center px-4 text-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-300 group-hover:text-lime-400">
                Composición fresca +
              </span>
            </div>
          </Primitive.Card>

          <Primitive.Card tone="neutral" className="group relative overflow-hidden border-zinc-800/80 bg-transparent transition-colors hover:border-lime-400/50">
            <Image
              src="/images/culinary-hero.jpeg"
              alt="Servicio gastronómico con sopa cremosa y crostini emplatado"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              loading="lazy"
              className="object-cover opacity-45 grayscale transition-all duration-700 group-hover:opacity-80 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center px-4 text-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-300 group-hover:text-lime-400">
                Servicio emplatado +
              </span>
            </div>
          </Primitive.Card>
        </div>

        {/* CTA Gastronomy */}
        <a
          href="#contact"
          className="group mt-10 flex items-center justify-between gap-4 rounded-[2rem] border border-zinc-800/60 bg-black/40 px-6 py-4 transition-all duration-300 hover:border-lime-400/30 hover:shadow-[0_0_24px_rgba(202,253,0,0.06)]"
        >
          <span className="font-mono text-[11px] leading-relaxed text-zinc-500 transition-colors group-hover:text-zinc-300">
            Buscas un chef creativo para tu próximo evento?
          </span>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.32em] text-lime-400 transition-colors group-hover:text-white">
            Hablemos _
          </span>
        </a>
      </Primitive.Section>

      {/* Bridge: Gastronomy → Development */}
      <div className="my-24 flex items-center gap-6 reveal">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-600">
          Lo que construyo _
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      </div>

      {/* SECCIÓN 2: DEVELOPMENT (Vibe Coding) */}
      <Primitive.Section id="development" className="space-y-10 reveal">
        <div className={sectionIntroClassName}>
          <p className={sectionEyebrowClassName}>Next.js • IA aplicada • landings de conversión</p>
          <h2 className={cx(sectionTitleClassName, 'text-cyan-400')}>
            Digital Craft
          </h2>
          <p className={sectionBodyClassName}>
            Construyo experiencias web con precisión técnica y criterio comercial. Trabajo con un flujo
            apoyado en IA para diseñar interfaces rápidas, claras y enfocadas en conversión, cuidando tanto
            el sistema visual como el rendimiento real del producto.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-7xl gap-8 xl:grid-cols-[minmax(0,1.28fr)_minmax(420px,1fr)] xl:items-start">
          <div className="xl:pt-2">
            <ErrorBoundary>
              <StitchCardStack />
            </ErrorBoundary>
          </div>

          {/* TecnicalApp - Panel técnico lateral */}
          <a
            href="https://www.tecnical.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <Primitive.Card tone="neutral" className="relative flex min-h-[420px] flex-col overflow-hidden border-zinc-800/60 bg-zinc-950/70 p-7 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-500 hover:border-lime-400/30 xl:min-h-[748px] xl:p-8">
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src="/images/tecnicalapp.png"
                  alt="Captura de la landing de TecnicalApp con propuesta para optimizar la operación de talleres."
                  fill
                  sizes="(min-width: 1280px) 420px, 100vw"
                  className="absolute inset-0 object-cover object-top opacity-36 grayscale transition-all duration-[1800ms] ease-out group-hover:scale-105 group-hover:opacity-72 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(202,253,0,0.1),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.68)_30%,rgba(0,0,0,0.9)_100%)]" />
                <div className="absolute inset-0 grainy-bg" />
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.42em] text-zinc-600">
                      SaaS para talleres
                    </p>
                    <div>
                      <h4 className="text-3xl font-headline italic leading-none text-white night-glow">
                        <MonoToken kind="project">TecnicalApp</MonoToken>
                      </h4>
                      <p className="mt-2 max-w-[20rem] font-mono text-[11px] leading-relaxed text-zinc-500">
                        Sistema operativo para talleres con foco en procesos, infraestructura y autogestión.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <div className="h-3 w-3 rounded-full bg-red-500/20 transition-colors group-hover:bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20 transition-colors group-hover:bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500/20 transition-colors group-hover:bg-green-500" />
                  </div>
                </div>

                <div className="mt-auto pt-16 xl:pt-20">
                  <div className="rounded-[2rem] border border-zinc-800/80 bg-black/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-md xl:p-6">
                    <ErrorBoundary>
                      <TypewriterTerminal className="h-[320px] text-[9px] sm:text-[10px] md:text-[11px] xl:h-[360px]" />
                    </ErrorBoundary>
                  </div>

                  <div className="mt-6 border-t border-zinc-800/80 pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-600">
                        Operación & SaaS
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-lime-400 transition-colors group-hover:text-white">
                        Ver proyecto _
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Primitive.Card>
          </a>
        </div>

        {/* CTA Development */}
        <a
          href="#contact"
          className="group mt-10 flex items-center justify-between gap-4 rounded-[2rem] border border-zinc-800/60 bg-black/40 px-6 py-4 transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_24px_rgba(34,211,238,0.06)]"
        >
          <span className="font-mono text-[11px] leading-relaxed text-zinc-500 transition-colors group-hover:text-zinc-300">
            Necesitas una landing que convierta de verdad?
          </span>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-400 transition-colors group-hover:text-white">
            Conversemos _
          </span>
        </a>
      </Primitive.Section>

      {/* Bridge: Development → Contact */}
      <div className="mt-32 mb-16 flex flex-col items-center gap-4 reveal">
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-zinc-700/50 to-zinc-700/20" />
        <p className="max-w-md text-center font-mono text-[11px] leading-relaxed text-zinc-600">
          Si tu proyecto necesita la misma precisión que un plato bien ejecutado — hablemos.
        </p>
        <div className="h-8 w-px bg-gradient-to-b from-zinc-700/20 to-transparent" />
      </div>

      {/* FOOTER: LA DECLARACIÓN FINAL */}
      <footer id="contact" className="pb-20 px-6 reveal overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6 mb-32">
            <p className="pl-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.8em] text-zinc-600">
              Conversemos
            </p>
            <a href="mailto:chef@johnherrerachef.com"
              className="tight-headline block text-[13vw] md:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] transition-all group">
              <span className="block group-hover:translate-x-4 transition-transform duration-700">chef@</span>
              <span className="block text-zinc-500 group-hover:text-white group-hover:-translate-x-4 transition-all duration-700">johnherrera</span>
              <span className="block group-hover:translate-x-8 transition-transform duration-700">chef.com</span>
            </a>
          </div>

          {/* RRSS Minimalistas */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 pt-20 border-t border-zinc-900/50">
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500 md:flex">
              <a href="https://www.instagram.com/johnherrerachef/" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition-colors flex items-center gap-2">
                <span className="w-4 h-[1px] bg-zinc-800"></span> Instagram
              </a>
              <a href="https://github.com/Monsterchef-git" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                <span className="w-4 h-[1px] bg-zinc-800"></span> GitHub
              </a>
              <a href="https://www.linkedin.com/in/john-herrera-chef/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                <span className="w-4 h-[1px] bg-zinc-800"></span> LinkedIn
              </a>
            </div>

            <div className="text-right">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] leading-loose text-zinc-800">
                <MonoToken kind="location">Medellín</MonoToken>, Antioquia <br />
                Chef creativo en <MonoToken kind="project">Wink Eventos</MonoToken> <br />
                Producto digital para <MonoToken kind="project">TecnicalApp</MonoToken>
              </p>
            </div>
          </div>
        </div>
      </footer>

      <ErrorBoundary>
        <FloatingNav />
      </ErrorBoundary>
    </main>
  );
}
