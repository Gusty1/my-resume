# 履歷專案優化建議報告

> 分析日期：2026-03-22
> 專案：my-resume（Next.js 16 + Mantine 8 + next-intl）

---

## 目錄

1. [依賴版本分析](#1-依賴版本分析)
2. [未使用依賴](#2-未使用依賴)
3. [程式碼 Bug](#3-程式碼-bug)
4. [程式碼品質](#4-程式碼品質)
5. [效能優化](#5-效能優化)
6. [UI / UX 調整](#6-ui--ux-調整)
7. [SEO 與無障礙性](#7-seo-與無障礙性)
8. [優先度總結](#8-優先度總結)

---

## 1. 依賴版本分析

### 可安全升級（patch / minor）

以下套件可直接執行 `npm update` 升級，均為次要版本或補丁，風險極低：

| 套件 | 目前版本 | 最新版本 | 類型 |
|------|---------|---------|------|
| `@mantine/carousel` | 8.3.17 | **8.3.18** | patch |
| `@mantine/core` | 8.3.17 | **8.3.18** | patch |
| `@mantine/hooks` | 8.3.17 | **8.3.18** | patch |
| `framer-motion` | 12.36.0 | **12.38.0** | patch |
| `@eslint/eslintrc` | 3.3.1 | **3.3.5** | patch |
| `stylelint` | 17.4.0 | **17.5.0** | minor |
| `typescript-eslint` | 8.57.0 | **8.57.1** | patch |

> **已執行**：上述套件均已於 2026-03-22 更新完畢。

### 需要評估才能升級（major）

以下套件有大版本更新，升級前請確認相容性：

| 套件 | 目前版本 | 最新版本 | 注意事項 |
|------|---------|---------|---------|
| `next` | ~~16.1.6~~ → **16.2.1** | 16.2.1 | **已升級** |
| `eslint` | 9.39.1 | **10.1.0** | 大版本，API 有 breaking change，暫不升級 |
| `@eslint/js` | 9.39.1 | **10.0.1** | 配合 eslint 10，一起評估 |

---

## 2. 未使用依賴

`depcheck` 靜態分析結果：

### 生產依賴 - 可移除

| 套件 | 原因 |
|------|------|
| `@tabler/icons-react` | 程式碼中完全未匯入，所有 icon 均來自 `react-icons` |

> **已執行**：2026-03-22 已移除。

### 開發依賴 - 需確認後移除

以下由 `depcheck` 標示為未使用，但部分是透過設定檔間接使用，請評估後決定：

| 套件 | 說明 | 建議 |
|------|------|------|
| `stylelint-config-standard-scss` | stylelint 設定中若無 `.stylelintrc` 設定檔，可能未實際套用 | 確認是否有 `.stylelintrc`，若無則移除 |
| `@types/eslint-plugin-jsx-a11y` | TypeScript 型別包，若 `eslint-plugin-jsx-a11y` 本身已含型別則重複 | 可嘗試移除，看 TS 是否報錯 |
| `@eslint/eslintrc` | 舊版 ESLint 相容層，新版 flat config 不需要 | 若 `eslint.config.mjs` 未匯入則移除 |
| `postcss-preset-mantine` / `postcss-simple-vars` | 透過 `postcss.config.mjs` 使用，depcheck 偵測不到 | **保留** |
| `@ianvs/prettier-plugin-sort-imports` | 透過 `.prettierrc.mjs` 使用，depcheck 偵測不到 | **保留** |

---

## 3. 程式碼 Bug

### BUG-01：`localeDetection: false` 與註解矛盾

**檔案：** `i18n/routing.ts:7`

**問題：** 設為 `false` 代表**停用**自動偵測，但旁邊的註解說「根據瀏覽器語系自動偵測」，邏輯完全相反，容易誤導後續維護者。

> **已修正**：將誤導性註解更正為「停用瀏覽器語系自動偵測，一律以 defaultLocale 為主」。

---

### BUG-02：`as any` 型別斷言破壞 TypeScript 安全

**檔案：** `i18n/request.ts:8`

**問題：** 使用 `as any` 繞過型別檢查。

> **已修正**：改用 `type SupportedLocale = (typeof routing.locales)[number]` 的安全型別斷言。

---

### BUG-03：`MobileNavbar.tsx` 使用 `next/link` 而非 i18n Link

**檔案：** `app/[locale]/MobileNavbar.tsx`

**問題：** Logo 連結使用原生 `next/link` 並手動拼接 `/${locale}/`，而非使用 `i18n/routing.ts` 匯出的 `Link`，與其他頁面不一致。

> **已修正**：改為 `import { Link } from '@/i18n/routing'`，`href` 直接寫 `"/"`。

---

### BUG-04：`skill/page.tsx` 匯入 `React` 但未使用

**檔案：** `app/[locale]/skill/page.tsx`

**問題：** Next.js 13+ 已自動注入 JSX transform，不需要手動 `import React`。

> **已修正**：移除多餘的 `import React from 'react'`。

---

### BUG-05：`getStableColor` 使用不精準的 Hash 算法

**檔案：** `app/[locale]/skill/page.tsx`

**問題：** `hash &= hash` 是 no-op（等同於 `hash = hash`），原意應為 `hash |= 0` 進行 32 位元整數截斷。

> **已修正**：改為 `hash |= 0`，正確截斷為 32 位元整數。

---

## 4. 程式碼品質

### QUALITY-01：`reactStrictMode` 設為 `false`

**檔案：** `next.config.ts`

**問題：** React Strict Mode 有助於提早發現副作用、不安全的生命週期等問題。`SakanaWidgetClient.tsx` 已有 `widgetRef.current` 防重複掛載保護，可安全啟用。

> **已修正**：改為 `reactStrictMode: true`，確認無副作用。

---

### QUALITY-02：`NavBtnGroup.module.css` 使用 Mantine mixin

**檔案：** `components/Home/NavBtnGroup.module.css`

**說明：** `@mixin hover` 是 Mantine 的 PostCSS 插件語法，在 Mantine CSS Modules 中合法。若 stylelint 驗證時報錯，可在 `.stylelintrc` 加入：

```json
{
  "rules": {
    "at-rule-no-unknown": [true, { "ignoreAtRules": ["mixin"] }]
  }
}
```

> 目前 stylelint 無報錯，保持現狀。

---

### QUALITY-03：程式碼格式化不一致

**問題：** 多個檔案格式不符合 Prettier 規範。

> **已修正**：執行 `npm run prettier:write`，全部檔案已統一格式。

---

## 5. 效能優化

### PERF-01：`@mantine/carousel` 引入了 `embla-carousel` 兩次

**問題：** `@mantine/carousel` 內部已包含 `embla-carousel` 和 `embla-carousel-react`，程式碼中未直接使用 Embla 原生 API，屬重複依賴。

> **已修正**：執行 `npm uninstall embla-carousel embla-carousel-react` 移除重複依賴。

---

### PERF-02：所有頁面設為 `'use client'`，喪失 SSR 優勢

**問題：** 三個主要頁面都宣告 `'use client'`，因使用 `framer-motion` 動畫，無法利用 Next.js App Router 的 Server Component 優勢。

**執行方式：**

新建 `components/AnimatedWrapper.tsx`（`'use client'`）封裝 framer-motion 動畫。三個頁面改為 async Server Component，翻譯從 `useTranslations` 改為 `getTranslations`（server 版）。Portfolio 頁面另外拆出 `PortfolioTabs.tsx`（`'use client'`）處理 Tabs 互動邏輯，由 Server Component 預先解析翻譯後以 props 傳入。

> **部分修正**：
> - 新增 `components/AnimatedWrapper.tsx`（Client Component，封裝 framer-motion 動畫）
> - 新增 `app/[locale]/portfolio/PortfolioTabs.tsx`（Client Component，處理 Tabs 互動）
> - `portfolio/page.tsx` 成功改為 Server Component，翻譯於 Server 解析後以 props 傳入
> - `page.tsx`、`skill/page.tsx` 因使用 Mantine 複合元件（`Grid.Col`、`Timeline.Item` 等）在 Server Component 中會失效，仍需保留 `'use client'`，但動畫已獨立到 `AnimatedWrapper`

---

### PERF-03：圖片未最佳化

**問題：**
- `portfolio/page.tsx` 使用 Mantine `<Image>`，不會自動產生 WebP 格式
- 作品集圖片總計約 1.8 MB，`musashi.png` 約 281 KB

**已執行（程式碼部分）：**
- `PortfolioTabs.tsx` 改用 Next.js `<Image fill>`，並設定 `sizes` 屬性讓 Vercel 依視窗大小提供最佳尺寸
- `MyCarousel.tsx` 改用 Next.js `<Image fill>`，移除 Mantine `<Image>` 依賴
- Vercel 部署後會自動轉換為 WebP / AVIF 並透過 CDN 快取

**待處理（手動壓縮原始圖片）：**

| 檔案 | 現在大小 | 建議目標 |
|------|---------|---------|
| `animeList.png` | 1.1MB | < 200KB |
| `musashi.png` | 284KB | < 80KB |
| `gustyLittleWorld.png` | 292KB | < 80KB |
| `home3.png` | 440KB | < 100KB |

建議使用 [squoosh.app](https://squoosh.app) 壓縮後替換，即使不壓縮，Next.js Image Optimization 已大幅降低實際傳輸量。

---

### PERF-04：`SakanaWidget` 對行動裝置不友善

**問題：** Widget 固定在右下角，在小螢幕上可能遮擋操作區域。

> **已修正**：新增 `components/SakanaWidgetClient.module.css`，使用 media query 在 `sm` 以下隱藏 Widget。

---

## 6. UI / UX 調整

### UI-01：語言切換按鈕缺乏當前語言標示

**問題：** 設定按鈕看不出目前語言，用戶需展開子選單才能辨識。

> **已修正**：在設定按鈕文字後附加當前語言代碼，例如「設定 · ZH-TW」。

---

### UI-02：深色模式 Toggle 在 Navbar 中位置容易忽略

**問題：** 主題切換藏在「設定」子選單內，用戶較難找到。

> **已修正**：
> - **桌面版**：在 `MobileNavbar.tsx` Header 右側新增月亮/太陽 `ActionIcon`，附 Tooltip，直接點擊切換
> - **行動版**：`NavBtnGroup` 新增 `showColorToggle` prop，展開導覽列時同步顯示切換按鈕
> - 設定子選單移除原有的 `Switch`，保持選單簡潔
> - 三語翻譯新增 `lightMode` / `darkMode` key

---

### UI-03：作品集卡片描述高度硬編碼

**檔案：** `app/[locale]/portfolio/page.tsx`

**問題：** `h="72px"` 硬編碼高度搭配 `lineClamp={4}`，在不同語言文字長度下容易出現對齊問題。

> **已修正**：移除 `h="72px"`，純粹依賴 `lineClamp={4}` 控制行數。

---

### UI-04：`ScrollArea` 在時間軸中可能體驗不佳

**檔案：** `app/[locale]/page.tsx`

**問題：** `type="auto"` 在 macOS 上預設隱藏捲軸，用戶可能不知道可以滾動。

> **已修正**：改為 `type="hover"`，滑鼠移入時明確顯示捲軸。

---

### UI-05：Burger 按鈕缺少無障礙標籤

**檔案：** `app/[locale]/MobileNavbar.tsx`

**問題：** 螢幕閱讀器無法識別此按鈕的用途。

> **已修正**：新增 `aria-label`，連動翻譯 key `menuOpen` / `menuClose`，三語皆已補充。

---

## 7. SEO 與無障礙性

### SEO-01：缺少 Open Graph / Twitter Card meta

**檔案：** `app/[locale]/layout.tsx`

**問題：** `generateMetadata` 只提供 `title` 和 `description`，社群媒體分享時無預覽。

> **已修正**：新增 `openGraph` 欄位，包含 title、description、type、locale、url、siteName。

---

### SEO-02：缺少 `robots.txt` 和 `sitemap.xml`

**問題：** 無 SEO 相關設定，搜尋引擎爬蟲無法得知網站結構。

> **已修正**：
> - 新增 `app/sitemap.ts`：自動產生 9 個 URL（3 語言 × 3 頁面），含 `changeFrequency` 與 `priority`
> - 新增 `app/robots.ts`：允許所有爬蟲，指向 sitemap

---

### SEO-03：缺少 `not-found.tsx` 錯誤頁

**問題：** 訪問不存在的路由時顯示 Next.js 預設 404 頁面，品牌不一致。

> **已修正**：新增 `app/[locale]/not-found.tsx`，大型 404 字樣搭配說明文字和「返回首頁」按鈕。三個翻譯檔新增 `notFound` 命名空間（title、description、backHome）。

---

### A11Y-01：`portfolio/page.tsx` 圖片缺少描述性 alt

**檔案：** `app/[locale]/portfolio/PortfolioTabs.tsx`

**問題：** `alt` 只有標題（如「訂飲料」），對螢幕閱讀器用戶缺乏上下文。

> **已修正**：
> - `portfolio.json` 新增 `altText` 欄位（對應翻譯 key）
> - 三語翻譯（zh-TW / en / ja）各自新增描述性 alt 文字
> - `PortfolioTabs.tsx` 改用 `item.altText` 作為 `<Image>` 的 `alt` 屬性

---

## 8. 優先度總結

### 高優先度 - 應立即修正

| 編號 | 問題 | 修正難度 | 狀態 |
|------|------|---------|------|
| BUG-01 | `localeDetection` 設定與註解矛盾 | 低（改一行） | **已修正** |
| BUG-02 | `as any` 型別斷言 | 低（改一行） | **已修正** |
| BUG-03 | Logo Link 未使用 i18n Link | 低（改 import） | **已修正** |
| BUG-04 | 多餘的 `import React` | 低（刪一行） | **已修正** |
| QUALITY-03 | 程式碼格式化不一致 | 低（執行指令） | **已修正** |
| 依賴移除 | `@tabler/icons-react` 未使用 | 低（執行指令） | **已移除** |
| 依賴升級 | patch / minor 版本更新 | 低（執行指令） | **已升級** |

### 中優先度 - 有空時處理

| 編號 | 問題 | 修正難度 | 狀態 |
|------|------|---------|------|
| BUG-05 | `hash &= hash` 無意義程式碼 | 低 | **已修正** |
| QUALITY-01 | `reactStrictMode: false` | 低（改一行，需測試） | **已修正** |
| PERF-01 | embla-carousel 重複依賴 | 低（確認後移除） | **已移除** |
| PERF-04 | SakanaWidget 行動裝置遮擋 | 中 | **已修正** |
| UI-01 | 語言切換缺乏當前語言標示 | 低 | **已修正** |
| UI-03 | 卡片描述高度硬編碼 | 低（刪一個 prop） | **已修正** |
| UI-05 | Burger 缺少 ARIA 標籤 | 低 | **已修正** |
| SEO-01 | 缺少 Open Graph meta | 低 | **已修正** |

### 低優先度 - 未來可考慮

| 編號 | 問題 | 修正難度 | 狀態 |
|------|------|---------|------|
| PERF-02 | 頁面全部 'use client' | 高（架構調整） | **部分修正** |
| PERF-03 | 圖片未最佳化 | 中 | 待處理 |
| SEO-02 | 缺少 robots.txt / sitemap | 低 | **已修正** |
| SEO-03 | 缺少 not-found.tsx | 低 | **已修正** |
| UI-02 | 深色模式 Toggle 位置 | 中 | **已修正** |
| UI-04 | ScrollArea 體驗 | 低 | **已修正** |
| A11Y-01 | portfolio 圖片缺少描述性 alt | 低 | **已修正** |

---

*報告由 Claude Code 自動生成，分析基於靜態程式碼審查，部分建議需根據實際需求評估是否採用。*
