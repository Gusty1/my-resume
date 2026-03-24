import { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants/site';
import { routing } from '@/i18n/routing';

const LOCALES = routing.locales;

/**
 * lastModified 優先取環境變數 BUILD_DATE（部署時注入），
 * 否則 fallback 至靜態日期，避免每次 build 都更新導致浪費 SEO crawl budget。
 * 部署指令範例：BUILD_DATE=$(date -u +%Y-%m-%d) next build
 */
const lastModified = process.env.BUILD_DATE
  ? new Date(process.env.BUILD_DATE)
  : new Date('2026-03-23');

/**
 * 自動產生 sitemap.xml，涵蓋所有語言版本的主要頁面
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/skill', '/portfolio'] as const;

  return LOCALES.flatMap((locale) =>
    pages.map((page) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1.0 : 0.8,
    }))
  );
}
