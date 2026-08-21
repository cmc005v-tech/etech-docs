#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
L2 课时批量生成引擎（可复用）
安全护栏:
1. Quiz 属性使用 answer/explain（组件正确接口）
2. 自动检测并拒绝 Quiz 字段中的 ASCII 双引号（防止 Vue 属性解析失败）
3. 生成后自动审计占位符与嵌套引号
"""

import re
import sys

PLACEHOLDER_PATTERNS = [
    r'\[本课核心概念讲解',
    r'\[指标\|数据\|含义解释',
    r'\[真实案例分享',
    r'\[详细回答',
    r'\[学员常见问题',
    r'\[第一步操作',
    r'\[第二步操作',
    r'\[第三步操作',
    r'\[本课最重要',
    r"'问题\d\?'",
    r"correct:\s*\d",
    r"explanation:\s*'",
]


def _check_quotes(obj, where):
    """递归检查所有字符串字段不含 ASCII 双引号"""
    if isinstance(obj, str):
        if '"' in obj:
            raise ValueError(f'{where} 包含 ASCII 双引号，会导致 Vue 属性解析失败: {obj[:60]}...')
    elif isinstance(obj, list):
        for i, item in enumerate(obj):
            _check_quotes(item, f'{where}[{i}]')
    elif isinstance(obj, dict):
        for k, v in obj.items():
            _check_quotes(v, f'{where}.{k}')


def build_quiz_js(questions):
    """生成 Quiz 组件的 :questions 内容（单引号字符串，无嵌套双引号）"""
    _check_quotes(questions, 'quiz')
    lines = []
    for item in questions:
        opts = ', '.join(f"'{o}'" for o in item['options'])
        lines.append(
            f"  {{ q: '{item['q']}', options: [{opts}], "
            f"answer: {item['answer']}, explain: '{item['explain']}' }}"
        )
    return ',\n'.join(lines)


def build_qa(qa_list):
    """生成 Q&A 预案区块"""
    parts = []
    for i, (q, a) in enumerate(qa_list, 1):
        parts.append(f'**Q{i}: {q}**  \nA: {a}')
    return '\n\n'.join(parts)


def build_time_table(rows):
    """生成时间分配表"""
    if not rows:
        rows = [
            ('导入', '5分钟', '回顾上节课内容，引出本课主题'),
            ('精讲', '25分钟', '核心知识点讲解'),
            ('案例', '10分钟', '实战案例分析'),
            ('实训', '5分钟', '学员练习与讨论'),
        ]
    lines = ['| 环节 | 时长 | 内容 |', '|------|------|------|']
    for env, dur, desc in rows:
        lines.append(f'| {env} | {dur} | {desc} |')
    return '\n'.join(lines)


def build_sop(name, steps):
    """
    生成结构化 SOP 区块（输入→动作→输出→风险 四段式）
    steps: list of dict, 每项含 input/action/output/risk
    """
    lines = [f'## 操作方法 SOP：{name}', '']
    for i, s in enumerate(steps, 1):
        lines.append(f'**步骤{i}**')
        lines.append(f'- 输入条件：{s.get("input", "—")}')
        lines.append(f'- 执行动作：{s.get("action", "—")}')
        lines.append(f'- 输出结果：{s.get("output", "—")}')
        risk = s.get('risk', '')
        if risk:
            lines.append(f'- 风险点：{risk}')
        lines.append('')
    return '\n'.join(lines)


def build_case_pair(success, failure):
    """
    生成成功+失败成对案例区块
    success/failure: dict, 含 title/background/actions/result/insight
    """
    lines = []
    # 成功案例
    lines.append(f'### 成功案例：{success["title"]}')
    lines.append(f'- **背景**：{success.get("background", "—")}')
    lines.append(f'- **关键动作**：{success.get("actions", "—")}')
    lines.append(f'- **结果**：{success.get("result", "—")}')
    lines.append(f'- **复盘启示**：{success.get("insight", "—")}')
    lines.append('')
    # 失败案例
    lines.append(f'### 踩坑案例：{failure["title"]}')
    lines.append(f'- **背景**：{failure.get("background", "—")}')
    lines.append(f'- **关键动作**：{failure.get("actions", "—")}')
    lines.append(f'- **结果**：{failure.get("result", "—")}')
    lines.append(f'- **复盘启示**：{failure.get("insight", "—")}')
    return '\n'.join(lines)


def build_tool_templates(checklist=None, mgmt_table=None, action_plan=None):
    """
    生成配套工具模板区块（每课可交付物）
    checklist: list of str（检查项）
    mgmt_table: str（Markdown 表格文本）
    action_plan: list of (day_range, task) tuple
    """
    parts = ['## 配套工具模板', '']
    if checklist:
        parts.append('### 检查清单 Checklist')
        for item in checklist:
            parts.append(f'- [ ] {item}')
        parts.append('')
    if mgmt_table:
        parts.append('### 管理表（可复制到 Excel）')
        parts.append(mgmt_table)
        parts.append('')
    if action_plan:
        parts.append('### 课后落地行动计划')
        for day, task in action_plan:
            parts.append(f'- **{day}**：{task}')
        parts.append('')
    if len(parts) <= 2:
        return ''
    return '\n'.join(parts)


def build_review_checklist(items):
    """
    生成人工审核校对清单
    items: list of str（审核项）
    """
    if not items:
        return ''
    lines = ['## 人工审核校对清单', '']
    for item in items:
        lines.append(f'- [ ] {item}')
    return '\n'.join(lines)


def write_lesson(dir_path, file_prefix, code, lesson_num, lesson_title, goal,
                 content_md, qa_list, quiz_questions,
                 time_rows=None, hours=1, level='L2 进阶',
                 course_desc=None, source_note=None,
                 tool_templates=None, review_items=None):
    """
    生成一个课时文件
    dir_path: 输出目录，如 docs/l2
    file_prefix: 文件名前缀，如 a02
    code: 课程代码，如 L2A-02
    tool_templates: 可选 dict，含 checklist/mgmt_table/action_plan
    review_items: 可选 list，人工审核校对项
    """
    _check_quotes(quiz_questions, f'{code} 第{lesson_num}课 quiz')
    for q, a in qa_list:
        if '"' in q or '"' in a:
            raise ValueError(f'{code} 第{lesson_num}课 Q&A 包含双引号: {q[:40]}')

    if course_desc is None:
        course_desc = f'{code} 核心知识:{lesson_title}'
    if source_note is None:
        source_note = f'本课数据来源于 {code} 原有内容，结合 2025 年行业实际数据更新。'

    markdone_id = f'{file_prefix}-lesson{lesson_num}'.replace('-', '')

    # 构建可选区块
    tt_md = ''
    if tool_templates:
        tt_md = '\n---\n\n' + build_tool_templates(
            checklist=tool_templates.get('checklist'),
            mgmt_table=tool_templates.get('mgmt_table'),
            action_plan=tool_templates.get('action_plan'))

    rc_md = ''
    if review_items:
        rc_md = '\n---\n\n' + build_review_checklist(review_items)

    doc = f"""---
