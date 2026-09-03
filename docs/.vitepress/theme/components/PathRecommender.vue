<script setup>
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'

const step = ref(0)
const answers = ref({})

const questions = [
  {
    id: 'experience',
    title: '你的跨境电商从业经验？',
    options: [
      { value: 'zero', label: '零基础 / 转行者', desc: '还没入行，想了解全貌' },
      { value: 'junior', label: '1-2 年运营经验', desc: '有实操，想系统提升' },
      { value: 'senior', label: '3 年+ 深度从业', desc: '经验丰富，关注战略决策' },
    ],
  },
  {
    id: 'goal',
    title: '你的核心学习目标？',
    options: [
      { value: 'ops', label: '运营精进', desc: '提升广告 ROI、数据驱动、流量获取' },
      { value: 'startup', label: '独立创业', desc: '从 0 到 1 搭建跨境生意' },
      { value: 'manage', label: '团队管理', desc: '组织建设、战略决策、风控体系' },
    ],
  },
  {
    id: 'time',
    title: '每周可投入学习时间？',
    options: [
      { value: 'full', label: '20 小时+', desc: '全职学习或学期制' },
      { value: 'part', label: '10-15 小时', desc: '周末制，边工作边学' },
      { value: 'intense', label: '集中 5-7 天', desc: '短期密集集训' },
    ],
  },
]

const currentQ = computed(() => questions[step.value])

