'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import {
  ActionIcon,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Timeline,
  Title,
  Tooltip,
} from '@mantine/core';
import { containerVariants } from '@/common/animeSetting';
import MyCarousel from '@/components/Home/MyCarousel';
import experienceJSon from '@/data/home/experience.json';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Stack gap="xl">
        {/* 自我介紹區塊 */}
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="md">
              <Title order={2} fw={600}>
                {t('self1')}
              </Title>
              <Text size="md" c="dimmed" lh={1.7}>
                {t('self2')}
              </Text>
              <Text size="md" lh={1.7}>
                {t('self3')}
              </Text>

              {/* 社交連結 - 使用 ActionIcon 更簡潔 */}
              <Group gap="md" mt="xs">
                <Tooltip label="a0985209465@gmail.com" withArrow>
                  <ActionIcon
                    component="a"
                    href="mailto:a0985209465@gmail.com"
                    variant="subtle"
                    color="gray"
                    size="lg"
                    radius="xl"
                  >
                    <IoMdMail size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Gusty1" withArrow>
                  <ActionIcon
                    component="a"
                    href="https://github.com/Gusty1"
                    target="_blank"
                    variant="subtle"
                    color="gray"
                    size="lg"
                    radius="xl"
                  >
                    <FaGithub size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Taoyuan" withArrow>
                  <ActionIcon variant="subtle" color="gray" size="lg" radius="xl">
                    <FaMapMarkerAlt size={18} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Stack>
          </Grid.Col>

          {/* 經歷時間軸 */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Paper p="md" radius="md" withBorder>
              <Text fw={500} size="sm" c="dimmed" mb="sm">
                {t('experienceTitle')}
              </Text>
              <ScrollArea h={240} type="auto">
                <Timeline active={0} bulletSize={24} lineWidth={2}>
                  {experienceJSon.map((item, index) => (
                    <Timeline.Item title={t(item.title)} key={`${item.title}-${index}`}>
                      <Text size="xs" c="dimmed" mt={2}>
                        {item.date}
                      </Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </ScrollArea>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* 照片輪播 */}
        <MyCarousel />
      </Stack>
    </motion.div>
  );
}
