import { getTranslations } from 'next-intl/server';
import AnimatedWrapper from '@/components/AnimatedWrapper';
import portfolioJson from '@/data/portfolio/portfolio.json';
import PortfolioTabs from './PortfolioTabs';

export default async function PortfolioPage() {
  const t = await getTranslations('portfolio');

  // 在 Server Component 預先解析翻譯與描述，避免 Client 端需要 useTranslations
  const items = portfolioJson.map((item) => ({
    ...item,
    description: t(item.description as Parameters<typeof t>[0]) || '...',
    altText: t(item.altText as Parameters<typeof t>[0]) || item.title,
  }));

  const labels = {
    web: t('web'),
    android: t('android'),
    windows: t('windows'),
    other: t('other'),
    prepare: t('prepare'),
    link: t('link'),
  };

  return (
    <AnimatedWrapper>
      <PortfolioTabs items={items} labels={labels} />
    </AnimatedWrapper>
  );
}
