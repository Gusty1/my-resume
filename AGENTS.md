# AGENTS.md — Gray's Resume

> This file is the authoritative guide for AI agents working on this codebase.
> Read this **before** writing any code, making changes, or running commands.

---

## Project Overview

**Gray's Resume** is a personal resume/portfolio website built with Next.js 16 (App Router).

- **Live URL**: https://my-resume-tau-amber.vercel.app
- **Default language**: zh-TW (Traditional Chinese)
- **Supported languages**: zh-TW, en, ja
- **Deployment**: Vercel

### Core Stack

| Tech | Version | Role |
|------|---------|------|
| Next.js | ^16.2.1 | Framework (App Router) |
| React | 19.2.4 | UI library |
| TypeScript | 5.9.3 | Type safety |
| Mantine | ^8.3.17 | UI component library |
| next-intl | ^4.8.3 | i18n routing & translations |
| Framer Motion | ^12.36.0 | Page animations |
| react-icons | ^5.6.0 | Icon library |
| sakana-widget | ^2.7.1 | Interactive character widget |

---

## Repository Structure

```
my-resume/
├── app/
│   ├── [locale]/               # Dynamic locale route (zh-TW | en | ja)
│   │   ├── layout.tsx          # Root layout — Mantine theme, AppShell, SakanaWidget
│   │   ├── page.tsx            # Home page (Server Component)
│   │   ├── MobileNavbar.tsx    # Responsive nav (AppShell header + drawer)
│   │   ├── not-found.tsx       # 404 page
│   │   ├── portfolio/
│   │   │   ├── page.tsx        # Portfolio page (Server Component)
│   │   │   ├── PortfolioTabs.tsx   # Tabs: Web / Mobile / Desktop / Other
│   │   │   └── PortfolioPage.module.css
│   │   └── skill/
│   │       ├── page.tsx        # Skill page (Server Component)
│   │       └── SkillContent.tsx    # Skill card grid (Client Component)
│   ├── robots.ts               # Auto-generated robots.txt
│   └── sitemap.ts              # Auto-generated sitemap.xml (all locales × all pages)
│
├── components/
│   ├── Home/
│   │   ├── HomeContent.tsx     # Bio, social links, experience timeline (Client)
│   │   ├── MyCarousel.tsx      # Photo carousel via Mantine Carousel (Client)
│   │   ├── NavBtnGroup.tsx     # Nav buttons + dark mode + language switcher (Client)
│   │   ├── MyCarousel.module.css
│   │   └── NavBtnGroup.module.css
│   ├── AnimatedWrapper.tsx     # Framer Motion fade-in wrapper (Client)
│   └── SakanaWidgetClient.tsx  # Sakana interactive widget — manual DOM (Client)
│
├── constants/
│   ├── site.ts                 # SITE_URL, SITE_NAME — used in metadata/SEO
│   └── animeSetting.ts         # containerVariants for Framer Motion
│
├── data/                       # Static JSON — source of truth for content
│   ├── home/
│   │   ├── experience.json     # Timeline entries: { title, date }
│   │   └── image.json          # Carousel images: { altKey, src }
│   ├── portfolio/
│   │   └── portfolio.json      # Projects: { title, type, src, link?, descriptionKey }
│   └── skill/
│       └── skill.json          # Skills: { title, icon, description, level }
│
├── i18n/
│   ├── routing.ts              # defineRouting — locales, defaultLocale
│   └── request.ts              # Dynamic message loader per locale
│
├── messages/
│   ├── en.json                 # English translations
│   ├── ja.json                 # Japanese translations
│   └── zh-TW.json              # Traditional Chinese translations (authoritative)
│
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── home/               # home1.png, home2.png, home3.png
│       ├── portfolio/          # 6 project screenshots
│       └── musashi.png         # Sakana Widget character
│
├── middleware.ts               # next-intl i18n routing interceptor
├── next.config.ts              # Next.js config: next-intl plugin, bundle analyzer
├── tsconfig.json               # Path alias: @/* → ./*
├── eslint.config.mjs
├── postcss.config.mjs          # Mantine CSS variables + custom breakpoints
└── .prettierrc.mjs             # Import sort order: Mantine first
```

