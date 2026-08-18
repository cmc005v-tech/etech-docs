---
title: 核心术语表
description: 跨境电商高级实战系列核心术语中英对照，按领域分类
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const input = document.getElementById('glossary-search')
  const rows = document.querySelectorAll('.vp-doc table tbody tr')
  if (!input) return
  input.addEventListener('input', () => {
    const kw = input.value.trim().toLowerCase()
    rows.forEach(row => {
      row.style.display = !kw || row.textContent.toLowerCase().includes(kw) ? '' : 'none'
    })
  })
})
</script>

# 核心术语表

本课程体系涉及的核心术语中英对照，按 8 大知识领域分类。掌握这些术语是进入 L1 必修层的基础前提。

<input id="glossary-search" class="glossary-search" type="search" placeholder="🔍 搜索术语（支持中文/英文，如：周转 / ACOS / 海外仓）" />

---

## 一、供应链域

| 术语 | 英文 | 释义 |
|------|------|------|
| 全链路供应链 | End-to-End Supply Chain | 从需求预测→采购→集货→头程→清关→海外仓→末端配送→签收→逆向的完整链路 |
| 海外仓 | Overseas Warehouse | 设在目的国的仓储设施，实现本地发货，综合成本比直邮节省 40%-60% |
| 直邮 | Direct Mail | 从中国直接发往海外消费者的物流模式，时效长但无需提前备货 |
| 全托管 | Full Consignment | 卖家仅需供货，平台负责定价、运营、物流的全流程托管模式 |
| 半托管 | Semi-Consignment | 卖家保留定价权，平台提供物流等基础设施的协作模式 |
| SKU 分级 | SKU Classification | 按营收贡献将 SKU 分为 A/B/C/D 四档（A≥60% 营收） |
| 安全库存 | Safety Stock | 为应对需求波动和供应不确定性而设置的缓冲库存 |
| 库存周转天数 | Inventory Turnover Days | 库存从入库到出库的平均天数，SHEIN 标杆值 36 天 |
| 呆滞库存 | Dead Stock | 长期无动销的库存，行业基准占总库存 ≤8% |
| 轴辐式仓网 | Hub-and-Spoke Network | 中心仓（Hub）+ 区域卫星仓（Spoke）的分层仓储架构 |

## 二、平台运营域

| 术语 | 英文 | 释义 |
|------|------|------|
| K 型分化 | K-Shaped Divergence | 行业两极分化：头部大卖增长，尾部卖家淘汰 |
| COSMO 算法 | COSMO Algorithm | 亚马逊新一代搜索算法，从关键词匹配升级为语义理解 |
| Listing 优化 | Listing Optimization | 标题/五点/A+/图片/视频五要素的产品页面优化 |
| A+ 页面 | A+ Content | 亚马逊品牌卖家的增强版产品描述，可提升转化率 5-15% |
| ACOS | Advertising Cost of Sales | 广告花费占广告销售额的比例，成熟期目标 ≤25% |
| TACOS | Total ACOS | 广告花费占总销售额比例，成熟期基准 ≤15% |
| ROI | Return on Investment | 投资回报率，盈亏平衡 ROI = 1/毛利率 |
| CAC | Customer Acquisition Cost | 获客成本，独立站约 45 美元（2026） |
| LTV | Lifetime Value | 客户终身价值，LTV/CAC > 3 为健康 |
| 内容工业化 | Content Industrialization | 日产 3-5 条短视频的标准化内容生产 SOP |

## 三、合规域

| 术语 | 英文 | 释义 |
|------|------|------|
| HTSUS 归类 | HTSUS Classification | 美国海关商品分类编码，决定关税税率 |
| IOSS | Import One-Stop Shop | 欧盟进口一站式服务，简化增值税申报 |
| CE 标志 | CE Marking | 欧盟产品安全认证标志，属于强制性合规要求 |
| GPSR | General Product Safety Regulation | 欧盟通用产品安全法规，要求指定欧盟授权代表 |
| UFLPA | Uyghur Forced Labor Prevention Act | 美国《维吾尔强迫劳动预防法》，可反驳推定原则 |
| CBAM | Carbon Border Adjustment Mechanism | 欧盟碳边境调节机制，对高碳产品征收碳关税 |
| GDPR | General Data Protection Regulation | 欧盟通用数据保护条例，罚款上限全球营业额 4% |
| TRO | Temporary Restraining Order | 美国临时限制令，知识产权侵权的紧急司法措施 |
| 合规成本占比 | Compliance Cost Ratio | 合规成本占货值 18%-25%，税务合规最大占 8-15% |

