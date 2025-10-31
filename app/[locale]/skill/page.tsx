'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaJava, FaPython, FaQuestionCircle, FaReact } from 'react-icons/fa';
import { FaFlutter } from 'react-icons/fa6';
import { LuBadgeJapaneseYen } from 'react-icons/lu';
import { SiTypescript } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { Divider, Flex, Grid, Rating, Stack, Text } from '@mantine/core';
import { containerVariants } from '../../../common/animeSetting';
import skillJson from '../../../data/skill/skill.json';

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

// 建立「穩定 Hash」函式它會接收一個字串 (例如 "FaReact")， 並「永遠」回傳同一個顏色
const getStableColor = (str: string): string => {
  let hash = 0;
  // 簡單的 hash 算法
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // 轉換成 32bit 整數
  }
  // 確保 hash 是正數，並用它來選取顏色
  const index = Math.abs(hash) % mantineColorVars.length;
  return mantineColorVars[index];
};

const defaultIconSize = 28;

//設定對應的icon map
const iconMap = {
  FaReact: <FaReact size={defaultIconSize} color={getStableColor('FaReact')} />,
  FaJava: <FaJava size={defaultIconSize} color={getStableColor('FaJava')} />,
  FaPython: <FaPython size={defaultIconSize} color={getStableColor('FaPython')} />,
  TbBrandCSharp: <TbBrandCSharp size={defaultIconSize} color={getStableColor('TbBrandCSharp')} />,
  SiTypescript: <SiTypescript size={defaultIconSize} color={getStableColor('SiTypescript')} />,
  FaFlutter: <FaFlutter size={defaultIconSize} color={getStableColor('FaFlutter')} />,
};

//以防有icon沒對應到
const DefaultIcon = <FaQuestionCircle size={defaultIconSize} color="var(--mantine-color-gray-6)" />;

export default function SkillPage() {
  const t = useTranslations('skill');

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Stack>
        {skillJson.map((item, index) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || DefaultIcon;

          return (
            <React.Fragment key={`${item.title}-${index}`}>
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
                  <Text c="dimmed">{t(item.description) || '...'}</Text>
                </Grid.Col>
              </Grid>
              <Divider />
            </React.Fragment>
          );
        })}

        <Grid align="center">
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
            <Text c="dimmed">{t('japaneseDesc')}</Text>
          </Grid.Col>
        </Grid>
      </Stack>
    </motion.div>
  );
}
