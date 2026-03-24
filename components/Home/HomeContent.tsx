'use client';

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
import AnimatedWrapper from '@/components/AnimatedWrapper';
import MyCarousel from '@/components/Home/MyCarousel';

export interface ExperienceItem {
  title: string;
  date: string;
}

export interface HomeContentProps {
  /** 翻譯後的靜態字串，由 Server Component 預先解析 */
  texts: {
    self1: string;
    self2: string;
    self3: string;
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
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="md">
              <Title order={2} fw={600}>
                {texts.self1}
              </Title>
              <Text size="md" c="dimmed" lh={1.7}>
                {texts.self2}
              </Text>
              <Text size="md" lh={1.7}>
                {texts.self3}
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

          {/* 經歷時間軸 */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Paper p="md" radius="md" withBorder>
              <Text fw={500} size="sm" c="dimmed" mb="sm">
                {texts.experienceTitle}
              </Text>
              <ScrollArea h={240} type="hover">
                <Timeline active={0} bulletSize={24} lineWidth={2}>
                  {experiences.map((item) => (
                    <Timeline.Item title={item.title} key={item.date}>
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
    </AnimatedWrapper>
  );
}
