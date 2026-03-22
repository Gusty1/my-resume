'use client';

import { useTranslations } from 'next-intl';
import { FaJava, FaPython, FaQuestionCircle, FaReact } from 'react-icons/fa';
import { FaFlutter } from 'react-icons/fa6';
import { LuBadgeJapaneseYen } from 'react-icons/lu';
import { SiTypescript } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { Flex, Grid, Paper, Rating, Stack, Text } from '@mantine/core';
import AnimatedWrapper from '@/components/AnimatedWrapper';
import skillJson from '@/data/skill/skill.json';

// 顏色清單，最多支援 12 種顏色，超過要另外想辦法
const mantineColorVars = [
  'var(--mantine-color-red-6)',
  'var(--mantine-color-pink-6)',
  'var(--mantine-color-grape-6)',
  'var(--mantine-color-violet-6)',
  'var(--mantine-color-indigo-6)',
  'var(--mantine-color-blue-6)',
  'var(--mantine-color-cyan-6)',
  'var(--mantine-color-teal-6)',
  'var(--mantine-color-green-6)',
  'var(--mantine-color-lime-6)',
  'var(--mantine-color-yellow-6)',
  'var(--mantine-color-orange-6)',
];

// 建立「穩定 Hash」函式，接收字串並永遠回傳同一個顏色
const getStableColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.codePointAt(i) ?? 0;
    hash = (hash << 5) - hash + char;
    hash |= 0; // 截斷為 32 位元整數，防止浮點數溢位
  }
  const index = Math.abs(hash) % mantineColorVars.length;
  return mantineColorVars[index];
};

const defaultIconSize = 28;

const iconMap = {
  FaReact: <FaReact size={defaultIconSize} color={getStableColor('FaReact')} />,
  FaJava: <FaJava size={defaultIconSize} color={getStableColor('FaJava')} />,
  FaPython: <FaPython size={defaultIconSize} color={getStableColor('FaPython')} />,
  TbBrandCSharp: <TbBrandCSharp size={defaultIconSize} color={getStableColor('TbBrandCSharp')} />,
  SiTypescript: <SiTypescript size={defaultIconSize} color={getStableColor('SiTypescript')} />,
  FaFlutter: <FaFlutter size={defaultIconSize} color={getStableColor('FaFlutter')} />,
};

const DefaultIcon = <FaQuestionCircle size={defaultIconSize} color="var(--mantine-color-gray-6)" />;

export default function SkillPage() {
  const t = useTranslations('skill');

  return (
    <AnimatedWrapper>
      <Stack gap="sm">
        {skillJson.map((item, index) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || DefaultIcon;

          return (
            <Paper key={`${item.title}-${index}`} p="md" radius="md" withBorder>
              <Grid align="center" gutter="sm">
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Flex align="center" gap="sm">
                    {IconComponent}
                    <Text fw={500} size="lg">
                      {item.title}
                    </Text>
                  </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Rating defaultValue={item.level} readOnly size="lg" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Text c="dimmed" size="sm">
                    {t(item.description as Parameters<typeof t>[0]) || '...'}
                  </Text>
                </Grid.Col>
              </Grid>
            </Paper>
          );
        })}

        {/* 日文技能 - 獨立卡片 */}
        <Paper p="md" radius="md" withBorder>
          <Grid align="center" gutter="sm">
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Flex align="center" gap="sm">
                <LuBadgeJapaneseYen size={defaultIconSize} />
                <Text fw={500} size="lg">
                  {t('japanese')}
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Rating defaultValue={2} readOnly size="lg" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Text c="dimmed" size="sm">
                {t('japaneseDesc')}
              </Text>
            </Grid.Col>
          </Grid>
        </Paper>
      </Stack>
    </AnimatedWrapper>
  );
}
