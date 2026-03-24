'use client';

import NextImage from 'next/image';
import { FaWindows } from 'react-icons/fa6';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoLogoAndroid } from 'react-icons/io';
import { IoLink } from 'react-icons/io5';
import { MdOutlineWebAsset } from 'react-icons/md';
import { Button, Card, Group, SimpleGrid, Tabs, Text } from '@mantine/core';
import classes from './PortfolioPage.module.css';

export interface PortfolioItem {
  title: string;
  description: string;
  altText: string;
  link: string;
  image: string;
  type: string;
}

export interface PortfolioTabsProps {
  items: PortfolioItem[];
  /** 翻譯後的字串，由 Server Component 預先解析 */
  labels: {
    web: string;
    android: string;
    windows: string;
    other: string;
    prepare: string;
    link: string;
  };
}

const defaultIconSize = 24;

/**
 * 作品集 Tabs 的互動區塊（Client Component）
 * 翻譯資料由父層 Server Component 解析後透過 props 傳入。
 */
export default function PortfolioTabs({ items, labels }: Readonly<PortfolioTabsProps>) {
  const renderCards = (type: string) => {
    const filtered = items.filter((item) => item.type === type);

    if (filtered.length === 0) {
      return (
        <Text c="dimmed" ta="center" mt="xl">
          {labels.prepare}
        </Text>
      );
    }

    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="lg">
        {filtered.map((item) => (
          <Card
            className={classes.card}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            key={item.title}
          >
            <Card.Section>
              {/* 固定高度容器確保所有卡片圖片區域一致，objectFit cover 填滿不留白 */}
              <div className={classes.imageWrapper}>
                <NextImage
                  src={item.image}
                  alt={item.altText}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500} size="lg">
                {item.title}
              </Text>
            </Group>

            {/* flex: 1 讓描述區塊撐開，把按鈕推到卡片底部 */}
            <Text size="sm" c="dimmed" lineClamp={4} style={{ flex: 1 }}>
              {item.description || '...'}
            </Text>

            {item.link && (
              <Button
                component="a"
                href={item.link}
                target="_blank"
                variant="light"
                fullWidth
                mt="sm"
                radius="md"
                leftSection={<IoLink />}
              >
                {labels.link}
              </Button>
            )}
          </Card>
        ))}
      </SimpleGrid>
    );
  };

  return (
    <Tabs defaultValue="web" variant="outline">
      <Tabs.List grow>
        <Tabs.Tab value="web" leftSection={<MdOutlineWebAsset size={defaultIconSize} />}>
          {labels.web}
        </Tabs.Tab>
        <Tabs.Tab value="android" leftSection={<IoLogoAndroid size={defaultIconSize} />}>
          {labels.android}
        </Tabs.Tab>
        <Tabs.Tab value="windows" leftSection={<FaWindows size={defaultIconSize} />}>
          {labels.windows}
        </Tabs.Tab>
        <Tabs.Tab value="other" leftSection={<HiOutlineDotsHorizontal size={defaultIconSize} />}>
          {labels.other}
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="web">{renderCards('web')}</Tabs.Panel>
      <Tabs.Panel value="android">{renderCards('android')}</Tabs.Panel>
      <Tabs.Panel value="windows">{renderCards('windows')}</Tabs.Panel>
      <Tabs.Panel value="other">{renderCards('other')}</Tabs.Panel>
    </Tabs>
  );
}
