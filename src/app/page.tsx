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
import LiveScanMetrics from '@/components/LiveScanMetrics';
import ProvenanceTokens from '@/components/ProvenanceTokens';

const sectionIntroClassName = 'space-y-3';
const sectionEyebrowClassName = 'font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-500';
const sectionTitleClassName = 'text-5xl md:text-7xl font-headline italic leading-none';
const sectionBodyClassName = 'max-w-4xl font-mono text-sm leading-relaxed text-zinc-500';



export default function Home() {

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['FoodEstablishment', 'LocalBusiness'],
    name: 'John Herrera Chef',
    description:
      'Chef creativo especializado en cocina contemporánea tropical. Servicios de cenas privadas, mealprep y clases de cocina en Medellín, Colombia.',
    url: 'https://johnherrerachef.com',
    email: 'chef@johnherrerachef.com',
    image: 'https://johnherrerachef.com/images/culinary-plating.jpeg',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Medellín',
      addressRegion: 'Antioquia',
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '6.2442',
      longitude: '-75.5812',
    },
    servesCuisine: 'Cocina Contemporánea Tropical',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios Gastronómicos',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cenas Privadas' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mealprep Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clases de Cocina' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Chef Privado Medellín' } },
      ],
    },
    sameAs: [
      'https://www.instagram.com/johnherrerachef/',
      'https://www.linkedin.com/in/john-herrera-chef/',
      'https://github.com/Monsterchef-git',
    ],
  };

  return (
    <main id="main-content" className="min-h-screen grainy-bg bg-[#0a0a0a] text-white px-6 md:px-24 pb-40 relative z-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ErrorBoundary>
        <ScrollReveal />
      </ErrorBoundary>

      {/* Global Header Limpio - Solo Identidad y Disponibilidad */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-[150] pointer-events-none">
        <MagneticButton as="div" className="pointer-events-auto" strength={0.4}>
          <a href="#hero" className="font-black text-2xl tracking-tighter hover-glitch">JH.</a>
        </MagneticButton>

        <MagneticButton as="div" className="pointer-events-auto" strength={0.3}>
          <a href="#contact" className="flex items-center gap-3 bg-zinc-900/80 backdrop-blur-2xl px-5 py-2.5 rounded-full border border-white/10 shadow-2xl transition-all hover:border-lime-400/50">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-400 shadow-[0_0_10px_#cafd00]"></span>
            </div>
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-lime-400">
              <MonoToken kind="status">Exploremos ideas</MonoToken>
            </span>
          </a>
        </MagneticButton>
      </header>

      {/* Hero Section — Puro impacto tipográfico */}
      <section id="hero" className="flex flex-col justify-center min-h-screen pt-28 pb-16 px-6">
        <div className="space-y-6">
          <h1 className="sr-only">John Herrera | Chef by Day, Vibe-Coder by Night</h1>
          <div className="text-lime-400 uppercase tracking-[0.3em] font-black text-xs md:text-sm hover-glitch cursor-default inline-block" aria-hidden="true">
            <SplitReveal as="span" by="char" delay={100} stagger={35}>
              John Herrera _
            </SplitReveal>
          </div>
          <SplitReveal
            as="div"
            aria-hidden="true"
            by="word"
            delay={300}
            stagger={80}
            className="text-7xl md:text-8xl lg:text-9xl font-headline italic leading-[0.9] text-zinc-200 pb-2"
          >
            Chef by Day,
          </SplitReveal>
          <SplitReveal
            as="div"
            aria-hidden="true"
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
                Entiendo la creación como un equilibrio entre técnica y narrativa. Más de una década
                liderando cocinas en <MonoToken kind="location">Medellín</MonoToken> afinó esa
                convicción: mi propuesta gastronómica es contemporánea, de esencia tropical, con el
                producto local como punto de partida y el rigor técnico como lenguaje.
              </p>
              <p className="font-mono text-sm leading-relaxed text-zinc-400">
                Esa misma obsesión por el detalle la traslado al entorno digital. Desarrollo landing
                pages de alto impacto, optimizo SEO y diseño sistemas visuales para marcas que buscan
                presencia real en la web.
              </p>
              <p className="font-mono text-sm leading-relaxed text-zinc-500">
                Hoy, elevo el estándar de las bodas en <MonoToken kind="location">Medellín</MonoToken> desde{' '}
                <MonoToken kind="project">Wink Eventos</MonoToken> y digitalizo el flujo de trabajo
                de talleres a través de la experiencia de usuario en{' '}
                <MonoToken kind="project">TecnicalApp</MonoToken>.
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
                  {item.key === 'STATUS' ? (
                    <a
                      href="#contact"
                      className="inline-flex rounded-full border border-lime-400/30 px-3 py-1 text-right text-lime-400 transition-colors hover:border-lime-400 hover:bg-lime-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60"
                    >
                      <MonoToken kind="status" className="text-[10px] tracking-[0.24em]">
                        {item.value}
                      </MonoToken>
                    </a>
                  ) : (
                    <span className="text-right text-zinc-300">
                      {item.value}
                    </span>
                  )}
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

          {/* Provenance Tokens — origen de producto */}
          <div className="pt-1">
            <ErrorBoundary>
              <ProvenanceTokens />
            </ErrorBoundary>
          </div>
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
                className="object-cover object-center opacity-95 transition-[transform,filter,opacity] duration-700 ease-out md:opacity-55 md:grayscale group-hover:scale-[1.04] group-hover:opacity-85 group-hover:grayscale-0"
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

            <div className="absolute inset-0 opacity-55 transition-opacity duration-500 group-hover:opacity-100 md:opacity-100 bg-[radial-gradient(circle_at_78%_18%,rgba(202,253,0,0.16),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.52)_52%,rgba(0,0,0,0.9)_100%)]" />
            <div className="absolute inset-0 opacity-18 transition-opacity duration-500 group-hover:opacity-60 md:opacity-30 bg-[linear-gradient(180deg,rgba(202,253,0,0.05)_0,transparent_28%,transparent_72%,rgba(202,253,0,0.08)_100%)]" />
            <div className="culinary-glitch-noise absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="culinary-scanline absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="culinary-scanbar absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(202,253,0,0),rgba(202,253,0,0.16),rgba(202,253,0,0))] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
                <div className="space-y-3 min-w-0 flex-1">
                  <span className="inline-block max-w-full truncate rounded-full border border-lime-400/30 bg-black/70 px-2 sm:px-3 py-1 font-mono text-[7px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.36em] text-lime-400 backdrop-blur-xl">
                    SERVICIO: PREMIUM_EVENT_01
                  </span>
                  <div className="max-w-[16rem] font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.3em] text-zinc-300 transition-colors duration-300 group-hover:text-lime-300/80 md:text-zinc-500 line-clamp-2 sm:line-clamp-none">
                    Lectura sensorial / secuencia de emplatado premium
                  </div>
                </div>

                <div className="shrink-0 rounded-2xl border border-lime-400/20 bg-black/55 px-2 sm:px-3 py-1.5 sm:py-2 font-mono text-[7px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.3em] text-zinc-300 backdrop-blur-xl transition-colors duration-300 group-hover:border-lime-400/40 group-hover:text-lime-400 md:text-zinc-500">
                  LECTURA EN VIVO
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="w-fit max-w-[24rem] rounded-[1.75rem] border border-white/10 bg-black/58 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-md md:bg-black/46">
                  <h3 className="max-w-[14rem] text-3xl font-bold uppercase tracking-[-0.05em] text-white transition-all duration-500 group-hover:text-lime-100 md:text-4xl">
                    Experiencias a Medida
                  </h3>
                  <p className="mt-2 max-w-[22rem] font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-200 transition-colors duration-300 group-hover:text-lime-300/90 md:text-zinc-400">
                    Producto local / señal precisa / ejecución al fuego
                  </p>
                </div>

                <ErrorBoundary>
                  <LiveScanMetrics />
                </ErrorBoundary>
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
              className="object-cover opacity-80 md:opacity-40 md:grayscale group-hover:grayscale-0 transition-all"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <p className="rounded-[1.5rem] border border-white/10 bg-black/60 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.3em] leading-relaxed text-zinc-100 backdrop-blur-md">
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
              className="object-cover opacity-92 saturate-100 contrast-100 transition-all duration-500 md:opacity-50 md:saturate-50 md:contrast-90 md:grayscale group-hover:opacity-85 group-hover:grayscale-0 group-hover:scale-105 group-hover:saturate-[1.2] group-hover:contrast-[1.1]"
            />
            <div className="absolute inset-0 opacity-40 md:opacity-100 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center px-4 text-center">
              <span className="rounded-full border border-white/10 bg-black/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-100 backdrop-blur-md group-hover:text-lime-400 md:text-zinc-300">
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
              className="object-cover opacity-92 saturate-100 contrast-100 transition-all duration-500 md:opacity-45 md:saturate-50 md:contrast-90 md:grayscale group-hover:opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:saturate-[1.2] group-hover:contrast-[1.1]"
            />
            <div className="absolute inset-0 opacity-40 md:opacity-100 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center px-4 text-center">
              <span className="rounded-full border border-white/10 bg-black/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-100 backdrop-blur-md group-hover:text-lime-400 md:text-zinc-300">
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
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.32em] text-lime-400 transition-colors duration-300 group-hover:text-white">
            Contacto _
          </span>
          <span className="shrink-0 font-mono text-sm text-zinc-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-lime-400">
            →
          </span>
        </a>
      </Primitive.Section>

      {/* Bridge: Gastronomy → Development */}
      <div className="my-24 flex flex-col items-center gap-3 reveal">
        <div className="flex w-full items-center gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-600">
            Lo que construyo _
          </p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        </div>
        <a
          href="https://github.com/Monsterchef-git"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] uppercase tracking-[0.38em] text-zinc-700 transition-colors duration-300 hover:text-lime-400"
        >
          {`// MONSTERCHEF_LAB → Documentación de procesos _`}
        </a>
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
                  className="absolute inset-0 object-cover object-top opacity-82 transition-all duration-[1800ms] ease-out md:opacity-36 md:grayscale group-hover:scale-105 group-hover:opacity-72 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 opacity-42 md:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(202,253,0,0.1),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.68)_30%,rgba(0,0,0,0.9)_100%)]" />
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/78 via-black/42 to-transparent md:from-black/62 md:via-black/28" />
                <div className="absolute inset-0 grainy-bg" />
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 rounded-[1.75rem] border border-zinc-800/80 bg-black/62 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.26)] backdrop-blur-md md:bg-black/52">
                    <p className="font-mono text-[9px] uppercase tracking-[0.42em] text-zinc-300 md:text-zinc-600">
                      SaaS para talleres
                    </p>
                    <div>
                      <h4 className="text-3xl font-headline italic leading-none text-white night-glow">
                        <MonoToken kind="project">TecnicalApp</MonoToken>
                      </h4>
                      <p className="mt-2 max-w-[20rem] font-mono text-[11px] leading-relaxed text-zinc-200 md:text-zinc-500">
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
                      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-300 md:text-zinc-600">
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
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-400 transition-colors duration-300 group-hover:text-white">
            Conversemos _
          </span>
          <span className="shrink-0 font-mono text-sm text-zinc-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400">
            →
          </span>
        </a>
      </Primitive.Section>

      {/* Bridge: Development → Contact */}
      <div className="mt-32 mb-16 flex flex-col items-center gap-4 reveal">
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-zinc-700/50 to-zinc-700/20" />
        <p className="max-w-md text-center font-mono text-[11px] leading-relaxed text-zinc-600">
          Construyo en ambos frentes — si tienes algo en mente, escríbeme.
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
