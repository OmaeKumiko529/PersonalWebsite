<!-- 作品集页面 -->
<script setup>
import { ref } from 'vue'
import simpleLogo from '@/assets/logo/simple_logo.png'
import Badge from '@/components/Badge.vue'

const hoveredLink = ref(null)

function onLinkEnter(href) {
  hoveredLink.value = href
}

function onLinkLeave() {
  hoveredLink.value = null
}

const projects = ref([
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
    expanded: false
  },
])

function toggleProject(project) {
  project.expanded = !project.expanded
}
</script>

<template>
  <div class="portfolio-page">
    <section class="project-section">
      <div
        v-for="project in projects"
        :key="project.id"
        class="project-item"
        :class="{ expanded: project.expanded }"
        @click="toggleProject(project)"
      >
        <!-- 折叠行 -->
        <div class="project-row">
          <div class="item-left">
            <span class="item-icon">
              <img :src="project.logo" :alt="project.title" width="48px" height="48px">
            </span>
            <div class="item-meta">
              <span class="item-title">{{ project.title }}</span>
              <span class="item-tagline">{{ project.tagline }}</span>
            </div>
          </div>
          <div class="item-right">
            <span class="expand-indicator" :class="{ rotated: project.expanded }">▶</span>
          </div>
        </div>

        <!-- 展开详情 -->
        <div class="project-details" :class="{ open: project.expanded }">
          <div class="details-divider">
            <span class="divider-comment">/* ───────────────────────────────────── */</span>
          </div>
          <div class="details-content">
            <!-- 项目描述 -->
            <div class="detail-block">
              <p class="detail-label"><span class="string">"description"</span><span class="plain">:</span></p>
              <p class="detail-value project-desc">{{ project.description }}</p>
            </div>

            <!-- 技术栈 -->
            <div class="detail-block">
              <p class="detail-label"><span class="string">"techStack"</span><span class="plain">:</span></p>
              <div class="tech-tags">
                <span v-for="tech in project.tech" :key="tech" class="tech-tag">{{ tech }}</span>
              </div>
            </div>

            <!-- 角色 -->
            <div class="detail-block">
              <p class="detail-label"><span class="string">"role"</span><span class="plain">:</span></p>
              <p class="detail-value">{{ project.role }}</p>
            </div>

            <!-- 链接 -->
            <div class="detail-block">
              <p class="detail-label"><span class="string">"links"</span><span class="plain">:</span></p>
              <div class="detail-links">
                <span
                  v-for="link in project.links"
                  :key="link.href"
                  class="link-item"
                  :class="{ 'link-hovered': hoveredLink === link.href }"
                  @mouseenter="onLinkEnter(link.href)"
                  @mouseleave="onLinkLeave"
                >
                  <Badge
                    :text="link.text"
                    :href="link.href"
                    radius="none"
                    external
                    :style="{ backgroundColor: link.bg, color: 'white' }"
                    @click.stop
                  />
                  <span class="link-desc">{{ link.desc }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
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

/* ===== IDE 着色（与 HomePage 统一） ===== */
.keyword  { color: #569CD6; }
.variable { color: #9CDCFE; }
.number   { color: #B5CEA8; }
.plain    { color: #D4D4D4; }
.string   { color: #CE9178; }
.function { color: #DCDCAA; }

/* ===== Project Section ===== */
.project-section {
  max-width: 800px;
  margin: 18px auto 0;
  padding: 0 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project-item {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 24px;
  background: #1a1a1e;
  border: 1px solid #2a2a2e;
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.4s ease, background 0.35s ease;
  user-select: none;
}

.project-item:hover {
  border-color: #3a3a42;
}

.project-item.expanded {
  border-color: #DCDCAA;
  background: #1c1c22;
  box-shadow:
    0 0 20px rgba(220, 220, 170, 0.12),
    0 0 50px rgba(220, 220, 170, 0.05);
}

/* ===== Project Row（折叠态） ===== */
.project-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.item-icon {
  flex-shrink: 0;
  line-height: 1;
}

.item-icon img {
  filter: drop-shadow(0 0 6px rgba(220, 220, 170, 0.45))
          drop-shadow(0 0 14px rgba(220, 220, 170, 0.18));
  transition: filter 0.3s ease, transform 0.35s ease;
  border-radius: 10px;
}

.project-item.expanded .item-icon img {
  filter: drop-shadow(0 0 10px rgba(220, 220, 170, 0.65))
          drop-shadow(0 0 22px rgba(220, 220, 170, 0.28));
  transform: scale(1.06);
}

.item-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-title {
  font-size: 1.15rem;
  color: #DCDCAA;
  font-weight: 600;
  line-height: 1.2;
}

.item-tagline {
  font-size: 0.78rem;
  color: #6a6a72;
  line-height: 1;
}

.item-right {
  display: flex;
  align-items: center;
}

/* ===== Expand Indicator ===== */
.expand-indicator {
  font-size: 0.65rem;
  color: #5a5a62;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease;
  flex-shrink: 0;
  margin-left: 8px;
}

.project-item.expanded .expand-indicator {
  color: #DCDCAA;
}

.expand-indicator.rotated {
  transform: rotate(90deg);
}

/* ===== Project Details（展开区域） ===== */
.project-details {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.4s ease,
              margin-top 0.35s ease;
  margin-top: 0;
}

.project-details.open {
  max-height: 400px;
  opacity: 1;
  margin-top: 16px;
}

.details-divider {
  margin-bottom: 14px;
}

.divider-comment {
  font-size: 0.7rem;
  color: #3d3d45;
  letter-spacing: 1px;
}

.details-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 4px;
}

.detail-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-label {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1;
}

.detail-value {
  margin: 0;
  font-size: 0.9rem;
  color: #b0b0b8;
  line-height: 1.65;
}

.project-desc {
  max-width: 560px;
}

/* 技术标签 */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  display: inline-block;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-family: MapleMono, ui-monospace, Consolas, monospace;
  color: #9CDCFE;
  background: rgba(156, 220, 254, 0.08);
  border: 1px solid rgba(156, 220, 254, 0.2);
  border-radius: 4px;
  line-height: 1;
}

/* 链接区域 */
.detail-links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}

.link-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s ease;
}

.link-item.link-hovered {
  transform: translateY(-1px);
}

.link-desc {
  font-size: 0.75rem;
  color: #5a5a62;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.link-item.link-hovered .link-desc {
  color: #8a8a92;
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

  .project-item {
    padding: 14px 16px;
    border-radius: 12px;
  }

  .item-left {
    gap: 12px;
  }

  .item-icon img {
    width: 36px;
    height: 36px;
  }

  .item-title {
    font-size: 1rem;
  }

  .item-tagline {
    font-size: 0.7rem;
  }

  .detail-value {
    font-size: 0.82rem;
  }

  .tech-tag {
    font-size: 0.7rem;
    padding: 3px 10px;
  }

  .project-details.open {
    max-height: 500px;
  }
}
</style>