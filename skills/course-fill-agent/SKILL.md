---
name: course-fill-agent
version: 2.0.0
description: 跨境电商课程站智能课时填充 Agent V2 —— 基于主课程文件自动生成符合 L1 金标准的课时内容（深度内容 + 结构化 SOP + 成对案例 + 工具模板 + Quiz），内置安全护栏与批量流水线
homepage: https://github.com/cmc005v-tech/etech-docs
metadata: {"openclaw":{"emoji":"📚","requires":{"bins":["python3","node"]}}}
---

# Course Fill Agent — 课程智能填充 Agent

基于主课程文件（`docs/lX/XX-course-name.md`）自动生成 5 个课时文件（lesson-2 至 lesson-6），输出符合 L1 金标准的完整课时内容：深度内容 + 结构化 SOP + 成对案例（成功+踩坑）+ 配套工具模板（Checklist/管理表/行动计划）+ Quiz + 人工审核清单。

## 前置条件

1. **生成引擎**：项目根目录存在 `l2_engine.py`（含 `write_lesson()` / `audit_dir()` / `build_sop()` / `build_case_pair()` / `build_tool_templates()` / `build_review_checklist()`）
2. **主课程文件**：目标课程的主文件已编写（含数据表格、案例、框架）
3. **Node.js 环境**：用于 `npm run build` 构建验证

## 调用方式

```
/course-fill-agent docs/l2/c07-digital-ai.md
```

参数：主课程文件路径（相对于项目根目录）

## 执行流程

Agent 按以下 5 个阶段自动执行，**无需人工干预**：

### Phase 1：素材分析

```
1. Read 主课程文件全文
2. 提取素材清单：
   - 数据表格（关键数字、百分比、金额）
   - 案例（编号、名称、关键结果）
   - 框架/模型（维度、权重、阶段）
3. 确认课时划分（主文件通常定义 2-3 个课时主题）
```

### Phase 2：课时规划

根据路径类型自动分配 5 课时主题：

| 课时 | 通用定位 | L2-A 运营 | L2-B 创业 | L2-C 管理 |
|------|----------|-----------|-----------|-----------|
| 第2课 | 核心精讲① | 算法/指标机制 | 搭建流程步骤 | 框架/模型精讲 |
| 第3课 | 核心精讲② | 策略/实操 | 成本/资源拆解 | 决策机制 |
| 第4课 | 高阶扩展 | 工具/系统搭建 | 风控/合规机制 | 评估/选型框架 |
| 第5课 | 工具/机制 | AI辅助/数据看板 | 资源工具配置 | 成熟度自查 |
| 第6课 | 收官总结 | 知识地图+行动清单 | 全景图+行动清单 | 全景图+行动清单 |

**特殊规则**：
- 路径最后一门课的第6课：追加「全路径知识地图」
- L2 最后一门课的第6课：追加「毕业寄语」

### Phase 3：脚本编写

按以下模板生成 `fill_lXxx.py` 内容脚本：

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""{CODE} {课程名称} · 第2-6课"""
from l2_engine import write_lesson

DIR = 'docs/{level}'
PREFIX = '{prefix}'
CODE = '{code}'

# ============ 第N课：标题 ============
cN = """
## 一、章节标题

正文内容（含数据表格）

| 列1 | 列2 | 列3 |
|------|------|------|
| 数据 | 数据 | 数据 |

