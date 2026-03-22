import { MetadataRoute } from 'next';

const BASE_URL = 'https://my-resume-tau-amber.vercel.app';
const LOCALES = ['zh-TW', 'en', 'ja'] as const;

/**
 * 自動產生 sitemap.xml，涵蓋所有語言版本的主要頁面
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/skill', '/portfolio'] as const;

  return LOCALES.flatMap((locale) =>
    pages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1.0 : 0.8,
    }))
  );
}
