<script setup>
import { computed } from 'vue'
import { cases } from '../../../cases/caseData.js'
import { deep } from '../../../cases/caseDeep.js'

const props = defineProps({ id: { type: String, required: true } })

const idx = computed(() => cases.findIndex(c => c.id === props.id))
const c = computed(() => cases[idx.value])
const d = computed(() => deep[props.id])
const prev = computed(() => (idx.value > 0 ? cases[idx.value - 1] : null))
const next = computed(() => (idx.value < cases.length - 1 ? cases[idx.value + 1] : null))
const page = (id) => '/cases/' + id.toLowerCase()

const typeLabel = (t) => ({ success: '✅ 正面成功', failure: '❌ 反面失败', trend: '📊 趋势/综合' }[t] || t)
const moduleLabel = (m) => ({ supply: '供应链管理', platform: '平台运营', brand: '海外品牌管理', compliance: '合规管理', logistics: '物流履约', strategy: '商业本质' }[m] || m)

// 课程编码 → 站点路由映射（交叉导流）
const courseMap = {
  'L1-01': ['/l1/01-business-logic', '商业逻辑总览'],
  'L1-02': ['/l1/02-supply-chain', '供应链全景认知'],
  'L1-03': ['/l1/03-brand-dtc', '品牌出海 DTC 框架'],
  'L1-04': ['/l1/04-platform-ops', '平台运营核心逻辑'],
  'L1-05': ['/l1/05-logistics', '物流与履约基础'],
  'L1-06': ['/l1/06-compliance', '合规风险地图'],
  'L1-07': ['/l1/07-finance-cost', '财务与成本认知'],
  'L1-08': ['/l1/08-data-driven', '数据驱动入门'],
  'L2A': ['/l2/', 'L2 路径A · 平台运营'],
  'L2A-08': ['/l2/a08-compliance-ops', '平台合规运营'],
  'L2A-09': ['/l2/a09-logistics-ops', '物流运营实操'],
  'L2B': ['/l2/', 'L2 路径B · 独立站品牌'],
  'L2B-01': ['/l2/b01-product-research', '选品与需求验证'],
  'L2B-03': ['/l2/b03-tax-compliance', '税务合规'],
  'L2B-04': ['/l2/b04-overseas-compliance', '海外合规'],
  'L2B-07': ['/l2/b07-brand-launch', '品牌发布'],
  'L2C-01': ['/l2/c01-strategy', '战略与商业模式'],
  'L2C-04': ['/l2/c04-compliance-strategy', '合规战略'],
  'L2C-05': ['/l2/c05-supply-chain-strategy', '供应链战略'],
  'L2C-06': ['/l2/c06-brand-strategy', '品牌战略'],
}
// 案例模块 → 知识库专业课导流
const moduleCourse = {
  supply: ['/courses/supply-chain/', '供应链管理'],
  platform: ['/courses/platform-operations/', '平台运营'],
  brand: ['/courses/brand-management/', '品牌管理'],
  compliance: ['/courses/compliance/', '合规管理'],
  logistics: ['/courses/logistics-overseas-warehouse/', '物流与海外仓'],
  strategy: ['/courses/', '知识库专业课总览'],
}
const relatedCourses = computed(() => {
  if (!c.value) return []
  return String(c.value.course).split('/').map(code => code.trim()).filter(Boolean).map(code => {
    const hit = courseMap[code]
    return hit ? { code, link: hit[0], name: hit[1] } : { code, link: '', name: '' }
  })
})
const moduleLink = computed(() => (c.value ? moduleCourse[c.value.module] : null))
</script>

