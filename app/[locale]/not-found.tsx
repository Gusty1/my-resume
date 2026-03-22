'use client';

import { useTranslations } from 'next-intl';
import { Button, Center, Stack, Text, Title } from '@mantine/core';
import { Link } from '@/i18n/routing';

/**
 * 404 頁面：顯示符合履歷風格的錯誤訊息，並提供返回首頁的連結
 */
export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <Center h="60vh">
      <Stack align="center" gap="md">
        <Title order={1} size="6rem" fw={900} c="cyan">
          404
        </Title>
        <Title order={2} fw={600}>
          {t('title')}
        </Title>
        <Text c="dimmed" ta="center" maw={400}>
          {t('description')}
        </Text>
        <Button component={Link} href="/" variant="light" color="cyan" mt="sm">
          {t('backHome')}
        </Button>
      </Stack>
    </Center>
  );
}
