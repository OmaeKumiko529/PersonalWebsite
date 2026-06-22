<!-- 左侧命令行风格导航栏 — 纯 CSS 版 -->
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const emit = defineEmits(['collapse-change'])
const router = useRouter()
const route = useRoute()
const isMobileOpen = ref(false)
const isCollapsed = ref(true)

// SVG 图标
const GITHUB_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`
const EMAIL_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z"/><path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z"/></svg>`
const TELEGRAM_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/></svg>`
const TWITTER_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>`

const HOME_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/></svg>`
const WORKS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z"/></svg>`
const BLOG_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM7.194 4.766c.087.124.163.26.227.401.428.948.393 2.377-.942 3.706a.446.446 0 0 1-.612.01.405.405 0 0 1-.011-.59c.419-.416.672-.831.809-1.22-.269.165-.588.26-.93.26C4.775 7.333 4 6.587 4 5.667 4 4.747 4.776 4 5.734 4c.271 0 .528.06.756.166l.008.004c.169.07.327.182.469.324.085.083.161.174.227.272zM11 7.073c-.269.165-.588.26-.93.26-.958 0-1.735-.746-1.735-1.666 0-.92.777-1.667 1.734-1.667.271 0 .528.06.756.166l.008.004c.17.07.327.182.469.324.085.083.161.174.227.272.087.124.164.26.228.401.428.948.392 2.377-.942 3.706a.446.446 0 0 1-.613.01.405.405 0 0 1-.011-.59c.42-.416.672-.831.81-1.22z"/></svg>`

const navItems = [
  { label: 'home',  path: '/',      desc: '主页',   icon: HOME_ICON },
  { label: 'works', path: '/works', desc: '作品集', icon: WORKS_ICON },
  { label: 'blog',  path: '/blog',  desc: '博客',   icon: BLOG_ICON },
]

const socialLinks = [
  { label: 'GitHub',   url: 'https://github.com/OmaeKumiko529',            icon: GITHUB_ICON },
  { label: 'Email',    url: 'mailto:xisiyao0529@gmail.com',             icon: EMAIL_ICON },
  { label: 'Telegram', url: 'https://t.me/OmaeKumiko529',               icon: TELEGRAM_ICON },
  { label: 'Twitter',  url: 'https://twitter.com/OmaeKumiko529',        icon: TWITTER_ICON },
]

function isActive(path) {
  return route.path === path
}

function navigate(path) {
  router.push(path)
  isMobileOpen.value = false
}

function closeMobile() {
  isMobileOpen.value = false
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem('kumiko_sidebar_collapsed', isCollapsed.value)
  emit('collapse-change', isCollapsed.value)
}
</script>

<template>
  <div v-if="isMobileOpen" class="nav-overlay" @click="closeMobile"></div>

  <button class="hamburger" @click="isMobileOpen = !isMobileOpen" :class="{ active: isMobileOpen }">
    <span></span><span></span><span></span>
  </button>

  <nav class="side-nav" :class="{ collapsed: isCollapsed, 'mobile-open': isMobileOpen }">
    <button class="collapse-btn" @click="toggleCollapse" :title="isCollapsed ? '展开' : '收起'">
      <span>◀</span>
    </button>

    <div class="nav-header">
      <span class="nav-prompt">></span>
      <span class="nav-title">KUMIKO</span>
    </div>
    <div class="nav-subtitle">~/navigation</div>

    <div class="nav-divider"></div>

    <div class="nav-list">
      <div v-for="item in navItems" :key="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
        @click="navigate(item.path)">
        <span class="nav-item-icon" v-html="item.icon"></span>
        <span class="nav-item-prompt">></span>
        <div class="nav-item-text">
          <span class="nav-item-path">~/{{ item.label }}/</span>
          <span class="nav-item-desc">{{ item.desc }}</span>
        </div>
      </div>
    </div>

    <div class="nav-footer">
      <div class="nav-divider"></div>
      <div class="nav-social">
        <a v-for="link in socialLinks" :key="link.label"
          :href="link.url" target="_blank" rel="noopener noreferrer"
          class="nav-social-link" @click.stop>
          <span class="nav-social-icon" v-html="link.icon"></span>
          <span class="nav-social-label">{{ link.label }}</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.side-nav {
  position: fixed; top: 0; left: 0;
  width: 200px; height: 100vh;
  background: #16171d;
  border-right: 1px solid #2a2a2a;
  display: flex; flex-direction: column;
  z-index: 1000;
  font-family: MapleMono, ui-monospace, Consolas, monospace;
  user-select: none; overflow: hidden;
  transition: width 0.3s ease;
}

.side-nav.collapsed { width: 56px; }

.side-nav.collapsed .nav-header,
.side-nav.collapsed .nav-subtitle,
.side-nav.collapsed .nav-divider:first-of-type {
  opacity: 0; pointer-events: none;
}

.side-nav.collapsed .nav-item { justify-content: center; padding: 10px 0; }
.side-nav.collapsed .nav-item-prompt { display: none; }
.side-nav.collapsed .nav-item-text { display: none; }
.side-nav.collapsed .nav-social-label { display: none; }
.side-nav.collapsed .nav-footer { padding: 12px 0; }
.side-nav.collapsed .nav-social { align-items: center; }
.side-nav.collapsed .nav-social-link { justify-content: center; }

