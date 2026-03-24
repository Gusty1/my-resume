import { getTranslations } from 'next-intl/server';
import HomeContent from '@/components/Home/HomeContent';
import experienceJson from '@/data/home/experience.json';

export default async function HomePage() {
  const t = await getTranslations('home');

  // 在 Server Component 預先解析翻譯，避免 Client 端需要 useTranslations
  const texts = {
    self1: t('self1'),
    self2: t('self2'),
    self3: t('self3'),
    experienceTitle: t('experienceTitle'),
  };

  const experiences = experienceJson.map((item) => ({
    title: t(item.title as Parameters<typeof t>[0]),
    date: item.date,
  }));

  return <HomeContent texts={texts} experiences={experiences} />;
}
