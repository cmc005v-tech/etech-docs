<script setup>
import { ref, computed, onMounted } from 'vue'

// 跨境电商能力地图 - 完整学习路径可视化
const STORAGE_KEY = 'course-study-progress'
const expandedLevels = ref({})
const doneMap = ref({})

// 初始化展开状态（默认全部展开）
const initExpanded = () => {
  const allExpanded = {}
  levels.forEach(lvl => {
    allExpanded[lvl.level] = true
  })
  expandedLevels.value = allExpanded
}

// 加载学习进度
const loadProgress = () => {
  try {
    doneMap.value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    doneMap.value = {}
  }
}

const isDone = (code) => !!doneMap.value[code]

const toggleLevel = (level) => {
  expandedLevels.value[level] = !expandedLevels.value[level]
}

const levels = [
  {
    level: 'L1',
    title: '必修基础层',
    subtitle: '8 门课 · 32 学时',
    desc: '建立行业全景认知，掌握底层逻辑',
    courses: [
      { code: 'L1-01', name: '商业逻辑总览', icon: '🧭' },
      { code: 'L1-02', name: '供应链全景认知', icon: '🏭' },
      { code: 'L1-03', name: '品牌出海 DTC 框架', icon: '🏷️' },
      { code: 'L1-04', name: '平台运营核心逻辑', icon: '🛒' },
      { code: 'L1-05', name: '物流与履约基础', icon: '🚢' },
      { code: 'L1-06', name: '合规风险地图', icon: '⚖️' },
      { code: 'L1-07', name: '财务与成本认知', icon: '💰' },
      { code: 'L1-08', name: '数据驱动入门', icon: '📊' },
    ],
    cases: ['SC-01', 'PO-01', 'BE-01'],
  },
  {
    level: 'L2-A',
    title: '平台运营精进',
    subtitle: '9 门课 · 36 学时',
    desc: '深耕亚马逊/TikTok/多平台运营能力',
    courses: [
      { code: 'L2A-01', name: '平台算法与流量', icon: '🔍' },
      { code: 'L2A-02', name: 'Listing 优化实战', icon: '📝' },
      { code: 'L2A-03', name: '广告投放与 ROI', icon: '🎯' },
      { code: 'L2A-04', name: 'AI 辅助运营实操', icon: '🤖' },
      { code: 'L2A-05', name: '数据驱动决策', icon: '📈' },
      { code: 'L2A-06', name: '站外引流与内容营销', icon: '🌐' },
      { code: 'L2A-07', name: '竞品分析与防御', icon: '🛡️' },
      { code: 'L2A-08', name: '平台合规运营', icon: '✅' },
      { code: 'L2A-09', name: '物流运营实操', icon: '📦' },
    ],
    cases: ['PO-01', 'PO-02', 'PO-03', 'PO-04', 'PO-05'],
  },
  {
    level: 'L2-B',
    title: '独立站品牌创业',
    subtitle: '7 门课 · 28 学时',
    desc: '从 0 到 1 搭建跨境品牌生意',
    courses: [
      { code: 'L2B-01', name: '选品与需求验证', icon: '🔬' },
      { code: 'L2B-02', name: '供应链从 0 搭建', icon: '🔗' },
      { code: 'L2B-03', name: '国内税务合规', icon: '📋' },
      { code: 'L2B-04', name: '海外合规体系', icon: '🌍' },
      { code: 'L2B-05', name: '资金链与外汇风控', icon: '💱' },
      { code: 'L2B-06', name: '独立站建站与转化', icon: '🏪' },
      { code: 'L2B-07', name: '品牌发布与冷启动', icon: '🚀' },
    ],
    cases: ['BM-01', 'BM-02', 'BM-04', 'BM-05'],
  },
  {
    level: 'L2-C',
    title: '管理升级与战略',
    subtitle: '6 门课 · 24 学时',
    desc: '组织建设、战略规划、风控体系',
    courses: [
      { code: 'L2C-01', name: '战略规划与商业模式', icon: '♟️' },
      { code: 'L2C-02', name: '团队组织与绩效管理', icon: '👥' },
      { code: 'L2C-03', name: '财务管控与经营分析', icon: '📊' },
      { code: 'L2C-04', name: '全链路风控体系', icon: '🛡️' },
      { code: 'L2C-05', name: '供应链战略设计', icon: '🏭' },
      { code: 'L2C-06', name: '品牌战略与资产估值', icon: '💎' },
    ],
    cases: ['SC-01', 'SC-03', 'BM-01', 'BM-03', 'BE-02', 'BE-03'],
  },
  {
    level: 'L3',
    title: '高阶毕业项目',
    subtitle: '3 形态 · 实战交付',
    desc: '综合应用，产出可落地成果',
    courses: [
      { code: 'L3-A', name: '运营操盘手毕业项目', icon: '🎓' },
      { code: 'L3-B', name: '创业实战沙盘', icon: '💼' },
      { code: 'L3-C', name: '战略规划咨询报告', icon: '📑' },
    ],
    cases: ['BE-01', 'BE-02', 'BE-03', 'BE-04', 'BE-05', 'BE-06'],
  },
]

