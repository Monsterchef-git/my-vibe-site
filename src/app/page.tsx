import TopNav from '@/components/TopNav';
import ErrorBoundary from '@/components/ErrorBoundary';
import MonoToken from '@/components/MonoToken';
import ScrollReveal from '@/components/ScrollReveal';
import SplitReveal from '@/components/SplitReveal';



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

      <TopNav currentPath="/" />

      {/* Hero Section — Editorial frame */}
      <section id="hero" className="flex min-h-screen items-end pt-40 pb-16 md:pt-44 md:pb-24">
        <div className="w-full max-w-6xl space-y-10">
          <div className="space-y-5">
            <h1 className="sr-only">John Herrera | Chef by Day, Digital Craft by Night</h1>
            <div className="font-mono text-[10px] uppercase tracking-[0.46em] text-zinc-600" aria-hidden="true">
              <SplitReveal as="span" by="char" delay={100} stagger={28}>
                John Herrera /
              </SplitReveal>
            </div>
            <SplitReveal
              as="div"
              aria-hidden="true"
              by="word"
              delay={220}
              stagger={70}
              className="max-w-5xl text-6xl font-headline italic leading-[0.92] text-zinc-100 sm:text-7xl md:text-[5.5rem] lg:text-[7.5rem]"
            >
              Chef by day.
            </SplitReveal>
            <SplitReveal
              as="div"
              aria-hidden="true"
              by="word"
              delay={420}
              stagger={75}
              className="max-w-5xl text-6xl font-mono uppercase tracking-[-0.08em] text-[#cafd00] night-glow sm:text-7xl md:text-[5.5rem] lg:text-[7.25rem]"
            >
              Digital craft by night.
            </SplitReveal>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <p
              className="max-w-xl border-l border-lime-400/25 pl-6 font-mono text-sm leading-relaxed text-zinc-400 opacity-0 translate-y-4 transition-all duration-700 delay-[800ms]"
              style={{ animation: 'hero-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s forwards' }}
            >
              Dos disciplinas, un mismo estándar: precisión, producto y ejecución sin ruido.
              Desde <MonoToken kind="location">Medellín</MonoToken> diseño experiencias
              gastronómicas y superficies digitales con una lógica más editorial que promocional.
            </p>
          </div>

          <div className="grid gap-4 border-t border-white/8 pt-6 font-mono text-[10px] uppercase tracking-[0.34em] text-zinc-500 md:grid-cols-3">
            <div
              className="space-y-2"
            >
              <p className="text-zinc-700">Base</p>
              <MonoToken kind="location">Medellín, Antioquia</MonoToken>
            </div>
            <div className="space-y-2">
              <p className="text-zinc-700">Focus</p>
              <p className="text-zinc-300">Weddings / private dining / landing systems</p>
            </div>
            <div className="space-y-2">
              <p className="text-zinc-700">Status</p>
              <MonoToken kind="status">Open for selected builds</MonoToken>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
