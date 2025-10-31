'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaWindows } from 'react-icons/fa6';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoLogoAndroid } from 'react-icons/io';
import { IoLink } from 'react-icons/io5';
import { MdOutlineWebAsset } from 'react-icons/md';
import {
  AspectRatio,
  Button,
  Card,
  Center,
  Group,
  Image,
  SimpleGrid,
  Tabs,
  Text,
} from '@mantine/core';
import { containerVariants } from '../../../common/animeSetting';
import portfolioJson from '../../../data/portfolio/portfolio.json';

const defaultIconSize = 24;

export default function PortfolioPage() {
  const t = useTranslations('portfolio');

  // 建立一個可重複使用的「渲染卡片」函式它接收一個 'type'，然後過濾 JSON 並回傳卡片
  const renderPortfolioCards = (type: string) => {
    const items = portfolioJson.filter((item) => item.type === type);

    // 如果這個分類沒有項目，顯示提示文字
    if (items.length === 0) {
      return (
        <Text c="dimmed" ta="center" mt="xl">
          {t('prepare')}
        </Text>
      );
    }

    // 使用 SimpleGrid 建立響應式卡片網格
    //    - base: 手機 (1欄)
    //    - sm: 平板 (2欄)
    //    - md: 電腦 (3欄)
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="lg">
        {items.map((item, index) => (
          <Card shadow="sm" padding="lg" radius="md" withBorder key={`${item.title}-${index}`}>
            <Card.Section>
              <AspectRatio ratio={256 / 257}>
                <Image src={item.image} alt={item.title} />
              </AspectRatio>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500} size="lg">
                {item.title}
              </Text>
            </Group>

            <Text size="md" c="dimmed" lineClamp={4} h="80px">
              {t(item.description) || '...'}
            </Text>

            {item.link && (
              <Button
                component="a"
                href={item.link}
                target="_blank"
                variant="filled"
                fullWidth
                mt="sm"
                radius="md"
                leftSection={<IoLink />}
              >
                {t('link') /*連結*/}
              </Button>
            )}
          </Card>
        ))}
      </SimpleGrid>
    );
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Center mt="sm">
        <Text size="md" c="dimmed">
          {t('selfText')}
        </Text>
      </Center>

      <Tabs defaultValue="web">
        <Tabs.List grow>
          <Tabs.Tab value="web" leftSection={<MdOutlineWebAsset size={defaultIconSize} />}>
            {t('web')}
          </Tabs.Tab>
          <Tabs.Tab value="android" leftSection={<IoLogoAndroid size={defaultIconSize} />}>
            {t('android')}
          </Tabs.Tab>
          <Tabs.Tab value="windows" leftSection={<FaWindows size={defaultIconSize} />}>
            {t('windows')}
          </Tabs.Tab>
          <Tabs.Tab value="other" leftSection={<HiOutlineDotsHorizontal size={defaultIconSize} />}>
            {t('other')}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="web">{renderPortfolioCards('web')}</Tabs.Panel>
        <Tabs.Panel value="android">{renderPortfolioCards('android')}</Tabs.Panel>
        <Tabs.Panel value="windows">{renderPortfolioCards('windows')}</Tabs.Panel>
        <Tabs.Panel value="other">{renderPortfolioCards('other')}</Tabs.Panel>
      </Tabs>
    </motion.div>
  );
}
