<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { useTerminal, getMouseOffset } from "../composables/useTerminal.js"
import gsap from "gsap"
import ParticleNetwork from "./ParticleNetwork.vue"

const {
  isTerminalActive, lines, currentInput, terminalBodyRef,
  passwordMode,
  focusTerminal, blurTerminal, handleKey, handleTerminalWheel,
  showStartupBanner
} = useTerminal({ onNavigate: (path) => {} })

const terminalRef = ref(null)
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

let handleParallaxMouseMove = null
let handleParallaxMouseLeave = null

onMounted(async () => {
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

  // 鼠标视差处理函数
  handleParallaxMouseMove = (e) => {
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
})

onUnmounted(() => {
  if (handleParallaxMouseMove) {
    document.removeEventListener("mousemove", handleParallaxMouseMove)
  }
  if (handleParallaxMouseLeave) {
    document.removeEventListener("mouseleave", handleParallaxMouseLeave)
  }
})
</script>

<template>
  <section class="contactPage">
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
</template>

<style scoped>
/* 第三屏 */
.contactPage {
  background-color: #121314;
  position: relative;
  width: 100%;
  min-height: 100vh;
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
</style>