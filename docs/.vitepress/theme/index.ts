import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import { inBrowser } from 'vitepress'

// 固化外观偏好：VitePress 切回浅色时会写回 'auto'（跟随系统），
// 这里按 html.dark 的实际状态写明确的 light/dark，确保用户手动选择后不再跟随系统
if (inBrowser) {
  const APPEARANCE_KEY = 'vitepress-theme-appearance'
  const syncAppearance = () => {
    try {
      localStorage.setItem(
        APPEARANCE_KEY,
        document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      )
    } catch {
      /* localStorage 不可用时静默降级 */
    }
  }
  new MutationObserver(syncAppearance).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
}

// 自定义组件
import CourseCard from './components/CourseCard.vue'
import CourseGrid from './components/CourseGrid.vue'
import DownloadButton from './components/DownloadButton.vue'
import ResourceCategory from './components/ResourceCategory.vue'
import ResourceTable from './components/ResourceTable.vue'
import QuickLinks from './components/QuickLinks.vue'
import FAQItem from './components/FAQItem.vue'
import HeroBanner from './components/HeroBanner.vue'
import ContentNotice from './components/ContentNotice.vue'
import LastUpdated from './components/LastUpdated.vue'
import Quiz from './components/Quiz.vue'
import MarkDone from './components/MarkDone.vue'
import ProgressDashboard from './components/ProgressDashboard.vue'
import CaseDetail from './components/CaseDetail.vue'
import CaseComparison from './components/CaseComparison.vue'
import PathRecommender from './components/PathRecommender.vue'
import LearningCertificate from './components/LearningCertificate.vue'

// 自定义样式
import './style/vars.css'
import './style/custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('CourseCard', CourseCard)
    app.component('CourseGrid', CourseGrid)
    app.component('DownloadButton', DownloadButton)
    app.component('ResourceCategory', ResourceCategory)
    app.component('ResourceTable', ResourceTable)
    app.component('QuickLinks', QuickLinks)
    app.component('FAQItem', FAQItem)
    app.component('HeroBanner', HeroBanner)
    app.component('ContentNotice', ContentNotice)
    app.component('LastUpdated', LastUpdated)
    app.component('Quiz', Quiz)
    app.component('MarkDone', MarkDone)
    app.component('ProgressDashboard', ProgressDashboard)
    app.component('CaseDetail', CaseDetail)
    app.component('CaseComparison', CaseComparison)
    app.component('PathRecommender', PathRecommender)
    app.component('LearningCertificate', LearningCertificate)
  },
}
