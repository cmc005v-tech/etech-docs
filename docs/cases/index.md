---
title: 跨境电商课程案例库
description: 40个真实商业案例，覆盖供应链、平台运营、品牌管理、合规风控、物流履约、商业本质六大领域
outline: deep
---

<script setup>
import { ref, computed, onMounted } from 'vue'
import { cases } from './caseData.js'

const STORAGE_KEY = 'case-favorites'
const activeModule = ref('all')
const activeType = ref('all')
const searchQuery = ref('')
const activeScale = ref('all')
const activeYear = ref('all')
const favorites = ref([])

// 加载收藏列表
const loadFavorites = () => {
  try {
    favorites.value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    favorites.value = []
  }
}

// 切换收藏状态
const toggleFavorite = (caseId) => {
  const index = favorites.value.indexOf(caseId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(caseId)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
}

const isFavorite = (caseId) => favorites.value.includes(caseId)

const modules = [
  { key: 'all', label: '全部领域', icon: '📚' },
  { key: 'supply', label: '供应链管理', icon: '🏭' },
  { key: 'platform', label: '平台运营', icon: '🛒' },
  { key: 'brand', label: '海外品牌管理', icon: '🏷️' },
  { key: 'compliance', label: '合规管理', icon: '⚖️' },
  { key: 'logistics', label: '物流履约', icon: '🚢' },
  { key: 'strategy', label: '商业本质', icon: '🧭' },
]

const typeFilters = [
  { key: 'all', label: '全部类型' },
  { key: 'success', label: '✅ 正面成功' },
  { key: 'failure', label: '❌ 反面失败' },
  { key: 'trend', label: '📊 趋势/综合' },
]

const filteredCases = computed(() => {
  return cases.filter(c => {
    const moduleMatch = activeModule.value === 'all' || c.module === activeModule.value
    const typeMatch = activeType.value === 'all' || c.type === activeType.value
    const scaleMatch = activeScale.value === 'all' || c.scale.includes(activeScale.value)
    const yearMatch = activeYear.value === 'all' || c.year === activeYear.value
    const searchMatch = !searchQuery.value || 
      c.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    return moduleMatch && typeMatch && scaleMatch && yearMatch && searchMatch
  })
})

const typeLabel = (t) => {
  const map = { success: '✅ 正面成功', failure: '❌ 反面失败', trend: ' 趋势/综合' }
  return map[t] || t
}

const moduleLabel = (m) => {
  const map = { supply: '供应链管理', platform: '平台运营', brand: '海外品牌管理', compliance: '合规管理', logistics: '物流履约', strategy: '商业本质' }
  return map[m] || m
}

const stats = computed(() => {
  const s = { total: cases.length, success: 0, failure: 0, trend: 0 }
  cases.forEach(c => { if (c.type === 'success') s.success++; else if (c.type === 'failure') s.failure++; else s.trend++ })
  return s
})

// 提取体量和年份选项
const scaleOptions = computed(() => {
  const scales = new Set()
  cases.forEach(c => {
    if (c.scale.includes('大卖家')) scales.add('大卖家')
    else if (c.scale.includes('中型')) scales.add('中型卖家')
    else if (c.scale.includes('中小')) scales.add('中小卖家')
    else if (c.scale.includes('初创')) scales.add('初创')
  })
  return ['all', ...Array.from(scales)]
})

const yearOptions = computed(() => {
  const years = new Set()
  cases.forEach(c => {
    const year = c.year.split('-')[0] // 取起始年份
    years.add(year)
  })
  return ['all', ...Array.from(years).sort().reverse()]
})

onMounted(() => {
  loadFavorites()
})
</script>

# 跨境电商课程案例库

<CourseGrid :columns="5" :items="[
  { label: '案例总数', value: stats.total + ' 个', color: 'blue' },
  { label: '正面成功', value: stats.success + ' 个', color: 'green' },
  { label: '反面失败', value: stats.failure + ' 个', color: 'red' },
  { label: '趋势/综合', value: stats.trend + ' 个', color: 'purple' },
  { label: '覆盖领域', value: '6 大模块', color: 'orange' },
]" />

---

## 案例筛选

<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px;">
  <button v-for="m in modules" :key="m.key" @click="activeModule = m.key" :style="{ padding: '6px 14px', borderRadius: '20px', border: activeModule === m.key ? '2px solid #3b82f6' : '1px solid #d1d5db', background: activeModule === m.key ? '#eff6ff' : '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: activeModule === m.key ? '600' : '400', color: activeModule === m.key ? '#1d4ed8' : '#374151' }">{{ m.icon }} {{ m.label }}</button>
</div>