---

## Commands

Always use `npm` (not yarn or pnpm) — this project uses `package-lock.json`.

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run test         # prettier:check + lint + typecheck (full CI check)
npm run typecheck    # tsc --noEmit only
npm run lint         # eslint + stylelint
npm run prettier:write  # Auto-format all .ts/.tsx files
npm run analyze      # Bundle size analysis (ANALYZE=true next build)
```

**Before committing**, always run:
```bash
npm run test
```

---

## Architecture: Server vs Client Components

This is a **critical distinction** — getting it wrong causes hydration errors.

### Rule of Thumb

| Concern | Component Type |
|---------|---------------|
| Data fetching, `getTranslations()`, metadata | **Server** |
| `useState`, `useEffect`, browser APIs, animations | **Client** (`'use client'`) |
| Static page shells with dynamic children | **Server** (pass props down) |

### Pattern: Server wraps Client

```tsx
// page.tsx (Server Component) ✅
const t = await getTranslations('skill');
const skills = skillJson.map(s => ({ ...s, description: t(s.description) }));
return <SkillContent skills={skills} />;  // pass resolved data

// SkillContent.tsx (Client Component) ✅
'use client';
export function SkillContent({ skills }: Props) { ... }
```

**Never** call `await getTranslations()` inside a `'use client'` component.

---

## Internationalization (i18n)

### Locales

```typescript
// i18n/routing.ts
locales: ['zh-TW', 'en', 'ja']
defaultLocale: 'zh-TW'
localeDetection: false   // browser detection is disabled
```

All routes are prefixed: `/zh-TW/`, `/en/`, `/ja/`

### Adding or Editing Translations

1. Edit all three files: `messages/zh-TW.json`, `messages/en.json`, `messages/ja.json`
2. Keep the same key structure in all files
3. Use `zh-TW.json` as the authoritative reference when adding new keys

### Translation Namespaces

| Namespace | Contents |
|-----------|----------|
| `meta` | Page title, description |
| `navbar` | Skill, Portfolio labels; language names |
| `home` | Self-introduction, experience items, carousel alt text |
| `skill` | Skill descriptions (referenced by `skill.json`) |
| `portfolio` | Project descriptions (referenced by `portfolio.json`) |
| `notFound` | 404 page text |

### Translation Key Pattern

Data files reference translation keys, not raw strings:

```json
// data/skill/skill.json
{ "title": "React", "icon": "FaReact", "description": "react", "level": 3 }
//                                                    ^ key into messages/{locale}.json
```

The Server Component resolves keys via `t(skill.description)` before passing to client.

### Adding a New Language

1. Add locale to `i18n/routing.ts` → `locales` array
2. Create `messages/{locale}.json` (copy from `en.json`)
3. Add the locale label to the `navbar.languages` section of all translation files
4. The language switcher in `NavBtnGroup.tsx` generates entries dynamically from `routing.locales`

---

## Data Files

All content is stored as JSON in `data/`. **Do not hardcode content in components.**

### `data/skill/skill.json`

```typescript
interface SkillEntry {
  title: string;       // Display name
  icon: string;        // react-icons identifier (e.g. "FaReact")
  description: string; // Translation key → messages/{locale}.json skill.*
  level: 1 | 2 | 3 | 4; // Proficiency level (1 = basic, 4 = expert)
}
```

Icons are resolved in `skill/page.tsx` via `iconMap` (dynamic import from react-icons).

### `data/portfolio/portfolio.json`

```typescript
interface PortfolioEntry {
  title: string;          // Project name
  type: 'web' | 'android' | 'windows' | 'other'; // Tab category
  src: string;            // Image path under /public/images/portfolio/
  link?: string;          // Optional URL (omit if not publicly available)
  descriptionKey: string; // Translation key → messages/{locale}.json portfolio.*
}
```

### `data/home/experience.json`

```typescript
interface ExperienceEntry {
  title: string;  // Translation key → messages/{locale}.json home.*
  date: string;   // Date range string (e.g. "2024/10~")
}
```

### `data/home/image.json`

```typescript
interface ImageEntry {
  altKey: string; // Translation key → messages/{locale}.json home.*
  src: string;    // Image path under /public/
}
```

---

## Component Conventions

### Naming

- **Files**: PascalCase (`HomeContent.tsx`, `NavBtnGroup.tsx`)
- **CSS Modules**: same name as component (`NavBtnGroup.module.css`)
- **Interfaces**: PascalCase with `Props` suffix (`HomeContentProps`)

### Props

Always use `Readonly<Props>`:

```tsx
interface HomeContentProps {
  experiences: ExperienceEntry[];
}

