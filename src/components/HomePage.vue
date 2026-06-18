<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue"
import { useRouter } from "vue-router"
import gsap from "gsap"
import Badge from "./Badge.vue"
import ParticleNetwork from "./ParticleNetwork.vue"
import { texts } from "../data/terminalData.js"
import { useTypewriter } from "../composables/useTypewriter.js"
import { useTerminal, getMouseOffset } from "../composables/useTerminal.js"
import { usePageScroll } from "../composables/usePageScroll.js"

// ==================== 路由 ====================
const router = useRouter()

function goToPortfolio() {
  router.push('/portfolio')
}

// ==================== 打字机 ====================
const { displayTokens, typeText, deleteText, wait } = useTypewriter()

// ==================== 终端 ====================
const {
  isTerminalActive, lines, currentInput, terminalBodyRef,
  passwordMode,
  focusTerminal, blurTerminal, handleKey, handleTerminalWheel,
  showStartupBanner
} = useTerminal({ onNavigate: (path) => router.push(path) })

// ==================== 页面滚动 ====================
const { currentSection, sections, onWheel, initSections, switchTo } = usePageScroll()

// ==================== 竖向进度指示器元信息 ====================
const sectionsMeta = [
  { label: 'HOME' },
  { label: 'ABOUT' },
  { label: 'CONTACT' },
]

// 指示器 DOM 引用
const indicatorTrackRef = ref(null)
const indicatorFillRef = ref(null)
const indicatorDotRefs = ref([])
const indicatorLabelRefs = ref([])

// 计算每个 section 的状态
const sectionStatus = computed(() => {
  return sectionsMeta.map((_, idx) => {
    if (idx < currentSection.value) return 'past'
    if (idx === currentSection.value) return 'active'
    return 'future'
  })
})

// 计算填充百分比
const fillPercent = computed(() => {
  if (sectionsMeta.length <= 1) return 0
  return (currentSection.value / (sectionsMeta.length - 1)) * 100
})

// ==================== 指示器 GSAP 动画 ====================
let indicatorAnimating = false

// 监听 currentSection 变化以驱动指示器动画
watch(currentSection, (newVal, oldVal) => {
  if (indicatorAnimating) return
  indicatorAnimating = true

  // 动画填充条的 GSAP 过渡
  gsap.to(indicatorFillRef.value, {
    height: `${fillPercent.value}%`,
    duration: 0.55,
    ease: "power3.inOut",
    onComplete: () => { indicatorAnimating = false }
  })

  // 新激活的标签弹性入场
  if (indicatorLabelRefs.value[newVal]) {
    gsap.fromTo(indicatorLabelRefs.value[newVal],
      { opacity: 0, x: 12, scale: 0.9 },
      {
        opacity: 1, x: 0, scale: 1,
        duration: 0.45,
        ease: "elastic.out(1, 0.5)",
        clearProps: "x,scale"
      }
    )
  }

  // 旧标签淡出
  if (oldVal !== undefined && indicatorLabelRefs.value[oldVal]) {
    gsap.to(indicatorLabelRefs.value[oldVal], {
      opacity: 0,
      x: -6,
      duration: 0.2,
      ease: "power2.in"
    })
  }

  // 当前圆点脉冲动画
  if (indicatorDotRefs.value[newVal]) {
    gsap.fromTo(indicatorDotRefs.value[newVal],
      { scale: 0.8 },
      {
        scale: 1,
        duration: 0.5,
        ease: "back.out(2)",
        clearProps: "scale"
      }
    )
  }
})

// ==================== 光标 & 终端拖拽 ====================
const cursorElement = ref(null)
const terminalRef = ref(null)
const portfolioLinkRef = ref(null)
const isDragging = ref(false)
let startX = 0, startY = 0, baseX = 0, baseY = 0

function onMouseDown(e) {
  isDragging.value = true
  startX = e.clientX - baseX
  startY = e.clientY - baseY
  terminalBodyRef.value?.focus()

  document.addEventListener("mousemove", onMouseMove)
  document.addEventListener("mouseup", onMouseUp)
}