<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:20px;">
  <button v-for="t in typeFilters" :key="t.key" @click="activeType = t.key" :style="{ padding: '6px 14px', borderRadius: '20px', border: activeType === t.key ? '2px solid #3b82f6' : '1px solid #d1d5db', background: activeType === t.key ? '#eff6ff' : '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: activeType === t.key ? '600' : '400', color: activeType === t.key ? '#1d4ed8' : '#374151' }">{{ t.label }}</button>
</div>

<div style="margin-bottom:20px;">
  <input v-model="searchQuery" placeholder="🔍 搜索案例（标题/摘要/编号）..." :style="{ width: '100%', padding: '10px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }" />
</div>

<!-- 高级筛选 -->
<div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:20px; padding:16px; background:#f9fafb; border-radius:10px; border:1px solid #e5e7eb;">
  <div style="flex:1; min-width:200px;">
    <label style="font-size:13px; font-weight:600; color:#374151; display:block; margin-bottom:6px;">📊 企业体量</label>
    <select v-model="activeScale" :style="{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px' }">
      <option value="all">全部体量</option>
      <option v-for="scale in scaleOptions" v-if="scale !== 'all'" :key="scale" :value="scale">{{ scale }}</option>
    </select>
  </div>
  <div style="flex:1; min-width:200px;">
    <label style="font-size:13px; font-weight:600; color:#374151; display:block; margin-bottom:6px;">📅 案例年份</label>
    <select v-model="activeYear" :style="{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px' }">
      <option value="all">全部年份</option>
      <option v-for="year in yearOptions" v-if="year !== 'all'" :key="year" :value="year">{{ year }}</option>
    </select>
  </div>
  <div style="flex:1; min-width:200px;">
    <label style="font-size:13px; font-weight:600; color:#374151; display:block; margin-bottom:6px;">⭐ 我的收藏</label>
    <button @click="activeModule = 'all'; activeType = 'all'; activeScale = 'all'; activeYear = 'all'; searchQuery = ''" :style="{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', background: favorites.length > 0 ? '#fef3c7' : '#fff', fontSize: '14px', cursor: 'pointer' }">
      {{ favorites.length > 0 ? `查看收藏 (${favorites.length})` : '暂无收藏' }}
    </button>
  </div>
</div>

<div v-if="filteredCases.length === 0" style="text-align:center; padding:40px; color:#6b7280;">
  当前筛选条件下暂无案例
</div>

<div v-for="c in filteredCases" :key="c.id" :id="c.id" style="border:1px solid #e5e7eb; border-radius:12px; padding:20px; margin-bottom:16px; background:#fafbfc; position:relative;">
  <!-- 收藏按钮 -->
  <button @click="toggleFavorite(c.id)" :style="{ position:'absolute', top:'12px', right:'12px', padding:'6px 10px', borderRadius:'8px', border:'none', background: isFavorite(c.id) ? '#fef3c7' : 'transparent', cursor:'pointer', fontSize:'1.2rem', transition:'all 0.2s' }" title="点击收藏/取消收藏">
    {{ isFavorite(c.id) ? '⭐' : '☆' }}
  </button>

### {{ c.id }} {{ c.title }}

<div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:12px; font-size:13px; color:#6b7280;">
  <span style="background:#f3f4f6; padding:2px 10px; border-radius:12px;">{{ typeLabel(c.type) }}</span>
  <span style="background:#f3f4f6; padding:2px 10px; border-radius:12px;">{{ moduleLabel(c.module) }}</span>
  <span style="background:#f3f4f6; padding:2px 10px; border-radius:12px;">{{ c.scale }}</span>
  <span style="background:#f3f4f6; padding:2px 10px; border-radius:12px;">适配课程：{{ c.course }}</span>
  <span style="background:#f3f4f6; padding:2px 10px; border-radius:12px;">{{ c.year }}</span>
  <span style="background:#f3f4f6; padding:2px 10px; border-radius:12px;">来源：{{ c.source }}</span>
</div>

**案例摘要：**

{{ c.summary }}

**教学要点：** {{ c.teaching }}

<div style="margin-top:10px; display:flex; gap:18px; align-items:center; flex-wrap:wrap;">
  <a :href="'/cases/' + c.id.toLowerCase()" style="color:#3b82f6; font-size:13px; font-weight:600; text-decoration:none;">📖 案例详情与深度教学手册 →</a>
  <a v-if="c.sourceUrl" :href="c.sourceUrl" target="_blank" style="color:#3b82f6; font-size:13px; text-decoration:none;">🔗 查看原始来源 →</a>
</div>

</div>

---

## 教学应用指南

### 正面案例教学路径

::: tip 教学公式
**展示成果数据**（引发兴趣）→ **拆解核心做法**（学习路径）→ **提炼可复用方法论**（知识沉淀）
:::

### 反面案例教学路径