export function HomeContent({ experiences }: Readonly<HomeContentProps>) { ... }
```

### CSS Modules

Use CSS Modules for component-specific styles. Do not use inline styles or Tailwind.
Global Mantine utility classes and CSS variables are available everywhere.

### Animations

All page content should be wrapped with `<AnimatedWrapper>` for consistent fade-in:

```tsx
import AnimatedWrapper from '@/components/AnimatedWrapper';

return <AnimatedWrapper>{/* page content */}</AnimatedWrapper>;
```

The animation config (`containerVariants`) lives in `constants/animeSetting.ts`.

---

## Key Implementation Notes

### SakanaWidget

`SakanaWidgetClient.tsx` uses **manual DOM management** (`useRef` + `sakana.mount()`).
Do not attempt to control it through React state — it manages its own lifecycle.
It is rendered inside `layout.tsx` outside `<AppShell.Main>`.

### Language Switcher

`NavBtnGroup.tsx` dynamically generates language menu items from `routing.locales`.
The mapping from locale code → display name is defined inline in that component.
When adding a new locale, update the mapping object there.

### Image Paths

- All images are under `/public/images/`
- Use Next.js `<Image>` component (not `<img>`) for all images
- Provide explicit `width` and `height` to prevent CLS
- Portfolio logo in navbar uses `/images/portfolio/gustyLittleWorld.png`

### SEO

- `SITE_URL` and `SITE_NAME` are defined in `constants/site.ts`
- Both `robots.ts` and `sitemap.ts` import from `constants/site.ts`
- `sitemap.ts` auto-generates entries for all locale × page combinations
- Metadata is generated per-locale in `layout.tsx` using `getTranslations('meta')`

### Path Aliases

`@/` maps to the project root:
```typescript
import { SITE_URL } from '@/constants/site';
import experienceJson from '@/data/home/experience.json';
```

---

## Common Tasks

### Add a new portfolio project

1. Add entry to `data/portfolio/portfolio.json`
2. Add `descriptionKey` translations to all three `messages/*.json` under `portfolio`
3. Add project image to `public/images/portfolio/`

### Add a new skill

1. Add entry to `data/skill/skill.json` with valid `icon` from react-icons
2. Add the description key to all three `messages/*.json` under `skill`
3. Add icon import to `iconMap` in `app/[locale]/skill/page.tsx`

### Add a new experience entry

1. Add entry to `data/home/experience.json` with a new `title` key
2. Add the title key translation to all three `messages/*.json` under `home`

### Add a new page/route

1. Create directory under `app/[locale]/your-page/`
2. Create `page.tsx` as a **Server Component** — use `await getTranslations()`
3. Extract interactive UI into a `YourPageContent.tsx` **Client Component**
4. Wrap with `<AnimatedWrapper>` for consistent fade-in
5. Add nav button to `NavBtnGroup.tsx` and `MobileNavbar.tsx`
6. Update `sitemap.ts` to include the new route

---

## What NOT to Do

- **Do not** call `getTranslations()` inside `'use client'` components
- **Do not** hardcode text content — always use translation keys
- **Do not** hardcode locale strings — read from `routing.locales`
- **Do not** use `<img>` — always use Next.js `<Image>` component
- **Do not** use `yarn` or `pnpm` — this project uses `npm`
- **Do not** add content directly to components — update JSON data files instead
- **Do not** edit `.next/` — it is auto-generated and gitignored
- **Do not** commit `tsconfig.tsbuildinfo` — it is gitignored
