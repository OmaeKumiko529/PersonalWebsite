<!-- 作品集页面 -->
<script setup>
import { ref } from 'vue'
import simpleLogo from '@/assets/logo/simple_logo.png'

const isExpanded = ref(false)

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="portfolio-page">
    <section class="project-section">
      <div
        class="project-item"
        :class="{ expanded: isExpanded }"
        @click="toggleExpand"
      >
        <div class="project-row">
          <span class="item-icon"><img :src="simpleLogo" alt="logo" width="100px"></span>
          <div class="item-right">
            <span class="item-title">Simple</span>
            <span class="expand-indicator" :class="{ rotated: isExpanded }">▼</span>
          </div>
        </div>
        <div class="project-details" :class="{ open: isExpanded }">
          <div class="details-content">
            <p class="project-description">A minimalist productivity app designed to help you focus on what matters most.</p>
            <a
              class="visit-link"
              href="https://www.taptap.cn/app/267034"
              target="_blank"
              @click.stop
            >
              Visit Project →
            </a>
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
  padding-bottom: 80px;
}

/* ===== Project Section ===== */
.project-section {
  max-width: 800px;
  margin: 60px auto 0;
  padding: 0 24px;
}

.project-item {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 22px 28px;
  background: #1a1a1e;
  border: 1px solid #2a2a2e;
  border-radius: 20px;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.4s ease;
  user-select: none;
}

/* 悬停自发光效果 */
.project-item:hover {
  border-color: #DCDCAA;
  box-shadow:
    0 0 20px rgba(220, 220, 170, 0.35),
    0 0 45px rgba(220, 220, 170, 0.15),
    0 0 80px rgba(220, 220, 170, 0.08);
}

/* ===== Project Row ===== */
.project-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

/* ===== Item Right Group ===== */
.item-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ===== Expand Indicator ===== */
.expand-indicator {
  position: relative;
  z-index: 1;
  font-size: 0.8rem;
  color: #DCDCAA;
  transition: transform 0.35s ease;
  flex-shrink: 0;
}

.expand-indicator.rotated {
  transform: rotate(180deg);
}

/* ===== Project Details (Expandable) ===== */
.project-details {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.45s ease, opacity 0.35s ease, margin-top 0.35s ease;
  margin-top: 0;
}

.project-details.open {
  max-height: 200px;
  opacity: 1;
  margin-top: 18px;
}

.details-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.project-description {
  margin: 0;
  font-size: 0.95rem;
  color: #a0a0a0;
  line-height: 1.6;
}

.visit-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  padding: 8px 18px;
  background: rgba(220, 220, 170, 0.1);
  border: 1px solid rgba(220, 220, 170, 0.3);
  border-radius: 8px;
  color: #DCDCAA;
  text-decoration: none;
  font-size: 0.9rem;
  font-family: MapleMono, ui-monospace, Consolas, monospace;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.visit-link:hover {
  background: rgba(220, 220, 170, 0.2);
  border-color: #DCDCAA;
}

.item-icon {
  position: relative;
  z-index: 1;
  font-size: 1.6rem;
  flex-shrink: 0;
  line-height: 1;
}

.item-icon img {
  filter: drop-shadow(0 0 6px rgba(220, 220, 170, 0.45))
          drop-shadow(0 0 14px rgba(220, 220, 170, 0.18));
  transition: filter 0.3s ease;
}

.item-title {
  position: relative;
  z-index: 1;
  font-size: 1.15rem;
  color: #DCDCAA;
  font-family: MapleMono, ui-monospace, Consolas, monospace;
  text-align: right;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .project-section {
    margin: 40px auto 0;
    padding: 0 16px;
  }

  .project-item {
    padding: 16px 20px;
  }

  .project-description {
    font-size: 0.85rem;
  }

  .item-icon {
    font-size: 1.4rem;
  }

  .item-title {
    font-size: 1.05rem;
  }
}
</style>