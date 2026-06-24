/**
 * 站点集中配置
 * 所有个人/站点配置集中管理，减少硬编码散落
 */
export const SITE_CONFIG = {
  author: 'OmaeKumiko529',
  alias: 'FishMoies',
  motto: '念起成形 Turning ideas into reality.',
  email: 'xisiyao0529@gmail.com',
  domain: 'https://fishmoies.github.io/PersonalWebsite',

  social: {
    github: 'https://github.com/OmaeKumiko529',
    twitter: 'https://twitter.com/OmaeKumiko529',
    telegram: 'https://t.me/OmaeKumiko529',
    email: 'mailto:xisiyao0529@gmail.com',
  },

  // ICP 备案号
  icp: '湘ICP备2026014314号-1',
  icpUrl: 'https://beian.miit.gov.cn/',

  // 导航项
  navItems: [
    { label: 'home',  path: '/',      desc: '主页',   icon: 'home' },
    { label: 'works', path: '/works', desc: '作品集', icon: 'works' },
    { label: 'blog',  path: '/blog',  desc: '博客',   icon: 'blog' },
  ],

  // 社交链接
  socialLinks: [
    { label: 'GitHub',   url: 'https://github.com/OmaeKumiko529',            icon: 'github' },
    { label: 'Email',    url: 'mailto:xisiyao0529@gmail.com',               icon: 'email' },
    { label: 'Telegram', url: 'https://t.me/OmaeKumiko529',                 icon: 'telegram' },
    { label: 'Twitter',  url: 'https://twitter.com/OmaeKumiko529',          icon: 'twitter' },
  ],
}

/** 博客相关常量 */
export const BLOG_CONFIG = {
  storageKey: 'kumiko_blog_posts',
  maxChars: 280,
}