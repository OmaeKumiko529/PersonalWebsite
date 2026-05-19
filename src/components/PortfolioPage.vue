<!-- 作品集页面 -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import simpleLogo from '@/assets/logo/simple_logo.png'
import ProjectCard from '@/components/ProjectCard.vue'

const router = useRouter()
const currentRoute = router.currentRoute

const navbarRef = ref(null)

function updateNavbarHeight() {
  if (navbarRef.value) {
    const height = navbarRef.value.offsetHeight
    document.documentElement.style.setProperty('--navbar-height', height + 'px')
  }
}

onMounted(() => {
  updateNavbarHeight()
  window.addEventListener('resize', updateNavbarHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateNavbarHeight)
})

const projects = [
  {
    id: 'simple',
    title: 'Simple',
    logo: simpleLogo,
    tagline: '无轨下落式节奏类音乐游戏',
    description: '一款融合视觉叙事与节奏玩法的独立音乐游戏。玩家在动态生成的轨道上跟随音乐节奏进行操作，体验独特的"无轨"下落式玩法。',
    tech: ['Unity', 'C#', 'JavaScript'],
    role: '游戏设计 · 游戏开发 · 视觉风格',
    links: [
      { text: 'TapTap', href: 'https://www.taptap.cn/app/267034', bg: '#00d9c5', desc: 'Android / iOS 应用商店页面' },
    ],
  },
]
</script>

<template>
  <div class="portfolio-wrapper">
    <nav ref="navbarRef" class="navbar">
      <div class="navbar-inner">
        <router-link to="/" class="nav-link">~ home</router-link>
        <router-link to="/portfolio" class="nav-link active">~ portfolio</router-link>
        <router-link to="/blog" class="nav-link">~ blog</router-link>
      </div>
      <div class="navbar-line"></div>
    </nav>
    <div class="portfolio-page">
      <section class="project-section">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :title="project.title"
          :logo="project.logo"
          :tagline="project.tagline"
          :description="project.description"
          :tech="project.tech"
          :role="project.role"
          :links="project.links"
        />
      </section>
    </div>
  </div>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.portfolio-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #121314;
  color: #d4d4d4;
  font-family: MapleMono, ui-monospace, Consolas, monospace;
}

/* ===== Navigation Bar ===== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(18, 19, 20, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0 24px;
}

.portfolio-page {
  padding: var(--navbar-height, 60px) 24px 80px;
}

.navbar-inner {
  max-width: 856px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 32px;
  height: 52px;
  padding: 0 28px;
}

.nav-link {
  color: #888;
  font-family: MapleMono, ui-monospace, Consolas, monospace;
  font-size: 0.95rem;
  text-decoration: none;
  transition: color 0.25s ease, text-shadow 0.25s ease;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.nav-link:hover {
  color: #d2f543;
  text-shadow: 0 0 8px rgba(210, 245, 67, 0.4);
}

.nav-link.active {
  color: #d2f543;
  text-shadow: 0 0 6px rgba(210, 245, 67, 0.35);
}

.navbar-line {
  height: 1px;
  width: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(210, 245, 67, 0.15) 15%,
    rgba(210, 245, 67, 0.25) 50%,
    rgba(210, 245, 67, 0.15) 85%,
    transparent 100%
  );
}

/* ===== Project Section ===== */
.project-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 28px 28px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .portfolio-page {
    padding: var(--navbar-height, 56px) 16px 60px;
  }

  .navbar {
    padding: 0 16px;
  }

  .navbar-inner {
    gap: 20px;
    height: 44px;
    padding: 0 12px;
  }

  .nav-link {
    font-size: 0.85rem;
  }

  .project-section {
    padding: 20px 12px 0;
    gap: 16px;
  }
}
</style>