<template>
  <div v-if="c">
    <h1>{{ c.id }} {{ c.title }}</h1>

    <div class="case-meta">
      <span>{{ typeLabel(c.type) }}</span>
      <span>{{ moduleLabel(c.module) }}</span>
      <span>{{ c.scale }}</span>
      <span>适配课程：{{ c.course }}</span>
      <span>{{ c.year }}</span>
      <span>来源：{{ c.source }}</span>
    </div>

    <div v-if="c.models && c.models.length" class="case-models">
      <span class="models-label">🧠 核心思维模型：</span>
      <a v-for="model in c.models" :key="model" :href="'/cases/?model=' + encodeURIComponent(model)" class="model-chip" title="在案例库中查看该模型的全部案例">{{ model }}</a>
    </div>

    <h2>案例摘要</h2>
    <p class="case-summary">{{ c.summary }}</p>
    <p><strong>教学要点：</strong>{{ c.teaching }}</p>
    <p v-if="c.sourceUrl"><a :href="c.sourceUrl" target="_blank">🔗 查看原始来源 →</a></p>

    <div v-if="c.intro" class="case-intro">
      <h3>📋 案例简介</h3>
      <p>{{ c.intro }}</p>
    </div>

    <template v-if="d">
      <div v-if="d.analysis" class="case-analysis">
        <h2>🔍 案例拆解分析</h2>
        <p v-if="d.analysis.background" class="analysis-bg">{{ d.analysis.background }}</p>
        <div class="analysis-grid">
          <div v-for="(dim, i) in d.analysis.dimensions" :key="i" class="analysis-card">
            <div class="analysis-card-title">{{ dim[0] }}</div>
            <div class="analysis-card-desc">{{ dim[1] }}</div>
          </div>
        </div>
        <div v-if="d.analysis.keyData" class="analysis-data">
          <h4>📊 关键数据</h4>
          <div class="data-points">
            <span v-for="(dp, i) in d.analysis.keyData" :key="i" class="data-point">{{ dp }}</span>
          </div>
        </div>
        <div v-if="d.analysis.related" class="analysis-related">
          <strong>🔗 关联案例：</strong>{{ d.analysis.related }}
        </div>
      </div>

      <h2>深度教学手册</h2>

      <h3>教学目标</h3>
      <ol class="objectives">
        <li v-for="(o, i) in d.objectives" :key="i">{{ o }}</li>
      </ol>

      <h3>建议教学流程（约 40 分钟）</h3>
      <table>
        <thead>
          <tr><th>环节</th><th>时长</th><th>教学动作</th></tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in d.flow" :key="i">
            <td><strong>{{ row[0] }}</strong></td>
            <td>{{ row[1] }} 分钟</td>
            <td>{{ row[2] }}</td>
          </tr>
        </tbody>
      </table>

      <h3>课堂讨论题</h3>
      <ol class="questions">
        <li v-for="(q, i) in d.questions" :key="i">{{ q }}</li>
      </ol>

      <h3>教学延展</h3>
      <div class="extend">💡 {{ d.extend }}</div>

      <h3 v-if="d.field">教学实录</h3>
      <div v-if="d.field" class="field">📝 {{ d.field }}</div>
    </template>

    <h2>相关课程</h2>
    <div class="related">
      <a v-for="r in relatedCourses" :key="r.code" :href="r.link || '/l1/'" :class="{ plain: !r.link }" class="related-item">
        <span class="related-code">{{ r.code }}</span>
        <span class="related-name">{{ r.name || '课程大纲详见课程体系' }}</span>
      </a>
      <a v-if="moduleLink" :href="moduleLink[0]" class="related-item module">
        <span class="related-code">🎯 深度专题</span>
        <span class="related-name">知识库专业课 · {{ moduleLink[1] }}</span>
      </a>
    </div>

    <InstructorHandbook v-if="d" :case-id="c.id" />

    <div class="case-nav">
      <a v-if="prev" :href="page(prev.id)">← {{ prev.id }} {{ prev.title.slice(0, 18) }}…</a>
      <span v-else></span>
      <a href="/cases/">返回案例库</a>
      <a v-if="next" :href="page(next.id)">{{ next.id }} {{ next.title.slice(0, 18) }}… →</a>
      <span v-else></span>
    </div>
  </div>
  <div v-else>
    <p>未找到该案例，请 <a href="/cases/">返回案例库</a>。</p>
  </div>
</template>

<style scoped>
.case-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.case-meta span {
  background: var(--vp-c-bg-soft);
  padding: 3px 12px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
}
.case-intro {
  border-left: 4px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  padding: 14px 18px;
  border-radius: 0 10px 10px 0;
  margin: 1.25rem 0;
}
.case-models {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-soft);
}
.models-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.model-chip {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  padding: 3px 12px;
  border-radius: 14px;
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid var(--vp-c-brand-soft);
  transition: all 0.2s ease;
}
.model-chip:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
}
.case-intro h3 {
  margin: 0 0 8px 0;
  font-size: 1rem;
}
.case-intro p {
  margin: 0;
  line-height: 1.9;
}
.case-analysis {
  margin: 1.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.case-analysis > h2 {
  margin-top: 0;
}
.analysis-bg {
  line-height: 1.9;
  margin-bottom: 1rem;
}
.analysis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin: 1rem 0;
}
.analysis-card {
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}
.analysis-card-title {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
  font-size: 0.95rem;
}
.analysis-card-desc {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}
.analysis-data {
  margin-top: 1rem;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--vp-c-bg-mute);
}
.analysis-data h4 {
  margin: 0 0 8px 0;
  font-size: 0.92rem;
}
.data-points {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.data-point {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 3px 12px;
  border-radius: 14px;
  font-size: 0.82rem;
  font-weight: 500;
}
.analysis-related {
  margin-top: 1rem;
  padding: 10px 14px;
  border-left: 3px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg-mute);
  border-radius: 0 8px 8px 0;
  font-size: 0.9rem;
  line-height: 1.7;
}
.case-summary {
  line-height: 1.9;
}
.objectives li,
.questions li {
  margin-bottom: 8px;
  line-height: 1.8;
}
.extend {
  border-left: 4px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  padding: 12px 16px;
  border-radius: 0 8px 8px 0;
  line-height: 1.8;
}
.field {
  border-left: 4px solid var(--vp-c-green-1);
  background: var(--vp-c-bg-soft);
  padding: 12px 16px;
  border-radius: 0 8px 8px 0;
  line-height: 1.9;
}
.related {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
}
.related-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
}
.related-item:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}
.related-item.plain {
  opacity: 0.75;
}
.related-item.module {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}
.related-code {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
.related-name {
  font-size: 14px;
  color: var(--vp-c-text-1);
}
.case-nav {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 14px;
}
.case-nav a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.case-nav a:hover {
  text-decoration: underline;
}
</style>
