<script setup>
import { computed } from 'vue'
import { cases } from '../../../cases/caseData.js'
import { deep } from '../../../cases/caseDeep.js'

const props = defineProps({ 
  case1: { type: String, required: true },
  case2: { type: String, required: true }
})

const c1 = computed(() => cases.find(c => c.id === props.case1))
const c2 = computed(() => cases.find(c => c.id === props.case2))
const d1 = computed(() => deep[props.case1])
const d2 = computed(() => deep[props.case2])

const typeLabel = (t) => ({ success: '✅ 正面成功', failure: '❌ 反面失败', trend: '📊 趋势/综合' }[t] || t)
const moduleLabel = (m) => ({ supply: '供应链管理', platform: '平台运营', brand: '海外品牌管理', compliance: '合规管理', logistics: '物流履约', strategy: '商业本质' }[m] || m)
</script>

<template>
  <div v-if="c1 && c2">
    <h1>⚖️ 正反配对专题：{{ c1.id }} vs {{ c2.id }}</h1>
    
    <div class="comparison-header">
      <div class="case-card positive">
        <div class="case-badge">{{ typeLabel(c1.type) }}</div>
        <h2>{{ c1.title }}</h2>
        <div class="case-meta">
          <span>{{ moduleLabel(c1.module) }}</span>
          <span>{{ c1.scale }}</span>
          <span>{{ c1.year }}</span>
        </div>
      </div>
      
      <div class="vs-divider">VS</div>
      
      <div class="case-card negative">
        <div class="case-badge">{{ typeLabel(c2.type) }}</div>
        <h2>{{ c2.title }}</h2>
        <div class="case-meta">
          <span>{{ moduleLabel(c2.module) }}</span>
          <span>{{ c2.scale }}</span>
          <span>{{ c2.year }}</span>
        </div>
      </div>
    </div>

    <h2>📋 案例简介对比</h2>
    <div class="comparison-grid">
      <div class="comparison-col">
        <h3>{{ c1.id }} 背景</h3>
        <p>{{ c1.intro || c1.summary }}</p>
      </div>
      <div class="comparison-col">
        <h3>{{ c2.id }} 背景</h3>
        <p>{{ c2.intro || c2.summary }}</p>
      </div>
    </div>

    <h2>🔍 核心做法/问题对比</h2>
    <div class="comparison-grid">
      <div class="comparison-col">
        <h3>{{ c1.id }} 核心做法</h3>
        <ul>
          <li v-for="(item, i) in (d1?.analysis?.dimensions || []).map(d => d[0])" :key="i">
            <strong>{{ item }}</strong>
          </li>
        </ul>
      </div>
      <div class="comparison-col">
        <h3>{{ c2.id }} 核心问题</h3>
        <ul>
          <li v-for="(item, i) in (d2?.analysis?.dimensions || []).map(d => d[0])" :key="i">
            <strong>{{ item }}</strong>
          </li>
        </ul>
      </div>
    </div>

    <h2>📊 关键数据对比</h2>
    <div class="comparison-grid">
      <div class="comparison-col">
        <h3>{{ c1.id }} 成果数据</h3>
        <div class="data-tags">
          <span v-for="(dp, i) in d1?.analysis?.keyData" :key="i" class="data-tag positive">{{ dp }}</span>
        </div>
      </div>
      <div class="comparison-col">
        <h3>{{ c2.id }} 损失数据</h3>
        <div class="data-tags">
          <span v-for="(dp, i) in d2?.analysis?.keyData" :key="i" class="data-tag negative">{{ dp }}</span>
        </div>
      </div>
    </div>

    <h2>💡 教学引导与讨论题</h2>
    <div class="teaching-section">
      <h3>对比焦点</h3>
      <div class="focus-box">
        <p><strong>{{ d1?.analysis?.related || '正反配对：同一领域不同决策路径的结局分野' }}</strong></p>
      </div>

      <h3>深度讨论题</h3>
      <ol class="discussion-questions">
        <li v-for="(q, i) in [...(d1?.questions || []), ...(d2?.questions || [])].slice(0, 6)" :key="i">{{ q }}</li>
      </ol>

      <h3>教学建议</h3>
      <div class="teaching-tip">
        <p>🎯 <strong>推荐教学方式：</strong>先分别展示两个案例的背景和结果（15分钟），再引导学员对比核心做法差异（15分钟），最后提炼可复用的方法论或需规避的陷阱（10分钟）。</p>
        <p>📝 <strong>课堂活动：</strong>让学员分组扮演两个案例中的决策者，模拟当时的决策场景，体验不同选择带来的不同后果。</p>
      </div>
    </div>

    <div class="nav-links">
      <a :href="'/cases/' + c1.id.toLowerCase()">← 返回 {{ c1.id }} 详情页</a>
      <a href="/cases/">返回案例库首页</a>
      <a :href="'/cases/' + c2.id.toLowerCase()">{{ c2.id }} 详情页 →</a>
    </div>
  </div>
  <div v-else>
    <p>未找到对比案例，请 <a href="/cases/">返回案例库</a>。</p>
  </div>
</template>

<style scoped>
.comparison-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: center;
  margin: 2rem 0;
}

.case-card {
  padding: 20px;
  border-radius: 12px;
  border: 2px solid;
}

.case-card.positive {
  border-color: #10b981;
  background: #f0fdf4;
}

.case-card.negative {
  border-color: #ef4444;
  background: #fef2f2;
}

.case-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
  background: rgba(255,255,255,0.8);
}

.case-card h2 {
  margin: 0 0 12px 0;
  font-size: 1.1rem;
  line-height: 1.5;
}

.case-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.vs-divider {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  padding: 0 10px;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 1.5rem 0;
}

.comparison-col {
  padding: 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.comparison-col h3 {
  margin-top: 0;
  font-size: 1rem;
  color: var(--vp-c-brand-1);
}

.comparison-col ul {
  margin: 0;
  padding-left: 20px;
}

.comparison-col li {
  margin-bottom: 8px;
  line-height: 1.7;
}

.data-tags {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.data-tag {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}

.data-tag.positive {
  background: #d1fae5;
  color: #065f46;
  border-left: 3px solid #10b981;
}

.data-tag.negative {
  background: #fee2e2;
  color: #991b1b;
  border-left: 3px solid #ef4444;
}

.teaching-section {
  margin: 2rem 0;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.focus-box {
  padding: 14px 18px;
  border-left: 4px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  border-radius: 0 8px 8px 0;
  margin: 1rem 0;
}

.discussion-questions li {
  margin-bottom: 10px;
  line-height: 1.8;
}

.teaching-tip {
  padding: 14px 18px;
  background: #eff6ff;
  border-radius: 8px;
  border: 1px solid #bfdbfe;
}

.teaching-tip p {
  margin: 8px 0;
  line-height: 1.8;
}

.nav-links {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 14px;
}

.nav-links a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.nav-links a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .comparison-header {
    grid-template-columns: 1fr;
  }
  
  .vs-divider {
    text-align: center;
    padding: 10px 0;
  }
  
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>