function onMouseMove(e) {
  if (!isDragging.value) return
  baseX = e.clientX - startX
  baseY = e.clientY - startY
}

function onMouseUp() {
  isDragging.value = false
  document.removeEventListener("mousemove", onMouseMove)
  document.removeEventListener("mouseup", onMouseUp)
}

/** 当前显示第几句（0‑based） */
let currentIndex = 0

/** 动画循环是否继续 */
let isLoopActive = true

/** 视差事件处理函数（模块级作用域，便于卸载） */
let handleParallaxMouseMove = null
let handleParallaxMouseLeave = null

// ==================== 生命周期 ====================
onMounted(async () => {
  initSections()

  // 光标闪烁动画
  if (cursorElement.value) {
    gsap.to(cursorElement.value, {
      duration: 0.5,
      opacity: 0,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })
  }

  // ========== 作品集链接：闲置脉冲 + 悬停震颤 ==========
  let portfolioHoverTl = null

  function startPortfolioIdlePulse() {
    if (!portfolioLinkRef.value) return
    gsap.to(portfolioLinkRef.value, {
      duration: 0.6,
      scale: 1.03,
      x: 1.5,
      textShadow: "0 0 12px rgba(210,245,67,0.7), 0 0 30px rgba(210,245,67,0.35)",
      repeat: -1,
      repeatDelay: 3.4,
      yoyo: true,
      ease: "elastic.out(1, 0.3)",
      overwrite: true
    })
  }

  startPortfolioIdlePulse()

  if (portfolioLinkRef.value) {
    portfolioLinkRef.value.addEventListener("mouseenter", () => {
      gsap.killTweensOf(portfolioLinkRef.value)

      portfolioHoverTl = gsap.timeline()

      portfolioHoverTl.to(portfolioLinkRef.value, {
        duration: 0.15,
        scale: 1.06,
        textShadow: "0 0 16px rgba(210,245,67,0.9), 0 0 40px rgba(210,245,67,0.6)",
        borderColor: "rgba(210,245,67,0.8)",
        backgroundColor: "rgba(210,245,67,0.18)",
        ease: "power2.out"
      })

      portfolioHoverTl.to(portfolioLinkRef.value, {
        duration: 0.08,
        x: "+=2",
        y: "+=1.5",
        repeat: -1,
        yoyo: true,
        ease: "steps(4)"
      }, "-=0.04")
    })

    portfolioLinkRef.value.addEventListener("mouseleave", () => {
      if (portfolioHoverTl) {
        portfolioHoverTl.kill()
        portfolioHoverTl = null
      }

      gsap.to(portfolioLinkRef.value, {
        duration: 0.25,
        scale: 1,
        x: 0,
        y: 0,
        textShadow: "0 0 8px rgba(210,245,67,0.5), 0 0 20px rgba(210,245,67,0.2)",
        borderColor: "rgba(210,245,67,0.35)",
        backgroundColor: "rgba(210,245,67,0.08)",
        ease: "power2.out",
        overwrite: true,
        onComplete: startPortfolioIdlePulse
      })
    })
  }

  // 终端窗口初始居中
  if (terminalRef.value) {
    const el = terminalRef.value
    baseX = window.innerWidth / 2 - el.offsetWidth / 2
    baseY = window.innerHeight / 2 - el.offsetHeight / 2
    gsap.set(el, { x: baseX, y: baseY })
  }

  // 自动聚焦终端输入
  terminalBodyRef.value?.focus()

  // 显示启动横幅
  await showStartupBanner()

  // ========== 鼠标视差处理函数（保存引用以便卸载时移除） ==========
  handleParallaxMouseMove = (e) => {
    if (currentSection.value !== 2) return
    const { x, y } = getMouseOffset(e)

    gsap.to(".contactPage", {
      x: x * 10, y: y * 10,
      duration: 0.8, ease: "power2.out"
    })

    gsap.to(terminalRef.value, {
      x: baseX + x * 20, y: baseY + y * 20,
      rotationY: x * 5, rotationX: -y * 5,
      transformPerspective: 1000,
      transformOrigin: "center",
      duration: 0.5, ease: "power2.out"
    })
  }

  handleParallaxMouseLeave = () => {
    gsap.to(terminalRef.value, {
      x: baseX, y: baseY,
      rotationX: 0, rotationY: 0,
      duration: 0.8, ease: "power2.out"
    })
    gsap.to(".contactPage", {
      x: 0, y: 0,
      duration: 0.8, ease: "power2.out"
    })
  }

  document.addEventListener("mousemove", handleParallaxMouseMove)
  document.addEventListener("mouseleave", handleParallaxMouseLeave)

  // ========== 无限打字动画循环 ==========
  while (isLoopActive) {
    const text = texts[currentIndex]
    await typeText(text)
    await wait(3)
    await deleteText(text)
    await wait(0.2)
    currentIndex = (currentIndex + 1) % texts.length
  }
})

