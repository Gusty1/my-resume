import { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants/site';

/**
 * 自動產生 robots.txt，允許所有爬蟲並指向 sitemap
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