title: {code} 第{lesson_num}课 {lesson_title}
description: {course_desc}
course:
  code: {code}
  lesson: {lesson_num}
  hours: {hours}
  level: {level}
---

# {code} 第{lesson_num}课 {lesson_title}

> {hours}课时 · 掌握级  
> 教学目标：{goal}

---

## 时间分配

{build_time_table(time_rows)}

---

{content_md}

---

## Q&A 预案

{build_qa(qa_list)}

---

## Quiz 自测

<Quiz title="{code} 第{lesson_num}课 · 自测" :questions="[
{build_quiz_js(quiz_questions)}
]" />
{tt_md}
---

::: info 内容说明
{source_note}
:::

<MarkDone id="{markdone_id}" title="{code} 第{lesson_num}课 {lesson_title}" />
{rc_md}
"""

    path = f'{dir_path}/{file_prefix}-lesson-{lesson_num}.md'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(doc)
    return path


def audit_file(path):
    """审计单个文件：占位符 + Quiz 嵌套双引号 + 属性名"""
    problems = []
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    for pat in PLACEHOLDER_PATTERNS:
        if re.search(pat, content):
            problems.append(f'占位符残留: {pat}')

    # Quiz 属性内的嵌套双引号检查
    for m in re.finditer(r':questions="(\[[^\n]*(?:\n(?!\]" />)[^\n]*)*\])"', content):
        quiz_block = m.group(1)
        if '"' in quiz_block:
            problems.append('Quiz 属性内嵌套双引号')

    # 旧属性名检查
    if re.search(r'\bcorrect:\s*\d', content):
        problems.append('使用了错误属性名 correct（应为 answer）')
    if re.search(r"\bexplanation:\s*'", content):
        problems.append('使用了错误属性名 explanation（应为 explain）')

    return problems


def audit_dir(dir_path, prefix):
    """审计目录下指定前缀的所有 lesson 文件"""
    import glob
    files = sorted(glob.glob(f'{dir_path}/{prefix}-lesson-*.md'))
    total_problems = 0
    for f in files:
        problems = audit_file(f)
        if problems:
            total_problems += len(problems)
            print(f'[FAIL] {f}')
            for p in problems:
                print(f'       - {p}')
        else:
            print(f'[OK]   {f}')
    return total_problems


if __name__ == '__main__':
    if len(sys.argv) >= 3:
        n = audit_dir(sys.argv[1], sys.argv[2])
        print(f'\n总问题数: {n}')
        sys.exit(1 if n else 0)
    else:
        print('用法: python l2_engine.py <目录> <文件前缀>  # 审计模式')
