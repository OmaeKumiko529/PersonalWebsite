<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import gsap from "gsap"
import Badge from "./Badge.vue"
import { texts } from "../data/terminalData.js"
import { useTypewriter } from "../composables/useTypewriter.js"

//useTypewriter.js
const { displayTokens, typeText, deleteText, wait } = useTypewriter()

const cursorElement = ref(null)

let currentIndex = 0
let isLoopActive = true

onMounted(async () => {
  //光标闪烁动画
  if (cursorElement.value) {
    gsap.to(cursorElement.value, {
      duration: 0.5,
      opacity: 0,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })
  }

  //typewriter动画循环
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
  //停止动画循环
  isLoopActive = false
})
</script>

<template>
  <div class="viewport">

    <section class="startPage">

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

    </section>

    <section class="introPage">

      <div class="secondMainTitle">
        <<span style="color:#60CEE2">OmaeKumiko529</span> <span style="color:#BA77FE">/</span>>
        <p style="margin-top: 0.5%;">
          <span class="string" style="font-family: Maplemono; font-size: 1vw;">/* 我是谁 */</span>
        </p>
      </div>

      <div class="introduction">
        <div class="item">
          <p class="introTitle">{{ '<!--' }}<span style="color: white;">前端开发</span>{{ '-->' }}</p>
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

      <p class="secondMainTitle">$ <span style="color: #d2f543;">project</span> <span style="color: white;">--list</span></p>

      <div class="introduction">
        <div class="item2">
          <p class="introTitle">├──
            <span style="color: white;">
              Simple
              <Badge text="TapTap" href="https://www.taptap.cn/app/267034?os=android"
                radius="none" style="vertical-align: middle; color: black; background-color: #00d9c5;" />
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

    <!-- 底栏：备案信息（页面底部，非固定） -->
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
  width: 100%;
  min-height: 100vh;
}

.startPage {
  background-color: #121314;
  height: 100vh;
  position: relative;
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

/* 底栏 - 静态页面底部，非固定 */
.footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 0;
  background: rgba(18, 19, 20, 0.75);
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
</style>