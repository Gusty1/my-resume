'use client';

import { FaJava, FaQuestionCircle, FaReact } from 'react-icons/fa';
import { FaFlutter } from 'react-icons/fa6';
import { LuBadgeJapaneseYen } from 'react-icons/lu';
import { SiTypescript } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { Badge, Box, Divider, Flex, Grid, Paper, Stack, Text } from '@mantine/core';
import AnimatedWrapper from '@/components/AnimatedWrapper';

export interface SkillItem {
  title: string;
  icon: string;
  description: string;
  category: string;
}

export interface SkillContentProps {
  /** 翻譯後的技能描述陣列，由 Server Component 預先解析 */
  items: (SkillItem & { translatedDesc: string; translatedTitle: string })[];
  /** 分類標題翻譯 */
  categoryLabels: Record<string, string>;
}

// 顏色清單，最多支援 12 種顏色
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

const iconMap: Record<string, React.ReactNode> = {
  FaReact: <FaReact size={defaultIconSize} color={getStableColor('FaReact')} />,
  FaJava: <FaJava size={defaultIconSize} color={getStableColor('FaJava')} />,
  TbBrandCSharp: <TbBrandCSharp size={defaultIconSize} color={getStableColor('TbBrandCSharp')} />,
  SiTypescript: <SiTypescript size={defaultIconSize} color={getStableColor('SiTypescript')} />,
  FaFlutter: <FaFlutter size={defaultIconSize} color={getStableColor('FaFlutter')} />,
  LuBadgeJapaneseYen: (
    <LuBadgeJapaneseYen size={defaultIconSize} color={getStableColor('LuBadgeJapaneseYen')} />
  ),
};

const DefaultIcon = <FaQuestionCircle size={defaultIconSize} color="var(--mantine-color-gray-6)" />;

// 分類排序
const CATEGORY_ORDER = ['frontend', 'backend', 'mobile', 'other'];

// 分類對應的 Badge 顏色
const categoryColorMap: Record<string, string> = {
  frontend: 'blue',
  backend: 'green',
  mobile: 'violet',
  other: 'gray',
};

/**
 * 技能清單的 UI 區塊（Client Component）。
 * 翻譯資料由父層 Server Component 解析後透過 props 傳入。
 */
export default function SkillContent({ items, categoryLabels }: Readonly<SkillContentProps>) {
  // 依分類分組
  const grouped = CATEGORY_ORDER.reduce<Record<string, typeof items>>((acc, cat) => {
    const filtered = items.filter((item) => item.category === cat);
    if (filtered.length > 0) {
      acc[cat] = filtered;
    }
    return acc;
  }, {});

  return (
    <AnimatedWrapper>
      <Stack gap="xl">
        {Object.entries(grouped).map(([category, skillItems]) => (
          <Box key={category}>
            <Flex align="center" gap="sm" mb="md">
              <Badge color={categoryColorMap[category] ?? 'gray'} size="lg" variant="filled">
                {categoryLabels[category] ?? category}
              </Badge>
              <Divider style={{ flex: 1 }} />
            </Flex>
            <Stack gap="sm">
              {skillItems.map((item) => {
                const IconComponent = iconMap[item.icon] ?? DefaultIcon;

                return (
                  <Paper key={item.title} p="md" radius="md" withBorder>
                    <Grid align="center" gap="sm">
                      <Grid.Col span={{ base: 12, sm: 4 }}>
                        <Flex align="center" gap="sm">
                          {IconComponent}
                          <Text fw={500} size="lg">
                            {item.translatedTitle}
                          </Text>
                        </Flex>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, sm: 8 }}>
                        <Text c="dimmed" size="sm">
                          {item.translatedDesc}
                        </Text>
                      </Grid.Col>
                    </Grid>
                  </Paper>
                );
              })}
            </Stack>
          </Box>
        ))}
      </Stack>
    </AnimatedWrapper>
  );
}