const result = computed(() => {
  const { experience, goal, time } = answers.value
  if (!experience || !goal || !time) return null

  // 推荐逻辑
  if (experience === 'zero') {
    return {
      path: 'L1 必修基础层 → L2 选修路径',
      code: 'l1-l2',
      duration: time === 'full' ? '4-6 个月' : '6-9 个月',
      rhythm: time === 'full' ? '学期制 16-18 周' : '周末制 10-12 周',
      courses: [
        { name: 'L1-01 商业逻辑总览', link: '/l1/01-business-logic', reason: '建立行业体感：2.75 万亿、K 型分化、90-97% 成本结构' },
        { name: 'L1-02 供应链全景认知', link: '/l1/02-supply-chain', reason: '理解九大环节与四种履约模式' },
        { name: 'L1-04 平台运营核心逻辑', link: '/l1/04-platform-ops', reason: '四大平台格局与选型决策框架' },
        { name: 'L1-06 合规风险地图', link: '/l1/06-compliance', reason: '合规是生存前提，不是选修' },
      ],
      nextStep: '完成 L1 后，根据目标选择 L2-A/B/C 路径深入',
    }
  }

  if (experience === 'junior') {
    if (goal === 'ops') {
      return {
        path: 'L1 加速 → L2-A 运营精进',
        code: 'l2a',
        duration: time === 'part' ? '4-5 个月' : '3-4 个月',
        rhythm: '周末制 8-10 周',
        courses: [
          { name: 'L2A-01 平台算法与流量', link: '/l2/a01-algorithm-traffic', reason: 'A9→COSMO→RUFUS 三代算法，四维流量获取' },
          { name: 'L2A-03 广告投放与 ROI', link: '/l2/a03-ads-roi', reason: 'SP/SB/SD/DSP 体系，ACOS 优化' },
          { name: 'L2A-05 数据驱动决策', link: '/l2/a05-data-driven', reason: '五维看板 + AI 辅助分析' },
          { name: 'L2A-04 AI 辅助运营实操', link: '/l2/a04-ai-ops', reason: 'AI Agent 自主运营，效率倍增' },
        ],
        nextStep: '完成 L2-A 后可进阶 L3-A 运营操盘手毕业项目',
      }
    }
    if (goal === 'startup') {
      return {
        path: 'L1 加速 → L2-B 创业实战',
        code: 'l2b',
        duration: time === 'part' ? '4-6 个月' : '3-5 个月',
        rhythm: '周末制 8-10 周',
        courses: [
          { name: 'L2B-01 选品与市场调研', link: '/l2/b01-product-research', reason: '数据驱动选品五步法 + TAM-SAM-SOM' },
          { name: 'L2B-02 供应链从 0 搭建', link: '/l2/b02-supply-chain-setup', reason: '供应商筛选、MOQ 策略、首单管控' },
          { name: 'L2B-03 国内税务合规', link: '/l2/b03-tax-compliance', reason: '个体户/公司税务选择、出口退税' },
          { name: 'L2B-05 资金链与外汇风控', link: '/l2/b05-finance-fx', reason: '创业资金规划、现金流测算' },
        ],
        nextStep: '完成 L2-B 后可进阶 L3-B 创业实战沙盘',
      }
    }
    // goal === 'manage' but junior experience
    return {
      path: 'L1 加速 → L2-C 管理升级',
      code: 'l2c',
      duration: '3-4 个月',
      rhythm: '密集制 6-8 周',
      courses: [
        { name: 'L2C-01 战略规划与商业模式', link: '/l2/c01-strategy', reason: 'K 型分化、战略定位三维度、护城河理论' },
        { name: 'L2C-02 团队组织与绩效管理', link: '/l2/c02-organization', reason: 'T 型人才、品类小前台、KPI 价值导向' },
        { name: 'L2C-04 全链路风控体系', link: '/l2/c04-compliance-strategy', reason: '六大风险维度、三级响应机制' },
        { name: 'L2C-07 数字化转型与 AI', link: '/l2/c07-digital-ai', reason: '三层架构、AI Agent、选型决策' },
      ],
      nextStep: '完成 L2-C 后可进阶 L3-C 战略决策模拟',
    }
  }

  // senior experience
  if (goal === 'manage') {
    return {
      path: 'L2-C 管理升级（可跳过 L1）',
      code: 'l2c-fast',
      duration: time === 'intense' ? '5-7 天' : '2-3 个月',
      rhythm: time === 'intense' ? '密集集训制' : '周末制 6-8 周',
      courses: [
        { name: 'L2C-01 战略规划与商业模式', link: '/l2/c01-strategy', reason: '战略定位三维度、护城河五类型' },
        { name: 'L2C-05 供应链战略与库存', link: '/l2/c05-supply-chain-strategy', reason: '分层混合履约、轴辐式仓网' },
        { name: 'L2C-06 品牌战略与全域增长', link: '/l2/c06-brand-strategy', reason: '品牌溢价、全域流量分工' },
      ],
      nextStep: '直接进阶 L3-C 战略决策模拟',
    }
  }
  if (goal === 'ops') {
    return {
      path: 'L2-A 运营精进（选修补课）',
      code: 'l2a-fast',
      duration: time === 'intense' ? '5-7 天' : '2-3 个月',
      rhythm: time === 'intense' ? '密集集训制' : '周末制 6-8 周',
      courses: [
        { name: 'L2A-01 平台算法与流量', link: '/l2/a01-algorithm-traffic', reason: '算法三代演进、COSMO 三维标签' },
        { name: 'L2A-03 广告投放与 ROI', link: '/l2/a03-ads-roi', reason: '四象限分析法、AMC 营销云' },
        { name: 'L2A-05 数据驱动决策', link: '/l2/a05-data-driven', reason: '五维看板、跨模块指标整合' },
      ],
      nextStep: '直接进阶 L3-A 运营操盘手毕业项目',
    }
  }
  // senior + startup
  return {
    path: 'L2-B 创业实战 + L3-B 沙盘',
    code: 'l2b-l3b',
    duration: '2-3 个月',
    rhythm: '密集制',
    courses: [
      { name: 'L2B-01 选品与市场调研', link: '/l2/b01-product-research', reason: '八维红绿灯决策矩阵' },
      { name: 'L2B-05 资金链与外汇风控', link: '/l2/b05-finance-fx', reason: '创业资金规划、外汇三道防线' },
      { name: 'L3-B 创业实战沙盘', link: '/l3/l3b-startup-sandbox', reason: '四轮推演、导师+AI 双评分' },
    ],
    nextStep: '完成沙盘推演后直接启动创业项目',
  }
})

