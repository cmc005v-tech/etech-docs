<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { cases } from '../../../cases/caseData.js'

const props = defineProps({
  courseCodes: { type: Array, default: () => [] },
  module: { type: String, default: '' },
})

// 根据课程编码或模块筛选相关案例
const relatedCases = computed(() => {
  if (props.courseCodes && props.courseCodes.length > 0) {
    return cases.filter(c => {
      const cCourses = String(c.course).split('/').map(code => code.trim())
      return cCourses.some(code => props.courseCodes.includes(code))
    })
  }
  if (props.module) {
    return cases.filter(c => c.module === props.module)
  }
  return []
})

const typeLabel = (t) => ({ success: '✅', failure: '❌', trend: '📊' }[t] || '')
const caseLink = (id) => withBase(`/cases/${id.toLowerCase()}`)
</script>

<template>
  <div v-if="relatedCases.length > 0" class="related-cases-section">
    <h3>📚 相关案例</h3>
    <p class="section-desc">以下案例与本课程主题高度相关，建议学完理论后立即阅读，加深理解</p>
    
    <div class="cases-grid">
      <a v-for="c in relatedCases" :key="c.id" :href="caseLink(c.id)" class="case-card">
        <div class="case-header">
          <span class="case-type">{{ typeLabel(c.type) }}</span>
          <span class="case-id">{{ c.id }}</span>
        </div>
        <div class="case-title">{{ c.title }}</div>
        <div class="case-meta">
          <span>{{ c.scale }}</span>
          <span>{{ c.year }}</span>
        </div>
        <div class="case-summary">{{ c.summary.slice(0, 80) }}...</div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.related-cases-section {
  margin: 2rem 0;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.related-cases-section h3 {
  margin-top: 0;
  font-size: 1.1rem;
}

.section-desc {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 16px;
  line-height: 1.7;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.case-card {
  padding: 14px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.case-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.case-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.case-type {
  font-size: 1rem;
}

.case-id {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 2px 8px;
  border-radius: 12px;
}

.case-title {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.case-meta {
  display: flex;
  gap: 10px;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.case-summary {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .cases-grid {
    grid-template-columns: 1fr;
  }
}
</style>
