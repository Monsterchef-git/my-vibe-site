import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://johnherrerachef.com';
  const lastModified = {
    home: '2026-04-13T18:23:45-05:00',
    works: '2026-04-13T21:48:08-05:00',
    about: '2026-04-13T21:48:08-05:00',
    contact: '2026-04-13T01:19:27-05:00',
  } as const;

  return [
    {
      url: `${siteUrl}/`,
      lastModified: lastModified.home,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/works`,
      lastModified: lastModified.works,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: lastModified.about,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: lastModified.contact,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
