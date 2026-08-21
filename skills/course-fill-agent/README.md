# Course Fill Agent V2 — 课程智能填充 Agent

> 基于 120 课时实际填充经验提炼的标准化流程与智能 Agent

## 目录结构

```
skills/course-fill-agent/
├── SKILL.md              # Agent 技能定义（核心文件）
├── README.md             # 本文件
└── scripts/
    └── fill_template.py  # 脚本模板（可复制定制）
```

## 配套文件

| 文件 | 位置 | 作用 |
|------|------|------|
| 生成引擎 | `course-site-vitepress/l2_engine.py` | write_lesson / audit / 安全护栏 |
| 最佳实践文档 | `course-site-vitepress/course-fill-best-practices.md` | 三路径模式分析 + SOP + 质量清单 |
| 脚本模板 | `skills/course-fill-agent/scripts/fill_template.py` | 可直接复制定制的 Python 模板 |

## 快速开始

```bash
# 1. 进入项目目录
cd course-site-vitepress

# 2. 调用 Agent（提供主课程文件路径）
# Agent 将自动执行：素材分析 → 课时规划 → 脚本编写 → 生成审计 → 构建提交

# 3. 手动模式（参考模板）
cp skills/course-fill-agent/scripts/fill_template.py fill_lXxx.py
# 编辑 fill_lXxx.py，替换变量和内容
python fill_lXxx.py
python l2_engine.py docs/l2 xx    # 审计
npm run build                      # 构建验证
```

## 核心能力

1. **自动素材分析**：从主课程文件提取数据表格、案例、框架
2. **智能课时规划**：根据路径类型（运营/创业/管理）自动分配 5 课时主题
3. **V2 增强内容**：成对案例（成功+踩坑）+ 结构化 SOP + 配套工具模板 + 人工审核清单
4. **安全护栏**：Quiz 属性名校验、ASCII 双引号拦截、占位符审计
5. **批量流水线**：Write → SearchReplace → Run → Audit → Build → Commit

## 已验证数据

- 24 门课 × 5 课时 = 120 课时全部填充完成
- 8 次批次构建 100% 通过
- 引擎拦截 14+ 处 ASCII 双引号错误
- 单门课耗时 30-60 分钟（预估 200-300 小时 → 实际 60-80 小时）
