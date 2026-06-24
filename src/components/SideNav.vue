<!-- 左侧命令行风格导航栏 — 纯 CSS 版 -->
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { SITE_CONFIG } from '../data/siteConfig.js'
import { IconHome, IconWorks, IconBlog, IconGitHub, IconEmail, IconTelegram, IconTwitter } from './icons/index.js'

const emit = defineEmits(['collapse-change'])
const router = useRouter()
const route = useRoute()
const isMobileOpen = ref(false)
const isCollapsed = ref(true)

const iconMap = {
  home: IconHome,
  works: IconWorks,
  blog: IconBlog,
  github: IconGitHub,
  email: IconEmail,
  telegram: IconTelegram,
  twitter: IconTwitter,
}

function getIconComponent(name) {
  return iconMap[name] || null
}

function isActive(path) {
  // 修复：支持嵌套路由匹配
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
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

  <button
    class="hamburger"
    :class="{ active: isMobileOpen }"
    @click="isMobileOpen = !isMobileOpen"
    aria-label="打开或关闭导航菜单"
    :aria-expanded="isMobileOpen"
  >
    <span></span><span></span><span></span>
  </button>

  <nav class="side-nav" :class="{ collapsed: isCollapsed, 'mobile-open': isMobileOpen }" role="navigation" aria-label="主导航">
    <button class="collapse-btn" @click="toggleCollapse" :title="isCollapsed ? '展开' : '收起'" aria-label="收起或展开侧边栏">
      <span>◀</span>
    </button>

    <div class="nav-header">
      <span class="nav-prompt">></span>
      <span class="nav-title">KUMIKO</span>
    </div>
    <div class="nav-subtitle">~/navigation</div>

    <div class="nav-divider"></div>

    <div class="nav-list">
      <div
        v-for="item in SITE_CONFIG.navItems"
        :key="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
        @click="navigate(item.path)"
        role="link"
        :aria-current="isActive(item.path) ? 'page' : undefined"
      >
        <span class="nav-item-icon">
          <component :is="getIconComponent(item.icon)" />
        </span>
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
        <a
          v-for="link in SITE_CONFIG.socialLinks"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-social-link"
          @click.stop
          :aria-label="link.label"
        >
          <span class="nav-social-icon">
            <component :is="getIconComponent(link.icon)" />
          </span>
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
