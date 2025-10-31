'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import {
  Anchor,
  Box,
  Flex,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Text,
  Timeline,
  Tooltip,
} from '@mantine/core';
import { containerVariants } from '../../common/animeSetting';
import MyCarousel from '../../components/Home/MyCarousel';
import experienceJSon from '../../data/home/experience.json';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Grid>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Stack>
            <Box>
              <Text size="lg">{t('self1')}</Text>
              <Text size="lg">{t('self2')}</Text>
              <Text size="lg">{t('self3')}</Text>
            </Box>
            <Group gap="xl">
              <Anchor
                href="mailto:a0985209465@gmail.com"
                target="_blank"
                c="dimmed" // c="dimmed" 讓圖示顏色變暗，更細緻
                mt="xs"
              >
                <Tooltip label="a0985209465@gmail.com">
                  <IoMdMail size={24} />
                </Tooltip>
              </Anchor>
              <Anchor href="https://github.com/Gusty1" target="_blank" c="dimmed" mt="xs">
                <Tooltip label="Gusty1">
                  <FaGithub size={24} />
                </Tooltip>
              </Anchor>
              <Flex gap="sm" align="center" c="dimmed">
                <Tooltip label="Taoyuan">
                  <FaMapMarkerAlt size={20} />
                </Tooltip>
              </Flex>
            </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }}>
          {/* 外層 Flex 固定高度 + minHeight:0 才能讓 ScrollArea overflow */}
          <Flex justify="center" style={{ height: 270, minHeight: 0, overflow: 'hidden' }}>
            <ScrollArea type="auto" style={{ width: '100%' }}>
              <Timeline active={0} bulletSize={28} lineWidth={6}>
                {experienceJSon.map((item, index) => {
                  return (
                    <Timeline.Item title={t(item.title)} key={`${item.title}-${index}`}>
                      <Text size="xs" mt={4}>
                        {item.date}
                      </Text>
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            </ScrollArea>
          </Flex>
        </Grid.Col>
      </Grid>
      <MyCarousel />
    </motion.div>
  );
}
