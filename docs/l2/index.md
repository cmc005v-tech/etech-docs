---
title: L2 分路径选修课
description: 运营精进 / 创业实战 / 管理升级 三条路径，65 课时 24 门课
outline: deep
---

<script setup>
import { ref } from 'vue'

const activePath = ref('all')

const paths = [
  { key: 'all', label: '全部路径', icon: '📚' },
  { key: 'A', label: 'L2-A 运营精进', icon: '🚀', color: '#3b82f6', desc: '适合有 1-2 年运营经验的卖家，系统提升平台运营能力', hours: 24, courses: 9 },
  { key: 'B', label: 'L2-B 创业实战', icon: '', color: '#10b981', desc: '适合从 0 到 1 的创业卖家，覆盖选品到启动全流程', hours: 22, courses: 8 },
  { key: 'C', label: 'L2-C 管理升级', icon: '', color: '#8b5cf6', desc: '适合企业管理者，聚焦战略决策与体系建设', hours: 19, courses: 7 },
]

const courses = [
  // L2-A 运营精进
  { id: 'L2A-01', path: 'A', title: '平台算法深度解析与流量获取', hours: 3, desc: 'A9→COSMO→RUFUS 算法演进，自然/广告/品牌/社媒四维流量获取策略', link: '/l2/a01-algorithm-traffic' },
  { id: 'L2A-02', path: 'A', title: 'Listing 高阶优化与 CRO 转化', hours: 3, desc: 'COSMO 算法下的 Listing 场景化改造、A/B 测试、A+ 页面、AI 虚拟模特', link: '/l2/a02-listing-cro' },
  { id: 'L2A-03', path: 'A', title: '广告投放策略与 ROI 优化', hours: 3, desc: 'SP/SB/SD/DSP 广告体系搭建、四象限分析法、ACOS 优化、AMC 营销云', link: '/l2/a03-ads-roi' },
  { id: 'L2A-04', path: 'A', title: 'AI 辅助运营实操', hours: 2, desc: 'AI 三阶段落地 SOP、AI 文案/图片/数据分析工具实操、AI Agent 自主运营', link: '/l2/a04-ai-ops' },
  { id: 'L2A-05', path: 'A', title: '数据驱动运营决策', hours: 3, desc: '五维数据看板、跨模块指标整合、AI 辅助分析、周度/月度复盘机制', link: '/l2/a05-data-driven' },
  { id: 'L2A-06', path: 'A', title: '社媒内容运营与 KOL 合作', hours: 2, desc: 'TikTok 内容工业化 SOP、达人分层合作、直播转化、短视频种草策略', link: '/l2/a06-social-kol' },
  { id: 'L2A-07', path: 'A', title: '库存与供应链运营协同', hours: 2, desc: 'SKU 分级管理 SOP、补货计划模型、呆滞库存处置、供应商管理', link: '/l2/a07-inventory-scm' },
  { id: 'L2A-08', path: 'A', title: '运营合规实操', hours: 2, desc: '知识产权 SOP 五步法、合规日历化、TRO 应对、图片版权核查', link: '/l2/a08-compliance-ops' },
  { id: 'L2A-09', path: 'A', title: '物流运营操作', hours: 2, desc: 'FBA 后台操作、头程物流选择、海外仓管理、退货逆向物流', link: '/l2/a09-logistics-ops' },

  // L2-B 创业实战
  { id: 'L2B-01', path: 'B', title: '选品与市场调研', hours: 3, desc: '数据驱动选品五步法、市场容量评估、竞争格局分析、利润模型测算', link: '/l2/b01-product-research' },
  { id: 'L2B-02', path: 'B', title: '供应链从 0 搭建', hours: 3, desc: '供应商筛选与谈判、MOQ 策略、样品验证、首单下单与质量管控', link: '/l2/b02-supply-chain-setup' },
  { id: 'L2B-03', path: 'B', title: '国内主体税务合规实操', hours: 4, desc: '个体户/公司税务选择、核定征收边界、出口退税流程、个人收款合规', link: '/l2/b03-tax-compliance' },
  { id: 'L2B-04', path: 'B', title: '海外合规快速通道', hours: 3, desc: 'CE/FCC/UKCA 认证流程、商标注册、产品合规检查清单、平台合规要求', link: '/l2/b04-overseas-compliance' },
  { id: 'L2B-05', path: 'B', title: '资金链管理与外汇风控', hours: 3, desc: '创业资金规划、现金流测算、外汇风险管理、收款渠道选择', link: '/l2/b05-finance-fx' },
  { id: 'L2B-06', path: 'B', title: '创业团队搭建与分工', hours: 2, desc: '初创团队岗位设计、KPI 设定、招聘核查清单、合伙人机制', link: '/l2/b06-team-building' },
  { id: 'L2B-07', path: 'B', title: '0-1 品牌启动与冷启动', hours: 2, desc: '品牌定位画布、独立站搭建、冷启动流量策略、首批用户获取', link: '/l2/b07-brand-launch' },
  { id: 'L2B-08', path: 'B', title: '多平台快速启动', hours: 2, desc: '亚马逊/TikTok/Temu 多平台同步上线、资源分配、优先级排序', link: '/l2/b08-multi-platform' },

  // L2-C 管理升级
  { id: 'L2C-01', path: 'C', title: '跨境电商战略认知', hours: 3, desc: 'K 型分化深层逻辑、行业趋势研判、企业战略定位、竞争格局分析', link: '/l2/c01-strategy' },
  { id: 'L2C-02', path: 'C', title: '跨境团队组织架构与绩效管理', hours: 3, desc: 'T 型人才模型、品类小前台、KPI 价值导向、AI 时代岗位变化', link: '/l2/c02-organization' },
  { id: 'L2C-03', path: 'C', title: '跨境企业财务管控与经营分析', hours: 3, desc: '财务三表解读、经营分析框架、预算管控、资金健康度诊断', link: '/l2/c03-finance-digital' },
  { id: 'L2C-04', path: 'C', title: '全链路风控体系搭建', hours: 3, desc: '六大风险维度识别、预警指标体系、三级响应机制、合规内嵌战略', link: '/l2/c04-compliance-strategy' },
  { id: 'L2C-05', path: 'C', title: '供应链战略与库存管理', hours: 3, desc: '分层混合履约战略、轴辐式仓网、数字化转型、三年战略规划', link: '/l2/c05-supply-chain-strategy' },
  { id: 'L2C-06', path: 'C', title: '品牌战略与全域增长管理', hours: 2, desc: '品牌溢价构建、全域流量分工、独立站品牌资产、长期增长飞轮', link: '/l2/c06-brand-strategy' },
  { id: 'L2C-07', path: 'C', title: '数字化转型与 AI 赋能', hours: 2, desc: '三层数字化架构、AI Agent 自主运营、投入产出评估、选型决策', link: '/l2/c07-digital-ai' },
]

