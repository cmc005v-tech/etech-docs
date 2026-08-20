<script setup>
import { computed } from 'vue'

const props = defineProps({
  course1: { type: String, required: true },
  course2: { type: String, required: true },
})

// 课程数据映射（从 config.ts 提取）
const courseData = {
  'L2A-03': {
    code: 'L2A-03',
    name: '广告投放与 ROI',
    path: '/l2/a03-ads-roi',
    hours: '4学时',
    level: 'L2-A',
    difficulty: '中级',
    prerequisite: 'L1-08 数据驱动入门',
    desc: '掌握亚马逊/TikTok广告投放策略，优化ROI与ACOS指标',
    keyTopics: ['广告架构设计', '关键词竞价', 'ACOS优化', '归因分析'],
    suitableFor: '平台运营人员、广告投手',
    relatedCases: ['PO-02', 'PO-03'],
  },
  'L2B-07': {
    code: 'L2B-07',
    name: '品牌发布与冷启动',
    path: '/l2/b07-brand-launch',
    hours: '4学时',
    level: 'L2-B',
    difficulty: '中高级',
    prerequisite: 'L2B-06 独立站建站',
    desc: '从0到1完成品牌发布，实现首月破零与冷启动增长',
    keyTopics: ['品牌故事包装', '首发渠道选择', '种子用户获取', '冷启动策略'],
    suitableFor: '创业者、品牌负责人',
    relatedCases: ['BM-01', 'BM-04'],
  },
  'L2C-03': {
    code: 'L2C-03',
    name: '财务管控与经营分析',
    path: '/l2/c03-finance-control',
    hours: '6学时',
    level: 'L2-C',
    difficulty: '高级',
    prerequisite: 'L1-07 财务与成本认知',
    desc: '建立财务管控体系，通过经营分析驱动业务决策',
    keyTopics: ['财务报表解读', '成本控制模型', '盈亏平衡分析', '现金流管理'],
    suitableFor: '企业管理者、财务负责人',
    relatedCases: ['BE-02', 'BE-03'],
  },
  'L2C-05': {
    code: 'L2C-05',
    name: '供应链战略设计',
    path: '/l2/c05-supply-chain-strategy',
    hours: '4学时',
    level: 'L2-C',
    difficulty: '高级',
    prerequisite: 'L1-02 供应链全景认知',
    desc: '从战略高度设计供应链体系，支撑业务长期发展',
    keyTopics: ['供应链网络规划', '供应商管理体系', '库存策略设计', '风险管控机制'],
    suitableFor: '供应链总监、运营VP',
    relatedCases: ['SC-01', 'SC-03'],
  },
}

const c1 = computed(() => courseData[props.course1])
const c2 = computed(() => courseData[props.course2])

const getCaseLink = (caseId) => `/cases/${caseId.toLowerCase()}`
</script>

