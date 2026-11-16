/** 網站的正式部署網址，用於 SEO metadata、sitemap 和 robots.txt */
export const SITE_URL = 'https://my-resume-tau-amber.vercel.app';

export const SITE_NAME = "Gray's Resume";

/** 職涯起算點：2021/02 起任職，扣除 2023/04~2023/10 半年空檔，等同 2021/08 起算 */
const CAREER_START = new Date(2021, 7, 1);

/** 目前的完整工作年資（以月份計算），隨時間自動更新，避免自介文案過時 */
export const getCareerYears = (now: Date = new Date()): number => {
  const months =
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 +
    (now.getMonth() - CAREER_START.getMonth());
  return Math.floor(months / 12);
};