function select(value) {
  answers.value[currentQ.value.id] = value
  if (step.value < questions.length - 1) {
    step.value++
  }
}

function reset() {
  step.value = 0
  answers.value = {}
}
</script>

<template>
  <div class="recommender">
    <!-- 进度条 -->
    <div class="progress-bar">
      <div
        v-for="(_, i) in questions"
        :key="i"
        class="progress-step"
        :class="{ active: i === step, done: i < step || result }"
      >
        {{ i < step || result ? '✓' : i + 1 }}
      </div>
    </div>

    <!-- 问题阶段 -->
    <div v-if="!result" class="question-card">
      <h3>{{ currentQ.title }}</h3>
      <div class="options">
        <button
          v-for="opt in currentQ.options"
          :key="opt.value"
          class="option-btn"
          @click="select(opt.value)"
        >
          <span class="option-label">{{ opt.label }}</span>
          <span class="option-desc">{{ opt.desc }}</span>
        </button>
      </div>
    </div>

    <!-- 结果阶段 -->
    <div v-else class="result-card">
      <h3>🎯 推荐学习路径</h3>
      <div class="path-name">{{ result.path }}</div>

      <div class="meta-row">
        <span class="meta-item">⏱ 预计周期：<strong>{{ result.duration }}</strong></span>
        <span class="meta-item">📅 学习节奏：<strong>{{ result.rhythm }}</strong></span>
      </div>

      <h4>推荐首修课程</h4>
      <div class="course-list">
        <a
          v-for="c in result.courses"
          :key="c.link"
          :href="withBase(c.link)"
          class="course-link"
        >
          <span class="course-name">{{ c.name }}</span>
          <span class="course-reason">{{ c.reason }}</span>
        </a>
      </div>

      <div class="next-step">
        <strong>下一步：</strong>{{ result.nextStep }}
      </div>

      <button class="reset-btn" @click="reset">重新测评</button>
    </div>
  </div>
</template>

<style scoped>
.recommender {
  max-width: 640px;
  margin: 0 auto;
  padding: 1.5rem 0;
}

.progress-bar {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 2rem;
}

.progress-step {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  border: 2px solid #d1d5db;
  color: #9ca3af;
  background: #fff;
  transition: all 0.3s;
}

.progress-step.active {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #eff6ff;
}

.progress-step.done {
  border-color: #10b981;
  color: #fff;
  background: #10b981;
}

.question-card {
  text-align: center;
}

.question-card h3 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fafbfc;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.option-btn:hover {
  border-color: #3b82f6;
  background: #eff6ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.option-label {
  font-weight: 600;
  font-size: 15px;
  color: #1f2937;
  margin-bottom: 4px;
}

.option-desc {
  font-size: 13px;
  color: #6b7280;
}

.result-card {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 16px;
  padding: 2rem;
}

.result-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #166534;
}

.path-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #15803d;
  margin-bottom: 1rem;
  padding: 12px 16px;
  background: #dcfce7;
  border-radius: 8px;
}

.meta-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  font-size: 14px;
  color: #374151;
}

.result-card h4 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: #1f2937;
}

.course-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1.5rem;
}

.course-link {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #fff;
  text-decoration: none;
  transition: all 0.2s;
}

.course-link:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}

.course-name {
  font-weight: 600;
  color: #1d4ed8;
  margin-bottom: 4px;
}

.course-reason {
  font-size: 13px;
  color: #6b7280;
}

.next-step {
  padding: 12px 16px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
  font-size: 14px;
  color: #374151;
}

.reset-btn {
  display: block;
  margin: 0 auto;
  padding: 10px 24px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  color: #6b7280;
  transition: all 0.2s;
}

.reset-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}
</style>