onUnmounted(() => {
  // 停止动画循环
  isLoopActive = false

  // 移除视差事件监听
  if (handleParallaxMouseMove) {
    document.removeEventListener("mousemove", handleParallaxMouseMove)
  }
  if (handleParallaxMouseLeave) {
    document.removeEventListener("mouseleave", handleParallaxMouseLeave)
  }

  // 清理作品集链接动画
  gsap.killTweensOf(portfolioLinkRef.value)
})
</script>

<!-- 主页 -->

<template>
  <div class="viewport" @wheel="(e) => onWheel(e, isTerminalActive)">
    <!-- 竖向进度指示器（终端风格） -->
    <div ref="indicatorTrackRef" class="section-indicator">
      <!-- 垂直轨道背景 -->
      <div class="indicator-track">
        <div ref="indicatorFillRef" class="indicator-track-fill"></div>
      </div>

      <div
        v-for="(sec, idx) in sectionsMeta"
        :key="idx"
        class="indicator-item"
        :class="`indicator-item--${sectionStatus[idx]}`"
        @click="switchTo(idx)"
      >
        <!-- 圆点 -->
        <span
          :ref="el => { if (el) indicatorDotRefs[idx] = el }"
          class="indicator-dot"
          :class="`indicator-dot--${sectionStatus[idx]}`"
        ></span>

        <!-- 标签与光标 -->
        <div
          :ref="el => { if (el) indicatorLabelRefs[idx] = el }"
          class="indicator-label"
          :class="`indicator-label--${sectionStatus[idx]}`"
        >
          <span class="indicator-prompt">{{ sectionStatus[idx] === 'active' ? '$' : sectionStatus[idx] === 'past' ? '>' : ' ' }}</span>
          <span class="indicator-text">{{ sec.label }}</span>
          <span v-if="sectionStatus[idx] === 'active'" class="indicator-cursor"></span>
        </div>
      </div>
    </div>

    <!-- 第一屏：起始页 -->
    <section ref="section0" class="startPage">
      <div class="titleBlock">
        <div class="mainTitle">
          <span class="displayText">
            <span v-for="(token, i) in displayTokens" :key="i" :class="token.type">
              {{ token.text }}
            </span>
          </span>
          <span ref="cursorElement" class="cursor"></span>
        </div>
        <p class="subTitle">// 念起成形 Turning ideas into reality.</p>
      </div>

      <!-- 向下滚动提示 -->
      <div class="scroll-hint">
        <span class="scroll-hint__text">// scroll</span>
        <span class="scroll-hint__arrow">▼</span>
      </div>
    </section>

    <!-- 第二屏：关于 / 项目 -->
    <section ref="section1" class="introPage">
      <div class="secondMainTitle">
        <<span style="color:#60CEE2">OmaeKumiko529</span> <span style="color:#BA77FE">/</span>>
        <p style="margin-top: 0.5%;">
          <span class="string" style="font-family: Maplemono; font-size: 1vw;">/* 我是谁 */</span>
        </p>
      </div>

      <div class="introduction">
        <div class="item">
          <p class="introTitle"><!--<span style="color: white;">前端开发</span>--></p>
          <p style="color:#60CEE2; margin-top: 8%;">拥有开发前端技术的经验,熟练掌握HTML, CSS, JS和Vue框架开发</p>
        </div>
        <div class="item">
          <p class="introTitle"><span class="string">#</span><span style="color: white;">交互设计</span></p>
          <p style="color:#60CEE2; margin-top: 8%;">能熟练使用Figma等UI/UX工具,有参与过交互设计与团队协作的经验</p>
        </div>
        <div class="item">
          <p class="introTitle">//<span style="color: white;">软件开发</span></p>
          <p style="color:#60CEE2; margin-top: 8%;">了解C, Java, 掌握C#, C等面向对象语言。有使用Unity开发的经验。</p>
        </div>
      </div>

      <p class="secondMainTitle">$ <span style="color: #d2f543;">project</span> <span style="color: white;">--list</span> <span ref="portfolioLinkRef" class="portfolio-link" @click.stop="goToPortfolio">#查看作品集</span></p>

      <div class="introduction">
        <div class="item2">
          <p class="introTitle">├──
            <span style="color: white;">
              Simple
              <Badge text="TapTap" href="https://www.taptap.cn/app/267034?os=android"
                radius="none" style="vertical-align: middle; color: white; background-color: #00d9c5;" />
            </span>
          </p>
          <div style="margin-top: 5%;">
            <p>无轨下落式节奏类音乐游戏</p>
            <p>Unity, C#, JavaScript</p>
            <p>负责游戏设计与游戏开发</p>
          </div>
        </div>
        <div class="item2">
          <p class="introTitle">├──
            <span style="color: white;">
              多个已上线Vue实例
              <Badge text="GitHub" href="https://github.com/FishMoies"
                radius="none" style="vertical-align: middle; color: white; background-color: #632c91;" />
            </span>
          </p>
          <div style="margin-top: 5%;">
            <p>使用Vue框架开发的多种类型的网站</p>
            <p>HTML, CSS, JS, Supabase</p>
            <p>交互设计、视觉传达与后端开发</p>
          </div>
        </div>
        <div class="item2">
          <p class="introTitle">└──
            <span style="color: white;">PCB领域声学设计</span>
          </p>
          <div style="margin-top: 5%;">
            <p>参与嘉立创科创计划</p>
            <p>Mentor PADS, Protel/AD</p>
            <p>设计多种低成本电吉他效果器单块</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 第三屏：联系方式 -->
    <section ref="section2" class="contactPage">
      <ParticleNetwork />
      <div class="scanline-overlay"></div>

      <div ref="terminalRef" class="contactContainer" @mousedown="focusTerminal">
        <div class="terminalBar" @mousedown.stop="onMouseDown">
          <span class="terminalDot redDot"></span>
          <span class="terminalDot yellowDot"></span>
          <span class="terminalDot greenDot"></span>
          <span class="terminalTitle">kumiko@contact:~$</span>
        </div>

        <div
          ref="terminalBodyRef"
          class="terminalBody"
          tabindex="0"
          @keydown="handleKey"
          @wheel="handleTerminalWheel"
          @focus="focusTerminal"
          @blur="blurTerminal"
        >
          <div v-for="(line, i) in lines" :key="i" class="terminalLine">
            <span v-if="line.type === 'input'" class="historicalInput">
              <span class="prompt">[KUMIKO CMD]</span>
              <span>{{ line.text }}</span>
            </span>
            <span v-else class="outputLine" v-html="line.text"></span>
          </div>

          <div class="terminalLine currentLine">
            <span class="prompt">[KUMIKO CMD]</span>
            <span class="inputText">{{ currentInput }}</span>
            <span class="cursorBlock"></span>
          </div>
        </div>
      </div>
    </section>

    <!-- 底栏：备案信息 -->
    <div class="footer">
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
        湘ICP备2026014314号-1
      </a>
      <span class="footer-separator">|</span>
      <a href="mailto:xisiyao0529@gmail.com">xisiyao0529@gmail.com</a>
    </div>
  </div>
