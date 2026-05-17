<!-- 作品集页面 -->
<script setup>
</script>

<template>
  <div class="portfolio-page">
    <section class="project-section">
      <a
        class="project-item"
        href="https://www.taptap.cn/app/267034"
        target="_blank"
      >
        <span class="item-icon">🎵</span>
        <span class="item-title">Simple</span>
      </a>
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
  max-width: 600px;
  margin: 60px auto 0;
  padding: 0 24px;
}

.project-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  background: #1a1a1e;
  border: 1px solid #2a2a2e;
  border-radius: 10px;
  text-decoration: none;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.4s ease;
  isolation: isolate;
}

/* 背景图片：左半部分，75%遮罩 + 向右渐变消失 */
.project-item::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(
      to right,
      rgba(26, 26, 30, 0.75) 0%,
      rgba(26, 26, 30, 0.75) 40%,
      rgba(26, 26, 30, 1) 65%
    ),
    url('@/assets/logo/simpleBackground.webp') left center / auto 100% no-repeat;
}

/* 悬停自发光效果 */
.project-item:hover {
  border-color: #DCDCAA;
  box-shadow:
    0 0 20px rgba(220, 220, 170, 0.35),
    0 0 45px rgba(220, 220, 170, 0.15),
    0 0 80px rgba(220, 220, 170, 0.08);
}

.item-icon {
  position: relative;
  z-index: 1;
  font-size: 1.6rem;
  flex-shrink: 0;
  line-height: 1;
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

  .item-icon {
    font-size: 1.4rem;
  }

  .item-title {
    font-size: 1.05rem;
  }
}
</style>