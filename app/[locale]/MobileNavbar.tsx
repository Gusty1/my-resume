'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Anchor, AppShell, Burger, Container, Flex, Group, Image, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NavBtnGroup from '../../components/Home/NavBtnGroup';

// 3. 定義 props，需要接收 children
interface ShellProps {
  children: ReactNode;
}

export default function MobileNavbar({ children }: ShellProps) {
  const [opened, { toggle, close }] = useDisclosure();
  const locale = useLocale();

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
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Anchor
              component={Link}
              href={`/${locale}/`}
              underline="never"
              onClick={close}
            >
              <Flex>
                <Image radius="md" w="32px" h="32px" src="/images/portfolio/gustyLittleWorld.png" />
                <Text size='lg' fw={500}>Gray</Text>
              </Flex>
            </Anchor>
            <Group ml="lg" gap={10} visibleFrom="sm" mr="md">
              <NavBtnGroup />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <NavBtnGroup onLinkClick={close} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="md" mt="sm">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
