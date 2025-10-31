import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh-TW', 'ja'],
  defaultLocale: 'zh-TW', // 我的網站主要還是面向台灣用戶
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
