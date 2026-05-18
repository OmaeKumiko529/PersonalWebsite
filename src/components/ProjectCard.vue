<script setup>
import { ref } from 'vue'
import Badge from './Badge.vue'

defineProps({
  title: { type: String, required: true },
  logo: { type: String, required: true },
  tagline: { type: String, default: '' },
  description: { type: String, default: '' },
  tech: { type: Array, default: () => [] },
  role: { type: String, default: '' },
  links: { type: Array, default: () => [] },
})

const isExpanded = ref(false)
const hoveredLink = ref(null)

function toggle() {
  isExpanded.value = !isExpanded.value
}

function onLinkEnter(href) {
  hoveredLink.value = href
}

function onLinkLeave() {
  hoveredLink.value = null
}
</script>

<template>
  <div
    class="project-card"
    :class="{ expanded: isExpanded }"
    @click="toggle"
  >
    <!-- 折叠行 -->
    <div class="project-row">
      <div class="item-left">
        <span class="item-icon">
          <img :src="logo" :alt="title" width="48px" height="48px">
        </span>
        <div class="item-meta">
          <span class="item-title">{{ title }}</span>
          <span class="item-tagline">{{ tagline }}</span>
        </div>
      </div>
      <div class="item-right">
        <span class="expand-indicator" :class="{ rotated: isExpanded }">▶</span>
      </div>
    </div>

    <!-- 展开详情 -->
    <div class="project-details" :class="{ open: isExpanded }">
      <div class="details-divider">
        <span class="divider-comment">/* ───────────────────────────────────── */</span>
      </div>
      <div class="details-content">
        <!-- 项目描述 -->
        <div v-if="description" class="detail-block">
          <p class="detail-label"><span class="string">"description"</span><span class="plain">:</span></p>
          <p class="detail-value project-desc">{{ description }}</p>
        </div>

        <!-- 技术栈 -->
        <div v-if="tech.length" class="detail-block">
          <p class="detail-label"><span class="string">"techStack"</span><span class="plain">:</span></p>
          <div class="tech-tags">
            <span v-for="t in tech" :key="t" class="tech-tag">{{ t }}</span>
          </div>
        </div>

        <!-- 角色 -->
        <div v-if="role" class="detail-block">
          <p class="detail-label"><span class="string">"role"</span><span class="plain">:</span></p>
          <p class="detail-value">{{ role }}</p>
        </div>

        <!-- 链接 -->
        <div v-if="links.length" class="detail-block">
          <p class="detail-label"><span class="string">"links"</span><span class="plain">:</span></p>
          <div class="detail-links">
            <span
              v-for="link in links"
              :key="link.href"
              class="link-item"
              :class="{ 'link-hovered': hoveredLink === link.href }"
              @mouseenter="onLinkEnter(link.href)"
              @mouseleave="onLinkLeave"
              @click.stop
            >
              <Badge
                :text="link.text"
                :href="link.href"
                radius="none"
                external
                :style="{ backgroundColor: link.bg || '#60cee2', color: 'white' }"
              />
              <span class="link-desc">{{ link.desc }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== Card Container ===== */
.project-card {
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

.project-card:hover {
  border-color: #3a3a42;
}

.project-card.expanded {
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

.project-card.expanded .item-icon img {
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

.project-card.expanded .expand-indicator {
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

/* IDE 着色 */
.string { color: #CE9178; }
.plain { color: #D4D4D4; }

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
  .project-card {
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