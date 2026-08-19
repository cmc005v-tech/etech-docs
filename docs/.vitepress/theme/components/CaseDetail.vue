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

    <h2>案例摘要</h2>
    <p class="case-summary">{{ c.summary }}</p>
    <p><strong>教学要点：</strong>{{ c.teaching }}</p>
    <p v-if="c.sourceUrl"><a :href="c.sourceUrl" target="_blank">🔗 查看原始来源 →</a></p>

    <template v-if="d">
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
    </template>

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
