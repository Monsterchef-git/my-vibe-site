import TopNav from '@/components/TopNav';
import ErrorBoundary from '@/components/ErrorBoundary';
import MonoToken from '@/components/MonoToken';
import ScrollProgressBlock from '@/components/ScrollProgressBlock';
import ScrollReveal from '@/components/ScrollReveal';
import HeroTypewriter from '@/components/HeroTypewriter';
import ScrambleText from '@/components/ScrambleText';



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
    <main id="main-content" className="min-h-screen signal-static-bg bg-[#0a0a0a] text-white px-6 md:px-24 pb-40 relative z-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ErrorBoundary>
        <ScrollReveal />
      </ErrorBoundary>

      <TopNav currentPath="/" />

      {/* Hero Section — Editorial frame */}
      <ErrorBoundary>
        <ScrollProgressBlock
          as="section"
          id="hero"
          variant="hero"
          scrollTone="lime"
          className="flex min-h-screen items-end pt-40 pb-16 md:pt-44 md:pb-24"
        >
          <div className="w-full max-w-6xl space-y-10">
            <div className="space-y-9">
              <h1 className="sr-only">John Herrera | Chef by Day, Digital Craft by Night</h1>
              <ScrambleText
                text="John Herrera ———"
                className="relative z-[1] cursor-default select-none text-zinc-600 transition-colors duration-200 hover:text-zinc-400 font-mono text-[10px] uppercase tracking-[0.42em]"
              />
              <ErrorBoundary>
                <HeroTypewriter />
              </ErrorBoundary>
            </div>

            <p
              className="border-l border-lime-400/25 pl-6 font-mono text-sm leading-relaxed text-zinc-400"
              style={{ animation: 'hero-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s forwards', opacity: 0 }}
            >
              Service. Structure. Taste.{' '}
              From <MonoToken kind="location">Medellín</MonoToken>.
            </p>
          </div>
        </ScrollProgressBlock>
      </ErrorBoundary>
    </main>
  );
}
