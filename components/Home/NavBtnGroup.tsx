'use client';

import { useLocale, useTranslations } from 'next-intl';
import { AiFillProfile } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { MdOutlineWbSunny } from 'react-icons/md';
import { SiDictionarydotcom } from 'react-icons/si';
import { Button, Menu, useMantineColorScheme } from '@mantine/core';
import { Link, routing, usePathname, useRouter } from '@/i18n/routing';
import classes from './NavBtnGroup.module.css';

/** 語言 code 對應到 i18n key，新增語言時只需在此處擴充 */
const localeNameKey: Record<(typeof routing.locales)[number], 'chinese' | 'english' | 'japanese'> =
  {
    'zh-TW': 'chinese',
    en: 'english',
    ja: 'japanese',
  };

interface NavBtnGroupProps {
  onLinkClick?: () => void;
  /** 行動版側邊導覽列模式：按鈕靠左對齊、撐滿寬度、顯示深色模式切換 */
  mobile?: boolean;
}

export default function NavBtnGroup({ onLinkClick, mobile = false }: Readonly<NavBtnGroupProps>) {
  const t = useTranslations('navbar');
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (nextLocale: string) => {
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <>
      <Button
        component={Link}
        className={classes.control}
        href="/skill"
        variant="transparent"
        leftSection={<AiFillProfile />}
        onClick={onLinkClick}
        justify="flex-start"
        fullWidth={mobile}
      >
        {t('skill')}
      </Button>
      <Button
        className={classes.control}
        component={Link}
        href="/portfolio"
        variant="transparent"
        leftSection={<SiDictionarydotcom />}
        onClick={onLinkClick}
        justify="flex-start"
        fullWidth={mobile}
      >
        {t('portfolio')}
      </Button>

      {/* 行動版：深色模式切換，樣式與其他按鈕一致 */}
      {mobile && (
        <Button
          className={classes.control}
          variant="transparent"
          justify="flex-start"
          fullWidth
          leftSection={
            isDark ? (
              <MdOutlineWbSunny size={18} color="var(--mantine-color-blue-6)" />
            ) : (
              <FaMoon size={16} color="var(--mantine-color-yellow-4)" />
            )
          }
          onClick={() => {
            toggleColorScheme();
            onLinkClick?.();
          }}
          aria-label={isDark ? t('lightMode') : t('darkMode')}
        >
          {isDark ? t('lightMode') : t('darkMode')}
        </Button>
      )}

      {/* 語言切換：從 routing.locales 動態產生，新增語言只需更新 routing.ts */}
      <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Button
            className={classes.control}
            variant="default"
            justify="flex-start"
            fullWidth={mobile}
          >
            {locale.toUpperCase()}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {routing.locales.map((loc) => (
            <Menu.Item
              key={loc}
              color={locale === loc ? 'blue' : undefined}
              onClick={() => {
                handleLanguageChange(loc);
                onLinkClick?.();
              }}
            >
              {t(localeNameKey[loc])}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