::: warning 教学公式
**展示失败后果**（冲击感）→ **分析失败根因**（深度理解）→ **给出预防措施和应急方案**（实操价值）
:::

### 正反对比教学设计

::: info 推荐配对
| 正面案例 | 反面案例 | 对比焦点 |
|----------|----------|----------|
| SC-01 巨星科技FBA供应链优化 | SC-03 瑞贝卡供应链失控 | 数据驱动 vs 经验决策的库存管理 |
| BM-01 ELEGOO品牌出海标杆 | BM-05 TikTok爆款商标被抢注 | 品牌保护先行 vs 品牌保护缺失 |
| LF-03 10年FBA实战20亿 | LF-01 洛杉矶海外仓暴雷 | 多元备份 vs 单一依赖的物流策略 |
| PO-01 温州小伙年销1200万只 | PO-04 TikTok服务商跑路封店 | 合规运营 vs 灰色玩法的平台生存 |
| BE-02 航空包机三阶段壁垒构建 | BE-01 鲜花电商重资产直投失败 | 分阶段验证壁垒递进 vs 跳过验证直接重投入 |
| BE-03 森大集团先贸易后建厂 | BE-04 Labubu娃衣短期泡沫 | 长期需求驱动阶梯投入 vs 短期流量泡沫套利 |
| BE-08 基烁新材料贸易转生产 | BE-07 信息差纯搬运套利 | 壁垒叠加的长期主义 vs 止步搬运的短期红利 |
:::

### 📊 快速进入正反配对专题

<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:12px; margin-top:16px;">
  <a href="/cases/comparison/sc-01-sc-03" style="padding:14px 18px; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none; transition:all 0.2s; display:block; background:#fafbfc;">
    <div style="font-weight:600; color:#1d4ed8; margin-bottom:6px;">📦 供应链对决</div>
    <div style="font-size:13px; color:#374151;">SC-01 vs SC-03<br/>数据驱动 vs 经验决策</div>
  </a>
  <a href="/cases/comparison/bm-01-bm-05" style="padding:14px 18px; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none; transition:all 0.2s; display:block; background:#fafbfc;">
    <div style="font-weight:600; color:#1d4ed8; margin-bottom:6px;">🏷️ 品牌保卫战</div>
    <div style="font-size:13px; color:#374151;">BM-01 vs BM-05<br/>保护先行 vs 保护缺失</div>
  </a>
  <a href="/cases/comparison/po-01-po-04" style="padding:14px 18px; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none; transition:all 0.2s; display:block; background:#fafbfc;">
    <div style="font-weight:600; color:#1d4ed8; margin-bottom:6px;">🛒 平台生存法则</div>
    <div style="font-size:13px; color:#374151;">PO-01 vs PO-04<br/>合规运营 vs 灰色玩法</div>
  </a>
  <a href="/cases/comparison/be-02-be-01" style="padding:14px 18px; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none; transition:all 0.2s; display:block; background:#fafbfc;">
    <div style="font-weight:600; color:#1d4ed8; margin-bottom:6px;">🧭 创业生死线</div>
    <div style="font-size:13px; color:#374151;">BE-02 vs BE-01<br/>分阶验证 vs 重资直投</div>
  </a>
</div>

---

## 案例来源站点

| 站点 | 类型 | 覆盖领域 | 访问地址 |
|------|------|----------|----------|
| 雨果跨境 (cifnews.com) | 跨境电商行业媒体 | 供应链/品牌/合规/物流全模块 | https://www.cifnews.com/ |
| 亚马逊全球开店 (globalselling.amazon.com) | 亚马逊官方卖家服务 | 平台运营/品牌管理/FBA实战 | https://gs.amazon.cn/sellerstory |
| TikTok Shop出海 (tiktokshopglobalselling.com) | TikTok官方卖家服务 | 内容电商/直播/达人/新兴市场 | https://www.tiktokshopglobalselling.com/zh-cn/hot |
| 贸法通 (ctils.com) | 商务部涉外商事法律平台 | 合规/知识产权/贸易救济/争端解决 | http://ctils.com/ |
| 智南针 (worldip.cn) | 知识产权专业平台 | 商标/专利/海外IP纠纷 | https://www.worldip.cn/ |
| 课程团队一手研究 | 生意拆解分析/政策研究/战略研判报告 | 商业本质/合规政策/物流战略 | 课程内部资料（不对外公开） |
| V+知识库物流政策研究 | 英国专线小包/3PL海外仓政策研究与合同模板 | 物流履约/清关合规/合同风控 | 课程内部资料（不对外公开） |
| V+知识库物流趋势研究 | 2026跨境物流模式发展趋势深度专题研究 | 物流模式演化/分层履约/仓网布局 | 课程内部资料（不对外公开） |

<LastUpdated />
