/**
 * 页面滚动导航 composable
 * 管理多页面区域的滚轮切换动画
 *
 * 动画策略：
 * - 当前页 → 缩小 + 上移 + 淡出
 * - 下页    → 从下方放大推入 + 淡入
 * - 配合 power3 缓动，营造景深感
 */
import { ref } from "vue"
import gsap from "gsap"

export function usePageScroll() {
  /** 当前激活的页面区域索引 */
  const currentSection = ref(0)

  /** 动画是否正在执行中 */
  const isAnimating = ref(false)

  /** 滚轮事件锁定 */
  const wheelLock = ref(false)

  /** 存储所有 section DOM 元素 */
  const sections = ref([])

  /**
   * 执行页面切换动画
   */
  function switchTo(index) {
    if (isAnimating.value) return
    isAnimating.value = true

    const currentEl = sections.value[currentSection.value]
    const nextEl    = sections.value[index]
    const isForward = index > currentSection.value
    const dir       = isForward ? 1 : -1

    const tl = gsap.timeline({
      onComplete: () => {
        currentSection.value = index
        isAnimating.value = false
      }
    })

    // 当前页：缩小 + 上移 + 淡出
    tl.to(currentEl, {
      y:        -50 * dir,
      scale:    0.93,
      autoAlpha: 0,
      duration:  0.65,
      ease:     "power3.inOut"
    }, 0)

    // 下页：从下方放大推入 + 淡入
    tl.fromTo(nextEl,
      {
        y:         50 * dir,
        scale:     0.93,
        autoAlpha: 0
      },
      {
        y:         0,
        scale:     1,
        autoAlpha: 1,
        duration:  0.65,
        ease:     "power3.inOut"
      },
      0
    )
  }

  function goNext() {
    if (currentSection.value >= sections.value.length - 1) return
    switchTo(currentSection.value + 1)
  }

  function goPrev() {
    if (currentSection.value <= 0) return
    switchTo(currentSection.value - 1)
  }

  /**
   * 滚轮事件处理
   * @param {WheelEvent} e
   * @param {boolean} isTerminalActive - 终端是否激活（从外部传入）
   */
  function onWheel(e, isTerminalActive) {
    if (isTerminalActive?.value) return
    if (wheelLock.value || isAnimating.value) return

    wheelLock.value = true
    setTimeout(() => (wheelLock.value = false), 800)

    if (e.deltaY > 0) {
      goNext()
    } else {
      goPrev()
    }
  }

  /**
   * 初始化 section 元素并设置初始位置
   */
  function initSections() {
    const sectionElements = document.querySelectorAll("section")
    sections.value = Array.from(sectionElements)

    sections.value.forEach((el, idx) => {
      gsap.set(el, {
        autoAlpha: idx === currentSection.value ? 1 : 0,
        y:         0,
        scale:     1
      })
    })
  }

  return { currentSection, isAnimating, wheelLock, sections, switchTo, goNext, goPrev, onWheel, initSections }
}