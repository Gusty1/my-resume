import { getTranslations } from 'next-intl/server';
import HomeContent from '@/components/Home/HomeContent';
import { getCareerYears } from '@/constants/site';
import experienceJson from '@/data/home/experience.json';

export default async function HomePage() {
  const t = await getTranslations('home');
  const tMeta = await getTranslations('meta');

  // 在 Server Component 預先解析翻譯，避免 Client 端需要 useTranslations
  const texts = {
    headline: tMeta('title'),
    summary: t('summary', { years: getCareerYears() }),
    intro: t('intro'),
    contactEmail: t('contactEmail'),
    location: t('location'),
    experienceTitle: t('experienceTitle'),
  };

  const experiences = experienceJson.map((item) => ({
    title: t(item.title as Parameters<typeof t>[0]),
    date: item.date,
  }));

  return <HomeContent texts={texts} experiences={experiences} />;
}