</template>

<style>
.viewport {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.introTitle {
  font-size: 1vw;
}

.introduction {
  display: flex;
  justify-content: space-between;
  gap: -0.5px;
  width: 100%;
  margin-top: 2%;
  max-width: 1200px;
  margin: 2% auto;
  padding: 0 20px;
  font-family: MapleMono;
}

.item {
  flex: 1;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
}

.item2 {
  flex: 1;
  padding: 20px;
  text-align: left;
  border: 1px solid #ccc;
}

section {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100vh;
}

.startPage {
  background-color: #121314;
}

.introPage {
  background-color: #121314;
}

.titleBlock {
  position: absolute;
  top: 35%;
  left: 8%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mainTitle {
  font-size: 4vw;
  color: white;
  margin: 0;
  line-height: 1.5;
}

.secondMainTitle {
  font-size: 1.5vw;
  font-family: MapleMono Bold;
  color: rgb(255, 255, 255);
  margin: 5% auto 0;
  line-height: 1.5;
  text-align: center;
}

.subTitle {
  font-size: 2vw;
  font-family: MapleMono;
  margin: 0;
  opacity: 0.8;
  text-indent: 5px;
}

.displayText {
  font-family: MapleMono;
}

/* IDE 着色 */
.keyword  { color: #569CD6; }
.variable { color: #9CDCFE; }
.number   { color: #B5CEA8; }
.plain    { color: #D4D4D4; }
.string   { color: #CE9178; }
.function { color: #DCDCAA; }

/* 块状光标 — 标题打字区 */
.cursor {
  display: inline-block;
  width: 0.6em;
  height: 1.3em;
  background-color: #d4d4d4;
  vertical-align: text-bottom;
  margin-left: 3px;
}

.infinity {
  color: #ffffff;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(120, 200, 255, 0.6), 0 0 25px rgba(120, 200, 255, 0.4);
  transform: scale(1.2);
  position: relative;
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%   { transform: translateY(0px) scale(1); }
  50%  { transform: translateY(-6px) scale(1.05); }
  100% { transform: translateY(0px) scale(1); }
}

.infinity::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(120,200,255,0.4), transparent 70%);
  transform: translate(-50%, -50%);
  z-index: -1;
}

/* 第三屏 */
.contactPage {
  background-color: #121314;
  position: relative;
}

.contactContainer {
  position: absolute;
  top: 0; left: 0;
  transform: none;
  width: min(60vw, 800px);
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  z-index: 1;
}

.contactContainer:focus-within {
  border-color: rgba(95, 184, 87, 0.4);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
              0 0 30px rgba(95, 184, 87, 0.08),
              0 0 60px rgba(95, 184, 87, 0.04);
}

.terminalBar {
  background: #1e1e1e;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #333;
  cursor: move;
  user-select: none;
}

.terminalDot {
  width: 12px; height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.redDot    { background: #ff5f57; }
.yellowDot { background: #ffbd2e; }
.greenDot  { background: #28c840; }

.terminalTitle {
  color: #888;
  font-family: MapleMono;
  font-size: 0.9vw;
  margin-left: 8px;
}

.terminalLine {
  margin: 0;
  white-space: nowrap;
}

.prompt {
  color: #5fb857;
  margin-right: 10px;
  font-weight: bold;
}

.punctuation { color: #d4d4d4; }

/* 块状光标 — 终端输入区 */
.cursorBlock {
  display: inline-block;
  width: 0.55em;
  height: 1.1em;
  background-color: #5fb857;
  vertical-align: text-bottom;
  margin-left: 2px;
  animation: blinkCursor 1s step-end infinite;
}

@keyframes blinkCursor {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}

.method { color: #dcdcaa; }

.terminalBody {
  background: #1a1a1e;
  padding: 24px 28px;
  font-family: MapleMono;
  font-size: 1.1vw;
  line-height: 2;
  max-height: 55vh;
  overflow-y: auto;
  outline: none;
  scroll-behavior: smooth;
}

.terminalBody:focus {
  box-shadow: inset 0 0 0 1px rgba(95, 184, 87, 0.2);
}

.terminalBody::-webkit-scrollbar       { width: 6px; }
.terminalBody::-webkit-scrollbar-track { background: transparent; }
.terminalBody::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }

.historicalInput { color: #d4d4d4; }
.outputLine      { color: #9cdcfe; display: block; }
.currentLine     { margin-top: 4px; }
.inputText       { color: #d4d4d4; }
.errorText       { color: #f44747; }

.scanline-overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent, transparent 2px,
    rgba(0, 0, 0, 0.08) 2px, rgba(0, 0, 0, 0.08) 4px
  );
}

.link {
  color: #60CEE2;
  text-decoration: none;
  border-bottom: 1px dashed rgba(96, 206, 226, 0.3);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.link:hover {
  color: #8ae6ff;
  border-bottom-color: rgba(96, 206, 226, 0.8);
}

/* 作品集链接 — 霓虹脉冲按钮 */
.portfolio-link {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border: 1px solid rgba(210, 245, 67, 0.35);
  border-radius: 4px;
  background: rgba(210, 245, 67, 0.08);
  color: #d2f543;
  font-family: MapleMono;
  font-size: inherit;
  text-shadow: 0 0 8px rgba(210, 245, 67, 0.5), 0 0 20px rgba(210, 245, 67, 0.2);
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  vertical-align: middle;
}

.ascii-art {
  color: #60CEE2;
  white-space: pre;
  font-size: 0.75vw;
  line-height: 1.3;
  display: block;
}

.matrix-rain {
  color: #28c840;
  font-size: 0.85vw;
  opacity: 0.7;
  letter-spacing: 2px;
  display: block;
}

/* ==================== 竖向进度指示器（终端风格） ==================== */
.section-indicator {
  position: fixed;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
  pointer-events: none;
  height: 40vh;
  min-height: 180px;
  justify-content: space-between;
  padding: 12px 0;
}

/* 垂直轨道 */
.indicator-track {
  position: absolute;
  right: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(96, 206, 226, 0.12);
  border-radius: 1px;
  pointer-events: none;
  overflow: hidden;
}

/* 进度填充条 */
.indicator-track-fill {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 0%;
  background: linear-gradient(
    to top,
    rgba(96, 206, 226, 0.8),
    rgba(96, 206, 226, 0.3) 60%,
    transparent
  );
  border-radius: 1px;
  transition: none; /* 由 GSAP 驱动 */
}

/* 水平连接短线（电路板风格） */
.indicator-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  pointer-events: auto;
  outline: none;
  z-index: 1;
}

/* 连接短线 */
.indicator-item::after {
  content: '';
  position: absolute;
  right: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 1px;
  background: rgba(96, 206, 226, 0.2);
  transition: width 0.35s ease, background 0.35s ease;
}
.indicator-item:hover::after {
  width: 12px;
}
.indicator-item--active::after {
  width: 12px;
  background: rgba(96, 206, 226, 0.5);
}
.indicator-item--past::after {
  width: 12px;
  background: rgba(96, 206, 226, 0.25);
}

/* ======== 圆点 ======== */
.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
  position: relative;
  z-index: 2;
}

/* past — 已访问：实心填充 + 微光 */
.indicator-dot--past {
  background: #60CEE2;
  border: 2px solid #60CEE2;
  box-shadow: 0 0 6px rgba(96, 206, 226, 0.3);
  opacity: 0.7;
}

/* active — 当前：实心 + 呼吸发光 */
.indicator-dot--active {
  background: #60CEE2;
  border: 2px solid #60CEE2;
  box-shadow: 0 0 0 rgba(96, 206, 226, 0.6);
  animation: indicatorPulse 2s ease-in-out infinite;
  width: 12px;
  height: 12px;
}

@keyframes indicatorPulse {
  0%, 100% {
    box-shadow: 0 0 8px rgba(96, 206, 226, 0.5), 0 0 16px rgba(96, 206, 226, 0.15);
  }
  50% {
    box-shadow: 0 0 14px rgba(96, 206, 226, 0.8), 0 0 28px rgba(96, 206, 226, 0.25);
  }
}

/* future — 未访问：空心描边 */
.indicator-dot--future {
  background: transparent;
  border: 2px solid rgba(96, 206, 226, 0.35);
  opacity: 0.5;
}
.indicator-item:hover .indicator-dot--future {
  border-color: rgba(96, 206, 226, 0.7);
  opacity: 0.8;
}

/* ======== 标签 ======== */
.indicator-label {
  display: flex;
  align-items: center;
  gap: 3px;
  font-family: MapleMono, ui-monospace, monospace;
  font-size: 0.75vw;
  letter-spacing: 0.5px;
  white-space: nowrap;
  position: relative;
  z-index: 2;
  user-select: none;
}

/* 终端提示符 */
.indicator-prompt {
  color: #5fb857;
  font-weight: bold;
  width: 10px;
  text-align: center;
  flex-shrink: 0;
}

/* 标签文字 */
.indicator-text {
  color: #60CEE2;
}

/* past：标签可见、半透明 */
.indicator-label--past {
  opacity: 0.55;
}
.indicator-label--past .indicator-text {
  color: rgba(96, 206, 226, 0.65);
}

/* active：完全可见 */
.indicator-label--active {
  opacity: 1;
}
.indicator-label--active .indicator-text {
  color: #60CEE2;
  text-shadow: 0 0 6px rgba(96, 206, 226, 0.3);
}

/* future：标签默认隐藏，hover 时显现 */
.indicator-label--future {
  opacity: 0;
  transform: translateX(8px);
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.indicator-item:hover .indicator-label--future {
  opacity: 0.7;
  transform: translateX(0);
}

/* 当前标签的闪烁光标 */
.indicator-cursor {
  display: inline-block;
  width: 0.5em;
  height: 1em;
  background-color: #5fb857;
  margin-left: 2px;
  animation: indicatorBlink 1s step-end infinite;
  flex-shrink: 0;
}

@keyframes indicatorBlink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}

/* ======== 响应式 ======== */
@media (max-width: 1024px) {
  .indicator-label--future {
    display: none;
  }
  .indicator-label--past {
    opacity: 0.5;
    font-size: 0.65vw;
  }
  .indicator-label--active {
    font-size: 0.75vw;
  }
}

@media (max-width: 768px) {
  .section-indicator {
    right: 10px;
    gap: 16px;
    height: 30vh;
    min-height: 120px;
  }
  .indicator-label {
    display: none !important;
  }
  .indicator-item::after {
    display: none;
  }
  .indicator-track {
    right: 5px;
  }
  .indicator-dot {
    width: 8px;
    height: 8px;
  }
  .indicator-dot--active {
    width: 10px;
    height: 10px;
  }
}

/* 底栏 */
.footer {
  position: fixed;
  bottom: 0; left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 10px 0;
  background: rgba(18, 19, 20, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  font-family: MapleMono;
  font-size: 0.85vw;
  color: #888;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.footer a {
  color: #888;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer a:hover {
  color: #60CEE2;
}

.footer-separator {
  color: #555;
}

/* 向下滚动提示 */
.scroll-hint {
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #888;
  font-family: MapleMono;
  font-size: 0.85vw;
  user-select: none;
  pointer-events: none;
  animation: scrollHintBounce 2.4s ease-in-out infinite;
}

.scroll-hint__text {
  opacity: 0.5;
  letter-spacing: 0.5px;
}

.scroll-hint__arrow {
  font-size: 0.7vw;
  line-height: 1;
  opacity: 0.6;
}

@keyframes scrollHintBounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
    opacity: 0.5;
  }
  40% {
    opacity: 1;
  }
  60% {
    transform: translateX(-50%) translateY(6px);
    opacity: 0.3;
  }
}
</style>