::: warning 核心要点
**关键结论。**
:::
"""

qaN = [
    ('问题1？', '回答1'),
    ('问题2？', '回答2'),
    ('问题3？', '回答3'),
]

quizN = [
    {'q': '题目1？', 'options': ['A', 'B', 'C', 'D'], 'answer': 0, 'explain': '解析'},
    {'q': '题目2？', 'options': ['A', 'B', 'C', 'D'], 'answer': 1, 'explain': '解析'},
    {'q': '题目3？', 'options': ['A', 'B', 'C', 'D'], 'answer': 2, 'explain': '解析'},
    {'q': '题目4？', 'options': ['A', 'B', 'C', 'D'], 'answer': 3, 'explain': '解析'},
]

write_lesson(DIR, PREFIX, CODE, N, '课时标题', '教学目标',
             cN, qaN, quizN,
             time_rows=[('导入', '5分钟', '...'), ('精讲', '25分钟', '...'),
                        ('案例', '10分钟', '...'), ('实训', '5分钟', '...')])

print('{CODE} lessons 2-3 done')
```

**分步写入策略**（避免单次写入过长）：
1. `Write` 创建脚本（第2-3课，约 170 行），末尾标记 `print('... lessons 2-3 done')`
2. `SearchReplace` 替换该标记，追加第4-6课（约 400 行），末尾改为 `print('... lessons 2-6 done')`

### Phase 4：生成与审计

```bash
cd course-site-vitepress
python fill_lXxx.py                    # 生成课时文件
python l2_engine.py docs/lX xx         # 审计（0 问题通过）
```

**审计失败处理**：
- ASCII 双引号 → `SearchReplace` 替换为全角引号（`""`）
- 占位符残留 → 检查 content_md 是否遗漏
- 属性名错误 → 检查 quiz 是否用了 `correct`/`explanation`

### Phase 5：构建与提交

```bash
npm run build                          # 构建通过
rm fill_lXxx.py                        # 删除临时脚本
git add docs/lX/xx-lesson-*.md
git commit -m "feat(lX): fill XX-NN 课程名称 lessons 2-6"
git push origin main
```

## 安全护栏

Agent 在生成过程中严格遵守以下规则：

| 护栏 | 规则 | 检查时机 |
|------|------|----------|
| Quiz 属性名 | 必须 `answer` / `explain` | 引擎写入前 |
| ASCII 双引号 | Quiz/Q&A/时间分配行禁止 `"` | 引擎写入前 + 审计 |
| 占位符 | 禁止 `[本课核心]` 等模板标记 | 审计阶段 |
| 中文表述 | 避免中英混杂 | 内容编写时 |
| 文件编码 | 统一 UTF-8 | 引擎写入时 |
| Emoji | Python print 禁用（GBK 错误） | 脚本编写时 |

## 内容质量标准（V2 增强版）

每个课时文件必须包含：

1. **Frontmatter**：title / description / course.code / lesson / hours / level
2. **教学目标**：一句话，以动词开头
3. **时间分配表**：4 行，总时长 45 分钟
4. **主体章节**：2-4 个 `##` 级章节，含数据表格 + `::: warning` 核心要点
5. **成对案例**：每课必须同时包含成功案例 + 踩坑案例（用 `build_case_pair()` 生成）
6. **结构化 SOP**：输入条件→执行动作→输出结果→风险点（用 `build_sop()` 生成）
7. **Q&A 预案**：3 问 3 答
8. **Quiz 自测**：4 题（answer/explain，无 ASCII 双引号）
9. **配套工具模板**：Checklist + 管理表 + 课后行动计划（用 `build_tool_templates()` 生成）
10. **人工审核清单**：每课末尾附审核校对项（用 `build_review_checklist()` 生成）
11. **MarkDone**：进度追踪组件

**第6课附加**：
- 30 天行动清单（4 周任务表）
- （路径末课）全路径知识地图
- （L2 末课）毕业寄语

### V2 新增内容规范

**成对案例规则**：
- 每课必须包含一个成功案例和一个踩坑案例
- 每个案例必须含：背景、关键动作、结果、复盘启示
- 案例数据必须来自主课程文件，不可凭空编造

**结构化 SOP 格式**：
- 每个步骤必须写明：输入条件、执行动作、输出结果、风险点
- 风险点不可省略，没有风险也要写“无”

**配套工具模板规则**：
- Checklist：5-8 项可打印检查项
- 管理表：Markdown 表格，可直接复制到 Excel
- 行动计划：7 天落地任务（Day1 / Day2-3 / Day4-5 / Day6-7）

**人工审核清单规则**：
- 每课末尾必须附 3-5 项审核校对项
- 必含项：数据校验、案例真实性、Quiz 答案校验

## 路径特征速查

| 路径 | 内容风格 | 表格类型 | 案例侧重 | 第5课定位 |
|------|----------|----------|----------|-----------|
| L2-A 运营 | 数据驱动 | 指标基准表 | 平台实操 | 工具/系统 |
| L2-B 创业 | 流程构建 | 成本分解表 | 创业踩坑 | 风控/合规 |
| L2-C 管理 | 框架决策 | 评分矩阵表 | 战略决策 | 选型/评估 |

## 错误处理

| 错误 | 原因 | 修复 |
|------|------|------|
| `ValueError: 包含 ASCII 双引号` | Quiz/Q&A 中有 `"` | SearchReplace 改为 `""` |
| `占位符残留` | content_md 含模板标记 | 补充真实内容 |
| `correct/explanation` | Quiz 属性名错误 | 改为 `answer/explain` |
| `UnicodeEncodeError` | print 含 emoji | 删除 emoji |
| 构建失败但审计通过 | Vue 组件语法错误 | 检查 `:questions` 属性格式 |

## 效率参考

| 指标 | 数值 |
|------|------|
| 单门课耗时 | 30-60 分钟 |
| 单批次（5 门） | 2-4 小时 |
| 全 L2（24 门/120 课时） | 约 60-80 小时 |
| 引擎拦截错误率 | ~10% 的脚本需要双引号修正 |
| 构建通过率 | 100%（引擎+审计双重保障） |
