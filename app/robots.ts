import { MetadataRoute } from 'next';

const BASE_URL = 'https://my-resume-tau-amber.vercel.app';

/**
 * 自動產生 robots.txt，允許所有爬蟲並指向 sitemap
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
