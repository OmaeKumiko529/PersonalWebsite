<!-- 应用根组件 -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import LoadingScreen from './components/LoadingScreen.vue'
import SideNav from './components/SideNav.vue'

const router = useRouter()
const isLoading = ref(true)

// 侧栏默认收起（isCollapsed 初始为 true）
const sidebarCollapsed = ref(true)

const mainMarginLeft = computed(() => {
  return sidebarCollapsed.value ? '56px' : '200px'
})

// ===== 窗口宽度 & 内容缩放 =====
const windowWidth = ref(window.innerWidth)

let resizeTimer = null
function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    windowWidth.value = window.innerWidth
  }, 100)
}

onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  clearTimeout(resizeTimer)
})

const contentScale = computed(() => {
  // 收起状态或移动端（侧栏覆盖）不缩放
  if (sidebarCollapsed.value) return 1
  if (windowWidth.value <= 768) return 1

  const expandedW = 200
  const collapsedW = 56
  const availableExpanded = windowWidth.value - expandedW
  const availableCollapsed = windowWidth.value - collapsedW

  if (availableCollapsed <= 0) return 1

  const scale = availableExpanded / availableCollapsed
  // 不低于 0.55，防止过度缩小
  return Math.max(0.55, Math.min(1, scale))
})

function onLoadingComplete() {
  isLoading.value = false
  // 加载完成后滚动到页面最上方
  window.scrollTo({ top: 0, behavior: 'instant' })
}

// 监听侧栏收起/展开事件
function onCollapseChange(collapsed) {
  sidebarCollapsed.value = collapsed
}
</script>

<template>
  <LoadingScreen v-if="isLoading" @loading-complete="onLoadingComplete" />
  <div class="app-shell" :class="{ 'app-visible': !isLoading }">
    <SideNav @collapse-change="onCollapseChange" />
    <main
      class="app-main"
      :style="{ marginLeft: mainMarginLeft }"
    >
      <div
        class="app-content-wrapper"
        :style="{
          zoom: contentScale < 1 ? contentScale : '1',
        }"
      >
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style>
.app-shell {
  display: flex;
  min-height: 100vh;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.app-shell.app-visible {
  opacity: 1;
}

.app-main {
  flex: 1;
  min-height: 100vh;
  background: #121314;
  transition: margin-left 0.3s ease;
  overflow: auto;
}

/* 内容缩放容器 */
.app-content-wrapper {
  transition: zoom 0.3s ease;
  container-type: inline-size;
  container-name: app-content;
}

/* 页面切换动画 — 柔和交叉淡入淡出 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* 移动端响应式：侧栏隐藏时主内容占满 */
@media (max-width: 768px) {
  .app-main {
    margin-left: 0 !important;
  }
}
</style>