import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/nexus/', '/api/'], // Crucial: Block admin portal and backend APIs if routed through Next.js
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