const caseModuleMap = {
  'SC': '供应链管理',
  'PO': '平台运营',
  'BM': '品牌管理',
  'CM': '合规管理',
  'LF': '物流履约',
  'BE': '商业本质',
}

const getCaseLink = (caseId) => `/cases/${caseId.toLowerCase()}`
const getCourseLink = (code) => {
  const map = {
    'L1-01': '/l1/01-business-logic',
    'L1-02': '/l1/02-supply-chain',
    'L1-03': '/l1/03-brand-dtc',
    'L1-04': '/l1/04-platform-ops',
    'L1-05': '/l1/05-logistics',
    'L1-06': '/l1/06-compliance',
    'L1-07': '/l1/07-finance-cost',
    'L1-08': '/l1/08-data-driven',
    'L2A-01': '/l2/a01-algorithm-traffic',
    'L2A-02': '/l2/a02-listing-optimization',
    'L2A-03': '/l2/a03-ads-roi',
    'L2A-04': '/l2/a04-ai-ops',
    'L2A-05': '/l2/a05-data-driven',
    'L2A-06': '/l2/a06-offsite-traffic',
    'L2A-07': '/l2/a07-competitor-analysis',
    'L2A-08': '/l2/a08-compliance-ops',
    'L2A-09': '/l2/a09-logistics-ops',
    'L2B-01': '/l2/b01-product-research',
    'L2B-02': '/l2/b02-supply-chain-setup',
    'L2B-03': '/l2/b03-tax-compliance',
    'L2B-04': '/l2/b04-overseas-compliance',
    'L2B-05': '/l2/b05-finance-fx',
    'L2B-06': '/l2/b06-site-conversion',
    'L2B-07': '/l2/b07-brand-launch',
    'L2C-01': '/l2/c01-strategy',
    'L2C-02': '/l2/c02-organization',
    'L2C-03': '/l2/c03-finance-control',
    'L2C-04': '/l2/c04-compliance-strategy',
    'L2C-05': '/l2/c05-supply-chain-strategy',
    'L2C-06': '/l2/c06-brand-strategy',
    'L3-A': '/l3/a-operations-project',
    'L3-B': '/l3/b-startup-sandbox',
    'L3-C': '/l3/c-strategy-report',
  }
  return map[code] || '/l1/'
}

onMounted(() => {
  initExpanded()
  loadProgress()
})
</script>

