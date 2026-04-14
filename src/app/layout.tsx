import type { Metadata } from "next";
import BackgroundTerminal from "@/components/BackgroundTerminal";
import GoogleTracking from "@/components/GoogleTracking";
import LenisProvider from "@/components/LenisProvider";
import MagneticCursor from "@/components/MagneticCursor";
import PageLoader from "@/components/PageLoader";
import "./globals.css";

const siteUrl = "https://johnherrerachef.com";
const siteTitle = "John Herrera | Creative Chef & Digital Craft";
const siteDescription =
  "Chef by Day, Digital Craft by Night. Ingenieria culinaria y desarrollo de software de alto nivel en Medellin.";
const personImage = `${siteUrl}/images/about-john-herrera.png`;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  // OG — la imagen se inyecta automáticamente desde opengraph-image.tsx
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    locale: "es_CO",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
                  name: siteTitle,
                  description: siteDescription,
                  inLanguage: 'es-CO',
                },
                {
                  '@type': 'Person',
                  '@id': `${siteUrl}/#person`,
                  name: 'John Herrera',
                  jobTitle: ['Chef Creativo', 'Desarrollador Web'],
                  description:
                    'Chef con más de una década en alta cocina y desarrollador web especializado en landings de conversión, SEO y diseño de producto digital.',
                  url: siteUrl,
                  image: personImage,
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
                      name: 'tecnical.app',
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
        <MagneticCursor />
        <div aria-hidden="true" className="signal-static-overlay" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
