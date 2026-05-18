<!-- 作品集页面 -->
<script setup>
import simpleLogo from '@/assets/logo/simple_logo.png'
import ProjectCard from '@/components/ProjectCard.vue'

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
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.portfolio-page {
  width: 100%;
  min-height: 100vh;
  background-color: #121314;
  color: #d4d4d4;
  font-family: MapleMono, ui-monospace, Consolas, monospace;
  padding: 60px 24px 80px;
}

/* ===== Project Section ===== */
.project-section {
  max-width: 800px;
  margin: 18px auto 0;
  padding: 0 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .portfolio-page {
    padding: 40px 16px 60px;
  }

  .project-section {
    padding: 0 12px;
    gap: 16px;
  }
}
</style>