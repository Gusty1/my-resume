'use client';

import { Link, usePathname, useRouter } from '../../i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { AiFillProfile } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { MdOutlineWbSunny } from 'react-icons/md';
import { SiDictionarydotcom } from 'react-icons/si';
import { Button, Menu, Switch, useMantineColorScheme } from '@mantine/core';
import classes from './NavBtnGroup.module.css';

interface NavBtnGroupProps {
  onLinkClick?: () => void;
}

export default function NavBtnGroup({ onLinkClick }: NavBtnGroupProps) {
  const t = useTranslations('navbar');
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  // 取得當前語言 (例如: 'en', 'ja', 'zh-TW')
  const locale = useLocale();

  const router = useRouter();
  // pathname 會自動回傳「不包含」 locale 的路徑 (例如: '/skill')
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
      >
        {t('skill') /*技能*/}
      </Button>
      <Button
        className={classes.control}
        component={Link}
        href="/portfolio"
        variant="transparent"
        leftSection={<SiDictionarydotcom />}
        onClick={onLinkClick}
        justify="flex-start"
      >
        {t('portfolio')}
      </Button>
      <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Button variant="default" justify="flex-start">
            {t('setting')}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <Switch
              checked={isDark}
              onChange={() => {
                toggleColorScheme();
                onLinkClick?.();
              }}
              size="md"
              color="dark.4"
              onLabel={<FaMoon size={16} color="var(--mantine-color-yellow-4)" />}
              offLabel={<MdOutlineWbSunny size={16} color="var(--mantine-color-blue-6)" />}
            />
          </Menu.Item>
          <Menu.Sub>
            <Menu.Sub.Target>
              <Menu.Sub.Item>{t('language') /*語言*/}</Menu.Sub.Item>
            </Menu.Sub.Target>
            <Menu.Sub.Dropdown>
              <Menu.Item
                color={locale === 'zh-TW' ? 'blue' : undefined}
                onClick={() => {
                  handleLanguageChange('zh-TW');
                  onLinkClick?.();
                }}
              >
                {t('chinese') /*中文*/}
              </Menu.Item>
              <Menu.Item
                color={locale === 'en' ? 'blue' : undefined}
                onClick={() => {
                  handleLanguageChange('en');
                  onLinkClick?.();
                }}
              >
                {t('english') /*英文*/}
              </Menu.Item>
              <Menu.Item
                color={locale === 'ja' ? 'blue' : undefined}
                onClick={() => {
                  handleLanguageChange('ja');
                  onLinkClick?.();
                }}
              >
                {t('japanese') /*日文*/}
              </Menu.Item>
            </Menu.Sub.Dropdown>
          </Menu.Sub>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}