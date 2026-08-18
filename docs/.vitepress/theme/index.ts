import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'

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
  },
}
