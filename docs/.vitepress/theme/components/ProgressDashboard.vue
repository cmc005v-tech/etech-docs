<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const STORAGE_KEY = 'course-study-progress'

interface CourseDef {
  id: string
  title: string
  link: string
}

interface GroupDef {
  name: string
  color: string
  courses: CourseDef[]
}

const groups: GroupDef[] = [
  {
    name: 'L1 必修基础层',
    color: '#3b82f6',
    courses: [
      { id: 'l1-01', title: 'L1-01 商业逻辑总览', link: '/l1/01-business-logic' },
      { id: 'l1-02', title: 'L1-02 供应链全景认知', link: '/l1/02-supply-chain' },
      { id: 'l1-03', title: 'L1-03 品牌出海 DTC 框架', link: '/l1/03-brand-dtc' },
      { id: 'l1-04', title: 'L1-04 平台运营核心逻辑', link: '/l1/04-platform-ops' },
      { id: 'l1-05', title: 'L1-05 物流与履约基础', link: '/l1/05-logistics' },
      { id: 'l1-06', title: 'L1-06 合规风险地图', link: '/l1/06-compliance' },
      { id: 'l1-07', title: 'L1-07 财务与成本认知', link: '/l1/07-finance-cost' },
      { id: 'l1-08', title: 'L1-08 数据驱动入门', link: '/l1/08-data-driven' },
    ],
  },
  {
    name: 'L2-A 运营精进',
    color: '#10b981',
    courses: [
      { id: 'l2a-01', title: 'L2A-01 算法与流量获取', link: '/l2/a01-algorithm-traffic' },
      { id: 'l2a-02', title: 'L2A-02 Listing 与 CRO', link: '/l2/a02-listing-cro' },
      { id: 'l2a-03', title: 'L2A-03 广告投放与 ROI', link: '/l2/a03-ads-roi' },
      { id: 'l2a-04', title: 'L2A-04 AI 辅助运营', link: '/l2/a04-ai-ops' },
      { id: 'l2a-05', title: 'L2A-05 数据驱动决策', link: '/l2/a05-data-driven' },
      { id: 'l2a-06', title: 'L2A-06 社媒与 KOL', link: '/l2/a06-social-kol' },
      { id: 'l2a-07', title: 'L2A-07 库存与供应链协同', link: '/l2/a07-inventory-scm' },
      { id: 'l2a-08', title: 'L2A-08 运营合规实操', link: '/l2/a08-compliance-ops' },
      { id: 'l2a-09', title: 'L2A-09 物流运营操作', link: '/l2/a09-logistics-ops' },
    ],
  },
  {
    name: 'L2-B 创业实战',
    color: '#f59e0b',
    courses: [
      { id: 'l2b-01', title: 'L2B-01 选品与市场调研', link: '/l2/b01-product-research' },
      { id: 'l2b-02', title: 'L2B-02 供应链从 0 搭建', link: '/l2/b02-supply-chain-setup' },
      { id: 'l2b-03', title: 'L2B-03 国内税务合规', link: '/l2/b03-tax-compliance' },
      { id: 'l2b-04', title: 'L2B-04 海外合规快速通道', link: '/l2/b04-overseas-compliance' },
      { id: 'l2b-05', title: 'L2B-05 资金链与外汇风控', link: '/l2/b05-finance-fx' },
      { id: 'l2b-06', title: 'L2B-06 创业团队搭建', link: '/l2/b06-team-building' },
      { id: 'l2b-07', title: 'L2B-07 品牌启动与冷启动', link: '/l2/b07-brand-launch' },
      { id: 'l2b-08', title: 'L2B-08 多平台快速启动', link: '/l2/b08-multi-platform' },
    ],
  },
  {
    name: 'L2-C 管理升级',
    color: '#8b5cf6',
    courses: [
      { id: 'l2c-01', title: 'L2C-01 战略规划与商业模式', link: '/l2/c01-strategy' },
      { id: 'l2c-02', title: 'L2C-02 团队组织与绩效', link: '/l2/c02-organization' },
      { id: 'l2c-03', title: 'L2C-03 财务管控与经营分析', link: '/l2/c03-finance-digital' },
      { id: 'l2c-04', title: 'L2C-04 全链路风控体系', link: '/l2/c04-compliance-strategy' },
      { id: 'l2c-05', title: 'L2C-05 供应链战略与库存', link: '/l2/c05-supply-chain-strategy' },
      { id: 'l2c-06', title: 'L2C-06 品牌战略与全域增长', link: '/l2/c06-brand-strategy' },
      { id: 'l2c-07', title: 'L2C-07 数字化转型与 AI 赋能', link: '/l2/c07-digital-ai' },
    ],
  },
  {
    name: 'L3 毕业项目',
    color: '#ef4444',
    courses: [
      { id: 'l3-a', title: 'L3-A 运营操盘手毕业项目', link: '/l3/l3a-operations-project' },
      { id: 'l3-b', title: 'L3-B 创业实战沙盘', link: '/l3/l3b-startup-sandbox' },
      { id: 'l3-c', title: 'L3-C 战略决策模拟', link: '/l3/l3c-strategy-simulation' },
    ],
  },
]

const doneMap = ref<Record<string, { title?: string; at?: string }>>({})
const total = groups.reduce((acc, g) => acc + g.courses.length, 0)

const load = () => {
  try {
    doneMap.value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    doneMap.value = {}
  }
}

const isDone = (id: string) => !!doneMap.value[id]
const groupDone = (g: GroupDef) => g.courses.filter(c => isDone(c.id)).length
const totalDone = computed(() => Object.keys(doneMap.value).filter(id => groups.some(g => g.courses.some(c => c.id === id))).length)
const percent = computed(() => Math.round((totalDone.value / total) * 100))

const clearAll = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    doneMap.value = {}
  } catch {
    /* 忽略 */
  }
}

onMounted(load)
</script>

<template>
  <div class="progress-board">
    <div class="progress-summary">
      <div class="progress-summary-text">
        <strong>总进度：{{ totalDone }} / {{ total }} 门课</strong>
        <span class="progress-percent">{{ percent }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fill" :style="{ width: percent + '%' }"></div>
      </div>
      <button class="progress-clear" @click="clearAll">清空全部进度</button>
    </div>

    <div v-for="g in groups" :key="g.name" class="progress-group">
      <div class="progress-group-header">
        <span class="progress-group-dot" :style="{ background: g.color }"></span>
        <span class="progress-group-name">{{ g.name }}</span>
        <span class="progress-group-count">{{ groupDone(g) }} / {{ g.courses.length }}</span>
      </div>
      <div class="progress-group-list">
        <a
          v-for="c in g.courses"
          :key="c.id"
          :href="c.link"
          class="progress-course"
          :class="{ 'progress-course--done': isDone(c.id) }"
        >
          <span class="progress-course-check">{{ isDone(c.id) ? '✅' : '☐' }}</span>
          <span class="progress-course-title">{{ c.title }}</span>
          <span v-if="isDone(c.id) && doneMap[c.id]?.at" class="progress-course-date">{{ doneMap[c.id].at }}</span>
        </a>
      </div>
    </div>
  </div>
</template>