<template>
  <div v-if="c1 && c2" class="course-comparison">
    <div class="comparison-header">
      <div class="course-card left">
        <div class="course-badge">{{ c1.level }}</div>
        <h2>{{ c1.code }} {{ c1.name }}</h2>
        <div class="course-meta">
          <span>⏱️ {{ c1.hours }}</span>
          <span>📊 {{ c1.difficulty }}</span>
        </div>
      </div>

      <div class="vs-divider">VS</div>

      <div class="course-card right">
        <div class="course-badge">{{ c2.level }}</div>
        <h2>{{ c2.code }} {{ c2.name }}</h2>
        <div class="course meta">
          <span>⏱️ {{ c2.hours }}</span>
          <span>📊 {{ c2.difficulty }}</span>
        </div>
      </div>
    </div>

    <!-- 对比维度 -->
    <div class="comparison-dimensions">
      <!-- 课程描述 -->
      <div class="dimension">
        <h3>📖 课程定位</h3>
        <div class="dimension-content">
          <div class="dim-item left">{{ c1.desc }}</div>
          <div class="dim-item right">{{ c2.desc }}</div>
        </div>
      </div>

      <!-- 前置要求 -->
      <div class="dimension">
        <h3>🔗 前置要求</h3>
        <div class="dimension-content">
          <div class="dim-item left">{{ c1.prerequisite }}</div>
          <div class="dim-item right">{{ c2.prerequisite }}</div>
        </div>
      </div>

      <!-- 核心主题 -->
      <div class="dimension">
        <h3>🎯 核心主题</h3>
        <div class="dimension-content">
          <div class="dim-item left">
            <ul>
              <li v-for="topic in c1.keyTopics" :key="topic">{{ topic }}</li>
            </ul>
          </div>
          <div class="dim-item right">
            <ul>
              <li v-for="topic in c2.keyTopics" :key="topic">{{ topic }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 适用人群 -->
      <div class="dimension">
        <h3>👥 适用人群</h3>
        <div class="dimension-content">
          <div class="dim-item left">{{ c1.suitableFor }}</div>
          <div class="dim-item right">{{ c2.suitableFor }}</div>
        </div>
      </div>

      <!-- 相关案例 -->
      <div class="dimension">
        <h3>📚 配套案例</h3>
        <div class="dimension-content">
          <div class="dim-item left">
            <a v-for="caseId in c1.relatedCases" :key="caseId" :href="getCaseLink(caseId)" class="case-link">
              {{ caseId }}
            </a>
          </div>
          <div class="dim-item right">
            <a v-for="caseId in c2.relatedCases" :key="caseId" :href="getCaseLink(caseId)" class="case-link">
              {{ caseId }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 选课建议 -->
    <div class="recommendation">
      <h3>💡 选课建议</h3>
      <div class="rec-content">
        <p><strong>如果你关注平台运营能力提升：</strong>建议选择 <a :href="c1.path">{{ c1.code }} {{ c1.name }}</a>，适合在亚马逊/TikTok等平台深耕的运营人员。</p>
        <p><strong>如果你计划创业或负责品牌建设：</strong>建议选择 <a :href="c2.path">{{ c2.code }} {{ c2.name }}</a>，适合从0到1搭建品牌的创业者。</p>
        <p><strong>两门课可以互补学习：</strong>先学 {{ c1.code }} 掌握平台运营技巧，再学 {{ c2.code }} 理解品牌战略思维，形成完整能力闭环。</p>
      </div>
    </div>

    <div class="back-link">
      <a href="/courses/course-selection">← 返回课程选型指南</a>
    </div>
  </div>

  <div v-else class="error-msg">
    <p>⚠️ 课程数据未找到，请检查课程编码是否正确</p>
  </div>
</template>

<style scoped>
.course-comparison {
  margin: 2rem 0;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
}

.comparison-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: center;
  margin-bottom: 24px;
}

.course-card {
  padding: 20px;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
}

.course-card.left {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
}

.course-card.right {
  border-color: #8b5cf6;
  background: linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%);
}

.course-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.course-card h2 {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-1);
}

.course .meta {
  display: flex;
  gap: 12px;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}

.vs-divider {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  opacity: 0.6;
}

.comparison-dimensions {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dimension {
  padding: 16px;
  background: var(--vp-c-bg);
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.dimension h3 {
  margin: 0 0 12px 0;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.dimension-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.dim-item {
  font-size: 0.92rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

.dim-item ul {
  margin: 0;
  padding-left: 20px;
}

.dim-item li {
  margin: 4px 0;
}

.case-link {
  display: inline-block;
  padding: 4px 10px;
  margin: 4px 4px 4px 0;
  border-radius: 6px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.case-link:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

.recommendation {
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%);
  border-radius: 12px;
  border-left: 4px solid #f59e0b;
}

.recommendation h3 {
  margin: 0 0 12px 0;
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
}

.rec-content p {
  margin: 8px 0;
  line-height: 1.8;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
}

.rec-content a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.rec-content a:hover {
  text-decoration: underline;
}

.back-link {
  margin-top: 20px;
  text-align: center;
}

.back-link a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.back-link a:hover {
  text-decoration: underline;
}

.error-msg {
  padding: 40px;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

@media (max-width: 768px) {
  .comparison-header {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .vs-divider {
    text-align: center;
    padding: 8px 0;
  }

  .dimension-content {
    grid-template-columns: 1fr;
  }
}
</style>
