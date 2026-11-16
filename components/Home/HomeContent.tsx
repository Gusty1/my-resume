'use client';

import { FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import {
  ActionIcon,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Timeline,
  Title,
  Tooltip,
} from '@mantine/core';
import AnimatedWrapper from '@/components/AnimatedWrapper';

export interface ExperienceItem {
  title: string;
  date: string;
}

export interface HomeContentProps {
  /** 翻譯後的靜態字串，由 Server Component 預先解析 */
  texts: {
    headline: string;
    summary: string;
    intro: string;
    experienceTitle: string;
  };
  /** 翻譯後的經歷清單 */
  experiences: ExperienceItem[];
}

/**
 * 首頁主體 UI（Client Component）。
 * 翻譯資料由父層 Server Component 解析後透過 props 傳入。
 */
export default function HomeContent({ texts, experiences }: Readonly<HomeContentProps>) {
  return (
    <AnimatedWrapper>
      <Stack gap="xl">
        {/* 自我介紹區塊 */}
        <Grid gap="xl" align="flex-start">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="md">
              <Title order={1} fw={700}>
                {texts.headline}
              </Title>
              <Text size="lg" fw={500} lh={1.6}>
                {texts.summary}
              </Text>
              <Text size="md" c="dimmed" lh={1.7}>
                {texts.intro}
              </Text>

              {/* 社交連結 */}
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

          {/* 經歷時間軸：完整展開，不需捲動就能看到所有經歷 */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Paper p="md" radius="md" withBorder>
              <Text fw={500} size="sm" c="dimmed" mb="sm">
                {texts.experienceTitle}
              </Text>
              <Timeline active={0} bulletSize={24} lineWidth={2}>
                {experiences.map((item) => (
                  <Timeline.Item title={item.title} key={item.date}>
                    <Text size="xs" c="dimmed" mt={2}>
                      {item.date}
                    </Text>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </AnimatedWrapper>
  );
}
