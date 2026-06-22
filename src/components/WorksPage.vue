<!-- 作品集页面 - 独立展示所有项目 -->
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const router = useRouter()

function goHome() {
  router.push('/')
}

function openLink(url) {
  if (url) {
    window.open(url, '_blank', 'noopener noreferrer')
  }
}

const projects = [
  {
    tags: ['Unity', 'C#', 'JavaScript'],
    tagClasses: ['tag-unity', 'tag-csharp', 'tag-js'],
    title: 'Simple',
    desc: '无轨下落式节奏类音乐游戏。负责游戏设计与游戏开发，从零构建完整的音游体验。',
    metas: [
      { label: 'Type', value: '节奏游戏 / 移动端' },
      { label: 'Role', value: '独立开发者' },
    ],
    url: 'https://www.taptap.cn/app/267034?os=android'
  },
  {
    tags: ['Vue 3', 'HTML/CSS', 'SQL'],
    tagClasses: ['tag-vue', 'tag-html', 'tag-supabase'],
    title: '多个已上线 Vue 实例',
    desc: '使用 Vue 框架开发的多种类型的网站，涵盖交互设计、视觉传达与后端开发。',
    metas: [
      { label: 'Stack', value: 'Vue 3 · Vue Router · Pinia · SQLite' },
      { label: 'Scope', value: '前端架构 · UI/UX · 数据库设计' },
    ],
    url: 'https://github.com/OmaeKumiko529'
  },
  {
    tags: ['Mentor PADS', 'Protel/AD', 'Hardware'],
    tagClasses: ['tag-pcb', 'tag-pcb', 'tag-hardware'],
    title: 'PCB 领域声学设计',
    desc: '参与嘉立创科创计划，设计多种低成本电吉他效果器单块，探索数字与模拟音频电路。',
    metas: [
      { label: 'Tools', value: 'Mentor PADS · Protel 99 SE · Altium Designer' },
      { label: 'Field', value: '音频电路 · PCB Layout · 硬件原型' },
    ],
    url: null
  },
  {
    tags: ['Vue 3', 'GSAP', 'CSS Art'],
    tagClasses: ['tag-vue', 'tag-gsap', 'tag-css'],
    title: 'Personal Website',
    desc: '个人博客/作品集网站，终端命令行风格UI，全站Vue 3 SPA。',
    metas: [
      { label: 'Stack', value: 'Vue 3 · Vite · GSAP · Vue Router' },
      { label: 'Features', value: '展示 · 叙事 · 进取' },
    ],
    url: null
  },
]

onMounted(() => {
  gsap.fromTo('.works-card',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.3 }
  )
})
</script>

