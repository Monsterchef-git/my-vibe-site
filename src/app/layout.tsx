import type { Metadata } from 'next';
import AppEffects from '@/components/AppEffects';
import GoogleTracking from '@/components/GoogleTracking';
import SiteStatusBar from '@/components/shared/SiteStatusBar';
import {
  PAGE_SEO,
  PERSON_IMAGE,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/constants';
import './globals.css';

const siteUrl = SITE_URL;
const siteTitle = SITE_TITLE;
const siteDescription = PAGE_SEO.home.description;
const personImage = PERSON_IMAGE;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: PAGE_SEO.home.path,
  },

  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
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
    <html lang="en" suppressHydrationWarning>
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
                  inLanguage: 'en-US',
                },
                {
                  '@type': 'Person',
                  '@id': `${siteUrl}/#person`,
                  name: 'John Herrera',
                  jobTitle: ['Creative Chef', 'Web Developer'],
                  description:
                    'Creative chef with over a decade in kitchen service, now building conversion-focused landing pages and digital interfaces.',
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
                      description: 'Creative chef for events and private dinners',
                    },
                    {
                      '@type': 'Organization',
                      name: 'tecnical.app',
                      url: 'https://www.tecnical.app',
                      description: 'Digital product and landing experience for a workshop SaaS',
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-full focus:bg-lime-400 focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-widest focus:text-black focus:outline-none"
        >
          Skip to content
        </a>
        <AppEffects />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] mix-blend-soft-light"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.82\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundSize: '160px 160px',
          }}
        />
        <div aria-hidden="true" className="signal-static-overlay" />
        <div className="relative z-10">
          {children}
        </div>
        <SiteStatusBar />
      </body>
    </html>
  )
}