<template>
  <div class="capability-map">
    <h2>🗺️ 跨境电商能力地图</h2>
    <p class="map-desc">完整展示 L1 → L2(A/B/C) → L3 的进阶路径，以及案例库在各阶段的穿插位置</p>

    <div class="levels-container">
      <div v-for="(lvl, idx) in levels" :key="lvl.level" class="level-section">
        <!-- 层级标题（可点击展开/折叠） -->
        <div class="level-header" :class="`level-${lvl.level.toLowerCase().replace('-', '')}`" @click="toggleLevel(lvl.level)">
          <div class="level-badge">{{ lvl.level }}</div>
          <div class="level-info">
            <h3>{{ lvl.title }}</h3>
            <div class="level-meta">{{ lvl.subtitle }} · {{ lvl.desc }}</div>
          </div>
          <div class="expand-icon">{{ expandedLevels[lvl.level] ? '▲' : '▼' }}</div>
        </div>

        <!-- 课程网格（可折叠） -->
        <div v-if="expandedLevels[lvl.level]" class="courses-grid">
          <a v-for="c in lvl.courses" :key="c.code" :href="getCourseLink(c.code)" class="course-card" :class="{ done: isDone(c.code) }">
            <span class="course-icon">{{ c.icon }}</span>
            <div class="course-info">
              <div class="course-code">{{ c.code }}</div>
              <div class="course-name">{{ c.name }}</div>
            </div>
            <span v-if="isDone(c.code)" class="done-badge">✓</span>
          </a>
        </div>

        <!-- 关联案例（可折叠） -->
        <div v-if="expandedLevels[lvl.level] && lvl.cases && lvl.cases.length > 0" class="related-cases">
          <div class="cases-label">📚 配套案例</div>
          <div class="cases-list">
            <a v-for="caseId in lvl.cases" :key="caseId" :href="getCaseLink(caseId)" class="case-tag">
              {{ caseId }}
              <span class="case-module">{{ caseModuleMap[caseId.split('-')[0]] }}</span>
            </a>
          </div>
        </div>

        <!-- 层级间箭头（除最后一层） -->
        <div v-if="idx < levels.length - 1" class="level-arrow">↓</div>
      </div>
    </div>

    <div class="map-footer">
      <p>💡 <strong>学习建议：</strong>先完成 L1 建立全景认知，再根据职业目标选择 L2-A/B/C 路径深入，最后通过 L3 毕业项目整合应用能力。</p>
      <p>📖 <strong>案例穿插：</strong>每个阶段都配有相关案例，建议在学完对应理论后立即阅读案例，加深理解。</p>
    </div>
  </div>
</template>

<style scoped>
.capability-map {
  margin: 2rem 0;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
}

.capability-map h2 {
  margin-top: 0;
  font-size: 1.5rem;
}

.map-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.levels-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.level-section {
  position: relative;
}

.level-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.level-header:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.level-l1 {
  background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%);
  border-left: 4px solid #3b82f6;
}

.level-l2a {
  background: linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%);
  border-left: 4px solid #10b981;
}

.level-l2b {
  background: linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%);
  border-left: 4px solid #f59e0b;
}

.level-l2c {
  background: linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%);
  border-left: 4px solid #8b5cf6;
}

.level-l3 {
  background: linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%);
  border-left: 4px solid #ec4899;
}

.level-badge {
  font-size: 1.2rem;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  color: var(--vp-c-text-1);
}

.level-info h3 {
  margin: 0 0 4px 0;
  font-size: 1.1rem;
}

.level-meta {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}

.expand-icon {
  margin-left: auto;
  font-size: 1rem;
  color: var(--vp-c-text-2);
  opacity: 0.6;
  transition: all 0.2s ease;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 12px;
}

.course-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  text-decoration: none;
  transition: all 0.2s ease;
}

.course-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.course-card.done {
  border-color: #10b981;
  background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
}

.done-badge {
  font-size: 1.1rem;
  color: #10b981;
  font-weight: 700;
  margin-left: auto;
}

.course-icon {
  font-size: 1.4rem;
}

.course-info {
  flex: 1;
}

.course-code {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 2px;
}

.course-name {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.related-cases {
  padding: 12px 16px;
  background: var(--vp-c-bg-mute);
  border-radius: 8px;
  border: 1px dashed var(--vp-c-divider);
}

.cases-label {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.cases-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.case-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 16px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.case-tag:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

.case-module {
  font-size: 0.72rem;
  opacity: 0.7;
}

.level-arrow {
  text-align: center;
  font-size: 1.5rem;
  color: var(--vp-c-brand-1);
  padding: 8px 0;
  opacity: 0.5;
}

.map-footer {
  margin-top: 1.5rem;
  padding: 16px 20px;
  background: var(--vp-c-bg);
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.map-footer p {
  margin: 8px 0;
  line-height: 1.8;
  font-size: 0.92rem;
}

@media (max-width: 768px) {
  .courses-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
  
  .level-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
