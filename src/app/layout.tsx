import type { Metadata } from "next";
import BackgroundTerminal from "@/components/BackgroundTerminal";
import GoogleTracking from "@/components/GoogleTracking";
import LenisProvider from "@/components/LenisProvider";
import PageLoader from "@/components/PageLoader";
import "./globals.css";

const siteUrl = "https://johnherrerachef.com";

export const metadata: Metadata = {
  title: "John Herrera | Creative Chef & Vibe-Coder",
  description:
    "Chef by Day, Vibe-Coder by Night. Ingeniería culinaria y desarrollo de software de alto nivel en Medellín.",
  metadataBase: new URL(siteUrl),

  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  // OG — la imagen se inyecta automáticamente desde opengraph-image.tsx
  openGraph: {
    title: "John Herrera | Culinary Engine",
    description:
      "Bifurcando la precisión de la cocina con la estructura del código.",
    url: siteUrl,
    siteName: "John Herrera Portfolio",
    locale: "es_CO",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "John Herrera | Creative Chef & Vibe-Coder",
    description: "Chef @ Wink Eventos | Vibe-Coding @ Night.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': `${siteUrl}/#website`,
                  url: siteUrl,
                  name: 'John Herrera | Creative Chef & Vibe-Coder',
                  description:
                    'Chef by Day, Vibe-Coder by Night. Ingeniería culinaria y desarrollo de software de alto nivel en Medellín.',
                  inLanguage: 'es-CO',
                },
                {
                  '@type': 'ProfilePage',
                  '@id': `${siteUrl}/#profilepage`,
                  url: siteUrl,
                  name: 'John Herrera Portfolio',
                  isPartOf: { '@id': `${siteUrl}/#website` },
                  mainEntity: { '@id': `${siteUrl}/#person` },
                },
                {
                  '@type': 'Person',
                  '@id': `${siteUrl}/#person`,
                  name: 'John Herrera',
                  jobTitle: ['Chef Creativo', 'Desarrollador Web'],
                  description:
                    'Chef con más de una década en alta cocina y desarrollador web especializado en landings de conversión, SEO y diseño de producto digital.',
                  url: siteUrl,
                  image: `${siteUrl}/images/og-fork.png`,
                  email: 'chef@johnherrerachef.com',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Medellín',
                    addressRegion: 'Antioquia',
                    addressCountry: 'CO',
                  },
                  sameAs: [
                    'https://www.instagram.com/johnherrerachef/',
                    'https://github.com/Monsterchef-git',
                    'https://www.linkedin.com/in/john-herrera-chef/',
                  ],
                  knowsAbout: [
                    'Alta Cocina',
                    'Cocina Contemporánea Tropical',
                    'Next.js',
                    'Tailwind CSS',
                    'SEO',
                    'Diseño Web',
                    'Landing Pages',
                  ],
                  worksFor: [
                    {
                      '@type': 'Organization',
                      name: 'Wink Eventos',
                      description: 'Chef creativo para eventos y cenas privadas',
                    },
                    {
                      '@type': 'Organization',
                      name: 'TecnicalApp',
                      url: 'https://www.tecnical.app',
                      description: 'Producto digital y landing para SaaS de talleres',
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="relative antialiased bg-black selection:bg-lime-400 selection:text-black" suppressHydrationWarning>
        <GoogleTracking />
        {/* Skip-to-content para navegación por teclado */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-full focus:bg-lime-400 focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-widest focus:text-black focus:outline-none"
        >
          Ir al contenido
        </a>
        <PageLoader />
        <LenisProvider />
        <BackgroundTerminal />
        <div className="grain-overlay grain-overlay-animate" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
