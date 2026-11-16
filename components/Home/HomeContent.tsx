'use client';

import { FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { Button, Grid, Group, Paper, Stack, Text, Timeline, Title } from '@mantine/core';
import AnimatedWrapper from '@/components/AnimatedWrapper';

const CONTACT_EMAIL = 'a0985209465@gmail.com';
const GITHUB_URL = 'https://github.com/Gusty1';

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
    contactEmail: string;
    location: string;
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

              {/* 聯絡方式：主要按鈕 + GitHub；地址直接顯示，避免訪客沒有設定郵件程式時 mailto 無反應 */}
              <Group gap="sm" mt="xs">
                <Button
                  component="a"
                  href={`mailto:${CONTACT_EMAIL}`}
                  radius="xl"
                  leftSection={<IoMdMail size={18} />}
                >
                  {texts.contactEmail}
                </Button>
                <Button
                  component="a"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="default"
                  radius="xl"
                  leftSection={<FaGithub size={18} />}
                >
                  GitHub
                </Button>
              </Group>
              <Group gap="lg" c="dimmed">
                <Group gap={6}>
                  <IoMdMail size={14} />
                  <Text size="sm">{CONTACT_EMAIL}</Text>
                </Group>
                <Group gap={6}>
                  <FaMapMarkerAlt size={14} />
                  <Text size="sm">{texts.location}</Text>
                </Group>
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
