import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh-TW', 'en', 'ja'],
  defaultLocale: 'zh-TW',
  localeDetection: false, // 停用瀏覽器語系自動偵測，一律以 defaultLocale 為主
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