.nav-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999; }

.hamburger { display: none; position: fixed; top: 14px; left: 14px; z-index: 1001;
  width: 32px; height: 28px; background: transparent; border: 1px solid #444;
  border-radius: 4px; cursor: pointer; flex-direction: column; align-items: center;
  justify-content: center; gap: 4px; padding: 4px; transition: border-color .2s; }
.hamburger:hover { border-color: #60cee2; }
.hamburger span { display: block; width: 18px; height: 2px; background: #888; border-radius: 1px; transition: all .3s; }
.hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(4px,4px); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(4px,-4px); }

.collapse-btn { position: absolute; top: 10px; right: 8px; width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  background: transparent; border: 1px solid transparent; border-radius: 4px;
  color: #555; cursor: pointer; font-size: .7em; transition: all .2s; z-index: 5; }
.collapse-btn:hover { color: #60cee2; border-color: #333; background: rgba(255,255,255,.03); }

.nav-header { display: flex; align-items: center; gap: 6px; padding: 24px 20px 4px; transition: opacity .2s; }
.nav-prompt { color: #5fb857; font-weight: bold; font-size: 1.1em; }
.nav-title { color: #60cee2; font-weight: bold; font-size: 1.1em; letter-spacing: .5px; }
.nav-subtitle { color: #555; font-size: .75em; padding: 2px 20px 16px; transition: opacity .2s; }

.nav-divider { height: 1px; background: #2a2a2a; margin: 0 16px; transition: opacity .2s; }

.nav-list { flex: 1; padding: 12px 0; display: flex; flex-direction: column; gap: 2px; }

.nav-item { display: flex; align-items: center; gap: 8px;
  padding: 8px 20px; cursor: pointer; transition: all .2s;
  border-left: 3px solid transparent; position: relative; }
.nav-item:hover { background: rgba(255,255,255,.03); }
.nav-item:hover .nav-item-path { color: #d4d4d4; transform: translateX(4px); }
.nav-item.active { background: rgba(96,206,226,.06); border-left-color: #60cee2; }
.nav-item.active .nav-item-path { color: #60cee2; transform: translateX(4px); }

.nav-item-prompt { color: #5fb857; font-weight: bold; font-size: .95em;
  flex-shrink: 0; opacity: 0; transition: opacity .2s; }
.nav-item.active .nav-item-prompt,
.nav-item:hover .nav-item-prompt { opacity: 1; }

.nav-item-icon { width: 20px; height: 20px; display: flex;
  align-items: center; justify-content: center; flex-shrink: 0; }
.nav-item-icon :deep(svg) { fill: #888; width: 18px; height: 18px; transition: fill .2s; }
.nav-item.active .nav-item-icon :deep(svg) { fill: #60cee2; }
.nav-item:hover .nav-item-icon :deep(svg) { fill: #d4d4d4; }
.side-nav:not(.collapsed) .nav-item-icon { display: none; }

.nav-item-text { display: flex; flex-direction: column; gap: 1px; }
.nav-item-path { color: #888; font-size: .9em; transition: all .2s; white-space: nowrap; }
.nav-item-desc { color: #555; font-size: .7em; white-space: nowrap; }

.nav-footer { padding: 16px 20px; transition: padding .3s; }
.nav-social { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; transition: align-items .3s; }
.nav-social-link { display: flex; align-items: center; gap: 8px;
  color: #666; text-decoration: none; font-size: .8em; transition: color .2s; padding: 2px 0; }
.nav-social-link:hover { color: #60cee2; }
.nav-social-icon { width: 18px; height: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.nav-social-icon :deep(svg) { fill: currentColor; width: 14px; height: 14px; }
.nav-social-label { font-family: MapleMono, ui-monospace, monospace; }

@media (max-width: 768px) {
  .side-nav { transform: translateX(-100%); transition: transform .3s; width: 200px; }
  .side-nav.mobile-open { transform: translateX(0); }
  .side-nav.collapsed { width: 200px; }
  .side-nav.collapsed .nav-item { justify-content: flex-start; padding: 8px 20px; }
  .side-nav.collapsed .nav-item-prompt { display: inline; }
  .side-nav.collapsed .nav-item-text { display: flex; }
  .side-nav.collapsed .nav-social-label { display: inline; }
  .side-nav.collapsed .nav-footer { padding: 16px 20px; }
  .side-nav.collapsed .nav-social { align-items: flex-start; }
  .side-nav.collapsed .nav-social-link { justify-content: flex-start; }
  .side-nav.collapsed .nav-header,
  .side-nav.collapsed .nav-subtitle,
  .side-nav.collapsed .nav-divider { opacity: 1; pointer-events: auto; }
  .side-nav:not(.collapsed) .nav-item-icon { display: flex; }
  .nav-overlay { display: block; }
  .hamburger { display: flex; }
  .collapse-btn { display: none; }
}
</style>