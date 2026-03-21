import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh-TW', 'en', 'ja'],
  defaultLocale: 'zh-TW',
  localeDetection: true, // 根據瀏覽器語系自動偵測
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
