import { ImageResponse } from 'next/og';
import { createTranslator } from 'next-intl';
import { getCareerYears } from '@/constants/site';
import enMessages from '@/messages/en.json';

// next/og 預設字型不含中日文字形，分享預覽圖統一使用英文文案（與 messages/en.json 同步）
const t = createTranslator({ locale: 'en', messages: enMessages });

export const alt = t('meta.title');
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** 與網站主色（Mantine cyan-6）一致 */
const ACCENT_COLOR = '#15aabf';

/**
 * 連結分享預覽圖（LINE、Slack、Facebook 等）。
 * ImageResponse 只支援 inline style，這裡無法使用 CSS Modules。
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 96,
        background: '#ffffff',
        color: '#1a1b1e',
      }}
    >
      <div style={{ width: 120, height: 10, borderRadius: 5, background: ACCENT_COLOR }} />
      <div style={{ marginTop: 48, fontSize: 72, fontWeight: 700 }}>{t('meta.title')}</div>
      <div style={{ marginTop: 32, fontSize: 34, lineHeight: 1.5, color: '#495057' }}>
        {t('home.summary', { years: getCareerYears() })}
      </div>
    </div>,
    size
  );
}