## 四、品牌域

| 术语 | 英文 | 释义 |
|------|------|------|
| DTC | Direct to Consumer | 品牌直面消费者的销售模式 |
| PMF | Product-Market Fit | 产品市场匹配，品牌建设必须先验证 PMF 再放量 |
| 品牌词流量占比 | Brand Search Traffic Share | 品牌词搜索流量占总流量比例，≥8% 为初步心智 |
| 复购率 | Repurchase Rate | 老客户重复购买比例，品牌健康度核心指标 |
| 品牌资产估值 | Brand Valuation | 基于五维价值模型的品牌资产评估 |
| KOL 分层 | KOL Tiering | KOC（佣金 10-15%）/ KOL（15-25%）/ 头部（25%+ 坑位费） |
| 内容矩阵 | Content Matrix | 四层内容比例 5:30:50:15 的系统化布局 |
| 本地化深度 | Localization Depth | L1 语言→L2 内容→L3 产品→L4 组织四级分层模型 |

## 五、物流域

| 术语 | 英文 | 释义 |
|------|------|------|
| 头程 | First Mile / Line Haul | 从中国到目的国港口/机场的国际运输段 |
| 尾程 | Last Mile | 从目的国仓库到消费者手中的末端配送 |
| FBA | Fulfillment by Amazon | 亚马逊官方仓储配送服务 |
| 双仓履约 | Dual-Warehouse Fulfillment | FBA + 第三方海外仓的组合履约策略 |
| IOR | Importer of Record | 进口商记录，清关合规的必要身份 |
| SLA | Service Level Agreement | 服务水平协议，海外仓五维评估的一票否决维度 |
| 库龄红线 | Inventory Age Redline | 库存存放超过设定天数的预警线 |
| 大促保障 | Peak Season Logistics | 大促期间 T-90 到 T+30 的全周期物流保障方案 |

## 六、数据与智能域

| 术语 | 英文 | 释义 |
|------|------|------|
| 五维数据看板 | 5D Data Dashboard | 运营/供应链/物流/品牌/财务五域指标可视化 |
| 5 Why 分析法 | 5 Why Analysis | 连续追问 5 次"为什么"找到问题根因 |
| AI Agent | AI Agent | 能自主决策执行的 AI 系统，运营自动化的终极形态 |
| 数字化三层架构 | 3-Layer Digital Architecture | 基础层→协同层→智能层的渐进式数字化路径 |
| AMC | Amazon Marketing Cloud | 亚马逊营销云，全触点数据追踪与分析工具 |

## 七、财务域

| 术语 | 英文 | 释义 |
|------|------|------|
| 全链路成本 | Total Landed Cost | 采购+头程+关税+仓储+尾程+逆向六大成本板块 |
| 资金回收周期 | Cash Recovery Cycle | 海外仓备货模式下从付款到回款的周期，通常 60-90 天 |
| 汇率风控 | FX Risk Management | 应对人民币与外币汇率波动的风险管理策略 |
| 净利润率 | Net Profit Margin | 行业基准 3%-10%，致欧 4.6% vs 赛维 3.9% |
| 资金红线 | Capital Redline | 库存资金占用占流动资金比例 ≤40% |

## 八、组织域

| 术语 | 英文 | 释义 |
|------|------|------|
| 品类小前台 | Category Front-End | 以品类为单位组建跨职能小组的组织架构 |
| T 型人才 | T-Shaped Talent | 既有专业深度又有跨领域协作能力的复合型人才 |
| 90 天落地计划 | 90-Day Implementation Plan | 四阶段路线图：止血→建制度→跑通→成型 |
| 健康度评分卡 | Health Scorecard | 物流运营综合评分，≥80 分健康、<60 分预警 |
| 双熔断机制 | Dual Circuit Breaker | 品牌考核中设置两条强制止损线 |

---

<ContentNotice />
