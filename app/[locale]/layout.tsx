import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ColorSchemeScript, createTheme, mantineHtmlProps, MantineProvider } from '@mantine/core';
import MobileNavbar from './MobileNavbar';

import '@mantine/core/styles.css';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

interface MetadataProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: MetadataProps) {
  // 在函式內部 await params 來取得 locale
  const { locale } = await params; 

  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title') || 'Gray Resume',
    description: t('description') || 'Personal resume website.',
  };
}

//設定主題顏色
const theme = createTheme({
  primaryColor: 'cyan',
});

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params; //最新版要用await的寫法
  const messages = await getMessages();

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <MobileNavbar>{children}</MobileNavbar>
          </NextIntlClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}