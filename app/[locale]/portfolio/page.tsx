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
  Group,
  Image,
  SimpleGrid,
  Tabs,
  Text,
} from '@mantine/core';
import { containerVariants } from '@/common/animeSetting';
import portfolioJson from '@/data/portfolio/portfolio.json';
import classes from './PortfolioPage.module.css';

const defaultIconSize = 24;

export default function PortfolioPage() {
  const t = useTranslations('portfolio');

  const renderPortfolioCards = (type: string) => {
    const items = portfolioJson.filter((item) => item.type === type);

    if (items.length === 0) {
      return (
        <Text c="dimmed" ta="center" mt="xl">
          {t('prepare')}
        </Text>
      );
    }

    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="lg">
        {items.map((item, index) => (
          <Card
            className={classes.card}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            key={`${item.title}-${index}`}
          >
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

            <Text size="sm" c="dimmed" lineClamp={4} h="72px">
              {t(item.description) || '...'}
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
                {t('link')}
              </Button>
            )}
          </Card>
        ))}
      </SimpleGrid>
    );
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Tabs defaultValue="web" variant="outline">
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
