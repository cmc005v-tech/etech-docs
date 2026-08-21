# 课程文件参考手册

本文件为 course-eval-agent 的辅助参考，列出课程文件的实际路径和结构，便于 Agent 在评估时快速定位课程内容。

## 课程文件目录结构

```
course-site-vitepress/docs/
├── l1/                          # L1 必修基础层
│   ├── index.md                 # L1 课程总览
│   ├── 01-business-logic.md     # L1-01 商业逻辑总览
│   ├── 01-lesson-2.md ~ 01-lesson-6.md
│   ├── 01-toolkit.md
│   ├── 01-sample-lesson.md      # L1-01 试听样章
│   ├── 02-supply-chain.md       # L1-02 供应链全景认知
│   ├── 02-lesson-2.md ~ 02-lesson-6.md
│   ├── 02-toolkit.md
│   ├── 03-brand-dtc.md          # L1-03 品牌出海 DTC 框架
│   ├── 03-lesson-2.md ~ 03-lesson-6.md
│   ├── 03-toolkit.md
│   ├── 04-platform-ops.md       # L1-04 平台运营核心逻辑
│   ├── 04-lesson-2.md ~ 04-lesson-6.md
│   ├── 04-toolkit.md
│   ├── 05-logistics.md          # L1-05 物流与履约基础
│   ├── 05-lesson-2.md ~ 05-lesson-6.md
│   ├── 05-toolkit.md
│   ├── 06-compliance.md         # L1-06 合规风险地图
│   ├── 06-lesson-2.md ~ 06-lesson-6.md
│   ├── 06-toolkit.md
│   ├── 07-finance-cost.md       # L1-07 财务与成本认知
│   ├── 07-lesson-2.md ~ 07-lesson-6.md
│   ├── 07-toolkit.md
│   ├── 08-data-driven.md        # L1-08 数据驱动入门
│   ├── 08-lesson-2.md ~ 08-lesson-6.md
│   └── 08-toolkit.md
├── l2/                          # L2 分路径选修层
│   ├── index.md                 # L2 课程总览
│   ├── a01-algorithm-traffic.md # L2A-01 平台算法与流量
│   ├── a01-lesson-2.md ~ a01-lesson-6.md (或 a01-lesson-8.md)
│   ├── a01-toolkit.md
│   ├── ... (L2A-02 ~ L2A-09 同理)
│   ├── b01-product-research.md  # L2B-01 选品与市场调研
│   ├── ... (L2B-02 ~ L2B-08 同理)
│   ├── c01-strategy.md          # L2C-01 战略认知
│   └── ... (L2C-02 ~ L2C-07 同理)
├── l3/                          # L3 高阶毕业项目
│   ├── index.md                 # L3 课程总览
│   ├── l3a-lesson-2.md ~ l3a-lesson-6.md
│   ├── l3a-toolkit.md
│   ├── l3b-lesson-2.md ~ l3b-lesson-6.md
│   ├── l3b-toolkit.md
│   ├── l3c-lesson-2.md ~ l3c-lesson-6.md
│   └── l3c-toolkit.md
├── courses/                     # 知识库课程
│   ├── index.md
│   ├── supply-chain/            # 供应链管理
│   ├── platform-operations/     # 平台运营
│   ├── compliance/              # 合规管理
│   ├── brand-management/        # 品牌管理
│   ├── logistics-overseas-warehouse/  # 物流与海外仓
│   ├── supply-chain-execution/  # 供应链执行
│   ├── finance-management/      # 财务管控
│   ├── cashflow-forex/          # 资金链与外汇风控
│   ├── digital-transformation/  # 数字化转型
│   └── team-management/         # 团队管理
├── overview/                    # 课程体系总览
│   ├── index.md
│   └── layered-system.md
└── resources/
    └── learning-roadmap.md      # 学习路线图
```

## 课程文件标准结构

每个课程文件（index.md / XX-course.md）通常包含：

1. **Frontmatter**：title / description / course.code / level
2. **课程简介**：定位、适合人群、前置要求
3. **课时划分表**：每课主题、时长、教学目标
4. **时间分配表**：导入/精讲/案例/实训的时间安排
5. **核心知识点**：分章节的详细讲解
6. **数据表格**：关键指标、对比分析
7. **案例**：成功案例 + 踩坑案例
8. **Q&A 预案**：3 问 3 答
9. **Quiz 自测**：4 题选择题
10. **工具模板**：Checklist / 管理表 / 行动计划
11. **MarkDone 组件**：进度追踪

## 各层级内容特征

### L1 特征
- **定位**：认知+入门级，建立全链路认知
- **课时长度**：每课 45 分钟（2 课时制或 4 课时制）
- **时间分配**：[5, 25, 10, 5]（导入/精讲/案例/实训）
- **内容深度**：概念理解级，强调"是什么"和"为什么"
- **案例类型**：行业通识案例，不涉及具体操作细节
- **工具模板**：认知框架、检查清单、入门指南

### L2 特征
- **定位**：操作+进阶，按路径深度精进
- **课时长度**：每课 45 分钟（2-3 课时制）
- **时间分配**：[5, 25, 10, 5]
- **内容深度**：操作应用级，强调"怎么做"和"怎么优化"
- **案例类型**：实操案例，含具体数据和操作步骤
- **工具模板**：SOP、操作手册、优化清单

**路径差异**：
| 路径 | 内容风格 | 表格类型 | 案例侧重 |
|------|----------|----------|----------|
| L2-A 运营 | 数据驱动 | 指标基准表 | 平台实操 |
| L2-B 创业 | 流程构建 | 成本分解表 | 创业踩坑 |
| L2-C 管理 | 框架决策 | 评分矩阵表 | 战略决策 |

### L3 特征
- **定位**：项目制深度学习，实战方案设计
- **课时长度**：每课 180 分钟（3 小时）
- **时间分配**：[15, 90, 30, 45]（导入/实战/复盘/优化）
- **内容深度**：综合应用级，强调"怎么决策"和"怎么整合"
- **三大板块**：核心任务 + AI 工具应用 + 交付成果
- **案例类型**：综合实战案例，需要多知识点融合

## 评估时的文件读取顺序

对每门课程，建议按以下顺序读取：

1. `index.md` 或 `XX-course.md`（课程概览，了解教学目标）
2. `XX-sample-lesson.md`（试听样章，了解内容风格）
3. `XX-lesson-2.md` ~ `XX-lesson-N.md`（各课时内容）
4. `XX-toolkit.md`（工具模板，了解实操配套）
5. 关联案例文件（如有交叉引用）

## 知识库课程补充参考

知识库课程（courses/ 目录下）为专题深度课程，每门包含：
- `index.md`（课程简介）
- `learning-roadmap.md`（学习路线图）
- `faq.md`（常见问题）
- `outline.md`（全课大纲）
- `sample-lesson-1.md`（试听样章，含 Quiz）
- `toolkit.md`（完整工具包）

这些课程可作为 L1/L2/L3 课程评估时的补充参考，特别是当学员的疑问涉及知识库专题领域时。
