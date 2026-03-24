'use client';

import { ReactNode } from 'react';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';
import { FaMoon } from 'react-icons/fa';
import { MdOutlineWbSunny } from 'react-icons/md';
import {
  ActionIcon,
  Anchor,
  AppShell,
  Burger,
  Container,
  Flex,
  Group,
  Text,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NavBtnGroup from '@/components/Home/NavBtnGroup';
import SakanaWidgetClient from '@/components/SakanaWidgetClient';
import { Link } from '@/i18n/routing';

// 3. 定義 props，需要接收 children
interface ShellProps {
  children: ReactNode;
}

export default function MobileNavbar({ children }: Readonly<ShellProps>) {
  const [opened, { toggle, close }] = useDisclosure();
  const t = useTranslations('navbar');
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            aria-label={opened ? t('menuClose') : t('menuOpen')}
          />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Anchor component={Link} href="/" underline="never" onClick={close}>
              <Flex align="center" gap="xs">
                <NextImage
                  src="/images/portfolio/gustyLittleWorld.png"
                  alt="Gray's Resume Logo"
                  width={32}
                  height={32}
                  style={{ borderRadius: 'var(--mantine-radius-md)' }}
                />
                <Text size="lg" fw={600}>
                  Gray
                </Text>
              </Flex>
            </Anchor>
            {/* 桌面版：導覽連結 + 深色模式切換按鈕 */}
            <Group ml="lg" gap={10} visibleFrom="sm" mr="md">
              <NavBtnGroup />
              <Tooltip label={isDark ? t('lightMode') : t('darkMode')} withArrow>
                <ActionIcon
                  variant="default"
                  size="lg"
                  onClick={toggleColorScheme}
                  aria-label={isDark ? t('lightMode') : t('darkMode')}
                >
                  {isDark ? (
                    <MdOutlineWbSunny size={18} color="var(--mantine-color-blue-6)" />
                  ) : (
                    <FaMoon size={16} color="var(--mantine-color-yellow-4)" />
                  )}
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      {/* 行動版：導覽列含深色模式切換 */}
      <AppShell.Navbar py="md" px="md">
        <NavBtnGroup onLinkClick={close} mobile />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="md" mt="sm">
          {children}
        </Container>
      </AppShell.Main>
      <SakanaWidgetClient />
    </AppShell>
  );
}