const filteredCourses = (path) => {
  if (path === 'all') return courses
  return courses.filter(c => c.path === path)
}

const pathColor = (p) => {
  const map = { A: '#3b82f6', B: '#10b981', C: '#8b5cf6' }
  return map[p] || '#6b7280'
}

const pathLabel = (p) => {
  const map = { A: 'L2-A 运营精进', B: 'L2-B 创业实战', C: 'L2-C 管理升级' }
  return map[p] || p
}
</script>

# L2 分路径选修课

<CourseGrid :columns="4" :items="[
  { label: 'L2-A 运营精进', value: '24 课时 · 9 门课', color: 'blue' },
  { label: 'L2-B 创业实战', value: '22 课时 · 8 门课', color: 'green' },
  { label: 'L2-C 管理升级', value: '19 课时 · 7 门课', color: 'purple' },
  { label: '总计', value: '65 课时 · 24 门课', color: 'orange' },
]" />

---

## 路径选择指南

<div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:20px;">
  <button v-for="p in paths" :key="p.key" @click="activePath = p.key" :style="{ padding: '10px 20px', borderRadius: '24px', border: activePath === p.key ? '2px solid ' + (p.color || '#3b82f6') : '1px solid #d1d5db', background: activePath === p.key ? ((p.color || '#3b82f6') + '10') : '#fff', cursor: 'pointer', fontSize: '15px', fontWeight: activePath === p.key ? '600' : '400', color: activePath === p.key ? (p.color || '#3b82f6') : '#374151' }">{{ p.icon }} {{ p.label }}<span v-if="p.hours" style="font-size:12px; opacity:0.7; margin-left:6px;">{{ p.hours }}课时 · {{ p.courses }}门</span></button>
</div>

<div v-if="activePath !== 'all'" style="background:#f9fafb; border-radius:12px; padding:16px; margin-bottom:24px; font-size:14px; color:#4b5563;">
  {{ paths.find(p => p.key === activePath)?.desc }}
</div>

---

## 课程列表

<div v-for="c in filteredCourses(activePath)" :key="c.id" style="border:1px solid #e5e7eb; border-radius:12px; padding:16px; margin-bottom:12px; background:#fafbfc;">

### <a :href="c.link" style="color:#1d4ed8; text-decoration:none;">{{ c.id }} {{ c.title }}</a>

<div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:8px; font-size:13px; color:#6b7280;">
  <span :style="{ background: pathColor(c.path) + '15', color: pathColor(c.path), padding: '2px 10px', borderRadius: '12px', fontWeight: '500' }">{{ pathLabel(c.path) }}</span>
  <span style="background:#f3f4f6; padding:2px 10px; border-radius:12px;">{{ c.hours }} 课时</span>
</div>

{{ c.desc }}

</div>

---

## 学习建议

## 免费试听

| 试听课时 | 所属课程 | 内容看点 |
|---------|---------|----------|
| [L2A-01 第1课时：算法演进与流量结构](/l2/a01-sample-lesson) | L2-A 运营精进 | A9→COSMO→RUFUS 三代演进、四类流量健康占比、COSMO 三维标签 |
| [L2B-01 第1课时：选品方法论与市场分析](/l2/b01-sample-lesson) | L2-B 创业实战 | 创业四阶段路线图、数据驱动选品五步法、TAM-SAM-SOM 三层测算 |
| [L2C-01 第1课时：跨境电商战略定位](/l2/c01-sample-lesson) | L2-C 管理升级 | K 型分化深层解读、战略定位三维度、商业模式画布九要素 |

::: tip 路径选择原则
- **L2-A 运营精进**：已有 1-2 年运营经验，希望系统提升平台运营能力、广告 ROI、数据驱动决策
- **L2-B 创业实战**：从 0 到 1 的创业卖家，需要覆盖选品、供应链、合规、品牌、资金等全流程
- **L2-C 管理升级**：企业管理者/团队负责人，聚焦战略决策、组织建设、风控体系、数字化转型
:::

::: info 学习顺序
建议先完成 **L1 必修基础层**（22 课时），再根据自身的业务阶段选择对应的 L2 路径。三条路径可以并行学习，也可以按优先级依次推进。
:::

<LastUpdated />

<ContentNotice />