<template>
  <div class="works-page">
    <header class="works-header">
      <button class="back-btn" @click="goHome">← 返回首页</button>
      <h1 class="works-title">
        <span class="keyword">ls</span>
        <span class="plain"> ~/projects/</span>
      </h1>
      <div class="header-spacer"></div>
    </header>

    <div class="works-container">
      <div v-for="project in projects" :key="project.title"
        class="works-card"
        :class="{ clickable: !!project.url }"
        @click="openLink(project.url)">
        <div class="card-top">
          <div class="card-tags">
            <span v-for="(tag, idx) in project.tags" :key="tag"
              class="tag"
              :class="project.tagClasses[idx]">{{ tag }}</span>
          </div>
        </div>
        <h2 class="card-title"><span style="color: white;">{{ project.title }}</span></h2>
        <div class="card-body">
          <p class="card-desc">{{ project.desc }}</p>
          <div v-for="meta in project.metas" :key="meta.label" class="card-meta">
            <span class="meta-label">{{ meta.label }}</span>
            <span class="meta-value">{{ meta.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="works-footer">
      <span class="footer-prompt">$ </span>
      <span class="footer-text">echo "more projects coming soon..."</span>
      <span class="footer-cursor">▍</span>
    </div>
  </div>
</template>

<style>
.works-page {
  min-height: 100vh;
  background-color: #121314;
  color: #d4d4d4;
  font-family: MapleMono, ui-monospace, Consolas, monospace;
  padding-bottom: 60px;
}

.works-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #1a1a1e;
  border-bottom: 1px solid #333;
  position: sticky;
  top: 0;
  z-index: 10;
}

.works-title {
  font-size: 1.3vw;
  margin: 0;
  font-weight: normal;
}

.works-title .keyword { color: #569cd6; }
.works-title .plain { color: #d4d4d4; }

.back-btn {
  background: transparent;
  border: 1px solid #444;
  color: #888;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-family: MapleMono, ui-monospace, monospace;
  font-size: 0.85vw;
  transition: all 0.2s ease;
}

.back-btn:hover {
  border-color: #60cee2;
  color: #60cee2;
}

.header-spacer { width: 80px; }

.works-container {
  max-width: 820px;
  margin: 40px auto 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 20px;
}

.works-card {
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 24px 28px;
  transition: all 0.3s ease;
}

.works-card.clickable {
  cursor: pointer;
}

.works-card:hover {
  border-color: rgba(96, 206, 226, 0.3);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.card-tags { display: flex; gap: 6px; flex-wrap: wrap; }

.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 0.7em;
  letter-spacing: 0.3px;
}

.tag-unity    { background: rgba(255, 255, 255, 0.08); color: #ccc; }
.tag-csharp   { background: rgba(130, 50, 200, 0.2);  color: #b87cff; }
.tag-js       { background: rgba(240, 219, 79, 0.15);  color: #f0db4f; }
.tag-vue      { background: rgba(66, 184, 131, 0.15);  color: #42b883; }
.tag-html     { background: rgba(227, 76, 38, 0.15);   color: #e74c3c; }
.tag-supabase { background: rgba(63, 185, 80, 0.15);   color: #3fb950; }
.tag-gsap     { background: rgba(117, 183, 32, 0.15);   color: #75b720; }
.tag-css      { background: rgba(21, 114, 182, 0.15);   color: #1572b6; }
.tag-pcb      { background: rgba(0, 168, 225, 0.15);    color: #00a8e1; }
.tag-hardware { background: rgba(255, 165, 0, 0.15);    color: #ffa500; }

.card-title {
  font-size: 1.1em;
  font-weight: bold;
  color: #888;
  margin: 0 0 14px;
  font-family: MapleMono, ui-monospace, monospace;
}

.card-body { padding-left: 0; }

.card-desc {
  font-size: 0.9em;
  line-height: 1.7;
  color: #9cdcfe;
  margin-bottom: 16px;
}

.card-meta {
  display: flex;
  gap: 12px;
  font-size: 0.8em;
  line-height: 1.8;
}

.meta-label { color: #569cd6; min-width: 60px; }
.meta-value { color: #888; }

.works-footer {
  max-width: 820px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #2a2a2a;
  font-family: MapleMono, ui-monospace, monospace;
}

.footer-prompt { color: #5fb857; font-weight: bold; }
.footer-text { color: #555; font-size: 0.85em; }

.footer-cursor {
  color: #5fb857;
  animation: blink-cursor 1s step-end infinite;
  margin-left: 2px;
}

@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}

@container app-content (max-width: 600px) {
  .works-title { font-size: 1em; }
  .back-btn { font-size: 0.8em; }
  .works-container { margin-top: 20px; padding: 0 12px; }
  .works-card { padding: 16px 18px; }
  .card-title { font-size: 1em; }
  .card-desc { font-size: 0.85em; }
  .header-spacer { display: none; }
}

@container app-content (max-width: 450px) {
  .works-card { padding: 12px 14px; }
  .card-meta { flex-direction: column; gap: 2px; }
}

@media (max-width: 768px) {
  .works-title { font-size: 1em; }
  .back-btn { font-size: 0.8em; }
  .works-container { margin-top: 20px; padding: 0 12px; }
  .works-card { padding: 16px 18px; }
  .header-spacer { display: none; }
}
</style>