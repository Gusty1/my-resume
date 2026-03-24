import { getTranslations } from 'next-intl/server';
import skillJson from '@/data/skill/skill.json';
import SkillContent from './SkillContent';

export default async function SkillPage() {
  const t = await getTranslations('skill');

  // 在 Server Component 預先解析翻譯，避免 Client 端需要 useTranslations
  const items = skillJson.map((item) => ({
    ...item,
    translatedTitle: item.title === 'Japanese' ? t('japanese') : item.title,
    translatedDesc: t(item.description as Parameters<typeof t>[0]) || '...',
  }));

  return <SkillContent items={items} />;
}
